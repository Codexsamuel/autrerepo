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
