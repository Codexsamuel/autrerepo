"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  MessageCircle,
  Bot,
  Users,
  Zap,
  Crown,
  Star,
  Send,
  Phone,
  Video,
  FileText,
  Image,
  Mic,
  Smile,
  Settings,
  Brain,
  Sparkles,
  Globe,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
  Archive,
  Star as StarIcon,
  MessageSquare,
  Mail,
  Smartphone,
  Monitor,
  Headphones,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  RefreshCw,
  BarChart,
  PieChart,
  LineChart,
  Map,
  Target,
  Users as UsersIcon,
  DollarSign,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  X,
  HardDrive,
  Database,
  Shield,
  Key,
  Fingerprint,
  UserCheck,
  UserX,
  Calendar,
  Clock as ClockIcon,
  MapPin,
  Tag,
  Hash,
  Hash as HashIcon,
  Hash as HashIcon2,
  Hash as HashIcon3,
  Hash as HashIcon4,
  Hash as HashIcon5,
  Hash as HashIcon6,
  Hash as HashIcon7,
  Hash as HashIcon8,
  Hash as HashIcon9,
  Hash as HashIcon10
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

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
    intent?: string;
    entities?: string[];
    source?: string;
    citations?: string[];
  };
  reactions?: {
    thumbsUp: number;
    thumbsDown: number;
    heart: number;
  };
  channel?: 'web' | 'whatsapp' | 'email' | 'voice';
  sentiment?: 'positive' | 'negative' | 'neutral';
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
  channel: 'web' | 'whatsapp' | 'email' | 'voice';
  customerValue: number;
  satisfaction: number;
}

interface ChatAnalytics {
  totalConversations: number;
  averageResponseTime: number;
  satisfactionScore: number;
  languagesSupported: number;
  activeUsers: number;
  peakHours: string[];
  commonTopics: string[];
  deflectionRate: number;
  resolutionRate: number;
  avgHandleTime: number;
}

interface RAGDocument {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  lastUpdated: Date;
  relevance: number;
  source: string;
}

interface NLPAnalysis {
  intent: string;
  confidence: number;
  entities: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
  language: string;
  topics: string[];
  urgency: 'low' | 'medium' | 'high';
}

export default function ChatAgentPremium() {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [analytics, setAnalytics] = useState<ChatAnalytics | null>(null);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ragDocuments, setRagDocuments] = useState<RAGDocument[]>([]);
  const [nlpAnalysis, setNlpAnalysis] = useState<NLPAnalysis | null>(null);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
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
        commonTopics: ['Support technique', 'Ventes', 'Informations produit', 'Facturation'],
        deflectionRate: 87.3,
        resolutionRate: 92.1,
        avgHandleTime: 3.2
      });

      setSessions([
        {
          id: '1',
          title: 'Support Client - Tech Solutions',
          participants: ['Jean Dupont', 'Agent IA'],
          lastMessage: 'Merci pour votre aide, tout fonctionne parfaitement !',
          lastActivity: new Date(Date.now() - 1000 * 60 * 30),
          status: 'active',
          tags: ['support', 'technique', 'client'],
          priority: 'medium',
          channel: 'web',
          customerValue: 15000,
          satisfaction: 5
        },
        {
          id: '2',
          title: 'Vente - Innovation Startup',
          participants: ['Marie Martin', 'Agent IA'],
          lastMessage: 'Pouvez-vous me donner plus de détails sur vos tarifs ?',
          lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 2),
          status: 'active',
          tags: ['vente', 'prospection', 'lead'],
          priority: 'high',
          channel: 'whatsapp',
          customerValue: 25000,
          satisfaction: 4
        }
      ]);

      setRagDocuments([
        {
          id: 'DOC001',
          title: 'Politique de remboursement',
          content: 'Les remboursements sont traités sous 5-7 jours ouvrables...',
          category: 'policies',
          tags: ['remboursement', 'politique', 'client'],
          lastUpdated: new Date(),
          relevance: 0.95,
          source: 'internal'
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
            emotions: ['frustration'],
            intent: 'support_request',
            entities: ['application'],
            source: 'web'
          },
          channel: 'web',
          sentiment: 'negative'
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
            suggestions: ['Redémarrer l\'application', 'Vérifier la connexion', 'Contacter le support'],
            intent: 'clarification_request',
            source: 'rag_local'
          },
          reactions: {
            thumbsUp: 1,
            thumbsDown: 0,
            heart: 0
          },
          channel: 'web',
          sentiment: 'neutral'
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
        language: 'fr',
        intent: 'user_input'
      },
      channel: 'web'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simuler l'analyse NLP locale
    const analysis: NLPAnalysis = {
      intent: 'support_request',
      confidence: 0.89,
      entities: ['application', 'problème'],
      sentiment: 'negative',
      language: 'fr',
      topics: ['support', 'technique'],
      urgency: 'medium'
    };
    setNlpAnalysis(analysis);

    // Simuler la réponse de l'assistant avec RAG local
    setTimeout(() => {
      const response = generateAssistantResponse(inputValue, analysis);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateAssistantResponse = (userInput: string, analysis: NLPAnalysis): ChatMessage => {
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
        suggestions: ['Plus d\'informations', 'Documentation', 'Support technique'],
        intent: analysis.intent,
        source: 'rag_local',
        citations: ['DOC001']
      },
      reactions: {
        thumbsUp: 0,
        thumbsDown: 0,
        heart: 0
      },
      channel: 'web',
      sentiment: 'positive'
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

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'web': return <Monitor className="w-4 h-4" />;
      case 'whatsapp': return <Smartphone className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      case 'voice': return <Phone className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto"></div>
            <p className="text-white text-xl mt-4">Chargement de l'Agent de Chat Premium...</p>
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
                <h1 className="text-4xl font-bold text-white">Support IA Unifié</h1>
                <p className="text-blue-200 text-lg">NLP offline, RAG local & Multi-canal intelligent</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="border-blue-500 text-blue-300">
                <Star className="w-4 h-4 mr-1" />
                Premium
              </Badge>
              <Badge variant="outline" className="border-indigo-500 text-indigo-300">
                <Brain className="w-4 h-4 mr-1" />
                NLP Local
              </Badge>
              <Badge variant="outline" className="border-purple-500 text-purple-300">
                <Database className="w-4 h-4 mr-1" />
                RAG Offline
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
                  <p className="text-indigo-200 text-sm font-medium">Déflection</p>
                  <p className="text-3xl font-bold text-white">{analytics?.deflectionRate}%</p>
                  <p className="text-indigo-300 text-sm flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +8.7%
                  </p>
                </div>
                <div className="p-3 bg-indigo-500/20 rounded-xl">
                  <Target className="w-8 h-8 text-indigo-400" />
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

        {/* Tabs Principaux */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-sm border border-white/20">
            <TabsTrigger value="chat" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat Multi-canal
            </TabsTrigger>
            <TabsTrigger value="sessions" className="data-[state=active]:bg-indigo-500/20 data-[state=active]:text-indigo-300">
              <Users className="w-4 h-4 mr-2" />
              Sessions
            </TabsTrigger>
            <TabsTrigger value="rag" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-300">
              <Database className="w-4 h-4 mr-2" />
              RAG Local
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-pink-500/20 data-[state=active]:text-pink-300">
              <BarChart className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Chat Multi-canal */}
          <TabsContent value="chat" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sessions actives */}
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Sessions Actives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {sessions.slice(0, 5).map((session) => (
                      <div 
                        key={session.id}
                        className={`p-3 rounded cursor-pointer transition-all ${
                          selectedSession === session.id 
                            ? 'bg-blue-500/20 border border-blue-500/30' 
                            : 'bg-white/5 hover:bg-white/10'
                        }`}
                        onClick={() => setSelectedSession(session.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-medium text-sm truncate">{session.title}</h4>
                          <div className="flex items-center space-x-2">
                            {getChannelIcon(session.channel)}
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(session.priority)}`}></div>
                          </div>
                        </div>
                        <p className="text-white/60 text-xs truncate mb-2">{session.lastMessage}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-white/40">{session.lastActivity.toLocaleTimeString()}</span>
                          <div className="flex items-center space-x-1">
                            <span className="text-white/60">Satisfaction:</span>
                            <span className="text-yellow-400">{session.satisfaction}/5</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Zone de chat */}
              <Card className="lg:col-span-2 bg-white/10 backdrop-blur-sm border border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span>Conversation</span>
                    {selectedSession && (
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="border-white/20 text-white/60">
                          {sessions.find(s => s.id === selectedSession)?.channel}
                        </Badge>
                        <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                          <Phone className="w-4 h-4 mr-1" />
                          Appel
                        </Button>
                        <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                          <Video className="w-4 h-4 mr-1" />
                          Vidéo
                        </Button>
                      </div>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 flex flex-col">
                    {/* Messages */}
                    <ScrollArea className="flex-1 mb-4">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                                message.role === 'user'
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-white/10 text-white'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              {message.metadata?.citations && (
                                <div className="mt-2 text-xs opacity-70">
                                  Sources: {message.metadata.citations.join(', ')}
                                </div>
                              )}
                              <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                                <span>{message.timestamp.toLocaleTimeString()}</span>
                                {message.role === 'assistant' && (
                                  <div className="flex items-center space-x-1">
                                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                      <ThumbsUp className="w-3 h-3" />
                                    </Button>
                                    <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                      <ThumbsDown className="w-3 h-3" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        {isTyping && (
                          <div className="flex justify-start">
                            <div className="bg-white/10 text-white p-3 rounded-lg">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>

                    {/* Input avec analyse NLP */}
                    <div className="space-y-3">
                      {nlpAnalysis && (
                        <div className="p-3 bg-white/5 rounded border border-white/10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white/80 text-sm">Analyse NLP Locale</span>
                            <Badge variant="outline" className="border-green-500/30 text-green-300 text-xs">
                              Offline
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-white/60">Intent:</span>
                              <span className="text-white ml-1">{nlpAnalysis.intent}</span>
                            </div>
                            <div>
                              <span className="text-white/60">Confiance:</span>
                              <span className="text-white ml-1">{(nlpAnalysis.confidence * 100).toFixed(0)}%</span>
                            </div>
                            <div>
                              <span className="text-white/60">Sentiment:</span>
                              <span className="text-white ml-1">{nlpAnalysis.sentiment}</span>
                            </div>
                            <div>
                              <span className="text-white/60">Urgence:</span>
                              <span className="text-white ml-1">{nlpAnalysis.urgency}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <Input
                          ref={inputRef}
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Tapez votre message..."
                          className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                        <Button
                          onClick={() => setIsRecording(!isRecording)}
                          variant={isRecording ? "destructive" : "outline"}
                          size="sm"
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          <Mic className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={handleSendMessage}
                          disabled={!inputValue.trim() || isTyping}
                          className="bg-blue-500 hover:bg-blue-600"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Sessions */}
          <TabsContent value="sessions" className="mt-6">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Gestion des Sessions</span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                      <Filter className="w-4 h-4 mr-1" />
                      Filtrer
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                      <Plus className="w-4 h-4 mr-1" />
                      Nouvelle
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
                          <h3 className="text-white font-semibold">{session.title}</h3>
                          <Badge className={`${getStatusColor(session.status)} text-white`}>
                            {session.status}
                          </Badge>
                          <Badge className={`${getPriorityColor(session.priority)} text-white`}>
                            {session.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getChannelIcon(session.channel)}
                          <span className="text-white/60 text-sm">{session.channel}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-white/60 text-sm">Participants</p>
                          <p className="text-white">{session.participants.join(', ')}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Valeur Client</p>
                          <p className="text-white">{session.customerValue.toLocaleString()}€</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Satisfaction</p>
                          <p className="text-white">{session.satisfaction}/5</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Dernière Activité</p>
                          <p className="text-white">{session.lastActivity.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {session.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="border-white/20 text-white/60">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                            <Eye className="w-4 h-4 mr-1" />
                            Voir
                          </Button>
                          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                            <Edit className="w-4 h-4 mr-1" />
                            Éditer
                          </Button>
                          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                            <Archive className="w-4 h-4 mr-1" />
                            Archiver
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* RAG Local */}
          <TabsContent value="rag" className="mt-6">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>Base de Connaissances RAG Locale</span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                      <Plus className="w-4 h-4 mr-1" />
                      Ajouter Document
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Indexer
                    </Button>
                  </div>
                </CardTitle>
                <p className="text-white/60">Base de connaissances locale avec embeddings et recherche vectorielle</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ragDocuments.map((doc) => (
                    <div key={doc.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-semibold">{doc.title}</h3>
                        <Badge variant="outline" className="border-green-500/30 text-green-300">
                          <Database className="w-3 h-3 mr-1" />
                          Local
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-white/60 text-sm">Catégorie</p>
                          <p className="text-white">{doc.category}</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Pertinence</p>
                          <p className="text-white">{(doc.relevance * 100).toFixed(0)}%</p>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm">Source</p>
                          <p className="text-white">{doc.source}</p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-white/60 text-sm mb-2">Tags</p>
                        <div className="flex flex-wrap gap-2">
                          {doc.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="border-white/20 text-white/60">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-white/60 text-sm">
                          Dernière mise à jour: {doc.lastUpdated.toLocaleDateString()}
                        </p>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                            <Eye className="w-4 h-4 mr-1" />
                            Voir
                          </Button>
                          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                            <Edit className="w-4 h-4 mr-1" />
                            Éditer
                          </Button>
                          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                            <Trash2 className="w-4 h-4 mr-1" />
                            Supprimer
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Métriques de performance */}
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Métriques de Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Temps de réponse moyen</span>
                      <span className="text-white font-semibold">{analytics?.averageResponseTime}s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Taux de résolution</span>
                      <span className="text-white font-semibold">{analytics?.resolutionRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Temps de traitement moyen</span>
                      <span className="text-white font-semibold">{analytics?.avgHandleTime}min</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Heures de pointe */}
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Heures de Pointe</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analytics?.peakHours.map((hour, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded">
                        <span className="text-white">{hour}</span>
                        <div className="w-20 bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${70 + (index * 10)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 