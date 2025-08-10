#!/bin/bash

# Script de monitoring DNS pour DL Solutions
# Vérifie la propagation DNS et la connectivité des domaines

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Domaines à vérifier
DOMAINS=(
    "dlsolutionssarl.tech"
    "www.dlsolutionssarl.tech"
    "daveandlucesolutions.com"
    "www.daveandlucesolutions.com"
    "davyetlue.netlify.app"
)

# IPs Netlify connues
NETLIFY_IPS=(
    "75.2.60.5"
    "75.2.60.6"
    "75.2.60.7"
    "75.2.60.8"
    "35.157.26.135"
    "35.157.26.136"
    "35.157.26.137"
    "35.157.26.138"
)

echo -e "${BLUE}🔍 Monitoring DNS et Connectivité DL Solutions${NC}"
echo "=================================================="

check_dns() {
    local domain=$1
    echo -e "\n🌐 ${domain}:"
    
    # Résolution DNS
    local ip=$(dig +short $domain | head -1)
    if [ -n "$ip" ]; then
        echo -e "  ✅ DNS résolu"
        echo -e "  📍 IP: ${ip}"
        
        # Vérifier si c'est une IP Netlify
        local is_netlify=false
        for netlify_ip in "${NETLIFY_IPS[@]}"; do
            if [ "$ip" = "$netlify_ip" ]; then
                is_netlify=true
                break
            fi
        done
        
        if [ "$is_netlify" = true ]; then
            echo -e "  🎯 ✅ Pointe vers Netlify"
        else
            echo -e "  ⚠️  ❌ Ne pointe PAS vers Netlify"
        fi
        
        # Test de connectivité
        if curl -s --max-time 10 "https://$domain" > /dev/null 2>&1; then
            echo -e "  🌐 ✅ Connectivité OK"
        else
            echo -e "  ❌ ❌ Pas de connectivité"
        fi
        
    else
        echo -e "  ❌ DNS non résolu"
    fi
}

check_netlify_status() {
    echo -e "\n${BLUE}📊 Vérification du statut Netlify...${NC}"
    
    # Vérifier le statut des services Netlify
    if curl -s --max-time 10 "https://status.netlify.com/api/v2/status.json" > /dev/null 2>&1; then
        echo -e "  ✅ Services Netlify accessibles"
    else
        echo -e "  ⚠️  Services Netlify potentiellement indisponibles"
    fi
}

check_ssl_certificates() {
    echo -e "\n${BLUE}🔒 Vérification des certificats SSL...${NC}"
    
    for domain in "${DOMAINS[@]}"; do
        echo -n "  ${domain}: "
        if echo | openssl s_client -servername $domain -connect $domain:443 2>/dev/null | openssl x509 -noout -dates > /dev/null 2>&1; then
            echo -e "${GREEN}✅ Certificat SSL valide${NC}"
        else
            echo -e "${RED}❌ Problème avec le certificat SSL${NC}"
        fi
    done
}

# Fonction principale
main() {
    while true; do
        clear
        echo -e "${BLUE}🕐 $(date)${NC}"
        echo -e "${BLUE}🔍 Vérification de la propagation DNS...${NC}"
        echo "======================================"
        
        # Vérifier chaque domaine
        for domain in "${DOMAINS[@]}"; do
            check_dns "$domain"
        done
        
        # Vérifier le statut Netlify
        check_netlify_status
        
        # Vérifier les certificats SSL
        check_ssl_certificates
        
        echo -e "\n${YELLOW}⏱️  Actualisation dans 30 secondes... (Ctrl+C pour arrêter)${NC}"
        echo -e "${BLUE}📊 Statut :${NC}"
        echo "   🟢 = Fonctionne correctement"
        echo "   🟡 = En cours de propagation"
        echo "   🔴 = Problème détecté"
        
        sleep 30
    done
}

# Gestion de l'interruption
trap 'echo -e "\n${GREEN}👋 Monitoring arrêté${NC}"; exit 0' INT

# Lancer le monitoring
main 