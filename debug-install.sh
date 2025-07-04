#!/bin/bash

echo "🔍 Diagnostic de l'installation npm..."
echo "=================================="

echo "📋 Version de Node.js:"
node --version

echo "📋 Version de npm:"
npm --version

echo "📋 Contenu du package.json:"
cat package.json

echo "📋 Tentative d'installation avec npm:"
npm install 2>&1

echo "📋 Code de sortie: $?"

echo "📋 Vérification des fichiers de lock:"
ls -la | grep -E "(lock|yarn|pnpm)"

echo "📋 Diagnostic terminé." 