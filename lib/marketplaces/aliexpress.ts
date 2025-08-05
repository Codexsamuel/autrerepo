import { makeRapidAPIRequest, scoreAndSortProducts, validateProductData } from '../fallback';

const RAPID_API_KEY = process.env.RAPIDAPI_KEY || '0a9f369c5emsh0c62e1fe4db2cd4p1a5adbjsn05a8f9f14d02';

// Configuration des hosts AliExpress
const ALIEXPRESS_HOSTS = {
  unofficial: 'aliexpress-unofficial.p.rapidapi.com',
  free: 'free-aliexpress-api.p.rapidapi.com',
  search1: 'aliexpress-search1.p.rapidapi.com'
};

/**
 * 🔍 Recherche AliExpress via aliexpress-unofficial (API principale)
 * @param keyword Mot-clé de recherche
 * @param limit Limite de produits (défaut: 20)
 */
export async function searchAliExpressUnofficial(
  keyword: string, 
  limit: number = 20
): Promise<any[]> {
  try {
    console.log(`🔍 AliExpress Unofficial: Recherche "${keyword}"`);
    
    const endpoint = `/search`;
    const params = {
      q: keyword,
      limit
    };
    
    const data = await makeRapidAPIRequest(ALIEXPRESS_HOSTS.unofficial, endpoint, params);
    
    if (!data || !data.data) {
      console.log(`⚠️ AliExpress Unofficial: Aucune donnée reçue`);
      return [];
    }
    
    const products = validateProductData(data.data, 'aliexpress-unofficial');
    console.log(`✅ AliExpress Unofficial: ${products.length} produits validés`);
    
    return products;
    
  } catch (error: any) {
    console.error(`❌ AliExpress Unofficial: Erreur`, error.message);
    throw error;
  }
}

/**
 * 🔍 Recherche AliExpress via free-aliexpress-api (fallback 1)
 * @param keyword Mot-clé de recherche
 * @param limit Limite de produits (défaut: 20)
 */
export async function searchAliExpressFree(
  keyword: string, 
  limit: number = 20
): Promise<any[]> {
  try {
    console.log(`🔍 AliExpress Free: Recherche "${keyword}"`);
    
    const endpoint = `/search`;
    const params = {
      query: keyword,
      limit
    };
    
    const data = await makeRapidAPIRequest(ALIEXPRESS_HOSTS.free, endpoint, params);
    
    if (!data || !data.data) {
      console.log(`⚠️ AliExpress Free: Aucune donnée reçue`);
      return [];
    }
    
    const products = validateProductData(data.data, 'aliexpress-free');
    console.log(`✅ AliExpress Free: ${products.length} produits validés`);
    
    return products;
    
  } catch (error: any) {
    console.error(`❌ AliExpress Free: Erreur`, error.message);
    throw error;
  }
}

/**
 * 🔍 Recherche AliExpress via aliexpress-search1 (fallback 2)
 * @param keyword Mot-clé de recherche
 * @param limit Limite de produits (défaut: 20)
 */
export async function searchAliExpressSearch1(
  keyword: string, 
  limit: number = 20
): Promise<any[]> {
  try {
    console.log(`🔍 AliExpress Search1: Recherche "${keyword}"`);
    
    const endpoint = `/`;
    const params = {
      name: keyword,
      limit
    };
    
    const data = await makeRapidAPIRequest(ALIEXPRESS_HOSTS.search1, endpoint, params);
    
    if (!data || !data.data) {
      console.log(`⚠️ AliExpress Search1: Aucune donnée reçue`);
      return [];
    }
    
    const products = validateProductData(data.data, 'aliexpress-search1');
    console.log(`✅ AliExpress Search1: ${products.length} produits validés`);
    
    return products;
    
  } catch (error: any) {
    console.error(`❌ AliExpress Search1: Erreur`, error.message);
    throw error;
  }
}

/**
 * 📦 Obtenir les détails d'un produit AliExpress par ID
 * @param productId ID du produit AliExpress
 */
export async function getAliExpressProductDetails(productId: string): Promise<any> {
  try {
    console.log(`📦 AliExpress: Détails produit ${productId}`);
    
    const endpoint = `/product/${productId}`;
    const data = await makeRapidAPIRequest(ALIEXPRESS_HOSTS.unofficial, endpoint);
    
    if (!data) {
      console.log(`⚠️ AliExpress: Aucun détail reçu pour ${productId}`);
      return null;
    }
    
    console.log(`✅ AliExpress: Détails récupérés pour ${productId}`);
    return data;
    
  } catch (error: any) {
    console.error(`❌ AliExpress: Erreur détails ${productId}`, error.message);
    throw error;
  }
}

/**
 * 📂 Obtenir les catégories AliExpress
 */
export async function getAliExpressCategories(): Promise<string[]> {
  try {
    console.log(`📂 AliExpress: Récupération des catégories`);
    
    const endpoint = `/categories`;
    const data = await makeRapidAPIRequest(ALIEXPRESS_HOSTS.unofficial, endpoint);
    
    if (!data || !Array.isArray(data)) {
      console.log(`⚠️ AliExpress: Aucune catégorie reçue`);
      return [];
    }
    
    console.log(`✅ AliExpress: ${data.length} catégories récupérées`);
    return data;
    
  } catch (error: any) {
    console.error(`❌ AliExpress: Erreur catégories`, error.message);
    return [];
  }
}

/**
 * 🔍 Recherche par catégorie AliExpress
 * @param categoryId ID de la catégorie
 * @param limit Limite de produits (défaut: 20)
 */
export async function searchAliExpressByCategory(
  categoryId: string, 
  limit: number = 20
): Promise<any[]> {
  try {
    console.log(`🔍 AliExpress: Recherche par catégorie ${categoryId}`);
    
    const endpoint = `/category/${categoryId}`;
    const params = { limit };
    
    const data = await makeRapidAPIRequest(ALIEXPRESS_HOSTS.unofficial, endpoint, params);
    
    if (!data || !data.data) {
      console.log(`⚠️ AliExpress: Aucun produit dans la catégorie ${categoryId}`);
      return [];
    }
    
    const products = validateProductData(data.data, 'aliexpress-category');
    console.log(`✅ AliExpress: ${products.length} produits dans la catégorie ${categoryId}`);
    
    return products;
    
  } catch (error: any) {
    console.error(`❌ AliExpress: Erreur catégorie ${categoryId}`, error.message);
    throw error;
  }
}

/**
 * 🎯 Fonction principale AliExpress avec fallback automatique
 * @param keyword Mot-clé de recherche
 * @param limit Limite de produits
 */
export async function scrapeAliExpress(
  keyword: string, 
  limit: number = 20
): Promise<any[]> {
  console.log(`🚀 AliExpress Scraping: "${keyword}" (limite: ${limit})`);
  
  try {
    let products: any[] = [];
    
    // Essayer les APIs dans l'ordre de priorité
    const apis = [
      { name: 'Unofficial', fn: () => searchAliExpressUnofficial(keyword, limit) },
      { name: 'Free', fn: () => searchAliExpressFree(keyword, limit) },
      { name: 'Search1', fn: () => searchAliExpressSearch1(keyword, limit) }
    ];
    
    for (const api of apis) {
      try {
        console.log(`🔍 Essai AliExpress ${api.name}`);
        products = await api.fn();
        
        if (products.length > 0) {
          console.log(`✅ AliExpress ${api.name}: ${products.length} produits trouvés`);
          break;
        }
      } catch (error) {
        console.log(`❌ AliExpress ${api.name}: Échec, passage au suivant`);
      }
    }
    
    if (products.length === 0) {
      console.log(`❌ AliExpress: Tous les APIs ont échoué`);
      return [];
    }
    
    // Scorer et trier les produits
    const scoredProducts = scoreAndSortProducts(products, 'aliexpress');
    
    console.log(`✅ AliExpress: ${scoredProducts.length} produits finaux`);
    return scoredProducts;
    
  } catch (error: any) {
    console.error(`❌ AliExpress Scraping: Erreur finale`, error.message);
    return [];
  }
}

/**
 * 📊 Obtenir des statistiques sur les recherches AliExpress
 */
export function getAliExpressStats() {
  return {
    source: 'aliexpress',
    name: 'AliExpress',
    description: 'Marketplace chinois - Produits à prix compétitifs',
    features: [
      'Recherche par mot-clé',
      'Recherche par catégorie',
      'Détails produits par ID',
      'Fallback automatique entre 3 APIs',
      'Scoring et tri intelligent',
      'Catégories disponibles'
    ],
    supportedOperations: [
      'searchAliExpressUnofficial',
      'searchAliExpressFree',
      'searchAliExpressSearch1',
      'getAliExpressProductDetails',
      'getAliExpressCategories',
      'searchAliExpressByCategory',
      'scrapeAliExpress'
    ],
    apis: [
      'aliexpress-unofficial.p.rapidapi.com',
      'free-aliexpress-api.p.rapidapi.com',
      'aliexpress-search1.p.rapidapi.com'
    ]
  };
}

// Export par défaut pour compatibilité
export default {
  scrapeAliExpress,
  searchAliExpressUnofficial,
  searchAliExpressFree,
  searchAliExpressSearch1,
  getAliExpressProductDetails,
  getAliExpressCategories,
  searchAliExpressByCategory,
  getAliExpressStats
}; 