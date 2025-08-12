'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Video, 
  Phone, 
  MessageSquare, 
  Users, 
  Plus, 
  Search,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Settings,
  MoreHorizontal,
  Send,
  Paperclip,
  Smile,
  Calendar,
  MapPin,
  Clock,
  UserPlus,
  Lock,
  Globe
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  isOnline: boolean;
  isVerified: boolean;
  canCall: boolean;
  subscription: 'free' | 'premium' | 'enterprise';
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
  isRead: boolean;
}

interface Group {
  id: string;
  name: string;
  description: string;
  avatar: string;
  members: number;
  isPrivate: boolean;
  isAdmin: boolean;
  lastActivity: Date;
}

export function NovaWorldCommunication() {
  const [activeTab, setActiveTab] = useState('contacts');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Contacts simulés
  const contacts: Contact[] = [
    {
      id: '1',
      name: 'Marie NGUEMO',
      title: 'Directrice RH',
      company: 'Nova Hospitality',
      avatar: '/avatars/marie.jpg',
      isOnline: true,
      isVerified: true,
      canCall: true,
      subscription: 'premium'
    },
    {
      id: '2',
      name: 'Pierre ESSOMBA',
      title: 'Directeur Commercial',
      company: 'AssurPro Cameroun',
      avatar: '/avatars/pierre.jpg',
      isOnline: false,
      isVerified: true,
      canCall: true,
      subscription: 'enterprise'
    },
    {
      id: '3',
      name: 'Sarah KOUASSI',
      title: 'Directrice Marketing',
      company: 'TechStart',
      avatar: '/avatars/sarah.jpg',
      isOnline: true,
      isVerified: true,
      canCall: false,
      subscription: 'free'
    }
  ];

  // Groupes simulés
  const groups: Group[] = [
    {
      id: '1',
      name: 'Tech Leaders Afrique',
      description: 'Communauté des leaders technologiques africains',
      avatar: '/groups/tech-leaders.jpg',
      members: 156,
      isPrivate: false,
      isAdmin: true,
      lastActivity: new Date(Date.now() - 1000 * 60 * 30) // 30 min ago
    },
    {
      id: '2',
      name: 'Entrepreneurs Douala',
      description: 'Réseau des entrepreneurs de Douala',
      avatar: '/groups/entrepreneurs-douala.jpg',
      members: 89,
      isPrivate: true,
      isAdmin: false,
      lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2h ago
    }
  ];

  const handleStartCall = (contact: Contact, type: 'audio' | 'video') => {
    if (!contact.canCall && contact.subscription === 'free') {
      alert('Cette fonctionnalité nécessite un abonnement premium');
      return;
    }
    
    setSelectedContact(contact);
    setIsCallActive(true);
    if (type === 'video') {
      setIsVideoEnabled(true);
    }
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setSelectedContact(null);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Logique d'envoi de message
      console.log('Message envoyé:', newMessage);
      setNewMessage('');
    }
  };

  const canContactUser = (contact: Contact) => {
    return contact.subscription !== 'free' || contact.isVerified;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header de communication */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Communication</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau groupe
            </Button>
            <Button variant="outline" size="sm">
              <UserPlus className="w-4 h-4 mr-2" />
              Inviter
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar des contacts/groupes */}
        <div className="w-80 bg-white border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher contacts, groupes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
              <TabsTrigger value="groups">Groupes</TabsTrigger>
            </TabsList>

            <TabsContent value="contacts" className="mt-4">
              <div className="space-y-1">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedContact?.id === contact.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                    }`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={contact.avatar} alt={contact.name} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold">
                            {contact.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {contact.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900 text-sm truncate">{contact.name}</h4>
                          {contact.isVerified && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs px-1 py-0">
                              ✓
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 truncate">{contact.title}</p>
                        <p className="text-xs text-gray-500 truncate">{contact.company}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <div className="flex items-center space-x-1">
                          {contact.canCall && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-8 h-8 p-0 text-green-600 hover:bg-green-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStartCall(contact, 'audio');
                                }}
                              >
                                <Phone className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-8 h-8 p-0 text-blue-600 hover:bg-blue-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStartCall(contact, 'video');
                                }}
                              >
                                <Video className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                        {!contact.canCall && (
                          <Badge variant="outline" className="text-xs text-gray-500">
                            {contact.subscription === 'free' ? 'Gratuit' : 'Premium requis'}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="groups" className="mt-4">
              <div className="space-y-1">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedGroup?.id === group.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                    }`}
                    onClick={() => setSelectedGroup(group)}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={group.avatar} alt={group.name} />
                        <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-sm font-semibold">
                          {group.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900 text-sm truncate">{group.name}</h4>
                          {group.isPrivate && (
                            <Lock className="w-3 h-3 text-gray-500" />
                          )}
                          {group.isAdmin && (
                            <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-xs px-1 py-0">
                              Admin
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 truncate">{group.description}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Users className="w-3 h-3" />
                          <span>{group.members} membres</span>
                          <span>•</span>
                          <span>{group.lastActivity.toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Zone principale de communication */}
        <div className="flex-1 flex flex-col">
          {selectedContact && (
            <div className="flex-1 flex flex-col">
              {/* Header du contact */}
              <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold">
                        {selectedContact.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedContact.name}</h3>
                      <p className="text-sm text-gray-600">{selectedContact.title} chez {selectedContact.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {canContactUser(selectedContact) && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-600 border-green-300 hover:bg-green-50"
                          onClick={() => handleStartCall(selectedContact, 'audio')}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Appel
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-600 border-blue-300 hover:bg-blue-50"
                          onClick={() => handleStartCall(selectedContact, 'video')}
                        >
                          <Video className="w-4 h-4 mr-2" />
                          Vidéo
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Zone de messages */}
              <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {/* Messages simulés */}
                  <div className="flex justify-end">
                    <div className="bg-blue-600 text-white rounded-lg px-4 py-2 max-w-xs">
                      <p className="text-sm">Bonjour ! Comment allez-vous ?</p>
                      <p className="text-xs text-blue-100 mt-1">14:30</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-900 rounded-lg px-4 py-2 max-w-xs shadow-sm">
                      <p className="text-sm">Très bien, merci ! Et vous ?</p>
                      <p className="text-xs text-gray-500 mt-1">14:32</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Zone de saisie */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                    <Smile className="w-4 h-4" />
                  </Button>
                  <Input
                    placeholder="Tapez votre message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {selectedGroup && (
            <div className="flex-1 flex flex-col">
              {/* Header du groupe */}
              <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={selectedGroup.avatar} alt={selectedGroup.name} />
                      <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-sm font-semibold">
                        {selectedGroup.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedGroup.name}</h3>
                      <p className="text-sm text-gray-600">{selectedGroup.members} membres • {selectedGroup.isPrivate ? 'Privé' : 'Public'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Video className="w-4 h-4 mr-2" />
                      Réunion
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Zone de messages du groupe */}
              <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {/* Messages de groupe simulés */}
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-900 rounded-lg px-4 py-2 max-w-xs shadow-sm">
                      <p className="text-sm font-medium text-blue-600">Marie NGUEMO</p>
                      <p className="text-sm">Bonjour à tous ! Qui participe à l'événement de demain ?</p>
                      <p className="text-xs text-gray-500 mt-1">14:25</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-900 rounded-lg px-4 py-2 max-w-xs shadow-sm">
                      <p className="text-sm font-medium text-green-600">Pierre ESSOMBA</p>
                      <p className="text-sm">Moi ! J'ai hâte de vous rencontrer</p>
                      <p className="text-xs text-gray-500 mt-1">14:28</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Zone de saisie du groupe */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                    <Smile className="w-4 h-4" />
                  </Button>
                  <Input
                    placeholder="Message au groupe..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} className="bg-green-600 hover:bg-green-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {!selectedContact && !selectedGroup && (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Sélectionnez un contact ou un groupe</h3>
                <p className="text-gray-600">Commencez une conversation ou rejoignez un groupe de travail</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interface d'appel */}
      {isCallActive && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <Card className="w-96 bg-white">
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Appel en cours</CardTitle>
              <p className="text-sm text-gray-600">{selectedContact.name}</p>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <Avatar className="w-20 h-20 mx-auto">
                <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl font-bold">
                  {selectedContact.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="outline"
                  size="lg"
                  className={`w-16 h-16 rounded-full ${
                    isAudioEnabled ? 'text-green-600 border-green-300' : 'text-red-600 border-red-300'
                  }`}
                  onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                >
                  {isAudioEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className={`w-16 h-16 rounded-full ${
                    isVideoEnabled ? 'text-green-600 border-green-300' : 'text-red-600 border-red-300'
                  }`}
                  onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                >
                  {isVideoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                </Button>
              </div>
              
              <Button
                onClick={handleEndCall}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                <PhoneOff className="w-4 h-4 mr-2" />
                Terminer l'appel
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 