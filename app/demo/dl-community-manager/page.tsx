'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    BarChart3,
    Brain,
    Calendar as CalendarIcon,
    Camera,
    Clock,
    Edit,
    Facebook,
    Image,
    Instagram,
    Linkedin,
    Megaphone,
    MessageCircle,
    Plus,
    Settings,
    TrendingUp,
    Twitter,
    Users,
    Video,
    X,
    Youtube,
    Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';

// Dashboard Community Management premium NovaCore - Inspiré Sprout Social/Hootsuite
// Modules : Navbar, Alertes IA, KPI, Pipeline, Influenceurs, Recos IA, Footer
// Personnalisation facile : modifiez les mock data ou les modules selon vos besoins.

interface SocialMediaEvent {
  id: string;
  title: string;
  clientName: string;
  clientPhoto?: string;
  clientId: string;
  type: 'post' | 'story' | 'reel' | 'live' | 'campaign' | 'analysis';
  startTime: string;
  endTime: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed' | 'urgent';
  assignedManager: string;
  platform: 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'tiktok' | 'youtube';
  contentType: 'image' | 'video' | 'text' | 'carousel' | 'story';
  content: string;
  hashtags: string[];
  mentions: string[];
  documents: string[];
  aiEngagementScore: number;
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
    impressions: number;
    likes: number;
    comments: number;
    shares: number;
    saves: number;
  };
}

interface Client {
  id: string;
  name: string;
  photo?: string;
  email: string;
  phone: string;
  industry: string;
  targetAudience: string[];
  platforms: string[];
  brandGuidelines: string[];
  documents: string[];
  aiProfile: {
    engagementScore: number;
    bestTimes: string[];
    recommendations: string[];
    contentStyle: string;
    hashtagStrategy: string;
  };
  lastInteraction: string;
  specialNotes: string[];
}

interface Manager {
  id: string;
  name: string;
  photo?: string;
  role: 'community_manager' | 'content_creator' | 'analyst' | 'director';
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

export default function DLCommunityManagerPage() {
  const [events, setEvents] = useState<SocialMediaEvent[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month' | 'agenda'>('week');
  const [filterType, setFilterType] = useState<'all' | 'post' | 'story' | 'reel' | 'campaign'>('all');
  const [selectedEvent, setSelectedEvent] = useState<SocialMediaEvent | null>(null);
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
        name: "Beauty Brand Paris",
        photo: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
        email: "contact@beautybrand.fr",
        phone: "+33 1 23 45 67 89",
        industry: "Beauté",
        targetAudience: ["Femmes 18-35", "Beauté", "Lifestyle"],
        platforms: ["Instagram", "TikTok", "YouTube"],
        brandGuidelines: ["Couleurs pastels", "Style minimaliste", "Tone of voice bienveillant"],
        documents: ["Guide de marque", "Photos produits", "Brief créatif"],
        aiProfile: {
          engagementScore: 0.78,
          bestTimes: ["9h", "12h", "18h", "20h"],
          recommendations: ["Stories quotidiennes", "Reels éducatifs", "Collaborations influenceurs"],
          contentStyle: "Éducatif et inspirant",
          hashtagStrategy: "Mix de hashtags populaires et niche"
        },
        lastInteraction: "2024-02-10",
        specialNotes: ["Lancement collection", "Budget influenceurs"]
      },
      {
        id: "2",
        name: "Tech Startup Lyon",
        photo: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407312/Lucie_u6swnq.jpg",
        email: "contact@techstartup.lyon",
        phone: "+33 4 98 76 54 32",
        industry: "Technologie",
        targetAudience: ["Développeurs", "Startups", "PME"],
        platforms: ["LinkedIn", "Twitter", "YouTube"],
        brandGuidelines: ["Style professionnel", "Contenu technique", "Tone of voice expert"],
        documents: ["Guide de marque", "Présentations", "Brief"],
        aiProfile: {
          engagementScore: 0.65,
          bestTimes: ["8h", "12h", "17h"],
          recommendations: ["Posts techniques", "Webinaires", "Case studies"],
          contentStyle: "Technique et informatif",
          hashtagStrategy: "Hashtags tech et business"
        },
        lastInteraction: "2024-02-12",
        specialNotes: ["Lancement produit", "Webinaire mensuel"]
      }
    ]);

    // Managers
    setManagers([
      {
        id: "1",
        name: "Emma Dubois",
        photo: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
        role: "community_manager",
        availability: {
          "monday": { start: "09:00", end: "18:00", available: true },
          "tuesday": { start: "09:00", end: "18:00", available: true },
          "wednesday": { start: "09:00", end: "18:00", available: true },
          "thursday": { start: "09:00", end: "18:00", available: true },
          "friday": { start: "09:00", end: "18:00", available: true }
        },
        skills: ["Instagram", "TikTok", "Content Creation", "Analytics"],
        rating: 4.8,
        currentLoad: 45,
        maxLoad: 60,
        specializations: ["Beauté", "Lifestyle", "Influenceurs"]
      },
      {
        id: "2",
        name: "Thomas Martin",
        photo: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407312/Lucie_u6swnq.jpg",
        role: "content_creator",
        availability: {
          "monday": { start: "08:00", end: "17:00", available: true },
          "tuesday": { start: "08:00", end: "17:00", available: true },
          "wednesday": { start: "08:00", end: "17:00", available: true },
          "thursday": { start: "08:00", end: "17:00", available: true },
          "friday": { start: "08:00", end: "17:00", available: true }
        },
        skills: ["LinkedIn", "Twitter", "Video Editing", "Copywriting"],
        rating: 4.9,
        currentLoad: 30,
        maxLoad: 40,
        specializations: ["B2B", "Tech", "Professional Content"]
      }
    ]);

    // Événements
    setEvents([
      {
        id: "1",
        title: "Post Collection Printemps - Beauty Brand",
        clientName: "Beauty Brand Paris",
        clientPhoto: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
        clientId: "1",
        type: "post",
        startTime: "2024-02-15T12:00:00",
        endTime: "2024-02-15T12:30:00",
        status: "scheduled",
        assignedManager: "Emma Dubois",
        platform: "instagram",
        contentType: "carousel",
        content: "Découvrez notre nouvelle collection printemps 🌸 Des couleurs douces et des textures légères pour sublimer votre beauté naturelle ✨",
        hashtags: ["#beauty", "#printemps", "#collection", "#makeup", "#beauté"],
        mentions: ["@beautybrandparis"],
        documents: ["Photos collection", "Guide de marque"],
        aiEngagementScore: 0.78,
        aiRecommendations: ["Publier à 12h", "Utiliser plus d'emojis", "Ajouter call-to-action"],
        location: "Instagram",
        priority: "high",
        description: "Publication collection printemps sur Instagram",
        specialNotes: ["Collection limitée", "Influenceurs taggés"],
        reminders: {
          sms: true,
          email: true,
          whatsapp: false
        },
        metrics: {
          reach: 8500,
          impressions: 12000,
          likes: 450,
          comments: 23,
          shares: 12,
          saves: 89
        }
      },
      {
        id: "2",
        title: "Story Quotidienne - Beauty Brand",
        clientName: "Beauty Brand Paris",
        clientPhoto: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
        clientId: "1",
        type: "story",
        startTime: "2024-02-16T09:00:00",
        endTime: "2024-02-16T09:15:00",
        status: "draft",
        assignedManager: "Emma Dubois",
        platform: "instagram",
        contentType: "image",
        content: "Bonjour beauté ! ☀️ Commençons la journée avec notre routine matinale préférée 💆‍♀️",
        hashtags: ["#routine", "#matin", "#beauté"],
        mentions: ["@beautybrandparis"],
        documents: ["Photo routine"],
        aiEngagementScore: 0.72,
        aiRecommendations: ["Publier à 9h", "Ajouter musique", "Utiliser stickers"],
        location: "Instagram Stories",
        priority: "medium",
        description: "Story quotidienne routine matinale",
        specialNotes: ["Format vertical", "24h de durée"],
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
      totalPosts: 156,
      scheduledPosts: 23,
      averageEngagement: 4.2,
      totalReach: 89000,
      recommendations: [
        "8 posts à programmer cette semaine",
        "3 stories quotidiennes à créer",
        "Engagement en hausse de 12%"
      ]
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'published': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'post': return <Image className="w-4 h-4" />;
      case 'story': return <Camera className="w-4 h-4" />;
      case 'reel': return <Video className="w-4 h-4" />;
      case 'live': return <Zap className="w-4 h-4" />;
      case 'campaign': return <Megaphone className="w-4 h-4" />;
      case 'analysis': return <BarChart3 className="w-4 h-4" />;
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
      case 'tiktok': return <Video className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getEngagementScoreColor = (score: number) => {
    if (score > 0.7) return 'text-green-600';
    if (score > 0.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="bg-pink-600 p-2 rounded-lg">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">DL Community Manager</h1>
                <p className="text-sm text-gray-600">Gestion intelligente des réseaux sociaux</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Paramètres
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nouveau post
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Insights Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100">Posts Totaux</p>
                  <p className="text-3xl font-bold">{aiInsights?.totalPosts}</p>
                </div>
                <Image className="h-8 w-8 text-pink-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Posts Programmés</p>
                  <p className="text-3xl font-bold">{aiInsights?.scheduledPosts}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Engagement Moyen</p>
                  <p className="text-3xl font-bold">{aiInsights?.averageEngagement}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Portée Totale</p>
                  <p className="text-3xl font-bold">{(aiInsights?.totalReach / 1000).toFixed(0)}k</p>
                </div>
                <Users className="h-8 w-8 text-purple-200" />
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
                    Nouveau post
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Story
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    <Video className="w-4 h-4 mr-2" />
                    Reel
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
                      <div key={index} className="text-xs bg-pink-50 p-2 rounded border-l-2 border-pink-500">
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
                  <CardTitle>Calendrier des Publications</CardTitle>
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
                        <SelectItem value="post">Posts</SelectItem>
                        <SelectItem value="story">Stories</SelectItem>
                        <SelectItem value="reel">Reels</SelectItem>
                        <SelectItem value="campaign">Campagnes</SelectItem>
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
                                {getPlatformIcon(event.platform)}
                                <span className="text-xs text-gray-500">{event.platform}</span>
                                <span className="text-xs text-gray-500">•</span>
                                <span className="text-xs text-gray-500">{event.contentType}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(event.status)}>
                              {event.status}
                            </Badge>
                            <Badge variant="outline">
                              {event.platform}
                            </Badge>
                            {event.aiEngagementScore > 0.7 && (
                              <TrendingUp className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-2 flex items-center space-x-4 text-sm">
                          <span className={`font-medium ${getEngagementScoreColor(event.aiEngagementScore)}`}>
                            Engagement IA: {(event.aiEngagementScore * 100).toFixed(0)}%
                          </span>
                          {event.metrics && (
                            <>
                              <span className="font-medium">
                                Likes: {event.metrics.likes}
                              </span>
                              <span className="font-medium">
                                Comments: {event.metrics.comments}
                              </span>
                            </>
                          )}
                        </div>
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
                  <h4 className="font-semibold mb-2">Détails de la publication</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Type:</strong> {selectedEvent.type}</p>
                    <p><strong>Statut:</strong> {selectedEvent.status}</p>
                    <p><strong>Priorité:</strong> {selectedEvent.priority}</p>
                    <p><strong>Manager assigné:</strong> {selectedEvent.assignedManager}</p>
                    <p><strong>Plateforme:</strong> {selectedEvent.platform}</p>
                    <p><strong>Contenu:</strong> {selectedEvent.content}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Analyse IA</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Score d'engagement:</strong> 
                      <span className={`ml-1 ${getEngagementScoreColor(selectedEvent.aiEngagementScore)}`}>
                        {(selectedEvent.aiEngagementScore * 100).toFixed(0)}%
                      </span>
                    </p>
                    <div>
                      <strong>Recommandations:</strong>
                      <ul className="mt-1 space-y-1">
                        {selectedEvent.aiRecommendations.map((rec, index) => (
                          <li key={index} className="text-xs bg-pink-50 p-1 rounded">
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