import { n8nConfig } from "@/workflows/n8n/config"


export interface Workflow {
  id: string
  name: string
  description: string
  status: "active" | "paused" | "error"
  lastRun?: string
  nextRun?: string
  category: string
}

export class N8nService {
  private baseUrl: string
  private apiKey?: string

  constructor() {
    this.baseUrl = n8nConfig.baseUrl
    this.apiKey = n8nConfig.apiKey
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers = {
      "Content-Type": "application/json",
      ...(this.apiKey && { "X-N8N-API-KEY": this.apiKey }),
      ...options.headers,
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      throw new Error(`N8n API error: ${response.statusText}`)
    }

    return response.json()
  }

  async getWorkflows(): Promise<Workflow[]> {
    return this.request<Workflow[]>("/api/v1/workflows")
  }

  async getWorkflow(id: string): Promise<Workflow> {
    return this.request<Workflow>(`/api/v1/workflows/${id}`)
  }

  async activateWorkflow(id: string): Promise<void> {
    await this.request(`/api/v1/workflows/${id}/activate`, {
      method: "POST",
    })
  }

  async deactivateWorkflow(id: string): Promise<void> {
    await this.request(`/api/v1/workflows/${id}/deactivate`, {
      method: "POST",
    })
  }

  async executeWorkflow(id: string, data?: any): Promise<any> {
    return this.request(`/api/v1/workflows/${id}/execute`, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async getWorkflowExecutions(id: string): Promise<any[]> {
    return this.request<any[]>(`/api/v1/workflows/${id}/executions`)
  }

  async getWorkflowStatistics(id: string): Promise<any> {
    return this.request<any>(`/api/v1/workflows/${id}/statistics`)
  }
}

export const n8nService = new N8nService() 