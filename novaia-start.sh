#!/bin/bash

# =============================================================================
# NOVAIA - Script de Démarrage Rapide
# =============================================================================
# Ce script automatise l'installation et le démarrage de NovaIA

set -e  # Arrêter en cas d'erreur

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Fonction d'affichage avec couleur
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${PURPLE}================================${NC}"
    echo -e "${PURPLE}  NOVAIA - Démarrage Rapide${NC}"
    echo -e "${PURPLE}================================${NC}"
    echo ""
}

# Vérification des prérequis
check_prerequisites() {
    print_status "Vérification des prérequis..."
    
    # Vérifier Docker
    if ! command -v docker &> /dev/null; then
        print_error "Docker n'est pas installé. Veuillez installer Docker Desktop."
        exit 1
    fi
    
    # Vérifier Docker Compose
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        print_error "Docker Compose n'est pas installé."
        exit 1
    fi
    
    # Vérifier Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js n'est pas installé. Veuillez installer Node.js 20+."
        exit 1
    fi
    
    # Vérifier pnpm
    if ! command -v pnpm &> /dev/null; then
        print_warning "pnpm n'est pas installé. Installation..."
        npm install -g pnpm
    fi
    
    # Vérifier la version de Node.js
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 20 ]; then
        print_error "Node.js 20+ est requis. Version actuelle: $(node -v)"
        exit 1
    fi
    
    print_success "Tous les prérequis sont satisfaits!"
}

# Configuration de l'environnement
setup_environment() {
    print_status "Configuration de l'environnement..."
    
    # Créer le fichier .env s'il n'existe pas
    if [ ! -f .env ]; then
        if [ -f .env.example ]; then
            cp .env.example .env
            print_success "Fichier .env créé à partir de .env.example"
        else
            print_warning "Fichier .env.example non trouvé. Création d'un .env basique..."
            cat > .env << EOF
# NOVAIA - Configuration d'environnement
NODE_ENV=development
ENVIRONMENT=local

# Base de données
POSTGRES_USER=nova
POSTGRES_PASSWORD=nova
POSTGRES_DB=nova
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

# Redis
REDIS_URL=redis://localhost:6379

# Ollama
OLLAMA_HOST=http://localhost:11434

# APIs
CONTROL_API_URL=http://localhost:4000
AGENTS_API_URL=http://localhost:8000

# Sécurité
JWT_SECRET=novaia-super-secret-key-change-in-production
EOF
            print_success "Fichier .env basique créé"
        fi
    else
        print_status "Fichier .env existe déjà"
    fi
    
    # Créer les dossiers nécessaires
    mkdir -p data/faiss
    mkdir -p logs
    mkdir -p models
    print_success "Dossiers de données créés"
}

# Installation des dépendances
install_dependencies() {
    print_status "Installation des dépendances..."
    
    if [ -f package.json ]; then
        pnpm install
        print_success "Dépendances Node.js installées"
    else
        print_error "package.json non trouvé. Assurez-vous d'être dans le bon répertoire."
        exit 1
    fi
}

# Démarrage de l'infrastructure Docker
start_infrastructure() {
    print_status "Démarrage de l'infrastructure Docker..."
    
    # Vérifier que Docker est en cours d'exécution
    if ! docker info &> /dev/null; then
        print_error "Docker n'est pas en cours d'exécution. Veuillez démarrer Docker Desktop."
        exit 1
    fi
    
    # Lancer l'infrastructure
    if [ -f docker-compose.yml ]; then
        docker-compose up -d postgres redis
        print_success "Base de données et Redis démarrés"
        
        # Attendre que PostgreSQL soit prêt
        print_status "Attente de la disponibilité de PostgreSQL..."
        sleep 10
        
        # Vérifier la connexion PostgreSQL
        for i in {1..30}; do
            if docker-compose exec -T postgres pg_isready -U nova &> /dev/null; then
                print_success "PostgreSQL est prêt"
                break
            fi
            if [ $i -eq 30 ]; then
                print_error "PostgreSQL n'est pas prêt après 30 tentatives"
                exit 1
            fi
            sleep 2
        done
        
        # Démarrer Ollama
        docker-compose up -d ollama
        print_success "Ollama démarré"
        
        # Attendre qu'Ollama soit prêt
        print_status "Attente de la disponibilité d'Ollama..."
        sleep 15
        
        # Vérifier Ollama
        for i in {1..20}; do
            if curl -s http://localhost:11434/api/tags &> /dev/null; then
                print_success "Ollama est prêt"
                break
            fi
            if [ $i -eq 20 ]; then
                print_warning "Ollama n'est pas prêt après 20 tentatives, mais on continue..."
                break
            fi
            sleep 3
        done
        
    else
        print_error "docker-compose.yml non trouvé"
        exit 1
    fi
}

# Téléchargement des modèles Ollama
download_models() {
    print_status "Téléchargement des modèles Ollama..."
    
    # Modèle LLM principal
    print_status "Téléchargement de llama3.1:8b-instruct-q4_K_M..."
    if curl -s http://localhost:11434/api/pull -d '{"name":"llama3.1:8b-instruct-q4_K_M"}' &> /dev/null; then
        print_success "Modèle LLM téléchargé"
    else
        print_warning "Échec du téléchargement du modèle LLM"
    fi
    
    # Modèle d'embeddings
    print_status "Téléchargement de nomic-embed-text..."
    if curl -s http://localhost:11434/api/pull -d '{"name":"nomic-embed-text"}' &> /dev/null; then
        print_success "Modèle d'embeddings téléchargé"
    else
        print_warning "Échec du téléchargement du modèle d'embeddings"
    fi
    
    print_status "Téléchargement des modèles terminé"
}

# Démarrage des services
start_services() {
    print_status "Démarrage des services..."
    
    # Démarrer les APIs
    docker-compose up -d agents-api control-api
    print_success "APIs démarrées"
    
    # Attendre que les APIs soient prêtes
    print_status "Attente de la disponibilité des APIs..."
    sleep 10
    
    # Vérifier l'API des agents
    for i in {1..15}; do
        if curl -s http://localhost:8000/health &> /dev/null; then
            print_success "API des agents est prête"
            break
        fi
        if [ $i -eq 15 ]; then
            print_warning "API des agents n'est pas prête après 15 tentatives"
        fi
        sleep 2
    done
    
    # Vérifier l'API de contrôle
    for i in {1..15}; do
        if curl -s http://localhost:4000/health &> /dev/null; then
            print_success "API de contrôle est prête"
            break
        fi
        if [ $i -eq 15 ]; then
            print_warning "API de contrôle n'est pas prête après 15 tentatives"
        fi
        sleep 2
    done
}

# Démarrage des applications frontend
start_frontend() {
    print_status "Démarrage des applications frontend..."
    
    # Démarrer les applications en arrière-plan
    docker-compose up -d marketplace novacore battle-arena agent-lab
    print_success "Applications frontend démarrées"
    
    # Attendre que les applications soient prêtes
    print_status "Attente de la disponibilité des applications..."
    sleep 15
    
    # Vérifier les applications
    APPS=(
        "3000:Marketplace"
        "3001:NovaCore"
        "3002:Battle Arena"
        "3003:Agent Lab"
    )
    
    for app in "${APPS[@]}"; do
        port=$(echo $app | cut -d':' -f1)
        name=$(echo $app | cut -d':' -f2)
        
        for i in {1..10}; do
            if curl -s http://localhost:$port &> /dev/null; then
                print_success "$name est prêt sur le port $port"
                break
            fi
            if [ $i -eq 10 ]; then
                print_warning "$name n'est pas prêt sur le port $port"
            fi
            sleep 2
        done
    done
}

# Affichage du statut final
show_status() {
    print_header
    print_success "NovaIA est maintenant démarré et prêt à l'utilisation!"
    echo ""
    echo -e "${CYAN}📱 Applications Frontend:${NC}"
    echo -e "  • Marketplace:     ${GREEN}http://localhost:3000${NC}"
    echo -e "  • NovaCore:        ${GREEN}http://localhost:3001${NC}"
    echo -e "  • Battle Arena:    ${GREEN}http://localhost:3002${NC}"
    echo -e "  • Agent Lab:       ${GREEN}http://localhost:3003${NC}"
    echo ""
    echo -e "${CYAN}🔌 APIs Backend:${NC}"
    echo -e "  • API Agents:      ${GREEN}http://localhost:8000${NC}"
    echo -e "  • API Contrôle:    ${GREEN}http://localhost:4000${NC}"
    echo -e "  • Documentation:   ${GREEN}http://localhost:4000/docs${NC}"
    echo ""
    echo -e "${CYAN}🐳 Services:${NC}"
    echo -e "  • PostgreSQL:      ${GREEN}localhost:5432${NC}"
    echo -e "  • Redis:           ${GREEN}localhost:6379${NC}"
    echo -e "  • Ollama:          ${GREEN}localhost:11434${NC}"
    echo ""
    echo -e "${CYAN}📚 Commandes utiles:${NC}"
    echo -e "  • Voir les logs:   ${YELLOW}pnpm docker:logs${NC}"
    echo -e "  • Arrêter:         ${YELLOW}pnpm docker:down${NC}"
    echo -e "  • Redémarrer:      ${YELLOW}pnpm docker:up${NC}"
    echo -e "  • Développement:   ${YELLOW}pnpm dev${NC}"
    echo ""
    echo -e "${PURPLE}🚀 Bon développement avec NovaIA!${NC}"
}

# Fonction principale
main() {
    print_header
    
    # Vérifications et installation
    check_prerequisites
    setup_environment
    install_dependencies
    
    # Démarrage de l'infrastructure
    start_infrastructure
    download_models
    start_services
    start_frontend
    
    # Statut final
    show_status
}

# Gestion des erreurs
trap 'print_error "Une erreur est survenue. Arrêt du script."; exit 1' ERR

# Exécution du script principal
main "$@" 