#!/usr/bin/env node

/**
 * Export Waitlist Data from Your Supabase
 * 
 * Usage: node scripts/export-waitlist.js [output-file.csv]
 * Example: node scripts/export-waitlist.js waitlist-export.csv
 */

import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'fs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local');
  process.exit(1);
}

const outputFile = process.argv[2] || 'waitlist-export.csv';

async function exportWaitlist() {
  console.log('🚀 Exporting waitlist data...\n');

  // Create Supabase client with service role
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  // Fetch all signups
  const { data, error } = await supabase
    .from('waitlist_signups')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ Error fetching data:', error.message);
    process.exit(1);
  }

  if (!data || data.length === 0) {
    console.log('⚠️  No waitlist signups found');
    return;
  }

  console.log(`✅ Found ${data.length} signups\n`);

  // Convert to CSV
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape commas and quotes in CSV
        if (value === null || value === undefined) return '';
        const stringValue = String(value);
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      }).join(',')
    )
  ].join('\n');

  // Write to file
  writeFileSync(outputFile, csv, 'utf-8');
  console.log(`💾 Exported to: ${outputFile}`);
  
  // Display summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Export Summary:');
  console.log('='.repeat(50));
  console.log(`Total signups: ${data.length}`);
  
  // Role breakdown
  const roleCounts = data.reduce((acc, signup) => {
    const role = signup.role || 'not specified';
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {});
  
  console.log('\nBy Role:');
  Object.entries(roleCounts).forEach(([role, count]) => {
    console.log(`  ${role}: ${count}`);
  });
  
  // Recent signups
  console.log('\nMost Recent Signups:');
  data.slice(0, 5).forEach((signup, i) => {
    const date = new Date(signup.created_at).toLocaleDateString();
    console.log(`  ${i + 1}. ${signup.email} (${date})`);
  });
  
  console.log('='.repeat(50));
}

// Run export
exportWaitlist().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

