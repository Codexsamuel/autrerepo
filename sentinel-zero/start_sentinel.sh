#!/bin/bash

echo "🚀 Démarrage de Sentinel Zero - Agent Red Team IA Ultra-Avancé..."

if ! command -v docker-compose &> /dev/null
then
    echo "Erreur : docker-compose n'est pas installé."
    exit 1
fi

echo "🏗️ Construction et démarrage des conteneurs Docker..."
docker-compose up --build -d

if [ $? -eq 0 ]; then
    echo "✅ Sentinel Zero est démarré avec succès !"
    echo ""
    echo "🌐 Accès aux services :"
    echo "   Frontend Dashboard: http://localhost:3000"
    echo "   Backend API: http://localhost:8000"
    echo "   Documentation API: http://localhost:8000/docs"
    echo ""
    echo "🔐 Identifiants par défaut :"
    echo "   Master Code: 0987612345"
    echo "   Admin ID: DL-SUPER-01"
    echo "   Vocal Phrase: i am sentinel"
    echo ""
    echo "🛑 Pour arrêter les services :"
    echo "   docker-compose down"
else
    echo "❌ Erreur lors du démarrage de Sentinel Zero."
    exit 1
fi
