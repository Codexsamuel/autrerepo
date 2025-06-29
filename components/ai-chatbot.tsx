'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis l\'assistant IA de DL Solutions. Comment puis-je vous aider aujourd\'hui ?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simuler une réponse IA
    setTimeout(() => {
      const botResponses = [
        "Merci pour votre message ! Notre équipe va vous répondre dans les plus brefs délais.",
        "Excellente question ! Je vais vous orienter vers le service le plus approprié.",
        "Je comprends votre besoin. Laissez-moi vous proposer une solution adaptée.",
        "C'est un projet intéressant ! Nos experts peuvent vous accompagner dans cette démarche.",
        "Pour ce type de demande, je recommande de prendre rendez-vous avec notre équipe commerciale."
      ];

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Bouton flottant amélioré */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-blue-600 to-purple-700 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-110 border-2 border-blue-400/30"
        aria-label="Ouvrir l'assistant IA"
      >
        <MessageCircle className="w-7 h-7" />
      </button>

      {/* Chatbot Modal amélioré */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          
          <Card className="relative w-full max-w-md h-96 bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
            {/* Header amélioré */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Assistant IA DL Solutions</h3>
                    <p className="text-sm text-blue-100">En ligne • Réponse instantanée</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-blue-100 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                  aria-label="Fermer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Messages améliorés */}
            <CardContent className="p-6 h-64 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
              <div className="space-y-4">
                {messages.map((message: any) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-lg ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-700 text-white'
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {message.sender === 'bot' && (
                          <Bot className="w-5 h-5 mt-1 text-blue-600 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed">{message.text}</p>
                          <p className={`text-xs mt-2 ${
                            message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        {message.sender === 'user' && (
                          <User className="w-5 h-5 mt-1 text-blue-100 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-800 shadow-lg px-4 py-3 rounded-2xl border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <Bot className="w-5 h-5 text-blue-600" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Input amélioré */}
            <div className="p-6 bg-white border-t border-gray-200">
              <div className="flex space-x-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tapez votre message..."
                  className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 rounded-xl px-4"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
} 