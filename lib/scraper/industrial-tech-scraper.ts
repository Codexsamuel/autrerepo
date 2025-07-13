import { IndustrialProduct } from '@/types/product';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { promises as fs } from 'fs';

interface ScrapingConfig {
  market: string;
  baseUrl: string;
  searchSelectors: {
    productContainer: string;
    title: string;
    price: string;
    image: string;
    rating?: string;
    reviews?: string;
    supplier?: string;
    specifications?: string;
  };
  categories: string[];
}

const MARKET_CONFIGS: Record<string, ScrapingConfig> = {
  alibaba: {
    market: 'Alibaba',
    baseUrl: 'https://www.alibaba.com',
    searchSelectors: {
      productContainer: '.product-item',
      title: '.product-title',
      price: '.product-price',
      image: '.product-image img',
      rating: '.product-rating',
      reviews: '.product-reviews',
      supplier: '.supplier-name',
      specifications: '.product-specs'
    },
    categories: [
      'industrial-machinery',
      'electronic-components',
      'tools-hardware',
      'automation-equipment',
      'measurement-instruments',
      'safety-equipment',
      'drone-parts',
      '3d-printer-parts',
      'automotive-parts',
      'construction-machinery'
    ]
  },
  madeInChina: {
    market: 'Made-in-China',
    baseUrl: 'https://www.made-in-china.com',
    searchSelectors: {
      productContainer: '.product-item',
      title: '.product-name',
      price: '.product-price',
      image: '.product-img img',
      supplier: '.company-name'
    },
    categories: [
      'industrial-equipment',
      'electronic-components',
      'machinery-parts',
      'automation-systems',
      'testing-equipment'
    ]
  },
  dubaiTrade: {
    market: 'Dubai Trade',
    baseUrl: 'https://www.dubaitrade.ae',
    searchSelectors: {
      productContainer: '.product-card',
      title: '.product-title',
      price: '.product-price',
      image: '.product-image img',
      supplier: '.supplier-info'
    },
    categories: [
      'industrial-supplies',
      'construction-equipment',
      'oil-gas-equipment',
      'logistics-equipment'
    ]
  },
  turkeyExport: {
    market: 'Turkey Export',
    baseUrl: 'https://www.turkeyexport.com',
    searchSelectors: {
      productContainer: '.product-item',
      title: '.product-name',
      price: '.product-price',
      image: '.product-image img',
      supplier: '.manufacturer'
    },
    categories: [
      'textile-machinery',
      'automotive-parts',
      'construction-materials',
      'agricultural-equipment'
    ]
  }
};

export class IndustrialTechScraper {
  private config: ScrapingConfig;
  private proxyList: string[] = [];
  private currentProxyIndex = 0;

  constructor(market: string) {
    this.config = MARKET_CONFIGS[market];
    if (!this.config) {
      throw new Error(`Market ${market} not supported`);
    }
  }

  private async getProxy(): Promise<string> {
    // Rotation des proxies pour éviter les blocages
    if (this.proxyList.length === 0) {
      // Charger la liste des proxies depuis un service
      this.proxyList = await this.loadProxyList();
    }
    
    const proxy = this.proxyList[this.currentProxyIndex];
    this.currentProxyIndex = (this.currentProxyIndex + 1) % this.proxyList.length;
    return proxy;
  }

  private async loadProxyList(): Promise<string[]> {
    // Implémentation pour charger des proxies depuis un service
    return [
      'http://proxy1:8080',
      'http://proxy2:8080',
      'http://proxy3:8080'
    ];
  }

  private async makeRequest(url: string): Promise<string> {
    const proxy = await this.getProxy();
    
    try {
      const response = await axios.get(url, {
        proxy: { host: proxy.split(':')[0], port: parseInt(proxy.split(':')[1]) },
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1'
        },
        timeout: 30000
      });
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      throw error;
    }
  }

  async scrapeCategory(category: string, limit: number = 50): Promise<IndustrialProduct[]> {
    const products: IndustrialProduct[] = [];
    const searchUrl = `${this.config.baseUrl}/search?q=${encodeURIComponent(category)}`;
    
    try {
      const html = await this.makeRequest(searchUrl);
      const $ = cheerio.load(html);
      
      $(this.config.searchSelectors.productContainer).slice(0, limit).each((index, element) => {
        const $el = $(element);
        
        const title = $el.find(this.config.searchSelectors.title).text().trim();
        const priceText = $el.find(this.config.searchSelectors.price).text().trim();
        const imageUrl = $el.find(this.config.searchSelectors.image).attr('src');
        const rating = $el.find(this.config.searchSelectors.rating || '').text().trim();
        const reviews = $el.find(this.config.searchSelectors.reviews || '').text().trim();
        const supplier = $el.find(this.config.searchSelectors.supplier || '').text().trim();
        
        if (title && priceText) {
          const price = this.extractPrice(priceText);
          const product: IndustrialProduct = {
            id: `industrial-${this.config.market}-${index}`,
            name: title,
            price: price,
            originalPrice: price * 1.2, // Prix original estimé
            rating: this.extractRating(rating),
            reviews: this.extractNumber(reviews),
            image: imageUrl || '/images/products/placeholder.jpg',
            category: this.mapCategory(category),
            brand: supplier || 'Generic',
            inStock: true,
            fastDelivery: true,
            discount: 15,
            origin: this.getOriginFromMarket(this.config.market),
            supplier: supplier || 'Unknown',
            specifications: this.extractSpecifications($el),
            minimumOrder: this.extractMinimumOrder($el),
            leadTime: this.extractLeadTime($el)
          };
          
          products.push(product);
        }
      });
      
    } catch (error) {
      console.error(`Error scraping category ${category}:`, error);
    }
    
    return products;
  }

  async scrapeAllCategories(limitPerCategory: number = 20): Promise<IndustrialProduct[]> {
    const allProducts: IndustrialProduct[] = [];
    
    for (const category of this.config.categories) {
      console.log(`Scraping category: ${category}`);
      const products = await this.scrapeCategory(category, limitPerCategory);
      allProducts.push(...products);
      
      // Pause entre les requêtes pour éviter les blocages
      await this.delay(2000);
    }
    
    return allProducts;
  }

  private extractPrice(priceText: string): number {
    const match = priceText.match(/[\d,]+\.?\d*/);
    return match ? parseFloat(match[0].replace(/,/g, '')) : 0;
  }

  private extractRating(ratingText?: string): number {
    if (!ratingText) return 4.5;
    const match = ratingText.match(/(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 4.5;
  }

  private extractNumber(text?: string): number {
    if (!text) return 0;
    const match = text.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  private mapCategory(category: string): IndustrialProduct['category'] {
    const categoryMap: Record<string, IndustrialProduct['category']> = {
      'industrial-machinery': 'machinery',
      'electronic-components': 'electronics',
      'tools-hardware': 'tools',
      'automation-equipment': 'technology',
      'measurement-instruments': 'electronics',
      'safety-equipment': 'industrial',
      'drone-parts': 'technology',
      '3d-printer-parts': 'technology',
      'automotive-parts': 'machinery',
      'construction-machinery': 'machinery'
    };
    
    return categoryMap[category] || 'industrial';
  }

  private getOriginFromMarket(market: string): IndustrialProduct['origin'] {
    const originMap: Record<string, IndustrialProduct['origin']> = {
      'Alibaba': 'china',
      'Made-in-China': 'china',
      'Dubai Trade': 'dubai',
      'Turkey Export': 'turkey'
    };
    
    return originMap[market] || 'china';
  }

  private extractSpecifications($el: cheerio.Cheerio): Record<string, string> {
    const specs: Record<string, string> = {};
    
    const specSelector = this.config.searchSelectors.specifications || '.spec-item';
    $el.find(specSelector).each((index, specEl) => {
      const $spec = $el.constructor(specEl);
      const key = $spec.find('.spec-key').text().trim();
      const value = $spec.find('.spec-value').text().trim();
      
      if (key && value) {
        specs[key] = value;
      }
    });
    
    return specs;
  }

  private extractMinimumOrder($el: cheerio.Cheerio): number {
    const moqText = $el.find('.moq, .minimum-order').text();
    const match = moqText.match(/(\d+)/);
    return match ? parseInt(match[1]) : 1;
  }

  private extractLeadTime($el: cheerio.Cheerio): string {
    return $el.find('.lead-time, .delivery-time').text().trim() || '7-15 days';
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Fonction utilitaire pour scraper tous les marchés
export async function scrapeAllIndustrialMarkets(): Promise<IndustrialProduct[]> {
  const allProducts: IndustrialProduct[] = [];
  const markets = Object.keys(MARKET_CONFIGS);
  
  for (const market of markets) {
    try {
      console.log(`Starting scraping for market: ${market}`);
      const scraper = new IndustrialTechScraper(market);
      const products = await scraper.scrapeAllCategories(10);
      allProducts.push(...products);
      
      console.log(`Completed scraping for ${market}: ${products.length} products`);
    } catch (error) {
      console.error(`Error scraping market ${market}:`, error);
    }
  }
  
  return allProducts;
}

// Fonction pour sauvegarder les produits scrapés
export async function saveScrapedProducts(products: IndustrialProduct[]): Promise<void> {
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `data/scraped-industrial-products-${timestamp}.json`;
  
  await fs.writeFile(filename, JSON.stringify(products, null, 2));
  console.log(`Saved ${products.length} products to ${filename}`);
}

// Fonction pour mettre à jour le catalogue principal
export async function updateMainCatalog(products: IndustrialProduct[]): Promise<void> {
  try {
    const existingData = await fs.readFile('data/products.json', 'utf8');
    const catalog = JSON.parse(existingData);
    
    // Ajouter les nouveaux produits industriels
    const industrialProducts = products.map(p => ({
      ...p,
      id: `industrial-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }));
    
    catalog.products.push(...industrialProducts);
    
    // Mettre à jour les catégories
    const newCategories = [...new Set(products.map(p => p.category))];
    newCategories.forEach(cat => {
      if (!catalog.categories.find((c: any) => c.name === cat)) {
        catalog.categories.push({
          name: cat,
          icon: '🏭',
          description: `Produits industriels - ${cat}`
        });
      }
    });
    
    await fs.writeFile('data/products.json', JSON.stringify(catalog, null, 2));
    console.log(`Updated main catalog with ${products.length} industrial products`);
  } catch (error) {
    console.error('Error updating main catalog:', error);
  }
} 