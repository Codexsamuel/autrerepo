export const revalidate = false;
import { getScrapingStats } from '@/lib/scraper/chinese-stores';
import { Product } from '@/lib/scraper/multi-markets';
import { NextResponse } from 'next/server';

// Fonction pour convertir ScrapedProduct en Product
function convertToProduct(scrapedProduct: any): Product {
  // Fonction pour convertir le pays en market
  const getMarketFromCountry = (country: string): 'china' | 'dubai' | 'turkey' | 'cameroon' => {
    const countryMap: Record<string, 'china' | 'dubai' | 'turkey' | 'cameroon'> = {
      'Chine': 'china',
      'Dubaï': 'dubai',
      'Turquie': 'turkey',
      'Cameroun': 'cameroon',
      'France': 'china' // Utiliser 'china' comme valeur par défaut pour la France
    };
    return countryMap[country] || 'china';
  };

  return {
    id: scrapedProduct.id,
    name: scrapedProduct.name,
    description: scrapedProduct.description,
    originalPrice: scrapedProduct.originalPrice,
    sellingPrice: scrapedProduct.sellingPrice,
    currency: scrapedProduct.currency,
    images: [scrapedProduct.image], // Convertir image en images array
    category: scrapedProduct.category,
    market: getMarketFromCountry(scrapedProduct.country),
    supplier: {
      name: scrapedProduct.supplier,
      contact: '',
      location: scrapedProduct.country
    },
    specifications: scrapedProduct.specifications || {},
    shippingOptions: scrapedProduct.shippingOptions || {
      withCustoms: true,
      withTransport: true
    },
    stock: scrapedProduct.stock || 0,
    rating: scrapedProduct.rating || 0,
    reviews: scrapedProduct.reviews || 0,
    createdAt: new Date()
  };
}

export async function GET() {
  try {
    // Pour l'export statique, retourner des données statiques
    const stats = getScrapingStats();
    
    return NextResponse.json({
      success: true,
      data: {
        stats,
        message: 'Données de scraping chinoises (mode statique)'
      }
    });

  } catch (error) {
    console.error('Erreur API scraping chinese-stores:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Erreur lors de la récupération des données',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
} 