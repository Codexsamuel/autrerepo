#!/bin/bash

echo "🚀 Déploiement Hybride - DL Solutions Platform"
echo "================================================"
echo ""

# Vérifier que Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI n'est pas installé"
    echo "📦 Installation en cours..."
    npm install -g vercel
    echo ""
fi

# Vérifier que l'utilisateur est connecté à Vercel
echo "🔐 Vérification de la connexion Vercel..."
if ! vercel whoami &> /dev/null; then
    echo "❌ Vous n'êtes pas connecté à Vercel"
    echo "🔑 Connexion en cours..."
    vercel login
    echo ""
fi

echo "✅ Connexion Vercel vérifiée"
echo ""

# Étape 1: Déploiement Vercel
echo "🔧 ÉTAPE 1: Déploiement des APIs sur Vercel"
echo "----------------------------------------------"
echo "🚀 Déploiement en cours..."
vercel --prod

echo ""
echo "✅ APIs déployées sur Vercel !"
echo ""

# Demander l'URL de déploiement
echo "📝 Veuillez noter l'URL de déploiement Vercel (ex: https://dl-solutions-api.vercel.app)"
read -p "URL Vercel: " vercel_url

if [ -z "$vercel_url" ]; then
    echo "❌ URL Vercel manquante. Arrêt du déploiement."
    exit 1
fi

# Étape 2: Mise à jour de la configuration Netlify
echo ""
echo "🌐 ÉTAPE 2: Mise à jour de la configuration Netlify"
echo "---------------------------------------------------"

# Extraire le nom du projet Vercel de l'URL
vercel_project=$(echo $vercel_url | sed 's|https://||' | sed 's|\.vercel\.app||')

# Mettre à jour netlify.toml
echo "📝 Mise à jour de netlify.toml..."
sed -i.bak "s|YOUR_VERCEL_DEPLOYMENT_URL|$vercel_project|g" netlify.toml

echo "✅ netlify.toml mis à jour avec l'URL: $vercel_url"
echo ""

# Étape 3: Déploiement Netlify
echo "🚀 ÉTAPE 3: Déploiement du frontend sur Netlify"
echo "------------------------------------------------"

# Vérifier le statut git
if [ -z "$(git status --porcelain)" ]; then
    echo "✅ Aucun changement à commiter"
else
    echo "📝 Changements détectés, commit en cours..."
    git add .
    git commit -m "Configuration hybride: APIs sur Vercel ($vercel_project), frontend sur Netlify"
fi

echo "🚀 Push vers Netlify..."
git push origin main

echo ""
echo "🎉 Déploiement hybride terminé !"
echo ""
echo "📋 Récapitulatif:"
echo "   • APIs: $vercel_url"
echo "   • Frontend: https://dlsolutionssarl.tech"
echo "   • Configuration: netlify.toml mis à jour"
echo ""
echo "🔍 Vérification:"
echo "   1. Attendre le déploiement Netlify (2-5 min)"
echo "   2. Tester: https://dlsolutionssarl.tech"
echo "   3. Vérifier les APIs dans la console du navigateur"
echo ""
echo "📚 Documentation: DEPLOYMENT-GUIDE.md" 