"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

interface HotelBilling {
  id: string;
  reservation_id: string;
  client_id: string;
  amount: number;
  tax_amount: number;
  total_amount: number;
  status: string;
  created_at: string;
}

export default function FacturationList() {
  const [bills, setBills] = useState<HotelBilling[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchBills();
  }, []);

  async function fetchBills() {
    setLoading(true);
    const { data } = await supabase.from("hotel_billing").select();
    setBills(data || []);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette facture ?")) return;
    await supabase.from("hotel_billing").delete().eq("id", id);
    fetchBills();
  }

  const filtered = bills.filter(b =>
    b.status.toLowerCase().includes(search.toLowerCase()) ||
    b.client_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Facturation hôtelière</h1>
        <Button asChild><Link href="/solutions/hospitalier/facturation/nouveau">Nouvelle facture</Link></Button>
      </div>
      <input
        className="border rounded px-3 py-2 mb-4 w-full"
        placeholder="Recherche par statut ou client..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(bill => (
            <Card key={bill.id}>
              <CardHeader>
                <CardTitle>Facture #{bill.id.slice(0, 8)}</CardTitle>
                <div className="text-sm text-gray-500">Client : {bill.client_id}</div>
              </CardHeader>
              <CardContent>
                <div className="mb-2">Réservation : {bill.reservation_id}</div>
                <div className="mb-2">Montant HT : <span className="font-bold">{bill.amount.toLocaleString()} €</span></div>
                <div className="mb-2">TVA : <span className="font-bold">{bill.tax_amount.toLocaleString()} €</span></div>
                <div className="mb-2">Total TTC : <span className="font-bold text-green-600">{bill.total_amount.toLocaleString()} €</span></div>
                <div className="mb-2">Statut : <span className="font-bold">{bill.status}</span></div>
                <div className="mb-2 text-xs text-gray-400">Créée le {new Date(bill.created_at).toLocaleDateString()}</div>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(bill.id)}>Supprimer</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 