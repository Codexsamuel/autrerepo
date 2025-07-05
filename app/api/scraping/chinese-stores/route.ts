import { getCategories, getCountries, getScrapingStats, getSources, scrapeChineseStores } from '@/lib/scraper/chinese-stores';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const query = searchParams.get('query') || '';
    const category = searchParams.get('category') || '';
    const country = searchParams.get('country') || '';

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
    const products = result.products;

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