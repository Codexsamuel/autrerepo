#!/bin/bash

# Script de déploiement automatisé pour Netlify
# DL Solutions Platform

set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Déploiement DL Solutions sur Netlify${NC}"
echo "=========================================="

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erreur: Ce script doit être exécuté depuis la racine du projet${NC}"
    exit 1
fi

# Vérifier les dépendances
echo -e "${BLUE}📦 Vérification des dépendances...${NC}"
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  Installation des dépendances...${NC}"
    npm install --legacy-peer-deps
else
    echo -e "${GREEN}✅ Dépendances déjà installées${NC}"
fi

# Nettoyer les builds précédents
echo -e "${BLUE}🧹 Nettoyage des builds précédents...${NC}"
rm -rf .next
rm -rf out
echo -e "${GREEN}✅ Nettoyage terminé${NC}"

# Build pour Netlify
echo -e "${BLUE}🔨 Build pour Netlify...${NC}"
npm run build:netlify

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build réussi${NC}"
else
    echo -e "${RED}❌ Échec du build${NC}"
    exit 1
fi

# Vérifier que le build a créé les fichiers nécessaires
if [ ! -d ".next" ]; then
    echo -e "${RED}❌ Erreur: Le dossier .next n'a pas été créé${NC}"
    exit 1
fi

# Vérifier la configuration Netlify
echo -e "${BLUE}🔍 Vérification de la configuration Netlify...${NC}"
if [ ! -f "netlify.toml" ]; then
    echo -e "${RED}❌ Erreur: netlify.toml manquant${NC}"
    exit 1
fi

# Vérifier les fonctions Netlify
if [ -d "netlify/functions" ]; then
    echo -e "${BLUE}🔧 Vérification des fonctions Netlify...${NC}"
    function_count=$(find netlify/functions -name "*.js" | wc -l)
    echo -e "${GREEN}✅ ${function_count} fonction(s) trouvée(s)${NC}"
fi

# Préparer le déploiement
echo -e "${BLUE}📤 Préparation du déploiement...${NC}"

# Vérifier le statut Git
if [ -d ".git" ]; then
    echo -e "${BLUE}📝 Statut Git:${NC}"
    git status --porcelain
    
    # Vérifier s'il y a des changements non commités
    if [ -n "$(git status --porcelain)" ]; then
        echo -e "${YELLOW}⚠️  Changements non commités détectés${NC}"
        read -p "Voulez-vous commiter ces changements? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git add .
            git commit -m "🚀 Déploiement automatique - $(date)"
            echo -e "${GREEN}✅ Changements commités${NC}"
        fi
    fi
fi

# Instructions de déploiement
echo -e "\n${GREEN}🎉 Préparation terminée avec succès!${NC}"
echo -e "\n${BLUE}📋 Prochaines étapes:${NC}"
echo "1. Poussez vos changements vers GitHub:"
echo "   git push origin main"
echo ""
echo "2. Ou déployez manuellement via l'interface Netlify"
echo ""
echo "3. Vérifiez le déploiement avec:"
echo "   ./scripts/monitor-dns-propagation.sh"
echo ""
echo -e "${YELLOW}💡 Conseil: Configurez le déploiement automatique dans Netlify${NC}"
echo "   pour que chaque push sur main déclenche un déploiement"

# Vérifier la connectivité Netlify
echo -e "\n${BLUE}🌐 Test de connectivité Netlify...${NC}"
if curl -s --max-time 10 "https://davyetlue.netlify.app" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Site Netlify accessible${NC}"
else
    echo -e "${YELLOW}⚠️  Site Netlify temporairement inaccessible${NC}"
fi

echo -e "\n${GREEN}✨ Script terminé avec succès!${NC}" 