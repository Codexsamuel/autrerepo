"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Calendar, Plane, Hotel, Utensils, Camera, Heart, Filter, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function PackagesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")

  const categories = [
    { id: "all", name: "Tous les packages", count: 24 },
    { id: "romantic", name: "Romantique", count: 8 },
    { id: "family", name: "Famille", count: 6 },
    { id: "adventure", name: "Aventure", count: 5 },
    { id: "luxury", name: "Luxe", count: 5 },
  ]

  const packages = [
    {
      id: 1,
      title: "Marrakech Royal Experience",
      destination: "Marrakech, Maroc",
      duration: "7 jours / 6 nuits",
      price: 1250,
      originalPrice: 1450,
      rating: 4.8,
      reviews: 234,
      category: "luxury",
      image: "/placeholder.svg?height=300&width=400",
      highlights: ["Vol inclus", "Hôtel 5★", "Petit-déjeuner", "Excursions"],
      description:
        "Découvrez la magie de Marrakech avec ce séjour de luxe incluant palace 5 étoiles et excursions privées.",
      includes: {
        flight: true,
        hotel: "5 étoiles",
        meals: "Petit-déjeuner",
        activities: "3 excursions incluses",
      },
    },
    {
      id: 2,
      title: "Istanbul City Break",
      destination: "Istanbul, Turquie",
      duration: "4 jours / 3 nuits",
      price: 680,
      originalPrice: 820,
      rating: 4.6,
      reviews: 189,
      category: "romantic",
      image: "/placeholder.svg?height=300&width=400",
      highlights: ["Vol inclus", "Hôtel 4★", "Visite guidée", "Bosphore"],
      description: "Explorez la fascinante Istanbul, entre Europe et Asie, avec ce city break romantique.",
      includes: {
        flight: true,
        hotel: "4 étoiles",
        meals: "Petit-déjeuner",
        activities: "Croisière Bosphore",
      },
    },
    {
      id: 3,
      title: "Dubai Famille Premium",
      destination: "Dubai, EAU",
      duration: "6 jours / 5 nuits",
      price: 1890,
      originalPrice: 2200,
      rating: 4.9,
      reviews: 156,
      category: "family",
      image: "/placeholder.svg?height=300&width=400",
      highlights: ["Vol inclus", "Resort 5★", "Parcs inclus", "Activités enfants"],
      description: "Vacances familiales de rêve à Dubai avec accès aux parcs d'attractions et activités pour enfants.",
      includes: {
        flight: true,
        hotel: "5 étoiles Resort",
        meals: "Demi-pension",
        activities: "Parcs d'attractions",
      },
    },
    {
      id: 4,
      title: "Aventure Atlas Marocain",
      destination: "Atlas, Maroc",
      duration: "5 jours / 4 nuits",
      price: 890,
      originalPrice: 1050,
      rating: 4.7,
      reviews: 98,
      category: "adventure",
      image: "/placeholder.svg?height=300&width=400",
      highlights: ["Trekking", "Bivouac", "Guide expert", "Transport 4x4"],
      description:
        "Aventure authentique dans l'Atlas marocain avec trekking, bivouac sous les étoiles et découverte berbère.",
      includes: {
        flight: true,
        hotel: "Bivouac + Riad",
        meals: "Pension complète",
        activities: "Trekking guidé",
      },
    },
    {
      id: 5,
      title: "Paris Romance Weekend",
      destination: "Paris, France",
      duration: "3 jours / 2 nuits",
      price: 450,
      originalPrice: 580,
      rating: 4.5,
      reviews: 267,
      category: "romantic",
      image: "/placeholder.svg?height=300&width=400",
      highlights: ["Hôtel boutique", "Dîner romantique", "Seine cruise", "Montmartre"],
      description: "Weekend romantique à Paris avec hôtel de charme et expériences inoubliables.",
      includes: {
        flight: false,
        hotel: "4 étoiles boutique",
        meals: "1 dîner romantique",
        activities: "Croisière Seine",
      },
    },
    {
      id: 6,
      title: "Maldives Luxury Escape",
      destination: "Maldives",
      duration: "8 jours / 7 nuits",
      price: 3200,
      originalPrice: 3800,
      rating: 4.9,
      reviews: 89,
      category: "luxury",
      image: "/placeholder.svg?height=300&width=400",
      highlights: ["Villa sur pilotis", "All inclusive", "Spa inclus", "Plongée"],
      description: "Séjour de luxe aux Maldives dans une villa sur pilotis avec service all-inclusive premium.",
      includes: {
        flight: true,
        hotel: "Villa sur pilotis",
        meals: "All inclusive",
        activities: "Spa + Plongée",
      },
    },
  ]

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || pkg.category === selectedCategory
    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "budget" && pkg.price < 800) ||
      (priceRange === "mid" && pkg.price >= 800 && pkg.price < 1500) ||
      (priceRange === "luxury" && pkg.price >= 1500)

    return matchesSearch && matchesCategory && matchesPrice
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Packages Voyage</h1>
            <p className="text-gray-600 text-lg">Découvrez nos offres tout inclus pour des vacances parfaites</p>
          </div>

          {/* Barre de recherche */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher une destination, un type de voyage..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filtres */}
          <div className="w-80 space-y-6">
            {/* Catégories */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Catégories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? "bg-blue-100 text-blue-700 border border-blue-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <Badge variant="secondary">{category.count}</Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Prix */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Budget</h3>
                <div className="space-y-2">
                  {[
                    { id: "all", name: "Tous les prix", range: "" },
                    { id: "budget", name: "Économique", range: "< 800€" },
                    { id: "mid", name: "Moyen", range: "800€ - 1500€" },
                    { id: "luxury", name: "Luxe", range: "> 1500€" },
                  ].map((price) => (
                    <button
                      key={price.id}
                      onClick={() => setPriceRange(price.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        priceRange === price.id
                          ? "bg-blue-100 text-blue-700 border border-blue-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{price.name}</span>
                        <span className="text-sm text-gray-500">{price.range}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Offre spéciale */}
            <Card className="bg-gradient-to-br from-orange-500 to-pink-500 text-white">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Offre Spéciale</h3>
                <p className="text-orange-100 mb-4">Jusqu'à -30% sur une sélection de packages</p>
                <Button variant="secondary" className="w-full hover:bg-white/90 transition-colors" asChild>
                  <Link href="/dl-travel/offres-speciales">Voir les offres</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Liste des packages */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="text-gray-600">
                {filteredPackages.length} package{filteredPackages.length > 1 ? "s" : ""} trouvé
                {filteredPackages.length > 1 ? "s" : ""}
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Trier par prix
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredPackages.map((pkg) => (
                <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative">
                    <Image
                      src={pkg.image || "/placeholder.svg"}
                      alt={pkg.title}
                      width={400}
                      height={250}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button variant="outline" size="sm" className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Badge className="absolute top-4 left-4 bg-green-500 text-white">
                      -{Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}%
                    </Badge>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-xl">{pkg.title}</h3>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{pkg.price}€</div>
                        <div className="text-sm text-gray-500 line-through">{pkg.originalPrice}€</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{pkg.destination}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{pkg.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < Math.floor(pkg.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({pkg.reviews} avis)</span>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {pkg.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Plane className="w-4 h-4 text-blue-600" />
                        <span>{pkg.includes.flight ? "Vol inclus" : "Vol non inclus"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Hotel className="w-4 h-4 text-blue-600" />
                        <span>{pkg.includes.hotel}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-blue-600" />
                        <span>{pkg.includes.meals}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4 text-blue-600" />
                        <span>{pkg.includes.activities}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 hover:bg-blue-50 transition-colors" asChild>
                        <Link href={`/dl-travel/packages/${pkg.id}`}>Voir détails</Link>
                      </Button>
                      <Button
                        className="flex-1 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 transform hover:scale-105 transition-all duration-200"
                        asChild
                      >
                        <Link href={`/dl-travel/packages/${pkg.id}/reservation`}>Réserver</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
