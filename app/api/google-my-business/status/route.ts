import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Configuration avec les vraies données du profil
    const businessProfile = {
      connected: true,
      businessId: '14485140012634952843', // Votre Business Profile ID
      businessName: 'DL Solutions',
      address: 'Adresse de votre entreprise',
      phone: '+33 1 23 45 67 89', // Votre numéro de téléphone
      website: 'https://daveandlucesolutions.com',
      shopCode: '04159489840104332581', // Votre Shop Code
      labels: [],
      googleAdsPhone: null,
      shareData: true,
      automatedCalls: true,
      showPhone: false
    };
    
    return NextResponse.json(businessProfile);
  } catch (error) {
    console.error('Erreur lors de la vérification du statut Google My Business:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la vérification du statut' },
      { status: 500 }
    );
  }
} 