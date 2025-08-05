/** @type {import('next').NextConfig} */
const nextConfig = {
  // Désactiver ESLint pendant le build de production
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
  
  // Configuration pour export statique (désactivé pour permettre les APIs)
  // output: process.env.NETLIFY === 'true' ? 'export' : undefined,
  trailingSlash: process.env.NETLIFY === 'true',
  
  // Configuration pour le développement et la production
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    optimizeCss: true,
  },
  
  // Configuration des images avancée
  images: {
    unoptimized: process.env.NETLIFY === 'true',
    domains: [
      'images.unsplash.com',
      'res.cloudinary.com',
      'via.placeholder.com',
      'picsum.photos',
      'localhost',
      '127.0.0.1'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dko5sommz/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '3000',
        pathname: '/**',
      }
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Optimisations de performance avancées (désactivées pour export statique)
  experimental: process.env.NETLIFY === 'true' ? {} : {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    optimizeCss: true,
  },
  
  // Configuration Turbopack (désactivée pour export statique)
  turbopack: process.env.NETLIFY === 'true' ? undefined : {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  
  // Autoriser le développement en réseau local (Cross-Origin)
  allowedDevOrigins: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'http://localhost:3004',
    'http://172.20.10.8:3000',
    'http://172.20.10.8:3001',
    'http://172.20.10.8:3002',
    'http://192.168.1.134:3000',
    'http://192.168.1.134:3001',
    'http://192.168.1.134:3002'
  ],
  
  // Optimisations de performance
  compress: true,
  
  // Configuration des variables d'environnement
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Configuration webpack avancée
  webpack: (config, { isServer, dev }) => {
    // Optimisations pour la production
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }
    
    // Optimisation des images SVG
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    
    return config;
  },
};

module.exports = nextConfig; 