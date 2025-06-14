import { NextResponse } from 'next/server';
import { sendPRTSignal } from '@/lib/services/prtWebhook';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { signalId, symbol, direction, volume } = body;

    if (!signalId) {
      return NextResponse.json(
        { success: false, error: 'Missing signal ID' },
        { status: 400 }
      );
    }

    const result = await sendPRTSignal({
      signalId,
      symbol,
      direction,
      volume,
      metadata: {
        timestamp: new Date().toISOString(),
        source: 'DAVY Trading Center'
      }
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Signal sending error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send signal' },
      { status: 500 }
    );
  }
} 