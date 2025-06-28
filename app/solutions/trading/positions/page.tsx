"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";

interface TradingPosition {
  id: string;
  account_id: string;
  symbol: string;
  quantity: number;
  average_price: number;
  current_price: number;
  unrealized_pnl: number;
  position_type: string;
  created_at: string;
}

export default function PositionsList() {
  const [positions, setPositions] = useState<TradingPosition[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPositions();
  }, []);

  async function fetchPositions() {
    setLoading(true);
    const { data } = await supabase.from("trading_positions").select();
    setPositions(data || []);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette position ?")) return;
    await supabase.from("trading_positions").delete().eq("id", id);
    fetchPositions();
  }

  const filtered = positions.filter(p =>
    p.symbol.toLowerCase().includes(search.toLowerCase()) ||
    p.position_type.toLowerCase().includes(search.toLowerCase()) ||
    p.account_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Positions de trading</h1>
        <Button asChild><Link href="/solutions/trading/positions/nouveau">Nouvelle position</Link></Button>
      </div>
      <input
        className="border rounded px-3 py-2 mb-4 w-full"
        placeholder="Recherche par symbole, type ou compte..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(position => (
            <Card key={position.id}>
              <CardHeader>
                <CardTitle>Position {position.symbol}</CardTitle>
                <div className="text-sm text-gray-500">Compte : {position.account_id}</div>
              </CardHeader>
              <CardContent>
                <div className="mb-2">Quantité : <span className="font-bold">{position.quantity}</span></div>
                <div className="mb-2">Prix moyen : <span className="font-bold">{position.average_price.toLocaleString()} €</span></div>
                <div className="mb-2">Prix actuel : <span className="font-bold">{position.current_price.toLocaleString()} €</span></div>
                <div className="mb-2">P&L non réalisé : <span className={`font-bold ${position.unrealized_pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>{position.unrealized_pnl.toLocaleString()} €</span></div>
                <div className="mb-2">Type : {position.position_type}</div>
                <div className="mb-2 text-xs text-gray-400">Créée le {new Date(position.created_at).toLocaleDateString()}</div>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(position.id)}>Supprimer</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 