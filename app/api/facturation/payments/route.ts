import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  try {
    const { data: payments, error } = await supabase
      .from('facturation_payments')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json({ payments });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des paiements' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentNumber, invoiceNumber, clientName, amount, method, status } = body;
    const { data, error } = await supabase
      .from('facturation_payments')
      .insert([
        { payment_number: paymentNumber, invoice_number: invoiceNumber, client_name: clientName, amount, method, status: status || 'pending' }
      ])
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json({ payment: data });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création du paiement' }, { status: 500 });
  }
} 