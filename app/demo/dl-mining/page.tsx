"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  HardHat, 
  Truck, 
  BarChart3, 
  DollarSign, 
  AlertTriangle, 
  TrendingUp,
  MapPin,
  Users,
  Zap,
  Shield
} from "lucide-react";

export default function DLMiningDashboard() {
  const [stats, setStats] = useState({
    totalProduction: 15420,
    activeSites: 8,
    totalRevenue: 8925000,
    safetyScore: 98.5,
    pendingInspections: 3,
    equipmentUtilization: 87.2
  });

  const router = useRouter();

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">DL Mining - Gestion Minière</h1>
        <p className="text-gray-600">Plateforme complète de gestion des opérations minières et de la production</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Production Totale (tonnes)</CardTitle>
            <HardHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProduction.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+15% par rapport au mois dernier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sites Actifs</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeSites}</div>
            <p className="text-xs text-muted-foreground">Sites en exploitation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus Totaux</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()} €</div>
            <p className="text-xs text-muted-foreground">+12% par rapport au mois dernier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score de Sécurité</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.safetyScore}%</div>
            <p className="text-xs text-muted-foreground">Excellent niveau de sécurité</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inspections en Attente</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingInspections}</div>
            <p className="text-xs text-muted-foreground">Nécessitent une attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisation Équipement</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.equipmentUtilization}%</div>
            <p className="text-xs text-muted-foreground">Efficacité optimale</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Button onClick={() => router.push("/demo/dl-mining/sites")} className="h-20 flex flex-col items-center justify-center">
          <MapPin className="h-6 w-6 mb-2" />
          <span>Gérer les Sites</span>
        </Button>
        <Button onClick={() => router.push("/demo/dl-mining/production")} variant="outline" className="h-20 flex flex-col items-center justify-center">
          <BarChart3 className="h-6 w-6 mb-2" />
          <span>Suivi Production</span>
        </Button>
        <Button onClick={() => router.push("/demo/dl-mining/equipment")} variant="outline" className="h-20 flex flex-col items-center justify-center">
          <Truck className="h-6 w-6 mb-2" />
          <span>Gérer Équipements</span>
        </Button>
        <Button onClick={() => router.push("/demo/dl-mining/safety")} variant="outline" className="h-20 flex flex-col items-center justify-center">
          <Shield className="h-6 w-6 mb-2" />
          <span>Sécurité</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Production par Site</CardTitle>
            <Button onClick={() => router.push("/demo/dl-mining/sites")}>Voir tous les sites</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: "1", name: "Site A - Cuivre", production: 4200, status: "active", efficiency: 95 },
              { id: "2", name: "Site B - Or", production: 3800, status: "active", efficiency: 92 },
              { id: "3", name: "Site C - Fer", production: 2800, status: "maintenance", efficiency: 78 }
            ].map((site) => (
              <div key={site.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-orange-100 rounded-full">
                    <HardHat className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{site.name}</h4>
                    <p className="text-sm text-gray-600">Production: {site.production} tonnes</p>
                    <p className="text-xs text-gray-500">Efficacité: {site.efficiency}%</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={site.status === "active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                    {site.status === "active" ? "Actif" : "Maintenance"}
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