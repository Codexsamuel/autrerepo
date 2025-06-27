"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

interface BankLoan {
  id: string;
  amount: number;
  interest_rate: number;
  term_months: number;
  client_id: string;
  status: string;
  created_at: string;
}

export default function PretsList() {
  const [loans, setLoans] = useState<BankLoan[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchLoans();
  }, []);

  async function fetchLoans() {
    setLoading(true);
    const { data } = await supabase.from("bank_loans").select();
    setLoans(data || []);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce prêt ?")) return;
    await supabase.from("bank_loans").delete().eq("id", id);
    fetchLoans();
  }

  const filtered = loans.filter(l =>
    l.status.toLowerCase().includes(search.toLowerCase()) ||
    l.client_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Prêts bancaires</h1>
        <Button asChild><Link href="/solutions/banque/prets/nouveau">Nouveau prêt</Link></Button>
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
          {filtered.map(loan => (
            <Card key={loan.id}>
              <CardHeader>
                <CardTitle>Prêt #{loan.id.slice(0, 8)}</CardTitle>
                <div className="text-sm text-gray-500">Client : {loan.client_id}</div>
              </CardHeader>
              <CardContent>
                <div className="mb-2">Montant : <span className="font-bold">{loan.amount.toLocaleString()} €</span></div>
                <div className="mb-2">Taux : {loan.interest_rate}%</div>
                <div className="mb-2">Durée : {loan.term_months} mois</div>
                <div className="mb-2">Statut : <span className="font-bold">{loan.status}</span></div>
                <div className="mb-2 text-xs text-gray-400">Créé le {new Date(loan.created_at).toLocaleDateString()}</div>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(loan.id)}>Supprimer</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 