// Stub version - Puppeteer not available in current Node.js version
// This file provides mock data instead of real scraping functionality

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  url: string;
  rating: number;
  reviews: number;
  sales: number;
  source: string;
  category: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  shipping: string;
  delivery: string;
  stock: number;
  isNew: boolean;
  isHot: boolean;
  isOnSale: boolean;
  discount?: number;
  tags: string[];
  lastUpdated: Date;
}

// Mock data for AliExpress products
const MOCK_ALIEXPRESS_PRODUCTS: Product[] = [
  {
    id: 'aliexpress-001',
    name: 'Smartphone Android 6.5" 128GB - Noir',
    price: 89.99,
    originalPrice: 129.99,
    currency: '$',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    url: 'https://www.aliexpress.com/item/1005001234567890.html',
    rating: 4.7,
    reviews: 2341,
    sales: 15678,
    source: 'AliExpress',
    category: 'Electronics',
    description: 'Smartphone Android avec écran 6.5 pouces, 128GB de stockage, appareil photo 48MP',
    features: ['Écran 6.5" HD', '128GB Stockage', 'Appareil photo 48MP', 'Batterie 5000mAh'],
    specifications: {
      'Écran': '6.5" HD',
      'Stockage': '128GB',
      'RAM': '4GB',
      'Appareil photo': '48MP + 8MP + 2MP',
      'Batterie': '5000mAh'
    },
    shipping: 'Livraison gratuite',
    delivery: '15-30 jours',
    stock: 500,
    isNew: true,
    isHot: true,
    isOnSale: true,
    discount: 31,
    tags: ['Smartphone', 'Android', 'Electronics', 'Mobile'],
    lastUpdated: new Date()
  },
  {
    id: 'aliexpress-002',
    name: 'Montre connectée Fitness Tracker - Rose',
    price: 24.99,
    originalPrice: 39.99,
    currency: '$',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    url: 'https://www.aliexpress.com/item/1005001234567891.html',
    rating: 4.5,
    reviews: 1892,
    sales: 8923,
    source: 'AliExpress',
    category: 'Wearables',
    description: 'Montre connectée avec suivi fitness, moniteur cardiaque, notifications smartphone',
    features: ['Écran tactile 1.4"', 'Suivi fitness', 'Moniteur cardiaque', 'Notifications'],
    specifications: {
      'Écran': '1.4" LCD',
      'Batterie': '7 jours',
      'Résistance': 'IP68',
      'Compatibilité': 'iOS/Android'
    },
    shipping: 'Livraison gratuite',
    delivery: '15-30 jours',
    stock: 1200,
    isNew: false,
    isHot: true,
    isOnSale: true,
    discount: 38,
    tags: ['Montre', 'Fitness', 'Connectée', 'Santé'],
    lastUpdated: new Date()
  },
  {
    id: 'aliexpress-003',
    name: 'Casque Bluetooth sans fil - Blanc',
    price: 19.99,
    originalPrice: 29.99,
    currency: '$',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    url: 'https://www.aliexpress.com/item/1005001234567892.html',
    rating: 4.3,
    reviews: 3456,
    sales: 23456,
    source: 'AliExpress',
    category: 'Audio',
    description: 'Casque Bluetooth avec réduction de bruit, micro intégré, autonomie 20h',
    features: ['Bluetooth 5.0', 'Réduction de bruit', 'Micro intégré', 'Autonomie 20h'],
    specifications: {
      'Connectivité': 'Bluetooth 5.0',
      'Autonomie': '20 heures',
      'Charge': '2 heures',
      'Poids': '180g'
    },
    shipping: 'Livraison gratuite',
    delivery: '15-30 jours',
    stock: 800,
    isNew: false,
    isHot: false,
    isOnSale: true,
    discount: 33,
    tags: ['Casque', 'Bluetooth', 'Audio', 'Sans fil'],
    lastUpdated: new Date()
  }
];

// Stub function to scrape AliExpress
export async function scrapeAliExpress(keyword: string): Promise<Product[]> {
  console.log(`AliExpress Scraper: Mock scraping for keyword: ${keyword}`);
  
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Filter mock products based on keyword
  const filteredProducts = MOCK_ALIEXPRESS_PRODUCTS.filter(product =>
    product.name.toLowerCase().includes(keyword.toLowerCase()) ||
    product.category.toLowerCase().includes(keyword.toLowerCase()) ||
    product.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
  );
  
  // If no matches, return all products
  return filteredProducts.length > 0 ? filteredProducts : MOCK_ALIEXPRESS_PRODUCTS;
}

// Stub function to start periodic scraping
export async function startPeriodicScraping(keyword: string, intervalMinutes: number = 60): Promise<void> {
  console.log(`AliExpress Scraper: Mock periodic scraping started for keyword: ${keyword}, interval: ${intervalMinutes} minutes`);
  
  // In a real implementation, this would set up a cron job or interval
  setInterval(async () => {
    console.log(`AliExpress Scraper: Mock periodic scraping running for keyword: ${keyword}`);
    await scrapeAliExpress(keyword);
  }, intervalMinutes * 60 * 1000);
}

// Stub class for AliExpress scraper
export class AliExpressScraper {
  private browser: any = null;
  private isRunning: boolean = false;

  async initialize(): Promise<void> {
    console.log('AliExpress Scraper: Mock initialization');
    this.browser = null;
  }

  async close(): Promise<void> {
    console.log('AliExpress Scraper: Mock browser closed');
    this.browser = null;
  }

  async scrapeProducts(keyword: string, limit: number = 20): Promise<Product[]> {
    console.log(`AliExpress Scraper: Mock scraping ${limit} products for keyword: ${keyword}`);
    
    const products = await scrapeAliExpress(keyword);
    return products.slice(0, limit);
  }

  async scrapeProductDetails(url: string): Promise<Product | null> {
    console.log(`AliExpress Scraper: Mock scraping product details for URL: ${url}`);
    
    // Return a mock product based on the URL
    const mockProduct: Product = {
      id: `aliexpress-detail-${Date.now()}`,
      name: 'Produit AliExpress Détail',
      price: Math.floor(Math.random() * 100) + 20,
      currency: '$',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
      url: url,
      rating: Math.random() * 2 + 3,
      reviews: Math.floor(Math.random() * 5000),
      sales: Math.floor(Math.random() * 10000),
      source: 'AliExpress',
      category: 'Electronics',
      description: 'Description détaillée du produit AliExpress',
      features: ['Fonctionnalité 1', 'Fonctionnalité 2', 'Fonctionnalité 3'],
      specifications: {
        'Spécification 1': 'Valeur 1',
        'Spécification 2': 'Valeur 2'
      },
      shipping: 'Livraison gratuite',
      delivery: '15-30 jours',
      stock: Math.floor(Math.random() * 1000) + 100,
      isNew: Math.random() > 0.7,
      isHot: Math.random() > 0.8,
      isOnSale: Math.random() > 0.6,
      discount: Math.random() > 0.6 ? Math.floor(Math.random() * 40) + 10 : undefined,
      tags: ['AliExpress', 'Electronics'],
      lastUpdated: new Date()
    };
    
    return mockProduct;
  }

  async getRecommendations(category: string): Promise<Product[]> {
    console.log(`AliExpress Scraper: Mock getting recommendations for category: ${category}`);
    
    // Return mock recommendations
    const recommendations: Product[] = [];
    for (let i = 0; i < 5; i++) {
      recommendations.push({
        id: `recommendation-${i}`,
        name: `Produit recommandé ${category} ${i + 1}`,
        price: Math.floor(Math.random() * 50) + 10,
        currency: '$',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
        url: `https://www.aliexpress.com/item/recommendation-${i}.html`,
        rating: Math.random() * 2 + 3,
        reviews: Math.floor(Math.random() * 2000),
        sales: Math.floor(Math.random() * 5000),
        source: 'AliExpress',
        category: category,
        description: `Description du produit recommandé ${i + 1}`,
        features: ['Recommandé', 'Populaire'],
        specifications: {
          'Type': 'Recommandé'
        },
        shipping: 'Livraison gratuite',
        delivery: '15-30 jours',
        stock: Math.floor(Math.random() * 500) + 50,
        isNew: Math.random() > 0.7,
        isHot: Math.random() > 0.8,
        isOnSale: Math.random() > 0.6,
        tags: [category, 'Recommandé'],
        lastUpdated: new Date()
      });
    }
    
    return recommendations;
  }

  isScraping(): boolean {
    return this.isRunning;
  }

  stop(): void {
    console.log('AliExpress Scraper: Mock stopping scraper');
    this.isRunning = false;
  }
}

// Export singleton instance
export default AliExpressScraper; 