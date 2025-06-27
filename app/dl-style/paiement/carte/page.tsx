"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, CreditCard, Lock, Shield, CheckCircle, AlertCircle } from "lucide-react"



interface CardData {
  number: string
  expiry: string
  cvv: string
  name: string
}

interface CardErrors {
  number?: string
  expiry?: string
  cvv?: string
  name?: string
}

export default function CardPaymentPage() {
  const [step, setStep] = useState(1) // 1: Form, 2: Processing, 3: Success
  const [cardData, setCardData] = useState<CardData>({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })
  const [errors, setErrors] = useState<CardErrors>({})

  const total = 149.97

  const validateForm = () => {
    const newErrors: CardErrors = {}

    if (!cardData.number || cardData.number.length < 16) {
      newErrors.number = "Numéro de carte invalide"
    }
    if (!cardData.expiry || !/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
      newErrors.expiry = "Format MM/AA requis"
    }
    if (!cardData.cvv || cardData.cvv.length < 3) {
      newErrors.cvv = "Code de sécurité invalide"
    }
    if (!cardData.name) {
      newErrors.name = "Nom requis"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePayment = () => {
    if (validateForm()) {
      setStep(2)
      // Simulation du traitement
      setTimeout(() => {
        setStep(3)
      }, 3000)
    }
  }

  const formatCardNumber = (value: string): string => {
    return value
      .replace(/\s/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim()
      .slice(0, 19)
  }

  const formatExpiry = (value: string): string => {
    return value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2")
  }

  const handleInputChange = (field: keyof CardData, value: string) => {
    setCardData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleExpiryChange = (value: string) => {
    // Formatage automatique MM/AA
    const formatted = value
      .replace(/\D/g, "")
      .replace(/^(\d{2})/, "$1/")
      .substr(0, 5)
    handleInputChange("expiry", formatted)
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold mb-4">Traitement en cours...</h2>
            <p className="text-gray-600 mb-6">Veuillez patienter pendant que nous traitons votre paiement</p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Shield className="h-4 w-4" />
              <span>Connexion sécurisée SSL</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-green-700 mb-4">Paiement réussi !</h2>
            <p className="text-gray-600 mb-6">Votre commande a été confirmée</p>
            <div className="space-y-4">
              <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600" asChild>
                <a href="/dl-style/commande-confirmee">Voir ma commande</a>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <a href="/dl-style">Continuer mes achats</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" asChild>
              <a href="/dl-style/checkout" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au checkout
              </a>
            </Button>
            <div className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-green-600" />
              <span className="font-semibold">Paiement Sécurisé</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-indigo-600" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Paiement par carte</h1>
                <p className="text-gray-600">
                  Montant à payer: <span className="font-bold text-2xl text-indigo-600">{total.toFixed(2)}€</span>
                </p>
              </div>

              {/* Carte visuelle */}
              <div className="mb-8">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-12 h-8 bg-yellow-400 rounded"></div>
                      <img src="/images/visa-card.png" alt="Visa" className="h-8" />
                    </div>

                    <div className="mb-6">
                      <div className="text-xl font-mono tracking-wider">
                        {cardData.number ? formatCardNumber(cardData.number) : "•••• •••• •••• ••••"}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div>
                        <div className="text-xs opacity-75">TITULAIRE</div>
                        <div className="font-semibold">{cardData.name || "VOTRE NOM"}</div>
                      </div>
                      <div>
                        <div className="text-xs opacity-75">EXPIRE</div>
                        <div className="font-semibold">{cardData.expiry || "MM/AA"}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulaire */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Numéro de carte *</label>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    value={cardData.number}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\s/g, "").slice(0, 16)
                      handleInputChange("number", value)
                    }}
                    className={`w-full ${errors.number ? "border-red-500" : ""}`}
                  />
                  {errors.number && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.number}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date d'expiration *</label>
                    <Input
                      placeholder="MM/AA"
                      value={cardData.expiry}
                      onChange={(e) => {
                        handleExpiryChange(e.target.value)
                      }}
                      className={`w-full ${errors.expiry ? "border-red-500" : ""}`}
                    />
                    {errors.expiry && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.expiry}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Code CVV *</label>
                    <Input
                      placeholder="123"
                      value={cardData.cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 4)
                        handleInputChange("cvv", value)
                      }}
                      className={`w-full ${errors.cvv ? "border-red-500" : ""}`}
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.cvv}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom sur la carte *</label>
                  <Input
                    placeholder="Jean Dupont"
                    value={cardData.name}
                    onChange={(e) => handleInputChange("name", e.target.value.toUpperCase())}
                    className={`w-full ${errors.name ? "border-red-500" : ""}`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Sécurité */}
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2 text-green-700">
                    <Shield className="h-5 w-5" />
                    <span className="font-semibold">Paiement 100% sécurisé</span>
                  </div>
                  <p className="text-sm text-green-600 mt-1">Vos données sont protégées par un cryptage SSL 256 bits</p>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-lg py-4"
                  onClick={handlePayment}
                >
                  <Lock className="h-5 w-5 mr-2" />
                  Payer {total.toFixed(2)}€
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
