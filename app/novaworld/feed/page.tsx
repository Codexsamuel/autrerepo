"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
    ArrowLeft,
    Calendar,
    Heart,
    Image,
    Link,
    MapPin,
    MessageCircle,
    MoreHorizontal,
    Send,
    Share2,
    Star,
    TrendingUp,
    Users,
    Video
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FeedPage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: "Marie Dubois",
        avatar: "/avatars/marie.jpg",
        title: "Directrice Marketing Digital",
        company: "TechCorp Solutions",
        verified: true
      },
      content: "Juste terminé le module IA pour entreprises de NovaWorld. Le contenu est exceptionnel ! Les cas pratiques et les outils fournis sont vraiment utiles pour implémenter l'IA dans nos processus. 🚀 #IA #Innovation #Formation",
      image: "/posts/ai-workshop.jpg",
      likes: 24,
      comments: 8,
      shares: 3,
      time: "2h",
      tags: ["IA", "Formation", "Innovation"],
      liked: false
    },
    {
      id: 2,
      author: {
        name: "Pierre Martin",
        avatar: "/avatars/pierre.jpg",
        title: "CTO & Co-fondateur",
        company: "InnovateLab",
        verified: true
      },
      content: "Nous recherchons un développeur React senior pour rejoindre notre équipe et travailler sur des projets innovants. Expérience en TypeScript et architecture microservices requise. Contactez-moi en MP ! #Recrutement #React #Tech",
      likes: 12,
      comments: 15,
      shares: 7,
      time: "4h",
      tags: ["Recrutement", "React", "Tech"],
      liked: true
    },
    {
      id: 3,
      author: {
        name: "Sophie Bernard",
        avatar: "/avatars/sophie.jpg",
        title: "Community Manager",
        company: "DigitalFlow Marketing",
        verified: false
      },
      content: "Nouveau webinar gratuit sur le marketing digital ce vendredi à 14h ! Nous parlerons des dernières tendances, des outils essentiels et des stratégies qui fonctionnent. Inscrivez-vous via le lien en bio ! 📈 #Marketing #Webinar #Digital",
      image: "/posts/webinar-marketing.jpg",
      likes: 31,
      comments: 22,
      shares: 12,
      time: "6h",
      tags: ["Webinar", "Marketing", "Digital"],
      liked: false
    },
    {
      id: 4,
      author: {
        name: "Alexandre Chen",
        avatar: "/avatars/alexandre.jpg",
        title: "Data Scientist",
        company: "GreenTech Solutions",
        verified: true
      },
      content: "Fier d'annoncer que notre projet d'IA pour l'optimisation énergétique a été sélectionné pour le Green Innovation Award 2024 ! Merci à toute l'équipe pour ce travail remarquable. 🌱 #IA #GreenTech #Innovation #Award",
      likes: 45,
      comments: 18,
      shares: 25,
      time: "8h",
      tags: ["IA", "GreenTech", "Award"],
      liked: false
    },
    {
      id: 5,
      author: {
        name: "Emma Rodriguez",
        avatar: "/avatars/emma.jpg",
        title: "UX/UI Designer",
        company: "FinTech Pro",
        verified: false
      },
      content: "Partage de ma dernière création : une interface bancaire moderne et accessible. L'objectif était de simplifier l'expérience utilisateur tout en gardant toutes les fonctionnalités essentielles. Qu'en pensez-vous ? 💳 #UX #UI #Design #FinTech",
      image: "/posts/banking-ui.jpg",
      likes: 67,
      comments: 34,
      shares: 18,
      time: "10h",
      tags: ["UX", "UI", "Design", "FinTech"],
      liked: true
    }
  ]);

  const [newPost, setNewPost] = useState("");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [trendingTopics, setTrendingTopics] = useState([
    { tag: "IA", count: 1247, trend: "up" },
    { tag: "Marketing", count: 892, trend: "up" },
    { tag: "Innovation", count: 756, trend: "up" },
    { tag: "Tech", count: 654, trend: "down" },
    { tag: "Formation", count: 543, trend: "up" }
  ]);

  const [suggestedConnections, setSuggestedConnections] = useState([
    {
      id: 1,
      name: "Thomas Moreau",
      avatar: "/avatars/thomas.jpg",
      title: "Product Manager",
      company: "HealthTech Innovations",
      mutualConnections: 3
    },
    {
      id: 2,
      name: "Julie Leroy",
      avatar: "/avatars/julie.jpg",
      title: "Business Analyst",
      company: "TechCorp Solutions",
      mutualConnections: 5
    },
    {
      id: 3,
      name: "David Kim",
      avatar: "/avatars/david.jpg",
      title: "Full Stack Developer",
      company: "InnovateLab",
      mutualConnections: 2
    }
  ]);

  const router = useRouter();

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now(),
        author: {
          name: "Vous",
          avatar: "/avatars/user.jpg",
          title: "Membre NovaWorld",
          company: "NovaWorld",
          verified: false
        },
        content: newPost,
        likes: 0,
        comments: 0,
        shares: 0,
        time: "Maintenant",
        tags: [],
        liked: false
      };
      setPosts([post, ...posts]);
      setNewPost("");
      setShowCreatePost(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => router.push("/novaworld")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Fil d'actualité</h1>
                <p className="text-sm text-gray-600">Restez connecté avec votre réseau</p>
              </div>
            </div>
            <Button onClick={() => setShowCreatePost(true)}>
              <MessageCircle className="w-4 h-4 mr-2" />
              Nouveau post
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            {showCreatePost && (
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src="/avatars/user.jpg" />
                        <AvatarFallback>VO</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">Créer un post</h3>
                        <p className="text-sm text-gray-600">Partagez avec votre réseau</p>
                      </div>
                    </div>
                    <Textarea
                      placeholder="Que souhaitez-vous partager ?"
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Image className="w-4 h-4 mr-2" />
                          Image
                        </Button>
                        <Button variant="outline" size="sm">
                          <Video className="w-4 h-4 mr-2" />
                          Vidéo
                        </Button>
                        <Button variant="outline" size="sm">
                          <Link className="w-4 h-4 mr-2" />
                          Lien
                        </Button>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" onClick={() => setShowCreatePost(false)}>
                          Annuler
                        </Button>
                        <Button onClick={handleCreatePost} disabled={!newPost.trim()}>
                          <Send className="w-4 h-4 mr-2" />
                          Publier
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Posts */}
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{post.author.name}</h3>
                          {post.author.verified && (
                            <Badge variant="outline" className="text-xs">
                              <Star className="w-3 h-3 mr-1" />
                              Vérifié
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{post.author.title} chez {post.author.company}</p>
                        <p className="text-xs text-gray-500">{post.time}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.content}</p>
                  
                  {post.image && (
                    <div className="mb-4">
                      <img 
                        src={post.image} 
                        alt={`Image du post de ${post.author.name}`} 
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex space-x-6">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleLike(post.id)}
                        className={post.liked ? "text-red-500" : ""}
                      >
                        <Heart className={`w-4 h-4 mr-2 ${post.liked ? "fill-current" : ""}`} />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        {post.shares}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Tendances</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <div>
                        <p className="font-medium text-sm">#{topic.tag}</p>
                        <p className="text-xs text-gray-600">{topic.count} posts</p>
                      </div>
                      <TrendingUp className={`w-4 h-4 ${topic.trend === "up" ? "text-green-500" : "text-red-500"}`} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Suggested Connections */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Connexions suggérées</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suggestedConnections.map((connection) => (
                    <div key={connection.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={connection.avatar} />
                        <AvatarFallback>{connection.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{connection.name}</h4>
                        <p className="text-xs text-gray-600">{connection.title}</p>
                        <p className="text-xs text-gray-500">{connection.company}</p>
                        <p className="text-xs text-blue-600">{connection.mutualConnections} connexions communes</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Connecter
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Événements à venir</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Conférence IA & Innovation</h4>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>15 Fév 2024 • 14:00</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>Paris, France</span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-2">
                      S'inscrire
                    </Button>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Workshop Marketing Digital</h4>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>18 Fév 2024 • 10:00</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>Lyon, France</span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-2">
                      S'inscrire
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}