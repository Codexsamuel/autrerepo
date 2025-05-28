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
  MessageSquare,
  Heart,
  Shield,
  Settings,
} from "lucide-react"

export default function SavExcellencePage() {
  const programme = [
    {
      jour: "Jour 1",
      titre: "Fondamentaux du SAV Excellence",
      modules: [
        "Les enjeux du service après-vente moderne",
        "Psychologie de la réclamation client",
        "Communication empathique et écoute active",
        "Techniques de désescalade des conflits",
        "Atelier pratique : Gestion de cas difficiles",
      ],
    },
    {
      jour: "Jour 2",
      titre: "Outils et processus SAV",
      modules: [
        "Mise en place de processus SAV efficaces",
        "Outils digitaux et CRM pour le SAV",
        "Transformation des réclamations en opportunités",
        "Mesure de la satisfaction client",
        "Certification et évaluation finale",
      ],
    },
  ]

  const objectifs = [
    "Maîtriser les techniques de gestion des réclamations",
    "Développer une communication empathique",
    "Transformer les conflits en opportunités",
    "Utiliser les outils digitaux SAV",
    "Mesurer et améliorer la satisfaction client",
  ]

  const temoignages = [
    {
      nom: "Sophie Laurent",
      poste: "Responsable SAV chez TechnoPlus",
      note: 5,
      commentaire: "Formation transformatrice ! Notre taux de satisfaction client est passé de 75% à 92%.",
    },
    {
      nom: "Marc Rousseau",
      poste: "Manager SAV",
      note: 5,
      commentaire: "Approche très pratique avec des outils concrets. Équipe motivée et résultats immédiats.",
    },
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
              <Badge className="mb-4 bg-teal-100 text-teal-700">Formation Professionnelle</Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Service Après-Vente{" "}
                <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                  Excellence
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Transformez votre SAV en avantage concurrentiel et fidélisez vos clients grâce à un service d'exception.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-teal-500 mr-3" />
                  <div>
                    <div className="font-semibold">Durée</div>
                    <div className="text-gray-600">2 jours intensifs</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-teal-500 mr-3" />
                  <div>
                    <div className="font-semibold">Participants</div>
                    <div className="text-gray-600">6-10 personnes</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-teal-500 mr-3" />
                  <div>
                    <div className="font-semibold">Certification</div>
                    <div className="text-gray-600">Incluse</div>
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
                    <MessageSquare className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Prochaine session</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-teal-500 mr-3" />
                      <span>20-21 Février 2024</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-teal-500 mr-3" />
                      <span>Lyon + Distanciel</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-teal-500 mr-3" />
                      <span>4 places restantes</span>
                    </div>
                  </div>
                  <Progress value={80} className="mt-6" />
                  <p className="text-sm text-gray-600 mt-2">80% des places réservées</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu principal avec onglets similaires à la première formation */}
      <section className="py-16 px-4 bg-white">
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
                    Formation intensive de 2 jours pour transformer votre service après-vente en avantage concurrentiel.
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

            {/* Autres onglets similaires avec contenu adapté au SAV */}
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

                <Card className="bg-gradient-to-r from-teal-50 to-blue-50 border-0">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4">Méthodes pédagogiques</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <Heart className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                        <h4 className="font-semibold mb-2">Empathie</h4>
                        <p className="text-gray-600">Développement de l'intelligence émotionnelle</p>
                      </div>
                      <div className="text-center">
                        <Shield className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                        <h4 className="font-semibold mb-2">Gestion de crise</h4>
                        <p className="text-gray-600">Techniques de résolution de conflits</p>
                      </div>
                      <div className="text-center">
                        <Settings className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                        <h4 className="font-semibold mb-2">Outils</h4>
                        <p className="text-gray-600">Maîtrise des plateformes SAV</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Contenu des autres onglets similaire mais adapté */}
          </Tabs>
        </div>
      </section>
    </div>
  )
}
