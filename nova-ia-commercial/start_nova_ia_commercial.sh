#!/bin/bash

echo "🚀 Démarrage de NovaAgent AI..."

if ! command -v docker-compose &> /dev/null
then
    echo "Erreur : docker-compose n'est pas installé."
    exit 1
fi

echo "🏗️ Construction et démarrage des conteneurs Docker..."
docker-compose up --build -d

if [ $? -eq 0 ]; then
    echo "✅ NovaAgent AI est démarré avec succès !"
    echo "Frontend Dashboard: http://localhost:3001"
    echo "Backend API: http://localhost:8001"
    echo "Documentation: http://localhost:8001/docs"
else
    echo "❌ Erreur lors du démarrage."
    exit 1
fi
