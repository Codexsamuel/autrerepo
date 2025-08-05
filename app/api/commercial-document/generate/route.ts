import { NextRequest, NextResponse } from 'next/server';
import { generateCommercialDocument } from '@/lib/services/commercial-document-generator';


export async function GET() {
  return NextResponse.json({
    name: 'Commercial Document Generator API',
    description: 'Générateur automatique de documents commerciaux professionnels avec IA',
    version: '1.0.0',
    endpoints: [
      '/api/commercial-document/generate - POST: Génération de document',
      '/api/commercial-document/generate/stats - GET: Statistiques'
    ],
    features: [
      'Génération de propositions commerciales',
      'Création de présentations business',
      'Rapports et plans d\'action',
      'Budget détaillé avec justifications',
      'Planning de projet avec phases',
      'KPIs personnalisés',
      'Images et visuels générés',
      'Support multilingue (FR/EN/ES)',
      'Tons personnalisables',
      'Export PDF/Word/PowerPoint'
    ],
    documentTypes: ['proposal', 'presentation', 'report', 'plan'],
    tones: ['professional', 'creative', 'technical', 'friendly'],
    languages: ['fr', 'en', 'es']
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      clientName,
      projectName,
      industry,
      objectives,
      budget,
      duration,
      targetAudience,
      uniqueSellingPoints,
      deliverables,
      documentType,
      tone,
      language
    } = body;

    // Validation des champs requis
    const requiredFields = [
      'clientName',
      'projectName',
      'industry',
      'objectives',
      'budget',
      'duration',
      'targetAudience',
      'uniqueSellingPoints',
      'deliverables',
      'documentType',
      'tone',
      'language'
    ];

    const missingFields = requiredFields.filter(field => !body[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          error: 'Champs requis manquants',
          missingFields,
          example: {
            clientName: 'BFI Cameroun',
            projectName: 'Campagne Marketing Digitale',
            industry: 'Finance',
            objectives: 'Augmenter la visibilité de 50% et générer 1000 nouveaux clients',
            budget: '50000€',
            duration: '6 mois',
            targetAudience: 'Professionnels 25-45 ans, secteur financier',
            uniqueSellingPoints: 'Innovation technologique, expertise locale, support 24/7',
            deliverables: 'Site web, application mobile, campagne publicitaire, analytics',
            documentType: 'proposal',
            tone: 'professional',
            language: 'fr'
          }
        },
        { status: 400 }
      );
    }

    // Validation des types de document
    const validDocumentTypes = ['proposal', 'presentation', 'report', 'plan'];
    if (!validDocumentTypes.includes(documentType)) {
      return NextResponse.json(
        { error: 'Type de document invalide', validTypes: validDocumentTypes },
        { status: 400 }
      );
    }

    // Validation des tons
    const validTones = ['professional', 'creative', 'technical', 'friendly'];
    if (!validTones.includes(tone)) {
      return NextResponse.json(
        { error: 'Ton invalide', validTones },
        { status: 400 }
      );
    }

    // Validation des langues
    const validLanguages = ['fr', 'en', 'es'];
    if (!validLanguages.includes(language)) {
      return NextResponse.json(
        { error: 'Langue invalide', validLanguages },
        { status: 400 }
      );
    }

    console.log(`🚀 Génération document commercial: ${projectName} pour ${clientName}`);

    const result = await generateCommercialDocument({
      clientName,
      projectName,
      industry,
      objectives,
      budget,
      duration,
      targetAudience,
      uniqueSellingPoints,
      deliverables,
      documentType,
      tone,
      language
    });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Erreur lors de la génération du document' },
        { status: 500 }
      );
    }

    console.log(`✅ Document généré avec succès: ${result.document.title}`);

    return NextResponse.json({
      success: true,
      message: 'Document commercial généré avec succès',
      data: result.document,
      metadata: result.metadata,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Erreur API Commercial Document Generator:', error);
    return NextResponse.json(
      { 
        error: 'Erreur lors du traitement de la requête',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
} 