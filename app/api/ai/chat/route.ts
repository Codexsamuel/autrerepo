import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message requis' },
        { status: 400 }
      );
    }

    // Simulation d'une réponse IA intelligente
    const responses = [
      `Voici une réponse détaillée à votre question : "${message}". En tant qu'assistant IA, je peux vous aider avec des informations précises et des recommandations personnalisées.`,
      `Excellente question ! Voici mon analyse : "${message}". Basé sur les dernières données et tendances, voici mes recommandations stratégiques.`,
      `Merci pour votre demande : "${message}". Laissez-moi vous fournir une réponse complète avec des insights pratiques et des actions concrètes.`
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    // Simulation d'un délai de traitement
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    return NextResponse.json({
      success: true,
      content: randomResponse,
      service: 'Chat IA Avancé',
      executionTime: `${Math.floor(Math.random() * 10) + 2} secondes`,
      accuracy: '94%',
      cost: '8€',
      credits: 2,
      suggestions: [
        'Poser une question de suivi',
        'Demander plus de détails',
        'Explorer d\'autres sujets'
      ]
    });

  } catch (error) {
    console.error('Erreur API chat:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
} 