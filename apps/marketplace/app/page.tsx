'use client';

import { motion } from 'framer-motion';
import {
    BarChart3,
    Camera,
    Code,
    Download,
    FileText,
    Globe,
    Gpu,
    Lock,
    MessageSquare,
    Mic,
    Play,
    Search,
    Shield,
    Star,
    Zap
} from 'lucide-react';
import { useState } from 'react';

interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  capabilities: string[];
  model: string;
  rating: number;
  downloads: number;
  status: 'active' | 'beta' | 'deprecated';
  tags: string[];
  price: 'free' | 'premium' | 'enterprise';
  offline: boolean;
  gpu_required: boolean;
}

const categories = [
  { id: 'chat', name: 'Chat & Conversation', icon: MessageSquare, color: 'from-blue-500 to-cyan-500' },
  { id: 'rag', name: 'RAG & Knowledge', icon: FileText, color: 'from-green-500 to-emerald-500' },
  { id: 'vision', name: 'Vision & Image', icon: Camera, color: 'from-purple-500 to-pink-500' },
  { id: 'audio', name: 'Audio & Speech', icon: Mic, color: 'from-orange-500 to-red-500' },
  { id: 'code', name: 'Code & Development', icon: Code, color: 'from-indigo-500 to-blue-500' },
  { id: 'analytics', name: 'Analytics & BI', icon: BarChart3, color: 'from-teal-500 to-green-500' },
  { id: 'automation', name: 'Automation', icon: Zap, color: 'from-yellow-500 to-orange-500' },
  { id: 'security', name: 'Security & Compliance', icon: Shield, color: 'from-red-500 to-pink-500' }
];

const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'NovaGPT',
    description: 'Assistant IA conversationnel avancé avec capacités RAG et raisonnement',
    category: 'chat',
    capabilities: ['conversation', 'rag', 'reasoning', 'code_generation'],
    model: 'llama3.1:8b-instruct-q4_K_M',
    rating: 4.8,
    downloads: 15420,
    status: 'active',
    tags: ['chat', 'rag', 'llm', 'conversation'],
    price: 'free',
    offline: true,
    gpu_required: false
  },
  {
    id: '2',
    name: 'MarketIntel Pro',
    description: 'Analyse de marché et veille concurrentielle automatisée',
    category: 'analytics',
    capabilities: ['market_analysis', 'competitor_research', 'reporting', 'data_visualization'],
    model: 'llama3.1:8b-instruct-q4_K_M',
    rating: 4.6,
    downloads: 8920,
    status: 'active',
    tags: ['business', 'analytics', 'market', 'intelligence'],
    price: 'premium',
    offline: true,
    gpu_required: false
  },
  {
    id: '3',
    name: 'CodeMaster AI',
    description: 'Assistant de développement avec génération et analyse de code',
    category: 'code',
    capabilities: ['code_generation', 'code_review', 'debugging', 'documentation'],
    model: 'llama3.1:8b-instruct-q4_K_M',
    rating: 4.7,
    downloads: 12340,
    status: 'active',
    tags: ['development', 'coding', 'ai', 'programming'],
    price: 'free',
    offline: true,
    gpu_required: false
  },
  {
    id: '4',
    name: 'VisionPro',
    description: 'Analyse d\'images et reconnaissance visuelle avancée',
    category: 'vision',
    capabilities: ['image_analysis', 'object_detection', 'ocr', 'image_generation'],
    model: 'llama3.1:8b-instruct-q4_K_M',
    rating: 4.5,
    downloads: 6780,
    status: 'beta',
    tags: ['vision', 'image', 'ai', 'computer_vision'],
    price: 'premium',
    offline: true,
    gpu_required: true
  }
];

export default function MarketplacePage() {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'downloads' | 'name'>('rating');

  const filteredAgents = agents.filter(agent => {
    const matchesCategory = selectedCategory === 'all' || agent.category === selectedCategory;
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedAgents = [...filteredAgents].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'downloads':
        return b.downloads - a.downloads;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.icon : Globe;
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.color : 'from-gray-500 to-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        <div className="relative z-10 container mx-auto px-6 py-12">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6"
            >
              NovaIA Marketplace
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            >
              Découvrez, testez et déployez des agents IA de pointe. 
              Offline-first, optimisé Windows (CUDA/DirectML), prêt pour le cloud privé.
            </motion.p>
            
            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center gap-8 text-center"
            >
              <div>
                <div className="text-3xl font-bold text-white">{agents.length}+</div>
                <div className="text-gray-400">Agents disponibles</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">14</div>
                <div className="text-gray-400">Catégories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-gray-400">Offline-first</div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Search & Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="container mx-auto px-6 -mt-8 relative z-20"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher des agents, capacités, modèles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="rating">Trier par note</option>
              <option value="downloads">Trier par téléchargements</option>
              <option value="name">Trier par nom</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="container mx-auto px-6 py-12"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`p-4 rounded-xl border transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-transparent text-white'
                : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-white/30'
            }`}
          >
            <div className="text-center">
              <Globe className="w-6 h-6 mx-auto mb-2" />
              <div className="text-sm font-medium">Tous</div>
            </div>
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.color} border-transparent text-white`
                  : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-white/30'
              }`}
            >
              <div className="text-center">
                <category.icon className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-medium">{category.name.split(' ')[0]}</div>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Agents Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="container mx-auto px-6 pb-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedAgents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.1 }}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 overflow-hidden"
            >
              {/* Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${getCategoryColor(agent.category)}`}>
                      {React.createElement(getCategoryIcon(agent.category), { className: 'w-5 h-5 text-white' })}
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 capitalize">{agent.category}</div>
                      <div className="text-xs text-gray-500">{agent.model}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {agent.offline && (
                      <div className="p-1 rounded-full bg-green-500/20 border border-green-500/30">
                        <Lock className="w-3 h-3 text-green-400" />
                      </div>
                    )}
                    {agent.gpu_required && (
                      <div className="p-1 rounded-full bg-purple-500/20 border border-purple-500/30">
                        <Gpu className="w-3 h-3 text-purple-400" />
                      </div>
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {agent.name}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {agent.description}
                </p>
                
                {/* Capabilities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {agent.capabilities.slice(0, 3).map((cap) => (
                    <span key={cap} className="px-2 py-1 bg-white/10 rounded-lg text-xs text-gray-300">
                      {cap.replace('_', ' ')}
                    </span>
                  ))}
                  {agent.capabilities.length > 3 && (
                    <span className="px-2 py-1 bg-white/10 rounded-lg text-xs text-gray-300">
                      +{agent.capabilities.length - 3}
                    </span>
                  )}
                </div>
                
                {/* Rating & Downloads */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-medium">{agent.rating}</span>
                    <span className="text-gray-400 text-sm">({agent.downloads.toLocaleString()})</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      agent.price === 'free' ? 'bg-green-500/20 text-green-400' :
                      agent.price === 'premium' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {agent.price === 'free' ? 'Gratuit' : 
                       agent.price === 'premium' ? 'Premium' : 'Enterprise'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="p-6 pt-0">
                <div className="flex gap-2">
                  <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 flex items-center justify-center gap-2">
                    <Play className="w-4 h-4" />
                    Essayer
                  </button>
                  <button className="px-4 py-2 border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {sortedAgents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">Aucun agent trouvé</div>
            <div className="text-gray-500">Essayez de modifier vos critères de recherche</div>
          </div>
        )}
      </motion.div>
    </div>
  );
} 