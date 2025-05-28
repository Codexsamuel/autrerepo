"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Plane,
  Hotel,
  MapPin,
  CalendarIcon,
  Users,
  Star,
  Search,
  ArrowRight,
  Globe,
  Shield,
  CreditCard,
} from "lucide-react"

export default function DLTravelPage() {
  const [selectedTab, setSelectedTab] = useState<"flights" | "hotels" | "packages">("flights")
  const [departureDate, setDepartureDate] = useState<Date | undefined>(new Date())
  const [returnDate, setReturnDate] = useState<Date | undefined>(new Date())

  const popularDestinations = [
    {
      city: "Paris",
      country: "France",
      image: "/placeholder.svg?height=200&width=300",
      price: "À partir de 299€",
      description: "Ville lumière et romantique",
    },
    {
      city: "Dubai",
      country: "UAE",
      image: "/placeholder.svg?height=200&width=300",
      price: "À partir de 599€",
      description: "Luxe et modernité",
    },
    {
      city: "New York",
      country: "USA",
      image: "/placeholder.svg?height=200&width=300",
      price: "À partir de 799€",
      description: "La ville qui ne dort jamais",
    },
    {
      city: "Tokyo",
      country: "Japon",
      image: "/placeholder.svg?height=200&width=300",
      price: "À partir de 899€",
      description: "Tradition et innovation",
    },
  ]

  const flightResults = [
    {
      airline: "Air France",
      logo: "/placeholder.svg?height=40&width=40",
      departure: { time: "08:30", airport: "CDG" },
      arrival: { time: "14:45", airport: "JFK" },
      duration: "8h 15m",
      stops: "Direct",
      price: 599,
      class: "Économique",
    },
    {
      airline: "Emirates",
      logo: "/placeholder.svg?height=40&width=40",
      departure: { time: "22:15", airport: "CDG" },
      arrival: { time: "06:30+1", airport: "JFK" },
      duration: "12h 15m",
      stops: "1 escale",
      price: 749,
      class: "Économique",
    },
    {
      airline: "Delta",
      logo: "/placeholder.svg?height=40&width=40",
      departure: { time: "15:20", airport: "CDG" },
      arrival: { time: "18:35", airport: "JFK" },
      duration: "9h 15m",
      stops: "Direct",
      price: 679,
      class: "Économique",
    },
  ]

  const hotelResults = [
    {
      name: "Hotel Plaza Athénée",
      image: "/placeholder.svg?height=200&width=300",
      rating: 5,
      reviews: 1247,
      location: "8ème arrondissement, Paris",
      amenities: ["Wifi", "Spa", "Restaurant", "Parking"],
      price: 450,
      originalPrice: 520,
    },
    {
      name: "Le Meurice",
      image: "/placeholder.svg?height=200&width=300",
      rating: 5,
      reviews: 892,
      location: "1er arrondissement, Paris",
      amenities: ["Wifi", "Spa", "Restaurant", "Fitness"],
      price: 380,
      originalPrice: null,
    },
    {
      name: "Hotel des Invalides",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4,
      reviews: 634,
      location: "7ème arrondissement, Paris",
      amenities: ["Wifi", "Restaurant", "Bar"],
      price: 220,
      originalPrice: 280,
    },
  ]

  const features = [
    {
      icon: Shield,
      title: "Réservation Sécurisée",
      description: "Paiement 100% sécurisé",
    },
    {
      icon: Globe,
      title: "Support 24/7",
      description: "Assistance mondiale",
    },
    {
      icon: CreditCard,
      title: "Paiement Flexible",
      description: "Plusieurs options disponibles",
    },
    {
      icon: Star,
      title: "Meilleurs Prix",
      description: "Garantie du prix le plus bas",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-lg border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-cyan-200 flex items-center justify-center bg-white shadow-md">
                <img src="/images/dl-logo.jpg" alt="DL Travel Logo" className="h-14 w-14 object-contain" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  DL Travel
                </h1>
                <p className="text-sm text-gray-600">Voyages & Réservations</p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/dl-travel" className="text-cyan-600 font-medium">
                Accueil
              </a>
              <a href="/dl-travel/vols" className="text-gray-800 hover:text-cyan-600 transition-colors">
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
              <Button variant="outline" className="border-cyan-200 text-cyan-700">
                Connexion
              </Button>
              <Button className="bg-gradient-to-r from-cyan-600 to-blue-600" asChild>
                <a href="/">Retour DL Solutions</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Search */}
      <section className="py-16 px-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">Voyagez avec Style</h1>
            <p className="text-xl text-cyan-100 mb-8">
              Découvrez le monde avec DL Travel. Vols, hôtels et packages au meilleur prix.
            </p>
          </div>

          {/* Search Widget */}
          <Card className="max-w-6xl mx-auto border-0 shadow-2xl">
            <CardContent className="p-8">
              {/* Tabs */}
              <div className="flex space-x-1 mb-8 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setSelectedTab("flights")}
                  className={`flex-1 py-3 px-6 rounded-md transition-all ${
                    selectedTab === "flights"
                      ? "bg-white shadow-md text-cyan-600 font-medium"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Plane className="h-5 w-5 inline mr-2" />
                  Vols
                </button>
                <button
                  onClick={() => setSelectedTab("hotels")}
                  className={`flex-1 py-3 px-6 rounded-md transition-all ${
                    selectedTab === "hotels"
                      ? "bg-white shadow-md text-cyan-600 font-medium"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Hotel className="h-5 w-5 inline mr-2" />
                  Hôtels
                </button>
                <button
                  onClick={() => setSelectedTab("packages")}
                  className={`flex-1 py-3 px-6 rounded-md transition-all ${
                    selectedTab === "packages"
                      ? "bg-white shadow-md text-cyan-600 font-medium"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Globe className="h-5 w-5 inline mr-2" />
                  Packages
                </button>
              </div>

              {/* Flight Search Form */}
              {selectedTab === "flights" && (
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Départ</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="Ville de départ" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Destination</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="Destination" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Départ</label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input type="date" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Retour</label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input type="date" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Passagers</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="1 adulte" className="pl-10" />
                    </div>
                  </div>
                </div>
              )}

              {/* Hotel Search Form */}
              {selectedTab === "hotels" && (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Destination</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="Ville ou hôtel" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Arrivée</label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input type="date" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Départ</label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input type="date" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Voyageurs</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="2 adultes, 1 chambre" className="pl-10" />
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 text-center">
                <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-blue-600 px-12">
                  <Search className="h-5 w-5 mr-2" />
                  Rechercher
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-cyan-100 text-cyan-700">Destinations Populaires</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Où voulez-vous{" "}
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">aller ?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularDestinations.map((destination, index) => (
              <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.city}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{destination.city}</h3>
                      <p className="text-sm opacity-90">{destination.country}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{destination.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-cyan-600">{destination.price}</span>
                      <Button variant="outline" size="sm">
                        Voir plus
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-cyan-600 to-blue-600">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Prêt pour l'aventure ?</h2>
            <p className="text-xl text-cyan-100 mb-10">Réservez dès maintenant et profitez de nos offres exclusives.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white text-cyan-600 hover:bg-gray-100">
                Réserver maintenant
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Voir les offres
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
