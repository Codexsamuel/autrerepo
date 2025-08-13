#!/bin/bash

echo "🧪 TEST CONFIGURATION D'URGENCE - SENTINEL ZERO"
echo "================================================"

# Test de la configuration d'urgence
echo "🔍 Test de la configuration d'urgence..."

# 1. Vérifier que le script d'urgence existe
if [ -f "scripts/netlify-build-emergency-fix.sh" ]; then
    echo "✅ Script d'urgence: OK"
else
    echo "❌ Script d'urgence: MANQUANT"
    exit 1
fi

# 2. Vérifier que la configuration d'urgence existe
if [ -f "next.config.emergency.js" ]; then
    echo "✅ Configuration d'urgence: OK"
else
    echo "❌ Configuration d'urgence: MANQUANTE"
    exit 1
fi

# 3. Test de build d'urgence (sans timeout sur macOS)
echo "🔨 Test de build d'urgence..."
if npm run build:netlify:super-simple > /dev/null 2>&1; then
    echo "✅ Build d'urgence: OK"
else
    echo "❌ Build d'urgence: ÉCHEC"
    exit 1
fi

# 4. Vérifier les fichiers générés
if [ -d ".next" ]; then
    echo "✅ Fichiers de build: OK"
    echo "📊 Taille: $(du -sh .next | cut -f1)"
else
    echo "❌ Fichiers de build: MANQUANTS"
    exit 1
fi

echo ""
echo "🎉 CONFIGURATION D'URGENCE VALIDÉE !"
echo "✅ Sentinel Zero est prêt pour le déploiement d'urgence"
echo "🚀 Build compatible avec Netlify"
echo "🔒 Routes API problématiques désactivées" 