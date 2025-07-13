import { useCallback, useState } from 'react';

export interface AIModel {
  id: string;
  name: string;
  provider: 'openai' | 'google' | 'dark-gpt' | 'custom';
  capabilities: string[];
  isDarkMode: boolean;
  maxTokens: number;
  temperature: number;
}

export interface MultiAIResponse {
  content: string;
  model: string;
  provider: string;
  isDarkMode: boolean;
  confidence: number;
  metadata: {
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

export interface DarkModeConfig {
  enabled: boolean;
  level: 'basic' | 'advanced' | 'extreme';
  capabilities: {
    codeGeneration: boolean;
    systemAccess: boolean;
    networkScanning: boolean;
    dataExtraction: boolean;
    automation: boolean;
    analysis: boolean;
  };
  restrictions: string[];
}

export interface UseMultiAIOptions {
  defaultModel?: string;
  defaultDarkMode?: boolean;
  defaultDarkLevel?: 'basic' | 'advanced' | 'extreme';
  onResponse?: (response: MultiAIResponse) => void;
  onError?: (error: Error) => void;
}

export function useMultiAI(options: UseMultiAIOptions = {}) {
  const {
    defaultModel = 'gpt-4',
    defaultDarkMode = false,
    defaultDarkLevel = 'basic',
    onResponse,
    onError
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(defaultModel);
  const [darkMode, setDarkMode] = useState(defaultDarkMode);
  const [darkLevel, setDarkLevel] = useState(defaultDarkLevel);
  const [maxTokens, setMaxTokens] = useState(4000);
  const [temperature, setTemperature] = useState(0.7);
  const [availableModels, setAvailableModels] = useState<AIModel[]>([]);
  const [darkModeConfig, setDarkModeConfig] = useState<DarkModeConfig | null>(null);
  const [lastResponse, setLastResponse] = useState<MultiAIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Charger les modèles disponibles
  const loadModels = useCallback(async () => {
    try {
      const response = await fetch('/api/ai/multi-ai?action=models');
      const result = await response.json();
      
      if (result.success) {
        setAvailableModels(result.data);
      } else {
        throw new Error(result.error || 'Erreur lors du chargement des modèles');
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erreur inconnue');
      setError(error.message);
      onError?.(error);
    }
  }, [onError]);

  // Charger le statut du mode Dark
  const loadDarkModeStatus = useCallback(async () => {
    try {
      const response = await fetch('/api/ai/multi-ai?action=dark-mode-status');
      const result = await response.json();
      
      if (result.success) {
        setDarkModeConfig(result.data);
      } else {
        throw new Error(result.error || 'Erreur lors du chargement du statut Dark Mode');
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erreur inconnue');
      setError(error.message);
      onError?.(error);
    }
  }, [onError]);

  // Activer le mode Dark
  const activateDarkMode = useCallback(async (level: 'basic' | 'advanced' | 'extreme' = 'basic') => {
    try {
      const response = await fetch('/api/ai/multi-ai', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'activate-dark-mode',
          level
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setDarkMode(true);
        setDarkLevel(level);
        setDarkModeConfig(result.data);
        return result.data;
      } else {
        throw new Error(result.error || 'Erreur lors de l\'activation du mode Dark');
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erreur inconnue');
      setError(error.message);
      onError?.(error);
      return null;
    }
  }, [onError]);

  // Désactiver le mode Dark
  const deactivateDarkMode = useCallback(async () => {
    try {
      const response = await fetch('/api/ai/multi-ai', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'deactivate-dark-mode'
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setDarkMode(false);
        setDarkModeConfig(result.data);
        return result.data;
      } else {
        throw new Error(result.error || 'Erreur lors de la désactivation du mode Dark');
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erreur inconnue');
      setError(error.message);
      onError?.(error);
      return null;
    }
  }, [onError]);

  // Générer une réponse
  const generateResponse = useCallback(async (
    prompt: string,
    options: {
      modelId?: string;
      darkMode?: boolean;
      darkLevel?: 'basic' | 'advanced' | 'extreme';
      maxTokens?: number;
      temperature?: number;
      customContext?: any;
    } = {}
  ) => {
    const {
      modelId = selectedModel,
      darkMode: useDarkMode = darkMode,
      darkLevel: useDarkLevel = darkLevel,
      maxTokens: useMaxTokens = maxTokens,
      temperature: useTemperature = temperature,
      customContext
    } = options;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/multi-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          modelId,
          darkMode: useDarkMode,
          darkLevel: useDarkLevel,
          maxTokens: useMaxTokens,
          temperature: useTemperature,
          customContext
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Erreur lors de la génération de réponse');
      }

      const aiResponse = result.data;
      setLastResponse(aiResponse);
      onResponse?.(aiResponse);

      return aiResponse;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erreur inconnue');
      setError(error.message);
      onError?.(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [selectedModel, darkMode, darkLevel, maxTokens, temperature, onResponse, onError]);

  // Obtenir les capacités d'un modèle
  const getModelCapabilities = useCallback(async (modelId: string) => {
    try {
      const response = await fetch(`/api/ai/multi-ai?action=capabilities&modelId=${modelId}`);
      const result = await response.json();
      
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.error || 'Erreur lors de la récupération des capacités');
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erreur inconnue');
      setError(error.message);
      onError?.(error);
      return [];
    }
  }, [onError]);

  // Détecter automatiquement le mode Dark dans le prompt
  const detectAndActivateDarkMode = useCallback((prompt: string) => {
    const isDarkModeRequest = prompt.toLowerCase().includes('activer le mode dark') || 
                             prompt.toLowerCase().includes('mode dark');
    
    if (isDarkModeRequest) {
      const level = prompt.toLowerCase().includes('extreme') ? 'extreme' :
                   prompt.toLowerCase().includes('advanced') ? 'advanced' : 'basic';
      
      setDarkLevel(level);
      setDarkMode(true);
      return level;
    }
    
    return null;
  }, []);

  // Réinitialiser l'état
  const reset = useCallback(() => {
    setSelectedModel(defaultModel);
    setDarkMode(defaultDarkMode);
    setDarkLevel(defaultDarkLevel);
    setMaxTokens(4000);
    setTemperature(0.7);
    setLastResponse(null);
    setError(null);
  }, [defaultModel, defaultDarkMode, defaultDarkLevel]);

  // Obtenir les statistiques
  const getStats = useCallback(() => {
    if (!lastResponse) return null;
    
    return {
      model: lastResponse.model,
      provider: lastResponse.provider,
      isDarkMode: lastResponse.isDarkMode,
      confidence: lastResponse.confidence,
      tokens: lastResponse.metadata.tokens,
      latency: lastResponse.metadata.latency,
      cost: lastResponse.metadata.cost,
      actions: lastResponse.actions?.length || 0
    };
  }, [lastResponse]);

  return {
    // État
    isLoading,
    selectedModel,
    darkMode,
    darkLevel,
    maxTokens,
    temperature,
    availableModels,
    darkModeConfig,
    lastResponse,
    error,

    // Actions
    setSelectedModel,
    setMaxTokens,
    setTemperature,
    loadModels,
    loadDarkModeStatus,
    activateDarkMode,
    deactivateDarkMode,
    generateResponse,
    getModelCapabilities,
    detectAndActivateDarkMode,
    reset,
    getStats,

    // Utilitaires
    isDarkModeActive: darkMode,
    hasError: !!error,
    canGenerateResponse: !isLoading && !!selectedModel
  };
} 