#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration SEO
const seoConfig = {
  siteName: 'DL Solutions',
  baseUrl: 'https://dlsolutions.com',
  targetKeywords: [
    'DL Solutions', 'CRM Cameroun', 'ERP Cameroun', 'boutique internationale',
    'formations professionnelles', 'solutions bancaires', 'assurance Cameroun',
    'immobilier Cameroun', 'santé Cameroun', 'hôtellerie Cameroun',
    'livraison Cameroun', 'école de police', 'bureaux Cameroun'
  ],
  requiredMetaTags: [
    'title', 'description', 'keywords', 'author', 'robots',
    'og:title', 'og:description', 'og:image', 'og:url',
    'twitter:card', 'twitter:title', 'twitter:description'
  ],
  requiredStructuredData: [
    'Organization', 'LocalBusiness', 'WebSite'
  ]
};

function checkFileExists(filePath) {
  return fs.existsSync(filePath);
}

function analyzeSEOScore() {
  console.log('🔍 AUDIT SEO COMPLET - DL Solutions\n');
  
  let score = 0;
  let maxScore = 100;
  let issues = [];
  let recommendations = [];

  // 1. Vérification des fichiers SEO essentiels
  console.log('📁 VÉRIFICATION DES FICHIERS SEO ESSENTIELS');
  
  const essentialFiles = [
    { path: 'app/layout.tsx', name: 'Layout avec métadonnées', weight: 15 },
    { path: 'app/sitemap.ts', name: 'Sitemap dynamique', weight: 10 },
    { path: 'app/robots.ts', name: 'Robots.txt', weight: 5 },
    { path: 'public/manifest.json', name: 'Manifest PWA', weight: 8 },
    { path: 'public/favicon.ico', name: 'Favicon', weight: 3 },
    { path: 'public/robots.txt', name: 'Robots.txt statique', weight: 2 }
  ];

  essentialFiles.forEach(file => {
    if (checkFileExists(file.path)) {
      console.log(`✅ ${file.name} - ${file.weight} points`);
      score += file.weight;
    } else {
      console.log(`❌ ${file.name} MANQUANT - 0 point`);
      issues.push(`Fichier manquant: ${file.path}`);
    }
  });

  // 2. Vérification des métadonnées dans layout.tsx
  console.log('\n📋 ANALYSE DES MÉTADONNÉES');
  
  if (checkFileExists('app/layout.tsx')) {
    const layoutContent = fs.readFileSync('app/layout.tsx', 'utf8');
    
    // Vérification des métadonnées essentielles
    const metaChecks = [
      { pattern: /title.*default.*DL Solutions/, name: 'Titre principal', weight: 5 },
      { pattern: /description.*CRM.*ERP/, name: 'Description complète', weight: 5 },
      { pattern: /keywords.*\[/, name: 'Mots-clés définis', weight: 3 },
      { pattern: /openGraph.*\{/, name: 'Open Graph configuré', weight: 4 },
      { pattern: /twitter.*\{/, name: 'Twitter Cards configuré', weight: 3 },
      { pattern: /robots.*\{/, name: 'Directives robots', weight: 3 },
      { pattern: /application\/ld\+json/, name: 'Structured Data', weight: 8 },
      { pattern: /canonical/, name: 'URLs canoniques', weight: 3 },
      { pattern: /alternates.*languages/, name: 'Support multilingue', weight: 4 },
      { pattern: /preconnect.*fonts/, name: 'Optimisation performance', weight: 2 }
    ];

    metaChecks.forEach(check => {
      if (check.pattern.test(layoutContent)) {
        console.log(`✅ ${check.name} - ${check.weight} points`);
        score += check.weight;
      } else {
        console.log(`❌ ${check.name} MANQUANT - 0 point`);
        issues.push(`Métadonnée manquante: ${check.name}`);
      }
    });
  }

  // 3. Vérification du sitemap
  console.log('\n🗺️ ANALYSE DU SITEMAP');
  
  if (checkFileExists('app/sitemap.ts')) {
    const sitemapContent = fs.readFileSync('app/sitemap.ts', 'utf8');
    
    const sitemapChecks = [
      { pattern: /baseUrl.*dlsolutions\.com/, name: 'URL de base correcte', weight: 3 },
      { pattern: /changeFrequency.*daily/, name: 'Fréquence de mise à jour', weight: 2 },
      { pattern: /priority.*[0-9]/, name: 'Priorités définies', weight: 2 },
      { pattern: /lastModified.*new Date/, name: 'Dates de modification', weight: 2 },
      { pattern: /solutions.*formations.*novacore/, name: 'Pages principales incluses', weight: 5 }
    ];

    sitemapChecks.forEach(check => {
      if (check.pattern.test(sitemapContent)) {
        console.log(`✅ ${check.name} - ${check.weight} points`);
        score += check.weight;
      } else {
        console.log(`❌ ${check.name} MANQUANT - 0 point`);
        issues.push(`Sitemap incomplet: ${check.name}`);
      }
    });
  }

  // 4. Vérification du manifest PWA
  console.log('\n📱 ANALYSE DU MANIFEST PWA');
  
  if (checkFileExists('public/manifest.json')) {
    const manifestContent = fs.readFileSync('public/manifest.json', 'utf8');
    
    const manifestChecks = [
      { pattern: /"name".*"DL Solutions"/, name: 'Nom de l\'application', weight: 2 },
      { pattern: /"short_name".*"DL Solutions"/, name: 'Nom court', weight: 2 },
      { pattern: /"description".*CRM/, name: 'Description PWA', weight: 2 },
      { pattern: /"start_url".*"/, name: 'URL de démarrage', weight: 2 },
      { pattern: /"display".*"standalone"/, name: 'Mode d\'affichage', weight: 2 },
      { pattern: /"icons".*\[/, name: 'Icônes PWA', weight: 3 },
      { pattern: /"theme_color"/, name: 'Couleur du thème', weight: 2 },
      { pattern: /"background_color"/, name: 'Couleur de fond', weight: 2 }
    ];

    manifestChecks.forEach(check => {
      if (check.pattern.test(manifestContent)) {
        console.log(`✅ ${check.name} - ${check.weight} points`);
        score += check.weight;
      } else {
        console.log(`❌ ${check.name} MANQUANT - 0 point`);
        issues.push(`Manifest incomplet: ${check.name}`);
      }
    });
  }

  // 5. Vérification des images SEO
  console.log('\n🖼️ VÉRIFICATION DES IMAGES SEO');
  
  const requiredImages = [
    'public/favicon.ico',
    'public/apple-touch-icon.png',
    'public/images/og-dl-solutions.jpg',
    'public/images/twitter-dl-solutions.jpg'
  ];

  requiredImages.forEach(imagePath => {
    if (checkFileExists(imagePath)) {
      console.log(`✅ ${path.basename(imagePath)} présent`);
      score += 1;
    } else {
      console.log(`❌ ${path.basename(imagePath)} MANQUANT`);
      issues.push(`Image SEO manquante: ${imagePath}`);
    }
  });

  // 6. Recommandations d'amélioration
  console.log('\n💡 RECOMMANDATIONS D\'AMÉLIORATION');
  
  if (score < 80) {
    recommendations.push('🔧 Optimiser les métadonnées manquantes');
  }
  if (score < 90) {
    recommendations.push('📈 Ajouter plus de structured data');
  }
  if (score < 95) {
    recommendations.push('🚀 Implémenter le service worker pour PWA');
  }
  
  recommendations.push('🌍 Ajouter le support hreflang pour l\'internationalisation');
  recommendations.push('📊 Configurer Google Analytics et Search Console');
  recommendations.push('🔍 Optimiser les URLs pour les mots-clés cibles');
  recommendations.push('📱 Améliorer l\'optimisation mobile');

  // 7. Score final
  const percentage = Math.round((score / maxScore) * 100);
  
  console.log('\n📊 SCORE SEO FINAL');
  console.log(`Score: ${score}/${maxScore} (${percentage}%)`);
  
  if (percentage >= 90) {
    console.log('🎉 EXCELLENT - SEO très bien optimisé !');
  } else if (percentage >= 80) {
    console.log('✅ BON - SEO bien optimisé avec quelques améliorations possibles');
  } else if (percentage >= 70) {
    console.log('⚠️ MOYEN - SEO correct mais nécessite des améliorations');
  } else {
    console.log('❌ FAIBLE - SEO nécessite une optimisation importante');
  }

  // 8. Problèmes identifiés
  if (issues.length > 0) {
    console.log('\n🚨 PROBLÈMES IDENTIFIÉS:');
    issues.forEach(issue => console.log(`- ${issue}`));
  }

  // 9. Actions recommandées
  if (recommendations.length > 0) {
    console.log('\n📋 ACTIONS RECOMMANDÉES:');
    recommendations.forEach(rec => console.log(`- ${rec}`));
  }

  return { score, percentage, issues, recommendations };
}

// Exécution
if (require.main === module) {
  analyzeSEOScore();
}

module.exports = { analyzeSEOScore, seoConfig }; 