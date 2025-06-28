"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";

interface InsuranceClaim {
  id: string;
  claim_number: string;
  policy_id: string;
  client_id: string;
  claim_type: string;
  claim_amount: number;
  description: string;
  incident_date: string;
  status: string;
  created_at: string;
}

export default function SinistresList() {
  const [claims, setClaims] = useState<InsuranceClaim[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClaims();
  }, []);

  async function fetchClaims() {
    setLoading(true);
    const { data } = await supabase.from("insurance_claims").select();
    setClaims(data || []);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer ce sinistre ?")) return;
    await supabase.from("insurance_claims").delete().eq("id", id);
    fetchClaims();
  }

  const filtered = claims.filter(c =>
    c.claim_number.toLowerCase().includes(search.toLowerCase()) ||
    c.claim_type.toLowerCase().includes(search.toLowerCase()) ||
    c.client_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sinistres d'assurance</h1>
        <Button asChild><Link href="/solutions/assurance/sinistres/nouveau">Nouveau sinistre</Link></Button>
      </div>
      <input
        className="border rounded px-3 py-2 mb-4 w-full"
        placeholder="Recherche par numéro, type ou client..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(claim => (
            <Card key={claim.id}>
              <CardHeader>
                <CardTitle>Sinistre {claim.claim_number}</CardTitle>
                <div className="text-sm text-gray-500">Client : {claim.client_id}</div>
              </CardHeader>
              <CardContent>
                <div className="mb-2">Type : {claim.claim_type}</div>
                <div className="mb-2">Montant : <span className="font-bold text-red-600">{claim.claim_amount.toLocaleString()} €</span></div>
                <div className="mb-2">Description : {claim.description}</div>
                <div className="mb-2">Date incident : {new Date(claim.incident_date).toLocaleDateString()}</div>
                <div className="mb-2">Statut : <span className="font-bold">{claim.status}</span></div>
                <div className="mb-2">Police : {claim.policy_id}</div>
                <div className="mb-2 text-xs text-gray-400">Créé le {new Date(claim.created_at).toLocaleDateString()}</div>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(claim.id)}>Supprimer</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 