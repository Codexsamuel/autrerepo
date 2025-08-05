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
            categories: [...new Set(searchResults.map(s => s.category))],
            subcategories: [...new Set(searchResults.map(s => s.subcategory))]
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
              subcategories: [...new Set(categoryServices.map(s => s.subcategory))]
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
            subcategories: stats.subcategories,
            totalServices: stats.totalServices,
            services: NOVA_AI_SERVICES.map(s => ({
              id: s.id,
              name: s.name,
              category: s.category,
              subcategory: s.subcategory,
              price: s.price,
              status: s.status,
              icon: s.icon
            }))
          },
          timestamp: new Date().toISOString()
        });

      case 'catalog':
        return NextResponse.json({
          success: true,
          data: {
            services: NOVA_AI_SERVICES,
            categories: ['text', 'image', 'voice', 'chatbot', 'ecommerce', 'automation', 'analysis', 'transformation'],
            subcategories: [...new Set(NOVA_AI_SERVICES.map(s => s.subcategory))],
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
            categories: 'GET /api/nova-ia?action=categories&category=text',
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
    const { action, serviceId, parameters, services } = body;

    console.log(`🧠 NovaIA: Action "${action}"`);

    switch (action) {
      case 'execute':
        if (!serviceId) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Paramètre "serviceId" requis pour l\'exécution',
              availableServices: NOVA_AI_SERVICES.map(s => ({ 
                id: s.id, 
                name: s.name, 
                price: s.price, 
                category: s.category 
              })),
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
              error: `Service "${serviceId}" non trouvé`,
              timestamp: new Date().toISOString()
            },
            { status: 404 }
          );
        }

        // Simulation d'exécution (à connecter avec les vraies APIs)
        const startTime = Date.now();
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulation délai
        const processingTime = Date.now() - startTime;

        return NextResponse.json({
          success: true,
          data: {
            serviceId,
            serviceName: service.name,
            category: service.category,
            subcategory: service.subcategory,
            price: service.price,
            credits: service.credits,
            processingTime,
            accuracy: service.accuracy,
            result: `Résultat simulé pour ${service.name}`,
            apiEndpoint: service.apiEndpoint
          },
          timestamp: new Date().toISOString()
        });

      case 'batch':
        if (!services || !Array.isArray(services)) {
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
          services.map(async (serviceRequest: any) => {
            const service = NOVA_AI_SERVICES.find(s => s.id === serviceRequest.serviceId);
            if (!service) {
              return {
                success: false,
                serviceId: serviceRequest.serviceId,
                error: 'Service non trouvé'
              };
            }

            const startTime = Date.now();
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulation délai
            const processingTime = Date.now() - startTime;

            return {
              success: true,
              serviceId: serviceRequest.serviceId,
              serviceName: service.name,
              price: service.price,
              credits: service.credits,
              processingTime,
              result: `Résultat simulé pour ${service.name}`
            };
          })
        );

        const totalCredits = batchResults.reduce((sum, result) => sum + (result.credits || 0), 0);
        const successfulServices = batchResults.filter(r => r.success).length;
        const totalPrice = batchResults.reduce((sum, result) => sum + (result.price || 0), 0);

        return NextResponse.json({
          success: true,
          data: {
            totalServices: batchResults.length,
            successfulServices,
            failedServices: batchResults.length - successfulServices,
            totalCredits,
            totalPrice,
            results: batchResults
          },
          timestamp: new Date().toISOString()
        });

      case 'analyze':
        if (!parameters || !parameters.text) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'Paramètre "parameters.text" requis pour l\'analyse',
              timestamp: new Date().toISOString()
            },
            { status: 400 }
          );
        }

        // Analyse intelligente du besoin
        const text = parameters.text.toLowerCase();
        const keywords = text.split(' ');
        
        const relevantServices = NOVA_AI_SERVICES.filter(service => {
          const serviceText = `${service.name} ${service.description} ${service.keywords.join(' ')} ${service.useCases.join(' ')}`.toLowerCase();
          return keywords.some(keyword => serviceText.includes(keyword));
        }).sort((a, b) => b.price - a.price);

        return NextResponse.json({
          success: true,
          data: {
            analysis: {
              text: parameters.text,
              keywords: keywords,
              relevantServices: relevantServices.slice(0, 5),
              totalMatches: relevantServices.length,
              categories: [...new Set(relevantServices.map(s => s.category))],
              estimatedCost: relevantServices.slice(0, 3).reduce((sum, s) => sum + s.price, 0)
            }
          },
          timestamp: new Date().toISOString()
        });

      default:
        return NextResponse.json(
          { 
            success: false, 
            error: `Action "${action}" non supportée`,
            supportedActions: ['execute', 'batch', 'analyze'],
            timestamp: new Date().toISOString()
          },
          { status: 400 }
        );
    }

  } catch (error: any) {
    console.error('❌ Erreur API NovaIA:', error);
    
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