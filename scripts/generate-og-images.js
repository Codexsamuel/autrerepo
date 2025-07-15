#!/usr/bin/env node

/**
 * Script de génération automatique des images Open Graph pour DL Solutions
 * Génère des images optimisées pour le référencement de toutes les pages
 */

const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage, registerFont } = require('canvas');

// Configuration des polices
registerFont(path.join(__dirname, '../public/fonts/Inter-Bold.ttf'), { family: 'Inter', weight: 'bold' });
registerFont(path.join(__dirname, '../public/fonts/Inter-Regular.ttf'), { family: 'Inter', weight: 'normal' });

// Configuration des pages et leurs images OG
const pages = [
  {
    key: 'home',
    title: 'DL Solutions - Écosystème Digital Complet',
    subtitle: 'Davy & Lucie Solutions',
    description: 'Solutions digitales innovantes au Cameroun',
    filename: 'og-home.jpg'
  },
  {
    key: 'dl-style',
    title: 'DL Style - Boutique Premium',
    subtitle: 'E-commerce & Mode',
    description: 'Livraison gratuite • Garantie 2 ans',
    filename: 'dl-style-og.jpg'
  },
  {
    key: 'novaworld',
    title: 'NovaWorld - Réseau Social',
    subtitle: 'Professionnel & Business',
    description: 'Networking • Collaboration • Emplois',
    filename: 'novaworld-og.jpg'
  },
  {
    key: 'novacore',
    title: 'NovaCore - Plateforme Intégrée',
    subtitle: 'CRM • ERP • E-commerce',
    description: 'Écosystème digital unifié',
    filename: 'novacore-og.jpg'
  },
  {
    key: 'formations',
    title: 'Formations Professionnelles',
    subtitle: 'Certifiantes & Expertisées',
    description: 'Marketing • IA • E-commerce • CRM',
    filename: 'formations-og.jpg'
  },
  {
    key: 'services',
    title: 'Services Digitales',
    subtitle: 'Développement & Conseil',
    description: 'Web • Mobile • IA • Marketing',
    filename: 'services-og.jpg'
  },
  {
    key: 'trading',
    title: 'Trading & Investissement',
    subtitle: 'Marchés Financiers',
    description: 'Crypto • Forex • Analytics',
    filename: 'trading-og.jpg'
  },
  {
    key: 'advanced-intelligence',
    title: 'Intelligence Artificielle',
    subtitle: 'OSINT & Analytics',
    description: 'Analyse prédictive • Automatisation',
    filename: 'ai-og.jpg'
  },
  {
    key: 'ultra-ai',
    title: 'Ultra AI - IA Avancée',
    subtitle: 'NLP • Vision • Deep Learning',
    description: 'Intelligence artificielle de pointe',
    filename: 'ultra-ai-og.jpg'
  },
  {
    key: 'quantum-intelligence',
    title: 'Quantum Intelligence',
    subtitle: 'Technologies Quantiques',
    description: 'IA quantique • Innovation',
    filename: 'quantum-og.jpg'
  },
  {
    key: 'metaverse-blockchain',
    title: 'Metaverse & Blockchain',
    subtitle: 'Web3 • NFT • VR',
    description: 'Technologies du futur',
    filename: 'metaverse-og.jpg'
  },
  {
    key: 'contact',
    title: 'Contact DL Solutions',
    subtitle: 'Yaoundé, Cameroun',
    description: 'Davy & Lucie • +237-694-341-586',
    filename: 'contact-og.jpg'
  },
  {
    key: 'a-propos',
    title: 'À Propos - DL Solutions',
    subtitle: 'Notre Histoire',
    description: 'Fondateurs : Davy & Lucie',
    filename: 'about-og.jpg'
  }
];

// Configuration des formations
const formations = [
  {
    key: 'marketing-digital',
    title: 'Marketing Digital',
    subtitle: 'Formation Certifiante',
    description: 'SEO • Réseaux sociaux • Google Ads',
    filename: 'formations/marketing-digital.jpg'
  },
  {
    key: 'ia-entreprises',
    title: 'IA & Intelligence Artificielle',
    subtitle: 'Formation Expertisée',
    description: 'Machine Learning • Chatbots • RPA',
    filename: 'formations/ia-entreprises.jpg'
  },
  {
    key: 'creation-visuelle',
    title: 'Création Visuelle & Design',
    subtitle: 'Formation Créative',
    description: 'Adobe • UI/UX • Marketing visuel',
    filename: 'formations/creation-visuelle.jpg'
  },
  {
    key: 'sav-excellence',
    title: 'SAV Excellence',
    subtitle: 'Service Client Premium',
    description: 'Fidélisation • Réclamations',
    filename: 'formations/sav-excellence.jpg'
  }
];

// Fonction pour créer une image OG
async function createOGImage(page, outputPath) {
  const width = 1200;
  const height = 630;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fond dégradé
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#1e40af'); // Bleu DL Solutions
  gradient.addColorStop(0.5, '#7c3aed'); // Violet
  gradient.addColorStop(1, '#059669'); // Vert
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Motif de fond subtil
  ctx.globalAlpha = 0.1;
  for (let i = 0; i < 50; i++) {
    ctx.beginPath();
    ctx.arc(
      Math.random() * width,
      Math.random() * height,
      Math.random() * 100 + 50,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Logo DL Solutions (simulé)
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px Inter';
  ctx.textAlign = 'left';
  ctx.fillText('DL', 60, 120);
  ctx.fillText('Solutions', 60, 180);

  // Titre principal
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 64px Inter';
  ctx.textAlign = 'left';
  ctx.fillText(page.title, 60, 280);

  // Sous-titre
  ctx.fillStyle = '#e5e7eb';
  ctx.font = 'bold 32px Inter';
  ctx.fillText(page.subtitle, 60, 330);

  // Description
  ctx.fillStyle = '#d1d5db';
  ctx.font = 'normal 24px Inter';
  ctx.fillText(page.description, 60, 380);

  // Informations de contact
  ctx.fillStyle = '#9ca3af';
  ctx.font = 'normal 20px Inter';
  ctx.fillText('Davy & Lucie • Yaoundé, Cameroun', 60, 550);
  ctx.fillText('contact@dlsolutions.com • +237-694-341-586', 60, 580);

  // Éléments décoratifs
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.3;
  ctx.beginPath();
  ctx.moveTo(width - 200, 100);
  ctx.lineTo(width - 100, 200);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(width - 150, 300);
  ctx.lineTo(width - 50, 400);
  ctx.stroke();

  // Sauvegarder l'image
  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.9 });
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ Image générée : ${outputPath}`);
}

// Fonction principale
async function generateAllOGImages() {
  console.log('🚀 Génération des images Open Graph pour DL Solutions...\n');

  // Créer le dossier images s'il n'existe pas
  const imagesDir = path.join(__dirname, '../public/images');
  const formationsDir = path.join(imagesDir, 'formations');
  
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  if (!fs.existsSync(formationsDir)) {
    fs.mkdirSync(formationsDir, { recursive: true });
  }

  // Générer les images pour les pages principales
  console.log('📄 Pages principales :');
  for (const page of pages) {
    const outputPath = path.join(imagesDir, page.filename);
    await createOGImage(page, outputPath);
  }

  // Générer les images pour les formations
  console.log('\n🎓 Formations :');
  for (const formation of formations) {
    const outputPath = path.join(imagesDir, formation.filename);
    await createOGImage(formation, outputPath);
  }

  console.log('\n🎉 Génération terminée !');
  console.log(`📁 Images sauvegardées dans : ${imagesDir}`);
  console.log('\n📋 Images générées :');
  
  const allImages = [...pages, ...formations];
  allImages.forEach(img => {
    console.log(`  • ${img.filename} - ${img.title}`);
  });
}

// Exécuter le script
if (require.main === module) {
  generateAllOGImages().catch(console.error);
}

module.exports = { createOGImage, generateAllOGImages }; 