"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function EditClient() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    if (id) fetchClient();
  }, [id]);

  async function fetchClient() {
    setLoading(true);
    const { data } = await supabase.from("bank_clients").select().eq("id", id).single();
    if (data) {
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone);
      setAddress(data.address);
    }
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await supabase.from("bank_clients").update({
      name,
      email,
      phone,
      address,
    }).eq("id", id);
    setLoading(false);
    router.push("/solutions/banque/clients");
  }

  if (loading) return <div className="p-10 text-center">Chargement...</div>;

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Éditer le client bancaire</CardTitle>
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