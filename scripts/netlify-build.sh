#!/bin/bash

# Script de build Netlify robuste pour éviter l'erreur 'self is not defined'
# Ce script déplace temporairement tous les fichiers service worker pendant le build

set -e

echo "🚀 Démarrage du build Netlify..."

# Créer le répertoire temporaire pour les service workers
echo "🔧 Préparation de l'environnement de build..."
mkdir -p temp-sw

# Déplacer tous les fichiers service worker
echo "📦 Déplacement des fichiers service worker..."
find public -name "sw*.js" -exec mv {} temp-sw/ \; 2>/dev/null || true
find public -name "workbox*.js" -exec mv {} temp-sw/ \; 2>/dev/null || true
find public -name "*sw*.js" -exec mv {} temp-sw/ \; 2>/dev/null || true
find public -name "*workbox*" -exec mv {} temp-sw/ \; 2>/dev/null || true

# Vérifier qu'aucun fichier service worker ne reste
echo "🔍 Vérification des fichiers restants..."
if find public -name "*workbox*" -o -name "*sw*.js" | grep -q .; then
    echo "⚠️ Des fichiers service worker sont encore présents:"
    find public -name "*workbox*" -o -name "*sw*.js"
    echo "🗑️ Suppression forcée..."
    find public -name "*workbox*" -o -name "*sw*.js" -delete
else
    echo "✅ Tous les fichiers service worker ont été déplacés"
fi

# Lister le contenu du répertoire temporaire
echo "📋 Fichiers déplacés:"
ls -la temp-sw/ 2>/dev/null || echo "Aucun fichier service worker trouvé"

# Exécuter le build Next.js
echo "🏗️ Exécution du build Next.js..."
NEXT_TELEMETRY_DISABLED=1 next build --no-lint --debug

# Restaurer les fichiers service worker
echo "🔄 Restauration des service workers..."
mv temp-sw/* public/ 2>/dev/null || true
rmdir temp-sw 2>/dev/null || true

echo "✅ Build terminé avec succès!" 