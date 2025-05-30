"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Package,
  ChevronRight,
  Home,
  Printer,
  FileText,
  Truck,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Edit,
} from "lucide-react"
import Link from "next/link"

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const orderId = params.id

  // Simulated order data
  const order = {
    id: orderId,
    customer: "Marie Kouam",
    date: "15/01/2024",
    status: "Livré",
    total: "187,000 FCFA",
    items: [
      {
        id: "PROD-1234",
        name: "Smartphone Galaxy A53",
        price: "175,000 FCFA",
        quantity: 1,
        subtotal: "175,000 FCFA",
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "PROD-5678",
        name: "Coque de protection",
        price: "5,000 FCFA",
        quantity: 2,
        subtotal: "10,000 FCFA",
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    payment: {
      method: "Mobile Money",
      status: "Payé",
      transactionId: "MM123456789",
      date: "15/01/2024",
    },
    shipping: {
      method: "Livraison standard",
      cost: "2,000 FCFA",
      address: "123 Rue Principale, Yaoundé",
      trackingNumber: "TRK123456789",
      estimatedDelivery: "17/01/2024",
      actualDelivery: "16/01/2024",
    },
    customerInfo: {
      name: "Marie Kouam",
      email: "marie.kouam@email.com",
      phone: "+237 677 123 456",
      address: "123 Rue Principale, Yaoundé",
    },
    timeline: [
      {
        date: "15/01/2024 08:15",
        status: "Commande reçue",
        description: "Commande placée par le client",
      },
      {
        date: "15/01/2024 09:30",
        status: "Paiement confirmé",
        description: "Paiement Mobile Money reçu",
      },
      {
        date: "15/01/2024 14:45",
        status: "En préparation",
        description: "Commande en cours de préparation",
      },
      {
        date: "16/01/2024 08:30",
        status: "Expédiée",
        description: "Commande remise au livreur",
      },
      {
        date: "16/01/2024 14:20",
        status: "Livrée",
        description: "Commande livrée au client",
      },
    ],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Livré":
        return "bg-green-100 text-green-800"
      case "En cours":
        return "bg-blue-100 text-blue-800"
      case "En attente":
        return "bg-yellow-100 text-yellow-800"
      case "Annulé":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Livré":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "En cours":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "En attente":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "Annulé":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const breadcrumbs = [
    { name: "Accueil", href: "/demo/dl-commerce" },
    { name: "Commandes", href: "/demo/dl-commerce/commandes" },
    { name: orderId, href: `/demo/dl-commerce/commandes/${orderId}` },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/demo/dl-commerce/commandes">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </Link>
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Détails de la commande {orderId}</h1>
                  <p className="text-sm text-muted-foreground">DL Commerce ERP</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Printer className="h-4 w-4 mr-2" />
                Imprimer
              </Button>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Facture
              </Button>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Modifier
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-2">
          <div className="flex items-center text-sm">
            {breadcrumbs.map((breadcrumb, i) => (
              <div key={i} className="flex items-center">
                {i > 0 && <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />}
                <Link href={breadcrumb.href} className="text-gray-600 hover:text-blue-600">
                  {i === 0 ? <Home className="h-4 w-4" /> : breadcrumb.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-600" />
                  Résumé de la commande
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">ID:</span>
                    <span className="font-medium">{order.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Date:</span>
                    <span>{order.date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Statut:</span>
                    <Badge className={getStatusColor(order.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        {order.status}
                      </div>
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Total:</span>
                    <span className="font-bold">{order.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Paiement:</span>
                    <span>{order.payment.method}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Livraison:</span>
                    <span>{order.shipping.method}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  Informations client
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">{order.customerInfo.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <Mail className="h-4 w-4" />
                      <span>{order.customerInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <Phone className="h-4 w-4" />
                      <span>{order.customerInfo.phone}</span>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-medium">Adresse de livraison</h3>
                    <p className="text-sm text-gray-500 mt-1">{order.shipping.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-orange-600" />
                  Livraison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Méthode:</span>
                    <span>{order.shipping.method}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Coût:</span>
                    <span>{order.shipping.cost}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Numéro de suivi:</span>
                    <span className="font-medium">{order.shipping.trackingNumber}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Livraison estimée:</span>
                    <span>{order.shipping.estimatedDelivery}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Livraison réelle:</span>
                    <span className="font-medium text-green-600">{order.shipping.actualDelivery}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-600" />
                Articles commandés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium text-gray-500">Produit</th>
                      <th className="text-center p-4 font-medium text-gray-500">Prix unitaire</th>
                      <th className="text-center p-4 font-medium text-gray-500">Quantité</th>
                      <th className="text-right p-4 font-medium text-gray-500">Sous-total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="p-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">ID: {item.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-center">{item.price}</td>
                        <td className="p-4 text-center">{item.quantity}</td>
                        <td className="p-4 text-right font-medium">{item.subtotal}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-b">
                      <td colSpan={3} className="p-4 text-right font-medium">
                        Sous-total:
                      </td>
                      <td className="p-4 text-right font-medium">185,000 FCFA</td>
                    </tr>
                    <tr className="border-b">
                      <td colSpan={3} className="p-4 text-right font-medium">
                        Livraison:
                      </td>
                      <td className="p-4 text-right">{order.shipping.cost}</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="p-4 text-right font-bold">
                        Total:
                      </td>
                      <td className="p-4 text-right font-bold">{order.total}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-purple-600" />
                Informations de paiement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Détails du paiement</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Méthode:</span>
                      <span>{order.payment.method}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Statut:</span>
                      <Badge className="bg-green-100 text-green-800">{order.payment.status}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">ID Transaction:</span>
                      <span className="font-medium">{order.payment.transactionId}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Date de paiement:</span>
                      <span>{order.payment.date}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Historique de la commande</h3>
                  <div className="space-y-3">
                    {order.timeline.map((event, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{event.status}</p>
                          <p className="text-xs text-gray-500">{event.description}</p>
                          <p className="text-xs text-gray-400">{event.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
