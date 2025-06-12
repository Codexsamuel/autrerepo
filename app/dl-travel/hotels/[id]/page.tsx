"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  MapPin,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Waves,
  Coffee,
  Shield,
  Heart,
  Share2,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Room {
  id: number
  name: string
  price: number
  originalPrice: number
  size: string
  capacity: number
  amenities: string[]
  image: string
}

export default function HotelDetailPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState(2)

  const hotel = {
    id: params.id,
    name: "Hôtel Royal Palace Marrakech",
    rating: 4.8,
    reviews: 1247,
    location: "Hivernage, Marrakech",
    price: 180,
    originalPrice: 220,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    amenities: [
      { icon: Wifi, name: "WiFi gratuit" },
      { icon: Car, name: "Parking" },
      { icon: Utensils, name: "Restaurant" },
      { icon: Dumbbell, name: "Salle de sport" },
      { icon: Waves, name: "Piscine" },
      { icon: Coffee, name: "Room service" },
    ],
    description:
      "Découvrez l'élégance marocaine dans ce palace 5 étoiles situé au cœur de Marrakech. Avec ses jardins luxuriants, sa piscine à débordement et ses suites somptueuses, l'Hôtel Royal Palace offre une expérience inoubliable.",
    rooms: [
      {
        id: 1,
        name: "Chambre Deluxe",
        price: 180,
        originalPrice: 220,
        size: "35m²",
        capacity: 2,
        amenities: ["WiFi", "Climatisation", "Minibar", "Coffre-fort"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 2,
        name: "Suite Junior",
        price: 280,
        originalPrice: 320,
        size: "55m²",
        capacity: 3,
        amenities: ["WiFi", "Climatisation", "Minibar", "Coffre-fort", "Balcon", "Salon"],
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 3,
        name: "Suite Royale",
        price: 450,
        originalPrice: 520,
        size: "85m²",
        capacity: 4,
        amenities: ["WiFi", "Climatisation", "Minibar", "Coffre-fort", "Balcon", "Salon", "Jacuzzi"],
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hotel.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hotel.images.length) % hotel.images.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/dl-travel/hotels"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Retour aux hôtels</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="gap-2 hover:bg-blue-50 transition-colors">
                <Share2 className="w-4 h-4" />
                Partager
              </Button>
              <Button variant="outline" size="sm" className="gap-2 hover:bg-red-50 transition-colors">
                <Heart className="w-4 h-4" />
                Sauvegarder
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Hotel Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(hotel.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="ml-2 font-semibold text-gray-900">{hotel.rating}</span>
                  <span className="text-gray-600">({hotel.reviews} avis)</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{hotel.location}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl font-bold text-blue-600">{hotel.price}€</span>
                <span className="text-lg text-gray-500 line-through">{hotel.originalPrice}€</span>
              </div>
              <p className="text-sm text-gray-600">par nuit</p>
              <Badge className="bg-green-100 text-green-800 mt-2">
                Économisez {hotel.originalPrice - hotel.price}€
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Images et détails */}
          <div className="lg:col-span-2 space-y-8">
            {/* Galerie d'images */}
            <Card className="overflow-hidden">
              <div className="relative h-96">
                <Image
                  src={hotel.images[currentImageIndex] || "/placeholder.svg"}
                  alt={hotel.name}
                  fill
                  className="object-cover"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {hotel.images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">À propos de cet hôtel</h3>
                <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
              </CardContent>
            </Card>

            {/* Équipements */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Équipements</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hotel.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <amenity.icon className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chambres disponibles */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Chambres disponibles</h3>
                <div className="space-y-4">
                  {hotel.rooms.map((room) => (
                    <div key={room.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex gap-4">
                        <Image
                          src={room.image || "/placeholder.svg"}
                          alt={room.name}
                          width={120}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold text-lg">{room.name}</h4>
                              <p className="text-gray-600">
                                {room.size} • {room.capacity} personnes
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-blue-600">{room.price}€</span>
                                <span className="text-sm text-gray-500 line-through">{room.originalPrice}€</span>
                              </div>
                              <p className="text-sm text-gray-600">par nuit</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {room.amenities.map((amenity, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                          <Button
                            className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 transform hover:scale-105 transition-all duration-200"
                            onClick={() => {
                              setSelectedRoom(room)
                              // Scroll vers la section de réservation
                              document.querySelector(".sticky")?.scrollIntoView({ behavior: "smooth" })
                            }}
                          >
                            Choisir cette chambre
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar de réservation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Réserver maintenant</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Arrivée</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Départ</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Voyageurs</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "personne" : "personnes"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Prix par nuit</span>
                    <span className="font-semibold">{hotel.price}€</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Taxes et frais</span>
                    <span className="font-semibold">25€</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="font-bold text-xl text-blue-600">{hotel.price + 25}€</span>
                  </div>
                </div>

                <Button
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white py-3 transform hover:scale-105 transition-all duration-200"
                  asChild
                >
                  <Link href={`/dl-travel/hotels/${hotel.id}/reservation`}>Réserver maintenant</Link>
                </Button>

                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>Annulation gratuite jusqu'à 24h avant</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
