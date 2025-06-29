"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { 
  Utensils, 
  Users, 
  DollarSign, 
  Clock, 
  Star, 
  TrendingUp,
  ChefHat,
  Receipt,
  MapPin,
  Phone,
  Calendar as CalendarIcon,
  Plus,
  Settings,
  BarChart3,
  ChefHat as ChefIcon,
  ShoppingCart,
  Clock as ClockIcon
} from "lucide-react";

export default function DLRestaurantDashboard() {
  const [stats, setStats] = useState({
    totalSales: 45680,
    totalOrders: 892,
    totalCustomers: 1247,
    averageOrderValue: 51.2,
    averageRating: 4.6,
    activeTables: 12,
    reservations: 45,
    staffOnDuty: 8
  });

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [reservations, setReservations] = useState([
    { id: 1, name: "Martin Dupont", time: "19:00", guests: 4, table: "A3", status: "confirmed" },
    { id: 2, name: "Sophie Bernard", time: "20:30", guests: 2, table: "B1", status: "pending" },
    { id: 3, name: "Pierre Moreau", time: "19:30", guests: 6, table: "C2", status: "confirmed" },
    { id: 4, name: "Marie Dubois", time: "21:00", guests: 3, table: "A5", status: "confirmed" }
  ]);

  const [tables, setTables] = useState([
    { id: "A1", capacity: 2, status: "available", currentOrder: null },
    { id: "A2", capacity: 4, status: "occupied", currentOrder: { items: 3, total: 45.50 } },
    { id: "A3", capacity: 4, status: "reserved", currentOrder: null },
    { id: "B1", capacity: 6, status: "reserved", currentOrder: null },
    { id: "B2", capacity: 4, status: "occupied", currentOrder: { items: 2, total: 32.00 } },
    { id: "C1", capacity: 8, status: "available", currentOrder: null },
    { id: "C2", capacity: 6, status: "reserved", currentOrder: null }
  ]);

  const [menu, setMenu] = useState([
    { id: 1, name: "Entrecôte Grillée", category: "Plats", price: 28.50, available: true },
    { id: 2, name: "Salade César", category: "Entrées", price: 12.00, available: true },
    { id: 3, name: "Tiramisu", category: "Desserts", price: 8.50, available: true },
    { id: 4, name: "Vin Rouge", category: "Boissons", price: 6.50, available: true }
  ]);

  const [staff, setStaff] = useState([
    { id: 1, name: "Jean Dupont", role: "Chef", status: "on-duty", shift: "18:00-23:00" },
    { id: 2, name: "Marie Martin", role: "Serveur", status: "on-duty", shift: "17:00-22:00" },
    { id: 3, name: "Pierre Durand", role: "Cuisinier", status: "on-duty", shift: "18:00-23:00" },
    { id: 4, name: "Sophie Bernard", role: "Serveur", status: "off-duty", shift: "12:00-17:00" }
  ]);

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">DL Restaurant</span>
                <span className="text-sm text-gray-500">Gestion de Restaurant</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Clock className="w-3 h-3 mr-1" />
                Ouvert
              </Badge>
              <Button onClick={() => router.push("/")} variant="outline">
                Retour au site
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventes Totales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSales.toLocaleString()} €</div>
              <p className="text-xs text-muted-foreground">+22% par rapport au mois dernier</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commandes</CardTitle>
              <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Commandes traitées</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Réservations</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.reservations}</div>
              <p className="text-xs text-muted-foreground">Aujourd'hui</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Personnel</CardTitle>
              <ChefIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.staffOnDuty}</div>
              <p className="text-xs text-muted-foreground">En service</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Calendar & Reservations */}
          <div className="lg:col-span-1 space-y-6">
            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5" />
                  <span>Calendrier des Réservations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Reservations */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Réservations du Jour</CardTitle>
                  <Button size="sm" onClick={() => router.push("/demo/dl-restaurant/reservations")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reservations.map((reservation) => (
                    <div key={reservation.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-sm">{reservation.name}</h4>
                        <p className="text-xs text-gray-600">
                          {reservation.time} • {reservation.guests} personnes • Table {reservation.table}
                        </p>
                      </div>
                      <Badge className={
                        reservation.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }>
                        {reservation.status === "confirmed" ? "Confirmée" : "En attente"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Tables & Orders */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tables Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>État des Tables</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {tables.map((table) => (
                    <div
                      key={table.id}
                      className={`p-4 rounded-lg border-2 text-center cursor-pointer transition-all ${
                        table.status === "available" ? "bg-green-50 border-green-200" :
                        table.status === "occupied" ? "bg-red-50 border-red-200" :
                        "bg-yellow-50 border-yellow-200"
                      }`}
                      onClick={() => router.push(`/demo/dl-restaurant/tables/${table.id}`)}
                    >
                      <div className="font-bold text-lg">{table.id}</div>
                      <div className="text-sm text-gray-600">{table.capacity} places</div>
                      <Badge className={
                        table.status === "available" ? "bg-green-100 text-green-800" :
                        table.status === "occupied" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }>
                        {table.status === "available" ? "Libre" :
                         table.status === "occupied" ? "Occupée" : "Réservée"}
                      </Badge>
                      {table.currentOrder && (
                        <div className="text-xs text-gray-500 mt-1">
                          {table.currentOrder.total} €
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Orders */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Commandes en Cours</CardTitle>
                  <Button onClick={() => router.push("/demo/dl-restaurant/orders")}>
                    Voir toutes
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: "1", tableNumber: "A2", items: 3, total: 45.50, status: "preparing", time: "12:30" },
                    { id: "2", tableNumber: "B2", items: 2, total: 32.00, status: "ready", time: "12:25" },
                    { id: "3", tableNumber: "C8", items: 4, total: 67.80, status: "served", time: "12:20" }
                  ].map((order: any) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-orange-100 rounded-full">
                          <Receipt className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Table {order.tableNumber}</h4>
                          <p className="text-sm text-gray-600">{order.items} articles - {order.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{order.total} €</p>
                        <Badge className={
                          order.status === "served" ? "bg-green-100 text-green-800" :
                          order.status === "ready" ? "bg-blue-100 text-blue-800" :
                          "bg-yellow-100 text-yellow-800"
                        }>
                          {order.status === "served" ? "Servi" :
                           order.status === "ready" ? "Prêt" : "En préparation"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button onClick={() => router.push("/demo/dl-restaurant/orders")} className="h-20 flex flex-col items-center justify-center">
                <Receipt className="h-6 w-6 mb-2" />
                <span>Commandes</span>
              </Button>
              <Button onClick={() => router.push("/demo/dl-restaurant/menu")} variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Utensils className="h-6 w-6 mb-2" />
                <span>Menu</span>
              </Button>
              <Button onClick={() => router.push("/demo/dl-restaurant/tables")} variant="outline" className="h-20 flex flex-col items-center justify-center">
                <MapPin className="h-6 w-6 mb-2" />
                <span>Tables</span>
              </Button>
              <Button onClick={() => router.push("/demo/dl-restaurant/staff")} variant="outline" className="h-20 flex flex-col items-center justify-center">
                <ChefIcon className="h-6 w-6 mb-2" />
                <span>Personnel</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}