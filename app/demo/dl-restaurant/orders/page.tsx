"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Receipt, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Plus,
  Search,
  Filter,
  ArrowLeft
} from "lucide-react";

export default function OrdersPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const orders = [
    {
      id: "ORD-001",
      tableNumber: "A2",
      customerName: "Jean Dupont",
      items: [
        { name: "Entrecôte Grillée", quantity: 1, price: 28.50 },
        { name: "Vin Rouge", quantity: 2, price: 6.50 },
        { name: "Tiramisu", quantity: 1, price: 8.50 }
      ],
      total: 50.00,
      status: "preparing",
      time: "12:30",
      estimatedTime: "15 min"
    },
    {
      id: "ORD-002",
      tableNumber: "B2",
      customerName: "Marie Martin",
      items: [
        { name: "Salade César", quantity: 1, price: 12.00 },
        { name: "Eau minérale", quantity: 2, price: 3.00 }
      ],
      total: 18.00,
      status: "ready",
      time: "12:25",
      estimatedTime: "5 min"
    },
    {
      id: "ORD-003",
      tableNumber: "C8",
      customerName: "Pierre Durand",
      items: [
        { name: "Menu du jour", quantity: 4, price: 15.00 },
        { name: "Vin blanc", quantity: 2, price: 7.00 },
        { name: "Café", quantity: 4, price: 2.50 }
      ],
      total: 67.80,
      status: "served",
      time: "12:20",
      estimatedTime: "0 min"
    },
    {
      id: "ORD-004",
      tableNumber: "A5",
      customerName: "Sophie Bernard",
      items: [
        { name: "Pizza Margherita", quantity: 1, price: 16.00 },
        { name: "Coca-Cola", quantity: 1, price: 3.50 }
      ],
      total: 19.50,
      status: "preparing",
      time: "12:35",
      estimatedTime: "12 min"
    }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.tableNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing": return "bg-yellow-100 text-yellow-800";
      case "ready": return "bg-blue-100 text-blue-800";
      case "served": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "preparing": return "En préparation";
      case "ready": return "Prêt";
      case "served": return "Servi";
      case "cancelled": return "Annulé";
      default: return "Inconnu";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.push("/demo/dl-restaurant")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Receipt className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">Gestion des Commandes</span>
                <span className="text-sm text-gray-500">Suivi et gestion des commandes</span>
              </div>
            </div>
            <Button onClick={() => router.push("/demo/dl-restaurant/orders/new")}>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Commande
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher par client, table ou numéro de commande..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
              >
                Toutes
              </Button>
              <Button
                variant={filterStatus === "preparing" ? "default" : "outline"}
                onClick={() => setFilterStatus("preparing")}
              >
                En préparation
              </Button>
              <Button
                variant={filterStatus === "ready" ? "default" : "outline"}
                onClick={() => setFilterStatus("ready")}
              >
                Prêtes
              </Button>
              <Button
                variant={filterStatus === "served" ? "default" : "outline"}
                onClick={() => setFilterStatus("served")}
              >
                Servies
              </Button>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-lg">{order.id}</span>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusText(order.status)}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">
                        Table {order.tableNumber} • {order.time}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="font-medium text-gray-900 mb-2">{order.customerName}</h3>
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.quantity}x {item.name}</span>
                            <span className="text-gray-600">{(item.quantity * item.price).toFixed(2)} €</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-gray-900">
                        Total: {order.total.toFixed(2)} €
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{order.estimatedTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-6">
                    {order.status === "preparing" && (
                      <>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Prêt
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                          <XCircle className="w-4 h-4 mr-1" />
                          Annuler
                        </Button>
                      </>
                    )}
                    {order.status === "ready" && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Servi
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      Détails
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Receipt className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune commande trouvée</h3>
              <p className="text-gray-500">Aucune commande ne correspond à vos critères de recherche.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 