import { NextRequest, NextResponse } from 'next/server';

// Types pour l'API Amazon
interface AmazonProduct {
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
}

interface AmazonSearchParams {
  query: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sortBy?: 'price' | 'rating' | 'relevance' | 'newest';
  page?: number;
  limit?: number;
}

// Configuration RapidAPI
const RAPIDAPI_CONFIG = {
  host: 'otapi-amazon.p.rapidapi.com',
  key: process.env.RAPIDAPI_KEY || '44a31cad34msh7d83d60da69d252p1266cajsn15c88abcf70a'
};

// Endpoints disponibles selon la documentation RapidAPI
const API_ENDPOINTS = {
  search: '/search',
  product: '/product',
  categories: '/categories',
  deals: '/deals',
  trending: '/trending'
};

// Fonction pour appeler l'API RapidAPI Amazon
async function searchAmazonProducts(params: AmazonSearchParams): Promise<AmazonProduct[]> {
  try {
    // Vérifier si on a une clé API valide
    if (!RAPIDAPI_CONFIG.key || RAPIDAPI_CONFIG.key === '44a31cad34msh7d83d60da69d252p1266cajsn15c88abcf70a') {
      console.log('🔧 Mode simulation Amazon activé (RAPIDAPI_KEY non configurée)');
      return getSimulatedAmazonProducts(params);
    }

    const searchParams = new URLSearchParams({
      query: params.query,
      ...(params.category && { category: params.category }),
      ...(params.minPrice && { minPrice: params.minPrice.toString() }),
      ...(params.maxPrice && { maxPrice: params.maxPrice.toString() }),
      ...(params.rating && { rating: params.rating.toString() }),
      ...(params.sortBy && { sortBy: params.sortBy }),
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
      console.error(`API Amazon error: ${response.status} - ${response.statusText}`);
      // En cas d'erreur API, retourner des données simulées
      return getSimulatedAmazonProducts(params);
    }

    const data = await response.json();
    
    // Transformer les données Amazon en format standard
    return data.products?.map((product: any) => ({
      id: product.asin || product.id,
      title: product.title || product.name,
      description: product.description || product.features?.join(', '),
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
      url: product.url || product.link
    })) || [];

  } catch (error) {
    console.error('Erreur API Amazon:', error);
    // En cas d'erreur, retourner des données simulées
    return getSimulatedAmazonProducts(params);
  }
}

// Fonction pour générer des produits Amazon simulés
function getSimulatedAmazonProducts(params: AmazonSearchParams): AmazonProduct[] {
  const simulatedProducts = [
    {
      id: 'B08N5WRWNW',
      title: 'Echo Dot (4th Gen) | Smart speaker with Alexa',
      description: 'Smart speaker with Alexa | Charcoal',
      price: { current: 49.99, original: 59.99, currency: 'USD' },
      images: ['https://images.unsplash.com/photo-1543512214-318c7553f230?w=400'],
      rating: 4.7,
      reviews: 125000,
      availability: true,
      category: 'Electronics',
      brand: 'Amazon',
      features: ['Voice control', 'Smart home compatible', 'Bluetooth speaker'],
      specifications: { 'Connectivity': 'Wi-Fi, Bluetooth', 'Power': '15W' },
      url: 'https://amazon.com/echo-dot'
    },
    {
      id: 'B08C7W5JLM',
      title: 'Fire TV Stick 4K Max streaming device',
      description: 'Wi-Fi 6, Alexa Voice Remote (includes TV controls)',
      price: { current: 54.99, original: 69.99, currency: 'USD' },
      images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400'],
      rating: 4.6,
      reviews: 89000,
      availability: true,
      category: 'Electronics',
      brand: 'Amazon',
      features: ['4K Ultra HD', 'Wi-Fi 6', 'Alexa Voice Remote'],
      specifications: { 'Resolution': '4K Ultra HD', 'Wi-Fi': 'Wi-Fi 6' },
      url: 'https://amazon.com/fire-tv-stick'
    },
    {
      id: 'B08F7PTF54',
      title: 'Kindle Paperwhite (8 GB)',
      description: 'Now with a 6.8" display and thinner borders',
      price: { current: 139.99, original: 159.99, currency: 'USD' },
      images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400'],
      rating: 4.8,
      reviews: 45000,
      availability: true,
      category: 'Electronics',
      brand: 'Amazon',
      features: ['6.8" display', 'Waterproof', 'Weeks of battery life'],
      specifications: { 'Display': '6.8"', 'Storage': '8 GB', 'Battery': 'Weeks' },
      url: 'https://amazon.com/kindle-paperwhite'
    },
    {
      id: 'B08N5KWB9H',
      title: 'Ring Video Doorbell 3',
      description: '1080p HD video, improved motion detection',
      price: { current: 199.99, original: 229.99, currency: 'USD' },
      images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
      rating: 4.5,
      reviews: 67000,
      availability: true,
      category: 'Electronics',
      brand: 'Ring',
      features: ['1080p HD', 'Motion detection', 'Two-way talk'],
      specifications: { 'Resolution': '1080p HD', 'Connectivity': 'Wi-Fi' },
      url: 'https://amazon.com/ring-doorbell'
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

// Fonction pour obtenir les détails d'un produit
async function getAmazonProductDetails(productId: string): Promise<AmazonProduct | null> {
  try {
    const response = await fetch(`https://${RAPIDAPI_CONFIG.host}/product/${productId}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_CONFIG.key,
        'X-RapidAPI-Host': RAPIDAPI_CONFIG.host,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API Amazon product details error: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      id: data.asin || data.id,
      title: data.title || data.name,
      description: data.description || data.features?.join(', '),
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
      url: data.url || data.link
    };

  } catch (error) {
    console.error('Erreur détails produit Amazon:', error);
    return null;
  }
}

// Fonction pour obtenir les catégories disponibles
async function getAmazonCategories(): Promise<string[]> {
  try {
    // Vérifier si on a une clé API valide
    if (!RAPIDAPI_CONFIG.key || RAPIDAPI_CONFIG.key === '44a31cad34msh7d83d60da69d252p1266cajsn15c88abcf70a') {
      console.log('🔧 Mode simulation Amazon activé (RAPIDAPI_KEY non configurée)');
      return getSimulatedAmazonCategories();
    }

    const response = await fetch(`https://${RAPIDAPI_CONFIG.host}${API_ENDPOINTS.categories}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_CONFIG.key,
        'X-RapidAPI-Host': RAPIDAPI_CONFIG.host,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.error(`API Amazon categories error: ${response.status} - ${response.statusText}`);
      // En cas d'erreur API, retourner des catégories simulées
      return getSimulatedAmazonCategories();
    }

    const data = await response.json();
    return data.categories || [];

  } catch (error) {
    console.error('Erreur catégories Amazon:', error);
    // En cas d'erreur, retourner des catégories simulées
    return getSimulatedAmazonCategories();
  }
}

// Fonction pour générer des catégories Amazon simulées
function getSimulatedAmazonCategories(): string[] {
  return [
    'Electronics',
    'Computers',
    'Smart Home',
    'Books',
    'Movies & TV',
    'Music',
    'Video Games',
    'Home & Kitchen',
    'Sports & Outdoors',
    'Automotive',
    'Beauty & Personal Care',
    'Health & Household',
    'Toys & Games',
    'Clothing, Shoes & Jewelry',
    'Tools & Home Improvement',
    'Pet Supplies',
    'Baby Products',
    'Office Products',
    'Garden & Outdoor',
    'Industrial & Scientific'
  ];
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    // Gestion des différentes actions
    switch (action) {
      case 'categories':
        const categories = await getAmazonCategories();
        return NextResponse.json({
          success: true,
          data: categories
        });

      case 'product':
        const productId = searchParams.get('id');
        if (!productId) {
          return NextResponse.json({
            success: false,
            error: 'ID produit requis'
          }, { status: 400 });
        }
        
        const product = await getAmazonProductDetails(productId);
        return NextResponse.json({
          success: true,
          data: product
        });

      case 'search':
      default:
        // Paramètres de recherche
        const searchParamsObj: AmazonSearchParams = {
          query: searchParams.get('query') || '',
          category: searchParams.get('category') || undefined,
          minPrice: searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined,
          maxPrice: searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined,
          rating: searchParams.get('rating') ? parseFloat(searchParams.get('rating')!) : undefined,
          sortBy: searchParams.get('sortBy') as any || undefined,
          page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
          limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20
        };

        if (!searchParamsObj.query) {
          return NextResponse.json({
            success: false,
            error: 'Paramètre de recherche requis'
          }, { status: 400 });
        }

        const products = await searchAmazonProducts(searchParamsObj);
        
        return NextResponse.json({
          success: true,
          data: products,
          pagination: {
            page: searchParamsObj.page || 1,
            limit: searchParamsObj.limit || 20,
            total: products.length
          }
        });
    }

  } catch (error) {
    console.error('Erreur API Amazon:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la récupération des données Amazon',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
}

// Cache pour les requêtes fréquentes
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getCachedData(key: string): any | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}

function setCachedData(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() });
} 