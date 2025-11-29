-- Create waitlist_signups table
CREATE TABLE IF NOT EXISTS public.waitlist_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  zip TEXT,
  role TEXT,
  use_case TEXT,
  source TEXT DEFAULT 'direct',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_agent TEXT,
  referer TEXT,
  ip_hash TEXT,
  CONSTRAINT email_lowercase CHECK (email = LOWER(email))
);

-- Enable Row Level Security
ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Allow anyone to sign up (insert)
CREATE POLICY "Anyone can sign up for waitlist"
ON public.waitlist_signups
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated users can view signups
CREATE POLICY "Authenticated users can view waitlist"
ON public.waitlist_signups
FOR SELECT
TO authenticated
USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist_signups(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON public.waitlist_signups(created_at DESC);

