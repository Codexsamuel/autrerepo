"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function NouvelleReservation() {
  const [clientId, setClientId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [status, setStatus] = useState("confirmed");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await supabase.from("hotel_reservations").insert({
      client_id: clientId,
      room_id: roomId,
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
      total_price: totalPrice,
      status,
    });
    setLoading(false);
    router.push("/solutions/hospitalier/reservations");
  }

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Nouvelle réservation hôtelière</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="ID du client"
              value={clientId}
              onChange={e => setClientId(e.target.value)}
              required
            />
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="ID de la chambre"
              value={roomId}
              onChange={e => setRoomId(e.target.value)}
              required
            />
            <input
              className="border rounded px-3 py-2 w-full"
              type="date"
              placeholder="Date d'arrivée"
              value={checkInDate}
              onChange={e => setCheckInDate(e.target.value)}
              required
            />
            <input
              className="border rounded px-3 py-2 w-full"
              type="date"
              placeholder="Date de départ"
              value={checkOutDate}
              onChange={e => setCheckOutDate(e.target.value)}
              required
            />
            <input
              className="border rounded px-3 py-2 w-full"
              type="number"
              placeholder="Prix total (€)"
              value={totalPrice}
              onChange={e => setTotalPrice(Number(e.target.value))}
              required
              min={0}
            />
            <select
              className="border rounded px-3 py-2 w-full"
              value={status}
              onChange={e => setStatus(e.target.value)}
              required
            >
              <option value="confirmed">Confirmée</option>
              <option value="pending">En attente</option>
              <option value="cancelled">Annulée</option>
              <option value="completed">Terminée</option>
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