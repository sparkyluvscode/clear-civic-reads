#!/usr/bin/env node
/**
 * Create waitlist_signups table via Supabase
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { db: { schema: 'public' } }
);

async function testAndCreate() {
  console.log('Testing Supabase connection...');
  console.log('URL:', process.env.SUPABASE_URL);
  
  // Try to insert a test row - this will tell us if table exists
  const { data, error } = await supabase
    .from('waitlist_signups')
    .insert({ email: 'test-connection@test.com', source: 'setup-test' })
    .select();
  
  if (error) {
    if (error.code === '42P01') {
      console.log('❌ Table waitlist_signups does not exist');
      console.log('   Error:', error.message);
      console.log('\n📋 You need to create the table via Supabase SQL Editor');
      console.log('   Go to: https://supabase.com/dashboard/project/ltauqjonpcjjdvbvupae/sql/new');
      console.log('   And run the SQL migration');
      return false;
    } else if (error.code === '23505') {
      console.log('✅ Table exists! (got duplicate key error which means table is there)');
      return true;
    } else {
      console.log('Error:', error.code, error.message);
      return false;
    }
  } else {
    console.log('✅ Table exists and row inserted!');
    // Clean up test row
    const { error: deleteError } = await supabase
      .from('waitlist_signups')
      .delete()
      .eq('email', 'test-connection@test.com');
    
    if (!deleteError) {
      console.log('   Test row cleaned up');
    }
    return true;
  }
}

testAndCreate();

