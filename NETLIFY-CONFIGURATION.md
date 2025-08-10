# 🌐 Configuration Netlify - DL Solutions Platform

## 📋 Vue d'ensemble
- **Rôle** : Hébergement du frontend Next.js
- **Domaine** : dlsolutionssarl.tech
- **Build** : `npm run build:netlify`
- **Publish** : `.next` directory

## 🔧 Configuration du Site

### Étape 1: Créer un Nouveau Site
1. Se connecter à [Netlify](https://app.netlify.com)
2. Cliquer sur **"New site from Git"**
3. Choisir **GitHub** comme provider
4. Sélectionner le repository **DL Solutions Platform**

### Étape 2: Configuration du Build
```
Build command: npm run build:netlify
Publish directory: .next
Base directory: (laisser vide)
```

### Étape 3: Variables d'Environnement
```
NODE_VERSION: 18
NPM_FLAGS: --legacy-peer-deps
NODE_ENV: production
```

## 🌍 Configuration du Domaine

### Étape 1: Ajouter le Domaine Personnalisé
1. Aller dans **"Domain management"**
2. Cliquer sur **"Add custom domain"**
3. Entrer : `dlsolutionssarl.tech`

### Étape 2: Configuration DNS
1. **Option recommandée** : Utiliser les nameservers Netlify
2. **Alternative** : Configuration manuelle avec Hostinger

#### Nameservers Netlify (Recommandé)
```
ns1.p01.dnsone.net
ns2.p01.dnsone.net
ns3.p01.dnsone.net
ns4.p01.dnsone.net
```

#### Configuration Manuelle (Si nameservers Hostinger)
```
Type: A
Nom: @
Valeur: 75.2.60.5
TTL: 300

Type: CNAME
Nom: www
Valeur: dlsolutionssarl.tech
TTL: 300
```

### Étape 3: SSL/HTTPS
1. **Automatique** : Netlify provisionne le certificat
2. **Délai** : 24-48h après la configuration DNS
3. **Vérification** : Cadenas vert dans le navigateur

## 🔄 Configuration des Redirects

### Fichier `netlify.toml` (déjà configuré)
```toml
[[redirects]]
  from = "/api/*"
  to = "https://[PROJET].vercel.app/api/:splat"
  status = 200
  force = true

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Redirects via l'Interface Netlify
1. Aller dans **"Site settings"** → **"Redirects"**
2. Ajouter manuellement si nécessaire
3. **Important** : Mettre à jour l'URL Vercel après déploiement

## 🚀 Déploiement Automatique

### Configuration Git
1. **Branch de production** : `main`
2. **Déploiement automatique** : Activé par défaut
3. **Preview deployments** : Pour les pull requests

### Déclencheurs de Build
- **Push sur main** → Déploiement production
- **Pull request** → Preview deployment
- **Build manuel** → Via l'interface Netlify

## 🔍 Vérification de la Configuration

### 1. Test du Build
```bash
# Test local
npm run build:netlify

# Vérifier le dossier .next
ls -la .next
```

### 2. Test du Déploiement
1. Faire un commit et push
2. Vérifier le build sur Netlify
3. Contrôler les logs de build
4. Tester le site déployé

### 3. Test du Domaine
```bash
# Vérifier la résolution
nslookup dlsolutionssarl.tech

# Tester l'accès
curl -I https://dlsolutionssarl.tech
```

## ⚙️ Paramètres Avancés

### Performance
- **Asset optimization** : Activé
- **Image optimization** : Activé
- **Minification** : Activé

### Sécurité
- **HSTS** : Activé
- **Security headers** : Configurés
- **Rate limiting** : Par défaut

### Monitoring
- **Analytics** : Netlify Analytics
- **Logs** : Accessibles via l'interface
- **Notifications** : Email/Slack

## 🚨 Résolution des Problèmes

### Build échoue
1. Vérifier les logs de build
2. Tester en local : `npm run build:netlify`
3. Vérifier les variables d'environnement
4. Contrôler les dépendances

### Domaine non accessible
1. Vérifier la configuration DNS
2. Attendre la propagation (24-48h)
3. Contrôler les nameservers
4. Vérifier les redirects

### SSL non fonctionnel
1. Attendre le provisionnement (24-48h)
2. Vérifier la configuration DNS
3. Contrôler les certificats
4. Contacter le support si nécessaire

## 📱 Interface Netlify

### Sections principales :
- **Overview** : Statut du site
- **Deploys** : Historique des déploiements
- **Domain management** : Gestion des domaines
- **Site settings** : Configuration avancée
- **Analytics** : Statistiques et performance

### Actions rapides :
- **Trigger deploy** : Déploiement manuel
- **Clear cache** : Nettoyer le cache
- **Rollback** : Revenir à une version précédente

## 🔗 Liens Utiles

- [Dashboard Netlify](https://app.netlify.com)
- [Documentation Netlify](https://docs.netlify.com)
- [Support Netlify](https://www.netlify.com/support/)

## ✅ Checklist de Configuration

- [ ] Créer le site sur Netlify
- [ ] Connecter le repository GitHub
- [ ] Configurer le build command
- [ ] Ajouter le domaine personnalisé
- [ ] Configurer les nameservers ou DNS
- [ ] Tester le déploiement automatique
- [ ] Vérifier SSL/HTTPS
- [ ] Configurer les redirects vers Vercel
- [ ] Tester le site complet

**Prochaine étape** : Configurer Vercel pour les APIs 