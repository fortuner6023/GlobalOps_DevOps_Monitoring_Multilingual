# Référence API

## URL de base

http://localhost:3000/api
```

## Points de terminaison

### Journaux

#### POST /api/logs

Créer une nouvelle entrée de journal.

**Corps de la requête :**

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

**Champs requis :** `level`, `service`, `message`

**Réponse :** `201 Created`

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

Récupérer les journaux avec des filtres optionnels.

**Paramètres de requête :**
- `limit` (nombre, par défaut : 100) — Nombre maximum de journaux à retourner
- `level` (chaîne) — Filtrer par niveau de journal (ERROR, WARNING, INFO, DEBUG)
- `service` (chaîne) — Filtrer par nom de service
- `language` (chaîne, par défaut : "en") — Langue cible pour la traduction

**Réponse :** `200 OK`

```json
{
  "logs": [...]
}
```

---

### Alertes

#### POST /api/alerts

Créer une nouvelle alerte.

**Corps de la requête :**

```json
{
  "title": "High Error Rate",
  "description": "Error rate exceeded 5% threshold",
  "severity": "CRITICAL",
  "metadata": {}
}
```

**Champs requis :** `title`, `description`, `severity`

#### GET /api/alerts

Récupérer les alertes avec des filtres optionnels.

**Paramètres de requête :**
- `status` (chaîne) — Filtrer par statut (active, acknowledged, resolved)
- `language` (chaîne, par défaut : "en") — Langue cible

#### PATCH /api/alerts

Mettre à jour le statut d'une alerte.

**Corps de la requête :**

```json
{
  "id": "alert-uuid",
  "status": "resolved"
}
```

---

### Statistiques

#### GET /api/stats

Obtenir les statistiques du tableau de bord.

**Réponse :** `200 OK`

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

### Informations IA

#### POST /api/insights

Générer une information IA à partir des journaux.

**Corps de la requête :**

```json
{
  "logIds": ["uuid-1", "uuid-2"],
  "language": "en"
}
```

#### GET /api/insights

Récupérer les informations récentes.

**Paramètres de requête :**
- `limit` (nombre, par défaut : 10) — Nombre maximum d'informations à retourner

## Authentification

Actuellement, l'API est ouverte à des fins de démonstration. En production, utilisez Supabase Auth avec des jetons JWT dans l'en-tête Authorization.

## Limitation du débit

Aucune limitation du débit en développement. Configurez en production via Vercel ou un proxy inverse.
