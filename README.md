# GlobalOps — DevOps Monitoring In Every Language

> Built for the [Lingo.dev Hackathon](https://lingo.dev) (Feb 2026)

A real-time DevOps monitoring dashboard that integrates **all 5 Lingo.dev translation tools** to deliver a fully multilingual experience across 6 languages. Built with Next.js 15, Supabase, and shadcn/ui.

## Demo

<!-- TODO: Add live demo link after Vercel deployment -->
<!-- [Live Demo](https://globalops.vercel.app) -->

### Screenshots

| Dashboard | Logs | Alerts |
|-----------|------|--------|
| ![Dashboard](docs/screenshots/dashboard.png) | ![Logs](docs/screenshots/logs.png) | ![Alerts](docs/screenshots/alerts.png) |

| Docs (Markdown Rendering) | Language Switching |
|---------------------------|-------------------|
| ![Docs](docs/screenshots/docs.png) | ![Languages](docs/screenshots/languages.png) |

## Features

- **Real-time Log Streaming** — Live logs via Supabase Realtime subscriptions with polling fallback
- **Multi-language Alert Management** — Create, acknowledge, and resolve alerts in any language
- **AI-Powered Insights** — Intelligent log analysis with multilingual recommendations
- **Auto-translated Documentation** — Markdown docs in 6 languages via Lingo CLI, rendered with react-markdown
- **Translation Caching** — Supabase-backed cache to avoid redundant API calls
- **6 Languages Supported** — English, Spanish, French, German, Japanese, Chinese
- **Dark Mode UI** — Professional, responsive dashboard built with shadcn/ui
- **23 Unit Tests** — Mock data generators and utility functions fully tested

## Lingo.dev Integration (All 5 Tools)

| # | Tool | Purpose | File |
|---|------|---------|------|
| 1 | **Compiler** | Build-time UI translation for entire Next.js app | `next.config.ts` |
| 2 | **CLI** | Translate markdown documentation files | `i18n.json` |
| 3 | **SDK** | Runtime translation of dynamic logs & alerts with caching | `lib/lingo.ts` |
| 4 | **CI/CD** | Auto-translate docs on every git push | `.github/workflows/translate-docs.yml` |
| 5 | **MCP** | AI-powered insights in user's language via Cursor | `lib/mcp.ts` |

## Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Database:** Supabase (PostgreSQL + Realtime subscriptions)
- **Translation:** Lingo.dev (All 5 tools) with translation cache
- **UI:** shadcn/ui + Tailwind CSS 4 + react-markdown
- **Testing:** Vitest (23 tests)
- **Deployment:** Vercel
- **CI/CD:** GitHub Actions

## Quick Start

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/globalops.git
cd globalops

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys
```

### Environment Variables

```env
LINGODOTDEV_API_KEY=        # From https://lingo.dev/dashboard
NEXT_PUBLIC_SUPABASE_URL=   # Your Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=  # Supabase anonymous key
SUPABASE_SERVICE_ROLE_KEY=  # Supabase service role key
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run Tests

```bash
npm test
```

### Generate Demo Data

```bash
npm run generate:logs
```

### Translate Documentation

```bash
npm run translate:docs
```

## Project Structure

```
globalops/
├── app/
│   ├── (dashboard)/          # Dashboard pages with shared layout
│   │   ├── layout.tsx        # Dashboard shell with nav + language switcher
│   │   ├── dashboard/page.tsx # Main dashboard (stats + logs + insights)
│   │   ├── logs/page.tsx     # Full log streaming page
│   │   ├── alerts/page.tsx   # Alert management page
│   │   ├── insights/page.tsx # AI insights page
│   │   └── docs/[lang]/[slug]/page.tsx  # Documentation viewer
│   ├── api/                  # API routes
│   │   ├── logs/route.ts     # Logs CRUD + translation
│   │   ├── alerts/route.ts   # Alerts CRUD + translation
│   │   ├── stats/route.ts    # Dashboard statistics
│   │   └── insights/route.ts # AI insight generation
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Landing page
│   └── globals.css           # Global styles
├── components/
│   ├── dashboard/            # Dashboard-specific components
│   │   ├── LogStream.tsx     # Real-time log display (Supabase Realtime)
│   │   ├── AlertCard.tsx     # Alert card with actions
│   │   ├── StatsOverview.tsx # Statistics grid
│   │   ├── LanguageSwitcher.tsx  # Language dropdown
│   │   └── InsightsPanel.tsx # AI insights display
│   └── ui/                   # Base UI components (shadcn-style)
│       └── markdown.tsx      # Markdown renderer for docs
├── lib/
│   ├── supabase.ts           # DB client + TypeScript types + SQL schema
│   ├── lingo.ts              # Lingo SDK translation functions + cache
│   ├── mcp.ts                # MCP helper functions
│   ├── mock-data.ts          # Mock data generators
│   ├── utils.ts              # Utility functions
│   └── __tests__/            # Unit tests
│       ├── mock-data.test.ts # Mock data generator tests
│       └── utils.test.ts     # Utility function tests
├── docs/en/                  # English documentation
├── scripts/                  # Utility scripts
├── .github/workflows/        # CI/CD pipeline
├── i18n.json                 # Lingo CLI configuration
├── vitest.config.ts          # Test configuration
└── next.config.ts            # Next.js + Lingo Compiler config
```

## How Each Lingo.dev Tool Works

### 1. Lingo Compiler (Build-time)
Wraps the Next.js config to automatically translate all UI text during build. When you run `npm run build`, every string in the app is translated into 5 target languages.

### 2. Lingo CLI (Documentation)
Configured via `i18n.json`, translates all markdown files in `docs/en/` to `docs/es/`, `docs/fr/`, `docs/de/`, `docs/ja/`, and `docs/zh/`.

### 3. Lingo SDK (Runtime)
Functions in `lib/lingo.ts` translate dynamic content (logs, alerts) on-the-fly when users select a non-English language. Results are cached in the `translation_cache` table to avoid redundant API calls.

### 4. Lingo CI/CD (Automation)
GitHub Actions workflow automatically runs `lingo.dev run` on every push that modifies English docs, committing translations back to the repo.

### 5. Lingo MCP (AI Insights)
Configured in Cursor IDE to provide AI-powered log analysis in the user's preferred language. Helper functions in `lib/mcp.ts` format logs for MCP consumption.

## API Documentation

See [docs/en/api-reference.md](docs/en/api-reference.md) for full API documentation.

## Deployment

See [docs/en/deployment.md](docs/en/deployment.md) for deployment instructions.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run translate:docs` | Translate documentation via Lingo CLI |
| `npm run generate:logs` | Generate demo log data |

## License

MIT

## Acknowledgments

- [Lingo.dev](https://lingo.dev) — Translation platform (all 5 tools)
- [Supabase](https://supabase.com) — Backend & Realtime database
- [Vercel](https://vercel.com) — Deployment platform
- [Next.js](https://nextjs.org) — React framework
- [shadcn/ui](https://ui.shadcn.com) — UI components
