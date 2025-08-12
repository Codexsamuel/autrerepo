#!/bin/bash

echo "🚀 Build hybride Netlify : Frontend Next.js + Backend Python séparé"

# Configuration pour build hybride
export NETLIFY=true
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1
export NEXT_PUBLIC_API_MODE=hybrid

# Vérifier que nous sommes sur Netlify
if [ "$NETLIFY" = "true" ]; then
    echo "✅ Environnement Netlify détecté"
    echo "🔧 Mode hybride : Frontend sur Netlify, Backend Python séparé"
    
    # Créer un fichier de configuration pour l'API backend
    echo "📝 Configuration de l'API backend..."
    cat > .env.production << EOF
# Configuration hybride
NEXT_PUBLIC_API_MODE=hybrid
NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL:-https://your-backend-domain.com}
NEXT_PUBLIC_NETLIFY=true
EOF
    
    # Build Next.js pour le frontend
    echo "🔨 Build du frontend Next.js..."
    npm run build:netlify:compatible
    
    echo "✅ Build hybride terminé avec succès"
    echo "📱 Frontend prêt pour Netlify"
    echo "🐍 Backend Python à déployer séparément"
else
    echo "⚠️ Environnement local détecté, build standard..."
    npm run build:netlify:compatible
fi 