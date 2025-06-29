"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, Send, Users, TrendingUp, Trophy, Smile, Share2, Volume2, VolumeX } from 'lucide-react';

interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  message: string;
  timestamp: Date;
  type: 'message' | 'tip' | 'win' | 'system';
  betAmount?: number;
  odds?: number;
  match?: string;
}

interface ChatUser {
  id: string;
  username: string;
  avatar: string;
  isOnline: boolean;
  isVip: boolean;
  winRate: number;
}

export default function LiveChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentUser] = useState({
    id: 'user1',
    username: 'ParieurPro',
    avatar: '/images/avatar.png',
    isVip: true
  });

  // Messages de démonstration
  useEffect(() => {
    const demoMessages: ChatMessage[] = [
      {
        id: '1',
        userId: 'user2',
        username: 'FootExpert',
        avatar: '/images/avatar.png',
        message: 'Salut tout le monde ! Qui parie sur le match PSG ce soir ?',
        timestamp: new Date(Date.now() - 300000),
        type: 'message'
      },
      {
        id: '2',
        userId: 'user3',
        username: 'TennisKing',
        avatar: '/images/avatar.png',
        message: 'Prono gagnant : Djokovic en 3 sets @2.15',
        timestamp: new Date(Date.now() - 240000),
        type: 'tip',
        betAmount: 50,
        odds: 2.15,
        match: 'Djokovic vs Nadal'
      },
      {
        id: '3',
        userId: 'user4',
        username: 'BasketPro',
        avatar: '/images/avatar.png',
        message: '🏀 Lakers -10.5 @1.85 💰',
        timestamp: new Date(Date.now() - 180000),
        type: 'tip',
        betAmount: 100,
        odds: 1.85,
        match: 'Lakers vs Warriors'
      },
      {
        id: '4',
        userId: 'user5',
        username: 'VipPlayer',
        avatar: '/images/avatar.png',
        message: '🎉 GAGNÉ ! +€250 sur mon combiné !',
        timestamp: new Date(Date.now() - 120000),
        type: 'win',
        betAmount: 50,
        odds: 6.0
      },
      {
        id: '5',
        userId: 'system',
        username: 'DL Bookmaker',
        avatar: '/images/avatar.png',
        message: '🔥 BOOST : Cote PSG victoire boostée à 2.50 !',
        timestamp: new Date(Date.now() - 60000),
        type: 'system'
      }
    ];

    const demoUsers: ChatUser[] = [
      { id: 'user1', username: 'ParieurPro', avatar: '/images/avatar.png', isOnline: true, isVip: true, winRate: 68 },
      { id: 'user2', username: 'FootExpert', avatar: '/images/avatar.png', isOnline: true, isVip: false, winRate: 72 },
      { id: 'user3', username: 'TennisKing', avatar: '/images/avatar.png', isOnline: true, isVip: true, winRate: 85 },
      { id: 'user4', username: 'BasketPro', avatar: '/images/avatar.png', isOnline: false, isVip: false, winRate: 61 },
      { id: 'user5', username: 'VipPlayer', avatar: '/images/avatar.png', isOnline: true, isVip: true, winRate: 78 }
    ];

    setMessages(demoMessages);
    setUsers(demoUsers);

    // Auto-scroll vers le bas
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    scrollToBottom();
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: currentUser.id,
      username: currentUser.username,
      avatar: currentUser.avatar,
      message: newMessage,
      timestamp: new Date(),
      type: 'message'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const sendTip = () => {
    const tip: ChatMessage = {
      id: Date.now().toString(),
      userId: currentUser.id,
      username: currentUser.username,
      avatar: currentUser.avatar,
      message: '💡 Prono : Real Madrid victoire @1.95',
      timestamp: new Date(),
      type: 'tip',
      betAmount: 75,
      odds: 1.95,
      match: 'Real Madrid vs Barcelona'
    };

    setMessages(prev => [...prev, tip]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            Chat en Direct
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {users.filter(u => u.isOnline).length} en ligne
            </Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUsers(!showUsers)}
              className="text-gray-600 hover:text-gray-900"
            >
              <Users className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className={isMuted ? 'text-red-600' : 'text-gray-600'}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      <div className="flex flex-1 overflow-hidden">
        {/* Messages */}
        <div className="flex-1 flex flex-col">
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.type === 'system' ? 'justify-center' : ''}`}>
                {msg.type !== 'system' && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={msg.avatar} />
                    <AvatarFallback>{msg.username[0]}</AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`flex-1 ${msg.type === 'system' ? 'text-center' : ''}`}>
                  {msg.type !== 'system' && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{msg.username}</span>
                      {users.find(u => u.id === msg.userId)?.isVip && (
                        <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
                          VIP
                        </Badge>
                      )}
                      <span className="text-xs text-gray-500">{formatTime(msg.timestamp)}</span>
                    </div>
                  )}
                  
                  <div className={`text-sm ${
                    msg.type === 'system' 
                      ? 'bg-blue-50 text-blue-800 px-3 py-2 rounded-lg inline-block' 
                      : msg.type === 'tip'
                      ? 'bg-green-50 text-green-800 px-3 py-2 rounded-lg'
                      : msg.type === 'win'
                      ? 'bg-yellow-50 text-yellow-800 px-3 py-2 rounded-lg'
                      : 'text-gray-800'
                  }`}>
                    {msg.message}
                    {msg.type === 'tip' && msg.betAmount && (
                      <div className="mt-1 text-xs">
                        💰 Mise: {msg.betAmount}€ | Cote: {msg.odds} | Match: {msg.match}
                      </div>
                    )}
                    {msg.type === 'win' && msg.betAmount && (
                      <div className="mt-1 text-xs">
                        🎉 Gain: +{(msg.betAmount * (msg.odds || 1) - msg.betAmount).toFixed(2)}€
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Tapez votre message..."
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1"
              />
              <Button size="sm" variant="ghost" onClick={sendTip}>
                <TrendingUp className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost">
                <Smile className="h-4 w-4" />
              </Button>
              <Button size="sm" onClick={sendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Users sidebar */}
        {showUsers && (
          <div className="w-64 border-l bg-gray-50 p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Parieurs en ligne
            </h3>
            <div className="space-y-2">
              {users.map((user) => (
                <div key={user.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-white">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium truncate">{user.username}</span>
                      {user.isVip && (
                        <Trophy className="h-3 w-3 text-yellow-600" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <div className={`w-2 h-2 rounded-full ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <span>{user.winRate}% de réussite</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
} 