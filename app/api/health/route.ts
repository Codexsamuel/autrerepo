import { NextResponse } from 'next/server';

// Configuration pour éviter le pré-rendu
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: '1.0.0',
    message: 'DL Solutions API is running correctly'
  });
} 