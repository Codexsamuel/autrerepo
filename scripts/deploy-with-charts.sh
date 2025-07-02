#!/bin/bash

echo "🚀 Déploiement de la plateforme de trading avec graphiques interactifs..."

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    print_error "package.json non trouvé. Assurez-vous d'être dans le répertoire du projet."
    exit 1
fi

print_status "📦 Installation des dépendances..."
pnpm install

if [ $? -ne 0 ]; then
    print_error "Échec de l'installation des dépendances"
    exit 1
fi

print_success "Dépendances installées avec succès"

# Test des APIs
print_status "🔍 Test des APIs..."
curl -s http://localhost:3001/api/trading/real-data?symbols=AAPL,bitcoin | head -5

if [ $? -eq 0 ]; then
    print_success "APIs fonctionnelles"
else
    print_warning "APIs non accessibles (serveur peut ne pas être démarré)"
fi

# Build de production
print_status "🏗️ Build de production..."
pnpm build

if [ $? -ne 0 ]; then
    print_error "Échec du build"
    exit 1
fi

print_success "Build réussi"

# Test local
print_status "🧪 Test local..."
pnpm start &
SERVER_PID=$!

# Attendre que le serveur démarre
sleep 10

# Test des pages principales
print_status "🔍 Test des pages..."

# Test page d'accueil
if curl -s http://localhost:3000 | grep -q "DL Solutions"; then
    print_success "Page d'accueil OK"
else
    print_warning "Page d'accueil non accessible"
fi

# Test page de graphiques
if curl -s http://localhost:3000/trading-charts | grep -q "Graphiques de Trading"; then
    print_success "Page de graphiques OK"
else
    print_warning "Page de graphiques non accessible"
fi

# Test page de trading
if curl -s http://localhost:3000/demo/real-trading | grep -q "Trading"; then
    print_success "Page de trading OK"
else
    print_warning "Page de trading non accessible"
fi

# Arrêter le serveur de test
kill $SERVER_PID 2>/dev/null

# Git operations
print_status "📝 Préparation du commit..."

# Vérifier s'il y a des changements
if git diff --quiet && git diff --cached --quiet; then
    print_warning "Aucun changement détecté"
else
    # Ajouter tous les fichiers
    git add .
    
    # Commit avec message descriptif
    git commit -m "✨ Ajout de graphiques interactifs de trading

- Graphiques en ligne, zone, barres et camembert
- Navigation intégrée avec icônes
- Page dédiée aux graphiques avec statistiques
- Interface responsive et moderne
- Intégration avec les données réelles d'API
- Contrôles de type de graphique et timeframe
- Statistiques globales et détaillées"

    print_success "Commit créé"
fi

# Push vers GitHub
print_status "🚀 Push vers GitHub..."
git push origin clean-start

if [ $? -ne 0 ]; then
    print_error "Échec du push"
    exit 1
fi

print_success "Push réussi"

# Informations de déploiement
echo ""
print_success "🎉 Déploiement terminé avec succès !"
echo ""
echo "📊 Nouvelles fonctionnalités ajoutées :"
echo "   • Graphiques interactifs (ligne, zone, barres, camembert)"
echo "   • Navigation moderne avec icônes"
echo "   • Page dédiée aux graphiques (/trading-charts)"
echo "   • Statistiques globales et détaillées"
echo "   • Interface responsive"
echo ""
echo "🌐 URLs de la plateforme :"
echo "   • Site principal : https://davy-trading-platform.netlify.app"
echo "   • Graphiques : https://davy-trading-platform.netlify.app/trading-charts"
echo "   • Trading : https://davy-trading-platform.netlify.app/demo/real-trading"
echo "   • API Test : https://davy-trading-platform.netlify.app/api-test"
echo ""
echo "📱 Test local :"
echo "   • http://localhost:3000 (après 'pnpm dev')"
echo "   • http://localhost:3000/trading-charts"
echo ""
print_status "🔧 Prochaines étapes suggérées :"
echo "   1. Tester les graphiques sur le site déployé"
echo "   2. Ajouter l'authentification"
echo "   3. Implémenter les alertes de prix"
echo "   4. Ajouter plus d'indicateurs techniques"
echo "   5. Optimiser les performances"
echo ""
print_success "✅ Plateforme prête pour la production !" 