import { NextResponse } from 'next/server';
import { getPositions } from '@/lib/services/metaApiService';

export async function GET() {
  try {
    const positions = await getPositions();
    return NextResponse.json(positions);
  } catch (error) {
    console.error('Positions error:', error);
    if (error instanceof Error && error.message.includes('MetaTrader configuration is missing')) {
      return NextResponse.json(
        { success: false, error: 'MetaTrader is not configured. Please set up your environment variables.' },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to fetch positions' },
      { status: 500 }
    );
  }
} 