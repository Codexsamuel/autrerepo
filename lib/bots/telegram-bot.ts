// Fichier temporairement désactivé pour le build
// node-telegram-bot-api n'est pas installé en production

export class TelegramBotService {
  private isReady: boolean = false;

  constructor() {
    console.log('Telegram Bot désactivé pour le build');
  }

  public async start() {
    console.log('Telegram Bot non disponible');
  }

  public async stop() {
    console.log('Telegram Bot non disponible');
  }

  public async sendBetNotification(bet: any, symbol: string, chatIds: number[] = []) {
    console.log('Telegram Bot non disponible');
  }

  public async sendPredictionNotification(prediction: any, chatIds: number[] = []) {
    console.log('Telegram Bot non disponible');
  }

  public async sendBetResultNotification(bet: any, symbol: string, result: 'won' | 'lost', chatIds: number[] = []) {
    console.log('Telegram Bot non disponible');
  }

  public async sendSystemNotification(title: string, message: string, chatIds: number[] = []) {
    console.log('Telegram Bot non disponible');
  }

  public async getBotInfo() {
    return {
      username: 'davy_trading_bot',
      firstName: 'DAVY Trading',
      isReady: false
    };
  }
} 