#!/usr/bin/env node
/**
 * Quick Setup Verification & Import Script
 * Run: node scripts/quick-setup.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load .env.local
require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('\n🔍 CHECKING SETUP...\n');

// Check environment variables
console.log('1. Environment Variables:');
console.log(`   ✓ SUPABASE_URL: ${SUPABASE_URL ? '✅ Set' : '❌ Missing'}`);
console.log(`   ✓ SERVICE_ROLE_KEY: ${SERVICE_ROLE_KEY && SERVICE_ROLE_KEY.startsWith('eyJ') ? '✅ Set' : '❌ Missing or invalid'}`);

if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !SERVICE_ROLE_KEY.startsWith('eyJ')) {
  console.log('\n⚠️  Please complete these steps:');
  console.log('   1. Go to: https://supabase.com/dashboard/project/ltauqjonpcjjdvbvupae/settings/api-keys/legacy');
  console.log('   2. Click "Reveal" next to service_role');
  console.log('   3. Copy the key (starts with eyJ...)');
  console.log('   4. Paste it in .env.local for SUPABASE_SERVICE_ROLE_KEY=');
  console.log('\nThen run this script again!\n');
  process.exit(1);
}

// Connect to Supabase
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function checkAndSetup() {
  console.log('\n2. Testing Database Connection...');
  
  // Check if table exists
  const { data, error } = await supabase
    .from('waitlist_signups')
    .select('count')
    .limit(1);
  
  if (error && error.code === '42P01') {
    console.log('   ❌ Table "waitlist_signups" does not exist');
    console.log('\n📋 NEXT STEP: Create the table');
    console.log('   1. Go to: https://supabase.com/dashboard/project/ltauqjonpcjjdvbvupae/sql/new');
    console.log('   2. Copy and paste this SQL:\n');
    console.log('------ COPY BELOW THIS LINE ------');
    console.log(`CREATE TABLE public.waitlist_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  zip TEXT,
  role TEXT,
  use_case TEXT,
  source TEXT DEFAULT 'direct',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_agent TEXT,
  referer TEXT,
  ip_hash TEXT
);
ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can sign up" ON public.waitlist_signups FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Admins can view" ON public.waitlist_signups FOR SELECT TO authenticated USING (true);`);
    console.log('------ COPY ABOVE THIS LINE ------\n');
    console.log('   3. Click "Run" button');
    console.log('\nThen run this script again!\n');
    return false;
  } else if (error) {
    console.log(`   ❌ Database error: ${error.message}`);
    return false;
  }
  
  console.log('   ✅ Table exists and connection works!');
  
  // Check for CSV file
  console.log('\n3. Checking for import data...');
  const csvPaths = [
    'waitlist_export.csv',
    'waitlist-export.csv', 
    'waitlist.csv',
    'data/waitlist.csv'
  ];
  
  let csvFile = null;
  for (const p of csvPaths) {
    if (fs.existsSync(p)) {
      csvFile = p;
      break;
    }
  }
  
  if (!csvFile) {
    console.log('   ℹ️  No CSV file found (optional)');
    console.log('   To import existing signups from Lovable Cloud:');
    console.log('   1. Export CSV from Lovable Cloud → Database → waitlist_signups');
    console.log('   2. Save as "waitlist_export.csv" in project root');
    console.log('   3. Run: npm run import-waitlist');
  } else {
    console.log(`   ✅ Found: ${csvFile}`);
    console.log('   Run: npm run import-waitlist');
  }
  
  console.log('\n✅ SETUP COMPLETE!\n');
  console.log('Your waitlist is now configured. Test it at your website!\n');
  return true;
}

checkAndSetup().catch(console.error);

