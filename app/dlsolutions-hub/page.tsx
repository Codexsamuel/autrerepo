'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Users, DollarSign, CheckCircle, AlertCircle } from "lucide-react";

export default function DLSolutionsHub() {
  const [stats, setStats] = useState({
    users: 4800,
    revenue: 45200,
    services: 4,
    satisfaction: 98
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        users: Math.floor(Math.random() * 1000) + 4000,
        revenue: Math.floor(Math.random() * 5000) + 40000,
        services: 4,
        satisfaction: Math.floor(Math.random() * 3) + 96
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-6">
      {/* En-tête */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">NovaCore Hub</h1>
        <p className="text-xl text-gray-600">Centre de contrôle DL Solutions</p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Utilisateurs Actifs</p>
                <h3 className="text-2xl font-bold">{stats.users}+</h3>
              </div>
              <Badge variant="default" className="bg-green-500">+12%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Revenus Mensuel</p>
                <h3 className="text-2xl font-bold">€{stats.revenue}k</h3>
              </div>
              <Badge variant="default" className="bg-green-500">+8%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Services Actifs</p>
                <h3 className="text-2xl font-bold">{stats.services}</h3>
              </div>
              <Badge variant="default" className="bg-green-500">100%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Satisfaction</p>
                <h3 className="text-2xl font-bold">{stats.satisfaction}%</h3>
              </div>
              <Badge variant="default" className="bg-green-500">+2%</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services */}
      <h2 className="text-2xl font-bold mb-4">Services Disponibles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* NovaWorld */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>NovaWorld</CardTitle>
              <Badge variant="default" className="bg-green-500">Actif</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-2">Réseau social B2B professionnel avec IA</p>
            <p className="text-sm text-gray-500 mb-4">2.5k+ utilisateurs</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge>Networking IA</Badge>
              <Badge>Publications</Badge>
              <Badge>Entreprises</Badge>
              <Badge>Analytics</Badge>
            </div>
            <Button>Accéder au service</Button>
          </CardContent>
        </Card>

        {/* DL Style */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>DL Style</CardTitle>
              <Badge variant="default" className="bg-green-500">Actif</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-2">Boutique en ligne premium DL Solutions</p>
            <p className="text-sm text-gray-500 mb-4">1.2k+ utilisateurs</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge>E-commerce</Badge>
              <Badge>Paiements</Badge>
              <Badge>Inventory</Badge>
              <Badge>Analytics</Badge>
            </div>
            <Button>Accéder au service</Button>
          </CardContent>
        </Card>

        {/* DL Travel */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>DL Travel</CardTitle>
              <Badge variant="default" className="bg-green-500">Actif</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-2">Plateforme de vente de billets d'avion</p>
            <p className="text-sm text-gray-500 mb-4">850+ utilisateurs</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge>API Vols</Badge>
              <Badge>Réservations</Badge>
              <Badge>Commissions</Badge>
              <Badge>B2B/B2C</Badge>
            </div>
            <Button>Accéder au service</Button>
          </CardContent>
        </Card>

        {/* DL Bookmaker */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>DL Bookmaker</CardTitle>
              <Badge variant="default" className="bg-yellow-500">Bêta</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-2">Paris sportifs assistés par IA</p>
            <p className="text-sm text-gray-500 mb-4">320+ utilisateurs</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge>Prédictions IA</Badge>
              <Badge>Paris Live</Badge>
              <Badge>Analytics</Badge>
              <Badge>Wallet</Badge>
            </div>
            <Button>Accéder au service</Button>
          </CardContent>
        </Card>
      </div>

      {/* Activité Récente et État du Système */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Activité Récente */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Activité Récente</CardTitle>
              <Button variant="link">Voir tout</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Marie Dubois</p>
                  <p className="text-sm text-gray-500">Nouvelle inscription sur NovaWorld</p>
                  <p className="text-xs text-gray-400">Il y a 5 min</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 rounded-full">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Jean Martin</p>
                  <p className="text-sm text-gray-500">Commande validée sur DL Style</p>
                  <p className="text-xs text-gray-400">Il y a 12 min</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Sophie Laurent</p>
                  <p className="text-sm text-gray-500">Réservation vol sur DL Travel</p>
                  <p className="text-xs text-gray-400">Il y a 18 min</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* État du Système */}
        <Card>
          <CardHeader>
            <CardTitle>État du Système</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>API Status</span>
                <Badge variant="default" className="bg-green-500 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Opérationnel
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Base de données</span>
                <Badge variant="default" className="bg-green-500 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Opérationnel
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Services IA</span>
                <Badge variant="default" className="bg-green-500 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Opérationnel
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Paiements</span>
                <Badge variant="default" className="bg-green-500 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Opérationnel
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 