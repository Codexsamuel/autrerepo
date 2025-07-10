'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Upload, Search, Filter, Download, Eye, Sparkles, Bot, TrendingUp, Star, Users, MoreHorizontal } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'ppt' | 'xls' | 'img' | 'link';
  url: string;
  uploadedBy: string;
  uploaderAvatar: string;
  uploadedAt: string;
  downloads: number;
  views: number;
  tags: string[];
  description: string;
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const mockResources: Resource[] = [
      {
        id: '1',
        title: 'Guide IA 2024',
        type: 'pdf',
        url: '/docs/guide-ia-2024.pdf',
        uploadedBy: 'Sarah Martin',
        uploaderAvatar: '/images/avatars/sarah.jpg',
        uploadedAt: '2024-02-10',
        downloads: 56,
        views: 123,
        tags: ['IA', 'Guide', 'Tech'],
        description: "Un guide complet sur l'intelligence artificielle et ses applications."
      },
      {
        id: '2',
        title: 'Template Pitch Deck',
        type: 'ppt',
        url: '/docs/pitch-deck.pptx',
        uploadedBy: 'Alex Chen',
        uploaderAvatar: '/images/avatars/alex.jpg',
        uploadedAt: '2024-02-12',
        downloads: 34,
        views: 89,
        tags: ['Pitch', 'Startup', 'Design'],
        description: 'Modèle de présentation pour lever des fonds ou pitcher un projet.'
      },
      {
        id: '3',
        title: 'Checklist Onboarding',
        type: 'xls',
        url: '/docs/onboarding.xlsx',
        uploadedBy: 'Marie Dubois',
        uploaderAvatar: '/images/avatars/marie.jpg',
        uploadedAt: '2024-02-15',
        downloads: 12,
        views: 45,
        tags: ['Onboarding', 'RH', 'Checklist'],
        description: 'Checklist pour intégrer efficacement un nouveau collaborateur.'
      }
    ];
    setResources(mockResources);
  }, []);

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTab = activeTab === 'all' || resource.type === activeTab;
    return matchesSearch && matchesTab;
  });

  // Suggestions IA (mock)
  const aiSuggestions = [
    'Téléchargez le Guide IA pour booster vos projets',
    'Utilisez le Pitch Deck pour vos présentations',
    'La Checklist Onboarding facilite l'intégration des nouveaux'
  ];

  // Statistiques ressources (mock)
  const stats = [
    { label: 'Ressources', value: resources.length, icon: FileText },
    { label: 'Téléchargements', value: resources.reduce((acc, r) => acc + r.downloads, 0), icon: Download },
    { label: 'Vues', value: resources.reduce((acc, r) => acc + r.views, 0), icon: Eye },
    { label: 'Contributeurs', value: 3, icon: Users }
  ];

  const handleDownload = (resourceId: string) => {
    setResources(resources.map(r =>
      r.id === resourceId ? { ...r, downloads: r.downloads + 1 } : r
    ));
    toast({
      title: "Téléchargement lancé",
      description: "Votre téléchargement va commencer.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Ressources</h1>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Sparkles className="w-3 h-3 mr-1" />
                {resources.length} ressources
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Filter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Upload className="w-4 h-4 mr-2" />
                Ajouter une ressource
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
          {/* Sidebar gauche - Suggestions IA */}
          <div className="lg:col-span-1 space-y-8">
            {/* Suggestions IA */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bot className="w-5 h-5 mr-2 text-purple-600" />
                  Suggestions IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiSuggestions.map((s, i) => (
                    <div key={i} className="p-3 bg-purple-50 rounded-lg text-sm text-purple-900">
                      {s}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-3">
            <div className="flex items-center mb-6">
              <Input
                placeholder="Rechercher une ressource, un tag..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="mr-4"
              />
              <select
                value={activeTab}
                onChange={e => setActiveTab(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm text-gray-700"
              >
                <option value="all">Tous les types</option>
                <option value="pdf">PDF</option>
                <option value="doc">Word</option>
                <option value="ppt">PowerPoint</option>
                <option value="xls">Excel</option>
                <option value="img">Image</option>
                <option value="link">Lien</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredResources.map(resource => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={resource.uploaderAvatar} />
                        <AvatarFallback>{resource.uploadedBy[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {resource.uploadedBy}
                          </Badge>
                          <span className="text-xs text-gray-500">{resource.uploadedAt}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 line-clamp-2">{resource.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {resource.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span><Download className="w-4 h-4 inline mr-1" />{resource.downloads} téléchargements</span>
                      <span><Eye className="w-4 h-4 inline mr-1" />{resource.views} vues</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1" onClick={() => handleDownload(resource.id)}>
                        <Download className="w-4 h-4 mr-2" />
                        Télécharger
                      </Button>
                      <Button variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
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