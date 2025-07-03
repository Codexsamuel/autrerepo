import { NextResponse } from 'next/server';

const symbols = [
  { symbol: 'BTC/USD', price: 45000, change: 2.5, volume: 1250000, high: 45200, low: 44800 },
  { symbol: 'ETH/USD', price: 3200, change: -1.2, volume: 890000, high: 3250, low: 3180 },
  { symbol: 'EUR/USD', price: 1.0850, change: 0.3, volume: 2100000, high: 1.0870, low: 1.0830 },
  { symbol: 'GBP/USD', price: 1.2650, change: -0.8, volume: 950000, high: 1.2680, low: 1.2620 },
  { symbol: 'USD/JPY', price: 150.25, change: 0.1, volume: 1800000, high: 150.50, low: 150.00 },
  { symbol: 'XAU/USD', price: 2050, change: 1.8, volume: 450000, high: 2055, low: 2045 },
  { symbol: 'AAPL', price: 185.50, change: 0.8, volume: 850000, high: 186.00, low: 185.00 },
  { symbol: 'TSLA', price: 245.75, change: -2.1, volume: 650000, high: 248.00, low: 244.00 }
];

export async function GET() {
  return NextResponse.json({
    symbols,
    count: symbols.length,
    timestamp: new Date().toISOString(),
    status: 'success'
  });
} 