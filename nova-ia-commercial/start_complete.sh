#!/bin/bash

# NovaAgent AI Commercial - Script de démarrage complet
# Agent IA Commercial & Communication Digitale

echo "🚀 Démarrage de NovaAgent AI Commercial..."
echo "=================================================="

# Vérification des prérequis
echo "🔍 Vérification des prérequis..."

# Vérifier Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

echo "✅ Prérequis vérifiés"

# Configuration de l'environnement
echo "🔧 Configuration de l'environnement..."

# Créer le fichier .env s'il n'existe pas
if [ ! -f .env ]; then
    echo "📝 Création du fichier .env..."
    cat > .env << 'ENVEOF'
# NovaAgent AI Commercial - Configuration
NOVA_IA_API_KEY=nova_ia_commercial_2025
NOVA_IA_SECRET_KEY=nova_ia_secret_2025
DATABASE_URL=postgresql://nova_admin:nova_secure_password_2025@localhost:5432/nova_ia_commercial
REDIS_URL=redis://localhost:6379
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=production
ENVEOF
    echo "✅ Fichier .env créé"
else
    echo "✅ Fichier .env existant"
fi

# Démarrer les services
echo "🐳 Démarrage des services Docker..."

# Construire et démarrer les conteneurs
docker-compose up -d --build

# Attendre que les services soient prêts
echo "⏳ Attente du démarrage des services..."
sleep 30

# Vérifier le statut des services
echo "🔍 Vérification du statut des services..."

# Backend
if curl -s http://localhost:8001/health > /dev/null; then
    echo "✅ Backend NovaAgent AI en ligne (http://localhost:8001)"
else
    echo "❌ Backend non accessible"
fi

# Frontend
if curl -s http://localhost:3001 > /dev/null; then
    echo "✅ Frontend NovaAgent AI en ligne (http://localhost:3001)"
else
    echo "❌ Frontend non accessible"
fi

# Base de données
if docker ps | grep -q "nova-ia-commercial-db"; then
    echo "✅ Base de données PostgreSQL en ligne"
else
    echo "❌ Base de données non accessible"
fi

echo ""
echo "�� NovaAgent AI Commercial est prêt !"
echo "=================================================="
echo ""
echo "📊 Accès aux services :"
echo "  • Dashboard : http://localhost:3001"
echo "  • API Backend : http://localhost:8001"
echo "  • Documentation API : http://localhost:8001/docs"
echo "  • Base de données : localhost:5432"
echo ""
echo "🔑 Identifiants par défaut :"
echo "  • Super Admin : admin / nova_admin_2025"
echo "  • AI Agent : ai_agent / nova_ai_2025"
echo "  • Viewer : viewer / nova_viewer_2025"
echo ""
echo "📚 Documentation :"
echo "  • Documentation technique : ./DOCUMENTATION_TECHNIQUE.md"
echo "  • README : ./README.md"
echo ""
echo "🛠️ Commandes utiles :"
echo "  • Arrêter les services : docker-compose down"
echo "  • Voir les logs : docker-compose logs -f"
echo "  • Redémarrer : docker-compose restart"
echo ""
echo "�� Bonne utilisation de NovaAgent AI Commercial !"
