# Deployment Guide

## Prerequisites

- Node.js 20+
- A Supabase project
- A Lingo.dev API key
- A Vercel account (for deployment)
- A GitHub account (for CI/CD)

## Step 1: Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor
3. Run the SQL from `lib/supabase.ts` (the commented section at the bottom)
4. Copy your project URL and keys from Settings → API

## Step 2: Environment Variables

Create `.env.local` with your actual values:

```env
LINGODOTDEV_API_KEY=your_key
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

## Step 3: Translate Documentation

Run the Lingo CLI to generate translations for all documentation:

```bash
npm run translate:docs
```

This creates translated docs in `docs/es/`, `docs/fr/`, `docs/de/`, `docs/ja/`, and `docs/zh/`.

## Step 4: Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add all environment variables in the Vercel dashboard
4. Deploy

## Step 5: GitHub Actions (CI/CD)

1. Go to your GitHub repo → Settings → Secrets and variables → Actions
2. Add secret: `LINGODOTDEV_API_KEY`
3. The workflow in `.github/workflows/translate-docs.yml` will automatically translate docs on every push

## Step 6: Configure Lingo MCP in Cursor

1. Open Cursor Settings → MCP tab
2. Add new MCP server:
   - Name: `Lingo.dev`
   - Command: `npx`
   - Args: `["-y", "lingo.dev", "mcp", "YOUR_API_KEY"]`
3. Restart Cursor
4. Verify the green status indicator

## Production Checklist

- [ ] Supabase tables created with RLS enabled
- [ ] All environment variables set in Vercel
- [ ] Lingo Compiler building translations on deploy
- [ ] Documentation translated via CLI
- [ ] CI/CD workflow tested
- [ ] MCP configured in development environment
- [ ] Demo data generated for showcase
- [ ] All 5 Lingo.dev tools verified working

## Monitoring

After deployment, monitor your application:

- **Vercel Dashboard** — Deployment logs and analytics
- **Supabase Dashboard** — Database monitoring and logs
- **GitHub Actions** — CI/CD pipeline status
