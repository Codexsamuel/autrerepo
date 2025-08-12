"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Archive,
    Brain,
    Clock,
    Edit,
    FileText,
    Filter,
    Globe,
    Heart,
    Image,
    MessageCircle,
    Mic,
    MoreHorizontal,
    Phone,
    Plus,
    Send,
    Settings,
    Star,
    ThumbsDown,
    ThumbsUp,
    Trash2,
    TrendingUp,
    Users,
    Video
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file' | 'voice' | 'video';
  metadata?: {
    confidence?: number;
    suggestions?: string[];
    emotions?: string[];
    language?: string;
    responseTime?: number;
  };
  reactions?: {
    thumbsUp: number;
    thumbsDown: number;
    heart: number;
  };
}

interface ChatSession {
  id: string;
  title: string;
  participants: string[];
  lastMessage: string;
  lastActivity: Date;
  status: 'active' | 'archived' | 'pinned';
  tags: string[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

interface ChatAnalytics {
  totalConversations: number;
  averageResponseTime: number;
  satisfactionScore: number;
  languagesSupported: number;
  activeUsers: number;
  peakHours: string[];
  commonTopics: string[];
}

export default function ChatAgent() {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [analytics, setAnalytics] = useState<ChatAnalytics | null>(null);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      setAnalytics({
        totalConversations: 1247,
        averageResponseTime: 1.2,
        satisfactionScore: 4.8,
        languagesSupported: 12,
        activeUsers: 89,
        peakHours: ['09:00', '14:00', '19:00'],
        commonTopics: ['Support technique', 'Ventes', 'Informations produit', 'Facturation']
      });

      setSessions([
        {
          id: '1',
          title: 'Support Client - Tech Solutions',
          participants: ['Jean Dupont', 'Agent IA'],
          lastMessage: 'Merci pour votre aide, tout fonctionne parfaitement !',
          lastActivity: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
          status: 'active',
          tags: ['support', 'technique', 'client'],
          priority: 'medium'
        },
        {
          id: '2',
          title: 'Vente - Innovation Startup',
          participants: ['Marie Martin', 'Agent IA'],
          lastMessage: 'Pouvez-vous me donner plus de détails sur vos tarifs ?',
          lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2h ago
          status: 'active',
          tags: ['vente', 'prospection', 'lead'],
          priority: 'high'
        },
        {
          id: '3',
          title: 'Information Produit - Entreprise XYZ',
          participants: ['Pierre Durand', 'Agent IA'],
          lastMessage: 'Votre solution semble parfaite pour nos besoins',
          lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          status: 'archived',
          tags: ['information', 'produit', 'prospect'],
          priority: 'low'
        }
      ]);

      setSelectedSession('1');
      setIsLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (selectedSession) {
      // Simuler des messages pour la session sélectionnée
      const sessionMessages: ChatMessage[] = [
        {
          id: '1',
          role: 'user',
          content: 'Bonjour, j\'ai un problème avec votre application',
          timestamp: new Date(Date.now() - 1000 * 60 * 45),
          type: 'text',
          metadata: {
            language: 'fr',
            emotions: ['frustration']
          }
        },
        {
          id: '2',
          role: 'assistant',
          content: 'Bonjour ! Je suis désolé d\'entendre que vous rencontrez des difficultés. Pouvez-vous me décrire plus précisément le problème ?',
          timestamp: new Date(Date.now() - 1000 * 60 * 44),
          type: 'text',
          metadata: {
            confidence: 0.95,
            responseTime: 1.2,
            suggestions: ['Redémarrer l\'application', 'Vérifier la connexion', 'Contacter le support']
          },
          reactions: {
            thumbsUp: 1,
            thumbsDown: 0,
            heart: 0
          }
        },
        {
          id: '3',
          role: 'user',
          content: 'L\'application se bloque quand je clique sur le bouton de sauvegarde',
          timestamp: new Date(Date.now() - 1000 * 60 * 43),
          type: 'text',
          metadata: {
            language: 'fr',
            emotions: ['inquiétude']
          }
        },
        {
          id: '4',
          role: 'assistant',
          content: 'Je comprends le problème. C\'est un bug connu que nous avons identifié. Voici les étapes pour le résoudre :\n\n1. Fermez complètement l\'application\n2. Redémarrez votre appareil\n3. Relancez l\'application\n\nSi le problème persiste, je peux vous transférer vers un technicien spécialisé.',
          timestamp: new Date(Date.now() - 1000 * 60 * 42),
          type: 'text',
          metadata: {
            confidence: 0.98,
            responseTime: 2.1,
            suggestions: ['Contacter un technicien', 'Vérifier les mises à jour', 'Signaler le bug']
          },
          reactions: {
            thumbsUp: 2,
            thumbsDown: 0,
            heart: 1
          }
        }
      ];
      setMessages(sessionMessages);
    }
  }, [selectedSession]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
      type: 'text',
      metadata: {
        language: 'fr'
      }
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simuler la réponse de l'assistant
    setTimeout(() => {
      const response = generateAssistantResponse(inputValue);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateAssistantResponse = (userInput: string): ChatMessage => {
    const responses = [
      "Je comprends votre demande. Laissez-moi analyser cela pour vous.",
      "Excellente question ! Voici ce que je peux vous dire à ce sujet.",
      "Je vais vous aider à résoudre ce problème. Commençons par...",
      "Merci pour ces informations. Permettez-moi de vous proposer une solution.",
      "C'est un point très intéressant. Laissez-moi vous expliquer en détail."
    ];

    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date(),
      type: 'text',
      metadata: {
        confidence: 0.9 + Math.random() * 0.1,
        responseTime: 1.5 + Math.random() * 1.5,
        suggestions: ['Plus d\'informations', 'Documentation', 'Support technique']
      },
      reactions: {
        thumbsUp: 0,
        thumbsDown: 0,
        heart: 0
      }
    };
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'archived': return 'bg-gray-500';
      case 'pinned': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto"></div>
            <p className="text-white text-xl mt-4">Chargement de l'Agent de Chat...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* Header Premium */}
      <div className="bg-gradient-to-r from-blue-800/50 to-indigo-800/50 backdrop-blur-sm border-b border-blue-500/30">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">Agent de Chat Premium</h1>
                <p className="text-blue-200 text-lg">Communication intelligente & Support client avancé</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="border-blue-500 text-blue-300">
                <Star className="w-4 h-4 mr-1" />
                Premium
              </Badge>
              <Badge variant="outline" className="border-indigo-500 text-indigo-300">
                <Brain className="w-4 h-4 mr-1" />
                IA Avancée
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Métriques Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border-blue-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm font-medium">Conversations</p>
                  <p className="text-3xl font-bold text-white">{analytics?.totalConversations.toLocaleString()}</p>
                  <p className="text-blue-300 text-sm flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +15.3%
                  </p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <MessageCircle className="w-8 h-8 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-600/20 to-indigo-800/20 border-indigo-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-200 text-sm font-medium">Temps de Réponse</p>
                  <p className="text-3xl font-bold text-white">{analytics?.averageResponseTime}s</p>
                  <p className="text-indigo-300 text-sm flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    -12.5%
                  </p>
                </div>
                <div className="p-3 bg-indigo-500/20 rounded-xl">
                  <Clock className="w-8 h-8 text-indigo-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm font-medium">Satisfaction</p>
                  <p className="text-3xl font-bold text-white">{analytics?.satisfactionScore}/5</p>
                  <p className="text-purple-300 text-sm flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    +2.1%
                  </p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Star className="w-8 h-8 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-600/20 to-pink-800/20 border-pink-500/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-200 text-sm font-medium">Langues</p>
                  <p className="text-3xl font-bold text-white">{analytics?.languagesSupported}</p>
                  <p className="text-pink-300 text-sm flex items-center">
                    <Globe className="w-4 h-4 mr-1" />
                    +3 nouvelles
                  </p>
                </div>
                <div className="p-3 bg-pink-500/20 rounded-xl">
                  <Globe className="w-8 h-8 text-pink-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interface Principale */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-sm border-white/20">
            <TabsTrigger value="chat" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="sessions" className="data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300">
              <Users className="w-4 h-4 mr-2" />
              Sessions
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-300">
              <Settings className="w-4 h-4 mr-2" />
              Configuration
            </TabsTrigger>
          </TabsList>

          {/* Chat Principal */}
          <TabsContent value="chat" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Liste des Sessions */}
              <div className="lg:col-span-1">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <span>Sessions</span>
                      <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {sessions.map((session) => (
                        <div
                          key={session.id}
                          onClick={() => setSelectedSession(session.id)}
                          className={`p-3 rounded-lg cursor-pointer transition-all ${
                            selectedSession === session.id
                              ? 'bg-blue-500/20 border border-blue-500/30'
                              : 'bg-white/5 hover:bg-white/10 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-white font-medium text-sm truncate">{session.title}</h4>
                            <div className="flex items-center space-x-1">
                              <div className={`w-2 h-2 rounded-full ${getStatusColor(session.status)}`}></div>
                              <div className={`w-2 h-2 rounded-full ${getPriorityColor(session.priority)}`}></div>
                            </div>
                          </div>
                          <p className="text-gray-300 text-xs truncate mb-2">{session.lastMessage}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-xs">
                              {session.lastActivity.toLocaleTimeString()}
                            </span>
                            <div className="flex space-x-1">
                              {session.tags.slice(0, 2).map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs border-white/20 text-white">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Zone de Chat */}
              <div className="lg:col-span-3">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 h-[600px] flex flex-col">
                  <CardHeader className="border-b border-white/20">
                    <CardTitle className="text-white flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Support Client - Tech Solutions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                          <Phone className="w-4 h-4 mr-2" />
                          Appel
                        </Button>
                        <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                          <Video className="w-4 h-4 mr-2" />
                          Vidéo
                        </Button>
                        <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex-1 p-0">
                    <ScrollArea className="h-full p-4">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[70%] p-3 rounded-2xl ${
                                message.role === 'user'
                                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                                  : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs opacity-70">
                                  {message.timestamp.toLocaleTimeString()}
                                </span>
                                {message.role === 'assistant' && message.reactions && (
                                  <div className="flex items-center space-x-2">
                                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-white hover:bg-white/10">
                                      <ThumbsUp className="w-3 h-3" />
                                      <span className="ml-1 text-xs">{message.reactions.thumbsUp}</span>
                                    </Button>
                                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-white hover:bg-white/10">
                                      <ThumbsDown className="w-3 h-3" />
                                      <span className="ml-1 text-xs">{message.reactions.thumbsDown}</span>
                                    </Button>
                                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-white hover:bg-white/10">
                                      <Heart className="w-3 h-3" />
                                      <span className="ml-1 text-xs">{message.reactions.heart}</span>
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        {isTyping && (
                          <div className="flex justify-start">
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 text-white p-3 rounded-2xl">
                              <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>
                  </CardContent>

                  {/* Zone de Saisie */}
                  <div className="p-4 border-t border-white/20">
                    <div className="flex items-center space-x-3">
                      <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        <Image className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        <Mic className="w-4 h-4" />
                      </Button>
                      <Input
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Tapez votre message..."
                        className="flex-1 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-blue-500"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isTyping}
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Sessions */}
          <TabsContent value="sessions" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Gestion des Sessions</span>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtrer
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Nouvelle Session
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div key={session.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(session.status)}`}></div>
                          <h3 className="text-white font-semibold">{session.title}</h3>
                          <Badge variant="outline" className={`border-${getPriorityColor(session.priority).replace('bg-', '')} text-white`}>
                            {session.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                            <Archive className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <p className="text-gray-400">Participants</p>
                          <p className="text-white">{session.participants.join(', ')}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Dernière Activité</p>
                          <p className="text-white">{session.lastActivity.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Statut</p>
                          <p className="text-white capitalize">{session.status}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Priorité</p>
                          <p className="text-white capitalize">{session.priority}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {session.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="border-white/30 text-white">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
                    Performance des Conversations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                      <p className="text-purple-200">Graphique de performance</p>
                      <p className="text-purple-300 text-sm">Intégration Chart.js en cours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-400" />
                    Heures de Pointe
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics?.peakHours.map((hour, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <span className="text-white font-medium">{hour}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-blue-500/20 rounded-full h-2">
                            <div 
                              className="bg-blue-400 h-2 rounded-full" 
                              style={{ width: `${70 + Math.random() * 30}%` }}
                            ></div>
                          </div>
                          <span className="text-blue-300 text-sm">
                            {Math.round(70 + Math.random() * 30)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Configuration */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-pink-400" />
                  Configuration de l'Agent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-white font-semibold">Paramètres de Chat</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white">Réponse automatique</span>
                        <Button size="sm" variant="outline" className="border-green-500/30 text-green-300">
                          Activé
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white">Traduction automatique</span>
                        <Button size="sm" variant="outline" className="border-blue-500/30 text-blue-300">
                          Activé
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white">Analyse des émotions</span>
                        <Button size="sm" variant="outline" className="border-purple-500/30 text-purple-300">
                          Activé
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-white font-semibold">Intégrations</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white">Slack</span>
                        <Button size="sm" variant="outline" className="border-green-500/30 text-green-300">
                          Connecté
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white">Discord</span>
                        <Button size="sm" variant="outline" className="border-gray-500/30 text-gray-300">
                          Non connecté
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white">WhatsApp</span>
                        <Button size="sm" variant="outline" className="border-green-500/30 text-green-300">
                          Connecté
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 