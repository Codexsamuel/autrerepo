import { NextRequest, NextResponse } from 'next/server'


// ========================================
// MIDDLEWARE PRINCIPAL
// ========================================

export async function middleware(request: NextRequest) {
  const startTime = Date.now()
  const response = NextResponse.next()

  try {
    // 1. HEADERS DE SÉCURITÉ - Ajouter les headers de sécurité
    addSecurityHeaders(response)

    // 2. RATE LIMITING - Limiter les requêtes par IP
    const rateLimitResult = await checkRateLimit(request)
    if (rateLimitResult.blocked) {
      return NextResponse.json(
        { error: 'Trop de requêtes, veuillez réessayer plus tard' },
        { status: 429 }
      )
    }

    // 3. VALIDATION DES ENTRÉES - Nettoyer et valider les données
    const sanitizedRequest = await sanitizeRequest(request)
    if (sanitizedRequest.blocked) {
      return NextResponse.json(
        { error: 'Données invalides détectées' },
        { status: 400 }
      )
    }

    // 4. LOGGING - Enregistrer la requête pour audit
    await logRequest(request, response, Date.now() - startTime)

    // 5. SEO - Ajouter les headers SEO si nécessaire
    addSEOHeaders(response, request)

    return response

  } catch (error) {
    console.error('Erreur middleware:', error)
    
    // En cas d'erreur, retourner une réponse sécurisée
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}

// ========================================
// RATE LIMITING
// ========================================

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

async function checkRateLimit(request: NextRequest): Promise<{ blocked: boolean }> {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 100

  const rateLimitData = rateLimitMap.get(ip)
  
  if (!rateLimitData || now > rateLimitData.resetTime) {
    // Nouvelle fenêtre de temps
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + windowMs
    })
    return { blocked: false }
  }

  if (rateLimitData.count >= maxRequests) {
    return { blocked: true }
  }

  rateLimitData.count++
  return { blocked: false }
}

// ========================================
// SANITISATION DES ENTRÉES
// ========================================

async function sanitizeRequest(request: NextRequest): Promise<{ blocked: boolean }> {
  const url = request.url
  const method = request.method

  // Vérifier les paramètres d'URL
  const urlParams = new URL(url).searchParams
  for (const [key, value] of urlParams.entries()) {
    if (containsSuspiciousContent(value)) {
      return { blocked: true }
    }
  }

  // Vérifier le body pour les requêtes POST/PUT
  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    try {
      const body = await request.text()
      if (containsSuspiciousContent(body)) {
        return { blocked: true }
      }
    } catch (error) {
      // Si on ne peut pas lire le body, on continue
    }
  }

  return { blocked: false }
}

function containsSuspiciousContent(content: string): boolean {
  const suspiciousPatterns = [
    /<script[^>]*>.*?<\/script>/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /union.*select/i,
    /drop.*table/i,
    /insert.*into/i,
    /delete.*from/i,
    /update.*set/i,
    /exec\s*\(/i,
    /eval\s*\(/i,
    /\.\.\/|\.\.\\/i,
    /%2e%2e%2f|%2e%2e%5c/i
  ]

  return suspiciousPatterns.some(pattern => pattern.test(content))
}

// ========================================
// HEADERS DE SÉCURITÉ
// ========================================

function addSecurityHeaders(response: NextResponse): NextResponse {
  // Headers de sécurité de base
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  // Headers pour HTTPS
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  
  return response
}

// ========================================
// LOGGING
// ========================================

async function logRequest(request: NextRequest, response: NextResponse, duration: number) {
  const logData = {
    timestamp: new Date().toISOString(),
    method: request.method,
    url: request.url,
    ip: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
    userAgent: request.headers.get('user-agent') || 'unknown',
    status: response.status,
    duration: `${duration}ms`
  }

  // Log en fonction de l'environnement
  if (process.env.NODE_ENV === 'production') {
    console.log(JSON.stringify(logData))
  } else {
    console.log(`[${logData.timestamp}] ${logData.method} ${logData.url} - ${logData.status} (${logData.duration})`)
  }
}

// ========================================
// HEADERS SEO
// ========================================

function addSEOHeaders(response: NextResponse, request: NextRequest) {
  const path = request.nextUrl.pathname

  // Headers pour les moteurs de recherche
  response.headers.set('X-Robots-Tag', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')
  
  // Headers pour les réseaux sociaux
  response.headers.set('X-Content-Type-Options', 'nosniff')
  
  // Headers pour la géolocalisation
  if (path.includes('/fr') || path.includes('/en') || path.includes('/es')) {
    const locale = path.split('/')[1]
    response.headers.set('Content-Language', locale)
  }

  // Headers pour les performances
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
}

// ========================================
// CONFIGURATION DU MIDDLEWARE
// ========================================

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
} 