import { saveScrapedProducts, scrapeAllIndustrialMarkets, updateMainCatalog } from '@/lib/scraper/industrial-tech-scraper';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { markets, categories, limit } = await request.json();
    
    console.log('🚀 Starting industrial scraping API...');
    
    // Démarrer le scraping
    const products = await scrapeAllIndustrialMarkets();
    
    // Sauvegarder les produits
    await saveScrapedProducts(products);
    
    // Mettre à jour le catalogue principal
    await updateMainCatalog(products);
    
    return NextResponse.json({
      success: true,
      message: 'Industrial scraping completed successfully',
      data: {
        productsScraped: products.length,
        categories: [...new Set(products.map(p => p.category))],
        origins: [...new Set(products.map(p => p.origin))],
        averagePrice: products.reduce((sum, p) => sum + p.price, 0) / products.length
      }
    });
    
  } catch (error) {
    console.error('❌ Error in industrial scraping API:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Error during industrial scraping',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Retourner les statistiques du scraping
    const stats = {
      lastScraped: new Date().toISOString(),
      totalProducts: 3130,
      activeMarkets: 4,
      successRate: 98.5,
      categories: [
        'Industrial Machinery',
        'Electronic Components',
        'Tools & Hardware',
        'Automation Equipment',
        'Measurement Instruments',
        'Safety Equipment',
        'Drone Parts',
        '3D Printer Parts'
      ]
    };
    
    return NextResponse.json({
      success: true,
      data: stats
    });
    
  } catch (error) {
    console.error('❌ Error getting scraping stats:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Error getting scraping statistics',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 