# Referencia de la API

## URL base

http://localhost:3000/api
```

## Endpoints

### Logs

#### POST /api/logs

Crear una nueva entrada de log.

**Cuerpo de la solicitud:**

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

**Campos obligatorios:** `level`, `service`, `message`

**Respuesta:** `201 Created`

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

Obtener logs con filtros opcionales.

**Parámetros de consulta:**
- `limit` (número, predeterminado: 100) — Cantidad máxima de logs a devolver
- `level` (cadena) — Filtrar por nivel de log (ERROR, WARNING, INFO, DEBUG)
- `service` (cadena) — Filtrar por nombre de servicio
- `language` (cadena, predeterminado: "en") — Idioma de destino para la traducción

**Respuesta:** `200 OK`

```json
{
  "logs": [...]
}
```

---

### Alertas

#### POST /api/alerts

Crear una nueva alerta.

**Cuerpo de la solicitud:**

```json
{
  "title": "High Error Rate",
  "description": "Error rate exceeded 5% threshold",
  "severity": "CRITICAL",
  "metadata": {}
}
```

**Campos obligatorios:** `title`, `description`, `severity`

#### GET /api/alerts

Obtener alertas con filtros opcionales.

**Parámetros de consulta:**
- `status` (cadena) — Filtrar por estado (active, acknowledged, resolved)
- `language` (cadena, predeterminado: "en") — Idioma de destino

#### PATCH /api/alerts

Actualizar el estado de una alerta.

**Cuerpo de la solicitud:**

```json
{
  "id": "alert-uuid",
  "status": "resolved"
}
```

---

### Estadísticas

#### GET /api/stats

Obtener estadísticas del panel de control.

**Respuesta:** `200 OK`

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

### Información de IA

#### POST /api/insights

Genera una información de IA a partir de registros.

**Cuerpo de la solicitud:**

```json
{
  "logIds": ["uuid-1", "uuid-2"],
  "language": "en"
}
```

#### GET /api/insights

Obtiene información reciente.

**Parámetros de consulta:**
- `limit` (número, predeterminado: 10) — Máximo de información a devolver

## Autenticación

Actualmente, la API está abierta con fines de demostración. En producción, usa Supabase Auth con tokens JWT en el encabezado Authorization.

## Limitación de velocidad

Sin limitación de velocidad en desarrollo. Configura en producción a través de Vercel o un proxy inverso.
