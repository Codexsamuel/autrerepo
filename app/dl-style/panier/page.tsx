"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Truck,
  Shield,
  CreditCard,
  Gift,
  Tag,
  AlertCircle,
  Check,
  Lock,
} from "lucide-react"

interface Promo {
  code: string
  discount: number
  type: "percentage" | "amount"
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Casque Gaming RGB Pro X",
      price: 89.99,
      originalPrice: 129.99,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
      seller: "DL Tech Store",
      inStock: true,
      color: "Noir",
      size: "M",
    },
    {
      id: 2,
      name: "T-Shirt Premium DL Collection",
      price: 24.99,
      originalPrice: 39.99,
      quantity: 2,
      image: "/placeholder.svg?height=100&width=100",
      seller: "DL Fashion",
      inStock: true,
      color: "Blanc",
      size: "L",
    },
    {
      id: 3,
      name: "Montre Connectée Sport Pro",
      price: 199.99,
      originalPrice: 299.99,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
      seller: "DL Electronics",
      inStock: false,
      color: "Argent",
      size: "Unique",
    },
  ])

  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<Promo | null>(null)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode === "DL2024") {
      setAppliedPromo({ code: "DL2024", discount: 10, type: "percentage" })
    } else if (promoCode === "WELCOME15") {
      setAppliedPromo({ code: "WELCOME15", discount: 15, type: "amount" })
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const savings = cartItems.reduce((sum, item) => sum + (item.originalPrice - item.price) * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 4.99
  const promoDiscount = appliedPromo
    ? appliedPromo.type === "percentage"
      ? (subtotal * appliedPromo.discount) / 100
      : appliedPromo.discount
    : 0
  const total = subtotal + shipping - promoDiscount

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" asChild>
              <a href="/dl-style" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continuer mes achats
              </a>
            </Button>
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <span className="font-semibold">Mon Panier ({cartItems.length})</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Articles dans votre panier</h2>

                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Votre panier est vide</h3>
                    <p className="text-gray-500 mb-6">Découvrez nos produits et ajoutez-les à votre panier</p>
                    <Button className="bg-gradient-to-r from-indigo-600 to-purple-600" asChild>
                      <a href="/dl-style">Découvrir nos produits</a>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />

                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-sm text-gray-600">Vendu par {item.seller}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">Couleur: {item.color}</span>
                            <span className="text-sm text-gray-600">Taille: {item.size}</span>
                          </div>
                          {!item.inStock && (
                            <Badge className="mt-2 bg-red-100 text-red-700">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Rupture de stock
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <div className="text-xl font-bold text-indigo-600">
                            {(item.price * item.quantity).toFixed(2)}€
                          </div>
                          {item.originalPrice > item.price && (
                            <div className="text-sm text-gray-400 line-through">
                              {(item.originalPrice * item.quantity).toFixed(2)}€
                            </div>
                          )}
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Promo Code */}
            {cartItems.length > 0 && (
              <Card className="border-0 shadow-lg mt-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Code promo</h3>
                  <div className="flex space-x-3">
                    <Input
                      placeholder="Entrez votre code promo"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={applyPromoCode} variant="outline">
                      <Tag className="h-4 w-4 mr-2" />
                      Appliquer
                    </Button>
                  </div>
                  {appliedPromo && (
                    <div className="mt-3 p-3 bg-green-50 rounded-lg flex items-center">
                      <Check className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-green-700">
                        Code "{appliedPromo.code}" appliqué -
                        {appliedPromo.type === "percentage"
                          ? ` ${appliedPromo.discount}%`
                          : ` ${appliedPromo.discount}€`}{" "}
                        de réduction
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <div>
              <Card className="border-0 shadow-lg sticky top-4">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6">Récapitulatif de commande</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span>Sous-total ({cartItems.length} articles)</span>
                      <span>{subtotal.toFixed(2)}€</span>
                    </div>

                    {savings > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Économies</span>
                        <span>-{savings.toFixed(2)}€</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Livraison</span>
                      <span>{shipping === 0 ? "Gratuite" : `${shipping.toFixed(2)}€`}</span>
                    </div>

                    {promoDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Code promo</span>
                        <span>-{promoDiscount.toFixed(2)}€</span>
                      </div>
                    )}

                    <div className="border-t pt-4">
                      <div className="flex justify-between text-xl font-bold">
                        <span>Total</span>
                        <span className="text-indigo-600">{total.toFixed(2)}€</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-lg py-3 mb-4" asChild>
                    <a href="/dl-style/checkout">
                      <Lock className="h-5 w-5 mr-2" />
                      Passer la commande
                    </a>
                  </Button>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2 text-green-600">
                      <Truck className="h-4 w-4" />
                      <span>Livraison gratuite dès 50€</span>
                    </div>
                    <div className="flex items-center space-x-2 text-blue-600">
                      <Shield className="h-4 w-4" />
                      <span>Paiement 100% sécurisé</span>
                    </div>
                    <div className="flex items-center space-x-2 text-orange-600">
                      <Gift className="h-4 w-4" />
                      <span>Retour gratuit 30 jours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card className="border-0 shadow-lg mt-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Moyens de paiement acceptés</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 border rounded-lg text-center">
                      <CreditCard className="h-6 w-6 mx-auto mb-1" />
                      <span className="text-xs">Carte</span>
                    </div>
                    <div className="p-3 border rounded-lg text-center">
                      <span className="text-lg font-bold text-blue-600">PP</span>
                      <div className="text-xs">PayPal</div>
                    </div>
                    <div className="p-3 border rounded-lg text-center">
                      <span className="text-lg font-bold text-green-600">MM</span>
                      <div className="text-xs">Mobile Money</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
