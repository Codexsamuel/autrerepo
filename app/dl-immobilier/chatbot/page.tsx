import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    ArrowLeft,
    BarChart3,
    Bot,
    CheckCircle,
    Mail,
    Send,
    Star,
    User
} from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface PropertySuggestion {
  id: string;
  title: string;
  type: string;
  location: string;
  price: number;
  features: string[];
  image: string;
  rating: number;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Bonjour ! Je suis l'assistant IA de DL-Immobilier. Je peux vous aider à trouver le bien idéal. Pouvez-vous me décrire vos besoins ? (quartier, ville, budget, type de bien, etc.)",
      timestamp: new Date(),
      suggestions: [
        "Je cherche un appartement à Douala",
        "Je veux une villa à Yaoundé",
        "J'ai besoin d'un bureau",
        "Je cherche un terrain"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    budget: '',
    location: '',
    propertyType: '',
    requirements: ''
  });
  const [showForm, setShowForm] = useState(false);
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
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simuler le traitement IA
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse.content,
        timestamp: new Date(),
        suggestions: botResponse.suggestions
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string): { content: string; suggestions?: string[] } => {
    const input = userInput.toLowerCase();
    
    if (input.includes('appartement') || input.includes('appart')) {
      return {
        content: "Excellent choix ! Pour un appartement, j'ai besoin de quelques détails :\n\n• Quel quartier préférez-vous ? (Akwa, Bonanjo, Centre-ville...)\n• Quel est votre budget mensuel ?\n• Combien de chambres ?\n• Meublé ou non meublé ?",
        suggestions: ["Budget 100.000-200.000 FCFA", "Budget 200.000-500.000 FCFA", "Budget 500.000+ FCFA", "Meublé", "Non meublé"]
      };
    }
    
    if (input.includes('villa') || input.includes('maison')) {
      return {
        content: "Parfait ! Pour une villa ou maison, dites-moi :\n\n• Ville préférée ? (Douala, Yaoundé...)\n• Budget mensuel ?\n• Nombre de chambres souhaité ?\n• Besoin d'un jardin, piscine ?",
        suggestions: ["Douala", "Yaoundé", "Budget 300.000-800.000 FCFA", "Budget 800.000+ FCFA", "Avec jardin", "Avec piscine"]
      };
    }
    
    if (input.includes('bureau') || input.includes('local')) {
      return {
        content: "Pour un bureau ou local commercial :\n\n• Zone préférée ? (Centre-ville, Zone industrielle...)\n• Surface nécessaire ?\n• Budget mensuel ?\n• Équipement requis ?",
        suggestions: ["Centre-ville", "Zone industrielle", "Surface 50-100m²", "Surface 100-200m²", "Équipé", "Non équipé"]
      };
    }
    
    if (input.includes('terrain')) {
      return {
        content: "Pour un terrain :\n\n• Ville préférée ?\n• Surface souhaitée ?\n• Budget total ?\n• Usage prévu ? (Construction, agriculture...)\n• Titré ou non titré ?",
        suggestions: ["Douala", "Yaoundé", "Titré", "Non titré", "Construction", "Agriculture"]
      };
    }
    
    if (input.includes('budget') || input.includes('prix')) {
      return {
        content: "Merci pour ces informations ! Je vais analyser notre base de données et vous proposer les meilleures options. Pouvez-vous me donner votre nom et numéro de téléphone pour que je puisse vous contacter avec les détails ?",
        suggestions: ["Continuer la recherche", "Voir des exemples", "Prendre rendez-vous"]
      };
    }
    
    if (input.includes('contact') || input.includes('téléphone') || input.includes('nom')) {
      setShowForm(true);
      return {
        content: "Parfait ! Je vais vous proposer un formulaire pour collecter vos informations. Une fois rempli, je vous enverrai les meilleures propositions sous 24h par email et SMS.",
        suggestions: ["Remplir le formulaire", "Continuer le chat", "Voir nos services"]
      };
    }
    
    return {
      content: "Je comprends ! Pour mieux vous aider, pouvez-vous me préciser :\n\n• Type de bien recherché (appartement, villa, bureau, terrain)\n• Ville préférée\n• Budget approximatif\n• Exigences particulières",
      suggestions: ["Appartement", "Villa/Maison", "Bureau/Local", "Terrain", "Voir nos services"]
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const botMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content: `Merci ${userInfo.name} ! J'ai bien noté vos informations :\n\n• Budget : ${userInfo.budget}\n• Localisation : ${userInfo.location}\n• Type : ${userInfo.propertyType}\n\nJe vais analyser notre base de données et vous envoyer les meilleures propositions sous 24h à ${userInfo.email} et ${userInfo.phone}.`,
      timestamp: new Date(),
      suggestions: ["Voir d'autres services", "Modifier mes critères", "Retour à l'accueil"]
    };
    
    setMessages(prev => [...prev, botMessage]);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/dl-immobilier">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
            </Link>
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Assistant IA DL-Immobilier</h1>
              <p className="text-sm text-gray-600">Trouvez votre bien idéal en quelques minutes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="bg-blue-50 border-b">
                  <CardTitle className="flex items-center">
                    <Bot className="h-5 w-5 mr-2 text-blue-600" />
                    Assistant IA DL-Immobilier
                  </CardTitle>
                  <CardDescription>
                    Posez vos questions et recevez des propositions personnalisées
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1 p-0 overflow-hidden">
                  <div className="h-full flex flex-col">
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'} rounded-lg p-3`}>
                            <div className="flex items-start space-x-2">
                              {message.type === 'bot' && (
                                <Bot className="h-4 w-4 mt-1 text-blue-600 flex-shrink-0" />
                              )}
                              <div className="flex-1">
                                <p className="text-sm whitespace-pre-line">{message.content}</p>
                                <p className="text-xs opacity-70 mt-1">
                                  {message.timestamp.toLocaleTimeString()}
                                </p>
                              </div>
                              {message.type === 'user' && (
                                <User className="h-4 w-4 mt-1 text-white flex-shrink-0" />
                              )}
                            </div>
                            
                            {/* Suggestions */}
                            {message.suggestions && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {message.suggestions.map((suggestion, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="text-xs px-2 py-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                                  >
                                    {suggestion}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-gray-100 rounded-lg p-3">
                            <div className="flex items-center space-x-2">
                              <Bot className="h-4 w-4 text-blue-600" />
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
                    
                    {/* Input */}
                    <div className="border-t p-4">
                      <div className="flex space-x-2">
                        <Input
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Tapez votre message..."
                          className="flex-1"
                        />
                        <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Formulaire de Contact */}
              {showForm && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Vos Informations
                    </CardTitle>
                    <CardDescription>
                      Remplissez pour recevoir nos propositions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Nom complet *</label>
                        <Input
                          value={userInfo.name}
                          onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Email *</label>
                        <Input
                          type="email"
                          value={userInfo.email}
                          onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Téléphone *</label>
                        <Input
                          value={userInfo.phone}
                          onChange={(e) => setUserInfo(prev => ({ ...prev, phone: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Budget</label>
                        <Input
                          value={userInfo.budget}
                          onChange={(e) => setUserInfo(prev => ({ ...prev, budget: e.target.value }))}
                          placeholder="ex: 200.000 FCFA/mois"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Localisation préférée</label>
                        <Input
                          value={userInfo.location}
                          onChange={(e) => setUserInfo(prev => ({ ...prev, location: e.target.value }))}
                          placeholder="ex: Douala, Akwa"
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        <Mail className="h-4 w-4 mr-2" />
                        Recevoir les Propositions
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Avantages */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-yellow-500" />
                    Pourquoi notre IA ?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Réponse sous 24h</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Propositions personnalisées</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Plus d'agents immobiliers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Vérification locataires</span>
                  </div>
                </CardContent>
              </Card>

              {/* Statistiques */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Statistiques
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Biens disponibles</span>
                    <span className="text-sm font-medium">2,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Temps de réponse</span>
                    <span className="text-sm font-medium">&lt; 24h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Satisfaction client</span>
                    <span className="text-sm font-medium">98%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 