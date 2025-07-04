#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧪 Test d\'intégration Google AdSense\n');

// Vérifier la configuration
const configPath = path.join(__dirname, '..', 'config', 'adsense.ts');
const layoutPath = path.join(__dirname, '..', 'app', 'layout.tsx');

try {
  // Vérifier le fichier de configuration
  const configContent = fs.readFileSync(configPath, 'utf8');
  
  if (configContent.includes('ca-pub-XXXXXXXXXXXXXXX')) {
    console.log('❌ ID AdSense non configuré');
    console.log('💡 Exécute : node scripts/setup-adsense.js');
    process.exit(1);
  }
  
  // Extraire l'ID client
  const clientIdMatch = configContent.match(/CLIENT_ID: '([^']+)'/);
  if (clientIdMatch) {
    console.log(`✅ ID AdSense configuré : ${clientIdMatch[1]}`);
  }
  
  // Vérifier l'intégration dans le layout
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');
  
  if (layoutContent.includes('GoogleAutoAds')) {
    console.log('✅ Auto Ads intégrées dans le layout');
  } else {
    console.log('❌ Auto Ads non intégrées dans le layout');
  }
  
  if (layoutContent.includes('import GoogleAutoAds')) {
    console.log('✅ Import GoogleAutoAds présent');
  } else {
    console.log('❌ Import GoogleAutoAds manquant');
  }
  
  // Vérifier les composants
  const components = [
    'components/ads/GoogleAutoAds.tsx',
    'components/ads/ContentAds.tsx'
  ];
  
  console.log('\n📁 Vérification des composants :');
  components.forEach(component => {
    const componentPath = path.join(__dirname, '..', component);
    if (fs.existsSync(componentPath)) {
      console.log(`✅ ${component}`);
    } else {
      console.log(`❌ ${component} manquant`);
    }
  });
  
  // Vérifier l'exemple d'utilisation
  const servicesPath = path.join(__dirname, '..', 'app', 'services', 'page.tsx');
  if (fs.existsSync(servicesPath)) {
    const servicesContent = fs.readFileSync(servicesPath, 'utf8');
    if (servicesContent.includes('ContentAd')) {
      console.log('✅ Exemple d\'utilisation dans services/page.tsx');
    } else {
      console.log('❌ Pas d\'exemple d\'utilisation trouvé');
    }
  }
  
  console.log('\n🎯 Prochaines étapes :');
  console.log('1. Redémarre ton serveur : pnpm dev');
  console.log('2. Ouvre http://localhost:3000');
  console.log('3. Vérifie la console du navigateur');
  console.log('4. Cherche les éléments avec classe "adsbygoogle"');
  console.log('5. Déploie sur Vercel pour tester en production');
  
  console.log('\n💡 Conseils de test :');
  console.log('- Utilise les outils de développement du navigateur');
  console.log('- Vérifie l\'onglet Network pour les requêtes AdSense');
  console.log('- Teste sur mobile et desktop');
  console.log('- Vérifie que les pubs ne cassent pas le design');
  
} catch (error) {
  console.error('❌ Erreur lors du test :', error.message);
  process.exit(1);
} 