'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    AlertTriangle,
    MapPin,
    Navigation,
    Search
} from 'lucide-react';
import { useState } from 'react';

export default function ArtisansTechnicians() {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🔧 Artisans & Techniciens Vérifiés
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Trouvez rapidement des professionnels qualifiés pour tous vos travaux. 
          Service d'urgence 24/7 disponible pour les dépannages critiques.
        </p>
      </div>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Rechercher un artisan, service ou localisation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-lg"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="px-6">
                <MapPin className="w-4 h-4 mr-2" />
                Ma localisation
              </Button>
              <Button className="px-6 bg-red-600 hover:bg-red-700">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Urgence 24/7
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center py-8">
        <Navigation className="w-16 h-16 text-blue-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Module Artisans & Techniciens
        </h3>
        <p className="text-gray-600">
          Interface complète avec carte interactive, système d'urgence 24/7, 
          et gestion des interventions techniques.
        </p>
      </div>
    </div>
  );
} 