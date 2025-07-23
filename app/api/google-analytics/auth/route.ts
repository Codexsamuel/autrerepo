export const revalidate = false;
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Configuration OAuth Google Analytics
    const clientId = process.env.GOOGLE_ANALYTICS_CLIENT_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/google-analytics/callback`;
    
    if (!clientId) {
      return NextResponse.json(
        { error: 'Configuration Google Analytics manquante' },
        { status: 500 }
      );
    }

    // Scopes nécessaires pour Google Analytics
    const scopes = [
      'https://www.googleapis.com/auth/analytics.readonly',
      'https://www.googleapis.com/auth/analytics'
    ].join(' ');

    // URL d'autorisation Google OAuth
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=${encodeURIComponent(scopes)}&` +
      `response_type=code&` +
      `access_type=offline&` +
      `prompt=consent`;

    return NextResponse.json({ authUrl });
  } catch (error) {
    console.error('Erreur lors de la génération de l\'URL d\'authentification:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'authentification' },
      { status: 500 }
    );
  }
} 