"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Clock,
  Users,
  Award,
  Calendar,
  MapPin,
  DollarSign,
  Brain,
  Bot,
  Database,
  Zap,
  BarChart3,
} from "lucide-react"

export default function IAEntreprisesPage() {
  const programme = [
    {
      jour: "Jour 1",
      titre: "Fondamentaux de l'IA",
      modules: [
        "Introduction à l'Intelligence Artificielle",
        "Types d'IA : Machine Learning, Deep Learning, NLP",
        "Cas d'usage en entreprise",
        "Éthique et IA responsable",
        "Atelier : Identification d'opportunités IA",
      ],
    },
    {
      jour: "Jour 2",
      titre: "IA Conversationnelle",
      modules: [
        "Chatbots et assistants virtuels",
        "Traitement du langage naturel (NLP)",
        "Plateformes no-code pour chatbots",
        "Intégration avec les systèmes existants",
        "Atelier pratique : Création d'un chatbot",
      ],
    },
    {
      jour: "Jour 3",
      titre: "Analyse de données IA",
      modules: [
        "Machine Learning pour l'analyse prédictive",
        "Outils d'analyse automatisée",
        "Visualisation de données intelligente",
        "ROI et mesure de performance",
        "Atelier : Analyse prédictive des ventes",
      ],
    },
    {
      jour: "Jour 4",
      titre: "Automatisation intelligente",
      modules: [
        "RPA (Robotic Process Automation)",
        "Automatisation des workflows",
        "IA pour la gestion documentaire",
        "Optimisation des processus métier",
        "Cas pratique : Automatisation complète",
      ],
    },
    {
      jour: "Jour 5",
      titre: "Implémentation et stratégie",
      modules: [
        "Stratégie de transformation IA",
        "Gestion du changement",
        "Formation des équipes",
        "Mesure du succès et KPI",
        "Projet final et certification",
      ],
    },
  ]

  const objectifs = [
    "Comprendre les fondamentaux de l'IA",
    "Identifier les opportunités IA dans votre entreprise",
    "Créer et déployer des chatbots intelligents",
    "Utiliser l'IA pour l'analyse prédictive",
    "Automatiser les processus avec l'IA",
    "Élaborer une stratégie IA complète",
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
              <Badge className="mb-4 bg-teal-100 text-teal-700">Formation Avancée</Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Intelligence Artificielle{" "}
                <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                  pour Entreprises
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Découvrez comment intégrer l'IA dans vos processus métier et transformer votre entreprise avec les
                technologies de demain.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-teal-500 mr-3" />
                  <div>
                    <div className="font-semibold">Durée</div>
                    <div className="text-gray-600">5 jours intensifs</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-teal-500 mr-3" />
                  <div>
                    <div className="font-semibold">Participants</div>
                    <div className="text-gray-600">6-8 personnes</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-teal-500 mr-3" />
                  <div>
                    <div className="font-semibold">Certification</div>
                    <div className="text-gray-600">IA Business Expert</div>
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
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Prochaine session</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-teal-500 mr-3" />
                      <span>25-29 Mars 2024</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-teal-500 mr-3" />
                      <span>Paris + Lab IA</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-teal-500 mr-3" />
                      <span>3 places restantes</span>
                    </div>
                  </div>
                  <Progress value={85} className="mt-6" />
                  <p className="text-sm text-gray-600 mt-2">85% des places réservées</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies couvertes */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Technologies IA couvertes</h2>
            <p className="text-gray-600">Maîtrisez les outils et plateformes IA les plus demandés</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <Bot className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Chatbots</h3>
                <p className="text-gray-600">DialogFlow, ChatGPT API, Rasa</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <Database className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Machine Learning</h3>
                <p className="text-gray-600">TensorFlow, Scikit-learn, AutoML</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <Zap className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Automatisation</h3>
                <p className="text-gray-600">Zapier, UiPath, Power Automate</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <BarChart3 className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Analytics IA</h3>
                <p className="text-gray-600">Tableau, Power BI, Google Analytics</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reste du contenu avec onglets similaires */}
    </div>
  )
}
