import { DarkGPTService, MarketContext } from '@/lib/ai/dark-gpt-service';
import { NextRequest, NextResponse } from 'next/server';

const darkGPTService = new DarkGPTService();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');
    const action = searchParams.get('action') || 'analyze';
    const timeframe = searchParams.get('timeframe') || '1D';
    const riskProfile = searchParams.get('riskProfile') || 'moderate';
    const capital = parseFloat(searchParams.get('capital') || '10000');

    if (!symbol) {
      return NextResponse.json(
        { error: 'Symbole requis' },
        { status: 400 }
      );
    }

    // Récupérer les données de marché depuis notre API existante
    const marketDataResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/trading/real-data?symbols=${symbol}&portfolio=false`);
    const marketData = await marketDataResponse.json();
    
    const symbolData = marketData.data?.find((item: any) => item.symbol === symbol);
    
    if (!symbolData) {
      return NextResponse.json(
        { error: 'Données de marché non disponibles' },
        { status: 404 }
      );
    }

    // Construire le contexte de marché pour Dark GPT
    const marketContext: MarketContext = {
      symbol,
      currentPrice: symbolData.price || 0,
      volume: symbolData.volume || 0,
      change24h: symbolData.change24h || 0,
      marketCap: symbolData.marketCap,
      sector: symbolData.sector,
      news: symbolData.news || [],
      technicalIndicators: symbolData.technicalIndicators,
      sentiment: symbolData.sentiment,
      economicEvents: {
        fedMeetings: ['Prochaine réunion Fed: 20-21 décembre'],
        earningsReports: ['Rapport trimestriel attendu'],
        politicalEvents: ['Élections américaines 2024'],
        economicData: ['Inflation, PIB, Chômage']
      }
    };

    let result;

    switch (action) {
      case 'analyze':
        result = await darkGPTService.analyzeMarket(marketContext);
        break;
      
      case 'predict':
        result = await darkGPTService.predictPrice(symbol, timeframe, marketContext);
        break;
      
      case 'strategy':
        result = await darkGPTService.generateTradingStrategy(
          symbol,
          riskProfile as 'conservative' | 'moderate' | 'aggressive',
          capital,
          marketContext
        );
        break;
      
      case 'insights':
        const insights = await darkGPTService.getMarketInsights([symbol]);
        result = insights.get(symbol);
        break;
      
      default:
        return NextResponse.json(
          { error: 'Action non reconnue' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: result,
      metadata: {
        symbol,
        action,
        timestamp: new Date().toISOString(),
        model: 'DarkGPT-v1.0',
        cacheStats: darkGPTService.getCacheStats()
      }
    });

  } catch (error) {
    console.error('Erreur Dark GPT API:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de l\'analyse Dark GPT',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      symbol, 
      action = 'analyze', 
      timeframe = '1D',
      riskProfile = 'moderate',
      capital = 10000,
      customContext 
    } = body;

    if (!symbol) {
      return NextResponse.json(
        { error: 'Symbole requis' },
        { status: 400 }
      );
    }

    // Récupérer les données de marché
    const marketDataResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/trading/real-data?symbols=${symbol}&portfolio=false`);
    const marketData = await marketDataResponse.json();
    
    const symbolData = marketData.data?.find((item: any) => item.symbol === symbol);
    
    if (!symbolData) {
      return NextResponse.json(
        { error: 'Données de marché non disponibles' },
        { status: 404 }
      );
    }

    // Construire le contexte de marché
    const marketContext: MarketContext = {
      symbol,
      currentPrice: symbolData.price || 0,
      volume: symbolData.volume || 0,
      change24h: symbolData.change24h || 0,
      marketCap: symbolData.marketCap,
      sector: symbolData.sector,
      news: symbolData.news || [],
      technicalIndicators: symbolData.technicalIndicators,
      sentiment: symbolData.sentiment,
      economicEvents: {
        fedMeetings: ['Prochaine réunion Fed: 20-21 décembre'],
        earningsReports: ['Rapport trimestriel attendu'],
        politicalEvents: ['Élections américaines 2024'],
        economicData: ['Inflation, PIB, Chômage']
      },
      ...customContext // Permettre un contexte personnalisé
    };

    let result;

    switch (action) {
      case 'analyze':
        result = await darkGPTService.analyzeMarket(marketContext);
        break;
      
      case 'predict':
        result = await darkGPTService.predictPrice(symbol, timeframe, marketContext);
        break;
      
      case 'strategy':
        result = await darkGPTService.generateTradingStrategy(
          symbol,
          riskProfile as 'conservative' | 'moderate' | 'aggressive',
          capital,
          marketContext
        );
        break;
      
      case 'insights':
        const insights = await darkGPTService.getMarketInsights([symbol]);
        result = insights.get(symbol);
        break;
      
      case 'batch':
        // Analyse de plusieurs symboles
        const symbols = Array.isArray(symbol) ? symbol : [symbol];
        const batchInsights = await darkGPTService.getMarketInsights(symbols);
        result = Object.fromEntries(batchInsights);
        break;
      
      default:
        return NextResponse.json(
          { error: 'Action non reconnue' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: result,
      metadata: {
        symbol,
        action,
        timestamp: new Date().toISOString(),
        model: 'DarkGPT-v1.0',
        cacheStats: darkGPTService.getCacheStats()
      }
    });

  } catch (error) {
    console.error('Erreur Dark GPT API POST:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors de l\'analyse Dark GPT',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Vider le cache Dark GPT
    darkGPTService.clearCache();
    
    return NextResponse.json({
      success: true,
      message: 'Cache Dark GPT vidé avec succès',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Erreur lors du vidage du cache Dark GPT:', error);
    return NextResponse.json(
      { error: 'Erreur lors du vidage du cache' },
      { status: 500 }
    );
  }
} 