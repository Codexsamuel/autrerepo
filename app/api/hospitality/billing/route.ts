import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  try {
    const { data: billings, error } = await supabase
      .from('hospitality_billing')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json({ billings });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des factures' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { invoiceNumber, clientName, amount, status, dueDate } = body;
    const { data, error } = await supabase
      .from('hospitality_billing')
      .insert([
        { invoice_number: invoiceNumber, client_name: clientName, amount, status: status || 'pending', due_date: dueDate }
      ])
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ billing: data });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création de la facture' }, { status: 500 });
  }
} 