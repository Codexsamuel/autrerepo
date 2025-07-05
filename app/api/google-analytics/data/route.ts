import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Vérifier si l'utilisateur est authentifié
    // Pour l'instant, retourner des données simulées
    
    // Simuler des données Google Analytics
    const analyticsData = {
      visitors: 15420,
      pageViews: 45680,
      bounceRate: 42.3,
      avgSessionDuration: 185,
      newUsers: 10500,
      returningUsers: 4920,
      realTimeUsers: 23,
      topPages: [
        { page: '/', views: 12500, change: 12 },
        { page: '/services', views: 8900, change: 8 },
        { page: '/demo', views: 6700, change: -3 },
        { page: '/contact', views: 4200, change: 15 },
        { page: '/trading', views: 3800, change: 22 }
      ],
      trafficSources: [
        { source: 'Google', sessions: 8500, percentage: 58.2 },
        { source: 'Direct', sessions: 4200, percentage: 28.8 },
        { source: 'Social Media', sessions: 2100, percentage: 14.4 },
        { source: 'Referral', sessions: 620, percentage: 4.2 }
      ],
      deviceBreakdown: [
        { device: 'Desktop', sessions: 8200, percentage: 56.2 },
        { device: 'Mobile', sessions: 5800, percentage: 39.7 },
        { device: 'Tablet', sessions: 620, percentage: 4.1 }
      ]
    };

    return NextResponse.json({
      success: true,
      data: analyticsData
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des données Analytics:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Erreur lors de la récupération des données' 
      },
      { status: 500 }
    );
  }
} 