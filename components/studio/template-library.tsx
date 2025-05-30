"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { searchCapCutTemplates } from "@/lib/actions/studio"
import { Search, Video, ImageIcon, Play, Download, Star, Filter } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface Template {
  id: string
  name: string
  type: "video" | "design" | "social_post"
  platform: string
  thumbnail: string
  aspectRatio: string
  rating?: number
  downloads?: number
  tags?: string[]
}

interface CapCutTemplate {
  template_id: string
  template_name: string
  template_cover: string
  aspect_ratio: string
  duration: number
  tags: string[]
}

export default function TemplateLibrary() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isSearching, setIsSearching] = useState(false)
  const [capCutTemplates, setCapCutTemplates] = useState<CapCutTemplate[]>([])

  // Templates locaux de démonstration
  const localTemplates: Template[] = [
    {
      id: "1",
      name: "Post Instagram Produit",
      type: "design",
      platform: "Instagram",
      thumbnail: "/placeholder.svg?height=200&width=200",
      aspectRatio: "1:1",
      rating: 4.8,
      downloads: 1250,
      tags: ["produit", "e-commerce", "moderne"],
    },
    {
      id: "2",
      name: "Vidéo TikTok Promo",
      type: "video",
      platform: "TikTok",
      thumbnail: "/placeholder.svg?height=200&width=200",
      aspectRatio: "9:16",
      rating: 4.6,
      downloads: 890,
      tags: ["promotion", "dynamique", "jeune"],
    },
    {
      id: "3",
      name: "Story Instagram Événement",
      type: "design",
      platform: "Instagram",
      thumbnail: "/placeholder.svg?height=200&width=200",
      aspectRatio: "9:16",
      rating: 4.7,
      downloads: 650,
      tags: ["événement", "élégant", "story"],
    },
    {
      id: "4",
      name: "Bannière YouTube",
      type: "design",
      platform: "YouTube",
      thumbnail: "/placeholder.svg?height=200&width=200",
      aspectRatio: "16:9",
      rating: 4.9,
      downloads: 2100,
      tags: ["youtube", "bannière", "professionnel"],
    },
  ]

  const handleSearchCapCut = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    try {
      const result = await searchCapCutTemplates(searchQuery, 1, "16:9")

      if (result.success) {
        setCapCutTemplates(result.templates || [])
        toast({
          title: "Recherche terminée",
          description: `${result.templates?.length || 0} templates trouvés`,
        })
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Erreur de recherche",
        description: "Impossible de rechercher les templates CapCut",
        variant: "destructive",
      })
    } finally {
      setIsSearching(false)
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "design":
      case "social_post":
        return <ImageIcon className="h-4 w-4" />
      default:
        return <ImageIcon className="h-4 w-4" />
    }
  }

  const filteredTemplates = localTemplates.filter((template) => {
    if (activeTab === "all") return true
    return template.type === activeTab
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bibliothèque de Templates</CardTitle>
          <CardDescription>Découvrez des templates professionnels pour vos créations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher des templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  onKeyPress={(e) => e.key === "Enter" && handleSearchCapCut()}
                />
              </div>
            </div>
            <Button onClick={handleSearchCapCut} disabled={isSearching}>
              {isSearching ? "Recherche..." : "Rechercher CapCut"}
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 w-full max-w-md mb-6">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="video">Vidéos</TabsTrigger>
              <TabsTrigger value="design">Designs</TabsTrigger>
              <TabsTrigger value="social_post">Social</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-6">
              {/* Templates CapCut */}
              {capCutTemplates.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Templates CapCut ({capCutTemplates.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {capCutTemplates.map((template) => (
                      <Card key={template.template_id} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="p-0">
                          <div className="relative">
                            <img
                              src={template.template_cover || "/placeholder.svg"}
                              alt={template.template_name}
                              className="w-full h-40 object-cover rounded-t-lg"
                            />
                            <div className="absolute top-2 right-2">
                              <Badge variant="secondary">{template.aspect_ratio}</Badge>
                            </div>
                            <div className="absolute top-2 left-2">
                              <div className="p-1 bg-white/90 rounded">
                                <Video className="h-3 w-3" />
                              </div>
                            </div>
                            <div className="absolute bottom-2 right-2">
                              <Badge className="bg-black/70 text-white text-xs">{template.duration}s</Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-3">
                          <h4 className="font-medium text-sm mb-2 truncate">{template.template_name}</h4>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {template.tags?.slice(0, 2).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Button size="sm" className="w-full">
                            <Play className="h-3 w-3 mr-1" />
                            Utiliser
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Templates locaux */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Templates Populaires</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredTemplates.map((template) => (
                    <Card key={template.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="p-0">
                        <div className="relative">
                          <img
                            src={template.thumbnail || "/placeholder.svg"}
                            alt={template.name}
                            className="w-full h-40 object-cover rounded-t-lg"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary">{template.aspectRatio}</Badge>
                          </div>
                          <div className="absolute top-2 left-2">
                            <div className="p-1 bg-white/90 rounded">{getTypeIcon(template.type)}</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-3">
                        <h4 className="font-medium text-sm mb-2">{template.name}</h4>
                        <p className="text-xs text-gray-600 mb-2">{template.platform}</p>

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs">{template.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Download className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-600">{template.downloads}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {template.tags?.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <Button size="sm" className="w-full">
                          Utiliser Template
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
