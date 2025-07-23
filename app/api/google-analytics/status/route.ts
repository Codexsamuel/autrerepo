export const revalidate = false;
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Vérifier si l'utilisateur est connecté à Google Analytics
    // Pour l'instant, retourner des données simulées
    const isConnected = false; // À remplacer par la vraie logique d'authentification
    
    return NextResponse.json({
      connected: isConnected,
      propertyId: isConnected ? 'GA4_PROPERTY_ID' : null
    });
  } catch (error) {
    console.error('Erreur lors de la vérification du statut Google Analytics:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la vérification du statut' },
      { status: 500 }
    );
  }
} 