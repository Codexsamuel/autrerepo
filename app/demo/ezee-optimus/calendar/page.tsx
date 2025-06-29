'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar as CalendarIcon,
  Clock,
  User,
  MapPin,
  Phone,
  Mail,
  Camera,
  Brain,
  Eye,
  Bell,
  Plus,
  Search,
  Filter,
  Settings,
  Star,
  AlertTriangle,
  CheckCircle,
  X,
  Edit,
  Trash2,
  Download,
  Upload,
  QrCode,
  Shield,
  FileText,
  Users,
  Bed,
  Utensils,
  Star as StarIcon,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  Zap,
  Target,
  Award,
  Heart,
  Smile,
  Frown,
  Meh
} from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  clientName: string;
  clientPhoto?: string;
  clientId: string;
  type: 'reservation' | 'spa' | 'restaurant' | 'concierge' | 'maintenance';
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'no-show';
  assignedStaff: string;
  roomNumber?: string;
  serviceType?: string;
  notes: string;
  aiRiskScore: number;
  aiRecommendations: string[];
  documents: string[];
  signature?: string;
  location: string;
  priority: 'low' | 'medium' | 'high';
  guests: number;
  totalAmount: number;
  specialRequests: string[];
  reminders: {
    sms: boolean;
    email: boolean;
    whatsapp: boolean;
  };
  surveillance?: {
    cameraId: string;
    qrCode: string;
    facialRecognition: boolean;
  };
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
    behaviorPattern: string;
    satisfactionTrend: 'increasing' | 'decreasing' | 'stable';
  };
  lastVisit: string;
  nextVisit?: string;
  specialNotes: string[];
}

interface Staff {
  id: string;
  name: string;
  photo?: string;
  role: 'reception' | 'housekeeping' | 'concierge' | 'spa' | 'restaurant' | 'manager';
  availability: {
    [key: string]: {
      start: string;
      end: string;
      available: boolean;
    };
  };
  skills: string[];
  rating: number;
  currentLoad: number;
  maxLoad: number;
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
  nextGuest?: string;
  nextGuestPhoto?: string;
  checkInTime?: string;
  checkOutTime?: string;
}

export default function IntelligentCalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month' | 'agenda'>('week');
  const [filterType, setFilterType] = useState<'all' | 'reservation' | 'spa' | 'restaurant' | 'concierge'>('all');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [surveillanceActive, setSurveillanceActive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    generateAIInsights();
  }, []);

  const loadData = () => {
    // Clients avec IA
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
        preferences: ["Vue mer", "Lit king-size", "Service conciergerie", "Spa"],
        documents: ["CNI", "Carte de crédit", "Passeport"],
        aiProfile: {
          riskScore: 0.15,
          preferences: ["Massage relaxant", "Restaurant gastronomique", "Champagne"],
          recommendations: ["Massage couple", "Dîner romantique", "Champagne de bienvenue"],
          behaviorPattern: "Client fidèle, préfère les soirs de week-end",
          satisfactionTrend: "increasing"
        },
        lastVisit: "2024-01-15",
        nextVisit: "2024-02-14",
        specialNotes: ["VIP", "Anniversaire le 20 février", "Allergie aux fruits de mer"]
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
        preferences: ["Chambre non-fumeur", "WiFi rapide", "Yoga"],
        documents: ["Passeport", "Carte de crédit"],
        aiProfile: {
          riskScore: 0.25,
          preferences: ["Yoga matinal", "Cuisine végétarienne", "Thé bio"],
          recommendations: ["Séance yoga privée", "Menu détox", "Thé de bienvenue"],
          behaviorPattern: "Client sensible, préfère les matins",
          satisfactionTrend: "stable"
        },
        lastVisit: "2024-01-20",
        nextVisit: "2024-02-14",
        specialNotes: ["Sensible aux parfums", "Préfère les produits bio"]
      },
      {
        id: "3",
        name: "Pierre Durand",
        email: "pierre.durand@email.com",
        phone: "+33 6 45 67 89 01",
        loyaltyLevel: "platinum",
        totalVisits: 25,
        averageRating: 4.9,
        preferences: ["Suite", "Service de conciergerie", "Chauffeur privé"],
        documents: ["CNI", "Carte de crédit", "Passeport", "Carte VIP"],
        aiProfile: {
          riskScore: 0.08,
          preferences: ["Champagne premium", "Restaurant étoilé", "Spa luxe"],
          recommendations: ["Champagne Dom Pérignon", "Dîner chef", "Massage royal"],
          behaviorPattern: "Client VIP, exigeant, généreux en pourboires",
          satisfactionTrend: "increasing"
        },
        lastVisit: "2024-01-10",
        nextVisit: "2024-02-13",
        specialNotes: ["VIP Platinum", "Anniversaire le 15 février", "Préfère les vins français"]
      }
    ]);

    // Staff avec disponibilités
    setStaff([
      {
        id: "1",
        name: "Sarah Johnson",
        photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        role: "reception",
        availability: {
          "monday": { start: "08:00", end: "16:00", available: true },
          "tuesday": { start: "08:00", end: "16:00", available: true },
          "wednesday": { start: "08:00", end: "16:00", available: true },
          "thursday": { start: "08:00", end: "16:00", available: true },
          "friday": { start: "08:00", end: "16:00", available: true }
        },
        skills: ["Réception", "Réservations", "Service client"],
        rating: 4.8,
        currentLoad: 3,
        maxLoad: 5
      },
      {
        id: "2",
        name: "Michael Chen",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        role: "spa",
        availability: {
          "monday": { start: "09:00", end: "17:00", available: true },
          "tuesday": { start: "09:00", end: "17:00", available: true },
          "wednesday": { start: "09:00", end: "17:00", available: true },
          "thursday": { start: "09:00", end: "17:00", available: true },
          "friday": { start: "09:00", end: "17:00", available: true }
        },
        skills: ["Massage", "Soins spa", "Thérapie"],
        rating: 4.9,
        currentLoad: 2,
        maxLoad: 4
      }
    ]);

    // Chambres avec surveillance
    setRooms([
      {
        id: "1",
        number: "201",
        type: "deluxe",
        status: "occupied",
        floor: 2,
        price: 180,
        amenities: ["WiFi", "TV", "Mini-bar", "Vue mer"],
        currentGuest: "Jean Dupont",
        currentGuestPhoto: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
        checkInTime: "2024-02-14 15:30",
        checkOutTime: "2024-02-16 11:00"
      },
      {
        id: "2",
        number: "305",
        type: "standard",
        status: "reserved",
        floor: 3,
        price: 120,
        amenities: ["WiFi", "TV", "Salle de bain"],
        nextGuest: "Marie Martin",
        nextGuestPhoto: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407312/Lucie_u6swnq.jpg",
        checkInTime: "2024-02-14 14:00",
        checkOutTime: "2024-02-15 11:00"
      }
    ]);

    // Événements calendrier avec IA
    setEvents([
      {
        id: "EVT-001",
        title: "Réservation - Jean Dupont",
        clientName: "Jean Dupont",
        clientPhoto: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
        clientId: "1",
        type: "reservation",
        startTime: "2024-02-14 15:00",
        endTime: "2024-02-16 11:00",
        status: "confirmed",
        assignedStaff: "Sarah Johnson",
        roomNumber: "201",
        notes: "Client fidèle, préfère vue mer. Anniversaire le 20 février.",
        aiRiskScore: 0.15,
        aiRecommendations: [
          "Préparer champagne de bienvenue",
          "Suggérer massage couple",
          "Réservation restaurant romantique"
        ],
        documents: ["CNI", "Carte de crédit"],
        location: "Réception",
        priority: "high",
        guests: 2,
        totalAmount: 320.00,
        specialRequests: ["Lit king-size", "Vue mer", "Service conciergerie"],
        reminders: { sms: true, email: true, whatsapp: true },
        surveillance: {
          cameraId: "CAM-001",
          qrCode: "QR-JEAN-DUPONT-001",
          facialRecognition: true
        }
      },
      {
        id: "EVT-002",
        title: "Spa - Marie Martin",
        clientName: "Marie Martin",
        clientPhoto: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407312/Lucie_u6swnq.jpg",
        clientId: "2",
        type: "spa",
        startTime: "2024-02-14 16:00",
        endTime: "2024-02-14 17:00",
        status: "confirmed",
        assignedStaff: "Michael Chen",
        serviceType: "Massage relaxant",
        notes: "Client sensible, éviter produits parfumés. Première visite spa.",
        aiRiskScore: 0.25,
        aiRecommendations: [
          "Utiliser produits bio sans parfum",
          "Suggérer séance yoga matinale",
          "Préparer thé bio de bienvenue"
        ],
        documents: ["Passeport"],
        location: "Spa - Cabine 2",
        priority: "medium",
        guests: 1,
        totalAmount: 80.00,
        specialRequests: ["Produits bio", "Ambiance calme"],
        reminders: { sms: true, email: false, whatsapp: true }
      },
      {
        id: "EVT-003",
        title: "Restaurant - Pierre Durand",
        clientName: "Pierre Durand",
        clientId: "3",
        type: "restaurant",
        startTime: "2024-02-13 19:00",
        endTime: "2024-02-13 22:00",
        status: "confirmed",
        assignedStaff: "Emma Davis",
        serviceType: "Dîner gastronomique",
        notes: "Client VIP Platinum. Préfère vins français. Anniversaire le 15 février.",
        aiRiskScore: 0.08,
        aiRecommendations: [
          "Préparer champagne Dom Pérignon",
          "Menu dégustation chef",
          "Service premium prioritaire"
        ],
        documents: ["CNI", "Carte VIP"],
        location: "Restaurant - Table VIP",
        priority: "high",
        guests: 2,
        totalAmount: 280.00,
        specialRequests: ["Table vue mer", "Champagne premium", "Service discret"],
        reminders: { sms: true, email: true, whatsapp: true }
      }
    ]);

    setLoading(false);
  };

  const generateAIInsights = () => {
    setAiInsights({
      occupancyRate: 87.3,
      predictedRevenue: 15420,
      riskAlerts: [
        { client: "Marie Martin", risk: 0.25, reason: "Première visite spa" },
        { client: "Sophie Bernard", risk: 0.35, reason: "Historique d'annulations" }
      ],
      recommendations: [
        "Renforcer l'équipe spa pour le weekend",
        "Préparer champagne pour anniversaire Jean Dupont",
        "Suggérer upgrade suite pour Pierre Durand"
      ],
      trends: {
        reservations: "+12%",
        satisfaction: "+5%",
        revenue: "+8%"
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'no-show': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reservation': return <Bed className="w-4 h-4" />;
      case 'spa': return <Star className="w-4 h-4" />;
      case 'restaurant': return <Utensils className="w-4 h-4" />;
      case 'concierge': return <Phone className="w-4 h-4" />;
      case 'maintenance': return <Settings className="w-4 h-4" />;
      default: return <CalendarIcon className="w-4 h-4" />;
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

  const getSatisfactionIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'decreasing': return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'stable': return <Activity className="w-4 h-4 text-blue-600" />;
      default: return <Meh className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredEvents = events.filter(event => {
    if (filterType !== 'all' && event.type !== filterType) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du Calendrier Intelligent...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <CalendarIcon className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">Calendrier Intelligent</span>
                <span className="text-sm text-gray-500">IA DAVY • Surveillance • Photos Clients</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Brain className="w-3 h-3 mr-1" />
                IA Active
              </Badge>
              <Button 
                variant={surveillanceActive ? "default" : "outline"} 
                size="sm"
                onClick={() => setSurveillanceActive(!surveillanceActive)}
              >
                <Camera className="w-4 h-4 mr-2" />
                Surveillance {surveillanceActive ? "ON" : "OFF"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
          <div className="flex items-center space-x-4">
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
              <Button 
                size="sm" 
                variant={viewMode === 'agenda' ? 'default' : 'outline'}
                onClick={() => setViewMode('agenda')}
              >
                Agenda
              </Button>
            </div>
            <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filtrer par type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="reservation">Réservations</SelectItem>
                <SelectItem value="spa">Spa</SelectItem>
                <SelectItem value="restaurant">Restaurant</SelectItem>
                <SelectItem value="concierge">Conciergerie</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => setShowEventModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nouvel événement
          </Button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Calendar & AI Insights */}
          <div className="lg:col-span-1 space-y-6">
            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle>Calendrier</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5" />
                  <span>IA DAVY - Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-800">Taux d'occupation</span>
                      <span className="text-lg font-bold text-blue-900">{aiInsights?.occupancyRate}%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-800">Revenus prévus</span>
                      <span className="text-lg font-bold text-green-900">€{aiInsights?.predictedRevenue}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Recommandations IA:</h4>
                    {aiInsights?.recommendations.map((rec: string, index: number) => (
                      <div key={index} className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
                        🤖 {rec}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <span>Alertes Risques</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiInsights?.riskAlerts.map((alert: any, index: number) => (
                    <div key={index} className="p-3 border rounded-lg bg-red-50">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{alert.client}</span>
                        <span className={`text-sm font-bold ${getRiskScoreColor(alert.risk)}`}>
                          {Math.round(alert.risk * 100)}%
                        </span>
                      </div>
                      <p className="text-xs text-red-600 mt-1">{alert.reason}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Events & Details */}
          <div className="lg:col-span-3 space-y-6">
            {/* Events List */}
            <Card>
              <CardHeader>
                <CardTitle>Événements du Jour</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <div 
                      key={event.id} 
                      className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={event.clientPhoto} />
                            <AvatarFallback>{event.clientName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="p-1 bg-blue-100 rounded">
                                {getTypeIcon(event.type)}
                              </div>
                              <h3 className="font-medium">{event.title}</h3>
                              <Badge className={getStatusColor(event.status)}>
                                {event.status === 'confirmed' ? 'Confirmé' :
                                 event.status === 'pending' ? 'En attente' :
                                 event.status === 'cancelled' ? 'Annulé' :
                                 event.status === 'completed' ? 'Terminé' : 'No-show'}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Client:</span>
                                <p className="font-medium">{event.clientName}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Heure:</span>
                                <p className="font-medium">{event.startTime.split(' ')[1]} - {event.endTime.split(' ')[1]}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Staff:</span>
                                <p className="font-medium">{event.assignedStaff}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Montant:</span>
                                <p className="font-medium">€{event.totalAmount}</p>
                              </div>
                            </div>
                            {event.aiRecommendations.length > 0 && (
                              <div className="mt-3 p-2 bg-blue-50 rounded">
                                <p className="text-xs text-blue-600 font-medium mb-1">Recommandations IA:</p>
                                <div className="flex flex-wrap gap-1">
                                  {event.aiRecommendations.slice(0, 2).map((rec, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {rec}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-bold ${getRiskScoreColor(event.aiRiskScore)}`}>
                            {Math.round(event.aiRiskScore * 100)}% risque
                          </div>
                          {event.surveillance && (
                            <Badge className="bg-purple-100 text-purple-800 text-xs mt-1">
                              <Camera className="w-3 h-3 mr-1" />
                              Surveillance
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Client Profiles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Profils Clients - IA</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {clients.map((client) => (
                    <div key={client.id} className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={client.photo} />
                          <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{client.name}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge className={getLoyaltyColor(client.loyaltyLevel)}>
                              {client.loyaltyLevel}
                            </Badge>
                            {getSatisfactionIcon(client.aiProfile.satisfactionTrend)}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Visites:</span>
                          <span>{client.totalVisits}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Note:</span>
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
                        <p className="text-xs text-gray-600 font-medium mb-2">Préférences IA:</p>
                        <div className="flex flex-wrap gap-1">
                          {client.aiProfile.preferences.slice(0, 2).map((pref, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {pref}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {client.specialNotes.length > 0 && (
                        <div className="mt-2 pt-2 border-t">
                          <p className="text-xs text-gray-600 font-medium mb-1">Notes spéciales:</p>
                          <div className="space-y-1">
                            {client.specialNotes.slice(0, 2).map((note, index) => (
                              <p key={index} className="text-xs text-gray-500">• {note}</p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Bell className="h-6 w-6 mb-2" />
                <span>Rappels</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <QrCode className="h-6 w-6 mb-2" />
                <span>QR Codes</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <FileText className="h-6 w-6 mb-2" />
                <span>Documents</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <BarChart3 className="h-6 w-6 mb-2" />
                <span>Analytics</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Détails de l'événement</h2>
              <Button variant="ghost" size="sm" onClick={() => setSelectedEvent(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedEvent.clientPhoto} />
                  <AvatarFallback>{selectedEvent.clientName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">{selectedEvent.title}</h3>
                  <p className="text-gray-600">{selectedEvent.clientName}</p>
                  <Badge className={getStatusColor(selectedEvent.status)}>
                    {selectedEvent.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date et heure</Label>
                  <p className="text-sm">{selectedEvent.startTime} - {selectedEvent.endTime}</p>
                </div>
                <div>
                  <Label>Type</Label>
                  <p className="text-sm capitalize">{selectedEvent.type}</p>
                </div>
                <div>
                  <Label>Staff assigné</Label>
                  <p className="text-sm">{selectedEvent.assignedStaff}</p>
                </div>
                <div>
                  <Label>Montant</Label>
                  <p className="text-sm">€{selectedEvent.totalAmount}</p>
                </div>
              </div>

              {selectedEvent.specialRequests.length > 0 && (
                <div>
                  <Label>Demandes spéciales</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedEvent.specialRequests.map((request, index) => (
                      <Badge key={index} variant="outline">{request}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedEvent.aiRecommendations.length > 0 && (
                <div>
                  <Label>Recommandations IA</Label>
                  <div className="space-y-2 mt-1">
                    {selectedEvent.aiRecommendations.map((rec, index) => (
                      <div key={index} className="p-2 bg-blue-50 rounded text-sm">
                        🤖 {rec}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline">Modifier</Button>
                <Button>Confirmer</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 