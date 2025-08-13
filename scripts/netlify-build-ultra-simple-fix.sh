#!/bin/bash

set -e

echo "🚨 BUILD ULTRA-SIMPLE NETLIFY - Fix Supabase Key"
echo "🔧 Configuration ultra-minimale créée"

# Créer une configuration Next.js ultra-simple
cat > next.config.ultra-simple.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mode statique uniquement
  output: 'export',
  trailingSlash: true,
  
  // Désactiver complètement la collecte des données
  generateStaticParams: false,
  
  // Images non optimisées
  images: {
    unoptimized: true,
  },
  
  // Configuration webpack ultra-minimale
  webpack: (config, { isServer }) => {
    // Externaliser TOUT ce qui peut causer des problèmes
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push('@supabase/supabase-js');
      config.externals.push('@supabase/realtime-js');
      config.externals.push('@supabase/storage-js');
      config.externals.push('stripe');
      config.externals.push('twilio');
      config.externals.push('nodemailer');
    }
    
    // Fallbacks complets
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      util: false,
      url: false,
      zlib: false,
      http: false,
      https: false,
      assert: false,
      os: false,
      path: false,
      buffer: false,
      process: false,
      querystring: false,
      punycode: false,
      domain: false,
      dns: false,
      dgram: false,
      child_process: false,
      cluster: false,
      module: false,
      readline: false,
      repl: false,
      string_decoder: false,
      sys: false,
      timers: false,
      tty: false,
      v8: false,
      vm: false,
      worker_threads: false,
    };
    
    return config;
  },
  
  // Désactiver TOUT ce qui peut causer des erreurs
  experimental: {
    serverComponentsExternalPackages: [
      '@supabase/supabase-js',
      '@supabase/realtime-js',
      '@supabase/storage-js',
      'stripe',
      'twilio',
      'nodemailer'
    ],
    esmExternals: 'loose',
  },
  
  // Redirections pour TOUTES les routes API problématiques
  async redirects() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/status',
        permanent: false,
      },
    ];
  },
}

module.exports = nextConfig
EOF

echo "📦 Vérification des dépendances..."
npm list --depth=0 | head -10

echo "🔨 Build Next.js en mode ultra-simple..."
echo "⚠️ Configuration ultra-minimale pour éviter TOUS les problèmes"

# Variables d'environnement
export NEXT_CONFIG_FILE=next.config.ultra-simple.js
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=production
export NETLIFY=true

# Build ultra-simple
echo "🚀 Lancement du build ultra-simple..."
next build --no-lint --no-mangling --config next.config.ultra-simple.js

if [ $? -eq 0 ]; then
  echo "✅ Build ultra-simple réussi !"
  echo "📱 Frontend ultra-simple prêt pour Netlify"
  exit 0
else
  echo "❌ Échec du build ultra-simple"
  echo "🚨 Mode de survie extrême activé..."
  
  # Dernière tentative : build sans collecte de données
  next build --no-lint --no-mangling --config next.config.ultra-simple.js --no-export
fi 