import { NextRequest } from 'next/server'
import winston from 'winston'
import Redis from 'redis'
import { createTransport } from 'nodemailer'
import twilio from 'twilio'
import { createClient } from '@supabase/supabase-js'

'use server'


// Vérification serveur uniquement
if (typeof window !== 'undefined') {
  throw new Error('Ce module ne peut être utilisé que côté serveur')
}

// ========================================
// CONFIGURATION SURVEILLANCE IA
// ========================================

const redis = Redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  password: process.env.REDIS_PASSWORD
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Logger de surveillance
const surveillanceLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/surveillance.log' }),
    new winston.transports.Console()
  ]
})

// Configuration email
const emailTransporter = createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

// Configuration SMS
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

// ========================================
// TYPES ET INTERFACES
// ========================================

interface SecurityEvent {
  id: string
  type: 'threat' | 'anomaly' | 'attack' | 'suspicious' | 'blocked'
  severity: 'low' | 'medium' | 'high' | 'critical'
  source: string
  ip?: string
  userId?: string
  userAgent?: string
  path?: string
  method?: string
  payload?: any
  timestamp: Date
  description: string
  action?: string
  resolved: boolean
}

interface ThreatPattern {
  pattern: RegExp
  type: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
}

interface AnomalyDetection {
  threshold: number
  timeWindow: number
  metric: string
  action: string
}

// ========================================
// PATTERNS DE MENACES
// ========================================

const THREAT_PATTERNS: ThreatPattern[] = [
  // SQL Injection
  {
    pattern: /(\b(union|select|insert|update|delete|drop|create|alter|exec|execute)\b.*\b(from|into|where|table|database)\b)/i,
    type: 'sql_injection',
    severity: 'critical',
    description: 'Tentative d\'injection SQL détectée'
  },
  
  // XSS
  {
    pattern: /<script[^>]*>.*?<\/script>|<.*?on\w+\s*=|javascript:/i,
    type: 'xss',
    severity: 'high',
    description: 'Tentative d\'attaque XSS détectée'
  },
  
  // Path Traversal
  {
    pattern: /\.\.\/|\.\.\\|%2e%2e%2f|%2e%2e%5c/i,
    type: 'path_traversal',
    severity: 'high',
    description: 'Tentative de traversée de répertoire détectée'
  },
  
  // Command Injection
  {
    pattern: /(\b(cmd|command|exec|execute|system|shell|bash|sh|powershell)\b.*[;&|`$()])/i,
    type: 'command_injection',
    severity: 'critical',
    description: 'Tentative d\'injection de commande détectée'
  },
  
  // Brute Force
  {
    pattern: /(login|auth|password|otp).*attempt/i,
    type: 'brute_force',
    severity: 'medium',
    description: 'Tentative de force brute détectée'
  },
  
  // Bot/Scanner
  {
    pattern: /(bot|crawler|spider|scanner|sqlmap|nikto|nmap|burp|zap|w3af)/i,
    type: 'bot_scanner',
    severity: 'medium',
    description: 'Bot ou scanner détecté'
  }
]

// ========================================
// DÉTECTION D'ANOMALIES
// ========================================

const ANOMALY_DETECTORS: AnomalyDetection[] = [
  {
    threshold: 10,
    timeWindow: 60000, // 1 minute
    metric: 'requests_per_minute',
    action: 'rate_limit'
  },
  {
    threshold: 5,
    timeWindow: 300000, // 5 minutes
    metric: 'failed_logins',
    action: 'block_ip'
  },
  {
    threshold: 3,
    timeWindow: 600000, // 10 minutes
    metric: 'otp_attempts',
    action: 'block_user'
  },
  {
    threshold: 20,
    timeWindow: 3600000, // 1 hour
    metric: 'suspicious_patterns',
    action: 'alert_admin'
  }
]

// ========================================
// SYSTÈME DE SURVEILLANCE IA
// ========================================

export class AISurveillanceSystem {
  private static instance: AISurveillanceSystem
  private events: SecurityEvent[] = []
  private metrics: Map<string, number> = new Map()

  static getInstance(): AISurveillanceSystem {
    if (!AISurveillanceSystem.instance) {
      AISurveillanceSystem.instance = new AISurveillanceSystem()
    }
    return AISurveillanceSystem.instance
  }

  // Analyser une requête pour détecter les menaces
  async analyzeRequest(req: NextRequest): Promise<SecurityEvent[]> {
    const events: SecurityEvent[] = []
    const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown'
    const userAgent = req.headers.get('user-agent') || ''
    const path = req.nextUrl.pathname
    const method = req.method
    const url = req.url

    // Vérifier les patterns de menaces
    const body = await req.text()
    const requestData = `${url} ${body} ${userAgent}`

    for (const threat of THREAT_PATTERNS) {
      if (threat.pattern.test(requestData)) {
        const event: SecurityEvent = {
          id: this.generateEventId(),
          type: 'threat',
          severity: threat.severity,
          source: 'pattern_detection',
          ip,
          userAgent,
          path,
          method,
          payload: { pattern: threat.pattern.source, matched: requestData },
          timestamp: new Date(),
          description: threat.description,
          resolved: false
        }

        events.push(event)
        await this.handleSecurityEvent(event)
      }
    }

    // Détecter les anomalies comportementales
    const anomalyEvents = await this.detectAnomalies(ip, path, method)
    events.push(...anomalyEvents)

    // Mettre à jour les métriques
    this.updateMetrics(ip, path, method)

    return events
  }

  // Détecter les anomalies comportementales
  private async detectAnomalies(ip: string, path: string, method: string): Promise<SecurityEvent[]> {
    const events: SecurityEvent[] = []

    for (const detector of ANOMALY_DETECTORS) {
      const metricKey = `${detector.metric}:${ip}`
      const currentValue = this.metrics.get(metricKey) || 0

      if (currentValue >= detector.threshold) {
        const event: SecurityEvent = {
          id: this.generateEventId(),
          type: 'anomaly',
          severity: 'medium',
          source: 'anomaly_detection',
          ip,
          path,
          method,
          payload: { metric: detector.metric, value: currentValue, threshold: detector.threshold },
          timestamp: new Date(),
          description: `Anomalie détectée: ${detector.metric} (${currentValue}/${detector.threshold})`,
          action: detector.action,
          resolved: false
        }

        events.push(event)
        await this.handleSecurityEvent(event)
      }
    }

    return events
  }

  // Gérer un événement de sécurité
  private async handleSecurityEvent(event: SecurityEvent): Promise<void> {
    // Enregistrer l'événement
    await this.logSecurityEvent(event)
    
    // Prendre des actions automatiques selon la sévérité
    switch (event.severity) {
      case 'critical':
        await this.handleCriticalEvent(event)
        break
      case 'high':
        await this.handleHighEvent(event)
        break
      case 'medium':
        await this.handleMediumEvent(event)
        break
      case 'low':
        await this.handleLowEvent(event)
        break
    }

    // Envoyer des alertes
    await this.sendAlerts(event)
  }

  // Gérer les événements critiques
  private async handleCriticalEvent(event: SecurityEvent): Promise<void> {
    // Bloquer immédiatement l'IP
    if (event.ip) {
      await redis.setex(`blocked:${event.ip}`, 86400, JSON.stringify({
        reason: event.description,
        blockedAt: Date.now(),
        severity: 'critical'
      }))
    }

    // Bloquer l'utilisateur si identifié
    if (event.userId) {
      await redis.setex(`blocked_user:${event.userId}`, 86400, JSON.stringify({
        reason: event.description,
        blockedAt: Date.now(),
        severity: 'critical'
      }))
    }

    // Enregistrer dans la base de données
    await this.saveEventToDatabase(event)
  }

  // Gérer les événements élevés
  private async handleHighEvent(event: SecurityEvent): Promise<void> {
    // Ralentir l'IP
    if (event.ip) {
      await redis.setex(`slowdown:${event.ip}`, 3600, 'true')
    }

    // Enregistrer dans la base de données
    await this.saveEventToDatabase(event)
  }

  // Gérer les événements moyens
  private async handleMediumEvent(event: SecurityEvent): Promise<void> {
    // Surveiller l'IP
    if (event.ip) {
      const watchCount = await redis.get(`watch:${event.ip}`) || '0'
      await redis.setex(`watch:${event.ip}`, 3600, (parseInt(watchCount) + 1).toString())
    }

    // Enregistrer dans la base de données
    await this.saveEventToDatabase(event)
  }

  // Gérer les événements faibles
  private async handleLowEvent(event: SecurityEvent): Promise<void> {
    // Juste enregistrer
    await this.saveEventToDatabase(event)
  }

  // Envoyer des alertes
  private async sendAlerts(event: SecurityEvent): Promise<void> {
    const alertMessage = `
🚨 ALERTE SÉCURITÉ DAVY Trading

Type: ${event.type}
Sévérité: ${event.severity}
Source: ${event.source}
IP: ${event.ip || 'N/A'}
Utilisateur: ${event.userId || 'N/A'}
Chemin: ${event.path || 'N/A'}
Description: ${event.description}
Timestamp: ${event.timestamp.toISOString()}

Action: ${event.action || 'Aucune'}
    `.trim()

    // Email d'alerte
    try {
      await emailTransporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.SMTP_USER,
        subject: `🚨 ALERTE SÉCURITÉ - ${event.severity.toUpperCase()} - ${event.type}`,
        html: alertMessage.replace(/\n/g, '<br>')
      })
    } catch (error) {
      surveillanceLogger.error('Erreur envoi alerte email', { error, event })
    }

    // SMS pour les événements critiques
    if (event.severity === 'critical') {
      try {
        await twilioClient.messages.create({
          body: `🚨 ALERTE CRITIQUE DAVY Trading: ${event.type} - ${event.description}`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: process.env.TWILIO_PHONE_NUMBER // Envoyer à l'admin
        })
      } catch (error) {
        surveillanceLogger.error('Erreur envoi alerte SMS', { error, event })
      }
    }

    // Log de surveillance
    surveillanceLogger.warn('Alerte de sécurité envoyée', { event })
  }

  // Enregistrer l'événement
  private async logSecurityEvent(event: SecurityEvent): Promise<void> {
    this.events.push(event)
    
    // Garder seulement les 1000 derniers événements en mémoire
    if (this.events.length > 1000) {
      this.events = this.events.slice(-1000)
    }

    surveillanceLogger.info('Événement de sécurité détecté', { event })
  }

  // Sauvegarder dans la base de données
  private async saveEventToDatabase(event: SecurityEvent): Promise<void> {
    try {
      const { error } = await supabase
        .from('security_events')
        .insert({
          event_id: event.id,
          event_type: event.type,
          severity: event.severity,
          source: event.source,
          ip_address: event.ip,
          user_id: event.userId,
          user_agent: event.userAgent,
          path: event.path,
          method: event.method,
          payload: event.payload,
          description: event.description,
          action: event.action,
          resolved: event.resolved,
          created_at: event.timestamp.toISOString()
        })

      if (error) {
        surveillanceLogger.error('Erreur sauvegarde événement DB', { error, event })
      }
    } catch (error) {
      surveillanceLogger.error('Erreur sauvegarde événement DB', { error, event })
    }
  }

  // Mettre à jour les métriques
  private updateMetrics(ip: string, path: string, method: string): void {
    const now = Date.now()

    // Requêtes par minute
    const rpmKey = `requests_per_minute:${ip}`
    const currentRPM = this.metrics.get(rpmKey) || 0
    this.metrics.set(rpmKey, currentRPM + 1)

    // Nettoyer les anciennes métriques
    setTimeout(() => {
      this.metrics.delete(rpmKey)
    }, 60000)

    // Échecs de connexion
    if (path.includes('/login') && method === 'POST') {
      const failedLoginKey = `failed_logins:${ip}`
      const currentFailed = this.metrics.get(failedLoginKey) || 0
      this.metrics.set(failedLoginKey, currentFailed + 1)
    }

    // Patterns suspects
    const suspiciousKey = `suspicious_patterns:${ip}`
    const currentSuspicious = this.metrics.get(suspiciousKey) || 0
    this.metrics.set(suspiciousKey, currentSuspicious + 1)
  }

  // Générer un ID d'événement unique
  private generateEventId(): string {
    return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Obtenir les statistiques de sécurité
  async getSecurityStats(): Promise<any> {
    const now = Date.now()
    const oneHourAgo = now - 3600000
    const oneDayAgo = now - 86400000

    const recentEvents = this.events.filter(e => e.timestamp.getTime() > oneHourAgo)
    const dailyEvents = this.events.filter(e => e.timestamp.getTime() > oneDayAgo)

    return {
      totalEvents: this.events.length,
      recentEvents: recentEvents.length,
      dailyEvents: dailyEvents.length,
      criticalEvents: dailyEvents.filter(e => e.severity === 'critical').length,
      highEvents: dailyEvents.filter(e => e.severity === 'high').length,
      mediumEvents: dailyEvents.filter(e => e.severity === 'medium').length,
      lowEvents: dailyEvents.filter(e => e.severity === 'low').length,
      blockedIPs: await this.getBlockedIPsCount(),
      blockedUsers: await this.getBlockedUsersCount(),
      activeThreats: recentEvents.filter(e => e.type === 'threat').length,
      anomalies: recentEvents.filter(e => e.type === 'anomaly').length
    }
  }

  // Obtenir le nombre d'IPs bloquées
  private async getBlockedIPsCount(): Promise<number> {
    try {
      const keys = await redis.keys('blocked:*')
      return keys.length
    } catch (error) {
      return 0
    }
  }

  // Obtenir le nombre d'utilisateurs bloqués
  private async getBlockedUsersCount(): Promise<number> {
    try {
      const keys = await redis.keys('blocked_user:*')
      return keys.length
    } catch (error) {
      return 0
    }
  }

  // Obtenir les événements récents
  getRecentEvents(limit: number = 50): SecurityEvent[] {
    return this.events
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit)
  }

  // Résoudre un événement
  async resolveEvent(eventId: string): Promise<void> {
    const event = this.events.find(e => e.id === eventId)
    if (event) {
      event.resolved = true
      await this.saveEventToDatabase(event)
    }
  }
}

// ========================================
// MIDDLEWARE DE SURVEILLANCE
// ========================================

export async function surveillanceMiddleware(req: NextRequest): Promise<void> {
  const surveillance = AISurveillanceSystem.getInstance()
  await surveillance.analyzeRequest(req)
} 