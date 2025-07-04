import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET(request: NextRequest) {
  // Authentification utilisateur (à adapter selon votre système)
  const userId = request.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

  const { data, error } = await supabase
    .from('crm_integrations')
    .select('*')
    .eq('user_id', userId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ integrations: data });
}

export async function POST(request: NextRequest) {
  const userId = request.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });

  const body = await request.json();
  const { type, apiKey } = body;

  if (!type) return NextResponse.json({ error: 'Type requis' }, { status: 400 });

  // Pour OAuth, la création se fait via un autre endpoint
  if (type === 'google' || type === 'outlook') {
    return NextResponse.json({ error: 'Utiliser le flux OAuth' }, { status: 400 });
  }

  // Pour Zapier, Webhook, Autre : sauvegarde directe
  const { data, error } = await supabase
    .from('crm_integrations')
    .insert([
      {
        user_id: userId,
        type,
        api_key: apiKey || null,
        status: 'connected',
        enabled: true,
        created_at: new Date().toISOString(),
      },
    ])
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ integration: data[0] });
} 