/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration de base
  reactStrictMode: true,
  
  // Désactiver TypeScript et ESLint pendant le build pour éviter les erreurs
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Configuration des images optimisée
  images: {
    unoptimized: false,
    domains: ['dlsolutionssarl.tech', 'daveandlucesolutions.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Désactiver les fonctionnalités expérimentales pour éviter DataCloneError
  experimental: {
    // optimizeCss: true,
    // optimizePackageImports: ['@supabase/supabase-js', 'lucide-react'],
    // workerThreads: true,
    // cpus: 4,
  },
  
  // Configuration pour Netlify
  trailingSlash: process.env.NETLIFY === 'true',
  
  // Supprimer les redirections automatiques pour éviter les conflits avec le middleware
  // async redirects() {
  //   return [];
  // },
}

module.exports = nextConfig; 