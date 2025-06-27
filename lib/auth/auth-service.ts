import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

'use server'

// Service d'authentification avec super admin, OTP et protection anti-bot

// Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Super Admin par défaut
export const SUPER_ADMIN = {
  email: 'sobam@daveandlucesolutions.com',
  password: '@DavyFrantz2025',
  role: 'super_admin',
  name: 'Samuel OBAM',
  avatar: '/images/samuel.png'
}

// Types
export interface User {
  id: string
  email: string
  name: string
  role: 'super_admin' | 'admin' | 'user'
  avatar?: string
  twoFactorEnabled: boolean
  isActive: boolean
  createdAt: Date
  lastLogin?: Date
  loginAttempts: number
  lockedUntil?: Date
}

export interface LoginAttempt {
  id: string
  email: string
  ip: string
  userAgent: string
  success: boolean
  timestamp: Date
  otpVerified?: boolean
}

export interface OTPCode {
  id: string
  userId: string
  code: string
  expiresAt: Date
  used: boolean
}

export class AuthService {
  // Vérifier si c'est le super admin
  static isSuperAdmin(email: string): boolean {
    return email.toLowerCase() === SUPER_ADMIN.email.toLowerCase()
  }

  // Authentification du super admin
  static async authenticateSuperAdmin(email: string, password: string): Promise<User | null> {
    if (!this.isSuperAdmin(email)) return null
    
    if (password === SUPER_ADMIN.password) {
      return {
        id: 'super-admin',
        email: SUPER_ADMIN.email,
        name: SUPER_ADMIN.name,
        role: 'super_admin',
        avatar: SUPER_ADMIN.avatar,
        twoFactorEnabled: true,
        isActive: true,
        createdAt: new Date(),
        loginAttempts: 0
      }
    }
    
    return null
  }

  // Authentification utilisateur normal
  static async authenticateUser(email: string, password: string): Promise<User | null> {
    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email.toLowerCase())
        .single()

      if (error || !user) return null

      // Vérifier si le compte est verrouillé
      if (user.locked_until && new Date(user.locked_until) > new Date()) {
        throw new Error('Compte temporairement verrouillé')
      }

      // Vérifier le mot de passe
      const isValidPassword = await bcrypt.compare(password, user.password_hash)
      if (!isValidPassword) {
        await this.recordFailedLogin(email)
        return null
      }

      // Réinitialiser les tentatives de connexion
      await this.resetLoginAttempts(email)

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        twoFactorEnabled: user.two_factor_enabled,
        isActive: user.is_active,
        createdAt: new Date(user.created_at),
        lastLogin: user.last_login ? new Date(user.last_login) : undefined,
        loginAttempts: 0
      }
    } catch (error) {
      console.error('Erreur d\'authentification:', error)
      return null
    }
  }

  // Générer et envoyer OTP
  static async generateOTP(userId: string): Promise<string> {
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    try {
      // Supprimer les anciens codes OTP
      await supabase
        .from('otp_codes')
        .delete()
        .eq('user_id', userId)

      // Insérer le nouveau code
      const { error } = await supabase
        .from('otp_codes')
        .insert({
          id: uuidv4(),
          user_id: userId,
          code: await bcrypt.hash(code, 10),
          expires_at: expiresAt.toISOString(),
          used: false
        })

      if (error) throw error

      // Ici, vous pouvez intégrer l'envoi par email/SMS
      console.log(`OTP pour ${userId}: ${code}`)
      
      return code
    } catch (error) {
      console.error('Erreur génération OTP:', error)
      throw new Error('Impossible de générer l\'OTP')
    }
  }

  // Vérifier OTP
  static async verifyOTP(userId: string, code: string): Promise<boolean> {
    try {
      const { data: otpData, error } = await supabase
        .from('otp_codes')
        .select('*')
        .eq('user_id', userId)
        .eq('used', false)
        .gt('expires_at', new Date().toISOString())
        .single()

      if (error || !otpData) return false

      const isValidCode = await bcrypt.compare(code, otpData.code)
      if (!isValidCode) return false

      // Marquer le code comme utilisé
      await supabase
        .from('otp_codes')
        .update({ used: true })
        .eq('id', otpData.id)

      return true
    } catch (error) {
      console.error('Erreur vérification OTP:', error)
      return false
    }
  }

  // Protection anti-bot
  static async checkBotProtection(ip: string, userAgent: string): Promise<boolean> {
    try {
      // Vérifier les tentatives récentes
      const { data: recentAttempts, error } = await supabase
        .from('login_attempts')
        .select('*')
        .eq('ip', ip)
        .gte('timestamp', new Date(Date.now() - 15 * 60 * 1000).toISOString()) // 15 minutes

      if (error) return true

      const failedAttempts = recentAttempts?.filter(attempt => !attempt.success) || []
      
      // Bloquer si plus de 5 tentatives échouées en 15 minutes
      if (failedAttempts.length >= 5) {
        return false
      }

      // Vérifier les patterns suspects
      const suspiciousPatterns = [
        /bot/i,
        /crawler/i,
        /spider/i,
        /scraper/i,
        /curl/i,
        /wget/i
      ]

      const isSuspicious = suspiciousPatterns.some(pattern => 
        pattern.test(userAgent) || pattern.test(ip)
      )

      return !isSuspicious
    } catch (error) {
      console.error('Erreur protection anti-bot:', error)
      return true
    }
  }

  // Enregistrer tentative de connexion
  static async recordLoginAttempt(
    email: string, 
    ip: string, 
    userAgent: string, 
    success: boolean,
    otpVerified?: boolean
  ): Promise<void> {
    try {
      await supabase
        .from('login_attempts')
        .insert({
          id: uuidv4(),
          email: email.toLowerCase(),
          ip,
          user_agent: userAgent,
          success,
          timestamp: new Date().toISOString(),
          otp_verified: otpVerified || false
        })
    } catch (error) {
      console.error('Erreur enregistrement tentative:', error)
    }
  }

  // Enregistrer échec de connexion
  static async recordFailedLogin(email: string): Promise<void> {
    try {
      const { data: user } = await supabase
        .from('users')
        .select('login_attempts')
        .eq('email', email.toLowerCase())
        .single()

      const newAttempts = (user?.login_attempts || 0) + 1
      const lockedUntil = newAttempts >= 5 ? new Date(Date.now() + 30 * 60 * 1000) : null // 30 minutes

      await supabase
        .from('users')
        .update({
          login_attempts: newAttempts,
          locked_until: lockedUntil?.toISOString()
        })
        .eq('email', email.toLowerCase())
    } catch (error) {
      console.error('Erreur enregistrement échec:', error)
    }
  }

  // Réinitialiser tentatives de connexion
  static async resetLoginAttempts(email: string): Promise<void> {
    try {
      await supabase
        .from('users')
        .update({
          login_attempts: 0,
          locked_until: null,
          last_login: new Date().toISOString()
        })
        .eq('email', email.toLowerCase())
    } catch (error) {
      console.error('Erreur réinitialisation tentatives:', error)
    }
  }

  // Créer un nouvel utilisateur (super admin seulement)
  static async createUser(
    email: string,
    password: string,
    name: string,
    role: 'admin' | 'user' = 'user',
    createdBy: string
  ): Promise<User | null> {
    try {
      const hashedPassword = await bcrypt.hash(password, 12)
      
      const { data: user, error } = await supabase
        .from('users')
        .insert({
          id: uuidv4(),
          email: email.toLowerCase(),
          password_hash: hashedPassword,
          name,
          role,
          created_by: createdBy,
          two_factor_enabled: true,
          is_active: true,
          login_attempts: 0
        })
        .select()
        .single()

      if (error) throw error

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        twoFactorEnabled: user.two_factor_enabled,
        isActive: user.is_active,
        createdAt: new Date(user.created_at),
        loginAttempts: 0
      }
    } catch (error) {
      console.error('Erreur création utilisateur:', error)
      return null
    }
  }

  // Obtenir tous les utilisateurs (super admin seulement)
  static async getAllUsers(): Promise<User[]> {
    try {
      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      return users.map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        twoFactorEnabled: user.two_factor_enabled,
        isActive: user.is_active,
        createdAt: new Date(user.created_at),
        lastLogin: user.last_login ? new Date(user.last_login) : undefined,
        loginAttempts: user.login_attempts
      }))
    } catch (error) {
      console.error('Erreur récupération utilisateurs:', error)
      return []
    }
  }
} 