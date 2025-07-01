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

      default:
        console.log('🔍 Scraping en temps réel:', category);
        const result = await scrapeChineseStores(query, category, country);
        const products = result.products || [];
        console.log('✅ Scraping terminé:', products.length, 'produits trouvés');
        
        // Transformer les données pour correspondre au format attendu
        const transformedProducts = products.map((scrapedProduct: any) => ({
          id: scrapedProduct.id || `product-${Date.now()}-${Math.random()}`,
          name: scrapedProduct.name || 'Produit Premium',
          description: scrapedProduct.description || 'Description du produit',
          originalPrice: scrapedProduct.originalPrice || 0,
          sellingPrice: scrapedProduct.sellingPrice || 0,
          currency: scrapedProduct.currency || 'USD',
          images: scrapedProduct.images || [],
          category: scrapedProduct.category || 'Général',
          market: scrapedProduct.market || 'china',
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
            customsFee: scrapedProduct.customsFee || 0,
            transportFee: scrapedProduct.transportFee || 0
          },
          stock: scrapedProduct.stock || 10,
          rating: scrapedProduct.rating || 4.5,
          reviews: scrapedProduct.reviews || 0,
          createdAt: new Date()
        }));

        return NextResponse.json({ 
          success: true, 
          data: transformedProducts,
          total: transformedProducts.length
        });
    }
  } catch (error) {
    console.error('Erreur API scraping:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Erreur lors du scraping',
      data: []
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, category, country } = body;

    console.log(`🔍 Scraping POST: ${category}`);
    const result = await scrapeChineseStores(query, category, country);
    const products = result.products || [];
    console.log(`✅ Scraping POST terminé: ${products.length} produits trouvés`);

    // Corriger les propriétés undefined
    const correctedProducts = products.map((scrapedProduct: any) => ({
      id: scrapedProduct.id || `product-${Date.now()}-${Math.random()}`,
      name: scrapedProduct.name || 'Produit Premium',
      description: scrapedProduct.description || 'Description du produit',
      originalPrice: scrapedProduct.originalPrice || 0,
      sellingPrice: scrapedProduct.sellingPrice || 0,
      currency: scrapedProduct.currency || 'USD',
      images: scrapedProduct.images || [],
      category: scrapedProduct.category || 'Général',
      market: scrapedProduct.market || 'china',
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
        customsFee: scrapedProduct.customsFee || 0,
        transportFee: scrapedProduct.transportFee || 0
      },
      stock: scrapedProduct.stock || 0,
      rating: scrapedProduct.rating || 0,
      reviews: scrapedProduct.reviews || 0,
      createdAt: scrapedProduct.createdAt || new Date()
    }));

    return NextResponse.json({ success: true, data: correctedProducts });
  } catch (error) {
    console.error('Erreur API scraping POST:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors du scraping' },
      { status: 500 }
    );
  }
} 