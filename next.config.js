/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
}

module.exports = nextConfig 