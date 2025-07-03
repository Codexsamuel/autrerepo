"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CompteEditClientProps {
  id: string;
}

export default function CompteEditClient({ id }: CompteEditClientProps) {
  const router = useRouter();
  const [number, setNumber] = useState("");
  const [type, setType] = useState("");
  const [balance, setBalance] = useState(0);
  const [owner, setOwner] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchCompte();
  }, [id]);

  async function fetchCompte() {
    setLoading(true);
    // Simuler les données pour l'export statique
    setTimeout(() => {
      setNumber("FR76 1234 5678 9012 3456 7890 123");
      setType("Compte courant");
      setBalance(2500);
      setOwner("Jean Dupont");
      setLoading(false);
    }, 1000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simuler la mise à jour
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    router.push("/solutions/banque/comptes");
  }

  if (loading) return <div className="p-10 text-center">Chargement...</div>;

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Éditer le compte bancaire</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Numéro de compte"
              value={number}
              onChange={e => setNumber(e.target.value)}
              required
            />
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Titulaire du compte"
              value={owner}
              onChange={e => setOwner(e.target.value)}
              required
            />
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Type de compte (ex: courant, épargne)"
              value={type}
              onChange={e => setType(e.target.value)}
              required
            />
            <input
              className="border rounded px-3 py-2 w-full"
              type="number"
              placeholder="Solde (€)"
              value={balance}
              onChange={e => setBalance(Number(e.target.value))}
              required
              min={0}
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