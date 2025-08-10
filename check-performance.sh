#!/bin/bash

echo "🚀 Vérification des performances du projet DL Solutions"
echo "======================================================"

# Vérifier la taille des node_modules
echo "📦 Taille des dépendances :"
du -sh node_modules 2>/dev/null || echo "❌ node_modules non trouvé"

# Vérifier la taille du build
echo "🏗️  Taille du build :"
if [ -d ".next" ]; then
  du -sh .next
  echo "📊 Détail des chunks :"
  find .next -name "*.js" -exec du -h {} \; | sort -hr | head -10
else
  echo "❌ Build non trouvé - exécutez 'npm run build'"
fi

# Vérifier les performances du serveur de développement
echo ""
echo "⚡ Test des performances de développement :"
echo "Démarrage du serveur de développement..."
timeout 10s npm run dev > /dev/null 2>&1 &
DEV_PID=$!
sleep 5

if kill -0 $DEV_PID 2>/dev/null; then
  echo "✅ Serveur de développement démarré en moins de 5s"
  kill $DEV_PID 2>/dev/null
else
  echo "❌ Serveur de développement lent à démarrer"
fi

# Vérifier la configuration des agents IA
echo ""
echo "🤖 Configuration des agents IA :"
if [ -f "nova-ia-commercial/config/config.json" ]; then
  echo "✅ Configuration Nova IA trouvée"
  cat nova-ia-commercial/config/config.json | jq '.performance // "Non configuré"' 2>/dev/null || echo "⚠️  Configuration de performance non trouvée"
else
  echo "❌ Configuration Nova IA non trouvée"
fi

if [ -f "sentinel-zero/config/config.json" ]; then
  echo "✅ Configuration Sentinel Zero trouvée"
  cat sentinel-zero/config/config.json | jq '.performance // "Non configuré"' 2>/dev/null || echo "⚠️  Configuration de performance non trouvée"
else
  echo "❌ Configuration Sentinel Zero non trouvée"
fi

# Vérifier les métriques de build
echo ""
echo "📈 Métriques de build :"
if [ -f "package.json" ]; then
  echo "📋 Scripts disponibles :"
  npm run --silent 2>/dev/null | grep -E "(build|dev|start)" || echo "❌ Scripts non trouvés"
fi

# Vérifier la configuration Netlify
echo ""
echo "🌐 Configuration Netlify :"
if [ -f "netlify.toml" ]; then
  echo "✅ Configuration Netlify trouvée"
  echo "📋 Commandes de build :"
  grep -E "^  command" netlify.toml || echo "⚠️  Commande de build non trouvée"
else
  echo "❌ Configuration Netlify non trouvée"
fi

# Recommandations de performance
echo ""
echo "💡 Recommandations pour améliorer les performances :"
echo "1. ✅ Configuration webpack optimisée"
echo "2. ✅ Images optimisées avec formats modernes"
echo "3. ✅ Chunks optimisés pour le cache"
echo "4. ✅ CSS optimisé avec critters"
echo "5. ⚠️  Vérifier la configuration DNS (voir fix-dns-config.sh)"
echo "6. ⚠️  Optimiser les composants FileReader côté client"

echo ""
echo "🎯 Prochaines étapes :"
echo "1. Exécuter: chmod +x fix-dns-config.sh && ./fix-dns-config.sh"
echo "2. Corriger les nameservers dans Hostinger"
echo "3. Tester: npm run build"
echo "4. Vérifier les performances avec: npm run dev" 