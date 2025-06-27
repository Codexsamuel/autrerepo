import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data: rooms, error } = await supabase
      .from('hospitality_rooms')
      .select('*')
      .order('room_number', { ascending: true });
    if (error) throw error;
    return NextResponse.json({ rooms });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des chambres' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { roomNumber, type, capacity, price, status } = body;
    const { data, error } = await supabase
      .from('hospitality_rooms')
      .insert([
        { room_number: roomNumber, type, capacity, price, status: status || 'available' }
      ])
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ room: data });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création de la chambre' }, { status: 500 });
  }
} 