import { Client, GatewayIntentBits, TextChannel, EmbedBuilder, ActivityType, ColorResolvable } from 'discord.js';
import { oneWinAPI, OneWinBet, OneWinPrediction } from '../trading/1win-api';


export class DiscordBot {
  private client: Client;
  private channelId: string;
  private isReady: boolean = false;

  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    this.channelId = process.env.DISCORD_CHANNEL_ID!;

    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    this.client.once('ready', () => {
      console.log(`🤖 Bot Discord connecté: ${this.client.user?.tag}`);
      this.isReady = true;
      
      // Définir le statut du bot
      this.client.user?.setActivity('DAVY Trading Platform', {
        type: ActivityType.Watching,
      });
    });

    this.client.on('messageCreate', async (message) => {
      if (message.author.bot) return;
      
      // Traiter les commandes
      if (message.content.startsWith('!')) {
        await this.handleCommand(message);
      }
    });

    this.client.on('error', (error) => {
      console.error('Erreur Discord Bot:', error);
    });
  }

  private async handleCommand(message: any) {
    const command = message.content.toLowerCase().split(' ')[0];

    switch (command) {
      case '!balance':
        await this.sendBalance(message);
        break;
      case '!stats':
        await this.sendStats(message);
        break;
      case '!predict':
        await this.sendPrediction(message);
        break;
      case '!help':
        await this.sendHelp(message);
        break;
      default:
        await message.reply('Commande non reconnue. Tapez `!help` pour voir les commandes disponibles.');
    }
  }

  private async sendBalance(message: any) {
    try {
      const balance = await oneWinAPI.getBalance();
      const embed = new EmbedBuilder()
        .setTitle('💰 Solde du Compte')
        .setDescription(`Votre solde actuel: **${balance.toFixed(2)} €**`)
        .setColor('#00ff00')
        .setTimestamp();

      await message.reply({ embeds: [embed] });
    } catch (error) {
      await message.reply('❌ Erreur lors de la récupération du solde.');
    }
  }

  private async sendStats(message: any) {
    try {
      const stats = await oneWinAPI.getTradingStats();
      const embed = new EmbedBuilder()
        .setTitle('📊 Statistiques de Trading')
        .addFields(
          { name: 'Total des Paris', value: stats.totalBets.toString(), inline: true },
          { name: 'Paris Gagnés', value: stats.wonBets.toString(), inline: true },
          { name: 'Paris Perdus', value: stats.lostBets.toString(), inline: true },
          { name: 'Taux de Réussite', value: `${(stats.winRate * 100).toFixed(1)}%`, inline: true },
          { name: 'Profit Total', value: `${stats.totalProfit.toFixed(2)} €`, inline: true }
        )
        .setColor('#0099ff')
        .setTimestamp();

      await message.reply({ embeds: [embed] });
    } catch (error) {
      await message.reply('❌ Erreur lors de la récupération des statistiques.');
    }
  }

  private async sendPrediction(message: any) {
    try {
      const args = message.content.split(' ');
      const symbol = args[1] || 'BTC/USD';
      
      const prediction = await oneWinAPI.generatePrediction(symbol);
      if (!prediction) {
        await message.reply('❌ Erreur lors de la génération de la prédiction.');
        return;
      }

      const embed = new EmbedBuilder()
        .setTitle('🔮 Prédiction IA')
        .addFields(
          { name: 'Symbole', value: prediction.symbol, inline: true },
          { name: 'Direction', value: prediction.direction.toUpperCase(), inline: true },
          { name: 'Confiance', value: `${(prediction.confidence * 100).toFixed(1)}%`, inline: true },
          { name: 'Expire dans', value: '5 minutes', inline: true }
        )
        .setColor(prediction.direction === 'up' ? '#00ff00' : '#ff0000')
        .setTimestamp();

      await message.reply({ embeds: [embed] });
    } catch (error) {
      await message.reply('❌ Erreur lors de la génération de la prédiction.');
    }
  }

  private async sendHelp(message: any) {
    const embed = new EmbedBuilder()
      .setTitle('🤖 Commandes du Bot DAVY Trading')
      .addFields(
        { name: '!balance', value: 'Afficher le solde du compte', inline: true },
        { name: '!stats', value: 'Afficher les statistiques de trading', inline: true },
        { name: '!predict [symbole]', value: 'Générer une prédiction IA', inline: true },
        { name: '!help', value: 'Afficher cette aide', inline: true }
      )
      .setColor('#0099ff')
      .setTimestamp();

    await message.reply({ embeds: [embed] });
  }

  // Méthodes publiques pour envoyer des notifications

  public async sendBetNotification(bet: OneWinBet, symbol: string) {
    if (!this.isReady) return;

    try {
      const channel = this.client.channels.cache.get(this.channelId) as TextChannel;
      if (!channel) return;

      const embed = new EmbedBuilder()
        .setTitle('🎯 Nouveau Pari Placé')
        .addFields(
          { name: 'Symbole', value: symbol, inline: true },
          { name: 'Montant', value: `${bet.amount} €`, inline: true },
          { name: 'Multiplicateur', value: bet.multiplier.toString(), inline: true },
          { name: 'Statut', value: 'En cours...', inline: true }
        )
        .setColor('#ffaa00')
        .setTimestamp();

      await channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la notification de pari:', error);
    }
  }

  public async sendPredictionNotification(prediction: OneWinPrediction) {
    if (!this.isReady) return;

    try {
      const channel = this.client.channels.cache.get(this.channelId) as TextChannel;
      if (!channel) return;

      const embed = new EmbedBuilder()
        .setTitle('🔮 Nouvelle Prédiction IA')
        .addFields(
          { name: 'Symbole', value: prediction.symbol, inline: true },
          { name: 'Direction', value: prediction.direction.toUpperCase(), inline: true },
          { name: 'Confiance', value: `${(prediction.confidence * 100).toFixed(1)}%`, inline: true },
          { name: 'Expire dans', value: '5 minutes', inline: true }
        )
        .setColor(prediction.direction === 'up' ? '#00ff00' : '#ff0000')
        .setTimestamp();

      await channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la notification de prédiction:', error);
    }
  }

  public async sendBetResultNotification(bet: OneWinBet, symbol: string, result: 'won' | 'lost') {
    if (!this.isReady) return;

    try {
      const channel = this.client.channels.cache.get(this.channelId) as TextChannel;
      if (!channel) return;

      const profit = result === 'won' ? bet.amount * bet.multiplier - bet.amount : -bet.amount;

      const embed = new EmbedBuilder()
        .setTitle(result === 'won' ? '🎉 Pari Gagné!' : '💔 Pari Perdu')
        .addFields(
          { name: 'Symbole', value: symbol, inline: true },
          { name: 'Montant', value: `${bet.amount} €`, inline: true },
          { name: 'Résultat', value: result === 'won' ? 'Gagné' : 'Perdu', inline: true },
          { name: 'Profit/Perte', value: `${profit.toFixed(2)} €`, inline: true }
        )
        .setColor(result === 'won' ? '#00ff00' : '#ff0000')
        .setTimestamp();

      await channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la notification de résultat:', error);
    }
  }

  public async sendSystemNotification(title: string, message: string, color: string = '#0099ff') {
    if (!this.isReady) return;

    try {
      const channel = this.client.channels.cache.get(this.channelId) as TextChannel;
      if (!channel) return;

      const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(message)
        .setColor(color as ColorResolvable)
        .setTimestamp();

      await channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la notification système:', error);
    }
  }

  // Démarrer le bot
  public async start() {
    try {
      await this.client.login(process.env.DISCORD_BOT_TOKEN);
    } catch (error) {
      console.error('Erreur lors du démarrage du bot Discord:', error);
    }
  }

  // Arrêter le bot
  public async stop() {
    try {
      await this.client.destroy();
      console.log('Bot Discord arrêté.');
    } catch (error) {
      console.error('Erreur lors de l\'arrêt du bot Discord:', error);
    }
  }
}

// Instance singleton
export const discordBot = new DiscordBot(); 