"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Bot,
    Brain,
    Copy,
    Crown,
    Download,
    Globe,
    Maximize2,
    MessageSquare,
    Mic,
    MicOff,
    Minimize2,
    Send,
    Settings,
    Sparkles,
    Star,
    Trash2,
    User,
    Zap
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant' | 'ultra-ai';
  timestamp: Date;
  type: 'text' | 'code' | 'image' | 'file';
  isTyping?: boolean;
}

interface ChatInterfaceProps {
  className?: string;
}

export default function ChatInterface({ className }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Bonjour ! Je suis votre assistant IA DL Solutions. Je peux vous aider avec toutes vos questions. Voulez-vous activer le mode Ultra AI pour des capacités avancées ?",
      sender: 'assistant',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isUltraAI, setIsUltraAI] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string>('');
  const [showFeatures, setShowFeatures] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const ultraAIFeatures = [
    {
      id: 'quantum',
      name: 'Quantum Intelligence',
      description: 'Calculs quantiques et résolution de problèmes complexes',
      icon: Brain,
      color: 'bg-purple-500'
    },
    {
      id: 'trading',
      name: 'Trading Avancé',
      description: 'Analyse de marchés et prédictions financières',
      icon: Zap,
      color: 'bg-green-500'
    },
    {
      id: 'osint',
      name: 'OSINT Intelligence',
      description: 'Recherche en sources ouvertes et analyse de données',
      icon: Globe,
      color: 'bg-blue-500'
    },
    {
      id: 'crm',
      name: 'CRM & ERP',
      description: 'Gestion client et ressources d\'entreprise',
      icon: Settings,
      color: 'bg-orange-500'
    },
    {
      id: 'formations',
      name: 'Formations IA',
      description: 'Cours personnalisés et apprentissage adaptatif',
      icon: Star,
      color: 'bg-pink-500'
    },
    {
      id: 'creative',
      name: 'Créativité Avancée',
      description: 'Génération de contenu créatif et artistique',
      icon: Sparkles,
      color: 'bg-indigo-500'
    }
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simuler la réponse de l'IA
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: isUltraAI 
          ? `🤖 **Ultra AI Mode Activé**\n\n${generateUltraAIResponse(inputValue, selectedFeature)}`
          : generateAssistantResponse(inputValue),
        sender: isUltraAI ? 'ultra-ai' : 'assistant',
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAssistantResponse = (input: string): string => {
    const responses = [
      "Je peux vous aider avec cela. Voulez-vous que j'active le mode Ultra AI pour une réponse plus avancée ?",
      "C'est une excellente question ! Le mode Ultra AI pourrait vous donner une analyse plus approfondie.",
      "Je peux répondre à votre question, mais le mode Ultra AI offrirait des insights plus détaillés.",
      "Pour une réponse optimale, je recommande d'activer le mode Ultra AI.",
      "Je peux vous assister, mais le mode Ultra AI débloquerait des capacités avancées."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateUltraAIResponse = (input: string, feature: string): string => {
    const featureResponses: Record<string, string> = {
      quantum: `🧠 **Quantum Intelligence**\n\nAnalyse quantique de votre demande : "${input}"\n\nRésultats :\n• Complexité calculée : 94.7%\n• Solutions quantiques identifiées : 3\n• Optimisation recommandée : Algorithme quantique Q-247\n\nVoulez-vous que j'exécute une simulation quantique complète ?`,
      trading: `📈 **Trading Avancé**\n\nAnalyse de marché en temps réel pour : "${input}"\n\nIndicateurs :\n• RSI : 67.3 (Neutre)\n• MACD : Bullish\n• Volume : +23.4%\n• Support : $1,247\n• Résistance : $1,389\n\nRecommandation : Position Long avec Stop Loss à $1,200`,
      osint: `🌐 **OSINT Intelligence**\n\nRecherche en sources ouvertes : "${input}"\n\nSources analysées :\n• 1,247 sites web\n• 89 bases de données\n• 156 réseaux sociaux\n• 23 forums spécialisés\n\nRésultats : 47 sources pertinentes identifiées`,
      crm: `🏢 **CRM & ERP**\n\nAnalyse business intelligence : "${input}"\n\nMétriques :\n• ROI potentiel : 234%\n• Taux de conversion : 12.7%\n• LTV client : €2,847\n• Churn rate : 3.2%\n\nRecommandations stratégiques générées`,
      formations: `📚 **Formations IA**\n\nProgramme d'apprentissage personnalisé : "${input}"\n\nModules recommandés :\n• IA Avancée (Niveau Expert)\n• Machine Learning (Spécialisation)\n• Deep Learning (Certification)\n\nDurée estimée : 6-8 semaines`,
      creative: `✨ **Créativité Avancée**\n\nGénération créative : "${input}"\n\nOptions créatives :\n• Contenu multimédia\n• Design graphique\n• Musique générative\n• Art numérique\n\nVoulez-vous que je crée quelque chose de spécifique ?`
    };
    
    return featureResponses[feature] || `🤖 **Ultra AI**\n\nAnalyse avancée de votre demande : "${input}"\n\nCapacités Ultra AI activées :\n• Intelligence artificielle de niveau expert\n• Analyse prédictive\n• Génération de contenu avancée\n• Résolution de problèmes complexes\n\nComment puis-je vous aider davantage ?`;
  };

  const activateUltraAI = (feature?: string) => {
    setIsUltraAI(true);
    setSelectedFeature(feature || '');
    setShowFeatures(false);
    
    const activationMessage: Message = {
      id: Date.now().toString(),
      content: `🚀 **Ultra AI Activé !**\n\nMode Ultra AI activé avec capacités avancées.${feature ? `\nFonctionnalité sélectionnée : ${ultraAIFeatures.find(f => f.id === feature)?.name}` : ''}\n\nJe suis maintenant votre assistant IA ultra avancé. Que puis-je faire pour vous ?`,
      sender: 'ultra-ai',
      timestamp: new Date(),
      type: 'text'
    };
    
    setMessages(prev => [...prev, activationMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const clearChat = () => {
    setMessages([{
      id: '1',
      content: "Chat effacé. Comment puis-je vous aider ?",
      sender: 'assistant',
      timestamp: new Date(),
      type: 'text'
    }]);
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      {/* Bouton de chat flottant */}
      {isMinimized && (
        <Button
          onClick={() => setIsMinimized(false)}
          className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
        >
          <MessageSquare className="h-8 w-8 text-white" />
          {isUltraAI && (
            <Crown className="h-4 w-4 text-yellow-300 absolute -top-1 -right-1" />
          )}
        </Button>
      )}

      {/* Interface de chat complète */}
      {!isMinimized && (
        <Card className={`w-96 h-[600px] shadow-2xl border-2 ${isUltraAI ? 'border-purple-500' : 'border-blue-500'} ${isFullscreen ? 'w-screen h-screen' : ''}`}>
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Bot className="h-8 w-8" />
                  {isUltraAI && (
                    <Crown className="h-4 w-4 text-yellow-300 absolute -top-1 -right-1" />
                  )}
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {isUltraAI ? 'Ultra AI Assistant' : 'DL Solutions AI'}
                  </CardTitle>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className={`w-2 h-2 rounded-full ${isUltraAI ? 'bg-green-400' : 'bg-blue-400'}`}></div>
                    <span>{isUltraAI ? 'Ultra AI Actif' : 'Assistant de Base'}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {!isUltraAI && (
                  <Button
                    onClick={() => setShowFeatures(!showFeatures)}
                    size="sm"
                    variant="outline"
                    className="text-white border-white hover:bg-white hover:text-blue-600"
                  >
                    <Sparkles className="h-4 w-4 mr-1" />
                    Ultra AI
                  </Button>
                )}
                <Button
                  onClick={() => setIsMinimized(true)}
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0 h-full flex flex-col">
            {/* Sélection des fonctionnalités Ultra AI */}
            {showFeatures && !isUltraAI && (
              <div className="p-4 bg-gray-50 border-b">
                <h3 className="font-semibold mb-3 text-gray-800">Sélectionnez une fonctionnalité Ultra AI :</h3>
                <div className="grid grid-cols-2 gap-2">
                  {ultraAIFeatures.map((feature) => (
                    <Button
                      key={feature.id}
                      onClick={() => activateUltraAI(feature.id)}
                      variant="outline"
                      className="h-auto p-3 text-left justify-start"
                    >
                      <feature.icon className={`h-4 w-4 mr-2 ${feature.color.replace('bg-', 'text-')}`} />
                      <div>
                        <div className="font-medium text-sm">{feature.name}</div>
                        <div className="text-xs text-gray-500">{feature.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Zone des messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className={`flex items-start space-x-2 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          message.sender === 'user' 
                            ? 'bg-blue-500' 
                            : message.sender === 'ultra-ai'
                            ? 'bg-purple-500'
                            : 'bg-gray-500'
                        }`}>
                          {message.sender === 'user' ? (
                            <User className="h-4 w-4 text-white" />
                          ) : message.sender === 'ultra-ai' ? (
                            <Crown className="h-4 w-4 text-white" />
                          ) : (
                            <Bot className="h-4 w-4 text-white" />
                          )}
                        </div>
                        
                        <div className={`rounded-lg p-3 ${
                          message.sender === 'user'
                            ? 'bg-blue-500 text-white'
                            : message.sender === 'ultra-ai'
                            ? 'bg-purple-100 border border-purple-200 text-gray-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                          <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                            <span>{message.timestamp.toLocaleTimeString()}</span>
                            <div className="flex items-center space-x-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyMessage(message.content)}
                                className="h-6 w-6 p-0"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-3">
                      <Bot className="h-4 w-4 text-gray-500" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Zone de saisie */}
            <div className="p-4 border-t bg-white">
              <div className="flex items-center space-x-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isUltraAI ? "Posez votre question à Ultra AI..." : "Posez votre question..."}
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => setIsListening(!isListening)}
                  variant="outline"
                  className={isListening ? 'bg-red-100 border-red-300' : ''}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              </div>
              
              {/* Actions rapides */}
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={clearChat}
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-gray-500 hover:text-red-500"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Effacer
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-gray-500 hover:text-blue-500"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Exporter
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  {isUltraAI && (
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      <Crown className="h-3 w-3 mr-1" />
                      Ultra AI
                    </Badge>
                  )}
                  <span>DL Solutions AI v2.0</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 