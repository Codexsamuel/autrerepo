"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AiInsights, Campaign as CampaignType, AiActivity, FormData } from '../../types/config'
import type { TextareaProps } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  ArrowLeft, 
  Bot, 
  Brain, 
  Search, 
  Settings, 
  ShoppingCart,
  Camera,
  Video,
  TrendingUp,
  Users,
  Target,
  Zap,
  BarChart3,
  Download,
  Upload,
  Sparkles,
  Rocket,
  CheckCircle,
  AlertTriangle,
  Clock,
  DollarSign,
  Plus,
  Activity,
  Lightbulb,
  Megaphone,
  Palette,
  Code,
  Monitor,
  Film,
  ImageIcon,
  Building2,
  Globe,
  LineChart,
  Phone
} from "lucide-react"

export default function BusinessPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [aiStatus, setAiStatus] = useState<"idle" | "processing" | "ready">("idle")
  const [onboardingStep, setOnboardingStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    website: "",
    strategy: "",
    objectives: "",
    vision: "",
    mission: "",
    targetAudience: "",
    budget: "",
    platforms: [],
  })

  const [aiInsights, setAiInsights] = useState<AiInsights | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [campaigns] = useState<CampaignType[]>([
    {
      id: "CAM001",
      name: "Lancement Produit Q1",
      platform: "Facebook",
      status: "active",
      reach: 45230,
      engagement: 8.7,
      clicks: 1250,
      conversions: 89,
      budget: 150000,
      spent: 87500,
      roi: 245,
      createdBy: "IA NovaCore",
      content: {
        type: "video",
        description: "Innovation et qualité au service de vos besoins",
        thumbnail: "/placeholder.svg?height=200&width=300",
      },
    },
    {
      id: "CAM002",
      name: "Offres spéciales Saint-Valentin",
      platform: "Instagram",
      status: "completed",
      reach: 32100,
      engagement: 12.3,
      clicks: 890,
      conversions: 156,
      budget: 100000,
      spent: 100000,
      roi: 312,
      createdBy: "IA NovaCore",
      content: {
        type: "carousel",
        title: "Offres spéciales Saint-Valentin",
        description: "Jusqu'à -50% sur une sélection de produits",
        thumbnail: "/placeholder.svg?height=200&width=300",
      },
    },
  ])

  const [aiActivities] = useState<AiActivity[]>([
    {
      id: "AI001",
      type: "content_creation",
      action: "Création vidéo TikTok",
      status: "completed",
      details: "Vidéo de 30s créée avec CapCut API - Engagement prévu: 8.5%",
      platform: "TikTok",
      performance: { views: 12500, likes: 890, shares: 156 },
    },
    {
      id: "AI002",
      type: "analysis",
      action: "Analyse des performances",
      status: "in_progress",
      timestamp: "Il y a 1h",
      details: "Analyse des campagnes des 7 derniers jours en cours",
      platform: "Multi-plateformes",
      performance: null,
    },
    {
      id: "AI003",
      type: "optimization",
      action: "Optimisation budget publicitaire",
      status: "completed",
      timestamp: "Il y a 2h",
      details: "Réallocation de 25,000 FCFA vers Instagram Stories (+15% ROI)",
      platform: "Instagram",
      performance: { roi_improvement: 15, budget_saved: 25000 },
    },
  ])

  const handleOnboardingSubmit = () => {
    setShowOnboarding(false)
    setAiStatus("processing")

    setTimeout(() => {
      const insights: AiInsights = {
        websiteAnalysis: {
          industry: "E-commerce",
          tone: "Professionnel et moderne",
          colors: ["#2563eb", "#1d4ed8", "#ffffff"],
          keywords: ["innovation", "qualité", "service client"],
          competitors: ["Jumia", "Konga", "Afrimarket"]
        },
        recommendations: {
          seo: [
            "Améliorer la structure des URLs",
            "Ajouter des descriptions de produits"
          ],
          content: [
            "Créer un blog de mode",
            "Ajouter des guides d'achat",
            "Mettre en avant les avis clients"
          ],
          design: [
            "Simplifier la navigation",
            "Améliorer la page d'accueil",
            "Optimiser pour mobile"
          ],
          marketing: ["Lancer une campagne email",
            "Créer des contenus pour les réseaux sociaux",
            "Mettre en place un programme de fidélité"]
        },
        marketAnalysis: {
          trends: [
            "Mode durable en hausse",
            "Commerce mobile dominant",
          ],
          opportunities: [
            "Marché des accessoires en croissance",
            "Demande de produits éthiques",
            "Potentiel international"
          ],
          threats: ["Concurrence accrue",
            "Coûts de livraison",
            "Changements des algorithmes"]
        }
      }
      setAiInsights(insights)
      setAiStatus("ready")
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleAnalyze = () => {
    setIsLoading(true)
    setTimeout(() => {
      const insights: AiInsights = {
        websiteAnalysis: {
          industry: "E-commerce",
          tone: "Professionnel et moderne",
          colors: ["#2563eb", "#1d4ed8", "#ffffff"],
          keywords: ["mode", "accessoires", "tendance", "qualité"],
          competitors: ["competitor1.com", "competitor2.com"]
        },
        recommendations: {
          seo: [
            "Optimiser les balises meta",
            "Améliorer la structure des URLs",
            "Ajouter des descriptions de produits"
          ],
          content: [
            "Créer un blog de mode",
            "Ajouter des guides d'achat",
            "Mettre en avant les avis clients"
          ],
          design: [
            "Simplifier la navigation",
            "Améliorer la page d'accueil",
            "Optimiser pour mobile"
          ],
          marketing: ["Lancer une campagne email",
            "Créer des contenus pour les réseaux sociaux",
            "Mettre en place un programme de fidélité"]
        },
        marketAnalysis: {
          trends: [
            "Mode durable en hausse",
            "Commerce mobile dominant",
          ],
          opportunities: [
            "Marché des accessoires en croissance",
            "Demande de produits éthiques",
            "Potentiel international"
          ],
          threats: ["Concurrence accrue",
            "Coûts de livraison",
            "Changements des algorithmes"]
        }
      }
      setAiInsights(insights)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="/sign-in">
                  <ArrowLeft className="h-5 w-5" />
                </a>
              </Button>
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-blue-200 flex items-center justify-center bg-white shadow-md">
                <img src="/images/novacore-logo.svg" alt="NovaCore Logo" className="h-10 w-10 object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  DL Business Suite
                </h1>
                <p className="text-sm text-gray-600">CRM Intelligent avec IA NovaCore</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge
                className={`${aiStatus === "ready" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}
              >
                <Bot className="h-3 w-3 mr-1" />
                IA {aiStatus === "ready" ? "Active" : "En cours"}
              </Badge>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600" onClick={handleAnalyze} disabled={isLoading}>
                <Sparkles className="h-4 w-4 mr-2" />
                {isLoading ? "Analyse en cours..." : "Analyser mon site"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Onboarding Modal */}
      <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-blue-600" />
              Configuration IA NovaCore
            </DialogTitle>
            <DialogDescription>
              L'IA va analyser votre entreprise et créer automatiquement vos campagnes marketing
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-2">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step <= onboardingStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-500">Étape {onboardingStep}/3</span>
            </div>

            {onboardingStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Informations de base</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Nom de l'entreprise</Label>
                    <Input
                      id="company"
                      placeholder="DL Solutions SARL"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Site web</Label>
                    <Input
                      id="website"
                      placeholder="https://daveandlucesolutions.com"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="target">Public cible</Label>
                  <Input
                    id="target"
                    placeholder="Entreprises, PME, startups au Cameroun"
                    value={formData.targetAudience}
                    onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                  />
                </div>
              </div>
            )}

            {onboardingStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Stratégie et Objectifs</h3>
                <div>
                  <Label htmlFor="vision">Vision</Label>
                  <Textarea
                    id="vision"
                    placeholder="Devenir le leader des solutions digitales en Afrique centrale"
                    value={formData.vision}
                    onChange={(e) => handleInputChange("vision", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="mission">Mission</Label>
                  <Textarea
                    id="mission"
                    placeholder="Accompagner les entreprises dans leur transformation digitale"
                    value={formData.mission}
                    onChange={(e) => handleInputChange("mission", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="objectives">Objectifs marketing</Label>
                  <Textarea
                    id="objectives"
                    placeholder="Augmenter la notoriété, générer des leads qualifiés, fidéliser les clients"
                    value={formData.objectives}
                    onChange={(e) => handleInputChange("objectives", e.target.value)}
                  />
                </div>
              </div>
            )}

            {onboardingStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Budget et Plateformes</h3>
                <div>
                  <Label htmlFor="budget">Budget mensuel (FCFA)</Label>
                  <Input
                    id="budget"
                    placeholder="500,000"
                    value={formData.budget}
                    onChange={(e) => handleInputChange("budget", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Plateformes prioritaires</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {["Facebook", "Instagram", "TikTok", "LinkedIn", "YouTube", "Twitter"].map((platform) => (
                      <label key={platform} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{platform}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="strategy">Stratégie de contenu</Label>
                  <Textarea
                    id="strategy"
                    placeholder="Contenu éducatif, témoignages clients, démonstrations produits"
                    value={formData.strategy}
                    onChange={(e) => handleInputChange("strategy", e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            {onboardingStep > 1 && (
              <Button variant="outline" onClick={() => setOnboardingStep(onboardingStep - 1)}>
                Précédent
              </Button>
            )}
            {onboardingStep < 3 ? (
              <Button onClick={() => setOnboardingStep(onboardingStep + 1)}>Suivant</Button>
            ) : (
              <Button onClick={handleOnboardingSubmit} className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Rocket className="h-4 w-4 mr-2" />
                Lancer l'IA
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white/90 backdrop-blur-xl border-r h-screen sticky top-20">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                activeTab === "dashboard"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "hover:bg-gray-100"
              }`}
            >
              <BarChart3 className="h-4 w-4 inline mr-3" />
              Dashboard IA
            </button>
            <button
              onClick={() => setActiveTab("campaigns")}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                activeTab === "campaigns"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "hover:bg-gray-100"
              }`}
            >
              <Megaphone className="h-4 w-4 inline mr-3" />
              Campagnes Auto
            </button>
            <button
              onClick={() => setActiveTab("content")}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                activeTab === "content"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "hover:bg-gray-100"
              }`}
            >
              <Camera className="h-4 w-4 inline mr-3" />
              Studio IA
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                activeTab === "analytics"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "hover:bg-gray-100"
              }`}
            >
              <TrendingUp className="h-4 w-4 inline mr-3" />
              Analytics IA
            </button>
            <button
              onClick={() => setActiveTab("leads")}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                activeTab === "leads"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "hover:bg-gray-100"
              }`}
            >
              <Users className="h-4 w-4 inline mr-3" />
              Leads & CRM
            </button>
            <button
              onClick={() => setActiveTab("automation")}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                activeTab === "automation"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "hover:bg-gray-100"
              }`}
            >
              <Bot className="h-4 w-4 inline mr-3" />
              Automatisation
            </button>
            <button
              onClick={() => setActiveTab("ai-assistant")}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                activeTab === "ai-assistant"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                  : "hover:bg-gray-100"
              }`}
            >
              <Brain className="h-4 w-4 inline mr-3" />
              Assistant IA
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Dashboard IA NovaCore</h2>
                  <p className="text-gray-600">Vue d'ensemble de vos performances marketing automatisées</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Rapport IA
                  </Button>
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-500">
                    <Zap className="h-4 w-4 mr-2" />
                    Boost IA
                  </Button>
                </div>
              </div>

              {/* AI Status Banner */}
              <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Bot className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">IA NovaCore Active</h3>
                        <p className="text-blue-100">
                          {aiStatus === "ready"
                            ? "L'IA gère automatiquement vos campagnes et optimise vos performances"
                            : "Configuration en cours... Analyse de votre site web et stratégie"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">98.7%</div>
                      <div className="text-sm text-blue-100">Efficacité IA</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="border-0 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">ROI Automatisé</p>
                        <p className="text-3xl font-bold text-green-600">+287%</p>
                        <p className="text-xs text-green-600">+45% ce mois</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Leads Générés</p>
                        <p className="text-3xl font-bold text-blue-600">1,247</p>
                        <p className="text-xs text-blue-600">+89 aujourd'hui</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Contenu Créé</p>
                        <p className="text-3xl font-bold text-purple-600">156</p>
                        <p className="text-xs text-purple-600">12 aujourd'hui</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Camera className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Économies IA</p>
                        <p className="text-3xl font-bold text-orange-600">2.8M</p>
                        <p className="text-xs text-orange-600">FCFA ce mois</p>
                      </div>
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-orange-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* AI Activities */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-600" />
                      Activités IA en Temps Réel
                    </CardTitle>
                    <CardDescription>Ce que fait l'IA pour vous maintenant</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {aiActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              activity.status === "completed" ? "bg-green-100" : "bg-orange-100"
                            }`}
                          >
                            {activity.type === "content_creation" && <Camera className="h-5 w-5 text-blue-600" />}
                            {activity.type === "analysis" && <BarChart3 className="h-5 w-5 text-purple-600" />}
                            {activity.type === "optimization" && <Zap className="h-5 w-5 text-green-600" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium">{activity.action}</h4>
                              <Badge variant={activity.status === "completed" ? "default" : "secondary"}>activity.status === "completed" ? "Terminé" : "En cours"</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{activity.details}</p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>{activity.timestamp}</span>
                              <span className="font-medium">{activity.platform}</span>
                            </div>
                            {activity.performance && (
                              <div className="mt-2 flex gap-4 text-xs">
                                {activity.performance.views && (
                                  <span className="text-blue-600">👁 {activity.performance.views}</span>
                                )}
                                {activity.performance.likes && (
                                  <span className="text-red-600">❤ {activity.performance.likes}</span>
                                )}
                                {activity.performance.roi_improvement && (
                                  <span className="text-green-600">
                                    📈 +{activity.performance.roi_improvement}% ROI
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-purple-600" />
                      Insights IA
                    </CardTitle>
                    <CardDescription>Recommandations intelligentes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-blue-800">Opportunité détectée</span>
                        </div>
                        <p className="text-sm text-blue-700">
                          L'IA recommande d'augmenter le budget Instagram de 30% pour maximiser le ROI sur votre
                          audience 25-35 ans.
                        </p>
                        <Button size="sm" className="mt-2 bg-blue-600">
                          Appliquer
                        </Button>
                      </div>

                      <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="h-4 w-4 text-green-600" />
                          <span className="font-medium text-green-800">Objectif atteint</span>
                        </div>
                        <p className="text-sm text-green-700">
                          Votre campagne "Lancement Q1" a dépassé l'objectif de conversions de 23%. L'IA optimise
                          automatiquement.
                        </p>
                      </div>

                      <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                          <span className="font-medium text-orange-800">Action requise</span>
                        </div>
                        <p className="text-sm text-orange-700">
                          Concurrence accrue détectée. L'IA suggère de créer du contenu vidéo pour maintenir
                          l'engagement.
                        </p>
                        <Button size="sm" className="mt-2 bg-orange-600">
                          Créer maintenant
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "content" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Studio IA de Création</h2>
                  <p className="text-gray-600">L'IA crée automatiquement vos contenus avec CapCut, Canva et Adobe</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Galerie Média
                  </Button>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Créer avec IA
                  </Button>
                </div>
              </div>

              {/* Content Creation Dashboard */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Video className="h-5 w-5 text-purple-600" />
                      Création Automatique en Cours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                              <Video className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">CapCut API + Votre galerie</p>
                            </div>
                          </div>
                          <Badge className="bg-orange-100 text-orange-700">En cours</Badge>
                        </div>
                        <Progress value={75} className="mb-2" />
                        <p className="text-sm text-gray-600">Montage automatique: 75% - Ajout musique et effets...</p>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <ImageIcon className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">Carrousel Instagram - Témoignages</h4>
                              <p className="text-sm text-gray-600">Canva API + Design automatique</p>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-700">Terminé</Badge>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">
                            Prévisualiser
                          </Button>
                          <Button size="sm" className="bg-blue-600">
                            Publier
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <Film className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">Vidéo Publicitaire Facebook</h4>
                              <p className="text-sm text-gray-600">Adobe Premiere API + Effets pro</p>
                            </div>
                          </div>
                          <Badge className="bg-blue-100 text-blue-700">Planifié</Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Démarrage dans 2h - Analyse des meilleures heures de publication
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5 text-pink-600" />
                      Galerie IA
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={`/placeholder.svg?height=100&width=100&text=Media${i}`}
                              alt={`Media ${i}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <Button className="w-full" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter Médias
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Content Performance */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    Performance du Contenu IA
                  </CardTitle>
                  <CardDescription>Analyse automatique des performances après 3 jours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">+156%</div>
                      <div className="text-sm text-gray-600">Engagement moyen</div>
                      <div className="text-xs text-green-600 mt-1">vs contenu manuel</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">89%</div>
                      <div className="text-sm text-gray-600">Taux de réussite IA</div>
                      <div className="text-xs text-blue-600 mt-1">contenus performants</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">-67%</div>
                      <div className="text-sm text-gray-600">Temps de création</div>
                      <div className="text-xs text-purple-600 mt-1">économisé</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "ai-assistant" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Assistant IA Développeur</h2>
                  <p className="text-gray-600">Interface similaire à Cursor/VS Code pour créer des outils sur mesure</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
                {/* Code Editor */}
                <Card className="border-0 shadow-xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Code className="h-5 w-5 text-blue-600" />
                      Éditeur IA
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="bg-gray-900 text-green-400 font-mono text-sm h-full">
                      {/* Terminal-like header */}
                      <div className="bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-gray-700">
                        <div className="flex gap-1">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-300 text-xs">assistant-ia.js</span>
                      </div>

                      {/* Code content */}
                      <div className="p-4 h-96 overflow-y-auto">
                        <div className="space-y-1">
                          <div>
                            <span className="text-blue-400">{/* // IA Assistant - Création d'outils automatique */}</span>
                          </div>
                          <div>
                            <span className="text-purple-400">const</span>{" "}
                            <span className="text-yellow-400">aiAssistant</span> = {"{"}
                          </div>
                          <div className="ml-4">
                            <span className="text-cyan-400">prompt</span>:{" "}
                            <span className="text-green-300">"Créer un outil de gestion des stocks"</span>,
                          </div>
                          <div className="ml-4">
                            <span className="text-cyan-400">generateTool</span>:{" "}
                            <span className="text-purple-400">async function</span>() {"{"}
                          </div>
                          <div className="ml-8">
                            <span className="text-gray-400">{/* // L'IA analyse le prompt */}</span>
                          </div>
                          <div className="ml-8">
                            <span className="text-purple-400">const</span>{" "}
                            <span className="text-yellow-400">analysis</span> ={" "}
                            <span className="text-purple-400">await</span> <span className="text-cyan-400">this</span>.
                            <span className="text-yellow-400">analyzePrompt</span>();
                          </div>
                          <div className="ml-8">
                            <span className="text-gray-400">{/* // Génération automatique du code */}</span>
                          </div>
                          <div className="ml-8">
                            <span className="text-purple-400">const</span> <span className="text-yellow-400">code</span>{" "}
                            = <span className="text-purple-400">await</span> <span className="text-cyan-400">this</span>
                            .<span className="text-yellow-400">generateCode</span>(
                            <span className="text-yellow-400">analysis</span>);
                          </div>
                          <div className="ml-8">
                            <span className="text-gray-400">{/* // Création de l'interface */}</span>
                          </div>
                          <div className="ml-8">
                            <span className="text-purple-400">const</span> <span className="text-yellow-400">ui</span> ={" "}
                            <span className="text-purple-400">await</span> <span className="text-cyan-400">this</span>.
                            <span className="text-yellow-400">createUI</span>(
                            <span className="text-yellow-400">code</span>);
                          </div>
                          <div className="ml-8">
                            <span className="text-purple-400">return</span> <span className="text-yellow-400">ui</span>;
                          </div>
                          <div className="ml-4">{"}"}</div>
                          <div>{"}"}</div>
                          <div className="mt-4">
                            <span className="text-gray-400">{/* // Prompt utilisateur */}</span>
                          </div>
                          <div>
                            <span className="text-cyan-400">aiAssistant</span>.
                            <span className="text-yellow-400">prompt</span> = <span className="text-green-300">"</span>
                            <span className="text-green-300 animate-pulse">|</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Live Preview */}
                <Card className="border-0 shadow-xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Monitor className="h-5 w-5 text-green-600" />
                      Aperçu Temps Réel
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-white border rounded-lg h-96 p-4">
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Zap className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Outil en Création</h3>
                        <p className="text-gray-600 mb-4">L'IA génère votre outil personnalisé...</p>
                        <Progress value={45} className="mb-4" />
                        <div className="space-y-2 text-sm text-gray-500">
                          <div className="flex items-center justify-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Analyse du prompt terminée
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <Clock className="h-4 w-4 text-orange-500" />
                            Génération du code en cours...
                          </div>
                          <div className="flex items-center justify-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            Création de l'interface
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Prompt Input */}
              <Card className="border-0 shadow-xl">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Décrivez l'outil que vous voulez créer (ex: système de gestion des commandes, tableau de bord analytics, etc.)"
                        className="text-lg"
                      />
                    </div>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 px-8">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Créer avec IA
                    </Button>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Badge variant="outline">Gestion stocks</Badge>
                    <Badge variant="outline">CRM clients</Badge>
                    <Badge variant="outline">Analytics</Badge>
                    <Badge variant="outline">E-commerce</Badge>
                    <Badge variant="outline">Facturation</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 mt-12">
        <div className="container mx-auto">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center gap-3">
              <img src="/images/novacore-logo.svg" alt="NovaCore Logo" className="h-8 w-8" />
              <span className="text-xl font-bold">NovaCore</span>
            </div>
          </div>
          <div className="text-center text-gray-400 text-sm">
            <p className="mb-2">
              Made by <span className="font-semibold text-white">Samuel OBAM</span>, CEO of DL Solutions
            </p>
            <p className="mb-2">📞 +237 694 341 586 | 📍 Rue École de Police, Yaoundé</p>
            <p>✉️ sobam@daveandlucesolutions.com</p>
            <p className="mt-4 text-xs">
              &copy; 2024 DL Solutions SARL. Tous droits réservés. | Powered by NovaCore AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
