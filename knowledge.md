# Project knowledge

GlobalOps — a multilingual real-time DevOps monitoring dashboard built for the Lingo.dev Hackathon. Next.js 16 (App Router), Supabase, shadcn/ui, Tailwind CSS 4, TypeScript.

## Quickstart
- Setup: `npm install` then `cp .env.example .env.local` and fill in API keys
- Dev: `npm run dev` (http://localhost:3000)
- Build: `npm run build`
- Test: `npm test` (Vitest, 23 tests) / `npm run test:watch`
- Lint: `npm run lint` (ESLint)
- Translate docs: `npm run translate:docs` (Lingo CLI)
- Generate demo data: `npm run generate:logs`

## Environment Variables
- `LINGODOTDEV_API_KEY` — Lingo.dev API key
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key

## Architecture
- `app/(dashboard)/` — Dashboard pages (dashboard, logs, alerts, insights, docs) with shared layout
- `app/api/` — API routes (logs, alerts, stats, insights)
- `app/lingo/cache/` — Lingo translation cache JSON files (es, fr, de, ja, zh)
- `components/dashboard/` — Dashboard components (LogStream, AlertCard, StatsOverview, LanguageSwitcher, InsightsPanel)
- `components/ui/` — Base UI components (shadcn-style: button, card, badge, select, spinner, markdown)
- `lib/` — Core utilities: supabase client, lingo SDK translation + cache, MCP helpers, mock data, utils
- `lib/__tests__/` — Vitest unit tests
- `docs/en/` — English markdown docs; translated to es/fr/de/ja/zh via Lingo CLI
- `scripts/` — Utility scripts (generate-fake-logs.ts)
- Path alias: `@/*` maps to project root

## Lingo.dev Integration (5 tools)
1. **Compiler** — Build-time UI translation via `withLingo()` in `next.config.ts`
2. **CLI** — Translates `docs/en/*.md` to 5 languages, configured in `i18n.json`
3. **SDK** — Runtime translation of dynamic content (logs/alerts) in `lib/lingo.ts`, cached in Supabase
4. **CI/CD** — GitHub Actions workflow (`.github/workflows/translate-docs.yml`) auto-translates on push
5. **MCP** — AI-powered insights via `lib/mcp.ts`

## Conventions
- Formatting/linting: ESLint with next config; Tailwind CSS 4 for styling
- UI: shadcn/ui components with Radix primitives; dark mode UI
- State: React Server Components + client components where needed
- Data: Supabase for DB + Realtime subscriptions; mock data fallback in `lib/mock-data.ts`
- Testing: Vitest with `@` path alias; tests live in `lib/__tests__/`
- Package manager: npm
- TypeScript strict mode enabled
- 6 supported languages: en, es, fr, de, ja, zh
