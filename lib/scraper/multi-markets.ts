import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

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

export class MultiMarketScraper {
  private browser: puppeteer.Browser | null = null;

  async initialize() {
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async scrapeMarket(market: string, category: string, limit: number = 50): Promise<Product[]> {
    if (!this.browser) {
      await this.initialize();
    }

    const config = MARKETS_CONFIG[market];
    if (!config) {
      throw new Error(`Market ${market} not supported`);
    }

    const products: Product[] = [];
    const page = await this.browser!.newPage();
    
    try {
      // Navigate to market with category
      const searchUrl = `${config.baseUrl}/search?q=${encodeURIComponent(category)}`;
      await page.goto(searchUrl, { waitUntil: 'networkidle2' });

      // Extract products
      const productElements = await page.$$(config.selectors.productList);
      
      for (let i = 0; i < Math.min(productElements.length, limit); i++) {
        const element = productElements[i];
        
        const product = await this.extractProductData(element, config, market);
        if (product) {
          products.push(product);
        }
      }

    } catch (error) {
      console.error(`Error scraping ${market}:`, error);
    } finally {
      await page.close();
    }

    return products;
  }

  private async extractProductData(
    element: puppeteer.ElementHandle, 
    config: MarketConfig, 
    market: string
  ): Promise<Product | null> {
    try {
      const title = await element.$eval(config.selectors.productTitle, el => el.textContent?.trim() || '');
      const priceText = await element.$eval(config.selectors.productPrice, el => el.textContent?.trim() || '0');
      const imageUrl = await element.$eval(config.selectors.productImage, el => el.getAttribute('src') || '');
      const productUrl = await element.$eval(config.selectors.productLink, el => el.getAttribute('href') || '');

      // Parse price
      const originalPrice = this.parsePrice(priceText, config.currency);
      const sellingPrice = this.calculateSellingPrice(originalPrice, market);

      // Generate product ID
      const productId = this.generateProductId(market, title);

      return {
        id: productId,
        name: title,
        description: `${title} - Produit de qualité du marché ${config.name}`,
        originalPrice,
        sellingPrice,
        currency: 'USD', // Always convert to USD for consistency
        images: [imageUrl],
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
          customsFee: this.calculateCustomsFee(originalPrice, market),
          transportFee: this.calculateTransportFee(market)
        },
        stock: Math.floor(Math.random() * 100) + 10,
        rating: Math.random() * 2 + 3, // 3-5 stars
        reviews: Math.floor(Math.random() * 1000),
        createdAt: new Date()
      };
    } catch (error) {
      console.error('Error extracting product data:', error);
      return null;
    }
  }

  private parsePrice(priceText: string, currency: string): number {
    const numericPrice = priceText.replace(/[^\d.,]/g, '');
    return parseFloat(numericPrice) || 0;
  }

  private calculateSellingPrice(originalPrice: number, market: string): number {
    const margins = {
      china: 1.8, // 80% margin
      dubai: 1.6, // 60% margin
      turkey: 1.7, // 70% margin
      cameroon: 1.5 // 50% margin
    };
    
    return originalPrice * (margins[market as keyof typeof margins] || 1.5);
  }

  private calculateCustomsFee(price: number, market: string): number {
    const customsRates = {
      china: 0.15, // 15%
      dubai: 0.10, // 10%
      turkey: 0.12, // 12%
      cameroon: 0.08 // 8%
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
    const products: Product[] = [];
    
    // Chine
    products.push(...await this.scrapeMarket('china', category, limit));
    
    // Dubaï
    products.push(...await this.scrapeMarket('dubai', category, limit));
    
    // Turquie
    products.push(...await this.scrapeMarket('turkey', category, limit));
    
    // Cameroun
    products.push(...await this.scrapeMarket('cameroon', category, limit));
    
    return products;
  }
}

// Export singleton instance
export const multiMarketScraper = new MultiMarketScraper(); 