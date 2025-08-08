/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration hybride : Frontend Netlify + Backend Vercel
  // output: 'export', // Commenté pour permettre les API routes
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  
  // Désactiver ESLint et TypeScript pendant le build de production
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Configuration optimisée pour Vercel
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    optimizeCss: true,
  },
  
  // Configuration des images avancée
  images: {
    unoptimized: true, // Pour Vercel
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
  
  // Configuration pour Netlify - Export statique
  trailingSlash: true,
  
  // Configuration webpack pour optimiser le build
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
        },
      };
    }
    
    return config;
  },
};

module.exports = nextConfig; 