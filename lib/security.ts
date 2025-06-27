import { NextRequest, NextResponse } from 'next/server'
import speakeasy from 'speakeasy'
import qrcode from 'qrcode'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import rateLimit from 'express-rate-limit'
import slowDown from 'express-slow-down'
import { sanitize } from 'sanitize-html'
import xss from 'xss'
import { createClient } from '@supabase/supabase-js'
import { createTransport } from 'nodemailer'
import twilio from 'twilio'
import winston from 'winston'
import Redis from 'redis'
import { supabase } from './database'

'use server'


// Vérification serveur uniquement
if (typeof window !== 'undefined') {
  throw new Error('Ce module ne peut être utilisé que côté serveur')
}

// Configuration
const OTP_SECRET = process.env.OTP_SECRET_KEY || 'fallback-secret-key'
const OTP_EXPIRY = parseInt(process.env.OTP_EXPIRY_MINUTES || '10') * 60 * 1000
const MAX_OTP_ATTEMPTS = parseInt(process.env.OTP_MAX_ATTEMPTS || '3')
const JWT_SECRET = process.env.JWT_SECRET || 'jwt-secret-key'

// Redis client pour le cache et les sessions
const redis = Redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  password: process.env.REDIS_PASSWORD
})

// Logger de sécurité
const securityLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/security.log' }),
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
    pass: process.env.SMTP_PASS,
  },
})

// Configuration SMS
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

// ========================================
// OTP SYSTEM
// ========================================

export class OTPService {
  static async generateOTP(userId: string, type: 'login' | 'payment' | 'admin'): Promise<string> {
    const secret = speakeasy.generateSecret({
      name: `DAVY Trading - ${userId}`,
      issuer: 'DAVY Trading Platform'
    })

    const token = speakeasy.totp({
      secret: secret.base32,
      encoding: 'base32',
      step: 30
    })

    // Stocker l'OTP avec expiration
    await redis.setex(`otp:${userId}:${type}`, OTP_EXPIRY / 1000, JSON.stringify({
      token,
      secret: secret.base32,
      attempts: 0,
      createdAt: Date.now()
    }))

    return token
  }

  static async verifyOTP(userId: string, token: string, type: 'login' | 'payment' | 'admin'): Promise<boolean> {
    const otpData = await redis.get(`otp:${userId}:${type}`)
    if (!otpData) return false

    const data = JSON.parse(otpData)
    
    if (data.attempts >= MAX_OTP_ATTEMPTS) {
      await this.blockUser(userId, 'OTP max attempts exceeded')
      return false
    }

    const isValid = speakeasy.totp.verify({
      secret: data.secret,
      encoding: 'base32',
      token,
      window: 2
    })

    if (isValid) {
      await redis.del(`otp:${userId}:${type}`)
      return true
    } else {
      data.attempts++
      await redis.setex(`otp:${userId}:${type}`, OTP_EXPIRY / 1000, JSON.stringify(data))
      return false
    }
  }

  static async sendOTPEmail(email: string, otp: string, type: string): Promise<boolean> {
    try {
      await emailTransporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: `DAVY Trading - Code de sécurité ${type}`,
        html: `
          <h2>Code de sécurité DAVY Trading</h2>
          <p>Votre code de sécurité pour ${type} est : <strong>${otp}</strong></p>
          <p>Ce code expire dans ${OTP_EXPIRY / 60000} minutes.</p>
          <p>Si vous n'avez pas demandé ce code, ignorez cet email.</p>
        `
      })
      return true
    } catch (error) {
      securityLogger.error('Erreur envoi OTP email', { error, email, type })
      return false
    }
  }

  static async sendOTPSMS(phone: string, otp: string, type: string): Promise<boolean> {
    try {
      await twilioClient.messages.create({
        body: `DAVY Trading - Code ${type}: ${otp} (expire dans ${OTP_EXPIRY / 60000}min)`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone
      })
      return true
    } catch (error) {
      securityLogger.error('Erreur envoi OTP SMS', { error, phone, type })
      return false
    }
  }
}

// ========================================
// RATE LIMITING & BRUTE FORCE PROTECTION
// ========================================

export const rateLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: {
    error: 'Trop de requêtes, veuillez réessayer plus tard',
    retryAfter: 900
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.ip || req.headers['x-forwarded-for'] || 'unknown'
  },
  handler: (req, res) => {
    securityLogger.warn('Rate limit exceeded', {
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      path: req.path
    })
    res.status(429).json({
      error: 'Trop de requêtes, veuillez réessayer plus tard',
      retryAfter: 900
    })
  }
})

export const slowDownLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 50, // Allow 50 requests per 15 minutes at full speed
  delayMs: 500 // Add 500ms delay per request after delayAfter
})

// ========================================
// THREAT DETECTION & BLOCKING
// ========================================

export class ThreatDetector {
  static async detectThreat(req: NextRequest): Promise<{ isThreat: boolean; reason?: string }> {
    const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown'
    const userAgent = req.headers.get('user-agent') || ''
    const path = req.nextUrl.pathname
    const method = req.method

    // Vérifier si l'IP est bloquée
    const isBlocked = await redis.get(`blocked:${ip}`)
    if (isBlocked) {
      return { isThreat: true, reason: 'IP bloquée' }
    }

    // Détecter les patterns d'attaque
    const suspiciousPatterns = [
      /union.*select/i,
      /drop.*table/i,
      /insert.*into/i,
      /<script.*>/i,
      /javascript:/i,
      /onload=/i,
      /onerror=/i
    ]

    const body = await req.text()
    const url = req.url

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(body) || pattern.test(url)) {
        await this.blockIP(ip, 'Pattern d\'attaque détecté')
        return { isThreat: true, reason: 'Pattern d\'attaque détecté' }
      }
    }

    // Détecter les User-Agents suspects
    const suspiciousUserAgents = [
      /sqlmap/i,
      /nikto/i,
      /nmap/i,
      /burp/i,
      /zap/i,
      /w3af/i
    ]

    for (const pattern of suspiciousUserAgents) {
      if (pattern.test(userAgent)) {
        await this.blockIP(ip, 'User-Agent suspect')
        return { isThreat: true, reason: 'User-Agent suspect' }
      }
    }

    return { isThreat: false }
  }

  static async blockIP(ip: string, reason: string): Promise<void> {
    await redis.setex(`blocked:${ip}`, 3600, JSON.stringify({
      reason,
      blockedAt: Date.now(),
      expiresAt: Date.now() + 3600000
    }))

    securityLogger.warn('IP bloquée', { ip, reason })
    
    // Envoyer alerte
    await this.sendSecurityAlert('IP bloquée', {
      ip,
      reason,
      timestamp: new Date().toISOString()
    })
  }

  static async blockUser(userId: string, reason: string): Promise<void> {
    await redis.setex(`blocked_user:${userId}`, 3600, JSON.stringify({
      reason,
      blockedAt: Date.now(),
      expiresAt: Date.now() + 3600000
    }))

    securityLogger.warn('Utilisateur bloqué', { userId, reason })
    
    await this.sendSecurityAlert('Utilisateur bloqué', {
      userId,
      reason,
      timestamp: new Date().toISOString()
    })
  }

  static async sendSecurityAlert(title: string, data: any): Promise<void> {
    try {
      // Email d'alerte
      await emailTransporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.SMTP_USER,
        subject: `🚨 ALERTE SÉCURITÉ DAVY Trading - ${title}`,
        html: `
          <h2>🚨 Alerte de sécurité</h2>
          <h3>${title}</h3>
          <pre>${JSON.stringify(data, null, 2)}</pre>
          <p>Timestamp: ${new Date().toISOString()}</p>
        `
      })

      // Log de sécurité
      securityLogger.error('Alerte de sécurité', { title, data })
    } catch (error) {
      securityLogger.error('Erreur envoi alerte sécurité', { error, title, data })
    }
  }
}

// ========================================
// INPUT SANITIZATION & VALIDATION
// ========================================

export class InputSanitizer {
  static sanitizeHTML(input: string): string {
    return sanitize(input, {
      allowedTags: [],
      allowedAttributes: {}
    })
  }

  static sanitizeXSS(input: string): string {
    return xss(input, {
      whiteList: {},
      stripIgnoreTag: true,
      stripIgnoreTagBody: ['script']
    })
  }

  static sanitizeSQL(input: string): string {
    // Utiliser une bibliothèque comme sqlstring pour échapper les caractères
    return input.replace(/['";\\]/g, '')
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  static validatePhone(phone: string): boolean {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/
    return phoneRegex.test(phone)
  }

  static sanitizeInput(input: any): any {
    if (typeof input === 'string') {
      return this.sanitizeHTML(this.sanitizeXSS(input))
    }
    if (typeof input === 'object') {
      const sanitized: any = {}
      for (const [key, value] of Object.entries(input)) {
        sanitized[key] = this.sanitizeInput(value)
      }
      return sanitized
    }
    return input
  }
}

// ========================================
// JWT TOKEN MANAGEMENT
// ========================================

export class TokenService {
  static generateToken(payload: any, expiresIn: string = '24h'): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn })
  }

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, JWT_SECRET)
    } catch (error) {
      securityLogger.error('Erreur vérification token', { error })
      return null
    }
  }

  static async blacklistToken(token: string): Promise<void> {
    await redis.setex(`blacklist:${token}`, 86400, 'true') // 24h
  }

  static async isTokenBlacklisted(token: string): Promise<boolean> {
    const blacklisted = await redis.get(`blacklist:${token}`)
    return !!blacklisted
  }
}

// ========================================
// SECURITY MIDDLEWARE
// ========================================

export async function securityMiddleware(req: NextRequest): Promise<NextResponse | null> {
  // Vérifier les menaces
  const threat = await ThreatDetector.detectThreat(req)
  if (threat.isThreat) {
    securityLogger.warn('Menace détectée et bloquée', {
      ip: req.ip,
      path: req.nextUrl.pathname,
      reason: threat.reason
    })
    return NextResponse.json(
      { error: 'Accès refusé' },
      { status: 403 }
    )
  }

  // Vérifier les tokens blacklistés
  const authHeader = req.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7)
    const isBlacklisted = await TokenService.isTokenBlacklisted(token)
    if (isBlacklisted) {
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401 }
      )
    }
  }

  return null
}

// ========================================
// SECURITY HEADERS
// ========================================

export function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.stripe.com https://supabase.co;")
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  
  return response
}

// ========================================
// EXPORT
// ========================================

export {
  securityLogger,
  redis,
  emailTransporter,
  twilioClient
} 