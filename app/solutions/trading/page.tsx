"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { supabase } from '@/lib/supabase/client';

interface TradingStats {
  totalAccounts: number;
  totalOrders: number;
  totalPositions: number;
  totalVolume: number;
}

export default function TradingDashboard() {
  const [stats, setStats] = useState<TradingStats>({
    totalAccounts: 0,
    totalOrders: 0,
    totalPositions: 0,
    totalVolume: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const { data: accounts } = await supabase.from("trading_accounts").select();
      const { data: orders } = await supabase.from("trading_orders").select();
      const { data: positions } = await supabase.from("trading_positions").select();
      setStats({
        totalAccounts: accounts?.length || 0,
        totalOrders: orders?.length || 0,
        totalPositions: positions?.length || 0,
        totalVolume: orders?.reduce((sum: number, o: any) => sum + (o.amount || 0), 0) || 0,
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="p-10 text-center">Chargement...</div>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard Trading</h1>
        <div className="flex gap-2">
          <Link href="/solutions/trading/comptes/nouveau" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">Nouveau Compte</Link>
          <Link href="/solutions/trading/ordres/nouveau" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">Nouvel Ordre</Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card><CardHeader><CardTitle>Comptes</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.totalAccounts}</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Ordres</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.totalOrders}</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Positions</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.totalPositions}</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Volume Total</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.totalVolume.toLocaleString()} €</div></CardContent></Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow"><Link href="/solutions/trading/comptes"><CardHeader><CardTitle>Gestion Comptes</CardTitle></CardHeader></Link></Card>
        <Card className="hover:shadow-lg transition-shadow"><Link href="/solutions/trading/ordres"><CardHeader><CardTitle>Gestion Ordres</CardTitle></CardHeader></Link></Card>
        <Card className="hover:shadow-lg transition-shadow"><Link href="/solutions/trading/positions"><CardHeader><CardTitle>Gestion Positions</CardTitle></CardHeader></Link></Card>
      </div>
    </div>
  );
} 