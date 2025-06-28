"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '@/lib/supabase/client';

interface HotelReservation {
  id: string;
  client_id: string;
  room_id: string;
  check_in_date: string;
  check_out_date: string;
  total_amount: number;
  status: string;
  created_at: string;
}

export default function ReservationsList() {
  const [reservations, setReservations] = useState<HotelReservation[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  async function fetchReservations() {
    setLoading(true);
    const { data } = await supabase.from("hotel_reservations").select();
    setReservations(data || []);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette réservation ?")) return;
    await supabase.from("hotel_reservations").delete().eq("id", id);
    fetchReservations();
  }

  const filtered = reservations.filter(r =>
    r.status.toLowerCase().includes(search.toLowerCase()) ||
    r.client_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Réservations hôtelières</h1>
        <Button asChild><Link href="/solutions/hospitalier/reservations/nouveau">Nouvelle réservation</Link></Button>
      </div>
      <input
        className="border rounded px-3 py-2 mb-4 w-full"
        placeholder="Recherche par statut ou client..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(reservation => (
            <Card key={reservation.id}>
              <CardHeader>
                <CardTitle>Réservation #{reservation.id.slice(0, 8)}</CardTitle>
                <div className="text-sm text-gray-500">Client : {reservation.client_id}</div>
              </CardHeader>
              <CardContent>
                <div className="mb-2">Chambre : {reservation.room_id}</div>
                <div className="mb-2">Check-in : {new Date(reservation.check_in_date).toLocaleDateString()}</div>
                <div className="mb-2">Check-out : {new Date(reservation.check_out_date).toLocaleDateString()}</div>
                <div className="mb-2">Montant : <span className="font-bold">{reservation.total_amount.toLocaleString()} €</span></div>
                <div className="mb-2">Statut : <span className="font-bold">{reservation.status}</span></div>
                <div className="mb-2 text-xs text-gray-400">Créée le {new Date(reservation.created_at).toLocaleDateString()}</div>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(reservation.id)}>Supprimer</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 