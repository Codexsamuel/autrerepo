import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  try {
    const { data: signals, error } = await supabase
      .from('trading_signals')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json({ signals });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des signaux' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { symbol, direction, confidence, status } = body;
    const { data, error } = await supabase
      .from('trading_signals')
      .insert([
        { symbol, direction, confidence, status: status || 'active' }
      ])
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ signal: data });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création du signal' }, { status: 500 });
  }
} 