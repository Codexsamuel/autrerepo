#!/usr/bin/env node

/**
 * Script de génération des favicons pour DL Solutions
 * Génère les différentes tailles de favicon à partir du SVG circulaire
 */

const fs = require('fs');
const path = require('path');

// Configuration des tailles de favicon
const FAVICON_SIZES = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' }
];

// Contenu du manifeste PWA
const WEB_MANIFEST = {
  name: 'DL Solutions - Davy & Lucie Solutions',
  short_name: 'DL Solutions',
  description: 'Écosystème digital complet par Davy et Lucie',
  start_url: '/',
  display: 'standalone',
  background_color: '#1e40af',
  theme_color: '#2563eb',
  icons: [
    {
      src: '/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png'
    },
    {
      src: '/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png'
    }
  ]
};

// Contenu du fichier browserconfig.xml pour Windows
const BROWSER_CONFIG = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
            <square150x150logo src="/mstile-150x150.png"/>
            <TileColor>#2563eb</TileColor>
        </tile>
    </msapplication>
</browserconfig>`;

console.log('🎨 Génération des favicons pour DL Solutions...');

// Créer le manifeste PWA
try {
  fs.writeFileSync(
    path.join(__dirname, '../public/site.webmanifest'),
    JSON.stringify(WEB_MANIFEST, null, 2)
  );
  console.log('✅ Manifeste PWA généré: /public/site.webmanifest');
} catch (error) {
  console.error('❌ Erreur lors de la génération du manifeste:', error.message);
}

// Créer le fichier browserconfig.xml
try {
  fs.writeFileSync(
    path.join(__dirname, '../public/browserconfig.xml'),
    BROWSER_CONFIG
  );
  console.log('✅ Browser config généré: /public/browserconfig.xml');
} catch (error) {
  console.error('❌ Erreur lors de la génération du browser config:', error.message);
}

// Vérifier que le favicon SVG existe
const svgPath = path.join(__dirname, '../public/favicon-circular.svg');
if (!fs.existsSync(svgPath)) {
  console.error('❌ Le fichier favicon-circular.svg n\'existe pas');
  process.exit(1);
}

console.log('📋 Instructions pour générer les PNG:');
console.log('');
console.log('1. Ouvrez le fichier /public/favicon-circular.svg dans un navigateur');
console.log('2. Utilisez un outil en ligne pour convertir le SVG en PNG:');
console.log('   - https://convertio.co/svg-png/');
console.log('   - https://cloudconvert.com/svg-to-png');
console.log('');
console.log('3. Générez les tailles suivantes:');
FAVICON_SIZES.forEach(({ size, name }) => {
  console.log(`   - ${name} (${size}x${size}px)`);
});
console.log('');
console.log('4. Placez les fichiers PNG dans le dossier /public/');
console.log('');
console.log('🎯 Le logo circulaire sera visible dans:');
console.log('   - Onglets de navigateur');
console.log('   - Favoris');
console.log('   - Résultats de recherche Google');
console.log('   - Applications mobiles (PWA)');
console.log('   - Réseaux sociaux');
console.log('');
console.log('✨ Optimisation SEO complète pour DL Solutions!'); 