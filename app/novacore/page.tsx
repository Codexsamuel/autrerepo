"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Video, 
  Database, 
  Globe, 
  ShoppingBag, 
  Plane, 
  Gamepad2, 
  Workflow, 
  Shield, 
  Settings,
  TrendingUp,
  Activity,
  Zap,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';

const modules = [
  {
    title: "Gestion des utilisateurs",
    description: "Gérer les utilisateurs, rôles et permissions",
    icon: Users,
    href: "/novacore/users",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    stats: "127 utilisateurs"
  },
  {
    title: "Analytics",
    description: "Tableaux de bord et analyses avancées",
    icon: BarChart3,
    href: "/novacore/analytics",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    stats: "15 rapports"
  },
  {
    title: "Workflows n8n",
    description: "Automatisation et workflows",
    icon: Workflow,
    href: "/novacore/workflows",
    color: "text-green-600",
    bgColor: "bg-green-50",
    stats: "23 workflows"
  },
  {
    title: "Video Editor",
    description: "Édition vidéo professionnelle",
    icon: Video,
    href: "/novacore/video-editor",
    color: "text-red-600",
    bgColor: "bg-red-50",
    stats: "8 projets"
  },
  {
    title: "Intégrations CRM",
    description: "Connexions CRM et gestion client",
    icon: Database,
    href: "/novacore/crm-integrations",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    stats: "12 intégrations"
  },
  {
    title: "NovaWorld",
    description: "Réseau social professionnel",
    icon: Globe,
    href: "/novacore/novaworld",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    stats: "1.2K membres"
  },
  {
    title: "DL Style",
    description: "Boutique e-commerce et scraping",
    icon: ShoppingBag,
    href: "/novacore/dl-style",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    stats: "2.5K produits"
  },
  {
    title: "DL Travel",
    description: "Réservations et voyages",
    icon: Plane,
    href: "/novacore/dl-travel",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    stats: "156 réservations"
  },
  {
    title: "DL Bookmaker",
    description: "Gestion des paris sportifs",
    icon: Gamepad2,
    href: "/novacore/dl-bookmaker",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    stats: "89 paris"
  },
  {
    title: "Sécurité",
    description: "Sécurité et contrôle d'accès",
    icon: Shield,
    href: "/novacore/security",
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    stats: "100% sécurisé"
  },
  {
    title: "Paramètres système",
    description: "Configuration et préférences",
    icon: Settings,
    href: "/novacore/settings",
    color: "text-slate-600",
    bgColor: "bg-slate-50",
    stats: "15 paramètres"
  }
];

const stats = [
  { label: 'Utilisateurs actifs', value: '1,247', icon: Users, color: 'text-blue-600' },
  { label: 'Projets vidéo', value: '8', icon: Video, color: 'text-red-600' },
  { label: 'Workflows actifs', value: '23', icon: Workflow, color: 'text-green-600' },
  { label: 'Intégrations CRM', value: '12', icon: Database, color: 'text-indigo-600' },
];

const recentActivity = [
  { action: "Nouveau projet vidéo créé", user: "Samuel OBAM DAY", time: "Il y a 2h" },
  { action: "Workflow n8n mis à jour", user: "Pierre ESSOMBA", time: "Il y a 4h" },
  { action: "Nouvelle intégration CRM", user: "Marie NGUEMO", time: "Il y a 6h" },
  { action: "Utilisateur ajouté", user: "Jean DUPONT", time: "Il y a 8h" },
];

export default function NovaCoreDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard NovaCore</h1>
          <p className="text-gray-600 mt-2">Centre de contrôle de l'écosystème DL Solutions</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-green-600 border-green-600">
            <Activity className="w-4 h-4 mr-1" />
            Système opérationnel
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modules Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Modules disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modules.map((module, index) => (
            <Link key={index} href={module.href}>
              <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${module.bgColor} group-hover:scale-110 transition-transform`}>
                      <module.icon className={`h-6 w-6 ${module.color}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                        {module.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {module.stats}
                    </Badge>
                    <Zap className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Activité récente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-xs text-gray-600">{activity.user}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Performance système
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">CPU</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <span className="text-sm font-medium">45%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Mémoire</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                  <span className="text-sm font-medium">62%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Stockage</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <span className="text-sm font-medium">78%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Réseau</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '23%' }}></div>
                  </div>
                  <span className="text-sm font-medium">23%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
