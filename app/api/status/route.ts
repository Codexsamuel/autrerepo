import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'maintenance',
    message: 'API temporairement en maintenance',
    timestamp: new Date().toISOString(),
    build: 'emergency-mode',
  });
}

export async function POST() {
  return NextResponse.json({
    status: 'maintenance',
    message: 'API temporairement en maintenance',
    timestamp: new Date().toISOString(),
    build: 'emergency-mode',
  });
} 