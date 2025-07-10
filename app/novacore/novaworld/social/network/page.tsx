'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Search, Filter, UserPlus, Sparkles, Bot, TrendingUp, Star, Briefcase, Globe, MoreHorizontal } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Member {
  id: string;
  name: string;
  avatar: string;
  role: string;
  department: string;
  location: string;
  isOnline: boolean;
  isConnected: boolean;
  skills: string[];
  bio: string;
  connections: number;
  endorsements: number;
}

export default function NetworkPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [filterDept, setFilterDept] = useState('all');

  useEffect(() => {
    const mockMembers: Member[] = [
      {
        id: '1',
        name: 'Sarah Martin',
        avatar: '/images/avatars/sarah.jpg',
        role: 'Senior Developer',
        department: 'Tech',
        location: 'Paris',
        isOnline: true,
        isConnected: true,
        skills: ['React', 'Node.js', 'AI'],
        bio: 'Passionnée par l'IA et le développement web.',
        connections: 156,
        endorsements: 23
      },
      {
        id: '2',
        name: 'Alex Chen',
        avatar: '/images/avatars/alex.jpg',
        role: 'Marketing Manager',
        department: 'Marketing',
        location: 'Lyon',
        isOnline: false,
        isConnected: false,
        skills: ['SEO', 'Content', 'Analytics'],
        bio: 'Expert en campagnes digitales et SEO.',
        connections: 89,
        endorsements: 15
      },
      {
        id: '3',
        name: 'Marie Dubois',
        avatar: '/images/avatars/marie.jpg',
        role: 'HR Director',
        department: 'HR',
        location: 'Marseille',
        isOnline: true,
        isConnected: false,
        skills: ['Recruitment', 'Management', 'Coaching'],
        bio: 'Accompagne les talents et les équipes.',
        connections: 67,
        endorsements: 12
      },
      {
        id: '4',
        name: 'Pierre Martin',
        avatar: '/images/avatars/suggested-2.jpg',
        role: 'Data Scientist',
        department: 'Tech',
        location: 'Toulouse',
        isOnline: false,
        isConnected: true,
        skills: ['Python', 'ML', 'DataViz'],
        bio: 'Data, IA et visualisation.',
        connections: 45,
        endorsements: 8
      }
    ];
    setMembers(mockMembers);
  }, []);

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDept = filterDept === 'all' || member.department === filterDept;
    return matchesSearch && matchesDept;
  });

  const handleConnect = (memberId: string) => {
    setMembers(members.map(m =>
      m.id === memberId ? { ...m, isConnected: true } : m
    ));
    toast({
      title: "Invitation envoyée",
      description: "Demande de connexion envoyée avec succès.",
    });
  };

  // Suggestions IA (mock)
  const aiSuggestions = [
    'Connectez-vous avec Sarah pour des projets IA',
    'Alex peut vous aider sur le SEO',
    'Marie a des compétences en management d'équipe'
  ];

  // Statistiques réseau (mock)
  const stats = [
    { label: 'Membres', value: members.length, icon: Users },
    { label: 'Connectés', value: members.filter(m => m.isOnline).length, icon: TrendingUp },
    { label: 'Connexions', value: members.reduce((acc, m) => acc + m.connections, 0), icon: Star },
    { label: 'Recommandations', value: members.reduce((acc, m) => acc + m.endorsements, 0), icon: Briefcase }
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
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Réseau</h1>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Sparkles className="w-3 h-3 mr-1" />
                {members.length} membres
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Filter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-5 h-5" />
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
                placeholder="Rechercher un membre, une compétence..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="mr-4"
              />
              <select
                value={filterDept}
                onChange={e => setFilterDept(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm text-gray-700"
              >
                <option value="all">Tous les départements</option>
                <option value="Tech">Tech</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredMembers.map(member => (
                <Card key={member.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {member.role}
                          </Badge>
                          <span className="text-xs text-gray-500">{member.department} • {member.location}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 line-clamp-2">{member.bio}</p>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          #{skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span><Users className="w-4 h-4 inline mr-1" />{member.connections} connexions</span>
                      <span><Star className="w-4 h-4 inline mr-1" />{member.endorsements} recommandations</span>
                    </div>
                    {member.isConnected ? (
                      <Button variant="outline" className="w-full" disabled>
                        Connecté
                      </Button>
                    ) : (
                      <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => handleConnect(member.id)}>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Se connecter
                      </Button>
                    )}
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