#!/bin/bash

echo "🔍 Vérification du statut du déploiement..."

# URL du site
SITE_URL="https://daveandlucesolutions.com"

echo "📊 Test de connectivité..."
if curl -s --head "$SITE_URL" > /dev/null; then
    echo "✅ Site accessible"
else
    echo "❌ Site non accessible"
    exit 1
fi

echo ""
echo "🔗 Test des pages principales..."

# Pages à tester
pages=(
    "/"
    "/services"
    "/formations"
    "/contact"
    "/demo"
    "/trading"
    "/dl-style"
    "/dl-travel"
    "/novacore"
    "/admin"
)

for page in "${pages[@]}"; do
    if curl -s --head "$SITE_URL$page" > /dev/null; then
        echo "✅ $page"
    else
        echo "❌ $page"
    fi
done

echo ""
echo "🚀 Déploiement terminé !"
echo "🌐 Site: $SITE_URL"
echo "💻 Local: http://localhost:3000" 