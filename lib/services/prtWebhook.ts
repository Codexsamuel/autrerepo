import axios from 'axios';


const PRT_WEBHOOK_URL = process.env.PRT_WEBHOOK_URL;

export interface PRTSignalParams {
  signalId: string;
  symbol?: string;
  direction?: 'BUY' | 'SELL';
  price?: number;
  volume?: number;
  stopLoss?: number;
  takeProfit?: number;
  metadata?: Record<string, any>;
}

export interface PRTSignalResult {
  success: boolean;
  message?: string;
  error?: string;
}

export const sendPRTSignal = async (params: PRTSignalParams): Promise<PRTSignalResult> => {
  if (!PRT_WEBHOOK_URL) {
    return {
      success: false,
      error: 'ProRealTime webhook URL is not configured'
    };
  }

  try {
    const response = await axios.post(PRT_WEBHOOK_URL, {
      timestamp: new Date().toISOString(),
      ...params
    });

    return {
      success: true,
      message: response.data.message || 'Signal sent successfully'
    };
  } catch (error) {
    console.error('ProRealTime webhook error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

export const sendBulkSignals = async (signals: PRTSignalParams[]): Promise<PRTSignalResult[]> => {
  try {
    const results = await Promise.all(
      signals.map(signal => sendPRTSignal(signal))
    );
    return results;
  } catch (error) {
    console.error('Bulk signals error:', error);
    throw error;
  }
}; 