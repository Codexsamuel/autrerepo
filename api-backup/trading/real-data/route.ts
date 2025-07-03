import { NextRequest, NextResponse } from 'next/server';
import { getMultipleSymbols, getRealPortfolio } from '@/lib/services/trading-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const symbols = searchParams.get('symbols');
    const includePortfolio = searchParams.get('portfolio') === 'true';

    let result: any = {};

    // Récupérer les données des symboles
    if (symbols) {
      const symbolList = symbols.split(',').map(s => s.trim());
      const symbolsData = await getMultipleSymbols(symbolList);
      result.symbols = symbolsData;
    }

    // Récupérer le portefeuille
    if (includePortfolio) {
      const portfolio = await getRealPortfolio();
      result.portfolio = portfolio;
      
      // Calculer les totaux du portefeuille
      const totalValue = portfolio.reduce((sum, position) => sum + position.value, 0);
      const totalPnl = portfolio.reduce((sum, position) => sum + position.pnl, 0);
      const totalPnlPercentage = totalValue > 0 ? (totalPnl / (totalValue - totalPnl)) * 100 : 0;

      result.portfolioSummary = {
        totalValue,
        totalPnl,
        totalPnlPercentage,
        positionCount: portfolio.length
      };
    }

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching real trading data:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch trading data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 