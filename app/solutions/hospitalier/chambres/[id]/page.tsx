"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function EditChambre() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [number, setNumber] = useState("");
  const [type, setType] = useState("");
  const [pricePerNight, setPricePerNight] = useState(0);
  const [capacity, setCapacity] = useState(1);
  const [status, setStatus] = useState("available");
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    if (id) fetchChambre();
  }, [id]);

  async function fetchChambre() {
    setLoading(true);
    const { data } = await supabase.from("hotel_rooms").select().eq("id", id).single();
    if (data) {
      setNumber(data.number);
      setType(data.type);
      setPricePerNight(data.price_per_night);
      setCapacity(data.capacity);
      setStatus(data.status);
    }
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await supabase.from("hotel_rooms").update({
      number,
      type,
      price_per_night: pricePerNight,
      capacity,
      status,
    }).eq("id", id);
    setLoading(false);
    router.push("/solutions/hospitalier/chambres");
  }

  if (loading) return <div className="p-10 text-center">Chargement...</div>;

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Éditer la chambre d'hôtel</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Numéro de chambre"
              value={number}
              onChange={e => setNumber(e.target.value)}
              required
            />
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Type (ex: simple, double, suite)"
              value={type}
              onChange={e => setType(e.target.value)}
              required
            />
            <input
              className="border rounded px-3 py-2 w-full"
              type="number"
              placeholder="Prix par nuit (€)"
              value={pricePerNight}
              onChange={e => setPricePerNight(Number(e.target.value))}
              required
              min={0}
            />
            <input
              className="border rounded px-3 py-2 w-full"
              type="number"
              placeholder="Capacité (nombre de personnes)"
              value={capacity}
              onChange={e => setCapacity(Number(e.target.value))}
              required
              min={1}
            />
            <select
              className="border rounded px-3 py-2 w-full"
              value={status}
              onChange={e => setStatus(e.target.value)}
              required
            >
              <option value="available">Disponible</option>
              <option value="occupied">Occupée</option>
              <option value="maintenance">En maintenance</option>
              <option value="reserved">Réservée</option>
            </select>
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