import { NextRequest, NextResponse } from 'next/server';

// Types pour l'API AliExpress
interface AliExpressProduct {
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
  seller?: {
    name: string;
    rating: number;
    location: string;
    followers: number;
  };
  shipping?: {
    cost: number;
    location: string;
    estimatedDays: string;
    freeShipping: boolean;
  };
  discounts?: {
    percentage: number;
    endDate: string;
  };
}

interface AliExpressSearchParams {
  query: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price' | 'rating' | 'sales' | 'relevance';
  page?: number;
  limit?: number;
  country?: string;
}

// Configuration RapidAPI AliExpress
const RAPIDAPI_CONFIG = {
  host: 'free-aliexpress-api.p.rapidapi.com',
  key: process.env.RAPIDAPI_KEY || '0a9f369c5emsh0c62e1fe4db2cd4p1a5adbjsn05a8f9f14d02'
};

// Endpoints disponibles selon la documentation RapidAPI
const API_ENDPOINTS = {
  search: '/search',
  product: '/product',
  categories: '/categories',
  trending: '/trending'
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

// Fonction pour rechercher des produits AliExpress
async function searchAliExpressProducts(params: AliExpressSearchParams): Promise<AliExpressProduct[]> {
  try {
    // Vérifier si on a une clé API valide
    if (!RAPIDAPI_CONFIG.key || RAPIDAPI_CONFIG.key === '0a9f369c5emsh0c62e1fe4db2cd4p1a5adbjsn05a8f9f14d02') {
      console.log('🔧 Mode simulation AliExpress activé (RAPIDAPI_KEY non configurée)');
      return getSimulatedAliExpressProducts(params);
    }

    const searchParams = new URLSearchParams({
      q: params.query,
      ...(params.category && { category: params.category }),
      ...(params.minPrice && { minPrice: params.minPrice.toString() }),
      ...(params.maxPrice && { maxPrice: params.maxPrice.toString() }),
      ...(params.sortBy && { sortBy: params.sortBy }),
      ...(params.page && { page: params.page.toString() }),
      ...(params.limit && { limit: params.limit.toString() }),
      ...(params.country && { country: params.country })
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
      console.error(`API AliExpress error: ${response.status} - ${response.statusText}`);
      // En cas d'erreur API, retourner des données simulées
      return getSimulatedAliExpressProducts(params);
    }

    const data = await response.json();
    
    // Transformer les données AliExpress en format standard
    return data.products?.map((product: any) => ({
      id: product.productId || product.id,
      title: product.title || product.name,
      description: product.description || product.desc,
      price: {
        current: parseFloat(product.price?.current || product.price || 0),
        original: parseFloat(product.price?.original || product.price || 0),
        currency: product.price?.currency || 'USD'
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
      seller: product.seller ? {
        name: product.seller.name,
        rating: parseFloat(product.seller.rating || 0),
        location: product.seller.location || 'China',
        followers: parseInt(product.seller.followers || 0)
      } : undefined,
      shipping: product.shipping ? {
        cost: parseFloat(product.shipping.cost || 0),
        location: product.shipping.location || 'Worldwide',
        estimatedDays: product.shipping.estimatedDays || '15-30 days',
        freeShipping: product.shipping.freeShipping || false
      } : undefined,
      discounts: product.discounts ? {
        percentage: parseFloat(product.discounts.percentage || 0),
        endDate: product.discounts.endDate
      } : undefined
    })) || [];

  } catch (error) {
    console.error('Erreur API AliExpress:', error);
    // En cas d'erreur, retourner des données simulées
    return getSimulatedAliExpressProducts(params);
  }
}

// Fonction pour obtenir les détails d'un produit
async function getAliExpressProductDetail(productId: string): Promise<AliExpressProduct | null> {
  try {
    // Vérifier le cache
    const cacheKey = `aliexpress-detail-${productId}`;
    const cached = getCachedData(cacheKey);
    if (cached) {
      return cached;
    }

    // Vérifier si on a une clé API valide
    if (!RAPIDAPI_CONFIG.key || RAPIDAPI_CONFIG.key === '0a9f369c5emsh0c62e1fe4db2cd4p1a5adbjsn05a8f9f14d02') {
      console.log('🔧 Mode simulation AliExpress activé (RAPIDAPI_KEY non configurée)');
      return getSimulatedAliExpressProductDetail(productId);
    }

    const response = await fetch(`https://${RAPIDAPI_CONFIG.host}${API_ENDPOINTS.product}?productId=${productId}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_CONFIG.key,
        'X-RapidAPI-Host': RAPIDAPI_CONFIG.host,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`API AliExpress detail error: ${response.status} - ${response.statusText}`);
      return getSimulatedAliExpressProductDetail(productId);
    }

    const data = await response.json();
    
    const product: AliExpressProduct = {
      id: data.productId || productId,
      title: data.title || data.name,
      description: data.description || data.desc,
      price: {
        current: parseFloat(data.price?.current || data.price || 0),
        original: parseFloat(data.price?.original || data.price || 0),
        currency: data.price?.currency || 'USD'
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
      seller: data.seller ? {
        name: data.seller.name,
        rating: parseFloat(data.seller.rating || 0),
        location: data.seller.location || 'China',
        followers: parseInt(data.seller.followers || 0)
      } : undefined,
      shipping: data.shipping ? {
        cost: parseFloat(data.shipping.cost || 0),
        location: data.shipping.location || 'Worldwide',
        estimatedDays: data.shipping.estimatedDays || '15-30 days',
        freeShipping: data.shipping.freeShipping || false
      } : undefined,
      discounts: data.discounts ? {
        percentage: parseFloat(data.discounts.percentage || 0),
        endDate: data.discounts.endDate
      } : undefined
    };

    // Mettre en cache
    setCachedData(cacheKey, product);
    return product;

  } catch (error) {
    console.error('Erreur API AliExpress detail:', error);
    return getSimulatedAliExpressProductDetail(productId);
  }
}

// Fonction pour générer des produits AliExpress simulés
function getSimulatedAliExpressProducts(params: AliExpressSearchParams): AliExpressProduct[] {
  const simulatedProducts = [
    {
      id: 'aliexpress-001',
      title: 'Wireless Bluetooth Earbuds - Premium Quality',
      description: 'High-quality wireless Bluetooth earbuds with noise cancellation, 30h battery life, touch control',
      price: { current: 29.99, original: 59.99, currency: 'USD' },
      images: ['https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400'],
      rating: 4.6,
      reviews: 2847,
      availability: true,
      category: 'Electronics',
      brand: 'Generic',
      features: ['Bluetooth 5.0', 'Noise Cancellation', '30h Battery', 'Touch Control'],
      specifications: { 'Connectivity': 'Bluetooth 5.0', 'Battery': '30 hours' },
      url: 'https://aliexpress.com/item/aliexpress-001',
      seller: {
        name: 'TechGadget_Store',
        rating: 4.7,
        location: 'Shenzhen, China',
        followers: 12500
      },
      shipping: {
        cost: 0,
        location: 'Worldwide',
        estimatedDays: '15-30 days',
        freeShipping: true
      },
      discounts: {
        percentage: 50,
        endDate: '2025-12-31'
      }
    },
    {
      id: 'aliexpress-002',
      title: 'Smart LED Strip Lights - RGB WiFi Control',
      description: '16ft RGB LED strip lights with WiFi control, compatible with Alexa and Google Home',
      price: { current: 19.99, original: 39.99, currency: 'USD' },
      images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
      rating: 4.5,
      reviews: 1892,
      availability: true,
      category: 'Home & Garden',
      brand: 'Generic',
      features: ['WiFi Control', 'RGB Colors', '16ft Length', 'Alexa Compatible'],
      specifications: { 'Length': '16ft', 'Control': 'WiFi + App' },
      url: 'https://aliexpress.com/item/aliexpress-002',
      seller: {
        name: 'SmartHome_Store',
        rating: 4.6,
        location: 'Guangzhou, China',
        followers: 8900
      },
      shipping: {
        cost: 2.99,
        location: 'Worldwide',
        estimatedDays: '20-35 days',
        freeShipping: false
      },
      discounts: {
        percentage: 50,
        endDate: '2025-12-31'
      }
    },
    {
      id: 'aliexpress-003',
      title: 'Portable Power Bank 20000mAh - Fast Charging',
      description: '20000mAh portable power bank with fast charging, compatible with all smartphones',
      price: { current: 24.99, original: 49.99, currency: 'USD' },
      images: ['https://images.unsplash.com/photo-1609592806598-04c4d7e5c1a8?w=400'],
      rating: 4.4,
      reviews: 3421,
      availability: true,
      category: 'Electronics',
      brand: 'Generic',
      features: ['20000mAh', 'Fast Charging', 'Universal Compatible', 'LED Display'],
      specifications: { 'Capacity': '20000mAh', 'Output': 'QC3.0' },
      url: 'https://aliexpress.com/item/aliexpress-003',
      seller: {
        name: 'PowerBank_Store',
        rating: 4.5,
        location: 'Dongguan, China',
        followers: 15600
      },
      shipping: {
        cost: 0,
        location: 'Worldwide',
        estimatedDays: '18-25 days',
        freeShipping: true
      },
      discounts: {
        percentage: 50,
        endDate: '2025-12-31'
      }
    },
    {
      id: 'aliexpress-004',
      title: 'Fashion Women Handbag - Leather Crossbody',
      description: 'Elegant leather crossbody handbag for women, multiple compartments, adjustable strap',
      price: { current: 34.99, original: 69.99, currency: 'USD' },
      images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400'],
      rating: 4.3,
      reviews: 1256,
      availability: true,
      category: 'Fashion',
      brand: 'Generic',
      features: ['Genuine Leather', 'Crossbody Design', 'Multiple Pockets', 'Adjustable Strap'],
      specifications: { 'Material': 'Genuine Leather', 'Style': 'Crossbody' },
      url: 'https://aliexpress.com/item/aliexpress-004',
      seller: {
        name: 'FashionBag_Store',
        rating: 4.4,
        location: 'Guangzhou, China',
        followers: 7800
      },
      shipping: {
        cost: 5.99,
        location: 'Worldwide',
        estimatedDays: '25-40 days',
        freeShipping: false
      },
      discounts: {
        percentage: 50,
        endDate: '2025-12-31'
      }
    },
    {
      id: 'aliexpress-005',
      title: 'Kitchen Knife Set - 8 Pieces Stainless Steel',
      description: 'Professional 8-piece kitchen knife set with wooden block, stainless steel blades',
      price: { current: 39.99, original: 79.99, currency: 'USD' },
      images: ['https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=400'],
      rating: 4.7,
      reviews: 2156,
      availability: true,
      category: 'Home & Garden',
      brand: 'Generic',
      features: ['8 Pieces', 'Stainless Steel', 'Wooden Block', 'Professional Grade'],
      specifications: { 'Material': 'Stainless Steel', 'Pieces': '8' },
      url: 'https://aliexpress.com/item/aliexpress-005',
      seller: {
        name: 'KitchenPro_Store',
        rating: 4.8,
        location: 'Yangjiang, China',
        followers: 11200
      },
      shipping: {
        cost: 0,
        location: 'Worldwide',
        estimatedDays: '20-30 days',
        freeShipping: true
      },
      discounts: {
        percentage: 50,
        endDate: '2025-12-31'
      }
    },
    {
      id: 'aliexpress-006',
      title: 'Smart Watch - Fitness Tracker with Heart Rate',
      description: 'Smart watch with fitness tracking, heart rate monitor, sleep tracking, waterproof',
      price: { current: 49.99, original: 99.99, currency: 'USD' },
      images: ['https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400'],
      rating: 4.5,
      reviews: 3892,
      availability: true,
      category: 'Electronics',
      brand: 'Generic',
      features: ['Heart Rate Monitor', 'Sleep Tracking', 'Waterproof', '7 Days Battery'],
      specifications: { 'Battery': '7 days', 'Waterproof': 'IP68' },
      url: 'https://aliexpress.com/item/aliexpress-006',
      seller: {
        name: 'SmartWatch_Store',
        rating: 4.6,
        location: 'Shenzhen, China',
        followers: 18900
      },
      shipping: {
        cost: 0,
        location: 'Worldwide',
        estimatedDays: '15-25 days',
        freeShipping: true
      },
      discounts: {
        percentage: 50,
        endDate: '2025-12-31'
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

// Fonction pour générer un produit AliExpress simulé détaillé
function getSimulatedAliExpressProductDetail(productId: string): AliExpressProduct | null {
  const products = getSimulatedAliExpressProducts({ query: '' });
  const product = products.find(p => p.id === productId);
  
  if (product) {
    return product;
  }
  
  return null;
}

// Fonction pour obtenir les catégories disponibles
function getAliExpressCategories(): string[] {
  return [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports & Outdoor',
    'Toys & Games',
    'Beauty & Health',
    'Automotive',
    'Tools & Hardware',
    'Jewelry & Watches',
    'Baby Products',
    'Pet Supplies',
    'Office Supplies',
    'Garden & Patio',
    'Kitchen & Dining',
    'Furniture',
    'Lighting',
    'Storage & Organization',
    'Arts & Crafts',
    'Musical Instruments',
    'Books & Media'
  ];
}

// Route principale
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const query = searchParams.get('query') || '';
    const productId = searchParams.get('productId');
    const category = searchParams.get('category') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    // Vérifier le cache pour les requêtes de recherche
    if (action === 'search' || !action) {
      const cacheKey = `aliexpress-search-${query}-${category}-${page}-${limit}`;
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

      const products = await searchAliExpressProducts({
        query,
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
    if (action === 'detail' && productId) {
      const product = await getAliExpressProductDetail(productId);
      
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
      const categories = getAliExpressCategories();
      
      return NextResponse.json({
        success: true,
        data: categories
      });
    }

    // Action: statistiques
    if (action === 'stats') {
      const products = getSimulatedAliExpressProducts({ query: '' });
      
      return NextResponse.json({
        success: true,
        data: {
          totalProducts: products.length,
          categories: getAliExpressCategories().length,
          averagePrice: products.reduce((sum, p) => sum + p.price.current, 0) / products.length,
          averageRating: products.reduce((sum, p) => sum + (p.rating || 0), 0) / products.length,
          freeShippingProducts: products.filter(p => p.shipping?.freeShipping).length
        }
      });
    }

    return NextResponse.json({
      success: false,
      message: 'Action non reconnue'
    }, { status: 400 });

  } catch (error) {
    console.error('Erreur API AliExpress:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la récupération des données',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
} 