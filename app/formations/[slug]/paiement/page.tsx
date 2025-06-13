"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  CreditCard,
  Lock,
  Shield,
  CheckCircle,
  AlertCircle,
  Building2,
  Calendar,
  MapPin,
  Clock,
  Users,
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

export default function PaiementPage() {
  const params = useParams()
  const slug = typeof params?.slug === "string" ? params.slug : "televente-prospection"
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")

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

  const formation = formations[slug] || formations["televente-prospection"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simuler un délai de traitement
    await new Promise((resolve) => setTimeout(resolve, 2000))
    // Rediriger vers la page de confirmation
    window.location.href = `/formations/${slug}/confirmation`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Button variant="ghost" className="mb-8" asChild>
              <a href={`/formations/${slug}/inscription`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à l'inscription
              </a>
            </Button>
            <h1 className="text-3xl font-bold mb-4">Paiement de la formation</h1>
            <p className="text-gray-600">Finalisez votre inscription en effectuant le paiement</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Payment Form */}
            <div>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      {/* Payment Method Selection */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Méthode de paiement</h3>
                        <RadioGroup
                          value={paymentMethod}
                          onValueChange={setPaymentMethod}
                          className="space-y-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex items-center">
                              <CreditCard className="h-5 w-5 mr-2" />
                              Carte bancaire
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="transfer" id="transfer" />
                            <Label htmlFor="transfer" className="flex items-center">
                              <Building2 className="h-5 w-5 mr-2" />
                              Virement bancaire
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Card Details */}
                      {paymentMethod === "card" && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Numéro de carte</Label>
                            <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Date d'expiration</Label>
                              <Input id="expiry" placeholder="MM/AA" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input id="cvv" placeholder="123" required />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardName">Nom sur la carte</Label>
                            <Input id="cardName" placeholder="JEAN DUPONT" required />
                          </div>
                        </div>
                      )}

                      {/* Bank Transfer Details */}
                      {paymentMethod === "transfer" && (
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">Coordonnées bancaires</h4>
                            <div className="space-y-2 text-sm">
                              <p><strong>IBAN:</strong> FR76 XXXX XXXX XXXX XXXX XXXX XXX</p>
                              <p><strong>BIC:</strong> XXXXXXXX</p>
                              <p><strong>Titulaire:</strong> NovaWorld Formation</p>
                              <p><strong>Référence:</strong> {slug.toUpperCase()}-{Date.now().toString().slice(-6)}</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">
                            Le virement sera traité sous 24-48h. Vous recevrez un email de confirmation une fois le paiement validé.
                          </p>
                        </div>
                      )}

                      {/* Security Notice */}
                      <div className="flex items-start space-x-2 text-sm text-gray-600">
                        <Lock className="h-5 w-5 text-teal-600 flex-shrink-0 mt-1" />
                        <p>
                          Vos données de paiement sont sécurisées et cryptées. Nous utilisons Stripe pour traiter les paiements par carte.
                        </p>
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-teal-600 to-blue-600"
                        disabled={loading}
                      >
                        {loading ? "Traitement..." : "Payer maintenant"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-6">Récapitulatif de la commande</h3>
                  
                  <div className="space-y-6">
                    {/* Formation Details */}
                    <div>
                      <h4 className="font-medium mb-4">{formation.title}</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="h-4 w-4 text-teal-600" />
                          <span>{formation.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="h-4 w-4 text-teal-600" />
                          <span>{formation.nextSession}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <MapPin className="h-4 w-4 text-teal-600" />
                          <span>{formation.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Users className="h-4 w-4 text-teal-600" />
                          <span>{formation.participants}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-2">
                        <span>Formation</span>
                        <span>{formation.price}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Matériel pédagogique</span>
                        <span>Inclus</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Certification</span>
                        <span>Inclus</span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>{formation.price}</span>
                        </div>
                      </div>
                    </div>

                    {/* Security Badges */}
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="flex items-center">
                        <Shield className="h-4 w-4 mr-1" />
                        Paiement sécurisé
                      </Badge>
                      <Badge variant="secondary" className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Satisfaction garantie
                      </Badge>
                      <Badge variant="secondary" className="flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Support 7j/7
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 