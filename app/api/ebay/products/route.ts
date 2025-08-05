import { NextRequest, NextResponse } from 'next/server';

// Types pour l'API eBay
interface EbayProduct {
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
  condition: 'new' | 'used' | 'refurbished';
  seller?: {
    name: string;
    rating: number;
    location: string;
    feedback: number;
  };
  shipping?: {
    cost: number;
    location: string;
    estimatedDays: string;
  };
  auction?: {
    endTime: string;
    currentBid: number;
    totalBids: number;
  };
}

interface EbaySearchParams {
  query: string;
  category?: string;
  condition?: 'new' | 'used' | 'refurbished';
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price' | 'rating' | 'endingSoon' | 'relevance';
  page?: number;
  limit?: number;
  location?: string;
}

// Configuration RapidAPI eBay
const RAPIDAPI_CONFIG = {
  host: 'ebay32.p.rapidapi.com',
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

// Fonction pour rechercher des produits eBay
async function searchEbayProducts(params: EbaySearchParams): Promise<EbayProduct[]> {
  try {
    // Vérifier si on a une clé API valide
    if (!RAPIDAPI_CONFIG.key || RAPIDAPI_CONFIG.key === '0a9f369c5emsh0c62e1fe4db2cd4p1a5adbjsn05a8f9f14d02') {
      console.log('🔧 Mode simulation eBay activé (RAPIDAPI_KEY non configurée)');
      return getSimulatedEbayProducts(params);
    }

    const searchParams = new URLSearchParams({
      q: params.query,
      ...(params.category && { category: params.category }),
      ...(params.condition && { condition: params.condition }),
      ...(params.minPrice && { minPrice: params.minPrice.toString() }),
      ...(params.maxPrice && { maxPrice: params.maxPrice.toString() }),
      ...(params.sortBy && { sortBy: params.sortBy }),
      ...(params.page && { page: params.page.toString() }),
      ...(params.limit && { limit: params.limit.toString() }),
      ...(params.location && { location: params.location })
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
      console.error(`API eBay error: ${response.status} - ${response.statusText}`);
      // En cas d'erreur API, retourner des données simulées
      return getSimulatedEbayProducts(params);
    }

    const data = await response.json();
    
    // Transformer les données eBay en format standard
    return data.items?.map((item: any) => ({
      id: item.itemId || item.id,
      title: item.title || item.name,
      description: item.description || item.desc,
      price: {
        current: parseFloat(item.price?.current || item.price || 0),
        original: parseFloat(item.price?.original || item.price || 0),
        currency: item.price?.currency || 'USD'
      },
      images: item.images || [item.image] || [],
      rating: parseFloat(item.rating || 0),
      reviews: parseInt(item.reviews || 0),
      availability: item.availability !== false,
      category: item.category || 'General',
      brand: item.brand,
      features: item.features || [],
      specifications: item.specifications || {},
      url: item.url || item.link,
      condition: item.condition || 'used',
      seller: item.seller ? {
        name: item.seller.name,
        rating: parseFloat(item.seller.rating || 0),
        location: item.seller.location || 'United States',
        feedback: parseInt(item.seller.feedback || 0)
      } : undefined,
      shipping: item.shipping ? {
        cost: parseFloat(item.shipping.cost || 0),
        location: item.shipping.location || 'United States',
        estimatedDays: item.shipping.estimatedDays || '3-5 days'
      } : undefined,
      auction: item.auction ? {
        endTime: item.auction.endTime,
        currentBid: parseFloat(item.auction.currentBid || 0),
        totalBids: parseInt(item.auction.totalBids || 0)
      } : undefined
    })) || [];

  } catch (error) {
    console.error('Erreur API eBay:', error);
    // En cas d'erreur, retourner des données simulées
    return getSimulatedEbayProducts(params);
  }
}

// Fonction pour obtenir les détails d'un produit
async function getEbayProductDetail(itemId: string): Promise<EbayProduct | null> {
  try {
    // Vérifier le cache
    const cacheKey = `ebay-detail-${itemId}`;
    const cached = getCachedData(cacheKey);
    if (cached) {
      return cached;
    }

    // Vérifier si on a une clé API valide
    if (!RAPIDAPI_CONFIG.key || RAPIDAPI_CONFIG.key === '0a9f369c5emsh0c62e1fe4db2cd4p1a5adbjsn05a8f9f14d02') {
      console.log('🔧 Mode simulation eBay activé (RAPIDAPI_KEY non configurée)');
      return getSimulatedEbayProductDetail(itemId);
    }

    const response = await fetch(`https://${RAPIDAPI_CONFIG.host}${API_ENDPOINTS.product}?itemId=${itemId}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_CONFIG.key,
        'X-RapidAPI-Host': RAPIDAPI_CONFIG.host,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`API eBay detail error: ${response.status} - ${response.statusText}`);
      return getSimulatedEbayProductDetail(itemId);
    }

    const data = await response.json();
    
    const product: EbayProduct = {
      id: data.itemId || itemId,
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
      condition: data.condition || 'used',
      seller: data.seller ? {
        name: data.seller.name,
        rating: parseFloat(data.seller.rating || 0),
        location: data.seller.location || 'United States',
        feedback: parseInt(data.seller.feedback || 0)
      } : undefined,
      shipping: data.shipping ? {
        cost: parseFloat(data.shipping.cost || 0),
        location: data.shipping.location || 'United States',
        estimatedDays: data.shipping.estimatedDays || '3-5 days'
      } : undefined,
      auction: data.auction ? {
        endTime: data.auction.endTime,
        currentBid: parseFloat(data.auction.currentBid || 0),
        totalBids: parseInt(data.auction.totalBids || 0)
      } : undefined
    };

    // Mettre en cache
    setCachedData(cacheKey, product);
    return product;

  } catch (error) {
    console.error('Erreur API eBay detail:', error);
    return getSimulatedEbayProductDetail(itemId);
  }
}

// Fonction pour générer des produits eBay simulés
function getSimulatedEbayProducts(params: EbaySearchParams): EbayProduct[] {
  const simulatedProducts = [
    {
      id: 'ebay-001',
      title: 'iPhone 14 Pro Max 256GB - Excellent Condition',
      description: 'iPhone 14 Pro Max 256GB, excellent condition, unlocked, comes with original box and charger',
      price: { current: 899, original: 1099, currency: 'USD' },
      images: ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400'],
      rating: 4.8,
      reviews: 156,
      availability: true,
      category: 'Electronics',
      brand: 'Apple',
      features: ['Unlocked', '256GB', 'Excellent Condition', 'Original Box'],
      specifications: { 'Storage': '256GB', 'Color': 'Space Black', 'Condition': 'Excellent' },
      url: 'https://ebay.com/itm/ebay-001',
      condition: 'used' as const,
      seller: {
        name: 'TechDeals_Store',
        rating: 4.9,
        location: 'California, United States',
        feedback: 1250
      },
      shipping: {
        cost: 15.99,
        location: 'United States',
        estimatedDays: '3-5 days'
      }
    },
    {
      id: 'ebay-002',
      title: 'MacBook Air M2 13" - Like New',
      description: 'MacBook Air M2 13-inch, like new condition, 8GB RAM, 256GB SSD, perfect for work and study',
      price: { current: 999, original: 1199, currency: 'USD' },
      images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'],
      rating: 4.9,
      reviews: 89,
      availability: true,
      category: 'Electronics',
      brand: 'Apple',
      features: ['M2 Chip', '8GB RAM', '256GB SSD', 'Like New'],
      specifications: { 'Processor': 'M2', 'RAM': '8GB', 'Storage': '256GB' },
      url: 'https://ebay.com/itm/ebay-002',
      condition: 'used' as const,
      seller: {
        name: 'LaptopWorld',
        rating: 4.8,
        location: 'Texas, United States',
        feedback: 890
      },
      shipping: {
        cost: 25.99,
        location: 'United States',
        estimatedDays: '2-4 days'
      }
    },
    {
      id: 'ebay-003',
      title: 'Sony WH-1000XM4 Wireless Headphones',
      description: 'Sony WH-1000XM4 noise-canceling wireless headphones, great condition, includes carrying case',
      price: { current: 249, original: 349, currency: 'USD' },
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'],
      rating: 4.7,
      reviews: 234,
      availability: true,
      category: 'Electronics',
      brand: 'Sony',
      features: ['Noise Canceling', 'Wireless', '30h Battery', 'Carrying Case'],
      specifications: { 'Connectivity': 'Bluetooth 5.0', 'Battery': '30 hours' },
      url: 'https://ebay.com/itm/ebay-003',
      condition: 'used' as const,
      seller: {
        name: 'AudioPro_Store',
        rating: 4.7,
        location: 'New York, United States',
        feedback: 567
      },
      shipping: {
        cost: 12.99,
        location: 'United States',
        estimatedDays: '3-5 days'
      }
    },
    {
      id: 'ebay-004',
      title: 'Nike Air Jordan 1 Retro High OG',
      description: 'Nike Air Jordan 1 Retro High OG, size 10, excellent condition, authentic sneakers',
      price: { current: 299, original: 399, currency: 'USD' },
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'],
      rating: 4.6,
      reviews: 178,
      availability: true,
      category: 'Fashion',
      brand: 'Nike',
      features: ['Authentic', 'Size 10', 'Excellent Condition', 'Original Box'],
      specifications: { 'Size': '10', 'Color': 'Chicago', 'Style': 'Retro High OG' },
      url: 'https://ebay.com/itm/ebay-004',
      condition: 'used' as const,
      seller: {
        name: 'SneakerHead_Store',
        rating: 4.8,
        location: 'Florida, United States',
        feedback: 1234
      },
      shipping: {
        cost: 18.99,
        location: 'United States',
        estimatedDays: '2-3 days'
      }
    },
    {
      id: 'ebay-005',
      title: 'Canon EOS R6 Mirrorless Camera',
      description: 'Canon EOS R6 mirrorless camera, excellent condition, includes 24-105mm lens',
      price: { current: 1899, original: 2499, currency: 'USD' },
      images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400'],
      rating: 4.9,
      reviews: 67,
      availability: true,
      category: 'Electronics',
      brand: 'Canon',
      features: ['Mirrorless', '24-105mm Lens', 'Excellent Condition', 'Full Frame'],
      specifications: { 'Sensor': 'Full Frame', 'Lens': '24-105mm f/4L' },
      url: 'https://ebay.com/itm/ebay-005',
      condition: 'used' as const,
      seller: {
        name: 'CameraPro_Store',
        rating: 4.9,
        location: 'California, United States',
        feedback: 789
      },
      shipping: {
        cost: 35.99,
        location: 'United States',
        estimatedDays: '3-5 days'
      }
    },
    {
      id: 'ebay-006',
      title: 'Rolex Submariner Date - Authentic',
      description: 'Authentic Rolex Submariner Date, excellent condition, includes papers and box',
      price: { current: 8999, original: 12999, currency: 'USD' },
      images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400'],
      rating: 4.9,
      reviews: 23,
      availability: true,
      category: 'Fashion',
      brand: 'Rolex',
      features: ['Authentic', 'Papers Included', 'Original Box', 'Excellent Condition'],
      specifications: { 'Model': 'Submariner Date', 'Material': 'Stainless Steel' },
      url: 'https://ebay.com/itm/ebay-006',
      condition: 'used' as const,
      seller: {
        name: 'LuxuryWatches_Store',
        rating: 4.9,
        location: 'New York, United States',
        feedback: 456
      },
      shipping: {
        cost: 99.99,
        location: 'United States',
        estimatedDays: '1-2 days'
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

// Fonction pour générer un produit eBay simulé détaillé
function getSimulatedEbayProductDetail(itemId: string): EbayProduct | null {
  const products = getSimulatedEbayProducts({ query: '' });
  const product = products.find(p => p.id === itemId);
  
  if (product) {
    return product;
  }
  
  return null;
}

// Fonction pour obtenir les catégories disponibles
function getEbayCategories(): string[] {
  return [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports & Outdoor',
    'Toys & Games',
    'Books & Media',
    'Automotive',
    'Health & Beauty',
    'Jewelry & Watches',
    'Collectibles',
    'Art',
    'Musical Instruments',
    'Pet Supplies',
    'Baby Products',
    'Office Supplies',
    'Industrial & Scientific',
    'Tools & Workshop',
    'Garden & Patio',
    'Kitchen & Dining',
    'Furniture'
  ];
}

// Route principale
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const query = searchParams.get('query') || '';
    const itemId = searchParams.get('itemId');
    const category = searchParams.get('category') || '';
    const condition = searchParams.get('condition') as 'new' | 'used' | 'refurbished' || undefined;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    // Vérifier le cache pour les requêtes de recherche
    if (action === 'search' || !action) {
      const cacheKey = `ebay-search-${query}-${category}-${condition}-${page}-${limit}`;
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

      const products = await searchEbayProducts({
        query,
        category,
        condition,
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
      const product = await getEbayProductDetail(itemId);
      
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
      const categories = getEbayCategories();
      
      return NextResponse.json({
        success: true,
        data: categories
      });
    }

    // Action: statistiques
    if (action === 'stats') {
      const products = getSimulatedEbayProducts({ query: '' });
      
      return NextResponse.json({
        success: true,
        data: {
          totalProducts: products.length,
          categories: getEbayCategories().length,
          averagePrice: products.reduce((sum, p) => sum + p.price.current, 0) / products.length,
          averageRating: products.reduce((sum, p) => sum + (p.rating || 0), 0) / products.length,
          conditions: ['new', 'used', 'refurbished']
        }
      });
    }

    return NextResponse.json({
      success: false,
      message: 'Action non reconnue'
    }, { status: 400 });

  } catch (error) {
    console.error('Erreur API eBay:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la récupération des données',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
} 