# 🚀 Guide de Déploiement Hybride - DL Solutions Platform

## 📋 Vue d'ensemble
Ce projet utilise une **architecture hybride** :
- **Frontend** : Déployé sur Netlify (dlsolutionssarl.tech)
- **APIs** : Déployées sur Vercel (serverless functions)

## 🎯 Avantages de cette approche
- ✅ **Netlify** : Excellent pour le frontend statique, CDN global, déploiement automatique
- ✅ **Vercel** : Optimisé pour les APIs Next.js, serverless functions, performance
- ✅ **Séparation des préoccupations** : Frontend et backend indépendants
- ✅ **Scalabilité** : Chaque partie peut évoluer séparément

## 🔧 Configuration actuelle

### 1. Netlify (Frontend)
- **Domaine** : dlsolutionssarl.tech
- **Build** : `npm run build:netlify`
- **Publish** : `.next` directory
- **Redirects** : APIs → Vercel

### 2. Vercel (APIs)
- **Build** : `npm run build:api-only`
- **Runtime** : Node.js 18.x
- **CORS** : Configuré pour dlsolutionssarl.tech

## 🚀 Étapes de déploiement

### Étape 1 : Déployer les APIs sur Vercel

```bash
# Installer Vercel CLI si pas déjà fait
npm i -g vercel

# Se connecter à Vercel
vercel login

# Déployer les APIs
vercel --prod

# Noter l'URL de déploiement (ex: https://dl-solutions-api.vercel.app)
```

### Étape 2 : Mettre à jour la configuration Netlify

1. **Modifier `netlify.toml`** :
```toml
[[redirects]]
  from = "/api/*"
  to = "https://VOTRE_URL_VERCEL.vercel.app/api/:splat"
  status = 200
  force = true
```

2. **Remplacer `VOTRE_URL_VERCEL`** par l'URL obtenue à l'étape 1

### Étape 3 : Déployer le frontend sur Netlify

```bash
# Commiter les changements
git add .
git commit -m "Configuration hybride: APIs sur Vercel, frontend sur Netlify"
git push origin main

# Netlify se déploiera automatiquement
```

## 🔍 Vérification du déploiement

### Test des APIs
```bash
# Tester une API
curl https://VOTRE_URL_VERCEL.vercel.app/api/scrape-supabase

# Vérifier les CORS
curl -H "Origin: https://dlsolutionssarl.tech" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://VOTRE_URL_VERCEL.vercel.app/api/scrape-supabase
```

### Test du frontend
1. Visiter https://dlsolutionssarl.tech
2. Vérifier que les appels API fonctionnent
3. Contrôler la console du navigateur pour les erreurs CORS

## 🛠️ Scripts utiles

```bash
# Voir le guide de déploiement
npm run deploy:hybrid

# Déployer sur Vercel
npm run deploy:vercel

# Déployer sur Netlify
npm run deploy:netlify

# Build pour Netlify
npm run build:netlify

# Build pour Vercel (APIs uniquement)
npm run build:api-only
```

## 🔧 Résolution des problèmes

### Erreur CORS
- Vérifier que l'URL dans `vercel-api.json` correspond à votre domaine Netlify
- Contrôler que les headers CORS sont bien configurés

### APIs non accessibles
- Vérifier que l'URL de redirection dans `netlify.toml` est correcte
- Contrôler que Vercel est bien déployé et accessible

### Build échoue
- Utiliser `npm run build:netlify` pour Netlify
- Utiliser `npm run build:api-only` pour Vercel
- Vérifier que `next.config.js` a les bonnes configurations

## 📚 Ressources
- [Documentation Netlify](https://docs.netlify.com/)
- [Documentation Vercel](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

## 🆘 Support
En cas de problème :
1. Vérifier les logs de build sur Netlify et Vercel
2. Contrôler la console du navigateur
3. Tester les APIs directement avec curl/Postman
4. Vérifier la configuration des domaines et DNS
