#!/bin/bash

echo "🚀 Déploiement Backend DL Solutions sur Vercel"

# Vérifier que Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI non installé. Installation..."
    npm install -g vercel
fi

# Vérifier la configuration
echo "📋 Vérification de la configuration..."
if [ ! -f "vercel.json" ]; then
    echo "❌ vercel.json manquant"
    exit 1
fi

if [ ! -f "package-backend.json" ]; then
    echo "❌ package-backend.json manquant"
    exit 1
fi

# Copier le package backend
echo "📦 Configuration du package backend..."
cp package-backend.json package.json

# Déployer
echo "🚀 Déploiement en cours..."
vercel --prod

# Restaurer le package original
echo "🔄 Restauration du package original..."
git checkout package.json

echo "✅ Déploiement terminé !"
echo "🌐 URL: https://dl-solutions-backend.vercel.app" 