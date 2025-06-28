import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET(request: NextRequest, context: any) {
  const { id } = context.params;
  try {
    const { data: claim, error } = await supabase
      .from('insurance_claims')
      .select('*')
      .eq('id', id)
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

export async function PUT(request: NextRequest, context: any) {
  const { id } = context.params;
  try {
    const body = await request.json();
    const { claim } = body;
    const { data, error } = await supabase
      .from('insurance_claims')
      .update(claim)
      .eq('id', id)
      .select();

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

export async function DELETE(request: NextRequest, context: any) {
  const { id } = context.params;
  try {
    const { error } = await supabase
      .from('insurance_claims')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur lors de la suppression du sinistre:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du sinistre' },
      { status: 500 }
    );
  }
} 