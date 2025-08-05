import { fallbackScraper, validateProductData, scoreAndSortProducts } from './fallback';
import { scrapeAliExpress } from './marketplaces/aliexpress';
import { scrapeEbay } from './marketplaces/ebay';
import { scrape1688 } from './1688';
import { scrapeTaobao, scrapeGoogleShopping } from './scraper';

// Interface pour les produits normalisés
export interface NormalizedProduct {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  url: string;
  source: string;
  rating?: number;
  reviews?: number;
  seller?: string;
  location?: string;
  shipping?: string;
  availability?: string;
  description?: string;
  category?: string;
  tags?: string[];
  score?: number;
  margin?: number;
  memberId?: string;
  shopName?: string;
}

// Interface pour les résultats de scraping
export interface ScrapingResult {
  keyword: string;
  totalProducts: number;
  products: NormalizedProduct[];
  sources: {
    [key: string]: {
      count: number;
      success: boolean;
      error?: string;
    };
  };
  timestamp: string;
  executionTime: number;
}

/**
 * 🧼 Normaliser les données de produits de différentes sources
 * @param data Données brutes
 * @param source Source des données
 * @returns Produits normalisés
 */
export function normalizeProductData(data: any[], source: string): NormalizedProduct[] {
  return data.map((item, index) => {
    // Extraire le prix et le normaliser
    const priceStr = item.price || item.current_price || item.salePrice || item.min_price || '0';
    const price = parseFloat(priceStr.replace(/[^\d.,]/g, '').replace(',', '.')) || 0;
    
    const originalPriceStr = item.originalPrice || item.original_price || item.max_price || item.retailPrice;
    const originalPrice = originalPriceStr ? parseFloat(originalPriceStr.replace(/[^\d.,]/g, '').replace(',', '.')) || 0 : undefined;
    
    return {
      id: item.id || item.item_id || `${source}_${Date.now()}_${index}`,
      title: item.title || item.name || item.product_name || 'Produit sans titre',
      price,
      originalPrice,
      image: item.image || item.thumbnail || item.imgUrl || item.pic_url || '/images/placeholder.jpg',
      url: item.url || item.link || item.product_url || item.detail_url || '#',
      source,
      rating: item.rating || item.score || item.star_rating,
      reviews: item.reviews || item.review_count || item.comment_count,
      seller: item.seller || item.store_name || item.company_name,
      location: item.location || item.province || item.country || 'International',
      shipping: item.shipping || item.freight || 'Livraison variable',
      availability: item.availability || item.stock || 'Disponible',
      description: item.description || item.desc || item.summary || '',
      category: item.category || item.cat_name || 'Général',
      tags: item.tags || [],
      memberId: item.memberId || item.member_id || item.seller_id,
      shopName: item.shopName || item.shop_name || item.company_name
    };
  });
}

/**
 * 🎯 Calculer les marges bénéficiaires selon la source
 * @param price Prix du produit
 * @param source Source du produit
 * @returns Marge calculée
 */
export function calculateProfitMargin(price: number, source: string): number {
  const margins = {
    'aliexpress': 0.25, // 25%
    'ebay': 0.20,       // 20%
    'amazon': 0.18,     // 18%
    'taobao': 0.30,     // 30%
    '1688': 0.35,       // 35%
    'google-shopping': 0.15, // 15%
    'apple': 0.40       // 40%
  };
  
  const marginRate = margins[source as keyof typeof margins] || 0.20;
  return Math.round(price * marginRate);
}

/**
 * 🚀 Fonction principale de scraping multi-sources avec fallback
 * @param keyword Mot-clé de recherche
 * @param limit Limite de produits par source
 * @param sources Sources à utiliser (si vide, utilise toutes)
 * @returns Résultats de scraping normalisés
 */
export async function scrapeAllSources(
  keyword: string, 
  limit: number = 20,
  sources: string[] = []
): Promise<ScrapingResult> {
  const startTime = Date.now();
  console.log(`🚀 Scraping Master: "${keyword}" (limite: ${limit})`);
  
  const result: ScrapingResult = {
    keyword,
    totalProducts: 0,
    products: [],
    sources: {},
    timestamp: new Date().toISOString(),
    executionTime: 0
  };
  
  // Définir les sources à utiliser
  const availableSources = sources.length > 0 ? sources : ['aliexpress', 'ebay', '1688', 'taobao', 'google-shopping'];
  
  // Scraper chaque source en parallèle
  const scrapingPromises = availableSources.map(async (source) => {
    try {
      console.log(`🔍 Démarrage scraping ${source}`);
      let products: any[] = [];
      
      switch (source) {
        case 'aliexpress':
          products = await scrapeAliExpress(keyword, limit);
          break;
          
        case 'ebay':
          products = await scrapeEbay(keyword, limit);
          break;
          
        case '1688':
          products = await scrape1688(keyword, limit);
          break;
          
        case 'taobao':
          try {
            const taobaoResult = await scrapeTaobao(keyword, limit);
            products = taobaoResult.data || [];
          } catch (error) {
            console.log(`❌ Taobao: ${error}`);
            products = [];
          }
          break;
          
        case 'google-shopping':
          try {
            const googleResult = await scrapeGoogleShopping(keyword, limit);
            products = googleResult.data || [];
          } catch (error) {
            console.log(`❌ Google Shopping: ${error}`);
            products = [];
          }
          break;
          
        default:
          console.log(`⚠️ Source inconnue: ${source}`);
          products = [];
      }
      
      // Normaliser les produits
      const normalizedProducts = normalizeProductData(products, source);
      
      // Ajouter les marges et scores
      const enrichedProducts = normalizedProducts.map(product => ({
        ...product,
        margin: calculateProfitMargin(product.price, source),
        score: product.score || 0
      }));
      
      result.sources[source] = {
        count: enrichedProducts.length,
        success: true
      };
      
      result.products.push(...enrichedProducts);
      
      console.log(`✅ ${source}: ${enrichedProducts.length} produits`);
      
    } catch (error: any) {
      console.error(`❌ ${source}: Erreur`, error.message);
      result.sources[source] = {
        count: 0,
        success: false,
        error: error.message
      };
    }
  });
  
  // Attendre que tous les scrapings soient terminés
  await Promise.allSettled(scrapingPromises);
  
  // Trier tous les produits par score
  result.products.sort((a, b) => (b.score || 0) - (a.score || 0));
  
  // Limiter le nombre total de produits
  result.products = result.products.slice(0, limit * 2);
  
  result.totalProducts = result.products.length;
  result.executionTime = Date.now() - startTime;
  
  console.log(`🎉 Scraping Master terminé: ${result.totalProducts} produits en ${result.executionTime}ms`);
  
  return result;
}

/**
 * 🔍 Scraper rapide avec une seule source (pour tests)
 * @param keyword Mot-clé de recherche
 * @param source Source à utiliser
 * @param limit Limite de produits
 */
export async function scrapeSingleSource(
  keyword: string,
  source: string,
  limit: number = 20
): Promise<NormalizedProduct[]> {
  console.log(`🔍 Scraping ${source}: "${keyword}"`);
  
  const result = await scrapeAllSources(keyword, limit, [source]);
  return result.products;
}

/**
 * 📊 Obtenir des statistiques sur toutes les sources disponibles
 */
export function getAllSourcesStats() {
  return {
    totalSources: 6,
    sources: {
      aliexpress: {
        name: 'AliExpress',
        description: 'Marketplace chinois - Prix compétitifs',
        margin: '25%',
        reliability: 'Haute (3 APIs de fallback)'
      },
      ebay: {
        name: 'eBay',
        description: 'Marketplace international - Neuf et occasion',
        margin: '20%',
        reliability: 'Haute (2 APIs de fallback)'
      },
      '1688': {
        name: '1688.com',
        description: 'B2B chinois - Gros volumes',
        margin: '35%',
        reliability: 'Moyenne (1 API + fallback)'
      },
      taobao: {
        name: 'Taobao',
        description: 'Marketplace chinois - Produits variés',
        margin: '30%',
        reliability: 'Moyenne (1 API)'
      },
      'google-shopping': {
        name: 'Google Shopping',
        description: 'Comparateur de prix',
        margin: '15%',
        reliability: 'Moyenne (1 API)'
      }
    },
    features: [
      'Fallback automatique entre APIs',
      'Normalisation des données',
      'Calcul automatique des marges',
      'Scoring intelligent des produits',
      'Gestion d\'erreurs robuste',
      'Parallélisation des requêtes'
    ]
  };
}

// Export par défaut pour compatibilité
export default {
  scrapeAllSources,
  scrapeSingleSource,
  normalizeProductData,
  calculateProfitMargin,
  getAllSourcesStats
}; 