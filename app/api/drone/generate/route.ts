import { novaIAGPT4 } from '@/lib/ai/openai-gpt4';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { controller, type, name } = body;

    if (!controller || !type) {
      return NextResponse.json(
        { error: 'Controller et type requis' },
        { status: 400 }
      );
    }

    const firmwarePrompt = `Tu es un ingénieur militaire IA spécialisé dans les drones.
Génère le code firmware complet pour un microcontrôleur ${controller} qui contrôle un drone ${type} nommé ${name}.

Le code doit inclure :
- Initialisation des moteurs et ESC
- Boucle de contrôle de vol (PID)
- Gestion GPS et navigation
- Capteurs de distance et évitement d'obstacles
- Communication radio sécurisée
- Mode d'urgence et retour automatique
- Télémétrie en temps réel

Code ${controller} complet avec commentaires en français :`;

    const result = await novaIAGPT4.chat([
      { role: 'system', content: 'Tu es un expert en programmation embarquée pour drones militaires.' },
      { role: 'user', content: firmwarePrompt }
    ]);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Erreur lors de la génération du firmware' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      firmware: result.content,
      controller,
      type,
      name
    });

  } catch (error) {
    console.error('Erreur API firmware:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
} 