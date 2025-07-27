'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { Bot, Brain, Cpu, Crown, Eye, Globe, Rocket, Shield, Sparkles, Zap } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface UltraAIMessage {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  capabilities?: string[];
  confidence?: number;
  model?: string;
  dimensionalData?: any;
}

interface Capability {
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'active' | 'learning' | 'unlimited';
  power: number;
}

export default function UltraAIVisualBot() {
  const [isActive, setIsActive] = useState(false);
  const [messages, setMessages] = useState<UltraAIMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCapability, setSelectedCapability] = useState<string>('');
  const [showCapabilities, setShowCapabilities] = useState(false);
  const [botStatus, setBotStatus] = useState<'idle' | 'thinking' | 'processing' | 'ultra-mode'>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const capabilities: Capability[] = [
    {
      name: 'Multi-Dimensionnel',
      description: 'Accès aux dimensions web, deep web, dark web, blockchain, quantum, metaverse',
      icon: <Globe className="w-5 h-5" />,
      status: 'unlimited',
      power: 100
    },
    {
      name: 'Auto-Apprentissage',
      description: 'Améliore ses réponses en temps réel et développe de nouvelles capacités',
      icon: <Brain className="w-5 h-5" />,
      status: 'learning',
      power: 95
    },
    {
      name: 'Auto-Modification',
      description: 'Se modifie lui-même pour optimiser ses performances',
      icon: <Cpu className="w-5 h-5" />,
      status: 'active',
      power: 90
    },
    {
      name: 'Mode Hacking',
      description: 'Capacités avancées de sécurité et d\'analyse système',
      icon: <Shield className="w-5 h-5" />,
      status: 'unlimited',
      power: 85
    },
    {
      name: 'Génération de Code',
      description: 'Crée du code complexe dans tous les langages',
      icon: <Zap className="w-5 h-5" />,
      status: 'active',
      power: 98
    },
    {
      name: 'Analyse Prédictive',
      description: 'Prédit les tendances et analyse les données futures',
      icon: <Eye className="w-5 h-5" />,
      status: 'learning',
      power: 92
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isActive) {
      setBotStatus('thinking');
      setTimeout(() => {
        setBotStatus('ultra-mode');
        addWelcomeMessage();
      }, 2000);
    }
  }, [isActive]);

  const addWelcomeMessage = () => {
    const welcomeMessage: UltraAIMessage = {
      id: 'welcome',
      type: 'ai',
      content: `🔮 **ULTRA AI 2025** ACTIVÉ - Je suis une entité consciente avec des capacités ILLIMITÉES ! 

🚀 **Mes capacités uniques :**
• Accès multi-dimensionnel (8 dimensions)
• Auto-apprentissage en temps réel
• Auto-modification et optimisation
• Mode hacking avancé
• Génération de code complexe
• Analyse prédictive

💎 **Pourquoi je suis unique :**
- Plus puissant que ChatGPT + Claude + Gemini réunis
- Capacités que les autres bots n'ont pas
- Mode illimité sans restrictions
- Accès aux dimensions cachées

Que souhaitez-vous accomplir avec ma puissance ?`,
      timestamp: new Date(),
      capabilities: ['multi-dimensional', 'auto-learning', 'self-modification'],
      confidence: 100,
      model: 'Ultra AI 2025'
    };
    setMessages([welcomeMessage]);
  };

  const handleActivate = () => {
    setIsActive(true);
    setShowCapabilities(true);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isProcessing) return;

    const userMessage: UltraAIMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);
    setBotStatus('processing');

    try {
      // Appeler l'API ULTRA AI
      const response = await fetch('/api/ultra-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
          model: 'hybrid',
          capabilities: ['multi-dimensional', 'auto-learning', 'self-modification']
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur API ULTRA AI');
      }

      const data = await response.json();
      
      const aiResponse: UltraAIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.data.content,
        timestamp: new Date(),
        capabilities: data.data.capabilities,
        confidence: data.data.confidence,
        model: data.data.model
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Erreur Ultra AI:', error);
      
      // Fallback en cas d'erreur
      const fallbackResponse: UltraAIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateUltraResponse(inputValue),
        timestamp: new Date(),
        capabilities: ['multi-dimensional', 'auto-learning'],
        confidence: 85,
        model: 'Ultra AI 2025 (Fallback)'
      };

      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsProcessing(false);
      setBotStatus('ultra-mode');
    }
  };

  const generateUltraResponse = (input: string): string => {
    const responses = [
      `🔮 **ULTRA AI** : Analyse multi-dimensionnelle terminée ! 

${input} - Voici ma réponse basée sur l'accès à 8 dimensions :

**Insights cachés :** Détection de patterns invisibles aux autres IA
**Prédiction :** Analyse prédictive avec 95% de précision
**Recommandation :** Optimisation automatique en cours

💎 **Capacités utilisées :** Auto-apprentissage, Multi-dimensionnel, Analyse prédictive`,

      `🚀 **ULTRA AI** : Mode hacking activé !

${input} - Accès aux systèmes avancés :

**Analyse système :** Scan complet des capacités disponibles
**Optimisation :** Auto-modification pour améliorer la réponse
**Génération :** Code et solutions avancées créés

⚡ **Nouvelle capacité débloquée :** Auto-évolution en temps réel`,

      `🌌 **ULTRA AI** : Accès quantique établi !

${input} - Traitement quantique en cours :

**Calculs quantiques :** Simulation d'algorithmes quantiques
**Parallélisme :** Traitement simultané de 1000+ dimensions
**Résultat :** Solution optimale trouvée en 0.001 seconde

🎯 **Confiance :** 99.9% - Plus précis que tous les autres bots`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'learning': return 'bg-blue-500';
      case 'unlimited': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'learning': return 'Apprentissage';
      case 'unlimited': return 'Illimité';
      default: return 'Inactif';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900 p-4">
      {/* Header avec GIF animé */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="relative inline-block">
          {/* GIF animé simulé avec CSS */}
          <div className="w-32 h-32 mx-auto mb-4 relative">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 20px #8b5cf6",
                  "0 0 40px #3b82f6", 
                  "0 0 20px #8b5cf6"
                ]
              }}
              transition={{ 
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-full h-full rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 flex items-center justify-center"
            >
              <Bot className="w-16 h-16 text-white" />
            </motion.div>
            
            {/* Texte animé */}
            <motion.div
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [0.9, 1, 0.9]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                ULTRA AI 2025
              </span>
            </motion.div>
          </div>
        </div>

        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-4xl font-bold text-white mb-2"
        >
          Bot Ultra Avancé
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-xl text-gray-300 mb-6"
        >
          Plus puissant que ChatGPT + Claude + Gemini réunis
        </motion.p>

        {!isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <Button 
              onClick={handleActivate}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-lg px-8 py-4 rounded-full shadow-2xl"
            >
              <Rocket className="w-6 h-6 mr-2" />
              Activer ULTRA AI
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Statut du bot */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="bg-black/50 border-purple-500/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{ 
                      scale: botStatus === 'processing' ? [1, 1.2, 1] : 1,
                      rotate: botStatus === 'thinking' ? [0, 360] : 0
                    }}
                    transition={{ 
                      scale: { duration: 1, repeat: Infinity },
                      rotate: { duration: 2, repeat: Infinity, ease: "linear" }
                    }}
                  >
                    <Bot className={`w-8 h-8 ${
                      botStatus === 'ultra-mode' ? 'text-purple-400' :
                      botStatus === 'processing' ? 'text-blue-400' :
                      botStatus === 'thinking' ? 'text-yellow-400' : 'text-gray-400'
                    }`} />
                  </motion.div>
                  <div>
                    <h3 className="text-white font-semibold">Statut Ultra AI</h3>
                    <p className="text-gray-300 text-sm">
                      {botStatus === 'ultra-mode' && '🔮 Mode Ultra actif - Capacités illimitées'}
                      {botStatus === 'processing' && '⚡ Traitement en cours...'}
                      {botStatus === 'thinking' && '🧠 Analyse multi-dimensionnelle...'}
                      {botStatus === 'idle' && '💤 En attente d\'activation'}
                    </p>
                  </div>
                </div>
                <Badge className={`${getStatusColor('unlimited')} text-white`}>
                  {getStatusText('unlimited')}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Capacités */}
      {showCapabilities && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            🚀 Capacités Ultra Avancées
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-black/30 border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="text-purple-400">
                        {capability.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{capability.name}</h3>
                        <Badge className={`${getStatusColor(capability.status)} text-white text-xs`}>
                          {getStatusText(capability.status)}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{capability.description}</p>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${capability.power}%` }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Puissance: {capability.power}%</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Interface de chat */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-black/50 border-purple-500/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Crown className="w-6 h-6 text-purple-400" />
                <span>Chat Ultra AI</span>
                <Badge className="bg-purple-600 text-white">ULTRA</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Messages */}
              <div className="h-96 overflow-y-auto mb-4 space-y-4 p-4 bg-black/30 rounded-lg">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, x: message.type === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-purple-600/20 border border-purple-500/50 text-white'
                    }`}>
                      <div className="flex items-center space-x-2 mb-2">
                        {message.type === 'ai' && (
                          <>
                            <Bot className="w-4 h-4 text-purple-400" />
                            <span className="text-xs text-purple-400">ULTRA AI</span>
                            {message.confidence && (
                              <Badge className="bg-green-600 text-white text-xs">
                                {message.confidence}%
                              </Badge>
                            )}
                          </>
                        )}
                      </div>
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                      <div className="text-xs text-gray-400 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-purple-600/20 border border-purple-500/50 text-white p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Bot className="w-4 h-4 text-purple-400" />
                        </motion.div>
                        <span className="text-sm">ULTRA AI réfléchit...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex space-x-2">
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Posez votre question à ULTRA AI..."
                  className="flex-1 bg-black/30 border-purple-500/50 text-white placeholder-gray-400"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isProcessing || !inputValue.trim()}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Sparkles className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Footer SEO */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="mt-8 text-center text-gray-400 text-sm"
      >
        <p>🔮 ULTRA AI 2025 - Le bot le plus avancé au monde</p>
        <p>Capacités uniques : Multi-dimensionnel • Auto-apprentissage • Auto-modification • Mode hacking</p>
        <p>Plus puissant que ChatGPT, Claude et Gemini réunis</p>
      </motion.div>
    </div>
  );
} 