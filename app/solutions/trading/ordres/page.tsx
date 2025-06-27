"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

interface TradingOrder {
  id: string;
  order_number: string;
  account_id: string;
  symbol: string;
  order_type: string;
  side: string;
  quantity: number;
  price: number;
  status: string;
  created_at: string;
}

export default function OrdresList() {
  const [orders, setOrders] = useState<TradingOrder[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    const { data } = await supabase.from("trading_orders").select();
    setOrders(data || []);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cet ordre ?")) return;
    await supabase.from("trading_orders").delete().eq("id", id);
    fetchOrders();
  }

  const filtered = orders.filter(o =>
    o.order_number.toLowerCase().includes(search.toLowerCase()) ||
    o.symbol.toLowerCase().includes(search.toLowerCase()) ||
    o.order_type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ordres de trading</h1>
        <Button asChild><Link href="/solutions/trading/ordres/nouveau">Nouvel ordre</Link></Button>
      </div>
      <input
        className="border rounded px-3 py-2 mb-4 w-full"
        placeholder="Recherche par numéro, symbole ou type..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(order => (
            <Card key={order.id}>
              <CardHeader>
                <CardTitle>Ordre {order.order_number}</CardTitle>
                <div className="text-sm text-gray-500">Compte : {order.account_id}</div>
              </CardHeader>
              <CardContent>
                <div className="mb-2">Symbole : <span className="font-bold">{order.symbol}</span></div>
                <div className="mb-2">Type : {order.order_type}</div>
                <div className="mb-2">Côté : <span className={`font-bold ${order.side === 'buy' ? 'text-green-600' : 'text-red-600'}`}>{order.side === 'buy' ? 'ACHAT' : 'VENTE'}</span></div>
                <div className="mb-2">Quantité : {order.quantity}</div>
                <div className="mb-2">Prix : <span className="font-bold">{order.price.toLocaleString()} €</span></div>
                <div className="mb-2">Statut : <span className="font-bold">{order.status}</span></div>
                <div className="mb-2 text-xs text-gray-400">Créé le {new Date(order.created_at).toLocaleDateString()}</div>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(order.id)}>Supprimer</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 