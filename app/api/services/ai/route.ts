import { NextRequest, NextResponse } from 'next/server';
import { 
  AI_SERVICES, 
  executeAIService, 
  getServicesStats, 
  calculateServicePrice, 
  recommendServices 
} from '@/lib/services/ai-services';

/**
 * 🚀 API Services IA - Endpoint pour les services monétisables
 * 
 * GET /api/services/ai?action=stats|catalog|recommendations
 * POST /api/services/ai
 * 
 * Actions GET:
 * - stats: Statistiques des services
 * - catalog: Catalogue complet des services
 * - recommendations: Recommandations selon un besoin
 * 
 * Actions POST:
 * - execute: Exécuter un service IA
 * - calculate-price: Calculer le prix d'un service
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const need = searchParams.get('need');

    switch (action) {
      case 'stats':
        return NextResponse.json({
          success: true,
          data: getServicesStats(),
          timestamp: new Date().toISOString()
        });

      case 'catalog':
        return NextResponse.json({
          success: true,
          data: {
            services: AI_SERVICES,
            categories: ['content', 'image', 'analysis', 'scraping', 'transformation'],
            pricing: {
              currency: 'EUR',
              bulkDiscounts: {
                '5+': '10% de réduction',
                '10+': '20% de réduction'
              }
            }
          },
          timestamp: new Date().toISOString()
        });

      case 'recommendations':
        if (!need) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Paramètre "need" requis pour les recommandations',
              timestamp: new Date().toISOString()
            },
            { status: 400 }
          );
        }
        
        const recommendations = recommendServices(need);
        return NextResponse.json({
          success: true,
          data: {
            need,
            recommendations,
            totalFound: recommendations.length
          },
          timestamp: new Date().toISOString()
        });

      default:
        return NextResponse.json({
          success: true,
          message: 'API Services IA - Utilisez POST pour exécuter des services',
          availableActions: ['stats', 'catalog', 'recommendations'],
          example: {
            stats: 'GET /api/services/ai?action=stats',
            catalog: 'GET /api/services/ai?action=catalog',
            recommendations: 'GET /api/services/ai?action=recommendations&need=génération contenu'
          },
          timestamp: new Date().toISOString()
        });
    }

  } catch (error: any) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur interne du serveur',
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, serviceId, parameters, quantity } = body;

    console.log(`🚀 Services IA: Action "${action}"`);

    switch (action) {
      case 'execute':
        if (!serviceId) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Paramètre "serviceId" requis pour l\'exécution',
              availableServices: AI_SERVICES.map(s => ({ id: s.id, name: s.name, price: s.price })),
              timestamp: new Date().toISOString()
            },
            { status: 400 }
          );
        }

        const result = await executeAIService(serviceId, parameters || {});
        
        return NextResponse.json({
          success: result.success,
          data: result.data,
          serviceUsed: result.serviceUsed,
          creditsConsumed: result.creditsConsumed,
          processingTime: result.processingTime,
          error: result.error,
          timestamp: new Date().toISOString()
        });

      case 'calculate-price':
        if (!serviceId) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Paramètre "serviceId" requis pour le calcul de prix',
              timestamp: new Date().toISOString()
            },
            { status: 400 }
          );
        }

        const price = calculateServicePrice(serviceId, quantity || 1);
        const service = AI_SERVICES.find(s => s.id === serviceId);
        
        return NextResponse.json({
          success: true,
          data: {
            serviceId,
            serviceName: service?.name,
            quantity: quantity || 1,
            unitPrice: service?.price || 0,
            totalPrice: price,
            currency: 'EUR',
            bulkDiscounts: quantity >= 10 ? '20%' : quantity >= 5 ? '10%' : 'Aucune'
          },
          timestamp: new Date().toISOString()
        });

      case 'batch-execute':
        if (!body.services || !Array.isArray(body.services)) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Paramètre "services" (array) requis pour l\'exécution en lot',
              timestamp: new Date().toISOString()
            },
            { status: 400 }
          );
        }

        const batchResults = await Promise.all(
          body.services.map(async (serviceRequest: any) => {
            return await executeAIService(serviceRequest.serviceId, serviceRequest.parameters || {});
          })
        );

        const totalCredits = batchResults.reduce((sum, result) => sum + result.creditsConsumed, 0);
        const successfulServices = batchResults.filter(r => r.success).length;

        return NextResponse.json({
          success: true,
          data: {
            totalServices: batchResults.length,
            successfulServices,
            failedServices: batchResults.length - successfulServices,
            totalCredits,
            results: batchResults
          },
          timestamp: new Date().toISOString()
        });

      default:
        return NextResponse.json(
          { 
            success: false, 
            error: `Action "${action}" non supportée`,
            supportedActions: ['execute', 'calculate-price', 'batch-execute'],
            timestamp: new Date().toISOString()
          },
          { status: 400 }
        );
    }

  } catch (error: any) {
    console.error('❌ Erreur API Services IA:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur lors du traitement',
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 