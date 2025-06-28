import { supabase } from '@/lib/supabase/client'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = supabase

// Types de base
export interface Company {
  id: string
  name: string
  sector: string
  logo_url?: string
  email: string
  phone: string
  address: string
  website?: string
  siret?: string
  tva_number?: string
  rcs?: string
  capital?: number
  legal_form: string
  settings: any
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  company_id: string
  clerk_user_id: string
  email: string
  first_name: string
  last_name: string
  role: 'admin' | 'manager' | 'employee'
  department: string
  permissions: string[]
  created_at: string
  updated_at: string
}

export interface Client {
  id: string
  company_id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  address?: string
  company_name?: string
  position?: string
  source: string
  status: 'lead' | 'prospect' | 'client' | 'inactive'
  notes?: string
  tags: string[]
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  company_id: string
  client_id: string
  type: 'sale' | 'purchase' | 'service' | 'rental'
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'cancelled' | 'refunded'
  description: string
  reference: string
  payment_method?: string
  created_at: string
  updated_at: string
}

// Service de base de données
export class DatabaseService {
  // Entreprises
  async createCompany(companyData: Omit<Company, 'id' | 'created_at' | 'updated_at'>): Promise<Company> {
    const { data, error } = await supabase
      .from('companies')
      .insert([companyData])
      .select()
      .single()
    
    if (error) throw new Error(`Erreur création entreprise: ${error.message}`)
    return data
  }

  async getCompany(id: string): Promise<Company | null> {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) return null
    return data
  }

  async updateCompany(id: string, updates: Partial<Company>): Promise<Company> {
    const { data, error } = await supabase
      .from('companies')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw new Error(`Erreur mise à jour entreprise: ${error.message}`)
    return data
  }

  // Utilisateurs
  async createUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single()
    
    if (error) throw new Error(`Erreur création utilisateur: ${error.message}`)
    return data
  }

  async getUserByClerkId(clerkUserId: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_user_id', clerkUserId)
      .single()
    
    if (error) return null
    return data
  }

  async getCompanyUsers(companyId: string): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('company_id', companyId)
    
    if (error) throw new Error(`Erreur récupération utilisateurs: ${error.message}`)
    return data || []
  }

  // Clients
  async supabase: Promise<Client> {
    const { data, error } = await supabase
      .from('clients')
      .insert([clientData])
      .select()
      .single()
    
    if (error) throw new Error(`Erreur création client: ${error.message}`)
    return data
  }

  async getCompanyClients(companyId: string): Promise<Client[]> {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false })
    
    if (error) throw new Error(`Erreur récupération clients: ${error.message}`)
    return data || []
  }

  async updateClient(id: string, updates: Partial<Client>): Promise<Client> {
    const { data, error } = await supabase
      .from('clients')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw new Error(`Erreur mise à jour client: ${error.message}`)
    return data
  }

  async deleteClient(id: string): Promise<void> {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id)
    
    if (error) throw new Error(`Erreur suppression client: ${error.message}`)
  }

  // Transactions
  async createTransaction(transactionData: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>): Promise<Transaction> {
    const { data, error } = await supabase
      .from('transactions')
      .insert([transactionData])
      .select()
      .single()
    
    if (error) throw new Error(`Erreur création transaction: ${error.message}`)
    return data
  }

  async getCompanyTransactions(companyId: string): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false })
    
    if (error) throw new Error(`Erreur récupération transactions: ${error.message}`)
    return data || []
  }

  async updateTransaction(id: string, updates: Partial<Transaction>): Promise<Transaction> {
    const { data, error } = await supabase
      .from('transactions')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw new Error(`Erreur mise à jour transaction: ${error.message}`)
    return data
  }

  // Statistiques
  async getCompanyStats(companyId: string) {
    const [clients, transactions] = await Promise.all([
      this.getCompanyClients(companyId),
      this.getCompanyTransactions(companyId)
    ])

    const totalRevenue = transactions
      .filter(t => t.status === 'completed')
      .reduce((sum: number, t: any) => sum + t.amount, 0)

    const monthlyRevenue = transactions
      .filter(t => {
        const transactionDate = new Date(t.created_at)
        const currentDate = new Date()
        return t.status === 'completed' && 
               transactionDate.getMonth() === currentDate.getMonth() &&
               transactionDate.getFullYear() === currentDate.getFullYear()
      })
      .reduce((sum: number, t: any) => sum + t.amount, 0)

    return {
      totalClients: clients.length,
      activeClients: clients.filter(c => c.status === 'client').length,
      totalRevenue,
      monthlyRevenue,
      totalTransactions: transactions.length,
      pendingTransactions: transactions.filter(t => t.status === 'pending').length
    }
  }

  // Recherche
  async searchClients(companyId: string, query: string): Promise<Client[]> {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('company_id', companyId)
      .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%,company_name.ilike.%${query}%`)
      .order('created_at', { ascending: false })
    
    if (error) throw new Error(`Erreur recherche clients: ${error.message}`)
    return data || []
  }

  // Filtres
  async getClientsByStatus(companyId: string, status: string): Promise<Client[]> {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('company_id', companyId)
      .eq('status', status)
      .order('created_at', { ascending: false })
    
    if (error) throw new Error(`Erreur filtrage clients: ${error.message}`)
    return data || []
  }

  async getTransactionsByType(companyId: string, type: string): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('company_id', companyId)
      .eq('type', type)
      .order('created_at', { ascending: false })
    
    if (error) throw new Error(`Erreur filtrage transactions: ${error.message}`)
    return data || []
  }
}

export const dbService = new DatabaseService() 