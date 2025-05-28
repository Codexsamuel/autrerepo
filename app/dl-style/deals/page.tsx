"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ShoppingCart, Heart, Star, Clock, Zap, FlameIcon as Fire, Eye, Timer } from "lucide-react"

export default function DealsPage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const flashDeals = [
    {
      id: 1,
      name: "iPhone 15 Pro Max 256GB",
      price: 1299,
      originalPrice: 1479,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 2847,
      discount: 12,
      stock: 12,
      sold: 88,
      timeLeft: "23h 45m",
      category: "Smartphones",
    },
    {
      id: 2,
      name: "MacBook Air M3 13 pouces",
      price: 1199,
      originalPrice: 1499,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      reviews: 1923,
      discount: 20,
      stock: 8,
      sold: 92,
      timeLeft: "15h 22m",
      category: "Ordinateurs",
    },
    {
      id: 3,
      name: "Samsung Galaxy S24 Ultra",
      price: 1099,
      originalPrice: 1419,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      reviews: 3421,
      discount: 23,
      stock: 5,
      sold: 95,
      timeLeft: "8h 12m",
      category: "Smartphones",
    },
    {
      id: 4,
      name: "Sony WH-1000XM5",
      price: 299,
      originalPrice: 399,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 2134,
      discount: 25,
      stock: 15,
      sold: 85,
      timeLeft: "12h 30m",
      category: "Audio",
    },
  ]

  const dailyDeals = [
    {
      id: 5,
      name: "iPad Pro 12.9 M2",
      price: 899,
      originalPrice: 1199,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      reviews: 1567,
      discount: 25,
      category: "Tablettes",
      badge: "Deal du jour",
    },
    {
      id: 6,
      name: "Nintendo Switch OLED",
      price: 299,
      originalPrice: 349,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.5,
      reviews: 3892,
      discount: 14,
      category: "Gaming",
      badge: "Populaire",
    },
    {
      id: 7,
      name: "AirPods Pro 2",
      price: 229,
      originalPrice: 279,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      reviews: 4521,
      discount: 18,
      category: "Audio",
      badge: "Tendance",
    },
    {
      id: 8,
      name: "Apple Watch Series 9",
      price: 399,
      originalPrice: 449,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 2876,
      discount: 11,
      category: "Montres",
      badge: "Nouveau",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" asChild>
              <a href="/dl-style" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à DL Style
              </a>
            </Button>
            <div className="flex items-center space-x-2">
              <Fire className="h-5 w-5 text-red-500" />
              <span className="font-semibold text-xl">Deals du Jour</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-red-500 to-pink-600">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">🔥 Ventes Flash</h1>
          <p className="text-xl text-red-100 mb-8">Offres limitées - Dépêchez-vous !</p>

          {/* Countdown Timer */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white">
              <div className="text-3xl font-bold">{timeLeft.hours.toString().padStart(2, "0")}</div>
              <div className="text-sm">Heures</div>
            </div>
            <div className="text-white text-2xl">:</div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white">
              <div className="text-3xl font-bold">{timeLeft.minutes.toString().padStart(2, "0")}</div>
              <div className="text-sm">Minutes</div>
            </div>
            <div className="text-white text-2xl">:</div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white">
              <div className="text-3xl font-bold">{timeLeft.seconds.toString().padStart(2, "0")}</div>
              <div className="text-sm">Secondes</div>
            </div>
          </div>

          <Badge className="bg-yellow-400 text-yellow-900 text-lg px-6 py-2 animate-pulse">
            <Zap className="h-4 w-4 mr-2" />
            Jusqu'à -70% sur une sélection
          </Badge>
        </div>
      </section>

      {/* Flash Deals */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">⚡ Ventes Flash</h2>
            <Badge className="bg-red-100 text-red-700 text-lg px-4 py-2">
              <Timer className="h-4 w-4 mr-2" />
              Temps limité
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashDeals.map((deal) => (
              <Card key={deal.id} className="border-0 shadow-xl overflow-hidden group hover:shadow-2xl transition-all">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={deal.image || "/placeholder.svg"}
                      alt={deal.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-red-500 text-white animate-pulse">
                      <Fire className="h-3 w-3 mr-1" />-{deal.discount}%
                    </Badge>
                    <Badge className="absolute top-3 right-3 bg-orange-500 text-white">
                      <Clock className="h-3 w-3 mr-1" />
                      {deal.timeLeft}
                    </Badge>

                    {/* Stock Progress */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Vendu: {deal.sold}%</span>
                          <span>Stock: {deal.stock}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${deal.sold}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-xs text-gray-500 mb-1">{deal.category}</div>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{deal.name}</h3>

                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(deal.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">({deal.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-red-600">{deal.price}€</span>
                        <span className="text-lg text-gray-400 line-through ml-2">{deal.originalPrice}€</span>
                      </div>
                      <Badge className="bg-orange-100 text-orange-700">Plus que {deal.stock}</Badge>
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-red-500 hover:bg-red-600" asChild>
                        <a href="/dl-style/panier">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Acheter
                        </a>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <a href={`/dl-style/produit/${deal.id}`}>
                          <Eye className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Deals */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">🎯 Deals du Jour</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dailyDeals.map((deal) => (
              <Card key={deal.id} className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={deal.image || "/placeholder.svg"}
                      alt={deal.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-indigo-600 to-purple-600">
                      {deal.badge}
                    </Badge>
                    <Badge className="absolute top-3 right-3 bg-green-500 text-white">-{deal.discount}%</Badge>
                  </div>

                  <div className="p-6">
                    <div className="text-xs text-gray-500 mb-1">{deal.category}</div>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{deal.name}</h3>

                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(deal.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">({deal.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-indigo-600">{deal.price}€</span>
                        <span className="text-lg text-gray-400 line-through ml-2">{deal.originalPrice}€</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600" asChild>
                        <a href="/dl-style/panier">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Ajouter
                        </a>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <a href={`/dl-style/produit/${deal.id}`}>
                          <Eye className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">🔔 Ne ratez plus aucun deal !</h2>
          <p className="text-indigo-100 mb-8">Soyez alerté en premier des meilleures offres</p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre email..."
              className="flex-1 px-4 py-3 rounded-l-lg border-0 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-indigo-600 hover:bg-gray-100 rounded-l-none px-6">S'abonner</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
