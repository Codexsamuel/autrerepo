#!/bin/bash

# Script de monitoring du déploiement Netlify
# Usage: ./scripts/monitor-deploy.sh

set -e

echo "🔍 Monitoring du déploiement Netlify..."

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Vérifier si netlify-cli est installé
if ! command -v netlify &> /dev/null; then
    echo -e "${YELLOW}⚠️  netlify-cli n'est pas installé${NC}"
    echo "📦 Installation: npm install -g netlify-cli"
    echo ""
    echo "🔗 Ou surveillez manuellement sur: https://app.netlify.com"
    exit 0
fi

echo -e "${BLUE}📊 Récupération du statut du déploiement...${NC}"

# Récupérer le statut du dernier déploiement
DEPLOY_STATUS=$(netlify status --json 2>/dev/null | jq -r '.status' 2>/dev/null || echo "unknown")

case $DEPLOY_STATUS in
    "ready")
        echo -e "${GREEN}✅ Déploiement réussi !${NC}"
        SITE_URL=$(netlify status --json 2>/dev/null | jq -r '.url' 2>/dev/null || echo "URL non disponible")
        echo -e "${GREEN}🌐 Site accessible sur: ${SITE_URL}${NC}"
        ;;
    "building")
        echo -e "${YELLOW}🏗️  Déploiement en cours...${NC}"
        echo "⏳ Patientez quelques minutes..."
        ;;
    "error")
        echo -e "${RED}❌ Erreur de déploiement${NC}"
        echo "📋 Vérifiez les logs sur: https://app.netlify.com"
        ;;
    *)
        echo -e "${YELLOW}⚠️  Statut inconnu: $DEPLOY_STATUS${NC}"
        echo "🔗 Vérifiez manuellement sur: https://app.netlify.com"
        ;;
esac

echo ""
echo -e "${BLUE}📋 Logs récents:${NC}"
netlify logs --tail=10 2>/dev/null || echo "Impossible de récupérer les logs"

echo ""
echo -e "${BLUE}🚀 Prochaines étapes:${NC}"
echo "1. Vérifiez que le site est accessible"
echo "2. Testez les fonctionnalités principales"
echo "3. Configurez les variables d'environnement si nécessaire"
echo "4. Activez les redirections pour les API routes" 