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
  Wifi,
  Coffee,
  Monitor,
  ChevronDown,
  Heart,
} from "lucide-react"

export default function VolsPage() {
  const [priceRange, setPriceRange] = useState([300, 1200])
  const [durationRange, setDurationRange] = useState([2, 24])
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter))
    } else {
      setSelectedFilters([...selectedFilters, filter])
    }
  }

  const flightResults = [
    {
      id: "fl1",
      airline: "Air France",
      logo: "/placeholder.svg?height=40&width=40",
      departure: { time: "08:30", airport: "CDG", city: "Paris" },
      arrival: { time: "14:45", airport: "JFK", city: "New York" },
      duration: "8h 15m",
      stops: "Direct",
      price: 599,
      class: "Économique",
      amenities: ["Wifi", "Repas", "Divertissement"],
      emissions: "Émissions -15% vs moyenne",
      rating: 4.5,
    },
    {
      id: "fl2",
      airline: "Emirates",
      logo: "/placeholder.svg?height=40&width=40",
      departure: { time: "22:15", airport: "CDG", city: "Paris" },
      arrival: { time: "06:30+1", airport: "JFK", city: "New York" },
      duration: "12h 15m",
      stops: "1 escale (Dubai)",
      price: 749,
      class: "Économique",
      amenities: ["Wifi Premium", "Repas Gourmet", "Divertissement"],
      emissions: "Émissions standard",
      rating: 4.8,
    },
    {
      id: "fl3",
      airline: "Delta",
      logo: "/placeholder.svg?height=40&width=40",
      departure: { time: "15:20", airport: "CDG", city: "Paris" },
      arrival: { time: "18:35", airport: "JFK", city: "New York" },
      duration: "9h 15m",
      stops: "Direct",
      price: 679,
      class: "Économique",
      amenities: ["Wifi", "Repas", "Divertissement"],
      emissions: "Émissions -10% vs moyenne",
      rating: 4.2,
    },
    {
      id: "fl4",
      airline: "Lufthansa",
      logo: "/placeholder.svg?height=40&width=40",
      departure: { time: "10:45", airport: "CDG", city: "Paris" },
      arrival: { time: "17:20", airport: "JFK", city: "New York" },
      duration: "10h 35m",
      stops: "1 escale (Frankfurt)",
      price: 629,
      class: "Économique",
      amenities: ["Wifi", "Repas", "Divertissement"],
      emissions: "Émissions -5% vs moyenne",
      rating: 4.3,
    },
    {
      id: "fl5",
      airline: "British Airways",
      logo: "/placeholder.svg?height=40&width=40",
      departure: { time: "07:15", airport: "CDG", city: "Paris" },
      arrival: { time: "15:40", airport: "JFK", city: "New York" },
      duration: "12h 25m",
      stops: "1 escale (London)",
      price: 589,
      class: "Économique",
      amenities: ["Wifi", "Repas", "Divertissement"],
      emissions: "Émissions standard",
      rating: 4.1,
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
              <a href="/dl-travel/vols" className="text-cyan-600 font-medium">
                Vols
              </a>
              <a href="/dl-travel/hotels" className="text-gray-800 hover:text-cyan-600 transition-colors">
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
                  <label className="text-sm font-medium text-gray-700">Départ</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input defaultValue="Paris (CDG)" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2 flex-1">
                  <label className="text-sm font-medium text-gray-700">Destination</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input defaultValue="New York (JFK)" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2 flex-1">
                  <label className="text-sm font-medium text-gray-700">Départ</label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input type="date" defaultValue="2023-07-15" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2 flex-1">
                  <label className="text-sm font-medium text-gray-700">Retour</label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input type="date" defaultValue="2023-07-22" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2 flex-1">
                  <label className="text-sm font-medium text-gray-700">Passagers</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input defaultValue="1 adulte" className="pl-10" />
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
                    <h4 className="text-sm font-medium text-gray-700 mb-4">Prix</h4>
                    <Slider
                      defaultValue={[300, 1200]}
                      max={2000}
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

                  {/* Duration */}
                  <div className="mb-8">
                    <h4 className="text-sm font-medium text-gray-700 mb-4">Durée</h4>
                    <Slider
                      defaultValue={[2, 24]}
                      max={48}
                      step={1}
                      value={durationRange}
                      onValueChange={setDurationRange}
                      className="mb-2"
                    />
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{durationRange[0]}h</span>
                      <span>{durationRange[1]}h</span>
                    </div>
                  </div>

                  {/* Stops */}
                  <div className="mb-8">
                    <h4 className="text-sm font-medium text-gray-700 mb-4">Escales</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="direct" className="mr-2" />
                        <label htmlFor="direct" className="text-sm text-gray-600">
                          Vol direct
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="one-stop" className="mr-2" />
                        <label htmlFor="one-stop" className="text-sm text-gray-600">
                          1 escale
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="two-stops" className="mr-2" />
                        <label htmlFor="two-stops" className="text-sm text-gray-600">
                          2+ escales
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Airlines */}
                  <div className="mb-8">
                    <h4 className="text-sm font-medium text-gray-700 mb-4">Compagnies aériennes</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="air-france" className="mr-2" />
                        <label htmlFor="air-france" className="text-sm text-gray-600">
                          Air France
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="emirates" className="mr-2" />
                        <label htmlFor="emirates" className="text-sm text-gray-600">
                          Emirates
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="delta" className="mr-2" />
                        <label htmlFor="delta" className="text-sm text-gray-600">
                          Delta
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="lufthansa" className="mr-2" />
                        <label htmlFor="lufthansa" className="text-sm text-gray-600">
                          Lufthansa
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="british" className="mr-2" />
                        <label htmlFor="british" className="text-sm text-gray-600">
                          British Airways
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-4">Services à bord</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant={selectedFilters.includes("wifi") ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleFilter("wifi")}
                        className={selectedFilters.includes("wifi") ? "bg-cyan-600" : ""}
                      >
                        <Wifi className="h-3 w-3 mr-1" />
                        Wifi
                      </Button>
                      <Button
                        variant={selectedFilters.includes("meal") ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleFilter("meal")}
                        className={selectedFilters.includes("meal") ? "bg-cyan-600" : ""}
                      >
                        <Coffee className="h-3 w-3 mr-1" />
                        Repas
                      </Button>
                      <Button
                        variant={selectedFilters.includes("entertainment") ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleFilter("entertainment")}
                        className={selectedFilters.includes("entertainment") ? "bg-cyan-600" : ""}
                      >
                        <Monitor className="h-3 w-3 mr-1" />
                        Divertissement
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="w-full lg:w-3/4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Résultats <span className="text-cyan-600">({flightResults.length})</span>
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
                      <SelectItem value="duration">Durée</SelectItem>
                      <SelectItem value="departure">Heure de départ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-6">
                {flightResults.map((flight) => (
                  <Card key={flight.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        {/* Airline */}
                        <div className="flex items-center mb-4 lg:mb-0">
                          <div className="h-12 w-12 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center bg-white mr-4">
                            <img
                              src={flight.logo || "/placeholder.svg"}
                              alt={flight.airline}
                              className="h-8 w-8 object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800">{flight.airline}</h3>
                            <p className="text-sm text-gray-500">{flight.class}</p>
                          </div>
                        </div>

                        {/* Flight Details */}
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-4 lg:mb-0">
                          {/* Departure */}
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-800">{flight.departure.time}</p>
                            <p className="text-sm text-gray-500">{flight.departure.airport}</p>
                          </div>

                          {/* Duration */}
                          <div className="flex flex-col items-center">
                            <p className="text-xs text-gray-500 mb-1">{flight.duration}</p>
                            <div className="relative w-32 md:w-40">
                              <div className="h-0.5 bg-gray-300 w-full absolute top-1/2"></div>
                              <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-600"></div>
                              <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-600"></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{flight.stops}</p>
                          </div>

                          {/* Arrival */}
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-800">{flight.arrival.time}</p>
                            <p className="text-sm text-gray-500">{flight.arrival.airport}</p>
                          </div>
                        </div>

                        {/* Price & Button */}
                        <div className="flex flex-col items-end">
                          <div className="flex items-center mb-2">
                            <div className="flex items-center mr-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < Math.floor(flight.rating) ? "text-yellow-400" : "text-gray-300"
                                  }`}
                                  fill={i < Math.floor(flight.rating) ? "currentColor" : "none"}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{flight.rating}</span>
                          </div>
                          <p className="text-3xl font-bold text-cyan-600 mb-2">{flight.price}€</p>
                          <Button className="bg-gradient-to-r from-cyan-600 to-blue-600" asChild>
                            <a href={`/dl-travel/vols/${flight.id}`}>Sélectionner</a>
                          </Button>
                        </div>
                      </div>

                      {/* Flight Details Expandable */}
                      <div className="border-t border-gray-100 p-4 bg-gray-50 rounded-b-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {flight.amenities.map((amenity, index) => (
                              <Badge key={index} variant="outline" className="bg-white">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className="text-xs text-green-600">{flight.emissions}</span>
                            <Button variant="ghost" size="sm" className="text-gray-500">
                              Détails <ChevronDown className="h-4 w-4 ml-1" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-cyan-600">
                              <Heart className="h-4 w-4" />
                            </Button>
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
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">DL Travel</h3>
              <p className="text-gray-400 mb-4">
                Votre partenaire de confiance pour tous vos voyages d'affaires et de loisirs.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/dl-travel" className="text-gray-400 hover:text-white">
                    Accueil
                  </a>
                </li>
                <li>
                  <a href="/dl-travel/vols" className="text-gray-400 hover:text-white">
                    Vols
                  </a>
                </li>
                <li>
                  <a href="/dl-travel/hotels" className="text-gray-400 hover:text-white">
                    Hôtels
                  </a>
                </li>
                <li>
                  <a href="/dl-travel/packages" className="text-gray-400 hover:text-white">
                    Packages
                  </a>
                </li>
                <li>
                  <a href="/dl-travel/mes-voyages" className="text-gray-400 hover:text-white">
                    Mes Voyages
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/dl-travel/faq" className="text-gray-400 hover:text-white">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/dl-travel/contact" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/dl-travel/conditions" className="text-gray-400 hover:text-white">
                    Conditions
                  </a>
                </li>
                <li>
                  <a href="/dl-travel/confidentialite" className="text-gray-400 hover:text-white">
                    Confidentialité
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Recevez nos meilleures offres directement dans votre boîte mail.</p>
              <form className="flex">
                <Input
                  type="email"
                  placeholder="Votre email"
                  className="rounded-r-none bg-gray-800 border-gray-700 text-white"
                />
                <Button className="rounded-l-none bg-cyan-600 hover:bg-cyan-700">S'abonner</Button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2023 DL Travel. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
