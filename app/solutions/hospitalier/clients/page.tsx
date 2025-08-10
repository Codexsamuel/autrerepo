"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '@/lib/supabase/client';

interface HotelClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  created_at: string;
}

export default function ClientsList() {
  const [clients, setClients] = useState<HotelClient[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    setLoading(true);
    const { data } = await supabase.from("hotel_clients").select();
    setClients(data || []);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce client ?")) return;
    await supabase.from("hotel_clients").delete().eq("id", id);
    fetchClients();
  }

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clients hôteliers</h1>
        <Link href="/solutions/hospitalier/clients/nouveau" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">Nouveau client</Link>
      </div>
      <input
        className="border rounded px-3 py-2 mb-4 w-full"
        placeholder="Recherche par nom ou email..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(client => (
            <Card key={client.id}>
              <CardHeader>
                <CardTitle>{client.name}</CardTitle>
                <div className="text-sm text-gray-500">{client.email}</div>
              </CardHeader>
              <CardContent>
                <div className="mb-2">Téléphone : {client.phone}</div>
                <div className="mb-2">Adresse : {client.address}</div>
                <div className="mb-2 text-xs text-gray-400">Créé le {new Date(client.created_at).toLocaleDateString()}</div>
                <div className="flex gap-2 mt-2">
                  <Link href={`/solutions/hospitalier/clients/${client.id}`} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">Éditer</Link>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(client.id)}>Supprimer</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 