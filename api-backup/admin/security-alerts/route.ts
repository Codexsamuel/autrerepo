import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const resolved = searchParams.get('resolved') === 'true';
    const limit = parseInt(searchParams.get('limit') || '50');

    const { data, error } = await supabase
      .from('security_alerts')
      .select('*')
      .eq('resolved', resolved)
      .order('timestamp', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('❌ Erreur récupération alertes:', error);
      return NextResponse.json(
        { error: 'Erreur récupération alertes' },
        { status: 500 }
      );
    }

    return NextResponse.json(data || []);

  } catch (error) {
    console.error('❌ Erreur API alertes:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 