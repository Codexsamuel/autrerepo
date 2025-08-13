/** @type {import('next').Config} */
const nextConfig = {
  // Mode de production optimisé
  reactStrictMode: true,
  swcMinify: true,
  
  // Désactiver TypeScript et ESLint pendant le build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Configuration des images
  images: {
    unoptimized: true, // Pour Netlify
    domains: ['dlsolutionssarl.tech', 'daveandlucesolutions.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Configuration webpack pour production
  webpack: (config, { isServer, dev }) => {
    // Externaliser les packages problématiques en production
    if (!dev && isServer) {
      config.externals = config.externals || [];
      config.externals.push('@supabase/supabase-js');
      config.externals.push('stripe');
      config.externals.push('twilio');
      config.externals.push('nodemailer');
    }
    
    // Fallbacks pour la compatibilité
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
    };
    
    return config;
  },
  
  // Configuration expérimentale
  experimental: {
    esmExternals: 'loose',
    serverComponentsExternalPackages: [
      '@supabase/supabase-js',
      'stripe',
      'twilio',
      'nodemailer'
    ],
  },
  
  // Redirections pour les APIs
  async redirects() {
    return [
      {
        source: '/api/novaprotect/:path*',
        destination: '/api/status',
        permanent: false,
      },
      {
        source: '/api/ics/:path*',
        destination: '/api/status',
        permanent: false,
      },
      {
        source: '/api/search/:path*',
        destination: '/api/status',
        permanent: false,
      },
      {
        source: '/api/reminders/:path*',
        destination: '/api/status',
        permanent: false,
      },
    ];
  },
  
  // Configuration pour Netlify
  trailingSlash: process.env.NETLIFY === 'true',
  
  // Headers de sécurité
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig 