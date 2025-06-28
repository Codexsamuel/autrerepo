"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Building2, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  MapPin,
  Euro,
  Home
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase-client";

interface Property {
  id: string;
  title: string;
  type: string;
  address: string;
  city: string;
  price: number;
  rent_price?: number;
  status: string;
  surface_area?: number;
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  created_at: string;
}

export default function BiensPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('real_estate_properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Erreur chargement biens:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce bien ?')) {
      try {
        const { error } = await supabase
          .from('real_estate_properties')
          .delete()
          .eq('id', id);

        if (error) throw error;
        loadProperties(); // Recharger la liste
      } catch (error) {
        console.error('Erreur suppression:', error);
      }
    }
  };

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'rented': return 'bg-blue-100 text-blue-800';
      case 'sold': return 'bg-orange-100 text-orange-800';
      case 'maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'rented': return 'Loué';
      case 'sold': return 'Vendu';
      case 'maintenance': return 'Maintenance';
      default: return status;
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Chargement des biens...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Biens</h1>
          <p className="text-gray-600 mt-2">
            {properties.length} bien{properties.length > 1 ? 's' : ''} en gestion
          </p>
        </div>
        <Link href="/solutions/immobilier/biens/nouveau">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nouveau bien
          </Button>
        </Link>
      </div>

      {/* Barre de recherche */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Rechercher un bien..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Liste des biens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property: any) => (
          <Card key={property.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{property.title}</CardTitle>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {property.city}
                  </p>
                </div>
                <Badge className={getStatusColor(property.status)}>
                  {getStatusLabel(property.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Type:</span>
                  <span className="font-medium">{property.type}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Prix:</span>
                  <span className="font-bold text-lg text-green-600">
                    {property.price.toLocaleString('fr-FR')} €
                  </span>
                </div>

                {property.rent_price && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Loyer:</span>
                    <span className="font-medium text-blue-600">
                      {property.rent_price.toLocaleString('fr-FR')} €/mois
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Surface:</span>
                  <span className="font-medium">
                    {property.surface_area ? `${property.surface_area}m²` : 'N/A'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pièces:</span>
                  <span className="font-medium">
                    {property.rooms || 0} pièces
                    {property.bedrooms && ` (${property.bedrooms} chambres)`}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-xs text-gray-500">
                    Ajouté le {new Date(property.created_at).toLocaleDateString('fr-FR')}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-3">
                  <Link href={`/solutions/immobilier/biens/${property.id}`}>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      Voir
                    </Button>
                  </Link>
                  <Link href={`/solutions/immobilier/biens/${property.id}/edit`}>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </Link>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => deleteProperty(property.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'Aucun bien trouvé' : 'Aucun bien enregistré'}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm 
              ? 'Essayez de modifier vos critères de recherche'
              : 'Commencez par ajouter votre premier bien immobilier'
            }
          </p>
          <Link href="/solutions/immobilier/biens/nouveau">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un bien
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}