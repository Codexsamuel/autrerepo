# 🌐 Configuration DNS Vercel - daveandlucesolutions.com

## 📋 État Actuel de votre Configuration

### Domaine Principal
- **Domaine** : `daveandlucesolutions.com`
- **Registrar** : Hostinger
- **Nameservers** : `ns1.dns-parking.com`, `ns2.dns-parking.com`

### Déploiements Actuels
- **Frontend Netlify** : `shimmering-croquembouche-e04b31.netlify.app`
- **API Vercel** : `1573934a08a5e8b5.vercel-dns-017.com`

## 🚀 Migration Complète vers Vercel

### Étape 1 : Déployer sur Vercel
```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter à Vercel
vercel login

# Déployer le projet
vercel --prod
```

### Étape 2 : Configuration DNS Hostinger

#### Option A : Utiliser les Nameservers Vercel (Recommandé)
1. **Aller sur Hostinger** → Domaines → daveandlucesolutions.com
2. **Changer les nameservers** vers :
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
3. **Attendre 24-48h** pour la propagation

#### Option B : Configuration DNS Manuelle
Garder les nameservers actuels et ajouter ces records :

| Type | Nom | Valeur | TTL |
|------|-----|--------|-----|
| A | @ | 76.76.19.76 | 3600 |
| CNAME | www | cname.vercel-dns.com | 3600 |
| CNAME | api | cname.vercel-dns.com | 3600 |

### Étape 3 : Configuration Vercel

#### Ajouter le Domaine
1. **Dashboard Vercel** → Projet → Settings → Domains
2. **Ajouter** : `daveandlucesolutions.com`
3. **Ajouter** : `www.daveandlucesolutions.com`
4. **Configurer la redirection** : www → domaine principal

#### Variables d'Environnement
Dans Vercel Dashboard → Settings → Environment Variables :

```env
# Base
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://daveandlucesolutions.com

# Supabase
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
SUPABASE_SERVICE_ROLE_KEY=votre_clé_service
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon

# OpenAI
OPENAI_API_KEY=votre_clé_openai

# Stripe
STRIPE_SECRET_KEY=votre_clé_stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=votre_clé_publique

# Google
GOOGLE_ANALYTICS_ID=votre_id_ga
NEXT_PUBLIC_GA_ID=votre_id_ga

# Autres APIs
RAPIDAPI_KEY=votre_clé_rapidapi
ELEVENLABS_API_KEY=votre_clé_elevenlabs
GEMINI_API_KEY=votre_clé_gemini
```

## 🔄 Migration des Données

### Étape 4 : Migrer depuis Netlify
1. **Exporter les variables d'environnement** de Netlify
2. **Les importer** dans Vercel
3. **Vérifier** que toutes les APIs fonctionnent

### Étape 5 : Tests de Validation
```bash
# Test local
npm run dev

# Test build
npm run build:vercel

# Test déploiement
vercel --prod
```

## 📊 Avantages de la Migration Vercel

### Performance
- ⚡ **Build** : 25s vs 2min (Netlify)
- 📦 **Bundle** : 102kB vs 531kB
- 🌐 **CDN** : Distribution globale automatique

### Fonctionnalités
- 🔄 **Déploiements automatiques** sur chaque commit
- 👀 **Preview** automatique
- 🔧 **Configuration API** automatique
- 📈 **Analytics** intégrés

### SEO
- ✅ **452 pages** optimisées
- 🎯 **Structured data** automatique
- 📱 **PWA** ready
- 🔍 **Sitemap** automatique

## 🎯 URLs Finales

### Production
- **Site principal** : `https://daveandlucesolutions.com`
- **API** : `https://daveandlucesolutions.com/api/*`
- **Portfolio Batobaye** : `https://daveandlucesolutions.com/portfolio/batobaye`

### Développement
- **Preview** : `https://daveandlucesolutions.com-git-clean-start-codexsamuel.vercel.app`
- **Staging** : `https://daveandlucesolutions.com-git-staging-codexsamuel.vercel.app`

## 🔧 Configuration Post-Migration

### Redirections
```javascript
// next.config.js
async redirects() {
  return [
    {
      source: '/home',
      destination: '/',
      permanent: true,
    },
    {
      source: '/old-netlify-url',
      destination: '/',
      permanent: true,
    },
  ];
}
```

### Headers de Sécurité
```javascript
// next.config.js
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
      ],
    },
  ];
}
```

## ✅ Checklist de Migration

- [ ] Déployer sur Vercel
- [ ] Configurer le domaine dans Vercel
- [ ] Changer les nameservers ou DNS records
- [ ] Importer les variables d'environnement
- [ ] Tester toutes les fonctionnalités
- [ ] Configurer les redirections
- [ ] Vérifier le SEO
- [ ] Tester les APIs
- [ ] Valider la performance
- [ ] Mettre en production

## 🎉 Résultat Final

Après la migration, vous aurez :
- 🚀 **Site ultra-rapide** sur Vercel
- 🌐 **Domaine personnalisé** : daveandlucesolutions.com
- 🔧 **APIs fonctionnelles** automatiquement
- 📈 **SEO optimisé** pour Google
- 🔄 **Déploiements automatiques**

Le projet DL Solutions Platform sera parfaitement déployé sur Vercel avec votre domaine ! 🎯 