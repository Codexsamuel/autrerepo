"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Shield,
  Lock,
  CheckCircle,
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  Clock,
  Users,
  Award,
  Star,
  Headphones,
  MessageSquare,
  AlertCircle,
} from "lucide-react"

export default function FormationsCheckoutPage() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1) // 1: Info, 2: Payment, 3: OTP, 4: Success
  const [selectedPayment, setSelectedPayment] = useState("card")
  const [otpCode, setOtpCode] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
  })
  const [errors, setErrors] = useState({})

  const formation = searchParams?.get("formation") || "televente-prospection"
  const price = searchParams?.get("price") || "160"

  const formationDetails = {
    "televente-prospection": {
      title: "Télévente & Prospection",
      duration: "3 jours",
      level: "Débutant à Intermédiaire",
      participants: "8-12 personnes",
      icon: Headphones,
      nextSession: "15-17 Février 2024",
      location: "Paris + Distanciel",
    },
    "sav-excellence": {
      title: "Service Après-Vente Excellence",
      duration: "2 jours",
      level: "Tous niveaux",
      participants: "6-10 personnes",
      icon: MessageSquare,
      nextSession: "22-24 Février 2024",
      location: "Lyon + Distanciel",
    },
  }

  const currentFormation = formationDetails[formation] || formationDetails["televente-prospection"]

  const paymentMethods = [
    {
      id: "card",
      name: "Carte Bancaire",
      description: "Visa, Mastercard, American Express",
      icon: CreditCard,
    },
    {
      id: "mobile",
      name: "Mobile Money",
      description: "Orange Money, MTN Money, Moov",
      icon: Smartphone,
    },
  ]

  const validateForm = () => {
    const newErrors = {}
    const requiredFields = ["firstName", "lastName", "email", "phone", "company"]

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = "Ce champ est requis"
      }
    })

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email invalide"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (step === 1 && validateForm()) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
      // Simulation envoi OTP
      setTimeout(() => {
        console.log("OTP envoyé")
      }, 1000)
    }
  }

  const handleOTPVerification = () => {
    if (otpCode.length === 6) {
      setStep(4)
      // Redirection vers le cours après 3 secondes
      setTimeout(() => {
        window.location.href = `/formations/${formation}/cours`
      }, 3000)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  if (step === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-700 mb-4">Inscription confirmée !</h2>
            <p className="text-gray-600 mb-6">
              Bienvenue dans la formation <strong>{currentFormation.title}</strong>
            </p>
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-green-700">
                📧 Un email de confirmation avec tous les détails vous a été envoyé
              </p>
            </div>
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-teal-600 to-blue-600" asChild>
                <a href={`/formations/${formation}/cours`}>Accéder au cours</a>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <a href="/formations">Voir toutes les formations</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <a href={`/formations/${formation}`} className="flex items-center">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour à la formation
                </a>
              </Button>
              <div className="h-12 w-12 flex items-center justify-center">
                <img src="/images/dl-logo.jpg" alt="DL Solutions Logo" className="h-10 w-10 object-contain" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-green-600" />
              <span className="font-semibold">Inscription Sécurisée</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-8">
            {[
              { num: 1, label: "Informations", active: step >= 1 },
              { num: 2, label: "Paiement", active: step >= 2 },
              { num: 3, label: "Vérification", active: step >= 3 },
              { num: 4, label: "Confirmation", active: step >= 4 },
            ].map((stepItem, index) => (
              <div key={stepItem.num} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    stepItem.active
                      ? "bg-gradient-to-r from-teal-600 to-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepItem.active && step > stepItem.num ? <CheckCircle className="h-5 w-5" /> : stepItem.num}
                </div>
                <span className={`ml-3 font-medium ${stepItem.active ? "text-teal-600" : "text-gray-600"}`}>
                  {stepItem.label}
                </span>
                {index < 3 && <div className="w-16 h-px bg-gray-300 mx-6"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={step.toString()} className="w-full">
              {/* Step 1: Personal Information */}
              <TabsContent value="1">
                <Card className="border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl">Informations personnelles</CardTitle>
                    <p className="text-gray-600">Complétez vos informations pour finaliser votre inscription</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <User className="h-4 w-4 inline mr-2" />
                          Prénom *
                        </label>
                        <Input
                          placeholder="Votre prénom"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className={errors.firstName ? "border-red-500" : ""}
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <User className="h-4 w-4 inline mr-2" />
                          Nom *
                        </label>
                        <Input
                          placeholder="Votre nom"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className={errors.lastName ? "border-red-500" : ""}
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="h-4 w-4 inline mr-2" />
                        Email professionnel *
                      </label>
                      <Input
                        type="email"
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="h-4 w-4 inline mr-2" />
                        Téléphone *
                      </label>
                      <Input
                        type="tel"
                        placeholder="+33 1 23 45 67 89"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Building className="h-4 w-4 inline mr-2" />
                          Entreprise *
                        </label>
                        <Input
                          placeholder="Nom de votre entreprise"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          className={errors.company ? "border-red-500" : ""}
                        />
                        {errors.company && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.company}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Poste (optionnel)</label>
                        <Input
                          placeholder="Votre fonction"
                          value={formData.position}
                          onChange={(e) => handleInputChange("position", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-blue-800">Informations importantes :</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Vous recevrez un email de confirmation avec tous les détails</li>
                        <li>• L'accès au cours sera disponible immédiatement après paiement</li>
                        <li>• Support pédagogique inclus pendant toute la durée de formation</li>
                      </ul>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-lg py-3"
                      onClick={handleNextStep}
                    >
                      Continuer vers le paiement
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Step 2: Payment Method */}
              <TabsContent value="2">
                <Card className="border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl">Méthode de paiement</CardTitle>
                    <p className="text-gray-600">Choisissez votre mode de paiement sécurisé</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4">
                      {paymentMethods.map((method) => (
                        <label
                          key={method.id}
                          className={`flex items-center p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                            selectedPayment === method.id
                              ? "border-teal-500 bg-teal-50 shadow-lg"
                              : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={selectedPayment === method.id}
                            onChange={(e) => setSelectedPayment(e.target.value)}
                            className="mr-4"
                          />
                          <div className="flex items-center space-x-4 flex-1">
                            <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-blue-600 rounded-lg flex items-center justify-center">
                              <method.icon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-lg">{method.name}</div>
                              <div className="text-sm text-gray-600">{method.description}</div>
                            </div>
                          </div>
                          {selectedPayment === method.id && <CheckCircle className="h-6 w-6 text-teal-600" />}
                        </label>
                      ))}
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-3 mb-3">
                        <Shield className="h-6 w-6 text-green-600" />
                        <h4 className="font-semibold text-green-800">Paiement 100% sécurisé</h4>
                      </div>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Cryptage SSL 256 bits</li>
                        <li>• Vérification par OTP (code à usage unique)</li>
                        <li>• Aucune donnée bancaire stockée</li>
                        <li>• Remboursement garanti sous 7 jours</li>
                      </ul>
                    </div>

                    <div className="flex space-x-4">
                      <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                        Retour
                      </Button>
                      <Button
                        className="flex-1 bg-gradient-to-r from-teal-600 to-blue-600 text-lg py-3"
                        onClick={handleNextStep}
                      >
                        <Lock className="h-4 w-4 mr-2" />
                        Procéder au paiement - {price}€
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Step 3: OTP Verification */}
              <TabsContent value="3">
                <Card className="border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl">Vérification sécurisée</CardTitle>
                    <p className="text-gray-600">Saisissez le code de vérification reçu</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MessageSquare className="h-10 w-10 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Code de vérification envoyé</h3>
                      <p className="text-gray-600 mb-6">
                        Un code à 6 chiffres a été envoyé à <strong>{formData.phone}</strong>
                      </p>
                    </div>

                    <div className="max-w-xs mx-auto">
                      <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                        Code de vérification
                      </label>
                      <Input
                        placeholder="000000"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        className="text-center text-2xl font-mono tracking-widest"
                        maxLength={6}
                      />
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-yellow-800">
                        ⏰ Le code expire dans <strong>5 minutes</strong>
                      </p>
                      <Button variant="link" className="text-yellow-700 p-0 h-auto mt-2">
                        Renvoyer le code
                      </Button>
                    </div>

                    <div className="flex space-x-4">
                      <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                        Retour
                      </Button>
                      <Button
                        className="flex-1 bg-gradient-to-r from-teal-600 to-blue-600 text-lg py-3"
                        onClick={handleOTPVerification}
                        disabled={otpCode.length !== 6}
                      >
                        Vérifier et finaliser
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="border-0 shadow-xl sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <currentFormation.icon className="h-6 w-6 mr-3 text-teal-600" />
                  Récapitulatif
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">{currentFormation.title}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {currentFormation.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {currentFormation.participants}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {currentFormation.nextSession}
                    </div>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-2" />
                      Certification incluse
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg">
                    <span>Formation</span>
                    <span>{price}€</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Support pédagogique</span>
                    <span className="text-green-600">Inclus</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Certification</span>
                    <span className="text-green-600">Incluse</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-teal-600">{price}€</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2 text-green-600">
                    <Shield className="h-4 w-4" />
                    <span>Paiement 100% sécurisé</span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-600">
                    <Award className="h-4 w-4" />
                    <span>Certification reconnue</span>
                  </div>
                  <div className="flex items-center space-x-2 text-orange-600">
                    <Star className="h-4 w-4" />
                    <span>Support à vie</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">🎯 Garantie de satisfaction</h4>
                  <p className="text-sm text-gray-600">
                    Remboursement intégral si vous n'êtes pas satisfait dans les 7 premiers jours
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
