# Guide de Dépannage des Builds Netlify

## Problème Principal : Erreur SelfReferenceFixer

### Symptômes
```
TypeError: Cannot read properties of undefined (reading 'forEach')
at lib/webpack-plugins/self-reference-fixer.js:79:29
```

### Causes
- Plugin webpack personnalisé incompatible avec Next.js 15
- Hooks webpack obsolètes ou non disponibles
- Conflits entre versions de webpack

## Solutions

### 1. Solution Immédiate (Recommandée)
Utiliser le script de build sans plugin :
```bash
npm run build:netlify:no-plugin
```

### 2. Solution d'Urgence
Script de build d'urgence qui désactive tout :
```bash
npm run build:netlify:emergency
```

### 3. Configuration Netlify
Le fichier `netlify.toml` est configuré pour utiliser automatiquement le mode sans plugin.

## Variables d'Environnement

### Désactiver le Plugin
```bash
export DISABLE_SELF_REFERENCE_FIXER=1
```

### Configuration Webpack Alternative
```bash
export USE_ALTERNATIVE_WEBPACK=true
```

### Mode Production
```bash
export NODE_ENV=production
export NETLIFY=true
```

## Scripts Disponibles

| Script | Description | Utilisation |
|--------|-------------|-------------|
| `build:netlify:no-plugin` | Build sans plugin SelfReferenceFixer | Production |
| `build:netlify:emergency` | Build d'urgence complet | En cas d'échec |
| `build:netlify:simple` | Build standard | Développement |
| `build:netlify:robust` | Build avec plugin | Test |

## Dépannage Étape par Étape

### Étape 1 : Vérifier la Configuration
```bash
# Vérifier que la variable est définie
echo $DISABLE_SELF_REFERENCE_FIXER
```

### Étape 2 : Nettoyer les Caches
```bash
rm -rf .next
rm -rf node_modules/.cache
rm -rf .swc
```

### Étape 3 : Réinstaller les Dépendances
```bash
npm ci --production=false --legacy-peer-deps --force
```

### Étape 4 : Build de Test
```bash
npm run build:netlify:no-plugin
```

## Configuration Webpack Alternative

Si le build échoue encore, la configuration alternative :
- Désactive la minification
- Supprime les minimizers
- Configure des fallbacks pour tous les modules Node.js

## Monitoring

### Logs de Build
- Vérifier les logs Netlify pour identifier les erreurs
- Utiliser `--debug` pour plus de détails
- Surveiller les warnings webpack

### Métriques
- Temps de build
- Taille des bundles
- Erreurs de compilation

## Prévention

### 1. Tests Locaux
Toujours tester localement avant de déployer :
```bash
npm run build:netlify:no-plugin
```

### 2. Validation des Plugins
Vérifier la compatibilité des plugins webpack avec Next.js 15

### 3. Mise à Jour
Maintenir les dépendances à jour, surtout webpack et Next.js

## Support

En cas de problème persistant :
1. Utiliser le script d'urgence
2. Vérifier les logs Netlify
3. Tester avec une configuration minimale
4. Consulter la documentation Next.js 15

## Fichiers de Configuration

- `next.config.js` : Configuration Next.js principale
- `netlify.toml` : Configuration Netlify
- `lib/webpack-plugins/self-reference-fixer.js` : Plugin problématique
- `scripts/netlify-build-emergency.sh` : Script d'urgence 