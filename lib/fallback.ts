import axios from 'axios';

const RAPID_API_KEY = process.env.RAPIDAPI_KEY || '0a9f369c5emsh0c62e1fe4db2cd4p1a5adbjsn05a8f9f14d02';

// Configuration des timeouts et retries
const API_TIMEOUT = parseInt(process.env.API_TIMEOUT_MS || '15000');
const FALLBACK_RETRY_DELAY = parseInt(process.env.FALLBACK_RETRY_DELAY_MS || '2000');

/**
 * 🔁 Système de fallback robuste pour garantir des données réelles
 * @param scrapers Array de fonctions de scraping à essayer en cascade
 * @returns Données du premier scraper qui fonctionne
 */
export async function fallbackScraper(...scrapers: (() => Promise<any>)[]): Promise<any[]> {
  console.log(`🔄 Fallback: ${scrapers.length} sources à tester`);
  
  for (let i = 0; i < scrapers.length; i++) {
    const scraper = scrapers[i];
    const scraperName = scraper.name || `Scraper_${i + 1}`;
    
    try {
      console.log(`🔍 Test ${i + 1}/${scrapers.length}: ${scraperName}`);
      
      const result = await scraper();
      
      // Vérifier que le résultat est valide
      if (result && Array.isArray(result) && result.length > 0) {
        console.log(`✅ ${scraperName}: ${result.length} produits trouvés`);
        return result;
      } else {
        console.log(`⚠️ ${scraperName}: Aucun produit valide`);
      }
      
    } catch (error: any) {
      const status = error?.response?.status;
      const message = error?.message || 'Erreur inconnue';
      
      console.log(`❌ ${scraperName}: ${status ? `HTTP ${status}` : message}`);
      
      // Gérer les erreurs spécifiques
      if (status === 403) {
        console.log(`🔧 ${scraperName}: API non abonnée, passage au suivant`);
      } else if (status === 429) {
        console.log(`⏳ ${scraperName}: Rate limit atteint, passage au suivant`);
      } else if (status >= 500) {
        console.log(`🔧 ${scraperName}: Erreur serveur, passage au suivant`);
      } else {
        console.log(`🔧 ${scraperName}: Erreur ${status}, passage au suivant`);
      }
      
      // Attendre avant le prochain essai (sauf pour le dernier)
      if (i < scrapers.length - 1) {
        await new Promise(resolve => setTimeout(resolve, FALLBACK_RETRY_DELAY));
      }
    }
  }
  
  console.log(`❌ Tous les scrapers ont échoué`);
  return [];
}

/**
 * 🔧 Fonction utilitaire pour faire des requêtes RapidAPI avec gestion d'erreurs
 * @param host Host RapidAPI
 * @param endpoint Endpoint à appeler
 * @param params Paramètres de requête
 * @param method Méthode HTTP (GET par défaut)
 * @returns Données de l'API ou null en cas d'erreur
 */
export async function makeRapidAPIRequest(
  host: string, 
  endpoint: string, 
  params: Record<string, any> = {},
  method: 'GET' | 'POST' = 'GET'
): Promise<any> {
  try {
    const url = `https://${host}${endpoint}`;
    
    const config = {
      method,
      url,
      headers: {
        'x-rapidapi-host': host,
        'x-rapidapi-key': RAPID_API_KEY,
        ...(method === 'POST' && { 'Content-Type': 'application/x-www-form-urlencoded' })
      },
      params: method === 'GET' ? params : undefined,
      data: method === 'POST' ? params : undefined,
      timeout: API_TIMEOUT
    };

    const response = await axios(config);
    return response.data;
    
  } catch (error: any) {
    const status = error?.response?.status;
    const message = error?.message || 'Erreur inconnue';
    
    console.error(`❌ API ${host}${endpoint}: ${status ? `HTTP ${status}` : message}`);
    
    // Remonter l'erreur pour que le fallback puisse la gérer
    throw error;
  }
}

/**
 * 📊 Fonction pour valider et nettoyer les données de produits
 * @param data Données brutes de l'API
 * @param source Source des données
 * @returns Données nettoyées et validées
 */
export function validateProductData(data: any[], source: string): any[] {
  if (!Array.isArray(data)) {
    console.log(`⚠️ ${source}: Données non-array, conversion...`);
    data = [data];
  }
  
  return data.filter(item => {
    // Vérifier les champs essentiels
    const hasTitle = item && (item.title || item.name || item.product_name);
    const hasPrice = item && (item.price || item.current_price || item.salePrice);
    const hasUrl = item && (item.url || item.link || item.product_url);
    
    if (!hasTitle || !hasPrice || !hasUrl) {
      console.log(`⚠️ ${source}: Produit invalide ignoré`, { hasTitle, hasPrice, hasUrl });
      return false;
    }
    
    return true;
  });
}

/**
 * 🎯 Fonction pour scorer et trier les produits
 * @param products Liste de produits
 * @param source Source des produits
 * @returns Produits scorés et triés
 */
export function scoreAndSortProducts(products: any[], source: string): any[] {
  return products.map(product => {
    let score = 0;
    
    // Score basé sur la présence d'image
    if (product.image || product.thumbnail || product.imgUrl) {
      score += 2;
    }
    
    // Score basé sur le prix (produits moins chers = meilleur score)
    const price = parseFloat(product.price || product.current_price || product.salePrice || '0');
    if (price > 0 && price < 100) score += 3;
    else if (price >= 100 && price < 500) score += 2;
    else if (price >= 500) score += 1;
    
    // Score basé sur la source
    const sourceScores = {
      'aliexpress': 3,
      'ebay': 4,
      'amazon': 5,
      'taobao': 2,
      '1688': 2,
      'apple': 5
    };
    score += sourceScores[source as keyof typeof sourceScores] || 1;
    
    // Score basé sur les mots-clés dans le titre
    const title = (product.title || product.name || '').toLowerCase();
    const keywords = ['wireless', 'bluetooth', 'smart', 'pro', 'premium', 'original'];
    keywords.forEach(keyword => {
      if (title.includes(keyword)) score += 1;
    });
    
    return {
      ...product,
      score,
      source
    };
  }).sort((a, b) => b.score - a.score); // Tri par score décroissant
}

/**
 * 🔄 Fonction pour retry automatique avec backoff exponentiel
 * @param fn Fonction à retry
 * @param maxRetries Nombre maximum de tentatives
 * @param baseDelay Délai de base en ms
 * @returns Résultat de la fonction ou null
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>, 
  maxRetries: number = 3, 
  baseDelay: number = 1000
): Promise<T | null> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      const status = error?.response?.status;
      
      // Ne pas retry sur les erreurs 403 (non abonné)
      if (status === 403) {
        console.log(`❌ Erreur 403 (non abonné), pas de retry`);
        return null;
      }
      
      if (attempt === maxRetries) {
        console.log(`❌ Échec après ${maxRetries} tentatives`);
        throw error;
      }
      
      const delay = baseDelay * Math.pow(2, attempt - 1);
      console.log(`⏳ Tentative ${attempt}/${maxRetries} échouée, retry dans ${delay}ms`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  return null;
}

/**
 * 📈 Statistiques de fallback
 */
export interface FallbackStats {
  totalSources: number;
  successfulSources: number;
  failedSources: number;
  totalProducts: number;
  sourcesUsed: string[];
  errors: string[];
}

export function createFallbackStats(): FallbackStats {
  return {
    totalSources: 0,
    successfulSources: 0,
    failedSources: 0,
    totalProducts: 0,
    sourcesUsed: [],
    errors: []
  };
} 