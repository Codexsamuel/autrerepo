"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

interface Client {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  [key: string]: any;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Erreur chargement clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteClient = async (id: string) => {
    if (confirm('Supprimer ce client ?')) {
      try {
        await supabase.from('clients').delete().eq('id', id);
        loadClients();
      } catch (error) {
        console.error('Erreur suppression:', error);
      }
    }
  };

  const filteredClients = clients.filter(c =>
    c.first_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.last_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-8">Chargement...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestion des Clients</h1>
        <Link href="/solutions/immobilier/clients/nouveau">
          <Button><Plus className="mr-2" />Nouveau client</Button>
        </Link>
      </div>

      <div className="mb-6 max-w-md">
        <Input
          placeholder="Rechercher un client..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client: Client) => (
          <Card key={client.id}>
            <CardHeader>
              <CardTitle>{client.first_name} {client.last_name}</CardTitle>
              <div className="text-sm text-gray-600">{client.email}</div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mt-2">
                <Link href={`/solutions/immobilier/clients/${client.id}/edit`}>
                  <Button size="sm" variant="outline"><Edit className="h-3 w-3" /></Button>
                </Link>
                <Button size="sm" variant="outline" onClick={() => deleteClient(client.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-4">Aucun client enregistré</h3>
          <Link href="/solutions/immobilier/clients/nouveau">
            <Button><Plus className="mr-2" />Ajouter un client</Button>
          </Link>
        </div>
      )}
    </div>
  );
}