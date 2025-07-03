# 🚀 Guide de Déploiement - Novacore CRM

Ce guide vous explique comment déployer l'application Novacore CRM sur Vercel et Netlify.

## 📋 Prérequis

- Node.js 18+ installé
- Compte GitHub
- Compte Vercel (optionnel)
- Compte Netlify (optionnel)
- Variables d'environnement configurées

## 🔧 Configuration des Variables d'Environnement

### Variables Requises

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_supabase
SUPABASE_SERVICE_ROLE_KEY=votre_clé_service_supabase

# Clerk (Authentification)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=votre_clé_publique_clerk
CLERK_SECRET_KEY=votre_clé_secrète_clerk

# Stripe (Paiements)
STRIPE_SECRET_KEY=votre_clé_secrète_stripe
STRIPE_WEBHOOK_SECRET=votre_webhook_secret_stripe

# Redis (Cache)
REDIS_URL=votre_url_redis

# OpenAI (IA)
OPENAI_API_KEY=votre_clé_api_openai

# ElevenLabs (Synthèse vocale)
ELEVENLABS_API_KEY=votre_clé_api_elevenlabs

# MetaAPI (Trading)
METAAPI_TOKEN=votre_token_metaapi

# URLs de l'application
NEXT_PUBLIC_API_URL=https://votre-backend-api.vercel.app
```

## 🌐 Déploiement sur Vercel

### Méthode 1: Via GitHub (Recommandé)

1. **Connectez votre repository GitHub à Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur "New Project"
   - Importez votre repository GitHub
   - Vercel détectera automatiquement Next.js

2. **Configurez les variables d'environnement**
   - Dans les paramètres du projet Vercel
   - Allez dans "Environment Variables"
   - Ajoutez toutes les variables requises

3. **Déployez**
   - Vercel déploiera automatiquement à chaque push sur la branche main
   - Les branches de développement créeront des previews automatiques

### Méthode 2: Via CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter à Vercel
vercel login

# Déployer
vercel --prod
```

## 🌐 Déploiement sur Netlify

### Méthode 1: Via GitHub (Recommandé)

1. **Connectez votre repository GitHub à Netlify**
   - Allez sur [netlify.com](https://netlify.com)
   - Cliquez sur "New site from Git"
   - Choisissez GitHub et votre repository
   - Configurez les paramètres de build :
     - Build command: `npm run build`
     - Publish directory: `.next`

2. **Configurez les variables d'environnement**
   - Dans les paramètres du site Netlify
   - Allez dans "Environment variables"
   - Ajoutez toutes les variables requises

3. **Déployez**
   - Netlify déploiera automatiquement à chaque push sur la branche main

### Méthode 2: Via CLI

```bash
# Installer Netlify CLI
npm i -g netlify-cli

# Se connecter à Netlify
netlify login

# Déployer
netlify deploy --prod --dir=.next
```

## 🚀 Déploiement Automatisé

Utilisez notre script de déploiement automatisé :

```bash
# Déployer sur Vercel et Netlify
./scripts/deploy-all.sh both

# Déployer seulement sur Vercel
./scripts/deploy-all.sh vercel

# Déployer seulement sur Netlify
./scripts/deploy-all.sh netlify
```

## 📦 Build Local

Pour tester le build localement avant le déploiement :

```bash
# Installer les dépendances
pnpm install

# Build de production
pnpm run build

# Tester le build
pnpm run start
```

## 🔍 Vérification du Déploiement

Après le déploiement, vérifiez :

1. **Page d'accueil** : L'application se charge correctement
2. **Authentification** : Les connexions fonctionnent
3. **API Routes** : Les endpoints répondent
4. **Base de données** : Les connexions Supabase fonctionnent
5. **Paiements** : Les intégrations Stripe marchent
6. **IA** : Les fonctionnalités OpenAI sont opérationnelles

## 🛠️ Dépannage

### Erreurs Communes

1. **Build Failed**
   - Vérifiez les variables d'environnement
   - Consultez les logs de build
   - Testez le build localement

2. **Runtime Errors**
   - Vérifiez les variables d'environnement en production
   - Consultez les logs de runtime
   - Testez les fonctionnalités une par une

3. **CORS Errors**
   - Configurez les domaines autorisés dans Supabase
   - Vérifiez les headers CORS dans vercel.json et netlify.toml

### Logs et Monitoring

- **Vercel** : Dashboard > Functions > Logs
- **Netlify** : Site settings > Functions > Logs
- **Supabase** : Dashboard > Logs
- **Clerk** : Dashboard > Logs

## 🔄 Déploiement Continu

### GitHub Actions (Optionnel)

Créez `.github/workflows/deploy.yml` :

```yaml
name: Deploy to Vercel and Netlify

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: './.next'
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy from GitHub Actions"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 📞 Support

En cas de problème :

1. Consultez les logs de déploiement
2. Vérifiez la documentation officielle
3. Contactez l'équipe de développement
4. Ouvrez une issue sur GitHub

## 🎯 URLs de Déploiement

Une fois déployé, votre application sera accessible sur :

- **Vercel** : `https://votre-projet.vercel.app`
- **Netlify** : `https://votre-projet.netlify.app`

N'oubliez pas de configurer vos domaines personnalisés si nécessaire !

## Architecture
- **Frontend**: Netlify (export statique Next.js)
- **Backend**: Vercel (API routes)
- **Base de données**: Supabase

## Déploiement Rapide

### 1. Déploiement automatique
```bash
./scripts/deploy.sh "Votre message de commit"
```

### 2. Déploiement manuel
```bash
git add .
git commit -m "Votre message"
git push origin clean-start
```

## Configuration Netlify

### Variables d'environnement requises
```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_supabase
NEXT_PUBLIC_SITE_URL=https://votre-site.netlify.app
```

### Build Settings
- **Build command**: `pnpm run build`
- **Publish directory**: `out`
- **Node version**: `18.20.0`

## Configuration Vercel (Backend)

### Variables d'environnement
```env
SUPABASE_URL=votre_url_supabase
SUPABASE_SERVICE_ROLE_KEY=votre_clé_service
JWT_SECRET=votre_secret_jwt
```

## Monitoring

### Netlify
- Dashboard: https://app.netlify.com/sites/[votre-site]
- Logs: Disponibles dans l'onglet "Deploys"

### Vercel
- Dashboard: https://vercel.com/dashboard
- Logs: Disponibles dans l'onglet "Functions"

## Troubleshooting

### Erreurs courantes
1. **Build failed**: Vérifier les logs Netlify
2. **API errors**: Vérifier la configuration Vercel
3. **Environment variables**: S'assurer que toutes les variables sont définies

### Commandes utiles
```bash
# Test local
pnpm run build
pnpm run dev

# Vérifier les erreurs
pnpm run lint
pnpm run type-check
```

## Performance

### Optimisations appliquées
- ✅ Export statique Next.js
- ✅ Compression des assets
- ✅ Cache headers optimisés
- ✅ Images optimisées
- ✅ Code splitting automatique

### Métriques cibles
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1 