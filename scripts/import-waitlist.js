#!/usr/bin/env node

/**
 * Import Waitlist Data from Lovable Cloud Export to Your Supabase
 * 
 * Usage: node scripts/import-waitlist.js <path-to-csv>
 * Example: node scripts/import-waitlist.js lovable_waitlist_export.csv
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local');
  process.exit(1);
}

const csvFilePath = process.argv[2];

if (!csvFilePath) {
  console.error('❌ Error: Please provide path to CSV file');
  console.error('Usage: node scripts/import-waitlist.js <path-to-csv>');
  process.exit(1);
}

async function importWaitlist() {
  console.log('🚀 Starting waitlist import...\n');

  // Create Supabase client with service role
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  // Read and parse CSV
  console.log(`📄 Reading CSV file: ${csvFilePath}`);
  let csvData;
  try {
    const fileContent = readFileSync(csvFilePath, 'utf-8');
    csvData = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });
  } catch (error) {
    console.error('❌ Error reading CSV file:', error.message);
    process.exit(1);
  }

  console.log(`✅ Found ${csvData.length} records in CSV\n`);

  // Transform and import data
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const row of csvData) {
    const record = {
      email: row.email?.toLowerCase().trim(),
      zip: row.zip || null,
      role: row.role || null,
      use_case: row.use_case || null,
      source: row.source || 'lovable_migration',
      created_at: row.created_at || new Date().toISOString(),
      user_agent: row.user_agent || null,
      referer: row.referer || null,
      ip_hash: row.ip_hash || null,
    };

    // Validate email
    if (!record.email || !record.email.includes('@')) {
      console.log(`⚠️  Skipping invalid email: ${row.email}`);
      skipCount++;
      continue;
    }

    try {
      const { error } = await supabase
        .from('waitlist_signups')
        .insert(record);

      if (error) {
        if (error.code === '23505') {
          // Duplicate email - this is okay, just skip
          console.log(`⏭️  Skipped duplicate: ${record.email}`);
          skipCount++;
        } else {
          console.error(`❌ Error importing ${record.email}:`, error.message);
          errorCount++;
        }
      } else {
        console.log(`✅ Imported: ${record.email}`);
        successCount++;
      }
    } catch (error) {
      console.error(`❌ Error importing ${record.email}:`, error.message);
      errorCount++;
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Import Summary:');
  console.log('='.repeat(50));
  console.log(`✅ Successfully imported: ${successCount}`);
  console.log(`⏭️  Skipped (duplicates):  ${skipCount}`);
  console.log(`❌ Errors:                ${errorCount}`);
  console.log('='.repeat(50));

  if (successCount > 0) {
    console.log('\n🎉 Import complete! Check your Supabase dashboard to verify.');
  }
}

// Run import
importWaitlist().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

