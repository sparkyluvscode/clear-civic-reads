# Migration Guide: Lovable Cloud → Own Supabase Instance

This guide will help you migrate from Lovable Cloud's managed Supabase to your own Supabase project for full control of your data.

## Why Migrate?

- **Full Database Access**: Direct SQL access, custom queries, and database management
- **Data Ownership**: Complete control over your data and infrastructure
- **Cost Control**: Transparent pricing directly from Supabase
- **Advanced Features**: Access to Supabase features not exposed through Lovable Cloud

## Prerequisites

- Supabase account (you already have one at supabase.com)
- Access to Lovable Cloud panel to export current data
- Node.js/npm installed for running migration scripts

## Step-by-Step Migration

### Step 1: Export Current Waitlist Data from Lovable Cloud

1. Go to your Lovable project → **Cloud** → **Database** → **waitlist_signups**
2. Click **Export CSV** to download your current 3 signups
3. Save the file as `lovable_waitlist_export.csv` in this project directory

### Step 2: Create New Supabase Project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Create a new project in your **ClearPolicy** organization:
   - Name: `ClearPolicy Waitlist` (or your preference)
   - Database Password: Choose a strong password (save it securely!)
   - Region: Choose closest to your users (e.g., `us-west-1` for California)
3. Wait for project to finish setting up (~2 minutes)

### Step 3: Set Up Database Schema

1. In your new Supabase project, go to **SQL Editor**
2. Run the migration file we already have:
   - Copy contents from `supabase/migrations/20251104022408_f20fcde7-0212-4c75-9ab5-30bd9e27ee38.sql`
   - Paste and run in SQL Editor
   - This creates the `waitlist_signups` table with proper security policies

### Step 4: Get Your New Supabase Credentials

From your Supabase project settings:

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...` - keep this secret!)

### Step 5: Update Environment Variables

Create a `.env.local` file in the project root (if it doesn't exist):

```env
# Your new Supabase credentials
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJ...your-anon-key...

# For the edge function (service role)
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...your-service-role-key...

# Resend API key for emails (if you have one)
RESEND_API_KEY=re_...your-resend-key...
```

**Important**: Add `.env.local` to `.gitignore` so secrets don't get committed!

### Step 6: Deploy Edge Function to Your Supabase

Option A: Using Supabase CLI (Recommended)

```bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project (use the project ref from your dashboard URL)
supabase link --project-ref your-project-ref

# Deploy the edge function
supabase functions deploy waitlist-signup

# Set environment variables for the function
supabase secrets set RESEND_API_KEY=your_resend_key
```

Option B: Manual Deployment via Dashboard

1. Go to **Edge Functions** in Supabase dashboard
2. Create new function named `waitlist-signup`
3. Copy/paste code from `supabase/functions/waitlist-signup/index.ts`
4. Set environment variables in function settings

### Step 7: Import Existing Waitlist Data

We'll create a migration script for this. Run:

```bash
node scripts/import-waitlist.js lovable_waitlist_export.csv
```

(Script will be provided in next step)

### Step 8: Test the Migration

1. Start your local dev server: `npm run dev`
2. Go to the waitlist page
3. Submit a test signup with a new email
4. Check your Supabase dashboard → **Table Editor** → **waitlist_signups**
5. Verify the new signup appears

### Step 9: Deploy to Production

Once everything works locally:

1. Update environment variables in your hosting platform (Vercel, Netlify, etc.)
2. Deploy your updated code
3. Test production signup flow

## Rollback Plan

If something goes wrong:

1. Keep your Lovable Cloud export as backup
2. You can always revert environment variables to Lovable Cloud credentials
3. Your original 3 signups are safe in the export file

## Post-Migration Checklist

- [ ] All environment variables updated
- [ ] Edge function deployed and working
- [ ] Test signup completes successfully
- [ ] Confirmation emails are sent
- [ ] All 3 original signups imported correctly
- [ ] Production environment updated and tested
- [ ] `.env.local` added to `.gitignore`
- [ ] Database backups configured in Supabase

## Accessing Your Data After Migration

### Via Supabase Dashboard (Easy)
- Table Editor for browsing data
- SQL Editor for custom queries
- Built-in export tools

### Via Code (Programmatic)
```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role for admin access
)

const { data, error } = await supabase
  .from('waitlist_signups')
  .select('*')
  .order('created_at', { ascending: false })
```

### Via SQL (Advanced)
```sql
-- Get all signups
SELECT * FROM waitlist_signups ORDER BY created_at DESC;

-- Export as CSV (in Supabase SQL Editor)
COPY (SELECT * FROM waitlist_signups) TO STDOUT WITH CSV HEADER;

-- Analytics queries
SELECT 
  role, 
  COUNT(*) as count 
FROM waitlist_signups 
GROUP BY role;
```

## Need Help?

If you encounter issues:
1. Check Supabase logs in **Database** → **Logs**
2. Check Edge Function logs in **Edge Functions** → **Logs**
3. Verify environment variables are correct
4. Make sure database schema was created properly

## Cost Comparison

**Lovable Cloud**: Bundled in Lovable subscription  
**Supabase Free Tier**: 
- 500MB database
- 50,000 monthly active users
- 2GB file storage
- Unlimited API requests

For a waitlist, you'll likely stay within free tier limits!

