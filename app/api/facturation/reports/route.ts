import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'month';

    // Récupérer les données de facturation
    const { data: invoices, error: invoicesError } = await supabase
      .from('facturation_invoices')
      .select('*');
    
    if (invoicesError) throw invoicesError;

    // Récupérer les données de paiements
    const { data: payments, error: paymentsError } = await supabase
      .from('facturation_payments')
      .select('*');
    
    if (paymentsError) throw paymentsError;

    // Calculer les statistiques
    const totalRevenue = payments?.reduce((sum: number, payment: { amount: number }) => sum + payment.amount, 0) || 0;
    const totalInvoices = invoices?.length || 0;
    const totalPayments = payments?.length || 0;
    const outstandingAmount = invoices?.reduce((sum: number, invoice: { status: string, amount: number }) => {
      if (invoice.status !== 'paid') return sum + invoice.amount;
      return sum;
    }, 0) || 0;

    // Données mensuelles simulées
    const monthlyData = [
      { month: 'Janvier', revenue: 15000, invoices: 25 },
      { month: 'Février', revenue: 18000, invoices: 30 },
      { month: 'Mars', revenue: 22000, invoices: 35 },
      { month: 'Avril', revenue: 19000, invoices: 28 },
      { month: 'Mai', revenue: 25000, invoices: 40 },
      { month: 'Juin', revenue: 28000, invoices: 45 }
    ];

    return NextResponse.json({
      totalRevenue,
      totalInvoices,
      totalPayments,
      outstandingAmount,
      monthlyData
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la génération du rapport' }, { status: 500 });
  }
} 