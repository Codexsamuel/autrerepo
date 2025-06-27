const cron = require('node-cron')
const { productScraper } = require('../lib/product-scraper')

// Configuration
const SYNC_INTERVAL = '*/5 * * * *' // Toutes les 5 minutes
const LOG_FILE = './logs/sync.log'

// Fonction de logging
function log(message) {
  const timestamp = new Date().toISOString()
  const logMessage = `[${timestamp}] ${message}`
  console.log(logMessage)
  
  // Ici vous pourriez aussi écrire dans un fichier de log
  // require('fs').appendFileSync(LOG_FILE, logMessage + '\n')
}

// Fonction principale de synchronisation
async function syncProducts() {
  try {
    log('🚀 Début de la synchronisation des produits...')
    
    // Initialiser le scraper
    await productScraper.initialize()
    
    // Récupérer tous les produits
    const products = await productScraper.scrapeAllProducts()
    
    log(`✅ Synchronisation terminée: ${products.length} produits récupérés`)
    
    // Statistiques par fournisseur
    const stats = {}
    products.forEach(product => {
      if (!stats[product.supplier]) {
        stats[product.supplier] = 0
      }
      stats[product.supplier]++
    })
    
    Object.entries(stats).forEach(([supplier, count]) => {
      log(`📦 ${supplier}: ${count} produits`)
    })
    
    // Fermer le navigateur
    await productScraper.close()
    
    // Ici vous pourriez sauvegarder les produits dans une base de données
    // await saveProductsToDatabase(products)
    
    log('🎉 Synchronisation réussie!')
    
  } catch (error) {
    log(`❌ Erreur lors de la synchronisation: ${error.message}`)
    console.error(error)
    
    // Fermer le navigateur en cas d'erreur
    try {
      await productScraper.close()
    } catch (closeError) {
      log(`⚠️ Erreur lors de la fermeture du navigateur: ${closeError.message}`)
    }
  }
}

// Fonction pour mettre à jour les prix
async function updatePrices() {
  try {
    log('💰 Début de la mise à jour des prix...')
    
    // Ici vous récupéreriez les produits existants depuis la base de données
    // const existingProducts = await getProductsFromDatabase()
    
    // Pour l'exemple, on utilise des produits simulés
    const existingProducts = [
      {
        id: "1",
        name: "iPhone 15 Pro",
        price: 1299,
        supplier: "alibaba"
      }
    ]
    
    await productScraper.initialize()
    const updatedProducts = await productScraper.updatePrices(existingProducts)
    await productScraper.close()
    
    log(`✅ Mise à jour des prix terminée: ${updatedProducts.length} produits mis à jour`)
    
    // Ici vous sauvegarderiez les prix mis à jour
    // await updatePricesInDatabase(updatedProducts)
    
  } catch (error) {
    log(`❌ Erreur lors de la mise à jour des prix: ${error.message}`)
    console.error(error)
  }
}

// Fonction pour vérifier la santé du système
async function healthCheck() {
  try {
    log('🏥 Vérification de la santé du système...')
    
    // Vérifier la connectivité avec les fournisseurs
    const suppliers = ['alibaba', 'shein', 'cdiscount', 'glothelo']
    
    for (const supplier of suppliers) {
      try {
        await productScraper.initialize()
        
        let products = []
        switch (supplier) {
          case 'alibaba':
            products = await productScraper.scrapeAlibabaProducts('test', 1)
            break
          case 'shein':
            products = await productScraper.scrapeSheinProducts('test', 1)
            break
          case 'cdiscount':
            products = await productScraper.scrapeCdiscountProducts('test', 1)
            break
          case 'glothelo':
            products = await productScraper.scrapeGlotheloProducts('test', 1)
            break
        }
        
        log(`✅ ${supplier}: Connectivité OK (${products.length} produits de test)`)
        await productScraper.close()
        
      } catch (error) {
        log(`❌ ${supplier}: Erreur de connectivité - ${error.message}`)
        await productScraper.close()
      }
    }
    
    log('🏥 Vérification de santé terminée')
    
  } catch (error) {
    log(`❌ Erreur lors de la vérification de santé: ${error.message}`)
  }
}

// Configuration des tâches cron
function setupCronJobs() {
  // Synchronisation principale toutes les 5 minutes
  cron.schedule(SYNC_INTERVAL, () => {
    syncProducts()
  })
  
  // Mise à jour des prix toutes les heures
  cron.schedule('0 * * * *', () => {
    updatePrices()
  })
  
  // Vérification de santé toutes les 30 minutes
  cron.schedule('*/30 * * * *', () => {
    healthCheck()
  })
  
  log('⏰ Tâches cron configurées:')
  log(`   - Synchronisation: ${SYNC_INTERVAL}`)
  log('   - Mise à jour des prix: Toutes les heures')
  log('   - Vérification de santé: Toutes les 30 minutes')
}

// Fonction pour démarrer le service
function startService() {
  log('🚀 Démarrage du service de synchronisation DL Style...')
  
  // Configuration des tâches cron
  setupCronJobs()
  
  // Synchronisation initiale
  syncProducts()
  
  log('✅ Service démarré avec succès!')
  log('📊 Le service fonctionne maintenant en arrière-plan')
  log('🛑 Appuyez sur Ctrl+C pour arrêter le service')
}

// Gestion de l'arrêt propre
process.on('SIGINT', async () => {
  log('🛑 Arrêt du service...')
  
  try {
    await productScraper.close()
    log('✅ Service arrêté proprement')
  } catch (error) {
    log(`⚠️ Erreur lors de l'arrêt: ${error.message}`)
  }
  
  process.exit(0)
})

// Gestion des erreurs non capturées
process.on('uncaughtException', (error) => {
  log(`💥 Erreur non capturée: ${error.message}`)
  console.error(error)
})

process.on('unhandledRejection', (reason, promise) => {
  log(`💥 Promesse rejetée non gérée: ${reason}`)
  console.error(reason)
})

// Démarrer le service si le script est exécuté directement
if (require.main === module) {
  startService()
}

module.exports = {
  syncProducts,
  updatePrices,
  healthCheck,
  startService
} 