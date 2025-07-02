import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Hello from Next.js API!',
    timestamp: new Date().toISOString(),
    status: 'success'
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  
  return NextResponse.json({
    message: 'Hello from Next.js API!',
    receivedData: body,
    timestamp: new Date().toISOString(),
    status: 'success'
  });
} 