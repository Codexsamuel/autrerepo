import { NextResponse } from 'next/server';
import { placeTrade } from '@/lib/services/metaApiService';


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { symbol, volume, stopLoss, takeProfit } = body;

    if (!symbol || !volume) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const result = await placeTrade({
      symbol,
      volume,
      stopLoss,
      takeProfit
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Trade execution error:', error);
    if (error instanceof Error && error.message.includes('MetaTrader configuration is missing')) {
      return NextResponse.json(
        { success: false, error: 'MetaTrader is not configured. Please set up your environment variables.' },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to execute trade' },
      { status: 500 }
    );
  }
} 