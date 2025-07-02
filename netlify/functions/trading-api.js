exports.handler = async (event, context) => {
  const { httpMethod, path, queryStringParameters } = event;
  
  // Gestion des requêtes OPTIONS pour CORS
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      body: ''
    };
  }

  // Simulation de données de trading
  const mockTradingData = {
    symbols: [
      { symbol: 'BTC/USD', price: 45000, change: 2.5 },
      { symbol: 'ETH/USD', price: 3200, change: -1.2 },
      { symbol: 'EUR/USD', price: 1.0850, change: 0.3 },
      { symbol: 'GBP/USD', price: 1.2650, change: -0.8 }
    ],
    portfolio: {
      totalValue: 125000,
      dailyChange: 1250,
      positions: [
        { symbol: 'BTC/USD', quantity: 0.5, value: 22500 },
        { symbol: 'ETH/USD', quantity: 5, value: 16000 }
      ]
    }
  };

  try {
    let response;
    
    switch (path) {
      case '/.netlify/functions/trading-api/symbols':
        response = mockTradingData.symbols;
        break;
      case '/.netlify/functions/trading-api/portfolio':
        response = mockTradingData.portfolio;
        break;
      default:
        response = {
          message: 'Trading API is working!',
          availableEndpoints: [
            '/api/trading/symbols',
            '/api/trading/portfolio'
          ],
          timestamp: new Date().toISOString()
        };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      body: JSON.stringify(response)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message
      })
    };
  }
}; 