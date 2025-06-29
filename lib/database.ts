import { supabase } from '@/lib/supabase/client'

// Configuration Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Types TypeScript pour la base de données
export interface User {
  id: number
  role: 'client' | 'employee' | 'admin' | 'super_admin'
  email: string
  password: string
  full_name?: string
  phone?: string
  avatar_url?: string
  created_at: string
  last_login?: string
  status: 'active' | 'suspended' | 'deleted'
}

export interface Employee {
  id: number
  user_id: number
  position?: string
  department?: string
  cnps_number?: string
  contract_type?: string
  date_hired?: string
}

export interface Client {
  id: number
  user_id: number
  company_name?: string
  industry?: string
  address?: string
}

export interface AIInteraction {
  id: number
  user_id?: number
  input_text?: string
  response_text?: string
  intent?: string
  timestamp: string
}

export interface TradeHistory {
  id: number
  user_id: number
  asset: string
  entry_price: number
  exit_price: number
  entry_date: string
  exit_date: string
  strategy?: string
  result?: string
  notes?: string
}

export interface MarketAnalysis {
  id: number
  asset: string
  type: string
  analysis: string
  source: string
  confidence: number
  generated_at: string
}

export interface TradingAdvice {
  id: number
  user_id: number
  question: string
  recommended_asset: string
  reasoning: string
  sources: any
  strategy: string
  risk_level: string
  created_at: string
}

export interface NewsFeed {
  id: number
  title: string
  url: string
  source: string
  summary: string
  relevance_score: number
  detected_at: string
}

export interface Document {
  id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: string;
}

export interface Commission {
  id: number;
  employee_id: number;
  client_id: number;
  contract_value: number;
  commission_rate: number;
  status: string;
  date_signed: string;
}

// Fonctions utilitaires pour la base de données

export class DatabaseService {
  // Gestion des utilisateurs
  static async getUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data as User[]
  }

  static async getUserById(id: number) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as User
  }

  static async createUser(userData: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single()
    
    if (error) throw error
    return data as User
  }

  static async updateUser(id: number, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as User
  }

  // Gestion des interactions IA
  static async logAIInteraction(interaction: Partial<AIInteraction>) {
    const { data, error } = await supabase
      .from('ai_interactions')
      .insert([interaction])
      .select()
      .single()
    
    if (error) throw error
    return data as AIInteraction
  }

  static async getAIInteractions(userId?: number, limit = 50) {
    let query = supabase
      .from('ai_interactions')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit)
    
    if (userId) {
      query = query.eq('user_id', userId)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data as AIInteraction[]
  }

  // Gestion de l'historique de trading
  static async getTradeHistory(userId?: number) {
    let query = supabase
      .from('trade_history')
      .select('*')
      .order('entry_date', { ascending: false })
    
    if (userId) {
      query = query.eq('user_id', userId)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data as TradeHistory[]
  }

  static async addTrade(trade: Partial<TradeHistory>) {
    const { data, error } = await supabase
      .from('trade_history')
      .insert([trade])
      .select()
      .single()
    
    if (error) throw error
    return data as TradeHistory
  }

  // Gestion des analyses de marché
  static async getMarketAnalysis(asset?: string) {
    let query = supabase
      .from('market_analysis')
      .select('*')
      .order('generated_at', { ascending: false })
    
    if (asset) {
      query = query.eq('asset', asset)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data as MarketAnalysis[]
  }

  static async addMarketAnalysis(analysis: Partial<MarketAnalysis>) {
    const { data, error } = await supabase
      .from('market_analysis')
      .insert([analysis])
      .select()
      .single()
    
    if (error) throw error
    return data as MarketAnalysis
  }

  // Gestion des conseils de trading
  static async getTradingAdvice(userId?: number) {
    let query = supabase
      .from('trading_advice')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (userId) {
      query = query.eq('user_id', userId)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data as TradingAdvice[]
  }

  static async addTradingAdvice(advice: Partial<TradingAdvice>) {
    const { data, error } = await supabase
      .from('trading_advice')
      .insert([advice])
      .select()
      .single()
    
    if (error) throw error
    return data as TradingAdvice
  }

  // Gestion des actualités
  static async getNewsFeeds(limit = 20) {
    const { data, error } = await supabase
      .from('news_feeds')
      .select('*')
      .order('relevance_score', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data as NewsFeed[]
  }

  static async addNewsFeed(news: Partial<NewsFeed>) {
    const { data, error } = await supabase
      .from('news_feeds')
      .insert([news])
      .select()
      .single()
    
    if (error) throw error
    return data as NewsFeed
  }

  // Statistiques et métriques
  static async getTradingStats(userId?: number) {
    let query = supabase
      .from('trade_history')
      .select('*')
    
    if (userId) {
      query = query.eq('user_id', userId)
    }
    
    const { data, error } = await query
    if (error) throw error
    
    const trades = data as TradeHistory[]
    const totalTrades = trades.length
    const wins = trades.filter(t => t.result === 'win').length
    const losses = trades.filter(t => t.result === 'loss').length
    const totalProfit = trades.reduce((sum: number, trade: any) => 
      sum + (trade.exit_price - trade.entry_price), 0
    )
    
    return {
      totalTrades,
      wins,
      losses,
      winRate: totalTrades > 0 ? (wins / totalTrades) * 100 : 0,
      totalProfit,
      avgProfit: totalTrades > 0 ? totalProfit / totalTrades : 0
    }
  }

  static async getAIStats() {
    const { data, error } = await supabase
      .from('ai_interactions')
      .select('*')
    
    if (error) throw error
    
    const interactions = data as AIInteraction[]
    const totalInteractions = interactions.length
    const uniqueUsers = new Set(interactions.map(i => i.user_id)).size
    const intents = interactions.reduce((acc: Record<string, number>, interaction: any) => {
      if (interaction.intent) {
        acc[interaction.intent] = (acc[interaction.intent] || 0) + 1
      }
      return acc
    }, {} as Record<string, number>)
    
    return {
      totalInteractions,
      uniqueUsers,
      intents,
      recentInteractions: interactions.slice(0, 10)
    }
  }

  // Logs et audit
  static async logAIAction(userId: number, action: string, result: string, metadata?: any) {
    const { data, error } = await supabase
      .from('ai_logs')
      .insert([{
        user_id: userId,
        action,
        resultat: result,
        metadata: metadata || {}
      }])
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async getLoginLogs(userId?: number, limit = 50) {
    let query = supabase
      .from('login_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit)
    
    if (userId) {
      query = query.eq('user_id', userId)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data
  }
}

// Hooks React pour utiliser la base de données
export const useDatabase = () => {
  return {
    supabase,
    DatabaseService
  }
}

// Configuration pour le développement
export const databaseConfig = {
  url: supabaseUrl,
  anonKey: supabaseAnonKey,
  options: {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
}

export { supabase }; 