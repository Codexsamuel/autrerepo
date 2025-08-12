'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, MapPin, Clock, Briefcase, Star } from 'lucide-react';

export function NovaWorldJobs() {
  const featuredJobs = [
    {
      id: 1,
      title: 'Développeur Full-Stack Senior',
      company: 'DL Solutions',
      location: 'Douala, Cameroun',
      type: 'CDI',
      salary: '2.5M - 4M FCFA',
      posted: 'Il y a 2h',
      applicants: 24,
      verified: true,
      urgent: true
    },
    {
      id: 2,
      title: 'Marketing Digital Manager',
      company: 'Nova Hospitality',
      location: 'Yaoundé, Cameroun',
      type: 'CDI',
      salary: '1.8M - 3M FCFA',
      posted: 'Il y a 5h',
      applicants: 18,
      verified: true,
      urgent: false
    },
    {
      id: 3,
      title: 'Data Scientist',
      company: 'TechCorp Afrique',
      location: 'Abidjan, Côte d\'Ivoire',
      type: 'CDI',
      salary: '3M - 5M FCFA',
      posted: 'Il y a 1 jour',
      applicants: 31,
      verified: true,
      urgent: false
    },
    {
      id: 4,
      title: 'Chef de Projet IT',
      company: 'Digital Solutions',
      location: 'Dakar, Sénégal',
      type: 'CDI',
      salary: '2.2M - 3.5M FCFA',
      posted: 'Il y a 2 jours',
      applicants: 15,
      verified: false,
      urgent: false
    }
  ];

  return (
    <Card className="bg-white border-gray-200">
      <CardHeader className="pb-3">
        <h4 className="font-semibold text-gray-900 flex items-center">
          <Briefcase className="w-4 h-4 mr-2 text-blue-600" />
          Emplois Vedettes
        </h4>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {featuredJobs.map((job) => (
            <div key={job.id} className="border border-gray-100 rounded-lg p-3 hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900 text-sm mb-1">{job.title}</h5>
                  <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
                    <Building className="w-3 h-3" />
                    <span>{job.company}</span>
                    {job.verified && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs px-1 py-0">
                        ✓ Vérifié
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                    <MapPin className="w-3 h-3" />
                    <span>{job.location}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-green-600">{job.salary}</span>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{job.posted}</span>
                    </div>
                  </div>
                </div>
                {job.urgent && (
                  <Badge variant="destructive" className="text-xs">
                    Urgent
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-600">{job.applicants} candidats</span>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1">
                  Postuler
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-4 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600">
          Voir tous les emplois
        </Button>
      </CardContent>
    </Card>
  );
} 