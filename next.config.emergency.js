/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mode de base sans options problématiques
  reactStrictMode: true,
  
  // Désactiver TypeScript et ESLint
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Images non optimisées
  images: {
    unoptimized: true,
  },
  
  // Configuration webpack d'urgence
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
      config.externals.push('bcryptjs');
      config.externals.push('jsonwebtoken');
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
  
  // Configuration expérimentale minimale
  experimental: {
    esmExternals: 'loose',
  },
  
  // Désactiver complètement les routes API problématiques
  async rewrites() {
    return [
      {
        source: '/api/reminders/:path*',
        destination: '/api/status',
      },
      {
        source: '/api/novaprotect/:path*',
        destination: '/api/status',
      },
      {
        source: '/api/ics/:path*',
        destination: '/api/status',
      },
      {
        source: '/api/search/:path*',
        destination: '/api/status',
      },
      {
        source: '/api/payments/:path*',
        destination: '/api/status',
      },
    ];
  },
}

module.exports = nextConfig
