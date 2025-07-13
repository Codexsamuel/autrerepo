#!/usr/bin/env ts-node

const { scrapeAllIndustrialMarkets, saveScrapedProducts, updateMainCatalog } = require('../lib/scraper/industrial-tech-scraper');

async function main() {
  console.log('🚀 Starting industrial products scraping...');
  
  try {
    // Scraper tous les marchés
    console.log('📊 Scraping industrial markets...');
    const products = await scrapeAllIndustrialMarkets();
    
    console.log(`✅ Scraped ${products.length} industrial products`);
    
    // Sauvegarder les produits scrapés
    console.log('💾 Saving scraped products...');
    await saveScrapedProducts(products);
    
    // Mettre à jour le catalogue principal
    console.log('🔄 Updating main catalog...');
    await updateMainCatalog(products);
    
    console.log('🎉 Industrial products scraping completed successfully!');
    
    // Afficher un résumé
    const categories = [...new Set(products.map((p: any) => p.category))];
    const origins = [...new Set(products.map((p: any) => p.origin))];
    
    console.log('\n📈 Summary:');
    console.log(`- Total products: ${products.length}`);
    console.log(`- Categories: ${categories.join(', ')}`);
    console.log(`- Origins: ${origins.join(', ')}`);
    console.log(`- Average price: $${(products.reduce((sum: number, p: any) => sum + p.price, 0) / products.length).toFixed(2)}`);
    
  } catch (error) {
    console.error('❌ Error during scraping:', error);
    process.exit(1);
  }
}

// Exécuter le script
if (require.main === module) {
  main();
}

module.exports = { main };
