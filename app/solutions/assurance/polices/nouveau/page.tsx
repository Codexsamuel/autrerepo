"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";

export default function NouvellePolice() {
  const [policyNumber, setPolicyNumber] = useState("");
  const [clientId, setClientId] = useState("");
  const [type, setType] = useState("");
  const [premium, setPremium] = useState(0);
  const [coverage, setCoverage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("active");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await supabase.from("insurance_policies").insert({
      policy_number: policyNumber,
      client_id: clientId,
      type,
      premium,
      coverage,
      start_date: startDate,
      end_date: endDate,
      status,
    });
    setLoading(false);
    router.push("/solutions/assurance/polices");
  }

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Nouvelle police d'assurance</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Numéro de police"
              value={policyNumber}
              onChange={e => setPolicyNumber(e.target.value)}
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
              placeholder="Type d'assurance (ex: auto, habitation, vie)"
              value={type}
              onChange={e => setType(e.target.value)}
              required
            />
            <input
              className="border rounded px-3 py-2 w-full"
              type="number"
              placeholder="Prime annuelle (€)"
              value={premium}
              onChange={e => setPremium(Number(e.target.value))}
              required
              min={0}
            />
            <textarea
              className="border rounded px-3 py-2 w-full"
              placeholder="Détails de la couverture"
              value={coverage}
              onChange={e => setCoverage(e.target.value)}
              required
              rows={3}
            />
            <input
              className="border rounded px-3 py-2 w-full"
              type="date"
              placeholder="Date de début"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              required
            />
            <input
              className="border rounded px-3 py-2 w-full"
              type="date"
              placeholder="Date de fin"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              required
            />
            <select
              className="border rounded px-3 py-2 w-full"
              value={status}
              onChange={e => setStatus(e.target.value)}
              required
            >
              <option value="active">Active</option>
              <option value="pending">En attente</option>
              <option value="expired">Expirée</option>
              <option value="cancelled">Annulée</option>
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