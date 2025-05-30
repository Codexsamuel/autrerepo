"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { createDesignWithCanva, generateAIContent } from "@/lib/actions/studio"
import { Palette, Wand2, Loader2, Edit, Download, Share } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface DesignGeneratorProps {
  projectId?: string
  clientId?: string
}

export default function DesignGenerator({ projectId, clientId }: DesignGeneratorProps) {
  const [title, setTitle] = useState("")
  const [designType, setDesignType] = useState<string>("social_post")
  const [headline, setHeadline] = useState("")
  const [description, setDescription] = useState("")
  const [callToAction, setCTA] = useState("")
  const [brandColors, setBrandColors] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGeneratingBrief, setIsGeneratingBrief] = useState(false)
  const [generatedDesign, setGeneratedDesign] = useState<{
    design_url?: string
    edit_url?: string
    design_id: string
  } | null>(null)

  const designTypes = [
    { value: "social_post", label: "Post Réseaux Sociaux", description: "Instagram, Facebook, LinkedIn" },
    { value: "banner", label: "Bannière Web", description: "Site web, publicité" },
    { value: "flyer", label: "Flyer", description: "Événement, promotion" },
    { value: "presentation", label: "Présentation", description: "PowerPoint, Keynote" },
    { value: "logo", label: "Logo", description: "Identité de marque" },
  ]

  const handleGenerateBrief = async () => {
    if (!title) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un titre pour générer le brief",
        variant: "destructive",
      })
      return
    }

    setIsGeneratingBrief(true)
    try {
      const result = await generateAIContent(
        `Crée un brief créatif détaillé pour un design de type "${designType}" avec le titre: "${title}". Inclus des suggestions de couleurs, typographies et éléments visuels.`,
        "design_brief",
      )

      if (result.success) {
        // Parse le contenu IA pour extraire les éléments
        const content = result.content
        setDescription(content)

        // Extraire des suggestions de couleurs si possible
        const colorMatch = content.match(/#[0-9A-Fa-f]{6}/g)
        if (colorMatch) {
          setBrandColors(colorMatch.slice(0, 3).join(", "))
        }

        toast({
          title: "Brief généré !",
          description: "Le brief créatif IA a été généré avec succès",
        })
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer le brief IA",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingBrief(false)
    }
  }

  const handleGenerateDesign = async () => {
    if (!title || !headline) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir au moins le titre et le headline",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    try {
      const result = await createDesignWithCanva({
        design_type: designType as any,
        title,
        brand_colors: brandColors ? brandColors.split(",").map((c) => c.trim()) : undefined,
        content: {
          headline,
          description,
          call_to_action: callToAction,
        },
      })

      if (result.success) {
        setGeneratedDesign(result)
        toast({
          title: "Design créé !",
          description: "Votre design a été créé avec succès sur Canva",
        })
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer le design",
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
            <Palette className="h-5 w-5" />
            Générateur de Design IA
          </CardTitle>
          <CardDescription>Créez des designs professionnels automatiquement avec Canva</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Titre du design</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Promotion Black Friday 2024"
                />
              </div>

              <div>
                <Label htmlFor="design-type">Type de design</Label>
                <Select value={designType} onValueChange={setDesignType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {designTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-xs text-muted-foreground">{type.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="headline">Titre principal</Label>
                <Input
                  id="headline"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="Ex: -50% sur tous nos produits !"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="description">Description</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGenerateBrief}
                    disabled={isGeneratingBrief || !title}
                  >
                    {isGeneratingBrief ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Wand2 className="h-4 w-4 mr-2" />
                    )}
                    Brief IA
                  </Button>
                </div>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description du contenu ou utilisez l'IA pour générer un brief..."
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="cta">Call-to-action</Label>
                <Input
                  id="cta"
                  value={callToAction}
                  onChange={(e) => setCTA(e.target.value)}
                  placeholder="Ex: Achetez maintenant"
                />
              </div>

              <div>
                <Label htmlFor="colors">Couleurs de marque</Label>
                <Input
                  id="colors"
                  value={brandColors}
                  onChange={(e) => setBrandColors(e.target.value)}
                  placeholder="Ex: #FF6B6B, #4ECDC4, #45B7D1"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  Séparez les couleurs hexadécimales par des virgules
                </div>
              </div>

              <Button onClick={handleGenerateDesign} disabled={isGenerating} className="w-full" size="lg">
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Palette className="h-4 w-4 mr-2" />
                )}
                {isGenerating ? "Création en cours..." : "Créer le design"}
              </Button>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                {generatedDesign ? (
                  <div className="space-y-4">
                    <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      {generatedDesign.design_url ? (
                        <iframe src={generatedDesign.design_url} className="w-full h-full" title="Design généré" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Palette className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 justify-center">
                      {generatedDesign.edit_url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={generatedDesign.edit_url} target="_blank" rel="noopener noreferrer">
                            <Edit className="h-4 w-4 mr-2" />
                            Éditer
                          </a>
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Télécharger
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="h-4 w-4 mr-2" />
                        Partager
                      </Button>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Design créé avec succès</Badge>
                  </div>
                ) : (
                  <div className="text-muted-foreground">
                    <Palette className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Votre design apparaîtra ici</p>
                    <p className="text-sm">Remplissez les champs et cliquez sur "Créer"</p>
                  </div>
                )}
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">🎨 Conseils pour de meilleurs designs</h4>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Utilisez des couleurs cohérentes avec votre marque</li>
                  <li>• Gardez le message principal court et impactant</li>
                  <li>• Adaptez le format à votre plateforme cible</li>
                  <li>• Incluez un call-to-action visible</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
