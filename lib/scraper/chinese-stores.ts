import axios from 'axios';
import * as cheerio from 'cheerio';
import { readFileSync } from 'fs';
import { join } from 'path';

export interface ScrapedProduct {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  sellingPrice: number; // Prix avec marge de 40%
  currency: string;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  sales: number;
  stock: number;
  shipping: string;
  delivery: string;
  source: string;
  country: string;
  scrapedAt: string;
  features: string[];
  description: string;
  url: string;
  profitMargin: number;
}

export interface ScrapingResult {
  products: ScrapedProduct[];
  total: number;
  source: string;
  timestamp: string;
}

// Fonction pour charger les produits depuis le fichier JSON
function loadDemoProducts(): ScrapedProduct[] {
  try {
    const filePath = join(process.cwd(), 'data', 'scraped-products.json');
    const data = readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.log('Fichier de produits non trouvé, utilisation des produits par défaut...');
    return [];
  }
}

// Produits de démonstration avec vraies images et données
const DEMO_PRODUCTS: ScrapedProduct[] = loadDemoProducts();

// Configuration des sources par pays
const SOURCES = {
  china: {
    aliexpress: {
      name: 'AliExpress',
      country: 'Chine',
      baseUrl: 'https://www.aliexpress.com',
      searchUrl: 'https://www.aliexpress.com/wholesale',
      categories: ['electronics', 'fashion', 'home', 'beauty', 'sports', 'automotive']
    },
    alibaba: {
      name: 'Alibaba',
      country: 'Chine',
      baseUrl: 'https://www.alibaba.com',
      searchUrl: 'https://www.alibaba.com/trade/search',
      categories: ['electronics', 'fashion', 'home', 'beauty', 'sports', 'automotive']
    },
    taobao: {
      name: 'Taobao',
      country: 'Chine',
      baseUrl: 'https://www.taobao.com',
      searchUrl: 'https://s.taobao.com/search',
      categories: ['electronics', 'fashion', 'home', 'beauty', 'sports', 'automotive']
    }
  },
  turkey: {
    trendyol: {
      name: 'Trendyol',
      country: 'Turquie',
      baseUrl: 'https://www.trendyol.com',
      searchUrl: 'https://www.trendyol.com/sr',
      categories: ['electronics', 'fashion', 'home', 'beauty', 'sports', 'automotive']
    },
    hepsiburada: {
      name: 'Hepsiburada',
      country: 'Turquie',
      baseUrl: 'https://www.hepsiburada.com',
      searchUrl: 'https://www.hepsiburada.com/ara',
      categories: ['electronics', 'fashion', 'home', 'beauty', 'sports', 'automotive']
    },
    n11: {
      name: 'N11',
      country: 'Turquie',
      baseUrl: 'https://www.n11.com',
      searchUrl: 'https://www.n11.com/arama',
      categories: ['electronics', 'fashion', 'home', 'beauty', 'sports', 'automotive']
    }
  },
  dubai: {
    noon: {
      name: 'Noon',
      country: 'Dubaï',
      baseUrl: 'https://www.noon.com',
      searchUrl: 'https://www.noon.com/search',
      categories: ['electronics', 'fashion', 'home', 'beauty', 'sports', 'automotive']
    },
    amazonUAE: {
      name: 'Amazon UAE',
      country: 'Dubaï',
      baseUrl: 'https://www.amazon.ae',
      searchUrl: 'https://www.amazon.ae/s',
      categories: ['electronics', 'fashion', 'home', 'beauty', 'sports', 'automotive']
    },
    carrefourUAE: {
      name: 'Carrefour UAE',
      country: 'Dubaï',
      baseUrl: 'https://www.carrefouruae.com',
      searchUrl: 'https://www.carrefouruae.com/search',
      categories: ['electronics', 'fashion', 'home', 'beauty', 'sports', 'automotive']
    }
  }
};

// Fonction de scraping simulée (pour éviter les blocages)
export async function scrapeChineseStores(query: string = '', category: string = '', country: string = ''): Promise<ScrapingResult> {
  try {
    // Simulation d'un délai de scraping
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Utiliser les produits de démonstration chargés depuis le fichier
    let filteredProducts = DEMO_PRODUCTS.length > 0 ? DEMO_PRODUCTS : [];
    
    if (query) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(product =>
        product.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (country && country !== 'all') {
      filteredProducts = filteredProducts.filter(product =>
        product.country.toLowerCase().includes(country.toLowerCase())
      );
    }

    // Ajouter des variations de prix pour simuler la concurrence
    const productsWithVariations = filteredProducts.map(product => ({
      ...product,
      originalPrice: product.originalPrice + (Math.random() - 0.5) * 5, // Variation de ±2.5€
      sellingPrice: (product.originalPrice + (Math.random() - 0.5) * 5) * 1.4, // Marge de 40%
      stock: Math.floor(product.stock * (0.8 + Math.random() * 0.4)), // Variation de stock
      sales: Math.floor(product.sales * (0.9 + Math.random() * 0.2)) // Variation de ventes
    }));

    return {
      products: productsWithVariations,
      total: productsWithVariations.length,
      source: 'Multiple Sources',
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('Erreur lors du scraping:', error);
    return {
      products: [],
      total: 0,
      source: 'Error',
      timestamp: new Date().toISOString()
    };
  }
}

// Fonction pour obtenir les catégories disponibles
export function getCategories() {
  const categories = new Set(DEMO_PRODUCTS.map(p => p.category));
  return Array.from(categories).map(cat => ({
    id: cat.toLowerCase().replace(/\s+/g, '-'),
    name: cat,
    count: DEMO_PRODUCTS.filter(p => p.category === cat).length
  }));
}

// Fonction pour obtenir les sources disponibles
export function getSources() {
  const sources = new Set(DEMO_PRODUCTS.map(p => p.source));
  return Array.from(sources).map(source => ({
    id: source.toLowerCase().replace(/\s+/g, '-'),
    name: source,
    count: DEMO_PRODUCTS.filter(p => p.source === source).length
  }));
}

// Fonction pour obtenir les pays disponibles
export function getCountries() {
  const countries = new Set(DEMO_PRODUCTS.map(p => p.country));
  return Array.from(countries).map(country => ({
    id: country.toLowerCase().replace(/\s+/g, '-'),
    name: country,
    count: DEMO_PRODUCTS.filter(p => p.country === country).length
  }));
}

// Fonction pour obtenir les statistiques de scraping
export function getScrapingStats() {
  const totalProducts = DEMO_PRODUCTS.length;
  const sources = getSources();
  const categories = getCategories();
  const countries = getCountries();
  
  return {
    totalProducts,
    sources: sources.length,
    categories: categories.length,
    countries: countries.length,
    lastUpdate: new Date().toISOString(),
    averageOriginalPrice: DEMO_PRODUCTS.reduce((sum, p) => sum + p.originalPrice, 0) / totalProducts,
    averageSellingPrice: DEMO_PRODUCTS.reduce((sum, p) => sum + p.sellingPrice, 0) / totalProducts,
    totalSales: DEMO_PRODUCTS.reduce((sum, p) => sum + p.sales, 0),
    totalProfit: DEMO_PRODUCTS.reduce((sum, p) => sum + (p.sellingPrice - p.originalPrice), 0)
  };
} 