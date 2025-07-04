import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  try {
    // Simuler les outils IA disponibles
    const tools = [
      {
        id: '1',
        name: 'Assistant IA',
        description: 'Assistant conversationnel intelligent pour répondre aux questions et aider les utilisateurs',
        category: 'text',
        status: 'available',
        usage: 1250
      },
      {
        id: '2',
        name: 'Générateur de contenu',
        description: 'Génère automatiquement du contenu textuel basé sur des prompts',
        category: 'text',
        status: 'available',
        usage: 890
      },
      {
        id: '3',
        name: 'Analyse d\'images',
        description: 'Analyse et décrit le contenu des images',
        category: 'image',
        status: 'beta',
        usage: 450
      },
      {
        id: '4',
        name: 'Générateur d\'images',
        description: 'Crée des images à partir de descriptions textuelles',
        category: 'image',
        status: 'available',
        usage: 1200
      },
      {
        id: '5',
        name: 'Analyse vidéo',
        description: 'Analyse le contenu des vidéos et génère des résumés',
        category: 'video',
        status: 'maintenance',
        usage: 320
      },
      {
        id: '6',
        name: 'Analyse de données',
        description: 'Analyse avancée des données et génère des insights',
        category: 'analysis',
        status: 'available',
        usage: 750
      }
    ];

    return NextResponse.json({ tools });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération des outils IA' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, category, status } = body;
    
    // Simuler l'ajout d'un nouvel outil
    const newTool = {
      id: Date.now().toString(),
      name,
      description,
      category,
      status: status || 'beta',
      usage: 0
    };

    return NextResponse.json({ tool: newTool });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la création de l\'outil IA' }, { status: 500 });
  }
} 