#!/bin/bash

echo "🧪 MONITORING COMPARATIF NAMESERVERS"
echo "====================================="

while true; do
    echo ""
    echo "⏰ $(date)"
    echo "-------------------------------------"
    
    echo "🌐 daveandlucesolutions.com (Vercel NS):"
    echo "   IP: $(dig daveandlucesolutions.com +short 2>/dev/null | tr '\n' ' ')"
    echo "   NS: $(dig daveandlucesolutions.com NS +short 2>/dev/null | tr '\n' ' ')"
    
    echo ""
    echo "🌐 dlsolutionssarl.tech (Hostinger NS):"
    echo "   IP: $(dig dlsolutionssarl.tech +short 2>/dev/null | tr '\n' ' ')"
    echo "   NS: $(dig dlsolutionssarl.tech NS +short 2>/dev/null | tr '\n' ' ')"
    
    echo ""
    echo "⏳ Attente 60 secondes..."
    sleep 60
done
