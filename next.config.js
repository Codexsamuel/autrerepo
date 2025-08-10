/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration de base minimale
  reactStrictMode: true,
  
  // Désactiver complètement TypeScript et ESLint pendant le build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Configuration des images basique
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig; 