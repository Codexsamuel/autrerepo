"use server"

import { createServerComponentClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { Client } from "@/lib/types"

export async function getClients() {
  const supabase = createServerComponentClient()

  const { data, error } = await supabase.from("clients").select("*").order("created_at", { ascending: false })

  if (error) {
    throw new Error(`Erreur lors du chargement des clients: ${error.message}`)
  }

  return data as Client[]
}

export async function createClient(formData: FormData) {
  const supabase = createServerComponentClient()

  const clientData = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    company: formData.get("company") as string,
    address: formData.get("address") as string,
    city: formData.get("city") as string,
    country: formData.get("country") as string,
    notes: formData.get("notes") as string,
    status: "active" as const,
  }

  const { data, error } = await supabase.from("clients").insert([clientData]).select().single()

  if (error) {
    throw new Error(`Erreur lors de la création du client: ${error.message}`)
  }

  revalidatePath("/novacore/clients")
  return data
}

export async function updateClient(id: string, formData: FormData) {
  const supabase = createServerComponentClient()

  const updates = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    company: formData.get("company") as string,
    address: formData.get("address") as string,
    city: formData.get("city") as string,
    country: formData.get("country") as string,
    notes: formData.get("notes") as string,
    status: formData.get("status") as string,
  }

  const { data, error } = await supabase.from("clients").update(updates).eq("id", id).select().single()

  if (error) {
    throw new Error(`Erreur lors de la mise à jour: ${error.message}`)
  }

  revalidatePath("/novacore/clients")
  return data
}

export async function deleteClient(id: string) {
  const supabase = createServerComponentClient()

  const { error } = await supabase.from("clients").delete().eq("id", id)

  if (error) {
    throw new Error(`Erreur lors de la suppression: ${error.message}`)
  }

  revalidatePath("/novacore/clients")
}
