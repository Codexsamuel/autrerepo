'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, MapPin, Users, Star, TrendingUp, Globe } from 'lucide-react';

export function NovaWorldCompanies() {
  const popularCompanies = [
    {
      id: 1,
      name: 'DL Solutions',
      logo: '/logos/dl-solutions.png',
      industry: 'Technologie & IA',
      location: 'Douala, Cameroun',
      employees: '50-100',
      followers: 1247,
      rating: 4.8,
      verified: true,
      hiring: true,
      posts: 156,
      description: 'Leader en solutions digitales et IA en Afrique'
    },
    {
      id: 2,
      name: 'Nova Hospitality',
      logo: '/logos/nova-hospitality.png',
      industry: 'Hôtellerie & Tourisme',
      location: 'Yaoundé, Cameroun',
      employees: '100-250',
      followers: 892,
      rating: 4.6,
      verified: true,
      hiring: true,
      posts: 89,
      description: 'Chaîne hôtelière premium en Afrique Centrale'
    },
    {
      id: 3,
      name: 'AssurPro Cameroun',
      logo: '/logos/assurpro.png',
      industry: 'Assurance & Finance',
      location: 'Douala, Cameroun',
      employees: '250-500',
      followers: 567,
      rating: 4.4,
      verified: true,
      hiring: false,
      posts: 67,
      description: 'Assurance innovante et produits connectés'
    },
    {
      id: 4,
      name: 'TechCorp Afrique',
      logo: '/logos/techcorp.png',
      industry: 'Technologie',
      location: 'Abidjan, Côte d\'Ivoire',
      employees: '100-250',
      followers: 423,
      rating: 4.7,
      verified: false,
      hiring: true,
      posts: 45,
      description: 'Solutions tech pour entreprises africaines'
    }
  ];

  return (
    <Card className="bg-white border-gray-200">
      <CardHeader className="pb-3">
        <h4 className="font-semibold text-gray-900 flex items-center">
          <Building className="w-4 h-4 mr-2 text-green-600" />
          Entreprises Populaires
        </h4>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {popularCompanies.map((company) => (
            <div key={company.id} className="border border-gray-100 rounded-lg p-3 hover:border-green-200 hover:shadow-sm transition-all cursor-pointer">
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  {company.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h5 className="font-semibold text-gray-900 text-sm">{company.name}</h5>
                    {company.verified && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs px-1 py-0">
                        ✓ Vérifié
                      </Badge>
                    )}
                    {company.hiring && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs px-1 py-0">
                        🚀 Recrute
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{company.description}</p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                    <Building className="w-3 h-3" />
                    <span>{company.industry}</span>
                    <span>•</span>
                    <MapPin className="w-3 h-3" />
                    <span>{company.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{company.employees} employés</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-500" />
                  <span>{company.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{company.followers} followers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Globe className="w-3 h-3" />
                  <span>{company.posts} posts</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <Button size="sm" variant="outline" className="border-gray-300 text-gray-700 hover:border-green-500 hover:text-green-600 text-xs px-3 py-1">
                  Suivre
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1">
                  Voir l'entreprise
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-4 border-gray-300 text-gray-700 hover:border-green-500 hover:text-green-600">
          Découvrir plus d'entreprises
        </Button>
      </CardContent>
    </Card>
  );
} 