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

    // Route pour les données de trading (mock data)
    if (path === '/yahoo' || path === '') {
      const symbol = queryStringParameters?.symbol || 'AAPL';
      
      const mockData = {
        symbol: symbol,
        price: Math.random() * 1000 + 100,
        change: (Math.random() - 0.5) * 20,
        changePercent: (Math.random() - 0.5) * 10,
        volume: Math.floor(Math.random() * 1000000),
        marketCap: Math.floor(Math.random() * 1000000000),
        pe: Math.random() * 30 + 10,
        dividend: Math.random() * 5,
        high: Math.random() * 1000 + 100,
        low: Math.random() * 1000 + 50,
        open: Math.random() * 1000 + 100,
        previousClose: Math.random() * 1000 + 100,
        timestamp: new Date().toISOString()
      };

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: mockData,
          note: 'Données simulées pour export statique'
        })
      };
    }

    // Route pour les cryptomonnaies (mock data)
    if (path === '/crypto') {
      const symbol = queryStringParameters?.symbol || 'BTC-USD';
      
      const mockCrypto = {
        symbol: symbol,
        price: symbol.includes('BTC') ? Math.random() * 10000 + 40000 : Math.random() * 3000 + 2000,
        change: (Math.random() - 0.5) * 1000,
        changePercent: (Math.random() - 0.5) * 10,
        volume: Math.floor(Math.random() * 1000000000),
        marketCap: Math.floor(Math.random() * 1000000000000),
        high: Math.random() * 10000 + 40000,
        low: Math.random() * 10000 + 35000,
        timestamp: new Date().toISOString()
      };

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: mockCrypto,
          note: 'Données simulées pour export statique'
        })
      };
    }

    // Route pour les devises (Forex) - mock data
    if (path === '/forex') {
      const pairs = queryStringParameters?.pairs || 'EURUSD,GBPUSD,USDJPY';
      const pairList = pairs.split(',');
      const forexData = {};

      for (const pair of pairList) {
        forexData[pair] = {
          price: Math.random() * 2 + 0.5,
          change: (Math.random() - 0.5) * 0.1,
          changePercent: (Math.random() - 0.5) * 2,
          high: Math.random() * 2 + 0.5,
          low: Math.random() * 2 + 0.4,
          timestamp: new Date().toISOString()
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: forexData,
          note: 'Données simulées pour export statique'
        })
      };
    }

    // Route pour les indices boursiers (mock data)
    if (path === '/indices') {
      const indices = queryStringParameters?.indices || '^GSPC,^DJI,^IXIC';
      const indexList = indices.split(',');
      const indexData = {};

      for (const index of indexList) {
        indexData[index] = {
          name: index === '^GSPC' ? 'S&P 500' : index === '^DJI' ? 'Dow Jones' : 'NASDAQ',
          price: Math.random() * 5000 + 30000,
          change: (Math.random() - 0.5) * 500,
          changePercent: (Math.random() - 0.5) * 3,
          volume: Math.floor(Math.random() * 1000000000),
          high: Math.random() * 5000 + 30000,
          low: Math.random() * 5000 + 29500,
          timestamp: new Date().toISOString()
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: indexData,
          note: 'Données simulées pour export statique'
        })
      };
    }

    // Route non trouvée
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Route non trouvée',
        availableRoutes: ['/yahoo', '/crypto', '/forex', '/indices']
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