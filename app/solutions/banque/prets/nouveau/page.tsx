"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";

export default function NouveauPret() {
  const [amount, setAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [termMonths, setTermMonths] = useState(0);
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await supabase.from("bank_loans").insert({
      amount,
      interest_rate: interestRate,
      term_months: termMonths,
      client_id: clientId,
      status,
    });
    setLoading(false);
    router.push("/solutions/banque/prets");
  }

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Nouveau prêt bancaire</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="border rounded px-3 py-2 w-full"
              type="number"
              placeholder="Montant du prêt (€)"
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              required
              min={0}
            />
            <input
              className="border rounded px-3 py-2 w-full"
              type="number"
              step="0.1"
              placeholder="Taux d'intérêt (%)"
              value={interestRate}
              onChange={e => setInterestRate(Number(e.target.value))}
              required
              min={0}
            />
            <input
              className="border rounded px-3 py-2 w-full"
              type="number"
              placeholder="Durée en mois"
              value={termMonths}
              onChange={e => setTermMonths(Number(e.target.value))}
              required
              min={1}
            />
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="ID du client"
              value={clientId}
              onChange={e => setClientId(e.target.value)}
              required
            />
            <select
              className="border rounded px-3 py-2 w-full"
              value={status}
              onChange={e => setStatus(e.target.value)}
              required
            >
              <option value="pending">En attente</option>
              <option value="active">Actif</option>
              <option value="completed">Terminé</option>
              <option value="defaulted">En défaut</option>
            </select>
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