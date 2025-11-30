# Waitlist Management Scripts

This folder contains scripts to help you manage your ClearPolicy waitlist data.

## Available Scripts

### 1. `verify-setup.js` - Verify Supabase Configuration

**Purpose**: Check if your Supabase environment is properly set up before migration

**Usage**:
```bash
npm run verify-setup
```

**What it checks**:
- ✅ `.env.local` file exists
- ✅ All required environment variables are set
- ✅ Environment variable formats are correct
- ✅ Supabase connection works
- ✅ `waitlist_signups` table exists
- ✅ All required files are present
- ✅ Migration CSV file is ready (optional)

**Example output**:
```
╔══════════════════════════════════════════════════════════╗
║     ClearPolicy Supabase Setup Verification Tool        ║
╚══════════════════════════════════════════════════════════╝

📁 Checking Environment File...
✅ .env.local file exists

🔑 Checking Environment Variables...
✅ VITE_SUPABASE_URL is set
✅ VITE_SUPABASE_PUBLISHABLE_KEY is set
✅ SUPABASE_URL is set
✅ SUPABASE_SERVICE_ROLE_KEY is set

🔌 Testing Supabase Connection...
✅ Successfully connected to Supabase
✅ waitlist_signups table exists
ℹ️  Current signups in database: 3

✅ SETUP COMPLETE!
```

---

### 2. `import-waitlist.js` - Import Data from CSV

**Purpose**: Import waitlist signups from Lovable Cloud export (or any CSV) into your Supabase database

**Usage**:
```bash
npm run import-waitlist <csv-file>
```

**Example**:
```bash
npm run import-waitlist lovable_waitlist_export.csv
```

**What it does**:
- Reads CSV file
- Validates email addresses
- Checks for duplicates (skips them)
- Imports data to Supabase
- Shows detailed progress and summary

**Expected CSV columns**:
- `email` (required)
- `zip` (optional)
- `role` (optional)
- `use_case` (optional)
- `source` (optional)
- `created_at` (optional)
- `user_agent` (optional)
- `referer` (optional)
- `ip_hash` (optional)

**Example output**:
```
🚀 Starting waitlist import...

📄 Reading CSV file: lovable_waitlist_export.csv
✅ Found 3 records in CSV

✅ Imported: alice@example.com
✅ Imported: bob@example.com
⏭️  Skipped duplicate: charlie@example.com

==================================================
📊 Import Summary:
==================================================
✅ Successfully imported: 2
⏭️  Skipped (duplicates):  1
❌ Errors:                0
==================================================

🎉 Import complete! Check your Supabase dashboard to verify.
```

---

### 3. `export-waitlist.js` - Export Data to CSV

**Purpose**: Export all waitlist signups from your Supabase database to CSV

**Usage**:
```bash
npm run export-waitlist [output-file.csv]
```

**Examples**:
```bash
# Export to default file (waitlist-export.csv)
npm run export-waitlist

# Export to specific file
npm run export-waitlist my-signups.csv

# Export for backup
npm run export-waitlist backup-$(date +%Y%m%d).csv
```

**What it does**:
- Fetches all signups from Supabase
- Exports to CSV with all fields
- Shows analytics summary:
  - Total signups
  - Breakdown by role
  - Most recent signups

**Example output**:
```
🚀 Exporting waitlist data...

✅ Found 47 signups

💾 Exported to: waitlist-export.csv

==================================================
📊 Export Summary:
==================================================
Total signups: 47

By Role:
  voter: 23
  student: 12
  journalist: 5
  nonprofit: 4
  not specified: 3

Most Recent Signups:
  1. newest@example.com (11/27/2025)
  2. recent@example.com (11/26/2025)
  3. earlier@example.com (11/25/2025)
  4. previous@example.com (11/24/2025)
  5. older@example.com (11/23/2025)
==================================================
```

---

## Common Workflows

### Initial Migration from Lovable Cloud

```bash
# 1. Verify your setup is correct
npm run verify-setup

# 2. Export data from Lovable Cloud (manual step)
#    Lovable → Cloud → Database → waitlist_signups → Export CSV
#    Save as: lovable_waitlist_export.csv

# 3. Import the data
npm run import-waitlist lovable_waitlist_export.csv

# 4. Verify import worked
npm run export-waitlist
```

### Regular Backups

```bash
# Create backup with timestamp
npm run export-waitlist "backups/waitlist-$(date +%Y%m%d-%H%M%S).csv"

# Or use simple date
npm run export-waitlist "backup-$(date +%Y%m%d).csv"
```

### Checking Your Data

```bash
# Export and review in spreadsheet
npm run export-waitlist latest.csv
open latest.csv  # macOS
# or
start latest.csv  # Windows
# or
xdg-open latest.csv  # Linux
```

### Migrating Between Supabase Projects

```bash
# 1. Export from old project
npm run export-waitlist old-project-data.csv

# 2. Update .env.local with new project credentials

# 3. Verify new setup
npm run verify-setup

# 4. Import to new project
npm run import-waitlist old-project-data.csv
```

---

## Prerequisites

All scripts require:

1. **Environment Variables** (in `.env.local`):
   ```env
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJ...
   ```

2. **Dependencies** (install with `npm install`):
   - `@supabase/supabase-js`
   - `dotenv`
   - `csv-parse` (for import script)

---

## Troubleshooting

### "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set"

**Solution**: Create `.env.local` file in project root with your Supabase credentials.

See `QUICK_START.md` for instructions on getting these values.

### "Error fetching data" or "Error importing"

**Solution**: 
1. Run `npm run verify-setup` to diagnose the issue
2. Check your Supabase project is active
3. Verify service role key has correct permissions
4. Check Supabase logs: Dashboard → Logs

### "No such file or directory"

**Solution**: Make sure you're running the script from the project root directory:
```bash
cd /path/to/clear-civic-reads
npm run import-waitlist lovable_waitlist_export.csv
```

### Import shows all duplicates

**Solution**: This means the data is already imported! You can:
- Check with: `npm run export-waitlist`
- Or view in Supabase dashboard: Table Editor → waitlist_signups

---

## Advanced Usage

### Direct Script Execution

You can also run scripts directly (without npm):

```bash
node scripts/verify-setup.js
node scripts/import-waitlist.js data.csv
node scripts/export-waitlist.js output.csv
```

### Using with Multiple Environments

Create multiple env files:

```bash
# Development
.env.local.dev

# Production
.env.local.prod

# Use specific env
dotenv -e .env.local.prod -- node scripts/export-waitlist.js
```

### Automated Backups

Add to cron (Linux/Mac):

```bash
# Daily backup at 2 AM
0 2 * * * cd /path/to/clear-civic-reads && npm run export-waitlist "backups/auto-$(date +\%Y\%m\%d).csv"
```

---

## Security Notes

⚠️ **Important Security Considerations**:

1. **Never commit `.env.local`** - it's already in `.gitignore`
2. **Keep service role key secret** - it has admin access to your database
3. **CSV exports contain user data** - handle with care
4. **Add `backups/` to `.gitignore`** if storing backups locally

Example `.gitignore` additions:
```
.env.local
*.csv
backups/
```

---

## Support

For more detailed instructions, see:
- `QUICK_START.md` - Quick start guide for migration
- `MIGRATION_GUIDE.md` - Comprehensive migration documentation

For Supabase-specific help:
- [Supabase Docs](https://supabase.com/docs)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli)

