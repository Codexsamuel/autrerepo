#!/bin/bash

# Script pour vérifier le statut du déploiement Netlify
# Nécessite l'installation de netlify-cli: npm install -g netlify-cli

echo "🔍 Vérification du statut du déploiement..."

# Vérifier si netlify-cli est installé
if ! command -v netlify &> /dev/null; then
    echo "❌ netlify-cli n'est pas installé"
    echo "📦 Installation: npm install -g netlify-cli"
    exit 1
fi

# Vérifier le statut du dernier déploiement
echo "📊 Récupération du statut..."
netlify status

# Afficher les logs du dernier déploiement
echo "📋 Logs du dernier déploiement:"
netlify logs --tail

echo "✅ Vérification terminée" 