import { Metadata } from 'next';
import ScrapingProductionReady from '@/components/scraping/ScrapingProductionReady';

export const metadata: Metadata = {
  title: 'Scraping Production Ready - DL Solutions',
  description: 'Système de scraping e-commerce avec fallback automatique et données réelles',
  keywords: ['scraping production', 'e-commerce', 'fallback automatique', 'données réelles', 'DL Solutions'],
};

export default function ScrapingProductionReadyPage() {
  return <ScrapingProductionReady />;
} 