"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase-client";

export default function EditClientPage() {
  const router = useRouter();
  const params = useParams();
  const clientId = params?.id as string;
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    company_name: "",
    position: "",
    status: "client"
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (clientId) loadClient();
  }, [clientId]);

  const loadClient = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('clients').select('*').eq('id', clientId).single();
      if (error) throw error;
      setForm({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        company_name: data.company_name || "",
        position: data.position || "",
        status: data.status || "client"
      });
    } catch (err) {
      setError("Erreur lors du chargement du client.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const { error } = await supabase.from('clients').update({
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        company_name: form.company_name,
        position: form.position,
        status: form.status
      }).eq('id', clientId);
      if (error) throw error;
      router.push("/solutions/immobilier/clients");
    } catch (err) {
      setError("Erreur lors de la mise à jour du client.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Chargement...</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Modifier le client</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name">Prénom</Label>
                <Input id="first_name" name="first_name" value={form.first_name} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="last_name">Nom</Label>
                <Input id="last_name" name="last_name" value={form.last_name} onChange={handleChange} required />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" name="phone" value={form.phone} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="address">Adresse</Label>
              <Input id="address" name="address" value={form.address} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="company_name">Société</Label>
              <Input id="company_name" name="company_name" value={form.company_name} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="position">Poste</Label>
              <Input id="position" name="position" value={form.position} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="status">Statut</Label>
              <select id="status" name="status" value={form.status} onChange={handleChange} className="w-full border rounded px-3 py-2">
                <option value="lead">Lead</option>
                <option value="prospect">Prospect</option>
                <option value="client">Client</option>
                <option value="inactive">Inactif</option>
              </select>
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <Button type="submit" disabled={saving} className="w-full mt-4">
              {saving ? "Enregistrement..." : "Enregistrer les modifications"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 