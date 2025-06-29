import puppeteer, { Browser } from 'puppeteer'


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
  private browser: Browser | null = null

  async initialize() {
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
  }

  async close() {
    if (this.browser) {
      await this.browser.close()
    }
  }

  // Scraper pour Shein
  async scrapeSheinProducts(category: string, limit: number = 20): Promise<ScrapedProduct[]> {
    if (!this.browser) await this.initialize()
    
    const page = await this.browser!.newPage()
    const products: ScrapedProduct[] = []

    try {
      // URL de base pour Shein (exemple)
      const baseUrl = `https://www.shein.com/${category}`
      await page.goto(baseUrl, { waitUntil: 'networkidle2' })

      // Attendre que les produits se chargent
      await page.waitForSelector('.product-item', { timeout: 10000 })

      const productData = await page.evaluate((maxProducts) => {
        const products = []
        const productElements = document.querySelectorAll('.product-item')
        
        for (let i = 0; i < Math.min(productElements.length, maxProducts); i++) {
          const element = productElements[i]
          
          const nameElement = element.querySelector('.product-name')
          const priceElement = element.querySelector('.product-price')
          const imageElement = element.querySelector('.product-image img')
          const linkElement = element.querySelector('a')
          
          if (nameElement && priceElement && imageElement) {
            const name = nameElement.textContent?.trim() || ''
            const priceText = priceElement.textContent?.trim() || ''
            const price = parseFloat(priceText.replace(/[^\d.,]/g, '').replace(',', '.')) || 0
            const image = imageElement.getAttribute('src') || ''
            const url = linkElement?.getAttribute('href') || ''
            
            products.push({
              id: `shein-${Date.now()}-${i}`,
              name,
              description: name,
              price,
              currency: '€',
              images: [image],
              category: 'mode',
              subcategory: category,
              brand: 'Shein',
              supplier: 'shein',
              rating: Math.random() * 2 + 3, // Simulation
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
              url,
              lastUpdated: new Date()
            })
          }
        }
        
        return products
      }, limit)

      products.push(...productData)

    } catch (error) {
      console.error('Erreur lors du scraping Shein:', error)
    } finally {
      await page.close()
    }

    return products
  }

  // Scraper pour Cdiscount
  async scrapeCdiscountProducts(category: string, limit: number = 20): Promise<ScrapedProduct[]> {
    if (!this.browser) await this.initialize()
    
    const page = await this.browser!.newPage()
    const products: ScrapedProduct[] = []

    try {
      const baseUrl = `https://www.cdiscount.com/${category}`
      await page.goto(baseUrl, { waitUntil: 'networkidle2' })

      await page.waitForSelector('.prdtBloc', { timeout: 10000 })

      const productData = await page.evaluate((maxProducts) => {
        const products = []
        const productElements = document.querySelectorAll('.prdtBloc')
        
        for (let i = 0; i < Math.min(productElements.length, maxProducts); i++) {
          const element = productElements[i]
          
          const nameElement = element.querySelector('.prdtBILTit')
          const priceElement = element.querySelector('.price')
          const imageElement = element.querySelector('.prdtBImg img')
          const linkElement = element.querySelector('a')
          
          if (nameElement && priceElement && imageElement) {
            const name = nameElement.textContent?.trim() || ''
            const priceText = priceElement.textContent?.trim() || ''
            const price = parseFloat(priceText.replace(/[^\d.,]/g, '').replace(',', '.')) || 0
            const image = imageElement.getAttribute('src') || ''
            const url = linkElement?.getAttribute('href') || ''
            
            products.push({
              id: `cdiscount-${Date.now()}-${i}`,
              name,
              description: name,
              price,
              currency: '€',
              images: [image],
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
              url,
              lastUpdated: new Date()
            })
          }
        }
        
        return products
      }, limit)

      products.push(...productData)

    } catch (error) {
      console.error('Erreur lors du scraping Cdiscount:', error)
    } finally {
      await page.close()
    }

    return products
  }

  // Scraper pour Alibaba/AliExpress
  async scrapeAlibabaProducts(category: string, limit: number = 20): Promise<ScrapedProduct[]> {
    if (!this.browser) await this.initialize()
    
    const page = await this.browser!.newPage()
    const products: ScrapedProduct[] = []

    try {
      const baseUrl = `https://www.aliexpress.com/category/${category}`
      await page.goto(baseUrl, { waitUntil: 'networkidle2' })

      await page.waitForSelector('.product-item', { timeout: 10000 })

      const productData = await page.evaluate((maxProducts) => {
        const products = []
        const productElements = document.querySelectorAll('.product-item')
        
        for (let i = 0; i < Math.min(productElements.length, maxProducts); i++) {
          const element = productElements[i]
          
          const nameElement = element.querySelector('.product-title')
          const priceElement = element.querySelector('.product-price')
          const imageElement = element.querySelector('.product-image img')
          const linkElement = element.querySelector('a')
          
          if (nameElement && priceElement && imageElement) {
            const name = nameElement.textContent?.trim() || ''
            const priceText = priceElement.textContent?.trim() || ''
            const price = parseFloat(priceText.replace(/[^\d.,]/g, '').replace(',', '.')) || 0
            const image = imageElement.getAttribute('src') || ''
            const url = linkElement?.getAttribute('href') || ''
            
            products.push({
              id: `alibaba-${Date.now()}-${i}`,
              name,
              description: name,
              price,
              currency: '€',
              images: [image],
              category: 'high-tech',
              subcategory: category,
              brand: 'Alibaba',
              supplier: 'alibaba',
              rating: Math.random() * 2 + 3,
              reviews: Math.floor(Math.random() * 5000),
              stock: Math.floor(Math.random() * 200) + 50,
              shipping: 'Livraison gratuite',
              delivery: '15-30 jours',
              tags: [category, 'Alibaba', 'Import'],
              isNew: Math.random() > 0.7,
              isHot: Math.random() > 0.8,
              isOnSale: Math.random() > 0.6,
              discount: Math.random() > 0.6 ? Math.floor(Math.random() * 60) + 20 : undefined,
              features: ['Qualité garantie', 'Prix compétitif'],
              specifications: {
                'Origine': 'Chine',
                'Livraison': 'Gratuite'
              },
              url,
              lastUpdated: new Date()
            })
          }
        }
        
        return products
      }, limit)

      products.push(...productData)

    } catch (error) {
      console.error('Erreur lors du scraping Alibaba:', error)
    } finally {
      await page.close()
    }

    return products
  }

  // Scraper pour Glothelo (local)
  async scrapeGlotheloProducts(category: string, limit: number = 20): Promise<ScrapedProduct[]> {
    // Simulation pour Glothelo (site local)
    const products: ScrapedProduct[] = []
    
    const glotheloProducts = [
      {
        name: "Sac à dos Glothelo Premium - Cuir véritable",
        price: 149.99,
        category: "accessoires",
        subcategory: "sacs"
      },
      {
        name: "Portefeuille Glothelo - Cuir local",
        price: 89.99,
        category: "accessoires",
        subcategory: "portefeuilles"
      },
      {
        name: "Ceinture Glothelo - Artisanat local",
        price: 59.99,
        category: "accessoires",
        subcategory: "ceintures"
      }
    ]

    glotheloProducts.forEach((product, index) => {
      products.push({
        id: `glothelo-${Date.now()}-${index}`,
        name: product.name,
        description: `${product.name} fabriqué localement au Cameroun`,
        price: product.price,
        currency: '€',
        images: [
          `https://images.unsplash.com/photo-${1553062407 + index}?w=400`
        ],
        category: product.category,
        subcategory: product.subcategory,
        brand: 'Glothelo',
        supplier: 'glothelo',
        rating: 4.8 + Math.random() * 0.4,
        reviews: Math.floor(Math.random() * 200) + 50,
        stock: Math.floor(Math.random() * 20) + 5,
        shipping: 'Livraison gratuite',
        delivery: '1-2 jours',
        tags: ['Glothelo', 'Local', 'Cameroun', 'Artisanat'],
        isNew: Math.random() > 0.7,
        isHot: Math.random() > 0.8,
        isOnSale: Math.random() > 0.6,
        discount: Math.random() > 0.6 ? Math.floor(Math.random() * 30) + 10 : undefined,
        features: ['Fabriqué au Cameroun', 'Cuir véritable', 'Artisanat local'],
        specifications: {
          'Origine': 'Cameroun',
          'Matériau': 'Cuir véritable',
          'Fabrication': 'Artisanale'
        },
        url: `https://glothelo.cm/products/${index}`,
        lastUpdated: new Date()
      })
    })

    return products
  }

  // Méthode principale pour récupérer tous les produits
  async scrapeAllProducts(): Promise<ScrapedProduct[]> {
    const allProducts: ScrapedProduct[] = []

    try {
      // Scraper Shein
      const sheinProducts = await this.scrapeSheinProducts('femme', 10)
      allProducts.push(...sheinProducts)

      // Scraper Cdiscount
      const cdiscountProducts = await this.scrapeCdiscountProducts('high-tech', 10)
      allProducts.push(...cdiscountProducts)

      // Scraper Alibaba
      const alibabaProducts = await this.scrapeAlibabaProducts('smartphones', 10)
      allProducts.push(...alibabaProducts)

      // Scraper Glothelo
      const glotheloProducts = await this.scrapeGlotheloProducts('accessoires', 5)
      allProducts.push(...glotheloProducts)

    } catch (error) {
      console.error('Erreur lors du scraping général:', error)
    }

    return allProducts
  }

  // Méthode pour mettre à jour les prix
  async updatePrices(products: ScrapedProduct[]): Promise<ScrapedProduct[]> {
    const updatedProducts = [...products]

    for (let i = 0; i < updatedProducts.length; i++) {
      const product = updatedProducts[i]
      
      // Simulation de variation de prix (±10%)
      const variation = (Math.random() - 0.5) * 0.2 // ±10%
      const newPrice = product.price * (1 + variation)
      
      updatedProducts[i] = {
        ...product,
        price: Math.round(newPrice * 100) / 100,
        lastUpdated: new Date()
      }
    }

    return updatedProducts
  }
}

// Instance singleton
export const productScraper = new ProductScraper()

// Fonction utilitaire pour formater les prix
export function formatPrice(price: number, currency: string = '€'): string {
  return `${price.toFixed(2)}${currency}`
}

// Fonction utilitaire pour calculer la marge
export function calculateMargin(sellingPrice: number, costPrice: number): number {
  return ((sellingPrice - costPrice) / sellingPrice) * 100
}

// Fonction utilitaire pour vérifier la disponibilité
export function checkAvailability(stock: number): string {
  if (stock === 0) return 'Rupture de stock'
  if (stock < 10) return 'Stock limité'
  if (stock < 50) return 'En stock'
  return 'Disponible'
} 