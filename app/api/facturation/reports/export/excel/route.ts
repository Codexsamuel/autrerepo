import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Simuler la génération d'un fichier Excel (CSV pour simplifier)
    const csvContent = `Date,Facture,Client,Montant,Statut
2024-01-15,FAC-001,Client A,1500.00,Payée
2024-01-16,FAC-002,Client B,2300.00,En attente
2024-01-17,FAC-003,Client C,1800.00,Payée
2024-01-18,FAC-004,Client D,3200.00,En retard
2024-01-19,FAC-005,Client E,950.00,Payée`;

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="rapport-facturation.csv"'
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la génération du fichier Excel' }, { status: 500 });
  }
} 