import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const SUPABASE_KEY = SUPABASE_ANON_KEY || SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    '[Supabase] Missing configuration.\n' +
    `  VITE_SUPABASE_URL: ${SUPABASE_URL ? 'set' : 'MISSING'}\n` +
    `  VITE_SUPABASE_ANON_KEY: ${SUPABASE_ANON_KEY ? 'set' : 'MISSING'}\n` +
    `  VITE_SUPABASE_PUBLISHABLE_KEY: ${SUPABASE_PUBLISHABLE_KEY ? 'set' : 'MISSING'}`
  );
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
