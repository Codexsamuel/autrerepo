"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, Star, Zap, FlameIcon as Fire, Users, Eye } from "lucide-react"

export default function VentesFlashPage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30,
  })

  // Countdown timer
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
      originalPrice: 1479,
      flashPrice: 1199,
      discount: 19,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 2847,
      stock: 50,
      sold: 38,
      badge: "Mega Deal",
      viewers: 1247,
      category: "Smartphones",
    },
    {
      id: 2,
      name: "MacBook Air M3 13 pouces",
      originalPrice: 1499,
      flashPrice: 1099,
      discount: 27,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      reviews: 1923,
      stock: 30,
      sold: 22,
      badge: "Hot Deal",
      viewers: 892,
      category: "Ordinateurs",
    },
    {
      id: 3,
      name: "Samsung Galaxy S24 Ultra",
      originalPrice: 1419,
      flashPrice: 999,
      discount: 30,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      reviews: 3421,
      stock: 25,
      sold: 20,
      badge: "Flash Deal",
      viewers: 2156,
      category: "Smartphones",
    },
    {
      id: 4,
      name: "AirPods Pro 2ème génération",
      originalPrice: 299,
      flashPrice: 199,
      discount: 33,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      reviews: 1567,
      stock: 100,
      sold: 67,
      badge: "Best Seller",
      viewers: 3421,
      category: "Audio",
    },
    {
      id: 5,
      name: "PlayStation 5 + 2 manettes",
      originalPrice: 649,
      flashPrice: 499,
      discount: 23,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      reviews: 892,
      stock: 15,
      sold: 12,
      badge: "Limited",
      viewers: 567,
      category: "Gaming",
    },
    {
      id: 6,
      name: "Nintendo Switch OLED",
      originalPrice: 349,
      flashPrice: 279,
      discount: 20,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 2134,
      stock: 40,
      sold: 28,
      badge: "Popular",
      viewers: 1892,
      category: "Gaming",
    },
  ]

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Mega Deal":
        return "bg-purple-500"
      case "Hot Deal":
        return "bg-red-500"
      case "Flash Deal":
        return "bg-orange-500"
      case "Best Seller":
        return "bg-green-500"
      case "Limited":
        return "bg-yellow-500"
      case "Popular":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-red-500"
    if (percentage >= 60) return "bg-orange-500"
    if (percentage >= 40) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" asChild>
              <a href="/dl-style" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à la boutique
              </a>
            </Button>
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-orange-500" />
              <span className="font-bold text-xl">Ventes Flash</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Countdown */}
      <section className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">⚡ Ventes Flash 24H</h1>
          <p className="text-xl text-orange-100 mb-8">Offres limitées - Stocks limités</p>

          {/* Countdown Timer */}
          <div className="bg-black/30 rounded-2xl p-8 max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Temps restant :</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-white bg-white/20 rounded-lg p-4 mb-2">
                  {timeLeft.hours.toString().padStart(2, "0")}
                </div>
                <div className="text-orange-100">Heures</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-white bg-white/20 rounded-lg p-4 mb-2">
                  {timeLeft.minutes.toString().padStart(2, "0")}
                </div>
                <div className="text-orange-100">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-white bg-white/20 rounded-lg p-4 mb-2">
                  {timeLeft.seconds.toString().padStart(2, "0")}
                </div>
                <div className="text-orange-100">Secondes</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-6 text-white">
            <div className="text-center">
              <div className="text-3xl font-bold">6</div>
              <div className="text-sm text-orange-100">Deals actifs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">187</div>
              <div className="text-sm text-orange-100">Produits vendus</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">-33%</div>
              <div className="text-sm text-orange-100">Réduction max</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">10.2K</div>
              <div className="text-sm text-orange-100">Visiteurs actifs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Deals Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">🔥 Deals Flash Actifs</h2>
            <p className="text-gray-600">Dépêchez-vous, les stocks sont limités !</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {flashDeals.map((deal) => {
              const soldPercentage = Math.round((deal.sold / deal.stock) * 100)

              return (
                <Card
                  key={deal.id}
                  className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={deal.image || "/placeholder.svg"}
                        alt={deal.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Badges */}
                      <Badge className={`absolute top-3 left-3 ${getBadgeColor(deal.badge)} text-white`}>
                        {deal.badge}
                      </Badge>
                      <Badge className="absolute top-3 right-3 bg-red-500 text-white text-xl px-4 py-2">
                        -{deal.discount}%
                      </Badge>

                      {/* Live viewers */}
                      <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {deal.viewers} regardent
                      </div>

                      {/* Category */}
                      <div className="absolute bottom-3 right-3 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                        {deal.category}
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                        <Button size="icon" variant="secondary">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button className="bg-orange-500 hover:bg-orange-600" asChild>
                          <a href={`/dl-style/produit/${deal.id}`}>Voir le deal</a>
                        </Button>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-3 line-clamp-2">{deal.name}</h3>

                      {/* Rating */}
                      <div className="flex items-center mb-4">
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

                      {/* Prices */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-3xl font-bold text-orange-600">{deal.flashPrice}€</span>
                          <span className="text-lg text-gray-400 line-through">{deal.originalPrice}€</span>
                        </div>
                        <div className="text-green-600 font-semibold">
                          Économisez {deal.originalPrice - deal.flashPrice}€
                        </div>
                      </div>

                      {/* Stock Progress */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>
                            Vendus: {deal.sold}/{deal.stock}
                          </span>
                          <span>{soldPercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(soldPercentage)}`}
                            style={{ width: `${soldPercentage}%` }}
                          ></div>
                        </div>
                        <div className="text-center mt-2">
                          {soldPercentage >= 80 ? (
                            <span className="text-red-600 font-semibold text-sm">🔥 Presque épuisé !</span>
                          ) : soldPercentage >= 60 ? (
                            <span className="text-orange-600 font-semibold text-sm">⚡ Vente rapide</span>
                          ) : (
                            <span className="text-green-600 font-semibold text-sm">✅ Stock disponible</span>
                          )}
                        </div>
                      </div>

                      {/* Live activity */}
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          <span>{Math.floor(Math.random() * 10) + 1} personnes ont acheté dans la dernière heure</span>
                        </div>
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-lg py-4"
                        asChild
                      >
                        <a href={`/dl-style/produit/${deal.id}`}>
                          <Zap className="h-5 w-5 mr-2" />
                          Acheter maintenant
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Next Flash Sale Preview */}
      <section className="py-12 px-4 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">🔮 Prochaine Vente Flash</h2>
          <p className="text-gray-600 mb-8">Demain à 14h00 - Préparez-vous !</p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="font-bold mb-2">High-Tech</h3>
                <p className="text-gray-600 text-sm">Smartphones, tablettes, accessoires</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">👕</div>
                <h3 className="font-bold mb-2">Mode</h3>
                <p className="text-gray-600 text-sm">Vêtements, chaussures, accessoires</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🏠</div>
                <h3 className="font-bold mb-2">Maison</h3>
                <p className="text-gray-600 text-sm">Électroménager, décoration, jardin</p>
              </CardContent>
            </Card>
          </div>

          <Button className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600" size="lg">
            <Fire className="h-5 w-5 mr-2" />
            M'alerter de la prochaine vente flash
          </Button>
        </div>
      </section>
    </div>
  )
}
