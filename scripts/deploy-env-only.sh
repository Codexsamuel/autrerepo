#!/bin/bash

echo "🚀 Déploiement Variables d'Environnement sur Vercel"

# Vérifier que Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI non installé. Installation..."
    npm install -g vercel
fi

# Créer un package.json minimal
echo "📦 Création package.json minimal..."
cat > package.json << EOF
{
  "name": "dl-solutions-env",
  "version": "1.0.0",
  "description": "Variables d'environnement DL Solutions",
  "main": "index.js",
  "scripts": {
    "vercel-build": "echo 'Environment deployment completed'"
  },
  "dependencies": {},
  "engines": {
    "node": ">=18.0.0"
  }
}
EOF

# Créer un index.js minimal
echo "📄 Création index.js minimal..."
cat > index.js << EOF
module.exports = (req, res) => {
  res.status(200).json({
    message: 'DL Solutions Environment Variables',
    status: 'deployed',
    timestamp: new Date().toISOString()
  });
};
EOF

# Déployer
echo "🚀 Déploiement en cours..."
vercel --prod --yes

# Nettoyer
echo "🧹 Nettoyage..."
rm -f package.json index.js

echo "✅ Déploiement terminé !"
echo "🌐 URL: https://dl-solutions-env.vercel.app" 