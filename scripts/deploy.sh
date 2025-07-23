#!/bin/bash

echo "🚀 Déploiement DL Solutions Platform"
echo "====================================="

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
    log_error "package.json non trouvé. Assurez-vous d'être dans le répertoire du projet."
    exit 1
fi

log_info "Nettoyage du cache..."
rm -rf .next
rm -rf node_modules/.cache

log_info "Installation des dépendances..."
npm install --legacy-peer-deps

log_info "Build de production..."
npm run build:netlify

if [ $? -eq 0 ]; then
    log_success "Build réussi !"
else
    log_error "Échec du build"
    exit 1
fi

log_info "Vérification des fichiers de build..."
if [ -d ".next" ]; then
    log_success "Dossier .next créé avec succès"
else
    log_error "Dossier .next manquant"
    exit 1
fi

log_info "Préparation pour le déploiement..."
# Créer un fichier de version pour le déploiement
echo "Build: $(date)" > .next/BUILD_INFO.txt
echo "Version: $(git rev-parse --short HEAD)" >> .next/BUILD_INFO.txt

log_success "Prêt pour le déploiement !"
echo ""
echo "📋 Prochaines étapes :"
echo "1. Connectez-vous à Netlify"
echo "2. Déployez depuis la branche 'clean-start'"
echo "3. Configurez le domaine personnalisé"
echo "4. Activez les fonctions serverless"
echo ""
echo "🔗 URL de déploiement : https://app.netlify.com"
echo "🌐 Domaine cible : daveandlucesolutions.com" 