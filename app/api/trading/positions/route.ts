import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data: positions, error } = await supabase
      .from('trading_positions')
      .select('*')
      .order('opened_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json({ positions });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des positions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { symbol, type, amount, entryPrice, currentPrice, pnl, status } = body;
    const { data, error } = await supabase
      .from('trading_positions')
      .insert([
        { symbol, type, amount, entry_price: entryPrice, current_price: currentPrice, pnl, status: status || 'open' }
      ])
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ position: data });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création de la position' }, { status: 500 });
  }
} 