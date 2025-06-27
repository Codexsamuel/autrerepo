import { startPeriodicScraping } from '../lib/scraper/aliexpress';
import cron from 'node-cron';


// Exécuter le scraping toutes les 6 heures
cron.schedule('0 */6 * * *', async () => {
  console.log('Démarrage du scraping périodique...');
  try {
    await startPeriodicScraping();
    console.log('Scraping terminé avec succès');
  } catch (error) {
    console.error('Erreur lors du scraping périodique:', error);
  }
});

// Exécuter immédiatement au démarrage
console.log('Démarrage du scraping initial...');
startPeriodicScraping()
  .then(() => console.log('Scraping initial terminé avec succès'))
  .catch(error => console.error('Erreur lors du scraping initial:', error)); 