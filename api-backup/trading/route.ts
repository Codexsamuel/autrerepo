import { NextResponse } from 'next/server';

// Données simulées pour le trading
const mockTradingData = {
  symbols: [
    { symbol: 'BTC/USD', price: 45000, change: 2.5, volume: 1250000 },
    { symbol: 'ETH/USD', price: 3200, change: -1.2, volume: 890000 },
    { symbol: 'EUR/USD', price: 1.0850, change: 0.3, volume: 2100000 },
    { symbol: 'GBP/USD', price: 1.2650, change: -0.8, volume: 950000 },
    { symbol: 'USD/JPY', price: 150.25, change: 0.1, volume: 1800000 },
    { symbol: 'XAU/USD', price: 2050, change: 1.8, volume: 450000 }
  ],
  portfolio: {
    totalValue: 125000,
    dailyChange: 1250,
    totalChange: 8500,
    positions: [
      { symbol: 'BTC/USD', quantity: 0.5, value: 22500, pnl: 1250 },
      { symbol: 'ETH/USD', quantity: 5, value: 16000, pnl: -800 },
      { symbol: 'EUR/USD', quantity: 10000, value: 10850, pnl: 300 }
    ]
  },
  marketStatus: {
    isOpen: true,
    nextOpen: '2025-01-06T08:00:00Z',
    lastUpdate: new Date().toISOString()
  }
};

export async function GET() {
  return NextResponse.json({
    message: 'Trading API is working!',
    availableEndpoints: [
      '/api/trading/symbols',
      '/api/trading/portfolio',
      '/api/trading/market-status'
    ],
    timestamp: new Date().toISOString(),
    status: 'success'
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    return NextResponse.json({
      message: 'Trading API received your request',
      receivedData: body,
      timestamp: new Date().toISOString(),
      status: 'success'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON in request body' },
      { status: 400 }
    );
  }
} 