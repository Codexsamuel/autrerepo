"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Smartphone, Shield, CheckCircle, AlertCircle, MessageSquare } from "lucide-react"



export default function OrangeMoneyPaymentPage() {
  const [step, setStep] = useState(1) // 1: Phone, 2: Code, 3: Processing, 4: Success
  const [phoneNumber, setPhoneNumber] = useState("")
  const [confirmationCode, setConfirmationCode] = useState("")
  const [error, setError] = useState("")
  const total = 149.97

  const handleSendCode = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Numéro de téléphone invalide")
      return
    }
    setError("")
    setStep(2)
  }

  const handleConfirmPayment = () => {
    if (!confirmationCode || confirmationCode.length < 4) {
      setError("Code de confirmation invalide")
      return
    }
    setError("")
    setStep(3)

    // Simulation du traitement
    setTimeout(() => {
      setStep(4)
    }, 3000)
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="animate-pulse">
              <img src="/images/orange-money.png" alt="Orange Money" className="h-16 mx-auto mb-6" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Traitement en cours...</h2>
            <p className="text-gray-600 mb-6">Validation de votre paiement Orange Money</p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Shield className="h-4 w-4" />
              <span>Connexion sécurisée Orange</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === 4) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-green-700 mb-4">Paiement Orange Money réussi !</h2>
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
              <img src="/images/orange-money.png" alt="Orange Money" className="h-6" />
              <span className="font-semibold">Orange Money</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <img src="/images/orange-money.png" alt="Orange Money" className="h-20 mx-auto mb-6" />
                <h1 className="text-3xl font-bold mb-2">Paiement Orange Money</h1>
                <p className="text-gray-600">
                  Montant à payer: <span className="font-bold text-2xl text-orange-600">{total.toFixed(2)}€</span>
                </p>
              </div>

              {step === 1 && (
                <div className="space-y-6">
                  <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <Smartphone className="h-6 w-6 text-orange-600" />
                      <h3 className="text-lg font-semibold text-orange-800">Étape 1: Numéro de téléphone</h3>
                    </div>
                    <p className="text-orange-700 text-sm">
                      Saisissez votre numéro Orange Money pour recevoir le code de confirmation.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Numéro Orange Money *</label>
                    <Input
                      placeholder="07 XX XX XX XX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className={`w-full text-lg ${error ? "border-red-500" : ""}`}
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {error}
                      </p>
                    )}
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      💡 Assurez-vous que votre compte Orange Money dispose du solde suffisant ({total.toFixed(2)}€)
                    </p>
                  </div>

                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-4" onClick={handleSendCode}>
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Envoyer le code de confirmation
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <MessageSquare className="h-6 w-6 text-green-600" />
                      <h3 className="text-lg font-semibold text-green-800">Étape 2: Code de confirmation</h3>
                    </div>
                    <p className="text-green-700 text-sm">
                      Un SMS avec un code de confirmation a été envoyé au <strong>{phoneNumber}</strong>
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Code de confirmation *</label>
                    <Input
                      placeholder="Entrez le code reçu par SMS"
                      value={confirmationCode}
                      onChange={(e) => setConfirmationCode(e.target.value)}
                      className={`w-full text-lg text-center ${error ? "border-red-500" : ""}`}
                      maxLength={6}
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {error}
                      </p>
                    )}
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      ⏰ Le code expire dans 5 minutes. Si vous ne l'avez pas reçu, vérifiez votre numéro.
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                      Modifier le numéro
                    </Button>
                    <Button
                      className="flex-1 bg-orange-600 hover:bg-orange-700 text-lg py-4"
                      onClick={handleConfirmPayment}
                    >
                      Confirmer le paiement
                    </Button>
                  </div>
                </div>
              )}

              {/* Sécurité */}
              <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-gray-600 text-sm">
                  <Shield className="h-4 w-4" />
                  <span>Paiement sécurisé par Orange Money</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
