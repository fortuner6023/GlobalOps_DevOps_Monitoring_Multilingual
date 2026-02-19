# Premiers pas avec GlobalOps

## Vue d'ensemble

GlobalOps est un tableau de bord de surveillance DevOps en temps réel, prêt pour la production, qui prend en charge 6 langues dès le départ. Il intègre les 5 outils de traduction Lingo.dev pour offrir une expérience entièrement multilingue.

## Fonctionnalités

- **Diffusion de logs en temps réel** — Visualisez les logs apparaître en temps réel depuis tous vos services
- **Alertes multilingues** — Créez, gérez et suivez des alertes traduites dans votre langue
- **Analyses optimisées par IA** — Analyse intelligente de vos logs avec recommandations
- **Documentation traduite automatiquement** — Toute la documentation disponible en 6 langues
- **Changement de langue** — Basculez instantanément entre l'anglais, l'espagnol, le français, l'allemand, le japonais et le chinois

## Démarrage rapide

### 1. Cloner le dépôt

```bash
git clone https://github.com/your-username/globalops.git
cd globalops
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Copiez le fichier d'environnement exemple et renseignez vos clés :

```bash
cp .env.local.example .env.local
```

Variables requises :
- `LINGODOTDEV_API_KEY` — Obtenez-la depuis le [tableau de bord Lingo.dev](https://lingo.dev/dashboard)
- `NEXT_PUBLIC_SUPABASE_URL` — L'URL de votre projet Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Clé anonyme Supabase
- `SUPABASE_SERVICE_ROLE_KEY` — Clé de rôle de service Supabase

### 4. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### 5. Générer des données de démonstration

```bash
npm run generate:logs
```

## Envoi de logs via l'API

Vous pouvez envoyer des logs à GlobalOps en utilisant l'API REST :

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

## Définir votre langue préférée

Cliquez sur le sélecteur de langue dans le coin supérieur droit du tableau de bord pour changer votre langue préférée. Tous les logs, alertes et analyses seront traduits automatiquement.

## Prochaines étapes

- [Référence API](./api-reference.md) — Documentation complète de l'API
- [Guide de déploiement](./deployment.md) — Déployer en production
