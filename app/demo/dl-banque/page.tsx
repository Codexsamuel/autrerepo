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
  CreditCard,
  PiggyBank,
  Calculator,
  TrendingUp as TrendingUpIcon
} from 'lucide-react';

interface BankingEvent {
  id: string;
  title: string;
  clientName: string;
  clientPhoto?: string;
  clientId: string;
  type: 'credit' | 'appointment' | 'investment' | 'insurance' | 'payment' | 'meeting';
  startTime: string;
  endTime: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'urgent';
  assignedAdvisor: string;
  creditAmount?: number;
  creditType?: 'mortgage' | 'personal' | 'business' | 'car';
  documents: string[];
  aiRiskScore: number;
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
    incomeVerified: boolean;
  };
}

interface Client {
  id: string;
  name: string;
  photo?: string;
  email: string;
  phone: string;
  clientType: 'individual' | 'business' | 'premium' | 'vip';
  income: number;
  creditScore: number;
  accounts: string[];
  documents: string[];
  aiProfile: {
    riskScore: number;
    creditworthiness: number;
    recommendations: string[];
    behaviorPattern: string;
    fraudRisk: 'low' | 'medium' | 'high';
  };
  lastInteraction: string;
  specialNotes: string[];
}

interface Advisor {
  id: string;
  name: string;
  photo?: string;
  role: 'advisor' | 'manager' | 'specialist' | 'director';
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
  specializations: string[];
}

export default function DLBanquePage() {
  const [events, setEvents] = useState<BankingEvent[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month' | 'agenda'>('week');
  const [filterType, setFilterType] = useState<'all' | 'credit' | 'appointment' | 'investment' | 'insurance'>('all');
  const [selectedEvent, setSelectedEvent] = useState<BankingEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    generateAIInsights();
  }, []);

  const loadData = () => {
    // Clients
    setClients([
      {
        id: "1",
        name: "Laurent Dubois",
        photo: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
        email: "laurent.dubois@email.com",
        phone: "+33 6 12 34 56 78",
        clientType: "premium",
        income: 85000,
        creditScore: 780,
        accounts: ["Compte Courant", "Épargne", "PEL"],
        documents: ["CNI", "Bulletins de salaire", "Avis d'imposition"],
        aiProfile: {
          riskScore: 0.15,
          creditworthiness: 0.85,
          recommendations: ["Crédit immobilier recommandé", "Épargne optimisée"],
          behaviorPattern: "Client stable, paiements réguliers",
          fraudRisk: "low"
        },
        lastInteraction: "2024-02-10",
        specialNotes: ["VIP", "Intérêt pour l'investissement"]
      },
      {
        id: "2",
        name: "Sophie Martin",
        photo: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407312/Lucie_u6swnq.jpg",
        email: "sophie.martin@email.com",
        phone: "+33 6 98 76 54 32",
        clientType: "individual",
        income: 45000,
        creditScore: 650,
        accounts: ["Compte Courant", "Livret A"],
        documents: ["CNI", "Bulletins de salaire"],
        aiProfile: {
          riskScore: 0.35,
          creditworthiness: 0.65,
          recommendations: ["Améliorer score crédit", "Épargne régulière"],
          behaviorPattern: "Client jeune, potentiel de croissance",
          fraudRisk: "medium"
        },
        lastInteraction: "2024-02-12",
        specialNotes: ["Premier crédit", "Accompagnement nécessaire"]
      }
    ]);

    // Conseillers
    setAdvisors([
      {
        id: "1",
        name: "Marc Bernard",
        photo: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
        role: "advisor",
        availability: {
          "monday": { start: "09:00", end: "17:00", available: true },
          "tuesday": { start: "09:00", end: "17:00", available: true },
          "wednesday": { start: "09:00", end: "17:00", available: true },
          "thursday": { start: "09:00", end: "17:00", available: true },
          "friday": { start: "09:00", end: "17:00", available: true }
        },
        skills: ["Crédit immobilier", "Épargne", "Investissement"],
        rating: 4.8,
        currentLoad: 45,
        maxLoad: 60,
        specializations: ["Crédit immobilier", "Gestion de patrimoine"]
      },
      {
        id: "2",
        name: "Julie Moreau",
        photo: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407312/Lucie_u6swnq.jpg",
        role: "specialist",
        availability: {
          "monday": { start: "08:00", end: "18:00", available: true },
          "tuesday": { start: "08:00", end: "18:00", available: true },
          "wednesday": { start: "08:00", end: "18:00", available: true },
          "thursday": { start: "08:00", end: "18:00", available: true },
          "friday": { start: "08:00", end: "18:00", available: true }
        },
        skills: ["Crédit personnel", "Assurance", "Épargne"],
        rating: 4.9,
        currentLoad: 30,
        maxLoad: 40,
        specializations: ["Crédit personnel", "Assurance emprunteur"]
      }
    ]);

    // Événements
    setEvents([
      {
        id: "1",
        title: "Demande Crédit Immobilier - Laurent Dubois",
        clientName: "Laurent Dubois",
        clientPhoto: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
        clientId: "1",
        type: "credit",
        startTime: "2024-02-15T10:00:00",
        endTime: "2024-02-15T11:00:00",
        status: "pending",
        assignedAdvisor: "Marc Bernard",
        creditAmount: 350000,
        creditType: "mortgage",
        documents: ["Bulletins de salaire", "Avis d'imposition", "Offre d'achat"],
        aiRiskScore: 0.15,
        aiRecommendations: ["Approbation recommandée", "Taux préférentiel possible"],
        location: "Bureau principal",
        priority: "high",
        description: "Demande de crédit immobilier pour achat appartement",
        specialNotes: ["Client VIP", "Dossier complet"],
        reminders: {
          sms: true,
          email: true,
          whatsapp: false
        },
        verification: {
          identityVerified: true,
          documentsVerified: true,
          signatureVerified: false,
          incomeVerified: true
        }
      },
      {
        id: "2",
        title: "RDV Épargne - Sophie Martin",
        clientName: "Sophie Martin",
        clientPhoto: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407312/Lucie_u6swnq.jpg",
        clientId: "2",
        type: "appointment",
        startTime: "2024-02-16T14:00:00",
        endTime: "2024-02-16T15:00:00",
        status: "confirmed",
        assignedAdvisor: "Julie Moreau",
        documents: ["Relevés bancaires", "Objectifs épargne"],
        aiRiskScore: 0.35,
        aiRecommendations: ["Livret A recommandé", "PEL pour projet immobilier"],
        location: "Agence centre-ville",
        priority: "medium",
        description: "Conseil en épargne et investissement",
        specialNotes: ["Client jeune", "Premier RDV"],
        reminders: {
          sms: true,
          email: true,
          whatsapp: true
        },
        verification: {
          identityVerified: true,
          documentsVerified: true,
          signatureVerified: false,
          incomeVerified: false
        }
      }
    ]);

    setLoading(false);
  };

  const generateAIInsights = () => {
    setAiInsights({
      totalClients: 1250,
      activeCredits: 89,
      approvalRate: 0.78,
      averageCreditAmount: 185000,
      riskAlerts: 5,
      recommendations: [
        "12 demandes de crédit en attente",
        "3 dossiers nécessitent une attention urgente",
        "Taux d'approbation en hausse de 5%"
      ]
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'credit': return <CreditCard className="w-4 h-4" />;
      case 'appointment': return <Users className="w-4 h-4" />;
      case 'investment': return <TrendingUpIcon className="w-4 h-4" />;
      case 'insurance': return <Shield className="w-4 h-4" />;
      case 'payment': return <DollarSign className="w-4 h-4" />;
      case 'meeting': return <CalendarIcon className="w-4 h-4" />;
      default: return <CalendarIcon className="w-4 h-4" />;
    }
  };

  const getCreditTypeIcon = (type: string) => {
    switch (type) {
      case 'mortgage': return <Building className="w-4 h-4" />;
      case 'personal': return <User className="w-4 h-4" />;
      case 'business': return <Briefcase className="w-4 h-4" />;
      case 'car': return <CarIcon className="w-4 h-4" />;
      default: return <CreditCard className="w-4 h-4" />;
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score < 0.2) return 'text-green-600';
    if (score < 0.4) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Building className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">DL Banque</h1>
                <p className="text-sm text-gray-600">Gestion intelligente des crédits et investissements</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau dossier
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Insights Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Clients Actifs</p>
                  <p className="text-3xl font-bold">{aiInsights?.totalClients}</p>
                </div>
                <Users className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Crédits Actifs</p>
                  <p className="text-3xl font-bold">{aiInsights?.activeCredits}</p>
                </div>
                <CreditCard className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Taux d'Approbation</p>
                  <p className="text-3xl font-bold">{(aiInsights?.approvalRate * 100).toFixed(0)}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Montant Moyen</p>
                  <p className="text-3xl font-bold">{aiInsights?.averageCreditAmount.toLocaleString()}€</p>
                </div>
                <DollarSign className="h-8 w-8 text-orange-200" />
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
                    Nouveau RDV
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Demande crédit
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    <PiggyBank className="w-4 h-4 mr-2" />
                    Conseil épargne
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
                      <div key={index} className="text-xs bg-blue-50 p-2 rounded border-l-2 border-blue-500">
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
                        <SelectItem value="credit">Crédits</SelectItem>
                        <SelectItem value="appointment">RDV</SelectItem>
                        <SelectItem value="investment">Investissements</SelectItem>
                        <SelectItem value="insurance">Assurances</SelectItem>
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
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(event.status)}>
                              {event.status}
                            </Badge>
                            {event.creditType && (
                              <Badge variant="outline">
                                {getCreditTypeIcon(event.creditType)}
                                {event.creditType}
                              </Badge>
                            )}
                            {event.aiRiskScore > 0.3 && (
                              <AlertTriangle className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                        </div>
                        
                        {event.creditAmount && (
                          <div className="mt-2 flex items-center space-x-4 text-sm">
                            <span className="font-medium">Montant: {event.creditAmount.toLocaleString()}€</span>
                            <span className={`font-medium ${getRiskScoreColor(event.aiRiskScore)}`}>
                              Risque IA: {(event.aiRiskScore * 100).toFixed(0)}%
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
                    <p><strong>Conseiller assigné:</strong> {selectedEvent.assignedAdvisor}</p>
                    <p><strong>Lieu:</strong> {selectedEvent.location}</p>
                    <p><strong>Description:</strong> {selectedEvent.description}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Analyse IA</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Score de risque:</strong> 
                      <span className={`ml-1 ${getRiskScoreColor(selectedEvent.aiRiskScore)}`}>
                        {(selectedEvent.aiRiskScore * 100).toFixed(0)}%
                      </span>
                    </p>
                    <div>
                      <strong>Recommandations:</strong>
                      <ul className="mt-1 space-y-1">
                        {selectedEvent.aiRecommendations.map((rec, index) => (
                          <li key={index} className="text-xs bg-blue-50 p-1 rounded">
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