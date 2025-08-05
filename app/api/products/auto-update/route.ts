import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Types pour la gestion des produits
interface Product {
  id: string;
  title: string;
  description?: string;
  price: {
    current: number;
    original?: number;
    currency: string;
  };
  images: string[];
  rating?: number;
  reviews?: number;
  availability: boolean;
  category: string;
  brand?: string;
  source: string;
  lastUpdated: string;
  nextUpdate: string;
  updateFrequency: number; // en heures
  isActive: boolean;
}

interface AutoUpdateConfig {
  enabled: boolean;
  updateInterval: number; // en heures
  maxProducts: number;
  sources: string[];
  retryAttempts: number;
  fallbackMode: boolean;
}

// Configuration de mise à jour automatique
const AUTO_UPDATE_CONFIG: AutoUpdateConfig = {
  enabled: true,
  updateInterval: 6, // Mise à jour toutes les 6 heures
  maxProducts: 1000,
  sources: ['amazon', 'taobao', '1688', 'ebay', 'aliexpress', 'chinese-stores'],
  retryAttempts: 3,
  fallbackMode: true
};

// Cache pour les produits avec timestamp
const productCache = new Map<string, { data: Product[]; timestamp: number; source: string }>();
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 heures

// Fonction pour obtenir le chemin du fichier de cache
function getCacheFilePath(source: string): string {
  return path.join(process.cwd(), 'data', `products-${source}-cache.json`);
}

// Fonction pour sauvegarder les produits en cache
async function saveProductsToCache(source: string, products: Product[]): Promise<void> {
  try {
    const cacheDir = path.join(process.cwd(), 'data');
    await fs.mkdir(cacheDir, { recursive: true });
    
    const cacheData = {
      products,
      timestamp: Date.now(),
      source,
      totalProducts: products.length,
      lastUpdate: new Date().toISOString()
    };
    
    await fs.writeFile(
      getCacheFilePath(source),
      JSON.stringify(cacheData, null, 2),
      'utf-8'
    );
    
    console.log(`✅ Cache sauvegardé pour ${source}: ${products.length} produits`);
  } catch (error) {
    console.error(`❌ Erreur sauvegarde cache ${source}:`, error);
  }
}

// Fonction pour charger les produits depuis le cache
async function loadProductsFromCache(source: string): Promise<Product[] | null> {
  try {
    const cacheFile = getCacheFilePath(source);
    const cacheData = await fs.readFile(cacheFile, 'utf-8');
    const parsed = JSON.parse(cacheData);
    
    // Vérifier si le cache est encore valide
    const cacheAge = Date.now() - parsed.timestamp;
    if (cacheAge < CACHE_DURATION) {
      console.log(`✅ Cache valide pour ${source}: ${parsed.products.length} produits`);
      return parsed.products;
    }
    
    console.log(`⏰ Cache expiré pour ${source}, mise à jour nécessaire`);
    return null;
  } catch (error) {
    console.log(`📁 Pas de cache pour ${source}, création nécessaire`);
    return null;
  }
}

// Fonction pour mettre à jour les produits d'une source
async function updateProductsFromSource(source: string): Promise<Product[]> {
  console.log(`🔄 Mise à jour des produits ${source}...`);
  
  try {
    let products: Product[] = [];
    
    // Essayer de récupérer depuis l'API correspondante
    switch (source) {
      case 'amazon':
        const amazonResponse = await fetch(`http://localhost:3000/api/amazon/products?query=electronics&page=1&limit=50`);
        if (amazonResponse.ok) {
          const data = await amazonResponse.json();
          products = data.data?.map((p: any) => ({
            ...p,
            source: 'amazon',
            lastUpdated: new Date().toISOString(),
            nextUpdate: new Date(Date.now() + CACHE_DURATION).toISOString(),
            updateFrequency: AUTO_UPDATE_CONFIG.updateInterval,
            isActive: true
          })) || [];
        }
        break;
        
      case 'taobao':
      case '1688':
        const taobaoResponse = await fetch(`http://localhost:3000/api/taobao/products?query=electronics&site=${source}&page=1&limit=50`);
        if (taobaoResponse.ok) {
          const data = await taobaoResponse.json();
          products = data.data?.map((p: any) => ({
            ...p,
            source: source,
            lastUpdated: new Date().toISOString(),
            nextUpdate: new Date(Date.now() + CACHE_DURATION).toISOString(),
            updateFrequency: AUTO_UPDATE_CONFIG.updateInterval,
            isActive: true
          })) || [];
        }
        break;
        
      case 'ebay':
        const ebayResponse = await fetch(`http://localhost:3000/api/ebay/products?query=electronics&page=1&limit=50`);
        if (ebayResponse.ok) {
          const data = await ebayResponse.json();
          products = data.data?.map((p: any) => ({
            ...p,
            source: 'ebay',
            lastUpdated: new Date().toISOString(),
            nextUpdate: new Date(Date.now() + CACHE_DURATION).toISOString(),
            updateFrequency: AUTO_UPDATE_CONFIG.updateInterval,
            isActive: true
          })) || [];
        }
        break;
        
      case 'aliexpress':
        const aliexpressResponse = await fetch(`http://localhost:3000/api/aliexpress/products?query=electronics&page=1&limit=50`);
        if (aliexpressResponse.ok) {
          const data = await aliexpressResponse.json();
          products = data.data?.map((p: any) => ({
            ...p,
            source: 'aliexpress',
            lastUpdated: new Date().toISOString(),
            nextUpdate: new Date(Date.now() + CACHE_DURATION).toISOString(),
            updateFrequency: AUTO_UPDATE_CONFIG.updateInterval,
            isActive: true
          })) || [];
        }
        break;
        
      case 'chinese-stores':
        const chineseResponse = await fetch(`http://localhost:3000/api/scraping/chinese-stores?query=electronics&page=1&limit=50`);
        if (chineseResponse.ok) {
          const data = await chineseResponse.json();
          products = data.data?.map((p: any) => ({
            ...p,
            source: 'chinese-stores',
            lastUpdated: new Date().toISOString(),
            nextUpdate: new Date(Date.now() + CACHE_DURATION).toISOString(),
            updateFrequency: AUTO_UPDATE_CONFIG.updateInterval,
            isActive: true
          })) || [];
        }
        break;
    }
    
    // Sauvegarder en cache
    if (products.length > 0) {
      await saveProductsToCache(source, products);
      console.log(`✅ ${products.length} produits mis à jour pour ${source}`);
    } else {
      console.log(`⚠️ Aucun produit récupéré pour ${source}, utilisation du cache existant`);
      const cachedProducts = await loadProductsFromCache(source);
      if (cachedProducts) {
        products = cachedProducts;
      }
    }
    
    return products;
    
  } catch (error) {
    console.error(`❌ Erreur mise à jour ${source}:`, error);
    
    // En cas d'erreur, essayer de charger depuis le cache
    const cachedProducts = await loadProductsFromCache(source);
    if (cachedProducts) {
      console.log(`🔄 Utilisation du cache de secours pour ${source}`);
      return cachedProducts;
    }
    
    // Fallback vers des produits simulés
    if (AUTO_UPDATE_CONFIG.fallbackMode) {
      console.log(`🔄 Mode fallback activé pour ${source}`);
      return getFallbackProducts(source);
    }
    
    return [];
  }
}

// Fonction pour générer des produits de fallback
function getFallbackProducts(source: string): Product[] {
  const fallbackProducts = [
    {
      id: `fallback-${source}-1`,
      title: `Produit ${source} - Mode Fallback`,
      description: 'Produit de secours en cas de problème de connexion',
      price: { current: 29.99, original: 39.99, currency: 'USD' },
      images: ['https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400'],
      rating: 4.0,
      reviews: 100,
      availability: true,
      category: 'Electronics',
      brand: 'Generic',
      source: source,
      lastUpdated: new Date().toISOString(),
      nextUpdate: new Date(Date.now() + CACHE_DURATION).toISOString(),
      updateFrequency: AUTO_UPDATE_CONFIG.updateInterval,
      isActive: true
    },
    {
      id: `fallback-${source}-2`,
      title: `Produit ${source} - Disponible`,
      description: 'Produit de secours disponible',
      price: { current: 49.99, original: 59.99, currency: 'USD' },
      images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'],
      rating: 4.5,
      reviews: 200,
      availability: true,
      category: 'Electronics',
      brand: 'Generic',
      source: source,
      lastUpdated: new Date().toISOString(),
      nextUpdate: new Date(Date.now() + CACHE_DURATION).toISOString(),
      updateFrequency: AUTO_UPDATE_CONFIG.updateInterval,
      isActive: true
    }
  ];
  
  return fallbackProducts;
}

// Fonction pour mettre à jour tous les produits
async function updateAllProducts(): Promise<{ [source: string]: Product[] }> {
  const results: { [source: string]: Product[] } = {};
  
  for (const source of AUTO_UPDATE_CONFIG.sources) {
    try {
      const products = await updateProductsFromSource(source);
      results[source] = products;
    } catch (error) {
      console.error(`❌ Erreur mise à jour ${source}:`, error);
      results[source] = [];
    }
  }
  
  return results;
}

// Fonction pour obtenir les statistiques de mise à jour
async function getUpdateStats(): Promise<any> {
  const stats = {
    totalProducts: 0,
    sources: {} as any,
    lastUpdate: new Date().toISOString(),
    nextUpdate: new Date(Date.now() + CACHE_DURATION).toISOString(),
    cacheStatus: 'active',
    autoUpdateEnabled: AUTO_UPDATE_CONFIG.enabled
  };
  
  for (const source of AUTO_UPDATE_CONFIG.sources) {
    try {
      const cachedProducts = await loadProductsFromCache(source);
      const productCount = cachedProducts?.length || 0;
      
      stats.sources[source] = {
        productCount,
        lastUpdate: cachedProducts?.[0]?.lastUpdated || 'never',
        nextUpdate: cachedProducts?.[0]?.nextUpdate || 'unknown',
        isActive: productCount > 0
      };
      
      stats.totalProducts += productCount;
    } catch (error) {
      stats.sources[source] = {
        productCount: 0,
        lastUpdate: 'never',
        nextUpdate: 'unknown',
        isActive: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
  
  return stats;
}

// Route principale
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const source = searchParams.get('source');
    const force = searchParams.get('force') === 'true';
    
    // Action: obtenir les statistiques
    if (action === 'stats') {
      const stats = await getUpdateStats();
      return NextResponse.json({
        success: true,
        data: stats
      });
    }
    
    // Action: mettre à jour une source spécifique
    if (action === 'update' && source) {
      if (!AUTO_UPDATE_CONFIG.sources.includes(source)) {
        return NextResponse.json({
          success: false,
          message: `Source non supportée: ${source}`
        }, { status: 400 });
      }
      
      const products = await updateProductsFromSource(source);
      return NextResponse.json({
        success: true,
        data: {
          source,
          products,
          totalProducts: products.length,
          lastUpdate: new Date().toISOString()
        }
      });
    }
    
    // Action: mettre à jour toutes les sources
    if (action === 'update-all' || force) {
      const results = await updateAllProducts();
      const totalProducts = Object.values(results).reduce((sum, products) => sum + products.length, 0);
      
      return NextResponse.json({
        success: true,
        data: {
          results,
          totalProducts,
          sourcesUpdated: Object.keys(results).length,
          lastUpdate: new Date().toISOString()
        }
      });
    }
    
    // Action par défaut: obtenir les produits d'une source
    if (source) {
      if (!AUTO_UPDATE_CONFIG.sources.includes(source)) {
        return NextResponse.json({
          success: false,
          message: `Source non supportée: ${source}`
        }, { status: 400 });
      }
      
      // Vérifier d'abord le cache
      let products = await loadProductsFromCache(source);
      
      // Si pas de cache ou force update, mettre à jour
      if (!products || force) {
        products = await updateProductsFromSource(source);
      }
      
      return NextResponse.json({
        success: true,
        data: {
          source,
          products,
          totalProducts: products.length,
          fromCache: !force && products.length > 0,
          lastUpdate: products[0]?.lastUpdated || new Date().toISOString()
        }
      });
    }
    
    // Action par défaut: obtenir tous les produits
    const allProducts: { [source: string]: Product[] } = {};
    
    for (const source of AUTO_UPDATE_CONFIG.sources) {
      const products = await loadProductsFromCache(source) || await updateProductsFromSource(source);
      allProducts[source] = products;
    }
    
    const totalProducts = Object.values(allProducts).reduce((sum, products) => sum + products.length, 0);
    
    return NextResponse.json({
      success: true,
      data: {
        products: allProducts,
        totalProducts,
        sources: Object.keys(allProducts),
        lastUpdate: new Date().toISOString(),
        autoUpdateEnabled: AUTO_UPDATE_CONFIG.enabled
      }
    });
    
  } catch (error) {
    console.error('Erreur API auto-update:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la mise à jour automatique',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

// Route POST pour forcer la mise à jour
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, source, force = false } = body;
    
    if (action === 'update' && source) {
      const products = await updateProductsFromSource(source);
      return NextResponse.json({
        success: true,
        data: {
          source,
          products,
          totalProducts: products.length,
          lastUpdate: new Date().toISOString()
        }
      });
    }
    
    if (action === 'update-all') {
      const results = await updateAllProducts();
      const totalProducts = Object.values(results).reduce((sum, products) => sum + products.length, 0);
      
      return NextResponse.json({
        success: true,
        data: {
          results,
          totalProducts,
          sourcesUpdated: Object.keys(results).length,
          lastUpdate: new Date().toISOString()
        }
      });
    }
    
    return NextResponse.json({
      success: false,
      message: 'Action non reconnue'
    }, { status: 400 });
    
  } catch (error) {
    console.error('Erreur API auto-update POST:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la mise à jour',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
} 