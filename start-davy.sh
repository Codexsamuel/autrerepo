#!/bin/bash

echo "🚀 Démarrage de DAVY Trading Advisor..."

# Vérifier l'environnement
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    exit 1
fi

if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm n'est pas installé"
    exit 1
fi

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    pnpm install
fi

# Nettoyer les caches
echo "🧹 Nettoyage des caches..."
rm -rf .next node_modules/.cache

# Démarrer le serveur
echo "🌐 Démarrage du serveur de développement..."
echo "📱 Interface web: http://localhost:3000"
echo "🤖 DAVY Trading: http://localhost:3000/trading"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter le serveur"

pnpm dev
