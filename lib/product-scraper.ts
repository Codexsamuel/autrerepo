// Stub version - Puppeteer not available in current Node.js version
// This file provides mock data instead of real scraping functionality

export interface ScrapedProduct {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  currency: string
  images: string[]
  category: string
  subcategory: string
  brand: string
  supplier: string
  rating?: number
  reviews?: number
  stock?: number
  shipping?: string
  delivery?: string
  tags: string[]
  isNew: boolean
  isHot: boolean
  isOnSale: boolean
  discount?: number
  features: string[]
  specifications: Record<string, string>
  url: string
  lastUpdated: Date
}

export class ProductScraper {
  private browser: any = null

  async initialize() {
    console.log('ProductScraper: Puppeteer not available in current Node.js version')
    this.browser = null
  }

  async close() {
    console.log('ProductScraper: Browser closed (stub)')
  }

  // Stub scraper for Shein
  async scrapeSheinProducts(category: string, limit: number = 20): Promise<ScrapedProduct[]> {
    console.log(`ProductScraper: Mock scraping Shein products for category: ${category}`)
    
    const mockProducts: ScrapedProduct[] = []
    
    for (let i = 0; i < limit; i++) {
      mockProducts.push({
        id: `shein-mock-${Date.now()}-${i}`,
        name: `Produit Shein ${category} ${i + 1}`,
        description: `Description du produit Shein ${category} ${i + 1}`,
        price: Math.floor(Math.random() * 50) + 10,
        currency: '€',
        images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop'],
        category: 'mode',
        subcategory: category,
        brand: 'Shein',
        supplier: 'shein',
        rating: Math.random() * 2 + 3,
        reviews: Math.floor(Math.random() * 1000),
        stock: Math.floor(Math.random() * 50) + 10,
        shipping: 'Livraison 3.99€',
        delivery: '5-8 jours',
        tags: [category, 'Shein', 'Mode'],
        isNew: Math.random() > 0.7,
        isHot: Math.random() > 0.8,
        isOnSale: Math.random() > 0.6,
        discount: Math.random() > 0.6 ? Math.floor(Math.random() * 40) + 10 : undefined,
        features: ['100% Polyester', 'Lavable en machine'],
        specifications: {
          'Matériau': 'Polyester',
          'Entretien': 'Lavable 30°'
        },
        url: `https://www.shein.com/${category}/product-${i}`,
        lastUpdated: new Date()
      })
    }

    return mockProducts
  }

  // Stub scraper for Cdiscount
  async scrapeCdiscountProducts(category: string, limit: number = 20): Promise<ScrapedProduct[]> {
    console.log(`ProductScraper: Mock scraping Cdiscount products for category: ${category}`)
    
    const mockProducts: ScrapedProduct[] = []
    
    for (let i = 0; i < limit; i++) {
      mockProducts.push({
        id: `cdiscount-mock-${Date.now()}-${i}`,
        name: `Produit Cdiscount ${category} ${i + 1}`,
        description: `Description du produit Cdiscount ${category} ${i + 1}`,
        price: Math.floor(Math.random() * 200) + 50,
        currency: '€',
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'],
        category: 'high-tech',
        subcategory: category,
        brand: 'Cdiscount',
        supplier: 'cdiscount',
        rating: Math.random() * 2 + 3,
        reviews: Math.floor(Math.random() * 2000),
        stock: Math.floor(Math.random() * 100) + 20,
        shipping: 'Livraison gratuite',
        delivery: '1-3 jours',
        tags: [category, 'Cdiscount', 'High-Tech'],
        isNew: Math.random() > 0.7,
        isHot: Math.random() > 0.8,
        isOnSale: Math.random() > 0.6,
        discount: Math.random() > 0.6 ? Math.floor(Math.random() * 50) + 15 : undefined,
        features: ['Garantie 2 ans', 'Livraison rapide'],
        specifications: {
          'Garantie': '2 ans',
          'Livraison': 'Gratuite'
        },
        url: `https://www.cdiscount.com/${category}/product-${i}`,
        lastUpdated: new Date()
      })
    }

    return mockProducts
  }

  // Stub scraper for Alibaba
  async scrapeAlibabaProducts(category: string, limit: number = 20): Promise<ScrapedProduct[]> {
    console.log(`ProductScraper: Mock scraping Alibaba products for category: ${category}`)
    
    const mockProducts: ScrapedProduct[] = []
    
    for (let i = 0; i < limit; i++) {
      mockProducts.push({
        id: `alibaba-mock-${Date.now()}-${i}`,
        name: `Produit Alibaba ${category} ${i + 1}`,
        description: `Description du produit Alibaba ${category} ${i + 1}`,
        price: Math.floor(Math.random() * 100) + 20,
        currency: '$',
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'],
        category: 'wholesale',
        subcategory: category,
        brand: 'Alibaba',
        supplier: 'alibaba',
        rating: Math.random() * 2 + 3,
        reviews: Math.floor(Math.random() * 5000),
        stock: Math.floor(Math.random() * 1000) + 100,
        shipping: 'Livraison internationale',
        delivery: '15-30 jours',
        tags: [category, 'Alibaba', 'Wholesale'],
        isNew: Math.random() > 0.7,
        isHot: Math.random() > 0.8,
        isOnSale: Math.random() > 0.6,
        discount: Math.random() > 0.6 ? Math.floor(Math.random() * 30) + 10 : undefined,
        features: ['Prix en gros', 'Qualité garantie'],
        specifications: {
          'Origine': 'Chine',
          'Quantité min.': '10 pièces'
        },
        url: `https://www.alibaba.com/${category}/product-${i}`,
        lastUpdated: new Date()
      })
    }

    return mockProducts
  }

  // Stub scraper for Glothelo
  async scrapeGlotheloProducts(category: string, limit: number = 20): Promise<ScrapedProduct[]> {
    console.log(`ProductScraper: Mock scraping Glothelo products for category: ${category}`)
    
    const mockProducts: ScrapedProduct[] = []
    
    for (let i = 0; i < limit; i++) {
      mockProducts.push({
        id: `glothelo-mock-${Date.now()}-${i}`,
        name: `Produit Glothelo ${category} ${i + 1}`,
        description: `Description du produit Glothelo ${category} ${i + 1}`,
        price: Math.floor(Math.random() * 150) + 30,
        currency: '€',
        images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop'],
        category: 'beauty',
        subcategory: category,
        brand: 'Glothelo',
        supplier: 'glothelo',
        rating: Math.random() * 2 + 3,
        reviews: Math.floor(Math.random() * 800),
        stock: Math.floor(Math.random() * 200) + 50,
        shipping: 'Livraison standard',
        delivery: '3-5 jours',
        tags: [category, 'Glothelo', 'Beauty'],
        isNew: Math.random() > 0.7,
        isHot: Math.random() > 0.8,
        isOnSale: Math.random() > 0.6,
        discount: Math.random() > 0.6 ? Math.floor(Math.random() * 25) + 10 : undefined,
        features: ['Bio', 'Sans paraben'],
        specifications: {
          'Type': 'Bio',
          'Volume': '100ml'
        },
        url: `https://www.glothelo.com/${category}/product-${i}`,
        lastUpdated: new Date()
      })
    }

    return mockProducts
  }

  // Stub method to scrape all products
  async scrapeAllProducts(): Promise<ScrapedProduct[]> {
    console.log('ProductScraper: Mock scraping all products')
    
    const allProducts: ScrapedProduct[] = []
    
    // Mock data for different categories
    allProducts.push(...await this.scrapeSheinProducts('vetements', 5))
    allProducts.push(...await this.scrapeCdiscountProducts('electronique', 5))
    allProducts.push(...await this.scrapeAlibabaProducts('accessoires', 5))
    allProducts.push(...await this.scrapeGlotheloProducts('cosmetiques', 5))
    
    return allProducts
  }

  // Stub method to update prices
  async updatePrices(products: ScrapedProduct[]): Promise<ScrapedProduct[]> {
    console.log('ProductScraper: Mock updating prices')
    
    return products.map(product => ({
      ...product,
      price: product.price * (0.9 + Math.random() * 0.2), // Random price variation
      lastUpdated: new Date()
    }))
  }
}

export function formatPrice(price: number, currency: string = '€'): string {
  return `${price.toFixed(2)} ${currency}`
}

export function calculateMargin(sellingPrice: number, costPrice: number): number {
  return ((sellingPrice - costPrice) / costPrice) * 100
}

export function checkAvailability(stock: number): string {
  if (stock > 50) return 'En stock'
  if (stock > 10) return 'Stock limité'
  if (stock > 0) return 'Derniers articles'
  return 'Rupture de stock'
} 