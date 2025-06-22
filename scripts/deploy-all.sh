#!/bin/bash

# Script de déploiement automatisé pour Vercel et Netlify
# Usage: ./scripts/deploy-all.sh [vercel|netlify|both]

set -e

echo "🚀 Démarrage du déploiement..."

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    error "package.json non trouvé. Assurez-vous d'être dans le répertoire racine du projet."
fi

# Vérifier que git est propre
if [ -n "$(git status --porcelain)" ]; then
    warn "Il y a des modifications non commitées. Voulez-vous continuer ? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        error "Déploiement annulé. Committez vos modifications d'abord."
    fi
fi

# Fonction de déploiement Vercel
deploy_vercel() {
    log "🌐 Déploiement sur Vercel..."
    
    # Vérifier si Vercel CLI est installé
    if ! command -v vercel &> /dev/null; then
        error "Vercel CLI n'est pas installé. Installez-le avec: npm i -g vercel"
    fi
    
    # Build du projet
    log "📦 Build du projet..."
    npm run build
    
    # Déploiement sur Vercel
    log "🚀 Déploiement sur Vercel..."
    vercel --prod --yes
    
    log "✅ Déploiement Vercel terminé!"
}

# Fonction de déploiement Netlify
deploy_netlify() {
    log "🌐 Déploiement sur Netlify..."
    
    # Vérifier si Netlify CLI est installé
    if ! command -v netlify &> /dev/null; then
        error "Netlify CLI n'est pas installé. Installez-le avec: npm i -g netlify-cli"
    fi
    
    # Build du projet
    log "📦 Build du projet..."
    npm run build
    
    # Déploiement sur Netlify
    log "🚀 Déploiement sur Netlify..."
    netlify deploy --prod --dir=.next
    
    log "✅ Déploiement Netlify terminé!"
}

# Fonction de déploiement GitHub Pages (optionnel)
deploy_github_pages() {
    log "🌐 Déploiement sur GitHub Pages..."
    
    # Vérifier si nous sommes sur la branche main
    if [ "$(git branch --show-current)" != "main" ]; then
        warn "Vous n'êtes pas sur la branche main. Déploiement GitHub Pages annulé."
        return
    fi
    
    # Build du projet
    log "📦 Build du projet..."
    npm run build
    
    # Créer le dossier gh-pages s'il n'existe pas
    mkdir -p gh-pages
    
    # Copier les fichiers buildés
    cp -r .next/* gh-pages/
    
    # Ajouter et committer les changements
    git add gh-pages/
    git commit -m "Deploy to GitHub Pages" || true
    
    # Push vers la branche gh-pages
    git subtree push --prefix gh-pages origin gh-pages
    
    log "✅ Déploiement GitHub Pages terminé!"
}

# Fonction principale
main() {
    local target=${1:-"both"}
    
    log "🎯 Cible de déploiement: $target"
    
    case $target in
        "vercel")
            deploy_vercel
            ;;
        "netlify")
            deploy_netlify
            ;;
        "github")
            deploy_github_pages
            ;;
        "both")
            deploy_vercel
            deploy_netlify
            ;;
        *)
            error "Cible invalide. Utilisez: vercel, netlify, github, ou both"
            ;;
    esac
    
    log "🎉 Déploiement terminé avec succès!"
    
    # Afficher les URLs de déploiement
    echo ""
    echo "📋 URLs de déploiement:"
    echo "Vercel: https://votre-projet.vercel.app"
    echo "Netlify: https://votre-projet.netlify.app"
    echo ""
    echo "🔧 Pour configurer les variables d'environnement:"
    echo "Vercel: https://vercel.com/dashboard"
    echo "Netlify: https://app.netlify.com/sites/votre-projet/settings/environment"
}

# Exécuter le script principal
main "$@" 