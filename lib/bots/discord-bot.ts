// import { Client, GatewayIntentBits, TextChannel, EmbedBuilder, ActivityType, ColorResolvable } from 'discord.js';
// import { oneWinAPI, OneWinBet, OneWinPrediction } from '../trading/1win-api';

// Types temporaires pour éviter les erreurs de build
type Client = any;
type GatewayIntentBits = any;
type TextChannel = any;
type EmbedBuilder = any;
type ActivityType = any;
type ColorResolvable = any;

// Fichier temporairement désactivé pour le build
// Discord.js n'est pas installé en production

export class DiscordBot {
  private isReady: boolean = false;

  constructor() {
    console.log('Discord Bot désactivé pour le build');
  }

  public async start() {
    console.log('Discord Bot non disponible');
  }

  public async stop() {
    console.log('Discord Bot non disponible');
  }

  public async sendBetNotification(bet: any, symbol: string) {
    console.log('Discord Bot non disponible');
  }

  public async sendPredictionNotification(prediction: any) {
    console.log('Discord Bot non disponible');
  }

  public async sendBetResultNotification(bet: any, symbol: string, result: 'won' | 'lost') {
    console.log('Discord Bot non disponible');
  }

  public async sendSystemNotification(title: string, message: string, color: string = '#0099ff') {
    console.log('Discord Bot non disponible');
  }
}

// Instance singleton
export const discordBot = new DiscordBot(); 