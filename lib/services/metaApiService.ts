const META_API_KEY = process.env.META_API_KEY;
const ACCOUNT_ID = process.env.META_ACCOUNT_ID;

// Chargement dynamique du SDK MetaApi
let api: any = null;
async function getMetaApi() {
  if (!META_API_KEY || !ACCOUNT_ID) {
    throw new Error('MetaTrader configuration is missing. Please set META_API_KEY and META_ACCOUNT_ID in your .env file.');
  }
  if (!api) {
    const MetaApi = (await import('metaapi.cloud-sdk')).default;
    api = new MetaApi(META_API_KEY as string);
  }
  return api;
}

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

export const initMetaTrader = async () => {
  try {
    const metaApi = await getMetaApi();
    const account = await metaApi.metatraderAccountApi.getAccount(ACCOUNT_ID as string);
    await account.deploy();
    await account.waitConnected();
    const connection = account.getRPCConnection();
    await connection.connect();
    return connection;
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