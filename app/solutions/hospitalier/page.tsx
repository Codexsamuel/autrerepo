"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface HotelStats {
  totalRooms: number;
  totalClients: number;
  totalReservations: number;
  totalRevenue: number;
}

export default function HotelDashboard() {
  const [stats, setStats] = useState<HotelStats>({
    totalRooms: 0,
    totalClients: 0,
    totalReservations: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const { data: rooms } = await supabase.from("hotel_rooms").select();
      const { data: clients } = await supabase.from("hotel_clients").select();
      const { data: reservations } = await supabase.from("hotel_reservations").select();
      const { data: bills } = await supabase.from("hotel_billing").select();
      setStats({
        totalRooms: rooms?.length || 0,
        totalClients: clients?.length || 0,
        totalReservations: reservations?.length || 0,
        totalRevenue: bills?.reduce((sum, b) => sum + (b.amount || 0), 0) || 0,
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="p-10 text-center">Chargement...</div>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard Hôtellerie</h1>
        <div className="flex gap-2">
          <Button asChild><Link href="/solutions/hospitalier/chambres/nouveau">Nouvelle Chambre</Link></Button>
          <Button asChild variant="outline"><Link href="/solutions/hospitalier/clients/nouveau">Nouveau Client</Link></Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card><CardHeader><CardTitle>Chambres</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.totalRooms}</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Clients</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.totalClients}</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Réservations</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.totalReservations}</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Revenus</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()} €</div></CardContent></Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow"><Link href="/solutions/hospitalier/chambres"><CardHeader><CardTitle>Gestion Chambres</CardTitle></CardHeader></Link></Card>
        <Card className="hover:shadow-lg transition-shadow"><Link href="/solutions/hospitalier/clients"><CardHeader><CardTitle>Gestion Clients</CardTitle></CardHeader></Link></Card>
        <Card className="hover:shadow-lg transition-shadow"><Link href="/solutions/hospitalier/reservations"><CardHeader><CardTitle>Réservations</CardTitle></CardHeader></Link></Card>
        <Card className="hover:shadow-lg transition-shadow"><Link href="/solutions/hospitalier/facturation"><CardHeader><CardTitle>Facturation</CardTitle></CardHeader></Link></Card>
      </div>
    </div>
  );
} 