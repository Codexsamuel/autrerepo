#!/bin/bash

# Script de test de build pour diagnostiquer les problèmes
set -e

echo "🧪 Test de build Next.js..."

# Vérifier la version de Node.js
echo "📋 Version de Node.js:"
node --version
npm --version

# Vérifier les dépendances
echo "📦 Vérification des dépendances..."
npm list --depth=0

# Test de build simple
echo "🏗️ Test de build simple..."
next build --no-lint

echo "✅ Test de build réussi!" 