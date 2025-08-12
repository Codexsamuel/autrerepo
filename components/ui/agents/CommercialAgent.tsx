"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target, 
  DollarSign, 
  ShoppingCart, 
  MessageSquare, 
  Zap, 
  Crown,
  Star,
  ArrowUpRight,
  PieChart,
  Activity,
  Globe,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  Plus
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface CommercialMetrics {
  sales: number;
  leads: number;
  conversion: number;
  revenue: number;
  customers: number;
  roi: number;
}

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  roi: number;
  startDate: string;
  endDate: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed' | 'lost';
  value: number;
  source: string;
  lastContact: string;
  nextFollowUp: string;
}

export default function CommercialAgent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [metrics, setMetrics] = useState<CommercialMetrics>({
    sales: 0,
    leads: 0,
    conversion: 0,
    revenue: 0,
    customers: 0,
    roi: 0
  });
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      setMetrics({
        sales: 1247,
        leads: 89,
        conversion: 23.4,
        revenue: 45678,
        customers: 234,
        roi: 312
      });

      setCampaigns([
        {
          id: '1',
          name: 'Campagne Q4 - Produits Premium',
          status: 'active',
          budget: 5000,
          spent: 3200,
          impressions: 45000,
          clicks: 1200,
          conversions: 89,
          roi: 278,
          startDate: '2024-10-01',
          endDate: '2024-12-31'
        },
        {
          id: '2',
          name: 'Email Marketing - Newsletter',
          status: 'active',
          budget: 1000,
          spent: 450,
          impressions: 15000,
          clicks: 890,
          conversions: 45,
          roi: 156,
          startDate: '2024-11-01',
          endDate: '2024-11-30'
        }
      ]);

      setLeads([
        {
          id: '1',
          name: 'Jean Dupont',
          email: 'jean.dupont@entreprise.com',
          phone: '+33 1 23 45 67 89',
          company: 'Tech Solutions SARL',
          status: 'qualified',
          value: 15000,
          source: 'LinkedIn',
          lastContact: '2024-11-15',
          nextFollowUp: '2024-11-22'
        },
        {
          id: '2',
          name: 'Marie Martin',
          email: 'm.martin@startup.fr',
          phone: '+33 6 12 34 56 78',
          company: 'Innovation Startup',
          status: 'proposal',
          value: 25000,
          source: 'Site Web',
          lastContact: '2024-11-18',
          nextFollowUp: '2024-11-25'
        }
      ]);

      setIsLoading(false);
    }, 1500);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      case 'draft': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getLeadStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'contacted': return 'bg-yellow-500';
      case 'qualified': return 'bg-green-500';
      case 'proposal': return 'bg-purple-500';
      case 'closed': return 'bg-emerald-500';
      case 'lost': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-blue-900 to-purple-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto"></div>
            <p className="text-white text-xl mt-4">Chargement de l'Agent Commercial...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-blue-900 to-purple-900">
      {/* Header Premium */}
      <div className="bg-gradient-to-r from-emerald-800/50 to-blue-800/50 backdrop-blur-sm border-b border-emerald-500/30">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">Agent Commercial Premium</h1>
                <p className="text-emerald-200 text-lg">Gestion commerciale intelligente & Marketing automatisé</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="border-emerald-500 text-emerald-300">
                <Star className="w-4 h-4 mr-1" />
                Premium
              </Badge>
              <Badge variant="outline" className="border-blue-500 text-blue-300">
                <Zap className="w-4 h-4 mr-1" />
                IA Avancée
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Métriques Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 border-emerald-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-200 text-sm font-medium">Ventes</p>
                  <p className="text-3xl font-bold text-white">{metrics.sales.toLocaleString()}</p>
                  <p className="text-emerald-300 text-sm flex items-center">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    +12.5%
                  </p>
                </div>
                <div className="p-3 bg-emerald-500/20 rounded-xl">
                  <ShoppingCart className="w-8 h-8 text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border-blue-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm font-medium">Leads</p>
                  <p className="text-3xl font-bold text-white">{metrics.leads}</p>
                  <p className="text-blue-300 text-sm flex items-center">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    +8.3%
                  </p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm font-medium">Conversion</p>
                  <p className="text-3xl font-bold text-white">{metrics.conversion}%</p>
                  <p className="text-purple-300 text-sm flex items-center">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    +2.1%
                  </p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Target className="w-8 h-8 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 border-orange-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-200 text-sm font-medium">Revenus</p>
                  <p className="text-3xl font-bold text-white">{metrics.revenue.toLocaleString()}€</p>
                  <p className="text-orange-300 text-sm flex items-center">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    +15.7%
                  </p>
                </div>
                <div className="p-3 bg-orange-500/20 rounded-xl">
                  <DollarSign className="w-8 h-8 text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interface Principale */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/10 backdrop-blur-sm border-white/20">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-300">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
              <Target className="w-4 h-4 mr-2" />
              Campagnes
            </TabsTrigger>
            <TabsTrigger value="leads" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300">
              <Users className="w-4 h-4 mr-2" />
              Leads
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-300">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="automation" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-300">
              <Zap className="w-4 h-4 mr-2" />
              Automatisation
            </TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Graphique des Ventes */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-emerald-400" />
                    Évolution des Ventes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-lg border border-emerald-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                      <p className="text-emerald-200">Graphique interactif des ventes</p>
                      <p className="text-emerald-300 text-sm">Intégration Chart.js en cours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Activité Récente */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-blue-400" />
                    Activité Récente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">Nouveau lead qualifié</p>
                        <p className="text-blue-300 text-xs">Tech Solutions SARL - 2h</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">Vente conclue</p>
                        <p className="text-green-300 text-xs">15,000€ - Innovation Startup - 4h</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">Campagne lancée</p>
                        <p className="text-purple-300 text-xs">Q4 Premium - 6h</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Campagnes */}
          <TabsContent value="campaigns" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Campagnes Marketing</span>
                  <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle Campagne
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(campaign.status)}`}></div>
                          <h3 className="text-white font-semibold">{campaign.name}</h3>
                        </div>
                        <Badge variant="outline" className="border-emerald-500 text-emerald-300">
                          ROI: {campaign.roi}%
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Budget</p>
                          <p className="text-white font-medium">{campaign.budget.toLocaleString()}€</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Dépensé</p>
                          <p className="text-white font-medium">{campaign.spent.toLocaleString()}€</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Conversions</p>
                          <p className="text-white font-medium">{campaign.conversions}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">ROI</p>
                          <p className="text-white font-medium">{campaign.roi}%</p>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Progression</span>
                          <span>{Math.round((campaign.spent / campaign.budget) * 100)}%</span>
                        </div>
                        <Progress value={(campaign.spent / campaign.budget) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leads */}
          <TabsContent value="leads" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Gestion des Leads</span>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Users className="w-4 h-4 mr-2" />
                    Nouveau Lead
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leads.map((lead) => (
                    <div key={lead.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${getLeadStatusColor(lead.status)}`}></div>
                          <h3 className="text-white font-semibold">{lead.name}</h3>
                          <Badge variant="outline" className="border-white/30 text-white">
                            {lead.company}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold">{lead.value.toLocaleString()}€</p>
                          <p className="text-gray-400 text-sm">{lead.source}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <p className="text-gray-400">Email</p>
                          <p className="text-white">{lead.email}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Téléphone</p>
                          <p className="text-white">{lead.phone}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Dernier Contact</p>
                          <p className="text-white">{lead.lastContact}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Prochain Suivi</p>
                          <p className="text-white">{lead.nextFollowUp}</p>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="border-blue-500/30 text-blue-300 hover:bg-blue-500/20">
                          <Mail className="w-4 h-4 mr-2" />
                          Contacter
                        </Button>
                        <Button size="sm" variant="outline" className="border-green-500/30 text-green-300 hover:bg-green-500/20">
                          <Calendar className="w-4 h-4 mr-2" />
                          Planifier
                        </Button>
                        <Button size="sm" variant="outline" className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Qualifier
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <PieChart className="w-5 h-5 mr-2 text-orange-400" />
                    Répartition des Sources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-lg border border-orange-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                      <p className="text-orange-200">Graphique circulaire des sources</p>
                      <p className="text-orange-300 text-sm">Intégration Chart.js en cours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-blue-400" />
                    Performance Géographique
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <Globe className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                      <p className="text-blue-200">Carte de performance</p>
                      <p className="text-blue-300 text-sm">Intégration Mapbox en cours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Automatisation */}
          <TabsContent value="automation" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-red-400" />
                  Workflows Automatisés
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-lg border border-red-500/20">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-red-500/20 rounded-lg">
                        <Mail className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Email Marketing</h3>
                        <p className="text-red-300 text-sm">Séquences automatiques</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-white">Bienvenue nouveaux leads</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-white">Suivi automatique</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-white">Nurturing intelligent</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <MessageSquare className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Chatbot IA</h3>
                        <p className="text-blue-300 text-sm">Support 24/7</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-white">Qualification automatique</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-white">Réponses intelligentes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-white">Transfert humain</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <Target className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Scoring Leads</h3>
                        <p className="text-green-300 text-sm">Évaluation automatique</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-white">Analyse comportementale</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-white">Scoring en temps réel</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-white">Priorisation automatique</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Calendar className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Planification</h3>
                        <p className="text-purple-300 text-sm">Suivi automatique</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-white">Rappels automatiques</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-white">Séquençage optimal</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-white">Optimisation timing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 