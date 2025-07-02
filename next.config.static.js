/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration pour export statique
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: [
      'images.unsplash.com',
      'via.placeholder.com',
      'localhost',
      'res.cloudinary.com'
    ],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Optimisations pour le build
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // Exclure les routes API pour l'export statique
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig 