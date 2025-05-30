"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@/lib/supabase/client"
import type { Client } from "@/lib/types"

export function useClients() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  const fetchClients = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from("clients").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setClients(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  const createClient = async (clientData: Partial<Client>) => {
    try {
      const { data, error } = await supabase.from("clients").insert([clientData]).select().single()

      if (error) throw error
      setClients((prev) => [data, ...prev])
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la création")
      throw err
    }
  }

  const updateClient = async (id: string, updates: Partial<Client>) => {
    try {
      const { data, error } = await supabase.from("clients").update(updates).eq("id", id).select().single()

      if (error) throw error
      setClients((prev) => prev.map((client) => (client.id === id ? { ...client, ...data } : client)))
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la mise à jour")
      throw err
    }
  }

  const deleteClient = async (id: string) => {
    try {
      const { error } = await supabase.from("clients").delete().eq("id", id)

      if (error) throw error
      setClients((prev) => prev.filter((client) => client.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la suppression")
      throw err
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  return {
    clients,
    loading,
    error,
    fetchClients,
    createClient,
    updateClient,
    deleteClient,
  }
}
