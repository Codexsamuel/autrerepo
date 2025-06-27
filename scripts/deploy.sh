#!/bin/bash

# Script de déploiement multi-plateforme pour DAVY Trading Platform
# Usage: ./scripts/deploy.sh [vercel|netlify|docker|all]

set -e

echo "🚀 DAVY Trading Platform - Déploiement Multi-Plateforme"
echo "=================================================="

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

# Vérifier les prérequis
check_prerequisites() {
    log_info "Vérification des prérequis..."
    
    # Vérifier Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js n'est pas installé"
        exit 1
    fi
    
    # Vérifier npm
    if ! command -v npm &> /dev/null; then
        log_error "npm n'est pas installé"
        exit 1
    fi
    
    # Vérifier Git
    if ! command -v git &> /dev/null; then
        log_error "Git n'est pas installé"
        exit 1
    fi
    
    log_success "Prérequis vérifiés"
}

# Build du projet
build_project() {
    log_info "Build du projet..."
    
    # Installer les dépendances
    npm install
    
    # Build pour la production
    npm run build
    
    log_success "Build terminé"
}

# Déploiement Vercel (Backend)
deploy_vercel() {
    log_info "Déploiement sur Vercel (Backend)..."
    
    if ! command -v vercel &> /dev/null; then
        log_warning "Vercel CLI non installé, installation..."
        npm install -g vercel
    fi
    
    # Déployer sur Vercel
    vercel --prod --yes
    
    log_success "Déploiement Vercel terminé"
}

# Déploiement Netlify (Frontend)
deploy_netlify() {
    log_info "Déploiement sur Netlify (Frontend)..."
    
    if ! command -v netlify &> /dev/null; then
        log_warning "Netlify CLI non installé, installation..."
        npm install -g netlify-cli
    fi
    
    # Build statique
    npm run build:static
    
    # Déployer sur Netlify
    netlify deploy --prod --dir=out
    
    log_success "Déploiement Netlify terminé"
}

# Déploiement Docker
deploy_docker() {
    log_info "Déploiement Docker..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker n'est pas installé"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose n'est pas installé"
        exit 1
    fi
    
    # Construire et démarrer les conteneurs
    docker-compose up -d --build
    
    log_success "Déploiement Docker terminé"
    log_info "Frontend: http://localhost:3000"
    log_info "Backend: http://localhost:3001"
    log_info "Base de données: localhost:5432"
    log_info "Redis: localhost:6379"
}

# Déploiement complet
deploy_all() {
    log_info "Déploiement complet sur toutes les plateformes..."
    
    build_project
    deploy_vercel
    deploy_netlify
    deploy_docker
    
    log_success "Déploiement complet terminé !"
}

# Fonction principale
main() {
    local target=${1:-all}
    
    check_prerequisites
    
    case $target in
        "vercel")
            build_project
            deploy_vercel
            ;;
        "netlify")
            build_project
            deploy_netlify
            ;;
        "docker")
            build_project
            deploy_docker
            ;;
        "all")
            deploy_all
            ;;
        *)
            log_error "Usage: $0 [vercel|netlify|docker|all]"
            exit 1
            ;;
    esac
}

# Exécuter le script
main "$@" 