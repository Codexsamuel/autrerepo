#!/bin/bash

echo "🚨 BUILD D'URGENCE NETLIFY - Mode de survie activé"
echo "=================================================="

# Variables d'environnement d'urgence
export DISABLE_SELF_REFERENCE_FIXER=1
export USE_ALTERNATIVE_WEBPACK=true
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=production
export NETLIFY=true

echo "🔧 Configuration d'urgence:"
echo "  - Plugin SelfReferenceFixer: DÉSACTIVÉ"
echo "  - Configuration webpack: ALTERNATIVE"
echo "  - Télémétrie: DÉSACTIVÉE"
echo "  - Environnement: PRODUCTION"

# Nettoyage des caches
echo "🧹 Nettoyage des caches..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .swc

# Installation des dépendances
echo "📦 Installation des dépendances..."
npm ci --production=false --legacy-peer-deps --force

# Build avec configuration minimale
echo "🏗️ Build avec configuration minimale..."
npx next build --no-lint --no-mangling --no-optimize-packages

# Vérification du build
if [ $? -eq 0 ]; then
    echo "✅ BUILD RÉUSSI - Mode d'urgence"
    echo "📁 Fichiers générés dans .next/"
    ls -la .next/
else
    echo "❌ BUILD ÉCHOUÉ - Mode d'urgence"
    echo "🔍 Vérification des erreurs..."
    exit 1
fi 