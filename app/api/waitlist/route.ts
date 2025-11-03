import { NextRequest, NextResponse } from "next/server";

// In-memory storage for development (replace with database in production)
const waitlistSignups: any[] = [];

// Simple rate limiting using in-memory store
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(identifier);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + 60000 }); // 1 minute window
    return true;
  }

  if (limit.count >= 3) {
    // Max 3 requests per minute
    return false;
  }

  limit.count++;
  return true;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateZip(zip: string): boolean {
  return /^\d{5}(-\d{4})?$/.test(zip);
}

function hashIP(ip: string): string {
  // Simple hash for demonstration (use proper hashing in production)
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, zip, role, useCase, consent, source } = body;

    // Validate required fields
    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { error: "Valid email address is required" },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { error: "You must agree to be contacted" },
        { status: 400 }
      );
    }

    // Validate optional ZIP if provided
    if (zip && !validateZip(zip)) {
      return NextResponse.json(
        { error: "Invalid ZIP code format" },
        { status: 400 }
      );
    }

    // Get client info
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const userAgent = request.headers.get("user-agent") || "";
    const referer = request.headers.get("referer") || "";
    const ipHash = hashIP(ip);

    // Rate limiting
    if (!checkRateLimit(ipHash)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    if (!checkRateLimit(email.toLowerCase())) {
      return NextResponse.json(
        { error: "Too many requests from this email. Please try again later." },
        { status: 429 }
      );
    }

    // Check for duplicate email
    const existingSignup = waitlistSignups.find(
      (signup) => signup.email.toLowerCase() === email.toLowerCase()
    );

    if (existingSignup) {
      return NextResponse.json(
        { error: "This email is already on the waitlist" },
        { status: 409 }
      );
    }

    // Create signup record
    const signup = {
      id: Date.now().toString(),
      email: email.toLowerCase().trim(),
      zip: zip?.trim() || null,
      role: role || null,
      useCase: useCase?.trim() || null,
      source: source || "direct",
      createdAt: new Date().toISOString(),
      userAgent,
      referer,
      ipHash,
    };

    // Store signup (in production, save to database)
    waitlistSignups.push(signup);

    console.log(`New waitlist signup: ${email} (${zip || "no ZIP"}, ${role || "no role"})`);

    return NextResponse.json(
      { ok: true, message: "Successfully joined the waitlist" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing waitlist signup:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

// Optional: Export endpoint for admin access (secure this in production!)
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  
  // Simple auth check (replace with proper authentication in production)
  if (authHeader !== `Bearer ${process.env.ADMIN_TOKEN}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    total: waitlistSignups.length,
    signups: waitlistSignups,
  });
}
