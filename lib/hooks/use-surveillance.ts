"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@/lib/supabase/client"
import type { SurveillanceEvent, AIAlert } from "@/lib/types"

export function useSurveillance() {
  const [events, setEvents] = useState<SurveillanceEvent[]>([])
  const [alerts, setAlerts] = useState<AIAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("surveillance_events")
        .select("*")
        .order("detected_at", { ascending: false })
        .limit(100)

      if (error) throw error
      setEvents(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors du chargement des événements")
    }
  }

  const fetchAlerts = async () => {
    try {
      const { data, error } = await supabase
        .from("ai_alerts")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })

      if (error) throw error
      setAlerts(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors du chargement des alertes")
    } finally {
      setLoading(false)
    }
  }

  const resolveAlert = async (alertId: string, actionTaken: string) => {
    try {
      const { error } = await supabase
        .from("ai_alerts")
        .update({
          is_active: false,
          action_taken: actionTaken,
          action_taken_at: new Date().toISOString(),
        })
        .eq("id", alertId)

      if (error) throw error
      setAlerts((prev) => prev.filter((alert) => alert.id !== alertId))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la résolution")
      throw err
    }
  }

  useEffect(() => {
    fetchEvents()
    fetchAlerts()

    // Écouter les nouveaux événements en temps réel
    const eventsSubscription = supabase
      .channel("surveillance_events")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "surveillance_events" }, (payload) => {
        setEvents((prev) => [payload.new as SurveillanceEvent, ...prev])
      })
      .subscribe()

    const alertsSubscription = supabase
      .channel("ai_alerts")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "ai_alerts" }, (payload) => {
        setAlerts((prev) => [payload.new as AIAlert, ...prev])
      })
      .subscribe()

    return () => {
      eventsSubscription.unsubscribe()
      alertsSubscription.unsubscribe()
    }
  }, [])

  return {
    events,
    alerts,
    loading,
    error,
    fetchEvents,
    fetchAlerts,
    resolveAlert,
  }
}
