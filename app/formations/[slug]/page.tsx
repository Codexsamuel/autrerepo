"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Clock,
  Users,
  Award,
  BookOpen,
  Brain,
  Headphones,
  MessageSquare,
  BarChart3,
  Palette,
  Smartphone,
  CheckCircle,
  Star,
  Calendar,
  MapPin,
  Download,
  Video,
  FileText,
  Users2,
  Target,
  BarChart,
  Lightbulb,
  Zap,
} from "lucide-react"

interface Formation {
  icon: any
  title: string
  description: string
  duration: string
  level: string
  participants: string
  price: string
  modules: string[]
  objectives: string[]
  prerequisites: string[]
  nextSession: string
  location: string
  instructor: {
    name: string
    role: string
    experience: string
    rating: number
  }
  program: {
    title: string
    description: string
    duration: string
    type: "video" | "document" | "exercise" | "quiz"
  }[]
}

export default function FormationPage() {
  const params = useParams()
  const slug = params?.slug || "televente-prospection"

  const formations: { [key: string]: Formation } = {
    "televente-prospection": {
      icon: Headphones,
      title: "Télévente & Prospection",
      description: "Maîtrisez les techniques de vente par téléphone et développez votre portefeuille client",
      duration: "3 jours",
      level: "Débutant à Intermédiaire",
      participants: "8-12 personnes",
      price: "160$",
      modules: [
        "Techniques de prospection téléphonique",
        "Gestion des objections",
        "Closing et négociation",
        "Suivi client et fidélisation",
      ],
      objectives: [
        "Maîtriser les techniques de prospection téléphonique",
        "Développer un portefeuille client qualifié",
        "Gérer efficacement les objections",
        "Optimiser le taux de conversion",
      ],
      prerequisites: [
        "Aucun prérequis technique",
        "Bonne maîtrise du français",
        "Expérience commerciale souhaitée",
      ],
      nextSession: "15-17 Février 2024",
      location: "Paris + Distanciel",
      instructor: {
        name: "Jean Dupont",
        role: "Expert en Télévente",
        experience: "15 ans d'expérience",
        rating: 4.9,
      },
      program: [
        {
          title: "Fondamentaux de la télévente",
          description: "Découvrez les bases de la télévente moderne",
          duration: "3h",
          type: "video",
        },
        {
          title: "Techniques de prospection",
          description: "Maîtrisez les techniques de prospection ciblée",
          duration: "4h",
          type: "video",
        },
        {
          title: "Gestion des objections",
          description: "Transformez les objections en opportunités",
          duration: "3h",
          type: "exercise",
        },
        {
          title: "Closing et négociation",
          description: "Finalisez vos ventes avec succès",
          duration: "4h",
          type: "video",
        },
      ],
    },
    "sav-excellence": {
      icon: MessageSquare,
      title: "Service Après-Vente Excellence",
      description: "Transformez votre SAV en avantage concurrentiel et fidélisez vos clients",
      duration: "2 jours",
      level: "Tous niveaux",
      participants: "6-10 personnes",
      price: "160$",
      modules: [
        "Gestion des réclamations",
        "Communication empathique",
        "Résolution de conflits",
        "Outils digitaux SAV",
      ],
      objectives: [
        "Gérer efficacement les réclamations clients",
        "Développer une communication empathique",
        "Résoudre les conflits de manière professionnelle",
        "Utiliser les outils digitaux du SAV",
      ],
      prerequisites: [
        "Expérience en service client souhaitée",
        "Bonne maîtrise du français",
        "Aptitude à la communication",
      ],
      nextSession: "22-24 Février 2024",
      location: "Lyon + Distanciel",
      instructor: {
        name: "Marie Laurent",
        role: "Experte en Service Client",
        experience: "12 ans d'expérience",
        rating: 4.8,
      },
      program: [
        {
          title: "Fondamentaux du SAV",
          description: "Comprendre les enjeux du service après-vente",
          duration: "3h",
          type: "video",
        },
        {
          title: "Communication client",
          description: "Maîtriser la communication empathique",
          duration: "4h",
          type: "exercise",
        },
        {
          title: "Gestion des réclamations",
          description: "Traiter efficacement les réclamations",
          duration: "3h",
          type: "video",
        },
        {
          title: "Outils digitaux",
          description: "Utiliser les outils modernes du SAV",
          duration: "2h",
          type: "document",
        },
      ],
    },
  }

  const formation = formations[typeof slug === "string" ? slug : slug[0]] || formations["televente-prospection"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <formation.icon className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">{formation.title}</h1>
            <p className="text-xl text-gray-600 mb-8">{formation.description}</p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="px-4 py-2">
                <Clock className="h-4 w-4 mr-2" />
                {formation.duration}
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <Users className="h-4 w-4 mr-2" />
                {formation.participants}
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                <BookOpen className="h-4 w-4 mr-2" />
                {formation.level}
              </Badge>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-teal-600 to-blue-600" asChild>
                <a href={`/formations/${slug}/inscription`}>
                  S'inscrire maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-teal-200 text-teal-700" asChild>
                <a href="#programme">Voir le programme</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="font-semibold mb-2">Objectifs clairs</h3>
              <p className="text-gray-600 text-sm">Des résultats mesurables et concrets</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users2 className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="font-semibold mb-2">Pratique intensive</h3>
              <p className="text-gray-600 text-sm">Exercices et mises en situation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="font-semibold mb-2">Certification</h3>
              <p className="text-gray-600 text-sm">Attestation de formation reconnue</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="font-semibold mb-2">Support continu</h3>
              <p className="text-gray-600 text-sm">Accompagnement personnalisé</p>
            </div>
          </div>
        </div>
      </section>

      {/* Program */}
      <section id="programme" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Programme de la formation</h2>
            <div className="space-y-6">
              {formation.program.map((module, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        {module.type === "video" ? (
                          <Video className="h-6 w-6 text-teal-600" />
                        ) : module.type === "document" ? (
                          <FileText className="h-6 w-6 text-teal-600" />
                        ) : module.type === "exercise" ? (
                          <Users2 className="h-6 w-6 text-teal-600" />
                        ) : (
                          <BarChart className="h-6 w-6 text-teal-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{module.title}</h3>
                          <Badge variant="secondary">{module.duration}</Badge>
                        </div>
                        <p className="text-gray-600">{module.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Objectives & Prerequisites */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Objectifs</h2>
                <ul className="space-y-3">
                  {formation.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0 mt-1" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-6">Prérequis</h2>
                <ul className="space-y-3">
                  {formation.prerequisites.map((prerequisite, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0 mt-1" />
                      <span>{prerequisite}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Votre formateur</h2>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {formation.instructor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{formation.instructor.name}</h3>
                    <p className="text-gray-600 mb-4">{formation.instructor.role}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        {formation.instructor.rating}/5
                      </div>
                      <div>{formation.instructor.experience}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Next Session */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Prochaine session</h2>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-teal-600" />
                        <span>{formation.nextSession}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-teal-600" />
                        <span>{formation.location}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-teal-600" />
                        <span>{formation.participants}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="text-3xl font-bold text-teal-600 mb-4">{formation.price}</div>
                    <p className="text-gray-600 mb-6">Formation certifiante incluse</p>
                    <Button size="lg" className="bg-gradient-to-r from-teal-600 to-blue-600" asChild>
                      <a href={`/formations/${slug}/inscription`}>
                        S'inscrire maintenant
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-teal-600 to-blue-600">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Prêt à vous former ?</h2>
            <p className="text-xl text-blue-100 mb-10">
              Rejoignez notre prochaine session et développez vos compétences dès maintenant.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100" asChild>
                <a href={`/formations/${slug}/inscription`}>
                  S'inscrire maintenant
                  <ArrowRight className="ml-2 h-6 w-6" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <a href="/contact">Nous contacter</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 