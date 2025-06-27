"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function NouveauCompte() {
  const [accountNumber, setAccountNumber] = useState("");
  const [clientId, setClientId] = useState("");
  const [balance, setBalance] = useState(0);
  const [currency, setCurrency] = useState("EUR");
  const [accountType, setAccountType] = useState("");
  const [status, setStatus] = useState("active");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await supabase.from("trading_accounts").insert({
      account_number: accountNumber,
      client_id: clientId,
      balance,
      currency,
      account_type: accountType,
      status,
    });
    setLoading(false);
    router.push("/solutions/trading/comptes");
  }

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Nouveau compte de trading</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Numéro de compte"
              value={accountNumber}
              onChange={e => setAccountNumber(e.target.value)}
              required
            />
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="ID du client"
              value={clientId}
              onChange={e => setClientId(e.target.value)}
              required
            />
            <input
              className="border rounded px-3 py-2 w-full"
              type="number"
              placeholder="Solde initial"
              value={balance}
              onChange={e => setBalance(Number(e.target.value))}
              required
              min={0}
            />
            <select
              className="border rounded px-3 py-2 w-full"
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              required
            >
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
            </select>
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Type de compte (ex: standard, premium, pro)"
              value={accountType}
              onChange={e => setAccountType(e.target.value)}
              required
            />
            <select
              className="border rounded px-3 py-2 w-full"
              value={status}
              onChange={e => setStatus(e.target.value)}
              required
            >
              <option value="active">Actif</option>
              <option value="pending">En attente</option>
              <option value="suspended">Suspendu</option>
              <option value="closed">Fermé</option>
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