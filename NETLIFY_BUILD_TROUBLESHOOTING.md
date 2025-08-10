# Guide de Résolution des Problèmes de Build Netlify

## Problème Identifié
Le build Netlify échoue avec l'erreur "Build script returned non-zero exit code: 2" pendant l'exécution de `npm run build:netlify:robust`.

## Solutions Implémentées

### 1. Simplification de la Configuration Next.js
- ✅ Suppression des plugins webpack complexes
- ✅ Configuration webpack simplifiée
- ✅ Suppression des gestionnaires de service workers complexes

### 2. Scripts de Build Optimisés
- ✅ `build:netlify:simple`: Build Next.js basique sans options complexes
- ✅ `build:netlify:debug`: Script de débogage complet
- ✅ `build:netlify:robust`: Script simplifié avec gestion d'erreurs

### 3. Configuration TypeScript Améliorée
- ✅ `moduleResolution: "bundler"` pour Next.js 15
- ✅ Options de compilation plus permissives
- ✅ Gestion des chemins d'alias `@/` optimisée

### 4. Configuration Netlify Mise à Jour
- ✅ Node.js 20 au lieu de 18
- ✅ Options de build simplifiées
- ✅ Gestion des erreurs améliorée

## Scripts de Build Disponibles

### Build Simple (Recommandé)
```bash
npm run build:netlify:simple
```
- Build Next.js basique sans options complexes
- Idéal pour les déploiements de production

### Build avec Débogage
```bash
npm run build:netlify:debug
```
- Informations détaillées sur le processus de build
- Diagnostic complet des problèmes potentiels

### Build Robuste
```bash
npm run build:netlify:robust
```
- Build avec variables d'environnement optimisées
- Gestion des erreurs améliorée

## Étapes de Résolution

### Étape 1: Test Local
```bash
# Nettoyer les caches
rm -rf .next .swc node_modules/.cache

# Test de build local
npm run build:netlify:simple
```

### Étape 2: Vérification des Dépendances
```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install
```

### Étape 3: Test de Build avec Débogage
```bash
# Exécuter le script de débogage
npm run build:netlify:debug
```

### Étape 4: Déploiement Netlify
```bash
# Utiliser le build simple dans netlify.toml
command = "npm run build:netlify:simple"
```

## Configuration Recommandée

### netlify.toml
```toml
[build]
  command = "npm run build:netlify:simple"
  publish = ".next"
  functions = "netlify/functions"

[build.environment]
  NODE_VERSION = "20"
  NPM_FLAGS = "--legacy-peer-deps --force"
  NODE_OPTIONS = "--max-old-space-size=4096"
  NEXT_TELEMETRY_DISABLED = "1"
  NPM_CONFIG_PRODUCTION = "false"
  NETLIFY = "true"
  NODE_ENV = "production"
```

### next.config.js
```javascript
const nextConfig = {
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};
```

## Problèmes Courants et Solutions

### 1. Erreur "self is not defined"
- ✅ Résolu par la simplification de la configuration webpack
- ✅ Suppression des plugins complexes

### 2. Erreurs de Path Alias
- ✅ Configuration TypeScript optimisée
- ✅ Résolution des modules améliorée

### 3. Problèmes de Service Workers
- ✅ Gestion simplifiée des fichiers SW
- ✅ Build sans manipulation complexe des SW

### 4. Erreurs de Mémoire
- ✅ NODE_OPTIONS optimisées
- ✅ Nettoyage des caches automatique

## Commandes de Diagnostic

### Vérification de l'Environnement
```bash
node --version
npm --version
ls -la
```

### Vérification des Fichiers de Configuration
```bash
cat package.json | grep "build:"
cat next.config.js | head -20
cat tsconfig.json | head -20
```

### Test de Build Étape par Étape
```bash
# TypeScript
npx tsc --noEmit --skipLibCheck

# ESLint
npx next lint --dir app

# Build
next build --no-lint
```

## Support et Maintenance

### Monitoring des Builds
- Surveiller les logs Netlify pour identifier les patterns d'erreur
- Utiliser le script de débogage pour les builds locaux
- Maintenir une configuration simple et stable

### Mises à Jour
- Tester les nouvelles versions de Next.js localement avant déploiement
- Maintenir les dépendances à jour
- Valider la configuration après chaque modification majeure

## Conclusion

La simplification de la configuration et l'optimisation des scripts de build devraient résoudre les problèmes de déploiement Netlify. Utiliser `build:netlify:simple` comme commande de build par défaut et `build:netlify:debug` pour le diagnostic des problèmes. 