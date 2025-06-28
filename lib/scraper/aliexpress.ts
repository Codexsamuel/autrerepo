import puppeteer from 'puppeteer';
import { translate } from '@google-cloud/translate';
import { supabase } from '@/lib/supabase/client';


// Types
interface Product {
  id: string;
  title: string;
  originalTitle: string;
  priceCNY: number;
  priceFCFA: number;
  imageUrl: string;
  productUrl: string;
  source: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  createdAt: string;
}

// Configuration
const EXCHANGE_RATE = 95; // 1 CNY = 95 FCFA
const MARGIN_RATE = 2.5; // 250% de marge

// Initialisation des clients
const translateClient = new translate.TranslationServiceClient();
const supabase = supabase;

export async function scrapeAliExpress(keyword: string): Promise<Product[]> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Configuration du viewport
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Navigation vers AliExpress
    await page.goto(`https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(keyword)}`, {
      waitUntil: 'networkidle0',
      timeout: 60000
    });

    // Attendre le chargement des produits
    await page.waitForSelector('.manhattan--container--1lP57Ag', { timeout: 30000 });

    // Extraction des données
    const products = await page.evaluate(() => {
      const items = document.querySelectorAll('.manhattan--container--1lP57Ag');
      return Array.from(items).map(item => {
        const title = item.querySelector('a > h1, a > h2, a > span')?.textContent?.trim() || '';
        const priceText = item.querySelector('.manhattan--price-sale--1CCSZfK span')?.textContent || '';
        const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
        const image = item.querySelector('img')?.getAttribute('src') || '';
        const link = 'https:' + (item.querySelector('a')?.getAttribute('href') || '');
        const rating = parseFloat(item.querySelector('.manhattan--rating--1lP57Ag')?.textContent || '0');
        const reviews = parseInt(item.querySelector('.manhattan--review--1lP57Ag')?.textContent?.replace(/[^\d]/g, '') || '0');
        const deliveryTime = item.querySelector('.manhattan--delivery--1lP57Ag')?.textContent?.trim() || '15-20 jours';

        return {
          title,
          price,
          image,
          link,
          rating,
          reviews,
          deliveryTime
        };
      });
    });

    // Traduction et enrichissement des données
    const enrichedProducts = await Promise.all(
      products.map(async (product) => {
        // Traduction du titre
        const [translation] = await translateClient.translateText({
          parent: `projects/${process.env.GOOGLE_CLOUD_PROJECT}/locations/global`,
          contents: [product.title],
          mimeType: 'text/plain',
          targetLanguageCode: 'fr',
        });

        const translatedTitle = translation.translations[0].translatedText;

        // Calcul du prix en FCFA avec marge
        const priceFCFA = Math.round(product.price * EXCHANGE_RATE * MARGIN_RATE);

        return {
          id: crypto.randomUUID(),
          title: translatedTitle,
          originalTitle: product.title,
          priceCNY: product.price,
          priceFCFA,
          imageUrl: product.image,
          productUrl: product.link,
          source: 'AliExpress',
          rating: product.rating,
          reviews: product.reviews,
          deliveryTime: product.deliveryTime,
          createdAt: new Date().toISOString()
        };
      })
    );

    // Sauvegarde dans Supabase
    const { data, error } = await supabase
      .from('products')
      .upsert(enrichedProducts, {
        onConflict: 'productUrl'
      });

    if (error) {
      console.error('Erreur lors de la sauvegarde dans Supabase:', error);
    }

    return enrichedProducts;
  } catch (error) {
    console.error('Erreur lors du scraping:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

// Fonction pour exécuter le scraping périodiquement
export async function startPeriodicScraping() {
  const keywords = [
    'smartphone',
    'laptop',
    'watch',
    'camera',
    'headphones',
    'tablet',
    'gaming',
    'fashion',
    'beauty',
    'home'
  ];

  for (const keyword of keywords) {
    try {
      console.log(`Scraping des produits pour le mot-clé: ${keyword}`);
      await scrapeAliExpress(keyword);
      // Attendre 5 secondes entre chaque mot-clé pour éviter d'être bloqué
      await new Promise(resolve => setTimeout(resolve, 5000));
    } catch (error) {
      console.error(`Erreur lors du scraping pour ${keyword}:`, error);
    }
  }
}

export interface ProductData {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  sellerName: string;
  shippingInfo: string;
  url: string;
  category: string;
  tags: string[];
}

export interface ScrapingOptions {
  maxProducts?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price' | 'rating' | 'sales' | 'newest';
  language?: 'en' | 'fr' | 'es';
}

export class AliExpressScraper {
  private browser: puppeteer.Browser | null = null;

  async initialize(): Promise<void> {
    try {
      this.browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu'
        ]
      });
    } catch (error) {
      console.error('Erreur initialisation browser:', error);
      throw new Error('Impossible d\'initialiser le navigateur');
    }
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  async searchProducts(
    query: string,
    options: ScrapingOptions = {}
  ): Promise<ProductData[]> {
    if (!this.browser) {
      await this.initialize();
    }

    const page = await this.browser!.newPage();
    const products: ProductData[] = [];

    try {
      // Configuration de la page
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      await page.setViewport({ width: 1920, height: 1080 });

      // Construction de l'URL de recherche
      const searchUrl = this.buildSearchUrl(query, options);
      console.log('URL de recherche:', searchUrl);

      await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 30000 });

      // Attendre le chargement des produits
      await page.waitForSelector('[data-product-id]', { timeout: 10000 });

      // Extraire les données des produits
      const productElements = await page.$$('[data-product-id]');
      const maxProducts = options.maxProducts || 20;

      for (let i = 0; i < Math.min(productElements.length, maxProducts); i++) {
        try {
          const productData = await this.extractProductData(productElements[i]);
          if (productData) {
            products.push(productData);
          }
        } catch (error) {
          console.error(`Erreur extraction produit ${i}:`, error);
        }
      }

    } catch (error) {
      console.error('Erreur scraping AliExpress:', error);
      throw new Error('Échec du scraping AliExpress');
    } finally {
      await page.close();
    }

    return products;
  }

  private buildSearchUrl(query: string, options: ScrapingOptions): string {
    const baseUrl = 'https://www.aliexpress.com/wholesale';
    const params = new URLSearchParams();

    // Paramètres de base
    params.append('SearchText', encodeURIComponent(query));
    params.append('catId', '0');
    params.append('initiative_id', 'SB_20231201000000');

    // Filtres de prix
    if (options.minPrice) {
      params.append('minPrice', options.minPrice.toString());
    }
    if (options.maxPrice) {
      params.append('maxPrice', options.maxPrice.toString());
    }

    // Tri
    if (options.sortBy) {
      const sortMap = {
        'price': 'price_asc',
        'rating': 'rating_desc',
        'sales': 'sales_desc',
        'newest': 'newest_desc'
      };
      params.append('sortType', sortMap[options.sortBy]);
    }

    // Catégorie
    if (options.category) {
      params.append('catId', this.getCategoryId(options.category));
    }

    return `${baseUrl}?${params.toString()}`;
  }

  private async extractProductData(element: puppeteer.ElementHandle): Promise<ProductData | null> {
    try {
      const productId = await element.evaluate(el => el.getAttribute('data-product-id'));
      if (!productId) return null;

      const title = await element.$eval('.product-title', el => el.textContent?.trim()) || '';
      const priceText = await element.$eval('.product-price', el => el.textContent?.trim()) || '';
      const originalPriceText = await element.$eval('.product-original-price', el => el.textContent?.trim()) || '';
      const ratingText = await element.$eval('.product-rating', el => el.textContent?.trim()) || '0';
      const reviewCountText = await element.$eval('.product-review-count', el => el.textContent?.trim()) || '0';
      const imageUrl = await element.$eval('.product-image img', el => el.getAttribute('src')) || '';
      const sellerName = await element.$eval('.product-seller', el => el.textContent?.trim()) || '';
      const shippingInfo = await element.$eval('.product-shipping', el => el.textContent?.trim()) || '';
      const url = await element.$eval('a', el => el.getAttribute('href')) || '';

      // Nettoyage et parsing des données
      const price = this.parsePrice(priceText);
      const originalPrice = originalPriceText ? this.parsePrice(originalPriceText) : undefined;
      const rating = parseFloat(ratingText) || 0;
      const reviewCount = parseInt(reviewCountText.replace(/[^\d]/g, '')) || 0;

      return {
        id: productId,
        title,
        price,
        originalPrice,
        currency: 'USD',
        rating,
        reviewCount,
        imageUrl,
        sellerName,
        shippingInfo,
        url: url.startsWith('http') ? url : `https://www.aliexpress.com${url}`,
        category: '',
        tags: []
      };

    } catch (error) {
      console.error('Erreur extraction données produit:', error);
      return null;
    }
  }

  private parsePrice(priceText: string): number {
    const cleaned = priceText.replace(/[^\d.,]/g, '');
    const price = parseFloat(cleaned.replace(',', '.'));
    return isNaN(price) ? 0 : price;
  }

  private getCategoryId(category: string): string {
    const categoryMap: Record<string, string> = {
      'electronics': '509',
      'clothing': '3',
      'home': '15',
      'beauty': '18',
      'sports': '26',
      'automotive': '34',
      'toys': '44',
      'jewelry': '62'
    };
    return categoryMap[category.toLowerCase()] || '0';
  }

  async getProductDetails(productUrl: string): Promise<ProductData | null> {
    if (!this.browser) {
      await this.initialize();
    }

    const page = await this.browser!.newPage();

    try {
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      await page.goto(productUrl, { waitUntil: 'networkidle2', timeout: 30000 });

      // Extraire les détails complets du produit
      const productData = await page.evaluate(() => {
        const title = document.querySelector('.product-title')?.textContent?.trim() || '';
        const priceText = document.querySelector('.product-price')?.textContent?.trim() || '';
        const originalPriceText = document.querySelector('.product-original-price')?.textContent?.trim() || '';
        const ratingText = document.querySelector('.product-rating')?.textContent?.trim() || '0';
        const reviewCountText = document.querySelector('.product-review-count')?.textContent?.trim() || '0';
        const imageUrl = document.querySelector('.product-image img')?.getAttribute('src') || '';
        const sellerName = document.querySelector('.product-seller')?.textContent?.trim() || '';
        const shippingInfo = document.querySelector('.product-shipping')?.textContent?.trim() || '';
        const category = document.querySelector('.product-category')?.textContent?.trim() || '';
        const tags = Array.from(document.querySelectorAll('.product-tags .tag')).map(tag => tag.textContent?.trim()).filter(Boolean);

        return {
          title,
          priceText,
          originalPriceText,
          ratingText,
          reviewCountText,
          imageUrl,
          sellerName,
          shippingInfo,
          category,
          tags
        };
      });

      // Parsing des données
      const price = this.parsePrice(productData.priceText);
      const originalPrice = productData.originalPriceText ? this.parsePrice(productData.originalPriceText) : undefined;
      const rating = parseFloat(productData.ratingText) || 0;
      const reviewCount = parseInt(productData.reviewCountText.replace(/[^\d]/g, '')) || 0;

      return {
        id: new URL(productUrl).pathname.split('/').pop() || '',
        title: productData.title,
        price,
        originalPrice,
        currency: 'USD',
        rating,
        reviewCount,
        imageUrl: productData.imageUrl,
        sellerName: productData.sellerName,
        shippingInfo: productData.shippingInfo,
        url: productUrl,
        category: productData.category,
        tags: productData.tags
      };

    } catch (error) {
      console.error('Erreur récupération détails produit:', error);
      return null;
    } finally {
      await page.close();
    }
  }

  async getPriceHistory(productId: string, days: number = 30): Promise<Array<{ date: string; price: number }>> {
    // Simulation de l'historique des prix
    // En réalité, cela nécessiterait une base de données ou un service tiers
    const history = [];
    const today = new Date();

    for (let i = days; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      history.push({
        date: date.toISOString().split('T')[0],
        price: Math.random() * 100 + 10 // Prix simulé
      });
    }

    return history;
  }

  async getSimilarProducts(productId: string, limit: number = 10): Promise<ProductData[]> {
    // Simulation de produits similaires
    // En réalité, cela utiliserait l'API d'AliExpress ou des recommandations
    return [];
  }
}

export default AliExpressScraper; 