import axios from 'axios';
import { ScrapedProduct } from './chinese-stores';

// Configuration Alibaba 1688 API officielle
const ALIBABA_CONFIG = {
  baseUrl: 'https://gw.open.1688.com/openapi',
  appKey: process.env.ALIBABA_APP_KEY || '',
  appSecret: process.env.ALIBABA_APP_SECRET || '',
  accessToken: process.env.ALIBABA_ACCESS_TOKEN || '',
  refreshToken: process.env.ALIBABA_REFRESH_TOKEN || '',
  
  // Endpoints officiels Alibaba 1688
  endpoints: {
    // Catégories et attributs
    getCategoryAttributes: '/param2/1/com.alibaba.product/alibaba.category.attribute.get',
    getCategoryInfo: '/param2/1/com.alibaba.product/alibaba.category.get',
    searchCategories: '/param2/1/com.alibaba.product/alibaba.category.search',
    
    // Produits
    searchProducts: '/param2/1/com.alibaba.product/alibaba.product.search',
    getProductDetails: '/param2/1/com.alibaba.product/alibaba.product.get',
    getProductList: '/param2/1/com.alibaba.product/alibaba.product.list.get',
    
    // Fournisseurs
    getSupplierInfo: '/param2/1/com.alibaba.supplier/alibaba.supplier.get',
    searchSuppliers: '/param2/1/com.alibaba.supplier/alibaba.supplier.search',
    
    // Authentification
    refreshToken: '/param2/1/system.oauth2/getToken',
    getAccessToken: '/param2/1/system.oauth2/getToken'
  },
  
  // Catégories mappées pour Alibaba 1688
  categories: {
    'Véhicules': [100000691, 100000692, 100000693], // Auto, Motorcycle, Parts
    'Vêtements': [100000694, 100000695, 100000696], // Clothing, Fashion, Apparel
    'Chaussures': [100000697, 100000698, 100000699], // Shoes, Footwear
    'Accessoires': [100000700, 100000701, 100000702], // Accessories, Bags, Watches
    'Bijoux': [100000703, 100000704, 100000705], // Jewelry
    'Meubles': [100000706, 100000707, 100000708], // Furniture, Home
    'Électronique': [100000709, 100000710, 100000711] // Electronics, Mobile, Computers
  } as Record<string, number[]>
};

// Interface pour l'API Alibaba officielle
interface AlibabaOfficialAPI {
  name: string;
  authenticate(): Promise<string>;
  searchProducts(query: string, category: string, limit?: number): Promise<ScrapedProduct[]>;
  getProductDetails(productId: string): Promise<ScrapedProduct>;
  getCategoryAttributes(categoryId: number): Promise<any>;
  searchCategories(keyword: string): Promise<any[]>;
  refreshToken(): Promise<void>;
}

// Implémentation Alibaba 1688 API officielle
export class Alibaba1688OfficialAPI implements AlibabaOfficialAPI {
  name = 'Alibaba 1688 Official API';
  private baseUrl = ALIBABA_CONFIG.baseUrl;
  private appKey = ALIBABA_CONFIG.appKey;
  private appSecret = ALIBABA_CONFIG.appSecret;
  private accessToken = ALIBABA_CONFIG.accessToken;
  private refreshTokenValue = ALIBABA_CONFIG.refreshToken;

  private async makeRequest(endpoint: string, params: any = {}): Promise<any> {
    try {
      // Ajouter les paramètres système
      const systemParams = {
        _aop_timestamp: Date.now().toString(),
        access_token: this.accessToken,
        ...params
      };

      // Générer la signature (simplifié pour l'exemple)
      const signature = this.generateSignature(systemParams);
      systemParams._aop_signature = signature;

      const response = await axios.post(
        `${this.baseUrl}${endpoint}/${this.appKey}`,
        systemParams,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );

      if (response.data && response.data.success) {
        return response.data;
      } else {
        throw new Error(response.data?.errorMsg || 'Erreur API Alibaba');
      }
    } catch (error) {
      console.error('❌ Erreur requête Alibaba:', error);
      throw error;
    }
  }

  private generateSignature(params: any): string {
    // Implémentation simplifiée de la signature Alibaba
    // En production, utiliser la vraie logique de signature
    const sortedKeys = Object.keys(params).sort();
    const signString = sortedKeys.map(key => `${key}${params[key]}`).join('');
    return Buffer.from(signString + this.appSecret).toString('base64');
  }

  async authenticate(): Promise<string> {
    try {
      console.log('🔐 Authentification Alibaba 1688...');
      
      if (!this.accessToken) {
        // Obtenir un nouveau token
        const response = await axios.post(
          `${this.baseUrl}${ALIBABA_CONFIG.endpoints.getAccessToken}`,
          {
            grant_type: 'authorization_code',
            client_id: this.appKey,
            client_secret: this.appSecret,
            redirect_uri: 'https://your-app.com/callback'
          }
        );

        if (response.data.access_token) {
          this.accessToken = response.data.access_token;
          console.log('✅ Nouveau token Alibaba obtenu');
        }
      }

      return this.accessToken;
    } catch (error) {
      console.error('❌ Erreur authentification Alibaba:', error);
      throw error;
    }
  }

  async searchProducts(query: string, category: string, limit: number = 50): Promise<ScrapedProduct[]> {
    try {
      console.log(`🔍 Alibaba 1688 recherche: "${query}" - Catégorie: "${category}"`);
      
      const categoryIds = this.mapCategoryToAlibaba(category);
      const allProducts: ScrapedProduct[] = [];

      for (const categoryId of categoryIds) {
        const response = await this.makeRequest(ALIBABA_CONFIG.endpoints.searchProducts, {
          keyword: query,
          categoryId: categoryId,
          pageSize: Math.min(limit, 50),
          pageNo: 1,
          webSite: '1688',
          sortType: 'pop',
          priceStart: 0,
          priceEnd: 1000000
        });

        if (response.products) {
          const products = response.products.map((product: any) => this.mapToScrapedProduct(product));
          allProducts.push(...products);
        }
      }

      console.log(`✅ Alibaba 1688: ${allProducts.length} produits trouvés`);
      return allProducts.slice(0, limit);
    } catch (error) {
      console.error('❌ Erreur recherche Alibaba 1688:', error);
      return [];
    }
  }

  async getProductDetails(productId: string): Promise<ScrapedProduct> {
    try {
      console.log(`🔍 Alibaba 1688 détails produit: ${productId}`);
      
      const response = await this.makeRequest(ALIBABA_CONFIG.endpoints.getProductDetails, {
        productID: productId,
        webSite: '1688'
      });

      if (response.product) {
        return this.mapToScrapedProduct(response.product);
      }
      
      throw new Error('Produit non trouvé');
    } catch (error) {
      console.error('❌ Erreur détails produit Alibaba 1688:', error);
      throw error;
    }
  }

  async getCategoryAttributes(categoryId: number): Promise<any> {
    try {
      console.log(`🔍 Alibaba 1688 attributs catégorie: ${categoryId}`);
      
      const response = await this.makeRequest(ALIBABA_CONFIG.endpoints.getCategoryAttributes, {
        categoryID: categoryId,
        webSite: '1688'
      });

      return response;
    } catch (error) {
      console.error('❌ Erreur attributs catégorie Alibaba 1688:', error);
      throw error;
    }
  }

  async searchCategories(keyword: string): Promise<any[]> {
    try {
      console.log(`🔍 Alibaba 1688 recherche catégories: "${keyword}"`);
      
      const response = await this.makeRequest(ALIBABA_CONFIG.endpoints.searchCategories, {
        keyword: keyword,
        webSite: '1688'
      });

      return response.categories || [];
    } catch (error) {
      console.error('❌ Erreur recherche catégories Alibaba 1688:', error);
      return [];
    }
  }

  async refreshToken(): Promise<void> {
    try {
      console.log('🔄 Rafraîchissement token Alibaba 1688...');
      
      const response = await axios.post(
        `${this.baseUrl}${ALIBABA_CONFIG.endpoints.refreshToken}`,
        {
          grant_type: 'refresh_token',
          client_id: this.appKey,
          client_secret: this.appSecret,
          refresh_token: this.refreshTokenValue
        }
      );

      if (response.data.access_token) {
        this.accessToken = response.data.access_token;
        this.refreshTokenValue = response.data.refresh_token;
        console.log('✅ Token Alibaba rafraîchi');
      }
    } catch (error) {
      console.error('❌ Erreur rafraîchissement token Alibaba:', error);
      throw error;
    }
  }

  private mapToScrapedProduct(product: any): ScrapedProduct {
    return {
      id: `alibaba_official_${product.productID || product.id}`,
      name: product.subject || product.title || product.name,
      description: product.description || product.desc,
      originalPrice: product.priceRanges?.[0]?.startPrice || product.price || 0,
      sellingPrice: product.priceRanges?.[0]?.startPrice || product.price || 0,
      currency: 'CNY',
      image: product.images?.[0] || product.image || product.pic,
      category: this.mapCategoryFromAlibaba(product.categoryID || product.categoryId),
      country: 'Chine',
      supplier: product.supplierName || product.seller || 'Alibaba 1688',
      rating: product.rating || product.score || 4.0,
      reviews: product.reviewCount || product.commentCount || 0,
      stock: product.quantity || product.stock || 0,
      specifications: product.attributes || product.specs || {},
      shippingOptions: {
        withCustoms: true,
        withTransport: true,
        customsFee: this.calculateCustomsFee(product.price || 0),
        transportFee: this.calculateTransportFee(product.weight || 1)
      },
      // Informations spécifiques Alibaba
      alibabaData: {
        productId: product.productID,
        supplierId: product.supplierID,
        tradeAssurance: product.tradeAssurance || false,
        verifiedSupplier: product.verifiedSupplier || false,
        responseTime: product.responseTime || '24h'
      }
    };
  }

  private mapCategoryToAlibaba(category: string): number[] {
    return ALIBABA_CONFIG.categories[category] || [100000691]; // Default to auto category
  }

  private mapCategoryFromAlibaba(categoryId: number): string {
    const categoryMap: Record<number, string> = {
      100000691: 'Véhicules',
      100000692: 'Véhicules',
      100000693: 'Véhicules',
      100000694: 'Vêtements',
      100000695: 'Vêtements',
      100000696: 'Vêtements',
      100000697: 'Chaussures',
      100000698: 'Chaussures',
      100000699: 'Chaussures',
      100000700: 'Accessoires',
      100000701: 'Accessoires',
      100000702: 'Accessoires',
      100000703: 'Bijoux',
      100000704: 'Bijoux',
      100000705: 'Bijoux',
      100000706: 'Meubles',
      100000707: 'Meubles',
      100000708: 'Meubles',
      100000709: 'Électronique',
      100000710: 'Électronique',
      100000711: 'Électronique'
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

// Service principal Alibaba officiel
export class OfficialAPIService {
  private alibabaAPI: Alibaba1688OfficialAPI;
  private lazadaAPI: any; // À implémenter

  constructor() {
    this.alibabaAPI = new Alibaba1688OfficialAPI();
  }

  async searchAllOfficialAPIs(
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

    console.log(`🔍 Recherche APIs officielles: "${query}" - Catégorie: "${category}"`);

    // Recherche Alibaba 1688
    try {
      await this.alibabaAPI.authenticate();
      const alibabaProducts = await this.alibabaAPI.searchProducts(query, category, limit);
      
      stats.sources['Alibaba 1688'] = {
        count: alibabaProducts.length,
        success: true
      };

      allProducts.push(...alibabaProducts);
      console.log(`✅ Alibaba 1688: ${alibabaProducts.length} produits trouvés`);

    } catch (error) {
      console.error(`❌ Erreur Alibaba 1688:`, error);
      stats.sources['Alibaba 1688'] = {
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

    console.log(`📊 Résultats APIs officielles: ${allProducts.length} produits`);

    return {
      products: allProducts,
      stats
    };
  }

  async getProductDetails(productId: string): Promise<ScrapedProduct | null> {
    try {
      const [source, api, id] = productId.split('_');
      if (source === 'alibaba' && api === 'official') {
        return await this.alibabaAPI.getProductDetails(id);
      }
      throw new Error(`Source non supportée: ${source}`);
    } catch (error) {
      console.error('❌ Erreur détails produit API officielle:', error);
      return null;
    }
  }

  async refreshAllTokens(): Promise<void> {
    try {
      await this.alibabaAPI.refreshToken();
      console.log('✅ Tous les tokens rafraîchis');
    } catch (error) {
      console.error('❌ Erreur rafraîchissement tokens:', error);
      throw error;
    }
  }

  async getCategoryAttributes(categoryId: number): Promise<any> {
    try {
      return await this.alibabaAPI.getCategoryAttributes(categoryId);
    } catch (error) {
      console.error('❌ Erreur attributs catégorie:', error);
      throw error;
    }
  }

  async searchCategories(keyword: string): Promise<any[]> {
    try {
      return await this.alibabaAPI.searchCategories(keyword);
    } catch (error) {
      console.error('❌ Erreur recherche catégories:', error);
      return [];
    }
  }

  getAvailableAPIs(): string[] {
    return ['Alibaba 1688 Official API'];
  }
}

// Instance singleton
export const officialAPIService = new OfficialAPIService(); 