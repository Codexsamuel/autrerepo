const fs = require('fs');
const path = require('path');

// Produits supplémentaires à ajouter
const ADDITIONAL_PRODUCTS = [
  // Plus de produits Chine
  {
    id: "ali_006",
    name: "Caméra de Surveillance WiFi - Vision Nocturne",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    originalPrice: 45.99,
    sellingPrice: 64.39,
    currency: "€",
    category: "Sécurité",
    brand: "Generic",
    rating: 4.4,
    reviews: 2345,
    sales: 12345,
    stock: 300,
    shipping: "Gratuit",
    delivery: "15-25 jours",
    source: "AliExpress",
    country: "Chine",
    scrapedAt: new Date().toISOString(),
    features: ["1080p HD", "Vision nocturne", "Détection de mouvement", "2-way audio"],
    description: "Caméra de surveillance WiFi avec vision nocturne et détection de mouvement",
    url: "https://www.aliexpress.com/item/security-camera",
    profitMargin: 40
  },
  {
    id: "ali_007",
    name: "Robot Aspirateur - Navigation Intelligente",
    image: "https://images.unsplash.com/photo-1586170323826-22c6383f4cd6?w=400&h=400&fit=crop",
    originalPrice: 89.99,
    sellingPrice: 125.99,
    currency: "€",
    category: "Maison",
    brand: "Generic",
    rating: 4.3,
    reviews: 3456,
    sales: 8901,
    stock: 150,
    shipping: "Gratuit",
    delivery: "20-30 jours",
    source: "AliExpress",
    country: "Chine",
    scrapedAt: new Date().toISOString(),
    features: ["Navigation intelligente", "120min autonomie", "App contrôle", "Auto-charging"],
    description: "Robot aspirateur avec navigation intelligente et contrôle via application",
    url: "https://www.aliexpress.com/item/robot-vacuum",
    profitMargin: 40
  },

  // Plus de produits Turquie
  {
    id: "trendyol_006",
    name: "Costume Homme - Style Business Premium",
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&h=400&fit=crop",
    originalPrice: 89.99,
    sellingPrice: 125.99,
    currency: "€",
    category: "Mode",
    brand: "Trendyol",
    rating: 4.5,
    reviews: 1234,
    sales: 3456,
    stock: 100,
    shipping: "Gratuit",
    delivery: "7-12 jours",
    source: "Trendyol",
    country: "Turquie",
    scrapedAt: new Date().toISOString(),
    features: ["100% Laine", "Style Business", "Taille S-XXL", "Lavable"],
    description: "Costume homme style business premium en laine naturelle",
    url: "https://www.trendyol.com/business-suit",
    profitMargin: 40
  },
  {
    id: "trendyol_007",
    name: "Montre Connectée - Fitness & Santé",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    originalPrice: 67.99,
    sellingPrice: 95.19,
    currency: "€",
    category: "Électronique",
    brand: "Trendyol",
    rating: 4.2,
    reviews: 2345,
    sales: 5678,
    stock: 200,
    shipping: "4.99€",
    delivery: "8-15 jours",
    source: "Trendyol",
    country: "Turquie",
    scrapedAt: new Date().toISOString(),
    features: ["Écran AMOLED", "GPS intégré", "Monitoring cardiaque", "7 jours autonomie"],
    description: "Montre connectée avec monitoring de santé et GPS intégré",
    url: "https://www.trendyol.com/smartwatch-fitness",
    profitMargin: 40
  },

  // Plus de produits Dubaï
  {
    id: "noon_006",
    name: "iPad Pro 12.9 pouces - M2 Chip",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    originalPrice: 899.99,
    sellingPrice: 1259.99,
    currency: "€",
    category: "Électronique",
    brand: "Apple",
    rating: 4.9,
    reviews: 567,
    sales: 1234,
    stock: 25,
    shipping: "Gratuit",
    delivery: "2-3 jours",
    source: "Noon",
    country: "Dubaï",
    scrapedAt: new Date().toISOString(),
    features: ["M2 Chip", "12.9\" Retina", "Face ID", "Apple Pencil compatible"],
    description: "iPad Pro 12.9 pouces avec puce M2 et écran Retina",
    url: "https://www.noon.com/ipad-pro-12-9",
    profitMargin: 40
  },
  {
    id: "noon_007",
    name: "MacBook Air M2 - 13.6\"",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    originalPrice: 1299.99,
    sellingPrice: 1819.99,
    currency: "€",
    category: "Informatique",
    brand: "Apple",
    rating: 4.8,
    reviews: 345,
    sales: 789,
    stock: 15,
    shipping: "Gratuit",
    delivery: "3-5 jours",
    source: "Noon",
    country: "Dubaï",
    scrapedAt: new Date().toISOString(),
    features: ["M2 Chip", "13.6\" Liquid Retina", "18h autonomie", "macOS Ventura"],
    description: "MacBook Air avec puce M2 et écran Liquid Retina 13.6 pouces",
    url: "https://www.noon.com/macbook-air-m2",
    profitMargin: 40
  },
  {
    id: "noon_008",
    name: "AirPods Pro 2 - Réduction de Bruit",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop",
    originalPrice: 249.99,
    sellingPrice: 349.99,
    currency: "€",
    category: "Électronique",
    brand: "Apple",
    rating: 4.7,
    reviews: 1234,
    sales: 3456,
    stock: 75,
    shipping: "Gratuit",
    delivery: "2-3 jours",
    source: "Noon",
    country: "Dubaï",
    scrapedAt: new Date().toISOString(),
    features: ["Réduction de bruit active", "Audio spatial", "Résistance à l'eau", "30h autonomie"],
    description: "AirPods Pro 2 avec réduction de bruit active et audio spatial",
    url: "https://www.noon.com/airpods-pro-2",
    profitMargin: 40
  }
];

// Charger les produits existants
const productsPath = path.join(__dirname, '..', 'data', 'scraped-products.json');
let existingProducts = [];

if (fs.existsSync(productsPath)) {
  existingProducts = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
  console.log(`📦 Produits existants chargés: ${existingProducts.length}`);
} else {
  console.log('⚠️ Aucun fichier de produits existant trouvé');
}

// Ajouter les nouveaux produits
const allProducts = [...existingProducts, ...ADDITIONAL_PRODUCTS];

// Sauvegarder
fs.writeFileSync(productsPath, JSON.stringify(allProducts, null, 2));

console.log(`✅ ${ADDITIONAL_PRODUCTS.length} nouveaux produits ajoutés`);
console.log(`📊 Total: ${allProducts.length} produits`);

// Statistiques mises à jour
const chinaProducts = allProducts.filter(p => p.country === 'Chine');
const turkeyProducts = allProducts.filter(p => p.country === 'Turquie');
const dubaiProducts = allProducts.filter(p => p.country === 'Dubaï');

console.log('\n🌍 Répartition par pays:');
console.log(`🇨🇳 Chine: ${chinaProducts.length} produits`);
console.log(`🇹🇷 Turquie: ${turkeyProducts.length} produits`);
console.log(`🇦🇪 Dubaï: ${dubaiProducts.length} produits`);

// Nouvelles catégories
const categories = {};
allProducts.forEach(p => {
  categories[p.category] = (categories[p.category] || 0) + 1;
});

console.log('\n📊 Catégories disponibles:');
Object.entries(categories).forEach(([cat, count]) => {
  console.log(`   ${cat}: ${count} produits`);
});

// Statistiques financières
const totalOriginalPrice = allProducts.reduce((sum, p) => sum + p.originalPrice, 0);
const totalSellingPrice = allProducts.reduce((sum, p) => sum + p.sellingPrice, 0);
const totalProfit = totalSellingPrice - totalOriginalPrice;

console.log('\n💰 Statistiques financières mises à jour:');
console.log(`   Prix d'achat total: ${totalOriginalPrice.toFixed(2)}€`);
console.log(`   Prix de vente total: ${totalSellingPrice.toFixed(2)}€`);
console.log(`   Bénéfice total: ${totalProfit.toFixed(2)}€`);
console.log(`   Marge moyenne: ${((totalProfit / totalOriginalPrice) * 100).toFixed(1)}%`);

console.log('\n🎯 DL Trade enrichi avec de nouveaux produits !');
console.log('🌐 Accédez à http://localhost:3000/novacore/dl-style/ pour voir les nouveaux produits'); 