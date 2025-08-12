'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Building, 
  Briefcase, 
  Users, 
  BookOpen, 
  Calendar,
  Star,
  Eye,
  Plus,
  Settings,
  HelpCircle,
  Globe,
  TrendingUp,
  Award,
  Target,
  Search
} from 'lucide-react';
import Link from 'next/link';

export function NovaWorldSidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const userStats = {
    profileViews: 127,
    postViews: 2.4,
    searchAppearances: 89,
    connections: 847
  };

  const quickActions = [
    { icon: Plus, label: 'Créer un post', href: '/novaworld/create-post', color: 'text-blue-600' },
    { icon: Users, label: 'Inviter des contacts', href: '/novaworld/invite', color: 'text-green-600' },
    { icon: Briefcase, label: 'Publier une offre', href: '/novaworld/post-job', color: 'text-purple-600' },
    { icon: Building, label: 'Créer une page entreprise', href: '/novaworld/create-company', color: 'text-orange-600' }
  ];

  const recentSearches = [
    'Développeurs React',
    'Entreprises Tech Cameroun',
    'Emplois Marketing Digital',
    'Startups Fintech'
  ];

  const trendingTopics = [
    { name: 'Innovation Tech', count: '2.4k posts', color: 'bg-blue-100 text-blue-800' },
    { name: 'Entrepreneuriat Afrique', count: '1.8k posts', color: 'bg-green-100 text-green-800' },
    { name: 'Digital Marketing', count: '1.2k posts', color: 'bg-purple-100 text-purple-800' },
    { name: 'Finance & Investissement', count: '956 posts', color: 'bg-orange-100 text-orange-800' }
  ];

  return (
    <div className="space-y-6">
      {/* Profil Utilisateur */}
      <Card className="bg-white border-gray-200">
        <CardHeader className="pb-3">
          <div className="text-center">
            <div className="relative mx-auto mb-3">
              <Avatar className="w-20 h-20 mx-auto">
                <AvatarImage src="/avatars/user-profile.jpg" alt="Profil utilisateur" />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl font-bold">
                  U
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <h3 className="font-semibold text-gray-900 text-lg">Samuel OBAM DAY</h3>
            <p className="text-gray-600 text-sm">CEO & Fondateur chez DL Solutions</p>
            <p className="text-gray-500 text-xs mt-1">Douala, Cameroun</p>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Statistiques du profil */}
          <div className="grid grid-cols-2 gap-4 mb-4 text-center">
            <div>
              <div className="text-lg font-semibold text-gray-900">{userStats.profileViews}</div>
              <div className="text-xs text-gray-600">Vues du profil</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900">{userStats.connections}</div>
              <div className="text-xs text-gray-600">Connexions</div>
            </div>
          </div>
          
          {/* Actions rapides */}
          <div className="space-y-2 mb-4">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                >
                  <action.icon className={`w-4 h-4 mr-2 ${action.color}`} />
                  {action.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Bouton Voir le profil */}
          <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600">
            <Eye className="w-4 h-4 mr-2" />
            Voir mon profil
          </Button>
        </CardContent>
      </Card>

      {/* Statistiques et Insights */}
      <Card className="bg-white border-gray-200">
        <CardHeader className="pb-3">
          <h4 className="font-semibold text-gray-900 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
            Mes Insights
          </h4>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Vues de posts</span>
              <span className="font-semibold text-gray-900">{userStats.postViews}k</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Apparitions recherche</span>
              <span className="font-semibold text-gray-900">{userStats.searchAppearances}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Score d'influence</span>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="font-semibold text-gray-900">4.8</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recherches Récentes */}
      <Card className="bg-white border-gray-200">
        <CardHeader className="pb-3">
          <h4 className="font-semibold text-gray-900 flex items-center">
            <Search className="w-4 h-4 mr-2 text-blue-600" />
            Recherches Récentes
          </h4>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {recentSearches.map((search, index) => (
              <Link key={index} href={`/novaworld/search?q=${encodeURIComponent(search)}`}>
                <div className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer py-1">
                  {search}
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sujets Tendances */}
      <Card className="bg-white border-gray-200">
        <CardHeader className="pb-3">
          <h4 className="font-semibold text-gray-900 flex items-center">
            <Target className="w-4 h-4 mr-2 text-orange-600" />
            Sujets Tendances
          </h4>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {trendingTopics.map((topic, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{topic.name}</span>
                <Badge variant="secondary" className={topic.color}>
                  {topic.count}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation Rapide */}
      <Card className="bg-white border-gray-200">
        <CardHeader className="pb-3">
          <h4 className="font-semibold text-gray-900 flex items-center">
            <Globe className="w-4 h-4 mr-2 text-green-600" />
            Navigation Rapide
          </h4>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <Link href="/novaworld/events">
              <Button variant="ghost" size="sm" className="w-full justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                Événements
              </Button>
            </Link>
            <Link href="/novaworld/learning">
              <Button variant="ghost" size="sm" className="w-full justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                <BookOpen className="w-4 h-4 mr-2 text-green-600" />
                Formation
              </Button>
            </Link>
            <Link href="/novaworld/awards">
              <Button variant="ghost" size="sm" className="w-full justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                <Award className="w-4 h-4 mr-2 text-yellow-600" />
                Récompenses
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Aide et Support */}
      <Card className="bg-white border-gray-200">
        <CardContent className="pt-4">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <HelpCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h5 className="font-semibold text-gray-900 text-sm">Besoin d'aide ?</h5>
              <p className="text-gray-600 text-xs">Notre équipe est là pour vous aider</p>
            </div>
            <Button size="sm" variant="outline" className="w-full border-blue-300 text-blue-600 hover:bg-blue-50">
              Contacter le support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 