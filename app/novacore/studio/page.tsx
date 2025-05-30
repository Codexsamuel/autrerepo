"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Video,
  ImageIcon,
  Palette,
  Sparkles,
  Plus,
  Filter,
  Share2,
  Edit3,
  Wand2,
  Camera,
  Music,
  Type,
  Layout,
  Zap,
} from "lucide-react"

import VideoGenerator from "@/components/studio/video-generator"
import DesignGenerator from "@/components/studio/design-generator"
import TemplateLibrary from "@/components/studio/template-library"

interface Project {
  id: string
  name: string
  type: "video" | "design" | "campaign" | "mixed"
  status: "draft" | "in_progress" | "completed" | "published"
  thumbnail: string
  progress: number
  assets: number
  lastModified: string
}

interface Template {
  id: string
  name: string
  type: "video" | "design" | "social_post"
  platform: string
  thumbnail: string
  aspectRatio: string
}

interface AIGeneration {
  id: string
  type: "video" | "design" | "script" | "copy"
  prompt: string
  status: "pending" | "processing" | "completed" | "failed"
  result?: string
  createdAt: string
}

export default function StudioIA() {
  const [activeTab, setActiveTab] = useState("projects")

  // Données de démonstration
  const projects: Project[] = [
    {
      id: "1",
      name: "Campagne Lancement Produit",
      type: "campaign",
      status: "in_progress",
      thumbnail: "/placeholder.svg?height=200&width=300",
      progress: 75,
      assets: 12,
      lastModified: "2024-01-15",
    },
    {
      id: "2",
      name: "Vidéo Présentation Service",
      type: "video",
      status: "completed",
      thumbnail: "/placeholder.svg?height=200&width=300",
      progress: 100,
      assets: 8,
      lastModified: "2024-01-14",
    },
    {
      id: "3",
      name: "Kit Identité Visuelle",
      type: "design",
      status: "draft",
      thumbnail: "/placeholder.svg?height=200&width=300",
      progress: 25,
      assets: 4,
      lastModified: "2024-01-13",
    },
  ]

  const templates: Template[] = [
    {
      id: "1",
      name: "Post Instagram Produit",
      type: "design",
      platform: "Instagram",
      thumbnail: "/placeholder.svg?height=200&width=200",
      aspectRatio: "1:1",
    },
    {
      id: "2",
      name: "Vidéo TikTok Promo",
      type: "video",
      platform: "TikTok",
      thumbnail: "/placeholder.svg?height=200&width=200",
      aspectRatio: "9:16",
    },
    {
      id: "3",
      name: "Story Instagram Événement",
      type: "design",
      platform: "Instagram",
      thumbnail: "/placeholder.svg?height=200&width=200",
      aspectRatio: "9:16",
    },
    {
      id: "4",
      name: "Vidéo YouTube Intro",
      type: "video",
      platform: "YouTube",
      thumbnail: "/placeholder.svg?height=200&width=200",
      aspectRatio: "16:9",
    },
  ]

  const aiGenerations: AIGeneration[] = [
    {
      id: "1",
      type: "video",
      prompt: "Créer une vidéo de présentation produit moderne et dynamique",
      status: "completed",
      result: "/placeholder.svg?height=200&width=300",
      createdAt: "2024-01-15 14:30",
    },
    {
      id: "2",
      type: "copy",
      prompt: "Rédiger un script publicitaire accrocheur pour Instagram",
      status: "processing",
      createdAt: "2024-01-15 15:15",
    },
    {
      id: "3",
      type: "design",
      prompt: "Générer un design de bannière web moderne",
      status: "pending",
      createdAt: "2024-01-15 15:45",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in_progress":
      case "processing":
        return "bg-blue-500"
      case "draft":
      case "pending":
        return "bg-yellow-500"
      case "published":
        return "bg-purple-500"
      case "failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "design":
        return <Palette className="h-4 w-4" />
      case "campaign":
        return <Sparkles className="h-4 w-4" />
      case "social_post":
        return <ImageIcon className="h-4 w-4" />
      default:
        return <Layout className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <Wand2 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Studio IA</h1>
              <p className="text-gray-600">Créez du contenu exceptionnel avec l'intelligence artificielle</p>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="flex gap-4 mb-6">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau Projet
            </Button>
            <Button variant="outline">
              <Sparkles className="h-4 w-4 mr-2" />
              Génération IA
            </Button>
            <Button variant="outline">
              <Camera className="h-4 w-4 mr-2" />
              Importer Assets
            </Button>
          </div>

          {/* Stats rapides */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Projets Actifs</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Layout className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Générations IA</p>
                    <p className="text-2xl font-bold text-gray-900">47</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Zap className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Templates</p>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Type className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Assets</p>
                    <p className="text-2xl font-bold text-gray-900">156</p>
                  </div>
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Music className="h-5 w-5 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contenu principal */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="projects">Projets</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="ai">IA Générative</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
          </TabsList>

          {/* Onglet Projets */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Mes Projets</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrer
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0">
                    <div className="relative">
                      <img
                        src={project.thumbnail || "/placeholder.svg"}
                        alt={project.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge className={`${getStatusColor(project.status)} text-white`}>{project.status}</Badge>
                      </div>
                      <div className="absolute top-3 left-3">
                        <div className="p-2 bg-white/90 rounded-lg">{getTypeIcon(project.type)}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{project.name}</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{project.assets} assets</span>
                        <span>{project.lastModified}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Progression</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Edit3 className="h-4 w-4 mr-2" />
                          Éditer
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Onglet Templates */}
          <TabsContent value="templates" className="space-y-6">
            <TemplateLibrary />
          </TabsContent>

          {/* Onglet IA Générative */}
          <TabsContent value="ai" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Outils IA Génératifs</h2>
            </div>

            <Tabs defaultValue="video" className="space-y-6">
              <TabsList>
                <TabsTrigger value="video">Vidéo IA</TabsTrigger>
                <TabsTrigger value="design">Design IA</TabsTrigger>
              </TabsList>

              <TabsContent value="video">
                <VideoGenerator />
              </TabsContent>

              <TabsContent value="design">
                <DesignGenerator />
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Onglet Assets */}
          <TabsContent value="assets" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Bibliothèque d'Assets</h2>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrer
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Importer
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <Card key={i} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-2">
                    <img
                      src={`/placeholder.svg?height=120&width=120&text=Asset+${i + 1}`}
                      alt={`Asset ${i + 1}`}
                      className="w-full h-24 object-cover rounded-lg mb-2"
                    />
                    <p className="text-xs text-gray-600 truncate">Asset {i + 1}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
