import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt requis' },
        { status: 400 }
      );
    }

    // Simulation d'une génération d'image
    const imageUrls = [
      'https://picsum.photos/800/600?random=1',
      'https://picsum.photos/800/600?random=2',
      'https://picsum.photos/800/600?random=3',
      'https://picsum.photos/800/600?random=4',
      'https://picsum.photos/800/600?random=5'
    ];

    const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];

    // Simulation d'un délai de génération
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));

    return NextResponse.json({
      success: true,
      content: `Image générée avec succès basée sur votre description : "${prompt}". L'image a été créée avec les dernières technologies d'IA et est optimisée pour votre utilisation.`,
      service: 'Génération d\'Images IA',
      executionTime: `${Math.floor(Math.random() * 15) + 5} secondes`,
      accuracy: '91%',
      cost: '15€',
      credits: 3,
      type: 'image',
      imageUrl: randomImageUrl,
      downloadUrl: randomImageUrl,
      style: 'Réaliste',
      resolution: '800x600',
      format: 'PNG'
    });

  } catch (error) {
    console.error('Erreur API génération image:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
} 