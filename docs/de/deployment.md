# Deployment-Leitfaden

## Voraussetzungen

- Node.js 20+
- Ein Supabase-Projekt
- Ein Lingo.dev API-Schlüssel
- Ein Vercel-Account (für Deployment)
- Ein GitHub-Account (für CI/CD)

## Schritt 1: Supabase-Einrichtung

1. Erstellen Sie ein neues Projekt auf [supabase.com](https://supabase.com)
2. Gehen Sie zum SQL-Editor
3. Führen Sie das SQL aus `lib/supabase.ts` aus (der kommentierte Abschnitt am Ende)
4. Kopieren Sie Ihre Projekt-URL und Schlüssel aus Einstellungen → API

## Schritt 2: Umgebungsvariablen

Erstellen Sie `.env.local` mit Ihren tatsächlichen Werten:

```env
LINGODOTDEV_API_KEY=your_key
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

## Schritt 3: Dokumentation übersetzen

Führen Sie die Lingo-CLI aus, um Übersetzungen für die gesamte Dokumentation zu generieren:

```bash
npm run translate:docs
```

Dies erstellt übersetzte Dokumente in `docs/es/`, `docs/fr/`, `docs/de/`, `docs/ja/` und `docs/zh/`.

## Schritt 4: Auf Vercel deployen

1. Pushen Sie Ihren Code auf GitHub
2. Gehen Sie zu [vercel.com](https://vercel.com) und importieren Sie Ihr Repository
3. Fügen Sie alle Umgebungsvariablen im Vercel-Dashboard hinzu
4. Deployen Sie

## Schritt 5: GitHub Actions (CI/CD)

1. Gehen Sie zu Ihrem GitHub-Repo → Einstellungen → Secrets and variables → Actions
2. Fügen Sie Secret hinzu: `LINGODOTDEV_API_KEY`
3. Der Workflow in `.github/workflows/translate-docs.yml` übersetzt automatisch Dokumente bei jedem Push

## Schritt 6: Lingo MCP in Cursor konfigurieren

1. Öffnen Sie Cursor-Einstellungen → MCP-Tab
2. Fügen Sie neuen MCP-Server hinzu:
   - Name: `Lingo.dev`
   - Befehl: `npx`
   - Args: `["-y", "lingo.dev", "mcp", "YOUR_API_KEY"]`
3. Starten Sie Cursor neu
4. Überprüfen Sie die grüne Statusanzeige

## Produktions-Checkliste

- [ ] Supabase-Tabellen mit aktiviertem RLS erstellt
- [ ] Alle Umgebungsvariablen in Vercel gesetzt
- [ ] Lingo Compiler erstellt Übersetzungen beim Deployment
- [ ] Dokumentation über CLI übersetzt
- [ ] CI/CD-Workflow getestet
- [ ] MCP in Entwicklungsumgebung konfiguriert
- [ ] Demo-Daten für Showcase generiert
- [ ] Alle 5 Lingo.dev-Tools verifiziert und funktionsfähig

## Überwachung

Nach der Bereitstellung überwachen Sie Ihre Anwendung:

- **Vercel-Dashboard** — Bereitstellungsprotokolle und Analysen
- **Supabase-Dashboard** — Datenbanküberwachung und Protokolle
- **GitHub Actions** — CI/CD-Pipeline-Status
