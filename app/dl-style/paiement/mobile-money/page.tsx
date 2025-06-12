"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Smartphone, Shield, CheckCircle, AlertCircle, Hash } from "lucide-react"

export default function MobileMoneyPaymentPage() {
  const [step, setStep] = useState(1) // 1: Details, 2: USSD, 3: Processing, 4: Success
  const [operator, setOperator] = useState("mtn")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [ussdCode, setUssdCode] = useState("")
  const [error, setError] = useState("")
  const total = 149.97

  const operators = {
    mtn: { name: "MTN Money", code: "*165*", color: "yellow" },
    moov: { name: "Moov Money", code: "*555*", color: "blue" },
    wave: { name: "Wave", code: "*144*", color: "purple" },
  }

  const handleGenerateUSSD = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Numéro de téléphone invalide")
      return
    }
    setError("")

    // Génération du code USSD
    const code = `${operators[operator].code}${total.toFixed(0)}*${phoneNumber}#`
    setUssdCode(code)
    setStep(2)
  }

  const handleConfirmPayment = () => {
    setStep(3)

    // Simulation du traitement
    setTimeout(() => {
      setStep(4)
    }, 4000)
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="animate-pulse">
              <img src="/images/mobile-money.png" alt="Mobile Money" className="h-16 mx-auto mb-6" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Traitement en cours...</h2>
            <p className="text-gray-600 mb-6">Validation de votre paiement {operators[operator].name}</p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Shield className="h-4 w-4" />
              <span>Connexion sécurisée</span>
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
            <h2 className="text-2xl font-bold text-green-700 mb-4">Paiement Mobile Money réussi !</h2>
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
              <img src="/images/mobile-money.png" alt="Mobile Money" className="h-6" />
              <span className="font-semibold">Mobile Money</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <img src="/images/mobile-money.png" alt="Mobile Money" className="h-20 mx-auto mb-6" />
                <h1 className="text-3xl font-bold mb-2">Paiement Mobile Money</h1>
                <p className="text-gray-600">
                  Montant à payer: <span className="font-bold text-2xl text-blue-600">{total.toFixed(2)}€</span>
                </p>
              </div>

              {step === 1 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <Smartphone className="h-6 w-6 text-blue-600" />
                      <h3 className="text-lg font-semibold text-blue-800">Étape 1: Choisir l'opérateur</h3>
                    </div>
                    <p className="text-blue-700 text-sm">
                      Sélectionnez votre opérateur mobile et saisissez votre numéro.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Opérateur Mobile Money *</label>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(operators).map(([key, op]) => (
                        <label
                          key={key}
                          className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            operator === key ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="operator"
                            value={key}
                            checked={operator === key}
                            onChange={(e) => setOperator(e.target.value)}
                            className="sr-only"
                          />
                          <div
                            className={`w-12 h-12 rounded-full bg-${op.color}-500 mb-2 flex items-center justify-center text-white font-bold`}
                          >
                            {op.name.charAt(0)}
                          </div>
                          <span className="text-sm font-medium">{op.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Numéro de téléphone *</label>
                    <Input
                      placeholder="05 XX XX XX XX"
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

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      💡 Assurez-vous que votre compte {operators[operator].name} dispose du solde suffisant (
                      {total.toFixed(2)}€)
                    </p>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-4" onClick={handleGenerateUSSD}>
                    <Hash className="h-5 w-5 mr-2" />
                    Générer le code USSD
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <Hash className="h-6 w-6 text-green-600" />
                      <h3 className="text-lg font-semibold text-green-800">Étape 2: Code USSD généré</h3>
                    </div>
                    <p className="text-green-700 text-sm">Composez le code suivant sur votre téléphone {phoneNumber}</p>
                  </div>

                  <div className="bg-gray-900 p-6 rounded-lg">
                    <div className="text-center">
                      <p className="text-gray-400 text-sm mb-2">Code à composer :</p>
                      <div className="text-2xl font-mono text-green-400 bg-black p-4 rounded border-2 border-green-500">
                        {ussdCode}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={() => navigator.clipboard.writeText(ussdCode)}
                      >
                        Copier le code
                      </Button>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Instructions :</h4>
                    <ol className="text-sm text-blue-800 space-y-1">
                      <li>1. Composez le code USSD ci-dessus</li>
                      <li>2. Appuyez sur la touche d'appel</li>
                      <li>3. Suivez les instructions à l'écran</li>
                      <li>4. Confirmez le paiement avec votre code PIN</li>
                    </ol>
                  </div>

                  <div className="flex space-x-4">
                    <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                      Modifier les détails
                    </Button>
                    <Button
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-lg py-4"
                      onClick={handleConfirmPayment}
                    >
                      J'ai effectué le paiement
                    </Button>
                  </div>
                </div>
              )}

              {/* Sécurité */}
              <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-gray-600 text-sm">
                  <Shield className="h-4 w-4" />
                  <span>Paiement sécurisé par {operators[operator].name}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
