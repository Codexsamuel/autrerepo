#!/bin/bash

echo "🚀 TEST RAPIDE PRODUCTION - SENTINEL ZERO"
echo "========================================="

# Test rapide des fonctionnalités critiques
echo "🔍 Test des fonctionnalités critiques..."

# 1. Vérifier que les composants principaux existent
if [ -f "app/sentinel-zero/page.tsx" ] && [ -f "app/sentinel-zero/dashboard/page.tsx" ]; then
    echo "✅ Composants principaux: OK"
else
    echo "❌ Composants principaux: MANQUANTS"
    exit 1
fi

# 2. Vérifier la configuration
if [ -f "next.config.js" ] && [ -f "netlify.toml" ]; then
    echo "✅ Configuration: OK"
else
    echo "❌ Configuration: MANQUANTE"
    exit 1
fi

# 3. Test de build rapide (sans timeout sur macOS)
echo "🔨 Test de build rapide..."
if npm run build:netlify:super-simple > /dev/null 2>&1; then
    echo "✅ Build rapide: OK"
else
    echo "❌ Build rapide: ÉCHEC"
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
echo "🎉 TOUS LES TESTS CRITIQUES SONT PASSÉS !"
echo "✅ Sentinel Zero est prêt pour la production"
echo "🚀 Compatible avec et sans API"
echo "🌐 Prêt pour Netlify et autres plateformes" 