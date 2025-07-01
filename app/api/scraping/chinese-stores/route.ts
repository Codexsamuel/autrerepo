import { NextRequest, NextResponse } from 'next/server';
import { scrapeChineseStores, getCategories, getSources, getCountries, getScrapingStats } from '@/lib/scraper/chinese-stores';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const category = searchParams.get('category') || '';
    const country = searchParams.get('country') || '';
    const action = searchParams.get('action') || 'scrape';

    switch (action) {
      case 'categories':
        const categories = getCategories();
        return NextResponse.json({ success: true, data: categories });

      case 'sources':
        const sources = getSources();
        return NextResponse.json({ success: true, data: sources });

      case 'countries':
        const countries = getCountries();
        return NextResponse.json({ success: true, data: countries });

      case 'stats':
        const stats = getScrapingStats();
        return NextResponse.json({ success: true, data: stats });

      case 'scrape':
      default:
        const result = await scrapeChineseStores(query, category, country);
        // Convertir les ScrapedProduct en Product pour la compatibilité
        const products = result.products.map((scrapedProduct: any) => ({
          id: scrapedProduct.id || `product_${Date.now()}_${Math.random()}`,
          name: scrapedProduct.name || 'Produit Premium',
          description: scrapedProduct.description || 'Description du produit',
          originalPrice: scrapedProduct.originalPrice || 0,
          sellingPrice: scrapedProduct.sellingPrice || 0,
          currency: scrapedProduct.currency || 'USD',
          images: [scrapedProduct.image || 'https://via.placeholder.com/400x400'],
          category: scrapedProduct.category || 'Général',
          market: (scrapedProduct.country || 'chine').toLowerCase() === 'chine' ? 'china' : 
                  (scrapedProduct.country || 'chine').toLowerCase() === 'dubaï' ? 'dubai' :
                  (scrapedProduct.country || 'chine').toLowerCase() === 'turquie' ? 'turkey' :
                  (scrapedProduct.country || 'chine').toLowerCase() === 'cameroun' ? 'cameroon' : 'china',
          supplier: {
            name: scrapedProduct.brand || 'Fournisseur Premium',
            contact: `contact@${(scrapedProduct.source || 'default').toLowerCase()}.com`,
            location: scrapedProduct.country || 'International'
          },
          specifications: {
            brand: scrapedProduct.brand || 'Marque Premium',
            features: (scrapedProduct.features || []).join(', '),
            source: scrapedProduct.source || 'International'
          },
          shippingOptions: {
            withCustoms: true,
            withTransport: true,
            customsFee: (scrapedProduct.originalPrice || 0) * 0.15,
            transportFee: 50
          },
          stock: scrapedProduct.stock || 10,
          rating: scrapedProduct.rating || 4.5,
          reviews: scrapedProduct.reviews || 0,
          createdAt: new Date(scrapedProduct.scrapedAt || Date.now())
        }));
        
        return NextResponse.json({ 
          success: true, 
          products: products,
          total: products.length,
          source: result.source,
          timestamp: result.timestamp
        });
    }

  } catch (error) {
    console.error('Erreur API scraping:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors du scraping' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, category, country, sources } = body;

    const result = await scrapeChineseStores(query, category, country);
    
    // Convertir les ScrapedProduct en Product pour la compatibilité
    const products = result.products.map((scrapedProduct: any) => ({
      id: scrapedProduct.id || `product_${Date.now()}_${Math.random()}`,
      name: scrapedProduct.name || 'Produit Premium',
      description: scrapedProduct.description || 'Description du produit',
      originalPrice: scrapedProduct.originalPrice || 0,
      sellingPrice: scrapedProduct.sellingPrice || 0,
      currency: scrapedProduct.currency || 'USD',
      images: [scrapedProduct.image || 'https://via.placeholder.com/400x400'],
      category: scrapedProduct.category || 'Général',
      market: (scrapedProduct.country || 'chine').toLowerCase() === 'chine' ? 'china' : 
              (scrapedProduct.country || 'chine').toLowerCase() === 'dubaï' ? 'dubai' :
              (scrapedProduct.country || 'chine').toLowerCase() === 'turquie' ? 'turkey' :
              (scrapedProduct.country || 'chine').toLowerCase() === 'cameroun' ? 'cameroon' : 'china',
      supplier: {
        name: scrapedProduct.brand || 'Fournisseur Premium',
        contact: `contact@${(scrapedProduct.source || 'default').toLowerCase()}.com`,
        location: scrapedProduct.country || 'International'
      },
      specifications: {
        brand: scrapedProduct.brand || 'Marque Premium',
        features: (scrapedProduct.features || []).join(', '),
        source: scrapedProduct.source || 'International'
      },
      shippingOptions: {
        withCustoms: true,
        withTransport: true,
        customsFee: (scrapedProduct.originalPrice || 0) * 0.15,
        transportFee: 50
      },
      stock: scrapedProduct.stock || 10,
      rating: scrapedProduct.rating || 4.5,
      reviews: scrapedProduct.reviews || 0,
      createdAt: new Date(scrapedProduct.scrapedAt || Date.now())
    }));
    
    return NextResponse.json({ 
      success: true, 
      products: products,
      total: products.length,
      source: result.source,
      timestamp: result.timestamp,
      message: 'Scraping terminé avec succès'
    });

  } catch (error) {
    console.error('Erreur API scraping POST:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors du scraping' },
      { status: 500 }
    );
  }
} 