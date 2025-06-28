#!/bin/bash

# 🚀 DÉPLOIEMENT RAPIDE VERCEL - DL SOLUTIONS BACKEND

set -e

echo "🚀 DÉPLOIEMENT VERCEL BACKEND"
echo "============================="

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Vérification Vercel CLI
if ! command -v vercel &> /dev/null; then
    log_error "Vercel CLI non installé. Installation..."
    npm install -g vercel
fi

# Nettoyage
log_info "Nettoyage du cache..."
rm -rf .next
rm -rf node_modules/.cache

# Build
log_info "Build du projet..."
pnpm run build

# Déploiement
log_info "Déploiement sur Vercel..."
vercel --prod --yes

log_success "Déploiement Vercel terminé!"
echo ""
echo "🌐 URL du déploiement:"
vercel ls 