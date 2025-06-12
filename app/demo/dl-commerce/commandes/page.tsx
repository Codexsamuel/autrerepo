"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Package,
  Search,
  Filter,
  ArrowUpDown,
  ChevronRight,
  Home,
  Download,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  Printer,
  FileText,
} from "lucide-react"
import Link from "next/link"

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const orders = [
    {
      id: "ORD-5723",
      customer: "Marie Kouam",
      date: "15/01/2024",
      status: "Livré",
      total: "45,000 FCFA",
      items: 3,
      payment: "Mobile Money",
      paymentStatus: "Payé",
      address: "123 Rue Principale, Yaoundé",
      phone: "+237 677 123 456",
    },
    {
      id: "ORD-5722",
      customer: "Jean Mbarga",
      date: "14/01/2024",
      status: "En cours",
      total: "78,500 FCFA",
      items: 5,
      payment: "Carte bancaire",
      paymentStatus: "Payé",
      address: "45 Avenue Centrale, Douala",
      phone: "+237 699 987 654",
    },
    {
      id: "ORD-5721",
      customer: "Sophie Ndongo",
      date: "14/01/2024",
      status: "En attente",
      total: "12,000 FCFA",
      items: 1,
      payment: "Orange Money",
      paymentStatus: "En attente",
      address: "78 Rue du Commerce, Yaoundé",
      phone: "+237 655 789 123",
    },
    {
      id: "ORD-5720",
      customer: "Paul Biya",
      date: "13/01/2024",
      status: "Annulé",
      total: "35,000 FCFA",
      items: 2,
      payment: "Mobile Money",
      paymentStatus: "Remboursé",
      address: "15 Rue des Ministères, Yaoundé",
      phone: "+237 677 456 789",
    },
    {
      id: "ORD-5719",
      customer: "Alain Foka",
      date: "13/01/2024",
      status: "Livré",
      total: "125,000 FCFA",
      items: 7,
      payment: "Carte bancaire",
      paymentStatus: "Payé",
      address: "32 Avenue Kennedy, Douala",
      phone: "+237 699 123 456",
    },
  ]

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

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Payé":
        return "bg-green-100 text-green-800"
      case "En attente":
        return "bg-yellow-100 text-yellow-800"
      case "Remboursé":
        return "bg-purple-100 text-purple-800"
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

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())

    if (statusFilter === "all") return matchesSearch
    return matchesSearch && order.status === statusFilter
  })

  const breadcrumbs = [
    { name: "Accueil", href: "/demo/dl-commerce" },
    { name: "Commandes", href: "/demo/dl-commerce/commandes" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/demo/dl-commerce">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour
                </Link>
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Gestion des Commandes</h1>
                  <p className="text-sm text-muted-foreground">DL Commerce ERP</p>
                </div>
              </div>
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Commandes</h2>
              <p className="text-muted-foreground">Gérez toutes vos commandes en un seul endroit</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une commande..."
                  className="pl-10 w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtres
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>

          {/* Status Tabs */}
          <Tabs defaultValue="all" onValueChange={setStatusFilter}>
            <TabsList>
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="En attente">En attente</TabsTrigger>
              <TabsTrigger value="En cours">En cours</TabsTrigger>
              <TabsTrigger value="Livré">Livrées</TabsTrigger>
              <TabsTrigger value="Annulé">Annulées</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Orders Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-4 font-medium text-gray-500">
                        <div className="flex items-center gap-1">
                          ID
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </th>
                      <th className="text-left p-4 font-medium text-gray-500">Client</th>
                      <th className="text-left p-4 font-medium text-gray-500">
                        <div className="flex items-center gap-1">
                          Date
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </th>
                      <th className="text-left p-4 font-medium text-gray-500">Statut</th>
                      <th className="text-left p-4 font-medium text-gray-500">Paiement</th>
                      <th className="text-left p-4 font-medium text-gray-500">
                        <div className="flex items-center gap-1">
                          Total
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </th>
                      <th className="text-right p-4 font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{order.id}</td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium">{order.customer}</p>
                            <p className="text-sm text-gray-500">{order.phone}</p>
                          </div>
                        </td>
                        <td className="p-4">{order.date}</td>
                        <td className="p-4">
                          <Badge className={getStatusColor(order.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(order.status)}
                              {order.status}
                            </div>
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="text-sm">{order.payment}</p>
                            <Badge className={getPaymentStatusColor(order.paymentStatus)}>{order.paymentStatus}</Badge>
                          </div>
                        </td>
                        <td className="p-4 font-medium">{order.total}</td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="icon" variant="ghost" asChild>
                              <Link href={`/demo/dl-commerce/commandes/${order.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button size="icon" variant="ghost">
                              <Printer className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost">
                              <FileText className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Affichage de 1 à {filteredOrders.length} sur {orders.length} commandes
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Précédent
              </Button>
              <Button variant="outline" size="sm">
                Suivant
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">NovaCore</h3>
                <p className="text-sm text-gray-400">Powered by AI</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400 mb-1">Made by Samuel OBAM</p>
              <p className="text-sm text-gray-400 mb-1">CEO of DL Solutions</p>
              <p className="text-sm text-gray-400 mb-1">+237 694 341 586</p>
              <p className="text-sm text-gray-400 mb-1">Rue École de Police, Yaoundé</p>
              <p className="text-sm text-gray-400">sobam@daveandlucesolutions.com</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 pt-6 text-center">
            <p className="text-sm text-gray-400">
              © 2024 NovaCore ERP. Tous droits réservés. Développé par DL Solutions SARL.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
