import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json({
    message: 'DL Solutions Backend API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      auth: '/api/auth',
      trading: '/api/trading',
      hospitality: '/api/hospitality',
      banque: '/api/banque',
      assurance: '/api/assurance',
      ai: '/api/ai',
      admin: '/api/admin',
      bookmaker: '/api/bookmaker',
      travel: '/api/travel',
      video: '/api/video-editor',
      mobile: '/api/mobile',
      scraping: '/api/scraping',
      track: '/api/track-visitor',
      trade: '/api/trade',
      generate: '/api/generate-pdf',
      hospitalier: '/api/hospitalier',
      ia: '/api/ia',
      crm: '/api/crm-integrations',
      facturation: '/api/facturation'
    },
    documentation: 'https://daveandlucesolutions.com/docs/api',
    support: 'sobam@daveandlucesolutions.com'
  });
} 