'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, Search, Zap, MessageSquare, FileText, Image, Video } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AITool {
  id: string;
  name: string;
  description: string;
  category: 'text' | 'image' | 'video' | 'analysis';
  status: 'available' | 'maintenance' | 'beta';
  usage: number;
}

export default function OutilsIAPage() {
  const router = useRouter();
  const [tools, setTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ia/tools');
      if (response.ok) {
        const data = await response.json();
        setTools(data.tools || []);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des outils IA:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTools = tools.filter(tool =>
    (tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     tool.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (categoryFilter === '' || tool.category === categoryFilter)
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'text': return <MessageSquare className="h-6 w-6" />;
      case 'image': return <Image className="h-6 w-6" />;
      case 'video': return <Video className="h-6 w-6" />;
      case 'analysis': return <Brain className="h-6 w-6" />;
      default: return <Zap className="h-6 w-6" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'maintenance': return 'text-yellow-600 bg-yellow-100';
      case 'beta': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <span className="ml-4 text-gray-600">Chargement des outils IA...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Outils IA</h1>
          <p className="text-gray-600 mt-2">Accédez aux outils d'intelligence artificielle</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher un outil IA..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Toutes</SelectItem>
                <SelectItem value="text">Texte</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="video">Vidéo</SelectItem>
                <SelectItem value="analysis">Analyse</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredTools.length === 0 ? (
            <div className="text-center py-8">
              <Brain className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun outil trouvé</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || categoryFilter ? 'Aucun outil ne correspond à vos critères.' : 'Aucun outil IA disponible pour le moment.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <Card key={tool.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(tool.category)}
                        <span className="font-medium">{tool.name}</span>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(tool.status)}`}>
                        {tool.status === 'available' ? 'Disponible' : tool.status === 'maintenance' ? 'Maintenance' : 'Beta'}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{tool.usage} utilisations</span>
                      <Button size="sm" onClick={() => router.push(`/solutions/ia/outils/${tool.id}`)}>
                        Utiliser
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 