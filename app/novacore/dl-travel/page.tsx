"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, MapPin, TrendingUp, Plus } from 'lucide-react';
import Link from 'next/link';

const packages = [
  { id: 1, name: "Séjour Paris", image: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993730/trading_intelligent_rjtipd.avif", price: 899, location: "Paris" },
  { id: 2, name: "Safari Kenya", image: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993226/Pierre_Essomba_fat4h7.jpg", price: 1299, location: "Nairobi" },
  { id: 3, name: "Plages Maldives", image: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993227/Marie_Nguemo_p5xzhh.jpg", price: 1999, location: "Maldives" },
];

export default function DLTravelPage() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">DL Travel</h1>
        <Link href="/novacore/dl-travel/nouveau">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau package
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pack) => (
          <Card key={pack.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <img src={pack.image} alt={pack.name} className="w-14 h-14 rounded-lg object-cover" />
              <div>
                <CardTitle className="text-lg">{pack.name}</CardTitle>
                <p className="text-xs text-gray-500">{pack.location}</p>
                <span className="text-xs text-gray-400">{pack.price} €</span>
              </div>
            </CardHeader>
            <CardContent>
              <Button size="sm" variant="outline">Voir le package</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-blue-50">
          <CardHeader className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-base">Tendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{packages[2].name}</div>
            <div className="text-xs text-gray-500">{packages[2].price} €</div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50">
          <CardHeader className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-base">Total packages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{packages.length}</div>
            <div className="text-xs text-gray-500">packages référencés</div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50">
          <CardHeader className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-base">Destinations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{[...new Set(packages.map(p => p.location))].length}</div>
            <div className="text-xs text-gray-500">destinations</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}