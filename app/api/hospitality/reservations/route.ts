import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data: reservations, error } = await supabase
      .from('hospitality_reservations')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json({ reservations });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des réservations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { guestName, roomNumber, checkIn, checkOut, status } = body;
    const { data, error } = await supabase
      .from('hospitality_reservations')
      .insert([
        { guest_name: guestName, room_number: roomNumber, check_in: checkIn, check_out: checkOut, status: status || 'pending' }
      ])
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ reservation: data });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création de la réservation' }, { status: 500 });
  }
} 