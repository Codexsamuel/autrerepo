const META_API_KEY = process.env.META_API_KEY;
const ACCOUNT_ID = process.env.META_ACCOUNT_ID;

// Mock MetaApi service since the SDK was removed
export interface TradeParams {
  symbol: string;
  volume?: number;
  stopLoss?: number;
  takeProfit?: number;
}

export interface TradeResult {
  success: boolean;
  orderId?: string;
  error?: string;
}

export interface AccountInfo {
  balance: number;
  equity: number;
  margin: number;
  freeMargin: number;
  leverage: number;
  currency: string;
}

export interface Position {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  volume: number;
  openPrice: number;
  currentPrice: number;
  profit: number;
  swap: number;
  openTime: string;
}

// Mock account data
const mockAccountInfo: AccountInfo = {
  balance: 10000,
  equity: 10250,
  margin: 500,
  freeMargin: 9750,
  leverage: 100,
  currency: 'USD'
};

const mockPositions: Position[] = [
  {
    id: '1',
    symbol: 'EURUSD',
    type: 'BUY',
    volume: 0.1,
    openPrice: 1.0850,
    currentPrice: 1.0875,
    profit: 25,
    swap: -2.5,
    openTime: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    symbol: 'GBPUSD',
    type: 'SELL',
    volume: 0.05,
    openPrice: 1.2650,
    currentPrice: 1.2625,
    profit: 12.5,
    swap: -1.25,
    openTime: '2024-01-15T14:20:00Z'
  }
];

export const initMetaTrader = async () => {
  try {
    if (!META_API_KEY || !ACCOUNT_ID) {
      throw new Error('MetaTrader configuration is missing. Please set META_API_KEY and META_ACCOUNT_ID in your .env file.');
    }
    
    // Return mock connection
    return {
      connect: async () => Promise.resolve(),
      createMarketBuyOrder: async (symbol: string, volume: number, stopLoss: number, takeProfit: number) => ({
        orderId: `mock-${Date.now()}`,
        symbol,
        volume,
        stopLoss,
        takeProfit
      }),
      createMarketSellOrder: async (symbol: string, volume: number, stopLoss: number, takeProfit: number) => ({
        orderId: `mock-${Date.now()}`,
        symbol,
        volume,
        stopLoss,
        takeProfit
      }),
      getAccountInformation: async () => mockAccountInfo,
      getPositions: async () => mockPositions
    };
  } catch (error) {
    console.error('MetaTrader initialization error:', error);
    throw error;
  }
};

export const placeTrade = async ({ symbol, volume = 0.01, stopLoss = 0.1, takeProfit = 0.1 }: TradeParams): Promise<TradeResult> => {
  try {
    const conn = await initMetaTrader();
    const result = await conn.createMarketBuyOrder(symbol, volume, stopLoss, takeProfit);
    return {
      success: true,
      orderId: result.orderId
    };
  } catch (error) {
    console.error('Trade execution error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

export const getAccountInfo = async () => {
  try {
    const conn = await initMetaTrader();
    return await conn.getAccountInformation();
  } catch (error) {
    console.error('Account info error:', error);
    throw error;
  }
};

export const getPositions = async () => {
  try {
    const conn = await initMetaTrader();
    return await conn.getPositions();
  } catch (error) {
    console.error('Positions error:', error);
    throw error;
  }
}; 