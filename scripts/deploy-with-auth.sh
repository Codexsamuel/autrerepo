#!/bin/bash

echo "🔐 Déploiement de la plateforme de trading avec authentification..."

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

print_status "🔧 Configuration de l'environnement..."
if [ ! -f ".env.local" ]; then
    print_warning "Fichier .env.local non trouvé, création d'un exemple..."
    cat > .env.local << EOF
# Configuration de l'authentification
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Configuration de la base de données (optionnel)
DATABASE_URL="file:./dev.db"

# Configuration des APIs externes
ALPHA_VANTAGE_API_KEY=your-alpha-vantage-key
EXCHANGE_RATE_API_KEY=your-exchange-rate-key
EOF
    print_success "Fichier .env.local créé"
fi

print_status "🏗️ Build de production..."
pnpm build

if [ $? -ne 0 ]; then
    print_error "Échec du build de production"
    exit 1
fi

print_status "🧪 Test local..."
timeout 30s pnpm start &
SERVER_PID=$!

# Attendre que le serveur démarre
sleep 5

# Tester les endpoints principaux
print_status "Test des endpoints..."

# Test de la page d'accueil
if curl -s http://localhost:3000 > /dev/null; then
    print_success "✅ Page d'accueil accessible"
else
    print_warning "⚠️ Page d'accueil non accessible"
fi

# Test de la page de connexion
if curl -s http://localhost:3000/sign-in > /dev/null; then
    print_success "✅ Page de connexion accessible"
else
    print_warning "⚠️ Page de connexion non accessible"
fi

# Test de la page d'inscription
if curl -s http://localhost:3000/sign-up > /dev/null; then
    print_success "✅ Page d'inscription accessible"
else
    print_warning "⚠️ Page d'inscription non accessible"
fi

# Test de la page dashboard
if curl -s http://localhost:3000/dashboard > /dev/null; then
    print_success "✅ Page dashboard accessible"
else
    print_warning "⚠️ Page dashboard non accessible"
fi

# Arrêter le serveur
kill $SERVER_PID 2>/dev/null

print_status "📝 Commit des changements..."
git add .
git commit -m "🔐 Ajout du système d'authentification

- Pages de connexion et d'inscription
- Dashboard utilisateur protégé
- Système d'authentification JWT
- Navigation mise à jour
- Interface utilisateur moderne"

if [ $? -ne 0 ]; then
    print_warning "Aucun changement à commiter"
else
    print_success "Changements commités"
fi

print_status "🚀 Push vers GitHub..."
git push origin clean-start

if [ $? -eq 0 ]; then
    print_success "✅ Déploiement terminé avec succès !"
    echo ""
    print_status "🌐 URLs de test :"
    echo "  • Site principal : https://davy-trading-platform.netlify.app"
    echo "  • Connexion : https://davy-trading-platform.netlify.app/sign-in"
    echo "  • Inscription : https://davy-trading-platform.netlify.app/sign-up"
    echo "  • Dashboard : https://davy-trading-platform.netlify.app/dashboard"
    echo "  • Graphiques : https://davy-trading-platform.netlify.app/trading-charts"
    echo ""
    print_status "🔑 Comptes de test :"
    echo "  • Admin : admin@davytrading.com / password123"
    echo "  • Demo : demo@davytrading.com / password123"
    echo ""
    print_status "📋 Prochaines étapes :"
    echo "  1. Tester la connexion/inscription"
    echo "  2. Vérifier l'accès au dashboard"
    echo "  3. Configurer les variables d'environnement sur Netlify"
    echo "  4. Ajouter des fonctionnalités avancées"
else
    print_error "❌ Échec du push vers GitHub"
    exit 1
fi 