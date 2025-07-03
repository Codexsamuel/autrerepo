#!/bin/bash

# Script pour configurer les redirections API vers Vercel
# Usage: ./scripts/setup-api-redirects.sh [URL_BACKEND_VERCEL]

set -e

echo "🔧 Configuration des redirections API..."

# URL du backend Vercel (à remplacer par votre URL réelle)
BACKEND_URL=${1:-"https://votre-backend-api.vercel.app"}

# Créer le fichier _redirects pour Netlify
cat > public/_redirects << EOF
# Redirections API vers Vercel
/api/* ${BACKEND_URL}/api/:splat 200

# Redirections pour les pages SPA
/*    /index.html   200
EOF

echo "✅ Fichier _redirects créé dans public/"
echo "🔗 Redirections configurées vers: ${BACKEND_URL}"
echo ""
echo "📝 Contenu du fichier _redirects:"
cat public/_redirects

echo ""
echo "🚀 Prochaines étapes:"
echo "1. Remplacez '${BACKEND_URL}' par votre vraie URL Vercel"
echo "2. Déployez le backend sur Vercel"
echo "3. Configurez les variables d'environnement sur Netlify"
echo "4. Testez les redirections API" 