"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Home, 
  MapPin, 
  Euro, 
  Ruler, 
  Bed, 
  Users, 
  Calendar,
  Phone,
  Mail,
  Eye,
  Heart
} from 'lucide-react';
import { Property } from '@/lib/database/real-estate';

interface PropertyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
}

export default function PropertyDetailsModal({ isOpen, onClose, properties }: PropertyDetailsModalProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const getPropertyTypeIcon = (type: string) => {
    switch (type) {
      case 'appartement': return '🏢';
      case 'maison': return '🏠';
      case 'terrain': return '🌱';
      case 'bureau': return '🏢';
      case 'commerce': return '🏪';
      default: return '🏠';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'disponible': return 'bg-green-100 text-green-800';
      case 'vendu': return 'bg-red-100 text-red-800';
      case 'en_negociation': return 'bg-yellow-100 text-yellow-800';
      case 'reserve': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Home className="w-5 h-5" />
            Biens Disponibles ({properties.length})
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Liste des biens */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Liste des biens</h3>
            {properties.map((property) => (
              <Card 
                key={property.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedProperty?.id === property.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedProperty(property)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getPropertyTypeIcon(property.type)}</span>
                      <div>
                        <CardTitle className="text-base">{property.title}</CardTitle>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {property.location.city}, {property.location.neighborhood}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(property.status)}>
                      {property.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Euro className="w-3 h-3" />
                        {formatPrice(property.price)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Ruler className="w-3 h-3" />
                        {property.surface}m²
                      </span>
                      {property.rooms > 0 && (
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {property.rooms} pièces
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Détails du bien sélectionné */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Détails du bien</h3>
            {selectedProperty ? (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">{getPropertyTypeIcon(selectedProperty.type)}</span>
                        {selectedProperty.title}
                      </CardTitle>
                      <Badge className={getStatusColor(selectedProperty.status)}>
                        {selectedProperty.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Euro className="w-4 h-4 text-green-600" />
                        <span className="font-semibold">{formatPrice(selectedProperty.price)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Ruler className="w-4 h-4 text-blue-600" />
                        <span>{selectedProperty.surface}m²</span>
                      </div>
                      {selectedProperty.rooms > 0 && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-purple-600" />
                          <span>{selectedProperty.rooms} pièces</span>
                        </div>
                      )}
                      {selectedProperty.bedrooms > 0 && (
                        <div className="flex items-center gap-2">
                          <Bed className="w-4 h-4 text-orange-600" />
                          <span>{selectedProperty.bedrooms} chambres</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Localisation</h4>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {selectedProperty.location.address}
                      </p>
                      <p className="text-sm text-gray-600">
                        {selectedProperty.location.postalCode} {selectedProperty.location.city}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quartier: {selectedProperty.location.neighborhood}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Caractéristiques</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProperty.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Classe énergétique</h4>
                      <Badge className="bg-green-100 text-green-800">
                        Classe {selectedProperty.energyClass}
                      </Badge>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Description</h4>
                      <p className="text-sm text-gray-600">{selectedProperty.description}</p>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button className="flex-1" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        Voir les photos
                      </Button>
                      <Button className="flex-1">
                        <Phone className="w-4 h-4 mr-2" />
                        Contacter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Home className="w-12 h-12 mx-auto mb-2" />
                  <p>Sélectionnez un bien pour voir les détails</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 