'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Calendar, MessageCircle, Plus, Sparkles, Star, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SocialDashboardPage() {
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    setStats([
      { label: 'Membres actifs', value: 156, icon: Users },
      { label: 'Messages échangés', value: 2345, icon: MessageCircle },
      { label: 'Événements à venir', value: 4, icon: Calendar },
      { label: 'Nouveaux membres', value: 12, icon: TrendingUp },
      { label: 'Recommandations', value: 89, icon: Star }
    ]);
  }, []);

  // Quick actions (mock)
  const quickActions = [
    { label: 'Créer un post', icon: Plus },
    { label: 'Inviter un membre', icon: Users },
    { label: 'Créer un événement', icon: Calendar },
    { label: 'Lancer un sondage', icon: Bot }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Tableau de bord Social</h1>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Analytics & actions rapides
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="mb-12">
          <h2 className="text-lg font-bold mb-4">Actions rapides</h2>
          <div className="flex flex-wrap gap-4">
            {quickActions.map((action, idx) => (
              <Button key={idx} className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2">
                <action.icon className="w-4 h-4 mr-2" />
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Onboarding */}
        <Card>
          <CardHeader>
            <CardTitle>Bienvenue sur NovaWorld Social !</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Découvrez toutes les fonctionnalités sociales : fil d’actualité, groupes, messagerie, événements, ressources, analytics, et plus encore.
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Partagez des posts et des documents</li>
              <li>Rejoignez des groupes thématiques</li>
              <li>Participez à des événements et ateliers</li>
              <li>Échangez en temps réel avec la messagerie</li>
              <li>Personnalisez vos notifications et préférences</li>
            </ul>
            <Button className="bg-blue-600 hover:bg-blue-700">Démarrer l’onboarding</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 