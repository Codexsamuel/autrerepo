"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plane, Hotel, MapPin, Calendar, Download, Eye, Star, ArrowRight, Plus, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"



export default function MesVoyagesPage() {
  const [filter, setFilter] = useState("all")

  const voyages = {
    upcoming: [
      {
        id: 1,
        type: "package",
        destination: "Marrakech, Maroc",
        title: "Séjour Royal Palace",
        dates: "15-22 Février 2024",
        status: "confirmé",
        price: 1250,
        image: "/placeholder.svg?height=200&width=300",
        details: {
          vol: "AT 785 - 14:30 → 17:45",
          hotel: "Royal Palace 5★",
          duration: "7 jours / 6 nuits",
        },
      },
      {
        id: 2,
        type: "flight",
        destination: "Dubai, EAU",
        title: "Vol Emirates",
        dates: "5 Mars 2024",
        status: "confirmé",
        price: 680,
        image: "/placeholder.svg?height=200&width=300",
        details: {
          vol: "EK 073 - 09:15 → 18:30",
          classe: "Business",
          duration: "7h 15min",
        },
      },
    ],
    past: [
      {
        id: 3,
        type: "package",
        destination: "Istanbul, Turquie",
        title: "City Break Istanbul",
        dates: "10-14 Janvier 2024",
        status: "terminé",
        price: 890,
        rating: 4.8,
        image: "/placeholder.svg?height=200&width=300",
        details: {
          vol: "TK 1825 - 11:20 → 15:45",
          hotel: "Sultanahmet Hotel 4★",
          duration: "4 jours / 3 nuits",
        },
      },
      {
        id: 4,
        type: "hotel",
        destination: "Paris, France",
        title: "Hôtel Le Meurice",
        dates: "20-23 Décembre 2023",
        status: "terminé",
        price: 1200,
        rating: 4.9,
        image: "/placeholder.svg?height=200&width=300",
        details: {
          hotel: "Le Meurice 5★",
          chambre: "Suite Deluxe",
          duration: "3 nuits",
        },
      },
    ],
    cancelled: [
      {
        id: 5,
        type: "flight",
        destination: "New York, USA",
        title: "Vol Air France",
        dates: "15 Novembre 2023",
        status: "annulé",
        price: 750,
        refund: 750,
        image: "/placeholder.svg?height=200&width=300",
        details: {
          vol: "AF 007 - 13:45 → 16:30",
          classe: "Économique",
          reason: "Annulé par le client",
        },
      },
    ],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmé":
        return "bg-green-100 text-green-800"
      case "terminé":
        return "bg-blue-100 text-blue-800"
      case "annulé":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "flight":
        return Plane
      case "hotel":
        return Hotel
      case "package":
        return MapPin
      default:
        return MapPin
    }
  }

  const renderVoyageCard = (voyage: any) => {
    const TypeIcon = getTypeIcon(voyage.type)

    return (
      <Card key={voyage.id} className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="flex">
          <div className="relative w-48 h-32">
            <Image src={voyage.image || "/placeholder.svg"} alt={voyage.destination} fill className="object-cover" />
            <Badge className={`absolute top-2 left-2 ${getStatusColor(voyage.status)}`}>voyage.status</Badge>
          </div>

          <CardContent className="flex-1 p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <TypeIcon className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-lg">{voyage.title}</h3>
              </div>
              <div className="text-right">
                <div className="font-bold text-xl text-blue-600">{voyage.price}€</div>
                {voyage.refund && <div className="text-sm text-green-600">Remboursé: {voyage.refund}€</div>}
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <MapPin className="w-4 h-4" />
              <span>{voyage.destination}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600 mb-3">
              <Calendar className="w-4 h-4" />
              <span>{voyage.dates}</span>
            </div>

            {voyage.rating && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(voyage.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({voyage.rating})</span>
              </div>
            )}

            <div className="space-y-1 text-sm text-gray-600 mb-4">
              {Object.entries(voyage.details).map(([key, value]) => (
                <div key={key}>
                  <span className="font-medium capitalize">{key}:</span> {value as string}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="w-4 h-4" />
                Détails
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Télécharger
              </Button>
              {voyage.status === "confirmé" && (
                <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700">
                  <ArrowRight className="w-4 h-4" />
                  Gérer
                </Button>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mes Voyages</h1>
              <p className="text-gray-600 mt-1">Gérez tous vos voyages en un seul endroit</p>
            </div>
            <Link href="/dl-travel">
              <Button className="gap-2 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600">
                <Plus className="w-4 h-4" />
                Nouveau voyage
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistiques */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{voyages.upcoming.length}</div>
              <div className="text-gray-600">Voyages à venir</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{voyages.past.length}</div>
              <div className="text-gray-600">Voyages terminés</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {voyages.past.reduce((acc, v) => acc + (v.rating || 0), 0) / voyages.past.length || 0}
              </div>
              <div className="text-gray-600">Note moyenne</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {[...voyages.upcoming, ...voyages.past].reduce((acc, v) => acc + v.price, 0)}€
              </div>
              <div className="text-gray-600">Total dépensé</div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres et onglets */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-fit grid-cols-3">
              <TabsTrigger value="upcoming">À venir ({voyages.upcoming.length})</TabsTrigger>
              <TabsTrigger value="past">Terminés ({voyages.past.length})</TabsTrigger>
              <TabsTrigger value="cancelled">Annulés ({voyages.cancelled.length})</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                Filtrer
              </Button>
            </div>
          </div>

          <TabsContent value="upcoming" className="space-y-4">
            {voyages.upcoming.length > 0 ? (
              voyages.upcoming.map(renderVoyageCard)
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Plane className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun voyage à venir</h3>
                  <p className="text-gray-500 mb-6">Planifiez votre prochaine aventure dès maintenant !</p>
                  <Link href="/dl-travel">
                    <Button className="gap-2 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600">
                      <Plus className="w-4 h-4" />
                      Réserver un voyage
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {voyages.past.map(renderVoyageCard)}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            {voyages.cancelled.map(renderVoyageCard)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
