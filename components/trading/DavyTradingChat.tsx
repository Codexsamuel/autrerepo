'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  BarChart,
  BarChart2,
  BarChart3,
  BarChart4,
  BarChartHorizontal,
  Bell,
  BellOff,
  BellRing,
  BookOpen,
  Bot,
  Brain,
  Briefcase,
  Building2,
  Calendar,
  CalendarClock,
  CalendarDays,
  CalendarRange,
  CalendarSearch,
  Camera,
  CameraOff,
  Car,
  CarFront,
  CarTaxiFront,
  Check,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
  CircleDot,
  CircleEllipsis,
  CircleUser,
  CircleUserRound,
  Clock,
  Cloud,
  CloudCog,
  CloudDrizzle,
  CloudFog,
  CloudHail,
  CloudLightning,
  CloudMoon,
  CloudOff,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  CloudSun,
  Cloudy,
  Code,
  Code2,
  Cog,
  Command,
  Compass,
  Computer,
  Copy,
  CreditCard,
  Crop,
  Database,
  Delete,
  Download,
  DownloadCloud,
  Droplets,
  Edit,
  Edit2,
  Edit3,
  ExternalLink,
  Eye,
  EyeOff,
  File,
  FileAudio,
  FileBadge,
  FileBarChart,
  FileBarChart2,
  FileCheck,
  FileCode,
  FileSpreadsheet,
  FileText,
  FileType,
  FileVideo,
  FileWarning,
  FileX,
  FileX2,
  Filter,
  FilterX,
  Flag,
  Folder,
  FolderArchive,
  FolderCheck,
  FolderClock,
  FolderClosed,
  FolderCog,
  FolderDown,
  FolderEdit,
  FolderGit,
  FolderGit2,
  FolderHeart,
  FolderInput,
  FolderKey,
  FolderLock,
  FolderMinus,
  FolderOpen,
  FolderOutput,
  FolderPlus,
  FolderSearch,
  FolderSymlink,
  FolderTree,
  FolderUp,
  FolderX,
  Folders,
  Forward,
  Gauge,
  GaugeCircle,
  Globe,
  Globe2,
  GraduationCap,
  Grid,
  HardDrive,
  Headphones,
  Heart,
  HeartHandshake,
  HelpCircle,
  History,
  Home,
  Image,
  ImageDown,
  ImageMinus,
  ImageOff,
  ImagePlus,
  Inbox,
  Info,
  Key,
  Keyboard,
  Laptop,
  Layout,
  LayoutDashboard,
  LayoutGrid,
  LayoutList,
  LayoutPanelLeft,
  LayoutPanelTop,
  LayoutTemplate,
  Lightbulb,
  Link,
  Link2,
  Link2Off,
  List,
  ListChecks,
  ListFilter,
  ListMinus,
  ListMusic,
  ListOrdered,
  ListPlus,
  ListRestart,
  ListStart,
  ListTodo,
  ListTree,
  ListVideo,
  ListX,
  Loader,
  Loader2,
  Lock,
  LockKeyhole,
  LogIn,
  LogOut,
  LucideProps,
  Mail,
  Map,
  MapPin,
  Maximize,
  Maximize2,
  Menu,
  MessageCircle,
  MessageSquare,
  MessagesSquare,
  Mic,
  MicOff,
  Minimize,
  Minimize2,
  Minus,
  MinusCircle,
  Monitor,
  MonitorDown,
  MonitorOff,
  MonitorPlay,
  MonitorSmartphone,
  MonitorSpeaker,
  MonitorStop,
  MonitorUp,
  Moon,
  MoreHorizontal,
  MoreVertical,
  MousePointer,
  MousePointer2,
  Move,
  MoveDown,
  MoveHorizontal,
  MoveLeft,
  MoveRight,
  MoveUp,
  MoveVertical,
  Music,
  Music2,
  Music3,
  Music4,
  Navigation,
  Navigation2,
  Network,
  Newspaper,
  Package,
  Package2,
  PackageCheck,
  PackageMinus,
  PackageOpen,
  PackagePlus,
  PackageSearch,
  PackageX,
  Paintbrush,
  Palette,
  PanelBottom,
  PanelBottomClose,
  PanelBottomDashed,
  PanelBottomOpen,
  PanelLeft,
  PanelLeftClose,
  PanelLeftDashed,
  PanelLeftOpen,
  PanelRight,
  PanelRightClose,
  PanelRightDashed,
  PanelRightOpen,
  PanelTop,
  PanelTopClose,
  PanelTopDashed,
  PanelTopOpen,
  Paperclip,
  Pause,
  PauseCircle,
  PenTool,
  Percent,
  Phone,
  PhoneCall,
  PhoneForwarded,
  PhoneIncoming,
  PhoneMissed,
  PhoneOff,
  PhoneOutgoing,
  PieChart,
  Pin,
  PinOff,
  Play,
  PlayCircle,
  Plus,
  PlusCircle,
  Podcast,
  Power,
  PowerOff,
  Presentation,
  Printer,
  QrCode,
  Radio,
  RefreshCcw,
  RefreshCw,
  Repeat,
  Repeat1,
  Reply,
  ReplyAll,
  Rewind,
  Rocket,
  RotateCcw,
  RotateCw,
  Rss,
  Save,
  Scale,
  Scan,
  ScanFace,
  ScanLine,
  Scissors,
  Search,
  Send,
  Server,
  ServerCog,
  ServerCrash,
  ServerOff,
  Settings,
  Settings2,
  Share,
  Share2,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldClose,
  ShieldOff,
  ShoppingBag,
  ShoppingCart,
  Shuffle,
  Sidebar,
  SidebarClose,
  SidebarOpen,
  SkipBack,
  SkipForward,
  Sliders,
  SlidersHorizontal,
  Smartphone,
  SmartphoneCharging,
  SmartphoneNfc,
  Smile,
  Snowflake,
  Speaker,
  Square,
  SquareStack,
  Star,
  StarHalf,
  StarOff,
  Stethoscope,
  StopCircle,
  Store,
  StretchHorizontal,
  StretchVertical,
  Sun,
  SunDim,
  SunMedium,
  SunMoon,
  SunSnow,
  Sunrise,
  Sunset,
  SwitchCamera,
  Table,
  Table2,
  TableProperties,
  Tablet,
  Tag,
  Tags,
  Target,
  Terminal,
  Thermometer,
  ThermometerSun,
  Timer,
  TimerOff,
  TimerReset,
  ToggleLeft,
  ToggleRight,
  Trash,
  Trash2,
  TrendingDown,
  TrendingUp,
  Trophy,
  Truck,
  Tv,
  Tv2,
  Type,
  Umbrella,
  Underline,
  Undo,
  Undo2,
  Unlink,
  Unlink2,
  Upload,
  UploadCloud,
  User,
  UserCheck,
  UserCog,
  UserMinus,
  UserPlus,
  UserRound,
  UserX,
  Users,
  Users2,
  UsersRound,
  Video,
  VideoOff,
  View,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
  Wallet,
  Wand2,
  Watch,
  Webcam,
  Wifi,
  WifiOff,
  Wind,
  Workflow,
  WrapText,
  Wrench,
  X,
  XCircle,
  Youtube,
  Zap,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

interface ChatMessage {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  sender: string;
  avatar?: string;
  isTyping?: boolean;
  suggestions?: string[];
  data?: any;
  confidence?: number;
  action?: string;
}

interface TradingData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  trend: 'bullish' | 'bearish' | 'neutral';
  recommendation: string;
  confidence: number;
}

export default function DavyTradingChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [aiPersonality, setAiPersonality] = useState<'professional' | 'friendly' | 'expert'>('expert');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('dark');
  const [chatMode, setChatMode] = useState<'trading' | 'analysis' | 'education'>('trading');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Données de trading simulées
  const tradingData: TradingData[] = [
    {
      symbol: 'AAPL',
      price: 185.92,
      change: 2.45,
      changePercent: 1.33,
      volume: 45678900,
      trend: 'bullish',
      recommendation: 'Acheter avec stop-loss à 175$',
      confidence: 85
    },
    {
      symbol: 'BTC',
      price: 43250.75,
      change: -1250.25,
      changePercent: -2.81,
      volume: 28456789000,
      trend: 'bearish',
      recommendation: 'Maintenir les positions existantes',
      confidence: 72
    },
    {
      symbol: 'ETH',
      price: 2650.45,
      change: 45.67,
      changePercent: 1.75,
      volume: 15678900000,
      trend: 'bullish',
      recommendation: 'Acheter avec stop-loss à 2550$',
      confidence: 78
    }
  ];

  // Suggestions de questions
  const suggestionQuestions = [
    "Quelle est l'analyse technique d'AAPL ?",
    "Dois-je acheter du Bitcoin maintenant ?",
    "Quels sont les meilleurs actifs pour un débutant ?",
    "Comment gérer le risque dans mon portefeuille ?",
    "Quelle stratégie recommandes-tu pour 2024 ?",
    "Peux-tu analyser mon portefeuille actuel ?",
    "Quels sont les signaux de marché aujourd'hui ?",
    "Comment optimiser mes positions ?"
  ];

  // Messages initiaux
  const initialMessages: ChatMessage[] = [
    {
      id: '1',
      type: 'ai',
      content: `Bonjour ! Je suis DAVY, votre assistant IA spécialisé en trading. 🤖✨

Je peux vous aider avec :
• 📊 Analyses techniques et fondamentales
• 💡 Recommandations personnalisées
• 📈 Suivi de portefeuille
• 🎯 Stratégies de trading
• 📚 Éducation financière

Comment puis-je vous aider aujourd'hui ?`,
      timestamp: new Date(),
      sender: 'DAVY',
      suggestions: suggestionQuestions.slice(0, 4)
    }
  ];

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      scrollToBottom();
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const simulateTyping = async (duration: number = 2000) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, duration));
    setIsTyping(false);
  };

  const generateAIResponse = async (userMessage: string) => {
    await simulateTyping();

    let response: ChatMessage;
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('aapl') || lowerMessage.includes('apple')) {
      const appleData = tradingData.find(d => d.symbol === 'AAPL');
      response = {
        id: Date.now().toString(),
        type: 'ai',
        content: `📊 **Analyse d'Apple (AAPL)**

💰 **Prix actuel**: $${appleData?.price.toFixed(2)}
📈 **Variation**: +${appleData?.change.toFixed(2)} (${appleData?.changePercent.toFixed(2)}%)
📊 **Volume**: ${appleData?.volume.toLocaleString()}
🎯 **Tendance**: ${appleData?.trend === 'bullish' ? 'Haussière' : 'Baissière'}

💡 **Recommandation**: ${appleData?.recommendation}
🎯 **Confiance**: ${appleData?.confidence}%

**Analyse technique**:
• Support technique solide à $180
• RSI en zone de survente (65)
• MACD croisement haussier imminent
• Volume en hausse de 15%

**Fondamentaux**:
• Bénéfices solides Q4 2023
• Lancement de nouveaux produits IA
• Trésorerie importante ($150B+)

**Action suggérée**: ${appleData?.trend === 'bullish' ? 'Acheter sur pullback vers $180' : 'Attendre confirmation'}`
        ,
        timestamp: new Date(),
        sender: 'DAVY',
        data: appleData,
        confidence: appleData?.confidence,
        suggestions: ['Voir plus d\'analyses', 'Comparer avec d\'autres tech', 'Analyser le portefeuille']
      };
    } else if (lowerMessage.includes('bitcoin') || lowerMessage.includes('btc')) {
      const btcData = tradingData.find(d => d.symbol === 'BTC');
      response = {
        id: Date.now().toString(),
        content: `₿ **Analyse Bitcoin (BTC)**

💰 **Prix actuel**: $${btcData?.price.toLocaleString()}
📉 **Variation**: ${btcData?.change.toFixed(2)} (${btcData?.changePercent.toFixed(2)}%)
📊 **Volume**: $${(btcData?.volume || 0) / 1000000000}B
🎯 **Tendance**: ${btcData?.trend === 'bullish' ? 'Haussière' : 'Baissière'}

⚠️ **Attention**: Bitcoin en zone de consolidation
📊 **Support**: $42,000
📈 **Résistance**: $45,000

**Analyse technique**:
• Consolidation après correction
• RSI neutre (50)
• Volume en baisse
• Volatilité élevée

**Facteurs macro**:
• Halving prévu en avril 2024
• Adoption institutionnelle en hausse
• Réglementation en cours

**Recommandation**: ${btcData?.recommendation}

**Action suggérée**: Maintenir les positions existantes, pas de nouveau trade pour l'instant.`,
        timestamp: new Date(),
        sender: 'DAVY',
        type: 'ai',
        data: btcData,
        confidence: btcData?.confidence,
        suggestions: ['Analyser ETH', 'Voir les altcoins', 'Stratégie crypto']
      };
    } else if (lowerMessage.includes('portefeuille') || lowerMessage.includes('portfolio')) {
      response = {
        id: Date.now().toString(),
        type: 'ai',
        content: `📊 **Analyse de votre portefeuille**

💰 **Valeur totale**: 2,450,000 FCFA
📈 **Rendement total**: +12.5%
📊 **Nombre d'actifs**: 15

**Allocation actuelle**:
• 🏢 Actions: 45% (1,102,500 FCFA)
• ₿ Crypto: 35% (857,500 FCFA)
• 💱 Forex: 15% (367,500 FCFA)
• 💰 Cash: 5% (122,500 FCFA)

**Top performers**:
1. AAPL: +18.3%
2. ETH: +15.7%
3. TSLA: +12.1%

**Recommandations d'optimisation**:
• Augmenter l'allocation tech (opportunité IA)
• Réduire l'exposition crypto (volatilité)
• Diversifier vers l'Europe (stabilité)

**Actions suggérées**:
1. Acheter plus d'AAPL sur pullback
2. Vendre partiellement TSLA (surévaluation)
3. Ajouter des actions européennes

Voulez-vous que je vous aide à optimiser votre allocation ?`,
        timestamp: new Date(),
        sender: 'DAVY',
        suggestions: ['Optimiser l\'allocation', 'Analyser les risques', 'Nouvelles opportunités']
      };
    } else if (lowerMessage.includes('débutant') || lowerMessage.includes('commencer')) {
      response = {
        id: Date.now().toString(),
        type: 'ai',
        content: `🎯 **Guide pour débutants en trading**

Bienvenue dans le monde du trading ! Voici mes recommandations pour bien commencer :

**📚 Éducation (1-2 mois)**:
• Comprendre les bases (actions, crypto, forex)
• Apprendre l'analyse technique
• Gestion du risque et psychologie

**💰 Premier portefeuille (100,000 FCFA)**:
• 60% Actions blue-chips (AAPL, MSFT, GOOGL)
• 20% ETF diversifié (S&P 500)
• 15% Crypto (BTC, ETH)
• 5% Cash (opportunités)

**🎯 Stratégie recommandée**:
• Investissement long terme (5+ ans)
• DCA (Dollar Cost Averaging)
• Diversification géographique
• Stop-loss obligatoire

**⚠️ Erreurs à éviter**:
• Trading sur émotion
• Over-leveraging
• Manque de diversification
• Ignorer la gestion du risque

**📊 Outils essentiels**:
• Plateforme de trading fiable
• Sources d'information fiables
• Journal de trading
• Plan de trading écrit

Voulez-vous que je vous aide à créer votre premier portefeuille ?`,
        timestamp: new Date(),
        sender: 'DAVY',
        suggestions: ['Créer un portefeuille', 'Apprendre l\'analyse', 'Gestion du risque']
      };
    } else {
      response = {
        id: Date.now().toString(),
        type: 'ai',
        content: `🤖 **DAVY IA Assistant**

Je comprends votre question. Laissez-moi vous aider avec une analyse personnalisée.

**💡 Suggestions**:
• Analyse technique d'un actif spécifique
• Recommandations de portefeuille
• Stratégies de trading
• Gestion du risque
• Éducation financière

**📊 Données en temps réel**:
• Marché haussier global
• Volatilité modérée
• Opportunités dans la tech
• Prudence sur les crypto

Pouvez-vous me donner plus de détails sur ce que vous recherchez ? Je peux vous fournir des analyses spécifiques et des recommandations personnalisées.`,
        timestamp: new Date(),
        sender: 'DAVY',
        suggestions: suggestionQuestions.slice(0, 4)
      };
    }

    setMessages(prev => [...prev, response]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      sender: 'Vous'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    await generateAIResponse(inputMessage);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'bullish':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'bearish':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header du chat */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
            >
              <Bot className="w-5 h-5" />
            </motion.div>
            <div>
              <h3 className="text-lg font-bold">DAVY Trading Chat</h3>
              <p className="text-green-100 text-sm flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-green-400 rounded-full"
                />
                IA Active • Analyse en temps réel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsListening(!isListening)}
              className={`p-2 rounded-lg transition-colors ${
                isListening ? 'bg-red-500/20 text-red-300' : 'bg-blue-500/20 text-blue-300'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Zone des messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`flex items-start gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>

                  {/* Message */}
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white border border-gray-200 shadow-sm'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium">
                        {message.sender}
                      </span>
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                      {message.confidence && (
                        <span className={`text-xs font-medium ${getConfidenceColor(message.confidence)}`}>
                          {message.confidence}% confiance
                        </span>
                      )}
                    </div>

                    <div className="whitespace-pre-wrap text-sm">
                      {message.content}
                    </div>

                    {/* Données de trading si disponibles */}
                    {message.data && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{message.data.symbol}</div>
                            <div className="text-sm text-gray-600">
                              ${message.data.price.toFixed(2)}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              {getTrendIcon(message.data.trend)}
                              <span className={`text-sm font-medium ${
                                message.data.change > 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {message.data.change > 0 ? '+' : ''}{message.data.changePercent.toFixed(2)}%
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">
                              Vol: {message.data.volume.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Suggestions */}
                    {message.suggestions && showSuggestions && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors"
                          >
                            {suggestion}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Indicateur de frappe */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Zone de saisie */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Posez votre question à DAVY..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Suggestions rapides */}
        {showSuggestions && (
          <div className="mt-3 flex flex-wrap gap-2">
            {suggestionQuestions.slice(0, 4).map((suggestion, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors"
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar avec contrôles */}
      <div className="absolute right-4 top-20 space-y-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors"
        >
          <Lightbulb className="w-4 h-4" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setAutoScroll(!autoScroll)}
          className="p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors"
        >
          <Settings className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Panneau avancé */}
      {showAdvanced && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="absolute right-0 top-0 h-full w-80 bg-white border-l border-gray-200 p-4 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Paramètres IA</h3>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowAdvanced(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Personnalité IA</label>
              <select
                value={aiPersonality}
                onChange={(e) => setAiPersonality(e.target.value as any)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="professional">Professionnel</option>
                <option value="friendly">Amical</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mode de chat</label>
              <select
                value={chatMode}
                onChange={(e) => setChatMode(e.target.value as any)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="trading">Trading</option>
                <option value="analysis">Analyse</option>
                <option value="education">Éducation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Thème</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as any)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              >
                <option value="light">Clair</option>
                <option value="dark">Sombre</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Suggestions</label>
              <input
                type="checkbox"
                checked={showSuggestions}
                onChange={(e) => setShowSuggestions(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Auto-scroll</label>
              <input
                type="checkbox"
                checked={autoScroll}
                onChange={(e) => setAutoScroll(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
} 