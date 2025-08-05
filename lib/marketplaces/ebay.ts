import { makeRapidAPIRequest, validateProductData, scoreAndSortProducts } from '../fallback';

const RAPID_API_KEY = process.env.RAPIDAPI_KEY || '0a9f369c5emsh0c62e1fe4db2cd4p1a5adbjsn05a8f9f14d02';

// Configuration des hosts eBay
const EBAY_HOSTS = {
  ebay32: 'ebay32.p.rapidapi.com',
  ebaySearch: 'ebay-search-result.p.rapidapi.com'
};

/**
 * 🔍 Recherche eBay via ebay32 (API principale)
 * @param keyword Mot-clé de recherche
 * @param country Pays (défaut: germany)
 * @param countryCode Code pays (défaut: de)
 * @param page Page (défaut: 1)
 * @param limit Limite de produits (défaut: 20)
 */
export async function searchEbay32(
  keyword: string, 
  country: string = 'germany', 
  countryCode: string = 'de',
  page: number = 1,
  limit: number = 20
): Promise<any[]> {
  try {
    console.log(`🔍 eBay32: Recherche "${keyword}" (${country}/${countryCode})`);
    
    const endpoint = `/search/${encodeURIComponent(keyword)}`;
    const params = {
      page,
      country,
      country_code: countryCode,
      limit
    };
    
    const data = await makeRapidAPIRequest(EBAY_HOSTS.ebay32, endpoint, params);
    
    if (!data || !data.data) {
      console.log(`⚠️ eBay32: Aucune donnée reçue`);
      return [];
    }
    
    const products = validateProductData(data.data, 'ebay32');
    console.log(`✅ eBay32: ${products.length} produits validés`);
    
    return products;
    
  } catch (error: any) {
    console.error(`❌ eBay32: Erreur`, error.message);
    throw error;
  }
}

/**
 * 🔍 Recherche eBay via ebay-search-result (fallback)
 * @param keyword Mot-clé de recherche
 * @param limit Limite de produits (défaut: 20)
 */
export async function searchEbayBasic(
  keyword: string, 
  limit: number = 20
): Promise<any[]> {
  try {
    console.log(`🔍 eBay Basic: Recherche "${keyword}"`);
    
    const endpoint = `/search/${encodeURIComponent(keyword)}`;
    const params = { limit };
    
    const data = await makeRapidAPIRequest(EBAY_HOSTS.ebaySearch, endpoint, params);
    
    if (!data || !data.data) {
      console.log(`⚠️ eBay Basic: Aucune donnée reçue`);
      return [];
    }
    
    const products = validateProductData(data.data, 'ebay-basic');
    console.log(`✅ eBay Basic: ${products.length} produits validés`);
    
    return products;
    
  } catch (error: any) {
    console.error(`❌ eBay Basic: Erreur`, error.message);
    throw error;
  }
}

/**
 * 📦 Obtenir les détails d'un produit eBay par ID
 * @param productId ID du produit eBay
 * @param country Pays (défaut: germany)
 * @param countryCode Code pays (défaut: de)
 */
export async function getEbayProductDetails(
  productId: string,
  country: string = 'germany',
  countryCode: string = 'de'
): Promise<any> {
  try {
    console.log(`📦 eBay: Détails produit ${productId}`);
    
    const endpoint = `/product/${productId}`;
    const params = {
      country,
      country_code: countryCode
    };
    
    const data = await makeRapidAPIRequest(EBAY_HOSTS.ebay32, endpoint, params);
    
    if (!data) {
      console.log(`⚠️ eBay: Aucun détail reçu pour ${productId}`);
      return null;
    }
    
    console.log(`✅ eBay: Détails récupérés pour ${productId}`);
    return data;
    
  } catch (error: any) {
    console.error(`❌ eBay: Erreur détails ${productId}`, error.message);
    throw error;
  }
}

/**
 * 🌍 Recherche eBay multi-pays
 * @param keyword Mot-clé de recherche
 * @param countries Liste des pays à tester
 * @param limit Limite par pays
 */
export async function searchEbayMultiCountry(
  keyword: string,
  countries: Array<{name: string, code: string}> = [
    { name: 'germany', code: 'de' },
    { name: 'france', code: 'fr' },
    { name: 'usa', code: 'us' },
    { name: 'cameroun', code: 'cm' }
  ],
  limit: number = 10
): Promise<any[]> {
  console.log(`🌍 eBay Multi-pays: Recherche "${keyword}" dans ${countries.length} pays`);
  
  const allProducts: any[] = [];
  
  for (const country of countries) {
    try {
      const products = await searchEbay32(keyword, country.name, country.code, 1, limit);
      allProducts.push(...products);
      console.log(`✅ ${country.name}: ${products.length} produits`);
    } catch (error) {
      console.log(`❌ ${country.name}: Échec, passage au suivant`);
    }
  }
  
  console.log(`🌍 eBay Multi-pays: Total ${allProducts.length} produits`);
  return allProducts;
}

/**
 * 🎯 Fonction principale eBay avec fallback automatique
 * @param keyword Mot-clé de recherche
 * @param limit Limite de produits
 * @param useMultiCountry Utiliser la recherche multi-pays
 */
export async function scrapeEbay(
  keyword: string, 
  limit: number = 20,
  useMultiCountry: boolean = false
): Promise<any[]> {
  console.log(`🚀 eBay Scraping: "${keyword}" (limite: ${limit})`);
  
  try {
    let products: any[] = [];
    
    if (useMultiCountry) {
      // Essayer la recherche multi-pays
      products = await searchEbayMultiCountry(keyword, undefined, Math.ceil(limit / 4));
    } else {
      // Essayer ebay32 d'abord, puis ebay-search-result
      try {
        products = await searchEbay32(keyword, 'germany', 'de', 1, limit);
      } catch (error) {
        console.log(`🔧 eBay32 échoué, essai ebay-search-result`);
        products = await searchEbayBasic(keyword, limit);
      }
    }
    
    if (products.length === 0) {
      console.log(`⚠️ eBay: Aucun produit trouvé, essai fallback`);
      
      // Dernier essai avec ebay-search-result
      try {
        products = await searchEbayBasic(keyword, limit);
      } catch (error) {
        console.log(`❌ eBay: Tous les fallbacks ont échoué`);
        return [];
      }
    }
    
    // Scorer et trier les produits
    const scoredProducts = scoreAndSortProducts(products, 'ebay');
    
    console.log(`✅ eBay: ${scoredProducts.length} produits finaux`);
    return scoredProducts;
    
  } catch (error: any) {
    console.error(`❌ eBay Scraping: Erreur finale`, error.message);
    return [];
  }
}

/**
 * 📊 Obtenir des statistiques sur les recherches eBay
 */
export function getEbayStats() {
  return {
    source: 'ebay',
    name: 'eBay',
    description: 'Marketplace international - Produits neufs et d\'occasion',
    features: [
      'Recherche par mot-clé',
      'Recherche multi-pays',
      'Détails produits par ID',
      'Fallback automatique entre APIs',
      'Scoring et tri intelligent'
    ],
    supportedCountries: [
      { name: 'Allemagne', code: 'de' },
      { name: 'France', code: 'fr' },
      { name: 'USA', code: 'us' },
      { name: 'Cameroun', code: 'cm' }
    ],
    supportedOperations: [
      'searchEbay32',
      'searchEbayBasic',
      'getEbayProductDetails',
      'searchEbayMultiCountry',
      'scrapeEbay'
    ]
  };
}

// Export par défaut pour compatibilité
export default {
  scrapeEbay,
  searchEbay32,
  searchEbayBasic,
  getEbayProductDetails,
  searchEbayMultiCountry,
  getEbayStats
}; 