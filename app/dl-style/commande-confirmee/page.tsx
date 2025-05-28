"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Package,
  Truck,
  MapPin,
  Download,
  Share2,
  Star,
  ArrowRight,
  Mail,
  Phone,
  CreditCard,
} from "lucide-react"

export default function OrderConfirmedPage() {
  const [orderNumber] = useState("DL-2024-001234")
  const [estimatedDelivery] = useState("Vendredi 15 Mars 2024")

  const orderItems = [
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

  const orderTotal = 149.97
  const shippingAddress = {
    name: "Jean Dupont",
    address: "123 Rue de la Paix",
    city: "75001 Paris",
    country: "France",
  }

  const trackingSteps = [
    { status: "Commande confirmée", date: "Aujourd'hui 14:30", completed: true },
    { status: "Préparation", date: "Demain 09:00", completed: false },
    { status: "Expédition", date: "Jeudi 13 Mars", completed: false },
    { status: "Livraison", date: "Vendredi 15 Mars", completed: false },
  ]

  const relatedProducts = [
    {
      id: 3,
      name: "Clavier Mécanique RGB",
      price: 79.99,
      originalPrice: 99.99,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Souris Gaming Pro",
      price: 49.99,
      originalPrice: 69.99,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.5,
    },
    {
      id: 5,
      name: "Tapis de Souris XXL",
      price: 24.99,
      originalPrice: 34.99,
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.8,
    },
  ]

  useEffect(() => {
    // Simulation d'envoi d'email de confirmation
    console.log("Email de confirmation envoyé")
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <CheckCircle className="h-20 w-20 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Commande confirmée !</h1>
          <p className="text-xl text-green-100 mb-6">
            Merci pour votre achat. Votre commande a été traitée avec succès.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              <Download className="mr-2 h-5 w-5" />
              Télécharger la facture
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Share2 className="mr-2 h-5 w-5" />
              Partager
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Info */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Commande #{orderNumber}</h2>
                    <p className="text-gray-600">Passée le {new Date().toLocaleDateString("fr-FR")}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 text-lg px-4 py-2">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Confirmée
                  </Badge>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold">Préparation</div>
                    <div className="text-sm text-gray-600">1-2 jours ouvrés</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <Truck className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <div className="font-semibold">Expédition</div>
                    <div className="text-sm text-gray-600">2-3 jours ouvrés</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="font-semibold">Livraison</div>
                    <div className="text-sm text-gray-600">{estimatedDelivery}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Articles commandés</h3>
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-gray-600">Quantité: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{(item.price * item.quantity).toFixed(2)}€</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tracking */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6">Suivi de commande</h3>
                <div className="space-y-4">
                  {trackingSteps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {step.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium ${step.completed ? "text-green-700" : "text-gray-600"}`}>
                          {step.status}
                        </div>
                        <div className="text-sm text-gray-500">{step.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600" asChild>
                  <a href="/dl-style/suivi">
                    Suivre ma commande en détail
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Adresse de livraison</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-semibold">{shippingAddress.name}</div>
                  <div className="text-gray-600">{shippingAddress.address}</div>
                  <div className="text-gray-600">{shippingAddress.city}</div>
                  <div className="text-gray-600">{shippingAddress.country}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Récapitulatif</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span>{(orderTotal - 20).toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TVA</span>
                    <span>20.00€</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Livraison</span>
                    <span className="text-green-600">Gratuite</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-indigo-600">{orderTotal.toFixed(2)}€</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CreditCard className="h-4 w-4" />
                  <span>Payé par carte bancaire</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Besoin d'aide ?</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="mr-3 h-4 w-4" />
                    support@dlsolutions.com
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="mr-3 h-4 w-4" />
                    01 23 45 67 89
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Rate Experience */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Évaluez votre expérience</h3>
                <p className="text-gray-600 text-sm mb-4">Votre avis nous aide à améliorer nos services</p>
                <div className="flex justify-center space-x-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} className="text-yellow-400 hover:text-yellow-500">
                      <Star className="h-6 w-6 fill-current" />
                    </button>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  Laisser un avis
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Vous pourriez aussi aimer</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <Card key={product.id} className="border-0 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-0">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">{product.rating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold text-indigo-600">{product.price}€</span>
                        <span className="text-sm text-gray-400 line-through ml-2">{product.originalPrice}€</span>
                      </div>
                      <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600" asChild>
                        <a href={`/dl-style/produit/${product.id}`}>Voir</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">Et maintenant ?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" asChild>
              <a href="/dl-style">
                Continuer mes achats
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600" asChild>
              <a href="/dl-style/compte">
                Mon compte
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
