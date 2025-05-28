"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MapPin,
  CalendarIcon,
  Users,
  Star,
  Search,
  ArrowRight,
  ArrowLeft,
  Coffee,
  Heart,
  CheckCircle,
} from "lucide-react"

export default function HotelsPage() {
  const [priceRange, setPriceRange] = useState([50, 500])
  const [ratingFilter, setRatingFilter] = useState<number[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  const toggleRating = (rating: number) => {
    if (ratingFilter.includes(rating)) {
      setRatingFilter(ratingFilter.filter((r) => r !== rating))
    } else {
      setRatingFilter([...ratingFilter, rating])
    }
  }

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity))
    } else {
      setSelectedAmenities([...selectedAmenities, amenity])
    }
  }

  const hotelResults = [
    {
      id: "h1",
      name: "Hôtel Le Magnifique",
      image: "/placeholder.svg?height=200&width=300",
      rating: 5,
      reviews: 1247,
      location: "8ème arrondissement, Paris",
      amenities: ["Wifi", "Spa", "Restaurant", "Parking", "Piscine"],
      price: 450,
      originalPrice: 520,
      description: "Luxueux hôtel 5 étoiles avec vue panoramique sur la Tour Eiffel",
      cancellation: "Annulation gratuite jusqu'à 24h avant l'arrivée",
      breakfast: "Petit-déjeuner inclus",
      distance: "1.2 km du centre",
    },
    {
      id: "h2",
      name: "Le Grand Palais",
      image: "/placeholder.svg?height=200&width=300",
      rating: 5,
      reviews: 892,
      location: "1er arrondissement, Paris",
      amenities: ["Wifi", "Spa", "Restaurant", "Fitness"],
      price: 380,
      originalPrice: 420,
      description: "Élégance parisienne au cœur de la ville lumière",
      cancellation: "Annulation gratuite jusqu'à 48h avant l'arrivée",
      breakfast: "Petit-déjeuner disponible (25€)",
      distance: "0.5 km du centre",
    },
    {
      id: "h3",
      name: "Hôtel des Invalides",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4,
      reviews: 634,
      location: "7ème arrondissement, Paris",
      amenities: ["Wifi", "Restaurant", "Bar"],
      price: 220,
      originalPrice: 280,
      description: "Hôtel de charme à deux pas des Invalides",
      cancellation: "Annulation gratuite jusqu'à 72h avant l'arrivée",
      breakfast: "Petit-déjeuner inclus",
      distance: "1.8 km du centre",
    },
    {
      id: "h4",
      name: "Résidence Saint-Germain",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4,
      reviews: 512,
      location: "6ème arrondissement, Paris",
      amenities: ["Wifi", "Kitchenette", "Climatisation"],
      price: 195,
      originalPrice: 230,
      description: "Appartements modernes dans le quartier Saint-Germain",
      cancellation: "Annulation gratuite jusqu'à 7 jours avant l'arrivée",
      breakfast: "Cuisine équipée dans chaque appartement",
      distance: "1.5 km du centre",
    },
    {
      id: "h5",
      name: "Hôtel Montmartre",
      image: "/placeholder.svg?height=200&width=300",
      rating: 3,
      reviews: 328,
      location: "18ème arrondissement, Paris",
      amenities: ["Wifi", "Bar", "Terrasse"],
      price: 120,
      originalPrice: 150,
      description: "Vue imprenable sur Paris depuis la butte Montmartre",
      cancellation: "Annulation gratuite jusqu'à 48h avant l'arrivée",
      breakfast: "Petit-déjeuner disponible (15€)",
      distance: "3.2 km du centre",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <a href="/dl-travel" className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-cyan-200 flex items-center justify-center bg-white shadow-md">
                  <img src="/images/dl-logo.jpg" alt="DL Travel Logo" className="h-14 w-14 object-contain" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                    DL Travel
                  </h1>
                  <p className="text-sm text-gray-600">Voyages & Réservations</p>
                </div>
              </a>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/dl-travel" className="text-gray-800 hover:text-cyan-600 transition-colors">
                Accueil
              </a>
              <a href="/dl-travel/vols" className="text-gray-800 hover:text-cyan-600 transition-colors">
                Vols
              </a>
              <a href="/dl-travel/hotels" className="text-cyan-600 font-medium">
                Hôtels
              </a>
              <a href="/dl-travel/packages" className="text-gray-800 hover:text-cyan-600 transition-colors">
                Packages
              </a>
              <a href="/dl-travel/mes-voyages" className="text-gray-800 hover:text-cyan-600 transition-colors">
                Mes Voyages
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-cyan-200 text-cyan-700" asChild>
                <a href="/dl-travel/connexion">Connexion</a>
              </Button>
              <Button className="bg-gradient-to-r from-cyan-600 to-blue-600" asChild>
                <a href="/">Retour DL Solutions</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-end gap-4">
                <div className="space-y-2 flex-1">
                  <label className="text-sm font-medium text-gray-700">Destination</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input defaultValue="Paris, France" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2 flex-1">
                  <label className="text-sm font-medium text-gray-700">Arrivée</label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input type="date" defaultValue="2023-07-15" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2 flex-1">
                  <label className="text-sm font-medium text-gray-700">Départ</label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input type="date" defaultValue="2023-07-22" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2 flex-1">
                  <label className="text-sm font-medium text-gray-700">Voyageurs & Chambres</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input defaultValue="2 adultes, 1 chambre" className="pl-10" />
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 w-full md:w-auto">
                    <Search className="h-4 w-4 mr-2" />
                    Rechercher
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters */}
            <div className="w-full lg:w-1/4">
              <Card className="border-0 shadow-lg sticky top-24">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-800">Filtres</h3>
                    <Button variant="ghost" size="sm" className="text-cyan-600 hover:text-cyan-700">
                      Réinitialiser
                    </Button>
                  </div>

                  {/* Price Range */}
                  <div className="mb-8">
                    <h4 className="text-sm font-medium text-gray-700 mb-4">Prix par nuit</h4>
                    <Slider
                      defaultValue={[50, 500]}
                      max={1000}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-2"
                    />
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{priceRange[0]}€</span>
                      <span>{priceRange[1]}€</span>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="mb-8">
                    <h4 className="text-sm font-medium text-gray-700 mb-4">Étoiles</h4>
                    <div className="flex flex-wrap gap-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <Button
                          key={rating}
                          variant={ratingFilter.includes(rating) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleRating(rating)}
                          className={ratingFilter.includes(rating) ? "bg-cyan-600" : ""}
                        >
                          {rating} <Star className="h-3 w-3 ml-1 fill-current" />
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-8">
                    <h4 className="text-sm font-medium text-gray-700 mb-4">Équipements</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="wifi"
                          checked={selectedAmenities.includes("wifi")}
                          onChange={() => toggleAmenity("wifi")}
                          className="mr-2"
                        />
                        <label htmlFor="wifi" className="text-sm text-gray-600">
                          Wifi gratuit
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="breakfast"
                          checked={selectedAmenities.includes("breakfast")}
                          onChange={() => toggleAmenity("breakfast")}
                          className="mr-2"
                        />
                        <label htmlFor="breakfast" className="text-sm text-gray-600">
                          Petit-déjeuner inclus
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="pool"
                          checked={selectedAmenities.includes("pool")}
                          onChange={() => toggleAmenity("pool")}
                          className="mr-2"
                        />
                        <label htmlFor="pool" className="text-sm text-gray-600">
                          Piscine
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="parking"
                          checked={selectedAmenities.includes("parking")}
                          onChange={() => toggleAmenity("parking")}
                          className="mr-2"
                        />
                        <label htmlFor="parking" className="text-sm text-gray-600">
                          Parking
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="spa"
                          checked={selectedAmenities.includes("spa")}
                          onChange={() => toggleAmenity("spa")}
                          className="mr-2"
                        />
                        <label htmlFor="spa" className="text-sm text-gray-600">
                          Spa
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="fitness"
                          checked={selectedAmenities.includes("fitness")}
                          onChange={() => toggleAmenity("fitness")}
                          className="mr-2"
                        />
                        <label htmlFor="fitness" className="text-sm text-gray-600">
                          Salle de fitness
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Property Type */}
                  <div className="mb-8">
                    <h4 className="text-sm font-medium text-gray-700 mb-4">Type d'hébergement</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="hotel" className="mr-2" />
                        <label htmlFor="hotel" className="text-sm text-gray-600">
                          Hôtel
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="apartment" className="mr-2" />
                        <label htmlFor="apartment" className="text-sm text-gray-600">
                          Appartement
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="resort" className="mr-2" />
                        <label htmlFor="resort" className="text-sm text-gray-600">
                          Resort
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="villa" className="mr-2" />
                        <label htmlFor="villa" className="text-sm text-gray-600">
                          Villa
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="hostel" className="mr-2" />
                        <label htmlFor="hostel" className="text-sm text-gray-600">
                          Auberge
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Neighborhood */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-4">Quartier</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="center" className="mr-2" />
                        <label htmlFor="center" className="text-sm text-gray-600">
                          Centre-ville
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="montmartre" className="mr-2" />
                        <label htmlFor="montmartre" className="text-sm text-gray-600">
                          Montmartre
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="champs" className="mr-2" />
                        <label htmlFor="champs" className="text-sm text-gray-600">
                          Champs-Élysées
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="latin" className="mr-2" />
                        <label htmlFor="latin" className="text-sm text-gray-600">
                          Quartier Latin
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="marais" className="mr-2" />
                        <label htmlFor="marais" className="text-sm text-gray-600">
                          Le Marais
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="w-full lg:w-3/4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Hôtels à Paris <span className="text-cyan-600">({hotelResults.length})</span>
                </h2>
                <div className="flex items-center space-x-4">
                  <Select defaultValue="recommended">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recommended">Recommandés</SelectItem>
                      <SelectItem value="price-asc">Prix (croissant)</SelectItem>
                      <SelectItem value="price-desc">Prix (décroissant)</SelectItem>
                      <SelectItem value="rating">Étoiles</SelectItem>
                      <SelectItem value="reviews">Avis clients</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-6">
                {hotelResults.map((hotel) => (
                  <Card key={hotel.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        {/* Hotel Image */}
                        <div className="w-full md:w-1/3 relative">
                          <img
                            src={hotel.image || "/placeholder.svg"}
                            alt={hotel.name}
                            className="w-full h-full object-cover md:rounded-l-lg"
                            style={{ minHeight: "220px" }}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-cyan-600 rounded-full"
                          >
                            <Heart className="h-5 w-5" />
                          </Button>
                        </div>

                        {/* Hotel Details */}
                        <div className="w-full md:w-2/3 p-6">
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="text-xl font-bold text-gray-800">{hotel.name}</h3>
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${i < hotel.rating ? "text-yellow-400" : "text-gray-300"}`}
                                      fill={i < hotel.rating ? "currentColor" : "none"}
                                    />
                                  ))}
                                </div>
                              </div>

                              <div className="flex items-center mb-4">
                                <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                                <span className="text-sm text-gray-500">{hotel.location}</span>
                                <span className="mx-2 text-gray-300">•</span>
                                <span className="text-sm text-gray-500">{hotel.distance}</span>
                              </div>

                              <p className="text-gray-600 mb-4">{hotel.description}</p>

                              <div className="flex flex-wrap gap-2 mb-4">
                                {hotel.amenities.map((amenity, index) => (
                                  <Badge key={index} variant="outline" className="bg-gray-50">
                                    {amenity}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex items-center text-sm text-green-600 mb-2">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                {hotel.cancellation}
                              </div>

                              <div className="flex items-center text-sm text-gray-600">
                                <Coffee className="h-4 w-4 mr-1" />
                                {hotel.breakfast}
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                              <div>
                                <div className="flex items-center">
                                  <span className="text-sm text-gray-500 line-through mr-2">
                                    {hotel.originalPrice && `${hotel.originalPrice}€`}
                                  </span>
                                  <Badge className="bg-green-100 text-green-800 font-medium">
                                    {hotel.originalPrice
                                      ? `-${Math.round(((hotel.originalPrice - hotel.price) / hotel.originalPrice) * 100)}%`
                                      : ""}
                                  </Badge>
                                </div>
                                <div className="flex items-baseline">
                                  <span className="text-2xl font-bold text-cyan-600">{hotel.price}€</span>
                                  <span className="text-sm text-gray-500 ml-1">/ nuit</span>
                                </div>
                                <div className="text-xs text-gray-500">Taxes et frais inclus</div>
                              </div>

                              <Button className="bg-gradient-to-r from-cyan-600 to-blue-600" asChild>
                                <a href={`/dl-travel/hotels/${hotel.id}`}>Voir les chambres</a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 flex items-center justify-center">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="bg-cyan-600 text-white">
                    1
                  </Button>
                  <Button variant="outline">2</Button>
                  <Button variant="outline">3</Button>
                  <Button variant="outline">4</Button>
                  <Button variant="outline">5</Button>
                  <Button variant="outline" size="icon">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 mt-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-full overflow-hidden border border-cyan-200 flex items-center justify-center bg-white">
                  <img src="/images/dl-logo.jpg" alt="DL Travel" className="h-6 w-6 object-contain" />
                </div>
                <span className="text-xl font-bold">DL Travel</span>
              </div>
              <p className="text-gray-400 text-sm">
                Votre partenaire de confiance pour des voyages inoubliables à travers le monde.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/dl-travel/vols" className="hover:text-white transition-colors">
                    Réservation de vols
                  </a>
                </li>
                <li>
                  <a href="/dl-travel/hotels" className="hover:text-white transition-colors">
                    Hôtels
                  </a>
                </li>
                <li>
                  <a href="/dl-travel/packages" className="hover:text-white transition-colors">
                    Packages vacances
                  </a>
                </li>
                <li>
                  <a href="/dl-travel/mes-voyages" className="hover:text-white transition-colors">
                    Mes voyages
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Conditions générales
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Politique de confidentialité
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Suivez-nous</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Twitter
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 DL Travel. Tous droits réservés. Une division de DL Solutions.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
