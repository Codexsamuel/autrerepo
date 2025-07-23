"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
    Activity,
    BarChart3,
    Cloud,
    DollarSign,
    Eye,
    Globe,
    Plus,
    RefreshCw,
    Settings,
    Shield,
    Smartphone,
    Target,
    Trash2,
    Users,
    Zap
} from 'lucide-react';
import { useState } from 'react';

// Données CRM réalistes et commercialement utilisables
const crmIntegrations = [
  {
    id: 1,
    name: "Salesforce",
    category: "CRM Principal",
    status: "connecté",
    syncStatus: "synchronisé",
    lastSync: "2 min",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/1200px-Salesforce.com_logo.svg.png",
    details: "CRM Enterprise - Édition Lightning",
    apiCalls: "1,247/mois",
    contacts: "12,847",
    deals: "2,341",
    revenue: "€4.2M",
    health: 95,
    features: ["Lead Scoring", "Pipeline Management", "Analytics", "Mobile App"],
    pricing: "€75/utilisateur/mois",
    integrationType: "API REST + Webhooks"
  },
  {
    id: 2,
    name: "HubSpot",
    category: "Marketing Automation",
    status: "connecté",
    syncStatus: "synchronisé",
    lastSync: "5 min",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/HubSpot_logo.svg/1200px-HubSpot_logo.svg.png",
    details: "Suite Marketing & Sales Pro",
    apiCalls: "892/mois",
    contacts: "8,923",
    deals: "1,567",
    revenue: "€2.8M",
    health: 88,
    features: ["Email Marketing", "Lead Nurturing", "Social Media", "SEO"],
    pricing: "€45/utilisateur/mois",
    integrationType: "API REST + Real-time"
  },
  {
    id: 3,
    name: "Pipedrive",
    category: "Sales CRM",
    status: "connecté",
    syncStatus: "synchronisé",
    lastSync: "1 min",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Pipedrive_logo.svg/1200px-Pipedrive_logo.svg.png",
    details: "Pipeline Sales CRM",
    apiCalls: "634/mois",
    contacts: "5,234",
    deals: "987",
    revenue: "€1.9M",
    health: 92,
    features: ["Pipeline View", "Activity Tracking", "Forecasting", "Integrations"],
    pricing: "€25/utilisateur/mois",
    integrationType: "API REST + Webhooks"
  },
  {
    id: 4,
    name: "Zoho CRM",
    category: "CRM Complet",
    status: "connecté",
    syncStatus: "synchronisé",
    lastSync: "3 min",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Zoho_logo.svg/1200px-Zoho_logo.svg.png",
    details: "CRM Plus avec IA",
    apiCalls: "456/mois",
    contacts: "3,456",
    deals: "654",
    revenue: "€1.2M",
    health: 85,
    features: ["AI Assistant", "Workflow Automation", "Multi-channel", "Analytics"],
    pricing: "€35/utilisateur/mois",
    integrationType: "API REST + Real-time"
  },
  {
    id: 5,
    name: "Microsoft Dynamics 365",
    category: "ERP/CRM",
    status: "connecté",
    syncStatus: "synchronisé",
    lastSync: "10 min",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png",
    details: "Business Central + Sales",
    apiCalls: "1,089/mois",
    contacts: "15,678",
    deals: "3,456",
    revenue: "€6.8M",
    health: 97,
    features: ["ERP Integration", "Power BI", "Azure AI", "Teams Integration"],
    pricing: "€95/utilisateur/mois",
    integrationType: "API REST + Azure"
  },
  {
    id: 6,
    name: "Freshworks CRM",
    category: "CRM Moderne",
    status: "déconnecté",
    syncStatus: "erreur",
    lastSync: "2h",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Freshworks_logo.svg/1200px-Freshworks_logo.svg.png",
    details: "Freshsales CRM",
    apiCalls: "0/mois",
    contacts: "2,345",
    deals: "432",
    revenue: "€0.8M",
    health: 45,
    features: ["AI-powered", "Built-in Phone", "Email Tracking", "Lead Scoring"],
    pricing: "€29/utilisateur/mois",
    integrationType: "API REST + Webhooks"
  }
];

const availableIntegrations = [
  { name: "Slack", category: "Communication", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/1200px-Slack_icon_2019.svg.png" },
  { name: "Mailchimp", category: "Email Marketing", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Mailchimp_logo.svg/1200px-Mailchimp_logo.svg.png" },
  { name: "Stripe", category: "Paiements", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Stripe_logo.svg/1200px-Stripe_logo.svg.png" },
  { name: "Zapier", category: "Automation", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Zapier_logo.svg/1200px-Zapier_logo.svg.png" },
  { name: "Intercom", category: "Support", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Intercom_logo.svg/1200px-Intercom_logo.svg.png" },
  { name: "Calendly", category: "Scheduling", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Calendly_logo.svg/1200px-Calendly_logo.svg.png" }
];

const crmStats = {
  totalContacts: 48583,
  totalDeals: 9437,
  totalRevenue: "€17.7M",
  activeIntegrations: 5,
  syncSuccess: 98.5,
  apiCalls: "4,318/mois",
  dataAccuracy: 96.2,
  responseTime: "1.2s"
};

const workflows = [
  { id: 1, name: "Lead Qualification", status: "actif" as const, triggers: 1247, success: 89 },
  { id: 2, name: "Follow-up Automatique", status: "actif" as const, triggers: 892, success: 94 },
  { id: 3, name: "Opportunity Scoring", status: "actif" as const, triggers: 634, success: 91 },
  { id: 4, name: "Customer Onboarding", status: "paused" as const, triggers: 0, success: 0 }
];

export default function CRMIntegrationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredIntegrations = crmIntegrations.filter(integration => 
    integration.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || integration.category === selectedCategory)
  );

  const categories = ['all', ...new Set(crmIntegrations.map(i => i.category))];

  return (
    <>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Intégrations CRM</h1>
            <p className="text-gray-600 mt-2">Gérez vos intégrations CRM et automatisez vos processus commerciaux</p>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle intégration
          </Button>
        </div>

        {/* Statistiques globales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Contacts Totaux</p>
                  <p className="text-2xl font-bold">{crmStats.totalContacts.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Target className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Deals Actifs</p>
                  <p className="text-2xl font-bold">{crmStats.totalDeals.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Revenus Totaux</p>
                  <p className="text-2xl font-bold">{crmStats.totalRevenue}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Activity className="w-8 h-8 text-orange-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Intégrations Actives</p>
                  <p className="text-2xl font-bold">{crmStats.activeIntegrations}/6</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Métriques de performance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Performance des Syncs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Taux de succès</span>
                    <span>{crmStats.syncSuccess}%</span>
                  </div>
                  <Progress value={crmStats.syncSuccess} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Précision des données</span>
                    <span>{crmStats.dataAccuracy}%</span>
                  </div>
                  <Progress value={crmStats.dataAccuracy} className="h-2" />
                </div>
                <div className="text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Appels API/mois:</span>
                    <span>{crmStats.apiCalls}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Temps de réponse:</span>
                    <span>{crmStats.responseTime}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Workflows Automatisés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {workflows.map(workflow => (
                  <div key={workflow.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{workflow.name}</p>
                      <p className="text-xs text-gray-500">{workflow.triggers} déclenchements</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={workflow.status === 'actif' ? 'default' : 'secondary'}>
                        {workflow.status}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">{workflow.success}% succès</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Intégrations Disponibles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {availableIntegrations.map((integration, index) => (
                  <div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <img src={integration.logo} alt={integration.name} className="w-6 h-6 mr-2 rounded-full" />
                    <div>
                      <p className="text-xs font-medium">{integration.name}</p>
                      <p className="text-xs text-gray-500">{integration.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Rechercher une intégration..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="flex gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'Toutes' : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Intégrations CRM */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredIntegrations.map((integration) => (
            <Card key={integration.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={integration.logo} alt={integration.name} className="w-12 h-12 rounded-full object-contain" />
                    <div>
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                      <p className="text-sm text-gray-500">{integration.details}</p>
                      <Badge variant="outline" className="mt-1">{integration.category}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={integration.status === 'connecté' ? 'default' : 'destructive'}>
                      {integration.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{integration.lastSync}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Métriques */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-lg font-bold">{integration.contacts}</p>
                      <p className="text-xs text-gray-500">Contacts</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{integration.deals}</p>
                      <p className="text-xs text-gray-500">Deals</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{integration.revenue}</p>
                      <p className="text-xs text-gray-500">Revenus</p>
                    </div>
                  </div>

                  {/* Santé de l'intégration */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Santé de l'intégration</span>
                      <span>{integration.health}%</span>
                    </div>
                    <Progress value={integration.health} className="h-2" />
                  </div>

                  {/* Fonctionnalités */}
                  <div>
                    <p className="text-sm font-medium mb-2">Fonctionnalités:</p>
                    <div className="flex flex-wrap gap-1">
                      {integration.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Informations techniques */}
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex justify-between">
                      <span>Prix:</span>
                      <span>{integration.pricing}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Appels API:</span>
                      <span>{integration.apiCalls}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type d'intégration:</span>
                      <span>{integration.integrationType}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 pt-2 border-t">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      Détails
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Settings className="h-4 w-4 mr-1" />
                      Configurer
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Section d'aide */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Support & Sécurité
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Cloud className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-medium">Synchronisation Cloud</h3>
                <p className="text-sm text-gray-600">Données synchronisées en temps réel avec chiffrement AES-256</p>
              </div>
              <div className="text-center">
                <Smartphone className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-medium">Mobile Ready</h3>
                <p className="text-sm text-gray-600">Accès mobile sécurisé pour toutes vos intégrations CRM</p>
              </div>
              <div className="text-center">
                <RefreshCw className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-medium">Support 24/7</h3>
                <p className="text-sm text-gray-600">Assistance technique disponible 24h/24 et 7j/7</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
} 