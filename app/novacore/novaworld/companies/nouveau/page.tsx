"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building, Upload, FileText } from 'lucide-react';

export default function NouvelleEntreprisePage() {
  const [companyName, setCompanyName] = useState('');
  const [sector, setSector] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Envoyer l'entreprise à l'API
    alert(`Entreprise "${companyName}" créée dans le secteur "${sector}"`);
  };

  return (
    <div className="max-w-xl mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>Nouvelle entreprise</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Nom de l'entreprise *</label>
              <Input
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Nom de l'entreprise"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Secteur d'activité *</label>
              <Select required value={sector} onValueChange={setSector}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un secteur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">Tech</SelectItem>
                  <SelectItem value="hospitality">Hospitality</SelectItem>
                  <SelectItem value="assurance">Assurance</SelectItem>
                  <SelectItem value="banque">Banque</SelectItem>
                  <SelectItem value="immobilier">Immobilier</SelectItem>
                  <SelectItem value="trading">Trading</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Logo de l'entreprise</label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {logoFile && (
                <div className="mt-2 text-xs text-gray-600">Fichier sélectionné : {logoFile.name}</div>
              )}
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full">
              Créer l'entreprise
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 