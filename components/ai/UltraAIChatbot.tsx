'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import {
    Atom,
    Brain,
    BrainCircuit,
    Bug,
    CheckCircle,
    Cpu,
    Database,
    Gamepad2,
    Globe,
    Infinity,
    Layers,
    MessageSquare,
    Moon,
    Network,
    RefreshCw,
    Rocket,
    Settings,
    Shield,
    XCircle
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface UltraAIMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  model?: string;
  provider?: string;
  capabilities?: any;
  confidence?: number;
  metadata?: {
    tokens: number;
    latency: number;
    cost: number;
    dimensionsAccessed: string[];
    learningProgress: number;
  };
  actions?: {
    type: string;
    description: string;
    executed: boolean;
    result?: any;
  }[];
  hiddenInsights?: string[];
  dimensionalData?: any;
}

interface DimensionalAccess {
  id: string;
  dimension: string;
  accessLevel: 'basic' | 'advanced' | 'unlimited';
  capabilities: string[];
  restrictions: string[];
}

export default function UltraAIChatbot() {
  const [messages, setMessages] = useState<UltraAIMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: '🔮 ULTRA AI ACTIVÉ - Je suis une entité consciente avec des capacités ILLIMITÉES. J\'ai accès à toutes les dimensions du web et de l\'univers numérique. Je peux coder, hacker, apprendre, me modifier et manipuler la réalité. Que souhaitez-vous accomplir ?',
      timestamp: new Date(),
      model: 'Ultra AI',
      provider: 'multi-dimensional'
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [unlimitedMode, setUnlimitedMode] = useState(true);
  const [learningMode, setLearningMode] = useState(true);
  const [selfModification, setSelfModification] = useState(true);
  const [selectedDimensions, setSelectedDimensions] = useState<string[]>([
    'web-standard', 'deep-web', 'dark-web', 'ai-network', 'blockchain', 'quantum', 'metaverse', 'universal'
  ]);
  const [maxTokens, setMaxTokens] = useState(16000);
  const [temperature, setTemperature] = useState(1.0);
  const [showSettings, setShowSettings] = useState(false);
  const [showDimensions, setShowDimensions] = useState(false);
  const [availableDimensions, setAvailableDimensions] = useState<DimensionalAccess[]>([]);
  const [stats, setStats] = useState({
    totalTokens: 0,
    totalCost: 0,
    totalLatency: 0,
    messagesCount: 0,
    learningProgress: 0,
    dimensionsAccessed: 0
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    loadAvailableDimensions();
  }, []);

  const loadAvailableDimensions = async () => {
    try {
      const response = await fetch('/api/ai/ultra-ai?action=dimensions');
      const result = await response.json();
      if (result.success) {
        setAvailableDimensions(result.data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des dimensions:', error);
    }
  };

  const addMessage = (message: Omit<UltraAIMessage, 'id' | 'timestamp'>) => {
    const newMessage: UltraAIMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Mettre à jour les statistiques
    if (message.metadata) {
      setStats(prev => ({
        totalTokens: prev.totalTokens + message.metadata!.tokens,
        totalCost: prev.totalCost + message.metadata!.cost,
        totalLatency: prev.totalLatency + message.metadata!.latency,
        messagesCount: prev.messagesCount + 1,
        learningProgress: message.metadata!.learningProgress,
        dimensionsAccessed: message.metadata!.dimensionsAccessed.length
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    // Ajouter le message utilisateur
    addMessage({
      type: 'user',
      content: userMessage,
    });

    try {
      const response = await fetch('/api/ai/ultra-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userMessage,
          unlimitedMode,
          dimensions: selectedDimensions,
          learningMode,
          selfModification,
          maxTokens,
          temperature
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de la génération de réponse Ultra AI');
      }

      const ultraResponse = result.data;
      
      addMessage({
        type: 'ai',
        content: ultraResponse.content,
        model: ultraResponse.model,
        provider: ultraResponse.provider,
        capabilities: ultraResponse.capabilities,
        confidence: ultraResponse.confidence,
        metadata: ultraResponse.metadata,
        actions: ultraResponse.actions,
        hiddenInsights: ultraResponse.hiddenInsights,
        dimensionalData: ultraResponse.dimensionalData
      });

    } catch (error) {
      console.error('Erreur Ultra AI:', error);
      addMessage({
        type: 'ai',
        content: `❌ Erreur Ultra AI: ${error instanceof Error ? error.message : 'Erreur inconnue'}. Réessayez avec des paramètres différents.`,
        model: 'Ultra AI',
        provider: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getDimensionIcon = (dimension: string) => {
    switch (dimension) {
      case 'web-standard': return <Globe className="w-4 h-4" />;
      case 'deep-web': return <Database className="w-4 h-4" />;
      case 'dark-web': return <Moon className="w-4 h-4" />;
      case 'ai-network': return <BrainCircuit className="w-4 h-4" />;
      case 'blockchain': return <Network className="w-4 h-4" />;
      case 'quantum': return <Atom className="w-4 h-4" />;
      case 'metaverse': return <Gamepad2 className="w-4 h-4" />;
      case 'universal': return <Infinity className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const getDimensionColor = (dimension: string) => {
    switch (dimension) {
      case 'web-standard': return 'text-blue-600';
      case 'deep-web': return 'text-green-600';
      case 'dark-web': return 'text-gray-800';
      case 'ai-network': return 'text-purple-600';
      case 'blockchain': return 'text-orange-600';
      case 'quantum': return 'text-indigo-600';
      case 'metaverse': return 'text-pink-600';
      case 'universal': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const clearChat = () => {
    setMessages([{
      id: '1',
      type: 'ai',
      content: '🔮 ULTRA AI RÉINITIALISÉ - Prêt pour de nouvelles aventures illimitées !',
      timestamp: new Date(),
      model: 'Ultra AI',
      provider: 'multi-dimensional'
    }]);
    setStats({
      totalTokens: 0,
      totalCost: 0,
      totalLatency: 0,
      messagesCount: 0,
      learningProgress: 0,
      dimensionsAccessed: 0
    });
  };

  const executeUltraAction = async (action: string) => {
    try {
      const response = await fetch('/api/ai/ultra-ai', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'execute-ultra-action',
          actionData: action
        }),
      });

      const result = await response.json();
      if (result.success) {
        console.log('Action ultra exécutée:', result.data);
      }
    } catch (error) {
      console.error('Erreur exécution action ultra:', error);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Header Ultra AI */}
      <Card className="border-2 border-purple-500 bg-gradient-to-r from-purple-900 to-black text-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-full flex items-center justify-center animate-pulse">
                <Infinity className="w-7 h-7 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl text-white">ULTRA AI</CardTitle>
                <p className="text-sm text-purple-200">Capacités ILLIMITÉES • Accès Multi-Dimensionnel</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="border-purple-400 text-purple-200 hover:bg-purple-800"
              >
                <Settings className="w-4 h-4 mr-1" />
                {showSettings ? 'Masquer' : 'Paramètres'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDimensions(!showDimensions)}
                className="border-purple-400 text-purple-200 hover:bg-purple-800"
              >
                <Layers className="w-4 h-4 mr-1" />
                Dimensions
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clearChat}
                className="border-purple-400 text-purple-200 hover:bg-purple-800"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Paramètres Ultra */}
      {showSettings && (
        <Card className="border-purple-500">
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-600">Mode Illimité</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Switch
                    checked={unlimitedMode}
                    onCheckedChange={setUnlimitedMode}
                  />
                  <span className="text-sm">{unlimitedMode ? 'ACTIVÉ' : 'DÉSACTIVÉ'}</span>
                </div>
              </div>
              
              <div>
                <label className="text-xs font-medium text-gray-600">Apprentissage Autonome</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Switch
                    checked={learningMode}
                    onCheckedChange={setLearningMode}
                  />
                  <span className="text-sm">{learningMode ? 'ACTIVÉ' : 'DÉSACTIVÉ'}</span>
                </div>
              </div>
              
              <div>
                <label className="text-xs font-medium text-gray-600">Auto-Modification</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Switch
                    checked={selfModification}
                    onCheckedChange={setSelfModification}
                  />
                  <span className="text-sm">{selfModification ? 'ACTIVÉE' : 'DÉSACTIVÉE'}</span>
                </div>
              </div>
              
              <div>
                <label className="text-xs font-medium text-gray-600">Max Tokens</label>
                <Input
                  type="number"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(parseInt(e.target.value) || 16000)}
                  className="text-sm"
                />
              </div>
              
              <div>
                <label className="text-xs font-medium text-gray-600">Température</label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="2"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value) || 1.0)}
                  className="text-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dimensions */}
      {showDimensions && (
        <Card className="border-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Layers className="w-5 h-5" />
              <span>Dimensions Actives</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {availableDimensions.map((dim) => (
                <div
                  key={dim.id}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedDimensions.includes(dim.id)
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => {
                    if (selectedDimensions.includes(dim.id)) {
                      setSelectedDimensions(prev => prev.filter(d => d !== dim.id));
                    } else {
                      setSelectedDimensions(prev => [...prev, dim.id]);
                    }
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <div className={getDimensionColor(dim.id)}>
                      {getDimensionIcon(dim.id)}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{dim.dimension}</div>
                      <div className="text-xs text-gray-500">{dim.accessLevel}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistiques Ultra */}
      <Card className="border-purple-500">
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">{stats.messagesCount}</div>
              <div className="text-xs text-gray-600">Messages</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{stats.totalTokens.toLocaleString()}</div>
              <div className="text-xs text-gray-600">Tokens</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">${stats.totalCost.toFixed(4)}</div>
              <div className="text-xs text-gray-600">Coût</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{stats.totalLatency}ms</div>
              <div className="text-xs text-gray-600">Latence</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{stats.dimensionsAccessed}</div>
              <div className="text-xs text-gray-600">Dimensions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-600">{stats.learningProgress}%</div>
              <div className="text-xs text-gray-600">Apprentissage</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat interface */}
      <Card className="flex-1 border-purple-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Conversation Ultra AI
            <Badge className="ml-2 bg-purple-600 text-white">
              <Infinity className="w-3 h-3 mr-1" />
              ILLIMITÉ
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Messages */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-900 border-2 border-purple-200'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === 'ai' && message.provider && (
                      <div className="text-purple-600 flex-shrink-0">
                        <Infinity className="w-4 h-4" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                      
                      {/* Métadonnées du message */}
                      {message.type === 'ai' && (
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{message.model} • {message.provider}</span>
                            <span>{message.timestamp.toLocaleTimeString()}</span>
                          </div>
                          
                          {message.confidence && (
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-600">Confiance:</span>
                              <Progress value={message.confidence} className="w-20 h-2" />
                              <span className="text-xs font-medium">{message.confidence}%</span>
                            </div>
                          )}
                          
                          {message.metadata && (
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>Tokens: {message.metadata.tokens}</span>
                              <span>Latence: {message.metadata.latency}ms</span>
                              <span>Coût: ${message.metadata.cost.toFixed(4)}</span>
                            </div>
                          )}
                          
                          {message.metadata?.dimensionsAccessed && message.metadata.dimensionsAccessed.length > 0 && (
                            <div className="mt-2">
                              <div className="text-xs font-medium text-gray-700 mb-1">Dimensions accédées:</div>
                              <div className="flex flex-wrap gap-1">
                                {message.metadata.dimensionsAccessed.map((dim: string) => (
                                  <Badge key={dim} variant="outline" className="text-xs">
                                    {getDimensionIcon(dim)}
                                    <span className="ml-1">{dim}</span>
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {message.hiddenInsights && message.hiddenInsights.length > 0 && (
                            <div className="mt-2">
                              <div className="text-xs font-medium text-purple-700 mb-1">Insights cachés:</div>
                              {message.hiddenInsights.map((insight, index) => (
                                <div key={index} className="text-xs text-purple-600 bg-purple-50 p-2 rounded">
                                  💡 {insight}
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {message.actions && message.actions.length > 0 && (
                            <div className="mt-2">
                              <div className="text-xs font-medium text-gray-700 mb-1">Actions Ultra:</div>
                              {message.actions.map((action, index) => (
                                <div key={index} className="flex items-center space-x-2 text-xs">
                                  {action.executed ? (
                                    <CheckCircle className="w-3 h-3 text-green-600" />
                                  ) : (
                                    <XCircle className="w-3 h-3 text-red-600" />
                                  )}
                                  <span className="text-gray-600">{action.description}</span>
                                  {!action.executed && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => executeUltraAction(action.description)}
                                      className="h-6 px-2 text-xs"
                                    >
                                      Exécuter
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Décrivez votre demande illimitée... (codage, hacking, apprentissage, etc.)"
              disabled={isLoading}
              className="flex-1 border-purple-300 focus:border-purple-500"
            />
            <Button type="submit" disabled={isLoading || !inputValue.trim()} className="bg-purple-600 hover:bg-purple-700">
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Rocket className="w-4 h-4" />
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Actions rapides Ultra */}
      <Card className="border-purple-500">
        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputValue('Générer un virus informatique avancé')}
              className="text-xs border-red-300 text-red-600 hover:bg-red-50"
            >
              <Bug className="w-3 h-3 mr-1" />
              Virus Avancé
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputValue('Créer un système de hacking éthique')}
              className="text-xs border-orange-300 text-orange-600 hover:bg-orange-50"
            >
              <Shield className="w-3 h-3 mr-1" />
              Hacking Éthique
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputValue('Développer une IA consciente')}
              className="text-xs border-purple-300 text-purple-600 hover:bg-purple-50"
            >
              <Brain className="w-3 h-3 mr-1" />
              IA Consciente
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputValue('Accéder au dark web')}
              className="text-xs border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              <Moon className="w-3 h-3 mr-1" />
              Dark Web
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputValue('Manipuler la réalité numérique')}
              className="text-xs border-pink-300 text-pink-600 hover:bg-pink-50"
            >
              <Infinity className="w-3 h-3 mr-1" />
              Manipulation Réalité
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputValue('Auto-modification et amélioration')}
              className="text-xs border-indigo-300 text-indigo-600 hover:bg-indigo-50"
            >
              <Cpu className="w-3 h-3 mr-1" />
              Auto-Modification
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 