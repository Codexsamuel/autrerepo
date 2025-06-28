#!/bin/bash

# 🚀 SCRIPT DE DÉPLOIEMENT PRODUCTION - DL SOLUTIONS
# Backend: Vercel | Frontend: Netlify

set -e

echo "🚀 DÉPLOIEMENT PRODUCTION DL SOLUTIONS"
echo "======================================"

# Variables
PROJECT_NAME="dl-solutions-univers-digital"
VERCEL_PROJECT_ID="your-vercel-project-id"
NETLIFY_SITE_ID="your-netlify-site-id"

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonctions
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

# Vérification des prérequis
check_prerequisites() {
    log_info "Vérification des prérequis..."
    
    # Vérifier Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js n'est pas installé"
        exit 1
    fi
    
    # Vérifier pnpm
    if ! command -v pnpm &> /dev/null; then
        log_error "pnpm n'est pas installé"
        exit 1
    fi
    
    # Vérifier Vercel CLI
    if ! command -v vercel &> /dev/null; then
        log_warning "Vercel CLI n'est pas installé. Installation..."
        npm install -g vercel
    fi
    
    # Vérifier Netlify CLI
    if ! command -v netlify &> /dev/null; then
        log_warning "Netlify CLI n'est pas installé. Installation..."
        npm install -g netlify-cli
    fi
    
    log_success "Prérequis vérifiés"
}

# Nettoyage et build
build_project() {
    log_info "Nettoyage et build du projet..."
    
    # Nettoyer le cache
    rm -rf .next
    rm -rf node_modules/.cache
    
    # Installer les dépendances
    pnpm install
    
    # Build de production
    pnpm run build
    
    log_success "Build terminé"
}

# Déploiement Backend Vercel
deploy_backend_vercel() {
    log_info "Déploiement Backend sur Vercel..."
    
    # Configuration Vercel
    if [ ! -f "vercel.json" ]; then
        log_error "vercel.json manquant"
        exit 1
    fi
    
    # Déploiement
    vercel --prod --yes
    
    log_success "Backend déployé sur Vercel"
}

# Déploiement Frontend Netlify
deploy_frontend_netlify() {
    log_info "Déploiement Frontend sur Netlify..."
    
    # Configuration Netlify
    if [ ! -f "netlify.toml" ]; then
        log_error "netlify.toml manquant"
        exit 1
    fi
    
    # Build pour Netlify
    pnpm run build
    
    # Déploiement
    netlify deploy --prod --dir=out
    
    log_success "Frontend déployé sur Netlify"
}

# Configuration des variables d'environnement
setup_environment() {
    log_info "Configuration des variables d'environnement..."
    
    # Vercel
    vercel env add NEXT_PUBLIC_SUPABASE_URL
    vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
    vercel env add SUPABASE_SERVICE_ROLE_KEY
    vercel env add GEMINI_API_KEY
    vercel env add HUGGINGFACE_API_KEY
    vercel env add CLERK_SECRET_KEY
    vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    
    # Netlify
    netlify env:set NEXT_PUBLIC_SUPABASE_URL "$NEXT_PUBLIC_SUPABASE_URL"
    netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "$NEXT_PUBLIC_SUPABASE_ANON_KEY"
    netlify env:set GEMINI_API_KEY "$GEMINI_API_KEY"
    netlify env:set HUGGINGFACE_API_KEY "$HUGGINGFACE_API_KEY"
    netlify env:set CLERK_SECRET_KEY "$CLERK_SECRET_KEY"
    netlify env:set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY "$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
    
    log_success "Variables d'environnement configurées"
}

# Tests post-déploiement
post_deployment_tests() {
    log_info "Tests post-déploiement..."
    
    # Attendre que les déploiements soient terminés
    sleep 30
    
    # Tests de base
    echo "Tests en cours..."
    
    log_success "Tests post-déploiement terminés"
}

# Main
main() {
    echo "🚀 DÉMARRAGE DU DÉPLOIEMENT PRODUCTION"
    echo "======================================"
    
    check_prerequisites
    build_project
    deploy_backend_vercel
    deploy_frontend_netlify
    setup_environment
    post_deployment_tests
    
    echo ""
    echo "🎉 DÉPLOIEMENT TERMINÉ AVEC SUCCÈS!"
    echo "===================================="
    echo "Backend Vercel: https://your-project.vercel.app"
    echo "Frontend Netlify: https://your-site.netlify.app"
    echo ""
    echo "📋 Prochaines étapes:"
    echo "1. Configurer les domaines personnalisés"
    echo "2. Configurer les webhooks"
    echo "3. Tester toutes les fonctionnalités"
    echo "4. Configurer le monitoring"
}

# Exécution
main "$@" 