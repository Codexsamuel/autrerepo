"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";

export default function NouveauPaiement() {
  const [policyId, setPolicyId] = useState("");
  const [clientId, setClientId] = useState("");
  const [amount, setAmount] = useState(0);
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await supabase.from("insurance_payments").insert({
      policy_id: policyId,
      client_id: clientId,
      amount,
      payment_date: paymentDate,
      payment_method: paymentMethod,
      status,
    });
    setLoading(false);
    router.push("/solutions/assurance/paiements");
  }

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Nouveau paiement d'assurance</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="ID de la police"
              value={policyId}
              onChange={e => setPolicyId(e.target.value)}
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
              placeholder="Montant du paiement (€)"
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              required
              min={0}
            />
            <input
              className="border rounded px-3 py-2 w-full"
              type="date"
              placeholder="Date de paiement"
              value={paymentDate}
              onChange={e => setPaymentDate(e.target.value)}
              required
            />
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Méthode de paiement (ex: carte, virement, chèque)"
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value)}
              required
            />
            <select
              className="border rounded px-3 py-2 w-full"
              value={status}
              onChange={e => setStatus(e.target.value)}
              required
            >
              <option value="pending">En attente</option>
              <option value="completed">Complété</option>
              <option value="failed">Échoué</option>
              <option value="refunded">Remboursé</option>
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