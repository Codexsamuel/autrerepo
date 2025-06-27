"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, Clock, MapPin, Luggage, Utensils, Wifi, ArrowLeft, CreditCard, Shield, Check } from "lucide-react"
import Link from "next/link"



export default function FlightDetailPage({ params }: { params: { id: string } }) {
  const [selectedClass, setSelectedClass] = useState("economy")
  const [passengers, setPassengers] = useState(1)

  const flight = {
    id: params.id,
    airline: "Royal Air Maroc",
    flightNumber: "AT 785",
    departure: {
      city: "Paris",
      airport: "CDG",
      time: "14:30",
      date: "2024-02-15",
    },
    arrival: {
      city: "Casablanca",
      airport: "CMN",
      time: "17:45",
      date: "2024-02-15",
    },
    duration: "3h 15min",
    stops: "Direct",
    aircraft: "Boeing 737-800",
    classes: {
      economy: {
        price: 280,
        originalPrice: 350,
        available: 12,
        amenities: ["Repas inclus", "Bagage cabine 8kg", "Divertissement"],
      },
      business: {
        price: 680,
        originalPrice: 820,
        available: 4,
        amenities: ["Siège inclinable", "Repas premium", "Bagage 30kg", "Salon VIP", "WiFi gratuit"],
      },
      first: {
        price: 1200,
        originalPrice: 1450,
        available: 2,
        amenities: ["Suite privée", "Service personnalisé", "Champagne", "Bagage 40kg", "Transfert VIP"],
      },
    },
  }

  const selectedClassData = flight.classes[selectedClass as keyof typeof flight.classes]
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/dl-travel/vols"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Retour aux vols</span>
            </Link>
            <Badge className="bg-green-100 text-green-800">
              Économisez {selectedClassData.originalPrice - selectedClassData.price}€
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Flight Header */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-orange-500 text-white p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Plane className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{flight.airline}</h1>
                  <p className="text-blue-100">
                    Vol {flight.flightNumber} • {flight.aircraft}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{selectedClassData.price}€</div>
                <div className="text-blue-100 line-through">{selectedClassData.originalPrice}€</div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Départ */}
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">{flight.departure.time}</div>
                <div className="text-blue-100">{flight.departure.date}</div>
                <div className="text-lg font-semibold mt-2">{flight.departure.city}</div>
                <div className="text-blue-100">{flight.departure.airport}</div>
              </div>

              {/* Durée */}
              <div className="text-center flex flex-col items-center justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <div className="flex-1 h-0.5 bg-white/50"></div>
                  <Plane className="w-5 h-5" />
                  <div className="flex-1 h-0.5 bg-white/50"></div>
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div className="font-semibold">{flight.duration}</div>
                <div className="text-blue-100">{flight.stops}</div>
              </div>

              {/* Arrivée */}
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">{flight.arrival.time}</div>
                <div className="text-blue-100">{flight.arrival.date}</div>
                <div className="text-lg font-semibold mt-2">{flight.arrival.city}</div>
                <div className="text-blue-100">{flight.arrival.airport}</div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sélection de classe */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Choisissez votre classe</h3>
                <div className="space-y-4">
                  {Object.entries(flight.classes).map(([classType, classData]) => (
                    <div
                      key={classType}
                      className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 transform hover:scale-105 ${
                        selectedClass === classType
                          ? "border-blue-500 bg-blue-50 shadow-lg"
                          : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                      }`}
                      onClick={() => setSelectedClass(classType)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className={`w-4 h-4 rounded-full border-2 ${
                                selectedClass === classType ? "border-blue-500 bg-blue-500" : "border-gray-300"
                              }`}
                            >
                              {selectedClass === classType && (
                                <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                              )}
                            </div>
                            <h4 className="font-semibold text-lg capitalize">
                              {classType === "economy"
                                ? "Économique"
                                : classType === "business"
                                  ? "Affaires"
                                  : "Première"}
                            </h4>
                            <Badge variant="secondary">{classData.available} places restantes</Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {classData.amenities.map((amenity, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                <Check className="w-4 h-4 text-green-500" />
                                <span>{amenity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-2xl font-bold text-blue-600">{classData.price}€</div>
                          <div className="text-sm text-gray-500 line-through">{classData.originalPrice}€</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Détails du vol */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Détails du vol</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium">Durée de vol</div>
                        <div className="text-gray-600">{flight.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Plane className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium">Appareil</div>
                        <div className="text-gray-600">{flight.aircraft}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium">Type de vol</div>
                        <div className="text-gray-600">{flight.stops}</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Luggage className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium">Bagages inclus</div>
                        <div className="text-gray-600">Selon la classe choisie</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Utensils className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium">Repas</div>
                        <div className="text-gray-600">Inclus</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Wifi className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium">WiFi</div>
                        <div className="text-gray-600">Disponible à bord</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar de réservation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Finaliser la réservation</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de passagers</label>
                    <select
                      value={passengers}
                      onChange={(e) => setPassengers(Number(e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "passager" : "passagers"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">
                      Vol ({passengers} {passengers === 1 ? "passager" : "passagers"})
                    </span>
                    <span className="font-semibold">{selectedClassData.price * passengers}€</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Taxes et frais</span>
                    <span className="font-semibold">{45 * passengers}€</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="font-bold text-xl text-blue-600">
                      {(selectedClassData.price + 45) * passengers}€
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white py-3 transform hover:scale-105 transition-all duration-200"
                  asChild
                >
                  <Link href={`/dl-travel/vols/${flight.id}/reservation`}>Réserver ce vol</Link>
                </Button>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4" />
                    <span>Modification gratuite jusqu'à 2h avant</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CreditCard className="w-4 h-4" />
                    <span>Paiement sécurisé</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
