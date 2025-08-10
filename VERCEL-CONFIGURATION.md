# 🚀 Configuration Vercel - DL Solutions Platform

## 📋 Vue d'ensemble
- **Rôle** : Hébergement des APIs Next.js (serverless functions)
- **Configuration** : API-only avec `vercel-api.json`
- **Build** : `npm run build:api-only`
- **Runtime** : Node.js 18.x

## 🔧 Installation et Configuration

### Étape 1: Installer Vercel CLI
```bash
# Installation globale
npm install -g vercel

# Vérification
vercel --version
```

### Étape 2: Connexion à Vercel
```bash
# Se connecter
vercel login

# Vérifier la connexion
vercel whoami
```

### Étape 3: Configuration du Projet
```bash
# Initialiser le projet (si premier déploiement)
vercel

# Ou utiliser la configuration existante
vercel --prod
```

## 📁 Configuration du Projet

### Fichier `vercel-api.json` (déjà configuré)
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build:api-only",
  "installCommand": "npm install",
  "outputDirectory": ".next",
  "functions": {
    "app/api/**/*.ts": {
      "runtime": "nodejs18.x"
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "https://dlsolutionssarl.tech" },
        { "key": "Access-Control-Allow-Methods", "value": "GET, POST, PUT, DELETE, OPTIONS" },
        { "key": "Access-Control-Allow-Headers", "value": "Content-Type, Authorization" },
        { "key": "Cache-Control", "value": "no-cache, no-store, must-revalidate" }
      ]
    }
  ]
}
```

## 🚀 Déploiement des APIs

### Déploiement Initial
```bash
# Déploiement de production
vercel --prod

# Suivre les instructions :
# 1. Set up and deploy? → Y
# 2. Which scope? → Sélectionner votre compte
# 3. Link to existing project? → N
# 4. Project name? → dl-solutions-api (ou nom de votre choix)
# 5. Directory? → . (racine du projet)
# 6. Override settings? → N
```

### Déploiements Suivants
```bash
# Déploiement automatique
vercel --prod

# Ou utiliser le script npm
npm run deploy:vercel
```

## 🌍 Configuration des Domaines

### Domaine Vercel par défaut
- **Format** : `https://[PROJET].vercel.app`
- **Exemple** : `https://dl-solutions-api.vercel.app`
- **Gratuit** : Inclus dans le plan gratuit

### Domaine personnalisé (optionnel)
1. Aller dans le dashboard Vercel
2. **Settings** → **Domains**
3. Ajouter un sous-domaine : `api.dlsolutionssarl.tech`
4. Configurer les enregistrements DNS

## 🔒 Configuration CORS

### Headers configurés
- **Origin** : `https://dlsolutionssarl.tech`
- **Methods** : GET, POST, PUT, DELETE, OPTIONS
- **Headers** : Content-Type, Authorization
- **Cache** : no-cache, no-store, must-revalidate

### Test des CORS
```bash
# Test OPTIONS (preflight)
curl -H "Origin: https://dlsolutionssarl.tech" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://[PROJET].vercel.app/api/scrape-supabase

# Test POST
curl -H "Origin: https://dlsolutionssarl.tech" \
     -H "Content-Type: application/json" \
     -X POST \
     https://[PROJET].vercel.app/api/scrape-supabase
```

## ⚙️ Variables d'Environnement

### Configuration via Dashboard
1. Aller dans **Settings** → **Environment Variables**
2. Ajouter les variables nécessaires :

```
NODE_ENV=production
SUPABASE_URL=votre_url_supabase
SUPABASE_ANON_KEY=votre_clé_supabase
```

### Configuration via CLI
```bash
# Ajouter une variable
vercel env add NODE_ENV

# Lister les variables
vercel env ls

# Supprimer une variable
vercel env rm NODE_ENV
```

## 🔍 Monitoring et Logs

### Dashboard Vercel
- **Functions** : Statut des serverless functions
- **Analytics** : Métriques de performance
- **Logs** : Logs en temps réel
- **Deployments** : Historique des déploiements

### Logs via CLI
```bash
# Voir les logs en temps réel
vercel logs

# Logs d'une fonction spécifique
vercel logs app/api/scrape-supabase/route.ts
```

## 🚨 Résolution des Problèmes

### Build échoue
1. **Vérifier la configuration** : `vercel-api.json`
2. **Tester en local** : `npm run build:api-only`
3. **Vérifier les logs** : `vercel logs`
4. **Contrôler les dépendances** : `npm install`

### APIs non accessibles
1. **Vérifier le déploiement** : Dashboard Vercel
2. **Tester les URLs** : `curl` ou Postman
3. **Contrôler les CORS** : Headers de réponse
4. **Vérifier les logs** : Erreurs de runtime

### Erreurs CORS
1. **Vérifier l'Origin** : Doit être `https://dlsolutionssarl.tech`
2. **Contrôler les headers** : Dans `vercel-api.json`
3. **Tester avec curl** : Vérifier la réponse OPTIONS
4. **Vérifier le cache** : Clear cache si nécessaire

## 📱 Interface Vercel

### Sections principales :
- **Overview** : Vue d'ensemble du projet
- **Deployments** : Historique des déploiements
- **Functions** : Statut des serverless functions
- **Settings** : Configuration du projet
- **Analytics** : Métriques de performance

### Actions rapides :
- **Redeploy** : Redéployer la dernière version
- **View Function** : Voir le code d'une fonction
- **View Logs** : Accéder aux logs
- **Settings** : Modifier la configuration

## 🔗 Liens Utiles

- [Dashboard Vercel](https://vercel.com/dashboard)
- [Documentation Vercel](https://vercel.com/docs)
- [CLI Vercel](https://vercel.com/docs/cli)

## ✅ Checklist de Configuration

- [ ] Installer Vercel CLI
- [ ] Se connecter à Vercel
- [ ] Configurer le projet
- [ ] Déployer les APIs
- [ ] Noter l'URL de déploiement
- [ ] Tester les APIs
- [ ] Vérifier les CORS
- [ ] Configurer les variables d'environnement
- [ ] Tester le monitoring

## 🎯 Prochaines Étapes

1. **Déployer sur Vercel** : `vercel --prod`
2. **Noter l'URL** : `https://[PROJET].vercel.app`
3. **Mettre à jour Netlify** : Dans `netlify.toml`
4. **Tester l'intégration** : Frontend + APIs
5. **Configurer le monitoring** : Logs et analytics

**Prochaine étape** : Lancer le déploiement Vercel 