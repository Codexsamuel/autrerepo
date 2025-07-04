import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  try {
    const { data: clients, error } = await supabase
      .from('hospitality_clients')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json({ clients });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des clients' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, address, loyaltyPoints } = body;
    const { data, error } = await supabase
      .from('hospitality_clients')
      .insert([
        { first_name: firstName, last_name: lastName, email, phone, address, loyalty_points: loyaltyPoints || 0 }
      ])
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ client: data });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création du client' }, { status: 500 });
  }
} 