"use server"

import { createServerComponentClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getSurveillanceEvents() {
  const supabase = createServerComponentClient()

  const { data, error } = await supabase
    .from("surveillance_events")
    .select("*")
    .order("detected_at", { ascending: false })
    .limit(50)

  if (error) {
    throw new Error(`Erreur lors du chargement des événements: ${error.message}`)
  }

  return data
}

export async function getActiveAlerts() {
  const supabase = createServerComponentClient()

  const { data, error } = await supabase
    .from("ai_alerts")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(`Erreur lors du chargement des alertes: ${error.message}`)
  }

  return data
}

export async function resolveAlert(alertId: string, actionTaken: string) {
  const supabase = createServerComponentClient()

  const { error } = await supabase
    .from("ai_alerts")
    .update({
      is_active: false,
      action_taken: actionTaken,
      action_taken_at: new Date().toISOString(),
    })
    .eq("id", alertId)

  if (error) {
    throw new Error(`Erreur lors de la résolution: ${error.message}`)
  }

  revalidatePath("/novacore/surveillance")
}

export async function createSurveillanceEvent(eventData: {
  event_type: string
  severity: "low" | "medium" | "high" | "critical"
  entity_type: string
  entity_id?: string
  details: Record<string, any>
  ai_confidence?: number
}) {
  const supabase = createServerComponentClient()

  const { data, error } = await supabase.from("surveillance_events").insert([eventData]).select().single()

  if (error) {
    throw new Error(`Erreur lors de la création de l'événement: ${error.message}`)
  }

  revalidatePath("/novacore/surveillance")
  return data
}
