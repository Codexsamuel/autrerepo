import {
    NOVA_AI_SERVICES,
    getRecommendedServices,
    getServicesByCategory,
    getServicesBySubcategory,
    getServicesStats,
    searchServices
} from '@/lib/services/nova-ai-catalog';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 🧠 API NovaIA - Centre d'Intelligence Artificielle
 * 
 * GET /api/nova-ia?action=stats|search|recommendations|categories
 * POST /api/nova-ia
 * 
 * Actions GET:
 * - stats: Statistiques des services NovaIA
 * - search: Recherche de services
 * - recommendations: Recommandations selon un besoin
 * - categories: Services par catégorie
 * 
 * Actions POST:
 * - execute: Exécuter un service NovaIA
 * - batch: Exécution en lot
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const query = searchParams.get('query');
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const useCase = searchParams.get('useCase');

    switch (action) {
      case 'stats':
        return NextResponse.json({
          success: true,
          data: getServicesStats(),
          timestamp: new Date().toISOString()
        });

      case 'search':
        if (!query) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Paramètre "query" requis pour la recherche',
              timestamp: new Date().toISOString()
            },
            { status: 400 }
          );
        }
        
        const searchResults = searchServices(query);
        return NextResponse.json({
          success: true,
          data: {
            query,
            results: searchResults,
            totalFound: searchResults.length,
            categories: [...new Set(searchResults.map(s => s.category))]
          },
          timestamp: new Date().toISOString()
        });

      case 'recommendations':
        if (!useCase) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Paramètre "useCase" requis pour les recommandations',
              timestamp: new Date().toISOString()
            },
            { status: 400 }
          );
        }
        
        const recommendations = getRecommendedServices(useCase);
        return NextResponse.json({
          success: true,
          data: {
            useCase,
            recommendations,
            totalFound: recommendations.length,
            categories: [...new Set(recommendations.map(s => s.category))]
          },
          timestamp: new Date().toISOString()
        });

      case 'categories':
        if (category) {
          const categoryServices = getServicesByCategory(category);
          return NextResponse.json({
            success: true,
            data: {
              category,
              services: categoryServices,
              totalServices: categoryServices.length,
              categories: [...new Set(categoryServices.map(s => s.category))]
            },
            timestamp: new Date().toISOString()
          });
        }
        
        if (subcategory) {
          const subcategoryServices = getServicesBySubcategory(subcategory);
          return NextResponse.json({
            success: true,
            data: {
              subcategory,
              services: subcategoryServices,
              totalServices: subcategoryServices.length,
              categories: [...new Set(subcategoryServices.map(s => s.category))]
            },
            timestamp: new Date().toISOString()
          });
        }

        // Retourner toutes les catégories
        const stats = getServicesStats();
        return NextResponse.json({
          success: true,
          data: {
            categories: stats.categories,
            totalServices: stats.totalServices,
            services: NOVA_AI_SERVICES.map(s => ({
              id: s.id,
              name: s.name,
              category: s.category,
              price: s.price,
              accuracy: s.accuracy,
              executionTime: s.executionTime,
              isProduction: s.isProduction
            }))
          },
          timestamp: new Date().toISOString()
        });

      case 'catalog':
        return NextResponse.json({
          success: true,
          data: {
            services: NOVA_AI_SERVICES,
            categories: ['conversation', 'images', 'voice', 'business', 'marketing', 'ecommerce', 'analysis', 'automation'],
            pricing: {
              currency: 'EUR',
              range: {
                min: Math.min(...NOVA_AI_SERVICES.map(s => s.price)),
                max: Math.max(...NOVA_AI_SERVICES.map(s => s.price)),
                average: Math.round(NOVA_AI_SERVICES.reduce((sum, s) => sum + s.price, 0) / NOVA_AI_SERVICES.length * 100) / 100
              },
              bulkDiscounts: {
                '5+': '10% de réduction',
                '10+': '20% de réduction'
              }
            }
          },
          timestamp: new Date().toISOString()
        });

      default:
        return NextResponse.json({
          success: true,
          message: 'API NovaIA - Centre d\'Intelligence Artificielle',
          availableActions: ['stats', 'search', 'recommendations', 'categories', 'catalog'],
          example: {
            stats: 'GET /api/nova-ia?action=stats',
            search: 'GET /api/nova-ia?action=search&query=génération contenu',
            recommendations: 'GET /api/nova-ia?action=recommendations&useCase=marketing',
            categories: 'GET /api/nova-ia?action=categories&category=conversation',
            catalog: 'GET /api/nova-ia?action=catalog'
          },
          totalServices: NOVA_AI_SERVICES.length,
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
    const { action, serviceId, params, batch } = body;

    switch (action) {
      case 'execute':
        if (!serviceId) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Paramètre "serviceId" requis',
              timestamp: new Date().toISOString()
            },
            { status: 400 }
          );
        }

        const service = NOVA_AI_SERVICES.find(s => s.id === serviceId);
        if (!service) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Service non trouvé',
              timestamp: new Date().toISOString()
            },
            { status: 404 }
          );
        }

        // Simulation d'exécution
        const executionTime = Math.floor(Math.random() * 5000) + 1000;
        await new Promise(resolve => setTimeout(resolve, executionTime));

        return NextResponse.json({
          success: true,
          data: {
            serviceId,
            serviceName: service.name,
            executionTime: `${executionTime}ms`,
            accuracy: service.accuracy,
            cost: service.price,
            credits: service.credits,
            result: {
              type: service.category,
              content: `Résultat de l'exécution de ${service.name}`,
              metadata: {
                protocols: service.protocols,
                features: service.features,
                eloRating: service.eloRating,
                battleScore: service.battleScore
              }
            }
          },
          timestamp: new Date().toISOString()
        });

      case 'batch':
        if (!batch || !Array.isArray(batch)) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Paramètre "batch" requis (tableau de services)',
              timestamp: new Date().toISOString()
            },
            { status: 400 }
          );
        }

        const batchResults = await Promise.all(
          batch.map(async (item: any) => {
            const service = NOVA_AI_SERVICES.find(s => s.id === item.serviceId);
            if (!service) {
              return {
                serviceId: item.serviceId,
                success: false,
                error: 'Service non trouvé'
              };
            }

            const executionTime = Math.floor(Math.random() * 3000) + 500;
            await new Promise(resolve => setTimeout(resolve, executionTime));

            return {
              serviceId: item.serviceId,
              success: true,
              serviceName: service.name,
              executionTime: `${executionTime}ms`,
              accuracy: service.accuracy,
              cost: service.price,
              result: `Résultat batch pour ${service.name}`
            };
          })
        );

        return NextResponse.json({
          success: true,
          data: {
            batchResults,
            totalServices: batchResults.length,
            successfulExecutions: batchResults.filter(r => r.success).length,
            totalCost: batchResults
              .filter(r => r.success)
              .reduce((sum, r) => sum + (r.cost || 0), 0)
          },
          timestamp: new Date().toISOString()
        });

      default:
        return NextResponse.json(
          { 
            success: false, 
            error: 'Action non reconnue',
            availableActions: ['execute', 'batch'],
            timestamp: new Date().toISOString()
          },
          { status: 400 }
        );
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