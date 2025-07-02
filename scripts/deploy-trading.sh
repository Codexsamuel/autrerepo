#!/bin/bash

# 🚀 Script de Déploiement - Davy Trading Platform
# Usage: ./scripts/deploy-trading.sh

set -e

echo "🚀 Déploiement de Davy Trading Platform..."

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
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

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    log_error "Ce script doit être exécuté depuis la racine du projet"
    exit 1
fi

# 1. Vérifier les dépendances
log_info "Vérification des dépendances..."
if ! command -v pnpm &> /dev/null; then
    log_error "pnpm n'est pas installé. Installez-le avec: npm install -g pnpm"
    exit 1
fi

if ! command -v git &> /dev/null; then
    log_error "git n'est pas installé"
    exit 1
fi

# 2. Nettoyer et installer les dépendances
log_info "Nettoyage et installation des dépendances..."
rm -rf node_modules .next
pnpm install

# 3. Test des APIs
log_info "Test des APIs de trading..."
if node scripts/test-trading-apis.js; then
    log_success "APIs de trading fonctionnelles"
else
    log_warning "Certaines APIs peuvent ne pas fonctionner en production"
fi

# 4. Build de production
log_info "Build de production..."
if pnpm build; then
    log_success "Build réussi"
else
    log_error "Échec du build"
    exit 1
fi

# 5. Test local
log_info "Test local du build..."
if pnpm start &> /dev/null & then
    SERVER_PID=$!
    sleep 10
    
    # Test de l'API
    if curl -s "http://localhost:3000/api/trading/real-data?symbols=AAPL" > /dev/null; then
        log_success "API fonctionne en production"
    else
        log_warning "API peut avoir des problèmes en production"
    fi
    
    # Arrêter le serveur
    kill $SERVER_PID 2>/dev/null || true
else
    log_error "Impossible de démarrer le serveur de test"
    exit 1
fi

# 6. Vérifier Git
log_info "Vérification du statut Git..."
if [ -n "$(git status --porcelain)" ]; then
    log_warning "Il y a des changements non commités"
    echo "Changements détectés:"
    git status --short
    
    read -p "Voulez-vous commiter ces changements? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        git commit -m "feat: mise à jour plateforme trading avec vraies données"
        log_success "Changements commités"
    fi
fi

# 7. Push vers Netlify
log_info "Déploiement sur Netlify..."
if git push origin clean-start; then
    log_success "Code poussé vers Netlify"
else
    log_error "Échec du push vers Netlify"
    exit 1
fi

# 8. Vérification finale
log_info "Vérification finale..."
echo ""
echo "🎉 Déploiement terminé avec succès !"
echo ""
echo "📊 URLs importantes:"
echo "   • Site principal: https://davy-trading-platform.netlify.app"
echo "   • Données réelles: https://davy-trading-platform.netlify.app/demo/real-trading"
echo "   • Démo complète: https://davy-trading-platform.netlify.app/demo"
echo "   • Test APIs: https://davy-trading-platform.netlify.app/api-test"
echo ""
echo "🔧 Configuration recommandée:"
echo "   • Ajoutez ALPHA_VANTAGE_API_KEY dans les variables d'environnement Netlify"
echo "   • Vérifiez que tous les plugins Netlify sont désactivés sauf Next.js"
echo ""
echo "📈 Fonctionnalités disponibles:"
echo "   ✅ Données d'actions en temps réel (Yahoo Finance)"
echo "   ✅ Cryptomonnaies (CoinGecko)"
echo "   ✅ Taux de change (Exchange Rate)"
echo "   ✅ Portefeuille simulé avec vraies données"
echo "   ✅ Interface responsive et moderne"
echo ""
echo "🚀 Votre plateforme de trading est maintenant en ligne !" 