"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Users, 
  Clock, 
  Plus,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Edit
} from "lucide-react";

export default function TablesPage() {
  const router = useRouter();
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const tables = [
    { 
      id: "A1", 
      capacity: 2, 
      status: "available", 
      currentOrder: null,
      location: "Terrasse",
      description: "Table romantique pour 2 personnes"
    },
    { 
      id: "A2", 
      capacity: 4, 
      status: "occupied", 
      currentOrder: { items: 3, total: 45.50, time: "12:30" },
      location: "Salle principale",
      description: "Table standard pour 4 personnes"
    },
    { 
      id: "A3", 
      capacity: 4, 
      status: "reserved", 
      currentOrder: null,
      location: "Salle principale",
      description: "Table réservée pour 19:00"
    },
    { 
      id: "B1", 
      capacity: 6, 
      status: "reserved", 
      currentOrder: null,
      location: "Salle privée",
      description: "Table pour groupe de 6 personnes"
    },
    { 
      id: "B2", 
      capacity: 4, 
      status: "occupied", 
      currentOrder: { items: 2, total: 32.00, time: "12:25" },
      location: "Salle principale",
      description: "Table standard pour 4 personnes"
    },
    { 
      id: "C1", 
      capacity: 8, 
      status: "available", 
      currentOrder: null,
      location: "Salle privée",
      description: "Grande table pour événements"
    },
    { 
      id: "C2", 
      capacity: 6, 
      status: "reserved", 
      currentOrder: null,
      location: "Salle privée",
      description: "Table pour groupe de 6 personnes"
    },
    { 
      id: "T1", 
      capacity: 2, 
      status: "available", 
      currentOrder: null,
      location: "Terrasse",
      description: "Table terrasse pour 2 personnes"
    },
    { 
      id: "T2", 
      capacity: 4, 
      status: "available", 
      currentOrder: null,
      location: "Terrasse",
      description: "Table terrasse pour 4 personnes"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800 border-green-200";
      case "occupied": return "bg-red-100 text-red-800 border-red-200";
      case "reserved": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "maintenance": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available": return "Libre";
      case "occupied": return "Occupée";
      case "reserved": return "Réservée";
      case "maintenance": return "Maintenance";
      default: return "Inconnu";
    }
  };

  const getLocationColor = (location: string) => {
    switch (location) {
      case "Terrasse": return "bg-blue-50 text-blue-700";
      case "Salle principale": return "bg-purple-50 text-purple-700";
      case "Salle privée": return "bg-orange-50 text-orange-700";
      default: return "bg-gray-50 text-gray-700";
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
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">Gestion des Tables</span>
                <span className="text-sm text-gray-500">Plan et statut des tables</span>
              </div>
            </div>
            <Button onClick={() => router.push("/demo/dl-restaurant/tables/new")}>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Table
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Tables Libres</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {tables.filter(t => t.status === "available").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Tables Occupées</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {tables.filter(t => t.status === "occupied").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Tables Réservées</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {tables.filter(t => t.status === "reserved").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Places</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {tables.reduce((sum, table) => sum + table.capacity, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tables.map((table) => (
            <Card 
              key={table.id} 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedTable === table.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedTable(table.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-gray-900">{table.id}</div>
                  <Badge className={getStatusColor(table.status)}>
                    {getStatusText(table.status)}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{table.capacity} places</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <Badge variant="outline" className={getLocationColor(table.location)}>
                      {table.location}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600">{table.description}</p>

                  {table.currentOrder && (
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Commande en cours</span>
                        <span className="text-orange-600 font-bold">{table.currentOrder.total} €</span>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {table.currentOrder.items} articles • {table.currentOrder.time}
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-2 pt-2">
                    {table.status === "available" && (
                      <Button size="sm" className="flex-1">
                        <Plus className="w-4 h-4 mr-1" />
                        Réserver
                      </Button>
                    )}
                    {table.status === "occupied" && (
                      <Button size="sm" variant="outline" className="flex-1">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Libérer
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Table Plan View */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Plan des Tables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 p-8 rounded-lg">
              <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                {tables.slice(0, 8).map((table) => (
                  <div
                    key={table.id}
                    className={`aspect-square rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all ${
                      table.status === "available" ? "bg-green-200 border-green-400" :
                      table.status === "occupied" ? "bg-red-200 border-red-400" :
                      "bg-yellow-200 border-yellow-400"
                    }`}
                    onClick={() => setSelectedTable(table.id)}
                  >
                    <div className="text-center">
                      <div className="font-bold text-lg">{table.id}</div>
                      <div className="text-xs">{table.capacity}p</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4 text-sm text-gray-600">
                <div className="flex items-center justify-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-200 border border-green-400 rounded"></div>
                    <span>Libre</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-200 border border-red-400 rounded"></div>
                    <span>Occupée</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-200 border border-yellow-400 rounded"></div>
                    <span>Réservée</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 