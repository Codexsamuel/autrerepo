import { supabase } from './database'
import type { User, Employee, Client, AIInteraction, Document, Commission } from './database'


// User management functions
export const userHelpers = {
  // Get user by ID
  async getUserById(id: number): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching user:', error)
      return null
    }
    
    return data
  },

  // Get user by email
  async getUserByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()
    
    if (error) {
      console.error('Error fetching user by email:', error)
      return null
    }
    
    return data
  },

  // Create new user
  async createUser(userData: Omit<User, 'id' | 'created_at'>): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating user:', error)
      return null
    }
    
    return data
  },

  // Update user
  async updateUser(id: number, updates: Partial<User>): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating user:', error)
      return null
    }
    
    return data
  },

  // Update last login
  async updateLastLogin(id: number): Promise<void> {
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', id)
  }
}

// Employee management functions
export const employeeHelpers = {
  // Get employee by user ID
  async getEmployeeByUserId(userId: number): Promise<Employee | null> {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (error) {
      console.error('Error fetching employee:', error)
      return null
    }
    
    return data
  },

  // Create employee
  async createEmployee(employeeData: Omit<Employee, 'id'>): Promise<Employee | null> {
    const { data, error } = await supabase
      .from('employees')
      .insert([employeeData])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating employee:', error)
      return null
    }
    
    return data
  }
}

// Client management functions
export const clientHelpers = {
  // Get client by user ID
  async getClientByUserId(userId: number): Promise<Client | null> {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (error) {
      console.error('Error fetching client:', error)
      return null
    }
    
    return data
  },

  // Create client
  async supabase: Promise<Client | null> {
    const { data, error } = await supabase
      .from('clients')
      .insert([clientData])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating client:', error)
      return null
    }
    
    return data
  }
}

// AI Interaction functions
export const aiInteractionHelpers = {
  // Log AI interaction
  async logInteraction(interactionData: Omit<AIInteraction, 'id' | 'timestamp'>): Promise<AIInteraction | null> {
    const { data, error } = await supabase
      .from('ai_interactions')
      .insert([interactionData])
      .select()
      .single()
    
    if (error) {
      console.error('Error logging AI interaction:', error)
      return null
    }
    
    return data
  },

  // Get AI interactions for user
  async getUserInteractions(userId: number, limit = 50): Promise<AIInteraction[]> {
    const { data, error } = await supabase
      .from('ai_interactions')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(limit)
    
    if (error) {
      console.error('Error fetching AI interactions:', error)
      return []
    }
    
    return data || []
  }
}

// Document management functions
export const documentHelpers = {
  // Get documents for user
  async getUserDocuments(userId: number): Promise<Document[]> {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching documents:', error)
      return []
    }
    
    return data || []
  },

  // Create document
  async createDocument(documentData: Omit<Document, 'id' | 'created_at'>): Promise<Document | null> {
    const { data, error } = await supabase
      .from('documents')
      .insert([documentData])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating document:', error)
      return null
    }
    
    return data
  }
}

// Commission management functions
export const commissionHelpers = {
  // Get commissions for employee
  async getEmployeeCommissions(employeeId: number): Promise<Commission[]> {
    const { data, error } = await supabase
      .from('commissions')
      .select('*')
      .eq('employee_id', employeeId)
      .order('date_signed', { ascending: false })
    
    if (error) {
      console.error('Error fetching commissions:', error)
      return []
    }
    
    return data || []
  },

  // Get commissions for client
  async getClientCommissions(clientId: number): Promise<Commission[]> {
    const { data, error } = await supabase
      .from('commissions')
      .select('*')
      .eq('client_id', clientId)
      .order('date_signed', { ascending: false })
    
    if (error) {
      console.error('Error fetching client commissions:', error)
      return []
    }
    
    return data || []
  },

  // Create commission
  async createCommission(commissionData: Omit<Commission, 'id'>): Promise<Commission | null> {
    const { data, error } = await supabase
      .from('commissions')
      .insert([commissionData])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating commission:', error)
      return null
    }
    
    return data
  }
}

// Authentication helpers
export const authHelpers = {
  // Log login attempt
  async logLogin(userId: number, ipAddress: string, deviceInfo: string): Promise<void> {
    await supabase
      .from('login_logs')
      .insert([{
        user_id: userId,
        ip_address: ipAddress,
        device_info: deviceInfo
      }])
  },

  // Get login history for user
  async getLoginHistory(userId: number, limit = 20): Promise<any[]> {
    const { data, error } = await supabase
      .from('login_logs')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(limit)
    
    if (error) {
      console.error('Error fetching login history:', error)
      return []
    }
    
    return data || []
  }
}

// Dashboard helpers
export const dashboardHelpers = {
  // Get dashboard stats for admin
  async getAdminStats() {
    const [
      { count: totalUsers },
      { count: totalEmployees },
      { count: totalClients },
      { count: totalCommissions },
      { count: pendingCommissions }
    ] = await Promise.all([
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('employees').select('*', { count: 'exact', head: true }),
      supabase.from('clients').select('*', { count: 'exact', head: true }),
      supabase.from('commissions').select('*', { count: 'exact', head: true }),
      supabase.from('commissions').select('*', { count: 'exact', head: true }).eq('status', 'en_attente')
    ])

    return {
      totalUsers: totalUsers || 0,
      totalEmployees: totalEmployees || 0,
      totalClients: totalClients || 0,
      totalCommissions: totalCommissions || 0,
      pendingCommissions: pendingCommissions || 0
    }
  },

  // Get employee dashboard stats
  async getEmployeeStats(employeeId: number) {
    const { data: commissions } = await supabase
      .from('commissions')
      .select('*')
      .eq('employee_id', employeeId)

    const totalValue = commissions?.reduce((sum: number, comm: any) => sum + (comm.contract_value || 0), 0) || 0
    const totalCommission = commissions?.reduce((sum: number, comm: any) => {
      const rate = comm.commission_rate || 25.0
      return sum + ((comm.contract_value || 0) * rate / 100)
    }, 0) || 0

    return {
      totalContracts: commissions?.length || 0,
      totalValue,
      totalCommission,
      pendingCommissions: commissions?.filter(c => c.status === 'en_attente').length || 0
    }
  }
} 