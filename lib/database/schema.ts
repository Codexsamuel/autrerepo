import { supabase } from '@/lib/supabase/client'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Types pour les entreprises
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
  created_at: string
  updated_at: string
  settings: CompanySettings
}

export interface CompanySettings {
  theme: {
    primary_color: string
    secondary_color: string
    logo_url?: string
  }
  modules: string[]
  features: Record<string, boolean>
}

// Types pour les utilisateurs
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

// Types pour les clients
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

// Types pour les transactions/opérations
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

// Types spécifiques par secteur
export interface HotelRoom {
  id: string
  company_id: string
  number: string
  type: string
  capacity: number
  price_per_night: number
  status: 'available' | 'occupied' | 'maintenance' | 'reserved'
  amenities: string[]
  floor: number
  created_at: string
}

export interface HotelReservation {
  id: string
  company_id: string
  room_id: string
  client_id: string
  check_in: string
  check_out: string
  guests: number
  total_amount: number
  status: 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled'
  special_requests?: string
  created_at: string
}

export interface RealEstateProperty {
  id: string
  company_id: string
  title: string
  type: 'apartment' | 'house' | 'office' | 'land' | 'parking'
  address: string
  city: string
  postal_code: string
  country: string
  surface_area: number
  rooms: number
  bedrooms: number
  bathrooms: number
  price: number
  rent_price?: number
  status: 'available' | 'sold' | 'rented' | 'maintenance'
  features: string[]
  images: string[]
  created_at: string
  updated_at: string
}

export interface BankAccount {
  id: string
  company_id: string
  client_id: string
  account_number: string
  account_type: 'checking' | 'savings' | 'business' | 'investment'
  balance: number
  currency: string
  status: 'active' | 'suspended' | 'closed'
  interest_rate?: number
  created_at: string
  updated_at: string
}

export interface InsurancePolicy {
  id: string
  company_id: string
  client_id: string
  policy_number: string
  type: 'life' | 'health' | 'auto' | 'home' | 'business'
  premium: number
  coverage_amount: number
  start_date: string
  end_date: string
  status: 'active' | 'expired' | 'cancelled'
  terms: Record<string, any>
  created_at: string
  updated_at: string
}

// Fonctions de base de données
export const databaseService = {
  // Entreprises
  async createCompany(company: Omit<Company, 'id' | 'created_at' | 'updated_at'>): Promise<Company> {
    const { data, error } = await supabase
      .from('companies')
      .insert([company])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getCompany(id: string): Promise<Company | null> {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) return null
    return data
  },

  async updateCompany(id: string, updates: Partial<Company>): Promise<Company> {
    const { data, error } = await supabase
      .from('companies')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Utilisateurs
  async createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .insert([user])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getUserByClerkId(clerkUserId: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_user_id', clerkUserId)
      .single()
    
    if (error) return null
    return data
  },

  async getCompanyUsers(companyId: string): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('company_id', companyId)
    
    if (error) throw error
    return data || []
  },

  // Clients
  async createClient(client: Omit<Client, 'id' | 'created_at' | 'updated_at'>): Promise<Client> {
    const { data, error } = await supabase
      .from('clients')
      .insert([client])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getCompanyClients(companyId: string): Promise<Client[]> {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async updateClient(id: string, updates: Partial<Client>): Promise<Client> {
    const { data, error } = await supabase
      .from('clients')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Transactions
  async createTransaction(transaction: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>): Promise<Transaction> {
    const { data, error } = await supabase
      .from('transactions')
      .insert([transaction])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getCompanyTransactions(companyId: string): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Hôtellerie
  async createHotelRoom(room: Omit<HotelRoom, 'id' | 'created_at'>): Promise<HotelRoom> {
    const { data, error } = await supabase
      .from('hotel_rooms')
      .insert([room])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getHotelRooms(companyId: string): Promise<HotelRoom[]> {
    const { data, error } = await supabase
      .from('hotel_rooms')
      .select('*')
      .eq('company_id', companyId)
    
    if (error) throw error
    return data || []
  },

  async createHotelReservation(reservation: Omit<HotelReservation, 'id' | 'created_at'>): Promise<HotelReservation> {
    const { data, error } = await supabase
      .from('hotel_reservations')
      .insert([reservation])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Immobilier
  async createProperty(property: Omit<RealEstateProperty, 'id' | 'created_at' | 'updated_at'>): Promise<RealEstateProperty> {
    const { data, error } = await supabase
      .from('real_estate_properties')
      .insert([property])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getCompanyProperties(companyId: string): Promise<RealEstateProperty[]> {
    const { data, error } = await supabase
      .from('real_estate_properties')
      .select('*')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  // Banque
  async createBankAccount(account: Omit<BankAccount, 'id' | 'created_at' | 'updated_at'>): Promise<BankAccount> {
    const { data, error } = await supabase
      .from('bank_accounts')
      .insert([account])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getClientBankAccounts(clientId: string): Promise<BankAccount[]> {
    const { data, error } = await supabase
      .from('bank_accounts')
      .select('*')
      .eq('client_id', clientId)
    
    if (error) throw error
    return data || []
  },

  // Assurance
  async createInsurancePolicy(policy: Omit<InsurancePolicy, 'id' | 'created_at' | 'updated_at'>): Promise<InsurancePolicy> {
    const { data, error } = await supabase
      .from('insurance_policies')
      .insert([policy])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getClientInsurancePolicies(clientId: string): Promise<InsurancePolicy[]> {
    const { data, error } = await supabase
      .from('insurance_policies')
      .select('*')
      .eq('client_id', clientId)
    
    if (error) throw error
    return data || []
  }
}

// Script de création des tables (à exécuter une fois)
export const createTables = async () => {
  const tables = [
    // Table des entreprises
    `CREATE TABLE IF NOT EXISTS companies (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      sector VARCHAR(100) NOT NULL,
      logo_url TEXT,
      email VARCHAR(255) NOT NULL UNIQUE,
      phone VARCHAR(50),
      address TEXT,
      website VARCHAR(255),
      siret VARCHAR(50),
      tva_number VARCHAR(50),
      rcs VARCHAR(100),
      capital DECIMAL(15,2),
      legal_form VARCHAR(100),
      settings JSONB DEFAULT '{}',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`,

    // Table des utilisateurs
    `CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
      clerk_user_id VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      role VARCHAR(50) NOT NULL DEFAULT 'employee',
      department VARCHAR(100),
      permissions TEXT[] DEFAULT '{}',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`,

    // Table des clients
    `CREATE TABLE IF NOT EXISTS clients (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      email VARCHAR(255),
      phone VARCHAR(50),
      address TEXT,
      company_name VARCHAR(255),
      position VARCHAR(100),
      source VARCHAR(100),
      status VARCHAR(50) DEFAULT 'lead',
      notes TEXT,
      tags TEXT[] DEFAULT '{}',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`,

    // Table des transactions
    `CREATE TABLE IF NOT EXISTS transactions (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
      client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
      type VARCHAR(50) NOT NULL,
      amount DECIMAL(15,2) NOT NULL,
      currency VARCHAR(10) DEFAULT 'EUR',
      status VARCHAR(50) DEFAULT 'pending',
      description TEXT,
      reference VARCHAR(100),
      payment_method VARCHAR(100),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`,

    // Table des chambres d'hôtel
    `CREATE TABLE IF NOT EXISTS hotel_rooms (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
      number VARCHAR(20) NOT NULL,
      type VARCHAR(100) NOT NULL,
      capacity INTEGER NOT NULL,
      price_per_night DECIMAL(10,2) NOT NULL,
      status VARCHAR(50) DEFAULT 'available',
      amenities TEXT[] DEFAULT '{}',
      floor INTEGER,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`,

    // Table des réservations hôtel
    `CREATE TABLE IF NOT EXISTS hotel_reservations (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
      room_id UUID REFERENCES hotel_rooms(id) ON DELETE CASCADE,
      client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
      check_in TIMESTAMP WITH TIME ZONE NOT NULL,
      check_out TIMESTAMP WITH TIME ZONE NOT NULL,
      guests INTEGER NOT NULL,
      total_amount DECIMAL(10,2) NOT NULL,
      status VARCHAR(50) DEFAULT 'confirmed',
      special_requests TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`,

    // Table des biens immobiliers
    `CREATE TABLE IF NOT EXISTS real_estate_properties (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
      title VARCHAR(255) NOT NULL,
      type VARCHAR(50) NOT NULL,
      address TEXT NOT NULL,
      city VARCHAR(100) NOT NULL,
      postal_code VARCHAR(20) NOT NULL,
      country VARCHAR(100) DEFAULT 'France',
      surface_area DECIMAL(10,2),
      rooms INTEGER,
      bedrooms INTEGER,
      bathrooms INTEGER,
      price DECIMAL(15,2) NOT NULL,
      rent_price DECIMAL(10,2),
      status VARCHAR(50) DEFAULT 'available',
      features TEXT[] DEFAULT '{}',
      images TEXT[] DEFAULT '{}',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`,

    // Table des comptes bancaires
    `CREATE TABLE IF NOT EXISTS bank_accounts (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
      client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
      account_number VARCHAR(50) NOT NULL,
      account_type VARCHAR(50) NOT NULL,
      balance DECIMAL(15,2) DEFAULT 0,
      currency VARCHAR(10) DEFAULT 'EUR',
      status VARCHAR(50) DEFAULT 'active',
      interest_rate DECIMAL(5,4),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`,

    // Table des polices d'assurance
    `CREATE TABLE IF NOT EXISTS insurance_policies (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
      client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
      policy_number VARCHAR(100) NOT NULL,
      type VARCHAR(50) NOT NULL,
      premium DECIMAL(10,2) NOT NULL,
      coverage_amount DECIMAL(15,2) NOT NULL,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      status VARCHAR(50) DEFAULT 'active',
      terms JSONB DEFAULT '{}',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )`
  ]

  for (const table of tables) {
    const { error } = await supabase.rpc('exec_sql', { sql: table })
    if (error) {
      console.error('Error creating table:', error)
    }
  }
} 