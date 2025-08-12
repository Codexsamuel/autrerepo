'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
  Send,
  Paperclip,
  Smile
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

export function CommunicationWidget() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [newMessage, setNewMessage] = useState('');

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
      console.log('Message envoyé:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Communication</h3>
        <p className="text-sm text-gray-600">Connectez-vous avec votre réseau</p>
      </div>

      {/* Contacts */}
      <div className="p-4">
        <div className="space-y-3">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg border ${
                selectedContact?.id === contact.id ? 'bg-blue-50 border-blue-200' : 'border-gray-100'
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
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Zone de messages */}
      {selectedContact && (
        <div className="border-t border-gray-200">
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar className="w-8 h-8">
                <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold">
                  {selectedContact.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium text-gray-900 text-sm">{selectedContact.name}</h4>
                <p className="text-xs text-gray-600">{selectedContact.title}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                <Smile className="w-4 h-4" />
              </Button>
              <input
                placeholder="Tapez votre message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <Button onClick={handleSendMessage} size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Interface d'appel */}
      {isCallActive && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Appel en cours</h3>
              <Avatar className="w-20 h-20 mx-auto mb-4">
                <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl font-bold">
                  {selectedContact.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <p className="text-gray-600 mb-4">{selectedContact.name}</p>
              
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Button
                  variant="outline"
                  size="lg"
                  className={`w-12 h-12 rounded-full ${
                    isAudioEnabled ? 'text-green-600 border-green-300' : 'text-red-600 border-red-300'
                  }`}
                  onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                >
                  {isAudioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className={`w-12 h-12 rounded-full ${
                    isVideoEnabled ? 'text-green-600 border-green-300' : 'text-red-600 border-red-300'
                  }`}
                  onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                >
                  {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                </Button>
              </div>
              
              <Button
                onClick={handleEndCall}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                <PhoneOff className="w-4 h-4 mr-2" />
                Terminer l'appel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 