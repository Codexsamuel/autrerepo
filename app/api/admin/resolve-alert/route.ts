import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { alertId, resolution } = await request.json();

    if (!alertId) {
      return NextResponse.json(
        { error: 'ID d\'alerte requis' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('security_alerts')
      .update({
        resolved: true,
        resolution: resolution || 'Résolu par administrateur',
        resolved_at: new Date().toISOString()
      })
      .eq('id', alertId);

    if (error) {
      console.error('❌ Erreur résolution alerte:', error);
      return NextResponse.json(
        { error: 'Erreur résolution alerte' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Alerte résolue' });

  } catch (error) {
    console.error('❌ Erreur API résolution:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 