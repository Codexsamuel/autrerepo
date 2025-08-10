"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";

interface TradingAccount {
  id: string;
  account_number: string;
  client_id: string;
  balance: number;
  currency: string;
  account_type: string;
  status: string;
  created_at: string;
}

export default function ComptesList() {
  const [accounts, setAccounts] = useState<TradingAccount[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccounts();
  }, []);

  async function fetchAccounts() {
    setLoading(true);
    try {
      const { data } = await supabase.from("trading_accounts").select();
      setAccounts(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des comptes:", error);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce compte de trading ?")) return;
    try {
      await supabase.from("trading_accounts").delete().eq("id", id);
      fetchAccounts();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  }

  const filtered = accounts.filter(a =>
    a.account_number.toLowerCase().includes(search.toLowerCase()) ||
    a.client_id.toLowerCase().includes(search.toLowerCase()) ||
    a.account_type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Comptes de trading</h1>
          <Link 
            href="/solutions/trading/comptes/nouveau"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Nouveau compte
          </Link>
        </div>
        
        <input
          className="border rounded px-3 py-2 mb-4 w-full"
          placeholder="Recherche par numéro, client ou type..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        
        {loading ? (
          <div className="text-center py-8">Chargement...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(account => (
              <Card key={account.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Compte {account.account_number}</CardTitle>
                  <div className="text-sm text-gray-500">Client : {account.client_id}</div>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">Solde : <span className="font-bold">{account.balance.toLocaleString()} {account.currency}</span></div>
                  <div className="mb-2">Type : {account.account_type}</div>
                  <div className="mb-2">Statut : <span className="font-bold">{account.status}</span></div>
                  <div className="mb-2 text-xs text-gray-400">Créé le {new Date(account.created_at).toLocaleDateString()}</div>
                  <div className="flex gap-2 mt-2">
                    <Link 
                      href={`/solutions/trading/comptes/${account.id}`}
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                    >
                      Éditer
                    </Link>
                    <button 
                      onClick={() => handleDelete(account.id)}
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 rounded-md px-3"
                    >
                      Supprimer
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 