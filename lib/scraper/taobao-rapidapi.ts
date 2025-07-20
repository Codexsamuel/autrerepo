import axios from 'axios';
import { ScrapedProduct } from './chinese-stores';

// Configuration TaoBao/Tmall RapidAPI
const TAOBAO_CONFIG = {
  baseUrl: 'https://taobao-tmall-data-service.p.rapidapi.com',
  rapidApiKey: process.env.RAPIDAPI_KEY || '44a31cad34msh7d83d60da69d252p1266cajsn15c88abcf70a',
  rapidApiHost: 'taobao-tmall-data-service.p.rapidapi.com',
  
  // Catégories mappées pour TaoBao/Tmall
  categories: {
    'Véhicules': ['auto', 'motorcycle', 'car_parts'],
    'Vêtements': ['clothing', 'fashion', 'apparel'],
    'Chaussures': ['shoes', 'footwear', 'sneakers'],
    'Accessoires': ['accessories', 'bags', 'watches'],
    'Bijoux': ['jewelry', 'rings', 'necklaces'],
    'Meubles': ['furniture', 'home', 'decor'],
    'Électronique': ['electronics', 'mobile', 'computers']
  } as Record<string, string[]>
};

// Interface pour l'API TaoBao/Tmall
interface TaoBaoAPI {
  name: string;
  searchProducts(query: string, category: string, limit?: number): Promise<ScrapedProduct[]>;
  getProductDetails(productId: string): Promise<ScrapedProduct>;
  searchSimilarProducts(productId: string): Promise<ScrapedProduct[]>;
  searchByImage(imageUrl: string): Promise<ScrapedProduct[]>;
}

// Implémentation TaoBao/Tmall RapidAPI
export class TaoBaoRapidAPIService implements TaoBaoAPI {
  name = 'TaoBao/Tmall RapidAPI';
  private baseUrl = TAOBAO_CONFIG.baseUrl;
  private apiKey = TAOBAO_CONFIG.rapidApiKey;
  private apiHost = TAOBAO_CONFIG.rapidApiHost;

  private getHeaders() {
    return {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-rapidapi-host': this.apiHost,
      'x-rapidapi-key': this.apiKey
    };
  }

  async searchProducts(query: string, category: string, limit: number = 50): Promise<ScrapedProduct[]> {
    try {
      console.log(`🔍 TaoBao/Tmall recherche: "${query}" - Catégorie: "${category}"`);
      
      // Utiliser l'endpoint ItemSearchByKeyword1 pour la recherche
      const response = await axios.post(
        `${this.baseUrl}/Item/ItemSearchByKeyword1`,
        {
          keyword: query,
          category: this.mapCategoryToTaoBao(category),
          limit: limit,
          sort: 'sales_desc',
          priceRange: '0-1000000'
        },
        {
          headers: this.getHeaders()
        }
      );

      if (response.data && response.data.success) {
        const products = response.data.data || [];
        return products.map((product: any) => this.mapToScrapedProduct(product));
      }
      
      return [];
    } catch (error) {
      console.error('❌ Erreur recherche TaoBao/Tmall:', error);
      return [];
    }
  }

  async getProductDetails(productId: string): Promise<ScrapedProduct> {
    try {
      console.log(`🔍 TaoBao/Tmall détails produit: ${productId}`);
      
      // Utiliser l'endpoint pour obtenir les détails d'un produit
      const response = await axios.post(
        `${this.baseUrl}/Item/ItemDetail`,
        {
          itemId: productId
        },
        {
          headers: this.getHeaders()
        }
      );

      if (response.data && response.data.success) {
        return this.mapToScrapedProduct(response.data.data);
      }
      
      throw new Error('Produit non trouvé');
    } catch (error) {
      console.error('❌ Erreur détails produit TaoBao/Tmall:', error);
      throw error;
    }
  }

  async searchSimilarProducts(productId: string): Promise<ScrapedProduct[]> {
    try {
      console.log(`🔍 TaoBao/Tmall produits similaires: ${productId}`);
      
      // Utiliser l'endpoint SearchSame/SimilarItemById
      const response = await axios.post(
        `${this.baseUrl}/Item/MobileWsearchAppSearchSame.ashx`,
        {
          itemId: productId,
          limit: 20
        },
        {
          headers: this.getHeaders()
        }
      );

      if (response.data && response.data.success) {
        const products = response.data.data || [];
        return products.map((product: any) => this.mapToScrapedProduct(product));
      }
      
      return [];
    } catch (error) {
      console.error('❌ Erreur produits similaires TaoBao/Tmall:', error);
      return [];
    }
  }

  async searchByImage(imageUrl: string): Promise<ScrapedProduct[]> {
    try {
      console.log(`🔍 TaoBao/Tmall recherche par image: ${imageUrl}`);
      
      // Utiliser l'endpoint ItemSearchByImage
      const response = await axios.post(
        `${this.baseUrl}/Item/ItemSearchByImage`,
        {
          imageUrl: imageUrl,
          limit: 20
        },
        {
          headers: this.getHeaders()
        }
      );

      if (response.data && response.data.success) {
        const products = response.data.data || [];
        return products.map((product: any) => this.mapToScrapedProduct(product));
      }
      
      return [];
    } catch (error) {
      console.error('❌ Erreur recherche par image TaoBao/Tmall:', error);
      return [];
    }
  }

  async searchInShop(shopId: string, query: string = '', limit: number = 50): Promise<ScrapedProduct[]> {
    try {
      console.log(`🔍 TaoBao/Tmall recherche dans boutique: ${shopId}`);
      
      // Utiliser l'endpoint ItemSearchInShop1
      const response = await axios.post(
        `${this.baseUrl}/Item/ItemSearchInShop1`,
        {
          shopId: shopId,
          keyword: query,
          limit: limit
        },
        {
          headers: this.getHeaders()
        }
      );

      if (response.data && response.data.success) {
        const products = response.data.data || [];
        return products.map((product: any) => this.mapToScrapedProduct(product));
      }
      
      return [];
    } catch (error) {
      console.error('❌ Erreur recherche boutique TaoBao/Tmall:', error);
      return [];
    }
  }

  async searchByISBN(isbn: string): Promise<ScrapedProduct[]> {
    try {
      console.log(`🔍 TaoBao/Tmall recherche par ISBN: ${isbn}`);
      
      // Utiliser l'endpoint ItemSearchByISBN/Barcode
      const response = await axios.post(
        `${this.baseUrl}/Item/ItemSearchByISBN`,
        {
          isbn: isbn,
          limit: 20
        },
        {
          headers: this.getHeaders()
        }
      );

      if (response.data && response.data.success) {
        const products = response.data.data || [];
        return products.map((product: any) => this.mapToScrapedProduct(product));
      }
      
      return [];
    } catch (error) {
      console.error('❌ Erreur recherche ISBN TaoBao/Tmall:', error);
      return [];
    }
  }

  private mapToScrapedProduct(product: any): ScrapedProduct {
    return {
      id: `taobao_rapidapi_${product.itemId || product.id}`,
      name: product.title || product.name,
      description: product.description || product.desc,
      originalPrice: product.originalPrice || product.price,
      sellingPrice: product.price || product.salePrice,
      currency: 'CNY', // TaoBao utilise le Yuan chinois
      image: product.image || product.pic || product.images?.[0],
      category: this.mapCategoryFromTaoBao(product.categoryId || product.category),
      country: 'Chine',
      supplier: product.shopName || product.seller || 'TaoBao/Tmall',
      rating: product.rating || product.score || 4.0,
      reviews: product.reviewCount || product.commentCount || 0,
      stock: product.stock || product.quantity || 0,
      specifications: product.attributes || product.specs || {},
      shippingOptions: {
        withCustoms: true,
        withTransport: true,
        customsFee: this.calculateCustomsFee(product.price || 0),
        transportFee: this.calculateTransportFee(product.weight || 1)
      },
      // Informations spécifiques TaoBao/Tmall
      taobaoData: {
        itemId: product.itemId,
        shopId: product.shopId,
        sales: product.sales || product.soldCount,
        location: product.location || 'Chine',
        isTmall: product.isTmall || false,
        guarantee: product.guarantee || '7 jours',
        returnPolicy: product.returnPolicy || '7 jours'
      }
    };
  }

  private mapCategoryToTaoBao(category: string): string {
    const categoryMap: Record<string, string> = {
      'Véhicules': 'auto',
      'Vêtements': 'clothing',
      'Chaussures': 'shoes',
      'Accessoires': 'accessories',
      'Bijoux': 'jewelry',
      'Meubles': 'furniture',
      'Électronique': 'electronics'
    };
    return categoryMap[category] || 'general';
  }

  private mapCategoryFromTaoBao(categoryId: string): string {
    const categoryMap: Record<string, string> = {
      'auto': 'Véhicules',
      'motorcycle': 'Véhicules',
      'car_parts': 'Véhicules',
      'clothing': 'Vêtements',
      'fashion': 'Vêtements',
      'apparel': 'Vêtements',
      'shoes': 'Chaussures',
      'footwear': 'Chaussures',
      'sneakers': 'Chaussures',
      'accessories': 'Accessoires',
      'bags': 'Accessoires',
      'watches': 'Accessoires',
      'jewelry': 'Bijoux',
      'rings': 'Bijoux',
      'necklaces': 'Bijoux',
      'furniture': 'Meubles',
      'home': 'Meubles',
      'decor': 'Meubles',
      'electronics': 'Électronique',
      'mobile': 'Électronique',
      'computers': 'Électronique'
    };
    return categoryMap[categoryId] || 'Autres';
  }

  private calculateCustomsFee(price: number): number {
    return Math.round(price * 0.15); // 15% de droits de douane
  }

  private calculateTransportFee(weight: number): number {
    return Math.round(weight * 2 + 50); // 2$/kg + 50$ de base
  }
}

// Service principal TaoBao/Tmall
export class TaoBaoService {
  private taobaoAPI: TaoBaoRapidAPIService;

  constructor() {
    this.taobaoAPI = new TaoBaoRapidAPIService();
  }

  async searchAllTaoBao(
    query: string = '',
    category: string = 'all',
    limit: number = 100
  ): Promise<{ products: ScrapedProduct[]; stats: any }> {
    const allProducts: ScrapedProduct[] = [];
    const stats: {
      totalProducts: number;
      sources: Record<string, any>;
      categories: Record<string, number>;
      averagePrice: number;
    } = {
      totalProducts: 0,
      sources: {},
      categories: {},
      averagePrice: 0
    };

    console.log(`🔍 Recherche TaoBao/Tmall: "${query}" - Catégorie: "${category}"`);

    try {
      // Recherche principale
      const products = await this.taobaoAPI.searchProducts(query, category, limit);
      
      stats.sources['TaoBao/Tmall'] = {
        count: products.length,
        success: true
      };

      allProducts.push(...products);
      console.log(`✅ TaoBao/Tmall: ${products.length} produits trouvés`);

      // Recherche de produits similaires si on a des résultats
      if (products.length > 0) {
        const similarProducts = await this.taobaoAPI.searchSimilarProducts(products[0].id.split('_')[2]);
        if (similarProducts.length > 0) {
          allProducts.push(...similarProducts);
          console.log(`✅ TaoBao/Tmall similaires: ${similarProducts.length} produits trouvés`);
        }
      }

    } catch (error) {
      console.error(`❌ Erreur TaoBao/Tmall:`, error);
      stats.sources['TaoBao/Tmall'] = {
        count: 0,
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }

    // Statistiques
    stats.totalProducts = allProducts.length;
    stats.averagePrice = allProducts.length > 0 
      ? Math.round(allProducts.reduce((sum, p) => sum + p.sellingPrice, 0) / allProducts.length)
      : 0;

    // Groupement par catégorie
    allProducts.forEach(product => {
      stats.categories[product.category] = (stats.categories[product.category] || 0) + 1;
    });

    console.log(`📊 Résultats TaoBao/Tmall: ${allProducts.length} produits`);

    return {
      products: allProducts,
      stats
    };
  }

  async getProductDetails(productId: string): Promise<ScrapedProduct | null> {
    try {
      const [source, api, id] = productId.split('_');
      if (source === 'taobao' && api === 'rapidapi') {
        return await this.taobaoAPI.getProductDetails(id);
      }
      throw new Error(`Source non supportée: ${source}`);
    } catch (error) {
      console.error('❌ Erreur détails produit TaoBao:', error);
      return null;
    }
  }

  async searchByImage(imageUrl: string): Promise<ScrapedProduct[]> {
    try {
      return await this.taobaoAPI.searchByImage(imageUrl);
    } catch (error) {
      console.error('❌ Erreur recherche par image TaoBao:', error);
      return [];
    }
  }

  async searchByISBN(isbn: string): Promise<ScrapedProduct[]> {
    try {
      return await this.taobaoAPI.searchByISBN(isbn);
    } catch (error) {
      console.error('❌ Erreur recherche ISBN TaoBao:', error);
      return [];
    }
  }

  async searchInShop(shopId: string, query: string = '', limit: number = 50): Promise<ScrapedProduct[]> {
    try {
      return await this.taobaoAPI.searchInShop(shopId, query, limit);
    } catch (error) {
      console.error('❌ Erreur recherche boutique TaoBao:', error);
      return [];
    }
  }

  getAvailableEndpoints(): string[] {
    return [
      'searchProducts',
      'getProductDetails', 
      'searchSimilarProducts',
      'searchByImage',
      'searchInShop',
      'searchByISBN'
    ];
  }
}

// Instance singleton
export const taobaoService = new TaoBaoService(); 