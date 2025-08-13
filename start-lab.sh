#!/bin/bash

# Sentinel Zero Lab - Script de démarrage Linux/macOS
# Usage: ./start-lab.sh [start|stop|status|logs]

set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
COMPOSE_FILE="docker-compose.lab.yml"
LAB_NAME="sentinel-zero-lab"

# Fonctions utilitaires
print_header() {
    echo -e "${BLUE}"
    echo "🚀 SENTINEL ZERO LAB - ENVIRONNEMENT DE TEST SÉCURISÉ"
    echo "====================================================="
    echo -e "${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Vérification des prérequis
check_prerequisites() {
    print_info "Vérification des prérequis..."
    
    # Vérifier Docker
    if ! command -v docker &> /dev/null; then
        print_error "Docker n'est pas installé"
        echo "📥 Installez Docker depuis https://docs.docker.com/get-docker/"
        exit 1
    fi
    print_success "Docker détecté"
    
    # Vérifier Docker Compose
    if command -v docker-compose &> /dev/null; then
        COMPOSE_CMD="docker-compose"
    elif docker compose version &> /dev/null; then
        COMPOSE_CMD="docker compose"
    else
        print_error "Docker Compose non disponible"
        exit 1
    fi
    print_success "Docker Compose disponible ($COMPOSE_CMD)"
    
    # Vérifier que Docker daemon fonctionne
    if ! docker info &> /dev/null; then
        print_error "Docker daemon n'est pas accessible"
        echo "🔧 Démarrez Docker Desktop ou le service Docker"
        exit 1
    fi
    print_success "Docker daemon accessible"
}

# Démarrage du lab
start_lab() {
    print_header
    check_prerequisites
    
    print_info "Démarrage du lab Sentinel Zero..."
    
    # Télécharger les images
    print_info "📦 Téléchargement des images Docker..."
    $COMPOSE_CMD -f $COMPOSE_FILE pull
    
    # Démarrer les services
    print_info "🔧 Démarrage des services..."
    $COMPOSE_CMD -f $COMPOSE_FILE up -d
    
    # Attendre le démarrage
    print_info "⏳ Attente du démarrage des services..."
    sleep 30
    
    # Vérifier le statut
    print_info "🔍 Vérification du statut des services..."
    $COMPOSE_CMD -f $COMPOSE_FILE ps
    
    print_success "Lab démarré avec succès !"
    show_access_info
}

# Arrêt du lab
stop_lab() {
    print_info "🛑 Arrêt du lab Sentinel Zero..."
    $COMPOSE_CMD -f $COMPOSE_FILE down
    print_success "Lab arrêté"
}

# Statut du lab
status_lab() {
    print_info "📊 Statut du lab Sentinel Zero..."
    $COMPOSE_CMD -f $COMPOSE_FILE ps
}

# Logs du lab
logs_lab() {
    SERVICE=${1:-""}
    if [ -n "$SERVICE" ]; then
        print_info "📋 Logs du service $SERVICE..."
        $COMPOSE_CMD -f $COMPOSE_FILE logs -f "$SERVICE"
    else
        print_info "📋 Logs de tous les services..."
        $COMPOSE_CMD -f $COMPOSE_FILE logs -f
    fi
}

# Affichage des informations d'accès
show_access_info() {
    echo
    echo -e "${GREEN}🌐 URLs d'accès au lab:${NC}"
    echo "  - OWASP Juice Shop: http://localhost:3000"
    echo "  - DVWA: http://localhost:8080"
    echo "  - Security Shepherd: http://localhost:8081"
    echo "  - Vulnerable API: http://localhost:8082"
    echo "  - Kali Tools (SSH): localhost:8083"
    echo "  - Grafana: http://localhost:3001 (admin/sentinel123)"
    echo "  - Prometheus: http://localhost:9090"
    echo "  - Sentinel Lab API: http://localhost:8084"
    echo
    echo -e "${GREEN}📊 Base de données:${NC}"
    echo "  - PostgreSQL: localhost:5432 (sentinel/sentinel123)"
    echo "  - Redis: localhost:6379"
    echo
    echo -e "${GREEN}🎯 Scripts disponibles dans Kali:${NC}"
    echo "  - sentinel-scan.sh <target> - Scan d'une cible"
    echo "  - sentinel-report.sh <target> - Génération de rapport"
    echo
    echo -e "${GREEN}🔐 Connexion SSH à Kali:${NC}"
    echo "  ssh root@localhost -p 8083"
    echo "  (aucun mot de passe requis en mode lab)"
    echo
    echo -e "${GREEN}📁 Dossiers partagés:${NC}"
    echo "  - ./tools - Outils personnalisés"
    echo "  - ./reports - Rapports de scan"
    echo "  - ./grafana - Configuration Grafana"
    echo "  - ./prometheus - Configuration Prometheus"
    echo
    echo -e "${YELLOW}🚨 IMPORTANT: Ce lab est isolé et sécurisé${NC}"
    echo "  - Toutes les cibles sont volontairement vulnérables"
    echo "  - Utilisez uniquement pour l'apprentissage et les tests"
    echo "  - Ne jamais utiliser sur des systèmes de production"
    echo
    echo -e "${GREEN}🎮 Commandes utiles:${NC}"
    echo "  - $COMPOSE_CMD -f $COMPOSE_FILE logs -f [service]"
    echo "  - $COMPOSE_CMD -f $COMPOSE_FILE restart [service]"
    echo "  - $COMPOSE_CMD -f $COMPOSE_FILE down"
    echo
}

# Nettoyage complet
cleanup_lab() {
    print_warning "🧹 Nettoyage complet du lab..."
    read -p "Êtes-vous sûr de vouloir supprimer tous les conteneurs et volumes ? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        $COMPOSE_CMD -f $COMPOSE_FILE down -v --remove-orphans
        docker system prune -f
        print_success "Nettoyage terminé"
    else
        print_info "Nettoyage annulé"
    fi
}

# Aide
show_help() {
    echo "Usage: $0 [COMMANDE] [OPTIONS]"
    echo
    echo "Commandes:"
    echo "  start     Démarre le lab Sentinel Zero"
    echo "  stop      Arrête le lab"
    echo "  restart   Redémarre le lab"
    echo "  status    Affiche le statut des services"
    echo "  logs      Affiche les logs (optionnel: nom du service)"
    echo "  cleanup   Nettoyage complet (supprime volumes)"
    echo "  help      Affiche cette aide"
    echo
    echo "Exemples:"
    echo "  $0 start"
    echo "  $0 logs juice-shop"
    echo "  $0 status"
}

# Script principal
case "${1:-start}" in
    "start")
        start_lab
        ;;
    "stop")
        stop_lab
        ;;
    "restart")
        stop_lab
        sleep 5
        start_lab
        ;;
    "status")
        status_lab
        ;;
    "logs")
        logs_lab "$2"
        ;;
    "cleanup")
        cleanup_lab
        ;;
    "help"|"-h"|"--help")
        show_help
        ;;
    *)
        print_error "Commande inconnue: $1"
        show_help
        exit 1
        ;;
esac 