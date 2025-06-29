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
  Megaphone,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Mail as MailIcon,
  Smartphone
} from 'lucide-react';

interface MarketingEvent {
  id: string;
  title: string;
  clientName: string;
  clientPhoto?: string;
  clientId: string;
  type: 'campaign' | 'meeting' | 'content' | 'analysis' | 'launch' | 'review';
  startTime: string;
  endTime: string;
  status: 'planning' | 'active' | 'completed' | 'paused' | 'urgent';
  assignedManager: string;
  campaignType: 'social' | 'email' | 'ads' | 'content' | 'influencer' | 'event';
  budget?: number;
  platforms: string[];
  documents: string[];
  aiPerformanceScore: number;
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
  metrics?: {
    reach: number;
    engagement: number;
    clicks: number;
    conversions: number;
    roi: number;
  };
}

interface Client {
  id: string;
  name: string;
  photo?: string;
  email: string;
  phone: string;
  industry: string;
  budget: number;
  targetAudience: string[];
  platforms: string[];
  documents: string[];
  aiProfile: {
    performanceScore: number;
    preferences: string[];
    recommendations: string[];
    behaviorPattern: string;
    successRate: number;
  };
  lastInteraction: string;
  specialNotes: string[];
}

interface Manager {
  id: string;
  name: string;
  photo?: string;
  role: 'manager' | 'specialist' | 'director' | 'analyst';
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

export default function DLMarketingPage() {
  const [events, setEvents] = useState<MarketingEvent[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month' | 'agenda'>('week');
  const [filterType, setFilterType] = useState<'all' | 'campaign' | 'meeting' | 'content' | 'analysis'>('all');
  const [selectedEvent, setSelectedEvent] = useState<MarketingEvent | null>(null);
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
        name: "TechStart Solutions",
        photo: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
        email: "contact@techstart.com",
        phone: "+33 1 23 45 67 89",
        industry: "Technologie",
        budget: 25000,
        targetAudience: ["Startups", "PME", "Développeurs"],
        platforms: ["LinkedIn", "Twitter", "Instagram"],
        documents: ["Brief créatif", "Guide de marque", "Objectifs"],
        aiProfile: {
          performanceScore: 0.85,
          preferences: ["Contenu technique", "Vidéo", "Webinaires"],
          recommendations: ["Focus LinkedIn", "Contenu éducatif"],
          behaviorPattern: "Client tech-savvy, engagement élevé",
          successRate: 0.78
        },
        lastInteraction: "2024-02-10",
        specialNotes: ["Lancement produit", "Budget flexible"]
      },
      {
        id: "2",
        name: "Fashion Boutique Paris",
        photo: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407312/Lucie_u6swnq.jpg",
        email: "contact@fashionboutique.fr",
        phone: "+33 1 98 76 54 32",
        industry: "Mode",
        budget: 15000,
        targetAudience: ["Femmes 25-45", "Mode", "Luxe"],
        platforms: ["Instagram", "Facebook", "TikTok"],
        documents: ["Guide de marque", "Photos produits", "Brief"],
        aiProfile: {
          performanceScore: 0.72,
          preferences: ["Visuel", "Influenceurs", "Stories"],
          recommendations: ["Focus Instagram", "Collaborations"],
          behaviorPattern: "Client visuel, tendance",
          successRate: 0.65
        },
        lastInteraction: "2024-02-12",
        specialNotes: ["Collection printemps", "Influenceurs locaux"]
      }
    ]);

    // Managers
    setManagers([
      {
        id: "1",
        name: "Sarah Dubois",
        photo: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
        role: "manager",
        availability: {
          "monday": { start: "09:00", end: "18:00", available: true },
          "tuesday": { start: "09:00", end: "18:00", available: true },
          "wednesday": { start: "09:00", end: "18:00", available: true },
          "thursday": { start: "09:00", end: "18:00", available: true },
          "friday": { start: "09:00", end: "18:00", available: true }
        },
        skills: ["Stratégie", "Social Media", "Content Marketing"],
        rating: 4.8,
        currentLoad: 45,
        maxLoad: 60,
        specializations: ["B2B", "Tech", "LinkedIn"]
      },
      {
        id: "2",
        name: "Alex Martin",
        photo: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407312/Lucie_u6swnq.jpg",
        role: "specialist",
        availability: {
          "monday": { start: "08:00", end: "17:00", available: true },
          "tuesday": { start: "08:00", end: "17:00", available: true },
          "wednesday": { start: "08:00", end: "17:00", available: true },
          "thursday": { start: "08:00", end: "17:00", available: true },
          "friday": { start: "08:00", end: "17:00", available: true }
        },
        skills: ["Instagram", "TikTok", "Influenceurs"],
        rating: 4.9,
        currentLoad: 30,
        maxLoad: 40,
        specializations: ["Mode", "Lifestyle", "Influenceurs"]
      }
    ]);

    // Événements
    setEvents([
      {
        id: "1",
        title: "Lancement Campagne LinkedIn - TechStart",
        clientName: "TechStart Solutions",
        clientPhoto: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
        clientId: "1",
        type: "launch",
        startTime: "2024-02-15T09:00:00",
        endTime: "2024-02-15T10:00:00",
        status: "active",
        assignedManager: "Sarah Dubois",
        campaignType: "social",
        budget: 8000,
        platforms: ["LinkedIn", "Twitter"],
        documents: ["Brief créatif", "Calendrier", "Contenu"],
        aiPerformanceScore: 0.85,
        aiRecommendations: ["Publier à 9h", "Utiliser hashtags tech", "Engager avec communauté"],
        location: "Bureau principal",
        priority: "high",
        description: "Lancement campagne LinkedIn pour nouveau produit",
        specialNotes: ["Produit innovant", "Audience ciblée"],
        reminders: {
          sms: true,
          email: true,
          whatsapp: false
        },
        metrics: {
          reach: 15000,
          engagement: 450,
          clicks: 120,
          conversions: 25,
          roi: 3.2
        }
      },
      {
        id: "2",
        title: "Réunion Stratégie Instagram - Fashion Boutique",
        clientName: "Fashion Boutique Paris",
        clientPhoto: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407312/Lucie_u6swnq.jpg",
        clientId: "2",
        type: "meeting",
        startTime: "2024-02-16T14:00:00",
        endTime: "2024-02-16T15:30:00",
        status: "planning",
        assignedManager: "Alex Martin",
        campaignType: "social",
        budget: 5000,
        platforms: ["Instagram", "TikTok"],
        documents: ["Brief", "Moodboard", "Planning"],
        aiPerformanceScore: 0.72,
        aiRecommendations: ["Focus sur stories", "Collaborations influenceurs", "Contenu UGC"],
        location: "Agence",
        priority: "medium",
        description: "Réunion stratégie Instagram pour collection printemps",
        specialNotes: ["Collection printemps", "Budget limité"],
        reminders: {
          sms: true,
          email: true,
          whatsapp: true
        }
      }
    ]);

    setLoading(false);
  };

  const generateAIInsights = () => {
    setAiInsights({
      totalCampaigns: 23,
      activeCampaigns: 8,
      averageROI: 2.8,
      totalReach: 125000,
      recommendations: [
        "5 campagnes à optimiser",
        "3 nouveaux clients potentiels",
        "ROI moyen en hausse de 15%"
      ]
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'campaign': return <Megaphone className="w-4 h-4" />;
      case 'meeting': return <Users className="w-4 h-4" />;
      case 'content': return <FileText className="w-4 h-4" />;
      case 'analysis': return <BarChart3 className="w-4 h-4" />;
      case 'launch': return <Zap className="w-4 h-4" />;
      case 'review': return <Eye className="w-4 h-4" />;
      default: return <CalendarIcon className="w-4 h-4" />;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'facebook': return <Facebook className="w-4 h-4" />;
      case 'twitter': return <Twitter className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'youtube': return <Youtube className="w-4 h-4" />;
      case 'email': return <MailIcon className="w-4 h-4" />;
      case 'tiktok': return <Smartphone className="w-4 h-4" />;
      default: return <Megaphone className="w-4 h-4" />;
    }
  };

  const getPerformanceScoreColor = (score: number) => {
    if (score > 0.8) return 'text-green-600';
    if (score > 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-600 p-2 rounded-lg">
                <Megaphone className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">DL Marketing</h1>
                <p className="text-sm text-gray-600">Gestion intelligente des campagnes et stratégies</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle campagne
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Insights Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Campagnes Totales</p>
                  <p className="text-3xl font-bold">{aiInsights?.totalCampaigns}</p>
                </div>
                <Megaphone className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Campagnes Actives</p>
                  <p className="text-3xl font-bold">{aiInsights?.activeCampaigns}</p>
                </div>
                <Activity className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">ROI Moyen</p>
                  <p className="text-3xl font-bold">{aiInsights?.averageROI}x</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Portée Totale</p>
                  <p className="text-3xl font-bold">{(aiInsights?.totalReach / 1000).toFixed(0)}k</p>
                </div>
                <Users className="h-8 w-8 text-orange-200" />
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
                    Nouvelle campagne
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analyse performance
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    <Users className="w-4 h-4 mr-2" />
                    Réunion client
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
                      <div key={index} className="text-xs bg-purple-50 p-2 rounded border-l-2 border-purple-500">
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
                        <SelectItem value="campaign">Campagnes</SelectItem>
                        <SelectItem value="meeting">Réunions</SelectItem>
                        <SelectItem value="content">Contenu</SelectItem>
                        <SelectItem value="analysis">Analyses</SelectItem>
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
                              <div className="flex items-center space-x-2 mt-1">
                                {event.platforms.map((platform, index) => (
                                  <span key={index} className="text-xs text-gray-500">
                                    {getPlatformIcon(platform)}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(event.status)}>
                              {event.status}
                            </Badge>
                            <Badge variant="outline">
                              {event.campaignType}
                            </Badge>
                            {event.aiPerformanceScore > 0.8 && (
                              <TrendingUp className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                        </div>
                        
                        {event.budget && (
                          <div className="mt-2 flex items-center space-x-4 text-sm">
                            <span className="font-medium">Budget: {event.budget.toLocaleString()}€</span>
                            <span className={`font-medium ${getPerformanceScoreColor(event.aiPerformanceScore)}`}>
                              Performance IA: {(event.aiPerformanceScore * 100).toFixed(0)}%
                            </span>
                            {event.metrics && (
                              <span className="font-medium">
                                ROI: {event.metrics.roi}x
                              </span>
                            )}
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
                    <p><strong>Manager assigné:</strong> {selectedEvent.assignedManager}</p>
                    <p><strong>Lieu:</strong> {selectedEvent.location}</p>
                    <p><strong>Description:</strong> {selectedEvent.description}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Analyse IA</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Score de performance:</strong> 
                      <span className={`ml-1 ${getPerformanceScoreColor(selectedEvent.aiPerformanceScore)}`}>
                        {(selectedEvent.aiPerformanceScore * 100).toFixed(0)}%
                      </span>
                    </p>
                    <div>
                      <strong>Recommandations:</strong>
                      <ul className="mt-1 space-y-1">
                        {selectedEvent.aiRecommendations.map((rec, index) => (
                          <li key={index} className="text-xs bg-purple-50 p-1 rounded">
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