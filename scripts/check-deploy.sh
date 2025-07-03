#!/bin/bash

# Script de vérification du déploiement DAVY Trading Platform
# Version: 1.0

echo "🚀 Vérification du déploiement DAVY Trading Platform"
echo "=================================================="

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_status() {
    local status=$1
    local message=$2
    case $status in
        "success")
            echo -e "${GREEN}✅ $message${NC}"
            ;;
        "error")
            echo -e "${RED}❌ $message${NC}"
            ;;
        "warning")
            echo -e "${YELLOW}⚠️  $message${NC}"
            ;;
        "info")
            echo -e "${BLUE}ℹ️  $message${NC}"
            ;;
    esac
}

# Vérification de l'environnement
echo ""
print_status "info" "Vérification de l'environnement..."

# Vérifier Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_status "success" "Node.js installé: $NODE_VERSION"
else
    print_status "error" "Node.js non installé"
    exit 1
fi

# Vérifier pnpm
if command -v pnpm &> /dev/null; then
    PNPM_VERSION=$(pnpm --version)
    print_status "success" "pnpm installé: $PNPM_VERSION"
else
    print_status "error" "pnpm non installé"
    exit 1
fi

# Vérifier Git
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    print_status "success" "Git installé: $GIT_VERSION"
else
    print_status "error" "Git non installé"
    exit 1
fi

# Vérification des fichiers de configuration
echo ""
print_status "info" "Vérification des fichiers de configuration..."

# Vérifier package.json
if [ -f "package.json" ]; then
    print_status "success" "package.json trouvé"
else
    print_status "error" "package.json manquant"
    exit 1
fi

# Vérifier next.config.js
if [ -f "next.config.js" ]; then
    print_status "success" "next.config.js trouvé"
else
    print_status "error" "next.config.js manquant"
    exit 1
fi

# Vérifier netlify.toml
if [ -f "netlify.toml" ]; then
    print_status "success" "netlify.toml trouvé"
else
    print_status "warning" "netlify.toml manquant (optionnel)"
fi

# Vérification des dépendances
echo ""
print_status "info" "Vérification des dépendances..."

# Vérifier si node_modules existe
if [ -d "node_modules" ]; then
    print_status "success" "node_modules trouvé"
else
    print_status "warning" "node_modules manquant - exécutez 'pnpm install'"
fi

# Vérifier pnpm-lock.yaml
if [ -f "pnpm-lock.yaml" ]; then
    print_status "success" "pnpm-lock.yaml trouvé"
else
    print_status "warning" "pnpm-lock.yaml manquant"
fi

# Vérification du build local
echo ""
print_status "info" "Test du build local..."

# Nettoyer les builds précédents
if [ -d ".next" ]; then
    rm -rf .next
    print_status "info" "Dossier .next nettoyé"
fi

if [ -d "out" ]; then
    rm -rf out
    print_status "info" "Dossier out nettoyé"
fi

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    print_status "info" "Installation des dépendances..."
    pnpm install
    if [ $? -eq 0 ]; then
        print_status "success" "Dépendances installées"
    else
        print_status "error" "Échec de l'installation des dépendances"
        exit 1
    fi
fi

# Test du build
print_status "info" "Lancement du build..."
pnpm run build

if [ $? -eq 0 ]; then
    print_status "success" "Build réussi !"
    
    # Vérifier que le dossier out a été créé
    if [ -d "out" ]; then
        print_status "success" "Dossier out généré"
        OUT_SIZE=$(du -sh out | cut -f1)
        print_status "info" "Taille du build: $OUT_SIZE"
    else
        print_status "error" "Dossier out non généré"
        exit 1
    fi
else
    print_status "error" "Échec du build"
    exit 1
fi

# Vérification du statut Git
echo ""
print_status "info" "Vérification du statut Git..."

# Vérifier la branche actuelle
CURRENT_BRANCH=$(git branch --show-current)
print_status "info" "Branche actuelle: $CURRENT_BRANCH"

# Vérifier s'il y a des changements non commités
if [ -z "$(git status --porcelain)" ]; then
    print_status "success" "Working tree propre"
else
    print_status "warning" "Changements non commités détectés"
    git status --short
fi

# Vérifier la dernière synchronisation avec le remote
git fetch origin
LOCAL_COMMIT=$(git rev-parse HEAD)
REMOTE_COMMIT=$(git rev-parse origin/$CURRENT_BRANCH)

if [ "$LOCAL_COMMIT" = "$REMOTE_COMMIT" ]; then
    print_status "success" "Code synchronisé avec le remote"
else
    print_status "warning" "Code non synchronisé avec le remote"
    print_status "info" "Commits locaux: $(git log --oneline origin/$CURRENT_BRANCH..HEAD | wc -l)"
fi

# Vérification des variables d'environnement
echo ""
print_status "info" "Vérification des variables d'environnement..."

# Vérifier .env.local
if [ -f ".env.local" ]; then
    print_status "success" ".env.local trouvé"
else
    print_status "warning" ".env.local manquant (peut être normal pour le déploiement)"
fi

# Vérifier .env.example
if [ -f ".env.example" ]; then
    print_status "success" ".env.example trouvé"
else
    print_status "warning" ".env.example manquant"
fi

# Résumé final
echo ""
echo "=================================================="
print_status "success" "Vérification terminée !"
echo ""
print_status "info" "Prochaines étapes:"
echo "  1. Si tout est vert ✅, le déploiement devrait fonctionner"
echo "  2. Poussez vos changements: git push origin $CURRENT_BRANCH"
echo "  3. Surveillez le dashboard Netlify pour le statut du déploiement"
echo "  4. URL de déploiement: https://votre-site.netlify.app"
echo ""
print_status "info" "En cas de problème:"
echo "  - Vérifiez les logs Netlify"
echo "  - Assurez-vous que toutes les dépendances sont dans 'dependencies'"
echo "  - Vérifiez la configuration dans netlify.toml"
echo ""

# Vérification rapide de la santé du projet
echo "🏥 Diagnostic de santé du projet:"

# Vérifier les erreurs TypeScript
print_status "info" "Vérification TypeScript..."
pnpm run type-check > /dev/null 2>&1
if [ $? -eq 0 ]; then
    print_status "success" "TypeScript: Aucune erreur"
else
    print_status "warning" "TypeScript: Erreurs détectées (exécutez 'pnpm run type-check' pour plus de détails)"
fi

# Vérifier ESLint
print_status "info" "Vérification ESLint..."
pnpm run lint > /dev/null 2>&1
if [ $? -eq 0 ]; then
    print_status "success" "ESLint: Aucune erreur"
else
    print_status "warning" "ESLint: Erreurs détectées (exécutez 'pnpm run lint' pour plus de détails)"
fi

echo ""
print_status "success" "Diagnostic terminé ! 🎉" 