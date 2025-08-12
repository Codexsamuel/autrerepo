#!/bin/bash

echo "🚨 BUILD D'URGENCE NETLIFY - Fix Supabase Key"
echo "🔧 Configuration d'urgence créée"

# Créer une configuration Next.js ultra-minimale
cat > next.config.emergency.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js', '@supabase/realtime-js'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push('@supabase/supabase-js');
      config.externals.push('@supabase/realtime-js');
    }
    
    // Fallbacks pour éviter les erreurs de build
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
    };
    
    return config;
  },
  // Désactiver complètement la collecte des données statiques
  generateStaticParams: false,
  // Mode statique uniquement
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
EOF

echo "📦 Vérification des dépendances..."
npm list --depth=0 | head -20

echo "🔨 Build Next.js en mode d'urgence..."
echo "⚠️ Utilisation de la configuration d'urgence pour éviter Supabase"

# Utiliser la configuration d'urgence
NEXT_CONFIG_FILE=next.config.emergency.js npm run build:netlify:emergency

if [ $? -eq 0 ]; then
  echo "✅ Build d'urgence réussi !"
  exit 0
else
  echo "❌ Échec du build d'urgence"
  echo "🔍 Tentative de build sans collecte de données..."
  
  # Build sans collecte de données
  NEXT_CONFIG_FILE=next.config.emergency.js NEXT_TELEMETRY_DISABLED=1 next build --no-lint --no-mangling --no-export
fi 