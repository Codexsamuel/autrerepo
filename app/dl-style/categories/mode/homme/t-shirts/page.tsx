"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ShoppingCart,
  Heart,
  Star,
  Filter,
  Grid,
  List,
  ArrowLeft,
  Eye,
  ContrastIcon as Compare,
  Truck,
  Shield,
} from "lucide-react"

export default function TShirtsHommePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")

  const products = [
    {
      id: 1,
      name: "T-Shirt Premium Coton Bio",
      price: 29.99,
      originalPrice: 39.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 247,
      colors: ["Blanc", "Noir", "Bleu marine", "Gris"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      badge: "Bio",
      discount: 25,
      inStock: true,
      brand: "DL Collection",
    },
    {
      id: 2,
      name: "T-Shirt Graphique Streetwear",
      price: 24.99,
      originalPrice: 34.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      reviews: 189,
      colors: ["Noir", "Blanc", "Rouge"],
      sizes: ["S", "M", "L", "XL"],
      badge: "Tendance",
      discount: 29,
      inStock: true,
      brand: "Urban Style",
    },
    {
      id: 3,
      name: "Polo Classique Piqué",
      price: 39.99,
      originalPrice: 59.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      reviews: 156,
      colors: ["Bleu marine", "Blanc", "Bordeaux", "Vert"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      badge: "Classique",
      discount: 33,
      inStock: true,
      brand: "Elegance",
    },
    {
      id: 4,
      name: "T-Shirt Sport Performance",
      price: 34.99,
      originalPrice: 49.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      reviews: 312,
      colors: ["Noir", "Bleu", "Rouge", "Gris"],
      sizes: ["S", "M", "L", "XL"],
      badge: "Performance",
      discount: 30,
      inStock: true,
      brand: "SportTech",
    },
    {
      id: 5,
      name: "T-Shirt Vintage Délavé",
      price: 27.99,
      originalPrice: 37.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.5,
      reviews: 98,
      colors: ["Beige", "Kaki", "Bleu délavé"],
      sizes: ["M", "L", "XL"],
      badge: "Vintage",
      discount: 26,
      inStock: false,
      brand: "Retro Vibes",
    },
    {
      id: 6,
      name: "T-Shirt Manches Longues",
      price: 32.99,
      originalPrice: 44.99,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.4,
      reviews: 134,
      colors: ["Noir", "Blanc", "Gris", "Bleu marine"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      badge: "Confort",
      discount: 27,
      inStock: true,
      brand: "Comfort Plus",
    },
  ]

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"]
  const colors = [
    { name: "Noir", hex: "#000000" },
    { name: "Blanc", hex: "#FFFFFF" },
    { name: "Bleu marine", hex: "#1e3a8a" },
    { name: "Gris", hex: "#6b7280" },
    { name: "Rouge", hex: "#dc2626" },
    { name: "Vert", hex: "#16a34a" },
    { name: "Bordeaux", hex: "#7c2d12" },
    { name: "Beige", hex: "#d6d3d1" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="/dl-style">
                <ArrowLeft className="h-5 w-5" />
              </a>
            </Button>
            <nav className="text-sm text-gray-600">
              <a href="/dl-style" className="hover:text-indigo-600">
                DL Style
              </a>
              <span className="mx-2">/</span>
              <a href="/dl-style/categories/mode" className="hover:text-indigo-600">
                Mode & Vêtements
              </a>
              <span className="mx-2">/</span>
              <a href="/dl-style/categories/mode/homme" className="hover:text-indigo-600">
                Homme
              </a>
              <span className="mx-2">/</span>
              <span className="text-indigo-600 font-medium">T-shirts & Polos</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filtres */}
          <div className="w-1/4">
            <Card className="border-0 shadow-lg mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filtres
                </h3>

                {/* Filtre Tailles */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Tailles</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(selectedSize === size ? "" : size)}
                        className={`p-2 border rounded text-sm font-medium transition-colors ${
                          selectedSize === size
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "border-gray-300 hover:border-indigo-300"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filtre Couleurs */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Couleurs</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(selectedColor === color.name ? "" : color.name)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColor === color.name
                            ? "border-indigo-600 scale-110"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Filtre Prix */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Prix</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Moins de 25€</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">25€ - 35€</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">35€ - 50€</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Plus de 50€</span>
                    </label>
                  </div>
                </div>

                {/* Filtre Marques */}
                <div>
                  <h4 className="font-medium mb-3">Marques</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">DL Collection</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Urban Style</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Elegance</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">SportTech</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenu principal */}
          <div className="w-3/4">
            {/* En-tête */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">T-shirts & Polos Homme</h1>
              <p className="text-gray-600">Découvrez notre collection de t-shirts et polos pour homme</p>
            </div>

            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
              <div>
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

            {/* Grille de produits */}
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
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.badge && (
                        <Badge className="absolute top-3 left-3 bg-gradient-to-r from-indigo-600 to-purple-600">
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
                        <Button size="icon" variant="secondary">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="secondary">
                          <Compare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
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

                      {/* Couleurs disponibles */}
                      <div className="mb-3">
                        <div className="text-xs text-gray-600 mb-1">Couleurs disponibles:</div>
                        <div className="flex space-x-1">
                          {product.colors.slice(0, 4).map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{
                                backgroundColor: colors.find((c) => c.name === color)?.hex || "#gray",
                              }}
                              title={color}
                            />
                          ))}
                          {product.colors.length > 4 && (
                            <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
                          )}
                        </div>
                      </div>

                      {/* Tailles disponibles */}
                      <div className="mb-3">
                        <div className="text-xs text-gray-600 mb-1">Tailles: {product.sizes.join(", ")}</div>
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
                        Livraison gratuite dès 50€
                        <Shield className="h-3 w-3 ml-2 mr-1" />
                        Retour 30j
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600"
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {product.inStock ? "Ajouter au panier" : "Indisponible"}
                      </Button>
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
                <Button variant="outline">Suivant</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
