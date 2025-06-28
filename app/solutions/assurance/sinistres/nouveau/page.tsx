"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";

export default function NouveauSinistre() {
  const [claimNumber, setClaimNumber] = useState("");
  const [policyId, setPolicyId] = useState("");
  const [clientId, setClientId] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [incidentDate, setIncidentDate] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await supabase.from("insurance_claims").insert({
      claim_number: claimNumber,
      policy_id: policyId,
      client_id: clientId,
      description,
      amount,
      incident_date: incidentDate,
      status,
    });
    setLoading(false);
    router.push("/solutions/assurance/sinistres");
  }

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Nouveau sinistre d'assurance</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Numéro de sinistre"
              value={claimNumber}
              onChange={e => setClaimNumber(e.target.value)}
              required
            />
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
            <textarea
              className="border rounded px-3 py-2 w-full"
              placeholder="Description du sinistre"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              rows={4}
            />
            <input
              className="border rounded px-3 py-2 w-full"
              type="number"
              placeholder="Montant du sinistre (€)"
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              required
              min={0}
            />
            <input
              className="border rounded px-3 py-2 w-full"
              type="date"
              placeholder="Date de l'incident"
              value={incidentDate}
              onChange={e => setIncidentDate(e.target.value)}
              required
            />
            <select
              className="border rounded px-3 py-2 w-full"
              value={status}
              onChange={e => setStatus(e.target.value)}
              required
            >
              <option value="pending">En attente</option>
              <option value="investigating">En cours d'investigation</option>
              <option value="approved">Approuvé</option>
              <option value="rejected">Rejeté</option>
              <option value="paid">Payé</option>
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