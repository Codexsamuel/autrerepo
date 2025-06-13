"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { n8nService, Workflow } from "@/lib/services/n8n"
import { workflowCategories } from "@/workflows/n8n/config"
import { Play, Pause, RefreshCw } from "lucide-react"

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadWorkflows()
  }, [])

  const loadWorkflows = async () => {
    try {
      setLoading(true)
      const data = await n8nService.getWorkflows()
      setWorkflows(data)
      setError(null)
    } catch (err) {
      setError("Erreur lors du chargement des workflows")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleWorkflow = async (id: string, currentStatus: string) => {
    try {
      if (currentStatus === "active") {
        await n8nService.deactivateWorkflow(id)
      } else {
        await n8nService.activateWorkflow(id)
      }
      await loadWorkflows()
    } catch (err) {
      console.error(err)
    }
  }

  const handleExecuteWorkflow = async (id: string) => {
    try {
      await n8nService.executeWorkflow(id)
      await loadWorkflows()
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={loadWorkflows}>Réessayer</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Workflows n8n</h1>
        <Button onClick={loadWorkflows} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Actualiser
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflows.map((workflow) => (
          <Card key={workflow.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{workflow.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {workflow.description}
                  </p>
                </div>
                <Badge
                  variant={
                    workflow.status === "active"
                      ? "success"
                      : workflow.status === "error"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {workflow.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <span className="text-muted-foreground mr-2">Catégorie:</span>
                  <span className="flex items-center">
                    {workflowCategories[workflow.category as keyof typeof workflowCategories]?.icon}
                    <span className="ml-1">
                      {workflowCategories[workflow.category as keyof typeof workflowCategories]?.name}
                    </span>
                  </span>
                </div>
                {workflow.lastRun && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Dernière exécution:</span>{" "}
                    {new Date(workflow.lastRun).toLocaleString()}
                  </div>
                )}
                {workflow.nextRun && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Prochaine exécution:</span>{" "}
                    {new Date(workflow.nextRun).toLocaleString()}
                  </div>
                )}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleWorkflow(workflow.id, workflow.status)}
                  >
                    {workflow.status === "active" ? (
                      <>
                        <Pause className="w-4 h-4 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Démarrer
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExecuteWorkflow(workflow.id)}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Exécuter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 