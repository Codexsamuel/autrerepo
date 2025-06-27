"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

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
  const supabase = createClient();

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
        <Button asChild><Link href="/solutions/hospitalier/chambres/nouveau">Nouvelle chambre</Link></Button>
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
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/solutions/hospitalier/chambres/${room.id}`}>Éditer</Link>
                  </Button>
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