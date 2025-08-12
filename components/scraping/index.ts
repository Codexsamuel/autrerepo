// Composants de Scraping
export { default as ScrapingMultiMarket } from './ScrapingMultiMarket';
export { default as AdvancedScraping } from './AdvancedScraping';
export { default as IndustrialScraping } from './IndustrialScraping';
export { default as ProductionScrapingTest } from './ProductionScrapingTest';
export { default as ScrapingProductionReady } from './ScrapingProductionReady';

// Types communs
export interface ScrapingJob {
  id: string;
  name: string;
  platform: string;
  category: string;
  status: 'idle' | 'running' | 'completed' | 'error';
  progress: number;
  totalItems: number;
  scrapedItems: number;
  startTime: string;
  endTime?: string;
  duration?: string;
  error?: string;
}

export interface ScrapingResult {
  platform: string;
  category: string;
  totalResults: number;
  products: any[];
  timestamp: string;
}

export interface IndustrialProduct {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  manufacturer: string;
  model: string;
  specifications: Record<string, string>;
  price: {
    min: number;
    max: number;
    currency: string;
  };
  moq: number;
  leadTime: string;
  certifications: string[];
  origin: string;
  platform: string;
  scrapedAt: string;
}

export interface TestResult {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startTime: string;
  endTime?: string;
  duration?: string;
  result?: any;
  error?: string;
}

export interface SystemHealth {
  frontend: 'healthy' | 'degraded' | 'unhealthy';
  backend: 'healthy' | 'degraded' | 'unhealthy';
  database: 'healthy' | 'degraded' | 'unhealthy';
  apis: 'healthy' | 'degraded' | 'unhealthy';
}

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  description: string;
  brand?: string;
  category: string;
  rating?: number;
  reviews?: number;
  seller?: string;
  location?: string;
  shipping?: string;
  url: string;
  source: string;
  margin: number;
  score: number;
  scrapedAt: string;
}

export interface ScrapingStats {
  totalProducts: number;
  totalSources: number;
  averagePrice: number;
  averageMargin: number;
  successRate: number;
  lastUpdate: string;
}

export interface ScrapingSource {
  name: string;
  status: 'active' | 'fallback' | 'error';
  products: number;
  margin: number;
  responseTime: number;
} 