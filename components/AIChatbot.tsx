'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from '@/components/ui/motion';
import { Send, Bot, User, Sparkles, Mic, MicOff, Settings, Download, Share2 } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'suggestion' | 'action';
  metadata?: {
    action?: string;
    data?: any;
  };
}

interface Suggestion {
  id: string;
  text: string;
  action?: string;
  icon?: string;
}

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [chatHistory, setChatHistory] = useState<Message[][]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialSuggestions: Suggestion[] = [
    { id: '1', text: 'Générer un rapport', action: 'generate_report', icon: '📊' },
    { id: '2', text: 'Aide avec les formulaires', action: 'form_help', icon: '📝' },
    { id: '3', text: 'Analyser des données', action: 'analyze_data', icon: '🔍' },
    { id: '4', text: 'Créer un document', action: 'create_document', icon: '📄' }
  ];

  useEffect(() => {
    setSuggestions(initialSuggestions);
    // Message de bienvenue
    addBotMessage("Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider aujourd'hui ?");
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBotMessage = (content: string, type: 'text' | 'suggestion' | 'action' = 'text', metadata?: any) => {
    const message: Message = {
      id: `msg_${Date.now()}`,
      content,
      sender: 'bot',
      timestamp: new Date(),
      type,
      metadata
    };
    setMessages(prev => [...prev, message]);
  };

  const addUserMessage = (content: string) => {
    const message: Message = {
      id: `msg_${Date.now()}`,
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };
    setMessages(prev => [...prev, message]);
  };

  const simulateTyping = async () => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    setIsTyping(false);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    addUserMessage(userMessage);
    setInputValue('');

    // Simuler la réponse de l'IA
    await simulateTyping();

    // Logique de réponse basée sur le contenu
    const response = generateAIResponse(userMessage);
    addBotMessage(response);

    // Mettre à jour les suggestions contextuelles
    updateSuggestions(userMessage);
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('rapport') || lowerMessage.includes('report')) {
      return "Je peux vous aider à générer un rapport. Quel type de rapport souhaitez-vous ? (Ventes, RH, Financier, etc.)";
    }

    if (lowerMessage.includes('formulaire') || lowerMessage.includes('form')) {
      return "Je peux vous assister avec les formulaires. Voulez-vous créer un nouveau formulaire ou modifier un existant ?";
    }

    if (lowerMessage.includes('données') || lowerMessage.includes('data') || lowerMessage.includes('analyse')) {
      return "Je peux analyser vos données et fournir des insights. Quel type d'analyse vous intéresse ?";
    }

    if (lowerMessage.includes('document') || lowerMessage.includes('créer')) {
      return "Je peux vous aider à créer des documents. Quel type de document souhaitez-vous ? (Contrat, Rapport, Présentation, etc.)";
    }

    if (lowerMessage.includes('merci') || lowerMessage.includes('thanks')) {
      return "De rien ! N'hésitez pas si vous avez d'autres questions.";
    }

    return "Je comprends votre demande. Laissez-moi vous aider avec cela. Pouvez-vous me donner plus de détails ?";
  };

  const updateSuggestions = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('rapport')) {
      setSuggestions([
        { id: '1', text: 'Rapport de ventes', action: 'sales_report', icon: '💰' },
        { id: '2', text: 'Rapport RH', action: 'hr_report', icon: '👥' },
        { id: '3', text: 'Rapport financier', action: 'financial_report', icon: '📈' },
        { id: '4', text: 'Rapport personnalisé', action: 'custom_report', icon: '⚙️' }
      ]);
    } else if (lowerMessage.includes('formulaire')) {
      setSuggestions([
        { id: '1', text: 'Créer un formulaire', action: 'create_form', icon: '➕' },
        { id: '2', text: 'Modifier un formulaire', action: 'edit_form', icon: '✏️' },
        { id: '3', text: 'Partager un formulaire', action: 'share_form', icon: '📤' },
        { id: '4', text: 'Analyser les réponses', action: 'analyze_responses', icon: '📊' }
      ]);
    } else {
      setSuggestions(initialSuggestions);
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    addUserMessage(suggestion.text);
    setInputValue('');
    
    // Simuler la réponse
    setTimeout(async () => {
      await simulateTyping();
      addBotMessage(`Je vais vous aider avec "${suggestion.text}". Laissez-moi préparer cela pour vous...`);
    }, 500);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simuler la reconnaissance vocale
      setTimeout(() => {
        const voiceInput = "Générer un rapport de ventes";
        setInputValue(voiceInput);
        setIsListening(false);
      }, 2000);
    }
  };

  const exportChat = () => {
    const chatText = messages.map(msg => 
      `${msg.sender === 'user' ? 'Vous' : 'Assistant'}: ${msg.content}`
    ).join('\n\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareChat = () => {
    if (navigator.share) {
      const chatText = messages.map(msg => 
        `${msg.sender === 'user' ? 'Vous' : 'Assistant'}: ${msg.content}`
      ).join('\n\n');
      
      navigator.share({
        title: 'Conversation avec l\'Assistant IA',
        text: chatText
      });
    } else {
      // Fallback: copier dans le presse-papiers
      const chatText = messages.map(msg => 
        `${msg.sender === 'user' ? 'Vous' : 'Assistant'}: ${msg.content}`
      ).join('\n\n');
      
      navigator.clipboard.writeText(chatText);
      // Afficher une notification
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Assistant IA</h2>
              <p className="text-sm text-gray-600">Assistant intelligent disponible 24/7</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportChat}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Exporter la conversation"
            >
              <Download className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={shareChat}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Partager la conversation"
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Paramètres"
            >
              <Settings className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' 
                    ? 'bg-blue-500' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`p-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-900 shadow-sm border'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white p-3 rounded-2xl shadow-sm border">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="p-4 border-t bg-white">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-700">Suggestions</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <motion.button
                key={suggestion.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSuggestionClick(suggestion)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-full text-sm transition-colors flex items-center gap-2"
              >
                <span>{suggestion.icon}</span>
                {suggestion.text}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleVoiceInput}
            className={`p-2 rounded-lg transition-colors ${
              isListening 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={isListening ? 'Arrêter l\'écoute' : 'Activer la reconnaissance vocale'}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </motion.button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Tapez votre message..."
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
              disabled={isListening}
            />
            {isListening && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isListening}
            className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
} 