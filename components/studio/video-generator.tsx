"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { generateVideoWithCapCut, generateAIContent } from "@/lib/actions/studio"
import { Video, Wand2, Loader2, Play, Download, Share } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface VideoGeneratorProps {
  projectId?: string
  clientId?: string
}

export default function VideoGenerator({ projectId, clientId }: VideoGeneratorProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [aspectRatio, setAspectRatio] = useState<string>("16:9")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGeneratingScript, setIsGeneratingScript] = useState(false)
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null)

  const aspectRatios = [
    { value: "16:9", label: "16:9 (Paysage)", description: "YouTube, Facebook" },
    { value: "9:16", label: "9:16 (Portrait)", description: "TikTok, Instagram Stories" },
    { value: "1:1", label: "1:1 (Carré)", description: "Instagram Post" },
    { value: "4:3", label: "4:3 (Standard)", description: "Présentation" },
  ]

  const handleGenerateScript = async () => {
    if (!title) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un titre pour générer le script",
        variant: "destructive",
      })
      return
    }

    setIsGeneratingScript(true)
    try {
      const result = await generateAIContent(
        `Crée un script vidéo engageant pour: ${title}. Le script doit être adapté pour une vidéo de 30-60 secondes.`,
        "video_script",
      )

      if (result.success) {
        setContent(result.content)
        toast({
          title: "Script généré !",
          description: "Le script IA a été généré avec succès",
        })
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer le script IA",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingScript(false)
    }
  }

  const handleGenerateVideo = async () => {
    if (!title || !content) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs requis",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    try {
      const result = await generateVideoWithCapCut({
        title,
        content,
        aspect_ratio: aspectRatio as any,
        project_id: projectId,
        client_id: clientId,
      })

      if (result.success && result.video_url) {
        setGeneratedVideo(result.video_url)
        toast({
          title: "Vidéo générée !",
          description: "Votre vidéo a été créée avec succès",
        })
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer la vidéo",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Générateur de Vidéo IA
          </CardTitle>
          <CardDescription>Créez des vidéos automatiquement à partir de votre texte avec CapCut AI</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Titre de la vidéo</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Présentation de notre nouveau produit"
                />
              </div>

              <div>
                <Label htmlFor="aspect-ratio">Format vidéo</Label>
                <Select value={aspectRatio} onValueChange={setAspectRatio}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {aspectRatios.map((ratio) => (
                      <SelectItem key={ratio.value} value={ratio.value}>
                        <div>
                          <div className="font-medium">{ratio.label}</div>
                          <div className="text-xs text-muted-foreground">{ratio.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="content">Script de la vidéo</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGenerateScript}
                    disabled={isGeneratingScript || !title}
                  >
                    {isGeneratingScript ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Wand2 className="h-4 w-4 mr-2" />
                    )}
                    Générer avec IA
                  </Button>
                </div>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Décrivez le contenu de votre vidéo ou utilisez l'IA pour générer un script..."
                  rows={6}
                />
                <div className="text-xs text-muted-foreground mt-1">
                  {content.length}/3000 caractères (max pour CapCut)
                </div>
              </div>

              <Button onClick={handleGenerateVideo} disabled={isGenerating} className="w-full" size="lg">
                {isGenerating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Video className="h-4 w-4 mr-2" />}
                {isGenerating ? "Génération en cours..." : "Générer la vidéo"}
              </Button>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                {generatedVideo ? (
                  <div className="space-y-4">
                    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
                      <video
                        src={generatedVideo}
                        controls
                        className="w-full h-full object-cover"
                        poster="/placeholder.svg?height=200&width=300"
                      />
                    </div>
                    <div className="flex gap-2 justify-center">
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        Prévisualiser
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Télécharger
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="h-4 w-4 mr-2" />
                        Partager
                      </Button>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Vidéo générée avec succès</Badge>
                  </div>
                ) : (
                  <div className="text-muted-foreground">
                    <Video className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Votre vidéo apparaîtra ici</p>
                    <p className="text-sm">Remplissez les champs et cliquez sur "Générer"</p>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">💡 Conseils pour de meilleures vidéos</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Utilisez un titre accrocheur et descriptif</li>
                  <li>• Gardez le script concis (30-60 secondes)</li>
                  <li>• Adaptez le format à votre plateforme cible</li>
                  <li>• Incluez un call-to-action clair</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
