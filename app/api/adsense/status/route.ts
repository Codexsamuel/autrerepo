export const revalidate = false;
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Configuration avec les vraies données AdSense de l'utilisateur
    const adSenseData = {
      connected: true,
      publisherId: 'ca-pub-7781413449967091', // Votre Publisher ID
      siteStatus: 'requires_review' as const, // Statut actuel de votre site
      siteUrl: 'daveandlucesolutions.com',
      lastUpdated: new Date().toISOString(),
      earnings: {
        today: 0.00, // Revenus aujourd'hui
        thisMonth: 0.00, // Revenus ce mois
        thisYear: 0.00, // Revenus cette année
        total: 0.00 // Revenus totaux
      },
      performance: {
        pageViews: 0,
        impressions: 0,
        clicks: 0,
        ctr: 0.00,
        rpm: 0.00,
        cpm: 0.00
      },
      adUnits: [
        {
          id: 'ad-unit-1',
          name: 'Bannière principale',
          type: 'display' as const,
          status: 'inactive' as const,
          performance: {
            impressions: 0,
            clicks: 0,
            ctr: 0.00,
            revenue: 0.00
          }
        },
        {
          id: 'ad-unit-2',
          name: 'Publicité in-article',
          type: 'in-article' as const,
          status: 'inactive' as const,
          performance: {
            impressions: 0,
            clicks: 0,
            ctr: 0.00,
            revenue: 0.00
          }
        }
      ],
      alerts: [
        {
          type: 'warning' as const,
          message: 'Votre site est en cours de révision par Google AdSense',
          date: new Date().toISOString()
        },
        {
          type: 'info' as const,
          message: 'Une fois approuvé, vous pourrez commencer à gagner de l\'argent avec vos publicités',
          date: new Date().toISOString()
        }
      ]
    };
    
    return NextResponse.json({
      success: true,
      data: adSenseData
    });
  } catch (error) {
    console.error('Erreur lors de la vérification du statut AdSense:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la vérification du statut' },
      { status: 500 }
    );
  }
} 