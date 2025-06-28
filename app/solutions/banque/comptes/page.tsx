"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";

interface BankAccount {
  id: string;
  number: string;
  type: string;
  balance: number;
  owner_name: string;
  created_at: string;
}

export default function ComptesList() {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchAccounts();
  }, []);

  async function fetchAccounts() {
    setLoading(true);
    const { data } = await supabase.from("bank_accounts").select();
    setAccounts(data || []);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce compte ?")) return;
    await supabase.from("bank_accounts").delete().eq("id", id);
    fetchAccounts();
  }

  const filtered = accounts.filter(a =>
    a.number.toLowerCase().includes(search.toLowerCase()) ||
    a.owner_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Comptes bancaires</h1>
        <Button asChild><Link href="/solutions/banque/comptes/nouveau">Nouveau compte</Link></Button>
      </div>
      <input
        className="border rounded px-3 py-2 mb-4 w-full"
        placeholder="Recherche par numéro ou titulaire..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(account => (
            <Card key={account.id}>
              <CardHeader>
                <CardTitle>{account.owner_name}</CardTitle>
                <div className="text-sm text-gray-500">N° {account.number}</div>
              </CardHeader>
              <CardContent>
                <div className="mb-2">Type : {account.type}</div>
                <div className="mb-2">Solde : <span className="font-bold">{account.balance.toLocaleString()} €</span></div>
                <div className="mb-2 text-xs text-gray-400">Créé le {new Date(account.created_at).toLocaleDateString()}</div>
                <div className="flex gap-2 mt-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/solutions/banque/comptes/${account.id}`}>Éditer</Link>
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(account.id)}>Supprimer</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 