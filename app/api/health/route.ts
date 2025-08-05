import { NextResponse } from 'next/server';

interface HealthCheckResult {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: string;
  version: string;
  environment: string;
  apis: {
    healthy: number;
    total: number;
    percentage: number;
    details: Record<string, { status: 'healthy' | 'unhealthy'; responseTime: number; error?: string }>;
  };
  features: {
    pricing: boolean;
    translation: boolean;
    ecommerce: boolean;
    simulation: boolean;
  };
  system: {
    memory: {
      used: number;
      total: number;
      percentage: number;
    };
    uptime: number;
  };
}

// Fonction pour tester une API
async function testAPI(endpoint: string, timeout: number = 5000): Promise<{ status: 'healthy' | 'unhealthy'; responseTime: number; error?: string }> {
  const startTime = Date.now();
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    const response = await fetch(`http://localhost:3000${endpoint}`, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'DL-Style-Health-Check/1.0'
      }
    });
    
    clearTimeout(timeoutId);
    const responseTime = Date.now() - startTime;
    
    if (response.ok) {
      return { status: 'healthy', responseTime };
    } else {
      return { status: 'unhealthy', responseTime, error: `HTTP ${response.status}` };
    }
  } catch (error) {
    const responseTime = Date.now() - startTime;
    return { 
      status: 'unhealthy', 
      responseTime, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

// Fonction pour obtenir les informations système
function getSystemInfo() {
  const memUsage = process.memoryUsage();
  const totalMemory = memUsage.heapTotal;
  const usedMemory = memUsage.heapUsed;
  const memoryPercentage = Math.round((usedMemory / totalMemory) * 100);
  
  return {
    memory: {
      used: Math.round(usedMemory / 1024 / 1024), // MB
      total: Math.round(totalMemory / 1024 / 1024), // MB
      percentage: memoryPercentage
    },
    uptime: Math.round(process.uptime()) // secondes
  };
}

// Route principale
export async function GET() {
  const startTime = Date.now();
  
  try {
    // Liste des APIs critiques à tester
    const criticalAPIs = [
      { name: 'pricing-stats', endpoint: '/api/pricing?action=stats' },
      { name: 'translate-stats', endpoint: '/api/translate?action=stats' },
      { name: 'amazon-categories', endpoint: '/api/amazon/products?action=categories' },
      { name: 'taobao-categories', endpoint: '/api/taobao/products?action=categories' },
      { name: 'ebay-categories', endpoint: '/api/ebay/products?action=categories' },
      { name: 'aliexpress-categories', endpoint: '/api/aliexpress/products?action=categories' },
      { name: 'chinese-stores-stats', endpoint: '/api/scraping/chinese-stores?action=stats' },
      { name: 'pricing-calculate', endpoint: '/api/pricing?price=20&currency=USD&targetCurrency=EUR&source=shein' },
      { name: 'translate-text', endpoint: '/api/translate?text=Hello&from=en&to=fr' }
    ];

    // Tester toutes les APIs en parallèle
    const apiTests = await Promise.all(
      criticalAPIs.map(async (api) => {
        const result = await testAPI(api.endpoint);
        return { name: api.name, ...result };
      })
    );

    // Analyser les résultats
    const healthyAPIs = apiTests.filter(test => test.status === 'healthy');
    const totalAPIs = apiTests.length;
    const healthyCount = healthyAPIs.length;
    const percentage = Math.round((healthyCount / totalAPIs) * 100);

    // Déterminer le statut global
    let globalStatus: 'healthy' | 'unhealthy' | 'degraded';
    if (percentage >= 90) {
      globalStatus = 'healthy';
    } else if (percentage >= 70) {
      globalStatus = 'degraded';
    } else {
      globalStatus = 'unhealthy';
    }

    // Vérifier les fonctionnalités spécifiques
    const features = {
      pricing: apiTests.some(test => test.name === 'pricing-stats' && test.status === 'healthy'),
      translation: apiTests.some(test => test.name === 'translate-stats' && test.status === 'healthy'),
      ecommerce: apiTests.filter(test => 
        ['amazon-categories', 'taobao-categories', 'ebay-categories', 'aliexpress-categories', 'chinese-stores-stats'].includes(test.name) && 
        test.status === 'healthy'
      ).length >= 3, // Au moins 3 APIs e-commerce fonctionnelles
      simulation: apiTests.some(test => test.name === 'pricing-calculate' && test.status === 'healthy')
    };

    // Informations système
    const systemInfo = getSystemInfo();

    // Construire la réponse
    const healthCheck: HealthCheckResult = {
      status: globalStatus,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      apis: {
        healthy: healthyCount,
        total: totalAPIs,
        percentage,
        details: Object.fromEntries(
          apiTests.map(test => [
            test.name, 
            { 
              status: test.status, 
              responseTime: test.responseTime,
              ...(test.error && { error: test.error })
            }
          ])
        )
      },
      features,
      system: systemInfo
    };

    // Headers de cache pour éviter de surcharger
    const headers = {
      'Cache-Control': 'public, max-age=60', // Cache 1 minute
      'Content-Type': 'application/json',
      'X-Health-Check': 'DL-Style',
      'X-Response-Time': `${Date.now() - startTime}ms`
    };

    return NextResponse.json(healthCheck, { 
      status: globalStatus === 'healthy' ? 200 : globalStatus === 'degraded' ? 200 : 503,
      headers
    });

  } catch (error) {
    const errorResponse = {
      status: 'unhealthy' as const,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      error: error instanceof Error ? error.message : 'Unknown error',
      apis: {
        healthy: 0,
        total: 0,
        percentage: 0,
        details: {}
      },
      features: {
        pricing: false,
        translation: false,
        ecommerce: false,
        simulation: false
      },
      system: getSystemInfo()
    };

    return NextResponse.json(errorResponse, { 
      status: 503,
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'X-Health-Check': 'DL-Style-Error'
      }
    });
  }
}

// Route pour un health check simple (pour les load balancers)
export async function HEAD() {
  try {
    // Test rapide d'une API critique
    const result = await testAPI('/api/pricing?action=stats', 3000);
    
    if (result.status === 'healthy') {
      return new NextResponse(null, { 
        status: 200,
        headers: {
          'X-Health-Check': 'DL-Style-OK',
          'X-Response-Time': `${result.responseTime}ms`
        }
      });
    } else {
      return new NextResponse(null, { 
        status: 503,
        headers: {
          'X-Health-Check': 'DL-Style-Error',
          'X-Error': result.error || 'Unknown'
        }
      });
    }
  } catch (error) {
    return new NextResponse(null, { 
      status: 503,
      headers: {
        'X-Health-Check': 'DL-Style-Error',
        'X-Error': error instanceof Error ? error.message : 'Unknown error'
      }
    });
  }
} 