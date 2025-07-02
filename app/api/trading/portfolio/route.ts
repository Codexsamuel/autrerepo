import { NextResponse } from 'next/server';

const portfolio = {
  totalValue: 125000,
  dailyChange: 1250,
  totalChange: 8500,
  changePercentage: 7.3,
  positions: [
    { 
      symbol: 'BTC/USD', 
      quantity: 0.5, 
      value: 22500, 
      pnl: 1250, 
      pnlPercentage: 5.9,
      entryPrice: 42500,
      currentPrice: 45000
    },
    { 
      symbol: 'ETH/USD', 
      quantity: 5, 
      value: 16000, 
      pnl: -800, 
      pnlPercentage: -4.8,
      entryPrice: 3360,
      currentPrice: 3200
    },
    { 
      symbol: 'EUR/USD', 
      quantity: 10000, 
      value: 10850, 
      pnl: 300, 
      pnlPercentage: 2.8,
      entryPrice: 1.0820,
      currentPrice: 1.0850
    },
    { 
      symbol: 'AAPL', 
      quantity: 50, 
      value: 9275, 
      pnl: 425, 
      pnlPercentage: 4.8,
      entryPrice: 177.00,
      currentPrice: 185.50
    }
  ],
  cash: 61375,
  margin: 0,
  leverage: 1.0,
  lastUpdate: new Date().toISOString()
};

export async function GET() {
  return NextResponse.json({
    portfolio,
    timestamp: new Date().toISOString(),
    status: 'success'
  });
} 