export interface VideoGenerationRequest {
  title: string
  content: string
  aspect_ratio: "16:9" | "9:16" | "3:4" | "4:3" | "2:1" | "1:1"
  template_id?: string
  client_id?: string
  project_id?: string
}

export interface VideoGenerationResponse {
  success: boolean
  video_url?: string
  error?: string
  generation_id: string
}

export interface CanvaDesignRequest {
  design_type: "social_post" | "banner" | "flyer" | "presentation" | "logo"
  title: string
  brand_colors?: string[]
  brand_logo?: string
  content: {
    headline?: string
    description?: string
    call_to_action?: string
  }
  dimensions?: {
    width: number
    height: number
  }
}

export interface CanvaDesignResponse {
  success: boolean
  design_url?: string
  edit_url?: string
  export_url?: string
  design_id: string
}

export interface StudioProject {
  id: string
  name: string
  description: string | null
  client_id: string | null
  project_type: "video" | "design" | "campaign" | "mixed"
  status: "draft" | "in_progress" | "completed" | "published"
  assets: StudioAsset[]
  created_at: string
  updated_at: string
  created_by: string
  metadata: Record<string, any>
}

export interface StudioAsset {
  id: string
  project_id: string
  asset_type: "video" | "image" | "design" | "template"
  name: string
  url: string
  thumbnail_url?: string
  source: "capcut" | "canva" | "adobe" | "upload"
  metadata: Record<string, any>
  created_at: string
}

export interface ContentTemplate {
  id: string
  name: string
  description: string
  type: "video" | "design" | "social_post"
  platform: "instagram" | "tiktok" | "youtube" | "facebook" | "linkedin" | "twitter"
  aspect_ratio: string
  template_data: Record<string, any>
  preview_url: string
}

export interface AIContentSuggestion {
  type: "video" | "design" | "copy"
  title: string
  description: string
  content: string
  confidence: number
  metadata: Record<string, any>
}
