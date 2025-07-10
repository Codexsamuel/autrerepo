import { scrapeAlibaba } from '@/lib/scraper/alibaba';
import { scrapeAliExpress } from '@/lib/scraper/aliexpress';
import { scrapeAmazon } from '@/lib/scraper/amazon';
import { scrapeCdiscount } from '@/lib/scraper/cdiscount';
import { scrapeEbay } from '@/lib/scraper/ebay';
import { scrapeShein } from '@/lib/scraper/shein';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      platform, 
      category, 
      query, 
      limit = 20, 
      minPrice, 
      maxPrice,
      sortBy = 'relevance',
      country = 'FR'
    } = body;

    if (!platform || !category) {
      return NextResponse.json(
        { error: 'Platform and category are required' },
        { status: 400 }
      );
    }

    let results = [];

    switch (platform.toLowerCase()) {
      case 'alibaba':
        results = await scrapeAlibaba({ category, query, limit, minPrice, maxPrice, sortBy });
        break;
      case 'shein':
        results = await scrapeShein({ category, query, limit, minPrice, maxPrice, sortBy });
        break;
      case 'cdiscount':
        results = await scrapeCdiscount({ category, query, limit, minPrice, maxPrice, sortBy, country });
        break;
      case 'amazon':
        results = await scrapeAmazon({ category, query, limit, minPrice, maxPrice, sortBy, country });
        break;
      case 'ebay':
        results = await scrapeEbay({ category, query, limit, minPrice, maxPrice, sortBy, country });
        break;
      case 'aliexpress':
        results = await scrapeAliExpress({ category, query, limit, minPrice, maxPrice, sortBy });
        break;
      case 'all':
        // Scrape from all platforms
        const [alibabaResults, sheinResults, cdiscountResults, amazonResults, ebayResults, aliexpressResults] = await Promise.allSettled([
          scrapeAlibaba({ category, query, limit: Math.ceil(limit/6), minPrice, maxPrice, sortBy }),
          scrapeShein({ category, query, limit: Math.ceil(limit/6), minPrice, maxPrice, sortBy }),
          scrapeCdiscount({ category, query, limit: Math.ceil(limit/6), minPrice, maxPrice, sortBy, country }),
          scrapeAmazon({ category, query, limit: Math.ceil(limit/6), minPrice, maxPrice, sortBy, country }),
          scrapeEbay({ category, query, limit: Math.ceil(limit/6), minPrice, maxPrice, sortBy, country }),
          scrapeAliExpress({ category, query, limit: Math.ceil(limit/6), minPrice, maxPrice, sortBy })
        ]);

        results = [
          ...(alibabaResults.status === 'fulfilled' ? alibabaResults.value : []),
          ...(sheinResults.status === 'fulfilled' ? sheinResults.value : []),
          ...(cdiscountResults.status === 'fulfilled' ? cdiscountResults.value : []),
          ...(amazonResults.status === 'fulfilled' ? amazonResults.value : []),
          ...(ebayResults.status === 'fulfilled' ? ebayResults.value : []),
          ...(aliexpressResults.status === 'fulfilled' ? aliexpressResults.value : [])
        ];
        break;
      default:
        return NextResponse.json(
          { error: 'Unsupported platform' },
          { status: 400 }
        );
    }

    // Sort and limit results
    results = results.slice(0, limit);

    return NextResponse.json({
      success: true,
      data: {
        platform,
        category,
        query,
        totalResults: results.length,
        products: results,
        timestamp: new Date().toISOString(),
        metadata: {
          scrapedFrom: platform === 'all' ? ['alibaba', 'shein', 'cdiscount', 'amazon', 'ebay', 'aliexpress'] : [platform],
          filters: { minPrice, maxPrice, sortBy, country }
        }
      }
    });

  } catch (error) {
    console.error('Multi-market scraping error:', error);
    return NextResponse.json(
      { error: 'Scraping failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get('platform');
  const category = searchParams.get('category');
  const query = searchParams.get('query');
  const limit = parseInt(searchParams.get('limit') || '20');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const sortBy = searchParams.get('sortBy') || 'relevance';
  const country = searchParams.get('country') || 'FR';

  if (!platform || !category) {
    return NextResponse.json(
      { error: 'Platform and category are required' },
      { status: 400 }
    );
  }

  try {
    let results = [];

    switch (platform.toLowerCase()) {
      case 'alibaba':
        results = await scrapeAlibaba({ category, query, limit, minPrice, maxPrice, sortBy });
        break;
      case 'shein':
        results = await scrapeShein({ category, query, limit, minPrice, maxPrice, sortBy });
        break;
      case 'cdiscount':
        results = await scrapeCdiscount({ category, query, limit, minPrice, maxPrice, sortBy, country });
        break;
      case 'amazon':
        results = await scrapeAmazon({ category, query, limit, minPrice, maxPrice, sortBy, country });
        break;
      case 'ebay':
        results = await scrapeEbay({ category, query, limit, minPrice, maxPrice, sortBy, country });
        break;
      case 'aliexpress':
        results = await scrapeAliExpress({ category, query, limit, minPrice, maxPrice, sortBy });
        break;
      case 'all':
        const [alibabaResults, sheinResults, cdiscountResults, amazonResults, ebayResults, aliexpressResults] = await Promise.allSettled([
          scrapeAlibaba({ category, query, limit: Math.ceil(limit/6), minPrice, maxPrice, sortBy }),
          scrapeShein({ category, query, limit: Math.ceil(limit/6), minPrice, maxPrice, sortBy }),
          scrapeCdiscount({ category, query, limit: Math.ceil(limit/6), minPrice, maxPrice, sortBy, country }),
          scrapeAmazon({ category, query, limit: Math.ceil(limit/6), minPrice, maxPrice, sortBy, country }),
          scrapeEbay({ category, query, limit: Math.ceil(limit/6), minPrice, maxPrice, sortBy, country }),
          scrapeAliExpress({ category, query, limit: Math.ceil(limit/6), minPrice, maxPrice, sortBy })
        ]);

        results = [
          ...(alibabaResults.status === 'fulfilled' ? alibabaResults.value : []),
          ...(sheinResults.status === 'fulfilled' ? sheinResults.value : []),
          ...(cdiscountResults.status === 'fulfilled' ? cdiscountResults.value : []),
          ...(amazonResults.status === 'fulfilled' ? amazonResults.value : []),
          ...(ebayResults.status === 'fulfilled' ? ebayResults.value : []),
          ...(aliexpressResults.status === 'fulfilled' ? aliexpressResults.value : [])
        ];
        break;
      default:
        return NextResponse.json(
          { error: 'Unsupported platform' },
          { status: 400 }
        );
    }

    results = results.slice(0, limit);

    return NextResponse.json({
      success: true,
      data: {
        platform,
        category,
        query,
        totalResults: results.length,
        products: results,
        timestamp: new Date().toISOString(),
        metadata: {
          scrapedFrom: platform === 'all' ? ['alibaba', 'shein', 'cdiscount', 'amazon', 'ebay', 'aliexpress'] : [platform],
          filters: { minPrice, maxPrice, sortBy, country }
        }
      }
    });

  } catch (error) {
    console.error('Multi-market scraping error:', error);
    return NextResponse.json(
      { error: 'Scraping failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 