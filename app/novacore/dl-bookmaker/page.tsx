"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, TrendingUp, Plus, Coins } from 'lucide-react';
import Link from 'next/link';

const bets = [
  { id: 1, match: "PSG vs OM", image: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993730/trading_intelligent_rjtipd.avif", odds: 2.1, status: "Gagné", amount: 100 },
  { id: 2, match: "Barça vs Real", image: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993226/Pierre_Essomba_fat4h7.jpg", odds: 1.8, status: "Perdu", amount: 50 },
  { id: 3, match: "Chelsea vs Man Utd", image: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993227/Marie_Nguemo_p5xzhh.jpg", odds: 2.5, status: "En cours", amount: 75 },
];

export default function DLBookmakerPage() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">DL Bookmaker</h1>
        <Link href="/novacore/dl-bookmaker/nouveau">
          <Button className="bg-yellow-600 hover:bg-yellow-700">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau pari
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bets.map((bet) => (
          <Card key={bet.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <img src={bet.image} alt={bet.match} className="w-14 h-14 rounded-lg object-cover" />
              <div>
                <CardTitle className="text-lg">{bet.match}</CardTitle>
                <p className="text-xs text-gray-500">Cote : {bet.odds}</p>
                <span className={`text-xs font-medium ${bet.status === 'Gagné' ? 'text-green-600' : bet.status === 'Perdu' ? 'text-red-600' : 'text-orange-600'}`}>{bet.status}</span>
              </div>
            </CardHeader>
            <CardContent>
              <Button size="sm" variant="outline">Voir le pari</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-yellow-50">
          <CardHeader className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            <CardTitle className="text-base">Pari gagnant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{bets[0].match}</div>
            <div className="text-xs text-gray-500">{bets[0].amount} € misé</div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50">
          <CardHeader className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-yellow-600" />
            <CardTitle className="text-base">Tendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{bets[2].match}</div>
            <div className="text-xs text-gray-500">{bets[2].odds} cote</div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50">
          <CardHeader className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-yellow-600" />
            <CardTitle className="text-base">Total misé</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{bets.reduce((acc, b) => acc + b.amount, 0)} €</div>
            <div className="text-xs text-gray-500">sur {bets.length} paris</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 