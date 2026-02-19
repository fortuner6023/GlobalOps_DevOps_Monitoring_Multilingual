# API Reference

## Base URL

```
http://localhost:3000/api
```

## Endpoints

### Logs

#### POST /api/logs

Create a new log entry.

**Request Body:**

```json
{
  "level": "ERROR",
  "service": "api-gateway",
  "message": "Connection timeout after 30000ms",
  "metadata": { "request_id": "req_abc123" },
  "stack_trace": "Error: Connection timeout\n    at handler...",
  "original_language": "en"
}
```

**Required Fields:** `level`, `service`, `message`

**Response:** `201 Created`

```json
{
  "log": {
    "id": "uuid",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "level": "ERROR",
    "service": "api-gateway",
    "message": "Connection timeout after 30000ms",
    "metadata": { "request_id": "req_abc123" },
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

#### GET /api/logs

Fetch logs with optional filters.

**Query Parameters:**
- `limit` (number, default: 100) — Maximum logs to return
- `level` (string) — Filter by log level (ERROR, WARNING, INFO, DEBUG)
- `service` (string) — Filter by service name
- `language` (string, default: "en") — Target language for translation

**Response:** `200 OK`

```json
{
  "logs": [...]
}
```

---

### Alerts

#### POST /api/alerts

Create a new alert.

**Request Body:**

```json
{
  "title": "High Error Rate",
  "description": "Error rate exceeded 5% threshold",
  "severity": "CRITICAL",
  "metadata": {}
}
```

**Required Fields:** `title`, `description`, `severity`

#### GET /api/alerts

Fetch alerts with optional filters.

**Query Parameters:**
- `status` (string) — Filter by status (active, acknowledged, resolved)
- `language` (string, default: "en") — Target language

#### PATCH /api/alerts

Update an alert's status.

**Request Body:**

```json
{
  "id": "alert-uuid",
  "status": "resolved"
}
```

---

### Stats

#### GET /api/stats

Get dashboard statistics.

**Response:** `200 OK`

```json
{
  "totalLogs": 1247,
  "errorCount": 23,
  "warningCount": 89,
  "activeAlerts": 5,
  "criticalAlerts": 2,
  "servicesMonitored": 6
}
```

---

### AI Insights

#### POST /api/insights

Generate an AI insight from logs.

**Request Body:**

```json
{
  "logIds": ["uuid-1", "uuid-2"],
  "language": "en"
}
```

#### GET /api/insights

Fetch recent insights.

**Query Parameters:**
- `limit` (number, default: 10) — Maximum insights to return

## Authentication

Currently, the API is open for demo purposes. In production, use Supabase Auth with JWT tokens in the Authorization header.

## Rate Limiting

No rate limiting in development. Configure in production via Vercel or a reverse proxy.
