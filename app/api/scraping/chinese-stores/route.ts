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
        return NextResponse.json({ success: true, data: result });
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
    
    return NextResponse.json({ 
      success: true, 
      data: result,
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