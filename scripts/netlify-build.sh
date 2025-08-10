#!/bin/bash

echo "🚀 Démarrage du build Netlify..."

# Créer un répertoire temporaire pour les service workers
echo "🔧 Préparation des fichiers pour le build..."
mkdir -p temp-sw

# Déplacer les service workers temporairement
if [ -f "public/sw.js" ]; then
    echo "📦 Déplacement de sw.js..."
    mv public/sw.js temp-sw/
fi

if [ -f "public/images/sw.js" ]; then
    echo "📦 Déplacement de images/sw.js..."
    mv public/images/sw.js temp-sw/
fi

# Déplacer les fichiers workbox
for file in public/images/workbox-*.js; do
    if [ -f "$file" ]; then
        echo "📦 Déplacement de $(basename "$file")..."
        mv "$file" temp-sw/
    fi
done

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm ci

# Construire l'application
echo "🔨 Construction de l'application..."
npm run build:netlify

# Restaurer les service workers
echo "🔄 Restauration des service workers..."
if [ -d "temp-sw" ]; then
    mv temp-sw/* public/ 2>/dev/null || true
    rmdir temp-sw 2>/dev/null || true
fi

echo "✅ Build terminé avec succès!" 