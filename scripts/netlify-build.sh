#!/bin/bash

# Script de build Netlify simplifié et robuste
# Ce script exécute le build Next.js avec des options optimisées pour Netlify

set -e

echo "🚀 Démarrage du build Netlify..."

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: package.json non trouvé. Assurez-vous d'être dans le répertoire racine du projet."
    exit 1
fi

# Nettoyer les caches et builds précédents
echo "🧹 Nettoyage des caches..."
rm -rf .next
rm -rf .swc
rm -rf node_modules/.cache

# Vérifier les dépendances
echo "📦 Vérification des dépendances..."
npm list --depth=0 || echo "⚠️ Certaines dépendances peuvent être manquantes"

# Exécuter le build Next.js avec des options optimisées
echo "🏗️ Exécution du build Next.js..."
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=production

# Build avec options de débogage et sans linting
next build --no-lint --debug

# Vérifier que le build a réussi
if [ -d ".next" ]; then
    echo "✅ Build terminé avec succès!"
    echo "📁 Contenu du répertoire .next:"
    ls -la .next/
else
    echo "❌ Erreur: Le build a échoué - répertoire .next non trouvé"
    exit 1
fi

echo "🎉 Build Netlify terminé avec succès!" 