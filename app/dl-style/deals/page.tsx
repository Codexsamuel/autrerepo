"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Star,
  Clock,
  FlameIcon as Fire,
  Filter,
  Grid,
  List,
  TrendingUp,
} from "lucide-react"

export default function DealsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("discount")

  const dealCategories = [
    { id: "all", name: "Tous les deals", count: 156, icon: "🔥" },
    { id: "flash", name: "Ventes flash", count: 24, icon: "⚡" },
    { id: "daily", name: "Deal du jour", count: 1, icon: "🎯" },
    { id: "weekend", name: "Offres weekend", count: 18, icon: "🎉" },
    { id: "clearance", name: "Déstockage", count: 45, icon: "💥" },
    { id: "bundle", name: "Packs promo", count: 32, icon: "📦" },
    { id: "seasonal", name: "Saisonnier", count: 36, icon: "🌟" },
  ]

  const deals = [
    {
      id: 1,
      name: "iPhone 15 Pro Max 256GB",
      originalPrice: 1479,
      salePrice: 1199,
      discount: 19,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 2847,
      timeLeft: "23h 45m",
      stock: 12,
      badge: "Deal du jour",
      category: "daily",
      badgeColor: "bg-red-500",
      savings: 280,
      sold: 1247,
    },
    {
      id: 2,
      name: "MacBook Air M3 13 pouces",
      originalPrice: 1499,
      salePrice: 1099,
      discount: 27,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      reviews: 1923,
      timeLeft: "15h 22m",
      stock: 8,
      badge: "Vente flash",
      category: "flash",
      badgeColor: "bg-orange-500",
      savings: 400,
      sold: 892,
    },
    {
      id: 3,
      name: "Samsung Galaxy S24 Ultra",
      originalPrice: 1419,
      salePrice: 999,
      discount: 30,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      reviews: 3421,
      timeLeft: "8h 12m",
      stock: 5,
      badge: "Mega Deal",
      category: "flash",
      badgeColor: "bg-purple-500",
      savings: 420,
      sold: 2156,
    },
    {
      id: 4,
      name: "AirPods Pro 2ème génération",
      originalPrice: 299,
      salePrice: 199,
      discount: 33,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      reviews: 1567,
      timeLeft: "2j 14h",
      stock: 25,
      badge: "Weekend",
      category: "weekend",
      badgeColor: "bg-blue-500",
      savings: 100,
      sold: 3421,
    },
    {
      id: 5,
      name: "PlayStation 5 + 2 manettes",
      originalPrice: 649,
      salePrice: 499,
      discount: 23,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      reviews: 892,
      timeLeft: "1j 8h",
      stock: 3,
      badge: "Pack promo",
      category: "bundle",
      badgeColor: "bg-green-500",
      savings: 150,
      sold: 567,
    },
    {
      id: 6,
      name: "Nintendo Switch OLED",
      originalPrice: 349,
      salePrice: 279,
      discount: 20,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 2134,
      timeLeft: "3j 2h",
      stock: 15,
      badge: "Déstockage",
      category: "clearance",
      badgeColor: "bg-yellow-500",
      savings: 70,
      sold: 1892,
    },
  ]

  const filteredDeals = selectedCategory === "all" ? deals : deals.filter((deal) => deal.category === selectedCategory)

  const sortedDeals = [...filteredDeals].sort((a, b) => {
    switch (sortBy) {
      case "discount":
        return b.discount - a.discount
      case "price":
        return a.salePrice - b.salePrice
      case "timeLeft":
        return a.timeLeft.localeCompare(b.timeLeft)
      case "popularity":
        return b.sold - a.sold
      default:
        return 0
    }
  })

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
              <Fire className="h-6 w-6 text-red-500" />
              <span className="font-bold text-xl">Deals & Promotions</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">🔥 Deals Exceptionnels</h1>
          <p className="text-xl text-red-100 mb-6">Jusqu'à -70% sur une sélection de produits</p>
          <div className="flex justify-center space-x-8 text-white">
            <div className="text-center">
              <div className="text-3xl font-bold">156</div>
              <div className="text-sm">Deals actifs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">24h</div>
              <div className="text-sm">Temps restant</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">-70%</div>
              <div className="text-sm">Réduction max</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-1/4">
            {/* Categories */}
            <Card className="border-0 shadow-lg mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Types de deals
                </h3>
                <div className="space-y-2">
                  {dealCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-3 rounded-lg transition-colors ${
                        selectedCategory === category.id ? "bg-red-100 text-red-700" : "hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="flex items-center">
                          <span className="mr-2">{category.icon}</span>
                          {category.name}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Discount Filter */}
            <Card className="border-0 shadow-lg mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Réduction</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-sm">Plus de 50%</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-sm">30% - 50%</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-sm">20% - 30%</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-sm">10% - 20%</span>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Time Filter */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Temps restant</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-sm">Moins de 24h</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-sm">1-3 jours</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-sm">Plus de 3 jours</span>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="w-3/4">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {selectedCategory === "all"
                    ? "Tous les deals"
                    : dealCategories.find((c) => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-gray-600">{sortedDeals.length} deals trouvés</p>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  className="border rounded-lg px-3 py-2"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="discount">Meilleure réduction</option>
                  <option value="price">Prix croissant</option>
                  <option value="timeLeft">Fin bientôt</option>
                  <option value="popularity">Plus populaire</option>
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

            {/* Deals Grid */}
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-2" : "grid-cols-1"}`}>
              {sortedDeals.map((deal) => (
                <Card
                  key={deal.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={deal.image || "/placeholder.svg"}
                        alt={deal.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Badges */}
                      <Badge className={`absolute top-3 left-3 ${deal.badgeColor} text-white`}>{deal.badge}</Badge>
                      <Badge className="absolute top-3 right-3 bg-red-500 text-white text-lg px-3 py-1">
                        -{deal.discount}%
                      </Badge>

                      {/* Timer */}
                      <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {deal.timeLeft}
                      </div>

                      {/* Stock */}
                      <div className="absolute bottom-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                        Plus que {deal.stock}
                      </div>

                      {/* Actions */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                        <Button size="icon" variant="secondary">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button className="bg-red-500 hover:bg-red-600" asChild>
                          <a href={`/dl-style/produit/${deal.id}`}>Voir le deal</a>
                        </Button>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">{deal.name}</h3>

                      {/* Rating */}
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
                        <div className="ml-auto flex items-center text-sm text-gray-500">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {deal.sold} vendus
                        </div>
                      </div>

                      {/* Prices */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-3xl font-bold text-red-600">{deal.salePrice}€</span>
                          <span className="text-lg text-gray-400 line-through ml-2">{deal.originalPrice}€</span>
                        </div>
                        <div className="text-right">
                          <div className="text-green-600 font-semibold">Économisez {deal.savings}€</div>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Vendus</span>
                          <span>{Math.round((deal.sold / (deal.sold + deal.stock)) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.round((deal.sold / (deal.sold + deal.stock)) * 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-lg py-3"
                        asChild
                      >
                        <a href={`/dl-style/produit/${deal.id}`}>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Profiter du deal
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Charger plus de deals
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
