#!/usr/bin/env node

/**
 * Script de démarrage du service de synchronisation
 * Ce script initialise et démarre le service de synchronisation automatique
 * pour maintenir les produits à jour depuis les différents fournisseurs.
 */

const { startSyncService, getSyncService } = require('../lib/sync-service')

console.log('🚀 Démarrage du service de synchronisation DL Solutions...')

// Fonction pour afficher le statut du service
function displayStatus() {
  const service = getSyncService()
  const status = service.getStatus()
  const stats = service.getStats()
  
  console.log('\n📊 Statut du service:')
  console.log(`   • Service en cours: ${status.isRunning ? '✅ Oui' : '❌ Non'}`)
  console.log(`   • Dernière sync: ${status.lastSync ? new Date(status.lastSync.timestamp).toLocaleString('fr-FR') : 'Aucune'}`)
  console.log(`   • Prochaine sync: ${status.nextSync ? new Date(status.nextSync).toLocaleString('fr-FR') : 'Non programmée'}`)
  
  console.log('\n📈 Statistiques:')
  console.log(`   • Total synchronisations: ${stats.totalSyncs}`)
  console.log(`   • Synchronisations réussies: ${stats.successfulSyncs}`)
  console.log(`   • Synchronisations échouées: ${stats.failedSyncs}`)
  console.log(`   • Durée moyenne: ${Math.round(stats.averageDuration)}ms`)
  
  console.log('\n🕐 Dernières 24h:')
  console.log(`   • Synchronisations: ${stats.last24h.syncs}`)
  console.log(`   • Produits mis à jour: ${stats.last24h.productsUpdated}`)
  console.log(`   • Produits ajoutés: ${stats.last24h.productsAdded}`)
  console.log(`   • Produits supprimés: ${stats.last24h.productsRemoved}`)
  
  console.log('\n⚙️ Configuration:')
  const config = status.config
  console.log(`   • Activé: ${config.enabled ? '✅' : '❌'}`)
  console.log(`   • Intervalle: ${config.interval}`)
  console.log(`   • Fournisseurs: ${config.suppliers.join(', ')}`)
  console.log(`   • Mise à jour prix: ${config.autoUpdatePrices ? '✅' : '❌'}`)
  console.log(`   • Mise à jour stock: ${config.autoUpdateStock ? '✅' : '❌'}`)
  console.log(`   • Notifications: ${config.notifications ? '✅' : '❌'}`)
}

// Fonction pour afficher les logs récents
function displayRecentLogs() {
  const service = getSyncService()
  const logs = service.getLogs(10)
  
  if (logs.length === 0) {
    console.log('\n📝 Aucun log de synchronisation disponible')
    return
  }
  
  console.log('\n📝 Logs récents:')
  logs.forEach((log, index) => {
    const status = log.status === 'success' ? '✅' : log.status === 'partial' ? '🟡' : '❌'
    const time = new Date(log.timestamp).toLocaleString('fr-FR')
    const supplier = log.supplier ? ` (${log.supplier})` : ''
    
    console.log(`   ${index + 1}. ${status} ${time}${supplier}`)
    console.log(`      Mise à jour: ${log.productsUpdated}, Ajoutés: ${log.productsAdded}, Supprimés: ${log.productsRemoved}`)
    console.log(`      Durée: ${log.duration}ms`)
    
    if (log.errors.length > 0) {
      console.log(`      Erreurs: ${log.errors.join(', ')}`)
    }
  })
}

// Fonction principale
async function main() {
  try {
    // Démarrer le service
    startSyncService()
    
    // Attendre un peu pour que le service s'initialise
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Afficher le statut initial
    displayStatus()
    displayRecentLogs()
    
    console.log('\n🎯 Service de synchronisation démarré avec succès!')
    console.log('   Le service va maintenant synchroniser automatiquement les produits selon la configuration.')
    console.log('   Utilisez Ctrl+C pour arrêter le service.')
    
    // Garder le processus en vie
    process.on('SIGINT', () => {
      console.log('\n🛑 Arrêt du service de synchronisation...')
      const service = getSyncService()
      service.stop()
      console.log('✅ Service arrêté avec succès')
      process.exit(0)
    })
    
    // Afficher le statut toutes les 5 minutes
    setInterval(() => {
      console.log('\n' + '='.repeat(60))
      displayStatus()
    }, 5 * 60 * 1000)
    
  } catch (error) {
    console.error('❌ Erreur lors du démarrage du service:', error)
    process.exit(1)
  }
}

// Gestion des erreurs non capturées
process.on('uncaughtException', (error) => {
  console.error('❌ Erreur non capturée:', error)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promesse rejetée non gérée:', reason)
  process.exit(1)
})

// Démarrer le script
main() 