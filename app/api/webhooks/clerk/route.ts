import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { Webhook } from "svix"
import { createClient } from "@supabase/supabase-js"

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET

if (!webhookSecret) {
  throw new Error("Please add CLERK_WEBHOOK_SECRET to your environment variables")
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(req: Request) {
  const body = await req.text()
  const headerPayload = headers()
  const svixId = headerPayload.get("svix-id")
  const svixTimestamp = headerPayload.get("svix-timestamp")
  const svixSignature = headerPayload.get("svix-signature")

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    })
  }

  const wh = new Webhook(webhookSecret)

  let evt: any

  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    })
  } catch (err) {
    console.error("Error verifying webhook:", err)
    return new Response("Error occurred", {
      status: 400,
    })
  }

  const { id, email_addresses, first_name, last_name, image_url } = evt.data
  const eventType = evt.type

  try {
    if (eventType === "user.created") {
      await supabase.from("users").insert({
        id: id,
        clerk_id: id,
        email: email_addresses[0]?.email_address,
        full_name: `${first_name || ""} ${last_name || ""}`.trim(),
        avatar_url: image_url,
        role: "employee",
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
    }

    if (eventType === "user.updated") {
      await supabase
        .from("users")
        .update({
          email: email_addresses[0]?.email_address,
          full_name: `${first_name || ""} ${last_name || ""}`.trim(),
          avatar_url: image_url,
          updated_at: new Date().toISOString(),
        })
        .eq("clerk_id", id)
    }

    if (eventType === "user.deleted") {
      await supabase
        .from("users")
        .update({
          is_active: false,
          updated_at: new Date().toISOString(),
        })
        .eq("clerk_id", id)
    }
  } catch (error) {
    console.error("Error syncing user with Supabase:", error)
    return new Response("Error occurred", { status: 500 })
  }

  return NextResponse.json({ message: "Success" })
}
