'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Network, Users, UserPlus, MessageSquare, Building, MapPin, Star } from 'lucide-react';

export function NovaWorldNetwork() {
  const networkSuggestions = [
    {
      id: 1,
      name: 'Sarah KOUASSI',
      title: 'Directrice Marketing chez TechStart',
      avatar: '/avatars/sarah.jpg',
      company: 'TechStart',
      location: 'Abidjan, Côte d\'Ivoire',
      mutualConnections: 12,
      verified: true,
      online: true
    },
    {
      id: 2,
      name: 'Mohammed DIALLO',
      title: 'CEO chez FinTech Senegal',
      avatar: '/avatars/mohammed.jpg',
      company: 'FinTech Senegal',
      location: 'Dakar, Sénégal',
      mutualConnections: 8,
      verified: true,
      online: false
    },
    {
      id: 3,
      name: 'Fatou NDIAYE',
      title: 'Directrice Innovation chez GreenTech',
      avatar: '/avatars/fatou.jpg',
      company: 'GreenTech',
      location: 'Dakar, Sénégal',
      mutualConnections: 15,
      verified: false,
      online: true
    },
    {
      id: 4,
      name: 'Kofi MENSAH',
      title: 'CTO chez Digital Solutions Ghana',
      avatar: '/avatars/kofi.jpg',
      company: 'Digital Solutions Ghana',
      location: 'Accra, Ghana',
      mutualConnections: 6,
      verified: true,
      online: false
    }
  ];

  const networkStats = {
    totalConnections: 847,
    newConnections: 23,
    pendingRequests: 7,
    mutualConnections: 156
  };

  return (
    <Card className="bg-white border-gray-200">
      <CardHeader className="pb-3">
        <h4 className="font-semibold text-gray-900 flex items-center">
          <Network className="w-4 h-4 mr-2 text-purple-600" />
          Mon Réseau
        </h4>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Statistiques du réseau */}
        <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">{networkStats.totalConnections}</div>
            <div className="text-xs text-gray-600">Connexions</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">{networkStats.newConnections}</div>
            <div className="text-xs text-gray-600">Nouvelles</div>
          </div>
        </div>

        {/* Suggestions de connexions */}
        <div className="space-y-3 mb-4">
          <h5 className="font-medium text-gray-900 text-sm">Suggestions pour vous</h5>
          {networkSuggestions.map((person) => (
            <div key={person.id} className="border border-gray-100 rounded-lg p-3 hover:border-purple-200 hover:shadow-sm transition-all">
              <div className="flex items-start space-x-3 mb-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={person.avatar} alt={person.name} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {person.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h6 className="font-semibold text-gray-900 text-sm">{person.name}</h6>
                    {person.verified && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs px-1 py-0">
                        ✓
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{person.title}</p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                    <Building className="w-3 h-3" />
                    <span>{person.company}</span>
                    <span>•</span>
                    <MapPin className="w-3 h-3" />
                    <span>{person.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Users className="w-3 h-3" />
                    <span>{person.mutualConnections} connexions communes</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 flex-1">
                  <UserPlus className="w-3 h-3 mr-1" />
                  Se connecter
                </Button>
                <Button size="sm" variant="outline" className="border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-600 text-xs px-2 py-1">
                  <MessageSquare className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Actions réseau */}
        <div className="space-y-2">
          <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-600">
            <Users className="w-4 h-4 mr-2" />
            Gérer mes connexions
          </Button>
          <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-600">
            <UserPlus className="w-4 h-4 mr-2" />
            Inviter des contacts
          </Button>
        </div>

        {/* Demandes en attente */}
        {networkStats.pendingRequests > 0 && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium text-yellow-800">
                  {networkStats.pendingRequests} demandes en attente
                </span>
              </div>
              <Button size="sm" variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-100 text-xs">
                Voir
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 