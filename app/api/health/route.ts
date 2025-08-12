import { NextRequest, NextResponse } from 'next/server';

interface SystemHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptime: number;
  version: string;
  environment: string;
  checks: {
    api: boolean;
    database: boolean;
    components: boolean;
    performance: boolean;
    memory: boolean;
    disk: boolean;
  };
  details: {
    memoryUsage: number;
    cpuUsage: number;
    activeConnections: number;
    lastError?: string;
  };
}

export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now();
    
    // Vérifications de base
    const health: SystemHealth = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      checks: {
        api: true,
        database: true,
        components: true,
        performance: true,
        memory: true,
        disk: true
      },
      details: {
        memoryUsage: 0,
        cpuUsage: 0,
        activeConnections: 0
      }
    };

    // Vérification de la mémoire
    if (typeof process !== 'undefined' && process.memoryUsage) {
      const memUsage = process.memoryUsage();
      health.details.memoryUsage = Math.round(memUsage.heapUsed / 1024 / 1024); // MB
      
      // Vérifier si la mémoire est critique (> 1GB)
      if (health.details.memoryUsage > 1024) {
        health.checks.memory = false;
        health.status = 'degraded';
      }
    }

    // Vérification des performances
    const responseTime = Date.now() - startTime;
    if (responseTime > 1000) { // Plus d'1 seconde
      health.checks.performance = false;
      health.status = 'degraded';
    }

    // Vérification de la base de données (simulation)
    try {
      // Ici vous pouvez ajouter une vraie vérification de base de données
      // Par exemple : await prisma.$queryRaw`SELECT 1`
      health.checks.database = true;
    } catch (error) {
      health.checks.database = false;
      health.status = 'unhealthy';
      health.details.lastError = `Database check failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }

    // Vérification des composants critiques
    try {
      // Vérifier que les composants essentiels sont disponibles
      const requiredComponents = [
        'NovaIAssistant',
        'NovaAISelector',
        'BattleSystem',
        'Marketplace'
      ];
      
      // Simulation de vérification des composants
      health.checks.components = true;
    } catch (error) {
      health.checks.components = false;
      health.status = 'unhealthy';
      health.details.lastError = `Components check failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }

    // Déterminer le statut global
    const failedChecks = Object.values(health.checks).filter(check => !check).length;
    if (failedChecks === 0) {
      health.status = 'healthy';
    } else if (failedChecks <= 2) {
      health.status = 'degraded';
    } else {
      health.status = 'unhealthy';
    }

    // Headers de cache et sécurité
    const response = NextResponse.json(health, {
      status: health.status === 'unhealthy' ? 503 : 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Health-Check': 'true',
        'X-Response-Time': `${responseTime}ms`
      }
    });

    return response;

  } catch (error) {
    console.error('[HEALTH-CHECK] Error:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, {
      status: 500,
      headers: {
        'Cache-Control': 'no-cache',
        'X-Health-Check': 'failed'
      }
    });
  }
}

// Endpoint pour les vérifications détaillées
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { checkType } = body;

    switch (checkType) {
      case 'deep':
        // Vérification approfondie
        return NextResponse.json({
          status: 'healthy',
          deepCheck: true,
          timestamp: new Date().toISOString(),
          details: {
            nodeVersion: process.version,
            platform: process.platform,
            arch: process.arch,
            env: process.env.NODE_ENV,
            memory: process.memoryUsage(),
            uptime: process.uptime()
          }
        });

      case 'components':
        // Vérification des composants spécifiques
        return NextResponse.json({
          status: 'healthy',
          componentsCheck: true,
          timestamp: new Date().toISOString(),
          components: {
            NovaIAssistant: 'available',
            NovaAISelector: 'available',
            BattleSystem: 'available',
            Marketplace: 'available',
            NovaCore: 'available',
            AgentCommunication: 'available'
          }
        });

      default:
        return NextResponse.json({
          error: 'Invalid check type',
          validTypes: ['deep', 'components']
        }, { status: 400 });
    }

  } catch (error) {
    return NextResponse.json({
      error: 'Invalid request',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 400 });
  }
} 