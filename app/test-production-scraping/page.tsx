import ProductionScrapingTest from '@/components/scraping/ProductionScrapingTest';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Test Production Scraping - DL Solutions',
  description: 'Tests complets de tous les modules de scraping en production',
  keywords: ['test production', 'scraping', 'production', 'tests', 'DL Solutions'],
};

export default function TestProductionScrapingPage() {
  return <ProductionScrapingTest />;
} 