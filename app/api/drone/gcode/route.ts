import { NextRequest, NextResponse } from 'next/server';
import { novaIAGPT4 } from '@/lib/ai/openai-gpt4';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, name } = body;

    if (!type) {
      return NextResponse.json(
        { error: 'Type de drone requis' },
        { status: 400 }
      );
    }

    const gcodePrompt = `Tu es un expert en impression 3D et génération de G-code.
Génère le G-code complet pour imprimer le châssis principal d'un drone ${type} nommé ${name}.

Le G-code doit être optimisé pour une imprimante Creality Ender-3 et inclure :
- Configuration de température (lit: 60°C, buse: 200°C)
- Hauteur de couche: 0.2mm
- Vitesse d'impression: 50mm/s
- Remplissage: 40%
- Supports automatiques
- Refroidissement optimisé
- Calibration de la première couche

G-code complet prêt pour Cura slicer :`;

    const result = await novaIAGPT4.chat([
      { role: 'system', content: 'Tu es un expert en G-code et impression 3D pour drones.' },
      { role: 'user', content: gcodePrompt }
    ]);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Erreur lors de la génération du G-code' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      gcode: result.content,
      type,
      name
    });

  } catch (error) {
    console.error('Erreur API G-code:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
} 