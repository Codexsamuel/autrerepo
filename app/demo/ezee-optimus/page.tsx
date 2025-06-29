'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Building2, 
  Shield, 
  TrendingUp, 
  Calendar as CalendarIcon, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Settings,
  BarChart3,
  FileText,
  Globe,
  Bed,
  MapPin,
  Star,
  DollarSign,
  Phone,
  Mail,
  Wifi,
  Car,
  Utensils,
  Camera,
  Brain,
  Eye,
  Bell,
  User,
  Plus,
  Search,
  Filter,
  QrCode
} from 'lucide-react';

interface Metric {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: string;
}

interface Reservation {
  id: string;
  guestName: string;
  guestPhoto?: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled' | 'no-show';
  totalAmount: number;
  guests: number;
  specialRequests: string[];
  aiRiskScore: number;
  assignedStaff: string;
  serviceType: 'room' | 'spa' | 'restaurant' | 'concierge';
  documents?: string[];
  signature?: string;
}

interface Room {
  id: string;
  number: string;
  type: 'standard' | 'deluxe' | 'suite' | 'presidential';
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  floor: number;
  price: number;
  amenities: string[];
  currentGuest?: string;
  currentGuestPhoto?: string;
}

interface Service {
  id: string;
  type: 'room-service' | 'housekeeping' | 'concierge' | 'spa' | 'restaurant';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  roomNumber: string;
  guestName: string;
  guestPhoto?: string;
  description: string;
  requestedTime: string;
  priority: 'low' | 'medium' | 'high';
  aiRecommendation?: string;
}

interface Client {
  id: string;
  name: string;
  photo?: string;
  email: string;
  phone: string;
  loyaltyLevel: 'bronze' | 'silver' | 'gold' | 'platinum';
  totalVisits: number;
  averageRating: number;
  preferences: string[];
  documents: string[];
  aiProfile: {
    riskScore: number;
    preferences: string[];
    recommendations: string[];
  };
}

function EzeeOptimusNavbar() {
  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <img src="/logos/novacore.svg" alt="NovaCore Logo" className="w-7 h-7" />
          </div>
          <span className="font-bold text-lg text-gray-900">Hôtel Le Meridien Yaoundé</span>
        </div>
        <div className="flex-1 max-w-md mx-8">
          <input type="text" placeholder="Rechercher..." className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative">
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">1</span>
            <Bell className="w-6 h-6 text-blue-600" />
          </button>
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg" />
              <AvatarFallback>SO</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <span className="font-medium text-sm">Samuel OBAM</span>
              <div className="text-xs text-gray-500">Directeur Général</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function IAAlertBanner() {
  return (
    <div className="bg-gradient-to-r from-yellow-100 to-red-100 border-l-4 border-yellow-400 p-4 flex items-center justify-between mb-6 mt-2 rounded shadow">
      <div className="flex items-center space-x-3">
        <AlertTriangle className="w-6 h-6 text-yellow-600" />
        <span className="font-semibold text-yellow-900">IA NovaCore:</span>
        <span className="text-sm text-gray-800">Tarif concurrent - Booking.com 15% moins cher ce weekend</span>
      </div>
      <button className="bg-yellow-400 text-white px-3 py-1 rounded font-medium hover:bg-yellow-500 transition">Voir toutes les alertes</button>
    </div>
  );
}

type TapeChartProps = { rooms: Room[]; reservations: Reservation[] };
function TapeChart({ rooms, reservations }: TapeChartProps) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow p-4 mb-8">
      <div className="flex items-center mb-2">
        <CalendarIcon className="w-5 h-5 text-blue-600 mr-2" />
        <span className="font-semibold text-lg">Plan d'occupation - Tape Chart</span>
      </div>
      <table className="min-w-full text-xs">
        <thead>
          <tr>
            <th className="p-2 text-left">Chambre</th>
            {days.map((day, i) => (
              <th key={i} className="p-2 text-center">{day.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' })}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rooms.map((room: Room) => (
            <tr key={room.id} className="border-b">
              <td className="p-2 font-medium">{room.number} <span className="text-gray-400">({room.type})</span></td>
              {days.map((day, i) => {
                const res = reservations.find((r: Reservation) => r.roomNumber === room.number && new Date(r.checkIn) <= day && new Date(r.checkOut) > day);
                return (
                  <td key={i} className="p-1 text-center">
                    {res ? (
                      <span className={`inline-block px-2 py-1 rounded text-white text-xs cursor-pointer ${res.status === 'checked-in' ? 'bg-green-500' : res.status === 'confirmed' ? 'bg-blue-500' : res.status === 'cancelled' ? 'bg-red-400' : 'bg-yellow-400'}`}
                        title={`Client: ${res.guestName}\nStatut: ${res.status}`}
                      >
                        {res.guestName.split(' ')[0]}
                      </span>
                    ) : (
                      <span className="inline-block w-4 h-4 bg-gray-100 rounded-full"></span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type VIPClientsProps = { clients: Client[] };
function VIPClients({ clients }: VIPClientsProps) {
  const vips = clients.filter((c: Client) => c.loyaltyLevel === 'gold' || c.loyaltyLevel === 'platinum');
  if (!vips.length) return null;
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-500" />
          <span>Clients VIP Présents</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          {vips.map((client: Client) => (
            <div key={client.id} className="flex items-center space-x-2 p-2 border rounded-lg">
              <Avatar className="w-8 h-8">
                <AvatarImage src={client.photo} />
                <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-sm">{client.name}</div>
                <div className="text-xs text-gray-500">{client.loyaltyLevel}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function IAInsights() {
  return (
    <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Brain className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="font-semibold text-blue-900">Insights IA</h3>
              <p className="text-sm text-blue-700">
                Taux d'occupation: 85% | Revenus prévus: €12,500 | Alertes: 2
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <BarChart3 className="w-5 h-5 text-green-600" />
          </div>
        </div>
        <div className="mt-2 text-sm text-blue-800">Opportunité détectée : L'IA recommande d'augmenter le budget Instagram de 30% pour maximiser le ROI sur votre audience 25-35 ans.</div>
        <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">Appliquer la recommandation</button>
      </CardContent>
    </Card>
  );
}

function EzeeOptimusFooter() {
  return (
    <footer className="bg-white border-t mt-12 py-6 text-center text-xs text-gray-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <img src="/logos/novacore.svg" alt="NovaCore Logo" className="w-6 h-6" />
          <span>NovaCore Hospitality</span>
        </div>
        <div>
          Made by Samuel OBAM, CEO of DL Solutions &nbsp;|&nbsp; +237 694 341 586 &nbsp;|&nbsp; Rue École de Police, Yaoundé &nbsp;|&nbsp; sobam@daveandlucesolutions.com
        </div>
        <div>
          © 2024 NovaCore Hospitality CRM. Tous droits réservés. Powered by NovaCore AI.
        </div>
      </div>
    </footer>
  );
}

export default function EzeeOptimusPage() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [filterType, setFilterType] = useState<'all' | 'room' | 'spa' | 'restaurant'>('all');

  useEffect(() => {
    setTimeout(() => {
      loadData();
      setLoading(false);
    }, 1000);
  }, []);

  const loadData = () => {
    setMetrics([
      {
        title: "Taux d'Occupation",
        value: "87.3%",
        change: 5.2,
        icon: <Building2 className="h-4 w-4" />,
        color: "text-blue-600"
      },
      {
        title: "Revenus du Jour",
        value: "€12,450",
        change: 12.8,
        icon: <DollarSign className="h-4 w-4" />,
        color: "text-green-600"
      },
      {
        title: "Réservations",
        value: "24",
        change: -3.1,
        icon: <CalendarIcon className="h-4 w-4" />,
        color: "text-purple-600"
      },
      {
        title: "Satisfaction Client",
        value: "4.8/5",
        change: 0.2,
        icon: <Star className="h-4 w-4" />,
        color: "text-orange-600"
      }
    ]);

    setClients([
      {
        id: "1",
        name: "Jean Dupont",
        photo: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
        email: "jean.dupont@email.com",
        phone: "+33 6 12 34 56 78",
        loyaltyLevel: "gold",
        totalVisits: 15,
        averageRating: 4.8,
        preferences: ["Vue mer", "Lit king-size", "Service conciergerie"],
        documents: ["CNI", "Carte de crédit"],
        aiProfile: {
          riskScore: 0.15,
          preferences: ["Spa", "Restaurant gastronomique"],
          recommendations: ["Massage relaxant", "Dîner romantique"]
        }
      },
      {
        id: "2",
        name: "Marie Martin",
        photo: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407312/Lucie_u6swnq.jpg",
        email: "marie.martin@email.com",
        phone: "+33 6 98 76 54 32",
        loyaltyLevel: "silver",
        totalVisits: 8,
        averageRating: 4.6,
        preferences: ["Chambre non-fumeur", "WiFi rapide"],
        documents: ["Passeport"],
        aiProfile: {
          riskScore: 0.25,
          preferences: ["Yoga", "Cuisine végétarienne"],
          recommendations: ["Séance yoga matinale", "Menu détox"]
        }
      }
    ]);

    setReservations([
      {
        id: "RES-001",
        guestName: "Jean Dupont",
        guestPhoto: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
        roomNumber: "201",
        checkIn: "2024-02-14",
        checkOut: "2024-02-16",
        status: "checked-in",
        totalAmount: 320.00,
        guests: 2,
        specialRequests: ["Lit king-size", "Vue mer"],
        aiRiskScore: 0.15,
        assignedStaff: "Sarah Johnson",
        serviceType: "room",
        documents: ["CNI", "Carte de crédit"]
      },
      {
        id: "RES-002",
        guestName: "Marie Martin",
        guestPhoto: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407312/Lucie_u6swnq.jpg",
        roomNumber: "305",
        checkIn: "2024-02-14",
        checkOut: "2024-02-15",
        status: "confirmed",
        totalAmount: 180.00,
        guests: 1,
        specialRequests: ["Chambre non-fumeur"],
        aiRiskScore: 0.25,
        assignedStaff: "Michael Chen",
        serviceType: "spa",
        documents: ["Passeport"]
      },
      {
        id: "RES-003",
        guestName: "Pierre Durand",
        roomNumber: "401",
        checkIn: "2024-02-13",
        checkOut: "2024-02-17",
        status: "checked-in",
        totalAmount: 720.00,
        guests: 3,
        specialRequests: ["Suite", "Service de conciergerie"],
        aiRiskScore: 0.08,
        assignedStaff: "Emma Davis",
        serviceType: "room",
        documents: ["CNI", "Carte de crédit"]
      },
      {
        id: "RES-004",
        guestName: "Sophie Bernard",
        roomNumber: "102",
        checkIn: "2024-02-15",
        checkOut: "2024-02-18",
        status: "confirmed",
        totalAmount: 540.00,
        guests: 2,
        specialRequests: ["Chambre accessible"],
        aiRiskScore: 0.35,
        assignedStaff: "Alex Thompson",
        serviceType: "restaurant",
        documents: ["CNI"]
      }
    ]);

    setRooms([
      { id: "1", number: "101", type: "standard", status: "available", floor: 1, price: 120, amenities: ["WiFi", "TV", "Salle de bain"] },
      { id: "2", number: "102", type: "standard", status: "reserved", floor: 1, price: 120, amenities: ["WiFi", "TV", "Salle de bain"] },
      { 
        id: "3", 
        number: "201", 
        type: "deluxe", 
        status: "occupied", 
        floor: 2, 
        price: 180, 
        amenities: ["WiFi", "TV", "Mini-bar", "Vue mer"], 
        currentGuest: "Jean Dupont",
        currentGuestPhoto: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg"
      },
      { id: "4", number: "202", type: "deluxe", status: "available", floor: 2, price: 180, amenities: ["WiFi", "TV", "Mini-bar", "Vue mer"] },
      { id: "5", number: "301", type: "suite", status: "maintenance", floor: 3, price: 280, amenities: ["WiFi", "TV", "Mini-bar", "Balcon", "Jacuzzi"] },
      { 
        id: "6", 
        number: "401", 
        type: "suite", 
        status: "occupied", 
        floor: 4, 
        price: 280, 
        amenities: ["WiFi", "TV", "Mini-bar", "Balcon", "Jacuzzi"], 
        currentGuest: "Pierre Durand"
      },
      { id: "7", number: "501", type: "presidential", status: "available", floor: 5, price: 500, amenities: ["WiFi", "TV", "Mini-bar", "Balcon", "Jacuzzi", "Service conciergerie"] },
      { id: "8", number: "502", type: "presidential", status: "reserved", floor: 5, price: 500, amenities: ["WiFi", "TV", "Mini-bar", "Balcon", "Jacuzzi", "Service conciergerie"] }
    ]);

    setServices([
      {
        id: "SRV-001",
        type: "room-service",
        status: "in-progress",
        roomNumber: "201",
        guestName: "Jean Dupont",
        guestPhoto: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
        description: "Petit-déjeuner continental",
        requestedTime: "08:00",
        priority: "medium",
        aiRecommendation: "Client fidèle - Service premium recommandé"
      },
      {
        id: "SRV-002",
        type: "housekeeping",
        status: "pending",
        roomNumber: "305",
        guestName: "Marie Martin",
        guestPhoto: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407312/Lucie_u6swnq.jpg",
        description: "Nettoyage de la chambre",
        requestedTime: "10:00",
        priority: "low",
        aiRecommendation: "Client sensible - Éviter les produits parfumés"
      },
      {
        id: "SRV-003",
        type: "concierge",
        status: "completed",
        roomNumber: "401",
        guestName: "Pierre Durand",
        description: "Réservation restaurant",
        requestedTime: "19:00",
        priority: "high",
        aiRecommendation: "Client VIP - Service prioritaire"
      },
      {
        id: "SRV-004",
        type: "spa",
        status: "pending",
        roomNumber: "102",
        guestName: "Sophie Bernard",
        description: "Massage relaxant",
        requestedTime: "16:00",
        priority: "medium",
        aiRecommendation: "Première visite - Recommandation massage découverte"
      }
    ]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'checked-in': return 'bg-green-100 text-green-800';
      case 'checked-out': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no-show': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoomStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'occupied': return 'bg-red-100 text-red-800';
      case 'reserved': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getServiceStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'room-service': return <Utensils className="w-4 h-4" />;
      case 'housekeeping': return <Bed className="w-4 h-4" />;
      case 'concierge': return <Phone className="w-4 h-4" />;
      case 'spa': return <Star className="w-4 h-4" />;
      case 'restaurant': return <Utensils className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score < 0.2) return 'text-green-600';
    if (score < 0.4) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getLoyaltyColor = (level: string) => {
    switch (level) {
      case 'bronze': return 'bg-orange-100 text-orange-800';
      case 'silver': return 'bg-gray-100 text-gray-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'platinum': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement d'Ezee Optimus...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <EzeeOptimusNavbar />
      <IAAlertBanner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <IAInsights />
        <TapeChart rooms={rooms} reservations={reservations} />
        <VIPClients clients={clients} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <CalendarIcon className="w-5 h-5" />
                    <span>Calendrier Intelligent</span>
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant={viewMode === 'day' ? 'default' : 'outline'}
                      onClick={() => setViewMode('day')}
                    >
                      Jour
                    </Button>
                    <Button 
                      size="sm" 
                      variant={viewMode === 'week' ? 'default' : 'outline'}
                      onClick={() => setViewMode('week')}
                    >
                      Semaine
                    </Button>
                    <Button 
                      size="sm" 
                      variant={viewMode === 'month' ? 'default' : 'outline'}
                      onClick={() => setViewMode('month')}
                    >
                      Mois
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Calendar
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm text-blue-800">
                    <Brain className="w-4 h-4" />
                    <span className="font-medium">IA DAVY - Insights</span>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    Pic de réservations prévu à 19h. Recommandation: renforcer l'équipe.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-5 h-5" />
                  <span>Analyse IA - Risques</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {reservations.filter(r => r.aiRiskScore > 0.2).map((reservation) => (
                    <div key={reservation.id} className="flex items-center justify-between p-3 border rounded-lg bg-red-50">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={reservation.guestPhoto} />
                          <AvatarFallback>{reservation.guestName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-sm">{reservation.guestName}</h4>
                          <p className="text-xs text-gray-600">Chambre {reservation.roomNumber}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-bold ${getRiskScoreColor(reservation.aiRiskScore)}`}>
                          {Math.round(reservation.aiRiskScore * 100)}% risque
                        </div>
                        <Badge className="bg-red-100 text-red-800 text-xs">
                          No-show possible
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Réservations Récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reservations.slice(0, 3).map((reservation) => (
                    <div key={reservation.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={reservation.guestPhoto} />
                          <AvatarFallback>{reservation.guestName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-sm">{reservation.guestName}</h4>
                          <p className="text-xs text-gray-600">
                            Chambre {reservation.roomNumber} • {reservation.guests} personne(s)
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(reservation.status)}>
                          {reservation.status === 'confirmed' ? 'Confirmée' :
                           reservation.status === 'checked-in' ? 'En séjour' :
                           reservation.status === 'checked-out' ? 'Départ' : 'Annulée'}
                        </Badge>
                        <p className="text-xs text-gray-600 mt-1">{reservation.totalAmount} €</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bed className="w-5 h-5" />
                  <span>État des Chambres</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {rooms.map((room) => (
                    <div
                      key={room.id}
                      className={`p-4 rounded-lg border-2 text-center cursor-pointer transition-all ${
                        room.status === "available" ? "bg-green-50 border-green-200" :
                        room.status === "occupied" ? "bg-red-50 border-red-200" :
                        room.status === "reserved" ? "bg-yellow-50 border-yellow-200" :
                        "bg-orange-50 border-orange-200"
                      }`}
                    >
                      <div className="font-bold text-lg">{room.number}</div>
                      <div className="text-sm text-gray-600 capitalize">{room.type}</div>
                      <Badge className={getRoomStatusColor(room.status)}>
                        {room.status === "available" ? "Libre" :
                         room.status === "occupied" ? "Occupée" :
                         room.status === "reserved" ? "Réservée" : "Maintenance"}
                      </Badge>
                      {room.currentGuest && (
                        <div className="mt-2">
                          <Avatar className="w-8 h-8 mx-auto">
                            <AvatarImage src={room.currentGuestPhoto} />
                            <AvatarFallback>{room.currentGuest.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <p className="text-xs text-gray-500 mt-1">{room.currentGuest}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Services en Cours - IA</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={service.guestPhoto} />
                          <AvatarFallback>{service.guestName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-full">
                            {getServiceIcon(service.type)}
                          </div>
                          <div>
                            <h4 className="font-medium">{service.description}</h4>
                            <p className="text-sm text-gray-600">
                              Chambre {service.roomNumber} • {service.guestName}
                            </p>
                            {service.aiRecommendation && (
                              <p className="text-xs text-blue-600 mt-1">
                                🤖 {service.aiRecommendation}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getServiceStatusColor(service.status)}>
                          {service.status === "pending" ? "En attente" :
                           service.status === "in-progress" ? "En cours" :
                           service.status === "completed" ? "Terminé" : "Annulé"}
                        </Badge>
                        <p className="text-xs text-gray-600 mt-1">{service.requestedTime}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Profils Clients - IA</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {clients.map((client) => (
                    <div key={client.id} className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={client.photo} />
                          <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{client.name}</h4>
                          <Badge className={getLoyaltyColor(client.loyaltyLevel)}>
                            {client.loyaltyLevel}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Visites:</span>
                          <span>{client.totalVisits}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Note moyenne:</span>
                          <span className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-500 mr-1" />
                            {client.averageRating}/5
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Risque IA:</span>
                          <span className={getRiskScoreColor(client.aiProfile.riskScore)}>
                            {Math.round(client.aiProfile.riskScore * 100)}%
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-xs text-gray-600 font-medium">Recommandations IA:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {client.aiProfile.recommendations.slice(0, 2).map((rec, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {rec}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-20 flex flex-col items-center justify-center">
                <CalendarIcon className="h-6 w-6 mb-2" />
                <span>Nouvelle Réservation</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Bed className="h-6 w-6 mb-2" />
                <span>Gérer Chambres</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Utensils className="h-6 w-6 mb-2" />
                <span>Services</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Brain className="h-6 w-6 mb-2" />
                <span>IA DAVY</span>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => window.location.href = '/demo/ezee-optimus/calendar'}
              >
                <CalendarIcon className="h-6 w-6 mb-2" />
                <span>Calendrier IA</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => window.location.href = '/demo/ezee-optimus/governance'}
              >
                <Shield className="h-6 w-6 mb-2" />
                <span>Gouvernance</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => window.location.href = '/demo/ezee-optimus/photo-verification'}
              >
                <Camera className="h-6 w-6 mb-2" />
                <span>Vérification Photo</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => window.location.href = '/demo/ezee-optimus/advanced-crm'}
              >
                <Users className="h-6 w-6 mb-2" />
                <span>CRM Avancé</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <EzeeOptimusFooter />
    </div>
  );
}