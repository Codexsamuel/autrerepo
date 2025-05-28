"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowRight,
  ShoppingCart,
  Heart,
  Star,
  Filter,
  Search,
  Grid,
  List,
  Truck,
  Shield,
  RotateCcw,
  CreditCard,
} from "lucide-react"

export default function DLStylePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "Tous les produits", count: 156 },
    { id: "vetements", name: "Vêtements", count: 89 },
    { id: "accessoires", name: "Accessoires", count: 34 },
    { id: "chaussures", name: "Chaussures", count: 23 },
    { id: "maison", name: "Maison & Déco", count: 10 },
  ]

  const products = [
    {
      id: 1,
      name: "T-Shirt Premium DL",
      price: 29.99,
      originalPrice: 39.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 124,
      category: "vetements",
      badge: "Bestseller",
      colors: ["#000000", "#FFFFFF", "#FF6B6B", "#4ECDC4"],
    },
    {
      id: 2,
      name: "Hoodie NovaCore",
      price: 59.99,
      originalPrice: 79.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      reviews: 89,
      category: "vetements",
      badge: "Nouveau",
      colors: ["#2C3E50", "#E74C3C", "#3498DB"],
    },
    {
      id: 3,
      name: "Casquette DL Solutions",
      price: 24.99,
      originalPrice: null,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      reviews: 67,
      category: "accessoires",
      badge: null,
      colors: ["#000000", "#FFFFFF", "#34495E"],
    },
    {
      id: 4,
      name: "Mug NovaWorld",
      price: 14.99,
      originalPrice: 19.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      reviews: 156,
      category: "maison",
      badge: "Promo",
      colors: ["#FFFFFF", "#3498DB", "#E74C3C"],
    },
    {
      id: 5,
      name: "Sac à dos Tech",
      price: 89.99,
      originalPrice: null,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 43,
      category: "accessoires",
      badge: "Premium",
      colors: ["#2C3E50", "#34495E"],
    },
    {
      id: 6,
      name: "Sneakers DL Edition",
      price: 129.99,
      originalPrice: 159.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      reviews: 78,
      category: "chaussures",
      badge: "Édition Limitée",
      colors: ["#FFFFFF", "#000000", "#3498DB"],
    },
  ]

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

  const features = [
    {
      icon: Truck,
      title: "Livraison Gratuite",
      description: "Dès 50€ d'achat",
    },
    {
      icon: RotateCcw,
      title: "Retour 30 jours",
      description: "Satisfait ou remboursé",
    },
    {
      icon: Shield,
      title: "Paiement Sécurisé",
      description: "SSL & cryptage",
    },
    {
      icon: CreditCard,
      title: "Paiement Flexible",
      description: "CB, PayPal, Mobile Money",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-purple-200 flex items-center justify-center bg-white shadow-md">
                <img src="/images/dl-logo.jpg" alt="DL Style Logo" className="h-14 w-14 object-contain" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  DL Style
                </h1>
                <p className="text-sm text-gray-600">E-commerce Premium</p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/dl-style" className="text-purple-600 font-medium">
                Boutique
              </a>
              <a href="/dl-style/collections" className="text-gray-800 hover:text-purple-600 transition-colors">
                Collections
              </a>
              <a href="/dl-style/nouveautes" className="text-gray-800 hover:text-purple-600 transition-colors">
                Nouveautés
              </a>
              <a href="/dl-style/promos" className="text-gray-800 hover:text-purple-600 transition-colors">
                Promos
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-purple-600">
                  3
                </Badge>
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600" asChild>
                <a href="/">Retour DL Solutions</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">🛍️ Collection Exclusive</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">Style & Innovation</h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Découvrez notre collection exclusive de produits DL Solutions. Mode, tech et lifestyle premium.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Découvrir la collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Offres spéciales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 bg-white border-b">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-1/4">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Filter className="h-5 w-5 mr-2" />
                    Filtres
                  </h3>

                  {/* Search */}
                  <div className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="Rechercher..." className="pl-10" />
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Catégories</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            selectedCategory === category.id ? "bg-purple-100 text-purple-700" : "hover:bg-gray-100"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span>{category.name}</span>
                            <Badge variant="secondary">{category.count}</Badge>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Prix</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">Moins de 25€</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">25€ - 50€</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">50€ - 100€</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">Plus de 100€</span>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Products Grid */}
            <div className="lg:w-3/4">
              {/* Toolbar */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedCategory === "all"
                      ? "Tous les produits"
                      : categories.find((c) => c.id === selectedCategory)?.name}
                  </h2>
                  <p className="text-gray-600">{filteredProducts.length} produits trouvés</p>
                </div>
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

              {/* Products */}
              <div className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.badge && (
                          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-600">
                            {product.badge}
                          </Badge>
                        )}
                        <Button
                          size="icon"
                          variant="secondary"
                          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="p-6">
                        <h3 className="font-semibold text-lg mb-2 text-gray-800">{product.name}</h3>

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

                        <div className="flex items-center space-x-2 mb-4">
                          {product.colors.map((color, index) => (
                            <div
                              key={index}
                              className="w-6 h-6 rounded-full border-2 border-gray-200"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-purple-600">{product.price}€</span>
                            {product.originalPrice && (
                              <span className="text-lg text-gray-400 line-through">{product.originalPrice}€</span>
                            )}
                          </div>
                          <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Ajouter
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
