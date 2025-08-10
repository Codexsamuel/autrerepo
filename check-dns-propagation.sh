#!/bin/bash

echo "🔍 Vérification de la Propagation DNS - dlsolutionssarl.tech"
echo "=========================================================="
echo ""

DOMAIN="dlsolutionssarl.tech"
EXPECTED_NS=("ns1.p01.dnsone.net" "ns2.p01.dnsone.net" "ns3.p01.dnsone.net" "ns4.p01.dnsone.net")

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "📅 $(date)"
echo "🌐 Domaine: $DOMAIN"
echo ""

# Fonction pour vérifier les nameservers
check_nameservers() {
    echo "🔧 Vérification des Nameservers..."
    echo "--------------------------------"
    
    # Récupérer les nameservers actuels
    CURRENT_NS=$(dig $DOMAIN NS +short | sort)
    
    if [ -z "$CURRENT_NS" ]; then
        echo -e "${RED}❌ Impossible de récupérer les nameservers${NC}"
        return 1
    fi
    
    echo "Nameservers actuels:"
    echo "$CURRENT_NS" | while read ns; do
        if [[ " ${EXPECTED_NS[@]} " =~ " ${ns} " ]]; then
            echo -e "  ${GREEN}✅ $ns${NC}"
        else
            echo -e "  ${RED}❌ $ns${NC}"
        fi
    done
    
    # Vérifier si tous les nameservers attendus sont présents
    ALL_CORRECT=true
    for expected in "${EXPECTED_NS[@]}"; do
        if ! echo "$CURRENT_NS" | grep -q "$expected"; then
            ALL_CORRECT=false
            break
        fi
    done
    
    if [ "$ALL_CORRECT" = true ]; then
        echo -e "\n${GREEN}🎉 Tous les nameservers sont correctement configurés !${NC}"
        return 0
    else
        echo -e "\n${YELLOW}⚠️  Les nameservers ne sont pas encore propagés${NC}"
        return 1
    fi
}

# Fonction pour vérifier la résolution A
check_a_record() {
    echo -e "\n🌍 Vérification de la Résolution A..."
    echo "-----------------------------------"
    
    A_RECORD=$(dig $DOMAIN A +short)
    
    if [ -z "$A_RECORD" ]; then
        echo -e "${RED}❌ Aucun enregistrement A trouvé${NC}"
        return 1
    fi
    
    echo "Enregistrement A: $A_RECORD"
    
    # Vérifier si c'est l'IP Netlify
    if [[ "$A_RECORD" == "75.2.60.5" ]]; then
        echo -e "${GREEN}✅ IP Netlify détectée${NC}"
        return 0
    else
        echo -e "${YELLOW}⚠️  IP différente de Netlify (peut être normale pendant la propagation)${NC}"
        return 1
    fi
}

# Fonction pour vérifier la connectivité
check_connectivity() {
    echo -e "\n🔗 Test de Connectivité..."
    echo "---------------------------"
    
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN" 2>/dev/null)
    
    if [ "$HTTP_STATUS" = "200" ]; then
        echo -e "${GREEN}✅ Site accessible (HTTP $HTTP_STATUS)${NC}"
        return 0
    elif [ "$HTTP_STATUS" = "000" ]; then
        echo -e "${YELLOW}⚠️  Site non accessible (DNS non propagé ou site non déployé)${NC}"
        return 1
    else
        echo -e "${YELLOW}⚠️  Site accessible mais erreur HTTP $HTTP_STATUS${NC}"
        return 1
    fi
}

# Fonction pour vérifier les nameservers depuis différents serveurs DNS
check_global_propagation() {
    echo -e "\n🌐 Vérification de la Propagation Globale..."
    echo "-------------------------------------------"
    
    DNS_SERVERS=("8.8.8.8" "1.1.1.1" "208.67.222.222" "9.9.9.9")
    
    for dns_server in "${DNS_SERVERS[@]}"; do
        echo -n "  $dns_server: "
        ns_result=$(dig @$dns_server $DOMAIN NS +short | head -1)
        
        if [ -n "$ns_result" ]; then
            if [[ " ${EXPECTED_NS[@]} " =~ " ${ns_result} " ]]; then
                echo -e "${GREEN}✅${NC}"
            else
                echo -e "${YELLOW}⚠️${NC}"
            fi
        else
            echo -e "${RED}❌${NC}"
        fi
    done
}

# Fonction principale
main() {
    echo "🚀 Début de la vérification..."
    echo ""
    
    # Vérifier les nameservers
    if check_nameservers; then
        NS_OK=true
    else
        NS_OK=false
    fi
    
    # Vérifier l'enregistrement A
    if check_a_record; then
        A_OK=true
    else
        A_OK=false
    fi
    
    # Vérifier la connectivité
    if check_connectivity; then
        CONN_OK=true
    else
        CONN_OK=false
    fi
    
    # Vérifier la propagation globale
    check_global_propagation
    
    # Résumé
    echo -e "\n📊 RÉSUMÉ DE LA VÉRIFICATION"
    echo "=============================="
    
    if [ "$NS_OK" = true ]; then
        echo -e "Nameservers: ${GREEN}✅ OK${NC}"
    else
        echo -e "Nameservers: ${RED}❌ À vérifier${NC}"
    fi
    
    if [ "$A_OK" = true ]; then
        echo -e "Enregistrement A: ${GREEN}✅ OK${NC}"
    else
        echo -e "Enregistrement A: ${YELLOW}⚠️  En cours${NC}"
    fi
    
    if [ "$CONN_OK" = true ]; then
        echo -e "Connectivité: ${GREEN}✅ OK${NC}"
    else
        echo -e "Connectivité: ${YELLOW}⚠️  En cours${NC}"
    fi
    
    echo ""
    
    # Recommandations
    if [ "$NS_OK" = true ] && [ "$A_OK" = true ] && [ "$CONN_OK" = true ]; then
        echo -e "${GREEN}🎉 DNS complètement propagé ! Vous pouvez continuer avec la Phase 2 (Vercel).${NC}"
    elif [ "$NS_OK" = true ]; then
        echo -e "${YELLOW}⏳ Nameservers propagés, en attente de la propagation des enregistrements...${NC}"
        echo "   Attendez encore quelques heures et relancez ce script."
    else
        echo -e "${RED}🚨 Nameservers non propagés. Vérifiez la configuration Hostinger.${NC}"
        echo "   Assurez-vous d'avoir sauvegardé les changements."
    fi
    
    echo ""
    echo "📚 Documentation: CONFIGURATION-COMPLETE.md"
    echo "🔄 Relancer: ./check-dns-propagation.sh"
}

# Exécuter le script principal
main 