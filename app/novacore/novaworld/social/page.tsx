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
    Bell,
    Bot,
    Hash,
    Heart,
    Image as ImageIcon,
    Link as LinkIcon,
    Lock,
    MessageCircle,
    MoreHorizontal,
    Plus,
    Search,
    Share2,
    Smile,
    TrendingUp,
    Users,
    Video,
    Zap
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: string;
    department: string;
  };
  content: string;
  image?: string;
  video?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  isLiked: boolean;
  tags: string[];
  visibility: 'public' | 'private' | 'department';
  engagement: {
    reach: number;
    impressions: number;
    clicks: number;
  };
}

interface Group {
  id: string;
  name: string;
  description: string;
  avatar: string;
  members: number;
  isMember: boolean;
  category: string;
  lastActivity: string;
}

export default function SocialPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [newPost, setNewPost] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('feed');
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Données simulées avancées
  useEffect(() => {
    const mockPosts: Post[] = [
      {
        id: '1',
        author: {
          id: '1',
          name: 'Sarah Martin',
          avatar: '/images/avatars/sarah.jpg',
          role: 'Senior Developer',
          department: 'Tech'
        },
        content: 'Just finished implementing our new AI-powered recommendation system! 🚀 The results are incredible - 40% increase in user engagement. Can\'t wait to share the technical details with the team.',
        image: '/images/posts/ai-system.jpg',
        likes: 24,
        comments: 8,
        shares: 3,
        timestamp: '2h ago',
        isLiked: false,
        tags: ['AI', 'Innovation', 'Tech'],
        visibility: 'public',
        engagement: {
          reach: 156,
          impressions: 89,
          clicks: 12
        }
      },
      {
        id: '2',
        author: {
          id: '2',
          name: 'Alex Chen',
          avatar: '/images/avatars/alex.jpg',
          role: 'Marketing Manager',
          department: 'Marketing'
        },
        content: 'Our Q4 campaign is live! 🎯 Check out the new landing page and let me know what you think. Special thanks to the design team for the amazing work.',
        likes: 18,
        comments: 5,
        shares: 2,
        timestamp: '4h ago',
        isLiked: true,
        tags: ['Marketing', 'Campaign', 'Design'],
        visibility: 'department',
        engagement: {
          reach: 89,
          impressions: 67,
          clicks: 8
        }
      },
      {
        id: '3',
        author: {
          id: '3',
          name: 'Marie Dubois',
          avatar: '/images/avatars/marie.jpg',
          role: 'HR Director',
          department: 'HR'
        },
        content: 'Welcome to our 5 new team members! 👋 We\'re excited to have you join our growing family. Don\'t forget to join the #newcomers group for tips and resources.',
        likes: 31,
        comments: 12,
        shares: 4,
        timestamp: '6h ago',
        isLiked: false,
        tags: ['Welcome', 'Team', 'HR'],
        visibility: 'public',
        engagement: {
          reach: 234,
          impressions: 156,
          clicks: 23
        }
      }
    ];

    const mockGroups: Group[] = [
      {
        id: '1',
        name: 'Innovation Hub',
        description: 'Share ideas, discuss new technologies, and collaborate on innovative projects',
        avatar: '/images/groups/innovation.jpg',
        members: 45,
        isMember: true,
        category: 'Technology',
        lastActivity: '2h ago'
      },
      {
        id: '2',
        name: 'Marketing Masters',
        description: 'Best practices, campaign strategies, and creative inspiration',
        avatar: '/images/groups/marketing.jpg',
        members: 32,
        isMember: true,
        category: 'Marketing',
        lastActivity: '1h ago'
      },
      {
        id: '3',
        name: 'Newcomers',
        description: 'Welcome space for new team members to connect and learn',
        avatar: '/images/groups/newcomers.jpg',
        members: 12,
        isMember: false,
        category: 'Community',
        lastActivity: '30m ago'
      }
    ];

    setPosts(mockPosts);
    setGroups(mockGroups);
  }, []);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const handleShare = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, shares: post.shares + 1 }
        : post
    ));
    toast({
      title: "Post partagé",
      description: "Le post a été partagé avec succès.",
    });
  };

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    const newPostObj: Post = {
      id: Date.now().toString(),
      author: {
        id: 'current-user',
        name: 'Vous',
        avatar: '/images/avatars/current-user.jpg',
        role: 'Utilisateur',
        department: 'Général'
      },
      content: newPost,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: 'Maintenant',
      isLiked: false,
      tags: [],
      visibility: 'public',
      engagement: {
        reach: 0,
        impressions: 0,
        clicks: 0
      }
    };

    setPosts([newPostObj, ...posts]);
    setNewPost('');
    toast({
      title: "Post créé",
      description: "Votre post a été publié avec succès.",
    });
  };

  const getEngagementScore = (post: Post) => {
    return Math.round((post.likes + post.comments * 2 + post.shares * 3) / 10);
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
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">NovaSocial</h1>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Activity className="w-3 h-3 mr-1" />
                En ligne
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher posts, personnes, groupes..."
                  className="pl-10 w-80"
                />
              </div>
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar gauche - Groupes */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Créer un post */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Créer un post</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/images/avatars/current-user.jpg" />
                      <AvatarFallback>VO</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Input
                        placeholder="Quoi de neuf ?"
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        className="mb-2"
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <ImageIcon className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Video className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <LinkIcon className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Smile className="w-4 h-4" />
                          </Button>
                        </div>
                        <Button onClick={handleCreatePost} disabled={!newPost.trim()}>
                          Publier
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Groupes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Mes Groupes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {groups.map(group => (
                      <div key={group.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={group.avatar} />
                          <AvatarFallback>{group.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{group.name}</p>
                          <p className="text-xs text-gray-500">{group.members} membres</p>
                        </div>
                        {group.isMember && (
                          <Badge variant="secondary" className="text-xs">Membre</Badge>
                        )}
                      </div>
                    ))}
                    <Button variant="outline" className="w-full" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Découvrir plus
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Suggestions IA */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Bot className="w-5 h-5 mr-2 text-purple-600" />
                    Suggestions IA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm font-medium text-purple-900">Connectez-vous avec Sarah</p>
                      <p className="text-xs text-purple-700">Vous travaillez sur des projets similaires</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Rejoignez Innovation Hub</p>
                      <p className="text-xs text-blue-700">Basé sur vos intérêts en IA</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="feed">Fil d'actualité</TabsTrigger>
                <TabsTrigger value="trending">Tendances</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="feed" className="space-y-6">
                {posts.map(post => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={post.author.avatar} />
                            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold">{post.author.name}</h3>
                              <Badge variant="outline" className="text-xs">
                                {post.author.role}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500">
                              {post.author.department} • {post.timestamp}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {post.visibility === 'private' && <Lock className="w-4 h-4 text-gray-400" />}
                          {post.visibility === 'department' && <Users className="w-4 h-4 text-gray-400" />}
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-gray-800 mb-4">{post.content}</p>
                      
                      {post.image && (
                        <div className="mb-4">
                          <img 
                            src={post.image} 
                            alt="Post content" 
                            className="w-full rounded-lg"
                          />
                        </div>
                      )}

                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Engagement metrics */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-4">
                          <span>{post.likes} j'aime</span>
                          <span>{post.comments} commentaires</span>
                          <span>{post.shares} partages</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Zap className="w-3 h-3" />
                          <span>Score: {getEngagementScore(post)}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex space-x-4">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleLike(post.id)}
                            className={post.isLiked ? 'text-red-500' : ''}
                          >
                            <Heart className={`w-4 h-4 mr-2 ${post.isLiked ? 'fill-current' : ''}`} />
                            J'aime
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Commenter
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleShare(post.id)}
                          >
                            <Share2 className="w-4 h-4 mr-2" />
                            Partager
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="trending" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
                      Tendances du jour
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Hash className="w-5 h-5 text-orange-600" />
                          <div>
                            <p className="font-medium">#Innovation</p>
                            <p className="text-sm text-gray-600">156 posts aujourd'hui</p>
                          </div>
                        </div>
                        <Badge variant="secondary">+23%</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Hash className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium">#TeamBuilding</p>
                            <p className="text-sm text-gray-600">89 posts aujourd'hui</p>
                          </div>
                        </div>
                        <Badge variant="secondary">+15%</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Hash className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-medium">#AI</p>
                            <p className="text-sm text-gray-600">67 posts aujourd'hui</p>
                          </div>
                        </div>
                        <Badge variant="secondary">+45%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Engagement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600">2,847</div>
                      <p className="text-sm text-gray-600">+12% ce mois</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Posts créés</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-600">156</div>
                      <p className="text-sm text-gray-600">+8% cette semaine</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Membres actifs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-purple-600">89%</div>
                      <p className="text-sm text-gray-600">+5% ce mois</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Activité par département</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Tech</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                          </div>
                          <span className="text-sm text-gray-600">75%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Marketing</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                          </div>
                          <span className="text-sm text-gray-600">60%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">HR</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                          </div>
                          <span className="text-sm text-gray-600">45%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar droite - Activité et suggestions */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Activité récente */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Activité récente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/images/avatars/sarah.jpg" />
                        <AvatarFallback>S</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">Sarah a aimé votre post</p>
                        <p className="text-xs text-gray-500">Il y a 5 min</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/images/avatars/alex.jpg" />
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">Alex a commenté</p>
                        <p className="text-xs text-gray-500">Il y a 15 min</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/images/avatars/marie.jpg" />
                        <AvatarFallback>M</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">Marie a rejoint Innovation Hub</p>
                        <p className="text-xs text-gray-500">Il y a 1h</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Suggestions de connexions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Suggestions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="/images/avatars/suggested-1.jpg" />
                        <AvatarFallback>J</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">Julie Dubois</p>
                        <p className="text-xs text-gray-500">Product Manager</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Connecter
                      </Button>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="/images/avatars/suggested-2.jpg" />
                        <AvatarFallback>P</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">Pierre Martin</p>
                        <p className="text-xs text-gray-500">Data Scientist</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Connecter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Événements à venir */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Événements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium text-sm text-blue-900">Hackathon Innovation</p>
                      <p className="text-xs text-blue-700">Demain, 14h</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="font-medium text-sm text-green-900">Team Building</p>
                      <p className="text-xs text-green-700">Vendredi, 16h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}