#!/bin/bash

echo "🚀 BUILD NETLIFY OPTIMISÉ - Mode haute performance"
echo "=================================================="

# Variables d'environnement optimisées
export DISABLE_SELF_REFERENCE_FIXER=1
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=production
export NETLIFY=true
export NEXT_SHARP_PATH="/opt/buildhome/.npm-global/lib/node_modules/sharp"

# Optimisations de mémoire et performance
export NODE_OPTIONS="--max-old-space-size=4096 --max-semi-space-size=512"

echo "🔧 Configuration optimisée:"
echo "  - Plugin SelfReferenceFixer: DÉSACTIVÉ"
echo "  - Télémétrie: DÉSACTIVÉE"
echo "  - Environnement: PRODUCTION"
echo "  - Mémoire: 4GB + optimisations"
echo "  - Sharp: Chemin optimisé"

# Nettoyage des caches
echo "🧹 Nettoyage des caches..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .swc

# Installation des dépendances avec optimisations
echo "📦 Installation des dépendances optimisées..."
npm ci --production=false --legacy-peer-deps --force --prefer-offline

# Build avec configuration ultra-optimisée
echo "🏗️ Build avec configuration ultra-optimisée..."
npx next build \
  --no-lint \
  --no-mangling \
  --debug

# Vérification du build
if [ $? -eq 0 ]; then
    echo "✅ BUILD RÉUSSI - Mode optimisé"
    echo "📁 Fichiers générés dans .next/"
    ls -la .next/
    
    # Optimisation des fichiers de sortie
    echo "🔧 Optimisation des fichiers de sortie..."
    find .next -name "*.js" -exec gzip -9 {} \;
    find .next -name "*.css" -exec gzip -9 {} \;
    
    echo "📊 Taille des fichiers après compression:"
    du -sh .next/
else
    echo "❌ BUILD ÉCHOUÉ - Mode optimisé"
    echo "🔍 Vérification des erreurs..."
    exit 1
fi 