// Types globaux pour NovaCore CRM
export interface User {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  clerk_id: string
  role: "admin" | "supervisor" | "analyst" | "employee"
  department: string | null
  position: string | null
  created_at: string
  updated_at: string
  last_login: string | null
  is_active: boolean
  preferences: Record<string, any>
}

export interface Client {
  id: string
  first_name: string
  last_name: string
  email: string | null
  phone: string | null
  address: string | null
  city: string | null
  country: string | null
  postal_code: string | null
  company: string | null
  position: string | null
  avatar_url: string | null
  notes: string | null
  tags: string[]
  created_at: string
  updated_at: string
  last_contact: string | null
  status: "active" | "inactive" | "prospect" | "vip"
  ai_score: number | null
  assigned_to: string | null
  preferences: Record<string, any>
  metadata: Record<string, any>
}

export interface Invoice {
  id: string
  invoice_number: string
  client_id: string | null
  amount: number
  tax_amount: number
  total_amount: number
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
  issue_date: string
  due_date: string
  paid_date: string | null
  notes: string | null
  created_at: string
  updated_at: string
  created_by: string | null
  currency: string
  payment_terms: string | null
  metadata: Record<string, any>
}

export interface Product {
  id: string
  name: string
  description: string | null
  sku: string | null
  barcode: string | null
  category_id: string | null
  unit_price: number
  cost_price: number | null
  tax_rate: number
  stock_quantity: number
  min_stock_level: number
  max_stock_level: number | null
  is_active: boolean
  image_url: string | null
  created_at: string
  updated_at: string
  created_by: string | null
  metadata: Record<string, any>
}

export interface SurveillanceEvent {
  id: string
  event_type: string
  severity: "low" | "medium" | "high" | "critical"
  entity_type: string
  entity_id: string | null
  details: Record<string, any>
  detected_at: string
  status: "new" | "investigating" | "resolved" | "false_positive"
  resolved_at: string | null
  resolved_by: string | null
  resolution_notes: string | null
  ai_confidence: number | null
  metadata: Record<string, any>
}

export interface ActivityLog {
  id: string
  user_id: string | null
  action: string
  entity_type: string
  entity_id: string | null
  details: Record<string, any>
  ip_address: string | null
  user_agent: string | null
  created_at: string
  module: string | null
  severity: string
}

export interface AIAlert {
  id: string
  alert_type: string
  severity: "low" | "medium" | "high" | "critical"
  entity_type: string
  entity_id: string | null
  message: string
  details: Record<string, any>
  created_at: string
  expires_at: string | null
  is_active: boolean
  action_taken: string | null
  action_taken_at: string | null
  action_taken_by: string | null
  ai_confidence: number | null
}

export interface Dashboard {
  id: string
  name: string
  description: string | null
  layout: any[]
  is_public: boolean
  created_at: string
  updated_at: string
  created_by: string | null
  is_default: boolean
}

export interface Report {
  id: string
  name: string
  description: string | null
  report_type: string
  parameters: Record<string, any>
  schedule: Record<string, any> | null
  last_generated: string | null
  created_at: string
  updated_at: string
  created_by: string | null
  recipients: string[]
  template_id: string | null
}
