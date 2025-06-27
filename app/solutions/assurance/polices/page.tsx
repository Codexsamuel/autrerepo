"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

interface InsurancePolicy {
  id: string;
  policy_number: string;
  client_id: string;
  type: string;
  coverage_amount: number;
  premium_amount: number;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string;
}

export default function PolicesList() {
  const [policies, setPolicies] = useState<InsurancePolicy[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchPolicies();
  }, []);

  async function fetchPolicies() {
    setLoading(true);
    const { data } = await supabase.from("insurance_policies").select();
    setPolicies(data || []);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette police ?")) return;
    await supabase.from("insurance_policies").delete().eq("id", id);
    fetchPolicies();
  }

  const filtered = policies.filter(p =>
    p.policy_number.toLowerCase().includes(search.toLowerCase()) ||
    p.type.toLowerCase().includes(search.toLowerCase()) ||
    p.client_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Polices d'assurance</h1>
        <Button asChild><Link href="/solutions/assurance/polices/nouveau">Nouvelle police</Link></Button>
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
          {filtered.map(policy => (
            <Card key={policy.id}>
              <CardHeader>
                <CardTitle>Police {policy.policy_number}</CardTitle>
                <div className="text-sm text-gray-500">Client : {policy.client_id}</div>
              </CardHeader>
              <CardContent>
                <div className="mb-2">Type : {policy.type}</div>
                <div className="mb-2">Montant de couverture : <span className="font-bold">{policy.coverage_amount.toLocaleString()} €</span></div>
                <div className="mb-2">Prime : <span className="font-bold">{policy.premium_amount.toLocaleString()} €</span></div>
                <div className="mb-2">Début : {new Date(policy.start_date).toLocaleDateString()}</div>
                <div className="mb-2">Fin : {new Date(policy.end_date).toLocaleDateString()}</div>
                <div className="mb-2">Statut : <span className="font-bold">{policy.status}</span></div>
                <div className="mb-2 text-xs text-gray-400">Créée le {new Date(policy.created_at).toLocaleDateString()}</div>
                <div className="flex gap-2 mt-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/solutions/assurance/polices/${policy.id}`}>Éditer</Link>
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(policy.id)}>Supprimer</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 