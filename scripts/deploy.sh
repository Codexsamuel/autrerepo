#!/bin/bash

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Fonction pour afficher les messages
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

success() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] ✅ $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ❌ $1${NC}"
    exit 1
}

warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] ⚠️ $1${NC}"
}

# Vérification des dépendances
check_dependencies() {
    log "Vérification des dépendances..."
    
    # Vérifier Node.js
    if ! command -v node &> /dev/null; then
        error "Node.js n'est pas installé"
    fi
    NODE_VERSION=$(node -v)
    log "Node.js version: $NODE_VERSION"
    
    # Vérifier pnpm
    if ! command -v pnpm &> /dev/null; then
        warning "pnpm n'est pas installé"
        log "Installation de pnpm..."
        npm install -g pnpm || error "Échec de l'installation de pnpm"
    fi
    PNPM_VERSION=$(pnpm --version)
    log "pnpm version: $PNPM_VERSION"
    
    # Vérifier Netlify CLI
    if ! command -v netlify &> /dev/null; then
        warning "Netlify CLI n'est pas installé"
        log "Installation de Netlify CLI..."
        pnpm add -g netlify-cli || error "Échec de l'installation de Netlify CLI"
    fi
    NETLIFY_VERSION=$(netlify --version)
    log "Netlify CLI version: $NETLIFY_VERSION"
    
    # Vérifier Vercel CLI
    if ! command -v vercel &> /dev/null; then
        warning "Vercel CLI n'est pas installé"
        log "Installation de Vercel CLI..."
        pnpm add -g vercel || error "Échec de l'installation de Vercel CLI"
    fi
    VERCEL_VERSION=$(vercel --version)
    log "Vercel CLI version: $VERCEL_VERSION"
    
    success "Toutes les dépendances sont installées"
}

# Installation des dépendances du projet
install_dependencies() {
    log "Installation des dépendances du projet..."
    pnpm install || error "Échec de l'installation des dépendances"
    success "Dépendances installées avec succès"
}

# Exécution des tests
run_tests() {
    log "Exécution des tests..."
    
    # Tests unitaires
    log "Lancement des tests unitaires..."
    pnpm test || error "Les tests unitaires ont échoué"
    
    # Tests de couverture
    log "Vérification de la couverture des tests..."
    pnpm test:coverage || warning "La couverture des tests n'est pas optimale"
    
    # Tests E2E
    log "Lancement des tests E2E..."
    # Démarrer le serveur de développement en arrière-plan
    pnpm dev &
    DEV_PID=$!
    
    # Attendre que le serveur soit prêt
    log "Attente du démarrage du serveur..."
    sleep 10
    
    # Exécuter les tests E2E
    pnpm cypress:run || error "Les tests E2E ont échoué"
    
    # Arrêter le serveur de développement
    kill $DEV_PID
    
    success "Tous les tests sont passés"
}

# Déploiement du frontend sur Netlify
deploy_frontend() {
    log "Déploiement du frontend sur Netlify..."
    
    # Vérifier les variables d'environnement
    if [ -z "$NETLIFY_AUTH_TOKEN" ]; then
        error "NETLIFY_AUTH_TOKEN n'est pas défini"
    fi
    
    if [ -z "$NETLIFY_SITE_ID" ]; then
        error "NETLIFY_SITE_ID n'est pas défini"
    fi
    
    # Build du frontend
    log "Build du frontend..."
    pnpm build || error "Échec du build du frontend"
    
    # Déploiement
    log "Déploiement sur Netlify..."
    netlify deploy --prod --dir=.next --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID || error "Échec du déploiement sur Netlify"
    
    success "Frontend déployé avec succès sur Netlify"
}

# Déploiement du backend sur Vercel
deploy_backend() {
    log "Déploiement du backend sur Vercel..."
    
    # Vérifier les variables d'environnement
    if [ -z "$VERCEL_TOKEN" ]; then
        error "VERCEL_TOKEN n'est pas défini"
    fi
    
    if [ -z "$VERCEL_ORG_ID" ]; then
        error "VERCEL_ORG_ID n'est pas défini"
    fi
    
    if [ -z "$VERCEL_PROJECT_ID" ]; then
        error "VERCEL_PROJECT_ID n'est pas défini"
    fi
    
    # Vérifier si .env.production existe
    if [ ! -f .env.production ]; then
        warning "Fichier .env.production non trouvé"
        log "Création du fichier .env.production..."
        
        # Créer le fichier .env.production avec les variables essentielles
        cat > .env.production << EOL
NODE_ENV=production
PORT=3000
DATABASE_URL=${DATABASE_URL}
JWT_SECRET=${JWT_SECRET}
JWT_EXPIRES_IN=7d
STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
STRIPE_WEBHOOK_SECRET=${STRIPE_WEBHOOK_SECRET}
NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
EOL
        
        if [ ! -f .env.production ]; then
            error "Impossible de créer le fichier .env.production"
        fi
    fi
    
    # Build du backend
    log "Build du backend..."
    cd backend && pnpm build || error "Échec du build du backend"
    
    # Déploiement
    log "Déploiement sur Vercel..."
    vercel --prod --token=$VERCEL_TOKEN --scope=$VERCEL_ORG_ID --confirm || error "Échec du déploiement sur Vercel"
    
    success "Backend déployé avec succès sur Vercel"
}

# Fonction principale
main() {
    log "Démarrage du processus de déploiement..."
    
    # Vérification des dépendances
    check_dependencies
    
    # Installation des dépendances
    install_dependencies
    
    # Exécution des tests
    run_tests
    
    # Déploiement du frontend
    deploy_frontend
    
    # Déploiement du backend
    deploy_backend
    
    success "Déploiement terminé avec succès!"
}

# Exécution du script
main 