'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Edit,
  Download,
  Share2,
  MessageSquare,
  Star,
  Bed,
  Wifi,
  Car,
  Utensils
} from 'lucide-react';

interface Reservation {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomNumber: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  totalAmount: number;
  paymentStatus: 'paid' | 'pending' | 'failed';
  specialRequests: string[];
  amenities: string[];
  loyaltyPoints: number;
  previousStays: number;
  createdAt: string;
  updatedAt: string;
}

export default function ReservationDetailPage() {
  const params = useParams();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      loadReservationData();
      setLoading(false);
    }, 1000);
  }, [params.id]);

  const loadReservationData = () => {
    // Données simulées
    const mockReservation: Reservation = {
      id: params.id as string,
      guestName: "Jean Dupont",
      guestEmail: "jean.dupont@email.com",
      guestPhone: "+33 6 12 34 56 78",
      roomNumber: "205",
      roomType: "Suite Deluxe",
      checkIn: "2024-02-15T14:00:00Z",
      checkOut: "2024-02-18T11:00:00Z",
      status: "confirmed",
      totalAmount: 1250.00,
      paymentStatus: "paid",
      specialRequests: [
        "Lit king-size",
        "Vue sur la ville",
        "Service de chambre le matin",
        "Parking privé"
      ],
      amenities: [
        "WiFi haute vitesse",
        "Mini-bar",
        "Service de chambre 24h",
        "Spa et fitness",
        "Restaurant gastronomique",
        "Conciergerie"
      ],
      loyaltyPoints: 1250,
      previousStays: 8,
      createdAt: "2024-02-10T10:30:00Z",
      updatedAt: "2024-02-14T16:45:00Z"
    };

    setReservation(mockReservation);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <span className="ml-4 text-gray-600">Chargement de la réservation...</span>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardContent className="p-12 text-center">
            <XCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Réservation non trouvée</h3>
            <p className="text-gray-600">La réservation demandée n'existe pas ou a été supprimée.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Réservation #{reservation.id}</h1>
            <p className="text-gray-600 mt-2">Détails complets de la réservation</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Partager
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Informations principales */}
        <div className="lg:col-span-2 space-y-6">
          {/* Statut et informations de base */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Informations de la réservation</span>
                <div className="flex space-x-2">
                  <Badge className={getStatusColor(reservation.status)}>
                    {reservation.status === 'confirmed' ? 'Confirmée' :
                     reservation.status === 'pending' ? 'En attente' :
                     reservation.status === 'cancelled' ? 'Annulée' : 'Terminée'}
                  </Badge>
                  <Badge className={getPaymentStatusColor(reservation.paymentStatus)}>
                    {reservation.paymentStatus === 'paid' ? 'Payée' :
                     reservation.paymentStatus === 'pending' ? 'En attente' : 'Échouée'}
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Check-in</p>
                      <p className="text-sm text-gray-600">{formatDate(reservation.checkIn)} à {formatTime(reservation.checkIn)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="text-sm font-medium">Check-out</p>
                      <p className="text-sm text-gray-600">{formatDate(reservation.checkOut)} à {formatTime(reservation.checkOut)}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Bed className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium">Chambre</p>
                      <p className="text-sm text-gray-600">{reservation.roomType} - #{reservation.roomNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">Montant total</p>
                      <p className="text-sm text-gray-600">{reservation.totalAmount.toFixed(2)} €</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations client */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Informations client
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium">Nom complet</p>
                      <p className="text-sm text-gray-600">{reservation.guestName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-gray-600">{reservation.guestEmail}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium">Téléphone</p>
                      <p className="text-sm text-gray-600">{reservation.guestPhone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="text-sm font-medium">Séjours précédents</p>
                      <p className="text-sm text-gray-600">{reservation.previousStays} séjours</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Points de fidélité */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Points de fidélité</p>
                    <p className="text-2xl font-bold text-blue-600">{reservation.loyaltyPoints}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Niveau</p>
                    <p className="text-lg font-semibold text-purple-600">Gold</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Demandes spéciales */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Demandes spéciales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reservation.specialRequests.map((request, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{request}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Services inclus */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wifi className="mr-2 h-5 w-5" />
                Services inclus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reservation.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions rapides */}
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full" variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contacter le client
                </Button>
                <Button className="w-full" variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier la réservation
                </Button>
                <Button className="w-full" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger la facture
                </Button>
                <Button className="w-full" variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Partager les détails
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Informations système */}
          <Card>
            <CardHeader>
              <CardTitle>Informations système</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Créée le:</span>
                  <span>{formatDate(reservation.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Modifiée le:</span>
                  <span>{formatDate(reservation.updatedAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ID réservation:</span>
                  <span className="font-mono">{reservation.id}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}