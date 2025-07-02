"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Users, 
  Euro, 
  TrendingUp, 
  Plus,
  Home,
  MapPin,
  Calendar,
  DollarSign
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

interface DashboardStats {
  totalProperties: number;
  availableProperties: number;
  rentedProperties: number;
  soldProperties: number;
  totalClients: number;
  monthlyRevenue: number;
  totalRevenue: number;
  recentTransactions: any[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProperties: 0,
    availableProperties: 0,
    rentedProperties: 0,
    soldProperties: 0,
    totalClients: 0,
    monthlyRevenue: 0,
    totalRevenue: 0,
    recentTransactions: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const { data: properties } = await supabase.from('real_estate_properties').select('*');
      const { data: clients } = await supabase.from('clients').select('*');
      const { data: transactions } = await supabase.from('transactions').select('*');

      if (properties && clients && transactions) {
        setStats({
          totalProperties: properties.length,
          availableProperties: properties.filter((p: any) => p.status === 'available').length,
          rentedProperties: properties.filter((p: any) => p.status === 'rented').length,
          soldProperties: properties.filter((p: any) => p.status === 'sold').length,
          totalClients: clients.length,
          monthlyRevenue: transactions
            .filter((t: any) => t.status === 'completed')
            .reduce((sum: number, t: any) => sum + t.amount, 0),
          totalRevenue: transactions
            .filter((t: any) => t.status === 'completed')
            .reduce((sum: number, t: any) => sum + t.amount, 0),
          recentTransactions: transactions
        });
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Chargement...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard Immobilier</h1>
        <div className="flex gap-4">
          <Link href="/solutions/immobilier/biens/nouveau">
            <Button><Plus className="mr-2" />Nouveau bien</Button>
          </Link>
          <Link href="/solutions/immobilier/clients/nouveau">
            <Button variant="outline"><Users className="mr-2" />Nouveau client</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Total Biens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalProperties}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-green-600" />
              Disponibles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.availableProperties}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{stats.totalClients}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Euro className="h-5 w-5 text-purple-600" />
              Revenus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {stats.monthlyRevenue.toLocaleString('fr-FR')} €
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/solutions/immobilier/biens">
          <Card className="hover:shadow-lg cursor-pointer">
            <CardContent className="p-6">
              <Building2 className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="font-semibold">Gérer les biens</h3>
              <p className="text-sm text-gray-600">Voir et modifier vos biens</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/solutions/immobilier/clients">
          <Card className="hover:shadow-lg cursor-pointer">
            <CardContent className="p-6">
              <Users className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-semibold">Gérer les clients</h3>
              <p className="text-sm text-gray-600">Voir et modifier vos clients</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/solutions/immobilier/transactions">
          <Card className="hover:shadow-lg cursor-pointer">
            <CardContent className="p-6">
              <Euro className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-semibold">Transactions</h3>
              <p className="text-sm text-gray-600">Voir toutes les transactions</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}