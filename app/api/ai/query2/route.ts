import { NextRequest, NextResponse } from 'next/server';
import { makeAIQuery2, generateContentWithAIQuery2 } from '@/lib/ai/ai-query2';

export async function GET() {
  return NextResponse.json({
    name: 'AI Query 2 API',
    description: 'API avancée pour requêtes IA, analyse de données et génération de contenu',
    version: '1.0.0',
    endpoints: [
      '/api/ai/query2 - POST: Requête IA générale',
      '/api/ai/query2/analyze - POST: Analyse de données',
      '/api/ai/query2/generate - POST: Génération de contenu',
      '/api/ai/query2/search - POST: Recherche intelligente'
    ],
    features: [
      'Requêtes IA avancées',
      'Analyse de données',
      'Génération de contenu',
      'Recherche intelligente',
      'Support multilingue'
    ]
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, type, options } = body;

    if (!query) {
      return NextResponse.json(
        { error: 'Le paramètre "query" est requis' },
        { status: 400 }
      );
    }

    const result = await makeAIQuery2({
      query,
      type: type || 'general',
      options: options || {}
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('AI Query 2 API Error:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement de la requête' },
      { status: 500 }
    );
  }
} 