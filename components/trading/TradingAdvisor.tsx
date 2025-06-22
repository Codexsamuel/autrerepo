'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from '@/components/ui/motion';
import { 
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
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

interface AIRecommendation {
  id: string;
  type: 'buy' | 'sell' | 'hold' | 'watch';
  symbol: string;
  name: string;
  currentPrice: number;
  targetPrice: number;
  confidence: number;
  reasoning: string;
  riskLevel: 'low' | 'medium' | 'high';
  timeframe: string;
  category: string;
  timestamp: Date;
  urgency: 'low' | 'medium' | 'high';
  action?: string;
}

interface MarketAnalysis {
  symbol: string;
  trend: 'bullish' | 'bearish' | 'neutral';
  strength: number;
  support: number;
  resistance: number;
  rsi: number;
  macd: string;
  volume: number;
  volatility: number;
  recommendation: string;
}

interface AIQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'slider' | 'text' | 'yes_no';
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  required: boolean;
  category: 'risk' | 'investment' | 'goals' | 'experience' | 'preferences';
}

interface AIInsight {
  id: string;
  type: 'opportunity' | 'risk' | 'trend' | 'recommendation';
  title: string;
  description: string;
  confidence: number;
  urgency: 'low' | 'medium' | 'high';
  action?: string;
  timestamp: Date;
}

export default function TradingAdvisor() {
  const [isAIActive, setIsAIActive] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [showAnalysis, setShowAnalysis] = useState(true);
  const [showQuestions, setShowQuestions] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{[key: string]: any}>({});
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [marketAnalysis, setMarketAnalysis] = useState<MarketAnalysis[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<string>('all');
  const [timeframe, setTimeframe] = useState<string>('1d');
  const [riskLevel, setRiskLevel] = useState<string>('medium');
  const [investmentAmount, setInvestmentAmount] = useState<number>(100000);
  const [aiPersonality, setAiPersonality] = useState<'professional' | 'friendly' | 'expert'>('expert');
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('dark');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30);

  // Questions IA pour personnaliser l'expérience
  const aiQuestionnaire: AIQuestion[] = [
    {
      id: 'risk_tolerance',
      question: 'Quel est votre niveau de tolérance au risque ?',
      type: 'multiple_choice',
      options: ['Très conservateur', 'Conservateur', 'Modéré', 'Agressif', 'Très agressif'],
      required: true,
      category: 'risk'
    },
    {
      id: 'investment_amount',
      question: 'Quel montant souhaitez-vous investir ?',
      type: 'slider',
      min: 10000,
      max: 10000000,
      step: 10000,
      required: true,
      category: 'investment'
    },
    {
      id: 'investment_goals',
      question: 'Quels sont vos objectifs d\'investissement ?',
      type: 'multiple_choice',
      options: ['Préservation du capital', 'Croissance modérée', 'Croissance agressive', 'Revenus réguliers', 'Spéculation'],
      required: true,
      category: 'goals'
    },
    {
      id: 'timeframe',
      question: 'Sur quel horizon temporel investissez-vous ?',
      type: 'multiple_choice',
      options: ['Court terme (< 1 an)', 'Moyen terme (1-5 ans)', 'Long terme (5+ ans)'],
      required: true,
      category: 'goals'
    },
    {
      id: 'experience_level',
      question: 'Quel est votre niveau d\'expérience en trading ?',
      type: 'multiple_choice',
      options: ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'],
      required: true,
      category: 'experience'
    },
    {
      id: 'preferred_assets',
      question: 'Quels types d\'actifs préférez-vous ?',
      type: 'multiple_choice',
      options: ['Actions', 'Cryptomonnaies', 'Forex', 'Commodités', 'Tout'],
      required: true,
      category: 'preferences'
    }
  ];

  // Recommandations IA simulées
  const sampleRecommendations: AIRecommendation[] = [
    {
      id: '1',
      type: 'buy',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      currentPrice: 185.92,
      targetPrice: 210.00,
      confidence: 85,
      reasoning: 'Support technique solide, lancement de nouveaux produits imminent, fondamentaux excellents',
      riskLevel: 'medium',
      timeframe: '3-6 mois',
      category: 'Technology',
      timestamp: new Date(),
      urgency: 'medium',
      action: 'Acheter avec stop-loss à 175$'
    },
    {
      id: '2',
      type: 'hold',
      symbol: 'BTC',
      name: 'Bitcoin',
      currentPrice: 43250.75,
      targetPrice: 45000.00,
      confidence: 72,
      reasoning: 'En zone de consolidation, attendre confirmation avant position',
      riskLevel: 'high',
      timeframe: '1-3 mois',
      category: 'Cryptocurrency',
      timestamp: new Date(),
      urgency: 'low',
      action: 'Maintenir les positions existantes'
    },
    {
      id: '3',
      type: 'sell',
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      currentPrice: 245.67,
      targetPrice: 220.00,
      confidence: 78,
      reasoning: 'Résistance technique, surévaluation relative, volatilité élevée',
      riskLevel: 'high',
      timeframe: '1-2 mois',
      category: 'Automotive',
      timestamp: new Date(),
      urgency: 'high',
      action: 'Vendre avec take-profit à 220$'
    }
  ];

  // Analyses de marché simulées
  const sampleMarketAnalysis: MarketAnalysis[] = [
    {
      symbol: 'AAPL',
      trend: 'bullish',
      strength: 85,
      support: 180.00,
      resistance: 190.00,
      rsi: 65,
      macd: 'Bullish',
      volume: 45678900,
      volatility: 0.85,
      recommendation: 'Acheter sur pullback vers 180$'
    },
    {
      symbol: 'BTC',
      trend: 'neutral',
      strength: 45,
      support: 42000.00,
      resistance: 45000.00,
      rsi: 50,
      macd: 'Neutral',
      volume: 28456789000,
      volatility: 2.15,
      recommendation: 'Attendre confirmation de breakout'
    },
    {
      symbol: 'ETH',
      trend: 'bullish',
      strength: 78,
      support: 2600.00,
      resistance: 2800.00,
      rsi: 70,
      macd: 'Bullish',
      volume: 15678900000,
      volatility: 1.85,
      recommendation: 'Acheter avec stop-loss à 2550$'
    }
  ];

  // Insights IA simulés
  const sampleInsights: AIInsight[] = [
    {
      id: '1',
      type: 'opportunity',
      title: 'Opportunité sur Apple',
      description: 'Support technique solide à 180$, lancement de nouveaux produits imminent',
      confidence: 85,
      urgency: 'medium',
      action: 'Considérer un achat avec stop-loss à 175$',
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'risk',
      title: 'Volatilité Bitcoin',
      description: 'Bitcoin en zone de consolidation, attendre confirmation avant position',
      confidence: 72,
      urgency: 'low',
      action: 'Maintenir les positions existantes, pas de nouveau trade',
      timestamp: new Date()
    },
    {
      id: '3',
      type: 'trend',
      title: 'Tendance haussière Tech',
      description: 'Secteur technologique en forte croissance, privilégier les actions tech',
      confidence: 78,
      urgency: 'medium',
      action: 'Augmenter l\'allocation tech dans le portefeuille',
      timestamp: new Date()
    }
  ];

  useEffect(() => {
    // Initialiser les données
    setRecommendations(sampleRecommendations);
    setMarketAnalysis(sampleMarketAnalysis);
    setAiInsights(sampleInsights);

    // Simuler des mises à jour en temps réel
    if (autoRefresh) {
      const interval = setInterval(() => {
        // Mettre à jour les prix et analyses
        setRecommendations(prev => prev.map(rec => ({
          ...rec,
          currentPrice: rec.currentPrice + (Math.random() - 0.5) * 2,
          timestamp: new Date()
        })));

        setMarketAnalysis(prev => prev.map(analysis => ({
          ...analysis,
          rsi: analysis.rsi + (Math.random() - 0.5) * 5,
          volume: analysis.volume + Math.random() * 1000000
        })));
      }, refreshInterval * 1000);

      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  const handleAnswerQuestion = (questionId: string, answer: any) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
    
    if (currentQuestionIndex < aiQuestionnaire.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Questionnaire terminé, générer des insights personnalisés
      generatePersonalizedInsights();
    }
  };

  const generatePersonalizedInsights = () => {
    const newInsights: AIInsight[] = [
      {
        id: Date.now().toString(),
        type: 'recommendation',
        title: 'Profil personnalisé créé',
        description: `Basé sur vos réponses, j'ai créé un profil ${userAnswers.risk_tolerance} avec un objectif de ${userAnswers.investment_goals}`,
        confidence: 95,
        urgency: 'low',
        action: 'Voir les recommandations personnalisées',
        timestamp: new Date()
      }
    ];
    setAiInsights(prev => [...newInsights, ...prev]);
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'buy':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'sell':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      case 'hold':
        return <Minus className="w-5 h-5 text-yellow-500" />;
      case 'watch':
        return <Eye className="w-5 h-5 text-blue-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'high':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'bullish':
        return 'text-green-600';
      case 'bearish':
        return 'text-red-600';
      case 'neutral':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return <Lightbulb className="w-5 h-5 text-yellow-500" />;
      case 'risk':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'trend':
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      case 'recommendation':
        return <Target className="w-5 h-5 text-green-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'border-red-500 bg-red-50';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-green-500 bg-green-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header IA vivante */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white relative overflow-hidden">
        {/* Particules animées */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              animate={{
                x: [0, 200, 0],
                y: [0, -100, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center"
              >
                <Brain className="w-8 h-8" />
              </motion.div>
              <div>
                <h2 className="text-3xl font-bold">DAVY Trading Advisor</h2>
                <p className="text-purple-100 mt-2 flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-green-400 rounded-full"
                  />
                  IA Active • Analyse en temps réel • Conseils personnalisés
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Contrôles IA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAIActive(!isAIActive)}
                className={`p-3 rounded-lg transition-colors ${
                  isAIActive ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                }`}
              >
                {isAIActive ? <Bot className="w-5 h-5" /> : <PowerOff className="w-5 h-5" />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsListening(!isListening)}
                className={`p-3 rounded-lg transition-colors ${
                  isListening ? 'bg-red-500/20 text-red-300' : 'bg-blue-500/20 text-blue-300'
                }`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              >
                {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* Widget IA vivante avec questionnaire */}
            {showQuestions && currentQuestionIndex < aiQuestionnaire.length && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
                      >
                        <Bot className="w-6 h-6" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold">DAVY IA Assistant</h3>
                        <p className="text-purple-100">Personnalisation de votre expérience...</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-3 h-3 bg-green-400 rounded-full"
                      />
                      <span className="text-sm">En ligne</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-4">
                      Question {currentQuestionIndex + 1} sur {aiQuestionnaire.length}
                    </h4>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                      <p className="text-lg mb-4">{aiQuestionnaire[currentQuestionIndex].question}</p>
                      
                      {aiQuestionnaire[currentQuestionIndex].type === 'multiple_choice' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {aiQuestionnaire[currentQuestionIndex].options?.map((option, index) => (
                            <motion.button
                              key={index}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleAnswerQuestion(aiQuestionnaire[currentQuestionIndex].id, option)}
                              className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-left"
                            >
                              {option}
                            </motion.button>
                          ))}
                        </div>
                      )}

                      {aiQuestionnaire[currentQuestionIndex].type === 'slider' && (
                        <div className="space-y-4">
                          <input
                            type="range"
                            min={aiQuestionnaire[currentQuestionIndex].min}
                            max={aiQuestionnaire[currentQuestionIndex].max}
                            step={aiQuestionnaire[currentQuestionIndex].step}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              setUserAnswers(prev => ({ ...prev, [aiQuestionnaire[currentQuestionIndex].id]: value }));
                            }}
                          />
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>{aiQuestionnaire[currentQuestionIndex].min?.toLocaleString()} FCFA</span>
                            <span>{aiQuestionnaire[currentQuestionIndex].max?.toLocaleString()} FCFA</span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAnswerQuestion(aiQuestionnaire[currentQuestionIndex].id, userAnswers[aiQuestionnaire[currentQuestionIndex].id])}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium"
                          >
                            Continuer
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Recommandations IA */}
            {showRecommendations && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Target className="w-8 h-8" />
                      <div>
                        <h3 className="text-xl font-bold">Recommandations IA</h3>
                        <p className="text-green-100">Analyses intelligentes en temps réel</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <RefreshCw className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {recommendations.map((rec, index) => (
                      <motion.div
                        key={rec.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-gray-50 rounded-xl border-l-4 border-blue-500"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            {getRecommendationIcon(rec.type)}
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-bold text-lg">{rec.symbol}</h4>
                                <span className="text-sm text-gray-600">{rec.name}</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(rec.riskLevel)}`}>
                                  {rec.riskLevel.toUpperCase()}
                                </span>
                              </div>
                              <p className="text-gray-700 mb-2">{rec.reasoning}</p>
                              <div className="flex items-center gap-4 text-sm">
                                <span>Prix actuel: <strong>${rec.currentPrice.toFixed(2)}</strong></span>
                                <span>Objectif: <strong>${rec.targetPrice.toFixed(2)}</strong></span>
                                <span>Confiance: <strong>{rec.confidence}%</strong></span>
                              </div>
                              {rec.action && (
                                <p className="text-blue-600 mt-2 font-medium">{rec.action}</p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">{rec.confidence}%</div>
                            <div className="text-xs text-gray-500">Confiance</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Analyses de marché */}
            {showAnalysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <BarChart3 className="w-8 h-8" />
                      <div>
                        <h3 className="text-xl font-bold">Analyses Techniques</h3>
                        <p className="text-orange-100">Indicateurs et niveaux clés</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {marketAnalysis.map((analysis, index) => (
                      <motion.div
                        key={analysis.symbol}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-lg">{analysis.symbol}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTrendColor(analysis.trend)}`}>
                            {analysis.trend.toUpperCase()}
                          </span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Force: {analysis.strength}%</span>
                            <span>RSI: {analysis.rsi.toFixed(1)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Support: ${analysis.support.toFixed(2)}</span>
                            <span>Résistance: ${analysis.resistance.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>MACD: {analysis.macd}</span>
                            <span>Volatilité: {analysis.volatility.toFixed(2)}</span>
                          </div>
                          <p className="text-blue-600 font-medium mt-2">{analysis.recommendation}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Insights IA en temps réel */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Insights IA
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-gray-100 rounded-lg"
                >
                  <RefreshCw className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="space-y-4">
                <AnimatePresence>
                  {aiInsights.slice(0, 5).map((insight, index) => (
                    <motion.div
                      key={insight.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-xl border-l-4 ${getUrgencyColor(insight.urgency)}`}
                    >
                      <div className="flex items-start gap-3">
                        {getInsightIcon(insight.type)}
                        <div className="flex-1">
                          <h5 className="font-semibold">{insight.title}</h5>
                          <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                          {insight.action && (
                            <p className="text-sm text-blue-600 mt-2 font-medium">{insight.action}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="text-sm font-medium">{insight.confidence}%</div>
                        <div className="text-xs text-gray-500">
                          {insight.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Contrôles et paramètres */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-6">Contrôles IA</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Personnalité IA</label>
                  <select
                    value={aiPersonality}
                    onChange={(e) => setAiPersonality(e.target.value as any)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="professional">Professionnel</option>
                    <option value="friendly">Amical</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Niveau de risque</label>
                  <select
                    value={riskLevel}
                    onChange={(e) => setRiskLevel(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Faible</option>
                    <option value="medium">Moyen</option>
                    <option value="high">Élevé</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Horizon temporel</label>
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="1d">1 jour</option>
                    <option value="1w">1 semaine</option>
                    <option value="1m">1 mois</option>
                    <option value="3m">3 mois</option>
                    <option value="6m">6 mois</option>
                    <option value="1y">1 an</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Montant d'investissement</label>
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Montant en FCFA"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Actualisation auto</label>
                  <input
                    type="checkbox"
                    checked={autoRefresh}
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>

                {autoRefresh && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Intervalle (secondes)</label>
                    <input
                      type="number"
                      value={refreshInterval}
                      onChange={(e) => setRefreshInterval(parseInt(e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="10"
                      max="300"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Actions rapides */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Actions Rapides</h3>
              <div className="space-y-3">
                {[
                  { label: 'Nouveau Trade', icon: <TrendingUp className="w-4 h-4" />, color: 'bg-green-100 text-green-600' },
                  { label: 'Optimiser Portefeuille', icon: <Target className="w-4 h-4" />, color: 'bg-purple-100 text-purple-600' },
                  { label: 'Exporter Rapport', icon: <Download className="w-4 h-4" />, color: 'bg-orange-100 text-orange-600' },
                  { label: 'Paramètres IA', icon: <Settings className="w-4 h-4" />, color: 'bg-blue-100 text-blue-600' }
                ].map((action, index) => (
                  <motion.button
                    key={action.label}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left p-3 rounded-lg border hover:bg-white/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
                        {action.icon}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{action.label}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 