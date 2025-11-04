import { createClient } from 'npm:@supabase/supabase-js@2';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Validation schema
const waitlistSchema = z.object({
  email: z.string().email('Invalid email address').max(255, 'Email too long').toLowerCase().trim(),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format').max(10).optional().nullable(),
  role: z.enum(['voter', 'journalist', 'nonprofit', 'official', 'other']).nullable().optional(),
  use_case: z.string().max(500, 'Use case must be less than 500 characters').trim().nullable().optional(),
  source: z.string().max(50).optional().default('direct'),
  user_agent: z.string().max(500).optional().nullable(),
  referer: z.string().max(500).optional().nullable(),
});

// Simple in-memory rate limiting (resets on function restart)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(identifier: string, maxAttempts: number, windowMs: number): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(identifier, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= maxAttempts) {
    return false;
  }

  record.count++;
  return true;
}

function hashIP(ip: string): string {
  // Simple hash for privacy - in production, use a proper hashing library
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `ip_${Math.abs(hash)}`;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0] || 
                     req.headers.get('x-real-ip') || 
                     'unknown';
    const ipHash = hashIP(clientIP);

    // Rate limit by IP: 5 attempts per hour
    if (!checkRateLimit(ipHash, 5, 60 * 60 * 1000)) {
      console.log(`Rate limit exceeded for IP hash: ${ipHash}`);
      return new Response(
        JSON.stringify({ 
          error: 'Too many signup attempts. Please try again later.' 
        }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    const validationResult = waitlistSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message
      }));
      
      console.log('Validation failed:', errors);
      
      return new Response(
        JSON.stringify({ 
          error: 'Invalid input data',
          details: errors 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const data = validationResult.data;

    // Rate limit by email: 1 attempt per day
    const emailKey = `email_${data.email}`;
    if (!checkRateLimit(emailKey, 1, 24 * 60 * 60 * 1000)) {
      console.log(`Rate limit exceeded for email: ${data.email}`);
      return new Response(
        JSON.stringify({ 
          error: 'This email has already been submitted. Please check back later.' 
        }),
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Create Supabase client with service role for insert
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    // Insert into database
    const { error: dbError } = await supabaseClient
      .from('waitlist_signups')
      .insert({
        email: data.email,
        zip: data.zip || null,
        role: data.role || null,
        use_case: data.use_case || null,
        source: data.source,
        user_agent: data.user_agent || null,
        referer: data.referer || null,
        ip_hash: ipHash,
      });

    if (dbError) {
      console.error('Database error:', dbError);
      
      // Handle duplicate email
      if (dbError.code === '23505') {
        return new Response(
          JSON.stringify({ 
            error: 'This email is already on the waitlist' 
          }),
          { 
            status: 409, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      // Generic error for other database issues
      return new Response(
        JSON.stringify({ 
          error: 'Unable to process signup. Please try again later.' 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Successful signup: ${data.email}`);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Successfully added to waitlist' 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in waitlist-signup function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'An unexpected error occurred. Please try again later.' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
