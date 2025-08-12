#!/bin/bash

echo "🔧 BUILD NETLIFY AVEC INSTALLATION AUTOMATIQUE DES DÉPENDANCES"

# Configuration
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

echo "🔧 Configuration créée"
echo "📦 Installation des dépendances..."

# Installer les dépendances de base
npm install --production=false --legacy-peer-deps

# Installer les dépendances Stripe spécifiquement
echo "💳 Installation des dépendances Stripe..."
npm install @stripe/stripe-js@^2.4.0 @stripe/react-stripe-js@^2.4.0 --legacy-peer-deps

# Vérifier que les dépendances sont installées
echo "🔍 Vérification des dépendances..."
if [ -d "node_modules/@stripe" ]; then
    echo "✅ Dépendances Stripe installées avec succès"
else
    echo "❌ Échec de l'installation des dépendances Stripe"
    exit 1
fi

echo "🔨 Build Next.js avec dépendances complètes..."
echo "⚠️ Utilisation de la configuration standard avec toutes les dépendances"

# Build avec configuration standard
if next build --no-lint; then
    echo "✅ Build réussi avec dépendances complètes !"
    echo "📱 Frontend prêt pour Netlify"
    exit 0
else
    echo "❌ Échec du build standard"
    echo "🔍 Tentative avec configuration ultra-simple..."
    
    # Utiliser la configuration ultra-simple
    cp next.config.ultra-simple.js next.config.js
    
    if next build --no-lint; then
        echo "✅ Build avec configuration ultra-simple réussi !"
        exit 0
    else
        echo "❌ Échec total du build"
        echo "🚨 Vérifiez la configuration et les dépendances"
        exit 1
    fi
fi 