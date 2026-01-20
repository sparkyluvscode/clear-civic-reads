# ClearPolicy Waitlist (Standalone)

This is the standalone waitlist app for ClearPolicy, intended to be deployed on its own subdomain (recommended): `app.clearpolicy.org`.

## Local development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Deploy on a subdomain (recommended)
This app is designed to be deployed separately from the main site. For `app.clearpolicy.org`, you will:
1. Deploy this repo on your hosting provider (Vercel/Netlify/Cloudflare/GitHub Pages).
2. Point DNS for `app.clearpolicy.org` to that deployment (CNAME or provider-specific instructions).
3. Verify the subdomain serves the app and assets correctly.

### GitHub Pages (current setup)
This repo includes a GitHub Actions workflow that builds the Vite app and deploys it to GitHub Pages on every push to `main`.
- Make sure GitHub Pages is set to **Deploy from GitHub Actions** in repo Settings.
- The custom domain is set via `public/CNAME` (currently `app.clearpolicy.org`).
