export interface Role {
  id: string
  name: string
  description: string | null
  permissions: Record<string, Record<string, boolean>>
  created_at: string
  updated_at: string
  created_by: string | null
}

export interface Department {
  id: string
  name: string
  description: string | null
  parent_id: string | null
  manager_id: string | null
  created_at: string
  updated_at: string
}

export interface ActivityLog {
  id: string
  user_id: string | null
  action: string
  entity_type: string
  entity_id: string | null
  details: any
  ip_address: string | null
  user_agent: string | null
  created_at: string
  module: string | null
  severity: string
  users?: {
    full_name: string | null
    email: string
  }
}

export interface BusinessRuleCondition {
  field: string
  operator: string
  value: string
  entity_type: string
}

export interface BusinessRuleAction {
  type: string
  target: string
  message: string
  data: Record<string, any>
}

export interface BusinessRule {
  id: string
  name: string
  description: string | null
  condition_json: {
    conditions: BusinessRuleCondition[]
    operator: "AND" | "OR"
  }
  action_json: {
    actions: BusinessRuleAction[]
  }
  is_active: boolean
  created_by: string | null
  created_at: string
  updated_at: string
  priority: number
}

export interface User {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  clerk_id: string
  role: string
  department: string | null
  position: string | null
  created_at: string
  updated_at: string
  last_login: string | null
  is_active: boolean
  preferences: Record<string, any>
}
