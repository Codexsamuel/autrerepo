import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    // Simuler une réponse d'assistant IA
    let response = '';
    
    if (message.toLowerCase().includes('bonjour') || message.toLowerCase().includes('salut')) {
      response = 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?';
    } else if (message.toLowerCase().includes('aide') || message.toLowerCase().includes('help')) {
      response = 'Je peux vous aider avec :\n- Questions générales\n- Analyse de données\n- Génération de contenu\n- Support technique\nQue souhaitez-vous faire ?';
    } else if (message.toLowerCase().includes('merci')) {
      response = 'De rien ! N\'hésitez pas si vous avez d\'autres questions.';
    } else if (message.toLowerCase().includes('au revoir') || message.toLowerCase().includes('bye')) {
      response = 'Au revoir ! À bientôt !';
    } else {
      response = 'Je comprends votre question. Pouvez-vous me donner plus de détails pour que je puisse mieux vous aider ?';
    }

    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors du traitement du message' }, { status: 500 });
  }
} 