# How I Built a Multilingual DevOps Monitoring Dashboard Using All 5 Lingo.dev Tools

> Submitted for the Lingo.dev Hackathon (Feb 2026) — Side Quest Article

---

## The Problem That Started It All

Imagine this: it's 2 AM, your production database is throwing connection errors, and your on-call engineer in Tokyo is staring at a wall of English log messages they can barely read fast enough to debug. Every second of confusion is seconds added to your MTTR (Mean Time To Resolve). Every mistranslated alert is a potential missed incident.

This isn't hypothetical. DevOps is a global discipline. Teams at companies like Toyota, Samsung, and Alibaba run infrastructure that spans continents — and the tools they use every day (Grafana, Datadog, PagerDuty) are built almost exclusively in English. The assumption baked into almost every monitoring tool is: *your engineers speak English natively, or well enough that it doesn't slow them down.*

That assumption is wrong, and it's costing teams real time.

That's the problem I wanted to solve when I joined the Lingo.dev Hackathon: **What if your DevOps dashboard could speak every engineer's native language, in real time?**

---

## What I Built: GlobalOps

**GlobalOps** is a real-time DevOps monitoring dashboard that delivers a fully multilingual experience across 6 languages (English, Spanish, French, German, Japanese, and Chinese). It's not just a translated UI — the *data itself* is translated: log messages, alert descriptions, AI-generated insights. Everything.

**[Live Demo →](https://global-ops-dev-ops-monitoring-multi.vercel.app)**
**[GitHub →](https://github.com/fortuner6023/GlobalOps_DevOps_Monitoring_Multilingual)**

Here's what it does:

- **Real-time log streaming** — Live logs via Supabase Realtime subscriptions, filterable by severity level and service
- **Multilingual alert management** — Create, acknowledge, and resolve alerts in any language
- **AI-powered insights** — Pattern detection and recommendations, delivered in the user's language
- **Translated documentation** — Markdown docs in all 6 languages, served from `docs/[locale]/`
- **Smart translation caching** — Supabase-backed cache so the same log isn't translated twice
- **CSV export** — Engineers can pull logs in their language and share them

The tech stack: **Next.js 15** (App Router), **Supabase** (PostgreSQL + Realtime), **shadcn/ui**, **Tailwind CSS 4**, **TypeScript**, and the entire **Lingo.dev ecosystem**.

---

## Why Lingo.dev Was the Right Tool

Before this hackathon, I had looked at i18next, next-intl, and a few other localization libraries. They all share the same fundamental model: *you write translation JSON files, you manage them manually, and you hope nothing falls out of sync.*

That model breaks in three places:

1. **Dynamic content** — Log messages and alerts aren't known at build time. You can't pre-translate `"Database connection pool exhausted after 847 requests from service api-gateway"`.
2. **Maintenance overhead** — Every new string needs a manual entry in 5 JSON files. In a fast-moving codebase, things get missed.
3. **Documentation** — Markdown docs are a completely different problem that JSON files don't even touch.

Lingo.dev has a different philosophy: *translation should be automatic and invisible.* I used all 5 of their tools, and each one solved a specific layer of the problem.

---

## How Each Lingo.dev Tool Solved a Specific Layer

### 1. Lingo Compiler — The UI "Just Works"

The first thing I set up was the **Lingo Compiler** in `next.config.ts`:

```typescript
const { withLingo } = require("@lingo.dev/compiler/next");

finalConfig = withLingo(nextConfig, {
  sourceRoot: "./app",
  sourceLocale: "en",
  targetLocales: ["es", "fr", "de", "ja", "zh"],
  models: "lingo.dev",
});
```

This single wrapper translates the *entire Next.js app* at build time. Every button label, nav item, heading, empty state message — translated automatically. I didn't write a single translation JSON key for the UI. I just built the app in English and the Compiler handled the rest.

The magic: when a user switches to Spanish, the Compiler-translated bundles swap in. "Dashboard" becomes "Panel", "Generate Demo Logs" becomes "Generar registros de demostración", "New Alert" becomes "Nueva alerta". All without me touching a single translation file.

**Time saved: probably 8–10 hours** that I would have spent writing and maintaining JSON files.

### 2. Lingo SDK — Translating the Live Data

The Compiler handles static UI text, but **log messages are dynamic**. A log entry like `"SSL certificate verification failed for api.globalops.dev"` doesn't exist at build time — it's generated at runtime.

That's where the **Lingo SDK** comes in (`lib/lingo.ts`):

```typescript
import { LingoDotDevEngine } from "lingo.dev/sdk";

const lingo = new LingoDotDevEngine({
  apiKey: process.env.LINGODOTDEV_API_KEY!,
});

export async function translateLog(log: Log, targetLocale: string): Promise<Log> {
  const cached = await getCachedTranslation(log.id, "log", targetLocale);
  if (cached) return { ...log, message: cached };

  const result = await lingo.localizeObject(
    { message: log.message },
    { sourceLocale: "en", targetLocale }
  );

  // Cache in Supabase — never translate the same log twice
  setCachedTranslation(log.id, "log", "en", targetLocale, log.message, result.message);

  return { ...log, message: result.message };
}
```

The key insight here is the **translation cache**. The first time a log entry is translated, it goes to the Lingo API. Every subsequent request for that same log in that language is served from Supabase. This means:
- Zero redundant API calls
- Sub-millisecond cache hits
- Translation costs that don't scale linearly with traffic

The same pattern applies to alerts — both the `title` and `description` are translated together in a single API call using `localizeObject`.

### 3. Lingo CLI — The Documentation Problem, Solved

Documentation is the part of localization that teams almost always skip because it's so painful. Markdown files aren't JSON — they have structure, code blocks, headings, and links that need to be preserved while only the prose gets translated.

I configured the **Lingo CLI** with a simple `i18n.json`:

```json
{
  "version": "1.12",
  "locale": { "source": "en", "targets": ["es", "fr", "de", "ja", "zh"] },
  "buckets": {
    "markdown": {
      "include": ["docs/[locale]/*.md"]
    }
  }
}
```

One command translates all 3 docs files into 5 languages:

```bash
npm run translate:docs
```

Output: 15 translated markdown files (`docs/es/`, `docs/fr/`, `docs/de/`, `docs/ja/`, `docs/zh/`), each with correct code blocks, preserved links, and natural-sounding prose in each language. The German deployment guide actually reads like a German technical document, not a machine translation.

### 4. Lingo CI/CD — Translations That Never Fall Behind

The one problem with running translations manually is that you forget. A developer updates `docs/en/getting-started.md`, pushes the commit, and the Spanish version goes stale for two weeks until someone notices.

The **Lingo CI/CD** integration fixes this permanently (`.github/workflows/translate-docs.yml`):

```yaml
name: Translate Documentation
on:
  push:
    paths: ["docs/en/**"]
jobs:
  translate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run translate:docs
        env:
          LINGODOTDEV_API_KEY: ${{ secrets.LINGODOTDEV_API_KEY }}
      - run: |
          git config user.email "ci@globalops.dev"
          git config user.name "Lingo CI"
          git add docs/
          git commit -m "chore: auto-translate docs" || exit 0
          git push
```

Every time I push a change to `docs/en/`, the workflow automatically translates and commits the updated files. The translated docs are always in sync with the source. Zero maintenance.

### 5. Lingo MCP — AI That Speaks Your Language

The **Model Context Protocol** integration (`lib/mcp.ts`) connects the dashboard's AI insight system to Cursor, so the AI can analyze your logs and surface recommendations in whatever language the user has selected.

The helper formats logs for MCP consumption:

```typescript
export function formatLogsForMCP(logs: Log[], language: string) {
  return {
    context: `Analyze these DevOps logs and provide insights in ${language}`,
    logs: logs.map(l => `[${l.level}] ${l.service}: ${l.message}`).join("\n"),
  };
}
```

The insight API then translates the result using the SDK, so even AI-generated text arrives in the user's language. A Japanese engineer asking "what's wrong with my database?" gets an answer in Japanese.

---

## The Architecture: How All 5 Tools Fit Together

```
BUILD TIME            RUNTIME               AUTOMATION
─────────────────     ─────────────────     ─────────────────
Lingo Compiler        Lingo SDK             Lingo CI/CD
  ↓                     ↓                     ↓
Translates all UI     Translates dynamic    Auto-translates
text at build time    logs & alerts         docs on every push
                      (with Supabase cache)
                                            Lingo MCP
                      Lingo CLI               ↓
                        ↓                   AI insights in
                      Translates markdown   user's language
                      documentation files
```

Each tool covers a different surface area. Together they create a system where **no English text ever reaches a user who didn't want it**.

---

## What I Learned

**Build-time vs. runtime translation is a real architectural decision.** The Compiler is blazing fast (zero runtime cost) but only works for static text. The SDK is flexible but adds latency — which is why caching is essential. Getting this split right took some thought.

**The [locale] placeholder in i18n.json is everything.** I wasted time with `docs/en/**/*.md` (recursive globs aren't supported) before figuring out that `docs/[locale]/*.md` is both the input pattern AND the output pattern. Once I understood that, everything clicked.

**Windows + Node.js CLI tools need care.** On Windows, `npx lingo.dev run` tries to open `lingo.dev` as a file (the `.dev` extension). I fixed this by creating a small `scripts/translate-docs.js` wrapper that loads `.env.local` and calls `lingo.dev.cmd` directly. This is now documented in the repo.

**Translation caching pays off immediately.** Once a log message is translated and cached in Supabase, every subsequent user viewing that log in that language gets an instant response. At scale, this would cut Lingo API costs dramatically.

---

## The Part That Surprised Me Most

I expected localization to be the boring, mechanical part of the project. It wasn't.

Watching a log message like `"Database connection pool exhausted"` get rendered in Japanese (`「データベース接続プールが枯渇しました」`) — automatically, at runtime, with the right technical terminology — was genuinely exciting. This is what good tooling feels like: the problem disappears so you can focus on the actual product.

Lingo.dev made that possible without any of the usual localization scaffolding. No translation keys. No JSON files. No "remember to update the Spanish translation when you change this string." Just write the code, and the translations follow.

---

## Try It Yourself

**Live demo:** [global-ops-dev-ops-monitoring-multi.vercel.app](https://global-ops-dev-ops-monitoring-multi.vercel.app)

**GitHub:** [github.com/fortuner6023/GlobalOps_DevOps_Monitoring_Multilingual](https://github.com/fortuner6023/GlobalOps_DevOps_Monitoring_Multilingual)

Go to the dashboard, click "Generate Demo Logs" to seed some data, then switch to Japanese or Spanish using the language switcher in the top right. Watch the log messages and alert descriptions change language in real time. That's the Lingo SDK doing its thing.

Then check `docs/ja/getting-started.md` in the repo to see what the Lingo CLI produced. And if you look at the Vercel build logs, you'll see the Compiler running its translation pass over the entire app.

Five tools. One problem. Zero English required.

---

*Built by Naveen Saini for the Lingo.dev Hackathon, February 2026.*
*Tech stack: Next.js 15, Supabase, shadcn/ui, Tailwind CSS 4, TypeScript, Lingo.dev (all 5 tools)*
