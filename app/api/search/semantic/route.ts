import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { ensureIdempotent } from '@/lib/idempotency';
import { audit } from '@/lib/audit';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      q_embedding, 
      limit = 10, 
      similarity_threshold = 0.7,
      idempotency_key 
    } = body;

    // Validation des paramètres
    if (!Array.isArray(q_embedding) || q_embedding.length !== 1536) {
      return NextResponse.json({ 
        error: "Embedding invalide. Doit être un tableau de 1536 floats." 
      }, { status: 400 });
    }

    // Vérification idempotency
    if (idempotency_key) {
      try {
        await ensureIdempotent(idempotency_key, '/api/search/semantic');
      } catch (error) {
        return NextResponse.json({ 
          error: "Requête en double détectée" 
        }, { status: 409 });
      }
    }

    const supa = supabaseAdmin();
    
    // Recherche sémantique via RPC
    const { data, error } = await supa.rpc("search_services_semantic", {
      query_embedding: q_embedding,
      match_count: limit,
      similarity_threshold: similarity_threshold
    });

    if (error) {
      console.error('Erreur recherche sémantique:', error);
      return NextResponse.json({ 
        error: "Erreur lors de la recherche sémantique" 
      }, { status: 500 });
    }

    // Audit de la recherche
    await audit(null, 'SEARCH_SEMANTIC', 'services', {
      query_length: q_embedding.length,
      limit,
      similarity_threshold,
      results_count: data?.length || 0,
      user_agent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || 'unknown'
    });

    return NextResponse.json({
      success: true,
      data: data || [],
      metadata: {
        total_results: data?.length || 0,
        similarity_threshold,
        search_timestamp: new Date().toISOString(),
        model: 'pgvector-1536'
      }
    });

  } catch (error) {
    console.error('Erreur API recherche sémantique:', error);
    
    // Audit de l'erreur
    await audit(null, 'SEARCH_SEMANTIC_ERROR', 'api', {
      error: error instanceof Error ? error.message : 'Erreur inconnue',
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({ 
      error: "Erreur interne du serveur" 
    }, { status: 500 });
  }
}

// Méthode GET pour vérifier le statut de l'API
export async function GET() {
  return NextResponse.json({
    status: 'active',
    service: 'NovaWorld Semantic Search API',
    version: '1.0.0',
    features: [
      'Recherche sémantique avec pgvector',
      'Support des embeddings 1536-dimensions',
      'Seuil de similarité configurable',
      'Idempotency et audit logging',
      'Index ANN optimisé'
    ],
    timestamp: new Date().toISOString(),
  });
} 