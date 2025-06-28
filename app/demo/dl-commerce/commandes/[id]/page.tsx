"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Package, User, CreditCard, Truck, Clock, CheckCircle2, AlertCircle, MapPin, History } from "lucide-react"



// Types
interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  image: string
}

interface TimelineEvent {
  date: Date
  status: string
  description: string
}

interface Order {
  id: string
  date: Date
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  customer: {
    name: string
    email: string
    phone: string
  }
  items: OrderItem[]
  shipping: {
    address: string
    city: string
    postalCode: string
    country: string
  }
  payment: {
    method: string
    status: string
    total: number
  }
  timeline: TimelineEvent[]
}

// Simulated order data
const order: Order = {
  id: "CMD-2024-001",
  date: new Date(),
  status: "processing",
  customer: {
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    phone: "+33 6 12 34 56 78"
  },
  items: [
    {
      id: "1",
      name: "iPhone 13 Pro",
      quantity: 1,
      price: 999.99,
      image: "/products/iphone.jpg"
    },
    {
      id: "2",
      name: "AirPods Pro",
      quantity: 1,
      price: 249.99,
      image: "/products/airpods.jpg"
    }
  ],
  shipping: {
    address: "123 Rue de la Paix",
    city: "Paris",
    postalCode: "75001",
    country: "France"
  },
  payment: {
    method: "Carte bancaire",
    status: "Payé",
    total: 1249.98
  },
  timeline: [{
      date: new Date(),
      status: "Commande créée",
      description: "La commande a été créée"
    },
    {
      date: new Date(),
      status: "Paiement confirmé",
      description: "Le paiement a été confirmé"
    }]
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
} as const

export default function OrderDetailPage() {
  const [orderStatus, setOrderStatus] = useState(order.status)

  const handleStatusChange = (newStatus: Order['status']) => {
    setOrderStatus(newStatus)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Commande #{order.id}</h1>
            <Badge className={statusColors[orderStatus]}>orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1)</Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Détails de la commande
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date de commande</span>
                    <span>{format(order.date, 'PPP', { locale: fr })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total</span>
                    <span className="font-semibold">{order.payment.total.toFixed(2)} €</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Informations client
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Nom:</strong> {order.customer.name}</p>
                  <p><strong>Email:</strong> {order.customer.email}</p>
                  <p><strong>Téléphone:</strong> {order.customer.phone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Paiement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Méthode:</strong> {order.payment.method}</p>
                  <p><strong>Statut:</strong> {order.payment.status}</p>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Articles commandés
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-md"></div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium">{item.price.toFixed(2)} €</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Adresse de livraison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>{order.shipping.address}</p>
                  <p>{order.shipping.postalCode} {order.shipping.city}</p>
                  <p>{order.shipping.country}</p>
                </div>
              </CardContent>
            </Card>

            {/* Order History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="w-5 h-5 mr-2" />
                  Historique de la commande
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.timeline.map((event, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {event.status === "Commande créée" && <Package className="w-5 h-5 text-blue-500" />}
                        {event.status === "Paiement confirmé" && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                        {event.status === "En cours de traitement" && <Clock className="w-5 h-5 text-yellow-500" />}
                        {event.status === "Expédié" && <Truck className="w-5 h-5 text-purple-500" />}
                        {event.status === "Livré" && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                        {event.status === "Annulé" && <AlertCircle className="w-5 h-5 text-red-500" />}
                      </div>
                      <div>
                        <p className="font-medium">{event.status}</p>
                        <p className="text-sm text-gray-500">
                          {format(event.date, 'PPP', { locale: fr })}
                        </p>
                        <p className="text-sm text-gray-600">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Status Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleStatusChange('processing')}
                  >
                    Marquer comme en cours
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleStatusChange('shipped')}
                  >
                    Marquer comme expédié
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleStatusChange('delivered')}
                  >
                    Marquer comme livré
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => handleStatusChange('cancelled')}
                  >
                    Annuler la commande
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
