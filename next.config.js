/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimisations pour les API routes
  experimental: {
    serverComponentsExternalPackages: [],
  },
  
  // Configuration des images
  images: {
    domains: [
      'images.unsplash.com',
      'res.cloudinary.com',
      'via.placeholder.com',
      'picsum.photos'
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Configuration des redirections
  async redirects() {
    return [
      // Redirections spécifiques si nécessaire
    ];
  },
  
  // Configuration des headers
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
  
  // Configuration pour Netlify
  trailingSlash: false,
  
  // Optimisations de performance
  compress: true,
  
  // Configuration des variables d'environnement
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Configuration des webpack
  webpack: (config, { isServer }) => {
    // Optimisations webpack si nécessaire
    return config;
  },
};

module.exports = nextConfig; 