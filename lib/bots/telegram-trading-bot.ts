import { Telegraf, Context } from 'telegraf';
import { DavyTradingAdvisor } from '../trading/aiTrading';
import { AIPrediction, TradingSignal } from '../ai/ai-service';

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
  private bot: Telegraf<Context>;
  private advisor: DavyTradingAdvisor;
  private config: BotConfig;
  private alerts: TradingAlert[] = [];

  constructor(config: BotConfig) {
    this.config = config;
    this.bot = new Telegraf(config.token);
    this.advisor = new DavyTradingAdvisor();
    this.setupCommands();
    this.setupMiddleware();
  }

  private setupMiddleware() {
    // Middleware pour vérifier les utilisateurs autorisés
    this.bot.use(async (ctx, next) => {
      const userId = ctx.from?.id.toString();
      if (!userId || !this.config.allowedUsers.includes(userId)) {
        await ctx.reply('⛔ Accès non autorisé. Contactez l\'administrateur.');
        return;
      }
      await next();
    });
  }

  private setupCommands() {
    // Commande de démarrage
    this.bot.start(async (ctx) => {
      const welcomeMessage = `
🤖 **DAVY Trading Bot** - Assistant IA

Bienvenue ! Je suis votre assistant de trading IA.

**Commandes disponibles :**
/help - Afficher l'aide
/prediction <symbole> - Obtenir une prédiction
/analysis <symbole> - Analyser le sentiment
/signal <symbole> - Générer un signal de trading
/alerts - Gérer les alertes
/status - Statut du bot
/settings - Paramètres

**Exemples :**
/prediction AAPL
/analysis BTC
/signal ETH

Développé avec ❤️ par DAVY AI
      `;
      await ctx.reply(welcomeMessage, { parse_mode: 'Markdown' });
    });

    // Commande d'aide
    this.bot.help(async (ctx) => {
      const helpMessage = `
📚 **Aide - DAVY Trading Bot**

**Commandes de trading :**
• /prediction <symbole> - Prédiction de prix
• /analysis <symbole> - Analyse de sentiment
• /signal <symbole> - Signal de trading
• /portfolio - Gérer le portefeuille

**Commandes d'alerte :**
• /alerts - Liste des alertes
• /alert add <symbole> <prix> - Ajouter une alerte
• /alert remove <id> - Supprimer une alerte

**Commandes système :**
• /status - Statut du bot
• /settings - Paramètres
• /help - Cette aide

**Symboles supportés :**
• Actions : AAPL, TSLA, GOOGL, MSFT
• Crypto : BTC, ETH, ADA, DOT
• Forex : EURUSD, GBPUSD, USDJPY
      `;
      await ctx.reply(helpMessage, { parse_mode: 'Markdown' });
    });

    // Commande de prédiction
    this.bot.command('prediction', async (ctx) => {
      const symbol = ctx.message.text.split(' ')[1]?.toUpperCase();
      if (!symbol) {
        await ctx.reply('❌ Veuillez spécifier un symbole.\nExemple: /prediction AAPL');
        return;
      }

      await ctx.reply(`🔮 Génération de prédiction pour ${symbol}...`);

      try {
        const prediction = await this.advisor.getPrediction(symbol);
        
        if (prediction) {
          const message = `
📊 **Prédiction pour ${symbol}**

🎯 **Direction :** ${prediction.direction === 'up' ? '📈 Hausse' : '📉 Baisse'}
🎯 **Confiance :** ${Math.round(prediction.confidence * 100)}%
⏰ **Timeframe :** ${prediction.timeframe}
📅 **Expire le :** ${prediction.expiresAt.toLocaleDateString()}

💭 **Analyse :**
${prediction.reasoning}

🔍 **Source :** ${prediction.source.toUpperCase()}
          `;
          await ctx.reply(message, { parse_mode: 'Markdown' });
        } else {
          await ctx.reply(`❌ Impossible de générer une prédiction pour ${symbol}`);
        }
      } catch (error) {
        console.error('Erreur prédiction:', error);
        await ctx.reply('❌ Erreur lors de la génération de la prédiction');
      }
    });

    // Commande d'analyse
    this.bot.command('analysis', async (ctx) => {
      const symbol = ctx.message.text.split(' ')[1]?.toUpperCase();
      if (!symbol) {
        await ctx.reply('❌ Veuillez spécifier un symbole.\nExemple: /analysis BTC');
        return;
      }

      await ctx.reply(`🔍 Analyse du sentiment pour ${symbol}...`);

      try {
        const analysis = await this.advisor.getMarketAnalysis(symbol);
        
        if (analysis) {
          const sentimentEmoji: Record<string, string> = {
            bullish: '🐂',
            bearish: '🐻',
            neutral: '➡️'
          };

          const riskEmoji: Record<string, string> = {
            low: '🟢',
            medium: '🟡',
            high: '🔴'
          };

          const message = `
📈 **Analyse de sentiment - ${symbol}**

${sentimentEmoji[analysis.sentiment] || '➡️'} **Sentiment :** ${analysis.sentiment.toUpperCase()}
🎯 **Confiance :** ${Math.round(analysis.confidence * 100)}%
${riskEmoji[analysis.riskLevel] || '🟡'} **Risque :** ${analysis.riskLevel.toUpperCase()}

💡 **Recommandation :**
${analysis.recommendation}

🔑 **Facteurs clés :**
${analysis.keyFactors.map(factor => `• ${factor}`).join('\n')}
          `;
          await ctx.reply(message, { parse_mode: 'Markdown' });
        } else {
          await ctx.reply(`❌ Impossible d'analyser ${symbol}`);
        }
      } catch (error) {
        console.error('Erreur analyse:', error);
        await ctx.reply('❌ Erreur lors de l\'analyse');
      }
    });

    // Commande de signal
    this.bot.command('signal', async (ctx) => {
      const symbol = ctx.message.text.split(' ')[1]?.toUpperCase();
      if (!symbol) {
        await ctx.reply('❌ Veuillez spécifier un symbole.\nExemple: /signal ETH');
        return;
      }

      await ctx.reply(`⚡ Génération de signal pour ${symbol}...`);

      try {
        const signal = await this.advisor.getTradingSignal(symbol);
        
        if (signal) {
          const actionEmoji = {
            buy: '🟢',
            sell: '🔴',
            hold: '🟡'
          };

          const message = `
⚡ **Signal de trading - ${symbol}**

${actionEmoji[signal.action]} **Action :** ${signal.action.toUpperCase()}
💪 **Force :** ${Math.round(signal.strength * 100)}%

${signal.stopLoss ? `🛑 **Stop Loss :** $${signal.stopLoss}` : ''}
${signal.takeProfit ? `🎯 **Take Profit :** $${signal.takeProfit}` : ''}

💭 **Raisonnement :**
${signal.reasoning}
          `;
          await ctx.reply(message, { parse_mode: 'Markdown' });
        } else {
          await ctx.reply(`❌ Impossible de générer un signal pour ${symbol}`);
        }
      } catch (error) {
        console.error('Erreur signal:', error);
        await ctx.reply('❌ Erreur lors de la génération du signal');
      }
    });

    // Commande d'alertes
    this.bot.command('alerts', async (ctx) => {
      const args = ctx.message.text.split(' ');
      const subCommand = args[1];

      if (!subCommand) {
        // Afficher la liste des alertes
        if (this.alerts.length === 0) {
          await ctx.reply('📋 Aucune alerte configurée');
          return;
        }

        const alertsList = this.alerts.map(alert => 
          `• ${alert.symbol} - ${alert.type} (${alert.priority})`
        ).join('\n');

        const message = `
📋 **Alertes actives :**

${alertsList}

Utilisez /alerts add pour ajouter une alerte
        `;
        await ctx.reply(message, { parse_mode: 'Markdown' });
        return;
      }

      if (subCommand === 'add') {
        const symbol = args[2]?.toUpperCase();
        const price = parseFloat(args[3]);

        if (!symbol || isNaN(price)) {
          await ctx.reply('❌ Format: /alerts add <symbole> <prix>\nExemple: /alerts add AAPL 150');
          return;
        }

        const alert: TradingAlert = {
          id: Date.now().toString(),
          symbol,
          type: 'prediction',
          message: `Prix ${symbol} atteint $${price}`,
          timestamp: new Date(),
          priority: 'medium'
        };

        this.alerts.push(alert);
        await ctx.reply(`✅ Alerte ajoutée pour ${symbol} à $${price}`);
      }

      if (subCommand === 'remove') {
        const alertId = args[2];
        const index = this.alerts.findIndex(alert => alert.id === alertId);
        
        if (index !== -1) {
          const removed = this.alerts.splice(index, 1)[0];
          await ctx.reply(`✅ Alerte supprimée: ${removed.symbol}`);
        } else {
          await ctx.reply('❌ Alerte non trouvée');
        }
      }
    });

    // Commande de statut
    this.bot.command('status', async (ctx) => {
      const status = `
🤖 **Statut du Bot DAVY**

✅ **Bot :** Actif
🎯 **Trading :** ${this.config.tradingEnabled ? 'Activé' : 'Désactivé'}
🔔 **Notifications :** ${this.config.notificationsEnabled ? 'Activées' : 'Désactivées'}
📊 **Alertes actives :** ${this.alerts.length}
👥 **Utilisateurs autorisés :** ${this.config.allowedUsers.length}

🕐 **Dernière mise à jour :** ${new Date().toLocaleString()}
      `;
      await ctx.reply(status, { parse_mode: 'Markdown' });
    });

    // Commande de paramètres (admin seulement)
    this.bot.command('settings', async (ctx) => {
      const userId = ctx.from?.id.toString();
      if (!userId || !this.config.adminUsers.includes(userId)) {
        await ctx.reply('⛔ Accès administrateur requis');
        return;
      }

      const settings = `
⚙️ **Paramètres du Bot**

🔧 **Configuration actuelle :**
• Trading: ${this.config.tradingEnabled ? 'ON' : 'OFF'}
• Notifications: ${this.config.notificationsEnabled ? 'ON' : 'OFF'}
• Utilisateurs autorisés: ${this.config.allowedUsers.length}
• Administrateurs: ${this.config.adminUsers.length}

📝 **Modification via variables d'environnement**
      `;
      await ctx.reply(settings, { parse_mode: 'Markdown' });
    });

    // Gestion des messages texte
    this.bot.on('text', async (ctx) => {
      const text = ctx.message.text;
      
      // Analyse automatique si le message contient un symbole
      const symbolMatch = text.match(/\b[A-Z]{3,5}\b/);
      if (symbolMatch) {
        const symbol = symbolMatch[0];
        await ctx.reply(`🔍 Analyse rapide de ${symbol}...`);
        
        try {
          const analysis = await this.advisor.getMarketAnalysis(symbol);
          if (analysis) {
            const quickMessage = `
📊 **${symbol} - Analyse rapide**

Sentiment: ${analysis.sentiment}
Confiance: ${Math.round(analysis.confidence * 100)}%
Risque: ${analysis.riskLevel}

💡 ${analysis.recommendation}
            `;
            await ctx.reply(quickMessage, { parse_mode: 'Markdown' });
          }
        } catch (error) {
          console.error('Erreur analyse rapide:', error);
        }
      }
    });
  }

  // Méthode pour envoyer des notifications
  async sendNotification(message: string, priority: 'low' | 'medium' | 'high' = 'medium') {
    if (!this.config.notificationsEnabled) return;

    const priorityEmoji = {
      low: '🔵',
      medium: '🟡',
      high: '🔴'
    };

    const notificationMessage = `
${priorityEmoji[priority]} **Notification DAVY**

${message}

🕐 ${new Date().toLocaleString()}
    `;

    for (const userId of this.config.allowedUsers) {
      try {
        await this.bot.telegram.sendMessage(userId, notificationMessage, { parse_mode: 'Markdown' });
      } catch (error) {
        console.error(`Erreur envoi notification à ${userId}:`, error);
      }
    }
  }

  // Méthode pour envoyer des alertes de trading
  async sendTradingAlert(alert: TradingAlert) {
    const alertMessage = `
🚨 **Alerte Trading - ${alert.symbol}**

${alert.message}

📊 **Type :** ${alert.type}
🎯 **Priorité :** ${alert.priority}
🕐 **Heure :** ${alert.timestamp.toLocaleString()}
    `;

    await this.sendNotification(alertMessage, alert.priority);
  }

  // Démarrer le bot
  async start() {
    try {
      await this.bot.launch();
      console.log('🤖 Bot Telegram DAVY démarré');
      
      // Envoyer notification de démarrage aux admins
      await this.sendNotification('Bot DAVY Trading démarré avec succès', 'low');
    } catch (error) {
      console.error('Erreur démarrage bot:', error);
      throw new Error('Impossible de démarrer le bot Telegram');
    }
  }

  // Arrêter le bot
  async stop() {
    try {
      await this.bot.stop();
      console.log('🤖 Bot Telegram DAVY arrêté');
    } catch (error) {
      console.error('Erreur arrêt bot:', error);
    }
  }

  // Méthode pour ajouter une alerte
  addAlert(alert: TradingAlert) {
    this.alerts.push(alert);
    this.sendTradingAlert(alert);
  }

  // Méthode pour supprimer une alerte
  removeAlert(alertId: string): boolean {
    const index = this.alerts.findIndex(alert => alert.id === alertId);
    if (index !== -1) {
      this.alerts.splice(index, 1);
      return true;
    }
    return false;
  }

  // Méthode pour obtenir les statistiques
  getStats() {
    return {
      totalAlerts: this.alerts.length,
      activeUsers: this.config.allowedUsers.length,
      tradingEnabled: this.config.tradingEnabled,
      notificationsEnabled: this.config.notificationsEnabled,
      uptime: new Date().toISOString()
    };
  }
}

export default TelegramTradingBot; 