import { NextRequest, NextResponse } from 'next/server';
import { novaIAGPT4 } from '@/lib/ai/openai-gpt4';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, type, objectif, zone } = body;

    if (!name || !type || !objectif || !zone) {
      return NextResponse.json(
        { error: 'Tous les paramètres de mission sont requis' },
        { status: 400 }
      );
    }

    const missionPrompt = `Tu es un stratège militaire IA expert en missions de drones.
Génère une fiche de mission tactique complète pour un drone ${type} nommé ${name}.

MISSION : ${objectif}
ZONE : ${zone}

La fiche doit inclure :
- Objectifs tactiques précis
- Paramètres de vol (altitude, vitesse, endurance)
- Capteurs et équipements requis
- Points de contrôle et waypoints
- Conditions météorologiques optimales
- Protocoles de communication sécurisés
- Procédures d'urgence et retour automatique
- Risques identifiés et contre-mesures
- Durée estimée de la mission

Fiche de mission structurée :`;

    const result = await novaIAGPT4.chat([
      { role: 'system', content: 'Tu es un expert en stratégie militaire et planification de missions de drones tactiques.' },
      { role: 'user', content: missionPrompt }
    ]);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Erreur lors de la génération de la mission' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      mission: result.content,
      name,
      type,
      objectif,
      zone,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erreur API mission:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
} 