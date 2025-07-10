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

interface ScrapingOptions {
  category: string;
  query?: string;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
}

interface AliExpressProduct {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  images: string[];
  description: string;
  brand?: string;
  category: string;
  subcategory?: string;
  rating?: number;
  reviews?: number;
  seller: string;
  sellerRating?: number;
  availability: string;
  delivery: string;
  warranty: string;
  specifications: Record<string, string>;
  tags: string[];
  url: string;
  platform: 'aliexpress';
  scrapedAt: string;
}

// Mock data for AliExpress products
const aliexpressProducts: Record<string, AliExpressProduct[]> = {
  'women-clothing': [
    {
      id: 'aliexpress_women_001',
      title: 'Robe d\'été élégante avec imprimé floral',
      price: 18.99,
      originalPrice: 35.99,
      currency: 'USD',
      image: '/products/aliexpress/floral-dress.jpg',
      images: [
        '/products/aliexpress/floral-dress-1.jpg',
        '/products/aliexpress/floral-dress-2.jpg',
        '/products/aliexpress/floral-dress-3.jpg'
      ],
      description: 'Robe d\'été élégante avec imprimé floral, coupe ajustée et confortable',
      brand: 'FashionStyle',
      category: 'women-clothing',
      subcategory: 'dresses',
      rating: 4.4,
      reviews: 2156,
      seller: 'FashionStyle Store',
      sellerRating: 4.7,
      availability: 'En stock',
      delivery: 'Livraison gratuite 15-30 jours',
      warranty: 'Garantie 30 jours',
      specifications: {
        'Matériau': 'Polyester 95%, Élasthanne 5%',
        'Style': 'Casual',
        'Longueur': 'Mi-longueur',
        'Manches': 'Sans manches',
        'Fermeture': 'Zip latéral'
      },
      tags: ['robe', 'été', 'floral', 'élégante', 'ajustée'],
      url: 'https://www.aliexpress.com/item/floral-summer-dress',
      platform: 'aliexpress',
      scrapedAt: new Date().toISOString()
    },
    {
      id: 'aliexpress_women_002',
      title: 'Blouse en soie avec col chemise',
      price: 25.99,
      originalPrice: 45.99,
      currency: 'USD',
      image: '/products/aliexpress/silk-blouse.jpg',
      images: [
        '/products/aliexpress/silk-blouse-1.jpg',
        '/products/aliexpress/silk-blouse-2.jpg'
      ],
      description: 'Blouse en soie naturelle avec col chemise, parfaite pour le bureau',
      brand: 'SilkElegance',
      category: 'women-clothing',
      subcategory: 'blouses',
      rating: 4.6,
      reviews: 892,
      seller: 'SilkElegance Store',
      sellerRating: 4.8,
      availability: 'En stock',
      delivery: 'Livraison gratuite 15-30 jours',
      warranty: 'Garantie 30 jours',
      specifications: {
        'Matériau': 'Soie 100%',
        'Style': 'Professionnel',
        'Col': 'Chemise',
        'Manches': 'Longues',
        'Entretien': 'Lavage à la main'
      },
      tags: ['blouse', 'soie', 'professionnelle', 'col chemise'],
      url: 'https://www.aliexpress.com/item/silk-blouse-collar',
      platform: 'aliexpress',
      scrapedAt: new Date().toISOString()
    }
  ],
  'men-clothing': [
    {
      id: 'aliexpress_men_001',
      title: 'Chemise en coton Oxford avec poches',
      price: 22.99,
      originalPrice: 38.99,
      currency: 'USD',
      image: '/products/aliexpress/oxford-shirt.jpg',
      images: [
        '/products/aliexpress/oxford-shirt-1.jpg',
        '/products/aliexpress/oxford-shirt-2.jpg'
      ],
      description: 'Chemise en coton Oxford avec poches, style casual et confortable',
      brand: 'CasualStyle',
      category: 'men-clothing',
      subcategory: 'shirts',
      rating: 4.3,
      reviews: 1247,
      seller: 'CasualStyle Store',
      sellerRating: 4.6,
      availability: 'En stock',
      delivery: 'Livraison gratuite 15-30 jours',
      warranty: 'Garantie 30 jours',
      specifications: {
        'Matériau': 'Coton Oxford 100%',
        'Style': 'Casual',
        'Col': 'Classique',
        'Manches': 'Longues',
        'Poches': '2 poches poitrine'
      },
      tags: ['chemise', 'coton oxford', 'casual', 'poches'],
      url: 'https://www.aliexpress.com/item/oxford-cotton-shirt',
      platform: 'aliexpress',
      scrapedAt: new Date().toISOString()
    }
  ],
  'electronics': [
    {
      id: 'aliexpress_elec_001',
      title: 'Smartphone Android 6.5" 128GB - Noir',
      price: 89.99,
      originalPrice: 129.99,
      currency: 'USD',
      image: '/products/aliexpress/android-smartphone.jpg',
      images: [
        '/products/aliexpress/android-smartphone-1.jpg',
        '/products/aliexpress/android-smartphone-2.jpg',
        '/products/aliexpress/android-smartphone-3.jpg'
      ],
      description: 'Smartphone Android avec écran 6.5 pouces, 128GB de stockage, appareil photo 48MP',
      brand: 'TechPro',
      category: 'electronics',
      subcategory: 'smartphones',
      rating: 4.7,
      reviews: 2341,
      seller: 'TechPro Store',
      sellerRating: 4.8,
      availability: 'En stock',
      delivery: 'Livraison gratuite 15-30 jours',
      warranty: 'Garantie 1 an',
      specifications: {
        'Écran': '6.5" HD',
        'Stockage': '128GB',
        'RAM': '4GB',
        'Appareil photo': '48MP + 8MP + 2MP',
        'Batterie': '5000mAh'
      },
      tags: ['smartphone', 'android', '6.5"', '128gb', '48mp'],
      url: 'https://www.aliexpress.com/item/android-smartphone-6.5',
      platform: 'aliexpress',
      scrapedAt: new Date().toISOString()
    }
  ],
  'furniture': [
    {
      id: 'aliexpress_furn_001',
      title: 'Table de chevet moderne en bois',
      price: 45.99,
      originalPrice: 65.99,
      currency: 'USD',
      image: '/products/aliexpress/modern-nightstand.jpg',
      images: [
        '/products/aliexpress/modern-nightstand-1.jpg',
        '/products/aliexpress/modern-nightstand-2.jpg'
      ],
      description: 'Table de chevet moderne en bois massif avec tiroir et étagère',
      brand: 'WoodCraft',
      category: 'furniture',
      subcategory: 'nightstands',
      rating: 4.5,
      reviews: 567,
      seller: 'WoodCraft Store',
      sellerRating: 4.7,
      availability: 'En stock',
      delivery: 'Livraison 20-35 jours',
      warranty: 'Garantie 2 ans',
      specifications: {
        'Matériau': 'Bois massif',
        'Dimensions': '40x35x55cm',
        'Couleur': 'Naturel',
        'Style': 'Moderne',
        'Assemblage': 'Pré-assemblé'
      },
      tags: ['table de chevet', 'bois', 'moderne', 'tiroir'],
      url: 'https://www.aliexpress.com/item/modern-wood-nightstand',
      platform: 'aliexpress',
      scrapedAt: new Date().toISOString()
    }
  ],
  'vehicles': [
    {
      id: 'aliexpress_veh_001',
      title: 'Scooter électrique pliable 10 pouces',
      price: 299.99,
      originalPrice: 399.99,
      currency: 'USD',
      image: '/products/aliexpress/foldable-scooter.jpg',
      images: [
        '/products/aliexpress/foldable-scooter-1.jpg',
        '/products/aliexpress/foldable-scooter-2.jpg'
      ],
      description: 'Scooter électrique pliable avec roues 10 pouces, autonomie 40km',
      brand: 'EcoRide',
      category: 'vehicles',
      subcategory: 'electric-scooters',
      rating: 4.4,
      reviews: 1234,
      seller: 'EcoRide Store',
      sellerRating: 4.6,
      availability: 'En stock',
      delivery: 'Livraison 20-35 jours',
      warranty: 'Garantie 1 an',
      specifications: {
        'Autonomie': '40km',
        'Vitesse max': '25km/h',
        'Roues': '10 pouces',
        'Poids': '15kg',
        'Temps de charge': '4h'
      },
      tags: ['scooter', 'électrique', 'pliable', '10 pouces'],
      url: 'https://www.aliexpress.com/item/foldable-electric-scooter',
      platform: 'aliexpress',
      scrapedAt: new Date().toISOString()
    }
  ]
};

export async function scrapeAliExpress(options: ScrapingOptions): Promise<AliExpressProduct[]> {
  const { category, limit = 20, minPrice, maxPrice } = options;
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
  
  let products = aliexpressProducts[category] || [];
  
  // Apply price filters if specified
  if (minPrice !== undefined) {
    products = products.filter(product => product.price >= minPrice);
  }
  
  if (maxPrice !== undefined) {
    products = products.filter(product => product.price <= maxPrice);
  }
  
  // Add some randomization to prices for realism
  products = products.map(product => ({
    ...product,
    price: product.price * (0.9 + Math.random() * 0.2), // ±10% variation
    rating: (product.rating || 4.0) * (0.95 + Math.random() * 0.1), // ±5% variation
    reviews: Math.floor((product.reviews || 1000) * (0.8 + Math.random() * 0.4)) // ±20% variation
  }));
  
  // Limit results
  return products.slice(0, limit);
}

// Stub function to start periodic scraping
export async function startPeriodicScraping(keyword: string, intervalMinutes: number = 60): Promise<void> {
  console.log(`AliExpress Scraper: Mock periodic scraping started for keyword: ${keyword}, interval: ${intervalMinutes} minutes`);
  
  // In a real implementation, this would set up a cron job or interval
  setInterval(async () => {
    console.log(`AliExpress Scraper: Mock periodic scraping running for keyword: ${keyword}`);
    await scrapeAliExpress({ category: keyword });
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
    
    const products = await scrapeAliExpress({ category: keyword });
    return products.map(product => ({
      id: product.id,
      name: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      currency: product.currency,
      image: product.image,
      url: product.url,
      rating: product.rating ?? 0,
      reviews: product.reviews ?? 0,
      sales: Math.floor(Math.random() * 10000),
      source: 'AliExpress',
      category: product.category,
      description: product.description,
      features: [],
      specifications: product.specifications || {},
      shipping: 'Livraison gratuite',
      delivery: product.delivery || '',
      stock: Math.floor(Math.random() * 1000) + 100,
      isNew: Math.random() > 0.7,
      isHot: Math.random() > 0.8,
      isOnSale: Math.random() > 0.6,
      discount: Math.random() > 0.6 ? Math.floor(Math.random() * 40) + 10 : undefined,
      tags: product.tags || [],
      lastUpdated: new Date()
    }));
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