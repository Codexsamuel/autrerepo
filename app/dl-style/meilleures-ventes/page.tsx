"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ShoppingCart,
  Heart,
  Star,
  ArrowLeft,
  Eye,
  Trophy,
  TrendingUp,
  Crown,
  Award,
  Filter,
  Grid,
  List,
} from "lucide-react"

export default function MeilleuresVentesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedRanking, setSelectedRanking] = useState("top-100")

  const bestSellers = [
    {
      id: 1,
      name: "iPhone 15 Pro Max 256GB",
      price: 1299,
      originalPrice: 1479,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 2847,
      category: "High-Tech",
      rank: 1,
      salesCount: 15420,
      badge: "N°1 des ventes",
      discount: 12,
      trending: "up",
      weeklyGrowth: "+23%",
    },
    {
      id: 2,
      name: "AirPods Pro 2ème génération",
      price: 249,
      originalPrice: 279,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      reviews: 1923,
      category: "Audio",
      rank: 2,
      salesCount: 12890,
      badge: "Bestseller",
      discount: 11,
      trending: "up",
      weeklyGrowth: "+18%",
    },
    {
      id: 3,
      name: "MacBook Air M3 13 pouces",
      price: 1199,
      originalPrice: 1499,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      reviews: 1567,
      category: "High-Tech",
      rank: 3,
      salesCount: 9876,
      badge: "Top vente",
      discount: 20,
      trending: "stable",
      weeklyGrowth: "+5%",
    },
    {
      id: 4,
      name: "Samsung Galaxy S24 Ultra",
      price: 1099,
      originalPrice: 1419,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      reviews: 2134,
      category: "High-Tech",
      rank: 4,
      salesCount: 8765,
      badge: "Favori client",
      discount: 23,
      trending: "up",
      weeklyGrowth: "+15%",
    },
    {
      id: 5,
      name: "PlayStation 5 Console",
      price: 549,
      originalPrice: 599,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 1876,
      category: "Gaming",
      rank: 5,
      salesCount: 7654,
      badge: "Gaming #1",
      discount: 8,
      trending: "up",
      weeklyGrowth: "+12%",
    },
    {
      id: 6,
      name: "Nike Air Force 1 '07",
      price: 109.99,
      originalPrice: 129.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.5,
      reviews: 3421,
      category: "Chaussures",
      rank: 6,
      salesCount: 6543,
      badge: "Classique",
      discount: 15,
      trending: "stable",
      weeklyGrowth: "+3%",
    },
  ]

  const rankings = [
    { id: "top-100", name: "Top 100", count: 100 },
    { id: "top-semaine", name: "Top semaine", count: 25 },
    { id: "coups-coeur", name: "Coups de cœur", count: 50 },
    { id: "recommandes", name: "Recommandés", count: 75 },
  ]

  const categories = [
    { name: "Tous", count: bestSellers.length },
    { name: "High-Tech", count: 3 },
    { name: "Audio", count: 1 },
    { name: "Gaming", count: 1 },
    { name: "Chaussures", count: 1 },
  ]

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />
    if (rank === 2) return <Award className="h-5 w-5 text-gray-400" />
    if (rank === 3) return <Trophy className="h-5 w-5 text-orange-500" />
    return <span className="text-lg font-bold text-gray-600">#{rank}</span>
  }

  const getTrendingIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-green-500" />
    return <div className="h-4 w-4 bg-gray-400 rounded-full" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild className="text-white hover:bg-white/20">
              <a href="/dl-style">
                <ArrowLeft className="h-5 w-5" />
              </a>
            </Button>
            <div>
              <h1 className="text-4xl font-bold flex items-center">
                <Trophy className="h-10 w-10 mr-4" />
                Meilleures Ventes
              </h1>
              <p className="text-yellow-100 text-lg">Les produits les plus populaires de DL Style</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-yellow-600">156,847</div>
              <div className="text-sm text-gray-600">Produits vendus ce mois</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">4.7★</div>
              <div className="text-sm text-gray-600">Note moyenne des bestsellers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">96%</div>
              <div className="text-sm text-gray-600">Clients satisfaits</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">24h</div>
              <div className="text-sm text-gray-600">Livraison express</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-1/4">
            {/* Filtres par classement */}
            <Card className="border-0 shadow-lg mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Trophy className="h-5 w-5 mr-2" />
                  Classements
                </h3>
                <div className="space-y-2">
                  {rankings.map((ranking) => (
                    <button
                      key={ranking.id}
                      onClick={() => setSelectedRanking(ranking.id)}
                      className={`w-full text-left px-3 py-3 rounded-lg transition-colors ${
                        selectedRanking === ranking.id ? "bg-yellow-100 text-yellow-700" : "hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{ranking.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {ranking.count}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Filtres par catégorie */}
            <Card className="border-0 shadow-lg mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Catégories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      className="w-full text-left px-3 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top vendeurs */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">🏆 Hall of Fame</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 bg-yellow-50 rounded">
                    <Crown className="h-5 w-5 text-yellow-500" />
                    <div>
                      <div className="font-medium text-sm">iPhone 15 Pro</div>
                      <div className="text-xs text-gray-600">15,420 ventes</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                    <Award className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-sm">AirPods Pro</div>
                      <div className="text-xs text-gray-600">12,890 ventes</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-orange-50 rounded">
                    <Trophy className="h-5 w-5 text-orange-500" />
                    <div>
                      <div className="font-medium text-sm">MacBook Air</div>
                      <div className="text-xs text-gray-600">9,876 ventes</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenu principal */}
          <div className="w-3/4">
            {/* En-tête */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Top des meilleures ventes</h2>
              <p className="text-gray-600">Classement basé sur les ventes et la satisfaction client</p>
            </div>

            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
              <div>
                <p className="text-gray-600">{bestSellers.length} produits dans le classement</p>
              </div>
              <div className="flex items-center space-x-4">
                <select className="border rounded-lg px-3 py-2">
                  <option>Classement général</option>
                  <option>Plus vendus</option>
                  <option>Mieux notés</option>
                  <option>Tendance croissante</option>
                </select>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Grille de produits */}
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-3" : "grid-cols-1"}`}>
              {bestSellers.map((product) => (
                <Card
                  key={product.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden relative"
                >
                  {/* Rang */}
                  <div className="absolute top-4 left-4 z-10 bg-white rounded-full p-2 shadow-lg">
                    {getRankIcon(product.rank)}
                  </div>

                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Badges */}
                      <div className="absolute top-3 right-3 flex flex-col space-y-2">
                        <Badge className="bg-gradient-to-r from-yellow-600 to-orange-600">{product.badge}</Badge>
                        {product.discount && <Badge className="bg-red-500 text-white">-{product.discount}%</Badge>}
                      </div>

                      {/* Tendance */}
                      <div className="absolute bottom-3 left-3 bg-white/90 rounded px-2 py-1 flex items-center space-x-1">
                        {getTrendingIcon(product.trending)}
                        <span className="text-xs font-medium text-green-600">{product.weeklyGrowth}</span>
                      </div>

                      {/* Actions */}
                      <div className="absolute bottom-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="secondary">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="secondary">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                      <h3 className="font-bold text-lg mb-3 text-gray-800 line-clamp-2">{product.name}</h3>

                      {/* Rating et ventes */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
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
                          <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                        </div>
                        <div className="text-xs text-gray-600">{product.salesCount.toLocaleString()} vendus</div>
                      </div>

                      {/* Prix */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-2xl font-bold text-yellow-600">{product.price}€</span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-400 line-through ml-2">{product.originalPrice}€</span>
                            )}
                          </div>
                          <Badge className="bg-green-100 text-green-700">En stock</Badge>
                        </div>
                      </div>

                      {/* Bouton */}
                      <Button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Ajouter au panier
                      </Button>

                      {/* Info livraison */}
                      <div className="text-xs text-gray-600 mt-3 text-center">
                        🚚 Livraison express 24h • ⭐ Bestseller garanti
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-16 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">🏆 Alertes Bestsellers</h2>
              <p className="mb-6">Restez informé des produits les plus populaires !</p>
              <div className="flex max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre email..."
                  className="flex-1 px-4 py-3 rounded-l-lg text-gray-900"
                />
                <Button className="bg-white text-yellow-600 hover:bg-gray-100 px-6 py-3 rounded-r-lg">S'abonner</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
