# GlobalOps — DevOps Monitoring In Every Language

> Built for the [Lingo.dev Hackathon](https://lingo.dev) (Feb 2026)

A real-time DevOps monitoring dashboard that integrates **all 5 Lingo.dev translation tools** to deliver a fully multilingual experience across 6 languages. Built with Next.js 16, Supabase, and shadcn/ui.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?logo=vercel)](https://global-ops-dev-ops-monitoring-multi.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-fortuner6023-181717?logo=github)](https://github.com/fortuner6023/GlobalOps_DevOps_Monitoring_Multilingual)
[![Article](https://img.shields.io/badge/Article-Hashnode-2962FF?logo=hashnode)](https://blog.unicornfortunes.com/how-i-built-a-multilingual-devops-dashboard-with-all-5-lingo-dev-tools)
[![Lingo.dev](https://img.shields.io/badge/Powered%20by-Lingo.dev-blue)](https://lingo.dev)

---

## Live Demo

**[https://global-ops-dev-ops-monitoring-multi.vercel.app](https://global-ops-dev-ops-monitoring-multi.vercel.app)**

| Page | URL | Description |
|------|-----|-------------|
| 🏠 Landing | [/](https://global-ops-dev-ops-monitoring-multi.vercel.app/) | Product overview + Lingo.dev tool showcase |
| 📊 Dashboard | [/dashboard](https://global-ops-dev-ops-monitoring-multi.vercel.app/dashboard) | Real-time stats, logs, and AI insights |
| 📋 Logs | [/logs](https://global-ops-dev-ops-monitoring-multi.vercel.app/logs) | Live log stream with level/service filters + CSV export |
| 🔔 Alerts | [/alerts](https://global-ops-dev-ops-monitoring-multi.vercel.app/alerts) | Alert management with status tracking |
| 💡 Insights | [/insights](https://global-ops-dev-ops-monitoring-multi.vercel.app/insights) | AI-powered log analysis |
| 📖 Docs (EN) | [/docs/en/getting-started](https://global-ops-dev-ops-monitoring-multi.vercel.app/docs/en/getting-started) | English documentation |
| 📖 Docs (FR) | [/docs/fr/getting-started](https://global-ops-dev-ops-monitoring-multi.vercel.app/docs/fr/getting-started) | French documentation (Lingo CLI) |
| 📖 Docs (JA) | [/docs/ja/getting-started](https://global-ops-dev-ops-monitoring-multi.vercel.app/docs/ja/getting-started) | Japanese documentation (Lingo CLI) |

> **Try it:** Select **日本語** or **Français** from the language switcher in the top-right of the dashboard. The entire UI, all log messages, alerts, and AI insights switch language instantly.

---

## What Makes This Special

Most DevOps tools (Grafana, Datadog, PagerDuty) are **English-only**. When a production incident hits at 2 AM and your on-call engineer in Tokyo is staring at English error logs, every second of confusion adds to your MTTR.

GlobalOps solves this by translating everything — not just the UI, but the actual log messages, alert descriptions, and AI insights — using all 5 tools in the Lingo.dev ecosystem.

---

## Lingo.dev Integration (All 5 Tools)

| # | Tool | What it does | Key File |
|---|------|-------------|----------|
| 1 | **[Compiler](https://lingo.dev/compiler)** | Translates the entire Next.js UI at build time — zero runtime overhead | [`next.config.ts`](next.config.ts) |
| 2 | **[CLI](https://lingo.dev/cli)** | Auto-translates all markdown docs into 5 languages | [`i18n.json`](i18n.json) |
| 3 | **[SDK](https://lingo.dev/sdk)** | Runtime translation of dynamic DB content (logs, alerts, insights) | [`lib/lingo.ts`](lib/lingo.ts) |
| 4 | **[CI/CD](https://lingo.dev/cicd)** | GitHub Actions workflow auto-translates docs on every push | [`.github/workflows/translate-docs.yml`](.github/workflows/translate-docs.yml) |
| 5 | **[MCP](https://lingo.dev/mcp)** | AI-powered log analysis insights delivered in the user's language | [`lib/mcp.ts`](lib/mcp.ts) |

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     User's Browser                       │
│   Language Switcher  ──►  locale cookie (en/es/fr/de/ja/zh) │
└─────────────────┬───────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────┐
│                   Next.js 16 App                         │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Lingo Compiler (Tool #1)                        │    │
│  │  All JSX text → translated bundles at build time │    │
│  │  en/es/fr/de/ja/zh ← app/lingo/cache/*.json      │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │  Lingo SDK (Tool #3)          lib/lingo.ts       │    │
│  │  translateLog()  translateAlert()                │    │
│  │  ↓ calls Lingo API ↓                             │    │
│  │  Dynamic DB content translated at request time   │    │
│  └─────────────────────────────────────────────────┘    │
└──────────────────────────────┬──────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────┐
│                    Supabase                              │
│  logs  │  alerts  │  ai_insights  │  translation_cache   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Lingo CLI (Tool #2)  +  CI/CD (Tool #4)                 │
│  docs/en/*.md  ──►  docs/es/ fr/ de/ ja/ zh/             │
│  Triggered automatically on git push via GitHub Actions  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  Lingo MCP (Tool #5)                                     │
│  Cursor IDE → AI insights → user's language              │
└─────────────────────────────────────────────────────────┘
```

---

## Features

- **Real-time Log Streaming** — Live logs via Supabase Realtime subscriptions with 5-second polling fallback
- **Multilingual Everything** — UI, logs, alerts, AI insights — all translated on language switch
- **Multi-language Alert Management** — Create, acknowledge, and resolve alerts in any language
- **AI-Powered Insights** — Intelligent log pattern analysis with multilingual recommendations
- **Auto-translated Documentation** — Markdown docs in 6 languages via Lingo CLI, rendered with react-markdown
- **Translation Caching** — 3-tier cache (in-memory → Supabase) to minimize API calls
- **Log Filters + CSV Export** — Filter by level (ERROR/WARNING/INFO/DEBUG) and service, export to CSV
- **6 Languages** — English 🇺🇸, Spanish 🇪🇸, French 🇫🇷, German 🇩🇪, Japanese 🇯🇵, Chinese 🇨🇳
- **23 Unit Tests** — Mock data generators and utility functions fully tested

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router, TypeScript) |
| Database | Supabase (PostgreSQL + Realtime) |
| Translation | Lingo.dev (all 5 tools) |
| UI | shadcn/ui + Tailwind CSS 4 |
| Testing | Vitest (23 tests) |
| Deployment | Vercel |
| CI/CD | GitHub Actions |

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/fortuner6023/GlobalOps_DevOps_Monitoring_Multilingual.git
cd GlobalOps_DevOps_Monitoring_Multilingual

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

```env
LINGODOTDEV_API_KEY=           # From https://lingo.dev/dashboard
NEXT_PUBLIC_SUPABASE_URL=      # Your Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY= # Supabase anon key
SUPABASE_SERVICE_ROLE_KEY=     # Supabase service role key
```

### Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build (runs Lingo Compiler) |
| `npm test` | Run 23 unit tests |
| `npm run translate:docs` | Translate docs via Lingo CLI |
| `npm run generate:logs` | Seed demo log data |

---

## Project Structure

```
globalops/
├── app/
│   ├── (dashboard)/              # Dashboard pages + shared layout
│   │   ├── layout.tsx            # Nav + language switcher
│   │   ├── dashboard/page.tsx    # Stats + logs + insights
│   │   ├── logs/page.tsx         # Full log stream
│   │   ├── alerts/page.tsx       # Alert management
│   │   ├── insights/page.tsx     # AI insights
│   │   └── docs/[lang]/[slug]/   # Multilingual docs viewer
│   ├── api/                      # API routes (logs, alerts, stats, insights)
│   ├── lingo/cache/              # Lingo Compiler translation cache (6 locales)
│   ├── layout.tsx                # Root layout (reads locale cookie → LingoProvider)
│   └── page.tsx                  # Landing page
├── components/
│   ├── dashboard/                # LogStream, AlertCard, StatsOverview, InsightsPanel
│   └── providers.tsx             # LingoProvider + LanguageProvider
├── lib/
│   ├── lingo.ts                  # SDK translation with 3-tier cache
│   ├── mock-translations.ts      # Pre-translated mock strings (quota-free)
│   ├── language-context.tsx      # React context for language state
│   ├── supabase.ts               # DB client + TypeScript types
│   └── mock-data.ts              # Demo data generators
├── docs/
│   ├── en/                       # English source docs
│   ├── es/ fr/ de/ ja/ zh/       # Auto-translated by Lingo CLI
├── scripts/
│   ├── translate-docs.js         # Windows-compatible Lingo CLI runner
│   └── patch-cache.js            # Manually patch Compiler cache entries
├── .github/workflows/
│   └── translate-docs.yml        # CI/CD: auto-translate on push
├── i18n.json                     # Lingo CLI config
└── next.config.ts                # Lingo Compiler config
```

---

## How Each Lingo.dev Tool Works

### 1. Lingo Compiler — Build-time UI Translation
```ts
// next.config.ts
const { withLingo } = require("@lingo.dev/compiler/next");
export default withLingo(nextConfig, {
  sourceLocale: "en",
  targetLocales: ["es", "fr", "de", "ja", "zh"],
});
```
Wraps the Next.js build. Every JSX text node is hashed, translated, and cached. At runtime, `LingoProvider` serves the correct locale bundle — zero translation overhead per request.

### 2. Lingo CLI — Documentation Translation
```json
// i18n.json
{
  "version": "1.12",
  "locale": { "source": "en", "targets": ["es", "fr", "de", "ja", "zh"] },
  "buckets": [{ "include": ["docs/[locale]/*.md"] }]
}
```
Translates all markdown files in `docs/en/` into 5 language directories.

### 3. Lingo SDK — Runtime Content Translation
```ts
// lib/lingo.ts
const result = await lingoDotDev.localizeObject(
  { message: log.message },
  { sourceLocale: "en", targetLocale: "ja" }
);
```
Translates dynamic database content (log messages, alert text, AI insights) on demand, with a 3-tier cache to minimize API calls.

### 4. Lingo CI/CD — Automated Doc Translation
```yaml
# .github/workflows/translate-docs.yml
- name: Translate docs
  run: npm run translate:docs
```
GitHub Actions automatically runs the Lingo CLI on every push that modifies English docs, committing translations back to the repo.

### 5. Lingo MCP — AI Insights in Any Language
AI-powered log analysis via Cursor IDE's MCP integration. Helper functions in `lib/mcp.ts` format log data for the MCP context, and responses are delivered in the user's selected language.

---

## Deployment

See [docs/en/deployment.md](docs/en/deployment.md) for full deployment instructions.

---

## License

MIT

---

## Acknowledgments

- [Lingo.dev](https://lingo.dev) — The translation platform that made all of this possible
- [Supabase](https://supabase.com) — Real-time database and backend
- [Vercel](https://vercel.com) — Deployment platform
- [Next.js](https://nextjs.org) — The React framework
- [shadcn/ui](https://ui.shadcn.com) — Beautiful UI components