import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Vérifier si l'utilisateur est connecté à Google Search Console
    // Pour l'instant, retourner des données simulées
    const isConnected = false; // À remplacer par la vraie logique d'authentification
    
    return NextResponse.json({
      connected: isConnected,
      propertyId: isConnected ? 'SEARCH_CONSOLE_PROPERTY_ID' : null
    });
  } catch (error) {
    console.error('Erreur lors de la vérification du statut SEO:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la vérification du statut' },
      { status: 500 }
    );
  }
} 