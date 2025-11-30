# Quick Start: Migrate to Your Own Supabase

Follow these steps to migrate from Lovable Cloud to your own Supabase instance.

## ⚡ Quick Start (TL;DR)

```bash
# 1. Install dependencies
npm install

# 2. Export data from Lovable Cloud (manual)
# Go to Lovable → Cloud → Database → waitlist_signups → Export CSV
# Save as: lovable_waitlist_export.csv

# 3. Create Supabase project (manual)
# Go to supabase.com → Create new project

# 4. Create .env.local file with your Supabase credentials
cat > .env.local << 'EOF'
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJ...your-anon-key...
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...your-service-role-key...
RESEND_API_KEY=re_...your-resend-key...
EOF

# 5. Set up database schema (in Supabase SQL Editor)
# Copy and run: supabase/migrations/20251104022408_*.sql

# 6. Deploy edge function
npx supabase login
npx supabase link --project-ref your-project-ref
npx supabase functions deploy waitlist-signup
npx supabase secrets set RESEND_API_KEY=your_key

# 7. Import your data
npm run import-waitlist lovable_waitlist_export.csv

# 8. Test locally
npm run dev

# 9. Export/view data anytime
npm run export-waitlist
```

## 📋 Detailed Steps

### Step 1: Export from Lovable Cloud

1. Log into your Lovable project
2. Go to **Cloud** → **Database** → **waitlist_signups**
3. Click **Export CSV**
4. Save as `lovable_waitlist_export.csv` in the project root

### Step 2: Create Supabase Project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **New Project** in your ClearPolicy organization
3. Fill in:
   - **Name**: ClearPolicy Waitlist
   - **Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to your users
4. Wait for setup (~2 minutes)

### Step 3: Get Supabase Credentials

1. In your new Supabase project, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (`https://xxxxx.supabase.co`)
   - **anon public** key (for frontend)
   - **service_role** key (for backend - keep secret!)

### Step 4: Create Environment File

Create `.env.local` in project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJ...your-anon-key...
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...your-service-role-key...
RESEND_API_KEY=re_...your-resend-key...
```

### Step 5: Set Up Database Schema

1. In Supabase, go to **SQL Editor**
2. Open `supabase/migrations/20251104022408_f20fcde7-0212-4c75-9ab5-30bd9e27ee38.sql` from this project
3. Copy all SQL code
4. Paste into Supabase SQL Editor and click **Run**
5. Verify table created: **Table Editor** → see `waitlist_signups`

### Step 6: Deploy Edge Function

Install Supabase CLI (if needed):
```bash
npm install -g supabase
```

Deploy:
```bash
# Login
npx supabase login

# Link to your project (get project-ref from dashboard URL)
npx supabase link --project-ref your-project-ref

# Deploy function
npx supabase functions deploy waitlist-signup

# Set secrets
npx supabase secrets set RESEND_API_KEY=your_resend_key
```

### Step 7: Import Your Data

```bash
npm install  # If you haven't already
npm run import-waitlist lovable_waitlist_export.csv
```

Expected output:
```
🚀 Starting waitlist import...
📄 Reading CSV file: lovable_waitlist_export.csv
✅ Found 3 records in CSV
✅ Imported: email1@example.com
✅ Imported: email2@example.com
✅ Imported: email3@example.com
==================================================
📊 Import Summary:
==================================================
✅ Successfully imported: 3
⏭️  Skipped (duplicates):  0
❌ Errors:                0
==================================================
```

### Step 8: Test Locally

```bash
npm run dev
```

1. Open http://localhost:5173/waitlist
2. Try submitting a test signup
3. Check Supabase dashboard → **Table Editor** → **waitlist_signups**
4. Verify new signup appears

### Step 9: Verify Everything Works

Check your database:
```bash
npm run export-waitlist
```

This creates `waitlist-export.csv` and shows stats:
```
📊 Export Summary:
Total signups: 4
By Role:
  voter: 2
  student: 1
  not specified: 1
Most Recent Signups:
  1. test@example.com (11/27/2025)
  2. email3@example.com (11/26/2025)
  ...
```

### Step 10: Deploy to Production

1. Update environment variables in your hosting platform:
   - **Vercel**: Settings → Environment Variables
   - **Netlify**: Site settings → Environment variables
2. Deploy your code
3. Test production signup at your live URL

## ✅ Verification Checklist

- [ ] Exported CSV from Lovable Cloud (3 signups)
- [ ] Created new Supabase project
- [ ] Database schema created (waitlist_signups table exists)
- [ ] Environment variables configured in .env.local
- [ ] Edge function deployed successfully
- [ ] Imported all 3 existing signups
- [ ] Test signup works locally
- [ ] Can view data in Supabase dashboard
- [ ] Production environment variables updated
- [ ] Production deployment tested

## 🚀 You're Done!

Your waitlist is now running on your own Supabase instance. You have:

✅ Full database access  
✅ Direct SQL queries  
✅ Complete data ownership  
✅ Export capabilities anytime  
✅ Advanced Supabase features  

## 📊 Managing Your Waitlist

### View signups in Supabase Dashboard
Go to **Table Editor** → **waitlist_signups**

### Export data anytime
```bash
npm run export-waitlist [filename.csv]
```

### Run SQL queries
Go to Supabase **SQL Editor**:

```sql
-- Get all signups
SELECT * FROM waitlist_signups ORDER BY created_at DESC;

-- Count by role
SELECT role, COUNT(*) FROM waitlist_signups GROUP BY role;

-- Recent signups
SELECT email, created_at FROM waitlist_signups 
WHERE created_at > NOW() - INTERVAL '7 days';

-- Export as CSV (in SQL Editor)
COPY (SELECT * FROM waitlist_signups) TO STDOUT WITH CSV HEADER;
```

## 🆘 Troubleshooting

### "SUPABASE_URL is not set"
Make sure `.env.local` exists and has correct values

### "Failed to deploy edge function"
- Check you're logged in: `npx supabase login`
- Check project is linked: `npx supabase link --project-ref your-ref`
- Verify project-ref is correct (from dashboard URL)

### "Duplicate email" errors during import
This is normal - means email already exists. The script skips duplicates automatically.

### Test signup not working
1. Check browser console for errors
2. Check edge function logs in Supabase dashboard
3. Verify environment variables are loaded (restart dev server)

## 📚 Additional Resources

- [Full Migration Guide](./MIGRATION_GUIDE.md) - Detailed documentation
- [Supabase Documentation](https://supabase.com/docs)
- [Edge Functions Docs](https://supabase.com/docs/guides/functions)

## 💡 Need Help?

If you run into issues:
1. Check Supabase **Logs** (Database → Logs)
2. Check Edge Function **Logs** (Edge Functions → waitlist-signup → Logs)
3. Verify all environment variables are correct
4. Test with `npm run export-waitlist` to verify database access

