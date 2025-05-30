import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Target, Award, Lightbulb, Heart, Globe } from "lucide-react"

export const metadata: Metadata = {
  title: "A propos de DL Solutions",
  description:
    "Decouvrez l'histoire, la mission et les valeurs de DL Solutions, votre partenaire digital de confiance.",
}

export default function AboutPage() {
  const stats = [
    { label: "Clients satisfaits", value: "500+", icon: Users },
    { label: "Projets realises", value: "1000+", icon: Target },
    { label: "Annees d'experience", value: "10+", icon: Award },
    { label: "Pays", value: "15+", icon: Globe },
  ]

  const values = [
    {
      title: "Innovation",
      description: "Nous restons a la pointe de la technologie pour offrir des solutions avant-gardistes.",
      icon: Lightbulb,
    },
    {
      title: "Excellence",
      description: "Nous visons l'excellence dans chaque projet et chaque interaction client.",
      icon: Award,
    },
    {
      title: "Passion",
      description: "Notre passion pour le digital nous pousse a depasser les attentes.",
      icon: Heart,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            A propos de nous
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Notre Histoire
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Depuis plus de 10 ans, DL Solutions accompagne les entreprises dans leur transformation digitale avec des
            solutions innovantes et personnalisees.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Notre Mission</h2>
            <p className="text-gray-600 mb-6">
              Nous democratisons l'acces aux technologies avancees pour permettre a chaque entreprise, quelle que soit
              sa taille, de beneficier des dernières innovations digitales.
            </p>
            <p className="text-gray-600 mb-6">
              Notre approche consiste a comprendre les defis uniques de chaque client et a developper des solutions sur
              mesure qui repondent precisement a leurs besoins.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
              Decouvrir nos services
            </Button>
          </div>
          <div className="relative">
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="Equipe DL Solutions"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <stat.icon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Valeurs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <value.icon className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-6">Pret a commencer votre transformation digitale ?</h2>
          <p className="text-xl mb-8 opacity-90">Contactez-nous des aujourd'hui pour discuter de votre projet</p>
          <Button size="lg" variant="secondary">
            Prendre rendez-vous
          </Button>
        </div>
      </div>
    </div>
  )
}
