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
  Grid,
  List,
  Truck,
  Zap,
  Eye,
  ContrastIcon as Compare,
} from "lucide-react"

export default function ModePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedSize, setSelectedSize] = useState<string[]>([])
  const [selectedColor, setSelectedColor] = useState<string[]>([])

  const products = [
    {
      id: 1,
      name: "T-Shirt Premium DL Collection",
      price: 24.99,
      originalPrice: 39.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 1247,
      category: "T-Shirts",
      brand: "DL Fashion",
      badge: "Nouveau",
      discount: 38,
      shipping: "Livraison gratuite dès 50€",
      inStock: true,
      fastDelivery: false,
      colors: ["Blanc", "Noir", "Bleu", "Rouge"],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: 2,
      name: "Jean Slim Fit Premium",
      price: 79.99,
      originalPrice: 119.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      reviews: 892,
      category: "Jeans",
      brand: "DL Denim",
      badge: "Bestseller",
      discount: 33,
      shipping: "Livraison gratuite",
      inStock: true,
      fastDelivery: true,
      colors: ["Bleu foncé", "Noir", "Bleu clair"],
      sizes: ["28", "30", "32", "34", "36"],
    },
    {
      id: 3,
      name: "Robe d'été Florale",
      price: 59.99,
      originalPrice: 89.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      reviews: 634,
      category: "Robes",
      brand: "DL Femme",
      badge: "Tendance",
      discount: 33,
      shipping: "Livraison gratuite dès 50€",
      inStock: true,
      fastDelivery: false,
      colors: ["Floral rose", "Floral bleu", "Uni blanc"],
      sizes: ["XS", "S", "M", "L"],
    },
    {
      id: 4,
      name: "Sneakers Urban Style",
      price: 89.99,
      originalPrice: 129.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.5,
      reviews: 1456,
      category: "Chaussures",
      brand: "DL Shoes",
      badge: "Promo",
      discount: 31,
      shipping: "Livraison gratuite",
      inStock: true,
      fastDelivery: true,
      colors: ["Blanc", "Noir", "Gris"],
      sizes: ["39", "40", "41", "42", "43", "44"],
    },
    {
      id: 5,
      name: "Veste en Cuir Vintage",
      price: 199.99,
      originalPrice: 299.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      reviews: 423,
      category: "Vestes",
      brand: "DL Leather",
      badge: "Luxe",
      discount: 33,
      shipping: "Livraison gratuite",
      inStock: true,
      fastDelivery: true,
      colors: ["Noir", "Marron"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 6,
      name: "Sac à Main Élégant",
      price: 149.99,
      originalPrice: 199.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 789,
      category: "Accessoires",
      brand: "DL Bags",
      badge: "Coup de cœur",
      discount: 25,
      shipping: "Livraison gratuite",
      inStock: true,
      fastDelivery: false,
      colors: ["Noir", "Beige", "Rouge"],
      sizes: ["Unique"],
    },
  ]

  const categories = [
    { name: "T-Shirts", count: 156, icon: "👕" },
    { name: "Jeans", count: 89, icon: "👖" },
    { name: "Robes", count: 123, icon: "👗" },
    { name: "Chaussures", count: 167, icon: "👟" },
    { name: "Vestes", count: 78, icon: "🧥" },
    { name: "Accessoires", count: 234, icon: "👜" },
  ]

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
  const colors = ["Noir", "Blanc", "Bleu", "Rouge", "Vert", "Jaune", "Rose", "Gris"]

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
              <span className="text-2xl">👕</span>
              <span className="font-semibold text-xl">Mode & Vêtements</span>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm text-gray-600">
            <a href="/dl-style" className="hover:text-indigo-600">
              Accueil
            </a>
            <span className="mx-2">›</span>
            <span className="text-gray-800 font-medium">Mode & Vêtements</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-1/4">
            {/* Categories */}
            <Card className="border-0 shadow-lg mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Catégories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      className="w-full text-left px-3 py-3 rounded-lg hover:bg-gray-100 transition-colors"
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

            {/* Sizes */}
            <Card className="border-0 shadow-lg mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Tailles</h3>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`p-2 border rounded-lg text-center transition-colors ${
                        selectedSize.includes(size)
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() =>
                        setSelectedSize((prev) =>
                          prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
                        )
                      }
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Colors */}
            <Card className="border-0 shadow-lg mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Couleurs</h3>
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor.includes(color) ? "border-indigo-500 scale-110" : "border-gray-300"
                      }`}
                      style={{
                        backgroundColor:
                          color === "Noir"
                            ? "#000"
                            : color === "Blanc"
                              ? "#fff"
                              : color === "Bleu"
                                ? "#3b82f6"
                                : color === "Rouge"
                                  ? "#ef4444"
                                  : color === "Vert"
                                    ? "#22c55e"
                                    : color === "Jaune"
                                      ? "#eab308"
                                      : color === "Rose"
                                        ? "#ec4899"
                                        : "#6b7280",
                      }}
                      onClick={() =>
                        setSelectedColor((prev) =>
                          prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
                        )
                      }
                      title={color}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Price Range */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Prix</h3>
                <div className="space-y-3">
                  {[
                    { label: "Moins de 25€", min: 0, max: 25 },
                    { label: "25€ - 50€", min: 25, max: 50 },
                    { label: "50€ - 100€", min: 50, max: 100 },
                    { label: "100€ - 200€", min: 100, max: 200 },
                    { label: "Plus de 200€", min: 200, max: 1000 },
                  ].map((range) => (
                    <label key={range.label} className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-sm">{range.label}</span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="w-3/4">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Mode & Vêtements</h2>
                <p className="text-gray-600">{products.length} produits trouvés</p>
              </div>
              <div className="flex items-center space-x-4">
                <select className="border rounded-lg px-3 py-2">
                  <option>Trier par pertinence</option>
                  <option>Prix croissant</option>
                  <option>Prix décroissant</option>
                  <option>Meilleures notes</option>
                  <option>Nouveautés</option>
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

            {/* Products */}
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-3" : "grid-cols-1"}`}>
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.badge && (
                        <Badge className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-600">
                          {product.badge}
                        </Badge>
                      )}
                      {product.discount && (
                        <Badge className="absolute top-3 right-3 bg-red-500 text-white">-{product.discount}%</Badge>
                      )}
                      <div className="absolute bottom-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="secondary">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="secondary" asChild>
                          <a href={`/dl-style/produit/${product.id}`}>
                            <Eye className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button size="icon" variant="secondary">
                          <Compare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="text-xs text-gray-500 mb-1">
                        {product.category} • {product.brand}
                      </div>
                      <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2">{product.name}</h3>

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

                      {/* Colors */}
                      <div className="flex items-center mb-3">
                        <span className="text-xs text-gray-600 mr-2">Couleurs:</span>
                        <div className="flex space-x-1">
                          {product.colors.slice(0, 4).map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{
                                backgroundColor: color.includes("Noir")
                                  ? "#000"
                                  : color.includes("Blanc")
                                    ? "#fff"
                                    : color.includes("Bleu")
                                      ? "#3b82f6"
                                      : color.includes("Rouge")
                                        ? "#ef4444"
                                        : "#6b7280",
                              }}
                              title={color}
                            />
                          ))}
                          {product.colors.length > 4 && (
                            <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-xl font-bold text-indigo-600">{product.price}€</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through ml-2">{product.originalPrice}€</span>
                          )}
                        </div>
                        <Badge className={product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                          {product.inStock ? "En stock" : "Rupture"}
                        </Badge>
                      </div>

                      <div className="text-xs text-gray-600 mb-3 flex items-center">
                        <Truck className="h-3 w-3 mr-1" />
                        {product.shipping}
                        {product.fastDelivery && (
                          <Badge className="ml-2 bg-orange-100 text-orange-700 text-xs">
                            <Zap className="h-3 w-3 mr-1" />
                            Express
                          </Badge>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600"
                          disabled={!product.inStock}
                          asChild
                        >
                          <a href="/dl-style/panier">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            {product.inStock ? "Ajouter" : "Indisponible"}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <Button variant="outline">Précédent</Button>
                <Button className="bg-indigo-600">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">...</Button>
                <Button variant="outline">12</Button>
                <Button variant="outline">Suivant</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
