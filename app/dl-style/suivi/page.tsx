"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Package,
  Truck,
  MapPin,
  CheckCircle,
  Clock,
  Search,
  Download,
  Share2,
  Phone,
  Mail,
  Calendar,
} from "lucide-react"

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("DL-2024-001234")

  const trackingDetails = {
    orderNumber: "DL-2024-001234",
    status: "En transit",
    estimatedDelivery: "Vendredi 15 Mars 2024",
    carrier: "DL Express",
    trackingNumber: "DLE123456789",
    currentLocation: "Centre de tri Paris Nord",
  }

  const trackingHistory = [
    {
      status: "Commande confirmée",
      description: "Votre commande a été confirmée et est en cours de préparation",
      location: "Entrepôt DL Style",
      date: "12 Mars 2024",
      time: "14:30",
      completed: true,
    },
    {
      status: "Préparation terminée",
      description: "Votre commande a été préparée et emballée",
      location: "Entrepôt DL Style",
      date: "13 Mars 2024",
      time: "09:15",
      completed: true,
    },
    {
      status: "Prise en charge transporteur",
      description: "Votre colis a été pris en charge par DL Express",
      location: "Entrepôt DL Style",
      date: "13 Mars 2024",
      time: "16:45",
      completed: true,
    },
    {
      status: "En transit",
      description: "Votre colis est en cours d'acheminement",
      location: "Centre de tri Paris Nord",
      date: "14 Mars 2024",
      time: "08:20",
      completed: true,
      current: true,
    },
    {
      status: "En cours de livraison",
      description: "Votre colis est en cours de livraison",
      location: "Véhicule de livraison",
      date: "15 Mars 2024",
      time: "09:00",
      completed: false,
    },
    {
      status: "Livré",
      description: "Votre colis a été livré",
      location: "123 Rue de la Paix, Paris",
      date: "15 Mars 2024",
      time: "14:00",
      completed: false,
    },
  ]

  const orderItems = [
    {
      id: 1,
      name: "Casque Gaming RGB Pro X",
      quantity: 1,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "T-Shirt Premium DL Collection",
      quantity: 2,
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" asChild>
              <a href="/dl-style" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à la boutique
              </a>
            </Button>
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span className="font-semibold">Suivi de commande</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Section */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Suivez votre commande</h1>
            <div className="max-w-md mx-auto">
              <div className="flex space-x-3">
                <Input
                  placeholder="Numéro de commande"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="flex-1"
                />
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600">
                  <Search className="h-4 w-4 mr-2" />
                  Rechercher
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Tracking Info */}
          <div className="lg:col-span-2">
            {/* Current Status */}
            <Card className="border-0 shadow-lg mb-8">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Commande #{trackingDetails.orderNumber}</h2>
                    <p className="text-gray-600">Transporteur: {trackingDetails.carrier}</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 text-lg px-4 py-2">
                    <Truck className="h-4 w-4 mr-2" />
                    {trackingDetails.status}
                  </Badge>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                    <Package className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                    <div className="font-bold text-lg">Position actuelle</div>
                    <div className="text-sm text-gray-600">{trackingDetails.currentLocation}</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                    <Calendar className="h-12 w-12 text-green-600 mx-auto mb-3" />
                    <div className="font-bold text-lg">Livraison prévue</div>
                    <div className="text-sm text-gray-600">{trackingDetails.estimatedDelivery}</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                    <MapPin className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                    <div className="font-bold text-lg">Numéro de suivi</div>
                    <div className="text-sm text-gray-600">{trackingDetails.trackingNumber}</div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger le récépissé
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Partager le suivi
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tracking Timeline */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6">Historique de livraison</h3>
                <div className="space-y-6">
                  {trackingHistory.map((event, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            event.completed
                              ? event.current
                                ? "bg-blue-500 text-white animate-pulse"
                                : "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {event.completed ? (
                            event.current ? (
                              <Truck className="h-5 w-5" />
                            ) : (
                              <CheckCircle className="h-5 w-5" />
                            )
                          ) : (
                            <Clock className="h-5 w-5" />
                          )}
                        </div>
                        {index < trackingHistory.length - 1 && (
                          <div className={`w-px h-16 ${event.completed ? "bg-green-300" : "bg-gray-300"} mt-2`}></div>
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-center justify-between mb-2">
                          <h4
                            className={`font-semibold ${
                              event.completed ? (event.current ? "text-blue-700" : "text-green-700") : "text-gray-600"
                            }`}
                          >
                            {event.status}
                          </h4>
                          <div className="text-sm text-gray-500">
                            {event.date} à {event.time}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-1">{event.description}</p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {event.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Items */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Articles commandés</h3>
                <div className="space-y-3">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-gray-600">Qté: {item.quantity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Informations de livraison</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium text-gray-800">Adresse de livraison</div>
                    <div className="text-gray-600">
                      Jean Dupont
                      <br />
                      123 Rue de la Paix
                      <br />
                      75001 Paris, France
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Mode de livraison</div>
                    <div className="text-gray-600">Livraison standard gratuite</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Instructions spéciales</div>
                    <div className="text-gray-600">Laisser devant la porte si absent</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Besoin d'aide ?</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="mr-3 h-4 w-4" />
                    01 23 45 67 89
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="mr-3 h-4 w-4" />
                    support@dlstyle.com
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-3">Service client disponible du lundi au vendredi de 9h à 18h</p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Actions rapides</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/dl-style/commandes">Mes commandes</a>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/dl-style/retours">Retourner un article</a>
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600" asChild>
                    <a href="/dl-style">Continuer mes achats</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
