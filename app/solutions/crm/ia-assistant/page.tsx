"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Bot,
  Brain,
  Calendar,
  Clock,
  FileText,
  Image,
  MessageSquare,
  TrendingUp,
  Video,
  Zap,
  BarChart,
  Settings,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Sparkles,
  Target,
  Users,
  Heart,
  Share2,
  Eye,
  ThumbsUp,
  MessageCircle,
  Bookmark,
  Filter,
  Sliders,
  Wand2,
  Lightbulb,
  LineChart,
  PieChart,
  Activity,
} from "lucide-react"

export default function IAAssistantPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchQuery, setSearchQuery] = useState("")
  const [aiMode, setAiMode] = useState("auto") // auto, semi, manual

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête avec mode IA */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Assistant IA CRM</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Gestion automatique de votre stratégie de contenu et communication
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={aiMode} onValueChange={setAiMode}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Mode IA" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">
                  <div className="flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
                    <span>Automatique</span>
                  </div>
                </SelectItem>
                <SelectItem value="semi">
                  <div className="flex items-center">
                    <Wand2 className="w-4 h-4 mr-2 text-blue-500" />
                    <span>Semi-automatique</span>
                  </div>
                </SelectItem>
                <SelectItem value="manual">
                  <div className="flex items-center">
                    <Target className="w-4 h-4 mr-2 text-purple-500" />
                    <span>Manuel</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Bot className="w-4 h-4 mr-2" />
                  Nouvelle stratégie
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Configurer une nouvelle stratégie</DialogTitle>
                  <DialogDescription>
                    Définissez les paramètres pour l'IA
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="platform">Plateforme</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="tiktok">TikTok</SelectItem>
                        <SelectItem value="youtube">YouTube</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Fréquence de publication</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Toutes les heures</SelectItem>
                        <SelectItem value="daily">Quotidien</SelectItem>
                        <SelectItem value="weekly">Hebdomadaire</SelectItem>
                        <SelectItem value="biweekly">Bi-hebdomadaire</SelectItem>
                        <SelectItem value="monthly">Mensuel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contentType">Type de contenu</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="carousel">Carousel</SelectItem>
                        <SelectItem value="video">Vidéo</SelectItem>
                        <SelectItem value="story">Story</SelectItem>
                        <SelectItem value="post">Post</SelectItem>
                        <SelectItem value="reel">Reel</SelectItem>
                        <SelectItem value="live">Live</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tone">Ton de communication</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professionnel</SelectItem>
                        <SelectItem value="casual">Décontracté</SelectItem>
                        <SelectItem value="friendly">Amical</SelectItem>
                        <SelectItem value="formal">Formel</SelectItem>
                        <SelectItem value="humorous">Humoristique</SelectItem>
                        <SelectItem value="educational">Éducatif</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="keywords">Mots-clés cibles</Label>
                    <Input id="keywords" placeholder="Séparés par des virgules" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="hashtags">Hashtags</Label>
                    <Input id="hashtags" placeholder="Séparés par des virgules" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="competitors">Comptes concurrents à analyser</Label>
                    <Input id="competitors" placeholder="Séparés par des virgules" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="goals">Objectifs</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="awareness">Notoriété</SelectItem>
                        <SelectItem value="engagement">Engagement</SelectItem>
                        <SelectItem value="conversion">Conversion</SelectItem>
                        <SelectItem value="retention">Fidélisation</SelectItem>
                        <SelectItem value="sales">Ventes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end space-x-4">
                  <Button variant="outline">Annuler</Button>
                  <Button>
                    <Brain className="w-4 h-4 mr-2" />
                    Lancer l'IA
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="space-y-8">
          {/* Navigation */}
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid grid-cols-6 gap-4">
              <TabsTrigger value="dashboard">
                <BarChart className="w-4 h-4 mr-2" />
                Tableau de bord
              </TabsTrigger>
              <TabsTrigger value="content">
                <FileText className="w-4 h-4 mr-2" />
                Contenu
              </TabsTrigger>
              <TabsTrigger value="media">
                <Image className="w-4 h-4 mr-2" />
                Média
              </TabsTrigger>
              <TabsTrigger value="calendar">
                <Calendar className="w-4 h-4 mr-2" />
                Planning
              </TabsTrigger>
              <TabsTrigger value="analytics">
                <TrendingUp className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </TabsTrigger>
            </TabsList>

            {/* Tableau de bord amélioré */}
            <TabsContent value="dashboard" className="space-y-6">
              {/* KPIs principaux */}
              <div className="grid grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Contenu généré
                    </CardTitle>
                    <FileText className="w-4 h-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs text-blue-500">
                        +8 cette semaine
                      </p>
                      <LineChart className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Performance: 92%
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Engagement moyen
                    </CardTitle>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4.2%</div>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs text-green-500">
                        +0.8% vs semaine dernière
                      </p>
                      <Activity className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Objectif: 5%
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Publications planifiées
                    </CardTitle>
                    <Calendar className="w-4 h-4 text-purple-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs text-purple-500">
                        Prochaine dans 2h
                      </p>
                      <Clock className="w-4 h-4 text-purple-500" />
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Optimisé pour 15:00
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Taux de conversion
                    </CardTitle>
                    <Zap className="w-4 h-4 text-yellow-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2.8%</div>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs text-yellow-500">
                        +0.5% vs mois dernier
                      </p>
                      <PieChart className="w-4 h-4 text-yellow-500" />
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Objectif: 3.5%
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Métriques détaillées */}
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance par type de contenu</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Image className="w-4 h-4 text-blue-500" />
                          <span>Carousel</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-sm">
                            Engagement: 4.8%
                          </div>
                          <div className="text-sm text-green-500">
                            +0.3%
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Video className="w-4 h-4 text-purple-500" />
                          <span>Vidéo</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-sm">
                            Engagement: 5.2%
                          </div>
                          <div className="text-sm text-green-500">
                            +0.5%
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-yellow-500" />
                          <span>Post</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-sm">
                            Engagement: 3.9%
                          </div>
                          <div className="text-sm text-red-500">
                            -0.2%
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Engagement par plateforme</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Image className="w-4 h-4 text-pink-500" />
                          <span>Instagram</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-sm">
                            Engagement: 4.5%
                          </div>
                          <div className="text-sm text-green-500">
                            +0.4%
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-blue-500" />
                          <span>Facebook</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-sm">
                            Engagement: 3.8%
                          </div>
                          <div className="text-sm text-green-500">
                            +0.2%
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="w-4 h-4 text-blue-700" />
                          <span>LinkedIn</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-sm">
                            Engagement: 5.1%
                          </div>
                          <div className="text-sm text-green-500">
                            +0.6%
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Activité récente de l'IA */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Activité récente de l'IA</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filtrer
                      </Button>
                      <Button variant="outline" size="sm">
                        <Sliders className="w-4 h-4 mr-2" />
                        Trier
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Action</TableHead>
                        <TableHead>Plateforme</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Performance</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Création de carousel
                        </TableCell>
                        <TableCell>Instagram</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Eye className="w-4 h-4 text-blue-500" />
                            <span>1.2k vues</span>
                            <Heart className="w-4 h-4 text-red-500" />
                            <span>234 likes</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                            <span>Terminé</span>
                          </div>
                        </TableCell>
                        <TableCell>2024-03-15 14:30</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Réponse aux commentaires
                        </TableCell>
                        <TableCell>Facebook</TableCell>
                        <TableCell>Texte</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <MessageCircle className="w-4 h-4 text-blue-500" />
                            <span>45 réponses</span>
                            <ThumbsUp className="w-4 h-4 text-blue-500" />
                            <span>89 réactions</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                            <span>Terminé</span>
                          </div>
                        </TableCell>
                        <TableCell>2024-03-15 13:45</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Montage vidéo
                        </TableCell>
                        <TableCell>LinkedIn</TableCell>
                        <TableCell>Vidéo</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Eye className="w-4 h-4 text-blue-500" />
                            <span>856 vues</span>
                            <Share2 className="w-4 h-4 text-green-500" />
                            <span>45 partages</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 text-yellow-500 mr-2" />
                            <span>En cours</span>
                          </div>
                        </TableCell>
                        <TableCell>2024-03-15 12:15</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Suggestions IA */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Suggestions de l'IA</CardTitle>
                    <Button variant="outline" size="sm">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Voir toutes les suggestions
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-start space-x-4">
                        <Brain className="w-6 h-6 text-blue-500 mt-1" />
                        <div>
                          <h4 className="font-medium">Optimisation des horaires</h4>
                          <p className="text-sm text-gray-600">
                            L'analyse montre que les publications entre 18h et 20h génèrent 35% plus d'engagement. 
                            Suggestion : décaler les publications de 15h à 19h.
                          </p>
                          <div className="mt-2 flex space-x-2">
                            <Button size="sm">Appliquer</Button>
                            <Button size="sm" variant="outline">Ignorer</Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-start space-x-4">
                        <Target className="w-6 h-6 text-purple-500 mt-1" />
                        <div>
                          <h4 className="font-medium">Nouvelle tendance détectée</h4>
                          <p className="text-sm text-gray-600">
                            Le hashtag #InnovationTech est en forte croissance (+120% ce mois-ci).
                            Suggestion : créer une série de contenus sur ce thème.
                          </p>
                          <div className="mt-2 flex space-x-2">
                            <Button size="sm">Créer contenu</Button>
                            <Button size="sm" variant="outline">Plus tard</Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-start space-x-4">
                        <Wand2 className="w-6 h-6 text-green-500 mt-1" />
                        <div>
                          <h4 className="font-medium">Optimisation de contenu</h4>
                          <p className="text-sm text-gray-600">
                            Les vidéos courtes (15-30s) avec sous-titres génèrent 2x plus d'engagement.
                            Suggestion : adapter le format des prochaines vidéos.
                          </p>
                          <div className="mt-2 flex space-x-2">
                            <Button size="sm">Optimiser</Button>
                            <Button size="sm" variant="outline">Ignorer</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contenu */}
            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Contenu généré par l'IA</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-4">
                        <Select defaultValue="all">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filtrer par type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tous les types</SelectItem>
                            <SelectItem value="carousel">Carousel</SelectItem>
                            <SelectItem value="video">Vidéo</SelectItem>
                            <SelectItem value="post">Post</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select defaultValue="all">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filtrer par plateforme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Toutes les plateformes</SelectItem>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="linkedin">LinkedIn</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button>
                        <Brain className="w-4 h-4 mr-2" />
                        Générer nouveau contenu
                      </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {/* Exemple de contenu généré */}
                      <Card>
                        <CardContent className="p-4">
                          <div className="aspect-square bg-gray-100 rounded-lg mb-4" />
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Carousel Instagram</span>
                              <span className="text-xs text-gray-500">2h ago</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              Présentation de nos nouveaux services avec des visuels attractifs...
                            </p>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                Instagram
                              </span>
                              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                                Carousel
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="aspect-video bg-gray-100 rounded-lg mb-4" />
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Vidéo LinkedIn</span>
                              <span className="text-xs text-gray-500">5h ago</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              Témoignage client sur notre dernière innovation...
                            </p>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                LinkedIn
                              </span>
                              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                Vidéo
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <div className="aspect-square bg-gray-100 rounded-lg mb-4" />
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Post Facebook</span>
                              <span className="text-xs text-gray-500">1j ago</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              Annonce de notre prochain événement avec infographie...
                            </p>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                Facebook
                              </span>
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                Post
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Média */}
            <TabsContent value="media">
              <Card>
                <CardHeader>
                  <CardTitle>Bibliothèque média</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-4">
                        <Select defaultValue="all">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filtrer par type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tous les types</SelectItem>
                            <SelectItem value="image">Images</SelectItem>
                            <SelectItem value="video">Vidéos</SelectItem>
                            <SelectItem value="audio">Audio</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline">
                          <Image className="w-4 h-4 mr-2" />
                          Ajouter des médias
                        </Button>
                      </div>
                      <Button>
                        <Brain className="w-4 h-4 mr-2" />
                        Analyse IA
                      </Button>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      {/* Exemple de médias */}
                      {Array.from({ length: 8 }).map((_, i) => (
                        <Card key={i}>
                          <CardContent className="p-2">
                            <div className="aspect-square bg-gray-100 rounded-lg mb-2" />
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium">media_{i + 1}.jpg</span>
                                <span className="text-xs text-gray-500">2MB</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                                  Image
                                </span>
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                                  Utilisé
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Planning */}
            <TabsContent value="calendar">
              <Card>
                <CardHeader>
                  <CardTitle>Planning de publication</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-4">
                        <Select defaultValue="week">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Vue" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="day">Jour</SelectItem>
                            <SelectItem value="week">Semaine</SelectItem>
                            <SelectItem value="month">Mois</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline">
                          <Calendar className="w-4 h-4 mr-2" />
                          Ajouter au planning
                        </Button>
                      </div>
                      <Button>
                        <Brain className="w-4 h-4 mr-2" />
                        Optimiser planning
                      </Button>
                    </div>

                    <div className="grid grid-cols-7 gap-4">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <Card key={i}>
                          <CardHeader className="p-4">
                            <CardTitle className="text-sm">
                              {new Date(2024, 2, 18 + i).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' })}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="space-y-2">
                              <div className="p-2 bg-blue-50 rounded">
                                <p className="text-xs font-medium">Carousel Instagram</p>
                                <p className="text-xs text-gray-500">10:00</p>
                              </div>
                              <div className="p-2 bg-purple-50 rounded">
                                <p className="text-xs font-medium">Post LinkedIn</p>
                                <p className="text-xs text-gray-500">15:30</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics */}
            <TabsContent value="analytics">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance par plateforme</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] bg-gray-100 rounded-lg" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Engagement par type de contenu</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] bg-gray-100 rounded-lg" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tendances des hashtags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] bg-gray-100 rounded-lg" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Heures optimales de publication</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] bg-gray-100 rounded-lg" />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Paramètres */}
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Configuration de l'IA</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Style de communication</Label>
                      <Select defaultValue="professional">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professionnel</SelectItem>
                          <SelectItem value="casual">Décontracté</SelectItem>
                          <SelectItem value="friendly">Amical</SelectItem>
                          <SelectItem value="formal">Formel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Langue principale</Label>
                      <Select defaultValue="fr">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="en">Anglais</SelectItem>
                          <SelectItem value="es">Espagnol</SelectItem>
                          <SelectItem value="de">Allemand</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Fréquence d'analyse</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Toutes les heures</SelectItem>
                          <SelectItem value="daily">Quotidien</SelectItem>
                          <SelectItem value="weekly">Hebdomadaire</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Niveau d'automatisation</Label>
                      <Select defaultValue="high">
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Faible (validation requise)</SelectItem>
                          <SelectItem value="medium">Moyen (validation partielle)</SelectItem>
                          <SelectItem value="high">Élevé (automatique)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <Button variant="outline">Réinitialiser</Button>
                      <Button>Sauvegarder</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 