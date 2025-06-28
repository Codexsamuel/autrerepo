"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useNotification } from "@/components/ui/notification-provider"



interface ContentStatus {
  id: string
  title: string
  status: "draft" | "review" | "published"
  platform: "instagram" | "facebook" | "twitter" | "linkedin"
  createdAt: string
  scheduledFor?: string
}

export default function DLCursorPage() {
  const [contents, setContents] = useState<ContentStatus[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { showNotification } = useNotification()

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      setContents([
        {
          id: "1",
          title: "Post Instagram - Nouvelle Collection",
          status: "draft",
          platform: "instagram",
          createdAt: "2024-03-20T10:00:00Z",
        },
        {
          id: "2",
          title: "Article LinkedIn - Tendances 2024",
          status: "review",
          platform: "linkedin",
          createdAt: "2024-03-19T15:30:00Z",
          scheduledFor: "2024-03-25T09:00:00Z",
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleCreateContent = () => {
    showNotification("Création de contenu en cours...", "info")
    // Logique de création de contenu
  }

  const handleIntegrateCapcut = () => {
    showNotification("Intégration CapCut en cours...", "info")
    // Logique d'intégration CapCut
  }

  const handleIntegrateCanva = () => {
    showNotification("Intégration Canva en cours...", "info")
    // Logique d'intégration Canva
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">DL Cursor - Gestionnaire de Contenu IA</h1>
        <div className="space-x-4">
          <Button onClick={handleCreateContent}>Créer du Contenu</Button>
          <Button onClick={handleIntegrateCapcut}>Intégrer CapCut</Button>
          <Button onClick={handleIntegrateCanva}>Intégrer Canva</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contents.map((content: any) => (
          <Card key={content.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{content.title}</span>
                <Badge
                  variant={
                    content.status === "published"
                      ? "success"
                      : content.status === "review"
                      ? "warning"
                      : "secondary"
                  }
                >content.status</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Plateforme: {content.platform}
                </p>
                <p className="text-sm text-muted-foreground">
                  Créé le: {new Date(content.createdAt).toLocaleDateString()}
                </p>
                {content.scheduledFor && (
                  <p className="text-sm text-muted-foreground">
                    Programmé pour: {new Date(content.scheduledFor).toLocaleDateString()}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 