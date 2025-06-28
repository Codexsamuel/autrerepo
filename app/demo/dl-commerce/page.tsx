"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Package, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Star,
  ShoppingBag,
  CreditCard,
  Truck,
  BarChart3
} from "lucide-react";

export default function DLCommerceDashboard() {
  const [stats, setStats] = useState({
    totalSales: 89250,
    totalOrders: 1247,
    totalProducts: 856,
    totalCustomers: 3420,
    averageOrderValue: 71.5,
    conversionRate: 3.2
  });

  const router = useRouter();

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">DL Commerce - Gestion E-commerce</h1>
        <p className="text-gray-600">Plateforme complète de gestion de boutique en ligne et de vente</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventes Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSales.toLocaleString()} €</div>
            <p className="text-xs text-muted-foreground">+18% par rapport au mois dernier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Commandes traitées</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produits</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">Produits en catalogue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Clients enregistrés</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Panier Moyen</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageOrderValue} €</div>
            <p className="text-xs text-muted-foreground">Valeur moyenne par commande</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de Conversion</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">Visiteurs vers clients</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Button onClick={() => router.push("/demo/dl-commerce/products")} className="h-20 flex flex-col items-center justify-center">
          <Package className="h-6 w-6 mb-2" />
          <span>Gérer les Produits</span>
        </Button>
        <Button onClick={() => router.push("/demo/dl-commerce/orders")} variant="outline" className="h-20 flex flex-col items-center justify-center">
          <ShoppingCart className="h-6 w-6 mb-2" />
          <span>Gérer les Commandes</span>
        </Button>
        <Button onClick={() => router.push("/demo/dl-commerce/customers")} variant="outline" className="h-20 flex flex-col items-center justify-center">
          <Users className="h-6 w-6 mb-2" />
          <span>Gérer les Clients</span>
        </Button>
        <Button onClick={() => router.push("/demo/dl-commerce/analytics")} variant="outline" className="h-20 flex flex-col items-center justify-center">
          <BarChart3 className="h-6 w-6 mb-2" />
          <span>Analytics</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Commandes Récentes</CardTitle>
            <Button onClick={() => router.push("/demo/dl-commerce/orders")}>Voir toutes les commandes</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: "1", customerName: "Marie Dubois", total: 89.99, status: "shipped", items: 3 },
              { id: "2", customerName: "Jean Martin", total: 156.50, status: "processing", items: 5 },
              { id: "3", customerName: "Sophie Bernard", total: 234.00, status: "delivered", items: 2 }
            ].map((order: any) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <ShoppingCart className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{order.customerName}</h4>
                    <p className="text-sm text-gray-600">{order.items} articles</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{order.total} €</p>
                  <Badge className={
                    order.status === "delivered" ? "bg-green-100 text-green-800" :
                    order.status === "shipped" ? "bg-blue-100 text-blue-800" :
                    "bg-yellow-100 text-yellow-800"
                  }>
                    {order.status === "delivered" ? "Livré" :
                     order.status === "shipped" ? "Expédié" : "En cours"}
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