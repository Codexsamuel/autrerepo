#!/bin/bash

echo "🔧 Correction automatique de la configuration DNS..."
echo "=================================================="

# Vérifier la configuration actuelle
echo "📋 Configuration DNS actuelle :"
echo "Domain: dlsolutionssarl.tech"
echo "Nameservers: ns1.dns-parking.com, ns2.dns-parking.com"
echo ""

# Instructions pour corriger les nameservers
echo "🚨 PROBLÈME IDENTIFIÉ :"
echo "Les nameservers pointent vers dns-parking.com au lieu de Netlify"
echo ""

echo "✅ SOLUTION :"
echo "1. Connectez-vous à votre panneau Hostinger"
echo "2. Allez dans 'Domaines' > 'dlsolutionssarl.tech' > 'DNS / Nameservers'"
echo "3. Changez les nameservers pour :"
echo "   - ns1.netlify.com"
echo "   - ns2.netlify.com"
echo "   - ns3.netlify.com"
echo ""

echo "4. Pour daveandlucesolutions.com, faites la même chose"
echo ""

echo "⏱️  Temps de propagation : 15 minutes à 24 heures"
echo ""

# Vérifier la connectivité
echo "🔍 Vérification de la connectivité :"
ping -c 3 dlsolutionssarl.tech || echo "❌ Domaine non accessible"
ping -c 3 daveandlucesolutions.com || echo "❌ Domaine non accessible"
ping -c 3 davyetlucie.netlify.app && echo "✅ Netlify accessible"

echo ""
echo "📚 Documentation :"
echo "- Guide Netlify DNS: https://docs.netlify.com/domains-https/custom-domains/configure-external-dns/"
echo "- Vérification DNS: https://dnschecker.org/"
echo ""

echo "🎯 Une fois les nameservers corrigés, vos domaines pointeront automatiquement vers Netlify"
echo "   et les certificats SSL seront renouvelés automatiquement." 