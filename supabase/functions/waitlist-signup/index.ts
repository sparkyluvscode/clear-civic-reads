import { createClient } from 'npm:@supabase/supabase-js@2';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';
import { Resend } from 'https://esm.sh/resend@2.0.0';

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

    // Send confirmation email
    try {
      const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
      await resend.emails.send({
        from: 'ClearPolicy <onboarding@resend.dev>',
        to: [data.email],
        subject: 'Welcome to ClearPolicy Waitlist!',
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; padding: 40px 0;">
              <h1 style="color: #2E5A7B; margin: 0 0 16px 0; font-size: 28px;">Welcome to ClearPolicy!</h1>
              <p style="color: #6B7280; font-size: 16px; line-height: 1.6; margin: 0;">
                Thank you for joining our waitlist. We're excited to help you understand ballot measures with plain-English explanations backed by verifiable sources.
              </p>
            </div>
            
            <div style="background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%); border-radius: 16px; padding: 32px; margin: 24px 0;">
              <h2 style="color: #2E5A7B; margin: 0 0 16px 0; font-size: 20px;">What's next?</h2>
              <ul style="color: #4B5563; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>We'll notify you when ClearPolicy launches in your area</li>
                <li>You'll get early access to test the platform</li>
                <li>Your feedback will help shape the product</li>
              </ul>
            </div>
            
            <div style="text-align: center; padding: 32px 0 16px 0; border-top: 1px solid #E5E7EB; margin-top: 32px;">
              <p style="color: #9CA3AF; font-size: 13px; line-height: 1.6; margin: 0;">
                Have questions? Reply to this email—we'd love to hear from you.
              </p>
              <p style="color: #D1D5DB; font-size: 12px; margin: 16px 0 0 0;">
                © ${new Date().getFullYear()} ClearPolicy. Making civic choices clear, calm, and confident.
              </p>
            </div>
          </div>
        `,
      });
      console.log(`Confirmation email sent to: ${data.email}`);
    } catch (emailError) {
      // Log email error but don't fail the signup
      console.error('Failed to send confirmation email:', emailError);
    }

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
