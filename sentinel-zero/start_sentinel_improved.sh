#!/bin/bash

echo "🚀 Démarrage Sentinel Zero - Agent Red Team IA Ultra-Avancé"
echo "=========================================================="

# Vérifier Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 n'est pas installé"
    exit 1
fi

# Vérifier les dépendances
echo "📦 Vérification des dépendances..."
cd backend

if [ ! -f "requirements.txt" ]; then
    echo "❌ Fichier requirements.txt manquant"
    exit 1
fi

# Installer les dépendances
echo "🔧 Installation des dépendances..."
pip3 install -r requirements.txt

# Vérifier la configuration
echo "⚙️  Vérification de la configuration..."
python3 config.py

if [ $? -ne 0 ]; then
    echo "❌ Configuration invalide"
    exit 1
fi

# Démarrer le serveur
echo "🌐 Démarrage du serveur Sentinel Zero..."
echo "📍 URL: http://localhost:8000"
echo "🔐 Admin ID: DL-SUPER-01"
echo "🔑 Code maître: 0987612345"
echo "🎤 Phrase vocale: i am sentinel"
echo ""
echo "📋 Endpoints disponibles:"
echo "   POST /api/auth/login - Authentification 5 niveaux"
echo "   GET  /api/health - Vérification de santé"
echo "   POST /api/scan/backdoor - Scan de portes dérobées"
echo "   POST /api/auth/red-button - Bouton rouge (destruction)"
echo ""
echo "🛑 Pour arrêter: Ctrl+C"
echo ""

# Démarrer le serveur
python3 main.py 