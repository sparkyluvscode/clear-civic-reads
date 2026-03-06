import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Public (anon) credentials — safe to embed in frontend bundles.
// Env vars override these so local dev can point at a different project.
const FALLBACK_URL = 'https://ltauqjonpcjjdvbvupae.supabase.co';
const FALLBACK_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  'eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0YXVxam9ucGNqamR2YnZ1cGFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxOTY0MTgsImV4cCI6MjA3OTc3MjQxOH0.' +
  'wMIPk0o4cGgdp-jcfAE8k3PNgor7mLFbcvAqe8v9krg';

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || FALLBACK_URL;

const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  FALLBACK_ANON_KEY;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
