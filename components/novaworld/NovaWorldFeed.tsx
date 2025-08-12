'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  MoreHorizontal, 
  Image, 
  Video, 
  Calendar,
  MapPin,
  Building,
  Globe,
  ThumbsUp,
  Bookmark,
  Send,
  Smile,
  Hash
} from 'lucide-react';

export function NovaWorldFeed() {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: 'Samuel OBAM DAY',
        title: 'CEO & Fondateur chez DL Solutions',
        avatar: '/avatars/samuel.jpg',
        verified: true,
        company: 'DL Solutions',
        location: 'Douala, Cameroun'
      },
      content: 'Fier d\'annoncer le lancement de notre nouvelle plateforme NovaCore ! 🚀 Une solution complète pour la gestion d\'entreprise. #Innovation #Digital #Cameroun',
      time: 'Il y a 2h',
      likes: 89,
      comments: 23,
      shares: 12,
      isLiked: false,
      isBookmarked: false,
      tags: ['Innovation', 'Digital', 'Cameroun'],
      type: 'text'
    },
    {
      id: 2,
      author: {
        name: 'Marie NGUEMO',
        title: 'Directrice RH chez Nova Hospitality',
        avatar: '/avatars/marie.jpg',
        verified: true,
        company: 'Nova Hospitality',
        location: 'Yaoundé, Cameroun'
      },
      content: 'Nous recrutons ! 🎯 Rejoignez notre équipe dynamique et participez à la transformation du secteur hôtelier en Afrique. #Recrutement #Hospitality #Carrière',
      time: 'Il y a 5h',
      likes: 156,
      comments: 45,
      shares: 28,
      isLiked: true,
      isBookmarked: false,
      tags: ['Recrutement', 'Hospitality', 'Carrière'],
      type: 'text'
    },
    {
      id: 3,
      author: {
        name: 'Pierre ESSOMBA',
        title: 'Directeur Commercial chez AssurPro Cameroun',
        avatar: '/avatars/pierre.jpg',
        verified: true,
        company: 'AssurPro Cameroun',
        location: 'Douala, Cameroun'
      },
      content: 'L\'innovation dans l\'assurance passe par la digitalisation ! 💡 Nos nouveaux produits connectés révolutionnent l\'expérience client. #Assurance #Innovation #Digital',
      time: 'Il y a 1 jour',
      likes: 67,
      comments: 18,
      shares: 9,
      isLiked: false,
      isBookmarked: true,
      tags: ['Assurance', 'Innovation', 'Digital'],
      type: 'text'
    }
  ]);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleBookmark = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  const handleSubmitPost = () => {
    if (newPost.trim()) {
      const newPostObj = {
        id: posts.length + 1,
        author: {
          name: 'Samuel OBAM DAY',
          title: 'CEO & Fondateur chez DL Solutions',
          avatar: '/avatars/samuel.jpg',
          verified: true,
          company: 'DL Solutions',
          location: 'Douala, Cameroun'
        },
        content: newPost,
        time: 'À l\'instant',
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
        isBookmarked: false,
        tags: [],
        type: 'text'
      };
      setPosts([newPostObj, ...posts]);
      setNewPost('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Créer un Post */}
      <Card className="bg-white border-gray-200">
        <CardContent className="p-4">
          <div className="flex space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/avatars/samuel.jpg" alt="Samuel OBAM DAY" />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                SO
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Input
                placeholder="Partagez quelque chose avec votre réseau..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-xl"
              />
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                    <Image className="w-4 h-4 mr-2" />
                    Image
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                    <Video className="w-4 h-4 mr-2" />
                    Vidéo
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                    <Calendar className="w-4 h-4 mr-2" />
                    Événement
                  </Button>
                </div>
                <Button 
                  onClick={handleSubmitPost}
                  disabled={!newPost.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Publier
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts */}
      {posts.map((post) => (
        <Card key={post.id} className="bg-white border-gray-200 hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                    {post.author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900 text-sm">{post.author.name}</h3>
                    {post.author.verified && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs px-1 py-0">
                        ✓ Vérifié
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 text-xs">{post.author.title}</p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                    <Building className="w-3 h-3" />
                    <span>{post.author.company}</span>
                    <span>•</span>
                    <MapPin className="w-3 h-3" />
                    <span>{post.author.location}</span>
                    <span>•</span>
                    <span>{post.time}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            {/* Contenu du post */}
            <div className="mb-4">
              <p className="text-gray-900 text-sm leading-relaxed">{post.content}</p>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-blue-200 text-blue-700 hover:bg-blue-50">
                      <Hash className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Actions du post */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-6">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-2 ${
                    post.isLiked ? 'text-red-600 hover:text-red-700' : 'text-gray-600 hover:text-gray-700'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                  <span className="text-sm">{post.likes}</span>
                </Button>
                
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">{post.comments}</span>
                </Button>
                
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-600 hover:text-gray-700">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">{post.shares}</span>
                </Button>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleBookmark(post.id)}
                className={`text-gray-600 hover:text-gray-700 ${
                  post.isBookmarked ? 'text-blue-600' : ''
                }`}
              >
                <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Bouton Charger Plus */}
      <div className="text-center">
        <Button variant="outline" className="border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600">
          Charger plus de posts
        </Button>
      </div>
    </div>
  );
} 