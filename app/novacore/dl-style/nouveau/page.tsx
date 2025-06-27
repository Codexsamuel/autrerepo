"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingBag, Upload } from 'lucide-react';

export default function NouveauProduitPage() {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Envoyer le produit à l'API
    alert(`Produit "${productName}" créé au prix de ${price} €`);
  };

  return (
    <div className="max-w-xl mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>Nouveau produit</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Nom du produit *</label>
              <Input
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Nom du produit"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Prix *</label>
              <Input
                required
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Catégorie *</label>
              <Select required value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vetements">Vêtements</SelectItem>
                  <SelectItem value="chaussures">Chaussures</SelectItem>
                  <SelectItem value="accessoires">Accessoires</SelectItem>
                  <SelectItem value="beaute">Beauté</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image du produit</label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {imageFile && (
                <div className="mt-2 text-xs text-gray-600">Fichier sélectionné : {imageFile.name}</div>
              )}
            </div>
            <Button type="submit" className="bg-pink-600 hover:bg-pink-700 w-full">
              Créer le produit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 