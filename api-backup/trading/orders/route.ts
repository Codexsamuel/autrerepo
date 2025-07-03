import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  try {
    const { data: orders, error } = await supabase
      .from('trading_orders')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json({ orders });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des ordres' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { symbol, type, amount, price, status } = body;
    const { data, error } = await supabase
      .from('trading_orders')
      .insert([
        { symbol, type, amount, price, status: status || 'pending' }
      ])
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ order: data });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création de l\'ordre' }, { status: 500 });
  }
} 