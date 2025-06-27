import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data: claims, error } = await supabase
      .from('insurance_claims')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ claims });
  } catch (error) {
    console.error('Erreur lors de la récupération des sinistres:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des sinistres' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { claimNumber, type, clientName, amount, description, date, status } = body;

    const { data, error } = await supabase
      .from('insurance_claims')
      .insert([
        {
          claim_number: claimNumber,
          type,
          client_name: clientName,
          amount,
          description,
          date,
          status: status || 'en_attente'
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ claim: data });
  } catch (error) {
    console.error('Erreur lors de la création du sinistre:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du sinistre' },
      { status: 500 }
    );
  }
} 