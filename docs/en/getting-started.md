# Getting Started with GlobalOps

## Overview

GlobalOps is a production-ready, real-time DevOps monitoring dashboard that supports 6 languages out of the box. It integrates all 5 Lingo.dev translation tools to provide a fully multilingual experience.

## Features

- **Real-time Log Streaming** — Watch logs appear in real-time from all your services
- **Multi-language Alerts** — Create, manage, and track alerts translated into your language
- **AI-Powered Insights** — Intelligent analysis of your logs with recommendations
- **Auto-translated Documentation** — All docs available in 6 languages
- **Language Switching** — Instantly switch between English, Spanish, French, German, Japanese, and Chinese

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/globalops.git
cd globalops
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the example environment file and fill in your keys:

```bash
cp .env.local.example .env.local
```

Required variables:
- `LINGODOTDEV_API_KEY` — Get from [Lingo.dev Dashboard](https://lingo.dev/dashboard)
- `NEXT_PUBLIC_SUPABASE_URL` — Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Generate Demo Data

```bash
npm run generate:logs
```

## Sending Logs via API

You can send logs to GlobalOps using the REST API:

```bash
curl -X POST http://localhost:3000/api/logs \
  -H "Content-Type: application/json" \
  -d '{
    "level": "ERROR",
    "service": "api-gateway",
    "message": "Connection timeout after 30000ms",
    "metadata": {
      "request_id": "req_abc123",
      "duration_ms": 30000
    }
  }'
```

## Setting Your Preferred Language

Click the language switcher in the top-right corner of the dashboard to change your preferred language. All logs, alerts, and insights will be translated automatically.

## Next Steps

- [API Reference](./api-reference.md) — Full API documentation
- [Deployment Guide](./deployment.md) — Deploy to production
