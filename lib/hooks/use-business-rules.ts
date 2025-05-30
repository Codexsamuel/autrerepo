"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export interface BusinessRule {
  id: string
  name: string
  description: string
  condition_json: any
  action_json: any
  is_active: boolean
  created_by: string
  created_at: string
  updated_at: string
  priority: number
}

export function useBusinessRules() {
  const [rules, setRules] = useState<BusinessRule[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClientComponentClient()

  const fetchRules = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from("business_rules").select("*").order("priority", { ascending: false })

      if (error) throw error
      setRules(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors du chargement des règles")
    } finally {
      setLoading(false)
    }
  }

  const createRule = async (rule: Omit<BusinessRule, "id" | "created_at" | "updated_at">) => {
    try {
      const { data, error } = await supabase.from("business_rules").insert([rule]).select().single()

      if (error) throw error
      setRules((prev) => [...prev, data])
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la création de la règle")
      throw err
    }
  }

  const updateRule = async (id: string, updates: Partial<BusinessRule>) => {
    try {
      const { data, error } = await supabase.from("business_rules").update(updates).eq("id", id).select().single()

      if (error) throw error
      setRules((prev) => prev.map((rule) => (rule.id === id ? data : rule)))
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la mise à jour de la règle")
      throw err
    }
  }

  const deleteRule = async (id: string) => {
    try {
      const { error } = await supabase.from("business_rules").delete().eq("id", id)

      if (error) throw error
      setRules((prev) => prev.filter((rule) => rule.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la suppression de la règle")
      throw err
    }
  }

  useEffect(() => {
    fetchRules()
  }, [])

  return {
    rules,
    loading,
    error,
    createRule,
    updateRule,
    deleteRule,
    refetch: fetchRules,
  }
}
