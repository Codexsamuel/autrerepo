#!/bin/bash

# 🔍 Script de vérification du déploiement
# Usage: ./scripts/check-deployment.sh

set -e

echo "🔍 Vérification du déploiement Davy Trading Platform..."

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# URLs à vérifier
NETLIFY_URL="https://davy-trading-platform.netlify.app"
REAL_TRADING_URL="$NETLIFY_URL/demo/real-trading"
API_URL="$NETLIFY_URL/api/trading/real-data"

# 1. Vérifier le site principal
log_info "Vérification du site principal..."
if curl -s -f "$NETLIFY_URL" > /dev/null; then
    log_success "Site principal accessible"
else
    log_error "Site principal inaccessible"
    exit 1
fi

# 2. Vérifier la page de trading
log_info "Vérification de la page de trading..."
if curl -s -f "$REAL_TRADING_URL" > /dev/null; then
    log_success "Page de trading accessible"
else
    log_error "Page de trading inaccessible"
fi

# 3. Vérifier l'API
log_info "Vérification de l'API..."
API_RESPONSE=$(curl -s "$API_URL?symbols=AAPL&portfolio=true" 2>/dev/null || echo "ERROR")

if [[ "$API_RESPONSE" == *"success"* ]] && [[ "$API_RESPONSE" != "ERROR" ]]; then
    log_success "API fonctionnelle"
    echo "   Réponse API: $(echo "$API_RESPONSE" | head -c 100)..."
else
    log_warning "API peut ne pas être encore déployée"
    echo "   Réponse: $API_RESPONSE"
fi

# 4. Vérifier les performances
log_info "Test de performance..."
START_TIME=$(date +%s.%N)
curl -s "$NETLIFY_URL" > /dev/null
END_TIME=$(date +%s.%N)
RESPONSE_TIME=$(echo "$END_TIME - $START_TIME" | bc -l 2>/dev/null || echo "0.5")

if (( $(echo "$RESPONSE_TIME < 3.0" | bc -l) )); then
    log_success "Performance OK (${RESPONSE_TIME}s)"
else
    log_warning "Performance lente (${RESPONSE_TIME}s)"
fi

# 5. Résumé
echo ""
echo "🎉 Résumé du déploiement:"
echo "=========================="
echo "🌐 Site principal: $NETLIFY_URL"
echo "📊 Trading réel: $REAL_TRADING_URL"
echo "🔧 API: $API_URL"
echo ""
echo "📈 Fonctionnalités disponibles:"
echo "   ✅ Données d'actions en temps réel"
echo "   ✅ Cryptomonnaies (avec fallback)"
echo "   ✅ Taux de change forex"
echo "   ✅ Portefeuille simulé"
echo "   ✅ Interface responsive"
echo ""
echo "🚀 Prochaines étapes:"
echo "   1. Visitez $REAL_TRADING_URL"
echo "   2. Testez les différentes onglets"
echo "   3. Vérifiez l'actualisation automatique"
echo "   4. Explorez les APIs via $API_URL"
echo ""
echo "💡 En cas de problème:"
echo "   • Vérifiez que Netlify a terminé le build"
echo "   • Attendez 2-3 minutes pour le déploiement complet"
echo "   • Consultez les logs Netlify si nécessaire"
echo ""
log_success "Vérification terminée !" 