#!/usr/bin/env node

/**
 * Verify Supabase Setup
 * 
 * This script checks if your Supabase environment is properly configured
 * Run before attempting migration to catch any issues early
 * 
 * Usage: node scripts/verify-setup.js
 */

import { createClient } from '@supabase/supabase-js';
import { existsSync } from 'fs';
import dotenv from 'dotenv';

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  bold: '\x1b[1m',
};

function success(msg) {
  console.log(`${colors.green}✅ ${msg}${colors.reset}`);
}

function error(msg) {
  console.log(`${colors.red}❌ ${msg}${colors.reset}`);
}

function warning(msg) {
  console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`);
}

function info(msg) {
  console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`);
}

function header(msg) {
  console.log(`\n${colors.bold}${colors.blue}${msg}${colors.reset}`);
}

async function verifySetup() {
  console.log(`${colors.bold}
╔══════════════════════════════════════════════════════════╗
║     ClearPolicy Supabase Setup Verification Tool        ║
╚══════════════════════════════════════════════════════════╝
${colors.reset}`);

  let hasErrors = false;

  // Check 1: .env.local exists
  header('📁 Checking Environment File...');
  if (existsSync('.env.local')) {
    success('.env.local file exists');
    dotenv.config({ path: '.env.local' });
  } else {
    error('.env.local file not found');
    info('Create .env.local with your Supabase credentials');
    info('See QUICK_START.md for instructions');
    hasErrors = true;
  }

  // Check 2: Environment variables
  header('🔑 Checking Environment Variables...');
  
  const requiredVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_PUBLISHABLE_KEY',
    'SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
  ];

  const optionalVars = ['RESEND_API_KEY'];

  for (const varName of requiredVars) {
    if (process.env[varName]) {
      success(`${varName} is set`);
      
      // Validate format
      if (varName.includes('URL')) {
        if (process.env[varName].startsWith('https://') && 
            process.env[varName].includes('supabase.co')) {
          info(`  Format looks correct: ${process.env[varName]}`);
        } else {
          warning(`  URL format may be incorrect: ${process.env[varName]}`);
          info(`  Expected format: https://xxxxx.supabase.co`);
        }
      } else if (varName.includes('KEY')) {
        if (process.env[varName].startsWith('eyJ')) {
          info(`  Format looks correct (JWT token)`);
        } else {
          warning(`  Key format may be incorrect (should start with "eyJ")`);
        }
      }
    } else {
      error(`${varName} is not set`);
      hasErrors = true;
    }
  }

  for (const varName of optionalVars) {
    if (process.env[varName]) {
      success(`${varName} is set (optional)`);
    } else {
      warning(`${varName} is not set (optional - needed for emails)`);
    }
  }

  // Check 3: Supabase connection
  header('🔌 Testing Supabase Connection...');
  
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      // Test connection by checking if table exists
      const { data, error: tableError } = await supabase
        .from('waitlist_signups')
        .select('id')
        .limit(1);

      if (tableError) {
        if (tableError.code === '42P01') {
          error('waitlist_signups table does not exist');
          info('Run the SQL migration in Supabase SQL Editor');
          info('File: supabase/migrations/20251104022408_*.sql');
          hasErrors = true;
        } else {
          error(`Database error: ${tableError.message}`);
          hasErrors = true;
        }
      } else {
        success('Successfully connected to Supabase');
        success('waitlist_signups table exists');
        
        // Get count
        const { count, error: countError } = await supabase
          .from('waitlist_signups')
          .select('*', { count: 'exact', head: true });
        
        if (!countError) {
          info(`  Current signups in database: ${count || 0}`);
        }
      }
    } catch (err) {
      error(`Connection failed: ${err.message}`);
      hasErrors = true;
    }
  } else {
    warning('Skipping connection test (credentials not set)');
  }

  // Check 4: Required files
  header('📄 Checking Required Files...');
  
  const requiredFiles = [
    'supabase/functions/waitlist-signup/index.ts',
    'supabase/migrations/20251104022408_f20fcde7-0212-4c75-9ab5-30bd9e27ee38.sql',
    'scripts/import-waitlist.js',
    'scripts/export-waitlist.js',
  ];

  for (const file of requiredFiles) {
    if (existsSync(file)) {
      success(`${file} exists`);
    } else {
      error(`${file} not found`);
      hasErrors = true;
    }
  }

  // Check 5: Migration file (CSV)
  header('📊 Checking Migration Data...');
  
  const csvFile = 'lovable_waitlist_export.csv';
  if (existsSync(csvFile)) {
    success(`${csvFile} found - ready to import`);
  } else {
    warning(`${csvFile} not found`);
    info('Export your data from Lovable Cloud → Database → Export CSV');
  }

  // Summary
  console.log(`\n${colors.bold}${'='.repeat(60)}${colors.reset}`);
  
  if (hasErrors) {
    console.log(`${colors.red}${colors.bold}❌ SETUP INCOMPLETE${colors.reset}`);
    console.log(`\n${colors.yellow}Please fix the errors above before proceeding.${colors.reset}`);
    console.log(`${colors.blue}See QUICK_START.md for detailed instructions.${colors.reset}\n`);
    process.exit(1);
  } else {
    console.log(`${colors.green}${colors.bold}✅ SETUP COMPLETE!${colors.reset}`);
    console.log(`\n${colors.green}Your environment is properly configured.${colors.reset}`);
    console.log(`${colors.blue}You're ready to import your waitlist data!${colors.reset}\n`);
    
    if (existsSync('lovable_waitlist_export.csv')) {
      console.log(`${colors.bold}Next step:${colors.reset}`);
      console.log(`  npm run import-waitlist lovable_waitlist_export.csv\n`);
    } else {
      console.log(`${colors.bold}Next step:${colors.reset}`);
      console.log(`  1. Export data from Lovable Cloud`);
      console.log(`  2. Save as: lovable_waitlist_export.csv`);
      console.log(`  3. Run: npm run import-waitlist lovable_waitlist_export.csv\n`);
    }
  }
}

// Run verification
verifySetup().catch((error) => {
  console.error(`${colors.red}${colors.bold}❌ Fatal error:${colors.reset}`, error);
  process.exit(1);
});

