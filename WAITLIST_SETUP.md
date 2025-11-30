# ClearPolicy Waitlist - Complete Setup Guide

## 📍 Current Status

Your ClearPolicy waitlist is **currently active** and running on **Lovable Cloud**.

### Where Your Data Lives Right Now

**Lovable Cloud** (Managed Supabase)
- 🗄️ **Database**: Lovable's managed Supabase infrastructure
- 📊 **Access**: Lovable Cloud Panel → Database → waitlist_signups
- 💾 **Current signups**: 3 signups
- 📤 **Export**: Available via "Export CSV" button in Lovable Cloud

### How Signups Work

1. User fills form at `/waitlist` page
2. Data submitted to Supabase Edge Function `waitlist-signup`
3. Stored in `waitlist_signups` table (in Lovable Cloud)
4. Confirmation email sent via Resend
5. User sees success message

## 🎯 Your Options

### Option 1: Keep Using Lovable Cloud (Current Setup)

**Pros:**
- ✅ Already set up and working
- ✅ Zero maintenance required
- ✅ Included in Lovable subscription
- ✅ Access via Lovable dashboard

**Cons:**
- ❌ Limited direct database access
- ❌ No custom SQL queries
- ❌ Export requires manual CSV downloads
- ❌ Tied to Lovable ecosystem

**Best for:** Quick MVP, testing, or if you prefer managed solutions

**How to access data:**
1. Go to [Lovable Project](https://lovable.dev/projects/6a1efb2e-eb01-4968-993c-894041b92be8)
2. Navigate to: Cloud → Database → waitlist_signups
3. Click "Export CSV" for backups

---

### Option 2: Migrate to Your Own Supabase (Recommended) ⭐

**Pros:**
- ✅ Full database control
- ✅ Direct SQL access
- ✅ Programmatic exports
- ✅ Advanced Supabase features
- ✅ Data independence
- ✅ Free tier available (up to 500MB)

**Cons:**
- ⚠️ Requires one-time setup (~30 minutes)
- ⚠️ You manage your own Supabase project

**Best for:** Production apps, data ownership, advanced analytics

**Quick Start:** [QUICK_START.md](./QUICK_START.md) (step-by-step guide)

## 🚀 How to Migrate to Your Own Supabase

I've created everything you need for a smooth migration:

### 📚 Documentation Created

1. **[QUICK_START.md](./QUICK_START.md)** ⚡ START HERE
   - Step-by-step migration guide
   - TL;DR quick commands
   - Troubleshooting tips

2. **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)**
   - Comprehensive documentation
   - Detailed explanations
   - Cost comparison
   - Rollback plan

3. **[scripts/README.md](./scripts/README.md)**
   - Complete script documentation
   - Common workflows
   - Advanced usage

### 🛠️ Tools Created

All scripts are ready to use with npm commands:

#### 1. Setup Verification
```bash
npm run verify-setup
```
Checks if your environment is properly configured before migration.

#### 2. Import Waitlist Data
```bash
npm run import-waitlist <csv-file>
```
Imports your 3 existing signups from Lovable Cloud export.

#### 3. Export Waitlist Data
```bash
npm run export-waitlist [filename]
```
Exports all signups to CSV with analytics summary.

### 📋 Migration Checklist

Follow [QUICK_START.md](./QUICK_START.md), but here's the high-level flow:

- [ ] **Step 1**: Export data from Lovable Cloud (3 signups)
- [ ] **Step 2**: Create new Supabase project
- [ ] **Step 3**: Get Supabase credentials
- [ ] **Step 4**: Create `.env.local` with credentials
- [ ] **Step 5**: Run database migration SQL
- [ ] **Step 6**: Deploy edge function
- [ ] **Step 7**: Verify setup: `npm run verify-setup`
- [ ] **Step 8**: Import data: `npm run import-waitlist lovable_waitlist_export.csv`
- [ ] **Step 9**: Test signup locally
- [ ] **Step 10**: Deploy to production

**Estimated time**: 30-45 minutes

## 📊 Database Schema

Your `waitlist_signups` table includes:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `email` | TEXT | User email (unique) |
| `zip` | TEXT | ZIP code (optional) |
| `role` | TEXT | User role (voter, student, etc.) |
| `use_case` | TEXT | How they'll use ClearPolicy |
| `source` | TEXT | Signup source/campaign |
| `created_at` | TIMESTAMP | When they signed up |
| `user_agent` | TEXT | Browser info |
| `referer` | TEXT | Where they came from |
| `ip_hash` | TEXT | Hashed IP for analytics |

## 🔐 Security Notes

Your waitlist has several security measures:

1. **Rate Limiting**: 5 signups per hour per IP
2. **Email Validation**: Server-side validation
3. **Duplicate Prevention**: Unique email constraint
4. **RLS Policies**: Row Level Security enabled
5. **IP Hashing**: IPs are hashed for privacy

## 📧 Email Confirmations

Confirmation emails are sent via **Resend** after signup.

Current email includes:
- Welcome message
- What's next section
- ClearPolicy branding

To customize emails, edit:
`supabase/functions/waitlist-signup/index.ts` (lines 172-206)

## 🎨 Frontend Components

The waitlist UI is built with these components:

- `src/components/waitlist/WaitlistForm.tsx` - Main signup form
- `src/components/waitlist/Hero.tsx` - Hero section
- `src/components/waitlist/HowItWorks.tsx` - Feature showcase
- `src/components/waitlist/FAQSection.tsx` - FAQ
- `src/pages/Waitlist.tsx` - Complete waitlist page

## 📈 Analytics & Insights

### Current Signups (as of migration)
- **Total**: 3 signups
- **Location**: Stored in Lovable Cloud

### After Migration, you can query:

```sql
-- Total signups
SELECT COUNT(*) FROM waitlist_signups;

-- Signups by role
SELECT role, COUNT(*) 
FROM waitlist_signups 
GROUP BY role 
ORDER BY COUNT(*) DESC;

-- Recent signups (last 7 days)
SELECT email, created_at, role 
FROM waitlist_signups 
WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;

-- Geographic distribution
SELECT zip, COUNT(*) 
FROM waitlist_signups 
WHERE zip IS NOT NULL 
GROUP BY zip 
ORDER BY COUNT(*) DESC;

-- Growth over time
SELECT 
  DATE_TRUNC('day', created_at) as day,
  COUNT(*) as signups
FROM waitlist_signups
GROUP BY day
ORDER BY day;
```

## 🔄 Backup Strategy

### Current (Lovable Cloud)
Manual CSV exports from Lovable dashboard

### After Migration
Multiple options:

**Automatic backups** (via Supabase):
- Point-in-time recovery (paid plans)
- Daily automated backups

**Manual backups** (via scripts):
```bash
# Export to CSV with timestamp
npm run export-waitlist backup-$(date +%Y%m%d).csv

# Set up automated daily backup (cron)
0 2 * * * cd /path/to/project && npm run export-waitlist backups/auto-$(date +\%Y\%m\%d).csv
```

## 🆘 Troubleshooting

### "Can't see my signups"

**In Lovable Cloud:**
1. Go to Lovable project
2. Click "Cloud" in sidebar
3. Click "Database"
4. Select "waitlist_signups" table

**After Migration:**
1. Go to supabase.com/dashboard
2. Select your project
3. Table Editor → waitlist_signups

### "Where's my data after migration?"

Your data is in TWO places during migration:
1. **Original**: Still in Lovable Cloud (unchanged)
2. **New**: Copied to your Supabase instance

You can safely keep both or delete from Lovable later.

### "Migration failed"

Run the verification tool:
```bash
npm run verify-setup
```

This will diagnose configuration issues.

See [QUICK_START.md](./QUICK_START.md) troubleshooting section for specific errors.

## 💰 Cost Breakdown

### Lovable Cloud (Current)
- Included in Lovable subscription
- No separate Supabase billing

### Your Own Supabase
**Free Tier** (likely sufficient):
- 500MB database storage
- 50,000 monthly active users
- Unlimited API requests
- 2GB file storage

**Paid Tiers** (if you grow):
- Pro: $25/month (8GB database)
- Team: $599/month (enterprise features)

For a waitlist with thousands of signups, you'll stay free!

## 🎓 Learning Resources

**Supabase:**
- [Supabase Docs](https://supabase.com/docs)
- [Database Guide](https://supabase.com/docs/guides/database)
- [Edge Functions](https://supabase.com/docs/guides/functions)

**This Project:**
- [QUICK_START.md](./QUICK_START.md) - Migration guide
- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - Detailed docs
- [scripts/README.md](./scripts/README.md) - Script docs

## 🎯 Next Steps

### If Staying on Lovable Cloud
✅ You're all set! Access data via Lovable dashboard.

### If Migrating to Your Own Supabase
1. 📖 Read [QUICK_START.md](./QUICK_START.md)
2. ⚙️ Follow the 10-step migration process
3. ✅ Run `npm run verify-setup` to check progress
4. 🎉 Enjoy full database control!

## 🤝 Support

Questions or issues?

1. Check documentation:
   - [QUICK_START.md](./QUICK_START.md)
   - [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
   - [scripts/README.md](./scripts/README.md)

2. Run diagnostics:
   ```bash
   npm run verify-setup
   ```

3. Check logs:
   - Supabase: Database → Logs
   - Edge Function: Edge Functions → Logs

---

**Created**: November 2025  
**Project**: ClearPolicy Waitlist  
**Tech Stack**: React + Vite + Supabase + Resend  
**Current Signups**: 3  
**Status**: Active on Lovable Cloud

