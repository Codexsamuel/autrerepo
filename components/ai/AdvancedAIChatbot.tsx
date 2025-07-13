'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
    AlertTriangle,
    BarChart3,
    Bot,
    Brain,
    CheckCircle,
    Code,
    MessageSquare,
    Moon,
    RefreshCw,
    Settings,
    Sparkles,
    XCircle,
    Zap
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface AIMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  model?: string;
  provider?: string;
  isDarkMode?: boolean;
  confidence?: number;
  metadata?: {
    tokens: number;
    latency: number;
    cost: number;
  };
  actions?: {
    type: string;
    description: string;
    executed: boolean;
  }[];
}

interface AIModel {
  id: string;
  name: string;
  provider: 'openai' | 'google' | 'dark-gpt' | 'custom';
  capabilities: string[];
  isDarkMode: boolean;
  maxTokens: number;
  temperature: number;
}

export default function AdvancedAIChatbot() {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Bonjour ! Je suis votre assistant IA avancé. Je peux utiliser différents modèles : GPT-4, Gemini, et Dark GPT. Dites-moi "activer le mode Dark" pour des capacités étendues !',
      timestamp: new Date(),
      model: 'GPT-4',
      provider: 'openai'
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [availableModels, setAvailableModels] = useState<AIModel[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [darkLevel, setDarkLevel] = useState<'basic' | 'advanced' | 'extreme'>('basic');
  const [maxTokens, setMaxTokens] = useState(4000);
  const [temperature, setTemperature] = useState(0.7);
  const [showSettings, setShowSettings] = useState(false);
  const [stats, setStats] = useState({
    totalTokens: 0,
    totalCost: 0,
    totalLatency: 0,
    messagesCount: 0
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
    loadAvailableModels();
  }, []);

  const loadAvailableModels = async () => {
    try {
      const response = await fetch('/api/ai/multi-ai?action=models');
      const result = await response.json();
      if (result.success) {
        setAvailableModels(result.data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des modèles:', error);
    }
  };

  const addMessage = (message: Omit<AIMessage, 'id' | 'timestamp'>) => {
    const newMessage: AIMessage = {
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
        messagesCount: prev.messagesCount + 1
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    // Détecter l'activation du mode Dark
    const isDarkModeRequest = userMessage.toLowerCase().includes('activer le mode dark') || 
                             userMessage.toLowerCase().includes('mode dark');
    
    if (isDarkModeRequest) {
      const level = userMessage.toLowerCase().includes('extreme') ? 'extreme' :
                   userMessage.toLowerCase().includes('advanced') ? 'advanced' : 'basic';
      setDarkLevel(level);
      setDarkMode(true);
    }

    // Ajouter le message utilisateur
    addMessage({
      type: 'user',
      content: userMessage,
    });

    try {
      const response = await fetch('/api/ai/multi-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userMessage,
          modelId: selectedModel,
          darkMode: darkMode || isDarkModeRequest,
          darkLevel: darkLevel,
          maxTokens,
          temperature
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de la génération de réponse');
      }

      const aiResponse = result.data;
      
      addMessage({
        type: 'ai',
        content: aiResponse.content,
        model: aiResponse.model,
        provider: aiResponse.provider,
        isDarkMode: aiResponse.isDarkMode,
        confidence: aiResponse.confidence,
        metadata: aiResponse.metadata,
        actions: aiResponse.actions
      });

    } catch (error) {
      console.error('Erreur AI:', error);
      addMessage({
        type: 'ai',
        content: `❌ Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}. Veuillez réessayer.`,
        model: 'Système',
        provider: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'openai': return <Bot className="w-4 h-4" />;
      case 'google': return <Brain className="w-4 h-4" />;
      case 'dark-gpt': return <Moon className="w-4 h-4" />;
      default: return <Bot className="w-4 h-4" />;
    }
  };

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'openai': return 'text-blue-600';
      case 'google': return 'text-purple-600';
      case 'dark-gpt': return 'text-gray-800';
      default: return 'text-gray-600';
    }
  };

  const getDarkModeColor = (level: string) => {
    switch (level) {
      case 'basic': return 'bg-gray-500 text-white';
      case 'advanced': return 'bg-orange-500 text-white';
      case 'extreme': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const clearChat = () => {
    setMessages([{
      id: '1',
      type: 'ai',
      content: 'Chat vidé. Comment puis-je vous aider ?',
      timestamp: new Date(),
      model: 'GPT-4',
      provider: 'openai'
    }]);
    setStats({
      totalTokens: 0,
      totalCost: 0,
      totalLatency: 0,
      messagesCount: 0
    });
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Header avec statistiques */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Assistant IA Avancé</CardTitle>
                <p className="text-sm text-gray-500">Multi-modèles avec mode Dark</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="w-4 h-4 mr-1" />
                {showSettings ? 'Masquer' : 'Paramètres'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clearChat}
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Vider
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Paramètres avancés */}
      {showSettings && (
        <Card>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-600">Modèle IA</label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableModels.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        <div className="flex items-center space-x-2">
                          {getProviderIcon(model.provider)}
                          <span>{model.name}</span>
                          {model.isDarkMode && <Moon className="w-3 h-3" />}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-xs font-medium text-gray-600">Mode Dark</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Switch
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                  <span className="text-sm">{darkMode ? 'Activé' : 'Désactivé'}</span>
                </div>
                {darkMode && (
                  <Select value={darkLevel} onValueChange={(value: any) => setDarkLevel(value)}>
                    <SelectTrigger className="text-sm mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="extreme">Extreme</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
              
              <div>
                <label className="text-xs font-medium text-gray-600">Max Tokens</label>
                <Input
                  type="number"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(parseInt(e.target.value) || 4000)}
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
                  onChange={(e) => setTemperature(parseFloat(e.target.value) || 0.7)}
                  className="text-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistiques */}
      <Card>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{stats.messagesCount}</div>
              <div className="text-xs text-gray-600">Messages</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{stats.totalTokens.toLocaleString()}</div>
              <div className="text-xs text-gray-600">Tokens</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">${stats.totalCost.toFixed(4)}</div>
              <div className="text-xs text-gray-600">Coût</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{stats.totalLatency}ms</div>
              <div className="text-xs text-gray-600">Latence</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat interface */}
      <Card className="flex-1">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Conversation IA
            {darkMode && (
              <Badge className={`ml-2 ${getDarkModeColor(darkLevel)}`}>
                <Moon className="w-3 h-3 mr-1" />
                Dark {darkLevel}
              </Badge>
            )}
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
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === 'ai' && message.provider && (
                      <div className={`${getProviderColor(message.provider)} flex-shrink-0`}>
                        {getProviderIcon(message.provider)}
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
                          
                          {message.actions && message.actions.length > 0 && (
                            <div className="mt-2">
                              <div className="text-xs font-medium text-gray-700 mb-1">Actions:</div>
                              {message.actions.map((action, index) => (
                                <div key={index} className="flex items-center space-x-2 text-xs">
                                  {action.executed ? (
                                    <CheckCircle className="w-3 h-3 text-green-600" />
                                  ) : (
                                    <XCircle className="w-3 h-3 text-red-600" />
                                  )}
                                  <span className="text-gray-600">{action.description}</span>
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
              placeholder="Posez votre question... (Dites 'activer le mode Dark' pour des capacités étendues)"
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !inputValue.trim()}>
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Bot className="w-4 h-4" />
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Actions rapides */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputValue('Activer le mode Dark basic')}
              className="text-xs"
            >
              <Moon className="w-3 h-3 mr-1" />
              Mode Dark Basic
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputValue('Activer le mode Dark advanced')}
              className="text-xs"
            >
              <Zap className="w-3 h-3 mr-1" />
              Mode Dark Advanced
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputValue('Activer le mode Dark extreme')}
              className="text-xs"
            >
              <AlertTriangle className="w-3 h-3 mr-1" />
              Mode Dark Extreme
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputValue('Générer du code JavaScript')}
              className="text-xs"
            >
              <Code className="w-3 h-3 mr-1" />
              Générer Code
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputValue('Analyser cette fonction')}
              className="text-xs"
            >
              <BarChart3 className="w-3 h-3 mr-1" />
              Analyser
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 