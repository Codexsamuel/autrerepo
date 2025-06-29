import TelegramBot from 'node-telegram-bot-api';
import { oneWinAPI, OneWinBet, OneWinPrediction } from '../trading/1win-api';


export class TelegramBotService {
  private bot: TelegramBot;
  private isReady: boolean = false;

  constructor() {
    const token = process.env.BOT_TOKEN!;
    this.bot = new TelegramBot(token, { polling: true });

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    this.bot.on('polling_error', (error) => {
      console.error('Erreur polling Telegram:', error);
    });

    this.bot.on('message', async (msg) => {
      if (msg.text && msg.text.startsWith('/')) {
        await this.handleCommand(msg);
      }
    });

    this.bot.on('webhook_error', (error) => {
      console.error('Erreur webhook Telegram:', error);
    });

    this.isReady = true;
    console.log('🤖 Bot Telegram initialisé');
  }

  private async handleCommand(msg: TelegramBot.Message) {
    const chatId = msg.chat.id;
    const command = msg.text?.toLowerCase().split(' ')[0];

    if (!command) return;

    switch (command) {
      case '/start':
        await this.sendWelcomeMessage(chatId);
        break;
      case '/balance':
        await this.sendBalance(chatId);
        break;
      case '/stats':
        await this.sendStats(chatId);
        break;
      case '/predict':
        await this.sendPrediction(chatId, msg.text || '');
        break;
      case '/help':
        await this.sendHelp(chatId);
        break;
      case '/markets':
        await this.sendMarkets(chatId);
        break;
      default:
        await this.bot.sendMessage(chatId, '❌ Commande non reconnue. Tapez /help pour voir les commandes disponibles.');
    }
  }

  private async sendWelcomeMessage(chatId: number) {
    const message = `
🎉 *Bienvenue sur DAVY Trading Platform!*

Je suis votre assistant de trading IA. Voici ce que je peux faire pour vous :

💰 *Commandes disponibles:*
• /balance - Voir votre solde
• /stats - Statistiques de trading
• /predict [symbole] - Prédiction IA
• /markets - Marchés disponibles
• /help - Aide

🔮 *Fonctionnalités IA:*
• Prédictions en temps réel
• Analyse de marché
• Notifications automatiques
• Statistiques détaillées

*Commencez par taper /help pour voir toutes les commandes!*
    `;

    await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
  }

  private async sendBalance(chatId: number) {
    try {
      const balance = await oneWinAPI.getBalance();
      const message = `💰 *Solde du Compte*\n\nVotre solde actuel: *${balance.toFixed(2)} €*`;
      
      await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    } catch (error) {
      await this.bot.sendMessage(chatId, '❌ Erreur lors de la récupération du solde.');
    }
  }

  private async sendStats(chatId: number) {
    try {
      const stats = await oneWinAPI.getTradingStats();
      const message = `
📊 *Statistiques de Trading*

• Total des Paris: *${stats.totalBets}*
• Paris Gagnés: *${stats.wonBets}*
• Paris Perdus: *${stats.lostBets}*
• Taux de Réussite: *${(stats.winRate * 100).toFixed(1)}%*
• Profit Total: *${stats.totalProfit.toFixed(2)} €*
      `;

      await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    } catch (error) {
      await this.bot.sendMessage(chatId, '❌ Erreur lors de la récupération des statistiques.');
    }
  }

  private async sendPrediction(chatId: number, fullCommand: string) {
    try {
      const args = fullCommand.split(' ');
      const symbol = args[1] || 'BTC/USD';
      
      const prediction = await oneWinAPI.generatePrediction(symbol);
      if (!prediction) {
        await this.bot.sendMessage(chatId, '❌ Erreur lors de la génération de la prédiction.');
        return;
      }

      const directionEmoji = prediction.direction === 'up' ? '📈' : '📉';
      const message = `
🔮 *Prédiction IA*

${directionEmoji} *Symbole:* ${prediction.symbol}
🎯 *Direction:* ${prediction.direction.toUpperCase()}
🎲 *Confiance:* ${(prediction.confidence * 100).toFixed(1)}%
⏰ *Expire dans:* 5 minutes

*Cette prédiction est basée sur l'analyse IA en temps réel.*
      `;

      await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    } catch (error) {
      await this.bot.sendMessage(chatId, '❌ Erreur lors de la génération de la prédiction.');
    }
  }

  private async sendMarkets(chatId: number) {
    try {
      const markets = await oneWinAPI.getMarkets();
      const popularMarkets = markets.slice(0, 10); // Top 10 marchés

      let message = '📈 *Marchés Populaires*\n\n';
      popularMarkets.forEach((market: any, index: number) => {
        message += `${index + 1}. ${market.symbol} - ${market.name}\n`;
      });

      message += '\n*Tapez /predict [symbole] pour une prédiction sur un marché spécifique.*';

      await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    } catch (error) {
      await this.bot.sendMessage(chatId, '❌ Erreur lors de la récupération des marchés.');
    }
  }

  private async sendHelp(chatId: number) {
    const message = `
🤖 *Commandes du Bot DAVY Trading*

*Commandes principales:*
• /start - Message de bienvenue
• /balance - Voir votre solde
• /stats - Statistiques de trading
• /predict [symbole] - Prédiction IA
• /markets - Marchés disponibles
• /help - Cette aide

*Exemples:*
• /predict BTC/USD
• /predict EUR/USD
• /predict ETH/USD

*Fonctionnalités:*
• 🔮 Prédictions IA en temps réel
• 📊 Statistiques détaillées
• 💰 Gestion du solde
• 📈 Analyse de marché
• 🔔 Notifications automatiques

*Support:* Contactez-nous si vous avez des questions!
    `;

    await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
  }

  // Méthodes publiques pour envoyer des notifications

  public async sendBetNotification(bet: OneWinBet, symbol: string, chatIds: number[] = []) {
    if (!this.isReady) return;

    try {
      const message = `
🎯 *Nouveau Pari Placé*

📊 *Symbole:* ${symbol}
💰 *Montant:* ${bet.amount} €
🎲 *Multiplicateur:* ${bet.multiplier}x
⏳ *Statut:* En cours...

*Le résultat sera disponible dans quelques minutes.*
      `;

      for (const chatId of chatIds) {
        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la notification de pari:', error);
    }
  }

  public async sendPredictionNotification(prediction: OneWinPrediction, chatIds: number[] = []) {
    if (!this.isReady) return;

    try {
      const directionEmoji = prediction.direction === 'up' ? '📈' : '📉';
      const message = `
🔮 *Nouvelle Prédiction IA*

${directionEmoji} *Symbole:* ${prediction.symbol}
🎯 *Direction:* ${prediction.direction.toUpperCase()}
🎲 *Confiance:* ${(prediction.confidence * 100).toFixed(1)}%
⏰ *Expire dans:* 5 minutes

*Cette prédiction est basée sur l'analyse IA en temps réel.*
      `;

      for (const chatId of chatIds) {
        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la notification de prédiction:', error);
    }
  }

  public async sendBetResultNotification(bet: OneWinBet, symbol: string, result: 'won' | 'lost', chatIds: number[] = []) {
    if (!this.isReady) return;

    try {
      const profit = result === 'won' ? bet.amount * bet.multiplier - bet.amount : -bet.amount;
      const resultEmoji = result === 'won' ? '🎉' : '💔';
      const resultText = result === 'won' ? 'Gagné!' : 'Perdu';

      const message = `
${resultEmoji} *Pari ${resultText}*

📊 *Symbole:* ${symbol}
💰 *Montant:* ${bet.amount} €
🎲 *Résultat:* ${resultText}
💵 *Profit/Perte:* ${profit.toFixed(2)} €

*Continuez à trader avec prudence!*
      `;

      for (const chatId of chatIds) {
        await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la notification de résultat:', error);
    }
  }

  public async sendSystemNotification(title: string, message: string, chatIds: number[] = []) {
    if (!this.isReady) return;

    try {
      const fullMessage = `🔔 *${title}*\n\n${message}`;

      for (const chatId of chatIds) {
        await this.bot.sendMessage(chatId, fullMessage, { parse_mode: 'Markdown' });
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la notification système:', error);
    }
  }

  // Démarrer le bot
  public async start() {
    try {
      console.log('🤖 Démarrage du bot Telegram...');
      // Le bot démarre automatiquement avec polling: true
    } catch (error) {
      console.error('Erreur lors du démarrage du bot Telegram:', error);
    }
  }

  // Arrêter le bot
  public async stop() {
    try {
      await this.bot.stopPolling();
      console.log('Bot Telegram arrêté.');
    } catch (error) {
      console.error('Erreur lors de l\'arrêt du bot Telegram:', error);
    }
  }

  // Obtenir les informations du bot
  public async getBotInfo() {
    try {
      return await this.bot.getMe();
    } catch (error) {
      console.error('Erreur lors de la récupération des infos du bot:', error);
      return null;
    }
  }
}

// Instance singleton
export const telegramBot = new TelegramBotService(); 