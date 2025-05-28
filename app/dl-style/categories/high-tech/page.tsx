"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Star,
  Search,
  Grid,
  List,
  Truck,
  Zap,
  Eye,
  ContrastIcon as Compare,
} from "lucide-react"

export default function HighTechPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("relevance")
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])

  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro Max 256GB",
      price: 1299,
      originalPrice: 1479,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 2847,
      category: "Smartphones",
      brand: "Apple",
      badge: "Deal du jour",
      discount: 12,
      shipping: "Livraison gratuite",
      inStock: true,
      fastDelivery: true,
      features: ["5G", "Face ID", "Triple caméra", "Titanium"],
    },
    {
      id: 2,
      name: "MacBook Air M3 13 pouces",
      price: 1199,
      originalPrice: 1499,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      reviews: 1923,
      category: "Ordinateurs",
      brand: "Apple",
      badge: "Vente flash",
      discount: 20,
      shipping: "Livraison gratuite",
      inStock: true,
      fastDelivery: true,
      features: ["Puce M3", "18h autonomie", "Retina", "Touch ID"],
    },
    {
      id: 3,
      name: "Samsung Galaxy S24 Ultra",
      price: 1099,
      originalPrice: 1419,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      reviews: 3421,
      category: "Smartphones",
      brand: "Samsung",
      badge: "Dernières pièces",
      discount: 23,
      shipping: "Livraison express 24h",
      inStock: true,
      fastDelivery: true,
      features: ["S Pen", "200MP", "AI Photo", "5000mAh"],
    },
    {
      id: 4,
      name: "iPad Pro 12.9 M2",
      price: 899,
      originalPrice: 1199,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      reviews: 1567,
      category: "Tablettes",
      brand: "Apple",
      badge: "Bestseller",
      discount: 25,
      shipping: "Livraison gratuite",
      inStock: true,
      fastDelivery: false,
      features: ["Puce M2", "Liquid Retina", "Apple Pencil", "5G"],
    },
    {
      id: 5,
      name: "Sony WH-1000XM5",
      price: 299,
      originalPrice: 399,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 2134,
      category: "Audio",
      brand: "Sony",
      badge: "Top vente",
      discount: 25,
      shipping: "Livraison gratuite",
      inStock: true,
      fastDelivery: true,
      features: ["ANC", "30h autonomie", "Hi-Res", "Bluetooth 5.2"],
    },
    {
      id: 6,
      name: "Nintendo Switch OLED",
      price: 299,
      originalPrice: 349,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.5,
      reviews: 3892,
      category: "Gaming",
      brand: "Nintendo",
      badge: "Nouveau",
      discount: 14,
      shipping: "Livraison gratuite",
      inStock: true,
      fastDelivery: true,
      features: ["Écran OLED", "Portable", "64GB", "Joy-Con"],
    },
  ]

  const categories = [
    { name: "Smartphones", count: 234, icon: "📱" },
    { name: "Ordinateurs", count: 156, icon: "💻" },
    { name: "Tablettes", count: 89, icon: "📱" },
    { name: "Audio", count: 167, icon: "🎧" },
    { name: "Gaming", count: 123, icon: "🎮" },
    { name: "Accessoires", count: 123, icon: "🔌" },
  ]

  const brands = ["Apple", "Samsung", "Sony", "Nintendo", "Microsoft", "Google"]

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
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
                Retour à DL Style
              </a>
            </Button>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📱</span>
              <span className="font-semibold text-xl">High-Tech</span>
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
            <span className="text-gray-800 font-medium">High-Tech</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-1/4">
            {/* Search */}
            <Card className="border-0 shadow-lg mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Recherche</h3>
                <div className="relative">
                  <Input placeholder="Rechercher un produit..." className="pl-10" />
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                </div>
              </CardContent>
            </Card>

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

            {/* Price Range */}
            <Card className="border-0 shadow-lg mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Prix</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number.parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-20"
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value) || 2000])}
                      className="w-20"
                    />
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: "Moins de 100€", min: 0, max: 100 },
                      { label: "100€ - 500€", min: 100, max: 500 },
                      { label: "500€ - 1000€", min: 500, max: 1000 },
                      { label: "Plus de 1000€", min: 1000, max: 5000 },
                    ].map((range) => (
                      <label key={range.label} className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-3"
                          onChange={() => setPriceRange([range.min, range.max])}
                        />
                        <span className="text-sm">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Brands */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Marques</h3>
                <div className="space-y-3">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-3"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                      />
                      <span className="text-sm">{brand}</span>
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
                <h2 className="text-2xl font-bold text-gray-800">High-Tech</h2>
                <p className="text-gray-600">{products.length} produits trouvés</p>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  className="border rounded-lg px-3 py-2"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="relevance">Trier par pertinence</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="rating">Meilleures notes</option>
                  <option value="newest">Nouveautés</option>
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

                      <div className="flex flex-wrap gap-1 mb-3">
                        {product.features.slice(0, 3).map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
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
                          className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600"
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
                <Button variant="outline">8</Button>
                <Button variant="outline">Suivant</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
