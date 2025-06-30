"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  Euro, 
  Phone, 
  Mail, 
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { ScheduledVisit, Client, Property, getClientById, getPropertyById } from '@/lib/database/real-estate';

interface ScheduledVisitsModalProps {
  isOpen: boolean;
  onClose: () => void;
  visits: ScheduledVisit[];
}

export default function ScheduledVisitsModal({ isOpen, onClose, visits }: ScheduledVisitsModalProps) {
  const [selectedVisit, setSelectedVisit] = useState<ScheduledVisit | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'programmee': return 'bg-blue-100 text-blue-800';
      case 'confirmee': return 'bg-green-100 text-green-800';
      case 'annulee': return 'bg-red-100 text-red-800';
      case 'terminee': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'programmee': return <Calendar className="w-4 h-4" />;
      case 'confirmee': return <CheckCircle className="w-4 h-4" />;
      case 'annulee': return <XCircle className="w-4 h-4" />;
      case 'terminee': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const formatTime = (time: string) => {
    return time;
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
            <Calendar className="w-5 h-5" />
            Visites Programmées ({visits.length})
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Liste des visites */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Liste des visites</h3>
            {visits.map((visit) => {
              const client = getClientById(visit.clientId);
              const property = getPropertyById(visit.propertyId);
              
              return (
                <Card 
                  key={visit.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedVisit?.id === visit.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedVisit(visit)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Calendar className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-base">
                            {client ? `${client.firstName} ${client.lastName}` : 'Client inconnu'}
                          </CardTitle>
                          <p className="text-sm text-gray-600">
                            {property ? property.title : 'Bien inconnu'}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(visit.status)}>
                        {getStatusIcon(visit.status)}
                        <span className="ml-1">{visit.status}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(visit.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTime(visit.timeSlot.start)} - {formatTime(visit.timeSlot.end)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Détails de la visite sélectionnée */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Détails de la visite</h3>
            {selectedVisit ? (
              <div className="space-y-4">
                {(() => {
                  const client = getClientById(selectedVisit.clientId);
                  const property = getPropertyById(selectedVisit.propertyId);
                  
                  return (
                    <>
                      {/* Informations client */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Informations client
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {client ? (
                            <>
                              <div className="flex items-center justify-between">
                                <span className="font-semibold">Nom complet:</span>
                                <span>{client.firstName} {client.lastName}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="font-semibold">Email:</span>
                                <span className="flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  {client.email}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="font-semibold">Téléphone:</span>
                                <span className="flex items-center gap-1">
                                  <Phone className="w-3 h-3" />
                                  {client.phone}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="font-semibold">Budget:</span>
                                <span className="flex items-center gap-1">
                                  <Euro className="w-3 h-3" />
                                  {formatPrice(client.budget.min)} - {formatPrice(client.budget.max)}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="font-semibold">Statut:</span>
                                <Badge className={client.status === 'actif' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                                  {client.status}
                                </Badge>
                              </div>
                            </>
                          ) : (
                            <p className="text-gray-500">Client non trouvé</p>
                          )}
                        </CardContent>
                      </Card>

                      {/* Informations bien */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            Bien à visiter
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {property ? (
                            <>
                              <div className="flex items-center justify-between">
                                <span className="font-semibold">Titre:</span>
                                <span>{property.title}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="font-semibold">Prix:</span>
                                <span className="flex items-center gap-1">
                                  <Euro className="w-3 h-3" />
                                  {formatPrice(property.price)}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="font-semibold">Surface:</span>
                                <span>{property.surface}m²</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="font-semibold">Localisation:</span>
                                <span>{property.location.city}, {property.location.neighborhood}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="font-semibold">Statut:</span>
                                <Badge className={property.status === 'disponible' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                                  {property.status}
                                </Badge>
                              </div>
                            </>
                          ) : (
                            <p className="text-gray-500">Bien non trouvé</p>
                          )}
                        </CardContent>
                      </Card>

                      {/* Détails de la visite */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            Détails de la visite
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">Date:</span>
                            <span>{formatDate(selectedVisit.date)}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">Horaire:</span>
                            <span>{formatTime(selectedVisit.timeSlot.start)} - {formatTime(selectedVisit.timeSlot.end)}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">Statut:</span>
                            <Badge className={getStatusColor(selectedVisit.status)}>
                              {getStatusIcon(selectedVisit.status)}
                              <span className="ml-1">{selectedVisit.status}</span>
                            </Badge>
                          </div>
                          <div>
                            <span className="font-semibold">Notes:</span>
                            <p className="text-sm text-gray-600 mt-1">{selectedVisit.notes}</p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button className="flex-1" variant="outline">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Envoyer rappel
                        </Button>
                        <Button className="flex-1">
                          <Phone className="w-4 h-4 mr-2" />
                          Appeler client
                        </Button>
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <Card className="h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-2" />
                  <p>Sélectionnez une visite pour voir les détails</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 