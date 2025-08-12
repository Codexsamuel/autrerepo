#!/bin/bash

echo "🚀 Déploiement automatique VPS - NovaCore AI"

# Configuration
VPS_HOST=${VPS_HOST:-"your-vps-ip"}
VPS_USER=${VPS_USER:-"root"}
VPS_PATH=${VPS_PATH:-"/var/www/novacore"}
BACKUP_PATH=${BACKUP_PATH:-"/var/backups/novacore"}

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction de log
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[ERREUR] $1${NC}"
    exit 1
}

warning() {
    echo -e "${YELLOW}[ATTENTION] $1${NC}"
}

# Vérification des prérequis
check_prerequisites() {
    log "Vérification des prérequis..."
    
    if ! command -v docker &> /dev/null; then
        error "Docker n'est pas installé"
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        error "Docker Compose n'est pas installé"
    fi
    
    if [ -z "$VPS_HOST" ] || [ "$VPS_HOST" = "your-vps-ip" ]; then
        error "VPS_HOST n'est pas configuré"
    fi
    
    log "✅ Prérequis vérifiés"
}

# Backup avant déploiement
backup() {
    log "Création du backup..."
    
    BACKUP_FILE="novacore-backup-$(date +%Y%m%d-%H%M%S).tar.gz"
    
    if ssh $VPS_USER@$VPS_HOST "cd $VPS_PATH && tar -czf $BACKUP_PATH/$BACKUP_FILE ."; then
        log "✅ Backup créé: $BACKUP_FILE"
    else
        warning "⚠️ Échec du backup, continuation du déploiement"
    fi
}

# Build de l'application
build() {
    log "Build de l'application..."
    
    # Build Docker
    if docker-compose build; then
        log "✅ Build Docker réussi"
    else
        error "❌ Échec du build Docker"
    fi
    
    # Build Next.js
    if npm run build:production; then
        log "✅ Build Next.js réussi"
    else
        error "❌ Échec du build Next.js"
    fi
}

# Déploiement sur le VPS
deploy() {
    log "Déploiement sur le VPS..."
    
    # Créer le dossier de déploiement
    ssh $VPS_USER@$VPS_HOST "mkdir -p $VPS_PATH"
    
    # Copier les fichiers
    rsync -avz --exclude 'node_modules' --exclude '.git' --exclude '.next' . $VPS_USER@$VPS_HOST:$VPS_PATH/
    
    if [ $? -eq 0 ]; then
        log "✅ Fichiers copiés sur le VPS"
    else
        error "❌ Échec de la copie des fichiers"
    fi
    
    # Copier le build Next.js
    rsync -avz .next/ $VPS_USER@$VPS_HOST:$VPS_PATH/.next/
    
    if [ $? -eq 0 ]; then
        log "✅ Build Next.js copié sur le VPS"
    else
        error "❌ Échec de la copie du build"
    fi
}

# Démarrage des services
start_services() {
    log "Démarrage des services sur le VPS..."
    
    ssh $VPS_USER@$VPS_HOST "cd $VPS_PATH && docker-compose down"
    ssh $VPS_USER@$VPS_HOST "cd $VPS_PATH && docker-compose up -d"
    
    if [ $? -eq 0 ]; then
        log "✅ Services démarrés sur le VPS"
    else
        error "❌ Échec du démarrage des services"
    fi
}

# Vérification du déploiement
verify() {
    log "Vérification du déploiement..."
    
    # Attendre que les services démarrent
    sleep 10
    
    # Vérifier le frontend
    if curl -f "http://$VPS_HOST:3000/health" > /dev/null 2>&1; then
        log "✅ Frontend accessible"
    else
        warning "⚠️ Frontend non accessible"
    fi
    
    # Vérifier le backend
    if curl -f "http://$VPS_HOST:8000/health" > /dev/null 2>&1; then
        log "✅ Backend accessible"
    else
        warning "⚠️ Backend non accessible"
    fi
    
    # Vérifier Nginx
    if curl -f "http://$VPS_HOST/health" > /dev/null 2>&1; then
        log "✅ Nginx accessible"
    else
        warning "⚠️ Nginx non accessible"
    fi
}

# Nettoyage
cleanup() {
    log "Nettoyage des fichiers temporaires..."
    
    # Supprimer les images Docker non utilisées
    docker image prune -f
    
    # Supprimer les conteneurs arrêtés
    docker container prune -f
    
    log "✅ Nettoyage terminé"
}

# Fonction principale
main() {
    log "🚀 Début du déploiement VPS"
    
    check_prerequisites
    backup
    build
    deploy
    start_services
    verify
    cleanup
    
    log "🎉 Déploiement terminé avec succès !"
    log "📱 Frontend: http://$VPS_HOST:3000"
    log "🐍 Backend: http://$VPS_HOST:8000"
    log "🌐 Nginx: http://$VPS_HOST"
}

# Exécution
main "$@" 