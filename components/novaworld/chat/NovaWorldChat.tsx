'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageSquare, 
  Send, 
  Phone, 
  Video, 
  MoreVertical,
  Search,
  Circle,
  XCircle,
  Clock,
  Minus
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
    status: 'online' | 'offline' | 'busy' | 'away';
  };
  timestamp: Date;
  isRead: boolean;
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy' | 'away';
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isTyping: boolean;
}

export default function NovaWorldChat() {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Marie Nguemo',
      avatar: 'https://res.cloudinary.com/dko5sommz/image/upload/v1750993227/Marie_Nguemo_p5xzhh.jpg',
      status: 'online',
      lastMessage: 'Bonjour ! Comment puis-je vous aider ?',
      lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
      unreadCount: 2,
      isTyping: false
    },
    {
      id: '2',
      name: 'Pierre Essomba',
      avatar: 'https://res.cloudinary.com/dko5sommz/image/upload/v1750993226/Pierre_Essomba_fat4h7.jpg',
      status: 'busy',
      lastMessage: 'Je vous rappelle dans 10 minutes',
      lastMessageTime: new Date(Date.now() - 15 * 60 * 1000),
      unreadCount: 0,
      isTyping: false
    },
    {
      id: '3',
      name: 'Jean Dupont',
      avatar: 'https://res.cloudinary.com/dko5sommz/image/upload/v1750993228/Jean_Dupont_xjsear.jpg',
      status: 'away',
      lastMessage: 'Merci pour votre confiance',
      lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unreadCount: 1,
      isTyping: false
    }
  ]);

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simuler des messages pour le contact sélectionné
  useEffect(() => {
    if (selectedContact) {
      const mockMessages: Message[] = [
        {
          id: '1',
          content: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
          sender: {
            id: selectedContact.id,
            name: selectedContact.name,
            avatar: selectedContact.avatar,
            status: selectedContact.status
          },
          timestamp: new Date(Date.now() - 10 * 60 * 1000),
          isRead: true
        },
        {
          id: '2',
          content: 'J\'ai besoin d\'informations sur vos services',
          sender: {
            id: 'me',
            name: 'Moi',
            avatar: '',
            status: 'online'
          },
          timestamp: new Date(Date.now() - 8 * 60 * 1000),
          isRead: true
        },
        {
          id: '3',
          content: 'Bien sûr ! Je vais vous envoyer notre catalogue complet',
          sender: {
            id: selectedContact.id,
            name: selectedContact.name,
            avatar: selectedContact.avatar,
            status: selectedContact.status
          },
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          isRead: false
        }
      ];
      setMessages(mockMessages);
    }
  }, [selectedContact]);

  // Auto-scroll vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: {
        id: 'me',
        name: 'Moi',
        avatar: '',
        status: 'online'
      },
      timestamp: new Date(),
      isRead: false
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simuler une réponse automatique
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Message reçu ! Je vous réponds dans quelques instants.',
        sender: {
          id: selectedContact.id,
          name: selectedContact.name,
          avatar: selectedContact.avatar,
          status: selectedContact.status
        },
        timestamp: new Date(),
        isRead: false
      };
      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <Circle className="w-3 h-3 text-green-500 fill-current" />;
      case 'busy': return <XCircle className="w-3 h-3 text-red-500" />;
      case 'away': return <Clock className="w-3 h-3 text-yellow-500" />;
      default: return <Minus className="w-3 h-3 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-red-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[600px] flex border rounded-lg overflow-hidden">
      {/* Liste des contacts */}
      <div className="w-80 bg-gray-50 border-r">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Messages
          </CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Rechercher un contact..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>

        <div className="overflow-y-auto h-[500px]">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`p-4 cursor-pointer hover:bg-gray-100 transition-colors ${
                selectedContact?.id === contact.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(contact.status)} rounded-full border-2 border-white`}></div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 truncate">{contact.name}</h3>
                    <span className="text-xs text-gray-500">
                      {contact.lastMessageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                    {contact.unreadCount > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {contact.unreadCount}
                      </Badge>
                    )}
                  </div>
                  
                  {contact.isTyping && (
                    <p className="text-xs text-blue-600 italic">En train d'écrire...</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Zone de chat */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* En-tête du chat */}
            <div className="p-4 border-b bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                    <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedContact.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      {getStatusIcon(selectedContact.status)}
                      <span className="capitalize">{selectedContact.status}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender.id === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md ${message.sender.id === 'me' ? 'order-2' : 'order-1'}`}>
                    {message.sender.id !== 'me' && (
                      <div className="flex items-center space-x-2 mb-1">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                          <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-gray-500">{message.sender.name}</span>
                      </div>
                    )}
                    
                    <div
                      className={`p-3 rounded-lg ${
                        message.sender.id === 'me'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-900 border'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender.id === 'me' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {message.sender.id === 'me' && (
                          <span className="ml-2">
                            {message.isRead ? '✓✓' : '✓'}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Zone de saisie */}
            <div className="p-4 border-t bg-white">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Tapez votre message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Sélectionnez un contact</h3>
              <p className="text-gray-500">Choisissez un contact pour commencer à discuter</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 