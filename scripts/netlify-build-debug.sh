#!/bin/bash

# Script de build Netlify avec débogage complet
# Ce script fournit des informations détaillées pour diagnostiquer les problèmes de build

set -e

echo "🔍 Démarrage du build Netlify avec débogage complet..."

# Informations système
echo "📋 Informations système:"
echo "   OS: $(uname -a)"
echo "   Node: $(node --version)"
echo "   NPM: $(npm --version)"
echo "   PWD: $(pwd)"
echo "   User: $(whoami)"

# Vérifier la structure du projet
echo "📁 Structure du projet:"
ls -la

# Vérifier les fichiers de configuration
echo "⚙️ Fichiers de configuration:"
if [ -f "package.json" ]; then
    echo "   ✅ package.json trouvé"
    echo "   📦 Scripts disponibles:"
    npm run --silent 2>/dev/null | grep "build:" || echo "   ⚠️ Aucun script build trouvé"
else
    echo "   ❌ package.json non trouvé"
    exit 1
fi

if [ -f "next.config.js" ]; then
    echo "   ✅ next.config.js trouvé"
else
    echo "   ❌ next.config.js non trouvé"
fi

if [ -f "tsconfig.json" ]; then
    echo "   ✅ tsconfig.json trouvé"
else
    echo "   ❌ tsconfig.json non trouvé"
fi

# Vérifier les dépendances
echo "📦 Vérification des dépendances:"
npm list --depth=0 --json 2>/dev/null | jq -r '.dependencies | keys[]' 2>/dev/null || echo "   ⚠️ Impossible de lister les dépendances"

# Nettoyer les caches
echo "🧹 Nettoyage des caches..."
rm -rf .next .swc node_modules/.cache

# Test de build étape par étape
echo "🏗️ Test de build étape par étape..."

# Étape 1: Vérification TypeScript
echo "   🔍 Étape 1: Vérification TypeScript..."
npx tsc --noEmit --skipLibCheck || echo "   ⚠️ Erreurs TypeScript détectées (non bloquantes)"

# Étape 2: Vérification ESLint
echo "   🔍 Étape 2: Vérification ESLint..."
npx next lint --dir app --fix || echo "   ⚠️ Erreurs ESLint détectées (non bloquantes)"

# Étape 3: Build Next.js
echo "   🏗️ Étape 3: Build Next.js..."
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=production

# Build avec options de débogage
next build --no-lint --debug

# Vérifier le résultat du build
if [ -d ".next" ]; then
    echo "✅ Build réussi!"
    echo "📁 Contenu du répertoire .next:"
    ls -la .next/
    
    if [ -d ".next/static" ]; then
        echo "📁 Contenu du répertoire .next/static:"
        ls -la .next/static/
    fi
else
    echo "❌ Build échoué - répertoire .next non trouvé"
    exit 1
fi

echo "🎉 Build Netlify avec débogage terminé avec succès!" 