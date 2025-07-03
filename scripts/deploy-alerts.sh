#!/bin/bash

echo "🚀 Déploiement du système d'alertes de prix..."

# Nettoyer le cache
echo "🧹 Nettoyage du cache..."
rm -rf .next
rm -rf node_modules/.cache

# Installer les dépendances
echo "📦 Installation des dépendances..."
pnpm install

# Build du projet
echo "🔨 Build du projet..."
pnpm build

# Vérifier le build
if [ $? -eq 0 ]; then
    echo "✅ Build réussi !"
    echo ""
    echo "🎯 Système d'alertes de prix déployé avec succès !"
    echo ""
    echo "📋 Fonctionnalités disponibles :"
    echo "   • 🔔 Alertes de prix en temps réel"
    echo "   • 📊 Surveillance automatique des actifs"
    echo "   • 🔔 Notifications navigateur"
    echo "   • 📱 Interface responsive"
    echo "   • 💾 Sauvegarde locale des alertes"
    echo "   • 📈 Statistiques et conseils"
    echo ""
    echo "🌐 URLs de test :"
    echo "   • Page d'alertes : http://localhost:3001/price-alerts"
    echo "   • Connexion : http://localhost:3001/sign-in"
    echo "   • Inscription : http://localhost:3001/sign-up"
    echo ""
    echo "👤 Comptes de test :"
    echo "   • Email: demo@example.com / Mot de passe: demo123"
    echo "   • Email: test@example.com / Mot de passe: test123"
    echo ""
    echo "🚀 Démarrer le serveur :"
    echo "   pnpm dev"
    echo ""
    echo "📖 Guide d'utilisation :"
    echo "   1. Connectez-vous avec un compte de test"
    echo "   2. Allez sur /price-alerts"
    echo "   3. Ajoutez une alerte (ex: AAPL > 150)"
    echo "   4. Activez les notifications du navigateur"
    echo "   5. Surveillez vos alertes en temps réel"
    echo ""
else
    echo "❌ Erreur lors du build"
    exit 1
fi 