"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Clock,
  Users,
  Award,
  CheckCircle,
  Calendar,
  MapPin,
  DollarSign,
  Target,
  BarChart3,
  Search,
  Megaphone,
  Globe,
} from "lucide-react"

export default function MarketingDigitalPage() {
  const programme = [
    {
      jour: "Jour 1",
      titre: "Stratégie Marketing Digital",
      modules: [
        "Écosystème du marketing digital",
        "Définition de personas et buyer journey",
        "Stratégie de contenu et planning éditorial",
        "Budgétisation et allocation des ressources",
        "Atelier : Création d'une stratégie complète",
      ],
    },
    {
      jour: "Jour 2",
      titre: "SEO et Analytics",
      modules: [
        "Optimisation pour les moteurs de recherche",
        "Google Analytics 4 : configuration et analyse",
        "Search Console et outils SEO",
        "Analyse de la concurrence",
        "Atelier pratique : Audit SEO complet",
      ],
    },
    {
      jour: "Jour 3",
      titre: "Publicité en ligne",
      modules: [
        "Google Ads : campagnes Search et Display",
        "Facebook Ads et Instagram Ads",
        "LinkedIn Ads pour le B2B",
        "Retargeting et audiences personnalisées",
        "Atelier : Création de campagnes publicitaires",
      ],
    },
    {
      jour: "Jour 4",
      titre: "Mesure et optimisation",
      modules: [
        "KPI et métriques essentielles",
        "Tableaux de bord et reporting",
        "A/B testing et optimisation",
        "ROI et attribution marketing",
        "Projet final et certification",
      ],
    },
  ]

  const objectifs = [
    "Élaborer une stratégie marketing digital complète",
    "Maîtriser Google Analytics et les outils SEO",
    "Créer et optimiser des campagnes publicitaires",
    "Mesurer et analyser les performances",
    "Optimiser le ROI marketing",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <a href="/formations" className="flex items-center">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour aux formations
                </a>
              </Button>
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-teal-200 flex items-center justify-center bg-white shadow-md">
                <img src="/images/dl-logo.jpg" alt="DL Solutions Logo" className="h-10 w-10 object-contain" />
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="outline" className="border-teal-200 text-teal-700" asChild>
                <a href="/contact">Questions ?</a>
              </Button>
              <Button className="bg-gradient-to-r from-teal-600 to-blue-600">S'inscrire maintenant</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-teal-100 text-teal-700">Formation Complète</Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Marketing Digital &{" "}
                <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                  Analytics
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Maîtrisez les outils du marketing digital et l'analyse de performance pour développer votre présence en
                ligne.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-teal-500 mr-3" />
                  <div>
                    <div className="font-semibold">Durée</div>
                    <div className="text-gray-600">4 jours intensifs</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-teal-500 mr-3" />
                  <div>
                    <div className="font-semibold">Participants</div>
                    <div className="text-gray-600">8-12 personnes</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-teal-500 mr-3" />
                  <div>
                    <div className="font-semibold">Certification</div>
                    <div className="text-gray-600">Google Analytics + DL</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-teal-500 mr-3" />
                  <div>
                    <div className="font-semibold">Prix</div>
                    <div className="text-gray-600">160$</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-teal-600 to-blue-600">
                  S'inscrire maintenant
                </Button>
                <Button size="lg" variant="outline" className="border-teal-200 text-teal-700">
                  Télécharger le programme
                </Button>
              </div>
            </div>

            <div className="relative">
              <Card className="border-0 shadow-2xl">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Prochaine session</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-teal-500 mr-3" />
                      <span>5-8 Mars 2024</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-teal-500 mr-3" />
                      <span>Marseille + Distanciel</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-teal-500 mr-3" />
                      <span>5 places restantes</span>
                    </div>
                  </div>
                  <Progress value={70} className="mt-6" />
                  <p className="text-sm text-gray-600 mt-2">70% des places réservées</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Outils couverts */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Outils et plateformes</h2>
            <p className="text-gray-600">Maîtrisez les outils essentiels du marketing digital</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <Search className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">SEO</h3>
                <p className="text-gray-600">Google Analytics, Search Console, SEMrush</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <Megaphone className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Publicité</h3>
                <p className="text-gray-600">Google Ads, Facebook Ads, LinkedIn Ads</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <Globe className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Réseaux Sociaux</h3>
                <p className="text-gray-600">Meta Business, Hootsuite, Buffer</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <BarChart3 className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Analytics</h3>
                <p className="text-gray-600">Google Analytics 4, Data Studio, Hotjar</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contenu principal avec onglets */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <Tabs defaultValue="programme" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="programme">Programme</TabsTrigger>
              <TabsTrigger value="objectifs">Objectifs</TabsTrigger>
              <TabsTrigger value="formateur">Formateur</TabsTrigger>
              <TabsTrigger value="temoignages">Témoignages</TabsTrigger>
              <TabsTrigger value="inscription">Inscription</TabsTrigger>
            </TabsList>

            <TabsContent value="programme" className="mt-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Programme détaillé</h2>
                  <p className="text-gray-600 mb-8">
                    Formation complète de 4 jours pour maîtriser le marketing digital et l'analyse de performance.
                  </p>
                </div>

                <div className="grid gap-6">
                  {programme.map((jour, index) => (
                    <Card key={index} className="border-l-4 border-l-teal-500">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Badge variant="secondary" className="mr-4">
                            {jour.jour}
                          </Badge>
                          {jour.titre}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {jour.modules.map((module, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
                              <span>{module}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="objectifs" className="mt-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Objectifs pédagogiques</h2>
                  <p className="text-gray-600 mb-8">À l'issue de cette formation, vous serez capable de :</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {objectifs.map((objectif, index) => (
                    <Card key={index} className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-start">
                          <Target className="h-6 w-6 text-teal-500 mr-4 mt-1 flex-shrink-0" />
                          <span className="text-lg">{objectif}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Autres onglets avec contenu adapté */}
          </Tabs>
        </div>
      </section>
    </div>
  )
}
