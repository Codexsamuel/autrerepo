# 🔧 Guide de Debug du Plugin SelfReferenceFixer

## 📋 Vue d'ensemble

Le plugin **SelfReferenceFixer** est un plugin Webpack personnalisé qui corrige automatiquement les références à `self` pendant le build Next.js pour éviter l'erreur `ReferenceError: self is not defined` pendant le SSR.

## 🚀 Activation du Mode Debug

### Méthode 1: Script automatique (Recommandé)
```bash
npm run debug:plugin
```

Ce script :
- Crée automatiquement le fichier `.env.local`
- Configure toutes les variables d'environnement nécessaires
- Active le mode debug du plugin

### Méthode 2: Variables d'environnement manuelles
```bash
# Dans .env.local ou en ligne de commande
DEBUG_SELF_REFERENCE_FIXER=true
NODE_ENV=development
```

### Méthode 3: Ligne de commande directe
```bash
DEBUG_SELF_REFERENCE_FIXER=true npm run test:secure-build:local
```

## 🧪 Tests Disponibles

### Test du Plugin avec Debug
```bash
npm run test:plugin:debug
```
- Lance le build sécurisé avec debug activé
- Affiche les informations détaillées du plugin
- Montre le traitement de chaque chunk

### Test de Vérification du Plugin
```bash
npm run test:plugin
```
- Vérifie que toutes les références à `self` ont été supprimées
- Scanne tous les fichiers de chunks générés
- Génère un rapport détaillé

### Test du Build Sécurisé Local
```bash
npm run test:secure-build:local
```
- Build complet avec plugin sécurisé
- Mode développement pour tests locaux
- Optimisations de performance activées

## 🔍 Informations de Debug

### Niveaux de Debug
Le plugin affiche différentes informations selon le niveau de debug :

#### Niveau Basique (défaut)
- ✅ Plugin ajouté avec succès
- ✅ Build terminé avec succès

#### Niveau Debug (DEBUG_SELF_REFERENCE_FIXER=true)
- 🔍 Traitement des modules
- 🔍 Traitement des chunks
- 🔍 Traitement des assets
- 📊 Statistiques de transformation
- ⚠️ Avertissements et erreurs

### Hooks Webpack Utilisés
Le plugin utilise plusieurs hooks Webpack 5+ pour une couverture complète :

1. **compilation** - Hook principal de compilation
2. **normalModuleFactory** - Traitement des modules
3. **afterProcessAssets** - Traitement post-assets
4. **afterChunkAssets** - Traitement post-chunks
5. **afterEmit** - Traitement final

## 🛠️ Configuration Avancée

### Options du Plugin
```javascript
new SelfReferenceFixerPlugin({
  replaceWith: 'undefined',  // Valeur de remplacement
  debug: true,               // Mode debug
  // Autres options...
})
```

### Configuration dans next.config.js
```javascript
// Le plugin est automatiquement configuré
// avec les options de debug appropriées
if (!process.env.DISABLE_SELF_REFERENCE_FIXER) {
  const SelfReferenceFixerPlugin = require('./lib/webpack-plugins/self-reference-fixer');
  config.plugins.push(new SelfReferenceFixerPlugin({
    replaceWith: 'undefined',
    debug: process.env.DEBUG_SELF_REFERENCE_FIXER === 'true' || process.env.NODE_ENV === 'development'
  }));
}
```

## 📊 Monitoring et Performance

### Métriques de Performance
- **Temps de compilation** : Affiché pendant le build
- **Nombre de pages générées** : Rapporté par Next.js
- **Taille des chunks** : Optimisée automatiquement
- **Mémoire utilisée** : Surveillée pendant le build

### Indicateurs de Succès
- ✅ Build terminé sans erreur
- ✅ Aucune référence à `self` dans les chunks finaux
- ✅ Toutes les pages générées avec succès
- ✅ Plugin appliqué à tous les stades

## 🚨 Dépannage

### Problèmes Courants

#### 1. Plugin non chargé
```bash
# Vérifier que le plugin est présent
ls lib/webpack-plugins/self-reference-fixer.js

# Vérifier la configuration
cat next.config.js | grep SelfReferenceFixer
```

#### 2. Mode debug non activé
```bash
# Vérifier les variables d'environnement
cat .env.local | grep DEBUG

# Ou activer manuellement
export DEBUG_SELF_REFERENCE_FIXER=true
```

#### 3. Erreurs de build persistantes
```bash
# Nettoyer les caches
rm -rf .next/
rm -rf node_modules/.cache/

# Relancer le build
npm run test:secure-build:local
```

### Logs de Debug
Les logs de debug incluent :
- 🔍 **Module Processing** : Traitement de chaque module
- 🔍 **Chunk Processing** : Traitement des chunks
- 🔍 **Asset Processing** : Traitement des assets
- 📊 **Statistics** : Statistiques de transformation
- ⚠️ **Warnings** : Avertissements et erreurs

## 🔒 Sécurité

### Fonctionnalités de Sécurité
- 🛡️ **Télémétrie désactivée** : Aucune donnée externe
- 🔒 **Build isolé** : Environnement de build sécurisé
- 🧹 **Nettoyage des caches** : Environnement propre
- 📦 **Dépendances vérifiées** : Packages sécurisés

### Variables d'Environnement Sécurisées
```bash
# Variables de sécurité
NODE_ENV=production
NETLIFY_BUILD_LOCAL=false
DEBUG_SELF_REFERENCE_FIXER=false  # En production
```

## 📚 Ressources Additionnelles

### Documentation Technique
- [Plugin SelfReferenceFixer](../lib/webpack-plugins/self-reference-fixer.js)
- [Script de Build Sécurisé](../scripts/netlify-build-secure.sh)
- [Configuration Next.js](../next.config.js)

### Scripts Utiles
- [Configuration Debug](../scripts/debug-config.sh)
- [Test du Plugin](../scripts/test-self-reference-fixer.js)

### Tests et Validation
- [Tests de Build](../package.json#scripts)
- [Validation des Chunks](../scripts/test-self-reference-fixer.js)

---

## 🎯 Résumé des Commandes

| Commande | Description | Usage |
|----------|-------------|-------|
| `npm run debug:plugin` | Active le mode debug | Configuration |
| `npm run test:plugin:debug` | Test avec debug | Développement |
| `npm run test:plugin` | Vérification du plugin | Validation |
| `npm run test:secure-build:local` | Build local sécurisé | Test local |

---

**Note** : Ce guide est mis à jour régulièrement avec les nouvelles fonctionnalités et améliorations du plugin SelfReferenceFixer. 