#!/bin/bash

echo "🔧 Nettoyage des ports 3000 et 4000..."

# Fonction pour tuer les processus sur un port
kill_port() {
    local port=$1
    local pids=$(lsof -ti:$port)
    
    if [ ! -z "$pids" ]; then
        echo "   🚫 Port $port occupé, suppression du processus..."
        echo "$pids" | xargs kill -9
        echo "   ✅ Port $port libéré"
    else
        echo "   ✅ Port $port libre"
    fi
}

# Nettoyer les ports
kill_port 3000
kill_port 4000

echo "🎉 Nettoyage terminé !" 