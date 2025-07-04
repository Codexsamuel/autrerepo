#!/bin/bash

echo "🔧 Nettoyage des ports 3000 et 4000..."

# Tuer les processus sur le port 3000
if lsof -ti:3000 > /dev/null 2>&1; then
    echo "   🚫 Port 3000 occupé, suppression du processus..."
    lsof -ti:3000 | xargs kill -9
    echo "   ✅ Port 3000 libéré"
else
    echo "   ✅ Port 3000 libre"
fi

# Tuer les processus sur le port 4000
if lsof -ti:4000 > /dev/null 2>&1; then
    echo "   🚫 Port 4000 occupé, suppression du processus..."
    lsof -ti:4000 | xargs kill -9
    echo "   ✅ Port 4000 libéré"
else
    echo "   ✅ Port 4000 libre"
fi

# Tuer tous les processus Python http.server
pkill -f "python3 -m http.server" 2>/dev/null || true

echo "🎉 Nettoyage terminé !" 