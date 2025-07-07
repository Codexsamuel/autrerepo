const fs = require('fs');
const path = require('path');

// Configuration des icônes à générer
const iconSizes = [16, 32, 48, 72, 96, 128, 144, 152, 192, 384, 512];

// SVG template pour DL Solutions
const svgTemplate = `
<svg width="{size}" height="{size}" viewBox="0 0 {size} {size}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background circle -->
  <circle cx="{center}" cy="{center}" r="{radius}" fill="url(#grad1)"/>
  
  <!-- DL Letters -->
  <text x="{center}" y="{textY}" font-family="Arial, sans-serif" font-size="{fontSize}" font-weight="bold" text-anchor="middle" fill="white">DL</text>
  
  <!-- Digital elements -->
  <circle cx="{small}" cy="{small}" r="{dotSize}" fill="white" opacity="0.8"/>
  <circle cx="{large}" cy="{small}" r="{dotSize}" fill="white" opacity="0.6"/>
  <circle cx="{small}" cy="{large}" r="{dotSize}" fill="white" opacity="0.6"/>
  <circle cx="{large}" cy="{large}" r="{dotSize}" fill="white" opacity="0.8"/>
</svg>
`;

function generateSVG(size) {
  const center = size / 2;
  const radius = size / 2;
  const small = size * 0.25;
  const large = size * 0.75;
  const fontSize = Math.max(8, size * 0.4);
  const textY = center + fontSize * 0.3;
  const dotSize = Math.max(1, size * 0.03);
  
  return svgTemplate
    .replace(/{size}/g, size)
    .replace(/{center}/g, center)
    .replace(/{radius}/g, radius)
    .replace(/{small}/g, small)
    .replace(/{large}/g, large)
    .replace(/{fontSize}/g, fontSize)
    .replace(/{textY}/g, textY)
    .replace(/{dotSize}/g, dotSize);
}

// Générer les icônes SVG
function generateIcons() {
  console.log('🎨 Génération des icônes DL Solutions...');
  
  // Créer le dossier images s'il n'existe pas
  const imagesDir = path.join(__dirname, '../public/images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  
  // Générer les icônes SVG
  iconSizes.forEach(size => {
    const svg = generateSVG(size);
    const filename = `icon-${size}x${size}.svg`;
    const filepath = path.join(imagesDir, filename);
    
    fs.writeFileSync(filepath, svg);
    console.log(`✅ Généré: ${filename}`);
  });
  
  // Créer un favicon.ico basique (SVG)
  const faviconSvg = generateSVG(32);
  fs.writeFileSync(path.join(__dirname, '../public/favicon.svg'), faviconSvg);
  console.log('✅ Généré: favicon.svg');
  
  // Créer apple-touch-icon.svg
  const appleIconSvg = generateSVG(180);
  fs.writeFileSync(path.join(__dirname, '../public/apple-touch-icon.svg'), appleIconSvg);
  console.log('✅ Généré: apple-touch-icon.svg');
  
  console.log('🎉 Toutes les icônes ont été générées avec succès!');
}

// Exécuter la génération
generateIcons(); 