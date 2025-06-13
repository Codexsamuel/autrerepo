"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Calendar,
  MapPin,
  Clock,
  Users,
  Download,
  Mail,
  MessageSquare,
  ArrowRight,
  FileText,
  Video,
  Users2,
} from "lucide-react"

interface Formation {
  title: string
  duration: string
  level: string
  participants: string
  price: string
  nextSession: string
  location: string
  modules: string[]
}

export default function ConfirmationPage() {
  const params = useParams()
  const slug = typeof params?.slug === "string" ? params.slug : "televente-prospection"

  const formations: { [key: string]: Formation } = {
    "televente-prospection": {
      title: "Télévente & Prospection",
      duration: "3 jours",
      level: "Débutant à Intermédiaire",
      participants: "8-12 personnes",
      price: "160$",
      nextSession: "15-17 Février 2024",
      location: "Paris + Distanciel",
      modules: [
        "Techniques de prospection téléphonique",
        "Gestion des objections",
        "Closing et négociation",
        "Suivi client et fidélisation",
      ],
    },
    "sav-excellence": {
      title: "Service Après-Vente Excellence",
      duration: "2 jours",
      level: "Tous niveaux",
      participants: "6-10 personnes",
      price: "160$",
      nextSession: "22-24 Février 2024",
      location: "Lyon + Distanciel",
      modules: [
        "Gestion des réclamations",
        "Communication empathique",
        "Résolution de conflits",
        "Outils digitaux SAV",
      ],
    },
  }

  const formation = formations[slug] || formations["televente-prospection"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-teal-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Inscription confirmée !</h1>
            <p className="text-xl text-gray-600">
              Merci pour votre inscription à la formation {formation.title}
            </p>
          </div>

          {/* Order Details */}
          <Card className="border-0 shadow-lg mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6">Détails de votre inscription</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4">Informations de la formation</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-teal-600" />
                      <span>{formation.nextSession}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-teal-600" />
                      <span>{formation.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-teal-600" />
                      <span>{formation.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-teal-600" />
                      <span>{formation.participants}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Modules de la formation</h3>
                  <ul className="space-y-2">
                    {formation.modules.map((module, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0 mt-1" />
                        <span>{module}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="border-0 shadow-lg mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6">Prochaines étapes</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email de confirmation</h3>
                      <p className="text-sm text-gray-600">
                        Vous allez recevoir un email avec tous les détails de votre inscription et les documents nécessaires.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Groupe WhatsApp</h3>
                      <p className="text-sm text-gray-600">
                        Rejoignez le groupe WhatsApp de la formation pour échanger avec les autres participants.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Documents à préparer</h3>
                      <p className="text-sm text-gray-600">
                        Préparez votre CV et une lettre de motivation pour le premier jour de formation.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Video className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Préparation en ligne</h3>
                      <p className="text-sm text-gray-600">
                        Accédez à la plateforme de formation pour commencer votre préparation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-teal-600 to-blue-600" asChild>
              <a href="/mon-espace">
                Accéder à mon espace
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/formations">Voir d'autres formations</a>
            </Button>
          </div>

          {/* Support Section */}
          <div className="mt-12 text-center">
            <h3 className="font-semibold mb-2">Besoin d'aide ?</h3>
            <p className="text-gray-600 mb-4">
              Notre équipe est disponible pour répondre à toutes vos questions
            </p>
            <Button variant="ghost" className="text-teal-600" asChild>
              <a href="/contact">Contactez-nous</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 