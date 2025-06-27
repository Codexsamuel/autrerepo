"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Phone
} from "lucide-react";

export default function DLRestaurantDashboard() {
  const [stats, setStats] = useState({
    totalSales: 45680,
    totalOrders: 892,
    totalCustomers: 1247,
    averageOrderValue: 51.2,
    averageRating: 4.6,
    activeTables: 12
  });

  const router = useRouter();

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">DL Restaurant - Gestion de Restaurant</h1>
        <p className="text-gray-600">Plateforme complète de gestion de restaurant et de service client</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
            <CardTitle className="text-sm font-medium">Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Clients servis</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Panier Moyen</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageOrderValue} €</div>
            <p className="text-xs text-muted-foreground">Valeur moyenne par commande</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Note Moyenne</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageRating}/5</div>
            <p className="text-xs text-muted-foreground">Satisfaction client</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tables Actives</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeTables}</div>
            <p className="text-xs text-muted-foreground">Tables occupées</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Button onClick={() => router.push("/demo/dl-restaurant/orders")} className="h-20 flex flex-col items-center justify-center">
          <Receipt className="h-6 w-6 mb-2" />
          <span>Gérer les Commandes</span>
        </Button>
        <Button onClick={() => router.push("/demo/dl-restaurant/menu")} variant="outline" className="h-20 flex flex-col items-center justify-center">
          <Utensils className="h-6 w-6 mb-2" />
          <span>Gérer le Menu</span>
        </Button>
        <Button onClick={() => router.push("/demo/dl-restaurant/tables")} variant="outline" className="h-20 flex flex-col items-center justify-center">
          <MapPin className="h-6 w-6 mb-2" />
          <span>Gérer les Tables</span>
        </Button>
        <Button onClick={() => router.push("/demo/dl-restaurant/staff")} variant="outline" className="h-20 flex flex-col items-center justify-center">
          <ChefHat className="h-6 w-6 mb-2" />
          <span>Gérer le Personnel</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Commandes en Cours</CardTitle>
            <Button onClick={() => router.push("/demo/dl-restaurant/orders")}>Voir toutes les commandes</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: "1", tableNumber: "A5", items: 3, total: 45.50, status: "preparing", time: "12:30" },
              { id: "2", tableNumber: "B2", items: 2, total: 32.00, status: "ready", time: "12:25" },
              { id: "3", tableNumber: "C8", items: 4, total: 67.80, status: "served", time: "12:20" }
            ].map((order) => (
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
    </div>
  );
}