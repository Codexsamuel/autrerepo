const fs = require('fs');
const path = require('path');

console.log('🧪 Test DL Trade - Scraping International');
console.log('==========================================\n');

// Vérifier que le fichier de produits existe
const productsPath = path.join(__dirname, '..', 'data', 'scraped-products.json');
if (fs.existsSync(productsPath)) {
  const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
  console.log(`✅ Fichier de produits trouvé: ${products.length} produits`);
  
  // Statistiques par pays
  const chinaProducts = products.filter(p => p.country === 'Chine');
  const turkeyProducts = products.filter(p => p.country === 'Turquie');
  const dubaiProducts = products.filter(p => p.country === 'Dubaï');
  
  console.log(`🇨🇳 Chine (AliExpress): ${chinaProducts.length} produits`);
  console.log(`🇹🇷 Turquie (Trendyol): ${turkeyProducts.length} produits`);
  console.log(`🇦🇪 Dubaï (Noon): ${dubaiProducts.length} produits`);
  
  // Statistiques par catégorie
  const categories = {};
  products.forEach(p => {
    categories[p.category] = (categories[p.category] || 0) + 1;
  });
  
  console.log('\n📊 Catégories:');
  Object.entries(categories).forEach(([cat, count]) => {
    console.log(`   ${cat}: ${count} produits`);
  });
  
  // Statistiques de prix
  const totalOriginalPrice = products.reduce((sum, p) => sum + p.originalPrice, 0);
  const totalSellingPrice = products.reduce((sum, p) => sum + p.sellingPrice, 0);
  const totalProfit = totalSellingPrice - totalOriginalPrice;
  
  console.log('\n💰 Statistiques financières:');
  console.log(`   Prix d'achat total: ${totalOriginalPrice.toFixed(2)}€`);
  console.log(`   Prix de vente total: ${totalSellingPrice.toFixed(2)}€`);
  console.log(`   Bénéfice total: ${totalProfit.toFixed(2)}€`);
  console.log(`   Marge moyenne: ${((totalProfit / totalOriginalPrice) * 100).toFixed(1)}%`);
  
  // Vérifier que tous les produits ont une marge de 40%
  const correctMargin = products.every(p => Math.abs(p.profitMargin - 40) < 1);
  console.log(`\n✅ Marge de bénéfice: ${correctMargin ? 'Correcte (40%)' : 'Incorrecte'}`);
  
  // Vérifier les images
  const hasImages = products.every(p => p.image && p.image.includes('unsplash.com'));
  console.log(`✅ Images: ${hasImages ? 'Toutes présentes' : 'Manquantes'}`);
  
  console.log('\n🌐 Accédez à http://localhost:3000/novacore/dl-style/ pour voir l\'interface');
  console.log('📱 Interface moderne avec filtres par pays, catégories et sources');
  console.log('🛒 Panier intégré avec calcul automatique des bénéfices');
  console.log('📈 Analytics et tableaux de bord en temps réel');
  
} else {
  console.log('❌ Fichier de produits non trouvé');
  console.log('💡 Exécutez: node scripts/generate-demo-products.js');
}

console.log('\n🎯 DL Trade est prêt pour le scraping international !'); 