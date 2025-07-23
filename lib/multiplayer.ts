// 🌐 Gestionnaire Multi-joueur pour Simulation de Drones
// Utilise Socket.IO pour la synchronisation en temps réel

import { io, Socket } from 'socket.io-client';

export interface DroneState {
  id: string;
  userId: string;
  username: string;
  droneType: 'sentinel' | 'atlas';
  position: [number, number, number];
  rotation: [number, number, number];
  altitude: number;
  speed: number;
  battery: number;
  signal: number;
  isRunning: boolean;
  timestamp: number;
}

export interface SimulationEvent {
  type: 'collision' | 'weather_change' | 'emergency_landing' | 'formation_update';
  droneId: string;
  data: any;
  timestamp: number;
}

export interface MultiplayerConfig {
  serverUrl?: string;
  roomId?: string;
  userId?: string;
  username?: string;
  autoReconnect?: boolean;
  maxPlayers?: number;
}

export interface MultiplayerCallbacks {
  onPlayerJoined?: (player: { id: string; username: string }) => void;
  onPlayerLeft?: (playerId: string) => void;
  onDroneStateUpdate?: (droneState: DroneState) => void;
  onSimulationEvent?: (event: SimulationEvent) => void;
  onFormationUpdate?: (formation: DroneState[]) => void;
  onWeatherUpdate?: (weatherData: any) => void;
  onError?: (error: string) => void;
  onConnected?: () => void;
  onDisconnected?: () => void;
}

class MultiplayerManager {
  private socket: Socket | null = null;
  private config: MultiplayerConfig;
  private callbacks: MultiplayerCallbacks = {};
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  constructor(config: MultiplayerConfig = {}) {
    this.config = {
      serverUrl: process.env.NEXT_PUBLIC_MULTIPLAYER_SERVER || 'http://localhost:3001',
      roomId: 'drone-simulation-room',
      userId: `user_${Math.random().toString(36).substr(2, 9)}`,
      username: `Pilote_${Math.floor(Math.random() * 1000)}`,
      autoReconnect: true,
      maxPlayers: 10,
      ...config
    };
  }

  // 🔌 Connexion au serveur multi-joueur
  async connect(): Promise<boolean> {
    try {
      if (this.socket?.connected) {
        return true;
      }

      this.socket = io(this.config.serverUrl!, {
        auth: {
          userId: this.config.userId,
          username: this.config.username,
          roomId: this.config.roomId
        },
        transports: ['websocket', 'polling'],
        timeout: 10000,
        reconnection: this.config.autoReconnect,
        reconnectionAttempts: this.maxReconnectAttempts,
        reconnectionDelay: this.reconnectDelay
      });

      this.setupEventListeners();
      
      return new Promise((resolve) => {
        this.socket!.on('connect', () => {
          this.isConnected = true;
          this.reconnectAttempts = 0;
          console.log('🌐 Connecté au serveur multi-joueur');
          this.callbacks.onConnected?.();
          resolve(true);
        });

        this.socket!.on('connect_error', (error) => {
          console.error('❌ Erreur de connexion multi-joueur:', error);
          this.callbacks.onError?.(`Erreur de connexion: ${error.message}`);
          resolve(false);
        });
      });
    } catch (error) {
      console.error('❌ Erreur lors de la connexion:', error);
      this.callbacks.onError?.(`Erreur de connexion: ${error}`);
      return false;
    }
  }

  // 🔌 Déconnexion du serveur
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      console.log('🔌 Déconnecté du serveur multi-joueur');
      this.callbacks.onDisconnected?.();
    }
  }

  // 🎮 Rejoindre une session de simulation
  joinSimulation(droneType: 'sentinel' | 'atlas' = 'sentinel'): void {
    if (!this.socket?.connected) {
      console.warn('⚠️ Non connecté au serveur');
      return;
    }

    this.socket.emit('join_simulation', {
      roomId: this.config.roomId,
      droneType,
      userId: this.config.userId,
      username: this.config.username
    });
  }

  // 🎮 Quitter la session de simulation
  leaveSimulation(): void {
    if (!this.socket?.connected) return;

    this.socket.emit('leave_simulation', {
      roomId: this.config.roomId,
      userId: this.config.userId
    });
  }

  // 📡 Envoyer l'état du drone
  updateDroneState(droneState: Partial<DroneState>): void {
    if (!this.socket?.connected) return;

    const fullState: DroneState = {
      id: this.config.userId!,
      userId: this.config.userId!,
      username: this.config.username!,
      droneType: 'sentinel',
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      altitude: 0,
      speed: 0,
      battery: 100,
      signal: 100,
      isRunning: false,
      timestamp: Date.now(),
      ...droneState
    };

    this.socket.emit('update_drone_state', {
      roomId: this.config.roomId,
      droneState: fullState
    });
  }

  // 🎯 Envoyer un événement de simulation
  sendSimulationEvent(event: Omit<SimulationEvent, 'timestamp'>): void {
    if (!this.socket?.connected) return;

    const fullEvent: SimulationEvent = {
      ...event,
      timestamp: Date.now()
    };

    this.socket.emit('simulation_event', {
      roomId: this.config.roomId,
      event: fullEvent
    });
  }

  // 🌤️ Envoyer des données météo
  updateWeather(weatherData: any): void {
    if (!this.socket?.connected) return;

    this.socket.emit('update_weather', {
      roomId: this.config.roomId,
      weatherData: {
        ...weatherData,
        timestamp: Date.now()
      }
    });
  }

  // 🎮 Demander une formation de drones
  requestFormation(formationType: 'line' | 'circle' | 'triangle' | 'square'): void {
    if (!this.socket?.connected) return;

    this.socket.emit('request_formation', {
      roomId: this.config.roomId,
      formationType,
      userId: this.config.userId
    });
  }

  // 🎮 Envoyer un message de chat
  sendChatMessage(message: string): void {
    if (!this.socket?.connected) return;

    this.socket.emit('chat_message', {
      roomId: this.config.roomId,
      userId: this.config.userId,
      username: this.config.username,
      message,
      timestamp: Date.now()
    });
  }

  // 🎮 Demander le contrôle d'un drone
  requestDroneControl(droneId: string): void {
    if (!this.socket?.connected) return;

    this.socket.emit('request_drone_control', {
      roomId: this.config.roomId,
      droneId,
      userId: this.config.userId
    });
  }

  // 🎮 Libérer le contrôle d'un drone
  releaseDroneControl(droneId: string): void {
    if (!this.socket?.connected) return;

    this.socket.emit('release_drone_control', {
      roomId: this.config.roomId,
      droneId,
      userId: this.config.userId
    });
  }

  // 🎯 Configuration des callbacks
  setCallbacks(callbacks: MultiplayerCallbacks): void {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  // 📊 Obtenir le statut de connexion
  getConnectionStatus(): {
    isConnected: boolean;
    roomId: string;
    userId: string;
    username: string;
  } {
    return {
      isConnected: this.isConnected,
      roomId: this.config.roomId!,
      userId: this.config.userId!,
      username: this.config.username!
    };
  }

  // 🔧 Configuration des écouteurs d'événements
  private setupEventListeners(): void {
    if (!this.socket) return;

    // Événements de base
    this.socket.on('disconnect', () => {
      this.isConnected = false;
      console.log('🔌 Déconnecté du serveur');
      this.callbacks.onDisconnected?.();
    });

    this.socket.on('reconnect', () => {
      this.isConnected = true;
      console.log('🔄 Reconnexion réussie');
      this.callbacks.onConnected?.();
    });

    // Événements de simulation
    this.socket.on('player_joined', (data: { id: string; username: string }) => {
      console.log(`👋 ${data.username} a rejoint la simulation`);
      this.callbacks.onPlayerJoined?.(data);
    });

    this.socket.on('player_left', (data: { id: string }) => {
      console.log(`👋 Un joueur a quitté la simulation`);
      this.callbacks.onPlayerLeft?.(data.id);
    });

    this.socket.on('drone_state_update', (data: { droneState: DroneState }) => {
      this.callbacks.onDroneStateUpdate?.(data.droneState);
    });

    this.socket.on('simulation_event', (data: { event: SimulationEvent }) => {
      console.log(`🎯 Événement de simulation: ${data.event.type}`);
      this.callbacks.onSimulationEvent?.(data.event);
    });

    this.socket.on('formation_update', (data: { formation: DroneState[] }) => {
      this.callbacks.onFormationUpdate?.(data.formation);
    });

    this.socket.on('weather_update', (data: { weatherData: any }) => {
      this.callbacks.onWeatherUpdate?.(data.weatherData);
    });

    this.socket.on('chat_message', (data: {
      userId: string;
      username: string;
      message: string;
      timestamp: number;
    }) => {
      console.log(`💬 ${data.username}: ${data.message}`);
    });

    this.socket.on('error', (error: string) => {
      console.error('❌ Erreur multi-joueur:', error);
      this.callbacks.onError?.(error);
    });

    // Événements de contrôle
    this.socket.on('drone_control_granted', (data: { droneId: string }) => {
      console.log(`🎮 Contrôle accordé pour le drone ${data.droneId}`);
    });

    this.socket.on('drone_control_denied', (data: { droneId: string; reason: string }) => {
      console.log(`❌ Contrôle refusé pour le drone ${data.droneId}: ${data.reason}`);
    });

    this.socket.on('drone_control_released', (data: { droneId: string }) => {
      console.log(`🔓 Contrôle libéré pour le drone ${data.droneId}`);
    });
  }

  // 🧹 Nettoyage
  destroy(): void {
    this.disconnect();
    this.callbacks = {};
  }
}

// Instance globale
const multiplayerManager = new MultiplayerManager();

export default multiplayerManager;
