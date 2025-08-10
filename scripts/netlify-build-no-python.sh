#!/bin/bash

echo "🚀 Build Netlify sans dépendances Python..."

# Désactiver l'installation automatique des dépendances Python
export SKIP_PYTHON_DEPS=true
export NETLIFY=true
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1

# Vérifier que nous sommes sur Netlify
if [ "$NETLIFY" = "true" ]; then
    echo "✅ Environnement Netlify détecté"
    
    # Nettoyer les fichiers Python si présents
    if [ -f "requirements.txt" ]; then
        echo "⚠️ Suppression temporaire de requirements.txt"
        mv requirements.txt requirements.txt.backup
    fi
    
    # Build Next.js
    echo "🔨 Build Next.js..."
    npm run build:netlify:compatible
    
    # Restaurer requirements.txt si nécessaire
    if [ -f "requirements.txt.backup" ]; then
        echo "🔄 Restauration de requirements.txt"
        mv requirements.txt.backup requirements.txt
    fi
    
    echo "✅ Build terminé avec succès"
else
    echo "⚠️ Environnement local détecté, build standard..."
    npm run build:netlify:compatible
fi 