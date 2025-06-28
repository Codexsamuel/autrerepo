"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { supabase } from '@/lib/supabase/client';

interface AssuranceStats {
  totalPolicies: number;
  totalClients: number;
  totalClaims: number;
  totalRevenue: number;
}

export default function AssuranceDashboard() {
  const [stats, setStats] = useState<AssuranceStats>({
    totalPolicies: 0,
    totalClients: 0,
    totalClaims: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const { data: policies } = await supabase.from("insurance_policies").select();
      const { data: clients } = await supabase.from("insurance_clients").select();
      const { data: claims } = await supabase.from("insurance_claims").select();
      const { data: payments } = await supabase.from("insurance_payments").select();
      setStats({
        totalPolicies: policies?.length || 0,
        totalClients: clients?.length || 0,
        totalClaims: claims?.length || 0,
        totalRevenue: payments?.reduce((sum: number, p: { amount?: number }) => sum + (p.amount || 0), 0) || 0,
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="p-10 text-center">Chargement...</div>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard Assurance</h1>
        <div className="flex gap-2">
          <Button asChild><Link href="/solutions/assurance/polices/nouveau">Nouvelle Police</Link></Button>
          <Button asChild variant="outline"><Link href="/solutions/assurance/clients/nouveau">Nouveau Client</Link></Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card><CardHeader><CardTitle>Polices</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.totalPolicies}</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Clients</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.totalClients}</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Sinistres</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.totalClaims}</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Revenus</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()} €</div></CardContent></Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow"><Link href="/solutions/assurance/polices"><CardHeader><CardTitle>Gestion Polices</CardTitle></CardHeader></Link></Card>
        <Card className="hover:shadow-lg transition-shadow"><Link href="/solutions/assurance/clients"><CardHeader><CardTitle>Gestion Clients</CardTitle></CardHeader></Link></Card>
        <Card className="hover:shadow-lg transition-shadow"><Link href="/solutions/assurance/sinistres"><CardHeader><CardTitle>Gestion Sinistres</CardTitle></CardHeader></Link></Card>
        <Card className="hover:shadow-lg transition-shadow"><Link href="/solutions/assurance/paiements"><CardHeader><CardTitle>Paiements</CardTitle></CardHeader></Link></Card>
      </div>
    </div>
  );
} 