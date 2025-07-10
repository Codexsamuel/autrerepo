import { scrapeAliExpress } from '@/lib/scraper/aliexpress';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || searchParams.get('query') || '';
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!query) {
      return NextResponse.json({
        success: false,
        error: 'Paramètre de recherche requis'
      }, { status: 400 });
    }

    const products = await scrapeAliExpress({ category: "", query });
    const limitedProducts = products.slice(0, limit);

    return NextResponse.json({
      success: true,
      products: limitedProducts,
      total: limitedProducts.length,
      query: query
    });

  } catch (error) {
    console.error('Erreur API scraping products:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
} 