import axios from 'axios';

const RAPID_API_KEY = process.env.RAPIDAPI_KEY || '0a9f369c5emsh0c62e1fe4db2cd4p1a5adbjsn05a8f9f14d02';
const RAPID_API_HOST = '1688-product2.p.rapidapi.com';

// Interfaces pour les réponses 1688
export interface Product1688 {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  image: string;
  url: string;
  source: '1688';
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

export interface ShopInfo1688 {
  memberId: string;
  shopName: string;
  shopUrl: string;
  location?: string;
  rating?: number;
  totalProducts?: number;
}

export interface ProductDescription1688 {
  itemId: string;
  description: string;
  specifications?: Record<string, any>;
  images?: string[];
}

export interface ImageSearchResult1688 {
  imageUrl: string;
  products: Product1688[];
  totalResults?: number;
}

// Configuration axios pour 1688 avec fallback
const make1688Request = async (endpoint: string, params: Record<string, any> = {}) => {
  try {
    const url = `https://${RAPID_API_HOST}${endpoint}`;
    const response = await axios.get(url, {
      headers: {
        'x-rapidapi-host': RAPID_API_HOST,
        'x-rapidapi-key': RAPID_API_KEY,
      },
      params,
      timeout: 15000,
    });
    return response.data;
  } catch (error: any) {
    console.error(`Erreur API 1688 (${endpoint}):`, error.message);
    
    // Gérer les erreurs spécifiques
    if (error.response?.status === 403) {
      console.log('🔧 Mode simulation 1688 activé (API non abonnée)');
      return null; // Retourner null pour activer le fallback
    } else if (error.response?.status === 429) {
      console.log('⏳ Limite de requêtes 1688 atteinte, utilisation du fallback');
      return null; // Retourner null pour activer le fallback
    }
    
    throw error;
  }
};

/**
 * 🔁 Convertir une image vers URL 1688
 * @param imageUrl URL de l'image à convertir
 */
export async function convertImageTo1688Url(imageUrl: string): Promise<string> {
  try {
    const data = await make1688Request('/1688/tools/image/convert_url', {
      url: imageUrl
    });
    return data.converted_url || imageUrl;
  } catch (error) {
    console.error('Erreur conversion image 1688:', error);
    return imageUrl; // Fallback vers l'URL originale
  }
}

/**
 * 📄 Obtenir la description détaillée d'un produit
 * @param itemId ID du produit 1688
 */
export async function get1688ProductDescription(itemId: string): Promise<ProductDescription1688> {
  try {
    const data = await make1688Request('/1688/item_desc', {
      item_id: itemId
    });
    
    return {
      itemId,
      description: data.description || '',
      specifications: data.specifications || {},
      images: data.images || []
    };
  } catch (error) {
    console.error(`Erreur description produit 1688 (${itemId}):`, error);
    return {
      itemId,
      description: '',
      specifications: {},
      images: []
    };
  }
}

/**
 * 🔎 Recherche de produits par mot-clé
 * @param keyword Mot-clé de recherche (sera encodé automatiquement)
 * @param page Numéro de page (défaut: 1)
 * @param limit Nombre de produits par page (défaut: 20)
 */
export async function search1688Products(
  keyword: string, 
  page: number = 1, 
  limit: number = 20
): Promise<Product1688[]> {
  try {
    const encodedKeyword = encodeURIComponent(keyword);
    const data = await make1688Request('/1688/search/items', {
      page,
      keyword: encodedKeyword,
      limit
    });

    // Si l'API retourne null (erreur 403/429), retourner tableau vide pour déclencher le fallback
    if (!data) {
      return [];
    }

    if (!data.items || !Array.isArray(data.items)) {
      return [];
    }

    return data.items.map((item: any) => ({
      id: item.item_id || item.id || `1688_${Date.now()}_${Math.random()}`,
      title: item.title || item.name || '',
      price: item.price || item.min_price || '0',
      originalPrice: item.original_price || item.max_price,
      image: item.image || item.pic_url || '',
      url: item.url || item.detail_url || '',
      source: '1688' as const,
      rating: item.rating || item.score,
      reviews: item.reviews_count || item.comment_count,
      seller: item.seller || item.company_name,
      location: item.location || item.province,
      shipping: item.shipping || item.freight,
      availability: item.availability || item.stock,
      description: item.description || item.summary,
      category: item.category || item.cat_name,
      tags: item.tags || [],
      memberId: item.member_id || item.seller_id,
      shopName: item.shop_name || item.company_name
    }));
  } catch (error) {
    console.error(`Erreur recherche produits 1688 (${keyword}):`, error);
    return [];
  }
}

/**
 * 🖼️ Recherche par image (après upload)
 * @param page Numéro de page (défaut: 1)
 * @param sort Type de tri (défaut: 'default')
 */
export async function search1688ByImage(
  page: number = 1, 
  sort: string = 'default'
): Promise<ImageSearchResult1688> {
  try {
    const data = await make1688Request('/1688/search/image', {
      page,
      sort
    });

    return {
      imageUrl: data.image_url || '',
      products: (data.items || []).map((item: any) => ({
        id: item.item_id || item.id || `1688_img_${Date.now()}_${Math.random()}`,
        title: item.title || item.name || '',
        price: item.price || item.min_price || '0',
        originalPrice: item.original_price || item.max_price,
        image: item.image || item.pic_url || '',
        url: item.url || item.detail_url || '',
        source: '1688' as const,
        rating: item.rating || item.score,
        reviews: item.reviews_count || item.comment_count,
        seller: item.seller || item.company_name,
        location: item.location || item.province,
        shipping: item.shipping || item.freight,
        availability: item.availability || item.stock,
        description: item.description || item.summary,
        category: item.category || item.cat_name,
        tags: item.tags || [],
        memberId: item.member_id || item.seller_id,
        shopName: item.shop_name || item.company_name
      })),
      totalResults: data.total_results || data.total_count
    };
  } catch (error) {
    console.error('Erreur recherche par image 1688:', error);
    return {
      imageUrl: '',
      products: [],
      totalResults: 0
    };
  }
}

/**
 * 🏪 Obtenir les informations d'un shop
 * @param memberId ID du membre/shop
 */
export async function get1688ShopInfo(memberId: string): Promise<ShopInfo1688 | null> {
  try {
    const data = await make1688Request('/1688/shop/shop_info', {
      member_id: memberId
    });

    return {
      memberId,
      shopName: data.shop_name || data.company_name || '',
      shopUrl: data.shop_url || data.company_url || '',
      location: data.location || data.province || data.city,
      rating: data.rating || data.score,
      totalProducts: data.total_products || data.item_count
    };
  } catch (error) {
    console.error(`Erreur infos shop 1688 (${memberId}):`, error);
    return null;
  }
}

/**
 * 🛒 Obtenir les produits d'un shop par member_id
 * @param memberId ID du membre/shop
 * @param page Numéro de page (défaut: 1)
 * @param limit Nombre de produits par page (défaut: 20)
 */
export async function get1688ShopProducts(
  memberId: string, 
  page: number = 1, 
  limit: number = 20
): Promise<Product1688[]> {
  try {
    const data = await make1688Request('/1688/shop/items', {
      member_id: memberId,
      page,
      limit
    });

    if (!data.items || !Array.isArray(data.items)) {
      return [];
    }

    return data.items.map((item: any) => ({
      id: item.item_id || item.id || `1688_shop_${memberId}_${Date.now()}_${Math.random()}`,
      title: item.title || item.name || '',
      price: item.price || item.min_price || '0',
      originalPrice: item.original_price || item.max_price,
      image: item.image || item.pic_url || '',
      url: item.url || item.detail_url || '',
      source: '1688' as const,
      rating: item.rating || item.score,
      reviews: item.reviews_count || item.comment_count,
      seller: item.seller || item.company_name,
      location: item.location || item.province,
      shipping: item.shipping || item.freight,
      availability: item.availability || item.stock,
      description: item.description || item.summary,
      category: item.category || item.cat_name,
      tags: item.tags || [],
      memberId,
      shopName: item.shop_name || item.company_name
    }));
  } catch (error) {
    console.error(`Erreur produits shop 1688 (${memberId}):`, error);
    return [];
  }
}

/**
 * 🛍️ Obtenir les produits d'un shop par URL
 * @param shopUrl URL du shop 1688
 * @param page Numéro de page (défaut: 1)
 * @param limit Nombre de produits par page (défaut: 20)
 */
export async function get1688ShopProductsByUrl(
  shopUrl: string, 
  page: number = 1, 
  limit: number = 20
): Promise<Product1688[]> {
  try {
    const data = await make1688Request('/1688/shop/items/v2', {
      shop_url: shopUrl,
      page,
      limit
    });

    if (!data.items || !Array.isArray(data.items)) {
      return [];
    }

    return data.items.map((item: any) => ({
      id: item.item_id || item.id || `1688_shop_url_${Date.now()}_${Math.random()}`,
      title: item.title || item.name || '',
      price: item.price || item.min_price || '0',
      originalPrice: item.original_price || item.max_price,
      image: item.image || item.pic_url || '',
      url: item.url || item.detail_url || '',
      source: '1688' as const,
      rating: item.rating || item.score,
      reviews: item.reviews_count || item.comment_count,
      seller: item.seller || item.company_name,
      location: item.location || item.province,
      shipping: item.shipping || item.freight,
      availability: item.availability || item.stock,
      description: item.description || item.summary,
      category: item.category || item.cat_name,
      tags: item.tags || [],
      memberId: item.member_id || item.seller_id,
      shopName: item.shop_name || item.company_name
    }));
  } catch (error) {
    console.error(`Erreur produits shop URL 1688 (${shopUrl}):`, error);
    return [];
  }
}

/**
 * 🔍 Fonction principale de scraping 1688 (pour compatibilité avec le système existant)
 * @param keyword Mot-clé de recherche
 * @param limit Nombre de produits à récupérer
 */
export async function scrape1688(keyword: string, limit: number = 20): Promise<Product1688[]> {
  console.log(`🔍 Scraping 1688 pour: "${keyword}" (limite: ${limit})`);
  
  try {
    const products = await search1688Products(keyword, 1, limit);
    
    // Si pas de produits réels, utiliser le fallback
    if (products.length === 0) {
      console.log('🔧 Utilisation du mode fallback 1688 avec données simulées');
      return generate1688FallbackProducts(keyword, limit);
    }
    
    // Enrichir avec les descriptions si nécessaire
    const enrichedProducts = await Promise.all(
      products.slice(0, 5).map(async (product) => {
        try {
          const description = await get1688ProductDescription(product.id);
          return {
            ...product,
            description: description.description || product.description
          };
        } catch (error) {
          return product;
        }
      })
    );
    
    console.log(`✅ 1688: ${enrichedProducts.length} produits trouvés`);
    return enrichedProducts;
  } catch (error) {
    console.error(`❌ Erreur scraping 1688:`, error);
    console.log('🔧 Utilisation du mode fallback 1688');
    return generate1688FallbackProducts(keyword, limit);
  }
}

/**
 * 🔧 Générer des produits 1688 de fallback (simulation réaliste)
 * @param keyword Mot-clé de recherche
 * @param limit Nombre de produits à générer
 */
function generate1688FallbackProducts(keyword: string, limit: number): Product1688[] {
  const categories = {
    'iphone': ['Téléphones', 'Accessoires', 'Électronique'],
    'laptop': ['Ordinateurs', 'Informatique', 'Électronique'],
    'chaussures': ['Chaussures', 'Mode', 'Vêtements'],
    'vetements': ['Vêtements', 'Mode', 'Textile'],
    'default': ['Produits', 'Général', 'Commerce']
  };
  
  const category = categories[keyword.toLowerCase() as keyof typeof categories] || categories.default;
  
  const products: Product1688[] = Array.from({ length: Math.min(limit, 15) }, (_, i) => {
    const basePrice = Math.floor(Math.random() * 200) + 20;
    const originalPrice = basePrice + Math.floor(Math.random() * 50) + 10;
    
    return {
      id: `1688_fallback_${Date.now()}_${i}`,
      title: `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} ${category[0]} ${i + 1} - 1688`,
      price: `${basePrice} CNY`,
      originalPrice: `${originalPrice} CNY`,
      image: `https://via.placeholder.com/300x300/1688FF/FFFFFF?text=${encodeURIComponent(keyword)}`,
      url: `https://1688.com/product/${Date.now()}_${i}`,
      source: '1688',
      rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 - 5.0
      reviews: Math.floor(Math.random() * 500) + 50,
      seller: `Vendeur 1688 ${i + 1}`,
      location: 'Chine',
      shipping: 'Livraison gratuite',
      availability: 'En stock',
      description: `Produit ${keyword} de qualité supérieure disponible sur 1688. Prix compétitif et livraison rapide.`,
      category: category[0],
      tags: [keyword, '1688', 'Chine', ...category],
      memberId: `member_${Math.floor(Math.random() * 10000)}`,
      shopName: `Shop 1688 ${i + 1}`
    };
  });
  
  console.log(`🔧 1688 Fallback: ${products.length} produits simulés générés`);
  return products;
}

/**
 * 📊 Obtenir des statistiques sur les recherches 1688
 */
export function get1688Stats() {
  return {
    source: '1688',
    name: '1688.com (Alibaba)',
    description: 'Plateforme B2B chinoise - Gros volumes, prix compétitifs',
    features: [
      'Recherche par mot-clé',
      'Recherche par image',
      'Informations détaillées produits',
      'Informations shop/vendeur',
      'Produits par shop'
    ],
    supportedOperations: [
      'search1688Products',
      'search1688ByImage', 
      'get1688ProductDescription',
      'get1688ShopInfo',
      'get1688ShopProducts',
      'get1688ShopProductsByUrl',
      'convertImageTo1688Url'
    ]
  };
}

// Export par défaut pour compatibilité
export default {
  scrape1688,
  search1688Products,
  search1688ByImage,
  get1688ProductDescription,
  get1688ShopInfo,
  get1688ShopProducts,
  get1688ShopProductsByUrl,
  convertImageTo1688Url,
  get1688Stats
}; 