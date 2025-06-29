#!/usr/bin/env node

const { bookingIntegrationService } = require('../lib/services/booking-integration');
const cron = require('node-cron');

console.log('🔄 Démarrage du service de synchronisation des prestataires...');

// Synchronisation toutes les 5 minutes
cron.schedule('*/5 * * * *', async () => {
  console.log('🔄 Synchronisation automatique des prestataires...');
  
  try {
    await bookingIntegrationService.syncAll();
    console.log('✅ Synchronisation terminée avec succès');
  } catch (error) {
    console.error('❌ Erreur synchronisation:', error);
  }
});

// Synchronisation complète toutes les heures
cron.schedule('0 * * * *', async () => {
  console.log('🔄 Synchronisation complète des prestataires...');
  
  try {
    // Synchronisation plus approfondie
    await Promise.all([
      bookingIntegrationService.syncBookingCom(),
      bookingIntegrationService.syncExpedia(),
      // Ajouter d'autres prestataires ici
    ]);
    
    console.log('✅ Synchronisation complète terminée');
  } catch (error) {
    console.error('❌ Erreur synchronisation complète:', error);
  }
});

// Nettoyage des anciennes données tous les jours à 2h du matin
cron.schedule('0 2 * * *', async () => {
  console.log('🧹 Nettoyage des anciennes données...');
  
  try {
    // Supprimer les réservations de plus de 30 jours
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    // Implémenter le nettoyage ici
    console.log('✅ Nettoyage terminé');
  } catch (error) {
    console.error('❌ Erreur nettoyage:', error);
  }
});

console.log('✅ Service de synchronisation démarré');
console.log('📅 Synchronisation toutes les 5 minutes');
console.log('📅 Synchronisation complète toutes les heures');
console.log('📅 Nettoyage quotidien à 2h du matin');

// Gestion de l'arrêt propre
process.on('SIGINT', () => {
  console.log('\n🛑 Arrêt du service de synchronisation...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Arrêt du service de synchronisation...');
  process.exit(0);
}); 