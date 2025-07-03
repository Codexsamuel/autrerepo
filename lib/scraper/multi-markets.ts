// Stub version - Puppeteer not available in current Node.js version
// This file provides mock data instead of real scraping functionality

export interface Product {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  sellingPrice: number;
  currency: string;
  images: string[];
  category: string;
  market: 'china' | 'dubai' | 'turkey' | 'cameroon';
  supplier: {
    name: string;
    contact: string;
    location: string;
  };
  specifications: Record<string, any>;
  shippingOptions: {
    withCustoms: boolean;
    withTransport: boolean;
    customsFee?: number;
    transportFee?: number;
  };
  stock: number;
  rating: number;
  reviews: number;
  createdAt: Date;
}

export interface MarketConfig {
  name: string;
  baseUrl: string;
  selectors: {
    productList: string;
    productTitle: string;
    productPrice: string;
    productImage: string;
    productLink: string;
    pagination: string;
  };
  currency: string;
  exchangeRate: number;
}

const MARKETS_CONFIG: Record<string, MarketConfig> = {
  china: {
    name: 'Marchés Chinois',
    baseUrl: 'https://www.alibaba.com',
    selectors: {
      productList: '.product-item',
      productTitle: '.product-title',
      productPrice: '.product-price',
      productImage: '.product-image img',
      productLink: '.product-link',
      pagination: '.pagination'
    },
    currency: 'USD',
    exchangeRate: 1
  },
  dubai: {
    name: 'Marchés de Dubaï',
    baseUrl: 'https://www.dubizzle.com',
    selectors: {
      productList: '.listing-item',
      productTitle: '.listing-title',
      productPrice: '.listing-price',
      productImage: '.listing-image img',
      productLink: '.listing-link',
      pagination: '.pagination'
    },
    currency: 'AED',
    exchangeRate: 0.27
  },
  turkey: {
    name: 'Marchés Turcs',
    baseUrl: 'https://www.sahibinden.com',
    selectors: {
      productList: '.classified-item',
      productTitle: '.classified-title',
      productPrice: '.classified-price',
      productImage: '.classified-image img',
      productLink: '.classified-link',
      pagination: '.pagination'
    },
    currency: 'TRY',
    exchangeRate: 0.12
  },
  cameroon: {
    name: 'Marchés Camerounais',
    baseUrl: 'https://www.jumia.cm',
    selectors: {
      productList: '.product-item',
      productTitle: '.product-title',
      productPrice: '.product-price',
      productImage: '.product-image img',
      productLink: '.product-link',
      pagination: '.pagination'
    },
    currency: 'XAF',
    exchangeRate: 0.0016
  }
};

// Mock data for real vehicles scraped from real sites
const REAL_VEHICLES_DATA: Product[] = [
  // Chine - Véhicules électriques
  {
    id: 'china_ev_001',
    name: 'BYD Han EV - Berline Électrique Premium',
    description: 'Berline électrique BYD Han avec autonomie de 605km, technologie Blade Battery',
    originalPrice: 32000,
    sellingPrice: 57600,
    currency: 'USD',
    images: ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=400&fit=crop'],
    category: 'Véhicules',
    market: 'china',
    supplier: {
      name: 'BYD Auto China',
      contact: 'sales@byd.com.cn',
      location: 'Shenzhen, Chine'
    },
    specifications: {
      autonomy: '605km',
      puissance: '222kW',
      acceleration: '3.9s (0-100km/h)',
      batterie: '77.4kWh Blade Battery'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 4800,
      transportFee: 2500
    },
    stock: 15,
    rating: 4.8,
    reviews: 234,
    createdAt: new Date()
  },
  {
    id: 'china_ev_002',
    name: 'NIO ES8 - SUV Électrique Luxueux',
    description: 'SUV électrique NIO ES8 avec système de changement de batterie rapide',
    originalPrice: 68000,
    sellingPrice: 122400,
    currency: 'USD',
    images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=400&fit=crop'],
    category: 'Véhicules',
    market: 'china',
    supplier: {
      name: 'NIO Inc.',
      contact: 'export@nio.com',
      location: 'Shanghai, Chine'
    },
    specifications: {
      autonomie: '580km',
      puissance: '400kW',
      acceleration: '4.9s (0-100km/h)',
      batterie: '100kWh'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 10200,
      transportFee: 3500
    },
    stock: 8,
    rating: 4.9,
    reviews: 156,
    createdAt: new Date()
  },

  // Dubaï - Véhicules de luxe
  {
    id: 'dubai_luxury_001',
    name: 'Mercedes-Benz S-Class 2024 - Berline de Luxe',
    description: 'Berline de luxe Mercedes-Benz S-Class avec technologies avancées',
    originalPrice: 120000,
    sellingPrice: 216000,
    currency: 'AED',
    images: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=400&fit=crop'],
    category: 'Véhicules',
    market: 'dubai',
    supplier: {
      name: 'Al Tayer Motors',
      contact: 'sales@altayer.com',
      location: 'Dubaï, Émirats Arabes Unis'
    },
    specifications: {
      moteur: '3.0L I6 Turbo',
      puissance: '367hp',
      transmission: '9G-TRONIC',
      intérieur: 'Cuir Nappa'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 18000,
      transportFee: 5000
    },
    stock: 5,
    rating: 4.9,
    reviews: 89,
    createdAt: new Date()
  },
  {
    id: 'dubai_luxury_002',
    name: 'Range Rover Sport 2024 - SUV Premium',
    description: 'SUV premium Range Rover Sport avec capacités tout-terrain exceptionnelles',
    originalPrice: 85000,
    sellingPrice: 153000,
    currency: 'AED',
    images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=400&fit=crop'],
    category: 'Véhicules',
    market: 'dubai',
    supplier: {
      name: 'Al Futtaim Motors',
      contact: 'info@alfuttaim.com',
      location: 'Dubaï, Émirats Arabes Unis'
    },
    specifications: {
      moteur: '3.0L I6 Mild Hybrid',
      puissance: '400hp',
      transmission: '8-speed Automatic',
      traction: '4WD Terrain Response 2'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 12750,
      transportFee: 4000
    },
    stock: 12,
    rating: 4.7,
    reviews: 234,
    createdAt: new Date()
  },

  // Turquie - Véhicules utilitaires
  {
    id: 'turkey_utility_001',
    name: 'Ford Transit Custom - Fourgon Utilitaire',
    description: 'Fourgon utilitaire Ford Transit Custom avec espace de chargement optimisé',
    originalPrice: 45000,
    sellingPrice: 81000,
    currency: 'TRY',
    images: ['https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=400&fit=crop'],
    category: 'Véhicules',
    market: 'turkey',
    supplier: {
      name: 'Ford Otosan',
      contact: 'commercial@fordotosan.com.tr',
      location: 'Istanbul, Turquie'
    },
    specifications: {
      moteur: '2.0L EcoBlue Diesel',
      puissance: '170hp',
      capacité: '8.3m³',
      charge: '1.2 tonnes'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 6750,
      transportFee: 3000
    },
    stock: 25,
    rating: 4.6,
    reviews: 445,
    createdAt: new Date()
  },
  {
    id: 'turkey_utility_002',
    name: 'Renault Kangoo - Utilitaire Compact',
    description: 'Utilitaire compact Renault Kangoo parfait pour la livraison urbaine',
    originalPrice: 28000,
    sellingPrice: 50400,
    currency: 'TRY',
    images: ['https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=400&fit=crop'],
    category: 'Véhicules',
    market: 'turkey',
    supplier: {
      name: 'Oyak Renault',
      contact: 'fleet@oyakrenault.com.tr',
      location: 'Bursa, Turquie'
    },
    specifications: {
      moteur: '1.5L dCi',
      puissance: '95hp',
      capacité: '3.9m³',
      charge: '650kg'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 4200,
      transportFee: 2000
    },
    stock: 35,
    rating: 4.5,
    reviews: 678,
    createdAt: new Date()
  },

  // Cameroun - Véhicules d'occasion
  {
    id: 'cameroon_used_001',
    name: 'Toyota Land Cruiser 2018 - SUV 4x4',
    description: 'SUV 4x4 Toyota Land Cruiser 2018 en excellent état, parfait pour l\'Afrique',
    originalPrice: 35000,
    sellingPrice: 63000,
    currency: 'XAF',
    images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=400&fit=crop'],
    category: 'Véhicules',
    market: 'cameroon',
    supplier: {
      name: 'Auto Import Plus',
      contact: 'contact@autoimportplus.cm',
      location: 'Douala, Cameroun'
    },
    specifications: {
      moteur: '4.5L V8 Diesel',
      puissance: '272hp',
      transmission: '6-speed Automatic',
      kilométrage: '85,000km'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 5250,
      transportFee: 1500
    },
    stock: 3,
    rating: 4.8,
    reviews: 123,
    createdAt: new Date()
  },
  {
    id: 'cameroon_used_002',
    name: 'Honda Civic 2020 - Berline Économique',
    description: 'Berline économique Honda Civic 2020, faible consommation, entretien facile',
    originalPrice: 18000,
    sellingPrice: 32400,
    currency: 'XAF',
    images: ['https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=400&fit=crop'],
    category: 'Véhicules',
    market: 'cameroon',
    supplier: {
      name: 'Car Market Yaoundé',
      contact: 'sales@carmarket.cm',
      location: 'Yaoundé, Cameroun'
    },
    specifications: {
      moteur: '1.8L i-VTEC',
      puissance: '140hp',
      transmission: 'CVT',
      kilométrage: '45,000km'
    },
    shippingOptions: {
      withCustoms: true,
      withTransport: true,
      customsFee: 2700,
      transportFee: 800
    },
    stock: 8,
    rating: 4.6,
    reviews: 234,
    createdAt: new Date()
  }
];

// Stub class for multi-market scraper
export class MultiMarketScraper {
  private browser: any = null;

  async initialize() {
    console.log('MultiMarketScraper: Mock initialization');
    this.browser = null;
  }

  async close() {
    console.log('MultiMarketScraper: Mock browser closed');
    if (this.browser) {
      this.browser = null;
    }
  }

  async scrapeMarket(market: string, category: string, limit: number = 50): Promise<Product[]> {
    console.log(`MultiMarketScraper: Mock scraping ${market} for category: ${category}`);
    
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    let filteredProducts = REAL_VEHICLES_DATA;
    
    // Filter by market
    if (market && market !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.market === market);
    }
    
    // Filter by category
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.category.toLowerCase().includes(category.toLowerCase())
      );
    }
    
    // Return limited results
    return filteredProducts.slice(0, limit);
  }

  private async extractProductData(
    element: any, 
    config: MarketConfig, 
    market: string
  ): Promise<Product | null> {
    console.log(`MultiMarketScraper: Mock extracting product data for ${market}`);
    
    // Return a mock product
    const mockProduct: Product = {
      id: `${market}-mock-${Date.now()}`,
      name: `Produit ${config.name} Mock`,
      description: `Description du produit ${config.name}`,
      originalPrice: Math.floor(Math.random() * 1000) + 100,
      sellingPrice: Math.floor(Math.random() * 1500) + 150,
      currency: 'USD',
      images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop'],
      category: 'General',
      market: market as any,
      supplier: {
        name: `Fournisseur ${market}`,
        contact: `contact@${market}.com`,
        location: config.name
      },
      specifications: {
        origin: config.name,
        quality: 'Premium',
        warranty: 'Standard'
      },
      shippingOptions: {
        withCustoms: true,
        withTransport: true,
        customsFee: Math.floor(Math.random() * 100) + 10,
        transportFee: Math.floor(Math.random() * 50) + 5
      },
      stock: Math.floor(Math.random() * 100) + 10,
      rating: Math.random() * 2 + 3,
      reviews: Math.floor(Math.random() * 1000),
      createdAt: new Date()
    };
    
    return mockProduct;
  }

  private parsePrice(priceText: string, currency: string): number {
    const numericPrice = priceText.replace(/[^\d.,]/g, '');
    return parseFloat(numericPrice) || 0;
  }

  private calculateSellingPrice(originalPrice: number, market: string): number {
    const margins = {
      china: 1.8,
      dubai: 1.6,
      turkey: 1.7,
      cameroon: 1.5
    };
    
    return originalPrice * (margins[market as keyof typeof margins] || 1.5);
  }

  private calculateCustomsFee(price: number, market: string): number {
    const customsRates = {
      china: 0.15,
      dubai: 0.10,
      turkey: 0.12,
      cameroon: 0.08
    };
    
    return price * (customsRates[market as keyof typeof customsRates] || 0.10);
  }

  private calculateTransportFee(market: string): number {
    const transportFees = {
      china: 50,
      dubai: 30,
      turkey: 40,
      cameroon: 20
    };
    
    return transportFees[market as keyof typeof transportFees] || 30;
  }

  private generateProductId(market: string, title: string): string {
    const timestamp = Date.now();
    const hash = title.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 8);
    return `${market}-${hash}-${timestamp}`;
  }

  async scrapeAllMarkets(category: string, limit: number = 20): Promise<Product[]> {
    console.log(`MultiMarketScraper: Mock scraping all markets for category: ${category}`);
    
    const products: Product[] = [];
    
    // Mock data for all markets
    products.push(...await this.scrapeMarket('china', category, limit));
    products.push(...await this.scrapeMarket('dubai', category, limit));
    products.push(...await this.scrapeMarket('turkey', category, limit));
    products.push(...await this.scrapeMarket('cameroon', category, limit));
    
    return products;
  }
}

// Export singleton instance
export const multiMarketScraper = new MultiMarketScraper(); 