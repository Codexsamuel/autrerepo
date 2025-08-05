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

    // Simulation de génération de contenu
    const contentTemplates = [
      `Voici un contenu marketing optimisé basé sur votre demande : "${prompt}". Ce contenu a été créé pour maximiser l'engagement et la conversion, avec des mots-clés SEO intégrés et un appel à l'action efficace.`,
      `Contenu généré avec succès ! Basé sur "${prompt}", voici un article/blog optimisé pour votre audience cible. Le contenu inclut des insights pertinents et des recommandations actionnables.`,
      `Excellent sujet ! Voici le contenu généré pour : "${prompt}". Ce contenu est structuré pour captiver l'attention, informer votre audience et encourager l'engagement sur vos plateformes.`
    ];

    const randomContent = contentTemplates[Math.floor(Math.random() * contentTemplates.length)];

    // Simulation d'un délai de génération
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));

    return NextResponse.json({
      success: true,
      content: randomContent,
      service: 'Génération de Contenu Marketing',
      executionTime: `${Math.floor(Math.random() * 12) + 3} secondes`,
      accuracy: '89%',
      cost: '12€',
      credits: 2,
      type: 'marketing',
      wordCount: Math.floor(Math.random() * 500) + 200,
      seoScore: Math.floor(Math.random() * 20) + 80,
      suggestions: [
        'Optimiser pour les réseaux sociaux',
        'Ajouter des call-to-action',
        'Intégrer des mots-clés SEO'
      ]
    });

  } catch (error) {
    console.error('Erreur API génération contenu:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
} 