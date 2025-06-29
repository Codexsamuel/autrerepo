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
  Home,
  Building,
  Heart,
  Star as StarIcon,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  Zap,
  Target,
  Award,
  Smile,
  Frown,
  Meh,
  FileCheck,
  AlertCircle,
  CheckSquare,
  Clock4,
  DollarSign,
  Receipt,
  Car as CarIcon,
  Heart as HeartIcon,
  Shield as ShieldIcon,
  RefreshCw,
  Key,
  MapPin as MapPinIcon,
  Bed,
  Bath,
  Square,
  Euro
} from 'lucide-react';

interface RealEstateEvent {
  id: string;
  title: string;
  clientName: string;
  clientPhoto?: string;
  clientId: string;
  type: 'visit' | 'contract' | 'maintenance' | 'inspection' | 'payment' | 'meeting';
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'urgent';
  assignedAgent: string;
  propertyId: string;
  propertyAddress: string;
  propertyType: 'apartment' | 'house' | 'commercial' | 'land';
  transactionType: 'sale' | 'rent' | 'management';
  price?: number;
  documents: string[];
  aiCompatibilityScore: number;
  aiRecommendations: string[];
  location: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  specialNotes: string[];
  reminders: {
    sms: boolean;
    email: boolean;
    whatsapp: boolean;
  };
  verification?: {
    identityVerified: boolean;
    documentsVerified: boolean;
    signatureVerified: boolean;
    qrCheckIn: string;
  };
}

interface Property {
  id: string;
  address: string;
  type: 'apartment' | 'house' | 'commercial' | 'land';
  status: 'available' | 'sold' | 'rented' | 'under_contract' | 'maintenance';
  price: number;
  rentPrice?: number;
  surface: number;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  features: string[];
  photos: string[];
  documents: string[];
  aiMarketValue: number;
  aiRentEstimate?: number;
  lastInspection: string;
  nextInspection?: string;
  ownerId: string;
}

interface Client {
  id: string;
  name: string;
  photo?: string;
  email: string;
  phone: string;
  type: 'buyer' | 'seller' | 'tenant' | 'landlord';
  budget: number;
  preferences: string[];
  documents: string[];
  aiProfile: {
    compatibilityScore: number;
    preferences: string[];
    recommendations: string[];
    behaviorPattern: string;
    reliabilityScore: number;
  };
  lastInteraction: string;
  specialNotes: string[];
}

export default function DLImmobilierPage() {
  const [events, setEvents] = useState<RealEstateEvent[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month' | 'agenda'>('week');
  const [filterType, setFilterType] = useState<'all' | 'visit' | 'contract' | 'maintenance' | 'inspection'>('all');
  const [selectedEvent, setSelectedEvent] = useState<RealEstateEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    generateAIInsights();
  }, []);

  const loadData = () => {
    // Propriétés
    setProperties([
      {
        id: "1",
        address: "123 Rue de la Paix, Paris 8ème",
        type: "apartment",
        status: "available",
        price: 850000,
        rentPrice: 3500,
        surface: 85,
        rooms: 4,
        bedrooms: 3,
        bathrooms: 2,
        features: ["Balcon", "Ascenseur", "Cave", "Parking"],
        photos: ["https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg"],
        documents: ["Diagnostic", "État des lieux", "Bail"],
        aiMarketValue: 860000,
        aiRentEstimate: 3600,
        lastInspection: "2024-01-15",
        nextInspection: "2024-04-15",
        ownerId: "1"
      },
      {
        id: "2",
        address: "456 Avenue des Champs, Lyon 6ème",
        type: "house",
        status: "under_contract",
        price: 1200000,
        surface: 180,
        rooms: 6,
        bedrooms: 4,
        bathrooms: 3,
        features: ["Jardin", "Terrasse", "Garage", "Cave"],
        photos: ["https://res.cloudinary.com/dko5sommz/image/upload/v1748407312/Lucie_u6swnq.jpg"],
        documents: ["Diagnostic", "État des lieux", "Compromis"],
        aiMarketValue: 1180000,
        lastInspection: "2024-01-20",
        nextInspection: "2024-04-20",
        ownerId: "2"
      }
    ]);

    // Clients
    setClients([
      {
        id: "1",
        name: "Thomas Martin",
        photo: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
        email: "thomas.martin@email.com",
        phone: "+33 6 12 34 56 78",
        type: "buyer",
        budget: 900000,
        preferences: ["Centre-ville", "Balcon", "3 chambres", "Parking"],
        documents: ["CNI", "Justificatif de revenus", "Attestation bancaire"],
        aiProfile: {
          compatibilityScore: 0.85,
          preferences: ["Appartement moderne", "Quartier calme", "Proximité transports"],
          recommendations: ["Visite urgente", "Négociation possible"],
          behaviorPattern: "Acheteur sérieux, décision rapide",
          reliabilityScore: 0.92
        },
        lastInteraction: "2024-02-10",
        specialNotes: ["Prêt approuvé", "Délai de 3 mois"]
      },
      {
        id: "2",
        name: "Emma Dubois",
        photo: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407312/Lucie_u6swnq.jpg",
        email: "emma.dubois@email.com",
        phone: "+33 6 98 76 54 32",
        type: "tenant",
        budget: 4000,
        preferences: ["2 chambres", "Balcon", "Quartier étudiant"],
        documents: ["CNI", "Bulletins de salaire", "Garant"],
        aiProfile: {
          compatibilityScore: 0.78,
          preferences: ["Proximité université", "Logement meublé"],
          recommendations: ["Vérifier garant", "Contrat 1 an"],
          behaviorPattern: "Étudiante, budget limité",
          reliabilityScore: 0.75
        },
        lastInteraction: "2024-02-12",
        specialNotes: ["Étudiante", "Garant parent"]
      }
    ]);

    // Événements
    setEvents([
      {
        id: "1",
        title: "Visite Appartement - Thomas Martin",
        clientName: "Thomas Martin",
        clientPhoto: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
        clientId: "1",
        type: "visit",
        startTime: "2024-02-15T14:00:00",
        endTime: "2024-02-15T15:00:00",
        status: "confirmed",
        assignedAgent: "Marie Dubois",
        propertyId: "1",
        propertyAddress: "123 Rue de la Paix, Paris 8ème",
        propertyType: "apartment",
        transactionType: "sale",
        price: 850000,
        documents: ["Fiche technique", "Diagnostic", "Plan"],
        aiCompatibilityScore: 0.85,
        aiRecommendations: ["Présenter les avantages du quartier", "Insister sur la valeur ajoutée"],
        location: "123 Rue de la Paix, Paris 8ème",
        priority: "high",
        description: "Visite appartement 3 chambres avec balcon",
        specialNotes: ["Client très intéressé", "Budget compatible"],
        reminders: {
          sms: true,
          email: true,
          whatsapp: false
        },
        verification: {
          identityVerified: true,
          documentsVerified: true,
          signatureVerified: false,
          qrCheckIn: "QR123456"
        }
      },
      {
        id: "2",
        title: "Signature Contrat - Emma Dubois",
        clientName: "Emma Dubois",
        clientPhoto: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407312/Lucie_u6swnq.jpg",
        clientId: "2",
        type: "contract",
        startTime: "2024-02-16T10:00:00",
        endTime: "2024-02-16T11:00:00",
        status: "scheduled",
        assignedAgent: "Pierre Martin",
        propertyId: "1",
        propertyAddress: "123 Rue de la Paix, Paris 8ème",
        propertyType: "apartment",
        transactionType: "rent",
        rentPrice: 3500,
        documents: ["Bail", "État des lieux", "Quittances"],
        aiCompatibilityScore: 0.78,
        aiRecommendations: ["Vérifier garant", "Expliquer conditions"],
        location: "Bureau principal",
        priority: "medium",
        description: "Signature contrat de location",
        specialNotes: ["Étudiante", "Garant parent"],
        reminders: {
          sms: true,
          email: true,
          whatsapp: true
        },
        verification: {
          identityVerified: true,
          documentsVerified: true,
          signatureVerified: false,
          qrCheckIn: ""
        }
      }
    ]);

    setLoading(false);
  };

  const generateAIInsights = () => {
    setAiInsights({
      totalProperties: 45,
      activeVisits: 12,
      conversionRate: 0.23,
      averagePrice: 650000,
      marketTrend: "stable",
      recommendations: [
        "8 visites programmées cette semaine",
        "3 contrats à signer",
        "Prix du marché en hausse de 2%"
      ]
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'visit': return <Eye className="w-4 h-4" />;
      case 'contract': return <FileText className="w-4 h-4" />;
      case 'maintenance': return <Wrench className="w-4 h-4" />;
      case 'inspection': return <Search className="w-4 h-4" />;
      case 'payment': return <DollarSign className="w-4 h-4" />;
      case 'meeting': return <Users className="w-4 h-4" />;
      default: return <CalendarIcon className="w-4 h-4" />;
    }
  };

  const getPropertyTypeIcon = (type: string) => {
    switch (type) {
      case 'apartment': return <Building className="w-4 h-4" />;
      case 'house': return <Home className="w-4 h-4" />;
      case 'commercial': return <Store className="w-4 h-4" />;
      case 'land': return <MapPinIcon className="w-4 h-4" />;
      default: return <Home className="w-4 h-4" />;
    }
  };

  const getCompatibilityScoreColor = (score: number) => {
    if (score > 0.8) return 'text-green-600';
    if (score > 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-600 p-2 rounded-lg">
                <Home className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">DL Immobilier</h1>
                <p className="text-sm text-gray-600">Gestion intelligente des biens et transactions</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau bien
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Insights Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Biens Disponibles</p>
                  <p className="text-3xl font-bold">{aiInsights?.totalProperties}</p>
                </div>
                <Home className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Visites Programmées</p>
                  <p className="text-3xl font-bold">{aiInsights?.activeVisits}</p>
                </div>
                <Eye className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Taux de Conversion</p>
                  <p className="text-3xl font-bold">{(aiInsights?.conversionRate * 100).toFixed(0)}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Prix Moyen</p>
                  <p className="text-3xl font-bold">{aiInsights?.averagePrice.toLocaleString()}€</p>
                </div>
                <Euro className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Calendar Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  Calendrier
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
                
                {/* Quick Actions */}
                <div className="mt-6 space-y-3">
                  <Button className="w-full" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle visite
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    <FileCheck className="w-4 h-4 mr-2" />
                    Signature contrat
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    <Search className="w-4 h-4 mr-2" />
                    Inspection
                  </Button>
                </div>

                {/* AI Recommendations */}
                <div className="mt-6">
                  <h4 className="font-semibold text-sm text-gray-700 mb-3 flex items-center">
                    <Brain className="w-4 h-4 mr-2" />
                    Recommandations IA
                  </h4>
                  <div className="space-y-2">
                    {aiInsights?.recommendations.map((rec: string, index: number) => (
                      <div key={index} className="text-xs bg-green-50 p-2 rounded border-l-2 border-green-500">
                        {rec}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calendar View */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Calendrier des Événements</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Select value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">Jour</SelectItem>
                        <SelectItem value="week">Semaine</SelectItem>
                        <SelectItem value="month">Mois</SelectItem>
                        <SelectItem value="agenda">Agenda</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tous les types</SelectItem>
                        <SelectItem value="visit">Visites</SelectItem>
                        <SelectItem value="contract">Contrats</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="inspection">Inspections</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Calendar Grid */}
                <div className="space-y-4">
                  {events
                    .filter(event => filterType === 'all' || event.type === filterType)
                    .map((event) => (
                      <div
                        key={event.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                          getStatusColor(event.status)
                        }`}
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowEventModal(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {getTypeIcon(event.type)}
                            <div>
                              <h4 className="font-semibold">{event.title}</h4>
                              <p className="text-sm text-gray-600">
                                {new Date(event.startTime).toLocaleDateString()} - {new Date(event.startTime).toLocaleTimeString()}
                              </p>
                              <p className="text-xs text-gray-500">{event.propertyAddress}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(event.status)}>
                              {event.status}
                            </Badge>
                            <Badge variant="outline">
                              {getPropertyTypeIcon(event.propertyType)}
                              {event.propertyType}
                            </Badge>
                            {event.aiCompatibilityScore > 0.8 && (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                        </div>
                        
                        {event.price && (
                          <div className="mt-2 flex items-center space-x-4 text-sm">
                            <span className="font-medium">
                              {event.transactionType === 'sale' ? 'Prix:' : 'Loyer:'} {event.price.toLocaleString()}€
                            </span>
                            <span className={`font-medium ${getCompatibilityScoreColor(event.aiCompatibilityScore)}`}>
                              Compatibilité: {(event.aiCompatibilityScore * 100).toFixed(0)}%
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Event Modal */}
        {showEventModal && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">{selectedEvent.title}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowEventModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Détails de l'événement</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Type:</strong> {selectedEvent.type}</p>
                    <p><strong>Statut:</strong> {selectedEvent.status}</p>
                    <p><strong>Priorité:</strong> {selectedEvent.priority}</p>
                    <p><strong>Agent assigné:</strong> {selectedEvent.assignedAgent}</p>
                    <p><strong>Lieu:</strong> {selectedEvent.location}</p>
                    <p><strong>Description:</strong> {selectedEvent.description}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Analyse IA</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Score de compatibilité:</strong> 
                      <span className={`ml-1 ${getCompatibilityScoreColor(selectedEvent.aiCompatibilityScore)}`}>
                        {(selectedEvent.aiCompatibilityScore * 100).toFixed(0)}%
                      </span>
                    </p>
                    <div>
                      <strong>Recommandations:</strong>
                      <ul className="mt-1 space-y-1">
                        {selectedEvent.aiRecommendations.map((rec, index) => (
                          <li key={index} className="text-xs bg-green-50 p-1 rounded">
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowEventModal(false)}>
                  Fermer
                </Button>
                <Button>
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 