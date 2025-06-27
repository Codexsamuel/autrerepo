import puppeteer from 'puppeteer';
import { TranslationServiceClient } from '@google-cloud/translate';
import { createClient } from '@supabase/supabase-js';
import cron from 'node-cron';
import { config } from './config';


// Initialisation des clients
const supabase = createClient(config.supabase.url, config.supabase.key);
const translate = new TranslationServiceClient();

interface Product {
  id: string;
  title: string;
  priceCNY: number;
  priceFCFA: number;
  imageUrl: string;
  source: string;
  deliveryTime: string;
  rating: number;
}

async function translateText(text: string): Promise<string> {
  try {
    const [translation] = await translate.translateText({
      contents: [text],
      targetLanguageCode: 'fr'
    });
    
    if (!translation?.translations?.[0]?.translatedText) {
      return text;
    }
    
    return translation.translations[0].translatedText;
  } catch (error) {
    console.error('Erreur de traduction:', error);
    return text;
  }
}

async function scrapeProduct(url: string): Promise<Product | null> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent(config.scraper.userAgent);
    await page.setDefaultTimeout(config.scraper.timeout);

    // Tentatives de chargement de la page
    let attempts = 0;
    while (attempts < config.scraper.retryAttempts) {
      try {
        await page.goto(url, { waitUntil: 'networkidle0' });
        break;
      } catch (error) {
        attempts++;
        if (attempts === config.scraper.retryAttempts) {
          throw error;
        }
        await new Promise(resolve => setTimeout(resolve, config.scraper.retryDelay));
      }
    }

    // Extraction des données
    const productData = await page.evaluate(() => {
      const title = document.querySelector('.product-title')?.textContent?.trim() || '';
      const priceElement = document.querySelector('.product-price-value');
      const priceCNY = priceElement ? parseFloat(priceElement.textContent?.replace(/[^0-9.]/g, '') || '0') : 0;
      const imageUrl = document.querySelector('.magnifier-image')?.getAttribute('src') || '';
      const deliveryTime = document.querySelector('.delivery-time')?.textContent?.trim() || '';
      const ratingElement = document.querySelector('.overview-rating-average');
      const rating = ratingElement ? parseFloat(ratingElement.textContent?.replace(/[^0-9.]/g, '') || '0') : 0;

      return {
        title,
        priceCNY,
        imageUrl,
        deliveryTime,
        rating
      };
    });

    // Traduction du titre
    const translatedTitle = await translateText(productData.title);

    // Conversion du prix en FCFA (taux approximatif)
    const priceFCFA = productData.priceCNY * 85; // 1 CNY ≈ 85 FCFA

    const product: Product = {
      id: url.split('/').pop() || '',
      title: translatedTitle,
      priceCNY: productData.priceCNY,
      priceFCFA,
      imageUrl: productData.imageUrl,
      source: 'AliExpress',
      deliveryTime: productData.deliveryTime,
      rating: productData.rating
    };

    return product;
  } catch (error) {
    console.error('Erreur lors du scraping:', error);
    return null;
  } finally {
    await browser.close();
  }
}

async function saveProduct(product: Product) {
  try {
    const { data, error } = await supabase
      .from('products')
      .upsert([product], { onConflict: 'id' });

    if (error) throw error;
    console.log('Produit sauvegardé:', product.title);
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
  }
}

// Liste des URLs à scraper
const productUrls = [
  'https://fr.aliexpress.com/item/1005005059598985.html', // Exemple de produit de mode
  'https://fr.aliexpress.com/item/1005005059598986.html', // Exemple de produit de beauté
  'https://fr.aliexpress.com/item/1005005059598987.html', // Exemple de produit électronique
  'https://fr.aliexpress.com/item/1005005059598988.html', // Exemple de produit de maison
  'https://fr.aliexpress.com/item/1005005059598989.html'  // Exemple de produit de sport
];

// Fonction principale de scraping
async function runScraper() {
  console.log('Démarrage du scraping...');
  
  for (const url of productUrls) {
    const product = await scrapeProduct(url);
    if (product) {
      await saveProduct(product);
    }
  }
  
  console.log('Scraping terminé');
}

// Planification du scraping
cron.schedule(`*/${config.scraper.interval / 3600000} * * * *`, () => {
  console.log('Exécution du scraping programmé');
  runScraper();
});

// Exécution initiale
runScraper(); 