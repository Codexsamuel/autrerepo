#!/usr/bin/env node

import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Configuration Google AdSense pour DL Solutions\n');

// Instructions pour trouver l'ID AdSense
console.log('📋 Étapes pour trouver ton ID AdSense :');
console.log('1. Va sur https://www.google.com/adsense');
console.log('2. Connecte-toi avec ton compte fastsafe2025@gmail.com');
console.log('3. Clique sur "Sites" dans le menu');
console.log('4. Trouve daveandlucesolutions.com');
console.log('5. Clique sur "Obtenir le code"');
console.log('6. Copie l\'ID qui ressemble à : ca-pub-1234567890123456\n');

// Demander l'ID AdSense
import readline from 'readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('🔑 Entre ton ID AdSense (ca-pub-XXXXXXXXXXXXXXX) : ', (clientId) => {
  if (!clientId || !clientId.startsWith('ca-pub-')) {
    console.log('❌ ID AdSense invalide. Il doit commencer par "ca-pub-"');
    rl.close();
    return;
  }

  // Mettre à jour le fichier de configuration
  const configPath = path.join(__dirname, '..', 'config', 'adsense.ts');
  
  try {
    let configContent = fs.readFileSync(configPath, 'utf8');
    
    // Remplacer l'ID client
    configContent = configContent.replace(
      /CLIENT_ID: 'ca-pub-XXXXXXXXXXXXXXX'/,
      `CLIENT_ID: '${clientId}'`
    );
    
    fs.writeFileSync(configPath, configContent);
    
    console.log('✅ Configuration AdSense mise à jour !');
    console.log(`📝 ID client configuré : ${clientId}`);
    console.log('\n🎯 Prochaines étapes :');
    console.log('1. Redémarre ton serveur de développement');
    console.log('2. Vérifie que les pubs s\'affichent sur ton site');
    console.log('3. Déploie sur Vercel pour tester en production');
    console.log('4. Surveille tes revenus dans Google AdSense\n');
    
    console.log('💡 Conseils :');
    console.log('- Les pubs peuvent prendre 24-48h à apparaître');
    console.log('- Utilise le mode test pour vérifier l\'intégration');
    console.log('- Respecte les politiques AdSense pour éviter les suspensions');
    
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour :', error.message);
  }
  
  rl.close();
}); 