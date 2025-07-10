'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import {
    Activity,
    BellOff,
    Crown,
    EyeOff,
    Filter,
    Globe,
    Grid,
    Image as ImageIcon,
    List,
    Lock,
    MessageCircle,
    MoreHorizontal,
    Plus,
    Search,
    Settings,
    Shield,
    Star,
    Target,
    TrendingUp,
    UserPlus,
    Users,
    Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface Group {
  id: string;
  name: string;
  description: string;
  avatar: string;
  coverImage: string;
  members: number;
  maxMembers: number;
  category: string;
  privacy: 'public' | 'private' | 'secret';
  createdAt: string;
  lastActivity: string;
  isAdmin: boolean;
  isModerator: boolean;
  isMember: boolean;
  isPinned: boolean;
  isMuted: boolean;
  rules: string[];
  tags: string[];
  stats: {
    posts: number;
    comments: number;
    likes: number;
    shares: number;
    activeMembers: number;
    growthRate: number;
  };
  recentPosts: {
    id: string;
    author: string;
    content: string;
    timestamp: string;
    likes: number;
    comments: number;
  }[];
  upcomingEvents: {
    id: string;
    title: string;
    date: string;
    attendees: number;
    maxAttendees: number;
  }[];
}

interface GroupCategory {
  id: string;
  name: string;
  icon: any;
  color: string;
  count: number;
}

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('my-groups');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Données simulées avancées
  useEffect(() => {
    const mockGroups: Group[] = [
      {
        id: '1',
        name: 'Innovation Hub',
        description: 'Espace de collaboration pour les projets innovants et les nouvelles technologies. Partagez vos idées, trouvez des partenaires et développez ensemble des solutions révolutionnaires.',
        avatar: '/images/groups/innovation.jpg',
        coverImage: '/images/groups/innovation-cover.jpg',
        members: 156,
        maxMembers: 500,
        category: 'Technology',
        privacy: 'public',
        createdAt: '2024-01-15',
        lastActivity: '2h ago',
        isAdmin: true,
        isModerator: false,
        isMember: true,
        isPinned: true,
        isMuted: false,
        rules: [
          'Respectez les autres membres',
          'Pas de spam ou de contenu commercial',
          'Partagez des idées constructives',
          'Utilisez les tags appropriés'
        ],
        tags: ['Innovation', 'Tech', 'AI', 'Startup', 'Collaboration'],
        stats: {
          posts: 234,
          comments: 1567,
          likes: 8923,
          shares: 445,
          activeMembers: 89,
          growthRate: 23
        },
        recentPosts: [
          {
            id: '1',
            author: 'Sarah Martin',
            content: 'Nouveau projet IA pour l\'optimisation des processus ! Qui veut collaborer ?',
            timestamp: '1h ago',
            likes: 24,
            comments: 8
          },
          {
            id: '2',
            author: 'Alex Chen',
            content: 'Hackathon Innovation prévu pour le mois prochain. Inscriptions ouvertes !',
            timestamp: '3h ago',
            likes: 18,
            comments: 12
          }
        ],
        upcomingEvents: [
          {
            id: '1',
            title: 'Hackathon Innovation 2024',
            date: '2024-03-15',
            attendees: 45,
            maxAttendees: 100
          },
          {
            id: '2',
            title: 'Workshop IA & Machine Learning',
            date: '2024-03-20',
            attendees: 23,
            maxAttendees: 50
          }
        ]
      },
      {
        id: '2',
        name: 'Marketing Masters',
        description: 'Communauté de professionnels du marketing digital. Échangez sur les meilleures pratiques, les tendances et les stratégies gagnantes.',
        avatar: '/images/groups/marketing.jpg',
        coverImage: '/images/groups/marketing-cover.jpg',
        members: 89,
        maxMembers: 200,
        category: 'Marketing',
        privacy: 'public',
        createdAt: '2024-02-01',
        lastActivity: '30 min ago',
        isAdmin: false,
        isModerator: true,
        isMember: true,
        isPinned: false,
        isMuted: false,
        rules: [
          'Contenu marketing uniquement',
          'Pas de promotion directe',
          'Partagez des études de cas',
          'Respectez la confidentialité'
        ],
        tags: ['Marketing', 'Digital', 'SEO', 'Social Media', 'Analytics'],
        stats: {
          posts: 156,
          comments: 892,
          likes: 3456,
          shares: 234,
          activeMembers: 67,
          growthRate: 15
        },
        recentPosts: [
          {
            id: '1',
            author: 'Marie Dubois',
            content: 'Nouvelle campagne Q4 : +40% de conversion grâce à l\'IA !',
            timestamp: '30 min ago',
            likes: 31,
            comments: 15
          }
        ],
        upcomingEvents: [
          {
            id: '1',
            title: 'Conférence Marketing Digital',
            date: '2024-03-25',
            attendees: 67,
            maxAttendees: 150
          }
        ]
      },
      {
        id: '3',
        name: 'Design & UX Community',
        description: 'Communauté de designers et UX/UI experts. Partagez vos créations, obtenez des feedbacks et découvrez les dernières tendances.',
        avatar: '/images/groups/design.jpg',
        coverImage: '/images/groups/design-cover.jpg',
        members: 234,
        maxMembers: 300,
        category: 'Design',
        privacy: 'public',
        createdAt: '2024-01-20',
        lastActivity: '1h ago',
        isAdmin: false,
        isModerator: false,
        isMember: true,
        isPinned: false,
        isMuted: true,
        rules: [
          'Partagez vos créations',
          'Donnez des feedbacks constructifs',
          'Respectez les droits d\'auteur',
          'Utilisez les tags appropriés'
        ],
        tags: ['Design', 'UX', 'UI', 'Creative', 'Prototyping'],
        stats: {
          posts: 445,
          comments: 2234,
          likes: 12345,
          shares: 678,
          activeMembers: 156,
          growthRate: 34
        },
        recentPosts: [
          {
            id: '1',
            author: 'Pierre Martin',
            content: 'Nouveau design system pour notre app mobile. Qu\'en pensez-vous ?',
            timestamp: '1h ago',
            likes: 45,
            comments: 23
          }
        ],
        upcomingEvents: [
          {
            id: '1',
            title: 'Design Sprint Workshop',
            date: '2024-03-18',
            attendees: 34,
            maxAttendees: 60
          }
        ]
      }
    ];

    setGroups(mockGroups);
    setSelectedGroup('1');
  }, []);

  const categories: GroupCategory[] = [
    { id: 'all', name: 'Tous', icon: Grid, color: 'bg-gray-500', count: groups.length },
    { id: 'technology', name: 'Technologie', icon: Zap, color: 'bg-blue-500', count: groups.filter(g => g.category === 'Technology').length },
    { id: 'marketing', name: 'Marketing', icon: TrendingUp, color: 'bg-green-500', count: groups.filter(g => g.category === 'Marketing').length },
    { id: 'design', name: 'Design', icon: ImageIcon, color: 'bg-purple-500', count: groups.filter(g => g.category === 'Design').length },
    { id: 'business', name: 'Business', icon: Target, color: 'bg-orange-500', count: 0 },
    { id: 'community', name: 'Communauté', icon: Users, color: 'bg-pink-500', count: 0 }
  ];

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || group.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const currentGroup = groups.find(g => g.id === selectedGroup);

  const handleJoinGroup = (groupId: string) => {
    setGroups(groups.map(group => 
      group.id === groupId 
        ? { ...group, isMember: true, members: group.members + 1 }
        : group
    ));
    toast({
      title: "Groupe rejoint",
      description: "Vous avez rejoint le groupe avec succès.",
    });
  };

  const handleLeaveGroup = (groupId: string) => {
    setGroups(groups.map(group => 
      group.id === groupId 
        ? { ...group, isMember: false, members: group.members - 1 }
        : group
    ));
    toast({
      title: "Groupe quitté",
      description: "Vous avez quitté le groupe.",
    });
  };

  const getPrivacyIcon = (privacy: string) => {
    switch (privacy) {
      case 'public':
        return <Globe className="w-4 h-4 text-green-600" />;
      case 'private':
        return <Lock className="w-4 h-4 text-orange-600" />;
      case 'secret':
        return <EyeOff className="w-4 h-4 text-red-600" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
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
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Groupes</h1>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Activity className="w-3 h-3 mr-1" />
                {groups.length} groupes
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
                {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
              </Button>
              <Button variant="ghost" size="icon">
                <Filter className="w-5 h-5" />
              </Button>
              <Button onClick={() => setShowCreateModal(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Créer un groupe
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar gauche - Catégories et filtres */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Recherche */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher des groupes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Catégories */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Catégories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-blue-50 border border-blue-200'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${category.color}`}>
                            <category.icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Statistiques rapides */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Mes Groupes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Groupes administrés</span>
                      <Badge className="bg-blue-600">{groups.filter(g => g.isAdmin).length}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Groupes modérés</span>
                      <Badge className="bg-green-600">{groups.filter(g => g.isModerator).length}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Membre actif</span>
                      <Badge className="bg-purple-600">{groups.filter(g => g.isMember).length}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="my-groups">Mes Groupes</TabsTrigger>
                <TabsTrigger value="discover">Découvrir</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="my-groups" className="space-y-6">
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGroups.filter(g => g.isMember).map(group => (
                      <Card key={group.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="relative">
                          <img 
                            src={group.coverImage} 
                            alt={group.name}
                            className="w-full h-32 object-cover rounded-t-lg"
                          />
                          <div className="absolute top-2 right-2">
                            {getPrivacyIcon(group.privacy)}
                          </div>
                          {group.isPinned && (
                            <div className="absolute top-2 left-2">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            </div>
                          )}
                        </div>
                        
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={group.avatar} />
                                <AvatarFallback>{group.name[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-lg">{group.name}</CardTitle>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge variant="outline" className="text-xs">
                                    {group.category}
                                  </Badge>
                                  {group.isAdmin && <Crown className="w-3 h-3 text-yellow-500" />}
                                  {group.isModerator && <Shield className="w-3 h-3 text-blue-500" />}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <p className="text-sm text-gray-600 line-clamp-2">{group.description}</p>
                          
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>{group.members} membres</span>
                            <span>Actif {group.lastActivity}</span>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {group.tags.slice(0, 3).map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Voir
                            </Button>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredGroups.filter(g => g.isMember).map(group => (
                      <Card key={group.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4">
                            <Avatar className="w-16 h-16">
                              <AvatarImage src={group.avatar} />
                              <AvatarFallback>{group.name[0]}</AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="text-lg font-semibold">{group.name}</h3>
                                  <p className="text-sm text-gray-600">{group.description}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {getPrivacyIcon(group.privacy)}
                                  {group.isPinned && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                                  {group.isMuted && <BellOff className="w-4 h-4 text-gray-400" />}
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-4 mt-2">
                                <Badge variant="outline">{group.category}</Badge>
                                <span className="text-sm text-gray-500">{group.members} membres</span>
                                <span className="text-sm text-gray-500">Actif {group.lastActivity}</span>
                                {group.isAdmin && <Badge className="bg-yellow-100 text-yellow-800">Admin</Badge>}
                                {group.isModerator && <Badge className="bg-blue-100 text-blue-800">Modérateur</Badge>}
                              </div>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <MessageCircle className="w-4 h-4 mr-2" />
                                Voir
                              </Button>
                              <Button variant="outline" size="sm">
                                <Settings className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="discover" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGroups.filter(g => !g.isMember).map(group => (
                    <Card key={group.id} className="hover:shadow-lg transition-shadow">
                      <div className="relative">
                        <img 
                          src={group.coverImage} 
                          alt={group.name}
                          className="w-full h-32 object-cover rounded-t-lg"
                        />
                        <div className="absolute top-2 right-2">
                          {getPrivacyIcon(group.privacy)}
                        </div>
                      </div>
                      
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={group.avatar} />
                            <AvatarFallback>{group.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{group.name}</CardTitle>
                            <Badge variant="outline" className="text-xs">
                              {group.category}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-sm text-gray-600 line-clamp-2">{group.description}</p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{group.members} membres</span>
                          <span>Créé {group.createdAt}</span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {group.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        <Button 
                          onClick={() => handleJoinGroup(group.id)}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          Rejoindre
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                {currentGroup && (
                  <>
                    {/* Statistiques principales */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Membres</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold text-blue-600">{currentGroup.stats.activeMembers}</div>
                          <p className="text-sm text-gray-600">+{currentGroup.stats.growthRate}% ce mois</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Posts</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold text-green-600">{currentGroup.stats.posts}</div>
                          <p className="text-sm text-gray-600">+12% cette semaine</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Engagement</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold text-purple-600">{currentGroup.stats.likes}</div>
                          <p className="text-sm text-gray-600">+8% ce mois</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Partages</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold text-orange-600">{currentGroup.stats.shares}</div>
                          <p className="text-sm text-gray-600">+15% ce mois</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Activité récente */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Activité récente</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {currentGroup.recentPosts.map(post => (
                            <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium text-sm">{post.author}</p>
                                <p className="text-sm text-gray-600 truncate">{post.content}</p>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>{post.timestamp}</span>
                                <span>{post.likes} likes</span>
                                <span>{post.comments} commentaires</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Événements à venir */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Événements à venir</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {currentGroup.upcomingEvents.map(event => (
                            <div key={event.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                              <div>
                                <p className="font-medium text-sm">{event.title}</p>
                                <p className="text-sm text-gray-600">{event.date}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">{event.attendees}/{event.maxAttendees}</p>
                                <p className="text-xs text-gray-500">participants</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
} 