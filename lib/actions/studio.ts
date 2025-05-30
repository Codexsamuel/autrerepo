"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { VideoGenerationRequest, CanvaDesignRequest, StudioProject } from "@/lib/types/studio"
import { cookies } from "next/headers"

// CapCut API Integration
export async function generateVideoWithCapCut(request: VideoGenerationRequest) {
  try {
    const response = await fetch("https://www.capcut.com/lv/v1/draft/text_to_video/link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CAPCUT_API_KEY}`,
      },
      body: JSON.stringify({
        title: request.title,
        content: request.content,
        aspect_ratio: request.aspect_ratio,
      }),
    })

    const data = await response.json()

    if (data.ret === "0") {
      // Sauvegarder dans Supabase
      const cookieStore = cookies()
      const supabase = createServerClient(cookieStore)

      const asset = {
        project_id: request.project_id,
        asset_type: "video" as const,
        name: request.title,
        url: data.data.link,
        source: "capcut" as const,
        metadata: {
          aspect_ratio: request.aspect_ratio,
          generation_request: request,
          capcut_response: data,
        },
      }

      await supabase.from("studio_assets").insert(asset)

      return {
        success: true,
        video_url: data.data.link,
        generation_id: crypto.randomUUID(),
      }
    } else {
      throw new Error(data.errmsg || "Erreur lors de la génération vidéo")
    }
  } catch (error) {
    console.error("CapCut API Error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue",
      generation_id: crypto.randomUUID(),
    }
  }
}

// Canva API Integration
export async function createDesignWithCanva(request: CanvaDesignRequest) {
  try {
    // Créer un design via Canva Connect API
    const response = await fetch("https://api.canva.com/rest/v1/designs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CANVA_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        design_type: request.design_type,
        title: request.title,
        content: request.content,
        dimensions: request.dimensions,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      return {
        success: true,
        design_url: data.urls?.view_url,
        edit_url: data.urls?.edit_url,
        design_id: data.design?.id,
      }
    } else {
      throw new Error("Erreur lors de la création du design")
    }
  } catch (error) {
    console.error("Canva API Error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue",
      design_id: crypto.randomUUID(),
    }
  }
}

// Recherche de templates CapCut
export async function searchCapCutTemplates(keyword: string, template_type: 1 | 2 = 1, aspect_ratio = "16:9") {
  try {
    const response = await fetch("https://www.capcut.com/lv/v1/plugin_service/search/templates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CAPCUT_API_KEY}`,
      },
      body: JSON.stringify({
        keyword,
        template_type,
        aspect_ratio,
      }),
    })

    const data = await response.json()

    if (data.ret === "0") {
      return {
        success: true,
        templates: data.data.templates,
      }
    } else {
      throw new Error("Erreur lors de la recherche de templates")
    }
  } catch (error) {
    console.error("CapCut Templates Search Error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue",
      templates: [],
    }
  }
}

// Gestion des projets Studio
export async function createStudioProject(projectData: Partial<StudioProject>) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { data, error } = await supabase.from("studio_projects").insert(projectData).select().single()

  if (error) throw new Error(error.message)

  revalidatePath("/novacore/studio")
  return data
}

export async function updateStudioProject(id: string, updates: Partial<StudioProject>) {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { data, error } = await supabase.from("studio_projects").update(updates).eq("id", id).select().single()

  if (error) throw new Error(error.message)

  revalidatePath("/novacore/studio")
  return data
}

export async function getStudioProjects() {
  const cookieStore = cookies()
  const supabase = createServerClient(cookieStore)

  const { data, error } = await supabase
    .from("studio_projects")
    .select("*, studio_assets(*), clients(first_name, last_name)")
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)

  return data
}

// Génération de contenu IA avec OpenAI
export async function generateAIContent(prompt: string, type: "video_script" | "social_copy" | "design_brief") {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: getSystemPrompt(type),
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      return {
        success: true,
        content: data.choices[0].message.content,
      }
    } else {
      throw new Error("Erreur lors de la génération de contenu IA")
    }
  } catch (error) {
    console.error("OpenAI API Error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erreur inconnue",
      content: "",
    }
  }
}

function getSystemPrompt(type: string): string {
  switch (type) {
    case "video_script":
      return "Tu es un expert en création de scripts vidéo. Crée un script engageant et concis pour une vidéo de 30-60 secondes. Inclus des indications visuelles et des moments clés."
    case "social_copy":
      return "Tu es un expert en marketing digital. Crée un copy accrocheur pour les réseaux sociaux avec des hashtags pertinents et un call-to-action."
    case "design_brief":
      return "Tu es un directeur artistique. Crée un brief créatif détaillé incluant les couleurs, typographies, style visuel et éléments clés à inclure."
    default:
      return "Tu es un assistant créatif. Aide à créer du contenu de qualité."
  }
}
