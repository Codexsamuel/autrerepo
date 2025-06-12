"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ShoppingCart,
  Heart,
  Star,
  ArrowLeft,
  Eye,
  Package,
  RotateCcw,
  Percent,
  AlertTriangle,
  Filter,
  Grid,
  List,
} from "lucide-react"

export default function OutletPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedType, setSelectedType] = useState("tous")

  const outletProducts = [
    {
      id: 1,
      name: "iPhone 14 Pro Max 128GB",
      originalPrice: 1329,
      outletPrice: 899,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      reviews: 1247,
      category: "High-Tech",
      type: "fin-serie",
      condition: "Neuf",
      stock: 12,
      discount: 32,
      reason: "Fin de série - Remplacé par iPhone 15",
      warranty: "12 mois",
      savings: 430,
    },
    {
      id: 2,
      name: "MacBook Pro M2 14 pouces",
      originalPrice: 2499,
      outletPrice: 1899,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 567,
      category: "High-Tech",
      type: "retours",
      condition: "Comme neuf",
      stock: 5,
      discount: 24,
      reason: "Retour client sous 14 jours",
      warranty: "12 mois",
      savings: 600,
    },
    {
      id: 3,
      name: "Samsung Galaxy S23 Ultra",
      originalPrice: 1419,
      outletPrice: 999,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      reviews: 892,
      category: "High-Tech",
      type: "destockage",
      condition: "Neuf",
      stock: 8,
      discount: 30,
      reason: "Déstockage magasin",
      warranty: "24 mois",
      savings: 420,
    },
    {
      id: 4,
      name: "PlayStation 5 Console",
      originalPrice: 599,
      outletPrice: 449,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      reviews: 1567,
      category: "Gaming",
      type: "occasions",
      condition: "Très bon état",
      stock: 3,
      discount: 25,
      reason: "Console d'exposition",
      warranty: "6 mois",
      savings: 150,
    },
    {
      id: 5,
      name: "Nike Air Max 270 React",
      originalPrice: 149.99,
      outletPrice: 79.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.4,
      reviews: 234,
      category: "Chaussures",
      type: "fin-serie",
      condition: "Neuf",
      stock: 15,
      discount: 47,
      reason: "Fin de collection",
      warranty: "6 mois",
      savings: 70,
    },
    {
      id: 6,
      name: "Dyson V11 Absolute",
      originalPrice: 599,
      outletPrice: 399,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      reviews: 456,
      category: "Électroménager",
      type: "retours",
      condition: "Comme neuf",
      stock: 7,
      discount: 33,
      reason: "Retour client - Emballage ouvert",
      warranty: "24 mois",
      savings: 200,
    },
  ]

  const outletTypes = [
    { id: "tous", name: "Tous les produits", count: outletProducts.length, icon: "📦" },
    { id: "fin-serie", name: "Fin de série", count: 2, icon: "📋" },
    { id: "retours", name: "Retours clients", count: 2, icon: "🔄" },
    { id: "destockage", name: "Déstockage", count: 1, icon: "💥" },
    { id: "occasions", name: "Occasions", count: 1, icon: "♻️" },
  ]

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Neuf":
        return "bg-green-100 text-green-700"
      case "Comme neuf":
        return "bg-blue-100 text-blue-700"
      case "Très bon état":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "fin-serie":
        return <Package className="h-4 w-4" />
      case "retours":
        return <RotateCcw className="h-4 w-4" />
      case "destockage":
        return <Percent className="h-4 w-4" />
      case "occasions":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild className="text-white hover:bg-white/20">
              <a href="/dl-style">
                <ArrowLeft className="h-5 w-5" />
              </a>
            </Button>
            <div>
              <h1 className="text-4xl font-bold flex items-center">
                <Package className="h-10 w-10 mr-4" />
                Outlet DL Style
              </h1>
              <p className="text-orange-100 text-lg">Produits de qualité à prix réduits</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bannière d'information */}
      <div className="bg-orange-100 border-b border-orange-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center text-orange-700">
              <Package className="h-4 w-4 mr-2" />
              Produits authentiques garantis
            </div>
            <div className="flex items-center text-orange-700">
              <RotateCcw className="h-4 w-4 mr-2" />
              Retour 30 jours
            </div>
            <div className="flex items-center text-orange-700">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Stocks limités
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-orange-600">-70%</div>
              <div className="text-sm text-gray-600">Réduction maximale</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">€2.1M</div>
              <div className="text-sm text-gray-600">Économies réalisées</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">98%</div>
              <div className="text-sm text-gray-600">Satisfaction client</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">847</div>
              <div className="text-sm text-gray-600">Produits disponibles</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-1/4">
            {/* Filtres par type */}
            <Card className="border-0 shadow-lg mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Types d'outlet
                </h3>
                <div className="space-y-2">
                  {outletTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`w-full text-left px-3 py-3 rounded-lg transition-colors ${
                        selectedType === type.id ? "bg-orange-100 text-orange-700" : "hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="flex items-center">
                          <span className="mr-2">{type.icon}</span>
                          {type.name}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {type.count}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Filtres par état */}
            <Card className="border-0 shadow-lg mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">État du produit</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-sm">🆕 Neuf</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-sm">✨ Comme neuf</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-sm">👍 Très bon état</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-sm">✅ Bon état</span>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Garantie */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Garantie</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-sm">6 mois</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-sm">12 mois</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-3" />
                    <span className="text-sm">24 mois</span>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenu principal */}
          <div className="w-3/4">
            {/* En-tête */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Produits Outlet</h2>
              <p className="text-gray-600">Produits de qualité à prix exceptionnels - Stocks limités</p>
            </div>

            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
              <div>
                <p className="text-gray-600">{outletProducts.length} produits outlet disponibles</p>
              </div>
              <div className="flex items-center space-x-4">
                <select className="border rounded-lg px-3 py-2">
                  <option>Plus grosse réduction</option>
                  <option>Prix croissant</option>
                  <option>Prix décroissant</option>
                  <option>Meilleures notes</option>
                  <option>Stock restant</option>
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
              {outletProducts.map((product) => (
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
                        <Badge className="bg-gradient-to-r from-orange-600 to-red-600 flex items-center">
                          {getTypeIcon(product.type)}
                          <span className="ml-1">Outlet</span>
                        </Badge>
                        <Badge className="bg-red-500 text-white">-{product.discount}%</Badge>
                        <Badge className={getConditionColor(product.condition)}>{product.condition}</Badge>
                      </div>

                      {/* Stock */}
                      <div className="absolute top-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-xs">
                        Plus que {product.stock} en stock
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

                      {/* Raison outlet */}
                      <div className="mb-3 p-2 bg-orange-50 rounded text-xs text-orange-700">💡 {product.reason}</div>

                      {/* Prix */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="text-2xl font-bold text-orange-600">{product.outletPrice}€</span>
                            <span className="text-lg text-gray-400 line-through ml-2">{product.originalPrice}€</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-green-600 font-medium">Économie</div>
                            <div className="text-lg font-bold text-green-600">{product.savings}€</div>
                          </div>
                        </div>
                      </div>

                      {/* Barre de stock */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Stock restant</span>
                          <span>{product.stock} unités</span>
                        </div>
                        <Progress value={(product.stock / 20) * 100} className="h-2" />
                      </div>

                      {/* Garantie */}
                      <div className="mb-4 text-xs text-gray-600">🛡️ Garantie: {product.warranty}</div>

                      {/* Bouton */}
                      <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Acheter maintenant
                      </Button>

                      {/* Info livraison */}
                      <div className="text-xs text-gray-600 mt-3 text-center">
                        🚚 Livraison 48h • 🔒 Paiement sécurisé • ↩️ Retour 30j
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">📦 Alertes Outlet</h2>
              <p className="mb-6">Soyez le premier informé de nos nouvelles arrivées outlet !</p>
              <div className="flex max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre email..."
                  className="flex-1 px-4 py-3 rounded-l-lg text-gray-900"
                />
                <Button className="bg-white text-orange-600 hover:bg-gray-100 px-6 py-3 rounded-r-lg">S'abonner</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
