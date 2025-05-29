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
  Sparkles,
  TrendingUp,
  Calendar,
  Filter,
  Grid,
  List,
} from "lucide-react"

export default function NouveautesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedPeriod, setSelectedPeriod] = useState("cette-semaine")

  const nouveautes = [
    {
      id: 1,
      name: "iPhone 16 Pro Max 512GB",
      price: 1599,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      reviews: 156,
      category: "High-Tech",
      badge: "Tout nouveau",
      dateAjout: "2024-01-15",
      trending: true,
      preOrder: false,
      colors: ["Titane naturel", "Titane bleu", "Titane blanc", "Titane noir"],
    },
    {
      id: 2,
      name: "MacBook Pro M4 14 pouces",
      price: 2199,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 89,
      category: "High-Tech",
      badge: "Exclusivité",
      dateAjout: "2024-01-14",
      trending: true,
      preOrder: true,
      colors: ["Gris sidéral", "Argent"],
    },
    {
      id: 3,
      name: "Samsung Galaxy S25 Ultra",
      price: 1449,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      reviews: 234,
      category: "High-Tech",
      badge: "Pré-commande",
      dateAjout: "2024-01-13",
      trending: false,
      preOrder: true,
      colors: ["Phantom Black", "Cream", "Green", "Lavender"],
    },
    {
      id: 4,
      name: "Collection Printemps 2024 - Robe Florale",
      price: 89.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      reviews: 67,
      category: "Mode",
      badge: "Tendance",
      dateAjout: "2024-01-12",
      trending: true,
      preOrder: false,
      colors: ["Bleu floral", "Rose floral", "Blanc floral"],
    },
    {
      id: 5,
      name: "Nike Air Max Plus 2024",
      price: 179.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 123,
      category: "Chaussures",
      badge: "Édition limitée",
      dateAjout: "2024-01-11",
      trending: true,
      preOrder: false,
      colors: ["Noir/Blanc", "Bleu/Argent", "Rouge/Noir"],
    },
    {
      id: 6,
      name: "Casque Gaming RGB Pro Max",
      price: 149.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.5,
      reviews: 45,
      category: "Gaming",
      badge: "Innovation",
      dateAjout: "2024-01-10",
      trending: false,
      preOrder: false,
      colors: ["Noir", "Blanc", "RGB"],
    },
  ]

  const periods = [
    { id: "cette-semaine", name: "Cette semaine", count: 6 },
    { id: "ce-mois", name: "Ce mois-ci", count: 24 },
    { id: "tendances", name: "Tendances", count: 12 },
    { id: "exclusivites", name: "Exclusivités", count: 8 },
  ]

  const categories = [
    { name: "Tous", count: nouveautes.length },
    { name: "High-Tech", count: 3 },
    { name: "Mode", count: 1 },
    { name: "Chaussures", count: 1 },
    { name: "Gaming", count: 1 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild className="text-white hover:bg-white/20">
              <a href="/dl-style">
                <ArrowLeft className="h-5 w-5" />
              </a>
            </Button>
            <div>
              <h1 className="text-4xl font-bold flex items-center">
                <Sparkles className="h-10 w-10 mr-4" />
                Nouveautés
              </h1>
              <p className="text-purple-100 text-lg">Découvrez les dernières tendances et innovations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">156</div>
              <div className="text-sm text-gray-600">Nouveaux produits cette semaine</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-600">24</div>
              <div className="text-sm text-gray-600">Exclusivités DL Style</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">89%</div>
              <div className="text-sm text-gray-600">Satisfaction client</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">48h</div>
              <div className="text-sm text-gray-600">Livraison express</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-1/4">
            {/* Filtres par période */}
            <Card className="border-0 shadow-lg mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Période
                </h3>
                <div className="space-y-2">
                  {periods.map((period) => (
                    <button
                      key={period.id}
                      onClick={() => setSelectedPeriod(period.id)}
                      className={`w-full text-left px-3 py-3 rounded-lg transition-colors ${
                        selectedPeriod === period.id ? "bg-purple-100 text-purple-700" : "hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{period.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {period.count}
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

            {/* Filtre Tendances */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Filtres
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-sm">🔥 Tendances</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-sm">⭐ Exclusivités</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-sm">📦 Pré-commandes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-sm">🎯 Éditions limitées</span>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenu principal */}
          <div className="w-3/4">
            {/* En-tête */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Dernières nouveautés</h2>
              <p className="text-gray-600">Découvrez les produits les plus récents de notre sélection</p>
            </div>

            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
              <div>
                <p className="text-gray-600">{nouveautes.length} nouveaux produits</p>
              </div>
              <div className="flex items-center space-x-4">
                <select className="border rounded-lg px-3 py-2">
                  <option>Plus récents</option>
                  <option>Plus populaires</option>
                  <option>Prix croissant</option>
                  <option>Prix décroissant</option>
                  <option>Meilleures notes</option>
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
              {nouveautes.map((product) => (
                <Card
                  key={product.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col space-y-2">
                        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 animate-pulse">
                          <Sparkles className="h-3 w-3 mr-1" />
                          {product.badge}
                        </Badge>
                        {product.trending && (
                          <Badge className="bg-orange-500 text-white">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Tendance
                          </Badge>
                        )}
                        {product.preOrder && <Badge className="bg-blue-500 text-white">📦 Pré-commande</Badge>}
                      </div>

                      {/* Date d'ajout */}
                      <div className="absolute top-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-xs">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        Nouveau
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

                      {/* Rating */}
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
                        <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                      </div>

                      {/* Couleurs disponibles */}
                      <div className="mb-4">
                        <div className="text-xs text-gray-600 mb-2">Couleurs disponibles:</div>
                        <div className="flex flex-wrap gap-1">
                          {product.colors.slice(0, 3).map((color, index) => (
                            <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {color}
                            </span>
                          ))}
                          {product.colors.length > 3 && (
                            <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
                          )}
                        </div>
                      </div>

                      {/* Prix */}
                      <div className="mb-4">
                        <span className="text-2xl font-bold text-purple-600">{product.price}€</span>
                      </div>

                      {/* Bouton */}
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {product.preOrder ? "Pré-commander" : "Ajouter au panier"}
                      </Button>

                      {/* Info livraison */}
                      <div className="text-xs text-gray-600 mt-3 text-center">
                        {product.preOrder ? "📅 Livraison prévue fin janvier" : "🚚 Livraison 24-48h"}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">🔔 Alertes Nouveautés</h2>
              <p className="mb-6">Soyez le premier à découvrir nos dernières nouveautés !</p>
              <div className="flex max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre email..."
                  className="flex-1 px-4 py-3 rounded-l-lg text-gray-900"
                />
                <Button className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 rounded-r-lg">S'abonner</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
