"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Shield, CheckCircle, ExternalLink } from "lucide-react"



export default function PayPalPaymentPage() {
  const [step, setStep] = useState(1) // 1: Redirect, 2: Processing, 3: Success
  const total = 149.97

  useEffect(() => {
    // Simulation de redirection vers PayPal
    const timer = setTimeout(() => {
      setStep(2)
      // Simulation du retour de PayPal
      setTimeout(() => {
        setStep(3)
      }, 4000)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="animate-pulse">
              <img src="/images/paypal.png" alt="PayPal" className="h-16 mx-auto mb-6" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Traitement PayPal...</h2>
            <p className="text-gray-600 mb-6">Finalisation de votre paiement en cours</p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Shield className="h-4 w-4" />
              <span>Connexion sécurisée PayPal</span>
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
            <h2 className="text-2xl font-bold text-green-700 mb-4">Paiement PayPal réussi !</h2>
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
              <img src="/images/paypal.png" alt="PayPal" className="h-6" />
              <span className="font-semibold">Paiement PayPal</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="mb-8">
                <img src="/images/paypal.png" alt="PayPal" className="h-20 mx-auto mb-6" />
                <h1 className="text-3xl font-bold mb-2">Redirection vers PayPal</h1>
                <p className="text-gray-600">
                  Montant à payer: <span className="font-bold text-2xl text-blue-600">{total.toFixed(2)}€</span>
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold mb-2">Redirection en cours...</h3>
                <p className="text-gray-600 text-sm">
                  Vous allez être redirigé vers PayPal pour finaliser votre paiement en toute sécurité.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <Shield className="h-4 w-4" />
                  <span>Paiement 100% sécurisé par PayPal</span>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setStep(2)}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Continuer vers PayPal
                </Button>
              </div>

              <div className="mt-8 text-xs text-gray-500">
                <p>En continuant, vous acceptez les conditions d'utilisation de PayPal</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
