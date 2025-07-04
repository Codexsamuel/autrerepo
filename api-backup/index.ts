import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    message: 'DL Solutions Backend API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      trading: '/api/trading',
      hospitality: '/api/hospitality',
      banque: '/api/banque',
      assurance: '/api/assurance',
      ai: '/api/ai',
      admin: '/api/admin'
    }
  });
} 