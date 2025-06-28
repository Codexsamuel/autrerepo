"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";

export default function EditCompte() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [number, setNumber] = useState("");
  const [type, setType] = useState("");
  const [balance, setBalance] = useState(0);
  const [owner, setOwner] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (id) fetchCompte();
  }, [id]);

  async function fetchCompte() {
    setLoading(true);
    const { data } = await supabase.from("bank_accounts").select().eq("id", id).single();
    if (data) {
      setNumber(data.number);
      setType(data.type);
      setBalance(data.balance);
      setOwner(data.owner_name);
    }
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await supabase.from("bank_accounts").update({
      number,
      type,
      balance,
      owner_name: owner,
    }).eq("id", id);
    setLoading(false);
    router.push("/solutions/banque/comptes");
  }

  if (loading) return <div className="p-10 text-center">Chargement...</div>;

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Éditer le compte bancaire</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Numéro de compte"
              value={number}
              onChange={e => setNumber(e.target.value)}
              required
            />
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Titulaire du compte"
              value={owner}
              onChange={e => setOwner(e.target.value)}
              required
            />
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Type de compte (ex: courant, épargne)"
              value={type}
              onChange={e => setType(e.target.value)}
              required
            />
            <input
              className="border rounded px-3 py-2 w-full"
              type="number"
              placeholder="Solde (€)"
              value={balance}
              onChange={e => setBalance(Number(e.target.value))}
              required
              min={0}
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>{loading ? "Mise à jour..." : "Mettre à jour"}</Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>Annuler</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 