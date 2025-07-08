const axios = require('axios');

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

    // Route pour les données de trading Yahoo Finance
    if (path === '/yahoo' || path === '') {
      const symbol = queryStringParameters?.symbol || 'AAPL';
      
      try {
        // Utiliser l'API Yahoo Finance via RapidAPI
        const response = await axios.get(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${symbol}`, {
          headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
          }
        });

        const data = response.data;
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            data: {
              symbol: data.symbol,
              price: data.regularMarketPrice,
              change: data.regularMarketChange,
              changePercent: data.regularMarketChangePercent,
              volume: data.regularMarketVolume,
              marketCap: data.marketCap,
              pe: data.trailingPE,
              dividend: data.trailingAnnualDividendYield,
              high: data.regularMarketDayHigh,
              low: data.regularMarketDayLow,
              open: data.regularMarketOpen,
              previousClose: data.regularMarketPreviousClose,
              timestamp: new Date().toISOString()
            }
          })
        };
      } catch (yahooError) {
        console.error('Erreur Yahoo Finance:', yahooError);
        
        // Fallback avec données simulées si l'API échoue
        const fallbackData = {
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
            data: fallbackData,
            note: 'Données simulées (API Yahoo Finance non disponible)'
          })
        };
      }
    }

    // Route pour les cryptomonnaies
    if (path === '/crypto') {
      const symbol = queryStringParameters?.symbol || 'BTC-USD';
      
      try {
        const response = await axios.get(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${symbol}`, {
          headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
          }
        });

        const data = response.data;
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            data: {
              symbol: data.symbol,
              price: data.regularMarketPrice,
              change: data.regularMarketChange,
              changePercent: data.regularMarketChangePercent,
              volume: data.regularMarketVolume,
              marketCap: data.marketCap,
              high: data.regularMarketDayHigh,
              low: data.regularMarketDayLow,
              timestamp: new Date().toISOString()
            }
          })
        };
      } catch (error) {
        console.error('Erreur crypto:', error);
        
        // Fallback crypto
        const fallbackCrypto = {
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
            data: fallbackCrypto,
            note: 'Données simulées (API Yahoo Finance non disponible)'
          })
        };
      }
    }

    // Route pour les devises (Forex)
    if (path === '/forex') {
      const pairs = queryStringParameters?.pairs || 'EURUSD,GBPUSD,USDJPY';
      
      try {
        const pairList = pairs.split(',');
        const forexData = {};

        for (const pair of pairList) {
          const response = await axios.get(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${pair}=X`, {
            headers: {
              'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
              'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
            }
          });

          const data = response.data;
          forexData[pair] = {
            price: data.regularMarketPrice,
            change: data.regularMarketChange,
            changePercent: data.regularMarketChangePercent,
            high: data.regularMarketDayHigh,
            low: data.regularMarketDayLow,
            timestamp: new Date().toISOString()
          };
        }

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            data: forexData
          })
        };
      } catch (error) {
        console.error('Erreur forex:', error);
        
        // Fallback forex
        const fallbackForex = {};
        const pairList = pairs.split(',');
        
        for (const pair of pairList) {
          fallbackForex[pair] = {
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
            data: fallbackForex,
            note: 'Données simulées (API Yahoo Finance non disponible)'
          })
        };
      }
    }

    // Route pour les indices boursiers
    if (path === '/indices') {
      const indices = queryStringParameters?.indices || '^GSPC,^DJI,^IXIC';
      
      try {
        const indexList = indices.split(',');
        const indexData = {};

        for (const index of indexList) {
          const response = await axios.get(`https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${index}`, {
            headers: {
              'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
              'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
            }
          });

          const data = response.data;
          indexData[index] = {
            name: data.longName || index,
            price: data.regularMarketPrice,
            change: data.regularMarketChange,
            changePercent: data.regularMarketChangePercent,
            volume: data.regularMarketVolume,
            high: data.regularMarketDayHigh,
            low: data.regularMarketDayLow,
            timestamp: new Date().toISOString()
          };
        }

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            data: indexData
          })
        };
      } catch (error) {
        console.error('Erreur indices:', error);
        
        // Fallback indices
        const fallbackIndices = {};
        const indexList = indices.split(',');
        
        for (const index of indexList) {
          fallbackIndices[index] = {
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
            data: fallbackIndices,
            note: 'Données simulées (API Yahoo Finance non disponible)'
          })
        };
      }
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