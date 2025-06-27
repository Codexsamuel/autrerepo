"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plane, Upload } from 'lucide-react';

export default function NouveauPackagePage() {
  const [packageName, setPackageName] = useState('');
  const [destination, setDestination] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Envoyer le package à l'API
    alert(`Package "${packageName}" créé pour ${destination} au prix de ${price} €`);
  };

  return (
    <div className="max-w-xl mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>Nouveau package</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Nom du package *</label>
              <Input
                required
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                placeholder="Nom du package"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Destination *</label>
              <Input
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Destination"
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
              <label className="block text-sm font-medium mb-1">Durée *</label>
              <Select required value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une durée" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekend">Weekend</SelectItem>
                  <SelectItem value="semaine">1 semaine</SelectItem>
                  <SelectItem value="quinzaine">2 semaines</SelectItem>
                  <SelectItem value="mois">1 mois</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image du package</label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {imageFile && (
                <div className="mt-2 text-xs text-gray-600">Fichier sélectionné : {imageFile.name}</div>
              )}
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full">
              Créer le package
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 