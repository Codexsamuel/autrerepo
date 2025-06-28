"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";

export default function NouveauClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await supabase.from("insurance_clients").insert({
      name,
      email,
      phone,
      address,
      birth_date: birthDate,
    });
    setLoading(false);
    router.push("/solutions/assurance/clients");
  }

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Nouveau client d'assurance</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Nom complet"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <input
              className="border rounded px-3 py-2 w-full"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Téléphone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
            <textarea
              className="border rounded px-3 py-2 w-full"
              placeholder="Adresse complète"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
              rows={3}
            />
            <input
              className="border rounded px-3 py-2 w-full"
              type="date"
              placeholder="Date de naissance"
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
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