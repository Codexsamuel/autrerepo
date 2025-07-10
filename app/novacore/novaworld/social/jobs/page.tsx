'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Bookmark, Briefcase, Building, CheckCircle, Clock, DollarSign, Eye, Filter, MapPin, Plus, Send, Share2, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary: string;
  experience: string;
  description: string;
  requirements: string[];
  postedAt: string;
  applications: number;
  isBookmarked: boolean;
  isApplied: boolean;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const mockJobs: Job[] = [
      {
        id: '1',
        title: 'Senior React Developer',
        company: 'DL Solutions',
        companyLogo: '/images/logo.png',
        location: 'Paris, France',
        type: 'full-time',
        salary: '60k-80k €',
        experience: '3-5 ans',
        description: 'Nous recherchons un développeur React senior pour rejoindre notre équipe et contribuer à des projets innovants.',
        requirements: ['React', 'TypeScript', 'Node.js', 'Git'],
        postedAt: '2 jours',
        applications: 24,
        isBookmarked: false,
        isApplied: false
      },
      {
        id: '2',
        title: 'Marketing Digital Manager',
        company: 'TechCorp',
        companyLogo: '/images/companies/techcorp.png',
        location: 'Lyon, France',
        type: 'full-time',
        salary: '45k-60k €',
        experience: '2-4 ans',
        description: 'Gestion des campagnes marketing digital et optimisation des performances.',
        requirements: ['Google Ads', 'Facebook Ads', 'Analytics', 'SEO'],
        postedAt: '1 semaine',
        applications: 18,
        isBookmarked: true,
        isApplied: true
      },
      {
        id: '3',
        title: 'Data Scientist',
        company: 'AI Solutions',
        companyLogo: '/images/companies/ai-solutions.png',
        location: 'Marseille, France',
        type: 'contract',
        salary: '70k-90k €',
        experience: '4-6 ans',
        description: 'Développement de modèles IA et analyse de données complexes.',
        requirements: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
        postedAt: '3 jours',
        applications: 31,
        isBookmarked: false,
        isApplied: false
      }
    ];
    setJobs(mockJobs);
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || job.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleApply = (jobId: string) => {
    setJobs(jobs.map(job =>
      job.id === jobId ? { ...job, isApplied: true, applications: job.applications + 1 } : job
    ));
    toast({
      title: "Candidature envoyée",
      description: "Votre candidature a été envoyée avec succès.",
    });
  };

  const handleBookmark = (jobId: string) => {
    setJobs(jobs.map(job =>
      job.id === jobId ? { ...job, isBookmarked: !job.isBookmarked } : job
    ));
    toast({
      title: "Offre sauvegardée",
      description: "L'offre a été ajoutée à vos favoris.",
    });
  };

  // Statistiques emplois (mock)
  const stats = [
    { label: 'Offres actives', value: jobs.length, icon: Briefcase },
    { label: 'Candidatures', value: jobs.reduce((acc, j) => acc + j.applications, 0), icon: Users },
    { label: 'Entreprises', value: 15, icon: Building },
    { label: 'Taux de placement', value: '85%', icon: TrendingUp }
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
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Emplois</h1>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <TrendingUp className="w-3 h-3 mr-1" />
                {jobs.length} offres actives
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Filter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bookmark className="w-5 h-5" />
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Publier une offre
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar gauche - Filtres */}
          <div className="lg:col-span-1 space-y-8">
            {/* Filtres par type */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Type de contrat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant={filterType === 'all' ? 'default' : 'outline'} 
                    className="w-full justify-start"
                    onClick={() => setFilterType('all')}
                  >
                    Tous les types
                  </Button>
                  <Button 
                    variant={filterType === 'full-time' ? 'default' : 'outline'} 
                    className="w-full justify-start"
                    onClick={() => setFilterType('full-time')}
                  >
                    Temps plein
                  </Button>
                  <Button 
                    variant={filterType === 'part-time' ? 'default' : 'outline'} 
                    className="w-full justify-start"
                    onClick={() => setFilterType('part-time')}
                  >
                    Temps partiel
                  </Button>
                  <Button 
                    variant={filterType === 'contract' ? 'default' : 'outline'} 
                    className="w-full justify-start"
                    onClick={() => setFilterType('contract')}
                  >
                    Contrat
                  </Button>
                  <Button 
                    variant={filterType === 'internship' ? 'default' : 'outline'} 
                    className="w-full justify-start"
                    onClick={() => setFilterType('internship')}
                  >
                    Stage
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Bookmark className="w-4 h-4 mr-2" />
                    Offres sauvegardées
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Send className="w-4 h-4 mr-2" />
                    Mes candidatures
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="w-4 h-4 mr-2" />
                    Profil visible
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-3">
            <div className="flex items-center mb-6">
              <Input
                placeholder="Rechercher un emploi, une entreprise..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="mr-4"
              />
              <select
                value={activeTab}
                onChange={e => setActiveTab(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm text-gray-700"
              >
                <option value="all">Tous les emplois</option>
                <option value="recent">Récents</option>
                <option value="popular">Populaires</option>
                <option value="remote">Télétravail</option>
              </select>
            </div>

            <div className="space-y-6">
              {filteredJobs.map(job => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={job.companyLogo} />
                          <AvatarFallback>{job.company[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold">{job.title}</h3>
                          <p className="text-gray-600">{job.company}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {job.location}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {job.postedAt}
                            </span>
                            <span className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-1" />
                              {job.salary}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{job.type}</Badge>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleBookmark(job.id)}
                        >
                          <Bookmark className={`w-4 h-4 ${job.isBookmarked ? 'fill-current text-blue-600' : ''}`} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{job.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map(req => (
                        <Badge key={req} variant="secondary" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{job.applications} candidatures</span>
                        <span>Expérience: {job.experience}</span>
                      </div>
                      <div className="flex space-x-2">
                        {job.isApplied ? (
                          <Button variant="outline" disabled>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Candidature envoyée
                          </Button>
                        ) : (
                          <Button 
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => handleApply(job.id)}
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Postuler
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}