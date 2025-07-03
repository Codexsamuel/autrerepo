// Fichier temporairement désactivé pour le build
// telegraf n'est pas installé en production

export interface BotConfig {
  token: string;
  allowedUsers: string[];
  adminUsers: string[];
  tradingEnabled: boolean;
  notificationsEnabled: boolean;
}

export interface TradingAlert {
  id: string;
  symbol: string;
  type: 'prediction' | 'signal' | 'analysis';
  message: string;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high';
}

export class TelegramTradingBot {
  private config: BotConfig;
  private alerts: TradingAlert[] = [];

  constructor(config: BotConfig) {
    this.config = config;
    console.log('Telegram Trading Bot désactivé pour le build');
  }

  public async start() {
    console.log('Telegram Trading Bot non disponible');
  }

  public async stop() {
    console.log('Telegram Trading Bot non disponible');
  }

  public async sendNotification(message: string, priority: 'low' | 'medium' | 'high' = 'medium') {
    console.log('Telegram Trading Bot non disponible');
  }

  public async sendTradingAlert(alert: TradingAlert) {
    console.log('Telegram Trading Bot non disponible');
  }

  public addAlert(alert: TradingAlert) {
    this.alerts.push(alert);
    console.log('Telegram Trading Bot non disponible');
  }

  public removeAlert(alertId: string): boolean {
    const index = this.alerts.findIndex(alert => alert.id === alertId);
    if (index !== -1) {
      this.alerts.splice(index, 1);
      return true;
    }
    return false;
  }

  public getStats() {
    return {
      isRunning: false,
      alertsCount: this.alerts.length,
      config: this.config
    };
  }
} 