'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    AlertCircle,
    AlertTriangle,
    Bell,
    Brain,
    Building,
    Calendar as CalendarIcon,
    Car as CarIcon,
    DollarSign,
    Edit,
    Eye,
    FileCheck,
    FileText,
    Heart,
    Heart as HeartIcon,
    Home,
    Plus,
    RefreshCw,
    Shield,
    Shield as ShieldIcon,
    Star,
    TrendingUp,
    Users,
    X
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface InsuranceEvent {
  id: string;
  title: string;
  clientName: string;
  clientPhoto?: string;
  clientId: string;
  type: 'contract' | 'claim' | 'expertise' | 'renewal' | 'payment' | 'meeting';
  startTime: string;
  endTime: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'urgent';
  assignedAgent: string;
  insuranceType: 'auto' | 'home' | 'health' | 'life' | 'business';
  claimAmount?: number;
  contractNumber?: string;
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
    photoProof: string;
  };
}

interface Client {
  id: string;
  name: string;
  photo?: string;
  email: string;
  phone: string;
  loyaltyLevel: 'bronze' | 'silver' | 'gold' | 'platinum';
  totalContracts: number;
  averageRating: number;
  insuranceTypes: string[];
  documents: string[];
  aiProfile: {
    riskScore: number;
    claimHistory: string[];
    recommendations: string[];
    behaviorPattern: string;
    fraudRisk: 'low' | 'medium' | 'high';
  };
  lastInteraction: string;
  nextRenewal?: string;
  specialNotes: string[];
}

interface Agent {
  id: string;
  name: string;
  photo?: string;
  role: 'agent' | 'expert' | 'manager' | 'claims_handler';
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

interface Contract {
  id: string;
  number: string;
  type: 'auto' | 'home' | 'health' | 'life' | 'business';
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  startDate: string;
  endDate: string;
  premium: number;
  coverage: string[];
  clientId: string;
  documents: string[];
  aiRiskAssessment: number;
  renewalDate: string;
  claims: string[];
}

// 1. NAVBAR PREMIUM ASSURANCE
function InsuranceNavbar() {
  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
            <img src="/logos/novacore.svg" alt="NovaCore Logo" className="w-7 h-7" />
          </div>
          <span className="font-bold text-lg text-gray-900">DL Assurance Pro</span>
        </div>
        <div className="flex-1 max-w-md mx-8">
          <input type="text" placeholder="Rechercher client, contrat, sinistre..." className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-black placeholder:text-black" />
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative">
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">3</span>
            <Bell className="w-6 h-6 text-green-600" />
          </button>
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg" />
              <AvatarFallback>PD</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <span className="font-medium text-sm">Pierre Dubois</span>
              <div className="text-xs text-gray-500">Expert Sinistres</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// 2. BANNIÈRE D'ALERTE IA ASSURANCE
function InsuranceAlertBanner() {
  return (
    <div className="bg-gradient-to-r from-orange-100 to-red-100 border-l-4 border-orange-400 p-4 flex items-center justify-between mb-6 mt-2 rounded shadow">
      <div className="flex items-center space-x-3">
        <AlertTriangle className="w-6 h-6 text-orange-600" />
        <span className="font-semibold text-orange-900">IA NovaCore:</span>
        <span className="text-sm text-gray-800">3 sinistres urgents, 12 renouvellements ce mois, 2 fraudes détectées</span>
      </div>
      <button className="bg-orange-400 text-white px-3 py-1 rounded font-medium hover:bg-orange-500 transition">Voir toutes les alertes</button>
    </div>
  );
}

// 3. DASHBOARD KPI ASSURANCE
type InsuranceKPIProps = { aiInsights: any };
function InsuranceKPI({ aiInsights }: InsuranceKPIProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Contrats actifs</CardTitle>
          <Shield className="w-5 h-5 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{aiInsights?.totalContracts ?? '--'}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sinistres en cours</CardTitle>
          <AlertCircle className="w-5 h-5 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{aiInsights?.activeClaims ?? '--'}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
          <TrendingUp className="w-5 h-5 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{aiInsights?.conversionRate ? `${Math.round(aiInsights.conversionRate * 100)}%` : '--'}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Alertes fraude</CardTitle>
          <Shield className="w-5 h-5 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{aiInsights?.fraudAlerts ?? '--'}</div>
        </CardContent>
      </Card>
    </div>
  );
}

// 4. PIPELINE SINISTRES
type ClaimsPipelineProps = { events: Array<InsuranceEvent> };
function ClaimsPipeline({ events }: ClaimsPipelineProps) {
  const stages = [
    { key: 'pending', label: 'Déclaré', color: 'bg-yellow-100 text-yellow-800' },
    { key: 'in_progress', label: 'En expertise', color: 'bg-blue-100 text-blue-800' },
    { key: 'completed', label: 'Traité', color: 'bg-green-100 text-green-800' },
    { key: 'cancelled', label: 'Rejeté', color: 'bg-red-100 text-red-800' },
    { key: 'urgent', label: 'Urgent', color: 'bg-red-200 text-red-900' }
  ];
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-8">
      <div className="flex items-center mb-4">
        <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
        <span className="font-semibold text-lg">Pipeline Sinistres</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {stages.map(stage => (
          <div key={stage.key} className="rounded-lg border p-2">
            <div className={`font-bold mb-2 ${stage.color}`}>{stage.label}</div>
            <div className="space-y-2">
              {events.filter((e: InsuranceEvent) => e.status === stage.key && e.type === 'claim').map((e: InsuranceEvent) => (
                <Card key={e.id} className="border-red-100">
                  <CardContent className="p-2 flex items-center space-x-2">
                    <Avatar className="w-7 h-7">
                      <AvatarImage src={e.clientPhoto} />
                      <AvatarFallback>{e.clientName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-xs">{e.clientName}</div>
                      <div className="text-xs text-gray-500">{e.claimAmount?.toLocaleString()} €</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 5. MODULE CONTRATS VIP & ALERTES IA
type VIPContractsProps = { clients: Array<Client> };
function VIPContracts({ clients }: VIPContractsProps) {
  const vips = clients.filter((c: Client) => c.loyaltyLevel === 'gold' || c.loyaltyLevel === 'platinum');
  if (!vips.length) return null;
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-500" />
          <span>Clients VIP & Premium</span>
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
                <div className="text-xs text-gray-500">{client.loyaltyLevel} • {client.totalContracts} contrats</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
type InsuranceRecommendationsProps = { aiInsights: any };
function InsuranceRecommendations({ aiInsights }: InsuranceRecommendationsProps) {
  if (!aiInsights?.recommendations?.length) return null;
  return (
    <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4 mb-2">
          <Brain className="w-8 h-8 text-green-600" />
          <h3 className="font-semibold text-green-900">Recommandations IA</h3>
        </div>
        <ul className="list-disc pl-6 text-green-800 text-sm">
          {aiInsights.recommendations.map((rec: string, i: number) => (
            <li key={i}>{rec}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

// 6. FOOTER ENRICHI ASSURANCE
function InsuranceFooter() {
  return (
    <footer className="bg-white border-t mt-12 py-6 text-center text-xs text-gray-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <img src="/logos/novacore.svg" alt="NovaCore Logo" className="w-6 h-6" />
          <span>NovaCore Insurance</span>
        </div>
        <div>
          Made by Samuel OBAM, CEO of DL Solutions &nbsp;|&nbsp; +237 694 341 586 &nbsp;|&nbsp; Rue École de Police, Yaoundé &nbsp;|&nbsp; sobam@daveandlucesolutions.com
        </div>
        <div>
          © 2024 NovaCore Insurance CRM. Tous droits réservés. Powered by NovaCore AI.
        </div>
      </div>
    </footer>
  );
}

export default function DLAssurancePage() {
  const [events, setEvents] = useState<InsuranceEvent[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month' | 'agenda'>('week');
  const [filterType, setFilterType] = useState<'all' | 'contract' | 'claim' | 'expertise' | 'renewal'>('all');
  const [selectedEvent, setSelectedEvent] = useState<InsuranceEvent | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [aiInsights, setAiInsights] = useState<any>(null);
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
        name: "Pierre Dubois",
        photo: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
        email: "pierre.dubois@email.com",
        phone: "+33 6 12 34 56 78",
        loyaltyLevel: "gold",
        totalContracts: 3,
        averageRating: 4.8,
        insuranceTypes: ["Auto", "Habitation", "Santé"],
        documents: ["CNI", "Permis de conduire", "Justificatif de domicile"],
        aiProfile: {
          riskScore: 0.12,
          claimHistory: ["Accident mineur 2022", "Vol habitation 2023"],
          recommendations: ["Renouvellement auto", "Augmentation franchise"],
          behaviorPattern: "Client fidèle, paiements réguliers",
          fraudRisk: "low"
        },
        lastInteraction: "2024-01-15",
        nextRenewal: "2024-03-15",
        specialNotes: ["VIP", "Préfère les contacts téléphoniques"]
      },
      {
        id: "2",
        name: "Sophie Laurent",
        photo: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407312/Lucie_u6swnq.jpg",
        email: "sophie.laurent@email.com",
        phone: "+33 6 98 76 54 32",
        loyaltyLevel: "silver",
        totalContracts: 2,
        averageRating: 4.6,
        insuranceTypes: ["Auto", "Habitation"],
        documents: ["CNI", "Carte grise"],
        aiProfile: {
          riskScore: 0.25,
          claimHistory: ["Sinistre auto 2023"],
          recommendations: ["Formation conduite défensive"],
          behaviorPattern: "Conducteur jeune, risque modéré",
          fraudRisk: "medium"
        },
        lastInteraction: "2024-01-10",
        nextRenewal: "2024-04-20",
        specialNotes: ["Conducteur jeune", "Franchise élevée"]
      }
    ]);

    // Agents
    setAgents([
      {
        id: "1",
        name: "Marc Bernard",
        photo: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
        role: "agent",
        availability: {
          "monday": { start: "09:00", end: "17:00", available: true },
          "tuesday": { start: "09:00", end: "17:00", available: true },
          "wednesday": { start: "09:00", end: "17:00", available: true },
          "thursday": { start: "09:00", end: "17:00", available: true },
          "friday": { start: "09:00", end: "17:00", available: true }
        },
        skills: ["Auto", "Habitation", "Santé"],
        rating: 4.8,
        currentLoad: 45,
        maxLoad: 60,
        specializations: ["Contrats auto", "Gestion sinistres"]
      },
      {
        id: "2",
        name: "Julie Moreau",
        photo: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407312/Lucie_u6swnq.jpg",
        role: "expert",
        availability: {
          "monday": { start: "08:00", end: "18:00", available: true },
          "tuesday": { start: "08:00", end: "18:00", available: true },
          "wednesday": { start: "08:00", end: "18:00", available: true },
          "thursday": { start: "08:00", end: "18:00", available: true },
          "friday": { start: "08:00", end: "18:00", available: true }
        },
        skills: ["Expertise", "Évaluation", "Fraude"],
        rating: 4.9,
        currentLoad: 30,
        maxLoad: 40,
        specializations: ["Expertise auto", "Détection fraude"]
      }
    ]);

    // Contrats
    setContracts([
      {
        id: "1",
        number: "AUTO-2024-001",
        type: "auto",
        status: "active",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        premium: 850,
        coverage: ["Responsabilité civile", "Vol", "Incendie", "Bris de glace"],
        clientId: "1",
        documents: ["Contrat", "Attestation", "Conditions générales"],
        aiRiskAssessment: 0.15,
        renewalDate: "2024-12-01",
        claims: ["CLAIM-2023-001"]
      },
      {
        id: "2",
        number: "HAB-2024-001",
        type: "home",
        status: "active",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        premium: 420,
        coverage: ["Incendie", "Vol", "Dégâts des eaux", "Responsabilité civile"],
        clientId: "1",
        documents: ["Contrat", "Attestation"],
        aiRiskAssessment: 0.08,
        renewalDate: "2024-12-01",
        claims: []
      }
    ]);

    // Événements
    setEvents([
      {
        id: "1",
        title: "Renouvellement Auto - Pierre Dubois",
        clientName: "Pierre Dubois",
        clientPhoto: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
        clientId: "1",
        type: "renewal",
        startTime: "2024-02-15T10:00:00",
        endTime: "2024-02-15T11:00:00",
        status: "pending",
        assignedAgent: "Marc Bernard",
        insuranceType: "auto",
        contractNumber: "AUTO-2024-001",
        documents: ["Contrat actuel", "Nouveau devis"],
        aiRiskScore: 0.12,
        aiRecommendations: ["Maintenir franchise actuelle", "Ajouter assistance 0km"],
        location: "Bureau principal",
        priority: "medium",
        description: "Renouvellement contrat auto avec évaluation des besoins",
        specialNotes: ["Client fidèle", "Paiement par prélèvement"],
        reminders: {
          sms: true,
          email: true,
          whatsapp: false
        },
        verification: {
          identityVerified: true,
          documentsVerified: true,
          signatureVerified: false,
          photoProof: ""
        }
      },
      {
        id: "2",
        title: "Expertise Sinistre Auto - Sophie Laurent",
        clientName: "Sophie Laurent",
        clientPhoto: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407312/Lucie_u6swnq.jpg",
        clientId: "2",
        type: "expertise",
        startTime: "2024-02-16T14:00:00",
        endTime: "2024-02-16T16:00:00",
        status: "in_progress",
        assignedAgent: "Julie Moreau",
        insuranceType: "auto",
        claimAmount: 2500,
        contractNumber: "AUTO-2024-002",
        documents: ["Constat", "Photos dégâts", "Devis réparation"],
        aiRiskScore: 0.25,
        aiRecommendations: ["Vérifier circonstances", "Contrôler devis"],
        location: "Garage partenaire",
        priority: "high",
        description: "Expertise véhicule après collision",
        specialNotes: ["Dégâts avant droit", "Témoin présent"],
        reminders: {
          sms: true,
          email: true,
          whatsapp: true
        },
        verification: {
          identityVerified: true,
          documentsVerified: true,
          signatureVerified: true,
          photoProof: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407312/Lucie_u6swnq.jpg"
        }
      }
    ]);

    setLoading(false);
  };

  const generateAIInsights = () => {
    setAiInsights({
      totalContracts: 156,
      activeClaims: 23,
      renewalRate: 0.89,
      averageClaimAmount: 1850,
      fraudRiskAlerts: 3,
      recommendations: [
        "15 contrats à renouveler ce mois",
        "3 sinistres nécessitent une expertise urgente",
        "Taux de fraude en baisse de 12%"
      ]
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'contract': return <FileText className="w-4 h-4" />;
      case 'claim': return <AlertTriangle className="w-4 h-4" />;
      case 'expertise': return <Eye className="w-4 h-4" />;
      case 'renewal': return <RefreshCw className="w-4 h-4" />;
      case 'payment': return <DollarSign className="w-4 h-4" />;
      case 'meeting': return <Users className="w-4 h-4" />;
      default: return <CalendarIcon className="w-4 h-4" />;
    }
  };

  const getInsuranceTypeIcon = (type: string) => {
    switch (type) {
      case 'auto': return <CarIcon className="w-4 h-4" />;
      case 'home': return <Home className="w-4 h-4" />;
      case 'health': return <HeartIcon className="w-4 h-4" />;
      case 'life': return <Heart className="w-4 h-4" />;
      case 'business': return <Building className="w-4 h-4" />;
      default: return <ShieldIcon className="w-4 h-4" />;
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score < 0.2) return 'text-green-600';
    if (score < 0.4) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getLoyaltyColor = (level: string) => {
    switch (level) {
      case 'bronze': return 'text-amber-600';
      case 'silver': return 'text-gray-600';
      case 'gold': return 'text-yellow-600';
      case 'platinum': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getFraudRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <InsuranceNavbar />
      <InsuranceAlertBanner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <InsuranceKPI aiInsights={aiInsights} />
        <ClaimsPipeline events={events} />
        <VIPContracts clients={clients} />
        <InsuranceRecommendations aiInsights={aiInsights} />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
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
                
                <div className="mt-6 space-y-3">
                  <Button className="w-full" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau RDV
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    <FileCheck className="w-4 h-4 mr-2" />
                    Expertise
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Renouvellement
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

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
                        <SelectItem value="contract">Contrats</SelectItem>
                        <SelectItem value="claim">Sinistres</SelectItem>
                        <SelectItem value="expertise">Expertises</SelectItem>
                        <SelectItem value="renewal">Renouvellements</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
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
                              {event.status.replace('_', ' ')}
                            </Badge>
                            <Badge variant="outline">
                              {getInsuranceTypeIcon(event.insuranceType)}
                              {event.insuranceType}
                            </Badge>
                            {event.aiRiskScore > 0.3 && (
                              <AlertTriangle className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                        </div>
                        
                        {event.claimAmount && (
                          <div className="mt-2 flex items-center space-x-4 text-sm">
                            <span className="font-medium">Montant: {event.claimAmount}€</span>
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
      <InsuranceFooter />
    </div>
  );
} 