"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useNotification } from "@/components/ui/notification-provider"



interface CommunityPost {
  id: string
  title: string
  content: string
  platform: "instagram" | "facebook" | "twitter" | "linkedin"
  status: "draft" | "scheduled" | "published"
  engagement: {
    likes: number
    comments: number
    shares: number
  }
  createdAt: string
  scheduledFor?: string
}

export default function DLCommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { showNotification } = useNotification()

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      setPosts([
        {
          id: "1",
          title: "Nouvelle Collection Été 2024",
          content: "Découvrez notre nouvelle collection d'été...",
          platform: "instagram",
          status: "published",
          engagement: {
            likes: 1200,
            comments: 89,
            shares: 45,
          },
          createdAt: "2024-03-20T10:00:00Z",
        },
        {
          id: "2",
          title: "Témoignage Client",
          content: "Un de nos clients partage son expérience...",
          platform: "facebook",
          status: "scheduled",
          engagement: {
            likes: 0,
            comments: 0,
            shares: 0,
          },
          createdAt: "2024-03-19T15:30:00Z",
          scheduledFor: "2024-03-25T09:00:00Z",
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleCreatePost = () => {
    showNotification("Création de post en cours...", "info")
    // Logique de création de post
  }

  const handleSchedulePost = () => {
    showNotification("Programmation de post en cours...", "info")
    // Logique de programmation de post
  }

  const handleAnalyzeEngagement = () => {
    showNotification("Analyse de l'engagement en cours...", "info")
    // Logique d'analyse d'engagement
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
        <h1 className="text-3xl font-bold">DL Community - Gestionnaire de Communauté</h1>
        <div className="space-x-4">
          <Button onClick={handleCreatePost}>Créer un Post</Button>
          <Button onClick={handleSchedulePost}>Programmer</Button>
          <Button onClick={handleAnalyzeEngagement}>Analyser l'Engagement</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{post.title}</span>
                <Badge
                  variant={
                    post.status === "published"
                      ? "success"
                      : post.status === "scheduled"
                      ? "info"
                      : "secondary"
                  }
                >post.status</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{post.content}</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Plateforme: {post.platform}</span>
                  <span>Créé le: {new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                {post.scheduledFor && (
                  <p className="text-sm text-muted-foreground">
                    Programmé pour: {new Date(post.scheduledFor).toLocaleDateString()}
                  </p>
                )}
                <div className="flex items-center space-x-4 pt-2">
                  <div className="flex items-center">
                    <span className="text-sm font-medium">❤️ {post.engagement.likes}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">💬 {post.engagement.comments}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">🔄 {post.engagement.shares}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 