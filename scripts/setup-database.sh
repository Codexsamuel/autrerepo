#!/bin/bash

# =====================================================
# DAVY Trading Platform - Database Setup Script
# =====================================================
# Description: Script automatique pour configurer la base de données
# =====================================================

set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}=====================================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}=====================================================${NC}"
}

# Vérifier si PostgreSQL est installé
check_postgresql() {
    print_message "Vérification de PostgreSQL..."
    
    if ! command -v psql &> /dev/null; then
        print_error "PostgreSQL n'est pas installé. Veuillez l'installer d'abord."
        echo "Installation sur Ubuntu/Debian: sudo apt-get install postgresql postgresql-contrib"
        echo "Installation sur macOS: brew install postgresql"
        echo "Installation sur Windows: https://www.postgresql.org/download/windows/"
        exit 1
    fi
    
    print_message "PostgreSQL est installé ✓"
}

# Créer la base de données
create_database() {
    print_header "Création de la base de données"
    
    read -p "Nom de la base de données (défaut: davy_trading_platform): " DB_NAME
    DB_NAME=${DB_NAME:-davy_trading_platform}
    
    read -p "Nom d'utilisateur PostgreSQL (défaut: postgres): " DB_USER
    DB_USER=${DB_USER:-postgres}
    
    print_message "Création de la base de données '$DB_NAME'..."
    
    # Créer la base de données
    createdb -U $DB_USER $DB_NAME 2>/dev/null || {
        print_warning "La base de données existe déjà ou erreur de création"
    }
    
    print_message "Base de données créée ✓"
}

# Exécuter les migrations
run_migrations() {
    print_header "Exécution des migrations"
    
    print_message "Exécution du schéma principal..."
    psql -U $DB_USER -d $DB_NAME -f database/schema.sql
    
    print_message "Exécution des migrations..."
    if [ -d "database/migrations" ]; then
        for migration in database/migrations/*.sql; do
            if [ -f "$migration" ]; then
                print_message "Exécution de $(basename $migration)..."
                psql -U $DB_USER -d $DB_NAME -f "$migration"
            fi
        done
    fi
    
    print_message "Migrations exécutées ✓"
}

# Peupler avec les données de test
seed_database() {
    print_header "Peuplement avec les données de test"
    
    read -p "Voulez-vous insérer les données de test ? (y/n): " SEED_DATA
    if [[ $SEED_DATA =~ ^[Yy]$ ]]; then
        print_message "Insertion des données de test..."
        psql -U $DB_USER -d $DB_NAME -f database/seed.sql
        print_message "Données de test insérées ✓"
    else
        print_warning "Données de test ignorées"
    fi
}

# Configurer les variables d'environnement
setup_environment() {
    print_header "Configuration des variables d'environnement"
    
    ENV_FILE=".env.local"
    
    if [ ! -f "$ENV_FILE" ]; then
        print_message "Création du fichier .env.local..."
        cat > $ENV_FILE << EOF
# Database Configuration
DATABASE_URL=postgresql://$DB_USER@localhost:5432/$DB_NAME
DB_HOST=localhost
DB_PORT=5432
DB_NAME=$DB_NAME
DB_USER=$DB_USER
DB_PASSWORD=your_password_here

# Supabase Configuration (à remplir manuellement)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# API Keys (à remplir manuellement)
OPENAI_API_KEY=your_openai_api_key_here
ALPHA_VANTAGE_API_KEY=your_alphavantage_api_key_here
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

# Trading Configuration
TRADING_ENABLED=true
MAX_TRADE_AMOUNT=10000
RISK_LEVEL=medium

# AI Configuration
AI_MODEL=gpt-4
AI_TEMPERATURE=0.7
AI_MAX_TOKENS=2000

# Security
JWT_SECRET=your_jwt_secret_here
ENCRYPTION_KEY=your_encryption_key_here
EOF
        
        print_message "Fichier .env.local créé ✓"
        print_warning "Veuillez remplir manuellement les clés API dans .env.local"
    else
        print_warning "Le fichier .env.local existe déjà"
    fi
}

# Vérifier la configuration
verify_setup() {
    print_header "Vérification de la configuration"
    
    print_message "Test de connexion à la base de données..."
    if psql -U $DB_USER -d $DB_NAME -c "SELECT version();" > /dev/null 2>&1; then
        print_message "Connexion à la base de données réussie ✓"
    else
        print_error "Échec de la connexion à la base de données"
        exit 1
    fi
    
    print_message "Vérification des tables..."
    TABLE_COUNT=$(psql -U $DB_USER -d $DB_NAME -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';" | tr -d ' ')
    print_message "Nombre de tables créées: $TABLE_COUNT ✓"
    
    print_message "Vérification des données..."
    USER_COUNT=$(psql -U $DB_USER -d $DB_NAME -t -c "SELECT COUNT(*) FROM users;" | tr -d ' ')
    print_message "Nombre d'utilisateurs: $USER_COUNT ✓"
}

# Créer les sauvegardes
create_backup() {
    print_header "Création de sauvegarde"
    
    BACKUP_DIR="database/backups"
    mkdir -p $BACKUP_DIR
    
    BACKUP_FILE="$BACKUP_DIR/backup_$(date +%Y%m%d_%H%M%S).sql"
    
    print_message "Création de la sauvegarde: $BACKUP_FILE"
    pg_dump -U $DB_USER $DB_NAME > $BACKUP_FILE
    
    if [ $? -eq 0 ]; then
        print_message "Sauvegarde créée avec succès ✓"
    else
        print_error "Échec de la création de la sauvegarde"
    fi
}

# Afficher les informations de connexion
show_connection_info() {
    print_header "Informations de connexion"
    
    echo "Base de données: $DB_NAME"
    echo "Utilisateur: $DB_USER"
    echo "Hôte: localhost"
    echo "Port: 5432"
    echo ""
    echo "Pour vous connecter:"
    echo "psql -U $DB_USER -d $DB_NAME"
    echo ""
    echo "URL de connexion:"
    echo "postgresql://$DB_USER@localhost:5432/$DB_NAME"
}

# Menu principal
main_menu() {
    print_header "DAVY Trading Platform - Configuration Base de Données"
    
    echo "1. Configuration complète"
    echo "2. Créer la base de données uniquement"
    echo "3. Exécuter les migrations uniquement"
    echo "4. Insérer les données de test uniquement"
    echo "5. Créer une sauvegarde"
    echo "6. Vérifier la configuration"
    echo "7. Quitter"
    echo ""
    
    read -p "Choisissez une option (1-7): " choice
    
    case $choice in
        1)
            check_postgresql
            create_database
            run_migrations
            seed_database
            setup_environment
            verify_setup
            show_connection_info
            ;;
        2)
            check_postgresql
            create_database
            ;;
        3)
            run_migrations
            ;;
        4)
            seed_database
            ;;
        5)
            create_backup
            ;;
        6)
            verify_setup
            ;;
        7)
            print_message "Au revoir !"
            exit 0
            ;;
        *)
            print_error "Option invalide"
            main_menu
            ;;
    esac
}

# Fonction d'aide
show_help() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -h, --help     Afficher cette aide"
    echo "  -a, --auto     Configuration automatique complète"
    echo "  -d, --db       Créer la base de données uniquement"
    echo "  -m, --migrate  Exécuter les migrations uniquement"
    echo "  -s, --seed     Insérer les données de test uniquement"
    echo "  -b, --backup   Créer une sauvegarde"
    echo "  -v, --verify   Vérifier la configuration"
    echo ""
    echo "Exemples:"
    echo "  $0 --auto      # Configuration complète automatique"
    echo "  $0 --db        # Créer la base de données"
    echo "  $0 --migrate   # Exécuter les migrations"
}

# Traitement des arguments de ligne de commande
case "${1:-}" in
    -h|--help)
        show_help
        exit 0
        ;;
    -a|--auto)
        check_postgresql
        create_database
        run_migrations
        seed_database
        setup_environment
        verify_setup
        show_connection_info
        ;;
    -d|--db)
        check_postgresql
        create_database
        ;;
    -m|--migrate)
        run_migrations
        ;;
    -s|--seed)
        seed_database
        ;;
    -b|--backup)
        create_backup
        ;;
    -v|--verify)
        verify_setup
        ;;
    "")
        main_menu
        ;;
    *)
        print_error "Option inconnue: $1"
        show_help
        exit 1
        ;;
esac

print_message "Configuration terminée avec succès ! 🎉" 