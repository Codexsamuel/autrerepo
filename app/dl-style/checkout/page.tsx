"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { ArrowLeft, CreditCard, Truck, Shield, Lock, Check, Gift, Smartphone, Wallet } from "lucide-react"

export default function CheckoutPage() {
  const [selectedPayment, setSelectedPayment] = useState("card")
  const [selectedShipping, setSelectedShipping] = useState("standard")
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    zipCode: "",
    city: "",
    country: "France",
  })

  const cartItems = [
    {
      id: 1,
      name: "Casque Gaming RGB Pro X",
      price: 89.99,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "T-Shirt Premium DL Collection",
      price: 24.99,
      quantity: 2,
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = selectedShipping === "express" ? 9.99 : 0
  const tax = subtotal * 0.2
  const total = subtotal + shipping + tax

  const shippingOptions = [
    {
      id: "standard",
      name: "Livraison Standard",
      description: "3-5 jours ouvrés",
      price: 0,
      icon: Truck,
    },
    {
      id: "express",
      name: "Livraison Express",
      description: "24h (commande avant 15h)",
      price: 9.99,
      icon: Truck,
    },
  ]

  const paymentMethods = [
    {
      id: "card",
      name: "Carte Bancaire",
      description: "Visa, Mastercard, American Express",
      icon: "/images/visa-card.png",
      type: "image",
    },
    {
      id: "paypal",
      name: "PayPal",
      description: "Paiement sécurisé via PayPal",
      icon: "/images/paypal.png",
      type: "image",
    },
    {
      id: "orange",
      name: "Orange Money",
      description: "Paiement mobile Orange",
      icon: "/images/orange-money.png",
      type: "image",
    },
    {
      id: "mobile",
      name: "Mobile Money",
      description: "MTN Money, Moov Money",
      icon: "/images/mobile-money.png",
      type: "image",
    },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    if (step === 1) {
      // Validation des champs obligatoires
      const requiredFields = ["firstName", "lastName", "email", "phone", "address", "zipCode", "city"]
      const isValid = requiredFields.every((field) => formData[field as keyof typeof formData].trim() !== "")

      if (isValid) {
        setStep(2)
      } else {
        alert("Veuillez remplir tous les champs obligatoires")
      }
    }
  }

  const handlePayment = () => {
    // Redirection vers la page de confirmation selon le mode de paiement
    const paymentRoutes = {
      card: "/dl-style/paiement/carte",
      paypal: "/dl-style/paiement/paypal",
      orange: "/dl-style/paiement/orange-money",
      mobile: "/dl-style/paiement/mobile-money",
    }

    window.location.href = paymentRoutes[selectedPayment as keyof typeof paymentRoutes]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" asChild>
              <a href="/dl-style/panier" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour au panier
              </a>
            </Button>
            <div className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-green-600" />
              <span className="font-semibold">Commande Sécurisée</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-8">
            {[
              { num: 1, label: "Livraison", active: step >= 1 },
              { num: 2, label: "Paiement", active: step >= 2 },
              { num: 3, label: "Confirmation", active: step >= 3 },
            ].map((stepItem, index) => (
              <div key={stepItem.num} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    stepItem.active ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepItem.active && step > stepItem.num ? <Check className="h-4 w-4" /> : stepItem.num}
                </div>
                <span className={`ml-2 ${stepItem.active ? "text-indigo-600" : "text-gray-600"}`}>
                  {stepItem.label}
                </span>
                {index < 2 && <div className="w-16 h-px bg-gray-300 mx-4"></div>}
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
              {/* Step 1: Shipping Information */}
              <TabsContent value="1">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6">Informations de livraison</h2>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                        <Input
                          placeholder="Votre prénom"
                          className="w-full"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                        <Input
                          placeholder="Votre nom"
                          className="w-full"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                        <Input
                          type="email"
                          placeholder="votre@email.com"
                          className="w-full"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
                        <Input
                          type="tel"
                          placeholder="+33 1 23 45 67 89"
                          className="w-full"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Adresse *</label>
                        <Input
                          placeholder="123 Rue de la Paix"
                          className="w-full"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Code postal *</label>
                        <Input
                          placeholder="75001"
                          className="w-full"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ville *</label>
                        <Input
                          placeholder="Paris"
                          className="w-full"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Pays *</label>
                        <select
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                          value={formData.country}
                          onChange={(e) => handleInputChange("country", e.target.value)}
                        >
                          <option>France</option>
                          <option>Belgique</option>
                          <option>Suisse</option>
                          <option>Canada</option>
                          <option>Côte d'Ivoire</option>
                          <option>Sénégal</option>
                          <option>Mali</option>
                          <option>Burkina Faso</option>
                        </select>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold mb-4">Options de livraison</h3>
                    <div className="space-y-4 mb-8">
                      {shippingOptions.map((option) => (
                        <label
                          key={option.id}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedShipping === option.id ? "border-indigo-500 bg-indigo-50" : "border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="shipping"
                            value={option.id}
                            checked={selectedShipping === option.id}
                            onChange={(e) => setSelectedShipping(e.target.value)}
                            className="mr-4"
                          />
                          <option.icon className="h-6 w-6 text-gray-600 mr-4" />
                          <div className="flex-1">
                            <div className="font-medium">{option.name}</div>
                            <div className="text-sm text-gray-600">{option.description}</div>
                          </div>
                          <div className="font-bold text-lg">{option.price === 0 ? "Gratuit" : `${option.price}€`}</div>
                        </label>
                      ))}
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-lg py-3"
                      onClick={handleNextStep}
                    >
                      Continuer vers le paiement
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Step 2: Payment */}
              <TabsContent value="2">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold mb-6">Méthode de paiement</h2>

                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                      {paymentMethods.map((method) => (
                        <label
                          key={method.id}
                          className={`flex items-center p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                            selectedPayment === method.id
                              ? "border-indigo-500 bg-indigo-50 shadow-lg"
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
                            <div className="w-16 h-12 flex items-center justify-center bg-white rounded-lg border">
                              <img
                                src={method.icon || "/placeholder.svg"}
                                alt={method.name}
                                className="max-w-full max-h-full object-contain"
                              />
                            </div>
                            <div>
                              <div className="font-semibold text-lg">{method.name}</div>
                              <div className="text-sm text-gray-600">{method.description}</div>
                            </div>
                          </div>
                          {selectedPayment === method.id && <Check className="h-6 w-6 text-indigo-600" />}
                        </label>
                      ))}
                    </div>

                    {selectedPayment === "card" && (
                      <div className="space-y-6 mb-8 p-6 bg-gray-50 rounded-lg border">
                        <h3 className="text-lg font-semibold flex items-center">
                          <CreditCard className="h-5 w-5 mr-2" />
                          Informations de carte
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Numéro de carte *</label>
                            <Input placeholder="1234 5678 9012 3456" className="w-full" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date d'expiration *</label>
                            <Input placeholder="MM/AA" className="w-full" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Code CVV *</label>
                            <Input placeholder="123" className="w-full" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nom sur la carte *</label>
                            <Input placeholder="Jean Dupont" className="w-full" />
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedPayment === "orange" && (
                      <div className="space-y-6 mb-8 p-6 bg-orange-50 rounded-lg border border-orange-200">
                        <h3 className="text-lg font-semibold flex items-center text-orange-700">
                          <Smartphone className="h-5 w-5 mr-2" />
                          Orange Money
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Numéro Orange Money *
                            </label>
                            <Input placeholder="07 XX XX XX XX" className="w-full" />
                          </div>
                          <div className="bg-orange-100 p-4 rounded-lg">
                            <p className="text-sm text-orange-800">
                              💡 Vous recevrez un SMS avec un code de confirmation à saisir pour valider le paiement.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedPayment === "mobile" && (
                      <div className="space-y-6 mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                        <h3 className="text-lg font-semibold flex items-center text-blue-700">
                          <Wallet className="h-5 w-5 mr-2" />
                          Mobile Money
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Opérateur *</label>
                            <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                              <option>MTN Money</option>
                              <option>Moov Money</option>
                              <option>Wave</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Numéro de téléphone *
                            </label>
                            <Input placeholder="05 XX XX XX XX" className="w-full" />
                          </div>
                          <div className="bg-blue-100 p-4 rounded-lg">
                            <p className="text-sm text-blue-800">
                              💡 Composez le code USSD qui vous sera envoyé pour confirmer le paiement.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedPayment === "paypal" && (
                      <div className="space-y-6 mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                        <h3 className="text-lg font-semibold flex items-center text-blue-700">
                          <img src="/images/paypal.png" alt="PayPal" className="h-6 w-6 mr-2" />
                          PayPal
                        </h3>
                        <div className="bg-blue-100 p-4 rounded-lg">
                          <p className="text-sm text-blue-800">
                            💡 Vous serez redirigé vers PayPal pour finaliser votre paiement en toute sécurité.
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-4">
                      <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                        Retour
                      </Button>
                      <Button
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-lg py-3"
                        onClick={handlePayment}
                      >
                        <Lock className="h-4 w-4 mr-2" />
                        Finaliser le paiement - {total.toFixed(2)}€
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="border-0 shadow-lg sticky top-4">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Récapitulatif</h3>

                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-gray-600">Qté: {item.quantity}</div>
                      </div>
                      <div className="font-bold">{(item.price * item.quantity).toFixed(2)}€</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 pt-4 border-t">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span>{subtotal.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Livraison</span>
                    <span>{shipping === 0 ? "Gratuite" : `${shipping.toFixed(2)}€`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TVA (20%)</span>
                    <span>{tax.toFixed(2)}€</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-indigo-600">{total.toFixed(2)}€</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2 text-green-600">
                    <Shield className="h-4 w-4" />
                    <span>Paiement 100% sécurisé</span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-600">
                    <Truck className="h-4 w-4" />
                    <span>Livraison suivie</span>
                  </div>
                  <div className="flex items-center space-x-2 text-orange-600">
                    <Gift className="h-4 w-4" />
                    <span>Retour gratuit 30 jours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
