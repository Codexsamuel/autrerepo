"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Hotel,
  Users,
  Star,
  Calendar,
  CreditCard,
  Shield,
  Activity,
  BarChart3,
  Settings2,
  Wrench,
  Zap,
  Building2,
  BedDouble,
  Utensils,
  Waves,
  Heart,
  Dumbbell,
  Wifi,
  Car,
  Plane,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react"
import Link from "next/link"

interface ServiceStatus {
  name: string;
  status: "online" | "offline" | "maintenance";
  lastCheck: Date;
  latency: number;
}

interface ServicesStatus {
  [key: string]: ServiceStatus;
}

export default function DLHospitalityPage() {
  const [loading, setLoading] = useState(true);
  const [servicesStatus, setServicesStatus] = useState<ServicesStatus>({
    reservations: { status: "online", lastCheck: new Date(), latency: 45 },
    checkIn: { status: "online", lastCheck: new Date(), latency: 32 },
    housekeeping: { status: "online", lastCheck: new Date(), latency: 28 },
    roomService: { status: "online", lastCheck: new Date(), latency: 35 },
    spa: { status: "online", lastCheck: new Date(), latency: 40 },
    pool: { status: "online", lastCheck: new Date(), latency: 38 },
    restaurant: { status: "online", lastCheck: new Date(), latency: 42 },
    transport: { status: "online", lastCheck: new Date(), latency: 30 }
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Simuler le chargement des données
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/novacore" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour au Hub
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              DL Hospitality
            </h1>
            <p className="text-gray-600 text-lg">Gestion complète de vos services hôteliers</p>
          </div>
          <Badge className="bg-green-100 text-green-800 px-4 py-2">
            <Activity className="h-4 w-4 mr-2" />
            {servicesStatus.reservations.status === "online" ? "En ligne" : "Hors ligne"}
          </Badge>
        </div>
      </div>

      {/* Statistiques en temps réel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Chambres Occupées
            </CardTitle>
            <Hotel className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-gray-500">+2% par rapport à hier</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Réservations
            </CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-gray-500">+5 aujourd'hui</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Satisfaction
            </CardTitle>
            <Star className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-gray-500">+0.2 ce mois</p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">
              Revenus
            </CardTitle>
            <CreditCard className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€12,450</div>
            <p className="text-xs text-gray-500">+15% ce mois</p>
          </CardContent>
        </Card>
      </div>

      {/* Services Hôtel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hotel className="h-5 w-5" />
              Services Hôtel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Waves className="h-4 w-4 text-blue-500" />
                  <span>Piscine</span>
                </div>
                <Badge variant="success">Opérationnel</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>Spa</span>
                </div>
                <Badge variant="success">Opérationnel</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Utensils className="h-4 w-4 text-orange-500" />
                  <span>Restaurant</span>
                </div>
                <Badge variant="success">Opérationnel</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-green-500" />
                  <span>WiFi</span>
                </div>
                <Badge variant="success">Opérationnel</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Services Additionnels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-purple-500" />
                  <span>Transport</span>
                </div>
                <Badge variant="success">Opérationnel</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Plane className="h-4 w-4 text-blue-500" />
                  <span>Transfert Aéroport</span>
                </div>
                <Badge variant="success">Opérationnel</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-green-500" />
                  <span>Paiement</span>
                </div>
                <Badge variant="success">Opérationnel</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span>Assurance</span>
                </div>
                <Badge variant="success">Opérationnel</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Support Client
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-500" />
                  <span>Assistance 24/7</span>
                </div>
                <Badge variant="success">Opérationnel</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-red-500" />
                  <span>Support Email</span>
                </div>
                <Badge variant="success">Opérationnel</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-500" />
                  <span>Conciergerie</span>
                </div>
                <Badge variant="success">Opérationnel</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span>Service 24h</span>
                </div>
                <Badge variant="success">Opérationnel</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions Rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button variant="outline" className="w-full justify-start">
          <Calendar className="mr-2 h-4 w-4" />
          Gérer les Réservations
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <Users className="mr-2 h-4 w-4" />
          Gérer le Personnel
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <Settings2 className="mr-2 h-4 w-4" />
          Configuration
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <BarChart3 className="mr-2 h-4 w-4" />
          Rapports
        </Button>
      </div>
    </div>
  );
} 