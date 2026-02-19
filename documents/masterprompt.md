You are building GlobalOps, a production-ready real-time DevOps monitoring dashboard that MUST integrate ALL 5 Lingo.dev translation tools. This is for a hackathon submission where using all 5 tools is critical for winning.

PROJECT OVERVIEW:
- Real-time log streaming with translation
- Multi-language alert management
- Auto-translated documentation
- AI-powered insights via MCP
- Support 6 languages: en, es, fr, de, ja, zh

TECH STACK:
- Next.js 15 (App Router, TypeScript)
- Supabase (PostgreSQL + Realtime)
- Lingo.dev (ALL 5 tools)
- shadcn/ui + Tailwind CSS
- Vercel deployment

CRITICAL REQUIREMENTS:
1. MUST use ALL 5 Lingo.dev tools (Compiler, CLI, SDK, CI/CD, MCP)
2. Each tool must be clearly demonstrated
3. Production-ready code quality
4. Real-time functionality
5. Clean, professional UI

Follow these steps in order:

═══════════════════════════════════════════════════════════
PHASE 1: PROJECT INITIALIZATION
═══════════════════════════════════════════════════════════

1. Create Next.js 15 project:
   - Use App Router
   - TypeScript
   - Tailwind CSS
   - ESLint

2. Install all dependencies:
   Core:
   - @supabase/supabase-js
   - @supabase/ssr
   - lingo.dev
   - @lingo.dev/compiler
   
   UI:
   - lucide-react
   - date-fns
   - class-variance-authority
   - clsx
   - tailwind-merge
   
   Radix UI (for shadcn):
   - @radix-ui/react-dropdown-menu
   - @radix-ui/react-dialog
   - @radix-ui/react-select
   - @radix-ui/react-tabs
   - @radix-ui/react-slot
   
   Dev:
   - tsx (for scripts)

3. Initialize shadcn/ui:
   - Run: npx shadcn-ui@latest init
   - Settings: Default style, Slate color, CSS variables
   - Add components: button, card, badge, dropdown-menu, dialog, select, tabs

4. Create complete folder structure:

globalops/
├── .github/
│   └── workflows/
│       └── translate-docs.yml          # Lingo CI/CD
├── app/
│   ├── (dashboard)/
│   │   ├── layout.tsx                  # Dashboard shell with nav
│   │   ├── page.tsx                    # Main dashboard
│   │   ├── logs/
│   │   │   └── page.tsx                # Logs page
│   │   ├── alerts/
│   │   │   └── page.tsx                # Alerts page
│   │   ├── insights/
│   │   │   └── page.tsx                # AI insights (MCP)
│   │   └── docs/
│   │       └── [lang]/
│   │           └── [slug]/
│   │               └── page.tsx        # Docs viewer
│   ├── api/
│   │   ├── logs/
│   │   │   └── route.ts                # Logs CRUD + translation
│   │   ├── alerts/
│   │   │   └── route.ts                # Alerts CRUD + translation
│   │   ├── insights/
│   │   │   └── route.ts                # AI insights generation
│   │   └── stats/
│   │       └── route.ts                # Dashboard statistics
│   ├── layout.tsx                      # Root layout
│   ├── page.tsx                        # Landing page
│   └── globals.css
├── components/
│   ├── dashboard/
│   │   ├── LogStream.tsx               # Real-time logs
│   │   ├── AlertCard.tsx               # Alert display
│   │   ├── StatsOverview.tsx           # Stats cards
│   │   ├── LanguageSwitcher.tsx        # Language dropdown
│   │   └── InsightsPanel.tsx           # AI insights display
│   └── ui/                             # shadcn components
├── lib/
│   ├── supabase.ts                     # DB client + types
│   ├── lingo.ts                        # SDK functions
│   ├── mcp.ts                          # MCP helpers
│   └── utils.ts                        # Utilities
├── docs/
│   └── en/
│       ├── getting-started.md
│       ├── api-reference.md
│       └── deployment.md
├── scripts/
│   └── generate-fake-logs.ts           # Demo data
├── .env.local                          # Environment variables
├── .env.local.example                  # Template
├── i18n.json                           # Lingo CLI config
├── next.config.ts                      # Lingo Compiler config
├── components.json                     # shadcn config
└── package.json


═══════════════════════════════════════════════════════════
PHASE 2: LINGO.DEV INTEGRATION (CRITICAL!)
═══════════════════════════════════════════════════════════

🔥 TOOL #1: LINGO COMPILER
Purpose: Translate entire Next.js UI at build time

File: next.config.ts
Requirements:
- Import withLingo from @lingo.dev/compiler/next
- Configure sourceRoot as "./app"
- Set sourceLocale to "en"
- Set targetLocales to ["es", "fr", "de", "ja", "zh"]
- Use models: "lingo.dev"
- Enable usePseudotranslator for dev mode
- Wrap and return the Next.js config

Result: When you run `npm run build`, the entire UI will be translated into 6 languages automatically.

---

🔥 TOOL #2: LINGO CLI
Purpose: Translate documentation files (Markdown)

File: i18n.json
Requirements:
- JSON schema from lingo.dev
- Version 1.10
- Source locale: "en"
- Target locales: ["es", "fr", "de", "ja", "zh"]
- Bucket for documentation:
  - Include: "docs/en/**/*.md"
  - Output: "docs/[locale]"
- Provider: lingo.dev with API key from env

Command to run: npx lingo.dev run

Result: Automatically generates docs/es/, docs/fr/, docs/de/, docs/ja/, docs/zh/ with translated markdown files.

---

🔥 TOOL #3: LINGO SDK
Purpose: Runtime translation of dynamic content (logs, alerts)

File: lib/lingo.ts
Requirements:
- Import LingoDotDevEngine from lingo.dev/sdk
- Initialize with API key from env
- Create functions:
  1. translateText(text, targetLocale, sourceLocale)
  2. translateLog(log, targetLocale, sourceLocale)
  3. translateAlert(alert, targetLocale, sourceLocale)
  4. batchTranslate(items, targetLocale, sourceLocale)
- Each function should:
  - Return original if target === source
  - Use lingoDotDev.localizeObject()
  - Handle errors gracefully
  - Return translated result

Usage: In API routes, call these functions to translate logs/alerts before sending to frontend.

---

🔥 TOOL #4: LINGO CI/CD
Purpose: Auto-translate docs on every git push

File: .github/workflows/translate-docs.yml
Requirements:
- Trigger on push to main branch
- Trigger on changes to docs/en/**/*.md
- Run on ubuntu-latest
- Steps:
  1. Checkout code
  2. Setup Node.js 20
  3. Install lingo.dev CLI globally
  4. Run npx lingo.dev run with API key from secrets
  5. Check for file changes
  6. Commit and push translated files (if changes exist)
  7. Use [skip ci] in commit message to avoid loops
- Configure LINGODOTDEV_API_KEY as GitHub secret

Result: Every time you update English docs and push, GitHub Actions automatically translates and commits the other languages.

---

🔥 TOOL #5: LINGO MCP
Purpose: AI-powered insights in user's language via Cursor

File: lib/mcp.ts
Requirements:
- Create formatLogsForMCP(logs) function
  - Maps logs to simplified format
  - Returns array with message, level, timestamp, service
- Create generateInsightPrompt(logs, language) function
  - Formats prompt for AI analysis
  - Requests insights in target language
  - Asks for patterns, anomalies, recommendations

Setup in Cursor:
- Open Cursor Settings → MCP tab
- Add new MCP server:
  - Name: Lingo.dev
  - Command: npx
  - Args: ["-y", "lingo.dev", "mcp", "YOUR_API_KEY"]
- Restart Cursor
- Verify green status indicator

Usage: When generating insights, use MCP to ask Claude to analyze logs in user's preferred language.

═══════════════════════════════════════════════════════════
PHASE 3: SUPABASE DATABASE SETUP
═══════════════════════════════════════════════════════════

Create lib/supabase.ts with:
- Server-side Supabase client
- Client component client function
- TypeScript interfaces for:
  - Log (id, timestamp, level, service, message, original_language, metadata, stack_trace, created_at)
  - Alert (id, title, description, severity, status, original_language, created_by, created_at, updated_at, resolved_at, metadata)
  - AIInsight (id, insight_type, title, description, severity, related_logs, metadata, language, created_at)
  - DashboardStats (totalLogs, errorCount, warningCount, activeAlerts, criticalAlerts, servicesMonitored)

Database Tables (SQL to run in Supabase):
1. profiles (extends auth.users)
   - id, email, preferred_language, full_name, avatar_url, timestamps

2. logs
   - id, timestamp, level, service, message, original_language, metadata, stack_trace, created_at
   - Indexes on: timestamp, level, service, created_at

3. alerts
   - id, title, description, severity, status, original_language, created_by, assigned_to, timestamps, metadata
   - Indexes on: status, severity, created_at

4. translation_cache (for performance)
   - id, content_type, content_id, source_language, target_language, original_text, translated_text, created_at
   - Unique constraint on (content_id, source_language, target_language, content_type)
   - Index on lookup fields

5. ai_insights
   - id, insight_type, title, description, severity, related_logs, metadata, language, created_at
   - Indexes on: insight_type, created_at

Enable RLS (Row Level Security) on all tables with policies allowing authenticated users to read/write.

═══════════════════════════════════════════════════════════
PHASE 4: API ROUTES (WITH LINGO SDK INTEGRATION)
═══════════════════════════════════════════════════════════

app/api/logs/route.ts:
POST handler:
- Accept: level, service, message, metadata, stack_trace, original_language
- Insert into logs table
- Return created log

GET handler:
- Accept query params: limit (default 100), level (filter), service (filter), language (default 'en')
- Fetch logs from Supabase with filters
- If language !== 'en':
  - For each log:
    - Check translation_cache first
    - If not cached, use Lingo SDK translateLog()
    - Cache the translation
    - Return translated log
- Return logs array

---

app/api/alerts/route.ts:
POST handler:
- Accept: title, description, severity, status, original_language, metadata
- Insert into alerts table
- Return created alert

GET handler:
- Accept query params: status (filter), language (default 'en')
- Fetch alerts from Supabase
- If language !== 'en':
  - Use Lingo SDK translateAlert() for each alert
  - Return translated alerts
- Return alerts array

PATCH handler:
- Accept: id, status
- Update alert status
- If status is 'resolved', set resolved_at timestamp
- Return updated alert

---

app/api/stats/route.ts:
GET handler:
- Count total logs
- Count errors (level = 'ERROR')
- Count warnings (level = 'WARNING')
- Count active alerts (status = 'active')
- Count critical alerts (status = 'active' AND severity = 'CRITICAL')
- Count unique services from logs
- Return DashboardStats object

---

app/api/insights/route.ts:
POST handler:
- Accept: logIds (array), language (default 'en')
- Fetch logs by IDs
- Analyze logs (count errors, identify services)
- Generate multilingual insight:
  - Create title in target language
  - Create description in target language
  - Set severity based on error count
  - Store related_logs array
- Insert into ai_insights table
- Return saved insight

GET handler:
- Accept query params: limit (default 10)
- Fetch recent insights
- Return insights array

Note: In a real MCP implementation, you would use Cursor with Lingo MCP to generate insights. For the demo, use hardcoded translations for different languages.

═══════════════════════════════════════════════════════════
PHASE 5: UTILITY FUNCTIONS
═══════════════════════════════════════════════════════════

lib/utils.ts:
- cn(): Merge Tailwind classes (using clsx + tailwind-merge)
- getLanguageFromStorage(): Get user's language from localStorage
- setLanguageInStorage(language): Save user's language to localStorage
- getLevelColor(level): Map log level to badge variant (ERROR→destructive, WARNING→warning, etc.)
- getSeverityColor(severity): Map alert severity to badge variant

═══════════════════════════════════════════════════════════
PHASE 6: REACT COMPONENTS
═══════════════════════════════════════════════════════════

components/dashboard/LanguageSwitcher.tsx:
- Dropdown menu with 6 languages
- Languages: [en, es, fr, de, ja, zh] with flags and names
- Store selection in localStorage
- Reload page when language changes (to apply Lingo Compiler translations)
- Show current language with flag

---

components/dashboard/LogStream.tsx:
- Fetch logs from API with user's language
- Subscribe to Supabase realtime for new logs
- When new log arrives:
  - If language !== 'en', fetch translated version
  - Prepend to logs array
- Display each log in a Card:
  - Badge for level (colored)
  - Service name
  - Timestamp (using date-fns formatDistanceToNow)
  - Message (translated)
  - Expandable metadata section
- Show loading spinner while fetching
- Show empty state if no logs

---

components/dashboard/StatsOverview.tsx:
- Fetch stats from /api/stats
- Auto-refresh every 30 seconds
- Display 6 stat cards in grid:
  1. Total Logs (Activity icon, blue)
  2. Errors (AlertCircle icon, red)
  3. Warnings (AlertTriangle icon, yellow)
  4. Active Alerts (TrendingUp icon, orange)
  5. Critical Alerts (AlertTriangle icon, dark red)
  6. Services Monitored (Server icon, green)
- Each card shows icon, title, and number
- Show loading skeleton while fetching

---

components/dashboard/AlertCard.tsx:
- Display single alert in a Card
- Show severity badge (colored)
- Show status badge
- Show title and description
- Show creation time
- If status is 'active', show action buttons:
  - "Acknowledge" button
  - "Resolve" button
- Call onStatusChange callback when clicked

---

components/dashboard/InsightsPanel.tsx:
- Fetch insights from /api/insights
- Display list of insights
- Each insight shows:
  - Lightbulb icon
  - Severity badge
  - Insight type badge
  - Title and description
  - Number of related logs
- Show empty state with lightbulb icon if no insights
- Show loading spinner while fetching

═══════════════════════════════════════════════════════════
PHASE 7: DASHBOARD PAGES
═══════════════════════════════════════════════════════════

app/(dashboard)/layout.tsx:
- Header with:
  - Logo (🌍 GlobalOps)
  - Navigation links (Logs, Alerts, Insights, Docs)
  - LanguageSwitcher component
- Main content area for children
- Responsive design

---

app/(dashboard)/page.tsx (Main Dashboard):
- Page title: "Dashboard"
- Subtitle: "Monitor your services in real-time"
- StatsOverview component
- Two-column layout:
  - Left (2/3): "Recent Logs" with LogStream
  - Right (1/3): "AI Insights" with InsightsPanel

---

app/(dashboard)/logs/page.tsx:
- Page title: "Logs"
- Subtitle: "Real-time log streaming with automatic translation"
- LogStream component (full width)

---

app/(dashboard)/alerts/page.tsx:
- Page title: "Alerts"
- Subtitle: "Manage and track system alerts"
- "New Alert" button (top right)
- Fetch alerts from API with user's language
- Map alerts to AlertCard components
- Handle status changes (acknowledge/resolve)
- Reload alerts after status change
- Show loading spinner while fetching

---

app/(dashboard)/insights/page.tsx:
- Page title: "AI Insights"
- Subtitle: "AI-powered analysis of your logs and alerts"
- InsightsPanel component (full width)

---

app/(dashboard)/docs/[lang]/[slug]/page.tsx:
- Dynamic route for documentation
- Fetch markdown file from docs/[lang]/[slug].md
- Render markdown with proper styling
- Show 404 if file doesn't exist
- Navigation between docs

═══════════════════════════════════════════════════════════
PHASE 8: LANDING PAGE
═══════════════════════════════════════════════════════════

app/page.tsx:
- Hero section:
  - Large heading: "DevOps Monitoring In Every Language"
  - Subtitle about real-time logs, alerts, AI insights
  - "View Dashboard" button → /logs
  - "Read Docs" button → /docs/en/getting-started
- Features section (3 columns):
  - 6 Languages (Globe icon)
  - Real-time Updates (Zap icon)
  - AI-Powered (Shield icon)
- Gradient background
- Responsive design
- Professional, modern UI

═══════════════════════════════════════════════════════════
PHASE 9: DOCUMENTATION FILES
═══════════════════════════════════════════════════════════

Create docs/en/getting-started.md:
- Title: "Getting Started with GlobalOps"
- Overview of features
- Quick start guide
- Code example for sending logs via API
- Instructions to set preferred language
- Links to other docs

Create docs/en/api-reference.md:
- Title: "API Reference"
- Document all API endpoints:
  - POST /api/logs
  - GET /api/logs
  - POST /api/alerts
  - GET /api/alerts
  - PATCH /api/alerts
  - GET /api/stats
  - POST /api/insights
- Include request/response examples
- Authentication details

Create docs/en/deployment.md:
- Title: "Deployment Guide"
- Vercel deployment steps
- Environment variables setup
- Supabase configuration
- GitHub Actions setup
- Production checklist

Note: After creating English docs, run `npx lingo.dev run` to auto-generate translations.

═══════════════════════════════════════════════════════════
PHASE 10: DEMO DATA GENERATOR
═══════════════════════════════════════════════════════════

scripts/generate-fake-logs.ts:
- Define arrays:
  - services: ['authentication', 'api-gateway', 'database', 'payment', 'notification', 'user-service']
  - logLevels: ['ERROR', 'WARNING', 'INFO', 'DEBUG']
  - Sample messages for each level
- Function to generate random log:
  - Random level, service, message
  - Metadata with user_id, request_id, duration_ms
- Function to insert logs:
  - Generate N logs
  - Insert into Supabase one by one
  - Add 100ms delay between inserts (simulate real-time)
- Export function to run: generateFakeLogs(50)

Run with: npx tsx scripts/generate-fake-logs.ts

═══════════════════════════════════════════════════════════
PHASE 11: ENVIRONMENT SETUP
═══════════════════════════════════════════════════════════

.env.local:

.env.local.example:
- Same as above but with placeholder values
- Include comments explaining where to get each key

package.json scripts:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "translate:docs": "npx lingo.dev run",
    "generate:logs": "npx tsx scripts/generate-fake-logs.ts"
  }
}
```

═══════════════════════════════════════════════════════════
PHASE 12: STYLING & UI POLISH
═══════════════════════════════════════════════════════════

globals.css:
- Import Tailwind base, components, utilities
- Add custom CSS variables for theme colors
- Add smooth transitions
- Ensure dark mode compatibility

Tailwind config:
- Extend theme with custom colors if needed
- Configure container settings
- Add custom animations if needed

Component styling:
- Use shadcn/ui components for consistency
- Apply proper spacing, padding, margins
- Ensure responsive design (mobile, tablet, desktop)
- Add hover states and transitions
- Use proper color contrast for accessibility

═══════════════════════════════════════════════════════════
PHASE 13: TESTING & VALIDATION
═══════════════════════════════════════════════════════════

Test each Lingo.dev tool:

1. Lingo Compiler Test:
   - Run: npm run build
   - Verify build succeeds
   - Start dev server: npm run dev
   - Change language in UI
   - Verify all text translates (buttons, labels, headings)

2. Lingo CLI Test:
   - Run: npm run translate:docs
   - Verify docs/es/, docs/fr/, docs/de/, docs/ja/, docs/zh/ are created
   - Check that content is translated accurately
   - Verify markdown formatting is preserved

3. Lingo SDK Test:
   - Generate fake logs: npm run generate:logs
   - Open dashboard
   - Change language to Spanish
   - Verify logs are translated in real-time
   - Check alerts are translated
   - Verify translation caching works (check database)

4. Lingo CI/CD Test:
   - Edit docs/en/getting-started.md
   - Commit and push to GitHub
   - Check GitHub Actions tab
   - Verify workflow runs successfully
   - Verify translated docs are automatically committed

5. Lingo MCP Test:
   - In Cursor, verify MCP connection (green indicator)
   - Use Composer to ask: "Translate this text to French: Database error occurred"
   - Verify Lingo MCP responds with translation
   - Test with insight generation

Functional Testing:
- Create logs via API
- Verify logs appear in real-time
- Change language and verify translation
- Create alerts
- Update alert status
- Generate insights
- Navigate all pages
- Test responsive design (mobile, tablet, desktop)
- Test error handling (invalid API calls, network errors)

═══════════════════════════════════════════════════════════
PHASE 14: README & DOCUMENTATION
═══════════════════════════════════════════════════════════

Create comprehensive README.md:

Structure:
1. Project Title & Logo
2. Demo Video/Screenshot
3. Description (one paragraph)
4. Features (bullet points)
5. Lingo.dev Integration Table:
   - List all 5 tools
   - Explain how each is used
   - Link to relevant code files
6. Tech Stack
7. Quick Start:
   - Prerequisites
   - Installation steps
   - Environment setup
   - Run commands
8. Project Structure
9. API Documentation (or link to docs)
10. Deployment Guide
11. How to Run Demo
12. Testing Instructions
13. Screenshots/GIFs
14. Architecture Diagram
15. Contributing
16. License
17. Acknowledgments (Lingo.dev, Supabase, Vercel)
18. Contact/Links

Key Points to Emphasize:
- ALL 5 Lingo.dev tools are integrated
- Production-ready code quality
- Real-time functionality
- Clean, professional UI
- Well-documented

═══════════════════════════════════════════════════════════
PHASE 15: DEPLOYMENT TO VERCEL
═══════════════════════════════════════════════════════════

Deployment Steps:
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Configure environment variables in Vercel:
   - LINGODOTDEV_API_KEY
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
4. Deploy
5. Verify deployment works
6. Test all features in production
7. Update NEXT_PUBLIC_APP_URL to production URL

═══════════════════════════════════════════════════════════
FINAL CHECKLIST
═══════════════════════════════════════════════════════════

Lingo.dev Integration:
- [ ] Lingo Compiler configured in next.config.ts
- [ ] Lingo CLI configured in i18n.json
- [ ] Lingo SDK functions in lib/lingo.ts
- [ ] Lingo CI/CD workflow in .github/workflows/
- [ ] Lingo MCP setup documented and tested
- [ ] All 5 tools actually working and demonstrated

Features:
- [ ] Real-time log streaming works
- [ ] Logs translate to all 6 languages
- [ ] Alerts can be created and managed
- [ ] Alerts translate correctly
- [ ] Stats display correctly
- [ ] AI insights generate
- [ ] Documentation in 6 languages
- [ ] Language switcher works
- [ ] Supabase realtime works
- [ ] Translation caching works

Code Quality:
- [ ] TypeScript types for all data
- [ ] Error handling in all API routes
- [ ] Loading states in all components
- [ ] Responsive design (mobile/tablet/desktop)
- [ ] Clean, readable code
- [ ] Proper component organization
- [ ] No console errors
- [ ] No TypeScript errors

Documentation:
- [ ] README is comprehensive
- [ ] All 5 Lingo tools documented
- [ ] Setup instructions clear
- [ ] Architecture diagram included
- [ ] API documentation complete
- [ ] Screenshots/GIFs added

Deployment:
- [ ] Deployed to Vercel
- [ ] Environment variables configured
- [ ] Production build works
- [ ] All features work in production
- [ ] Demo data can be generated

Submission:
- [ ] GitHub repo is public
- [ ] README has demo link
- [ ] All code committed
- [ ] Clean git history
- [ ] Demo video recorded (optional but recommended)

═══════════════════════════════════════════════════════════

IMPLEMENTATION NOTES:

Style Guidelines:
- Use consistent spacing (4 spaces or 2 spaces)
- Follow Next.js best practices
- Use TypeScript strictly (no 'any' types unless necessary)
- Use async/await for all async operations
- Proper error handling with try/catch
- Use semantic HTML
- Follow React best practices (hooks, composition)

Component Patterns:
- Use 'use client' only when needed (client interactivity)
- Server components by default
- Extract reusable logic into custom hooks
- Keep components small and focused
- Use TypeScript interfaces for props

Database Patterns:
- Use Supabase client-side for realtime
- Use Supabase server-side for API routes
- Implement proper RLS policies
- Cache translations for performance
- Use proper indexes for queries

API Patterns:
- Validate input data
- Return proper HTTP status codes
- Handle errors gracefully
- Use proper TypeScript types
- Implement rate limiting if needed

UI/UX Patterns:
- Loading states for async operations
- Empty states when no data
- Error states with retry options
- Confirmation dialogs for destructive actions
- Toast notifications for feedback
- Smooth transitions and animations

═══════════════════════════════════════════════════════════

BUILD THIS PROJECT FOLLOWING THE PHASES IN ORDER.

After each phase, verify it works before moving to the next phase.

The goal is a production-ready dashboard that clearly demonstrates ALL 5 Lingo.dev tools working perfectly.

START WITH PHASE 1 NOW.