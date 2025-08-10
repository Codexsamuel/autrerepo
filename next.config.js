const nextConfig = {
  // Configuration de base
  reactStrictMode: true,
  
  // Configuration expérimentale simplifiée
  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
    // Configuration spécifique pour Netlify
    ...(process.env.NETLIFY && {
      // Désactiver les fonctionnalités qui peuvent causer des problèmes
      workerThreads: false,
      cpus: 1,
    }),
  },
  
  // Optimisations de performance
  compress: true,
  
  // Désactiver complètement TypeScript et ESLint pendant le build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Configuration des images pour de meilleures performances
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    unoptimized: true, // Pour éviter les erreurs de build
  },
  
  // Configuration webpack minimale
  webpack: (config, { isServer, dev }) => {
    if (process.env.NETLIFY) {
      console.log('🔧 Configuration webpack minimale pour Netlify...');
      
      // Ajouter le polyfill self en entrée
      if (!isServer) {
        config.entry = {
          ...config.entry,
          'self-polyfill': './lib/polyfills/self-polyfill.js',
        };
      }
    }
    
    return config;
  },
  
  // Configuration spécifique pour Netlify
  ...(process.env.NETLIFY && {
    // Configuration des headers de sécurité
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Referrer-Policy',
              value: 'strict-origin-when-cross-origin',
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block',
            },
          ],
        },
      ];
    },
  }),
};

module.exports = nextConfig; 