'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    BellOff,
    Bot,
    Check,
    CheckCheck,
    Clock,
    Filter,
    Image as ImageIcon,
    MessageCircle,
    Mic,
    MoreHorizontal,
    Paperclip,
    Phone,
    Search,
    Send,
    Smile,
    Sparkles,
    Star,
    Users,
    Video,
    Zap
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
  };
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'file' | 'voice';
  isOwn: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  isGroup: boolean;
  members?: string[];
  isPinned: boolean;
  isMuted: boolean;
}

interface Group {
  id: string;
  name: string;
  avatar: string;
  description: string;
  members: number;
  lastActivity: string;
  isAdmin: boolean;
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('chats');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Données simulées avancées
  useEffect(() => {
    const mockConversations: Conversation[] = [
      {
        id: '1',
        name: 'Sarah Martin',
        avatar: '/images/avatars/sarah.jpg',
        lastMessage: 'Salut ! J\'ai regardé ton code, c\'est vraiment bien fait 👏',
        lastMessageTime: '2 min',
        unreadCount: 2,
        isOnline: true,
        isGroup: false,
        isPinned: true,
        isMuted: false
      },
      {
        id: '2',
        name: 'Innovation Hub',
        avatar: '/images/groups/innovation.jpg',
        lastMessage: 'Marie: Le hackathon est confirmé pour demain !',
        lastMessageTime: '15 min',
        unreadCount: 0,
        isOnline: false,
        isGroup: true,
        members: ['Sarah', 'Alex', 'Marie', 'Pierre'],
        isPinned: false,
        isMuted: false
      },
      {
        id: '3',
        name: 'Alex Chen',
        avatar: '/images/avatars/alex.jpg',
        lastMessage: 'Parfait, on se voit demain pour la présentation',
        lastMessageTime: '1h',
        unreadCount: 0,
        isOnline: false,
        isGroup: false,
        isPinned: false,
        isMuted: true
      },
      {
        id: '4',
        name: 'Support Technique',
        avatar: '/images/avatars/support.jpg',
        lastMessage: 'Votre ticket #1234 a été résolu',
        lastMessageTime: '2h',
        unreadCount: 1,
        isOnline: true,
        isGroup: false,
        isPinned: false,
        isMuted: false
      }
    ];

    const mockMessages: Message[] = [
      {
        id: '1',
        content: 'Salut ! Comment ça va ?',
        sender: {
          id: 'other',
          name: 'Sarah Martin',
          avatar: '/images/avatars/sarah.jpg',
          isOnline: true
        },
        timestamp: '14:30',
        status: 'read',
        type: 'text',
        isOwn: false
      },
      {
        id: '2',
        content: 'Très bien merci ! J\'ai fini l\'implémentation du système de recommandation IA',
        sender: {
          id: 'me',
          name: 'Vous',
          avatar: '/images/avatars/current-user.jpg',
          isOnline: true
        },
        timestamp: '14:32',
        status: 'read',
        type: 'text',
        isOwn: true
      },
      {
        id: '3',
        content: 'Wow, c\'est impressionnant ! Peux-tu me montrer le code ?',
        sender: {
          id: 'other',
          name: 'Sarah Martin',
          avatar: '/images/avatars/sarah.jpg',
          isOnline: true
        },
        timestamp: '14:35',
        status: 'read',
        type: 'text',
        isOwn: false
      },
      {
        id: '4',
        content: 'Bien sûr ! Je vais te partager le repo GitHub',
        sender: {
          id: 'me',
          name: 'Vous',
          avatar: '/images/avatars/current-user.jpg',
          isOnline: true
        },
        timestamp: '14:36',
        status: 'delivered',
        type: 'text',
        isOwn: true
      },
      {
        id: '5',
        content: 'Parfait ! J\'ai regardé ton code, c\'est vraiment bien fait 👏',
        sender: {
          id: 'other',
          name: 'Sarah Martin',
          avatar: '/images/avatars/sarah.jpg',
          isOnline: true
        },
        timestamp: '14:40',
        status: 'sent',
        type: 'text',
        isOwn: false
      }
    ];

    setConversations(mockConversations);
    setMessages(mockMessages);
    setSelectedConversation('1');
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const newMessageObj: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: {
        id: 'me',
        name: 'Vous',
        avatar: '/images/avatars/current-user.jpg',
        isOnline: true
      },
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
      type: 'text',
      isOwn: true
    };

    setMessages([...messages, newMessageObj]);
    setNewMessage('');

    // Simuler une réponse
    setTimeout(() => {
      const replyMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Message reçu ! Je te réponds dans quelques instants...',
        sender: {
          id: 'other',
          name: 'Sarah Martin',
          avatar: '/images/avatars/sarah.jpg',
          isOnline: true
        },
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        status: 'sent',
        type: 'text',
        isOwn: false
      };
      setMessages(prev => [...prev, replyMessage]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-green-500" />;
      default:
        return <Clock className="w-3 h-3 text-gray-400" />;
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentConversation = conversations.find(conv => conv.id === selectedConversation);

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
                <h1 className="text-xl font-bold text-gray-900">Messages</h1>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Zap className="w-3 h-3 mr-1" />
                Temps réel
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Search className="w-5 h-5" />
              </Button>
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-200px)]">
          {/* Sidebar gauche - Conversations */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {/* Recherche */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher des conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Tabs */}
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <Button
                  variant={activeTab === 'chats' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('chats')}
                  className="flex-1"
                >
                  Chats
                </Button>
                <Button
                  variant={activeTab === 'groups' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('groups')}
                  className="flex-1"
                >
                  Groupes
                </Button>
              </div>

              {/* Liste des conversations */}
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="space-y-2">
                  {filteredConversations.map(conversation => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedConversation === conversation.id
                          ? 'bg-blue-50 border border-blue-200'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={conversation.avatar} />
                          <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                        </Avatar>
                        {conversation.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                        {conversation.isGroup && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                            <Users className="w-2 h-2 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-sm truncate">{conversation.name}</h3>
                          <div className="flex items-center space-x-1">
                            {conversation.isPinned && <Star className="w-3 h-3 text-yellow-500" />}
                            {conversation.isMuted && <BellOff className="w-3 h-3 text-gray-400" />}
                            <span className="text-xs text-gray-500">{conversation.lastMessageTime}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 truncate">{conversation.lastMessage}</p>
                      </div>
                      
                      {conversation.unreadCount > 0 && (
                        <Badge className="bg-blue-600 text-white text-xs">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Zone de chat principale */}
          <div className="lg:col-span-3">
            {selectedConversation ? (
              <Card className="h-full flex flex-col">
                {/* Header du chat */}
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={currentConversation?.avatar} />
                        <AvatarFallback>{currentConversation?.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{currentConversation?.name}</h3>
                        <div className="flex items-center space-x-2">
                          {currentConversation?.isOnline ? (
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-sm text-gray-600">En ligne</span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-600">Hors ligne</span>
                          )}
                          {currentConversation?.isGroup && (
                            <Badge variant="outline" className="text-xs">
                              {currentConversation.members?.length} membres
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Search className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <div className="flex-1 overflow-hidden">
                  <ScrollArea className="h-full p-4">
                    <div className="space-y-4">
                      {messages.map(message => (
                        <div
                          key={message.id}
                          className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${message.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            {!message.isOwn && (
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={message.sender.avatar} />
                                <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                              </Avatar>
                            )}
                            
                            <div className={`rounded-lg px-4 py-2 ${
                              message.isOwn 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-100 text-gray-900'
                            }`}>
                              <p className="text-sm">{message.content}</p>
                              <div className={`flex items-center justify-between mt-1 ${
                                message.isOwn ? 'text-blue-100' : 'text-gray-500'
                              }`}>
                                <span className="text-xs">{message.timestamp}</span>
                                {message.isOwn && (
                                  <div className="flex items-center space-x-1">
                                    {getStatusIcon(message.status)}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="flex items-end space-x-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={currentConversation?.avatar} />
                              <AvatarFallback>{currentConversation?.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="bg-gray-100 rounded-lg px-4 py-2">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                </div>

                {/* Zone de saisie */}
                <div className="border-t p-4">
                  <div className="flex items-end space-x-2">
                    <div className="flex-1">
                      <Input
                        placeholder="Tapez votre message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="min-h-[40px]"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ImageIcon className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Smile className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Mic className="w-4 h-4" />
                      </Button>
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Suggestions IA */}
                  <div className="mt-2 flex space-x-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      <Bot className="w-3 h-3 mr-1" />
                      Réponse rapide
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Traduire
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Sélectionnez une conversation</h3>
                  <p className="text-gray-600">Choisissez une conversation pour commencer à discuter</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}