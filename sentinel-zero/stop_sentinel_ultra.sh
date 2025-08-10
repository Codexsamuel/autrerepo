#!/bin/bash

echo "🛑 Arrêt de Sentinel Zero - Agent Red Team IA Ultra-Avancé..."
echo ""

# Arrêt des services
echo "⏹️ Arrêt des conteneurs Docker..."
docker-compose down

if [ $? -eq 0 ]; then
    echo "✅ Sentinel Zero a été arrêté avec succès !"
    echo ""
    echo "🧹 Nettoyage des volumes (optionnel) :"
    echo "   docker-compose down -v  # Supprime les volumes"
    echo "   docker system prune -f   # Nettoie les images non utilisées"
    echo ""
else
    echo "❌ Erreur lors de l'arrêt de Sentinel Zero."
    exit 1
fi
