#!/bin/bash

echo "🔍 Monitoring de la propagation DNS en temps réel..."
echo "=================================================="

DOMAINS=("dlsolutionssarl.tech" "daveandlucesolutions.com" "davyetlucie.netlify.app")

while true; do
    clear
    echo "🕐 $(date)"
    echo "🔍 Vérification de la propagation DNS..."
    echo "======================================"
    
    for domain in "${DOMAINS[@]}"; do
        echo ""
        echo "🌐 $domain :"
        
        # Vérifier la résolution DNS
        if nslookup $domain > /dev/null 2>&1; then
            echo "✅ DNS résolu"
            
            # Vérifier l'IP
            ip=$(nslookup $domain | grep "Address:" | tail -1 | awk '{print $2}')
            echo "📍 IP: $ip"
            
            # Vérifier si c'est Netlify
            if [[ $ip == *"63.176"* ]] || [[ $ip == *"75.2"* ]]; then
                echo "🎯 ✅ Pointe vers Netlify"
            else
                echo "⚠️  ❌ Ne pointe PAS vers Netlify"
            fi
            
            # Test de connectivité
            if ping -c 1 $domain > /dev/null 2>&1; then
                echo "🌐 ✅ Connectivité OK"
            else
                echo "❌ ❌ Pas de connectivité"
            fi
        else
            echo "❌ DNS non résolu"
        fi
    done
    
    echo ""
    echo "⏱️  Actualisation dans 30 secondes... (Ctrl+C pour arrêter)"
    echo "📊 Statut :"
    echo "   🟢 = Fonctionne correctement"
    echo "   🟡 = En cours de propagation"
    echo "   🔴 = Problème détecté"
    
    sleep 30
done
