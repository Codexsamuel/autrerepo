import axios, { AxiosInstance } from 'axios';


export interface OneWinSession {
  sessionId: string;
  token: string;
  thxGuid: string;
  tmxGuid: string;
  jsSessionUser: string;
}

export interface OneWinBet {
  id: string;
  amount: number;
  multiplier: number;
  status: 'pending' | 'won' | 'lost';
  createdAt: Date;
}

export interface OneWinPrediction {
  id: string;
  symbol: string;
  direction: 'up' | 'down';
  confidence: number;
  expiresAt: Date;
  result?: 'won' | 'lost';
}

export class OneWinAPI {
  private client: AxiosInstance;
  private session: OneWinSession;

  constructor() {
    this.session = {
      sessionId: process.env.SESSION_ID_1WIN!,
      token: process.env.TOKEN_1WIN!,
      thxGuid: process.env.THX_GUID_1WIN!,
      tmxGuid: process.env.TMX_GUID_1WIN!,
      jsSessionUser: process.env.HJSESSIONUSER_1WIN!,
    };

    this.client = axios.create({
      baseURL: 'https://1win.com/api',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
        'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Cache-Control': 'max-age=0',
      },
    });

    // Ajouter les intercepteurs pour la gestion des sessions
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use((config) => {
      // Ajouter les cookies de session
      config.headers['Cookie'] = `session_id=${this.session.sessionId}; token=${this.session.token}; thx_guid=${this.session.thxGuid}; tmx_guid=${this.session.tmxGuid}; js_session_user=${this.session.jsSessionUser}`;
      return config;
    });

    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Session expirée, essayer de se reconnecter
          await this.refreshSession();
        }
        return Promise.reject(error);
      }
    );
  }

  private async refreshSession(): Promise<void> {
    try {
      // Logique de rafraîchissement de session
      console.log('Rafraîchissement de la session 1WIN...');
      // Ici, vous pourriez implémenter une logique de reconnexion
    } catch (error) {
      console.error('Erreur lors du rafraîchissement de session:', error);
    }
  }

  // Obtenir les marchés disponibles
  async getMarkets(): Promise<any[]> {
    try {
      const response = await this.client.get('/markets');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des marchés:', error);
      return [];
    }
  }

  // Obtenir les prix en temps réel
  async getPrices(symbol: string): Promise<any> {
    try {
      const response = await this.client.get(`/prices/${symbol}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du prix pour ${symbol}:`, error);
      return null;
    }
  }

  // Placer un pari
  async placeBet(symbol: string, amount: number, direction: 'up' | 'down', duration: number): Promise<OneWinBet | null> {
    try {
      const response = await this.client.post('/bets', {
        symbol,
        amount,
        direction,
        duration,
        timestamp: Date.now(),
      });

      return {
        id: response.data.id,
        amount,
        multiplier: response.data.multiplier || 2.0,
        status: 'pending',
        createdAt: new Date(),
      };
    } catch (error) {
      console.error('Erreur lors du placement du pari:', error);
      return null;
    }
  }

  // Obtenir l'historique des paris
  async getBetHistory(limit: number = 50): Promise<OneWinBet[]> {
    try {
      const response = await this.client.get(`/bets/history?limit=${limit}`);
      return response.data.map((bet: any) => ({
        id: bet.id,
        amount: bet.amount,
        multiplier: bet.multiplier,
        status: bet.status,
        createdAt: new Date(bet.createdAt),
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique:', error);
      return [];
    }
  }

  // Obtenir le solde du compte
  async getBalance(): Promise<number> {
    try {
      const response = await this.client.get('/account/balance');
      return response.data.balance || 0;
    } catch (error) {
      console.error('Erreur lors de la récupération du solde:', error);
      return 0;
    }
  }

  // Obtenir les statistiques de trading
  async getTradingStats(): Promise<any> {
    try {
      const response = await this.client.get('/account/stats');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      return {
        totalBets: 0,
        wonBets: 0,
        lostBets: 0,
        winRate: 0,
        totalProfit: 0,
      };
    }
  }

  // Simuler une prédiction IA
  async generatePrediction(symbol: string): Promise<OneWinPrediction | null> {
    try {
      // Ici, vous pourriez intégrer votre modèle IA
      const confidence = Math.random() * 0.4 + 0.6; // 60-100%
      const direction = Math.random() > 0.5 ? 'up' : 'down';
      
      return {
        id: `pred_${Date.now()}`,
        symbol,
        direction,
        confidence,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
      };
    } catch (error) {
      console.error('Erreur lors de la génération de prédiction:', error);
      return null;
    }
  }

  // Vérifier le statut d'un pari
  async checkBetStatus(betId: string): Promise<'pending' | 'won' | 'lost' | null> {
    try {
      const response = await this.client.get(`/bets/${betId}/status`);
      return response.data.status;
    } catch (error) {
      console.error(`Erreur lors de la vérification du statut du pari ${betId}:`, error);
      return null;
    }
  }

  // Obtenir les tendances du marché
  async getMarketTrends(symbol: string, timeframe: string = '1h'): Promise<any[]> {
    try {
      const response = await this.client.get(`/trends/${symbol}?timeframe=${timeframe}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des tendances pour ${symbol}:`, error);
      return [];
    }
  }
}

// Instance singleton
export const oneWinAPI = new OneWinAPI(); 