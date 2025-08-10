#!/bin/bash

echo "🚀 Démarrage de Sentinel Zero - Agent Red Team IA Ultra-Avancé..."
echo ""

# Vérification des prérequis
echo "🔍 Vérification des prérequis..."

if ! command -v docker &> /dev/null; then
    echo "❌ Erreur : Docker n'est pas installé."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Erreur : docker-compose n'est pas installé."
    exit 1
fi

# Vérification des variables d'environnement
echo "🔐 Configuration des variables d'environnement..."

if [ ! -f .env ]; then
    echo "📝 Création du fichier .env..."
    cat > .env << 'ENVEOF'
# Configuration Sentinel Zero Ultra-Avancé
SECRET_KEY=SENTINEL_SUPER_KEY_4096_RSA_DL_SOLUTIONS_2025
MASTER_CODE=0987612345
BIOMETRIC_VOICE_HASH=b5945c46c8a2d3e1f7b9a4c6d8e2f1a3b5c7d9e4f2a6b8c1d5e7f3a9b2c4d6e8f0
BIOMETRIC_FP_HASH=a3b5d6887c2e4f1a9b6c3d8e5f2a7b4c1d9e6f3a8b5c2d7e4f1a6b3c9d5e2f8a7b4c1
SUPER_ADMIN_ID=DL-SUPER-01
RED_BUTTON_PHRASE=i am sentinel
DB_PASSWORD=SENTINEL_SUPER_SECURE_PASSWORD_4096
REDIS_PASSWORD=SENTINEL_REDIS_SECURE_2025
ELASTIC_PASSWORD=SENTINEL_ELASTIC_SECURE_2025
JWT_SECRET=SENTINEL_JWT_SUPER_SECURE_2025
ENCRYPTION_KEY=SENTINEL_ENCRYPTION_KEY_256_BIT_2025
GRAFANA_PASSWORD=SENTINEL_GRAFANA_SECURE_2025
OPENAI_API_KEY=your_openai_api_key_here
ENVEOF
fi

# Construction des images Docker
echo "🏗️ Construction des images Docker ultra-avancées..."
docker-compose build --no-cache

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de la construction des images Docker."
    exit 1
fi

# Démarrage des services
echo "🚀 Démarrage des services Sentinel Zero..."
docker-compose up -d

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Sentinel Zero est démarré avec succès !"
    echo ""
    echo "🌐 Accès aux services :"
    echo "   Frontend Dashboard: http://localhost:3000"
    echo "   Backend API: http://localhost:8000"
    echo "   Documentation API: http://localhost:8000/docs"
    echo "   Kibana: http://localhost:5601"
    echo "   Grafana: http://localhost:3001"
    echo "   Prometheus: http://localhost:9090"
    echo "   Nginx: http://localhost"
    echo ""
    echo "🔐 Identifiants par défaut :"
    echo "   Master Code: 0987612345"
    echo "   Admin ID: DL-SUPER-01"
    echo "   Vocal Phrase: i am sentinel"
    echo ""
    echo "🗄️ Base de données :"
    echo "   PostgreSQL: localhost:5432"
    echo "   Redis: localhost:6379"
    echo "   Elasticsearch: localhost:9200"
    echo ""
    echo "🛑 Pour arrêter les services :"
    echo "   ./stop_sentinel_ultra.sh"
    echo ""
    echo "📊 Monitoring :"
    echo "   docker-compose logs -f sentinel-backend"
    echo "   docker-compose logs -f sentinel-frontend"
    echo ""
else
    echo "❌ Erreur lors du démarrage de Sentinel Zero."
    exit 1
fi
