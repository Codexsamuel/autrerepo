"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase-client";

export default function NouveauBienPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    type: "apartment",
    address: "",
    city: "",
    price: "",
    rent_price: "",
    status: "available",
    surface_area: "",
    rooms: "",
    bedrooms: "",
    bathrooms: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { error } = await supabase.from('real_estate_properties').insert([
        {
          title: form.title,
          type: form.type,
          address: form.address,
          city: form.city,
          price: parseFloat(form.price),
          rent_price: form.rent_price ? parseFloat(form.rent_price) : null,
          status: form.status,
          surface_area: form.surface_area ? parseFloat(form.surface_area) : null,
          rooms: form.rooms ? parseInt(form.rooms) : null,
          bedrooms: form.bedrooms ? parseInt(form.bedrooms) : null,
          bathrooms: form.bathrooms ? parseInt(form.bathrooms) : null
        }
      ]);
      if (error) throw error;
      router.push("/solutions/immobilier/biens");
    } catch (err) {
      setError("Erreur lors de la création du bien.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Ajouter un nouveau bien immobilier</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="title">Titre</Label>
              <Input id="title" name="title" value={form.title} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <select id="type" name="type" value={form.type} onChange={handleChange} className="w-full border rounded px-3 py-2">
                <option value="apartment">Appartement</option>
                <option value="house">Maison</option>
                <option value="office">Bureau</option>
                <option value="land">Terrain</option>
                <option value="parking">Parking</option>
              </select>
            </div>
            <div>
              <Label htmlFor="address">Adresse</Label>
              <Input id="address" name="address" value={form.address} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="city">Ville</Label>
              <Input id="city" name="city" value={form.city} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="price">Prix (€)</Label>
              <Input id="price" name="price" type="number" value={form.price} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="rent_price">Loyer mensuel (€)</Label>
              <Input id="rent_price" name="rent_price" type="number" value={form.rent_price} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="status">Statut</Label>
              <select id="status" name="status" value={form.status} onChange={handleChange} className="w-full border rounded px-3 py-2">
                <option value="available">Disponible</option>
                <option value="rented">Loué</option>
                <option value="sold">Vendu</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="surface_area">Surface (m²)</Label>
                <Input id="surface_area" name="surface_area" type="number" value={form.surface_area} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="rooms">Pièces</Label>
                <Input id="rooms" name="rooms" type="number" value={form.rooms} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="bedrooms">Chambres</Label>
                <Input id="bedrooms" name="bedrooms" type="number" value={form.bedrooms} onChange={handleChange} />
              </div>
            </div>
            <div>
              <Label htmlFor="bathrooms">Salles de bain</Label>
              <Input id="bathrooms" name="bathrooms" type="number" value={form.bathrooms} onChange={handleChange} />
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <Button type="submit" disabled={loading} className="w-full mt-4">
              {loading ? "Enregistrement..." : "Créer le bien"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 