#!/bin/bash

# Script pour corriger automatiquement les erreurs React.Children.only
# causées par l'utilisation incorrecte de asChild

set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔧 Correction automatique des erreurs asChild${NC}"
echo "=============================================="

# Fonction pour corriger un fichier spécifique
fix_file() {
    local file="$1"
    local temp_file="${file}.tmp"
    
    echo -e "${BLUE}🔧 Correction de ${file}...${NC}"
    
    # Créer une copie temporaire
    cp "$file" "$temp_file"
    
    # Remplacer les patterns problématiques
    # Pattern 1: Button asChild avec <a href=...>
    sed -i.tmp 's/<Button\([^>]*\) asChild>\s*<a href="\([^"]*\)"\([^>]*\)>/<Link href="\2">\n                <Button\1>/g' "$temp_file"
    sed -i.tmp 's/<\/a>\s*<\/Button>/                <\/Button>\n              <\/Link>/g' "$temp_file"
    
    # Pattern 2: Button asChild avec <a href=...> (variante)
    sed -i.tmp 's/<Button\([^>]*\) asChild>\s*\n\s*<a href="\([^"]*\)"\([^>]*\)>/<Link href="\2">\n                <Button\1>/g' "$temp_file"
    
    # Ajouter l'import Link si nécessaire
    if ! grep -q "import Link from" "$temp_file"; then
        # Trouver la dernière ligne d'import et ajouter Link après
        awk '/^import/ { print; if (!link_added) { print "import Link from \"next/link\";"; link_added=1 } next } { print }' "$temp_file" > "${temp_file}.new"
        mv "${temp_file}.new" "$temp_file"
    fi
    
    # Vérifier si des changements ont été faits
    if ! cmp -s "$file" "$temp_file"; then
        mv "$temp_file" "$file"
        echo -e "  ✅ ${file} corrigé"
        return 0
    else
        rm "$temp_file"
        echo -e "  ⚠️  ${file} - Aucun changement nécessaire"
        return 1
    fi
}

# Liste des fichiers à corriger (basée sur l'analyse grep)
FILES_TO_FIX=(
    "app/a-propos/page.tsx"
    "app/dl-style/paiement/orange-money/page.tsx"
    "app/dl-style/paiement/paypal/page.tsx"
    "app/dl-style/ventes-flash/page.tsx"
    "app/dl-paris-sportif/page.tsx"
    "app/dl-travel/packages/page.tsx"
    "app/novacore/auth/signup/page.tsx"
    "app/novacore/dl-style/TaobaoProductsClient.tsx"
    "app/novacore/novaworld/page.tsx"
    "app/novacore/dl-style/AmazonProductsClient.tsx"
    "app/dl-bookmaker/page.tsx"
    "app/demo/dl-business/page.tsx"
    "app/demo/dl-commerce/commandes/page.tsx"
    "app/demo/dl-agriculture/page.tsx"
    "app/solutions/immobilier/transactions/creer/page.tsx"
    "app/solutions/banque/page.tsx"
    "components/services/service-card.tsx"
    "components/providers/SessionProvider.tsx"
)

FIXED_COUNT=0
TOTAL_FILES=${#FILES_TO_FIX[@]}

echo -e "${BLUE}📁 Correction de ${TOTAL_FILES} fichiers identifiés...${NC}"

for file in "${FILES_TO_FIX[@]}"; do
    if [ -f "$file" ]; then
        if fix_file "$file"; then
            FIXED_COUNT=$((FIXED_COUNT + 1))
        fi
    else
        echo -e "  ⚠️  ${file} - Fichier non trouvé"
    fi
done

echo -e "\n${GREEN}🎉 Correction terminée!${NC}"
echo -e "${BLUE}📊 Résumé:${NC}"
echo "   📁 Fichiers analysés: ${TOTAL_FILES}"
echo "   🔧 Fichiers corrigés: ${FIXED_COUNT}"
echo "   ✅ Fichiers inchangés: $((TOTAL_FILES - FIXED_COUNT))"

if [ $FIXED_COUNT -gt 0 ]; then
    echo -e "\n${YELLOW}⚠️  N'oubliez pas de tester votre application après ces corrections!${NC}"
    echo -e "${BLUE}💡 Conseil: Lancez 'npm run build:netlify' pour vérifier que le build fonctionne${NC}"
else
    echo -e "\n${GREEN}✨ Aucune correction nécessaire!${NC}"
fi

# Nettoyer les fichiers temporaires
find . -name "*.tmp" -delete 2>/dev/null || true 