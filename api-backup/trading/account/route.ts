import { NextResponse } from 'next/server';
import { getAccountInfo } from '@/lib/services/metaApiService';


export async function GET() {
  try {
    const accountInfo = await getAccountInfo();
    return NextResponse.json(accountInfo);
  } catch (error) {
    console.error('Account info error:', error);
    if (error instanceof Error && error.message.includes('MetaTrader configuration is missing')) {
      return NextResponse.json(
        { success: false, error: 'MetaTrader is not configured. Please set up your environment variables.' },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Failed to fetch account information' },
      { status: 500 }
    );
  }
} 