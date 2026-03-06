import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Public (anon) credentials — safe to embed in frontend bundles.
// These are the production ClearPolicy Supabase project values.
// The anon key is public by design; security is enforced via RLS.
const SUPABASE_URL = 'https://ltauqjonpcjjdvbvupae.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  'eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0YXVxam9ucGNqamR2YnZ1cGFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxOTY0MTgsImV4cCI6MjA3OTc3MjQxOH0.' +
  'wMIPk0o4cGgdp-jcfAE8k3PNgor7mLFbcvAqe8v9krg';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
