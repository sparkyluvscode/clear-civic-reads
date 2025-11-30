# 🎯 Finish Your Supabase Setup - 3 Simple Steps

I've confirmed your Supabase project exists and set everything up. You just need to complete **3 quick copy-paste steps**.

---

## ✅ What's Already Done

- ✅ Found your Supabase project: **ClearPolicy Waitlist**
- ✅ Project URL: `https://ltauqjonpcjjdvbvupae.supabase.co`
- ✅ Project Reference: `ltauqjonpcjjdvbvupae`
- ✅ All migration scripts created
- ✅ All import/export tools ready

---

## 📋 Step 1: Get Your API Keys (2 minutes)

1. Open this URL in your browser:
   **https://supabase.com/dashboard/project/ltauqjonpcjjdvbvupae/settings/api**

2. Scroll down to find:
   - **anon public** key (copy this)
   - **service_role** key (click "Reveal" then copy)

3. Create a file called `.env.local` in the project root with this content:

```
VITE_SUPABASE_URL=https://ltauqjonpcjjdvbvupae.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<paste-your-anon-key-here>
SUPABASE_URL=https://ltauqjonpcjjdvbvupae.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<paste-your-service-role-key-here>
RESEND_API_KEY=<your-resend-key-if-you-have-one>
```

Replace the `<paste-...>` parts with your actual keys.

---

## 📋 Step 2: Create the Database Table (1 minute)

1. Open this URL:
   **https://supabase.com/dashboard/project/ltauqjonpcjjdvbvupae/sql/new**

2. Copy and paste this entire SQL:

```sql
-- Create waitlist_signups table
CREATE TABLE public.waitlist_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  zip TEXT,
  role TEXT,
  use_case TEXT,
  source TEXT DEFAULT 'direct',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_agent TEXT,
  referer TEXT,
  ip_hash TEXT,
  CONSTRAINT email_lowercase CHECK (email = LOWER(email))
);

-- Enable RLS (but make it publicly writable for signups)
ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (signup)
CREATE POLICY "Anyone can sign up for waitlist"
ON public.waitlist_signups
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated users (admins) can view signups
CREATE POLICY "Authenticated users can view waitlist"
ON public.waitlist_signups
FOR SELECT
TO authenticated
USING (true);

-- Create index for faster lookups
CREATE INDEX idx_waitlist_email ON public.waitlist_signups(email);
CREATE INDEX idx_waitlist_created_at ON public.waitlist_signups(created_at DESC);
```

3. Click the green **"Run"** button (or press Cmd+Enter)

4. You should see "Success" message

---

## 📋 Step 3: Export & Import Your Data (2 minutes)

### Export from Lovable Cloud:
1. Go to your Lovable project
2. Click **Cloud** → **Database** → **waitlist_signups**
3. Click **Export CSV**
4. Save the file as `lovable_waitlist_export.csv` in this project folder

### Import to Your Supabase:
Run this command in terminal:

```bash
cd /Users/pranilraichura/ClearPolicy_Waitlist/clear-civic-reads
npm run import-waitlist lovable_waitlist_export.csv
```

---

## ✅ Verify It Worked

Run this to check everything is set up correctly:

```bash
npm run verify-setup
```

If successful, you'll see:
```
✅ SETUP COMPLETE!
Your environment is properly configured.
```

---

## 🎉 That's It!

Your waitlist is now running on your own Supabase instance!

**What you now have:**
- ✅ Full database access at supabase.com/dashboard
- ✅ Direct SQL queries
- ✅ Your 3 signups imported
- ✅ Export tools: `npm run export-waitlist`
- ✅ Complete data ownership

**To view your data:**
- Go to: https://supabase.com/dashboard/project/ltauqjonpcjjdvbvupae/editor
- Click on `waitlist_signups` table
- All your signups are there!

---

## ⚠️ Troubleshooting

### "SUPABASE_URL is not set" error
Make sure `.env.local` exists and has the correct values. The file should be in the project root folder.

### SQL "already exists" error
The table was already created. This is fine - you can skip Step 2.

### Import shows "0 imported"
Make sure the CSV file is in the project folder and named correctly.

### Need Help?
Run `npm run verify-setup` - it will diagnose any issues.

---

## 📍 Quick Links

- **Supabase Dashboard**: https://supabase.com/dashboard/project/ltauqjonpcjjdvbvupae
- **API Settings (get keys)**: https://supabase.com/dashboard/project/ltauqjonpcjjdvbvupae/settings/api
- **SQL Editor**: https://supabase.com/dashboard/project/ltauqjonpcjjdvbvupae/sql/new
- **Table Editor**: https://supabase.com/dashboard/project/ltauqjonpcjjdvbvupae/editor

