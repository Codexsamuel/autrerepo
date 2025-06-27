import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data: invoices, error } = await supabase
      .from('facturation_invoices')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json({ invoices });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des factures' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { invoiceNumber, clientName, amount, status, dueDate } = body;
    const { data, error } = await supabase
      .from('facturation_invoices')
      .insert([
        { invoice_number: invoiceNumber, client_name: clientName, amount, status: status || 'pending', due_date: dueDate }
      ])
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ invoice: data });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création de la facture' }, { status: 500 });
  }
} 