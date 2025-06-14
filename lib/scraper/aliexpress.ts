import puppeteer from 'puppeteer';
import { translate } from '@google-cloud/translate';
import { createClient } from '@supabase/supabase-js';

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
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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