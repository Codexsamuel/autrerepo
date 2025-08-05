import { NextRequest, NextResponse } from 'next/server';

// Types pour l'API Taobao/1688
interface TaobaoProduct {
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
  features?: string[];
  specifications?: Record<string, any>;
  url: string;
  site: 'taobao' | '1688';
  seller?: {
    name: string;
    rating: number;
    location: string;
  };
}

interface TaobaoSearchParams {
  query: string;
  site?: 'taobao' | '1688';
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price' | 'rating' | 'sales' | 'relevance';
  page?: number;
  limit?: number;
}

// Configuration RapidAPI Taobao/1688
const RAPIDAPI_CONFIG = {
  host: 'taobao-1688-api1.p.rapidapi.com',
  key: process.env.RAPIDAPI_KEY || '0a9f369c5emsh0c62e1fe4db2cd4p1a5adbjsn05a8f9f14d02'
};

// Endpoints disponibles selon la documentation RapidAPI
const API_ENDPOINTS = {
  search: '/v31/search',
  detail: '/v31/detail',
  searchByImage: '/v31/search-by-image',
  convertLink: '/v31/convert-link'
};

// Cache pour les requêtes (5 minutes)
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Fonction pour vérifier le cache
function getCachedData(key: string): any | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}

// Fonction pour mettre en cache
function setCachedData(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() });
}

// Fonction pour rechercher des produits Taobao/1688
async function searchTaobaoProducts(params: TaobaoSearchParams): Promise<TaobaoProduct[]> {
  try {
    // Vérifier si on a une clé API valide
    if (!RAPIDAPI_CONFIG.key || RAPIDAPI_CONFIG.key === '0a9f369c5emsh0c62e1fe4db2cd4p1a5adbjsn05a8f9f14d02') {
      console.log('🔧 Mode simulation Taobao/1688 activé (RAPIDAPI_KEY non configurée)');
      return getSimulatedTaobaoProducts(params);
    }

    const searchParams = new URLSearchParams({
      keyword: params.query,
      site: params.site || '1688',
      ...(params.page && { page: params.page.toString() }),
      ...(params.limit && { limit: params.limit.toString() })
    });

    const response = await fetch(`https://${RAPIDAPI_CONFIG.host}${API_ENDPOINTS.search}?${searchParams}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_CONFIG.key,
        'X-RapidAPI-Host': RAPIDAPI_CONFIG.host,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`API Taobao/1688 error: ${response.status} - ${response.statusText}`);
      // En cas d'erreur API, retourner des données simulées
      return getSimulatedTaobaoProducts(params);
    }

    const data = await response.json();
    
    // Transformer les données Taobao/1688 en format standard
    return data.products?.map((product: any) => ({
      id: product.itemId || product.id,
      title: product.title || product.name,
      description: product.description || product.desc,
      price: {
        current: parseFloat(product.price?.current || product.price || 0),
        original: parseFloat(product.price?.original || product.price || 0),
        currency: 'CNY'
      },
      images: product.images || [product.image] || [],
      rating: parseFloat(product.rating || 0),
      reviews: parseInt(product.reviews || 0),
      availability: product.availability !== false,
      category: product.category || 'General',
      brand: product.brand,
      features: product.features || [],
      specifications: product.specifications || {},
      url: product.url || product.link,
      site: params.site || '1688',
      seller: product.seller ? {
        name: product.seller.name,
        rating: parseFloat(product.seller.rating || 0),
        location: product.seller.location || 'China'
      } : undefined
    })) || [];

  } catch (error) {
    console.error('Erreur API Taobao/1688:', error);
    // En cas d'erreur, retourner des données simulées
    return getSimulatedTaobaoProducts(params);
  }
}

// Fonction pour obtenir les détails d'un produit
async function getTaobaoProductDetail(itemId: string, site: 'taobao' | '1688' = '1688'): Promise<TaobaoProduct | null> {
  try {
    // Vérifier le cache
    const cacheKey = `taobao-detail-${itemId}-${site}`;
    const cached = getCachedData(cacheKey);
    if (cached) {
      return cached;
    }

    // Vérifier si on a une clé API valide
    if (!RAPIDAPI_CONFIG.key || RAPIDAPI_CONFIG.key === '0a9f369c5emsh0c62e1fe4db2cd4p1a5adbjsn05a8f9f14d02') {
      console.log('🔧 Mode simulation Taobao/1688 activé (RAPIDAPI_KEY non configurée)');
      return getSimulatedTaobaoProductDetail(itemId, site);
    }

    const response = await fetch(`https://${RAPIDAPI_CONFIG.host}${API_ENDPOINTS.detail}?itemId=${itemId}&site=${site}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_CONFIG.key,
        'X-RapidAPI-Host': RAPIDAPI_CONFIG.host,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`API Taobao/1688 detail error: ${response.status} - ${response.statusText}`);
      return getSimulatedTaobaoProductDetail(itemId, site);
    }

    const data = await response.json();
    
    const product: TaobaoProduct = {
      id: data.itemId || itemId,
      title: data.title || data.name,
      description: data.description || data.desc,
      price: {
        current: parseFloat(data.price?.current || data.price || 0),
        original: parseFloat(data.price?.original || data.price || 0),
        currency: 'CNY'
      },
      images: data.images || [data.image] || [],
      rating: parseFloat(data.rating || 0),
      reviews: parseInt(data.reviews || 0),
      availability: data.availability !== false,
      category: data.category || 'General',
      brand: data.brand,
      features: data.features || [],
      specifications: data.specifications || {},
      url: data.url || data.link,
      site: site,
      seller: data.seller ? {
        name: data.seller.name,
        rating: parseFloat(data.seller.rating || 0),
        location: data.seller.location || 'China'
      } : undefined
    };

    // Mettre en cache
    setCachedData(cacheKey, product);
    return product;

  } catch (error) {
    console.error('Erreur API Taobao/1688 detail:', error);
    return getSimulatedTaobaoProductDetail(itemId, site);
  }
}

// Fonction pour générer des produits Taobao/1688 simulés
function getSimulatedTaobaoProducts(params: TaobaoSearchParams): TaobaoProduct[] {
  const simulatedProducts = [
    {
      id: '885555631269',
      title: 'iPhone 15 Pro Max 256GB - Original Apple',
      description: 'iPhone 15 Pro Max 256GB, écran 6.7", A17 Pro, 48MP caméra, 5G',
      price: { current: 8999, original: 9999, currency: 'CNY' },
      images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400'],
      rating: 4.8,
      reviews: 1250,
      availability: true,
      category: 'Electronics',
      brand: 'Apple',
      features: ['5G', 'A17 Pro', '48MP Camera', 'Titanium Design'],
      specifications: { 'Storage': '256GB', 'Color': 'Natural Titanium', 'Screen': '6.7"' },
      url: 'https://1688.com/item/885555631269',
      site: '1688' as const,
      seller: {
        name: 'Apple Official Store',
        rating: 4.9,
        location: 'Shenzhen, China'
      }
    },
    {
      id: '885555631270',
      title: 'MacBook Pro M3 14" - 512GB SSD',
      description: 'MacBook Pro avec puce M3, 14 pouces, 512GB SSD, 16GB RAM',
      price: { current: 12999, original: 14999, currency: 'CNY' },
      images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'],
      rating: 4.9,
      reviews: 890,
      availability: true,
      category: 'Electronics',
      brand: 'Apple',
      features: ['M3 Chip', '14" Display', '512GB SSD', '16GB RAM'],
      specifications: { 'Processor': 'M3', 'Storage': '512GB', 'RAM': '16GB' },
      url: 'https://1688.com/item/885555631270',
      site: '1688' as const,
      seller: {
        name: 'Tech World Store',
        rating: 4.7,
        location: 'Guangzhou, China'
      }
    },
    {
      id: '885555631271',
      title: 'AirPods Pro 2ème génération',
      description: 'AirPods Pro avec réduction de bruit active et audio spatial',
      price: { current: 1899, original: 2199, currency: 'CNY' },
      images: ['https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400'],
      rating: 4.7,
      reviews: 2100,
      availability: true,
      category: 'Electronics',
      brand: 'Apple',
      features: ['Noise Cancellation', 'Spatial Audio', 'Water Resistant'],
      specifications: { 'Connectivity': 'Bluetooth 5.0', 'Battery': '6 hours' },
      url: 'https://1688.com/item/885555631271',
      site: '1688' as const,
      seller: {
        name: 'Audio Expert Store',
        rating: 4.8,
        location: 'Shanghai, China'
      }
    },
    {
      id: '885555631272',
      title: 'iPad Air 5ème génération 64GB',
      description: 'iPad Air avec puce M1, 10.9 pouces, 64GB, WiFi + Cellular',
      price: { current: 4599, original: 5199, currency: 'CNY' },
      images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400'],
      rating: 4.6,
      reviews: 1560,
      availability: true,
      category: 'Electronics',
      brand: 'Apple',
      features: ['M1 Chip', '10.9" Display', '5G Ready', 'Apple Pencil 2'],
      specifications: { 'Storage': '64GB', 'Display': '10.9"', 'Chip': 'M1' },
      url: 'https://1688.com/item/885555631272',
      site: '1688' as const,
      seller: {
        name: 'Digital Life Store',
        rating: 4.6,
        location: 'Beijing, China'
      }
    },
    {
      id: '885555631273',
      title: 'Apple Watch Series 9 45mm',
      description: 'Apple Watch Series 9, 45mm, GPS + Cellular, écran Always-On',
      price: { current: 3299, original: 3799, currency: 'CNY' },
      images: ['https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400'],
      rating: 4.8,
      reviews: 980,
      availability: true,
      category: 'Electronics',
      brand: 'Apple',
      features: ['GPS + Cellular', 'Always-On Display', 'Health Monitoring'],
      specifications: { 'Size': '45mm', 'Connectivity': 'GPS + Cellular' },
      url: 'https://1688.com/item/885555631273',
      site: '1688' as const,
      seller: {
        name: 'Smart Watch Store',
        rating: 4.9,
        location: 'Shenzhen, China'
      }
    },
    {
      id: '885555631274',
      title: 'HomePod mini - Haut-parleur intelligent',
      description: 'HomePod mini avec Siri, audio spatial, contrôle domotique',
      price: { current: 699, original: 899, currency: 'CNY' },
      images: ['https://images.unsplash.com/photo-1543512214-318c7553f230?w=400'],
      rating: 4.5,
      reviews: 750,
      availability: true,
      category: 'Electronics',
      brand: 'Apple',
      features: ['Siri Integration', 'Spatial Audio', 'HomeKit Control'],
      specifications: { 'Connectivity': 'Wi-Fi + Bluetooth', 'Power': '20W' },
      url: 'https://1688.com/item/885555631274',
      site: '1688' as const,
      seller: {
        name: 'Smart Home Store',
        rating: 4.7,
        location: 'Hangzhou, China'
      }
    }
  ];

  // Filtrer par recherche si spécifié
  if (params.query) {
    return simulatedProducts.filter(product =>
      product.title.toLowerCase().includes(params.query.toLowerCase()) ||
      product.description.toLowerCase().includes(params.query.toLowerCase())
    );
  }

  return simulatedProducts;
}

// Fonction pour générer un produit Taobao/1688 simulé détaillé
function getSimulatedTaobaoProductDetail(itemId: string, site: 'taobao' | '1688'): TaobaoProduct | null {
  const products = getSimulatedTaobaoProducts({ query: '' });
  const product = products.find(p => p.id === itemId);
  
  if (product) {
    return {
      ...product,
      site: site
    };
  }
  
  return null;
}

// Fonction pour obtenir les catégories disponibles
function getTaobaoCategories(): string[] {
  return [
    'Electronics',
    'Computers',
    'Mobile Phones',
    'Tablets',
    'Smart Watches',
    'Audio & Video',
    'Cameras',
    'Gaming',
    'Home & Garden',
    'Fashion',
    'Beauty & Health',
    'Sports & Outdoor',
    'Automotive',
    'Toys & Games',
    'Books & Media',
    'Food & Beverages',
    'Pet Supplies',
    'Baby Products',
    'Office Supplies',
    'Industrial & Scientific'
  ];
}

// Route principale
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const query = searchParams.get('query') || '';
    const site = searchParams.get('site') as 'taobao' | '1688' || '1688';
    const itemId = searchParams.get('itemId');
    const category = searchParams.get('category') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    // Vérifier le cache pour les requêtes de recherche
    if (action === 'search' || !action) {
      const cacheKey = `taobao-search-${query}-${site}-${page}-${limit}`;
      const cached = getCachedData(cacheKey);
      if (cached) {
        return NextResponse.json({
          success: true,
          data: cached,
          pagination: {
            page,
            limit,
            total: cached.length,
            totalPages: Math.ceil(cached.length / limit)
          }
        });
      }

      const products = await searchTaobaoProducts({
        query,
        site,
        category,
        page,
        limit
      });

      // Mettre en cache
      setCachedData(cacheKey, products);

      return NextResponse.json({
        success: true,
        data: products,
        pagination: {
          page,
          limit,
          total: products.length,
          totalPages: Math.ceil(products.length / limit)
        }
      });
    }

    // Action: obtenir les détails d'un produit
    if (action === 'detail' && itemId) {
      const product = await getTaobaoProductDetail(itemId, site);
      
      if (!product) {
        return NextResponse.json({
          success: false,
          message: 'Produit non trouvé'
        }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        data: product
      });
    }

    // Action: obtenir les catégories
    if (action === 'categories') {
      const categories = getTaobaoCategories();
      
      return NextResponse.json({
        success: true,
        data: categories
      });
    }

    // Action: statistiques
    if (action === 'stats') {
      const products = getSimulatedTaobaoProducts({ query: '' });
      
      return NextResponse.json({
        success: true,
        data: {
          totalProducts: products.length,
          categories: getTaobaoCategories().length,
          averagePrice: products.reduce((sum, p) => sum + p.price.current, 0) / products.length,
          averageRating: products.reduce((sum, p) => sum + (p.rating || 0), 0) / products.length,
          sites: ['1688', 'taobao']
        }
      });
    }

    return NextResponse.json({
      success: false,
      message: 'Action non reconnue'
    }, { status: 400 });

  } catch (error) {
    console.error('Erreur API Taobao/1688:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la récupération des données',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
} 