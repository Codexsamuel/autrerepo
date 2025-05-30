"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { Role, Department, BusinessRule } from "@/lib/types/governance"
import { cookies } from "next/headers"

// Roles
export async function createRole(roleData: Partial<Role>) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { data, error } = await supabase.from("roles").insert(roleData).select().single()

  if (error) throw new Error(error.message)

  revalidatePath("/novacore/governance")
  return data
}

export async function updateRole(id: string, roleData: Partial<Role>) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { data, error } = await supabase.from("roles").update(roleData).eq("id", id).select().single()

  if (error) throw new Error(error.message)

  revalidatePath("/novacore/governance")
  return data
}

export async function deleteRole(id: string) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { error } = await supabase.from("roles").delete().eq("id", id)

  if (error) throw new Error(error.message)

  revalidatePath("/novacore/governance")
  return true
}

// Departments
export async function createDepartment(departmentData: Partial<Department>) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { data, error } = await supabase.from("departments").insert(departmentData).select().single()

  if (error) throw new Error(error.message)

  revalidatePath("/novacore/governance")
  return data
}

export async function updateDepartment(id: string, departmentData: Partial<Department>) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { data, error } = await supabase.from("departments").update(departmentData).eq("id", id).select().single()

  if (error) throw new Error(error.message)

  revalidatePath("/novacore/governance")
  return data
}

export async function deleteDepartment(id: string) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { error } = await supabase.from("departments").delete().eq("id", id)

  if (error) throw new Error(error.message)

  revalidatePath("/novacore/governance")
  return true
}

// Business Rules
export async function createBusinessRule(ruleData: Partial<BusinessRule>) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { data, error } = await supabase.from("business_rules").insert(ruleData).select().single()

  if (error) throw new Error(error.message)

  revalidatePath("/novacore/governance")
  return data
}

export async function updateBusinessRule(id: string, ruleData: Partial<BusinessRule>) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { data, error } = await supabase.from("business_rules").update(ruleData).eq("id", id).select().single()

  if (error) throw new Error(error.message)

  revalidatePath("/novacore/governance")
  return data
}

export async function deleteBusinessRule(id: string) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { error } = await supabase.from("business_rules").delete().eq("id", id)

  if (error) throw new Error(error.message)

  revalidatePath("/novacore/governance")
  return true
}

// Permissions
export async function updatePermissions(roleId: string, permissions: Record<string, Record<string, boolean>>) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { data, error } = await supabase.from("roles").update({ permissions }).eq("id", roleId).select().single()

  if (error) throw new Error(error.message)

  revalidatePath("/novacore/governance")
  return data
}

// Activity Logs
export async function getActivityLogs(filters: {
  user_id?: string
  entity_type?: string
  action?: string
  from_date?: string
  to_date?: string
  module?: string
  limit?: number
  offset?: number
}) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  let query = supabase
    .from("activity_logs")
    .select("*, users(full_name, email)")
    .order("created_at", { ascending: false })

  if (filters.user_id) {
    query = query.eq("user_id", filters.user_id)
  }

  if (filters.entity_type) {
    query = query.eq("entity_type", filters.entity_type)
  }

  if (filters.action) {
    query = query.eq("action", filters.action)
  }

  if (filters.module) {
    query = query.eq("module", filters.module)
  }

  if (filters.from_date) {
    query = query.gte("created_at", filters.from_date)
  }

  if (filters.to_date) {
    query = query.lte("created_at", filters.to_date)
  }

  if (filters.limit) {
    query = query.limit(filters.limit)
  }

  if (filters.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
  }

  const { data, error, count } = await query

  if (error) throw new Error(error.message)

  return { data, count }
}
