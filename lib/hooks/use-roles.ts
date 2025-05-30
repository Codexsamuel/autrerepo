"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export interface Role {
  id: string
  name: string
  description: string
  permissions: any
  created_at: string
  updated_at: string
  created_by: string
}

export function useRoles() {
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClientComponentClient()

  const fetchRoles = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from("roles").select("*").order("name")

      if (error) throw error
      setRoles(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors du chargement des rôles")
    } finally {
      setLoading(false)
    }
  }

  const createRole = async (role: Omit<Role, "id" | "created_at" | "updated_at">) => {
    try {
      const { data, error } = await supabase.from("roles").insert([role]).select().single()

      if (error) throw error
      setRoles((prev) => [...prev, data])
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la création du rôle")
      throw err
    }
  }

  const updateRole = async (id: string, updates: Partial<Role>) => {
    try {
      const { data, error } = await supabase.from("roles").update(updates).eq("id", id).select().single()

      if (error) throw error
      setRoles((prev) => prev.map((role) => (role.id === id ? data : role)))
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la mise à jour du rôle")
      throw err
    }
  }

  const deleteRole = async (id: string) => {
    try {
      const { error } = await supabase.from("roles").delete().eq("id", id)

      if (error) throw error
      setRoles((prev) => prev.filter((role) => role.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la suppression du rôle")
      throw err
    }
  }

  useEffect(() => {
    fetchRoles()
  }, [])

  return {
    roles,
    loading,
    error,
    createRole,
    updateRole,
    deleteRole,
    refetch: fetchRoles,
  }
}
