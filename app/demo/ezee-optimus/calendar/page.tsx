'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar,
  Clock,
  User,
  Bed,
  Heart,
  Utensils,
  Settings,
  Star,
  X,
  Plus,
  Brain,
  TrendingUp,
  BarChart3,
  Camera,
  Shield,
  Bell,
  QrCode,
  FileText,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  Edit,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  CalendarDays,
  Users as UsersIcon,
  DollarSign,
  Clock as ClockIcon
} from 'lucide-react';

interface Reservation {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientPhoto?: string;
  type: 'room' | 'spa' | 'restaurant' | 'concierge' | 'event';
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'checked-in' | 'checked-out' | 'no-show';
  roomNumber?: string;
  roomType?: string;
  guests: number;
  totalAmount: number;
  paidAmount: number;
  specialRequests: string[];
  aiRiskScore: number;
  aiRecommendations: string[];
  createdAt: string;
  updatedAt: string;
  priority: 'low' | 'medium' | 'high' | 'vip';
  source: 'direct' | 'booking.com' | 'airbnb' | 'expedia' | 'phone';
}

function ReservationManagementPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  useEffect(() => {
    loadReservations();
  }, []);

  useEffect(() => {
    filterReservations();
  }, [reservations, selectedStatus, selectedType, searchTerm]);

  const loadReservations = () => {
    const mockReservations: Reservation[] = [
      {
        id: "RES-001",
        clientName: "Jean Dupont",
        clientEmail: "jean.dupont@email.com",
        clientPhone: "+33 6 12 34 56 78",
        clientPhoto: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
        type: "room",
        checkIn: "2024-02-14 15:00",
        checkOut: "2024-02-16 11:00",
        status: "confirmed",
        roomNumber: "101",
        roomType: "Suite Deluxe",
        guests: 2,
        totalAmount: 850,
        paidAmount: 850,
        specialRequests: ["Vue mer", "Lit king-size", "Champagne de bienvenue"],
        aiRiskScore: 0.15,
        aiRecommendations: ["Préparer champagne de bienvenue", "Décorer la chambre pour l'anniversaire"],
        createdAt: "2024-02-10 10:30",
        updatedAt: "2024-02-12 14:20",
        priority: "vip",
        source: "direct"
      },
      {
        id: "RES-002",
        clientName: "Marie Martin",
        clientEmail: "marie.martin@email.com",
        clientPhone: "+33 6 98 76 54 32",
        clientPhoto: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407312/Lucie_u6swnq.jpg",
        type: "spa",
        checkIn: "2024-02-15 10:00",
        checkOut: "2024-02-15 12:00",
        status: "pending",
        guests: 1,
        totalAmount: 120,
        paidAmount: 0,
        specialRequests: ["Produits bio", "Musique zen"],
        aiRiskScore: 0.25,
        aiRecommendations: ["Préparer huiles essentielles bio", "Musique zen en arrière-plan"],
        createdAt: "2024-02-13 16:45",
        updatedAt: "2024-02-13 16:45",
        priority: "medium",
        source: "booking.com"
      },
      {
        id: "RES-003",
        clientName: "Pierre Dubois",
        clientEmail: "pierre.dubois@email.com",
        clientPhone: "+33 6 11 22 33 44",
        type: "room",
        checkIn: "2024-02-14 14:00",
        checkOut: "2024-02-15 11:00",
        status: "checked-in",
        roomNumber: "205",
        roomType: "Chambre Standard",
        guests: 1,
        totalAmount: 180,
        paidAmount: 180,
        specialRequests: ["Vue jardin"],
        aiRiskScore: 0.05,
        aiRecommendations: ["Client régulier - service premium"],
        createdAt: "2024-02-08 09:15",
        updatedAt: "2024-02-14 14:30",
        priority: "high",
        source: "expedia"
      },
      {
        id: "RES-004",
        clientName: "Sophie Laurent",
        clientEmail: "sophie.laurent@email.com",
        clientPhone: "+33 6 55 66 77 88",
        type: "restaurant",
        checkIn: "2024-02-16 19:00",
        checkOut: "2024-02-16 22:00",
        status: "confirmed",
        guests: 4,
        totalAmount: 280,
        paidAmount: 100,
        specialRequests: ["Table fenêtre", "Menu végétarien"],
        aiRiskScore: 0.35,
        aiRecommendations: ["Préparer menu végétarien", "Table avec vue"],
        createdAt: "2024-02-11 12:20",
        updatedAt: "2024-02-12 10:15",
        priority: "medium",
        source: "phone"
      },
      {
        id: "RES-005",
        clientName: "Marc Bernard",
        clientEmail: "marc.bernard@email.com",
        clientPhone: "+33 6 99 88 77 66",
        type: "room",
        checkIn: "2024-02-13 16:00",
        checkOut: "2024-02-14 10:00",
        status: "cancelled",
        roomNumber: "302",
        roomType: "Suite Junior",
        guests: 2,
        totalAmount: 320,
        paidAmount: 0,
        specialRequests: [],
        aiRiskScore: 0.75,
        aiRecommendations: ["Raison: changement de plans"],
        createdAt: "2024-02-09 15:30",
        updatedAt: "2024-02-12 18:45",
        priority: "low",
        source: "airbnb"
      }
    ];
    setReservations(mockReservations);
  };

  const filterReservations = () => {
    let filtered = reservations;

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(res => res.status === selectedStatus);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(res => res.type === selectedType);
    }

    if (searchTerm) {
      filtered = filtered.filter(res => 
        res.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredReservations(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'checked-in': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'checked-out': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'no-show': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      case 'checked-in': return <User className="w-4 h-4" />;
      case 'checked-out': return <CalendarDays className="w-4 h-4" />;
      case 'no-show': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'room': return <Bed className="w-4 h-4" />;
      case 'spa': return <Heart className="w-4 h-4" />;
      case 'restaurant': return <Utensils className="w-4 h-4" />;
      case 'concierge': return <User className="w-4 h-4" />;
      case 'event': return <Calendar className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'vip': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStats = () => {
    const total = reservations.length;
    const confirmed = reservations.filter(r => r.status === 'confirmed').length;
    const pending = reservations.filter(r => r.status === 'pending').length;
    const checkedIn = reservations.filter(r => r.status === 'checked-in').length;
    const revenue = reservations.reduce((sum, r) => sum + r.paidAmount, 0);
    
    return { total, confirmed, pending, checkedIn, revenue };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestionnaire de Réservations</h1>
            <p className="text-gray-600">EZEE Optimus - Système de gestion intelligent</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtres
              </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Réservation
              </Button>
          </div>
        </div>

        {/* AI Insights Banner */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Brain className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-blue-900">Insights IA</h3>
                  <p className="text-sm text-blue-700">
                    Taux d'occupation: 85% | Revenus prévus: €12,500 | Alertes: 2 | Clients VIP: 3
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <BarChart3 className="w-5 h-5 text-green-600" />
              </div>
            </div>
              </CardContent>
            </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card>
            <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Réservations</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                <Calendar className="w-8 h-8 text-blue-600" />
                  </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Confirmées</p>
                  <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
                    </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">En Attente</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                      </div>
                <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Check-in</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.checkedIn}</p>
                </div>
                <User className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
            <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenus</p>
                  <p className="text-2xl font-bold text-green-600">€{stats.revenue}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Rechercher par nom, email ou ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="confirmed">Confirmées</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="cancelled">Annulées</SelectItem>
                    <SelectItem value="checked-in">Check-in</SelectItem>
                    <SelectItem value="checked-out">Check-out</SelectItem>
                    <SelectItem value="no-show">No-show</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="room">Chambres</SelectItem>
                    <SelectItem value="spa">Spa</SelectItem>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="concierge">Conciergerie</SelectItem>
                    <SelectItem value="event">Événements</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  Liste
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  Grille
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reservations List */}
            <Card>
              <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Réservations ({filteredReservations.length})</span>
              <div className="text-sm text-gray-500">
                Mis à jour: {new Date().toLocaleTimeString('fr-FR')}
              </div>
            </CardTitle>
              </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dates
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Montant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priorité
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredReservations.map((reservation) => (
                    <tr key={reservation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Avatar className="w-10 h-10 mr-3">
                            <AvatarImage src={reservation.clientPhoto} />
                            <AvatarFallback>
                              {reservation.clientName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {reservation.clientName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {reservation.clientEmail}
                            </div>
                            <div className="text-xs text-gray-400">
                              ID: {reservation.id}
                              </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getTypeIcon(reservation.type)}
                          <span className="ml-2 text-sm text-gray-900 capitalize">
                            {reservation.type}
                          </span>
                          {reservation.roomNumber && (
                            <span className="ml-2 text-xs text-gray-500">
                              #{reservation.roomNumber}
                            </span>
                          )}
                        </div>
                        {reservation.roomType && (
                          <div className="text-xs text-gray-500 mt-1">
                            {reservation.roomType}
                          </div>
                        )}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(reservation.checkIn).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(reservation.checkIn).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        {reservation.checkOut && (
                          <div className="text-xs text-gray-400">
                            → {new Date(reservation.checkOut).toLocaleDateString('fr-FR')}
                        </div>
                        )}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={`${getStatusColor(reservation.status)} flex items-center w-fit`}>
                          {getStatusIcon(reservation.status)}
                          <span className="ml-1 capitalize">{reservation.status}</span>
                        </Badge>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          €{reservation.totalAmount}
                        </div>
                        <div className="text-sm text-gray-500">
                          Payé: €{reservation.paidAmount}
                        </div>
                        {reservation.totalAmount > reservation.paidAmount && (
                          <div className="text-xs text-red-500">
                            Reste: €{reservation.totalAmount - reservation.paidAmount}
                          </div>
                        )}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={`${getPriorityColor(reservation.priority)} text-xs`}>
                          {reservation.priority.toUpperCase()}
                        </Badge>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredReservations.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune réservation trouvée</h3>
                <p className="text-gray-500">Essayez de modifier vos filtres de recherche</p>
                </div>
              )}
          </CardContent>
        </Card>
        </div>
    </div>
  );
}

export default function CalendarPage() {
  return <ReservationManagementPage />;
} 