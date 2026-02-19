# Erste Schritte mit GlobalOps

## Übersicht

GlobalOps ist ein produktionsreifes Echtzeit-DevOps-Monitoring-Dashboard, das standardmäßig 6 Sprachen unterstützt. Es integriert alle 5 Lingo.dev-Übersetzungstools, um eine vollständig mehrsprachige Erfahrung zu bieten.

## Funktionen

- **Echtzeit-Log-Streaming** — Beobachten Sie Logs in Echtzeit von allen Ihren Services
- **Mehrsprachige Benachrichtigungen** — Erstellen, verwalten und verfolgen Sie Benachrichtigungen in Ihrer Sprache
- **KI-gestützte Einblicke** — Intelligente Analyse Ihrer Logs mit Empfehlungen
- **Automatisch übersetzte Dokumentation** — Alle Dokumente in 6 Sprachen verfügbar
- **Sprachwechsel** — Wechseln Sie sofort zwischen Englisch, Spanisch, Französisch, Deutsch, Japanisch und Chinesisch

## Schnellstart

### 1. Repository klonen

```bash
git clone https://github.com/your-username/globalops.git
cd globalops
```

### 2. Abhängigkeiten installieren

```bash
npm install
```

### 3. Umgebungsvariablen einrichten

Kopieren Sie die Beispiel-Umgebungsdatei und tragen Sie Ihre Schlüssel ein:

```bash
cp .env.local.example .env.local
```

Erforderliche Variablen:
- `LINGODOTDEV_API_KEY` — Erhalten Sie im [Lingo.dev Dashboard](https://lingo.dev/dashboard)
- `NEXT_PUBLIC_SUPABASE_URL` — Ihre Supabase-Projekt-URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase Anonymous Key
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase Service Role Key

### 4. Entwicklungsserver starten

```bash
npm run dev
```

Öffnen Sie [http://localhost:3000](http://localhost:3000) in Ihrem Browser.

### 5. Demo-Daten generieren

```bash
npm run generate:logs
```

## Logs über API senden

Sie können Logs über die REST-API an GlobalOps senden:

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

## Bevorzugte Sprache einstellen

Klicken Sie auf den Sprachumschalter in der oberen rechten Ecke des Dashboards, um Ihre bevorzugte Sprache zu ändern. Alle Logs, Benachrichtigungen und Einblicke werden automatisch übersetzt.

## Nächste Schritte

- [API-Referenz](./api-reference.md) — Vollständige API-Dokumentation
- [Deployment-Leitfaden](./deployment.md) — Bereitstellung in der Produktion
