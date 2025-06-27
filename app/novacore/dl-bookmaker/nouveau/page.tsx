"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trophy, Coins } from 'lucide-react';

export default function NouveauPariPage() {
  const [match, setMatch] = useState('');
  const [odds, setOdds] = useState('');
  const [amount, setAmount] = useState('');
  const [sport, setSport] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Envoyer le pari à l'API
    alert(`Pari créé sur "${match}" avec une cote de ${odds} et un montant de ${amount} €`);
  };

  return (
    <div className="max-w-xl mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>Nouveau pari</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Match *</label>
              <Input
                required
                value={match}
                onChange={(e) => setMatch(e.target.value)}
                placeholder="Équipe 1 vs Équipe 2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sport *</label>
              <Select required value={sport} onValueChange={setSport}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un sport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="football">Football</SelectItem>
                  <SelectItem value="basketball">Basketball</SelectItem>
                  <SelectItem value="tennis">Tennis</SelectItem>
                  <SelectItem value="boxe">Boxe</SelectItem>
                  <SelectItem value="mma">MMA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cote *</label>
              <Input
                required
                type="number"
                step="0.01"
                value={odds}
                onChange={(e) => setOdds(e.target.value)}
                placeholder="1.50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Montant misé *</label>
              <Input
                required
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <Button type="submit" className="bg-yellow-600 hover:bg-yellow-700 w-full">
              Créer le pari
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 