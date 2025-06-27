"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plane, 
  Hotel, 
  MapPin, 
  Users, 
  TrendingUp, 
  DollarSign,
  Calendar,
  Star,
  Plus,
  Search,
  Filter
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface TravelStats {
  totalBookings: number;
  activeTrips: number;
  totalRevenue: number;
  averageRating: number;
  pendingReservations: number;
  completedTrips: number;
}

interface RecentBooking {
  id: string;
  clientName: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  totalPrice: number;
  status: string;
}

export default function DLTravelDashboard() {
  const [stats, setStats] = useState<TravelStats>({
    totalBookings: 0,
    activeTrips: 0,
    totalRevenue: 0,
    averageRating: 0,
    pendingReservations: 0,
    completedTrips: 0
  });
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    setLoading(true);
    // Simuler des données pour la démo
    setStats({
      totalBookings: 1247,
      activeTrips: 89,
      totalRevenue: 456789,
      averageRating: 4.7,
      pendingReservations: 23,
      completedTrips: 1158
    });

    setRecentBookings([
      {
        id: "1",
        clientName: "Marie Dubois",
        destination: "Bali, Indonésie",
        departureDate: "2024-02-15",
        returnDate: "2024-02-22",
        totalPrice: 1899,
        status: "confirmed"
      },
      {
        id: "2",
        clientName: "Jean Martin",
        destination: "Tokyo, Japon",
        departureDate: "2024-02-20",
        returnDate: "2024-02-28",
        totalPrice: 2450,
        status: "pending"
      },
      {
        id: "3",
        clientName: "Sophie Bernard",
        destination: "New York, USA",
        departureDate: "2024-03-01",
        returnDate: "2024-03-08",
        totalPrice: 3200,
        status: "confirmed"
      }
    ]);
    setLoading(false);
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">DL Travel - Gestion des Voyages</h1>
        <p className="text-gray-600">Plateforme complète de gestion de voyages et réservations</p>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Réservations Totales</CardTitle>
            <Plane className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Voyages Actifs</CardTitle>
            <Hotel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeTrips}</div>
            <p className="text-xs text-muted-foreground">
              Voyages en cours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus Totaux</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()} €</div>
            <p className="text-xs text-muted-foreground">
              +8% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Note Moyenne</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageRating}/5</div>
            <p className="text-xs text-muted-foreground">
              Basée sur {stats.completedTrips} voyages
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Réservations en Attente</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReservations}</div>
            <p className="text-xs text-muted-foreground">
              Nécessitent une confirmation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Voyages Terminés</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedTrips}</div>
            <p className="text-xs text-muted-foreground">
              Cette année
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Button 
          onClick={() => router.push("/demo/dl-travel/reservations")}
          className="h-20 flex flex-col items-center justify-center"
        >
          <Plane className="h-6 w-6 mb-2" />
          <span>Gérer les Réservations</span>
        </Button>
        <Button 
          onClick={() => router.push("/demo/dl-travel/hotels")}
          variant="outline"
          className="h-20 flex flex-col items-center justify-center"
        >
          <Hotel className="h-6 w-6 mb-2" />
          <span>Gérer les Hôtels</span>
        </Button>
        <Button 
          onClick={() => router.push("/demo/dl-travel/vols")}
          variant="outline"
          className="h-20 flex flex-col items-center justify-center"
        >
          <Plane className="h-6 w-6 mb-2" />
          <span>Gérer les Vols</span>
        </Button>
        <Button 
          onClick={() => router.push("/demo/dl-travel/clients")}
          variant="outline"
          className="h-20 flex flex-col items-center justify-center"
        >
          <Users className="h-6 w-6 mb-2" />
          <span>Gérer les Clients</span>
        </Button>
      </div>

      {/* Réservations récentes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Réservations Récentes</CardTitle>
            <Button onClick={() => router.push("/demo/dl-travel/reservations")}>
              Voir toutes
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Plane className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{booking.clientName}</h4>
                    <p className="text-sm text-gray-600">{booking.destination}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(booking.departureDate).toLocaleDateString()} - {new Date(booking.returnDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{booking.totalPrice} €</p>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status === "confirmed" ? "Confirmé" : 
                     booking.status === "pending" ? "En attente" : "Annulé"}
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