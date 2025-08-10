/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
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
  
  // Optimisation des bundles
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Exclure le Service Worker du build pour éviter l'erreur "self is not defined"
    config.module.rules.push({
      test: /sw\.js$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/[name][ext]'
      }
    });
    
    // Optimisation des chunks - désactivée pour Netlify
    if (process.env.NETLIFY) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }
    
    return config;
  },
  
  // Configuration des rewrites (seulement pour le développement)
  async rewrites() {
    // Désactiver les rewrites en production pour éviter les conflits
    if (process.env.NODE_ENV === 'production') {
      return [];
    }
    
    return [
      {
        source: '/api/metaverse-blockchain/:path*',
        destination: '/api/health',
      },
      {
        source: '/api/intelligence/:path*',
        destination: '/api/health',
      },
      {
        source: '/api/ai/advanced/:path*',
        destination: '/api/health',
      },
      {
        source: '/api/ai/chatgpt-42/:path*',
        destination: '/api/health',
      },
    ];
  },
};

module.exports = nextConfig; 