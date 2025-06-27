"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function NouvelleTransaction() {
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [accountId, setAccountId] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await supabase.from("bank_transactions").insert({
      amount,
      type,
      description,
      account_id: accountId,
    });
    setLoading(false);
    router.push("/solutions/banque/transactions");
  }

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Nouvelle transaction bancaire</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="border rounded px-3 py-2 w-full"
              type="number"
              placeholder="Montant (€)"
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              required
            />
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Type (ex: virement, retrait, dépôt)"
              value={type}
              onChange={e => setType(e.target.value)}
              required
            />
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="ID du compte"
              value={accountId}
              onChange={e => setAccountId(e.target.value)}
              required
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