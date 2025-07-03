#!/bin/bash

# Script de monitoring du déploiement Netlify
# Usage: ./scripts/monitor-deploy.sh

echo "🚀 Monitoring du déploiement Netlify..."
echo "======================================"

# Vérifier l'état du repository
echo "📊 État du repository:"
git status --porcelain
echo ""

# Vérifier les derniers commits
echo "📝 Derniers commits:"
git log --oneline -5
echo ""

# Vérifier la configuration Netlify
echo "⚙️  Configuration Netlify:"
if [ -f "netlify.toml" ]; then
    echo "✅ netlify.toml trouvé"
    echo "📋 Contenu de la configuration:"
    cat netlify.toml | head -20
else
    echo "❌ netlify.toml manquant"
fi
echo ""

# Vérifier package.json
echo "📦 Dépendances de production:"
if [ -f "package.json" ]; then
    echo "✅ package.json trouvé"
    echo "🔧 TypeScript dans dependencies:"
    grep -A 5 -B 5 "typescript" package.json
else
    echo "❌ package.json manquant"
fi
echo ""

# Test de build local
echo "🔨 Test de build local:"
if pnpm run build > /dev/null 2>&1; then
    echo "✅ Build local réussi"
    echo "📄 Pages générées: $(find out -name "*.html" | wc -l)"
else
    echo "❌ Build local échoué"
fi
echo ""

echo "🎯 Prochaines étapes:"
echo "1. Surveiller le dashboard Netlify"
echo "2. Vérifier les logs de build"
echo "3. Tester le site une fois déployé"
echo ""
echo "🔗 Dashboard Netlify: https://app.netlify.com/"
echo "📊 Logs de build: Voir dans le dashboard Netlify" 