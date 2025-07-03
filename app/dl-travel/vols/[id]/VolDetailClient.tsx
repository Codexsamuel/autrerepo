"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, Clock, MapPin, Luggage, Utensils, Wifi, ArrowLeft, CreditCard, Shield, Check } from "lucide-react"
import Link from "next/link"

interface VolDetailClientProps {
  id: string;
}

export default function VolDetailClient({ id }: VolDetailClientProps) {
  const [selectedClass, setSelectedClass] = useState("economy")
  const [passengers, setPassengers] = useState(1)

  const flight = {
    id: id,
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
                        <p className="font-medium">Durée du vol</p>
                        <p className="text-gray-600">{flight.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Plane className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Escales</p>
                        <p className="text-gray-600">{flight.stops}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Aéronef</p>
                        <p className="text-gray-600">{flight.aircraft}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Luggage className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Bagages inclus</p>
                        <p className="text-gray-600">Selon la classe</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Utensils className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Repas</p>
                        <p className="text-gray-600">Inclus</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Wifi className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">WiFi</p>
                        <p className="text-gray-600">Disponible</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Réservation */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Réservation</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre de passagers
                    </label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPassengers(Math.max(1, passengers - 1))}
                      >
                        -
                      </Button>
                      <span className="w-12 text-center font-medium">{passengers}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPassengers(passengers + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Prix par personne</span>
                      <span className="font-medium">{selectedClassData.price}€</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Nombre de passagers</span>
                      <span className="font-medium">{passengers}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total</span>
                        <span className="text-blue-600">{selectedClassData.price * passengers}€</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Réserver maintenant
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                  <h4 className="font-semibold">Garanties incluses</h4>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Annulation gratuite sous 24h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Assurance voyage incluse</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Support client 24/7</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 