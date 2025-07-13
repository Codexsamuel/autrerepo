import { getCategories, getCountries, getScrapingStats, getSources, scrapeChineseStores } from '@/lib/scraper/chinese-stores';
import { Product } from '@/lib/scraper/multi-markets';
import { NextRequest, NextResponse } from 'next/server';

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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const query = decodeURIComponent(searchParams.get('query') || '');
    const category = decodeURIComponent(searchParams.get('category') || '');
    const country = decodeURIComponent(searchParams.get('country') || '');
    
    // Debug des paramètres
    console.log('Paramètres reçus:', { query, category, country });

    // Actions spéciales
    if (action === 'stats') {
      const stats = getScrapingStats();
      return NextResponse.json({ success: true, data: stats });
    }

    if (action === 'categories') {
      const categories = getCategories();
      return NextResponse.json({ success: true, data: categories });
    }

    if (action === 'sources') {
      const sources = getSources();
      return NextResponse.json({ success: true, data: sources });
    }

    if (action === 'countries') {
      const countries = getCountries();
      return NextResponse.json({ success: true, data: countries });
    }

    // Récupération des produits avec filtres
    const result = await scrapeChineseStores(query, category, country);
    const scrapedProducts = result.products;
    
    // Convertir les produits au format attendu par le composant
    const products: Product[] = scrapedProducts.map(convertToProduct);

    return NextResponse.json({
      success: true,
      data: products,
      total: products.length
    });

  } catch (error) {
    console.error('Erreur API scraping chinese-stores:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
} 