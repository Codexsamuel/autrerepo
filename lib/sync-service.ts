import cron from 'node-cron'
import { promises as fs } from 'fs'
import path from 'path'


// Types pour la configuration de synchronisation
interface SyncConfig {
  enabled: boolean
  interval: string // Cron expression
  suppliers: string[]
  autoUpdatePrices: boolean
  autoUpdateStock: boolean
  notifications: boolean
}

// Types pour les logs de synchronisation
interface SyncLog {
  id: string
  timestamp: string
  supplier?: string
  status: 'success' | 'error' | 'partial'
  productsUpdated: number
  productsAdded: number
  productsRemoved: number
  errors: string[]
  duration: number
}

// Chemin vers les fichiers de configuration
const configPath = path.join(process.cwd(), 'database', 'sync-config.json')
const logsPath = path.join(process.cwd(), 'database', 'sync-logs.json')

// Configuration par défaut
const defaultConfig: SyncConfig = {
  enabled: true,
  interval: '0 */6 * * *', // Toutes les 6 heures
  suppliers: ['alibaba', 'shein', 'cdiscount', 'glothelo'],
  autoUpdatePrices: true,
  autoUpdateStock: true,
  notifications: true
}

// Classe principale du service de synchronisation
export class SyncService {
  private config: SyncConfig
  private logs: SyncLog[] = []
  private isRunning = false
  private cronJob?: cron.ScheduledTask

  constructor() {
    this.config = defaultConfig
    this.loadConfig()
    this.loadLogs()
  }

  // Charger la configuration
  private async loadConfig(): Promise<void> {
    try {
      const data = await fs.readFile(configPath, 'utf-8')
      this.config = { ...defaultConfig, ...JSON.parse(data) }
    } catch (error) {
      console.log('Configuration par défaut utilisée')
      await this.saveConfig()
    }
  }

  // Sauvegarder la configuration
  private async saveConfig(): Promise<void> {
    try {
      const dir = path.dirname(configPath)
      await fs.mkdir(dir, { recursive: true })
      await fs.writeFile(configPath, JSON.stringify(this.config, null, 2))
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la configuration:', error)
    }
  }

  // Charger les logs
  private async loadLogs(): Promise<void> {
    try {
      const data = await fs.readFile(logsPath, 'utf-8')
      this.logs = JSON.parse(data)
    } catch (error) {
      this.logs = []
    }
  }

  // Sauvegarder les logs
  private async saveLogs(): Promise<void> {
    try {
      const dir = path.dirname(logsPath)
      await fs.mkdir(dir, { recursive: true })
      await fs.writeFile(logsPath, JSON.stringify(this.logs, null, 2))
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des logs:', error)
    }
  }

  // Démarrer le service
  public start(): void {
    if (this.isRunning) {
      console.log('Service de synchronisation déjà en cours')
      return
    }

    if (!this.config.enabled) {
      console.log('Service de synchronisation désactivé')
      return
    }

    this.cronJob = cron.schedule(this.config.interval, () => {
      this.runSync()
    }, {
      scheduled: true,
      timezone: "Europe/Paris"
    })

    this.isRunning = true
    console.log(`Service de synchronisation démarré avec l'intervalle: ${this.config.interval}`)
  }

  // Arrêter le service
  public stop(): void {
    if (this.cronJob) {
      this.cronJob.stop()
      this.cronJob = undefined
    }
    this.isRunning = false
    console.log('Service de synchronisation arrêté')
  }

  // Exécuter une synchronisation
  public async runSync(supplier?: string): Promise<SyncLog> {
    const startTime = Date.now()
    const logId = `sync_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const log: SyncLog = {
      id: logId,
      timestamp: new Date().toISOString(),
      supplier,
      status: 'success',
      productsUpdated: 0,
      productsAdded: 0,
      productsRemoved: 0,
      errors: [],
      duration: 0
    }

    try {
      console.log(`Début de la synchronisation${supplier ? ` pour ${supplier}` : ' complète'}`)
      
      const suppliers = supplier ? [supplier] : this.config.suppliers
      
      for (const sup of suppliers) {
        try {
          await this.syncSupplier(sup, log)
        } catch (error) {
          const errorMsg = `Erreur lors de la synchronisation de ${sup}: ${error}`
          log.errors.push(errorMsg)
          console.error(errorMsg)
        }
      }

      // Déterminer le statut final
      if (log.errors.length === 0) {
        log.status = 'success'
      } else if (log.errors.length < suppliers.length) {
        log.status = 'partial'
      } else {
        log.status = 'error'
      }

    } catch (error) {
      log.status = 'error'
      log.errors.push(`Erreur générale: ${error}`)
      console.error('Erreur lors de la synchronisation:', error)
    } finally {
      log.duration = Date.now() - startTime
      this.logs.push(log)
      
      // Garder seulement les 100 derniers logs
      if (this.logs.length > 100) {
        this.logs = this.logs.slice(-100)
      }
      
      await this.saveLogs()
      
      console.log(`Synchronisation terminée en ${log.duration}ms - Statut: ${log.status}`)
      
      // Envoyer des notifications si activées
      if (this.config.notifications) {
        await this.sendNotification(log)
      }
    }

    return log
  }

  // Synchroniser un fournisseur spécifique
  private async syncSupplier(supplier: string, log: SyncLog): Promise<void> {
    console.log(`Synchronisation de ${supplier}...`)
    
    // Simuler la synchronisation avec des délais variables
    const delay = Math.random() * 2000 + 1000 // 1-3 secondes
    await new Promise(resolve => setTimeout(resolve, delay))
    
    // Simuler des résultats
    const productsUpdated = Math.floor(Math.random() * 50) + 10
    const productsAdded = Math.floor(Math.random() * 10) + 1
    const productsRemoved = Math.floor(Math.random() * 5)
    
    log.productsUpdated += productsUpdated
    log.productsAdded += productsAdded
    log.productsRemoved += productsRemoved
    
    console.log(`${supplier}: ${productsUpdated} mis à jour, ${productsAdded} ajoutés, ${productsRemoved} supprimés`)
  }

  // Envoyer une notification
  private async sendNotification(log: SyncLog): Promise<void> {
    // Ici vous pourriez intégrer avec un service de notification
    // (email, Slack, Discord, etc.)
    
    const message = `Synchronisation ${log.status}: ${log.productsUpdated} produits mis à jour, ${log.productsAdded} ajoutés, ${log.productsRemoved} supprimés en ${log.duration}ms`
    
    if (log.status === 'error') {
      console.error(`🔴 ${message}`)
      console.error('Erreurs:', log.errors)
    } else if (log.status === 'partial') {
      console.warn(`🟡 ${message}`)
    } else {
      console.log(`🟢 ${message}`)
    }
  }

  // Obtenir la configuration
  public getConfig(): SyncConfig {
    return { ...this.config }
  }

  // Mettre à jour la configuration
  public async updateConfig(updates: Partial<SyncConfig>): Promise<void> {
    this.config = { ...this.config, ...updates }
    await this.saveConfig()
    
    // Redémarrer le service si nécessaire
    if (this.isRunning) {
      this.stop()
      this.start()
    }
  }

  // Obtenir les logs
  public getLogs(limit: number = 50): SyncLog[] {
    return this.logs.slice(-limit).reverse()
  }

  // Obtenir le statut du service
  public getStatus(): {
    isRunning: boolean
    lastSync?: SyncLog
    nextSync?: string
    config: SyncConfig
  } {
    const lastSync = this.logs.length > 0 ? this.logs[this.logs.length - 1] : undefined
    
    return {
      isRunning: this.isRunning,
      lastSync,
      nextSync: this.getNextSyncTime(),
      config: this.config
    }
  }

  // Calculer la prochaine synchronisation
  private getNextSyncTime(): string | undefined {
    if (!this.cronJob || !this.config.enabled) {
      return undefined
    }
    
    // Cette fonction est simplifiée, dans un vrai projet vous utiliseriez
    // une bibliothèque pour calculer la prochaine exécution
    return new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString() // +6h
  }

  // Forcer une synchronisation immédiate
  public async forceSync(supplier?: string): Promise<SyncLog> {
    return this.runSync(supplier)
  }

  // Obtenir les statistiques de synchronisation
  public getStats(): {
    totalSyncs: number
    successfulSyncs: number
    failedSyncs: number
    averageDuration: number
    last24h: {
      syncs: number
      productsUpdated: number
      productsAdded: number
      productsRemoved: number
    }
  } {
    const now = new Date()
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    
    const recentLogs = this.logs.filter(log => new Date(log.timestamp) >= last24h)
    
    const totalSyncs = this.logs.length
    const successfulSyncs = this.logs.filter(log => log.status === 'success').length
    const failedSyncs = this.logs.filter(log => log.status === 'error').length
    const averageDuration = this.logs.length > 0 
      ? this.logs.reduce((sum: number, log: any) => sum + log.duration, 0) / this.logs.length 
      : 0
    
    const last24hStats = {
      syncs: recentLogs.length,
      productsUpdated: recentLogs.reduce((sum: number, log: any) => sum + log.productsUpdated, 0),
      productsAdded: recentLogs.reduce((sum: number, log: any) => sum + log.productsAdded, 0),
      productsRemoved: recentLogs.reduce((sum: number, log: any) => sum + log.productsRemoved, 0)
    }
    
    return {
      totalSyncs,
      successfulSyncs,
      failedSyncs,
      averageDuration,
      last24h: last24hStats
    }
  }
}

// Instance singleton du service
let syncServiceInstance: SyncService | null = null

export function getSyncService(): SyncService {
  if (!syncServiceInstance) {
    syncServiceInstance = new SyncService()
  }
  return syncServiceInstance
}

// Fonction utilitaire pour démarrer le service
export function startSyncService(): void {
  const service = getSyncService()
  service.start()
}

// Fonction utilitaire pour arrêter le service
export function stopSyncService(): void {
  const service = getSyncService()
  service.stop()
} 