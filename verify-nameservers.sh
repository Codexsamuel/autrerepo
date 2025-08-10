#!/bin/bash

echo "🔍 Vérification des nameservers Netlify..."
echo "=========================================="

echo ""
echo "📋 Nameservers Netlify officiels :"
echo "   ns1.netlify.com"
echo "   ns2.netlify.com"
echo "   ns3.netlify.com"
echo ""

echo "🔍 Vérification de la résolution des nameservers :"
for ns in "ns1.netlify.com" "ns2.netlify.com" "ns3.netlify.com"; do
    echo "   $ns :"
    if nslookup $ns > /dev/null 2>&1; then
        ip=$(nslookup $ns | grep "Address:" | tail -1 | awk '{print $2}')
        echo "      ✅ Résolu vers $ip"
    else
        echo "      ❌ Non résolu"
    fi
done

echo ""
echo "🚨 ALTERNATIVE : Configuration DNS directe dans Hostinger"
echo "========================================================"
echo ""
echo "Au lieu de changer les nameservers, configurez ces enregistrements DNS :"
echo ""
echo "1. Supprimez TOUS les enregistrements A et CNAME existants"
echo "2. Ajoutez ces nouveaux enregistrements :"
echo ""
echo "   Type: CNAME"
echo "   Nom: @"
echo "   Valeur: davyetlucie.netlify.app"
echo "   TTL: 3600"
echo ""
echo "   Type: CNAME"
echo "   Nom: www"
echo "   Valeur: davyetlucie.netlify.app"
echo "   TTL: 3600"
echo ""
echo "3. Supprimez les enregistrements A existants (75.2.60.5 et 99.83.190.102)"
echo ""

echo "🔧 Test de connectivité Netlify :"
if curl -s --max-time 10 "https://davyetlucie.netlify.app" > /dev/null; then
    echo "✅ Netlify accessible"
else
    echo "❌ Netlify non accessible"
fi

echo ""
echo "📚 Documentation alternative :"
echo "- Guide Hostinger DNS: https://support.hostinger.com/en/articles/1583291-how-to-change-dns-records"
echo "- Configuration CNAME: https://docs.netlify.com/domains-https/custom-domains/configure-external-dns/"
echo ""
echo "🎯 Cette méthode évite les problèmes de nameservers et fonctionne immédiatement" 