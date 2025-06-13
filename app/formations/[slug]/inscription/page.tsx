"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Clock,
  Users,
  BookOpen,
  Calendar,
  MapPin,
  CreditCard,
  Building2,
  Mail,
  Phone,
  User,
  FileText,
  CheckCircle,
} from "lucide-react"

interface Formation {
  title: string
  duration: string
  level: string
  participants: string
  price: string
  nextSession: string
  location: string
}

export default function InscriptionPage() {
  const params = useParams()
  const slug = params?.slug || "televente-prospection"
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const formations: { [key: string]: Formation } = {
    "televente-prospection": {
      title: "Télévente & Prospection",
      duration: "3 jours",
      level: "Débutant à Intermédiaire",
      participants: "8-12 personnes",
      price: "160$",
      nextSession: "15-17 Février 2024",
      location: "Paris + Distanciel",
    },
    "sav-excellence": {
      title: "Service Après-Vente Excellence",
      duration: "2 jours",
      level: "Tous niveaux",
      participants: "6-10 personnes",
      price: "160$",
      nextSession: "22-24 Février 2024",
      location: "Lyon + Distanciel",
    },
  }

  const formation = formations[typeof slug === "string" ? slug : slug[0]] || formations["televente-prospection"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simuler un délai de traitement
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setStep(2)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Button variant="ghost" className="mb-8" asChild>
              <a href={`/formations/${slug}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à la formation
              </a>
            </Button>
            <h1 className="text-3xl font-bold mb-4">Inscription à la formation</h1>
            <p className="text-gray-600">Complétez le formulaire ci-dessous pour vous inscrire</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 1 ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-600"
              }`}>
                1
              </div>
              <div className={`w-24 h-1 ${step >= 2 ? "bg-teal-600" : "bg-gray-200"}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 2 ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-600"
              }`}>
                2
              </div>
            </div>
          </div>

          {/* Formation Summary */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">{formation.title}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-teal-600" />
                  <span className="text-sm">{formation.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-teal-600" />
                  <span className="text-sm">{formation.participants}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-teal-600" />
                  <span className="text-sm">{formation.nextSession}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-teal-600" />
                  <span className="text-sm">{formation.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Registration Form */}
          {step === 1 ? (
            <form onSubmit={handleSubmit}>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Informations personnelles</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Prénom</Label>
                          <Input id="firstName" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Nom</Label>
                          <Input id="lastName" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email professionnel</Label>
                          <Input id="email" type="email" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input id="phone" type="tel" required />
                        </div>
                      </div>
                    </div>

                    {/* Company Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Informations entreprise</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Entreprise</Label>
                          <Input id="company" required />
                        </div>
                        <div className="space-y-2">
                                                   <Label htmlFor="position">Poste</Label>
                          <Input id="position" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Adresse</Label>
                          <Input id="address" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="siret">Numéro SIRET</Label>
                          <Input id="siret" required />
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Informations complémentaires</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="expectations">Attentes de la formation</Label>
                          <Textarea id="expectations" rows={4} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="experience">Expérience professionnelle</Label>
                          <Textarea id="experience" rows={4} />
                        </div>
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-start space-x-2">
                      <Checkbox id="terms" required />
                      <Label htmlFor="terms" className="text-sm">
                        J'accepte les conditions générales de vente et la politique de confidentialité
                      </Label>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-teal-600 to-blue-600"
                      disabled={loading}
                    >
                      {loading ? "Traitement..." : "Continuer vers le paiement"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          ) : (
            /* Payment Step */
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-teal-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Inscription confirmée !</h2>
                  <p className="text-gray-600">
                    Merci pour votre inscription. Un email de confirmation a été envoyé à votre adresse.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Prochaines étapes :</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-teal-600" />
                        <span>Vérifiez votre boîte mail pour les détails de la formation</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-teal-600" />
                        <span>Préparez les documents nécessaires</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-teal-600" />
                        <span>Rejoignez le groupe WhatsApp de la formation</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="flex-1" variant="outline" asChild>
                      <a href="/formations">Voir d'autres formations</a>
                    </Button>
                    <Button className="flex-1 bg-gradient-to-r from-teal-600 to-blue-600" asChild>
                      <a href="/mon-espace">Accéder à mon espace</a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
} 