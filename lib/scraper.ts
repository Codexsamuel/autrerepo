import axios from 'axios';
import { scrape1688 as scrape1688Real, Product1688 } from './1688';

// Configuration RapidAPI
const RAPID_API_KEY = process.env.RAPIDAPI_KEY || '0a9f369c5emsh0c62e1fe4db2cd4p1a5adbjsn05a8f9f14d02';

// Types pour les produits
export interface ScrapedProduct {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
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
  memberId?: string;
  shopName?: string;
}

// Configuration des APIs
const API_CONFIG = {
  aliexpress: {
    host: 'aliexpress-search1.p.rapidapi.com',
    baseUrl: 'https://aliexpress-search1.p.rapidapi.com'
  },
  aliexpressUnofficial: {
    host: 'aliexpress-unofficial.p.rapidapi.com',
    baseUrl: 'https://aliexpress-unofficial.p.rapidapi.com'
  },
  ebay: {
    host: 'ebay-search-result.p.rapidapi.com',
    baseUrl: 'https://ebay-search-result.p.rapidapi.com'
  },
  ebay32: {
    host: 'ebay32.p.rapidapi.com',
    baseUrl: 'https://ebay32.p.rapidapi.com'
  },
  taobao: {
    host: 'taobao-scaper.p.rapidapi.com',
    baseUrl: 'https://taobao-scaper.p.rapidapi.com'
  },
  '1688': {
    host: '1688-product2.p.rapidapi.com',
    baseUrl: 'https://1688-product2.p.rapidapi.com'
  },
  googleShopping: {
    host: 'product-search-api.p.rapidapi.com',
    baseUrl: 'https://product-search-api.p.rapidapi.com'
  },
  woocommerce: {
    host: 'woocommerce9.p.rapidapi.com',
    baseUrl: 'https://woocommerce9.p.rapidapi.com'
  },
  appleReconditioned: {
    host: 'reconditioned-apple-devices.p.rapidapi.com',
    baseUrl: 'https://reconditioned-apple-devices.p.rapidapi.com'
  }
};

// Fonction utilitaire pour faire des requêtes RapidAPI
async function makeRapidAPIRequest(host: string, url: string, method: 'GET' | 'POST' = 'GET', data?: any) {
  try {
    const config = {
      method,
      url,
      headers: {
        'x-rapidapi-host': host,
        'x-rapidapi-key': RAPID_API_KEY,
        ...(method === 'POST' && { 'Content-Type': 'application/x-www-form-urlencoded' })
      },
      ...(data && { data })
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Erreur API ${host}:`, error);
    throw error;
  }
}

// 1. AliExpress Search API
export async function scrapeAliExpress(keyword: string, limit: number = 20): Promise<{ data: ScrapedProduct[], total: number }> {
  try {
    const url = `${API_CONFIG.aliexpress.baseUrl}/?name=${encodeURIComponent(keyword)}`;
    const response = await makeRapidAPIRequest(API_CONFIG.aliexpress.host, url);
    
    // Normaliser les données AliExpress
    const products: ScrapedProduct[] = (response.data || []).slice(0, limit).map((item: any) => ({
      id: item.id || `ali_${Date.now()}_${Math.random()}`,
      title: item.title || item.name || 'Produit AliExpress',
      price: item.price || item.price_range || 'Prix non disponible',
      originalPrice: item.original_price,
      image: item.image || item.img || '/images/placeholder.jpg',
      url: item.url || item.link || '#',
      source: 'AliExpress',
      rating: item.rating || item.star_rating,
      reviews: item.reviews || item.review_count,
      seller: item.seller || item.store_name,
      location: item.location || 'Chine',
      shipping: item.shipping || 'Livraison gratuite',
      availability: item.availability || 'En stock',
      description: item.description || item.desc,
      category: item.category,
      tags: item.tags || []
    }));

    return {
      data: products,
      total: products.length
    };
  } catch (error) {
    console.error('Erreur AliExpress scraping:', error);
    return { data: [], total: 0 };
  }
}

// 2. eBay Search API
export async function scrapeEbay(keyword: string, limit: number = 20): Promise<{ data: ScrapedProduct[], total: number }> {
  try {
    const url = `${API_CONFIG.ebay.baseUrl}/search/${encodeURIComponent(keyword)}`;
    const response = await makeRapidAPIRequest(API_CONFIG.ebay.host, url);
    
    // Normaliser les données eBay
    const products: ScrapedProduct[] = (response.data || []).slice(0, limit).map((item: any) => ({
      id: item.id || item.itemId || `ebay_${Date.now()}_${Math.random()}`,
      title: item.title || item.name || 'Produit eBay',
      price: item.price || item.currentPrice || 'Prix non disponible',
      originalPrice: item.originalPrice || item.retailPrice,
      image: item.image || item.galleryURL || '/images/placeholder.jpg',
      url: item.url || item.viewItemURL || '#',
      source: 'eBay',
      rating: item.rating,
      reviews: item.reviews,
      seller: item.seller || item.sellerInfo?.sellerUserName,
      location: item.location || item.shippingInfo?.shipToLocations,
      shipping: item.shipping || item.shippingInfo?.shippingServiceCost?.__value__,
      availability: item.availability || 'Disponible',
      description: item.description || item.subtitle,
      category: item.category || item.primaryCategory?.categoryName,
      tags: item.tags || []
    }));

    return {
      data: products,
      total: products.length
    };
  } catch (error) {
    console.error('Erreur eBay scraping:', error);
    return { data: [], total: 0 };
  }
}

// 3. Taobao Scraper API
export async function scrapeTaobao(keyword: string, limit: number = 20): Promise<{ data: ScrapedProduct[], total: number }> {
  try {
    const url = `${API_CONFIG.taobao.baseUrl}/itemSearch.php?q=${encodeURIComponent(keyword)}`;
    const response = await makeRapidAPIRequest(API_CONFIG.taobao.host, url);
    
    // Normaliser les données Taobao
    const products: ScrapedProduct[] = (response.data || []).slice(0, limit).map((item: any) => ({
      id: item.id || item.itemId || `taobao_${Date.now()}_${Math.random()}`,
      title: item.title || item.name || 'Produit Taobao',
      price: item.price || item.currentPrice || 'Prix non disponible',
      originalPrice: item.originalPrice,
      image: item.image || item.pic || '/images/placeholder.jpg',
      url: item.url || item.detailUrl || '#',
      source: 'Taobao',
      rating: item.rating || item.score,
      reviews: item.reviews || item.commentCount,
      seller: item.seller || item.shopName,
      location: item.location || 'Chine',
      shipping: item.shipping || 'Livraison incluse',
      availability: item.availability || 'En stock',
      description: item.description || item.desc,
      category: item.category,
      tags: item.tags || []
    }));

    return {
      data: products,
      total: products.length
    };
  } catch (error) {
    console.error('Erreur Taobao scraping:', error);
    return { data: [], total: 0 };
  }
}

// 4. 1688 Product API (Nouvelle implémentation complète)
export async function scrape1688(keyword: string, limit: number = 20): Promise<{ data: ScrapedProduct[], total: number }> {
  try {
    console.log(`🔍 Scraping 1688 pour: "${keyword}" (limite: ${limit})`);
    
    // Utiliser la nouvelle API 1688 complète
    const products1688 = await scrape1688Real(keyword, limit);
    
    // Convertir les produits 1688 vers le format ScrapedProduct
    const products: ScrapedProduct[] = products1688.map((product: Product1688) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      url: product.url,
      source: product.source,
      rating: product.rating,
      reviews: product.reviews,
      seller: product.seller,
      location: product.location,
      shipping: product.shipping,
      availability: product.availability,
      description: product.description,
      category: product.category,
      tags: product.tags,
      memberId: product.memberId,
      shopName: product.shopName
    }));

    console.log(`✅ 1688: ${products.length} produits trouvés`);
    return {
      data: products,
      total: products.length
    };
  } catch (error) {
    console.error('Erreur 1688 scraping:', error);
    return { data: [], total: 0 };
  }
}

// 5. Google Shopping API
export async function scrapeGoogleShopping(keyword: string, limit: number = 20): Promise<{ data: ScrapedProduct[], total: number }> {
  try {
    const url = `${API_CONFIG.googleShopping.baseUrl}/api/google/shopping`;
    const data = `query=${encodeURIComponent(keyword)}`;
    
    const response = await makeRapidAPIRequest(
      API_CONFIG.googleShopping.host, 
      url, 
      'POST', 
      data
    );
    
    // Normaliser les données Google Shopping
    const products: ScrapedProduct[] = (response.data || []).slice(0, limit).map((item: any) => ({
      id: item.id || `google_${Date.now()}_${Math.random()}`,
      title: item.title || item.name || 'Produit Google Shopping',
      price: item.price || item.price_range || 'Prix non disponible',
      originalPrice: item.originalPrice,
      image: item.image || item.thumbnail || '/images/placeholder.jpg',
      url: item.url || item.link || '#',
      source: 'Google Shopping',
      rating: item.rating || item.stars,
      reviews: item.reviews || item.review_count,
      seller: item.seller || item.merchant,
      location: item.location || 'International',
      shipping: item.shipping || 'Livraison variable',
      availability: item.availability || 'Disponible',
      description: item.description || item.snippet,
      category: item.category,
      tags: item.tags || []
    }));

    return {
      data: products,
      total: products.length
    };
  } catch (error) {
    console.error('Erreur Google Shopping scraping:', error);
    return { data: [], total: 0 };
  }
}

// 6. AliExpress Unofficial API (catégories)
export async function getAliExpressCategories(): Promise<string[]> {
  try {
    const url = `${API_CONFIG.aliexpressUnofficial.baseUrl}/categories`;
    const response = await makeRapidAPIRequest(API_CONFIG.aliexpressUnofficial.host, url);
    
    return response.data || [];
  } catch (error) {
    console.error('Erreur récupération catégories AliExpress:', error);
    return [];
  }
}

// 7. Apple Reconditioned Devices API
export async function getAppleReconditionedDevices(): Promise<{ data: ScrapedProduct[], total: number }> {
  try {
    const url = `${API_CONFIG.appleReconditioned.baseUrl}/products/BlackMarket`;
    const response = await makeRapidAPIRequest(API_CONFIG.appleReconditioned.host, url);
    
    const products: ScrapedProduct[] = (response.data || []).map((item: any) => ({
      id: item.id || `apple_${Date.now()}_${Math.random()}`,
      title: item.title || item.name || 'Appareil Apple reconditionné',
      price: item.price || 'Prix non disponible',
      originalPrice: item.originalPrice,
      image: item.image || '/images/placeholder.jpg',
      url: item.url || '#',
      source: 'Apple Reconditioned',
      rating: item.rating,
      reviews: item.reviews,
      seller: item.seller || 'Apple Certified',
      location: item.location || 'International',
      shipping: item.shipping || 'Livraison incluse',
      availability: item.availability || 'En stock',
      description: item.description || 'Appareil Apple reconditionné certifié',
      category: 'Apple Reconditioned',
      tags: ['Apple', 'Reconditionné', 'Certifié']
    }));

    return {
      data: products,
      total: products.length
    };
  } catch (error) {
    console.error('Erreur Apple reconditioned scraping:', error);
    return { data: [], total: 0 };
  }
}

// Fonction de scraping multi-sources
export async function scrapeAllSources(keyword: string, limit: number = 20) {
  const results = await Promise.allSettled([
    scrapeAliExpress(keyword, limit),
    scrapeEbay(keyword, limit),
    scrapeTaobao(keyword, limit),
    scrape1688(keyword, limit),
    scrapeGoogleShopping(keyword, limit)
  ]);

  return {
    aliExpress: results[0].status === 'fulfilled' ? results[0].value : { data: [], total: 0 },
    ebay: results[1].status === 'fulfilled' ? results[1].value : { data: [], total: 0 },
    taobao: results[2].status === 'fulfilled' ? results[2].value : { data: [], total: 0 },
    '1688': results[3].status === 'fulfilled' ? results[3].value : { data: [], total: 0 },
    googleShopping: results[4].status === 'fulfilled' ? results[4].value : { data: [], total: 0 }
  };
}

// Fonction utilitaire pour normaliser les prix
export function normalizePrice(price: string): number {
  if (!price) return 0;
  
  // Extraire les chiffres du prix
  const numericPrice = price.replace(/[^\d.,]/g, '').replace(',', '.');
  return parseFloat(numericPrice) || 0;
}

// Fonction pour trier les produits par prix
export function sortProductsByPrice(products: ScrapedProduct[], ascending: boolean = true): ScrapedProduct[] {
  return products.sort((a, b) => {
    const priceA = normalizePrice(a.price);
    const priceB = normalizePrice(b.price);
    return ascending ? priceA - priceB : priceB - priceA;
  });
}

// Fonction pour filtrer les produits par source
export function filterProductsBySource(products: ScrapedProduct[], source: string): ScrapedProduct[] {
  return products.filter(product => product.source.toLowerCase() === source.toLowerCase());
} 