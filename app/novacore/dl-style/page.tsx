"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Star, TrendingUp, Plus } from 'lucide-react';
import Link from 'next/link';

const products = [
  { id: 1, name: "Robe d'été", image: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993730/trading_intelligent_rjtipd.avif", price: 49.99, sales: 120 },
  { id: 2, name: "Chemise business", image: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993226/Pierre_Essomba_fat4h7.jpg", price: 39.99, sales: 95 },
  { id: 3, name: "Sneakers Nova", image: "https://res.cloudinary.com/dko5sommz/image/upload/v1750993227/Marie_Nguemo_p5xzhh.jpg", price: 89.99, sales: 150 },
];

export default function DLStylePage() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">DL Style</h1>
        <Link href="/novacore/dl-style/nouveau">
          <Button className="bg-pink-600 hover:bg-pink-700">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau produit
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <img src={product.image} alt={product.name} className="w-14 h-14 rounded-lg object-cover" />
              <div>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <p className="text-xs text-gray-500">{product.price} €</p>
                <span className="text-xs text-gray-400">{product.sales} ventes</span>
              </div>
            </CardHeader>
            <CardContent>
              <Button size="sm" variant="outline">Voir le produit</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-pink-50">
          <CardHeader className="flex items-center gap-2">
            <Star className="h-5 w-5 text-pink-600" />
            <CardTitle className="text-base">Meilleure vente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{products[2].name}</div>
            <div className="text-xs text-gray-500">{products[2].sales} ventes</div>
          </CardContent>
        </Card>
        <Card className="bg-pink-50">
          <CardHeader className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-pink-600" />
            <CardTitle className="text-base">Tendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{products[0].name}</div>
            <div className="text-xs text-gray-500">{products[0].sales} ventes</div>
          </CardContent>
        </Card>
        <Card className="bg-pink-50">
          <CardHeader className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-pink-600" />
            <CardTitle className="text-base">Total produits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{products.length}</div>
            <div className="text-xs text-gray-500">produits référencés</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 