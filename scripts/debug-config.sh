#!/bin/bash

# Script pour activer le mode debug du plugin SelfReferenceFixer
echo "🔧 ACTIVATION DU MODE DEBUG DU PLUGIN SELFREDERENCEFIXER"
echo "======================================================"

# Vérifier si le fichier .env.local existe
if [ -f ".env.local" ]; then
    echo "📁 Fichier .env.local trouvé"
    echo "🔍 Contenu actuel :"
    cat .env.local
    echo ""
else
    echo "📁 Fichier .env.local non trouvé, création..."
fi

# Créer ou mettre à jour .env.local
cat > .env.local << EOF
# Configuration du plugin SelfReferenceFixer
DEBUG_SELF_REFERENCE_FIXER=true

# Mode debug pour le build
NODE_ENV=development

# Variables pour le test local
NETLIFY_BUILD_LOCAL=true
EOF

echo "✅ Fichier .env.local mis à jour avec le mode debug activé"
echo ""
echo "🚀 Pour tester avec debug :"
echo "   npm run test:plugin:debug"
echo ""
echo "🔍 Pour vérifier le plugin :"
echo "   npm run test:plugin"
echo ""
echo "🧹 Pour nettoyer :"
echo "   rm .env.local" 