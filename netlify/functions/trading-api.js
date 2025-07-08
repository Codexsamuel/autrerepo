exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { queryStringParameters } = event;
    const path = event.path.replace('/.netlify/functions/trading-api', '');

    // Route pour les données de trading simulées
    if (path === '/data' || path === '') {
      const mockTradingData = {
        symbols: [
          { symbol: 'EURUSD', price: 1.0850, change: '+0.0023', changePercent: '+0.21%' },
          { symbol: 'GBPUSD', price: 1.2650, change: '-0.0015', changePercent: '-0.12%' },
          { symbol: 'USDJPY', price: 148.50, change: '+0.75', changePercent: '+0.51%' },
          { symbol: 'BTCUSD', price: 43250, change: '+1250', changePercent: '+2.98%' }
        ],
        timestamp: new Date().toISOString(),
        status: 'success'
      };

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(mockTradingData)
      };
    }

    // Route non trouvée
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Route non trouvée',
        availableRoutes: ['/data']
      })
    };

  } catch (error) {
    console.error('Erreur dans la fonction trading-api:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Erreur interne du serveur',
        details: error.message,
        timestamp: new Date().toISOString()
      })
    };
  }
}; 