"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";

interface HotelRoom {
  id: string;
  number: string;
  type: string;
  price_per_night: number;
  capacity: number;
  status: string;
  created_at: string;
}

export default function ChambresList() {
  const [rooms, setRooms] = useState<HotelRoom[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchRooms();
  }, []);

  async function fetchRooms() {
    setLoading(true);
    const { data } = await supabase.from("hotel_rooms").select();
    setRooms(data || []);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette chambre ?")) return;
    await supabase.from("hotel_rooms").delete().eq("id", id);
    fetchRooms();
  }

  const filtered = rooms.filter(r =>
    r.number.toLowerCase().includes(search.toLowerCase()) ||
    r.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Chambres d'hôtel</h1>
        <Link href="/solutions/hospitalier/chambres/nouveau" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">Nouvelle chambre</Link>
      </div>
      <input
        className="border rounded px-3 py-2 mb-4 w-full"
        placeholder="Recherche par numéro ou type..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(room => (
            <Card key={room.id}>
              <CardHeader>
                <CardTitle>Chambre {room.number}</CardTitle>
                <div className="text-sm text-gray-500">Type : {room.type}</div>
              </CardHeader>
              <CardContent>
                <div className="mb-2">Prix : <span className="font-bold">{room.price_per_night.toLocaleString()} €</span>/nuit</div>
                <div className="mb-2">Capacité : {room.capacity} personne(s)</div>
                <div className="mb-2">Statut : <span className="font-bold">{room.status}</span></div>
                <div className="mb-2 text-xs text-gray-400">Créée le {new Date(room.created_at).toLocaleDateString()}</div>
                <div className="flex gap-2 mt-2">
                  <Link href={`/solutions/hospitalier/chambres/${room.id}`} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">Éditer</Link>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(room.id)}>Supprimer</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 