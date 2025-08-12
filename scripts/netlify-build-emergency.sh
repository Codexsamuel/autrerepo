#!/bin/bash

echo "🚨 BUILD D'URGENCE NETLIFY - Mode ultra-simple"

# Configuration minimale
export NETLIFY=true
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1
export NEXT_PUBLIC_NETLIFY=true

# Variables d'environnement essentielles
export NEXT_PUBLIC_API_MODE=hybrid
export NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL:-https://your-backend-domain.com}

# Créer un fichier .env minimal
cat > .env.production << EOF
NEXT_PUBLIC_API_MODE=hybrid
NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
NEXT_PUBLIC_NETLIFY=true
EOF

echo "🔧 Configuration minimale créée"
echo "📦 Installation des dépendances..."

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    npm install --production=false
fi

echo "🔨 Build Next.js en mode d'urgence..."
echo "⚠️ Utilisation de la configuration la plus simple possible"

# Build avec les options les plus simples
if next build --no-lint --no-mangling --no-export; then
    echo "✅ Build d'urgence réussi !"
    echo "📱 Frontend prêt pour Netlify"
    exit 0
else
    echo "❌ Échec du build d'urgence"
    echo "🔍 Tentative de build sans optimisation..."
    
    if next build --no-lint --no-mangling --no-export --no-optimization; then
        echo "✅ Build sans optimisation réussi !"
        exit 0
    else
        echo "❌ Échec total du build"
        echo "🚨 Vérifiez la configuration et les dépendances"
        exit 1
    fi
fi 