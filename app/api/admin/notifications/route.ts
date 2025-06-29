import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const read = searchParams.get('read') === 'true';
    const limit = parseInt(searchParams.get('limit') || '50');

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('read', read)
      .order('timestamp', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('❌ Erreur récupération notifications:', error);
      return NextResponse.json(
        { error: 'Erreur récupération notifications' },
        { status: 500 }
      );
    }

    return NextResponse.json(data || []);

  } catch (error) {
    console.error('❌ Erreur API notifications:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
} 