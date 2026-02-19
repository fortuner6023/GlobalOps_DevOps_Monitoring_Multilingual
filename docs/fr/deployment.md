# Guide de déploiement

## Prérequis

- Node.js 20+
- Un projet Supabase
- Une clé API Lingo.dev
- Un compte Vercel (pour le déploiement)
- Un compte GitHub (pour CI/CD)

## Étape 1 : configuration de Supabase

1. Créez un nouveau projet sur [supabase.com](https://supabase.com)
2. Accédez à l'éditeur SQL
3. Exécutez le SQL depuis `lib/supabase.ts` (la section commentée en bas)
4. Copiez l'URL de votre projet et les clés depuis Paramètres → API

## Étape 2 : variables d'environnement

Créez `.env.local` avec vos valeurs réelles :

```env
LINGODOTDEV_API_KEY=your_key
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

## Étape 3 : traduire la documentation

Exécutez la CLI Lingo pour générer les traductions de toute la documentation :

```bash
npm run translate:docs
```

Cela crée la documentation traduite dans `docs/es/`, `docs/fr/`, `docs/de/`, `docs/ja/` et `docs/zh/`.

## Étape 4 : déployer sur Vercel

1. Poussez votre code sur GitHub
2. Accédez à [vercel.com](https://vercel.com) et importez votre dépôt
3. Ajoutez toutes les variables d'environnement dans le tableau de bord Vercel
4. Déployez

## Étape 5 : GitHub Actions (CI/CD)

1. Accédez à votre dépôt GitHub → Paramètres → Secrets and variables → Actions
2. Ajoutez le secret : `LINGODOTDEV_API_KEY`
3. Le workflow dans `.github/workflows/translate-docs.yml` traduira automatiquement la documentation à chaque push

## Étape 6 : configurer Lingo MCP dans Cursor

1. Ouvrez les paramètres de Cursor → onglet MCP
2. Ajoutez un nouveau serveur MCP :
   - Nom : `Lingo.dev`
   - Commande : `npx`
   - Args : `["-y", "lingo.dev", "mcp", "YOUR_API_KEY"]`
3. Redémarrez Cursor
4. Vérifiez l'indicateur de statut vert

## Liste de vérification pour la production

- [ ] Tables Supabase créées avec RLS activé
- [ ] Toutes les variables d'environnement définies dans Vercel
- [ ] Lingo Compiler compile les traductions au déploiement
- [ ] Documentation traduite via CLI
- [ ] Workflow CI/CD testé
- [ ] MCP configuré dans l'environnement de développement
- [ ] Données de démonstration générées pour la présentation
- [ ] Les 5 outils Lingo.dev vérifiés et fonctionnels

## Surveillance

Après le déploiement, surveillez votre application :

- **Tableau de bord Vercel** — Journaux de déploiement et analyses
- **Tableau de bord Supabase** — Surveillance de la base de données et journaux
- **GitHub Actions** — Statut du pipeline CI/CD
