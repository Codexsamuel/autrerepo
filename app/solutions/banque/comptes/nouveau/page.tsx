"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function NouveauCompte() {
  const [number, setNumber] = useState("");
  const [type, setType] = useState("");
  const [balance, setBalance] = useState(0);
  const [owner, setOwner] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await supabase.from("bank_accounts").insert({
      number,
      type,
      balance,
      owner_name: owner,
    });
    setLoading(false);
    router.push("/solutions/banque/comptes");
  }

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Nouveau compte bancaire</CardTitle>
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
              placeholder="Solde initial (€)"
              value={balance}
              onChange={e => setBalance(Number(e.target.value))}
              required
              min={0}
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>{loading ? "Création..." : "Créer"}</Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>Annuler</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 