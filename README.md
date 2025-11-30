# Welcome to your Lovable project

## 🎯 New: Waitlist Data Access

**Looking for your waitlist signups?** → See [START_HERE.md](./START_HERE.md) 📍

I've created a complete toolkit to help you access and manage your waitlist data, including migration tools to move from Lovable Cloud to your own Supabase instance.

## Project info

**URL**: https://lovable.dev/projects/6a1efb2e-eb01-4968-993c-894041b92be8

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/6a1efb2e-eb01-4968-993c-894041b92be8) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/6a1efb2e-eb01-4968-993c-894041b92be8) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Waitlist Management

This project includes a waitlist signup system powered by Supabase.

### Current Setup

Your waitlist currently uses **Lovable Cloud** (managed Supabase infrastructure). Signups are accessible through:
- Lovable Cloud panel: Cloud → Database → waitlist_signups

### Migrating to Your Own Supabase (Recommended)

For full data access and control, you can migrate to your own Supabase instance.

**Quick Start**: See [QUICK_START.md](./QUICK_START.md) for step-by-step instructions.

**Benefits**:
- ✅ Full database access via Supabase dashboard
- ✅ Direct SQL queries and exports
- ✅ Complete data ownership
- ✅ Access to advanced Supabase features

**Available Commands**:
```bash
# Verify your setup is correct
npm run verify-setup

# Import waitlist data from CSV
npm run import-waitlist <csv-file>

# Export waitlist data to CSV
npm run export-waitlist [output-file]
```

**Documentation**:
- [QUICK_START.md](./QUICK_START.md) - Quick migration guide (⚡ start here)
- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - Comprehensive documentation
- [scripts/README.md](./scripts/README.md) - Detailed script documentation

### Accessing Waitlist Data

**Via Lovable Cloud** (current):
1. Go to your Lovable project
2. Navigate to: Cloud → Database → waitlist_signups
3. View/export data directly

**After Migration to Supabase**:
1. Supabase Dashboard: Table Editor → waitlist_signups
2. SQL Editor: Run custom queries
3. Export scripts: `npm run export-waitlist`
