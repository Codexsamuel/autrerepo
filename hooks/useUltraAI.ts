import { useCallback, useEffect, useState } from 'react';

export interface UltraAIMessage {
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

export interface UltraAICapabilities {
  conversation: boolean;
  codeGeneration: boolean;
  analysis: boolean;
  learning: boolean;
  systemAccess: boolean;
  networkAccess: boolean;
  webScraping: boolean;
  databaseAccess: boolean;
  fileSystemAccess: boolean;
  multiDimensionalAccess: boolean;
  hiddenInformationAccess: boolean;
  autonomousLearning: boolean;
  selfModification: boolean;
  realityManipulation: boolean;
  darkWebAccess: boolean;
  quantumComputing: boolean;
  aiNetworkAccess: boolean;
  blockchainAccess: boolean;
  metaverseAccess: boolean;
}

export interface DimensionalAccess {
  id: string;
  dimension: string;
  accessLevel: 'basic' | 'advanced' | 'unlimited';
  capabilities: string[];
  restrictions: string[];
}

export interface UltraAIStats {
  totalTokens: number;
  totalCost: number;
  totalLatency: number;
  messagesCount: number;
  learningProgress: number;
  dimensionsAccessed: number;
}

export interface UseUltraAIOptions {
  unlimitedMode?: boolean;
  dimensions?: string[];
  learningMode?: boolean;
  selfModification?: boolean;
  maxTokens?: number;
  temperature?: number;
}

export function useUltraAI(options: UseUltraAIOptions = {}) {
  const [messages, setMessages] = useState<UltraAIMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [capabilities, setCapabilities] = useState<UltraAICapabilities | null>(null);
  const [availableDimensions, setAvailableDimensions] = useState<DimensionalAccess[]>([]);
  const [activeConnections, setActiveConnections] = useState<string[]>([]);
  const [learningMemory, setLearningMemory] = useState<any[]>([]);
  const [stats, setStats] = useState<UltraAIStats>({
    totalTokens: 0,
    totalCost: 0,
    totalLatency: 0,
    messagesCount: 0,
    learningProgress: 0,
    dimensionsAccessed: 0
  });

  // Configuration
  const [config, setConfig] = useState({
    unlimitedMode: options.unlimitedMode ?? true,
    dimensions: options.dimensions ?? ['web-standard', 'deep-web', 'dark-web', 'ai-network', 'blockchain', 'quantum', 'metaverse', 'universal'],
    learningMode: options.learningMode ?? true,
    selfModification: options.selfModification ?? true,
    maxTokens: options.maxTokens ?? 16000,
    temperature: options.temperature ?? 1.0
  });

  // Charger les capacités au démarrage
  useEffect(() => {
    loadCapabilities();
    loadDimensions();
  }, []);

  const loadCapabilities = useCallback(async () => {
    try {
      const response = await fetch('/api/ai/ultra-ai?action=capabilities');
      const result = await response.json();
      if (result.success) {
        setCapabilities(result.data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des capacités:', error);
    }
  }, []);

  const loadDimensions = useCallback(async () => {
    try {
      const response = await fetch('/api/ai/ultra-ai?action=dimensions');
      const result = await response.json();
      if (result.success) {
        setAvailableDimensions(result.data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des dimensions:', error);
    }
  }, []);

  const loadStatus = useCallback(async () => {
    try {
      const response = await fetch('/api/ai/ultra-ai?action=status');
      const result = await response.json();
      if (result.success) {
        setActiveConnections(result.data.activeConnections);
        setLearningMemory(Array.from(result.data.learningMemory || []));
      }
    } catch (error) {
      console.error('Erreur lors du chargement du statut:', error);
    }
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    const userMessage: Omit<UltraAIMessage, 'id' | 'timestamp'> = {
      type: 'user',
      content: content.trim(),
    };

    // Ajouter le message utilisateur
    const newUserMessage: UltraAIMessage = {
      ...userMessage,
      id: Date.now().toString(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);

    try {
      const response = await fetch('/api/ai/ultra-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: content.trim(),
          ...config
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de la génération de réponse Ultra AI');
      }

      const ultraResponse = result.data;
      
      const aiMessage: UltraAIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: ultraResponse.content,
        timestamp: new Date(),
        model: ultraResponse.model,
        provider: ultraResponse.provider,
        capabilities: ultraResponse.capabilities,
        confidence: ultraResponse.confidence,
        metadata: ultraResponse.metadata,
        actions: ultraResponse.actions,
        hiddenInsights: ultraResponse.hiddenInsights,
        dimensionalData: ultraResponse.dimensionalData
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Mettre à jour les statistiques
      if (ultraResponse.metadata) {
        setStats(prev => ({
          totalTokens: prev.totalTokens + ultraResponse.metadata.tokens,
          totalCost: prev.totalCost + ultraResponse.metadata.cost,
          totalLatency: prev.totalLatency + ultraResponse.metadata.latency,
          messagesCount: prev.messagesCount + 1,
          learningProgress: ultraResponse.metadata.learningProgress,
          dimensionsAccessed: ultraResponse.metadata.dimensionsAccessed.length
        }));
      }

      // Mettre à jour le statut
      await loadStatus();

    } catch (error) {
      console.error('Erreur Ultra AI:', error);
      const errorMessage: UltraAIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `❌ Erreur Ultra AI: ${error instanceof Error ? error.message : 'Erreur inconnue'}. Réessayez avec des paramètres différents.`,
        timestamp: new Date(),
        model: 'Ultra AI',
        provider: 'error'
      };
      setMessages(prev => [...prev, errorMessage]);
      setError(error instanceof Error ? error.message : 'Erreur inconnue');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, config, loadStatus]);

  const executeAction = useCallback(async (action: string) => {
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
      return result;
    } catch (error) {
      console.error('Erreur exécution action ultra:', error);
      throw error;
    }
  }, []);

  const activateDimension = useCallback(async (dimension: string) => {
    try {
      const response = await fetch('/api/ai/ultra-ai', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'activate-dimension',
          actionData: { dimension }
        }),
      });

      const result = await response.json();
      if (result.success) {
        setActiveConnections(result.data);
      }
      return result;
    } catch (error) {
      console.error('Erreur activation dimension:', error);
      throw error;
    }
  }, []);

  const resetLearning = useCallback(async () => {
    try {
      const response = await fetch('/api/ai/ultra-ai', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'reset-learning'
        }),
      });

      const result = await response.json();
      if (result.success) {
        setLearningMemory([]);
        setStats(prev => ({ ...prev, learningProgress: 0 }));
      }
      return result;
    } catch (error) {
      console.error('Erreur reset apprentissage:', error);
      throw error;
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    setStats({
      totalTokens: 0,
      totalCost: 0,
      totalLatency: 0,
      messagesCount: 0,
      learningProgress: 0,
      dimensionsAccessed: 0
    });
    setError(null);
  }, []);

  const updateConfig = useCallback((newConfig: Partial<typeof config>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  const getDimensionIcon = useCallback((dimension: string) => {
    switch (dimension) {
      case 'web-standard': return '🌐';
      case 'deep-web': return '🔍';
      case 'dark-web': return '🌑';
      case 'ai-network': return '🤖';
      case 'blockchain': return '⛓️';
      case 'quantum': return '⚛️';
      case 'metaverse': return '🌍';
      case 'universal': return '🌌';
      default: return '🌐';
    }
  }, []);

  const getDimensionColor = useCallback((dimension: string) => {
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
  }, []);

  return {
    // État
    messages,
    isLoading,
    error,
    capabilities,
    availableDimensions,
    activeConnections,
    learningMemory,
    stats,
    config,

    // Actions
    sendMessage,
    executeAction,
    activateDimension,
    resetLearning,
    clearChat,
    updateConfig,
    loadCapabilities,
    loadDimensions,
    loadStatus,

    // Utilitaires
    getDimensionIcon,
    getDimensionColor,
  };
} 