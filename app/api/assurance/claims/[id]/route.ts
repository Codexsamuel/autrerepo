import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data: claim, error } = await supabase
      .from('insurance_claims')
      .select('*')
      .eq('id', params.id)
      .single();

    if (error) throw error;

    return NextResponse.json({ claim });
  } catch (error) {
    console.error('Erreur lors de la récupération du sinistre:', error);
    return NextResponse.json(
      { error: 'Sinistre non trouvé' },
      { status: 404 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { claimNumber, type, clientName, amount, description, date, status } = body;

    const { data, error } = await supabase
      .from('insurance_claims')
      .update({
        claim_number: claimNumber,
        type,
        client_name: clientName,
        amount,
        description,
        date,
        status
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ claim: data });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du sinistre:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du sinistre' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from('insurance_claims')
      .delete()
      .eq('id', params.id);

    if (error) throw error;

    return NextResponse.json({ message: 'Sinistre supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du sinistre:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du sinistre' },
      { status: 500 }
    );
  }
} 