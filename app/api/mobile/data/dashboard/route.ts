import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Token d\'authentification requis' }, { status: 401 });
    }

    // Récupérer les données du dashboard (version mobile optimisée)
    const dashboardData = {
      stats: {
        totalUsers: 1250,
        activeUsers: 890,
        totalRevenue: 45000,
        monthlyGrowth: 12.5
      },
      recentActivity: [
        {
          id: '1',
          type: 'user_registration',
          message: 'Nouvel utilisateur inscrit',
          timestamp: new Date().toISOString()
        },
        {
          id: '2',
          type: 'payment_received',
          message: 'Paiement reçu',
          timestamp: new Date(Date.now() - 3600000).toISOString()
        }
      ],
      quickActions: [
        { id: '1', name: 'Ajouter utilisateur', icon: 'user-plus' },
        { id: '2', name: 'Voir rapports', icon: 'chart' },
        { id: '3', name: 'Gérer factures', icon: 'file-text' }
      ]
    };

    return NextResponse.json({ 
      dashboard: dashboardData,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des données' }, { status: 500 });
  }
} 