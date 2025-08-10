#!/bin/bash

echo "🚀 Build Netlify sans dépendances Python..."

# Désactiver complètement l'installation Python
export SKIP_PYTHON_DEPS=true
export NETLIFY=true
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1
export PYTHON_VERSION=""
export PIP_CACHE_DIR=""
export VIRTUAL_ENV=""
export PYTHONPATH=""
export USE_NODE=true
export USE_PYTHON=false

# Vérifier que nous sommes sur Netlify
if [ "$NETLIFY" = "true" ]; then
    echo "✅ Environnement Netlify détecté"
    
    # Nettoyer TOUS les fichiers Python et backend
    echo "🧹 Nettoyage des fichiers Python..."
    
    # Supprimer les fichiers Python à la racine
    find . -maxdepth 1 -name "*.py" -delete 2>/dev/null || true
    find . -maxdepth 1 -name "requirements*.txt" -delete 2>/dev/null || true
    find . -maxdepth 1 -name "Pipfile*" -delete 2>/dev/null || true
    find . -maxdepth 1 -name "setup.py" -delete 2>/dev/null || true
    find . -maxdepth 1 -name ".python-version" -delete 2>/dev/null || true
    
    # Supprimer les dossiers Python
    rm -rf .venv 2>/dev/null || true
    rm -rf venv 2>/dev/null || true
    rm -rf env 2>/dev/null || true
    rm -rf __pycache__ 2>/dev/null || true
    
    echo "✅ Nettoyage terminé"
    
    # Build Next.js
    echo "🔨 Build Next.js..."
    npm run build:netlify:compatible
    
    echo "✅ Build terminé avec succès"
else
    echo "⚠️ Environnement local détecté, build standard..."
    npm run build:netlify:compatible
fi 