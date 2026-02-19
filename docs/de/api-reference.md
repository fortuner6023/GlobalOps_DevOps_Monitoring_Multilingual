# API-Referenz

## Basis-URL

```
http://localhost:3000/api
```

## Endpunkte

### Logs

#### POST /api/logs

Erstellt einen neuen Log-Eintrag.

**Request-Body:**

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

**Pflichtfelder:** `level`, `service`, `message`

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

Ruft Logs mit optionalen Filtern ab.

**Query-Parameter:**
- `limit` (number, Standard: 100) – Maximale Anzahl zurückzugebender Logs
- `level` (string) – Filtern nach Log-Level (ERROR, WARNING, INFO, DEBUG)
- `service` (string) – Filtern nach Service-Name
- `language` (string, Standard: "en") – Zielsprache für Übersetzung

**Response:** `200 OK`

```json
{
  "logs": [...]
}
```

---

### Alerts

#### POST /api/alerts

Erstellt einen neuen Alert.

**Request-Body:**

```json
{
  "title": "High Error Rate",
  "description": "Error rate exceeded 5% threshold",
  "severity": "CRITICAL",
  "metadata": {}
}
```

**Pflichtfelder:** `title`, `description`, `severity`

#### GET /api/alerts

Ruft Alerts mit optionalen Filtern ab.

**Query-Parameter:**
- `status` (string) – Filtern nach Status (active, acknowledged, resolved)
- `language` (string, Standard: "en") – Zielsprache

#### PATCH /api/alerts

Aktualisiert den Status eines Alerts.

**Request-Body:**

```json
{
  "id": "alert-uuid",
  "status": "resolved"
}
```

---

### Statistiken

#### GET /api/stats

Ruft Dashboard-Statistiken ab.

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

### KI-Einblicke

#### POST /api/insights

Generiere einen KI-Einblick aus Protokollen.

**Request-Body:**

```json
{
  "logIds": ["uuid-1", "uuid-2"],
  "language": "en"
}
```

#### GET /api/insights

Rufe aktuelle Einblicke ab.

**Query-Parameter:**
- `limit` (Zahl, Standard: 10) — Maximale Anzahl zurückzugebender Einblicke

## Authentifizierung

Derzeit ist die API zu Demozwecken offen. In der Produktion verwende Supabase Auth mit JWT-Tokens im Authorization-Header.

## Rate-Limiting

Kein Rate-Limiting in der Entwicklung. Konfiguriere es in der Produktion über Vercel oder einen Reverse-Proxy.
