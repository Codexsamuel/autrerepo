"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";

interface InsurancePayment {
  id: string;
  payment_number: string;
  policy_id: string;
  client_id: string;
  amount: number;
  payment_method: string;
  payment_date: string;
  status: string;
  created_at: string;
}

export default function PaiementsList() {
  const [payments, setPayments] = useState<InsurancePayment[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  async function fetchPayments() {
    setLoading(true);
    const { data } = await supabase.from("insurance_payments").select();
    setPayments(data || []);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce paiement ?")) return;
    await supabase.from("insurance_payments").delete().eq("id", id);
    fetchPayments();
  }

  const filtered = payments.filter(p =>
    p.payment_number.toLowerCase().includes(search.toLowerCase()) ||
    p.payment_method.toLowerCase().includes(search.toLowerCase()) ||
    p.client_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Paiements d'assurance</h1>
        <Button asChild><Link href="/solutions/assurance/paiements/nouveau">Nouveau paiement</Link></Button>
      </div>
      <input
        className="border rounded px-3 py-2 mb-4 w-full"
        placeholder="Recherche par numéro, méthode ou client..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(payment => (
            <Card key={payment.id}>
              <CardHeader>
                <CardTitle>Paiement {payment.payment_number}</CardTitle>
                <div className="text-sm text-gray-500">Client : {payment.client_id}</div>
              </CardHeader>
              <CardContent>
                <div className="mb-2">Police : {payment.policy_id}</div>
                <div className="mb-2">Montant : <span className="font-bold text-green-600">{payment.amount.toLocaleString()} €</span></div>
                <div className="mb-2">Méthode : {payment.payment_method}</div>
                <div className="mb-2">Date : {new Date(payment.payment_date).toLocaleDateString()}</div>
                <div className="mb-2">Statut : <span className="font-bold">{payment.status}</span></div>
                <div className="mb-2 text-xs text-gray-400">Créé le {new Date(payment.created_at).toLocaleDateString()}</div>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(payment.id)}>Supprimer</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 