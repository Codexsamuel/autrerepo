#!/bin/bash

echo "🚀 Démarrage de l'application hybride Python + Next.js..."

# Démarrer le backend Python en arrière-plan
echo "🐍 Démarrage du backend Python..."
cd /app/backend
python -m uvicorn main:app --host 0.0.0.0 --port 8000 &
PYTHON_PID=$!

# Attendre que Python démarre
sleep 3

# Démarrer le frontend Next.js
echo "⚛️ Démarrage du frontend Next.js..."
cd /app/frontend
npm start &
NEXT_PID=$!

# Fonction de nettoyage
cleanup() {
    echo "🛑 Arrêt des services..."
    kill $PYTHON_PID $NEXT_PID
    exit 0
}

# Capturer les signaux d'arrêt
trap cleanup SIGTERM SIGINT

# Attendre que les processus se terminent
wait 