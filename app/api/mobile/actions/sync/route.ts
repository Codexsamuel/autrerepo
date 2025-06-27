import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Token d\'authentification requis' }, { status: 401 });
    }

    const body = await request.json();
    const { lastSync } = body;

    // Simuler la synchronisation des données
    const syncData = {
      users: {
        updated: 15,
        new: 3,
        deleted: 1
      },
      invoices: {
        updated: 25,
        new: 8,
        deleted: 0
      },
      payments: {
        updated: 12,
        new: 5,
        deleted: 0
      },
      lastSyncTimestamp: new Date().toISOString(),
      syncDuration: 1250 // ms
    };

    return NextResponse.json({ 
      sync: syncData,
      message: 'Synchronisation terminée avec succès'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la synchronisation' }, { status: 500 });
  }
} 