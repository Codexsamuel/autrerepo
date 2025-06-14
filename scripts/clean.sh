#!/bin/bash

# Fonction pour afficher les messages d'erreur
error() {
    echo "❌ $1"
    exit 1
}

# Fonction pour afficher les messages de succès
success() {
    echo "✅ $1"
}

# Arrêter le script en cas d'erreur
set -e

echo "🧹 Nettoyage en cours..."

# Supprimer les caches
echo "Suppression des caches..."
rm -rf .next/cache || error "Erreur lors de la suppression du cache Next.js"
rm -rf node_modules/.cache || error "Erreur lors de la suppression du cache npm"

# Vérifier le cache npm
echo "Vérification du cache npm..."
npm cache verify || error "Erreur lors de la vérification du cache npm"

# Supprimer les modules et le fichier package-lock
echo "Suppression des modules node et du package-lock..."
rm -rf node_modules || error "Erreur lors de la suppression des modules node"
rm -f package-lock.json || error "Erreur lors de la suppression du package-lock.json"

# Réinstaller les dépendances
echo "Réinstallation des dépendances..."
npm install || error "Erreur lors de l'installation des dépendances"

# Reconstruire le projet
echo "Reconstruction du projet..."
npm run build || error "Erreur lors de la reconstruction du projet"

success "Nettoyage terminé avec succès !" 