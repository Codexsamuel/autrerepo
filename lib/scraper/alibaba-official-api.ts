import axios from 'axios';
import { ScrapedProduct } from './chinese-stores';

// Configuration des APIs officielles Alibaba/Lazada
const ALIBABA_CONFIG = {
  // Alibaba 1688.com - API officielle
  baseUrl: 'https://api.1688.com',
  appKey: process.env.ALIBABA_APP_KEY || '',
  appSecret: process.env.ALIBABA_APP_SECRET || '',
  accessToken: process.env.ALIBABA_ACCESS_TOKEN || '',
  refreshTokenValue: process.env.ALIBABA_REFRESH_TOKEN || '',
  
  // Lazada - API officielle
  lazadaBaseUrl: 'https://api.lazada.com',
  lazadaAppKey: process.env.LAZADA_APP_KEY || '',
  lazadaAppSecret: process.env.LAZADA_APP_SECRET || '',
  lazadaAccessToken: process.env.LAZADA_ACCESS_TOKEN || '',
  
  // Catégories mappées
  categories: {
    'Véhicules': ['automotive', 'motorcycle', 'auto_parts'],
    'Vêtements': ['apparel', 'fashion', 'clothing'],
    'Chaussures': ['shoes', 'footwear', 'sneakers'],
    'Accessoires': ['accessories', 'jewelry', 'watches'],
    'Bijoux': ['jewelry', 'accessories', 'rings'],
    'Meubles': ['furniture', 'home', 'decor'],
    'Électronique': ['electronics', 'mobile', 'computers']
  } as Record<string, string[]>
};

// Interface pour les APIs officielles
interface OfficialAPI {
  name: string;
  baseUrl: string;
  authenticate(): Promise<string>;
  searchProducts(query: string, category: string, limit?: number): Promise<ScrapedProduct[]>;
  getProductDetails(productId: string): Promise<ScrapedProduct>;
  refreshToken(): Promise<void>;
}

// Implémentation Alibaba 1688 API officielle
class Alibaba1688OfficialAPI implements OfficialAPI {
  name = 'Alibaba 1688 Official';
  baseUrl = ALIBABA_CONFIG.baseUrl;
  private accessToken = ALIBABA_CONFIG.accessToken;
  private refreshTokenValue = ALIBABA_CONFIG.refreshTokenValue;

  async authenticate(): Promise<string> {
    try {
      if (!this.accessToken || this.isTokenExpired()) {
        await this.refreshAccessToken();
      }
      return this.accessToken;
    } catch (error) {
      console.error('Erreur authentification Alibaba:', error);
      throw error;
    }
  }

  async searchProducts(query: string, category: string, limit: number = 50): Promise<ScrapedProduct[]> {
    try {
      const token = await this.authenticate();
      const categoryMapping = ALIBABA_CONFIG.categories[category] || ['general'];
      
      // API officielle Alibaba 1688 - Recherche de produits
      const response = await axios.get(`${this.baseUrl}/product/search`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-API-KEY': ALIBABA_CONFIG.appKey
        },
        params: {
          q: query,
          categoryId: categoryMapping[0],
          pageSize: limit,
          sort: 'sales_desc',
          priceRange: '0-1000000',
          minPrice: 0,
          maxPrice: 1000000
        }
      });

      if (response.data.success) {
        return response.data.data.products.map((product: any) => this.mapToScrapedProduct(product));
      }
      
      return [];
    } catch (error) {
      console.error('Erreur recherche Alibaba 1688:', error);
      return [];
    }
  }

  async getProductDetails(productId: string): Promise<ScrapedProduct> {
    try {
      const token = await this.authenticate();
      
      // API officielle Alibaba 1688 - Détails produit
      const response = await axios.get(`${this.baseUrl}/product/detail/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-API-KEY': ALIBABA_CONFIG.appKey
        }
      });

      if (response.data.success) {
        return this.mapToScrapedProduct(response.data.data);
      }
      
      throw new Error('Produit non trouvé');
    } catch (error) {
      console.error('Erreur détails produit Alibaba:', error);
      throw error;
    }
  }

  async refreshToken(): Promise<void> {
    try {
      const response = await axios.post(`${this.baseUrl}/auth/token/refresh`, {
        refresh_token: this.refreshTokenValue
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': ALIBABA_CONFIG.appKey
        }
      });

      if (response.data.success) {
        this.accessToken = response.data.data.access_token;
        this.refreshTokenValue = response.data.data.refresh_token;
        
        // Mettre à jour les variables d'environnement
        process.env.ALIBABA_ACCESS_TOKEN = this.accessToken;
        process.env.ALIBABA_REFRESH_TOKEN = this.refreshTokenValue;
        
        console.log('✅ Token Alibaba 1688 rafraîchi');
      }
    } catch (error) {
      console.error('Erreur rafraîchissement token Alibaba:', error);
      throw error;
    }
  }

  private async refreshAccessToken(): Promise<void> {
    await this.refreshToken();
  }

  private isTokenExpired(): boolean {
    // Vérifier si le token expire dans les 5 minutes
    return false; // À implémenter avec la logique de vérification
  }

  private mapToScrapedProduct(product: any): ScrapedProduct {
    return {
      id: `alibaba_official_${product.productId}`,
      name: product.title,
      description: product.description,
      originalPrice: product.originalPrice || product.price,
      sellingPrice: product.price,
      currency: 'USD',
      image: product.images?.[0] || product.image,
      category: this.mapCategory(product.categoryId),
      country: 'Chine',
      supplier: product.supplierName || 'Alibaba 1688 Official',
      rating: product.rating || 4.0,
      reviews: product.reviewCount || 0,
      stock: product.stock || 0,
      specifications: product.attributes || {},
      shippingOptions: {
        withCustoms: true,
        withTransport: true,
        customsFee: this.calculateCustomsFee(product.price),
        transportFee: this.calculateTransportFee(product.weight)
      }
    };
  }

  private mapCategory(categoryId: string): string {
    // Mapping des catégories Alibaba 1688
    const categoryMap: Record<string, string> = {
      'automotive': 'Véhicules',
      'motorcycle': 'Véhicules',
      'auto_parts': 'Véhicules',
      'apparel': 'Vêtements',
      'fashion': 'Vêtements',
      'clothing': 'Vêtements',
      'shoes': 'Chaussures',
      'footwear': 'Chaussures',
      'sneakers': 'Chaussures',
      'accessories': 'Accessoires',
      'jewelry': 'Bijoux',
      'watches': 'Accessoires',
      'rings': 'Bijoux',
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

// Implémentation Lazada API officielle
class LazadaOfficialAPI implements OfficialAPI {
  name = 'Lazada Official';
  baseUrl = ALIBABA_CONFIG.lazadaBaseUrl;
  private accessToken = ALIBABA_CONFIG.lazadaAccessToken;

  async authenticate(): Promise<string> {
    try {
      if (!this.accessToken) {
        throw new Error('Token Lazada non configuré');
      }
      return this.accessToken;
    } catch (error) {
      console.error('Erreur authentification Lazada:', error);
      throw error;
    }
  }

  async searchProducts(query: string, category: string, limit: number = 50): Promise<ScrapedProduct[]> {
    try {
      const token = await this.authenticate();
      const categoryMapping = ALIBABA_CONFIG.categories[category] || ['general'];
      
      // API officielle Lazada - Recherche de produits
      const response = await axios.get(`${this.baseUrl}/products/search`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-API-KEY': ALIBABA_CONFIG.lazadaAppKey
        },
        params: {
          q: query,
          categoryId: categoryMapping[0],
          limit,
          sort: 'sales',
          priceRange: '0-1000000'
        }
      });

      if (response.data.success) {
        return response.data.data.products.map((product: any) => this.mapToScrapedProduct(product));
      }
      
      return [];
    } catch (error) {
      console.error('Erreur recherche Lazada:', error);
      return [];
    }
  }

  async getProductDetails(productId: string): Promise<ScrapedProduct> {
    try {
      const token = await this.authenticate();
      
      // API officielle Lazada - Détails produit
      const response = await axios.get(`${this.baseUrl}/product/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-API-KEY': ALIBABA_CONFIG.lazadaAppKey
        }
      });

      if (response.data.success) {
        return this.mapToScrapedProduct(response.data.data);
      }
      
      throw new Error('Produit non trouvé');
    } catch (error) {
      console.error('Erreur détails produit Lazada:', error);
      throw error;
    }
  }

  async refreshToken(): Promise<void> {
    // Lazada utilise un système de token différent
    console.log('⚠️ Rafraîchissement token Lazada non implémenté');
  }

  private mapToScrapedProduct(product: any): ScrapedProduct {
    return {
      id: `lazada_official_${product.productId}`,
      name: product.name,
      description: product.description,
      originalPrice: product.originalPrice || product.price,
      sellingPrice: product.price,
      currency: 'USD',
      image: product.image,
      category: this.mapCategory(product.categoryId),
      country: 'Singapour', // Lazada est basé à Singapour
      supplier: product.shopName || 'Lazada Official',
      rating: product.score || 4.0,
      reviews: product.commentCount || 0,
      stock: product.stock || 0,
      specifications: product.attributes || {},
      shippingOptions: {
        withCustoms: true,
        withTransport: true,
        customsFee: this.calculateCustomsFee(product.price),
        transportFee: this.calculateTransportFee(product.weight)
      }
    };
  }

  private mapCategory(categoryId: string): string {
    // Mapping des catégories Lazada
    const categoryMap: Record<string, string> = {
      'auto': 'Véhicules',
      'motorcycle': 'Véhicules',
      'clothing': 'Vêtements',
      'fashion': 'Vêtements',
      'shoes': 'Chaussures',
      'footwear': 'Chaussures',
      'accessories': 'Accessoires',
      'jewelry': 'Bijoux',
      'furniture': 'Meubles',
      'home': 'Meubles',
      'electronics': 'Électronique',
      'mobile': 'Électronique'
    };
    return categoryMap[categoryId] || 'Autres';
  }

  private calculateCustomsFee(price: number): number {
    return Math.round(price * 0.15);
  }

  private calculateTransportFee(weight: number): number {
    return Math.round(weight * 2 + 50);
  }
}

// Service principal avec APIs officielles
export class OfficialAPIService {
  private apis: OfficialAPI[];

  constructor() {
    this.apis = [
      new Alibaba1688OfficialAPI(),
      new LazadaOfficialAPI()
    ];
  }

  async searchAllOfficialAPIs(
    query: string = '',
    category: string = 'all',
    limit: number = 100
  ): Promise<{ products: ScrapedProduct[]; stats: any }> {
    const allProducts: ScrapedProduct[] = [];
    const stats: {
      totalProducts: number;
      apis: Record<string, any>;
      categories: Record<string, number>;
      averagePrice: number;
    } = {
      totalProducts: 0,
      apis: {},
      categories: {},
      averagePrice: 0
    };

    console.log(`🔍 Recherche APIs officielles: "${query}" - Catégorie: "${category}"`);

    // Recherche parallèle sur toutes les APIs officielles
    const searchPromises = this.apis.map(async (api) => {
      try {
        console.log(`📡 Connexion à ${api.name}...`);
        const products = await api.searchProducts(query, category, limit);
        
        stats.apis[api.name] = {
          count: products.length,
          success: true
        };

        allProducts.push(...products);
        console.log(`✅ ${api.name}: ${products.length} produits trouvés`);
        
        return products;
      } catch (error) {
        console.error(`❌ Erreur ${api.name}:`, error);
        stats.apis[api.name] = {
          count: 0,
          success: false,
          error: error instanceof Error ? error.message : 'Erreur inconnue'
        };
        return [];
      }
    });

    await Promise.all(searchPromises);

    // Statistiques
    stats.totalProducts = allProducts.length;
    stats.averagePrice = allProducts.length > 0 
      ? Math.round(allProducts.reduce((sum, p) => sum + p.sellingPrice, 0) / allProducts.length)
      : 0;

    // Groupement par catégorie
    allProducts.forEach(product => {
      stats.categories[product.category] = (stats.categories[product.category] || 0) + 1;
    });

    console.log(`📊 Résultats APIs officielles: ${allProducts.length} produits de ${Object.keys(stats.apis).length} APIs`);

    return {
      products: allProducts,
      stats
    };
  }

  async getProductDetails(productId: string): Promise<ScrapedProduct | null> {
    const [api, id] = productId.split('_');
    
    const apiInstance = this.apis.find(a => 
      a.name.toLowerCase().includes(api)
    );

    if (!apiInstance) {
      throw new Error(`API non trouvée: ${api}`);
    }

    return await apiInstance.getProductDetails(id);
  }

  getAvailableAPIs(): string[] {
    return this.apis.map(a => a.name);
  }

  async refreshAllTokens(): Promise<void> {
    console.log('🔄 Rafraîchissement de tous les tokens...');
    
    const refreshPromises = this.apis.map(async (api) => {
      try {
        await api.refreshToken();
        console.log(`✅ Token ${api.name} rafraîchi`);
      } catch (error) {
        console.error(`❌ Erreur rafraîchissement ${api.name}:`, error);
      }
    });

    await Promise.all(refreshPromises);
  }
}

// Instance singleton
export const officialAPIService = new OfficialAPIService(); 