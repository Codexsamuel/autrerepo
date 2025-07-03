#!/bin/bash

# Script d'optimisation des performances

echo "⚡ Optimisation des performances..."

# Nettoyer les caches
echo "🧹 Nettoyage des caches..."
rm -rf .next
rm -rf out
rm -rf node_modules/.cache

# Réinstaller les dépendances
echo "📦 Réinstallation des dépendances..."
pnpm install --frozen-lockfile

# Vérifier les types
echo "🔍 Vérification des types TypeScript..."
pnpm run type-check

# Linter le code
echo "🎯 Linting du code..."
pnpm run lint

# Build de production
echo "🏗️ Build de production..."
pnpm run build

# Analyse de la taille du bundle
echo "📊 Analyse de la taille du bundle..."
npx @next/bundle-analyzer out

echo "✅ Optimisation terminée !"
echo "🚀 Prêt pour le déploiement" 