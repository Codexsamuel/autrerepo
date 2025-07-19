import axios from 'axios';
import { ScrapedProduct } from './chinese-stores';

// Configuration des APIs de concessionnaires chinois
const CONCESSIONNAIRES_CONFIG = {
  // Alibaba 1688.com - Grossiste chinois
  alibaba1688: {
    baseUrl: 'https://api.1688.com',
    apiKey: process.env.ALIBABA_API_KEY || '',
    categories: {
      'Véhicules': ['automotive', 'motorcycle'],
      'Vêtements': ['apparel', 'fashion'],
      'Chaussures': ['shoes', 'footwear'],
      'Accessoires': ['accessories', 'jewelry'],
      'Bijoux': ['jewelry', 'accessories'],
      'Meubles': ['furniture', 'home'],
      'Électronique': ['electronics', 'mobile']
    } as Record<string, string[]>
  },
  
  // JD.com - E-commerce chinois
  jd: {
    baseUrl: 'https://api.jd.com',
    apiKey: process.env.JD_API_KEY || '',
    categories: {
      'Véhicules': ['auto', 'motorcycle'],
      'Vêtements': ['clothing', 'fashion'],
      'Chaussures': ['shoes', 'footwear'],
      'Accessoires': ['accessories', 'jewelry'],
      'Bijoux': ['jewelry', 'accessories'],
      'Meubles': ['furniture', 'home'],
      'Électronique': ['electronics', 'mobile']
    } as Record<string, string[]>
  },
  
  // Taobao/Tmall - Alibaba Group
  taobao: {
    baseUrl: 'https://api.taobao.com',
    apiKey: process.env.TAOBAO_API_KEY || '',
    categories: {
      'Véhicules': ['auto', 'motorcycle'],
      'Vêtements': ['clothing', 'fashion'],
      'Chaussures': ['shoes', 'footwear'],
      'Accessoires': ['accessories', 'jewelry'],
      'Bijoux': ['jewelry', 'accessories'],
      'Meubles': ['furniture', 'home'],
      'Électronique': ['electronics', 'mobile']
    } as Record<string, string[]>
  }
};

// Interface pour les APIs de concessionnaires
interface ConcessionnaireAPI {
  name: string;
  baseUrl: string;
  apiKey: string;
  searchProducts(query: string, category: string, limit?: number): Promise<ScrapedProduct[]>;
  getProductDetails(productId: string): Promise<ScrapedProduct>;
  getCategories(): string[];
}

// Implémentation Alibaba 1688
class Alibaba1688API implements ConcessionnaireAPI {
  name = 'Alibaba 1688';
  baseUrl = CONCESSIONNAIRES_CONFIG.alibaba1688.baseUrl;
  apiKey = CONCESSIONNAIRES_CONFIG.alibaba1688.apiKey;

  async searchProducts(query: string, category: string, limit: number = 50): Promise<ScrapedProduct[]> {
    try {
      const categoryMapping = CONCESSIONNAIRES_CONFIG.alibaba1688.categories[category] || ['general'];
      
      const response = await axios.get(`${this.baseUrl}/search/products`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        params: {
          q: query,
          category: categoryMapping[0],
          limit,
          sort: 'sales_desc',
          price_range: '0-1000000'
        }
      });

      return response.data.products.map((product: any) => this.mapToScrapedProduct(product));
    } catch (error) {
      console.error('Erreur Alibaba 1688 API:', error);
      return [];
    }
  }

  async getProductDetails(productId: string): Promise<ScrapedProduct> {
    try {
      const response = await axios.get(`${this.baseUrl}/products/${productId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      return this.mapToScrapedProduct(response.data);
    } catch (error) {
      console.error('Erreur détails produit Alibaba:', error);
      throw error;
    }
  }

  getCategories(): string[] {
    return Object.keys(CONCESSIONNAIRES_CONFIG.alibaba1688.categories);
  }

  private mapToScrapedProduct(product: any): ScrapedProduct {
    return {
      id: `alibaba_${product.id}`,
      name: product.title,
      description: product.description,
      originalPrice: product.original_price || product.price,
      sellingPrice: product.price,
      currency: 'USD',
      image: product.images?.[0] || product.image,
      category: this.mapCategory(product.category),
      country: 'Chine',
      supplier: product.supplier_name || 'Alibaba 1688',
      rating: product.rating || 4.0,
      reviews: product.review_count || 0,
      stock: product.stock || 0,
      specifications: product.specifications || {},
      shippingOptions: {
        withCustoms: true,
        withTransport: true,
        customsFee: this.calculateCustomsFee(product.price),
        transportFee: this.calculateTransportFee(product.weight)
      }
    };
  }

  private mapCategory(alibabaCategory: string): string {
    const categoryMap: Record<string, string> = {
      'automotive': 'Véhicules',
      'motorcycle': 'Véhicules',
      'apparel': 'Vêtements',
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
    return categoryMap[alibabaCategory] || 'Autres';
  }

  private calculateCustomsFee(price: number): number {
    return Math.round(price * 0.15); // 15% de droits de douane
  }

  private calculateTransportFee(weight: number): number {
    return Math.round(weight * 2 + 50); // 2$/kg + 50$ de base
  }
}

// Implémentation JD.com
class JDAPI implements ConcessionnaireAPI {
  name = 'JD.com';
  baseUrl = CONCESSIONNAIRES_CONFIG.jd.baseUrl;
  apiKey = CONCESSIONNAIRES_CONFIG.jd.apiKey;

  async searchProducts(query: string, category: string, limit: number = 50): Promise<ScrapedProduct[]> {
    try {
      const categoryMapping = CONCESSIONNAIRES_CONFIG.jd.categories[category] || ['general'];
      
      const response = await axios.get(`${this.baseUrl}/search`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        params: {
          keyword: query,
          cat: categoryMapping[0],
          page: 1,
          pageSize: limit,
          sort: 'sales'
        }
      });

      return response.data.products.map((product: any) => this.mapToScrapedProduct(product));
    } catch (error) {
      console.error('Erreur JD.com API:', error);
      return [];
    }
  }

  async getProductDetails(productId: string): Promise<ScrapedProduct> {
    try {
      const response = await axios.get(`${this.baseUrl}/product/${productId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      return this.mapToScrapedProduct(response.data);
    } catch (error) {
      console.error('Erreur détails produit JD:', error);
      throw error;
    }
  }

  getCategories(): string[] {
    return Object.keys(CONCESSIONNAIRES_CONFIG.jd.categories);
  }

  private mapToScrapedProduct(product: any): ScrapedProduct {
    return {
      id: `jd_${product.sku}`,
      name: product.name,
      description: product.description,
      originalPrice: product.originalPrice || product.price,
      sellingPrice: product.price,
      currency: 'USD',
      image: product.image,
      category: this.mapCategory(product.category),
      country: 'Chine',
      supplier: product.shopName || 'JD.com',
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

  private mapCategory(jdCategory: string): string {
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
    return categoryMap[jdCategory] || 'Autres';
  }

  private calculateCustomsFee(price: number): number {
    return Math.round(price * 0.15);
  }

  private calculateTransportFee(weight: number): number {
    return Math.round(weight * 2 + 50);
  }
}

// Service principal de scraping production
export class ProductionScraperService {
  private concessionnaires: ConcessionnaireAPI[];

  constructor() {
    this.concessionnaires = [
      new Alibaba1688API(),
      new JDAPI()
    ];
  }

  async searchAllConcessionnaires(
    query: string = '',
    category: string = 'all',
    limit: number = 100
  ): Promise<{ products: ScrapedProduct[]; stats: any }> {
    const allProducts: ScrapedProduct[] = [];
    const stats: {
      totalProducts: number;
      concessionnaires: Record<string, any>;
      categories: Record<string, number>;
      averagePrice: number;
    } = {
      totalProducts: 0,
      concessionnaires: {},
      categories: {},
      averagePrice: 0
    };

    console.log(`🔍 Recherche production: "${query}" - Catégorie: "${category}"`);

    // Recherche parallèle sur tous les concessionnaires
    const searchPromises = this.concessionnaires.map(async (concessionnaire) => {
      try {
        console.log(`📡 Connexion à ${concessionnaire.name}...`);
        const products = await concessionnaire.searchProducts(query, category, limit);
        
        stats.concessionnaires[concessionnaire.name] = {
          count: products.length,
          success: true
        };

        allProducts.push(...products);
        console.log(`✅ ${concessionnaire.name}: ${products.length} produits trouvés`);
        
        return products;
      } catch (error) {
        console.error(`❌ Erreur ${concessionnaire.name}:`, error);
        stats.concessionnaires[concessionnaire.name] = {
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

    console.log(`📊 Résultats production: ${allProducts.length} produits de ${Object.keys(stats.concessionnaires).length} concessionnaires`);

    return {
      products: allProducts,
      stats
    };
  }

  async getProductDetails(productId: string): Promise<ScrapedProduct | null> {
    const [concessionnaire, id] = productId.split('_');
    
    const concessionnaireAPI = this.concessionnaires.find(c => 
      c.name.toLowerCase().includes(concessionnaire)
    );

    if (!concessionnaireAPI) {
      throw new Error(`Concessionnaire non trouvé: ${concessionnaire}`);
    }

    return await concessionnaireAPI.getProductDetails(id);
  }

  getAvailableConcessionnaires(): string[] {
    return this.concessionnaires.map(c => c.name);
  }

  getAvailableCategories(): string[] {
    const allCategories = new Set<string>();
    this.concessionnaires.forEach(c => {
      c.getCategories().forEach(cat => allCategories.add(cat));
    });
    return Array.from(allCategories);
  }
}

// Instance singleton
export const productionScraper = new ProductionScraperService(); 