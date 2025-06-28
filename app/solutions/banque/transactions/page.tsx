"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";

interface BankTransaction {
  id: string;
  amount: number;
  type: string;
  description: string;
  account_id: string;
  created_at: string;
}

export default function TransactionsList() {
  const [transactions, setTransactions] = useState<BankTransaction[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    setLoading(true);
    const { data } = await supabase.from("bank_transactions").select();
    setTransactions(data || []);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette transaction ?")) return;
    await supabase.from("bank_transactions").delete().eq("id", id);
    fetchTransactions();
  }

  const filtered = transactions.filter(t =>
    t.description.toLowerCase().includes(search.toLowerCase()) ||
    t.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transactions bancaires</h1>
        <Button asChild><Link href="/solutions/banque/transactions/nouveau">Nouvelle transaction</Link></Button>
      </div>
      <input
        className="border rounded px-3 py-2 mb-4 w-full"
        placeholder="Recherche par description ou type..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(transaction => (
            <Card key={transaction.id}>
              <CardHeader>
                <CardTitle>{transaction.description}</CardTitle>
                <div className="text-sm text-gray-500">Type : {transaction.type}</div>
              </CardHeader>
              <CardContent>
                <div className="mb-2">Montant : <span className="font-bold">{transaction.amount.toLocaleString()} €</span></div>
                <div className="mb-2">Compte : {transaction.account_id}</div>
                <div className="mb-2 text-xs text-gray-400">Le {new Date(transaction.created_at).toLocaleDateString()}</div>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(transaction.id)}>Supprimer</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 