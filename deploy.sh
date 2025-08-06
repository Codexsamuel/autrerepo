#!/bin/bash
# 🚀 Script de déploiement Sentinel Zero - Installation automatique

echo "�� Déploiement Sentinel Zero IA en cours..."

# Vérification des prérequis
if ! command -v docker &> /dev/null; then
    echo "❌ Docker non installé. Installation en cours..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    sudo usermod -aG docker $USER
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose non installé. Installation en cours..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# Installation de SOPS pour le chiffrement
if ! command -v sops &> /dev/null; then
    echo "🔐 Installation de SOPS pour le chiffrement..."
    wget -O sops https://github.com/mozilla/sops/releases/latest/download/sops-$(uname -s).$(uname -m)
    sudo mv sops /usr/local/bin/
    sudo chmod +x /usr/local/bin/sops
fi

# Création des dossiers nécessaires
echo "📁 Création de la structure de dossiers..."
mkdir -p data logs vectors

# Configuration des permissions
echo "🔒 Configuration des permissions..."
chmod 600 .env.sops.yaml
chmod +x deploy.sh

# Démarrage des services
echo "🚀 Démarrage de Sentinel Zero..."
docker-compose up -d --build

# Vérification du statut
echo "📊 Vérification du statut des services..."
docker-compose ps

echo "✅ Sentinel Zero déployé avec succès!"
echo "�� Dashboard disponible sur: http://localhost:3000"
echo "🔧 API disponible sur: http://localhost:8080"
echo ""
echo "🔐 Pour déchiffrer les secrets: sops -d .env.sops.yaml > .env"
echo "🚨 Red Button: docker-compose exec sentinel python -c \"from lib.services.ultra_advanced_ai import emergencyRedButton; emergencyRedButton()\""
