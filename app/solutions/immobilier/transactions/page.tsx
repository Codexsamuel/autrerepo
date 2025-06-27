"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Euro, Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase-client";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Erreur chargement transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTransaction = async (id) => {
    if (confirm('Supprimer cette transaction ?')) {
      try {
        await supabase.from('transactions').delete().eq('id', id);
        loadTransactions();
      } catch (error) {
        console.error('Erreur suppression:', error);
      }
    }
  };

  const filteredTransactions = transactions.filter(t =>
    t.description?.toLowerCase().includes(search.toLowerCase()) ||
    t.type?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-8">Chargement...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Transactions immobilières</h1>
        <Link href="/solutions/immobilier/transactions/nouveau">
          <Button><Plus className="mr-2" />Nouvelle transaction</Button>
        </Link>
      </div>

      <div className="mb-6 max-w-md">
        <Input
          placeholder="Rechercher une transaction..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTransactions.map((t) => (
          <Card key={t.id}>
            <CardHeader>
              <CardTitle>{t.description || t.type}</CardTitle>
              <div className="text-sm text-gray-600">{new Date(t.created_at).toLocaleDateString('fr-FR')}</div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                <Euro className="h-4 w-4 text-purple-600" />
                <span className="font-bold text-lg text-purple-600">{t.amount?.toLocaleString('fr-FR')} €</span>
              </div>
              <div className="text-xs text-gray-500 mb-2">{t.status}</div>
              <div className="flex gap-2 mt-2">
                <Link href={`/solutions/immobilier/transactions/${t.id}/edit`}>
                  <Button size="sm" variant="outline"><Edit className="h-3 w-3" /></Button>
                </Link>
                <Button size="sm" variant="outline" onClick={() => deleteTransaction(t.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-12">
          <Euro className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-4">Aucune transaction enregistrée</h3>
          <Link href="/solutions/immobilier/transactions/nouveau">
            <Button><Plus className="mr-2" />Ajouter une transaction</Button>
          </Link>
        </div>
      )}
    </div>
  );
} 