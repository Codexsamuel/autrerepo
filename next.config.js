/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration pour Vercel (avec API routes)
  experimental: {
    appDir: true,
  },
  // Images optimisées pour Vercel
  images: {
    domains: [
      'images.unsplash.com',
      'via.placeholder.com',
      'localhost',
      'res.cloudinary.com'
    ],
  },
  // Variables d'environnement
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Optimisations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // Pas d'export statique pour Vercel (API routes)
  // output: 'export' - COMMENTÉ pour Vercel
};

module.exports = nextConfig; 