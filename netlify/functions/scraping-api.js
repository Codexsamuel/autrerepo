const { scrapeAliExpress } = require('../../lib/scraper/aliexpress');
const { scrapeChineseStores, getScrapingStats, getCategories, getSources, getCountries } = require('../../lib/scraper/chinese-stores');
const { scrapeDubaiStores } = require('../../lib/scraper/dubai-stores');
const { scrapeTurkeyStores } = require('../../lib/scraper/turkey-stores');
const { scrapeCameroonStores } = require('../../lib/scraper/cameroon-stores');

exports.handler = async (event, context) => {
  // Configuration CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Gérer les requêtes OPTIONS (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const { queryStringParameters } = event;
    const path = event.path.replace('/.netlify/functions/scraping-api', '');

    // Route pour le debug des variables d'environnement
    if (path === '/debug/env') {
      const envVars = {
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Configuré' : '❌ Manquant',
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Configuré' : '❌ Manquant',
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Configuré' : '❌ Manquant',
        OPENAI_API_KEY: process.env.OPENAI_API_KEY ? '✅ Configuré' : '❌ Manquant',
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? '✅ Configuré' : '❌ Manquant',
        RAPIDAPI_KEY: process.env.RAPIDAPI_KEY ? '✅ Configuré' : '❌ Manquant',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'unknown'
      };

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          environment: process.env.NODE_ENV || 'unknown',
          variables: envVars,
          message: 'Variables d\'environnement diagnostiquées avec succès'
        })
      };
    }

    // Route pour les produits AliExpress (réels)
    if (path === '/products' || path === '') {
      const query = queryStringParameters?.q || queryStringParameters?.query || '';
      const limit = parseInt(queryStringParameters?.limit || '20');
      const source = queryStringParameters?.source || 'aliexpress';

      if (!query) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'Paramètre de recherche requis'
          })
        };
      }

      let products = [];

      try {
        switch (source) {
          case 'aliexpress':
            products = await scrapeAliExpress(query);
            break;
          case 'chinese':
            const chineseResult = await scrapeChineseStores(query);
            products = chineseResult.products;
            break;
          case 'dubai':
            products = await scrapeDubaiStores(query);
            break;
          case 'turkey':
            products = await scrapeTurkeyStores(query);
            break;
          case 'cameroon':
            products = await scrapeCameroonStores(query);
            break;
          default:
            // Par défaut, essayer AliExpress
            products = await scrapeAliExpress(query);
        }

        const limitedProducts = products.slice(0, limit);

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            data: limitedProducts,
            total: limitedProducts.length,
            query: query,
            source: source,
            timestamp: new Date().toISOString()
          })
        };
      } catch (scrapingError) {
        console.error('Erreur de scraping:', scrapingError);
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'Erreur lors du scraping',
            details: scrapingError.message,
            source: source,
            timestamp: new Date().toISOString()
          })
        };
      }
    }

    // Route pour les magasins chinois
    if (path === '/chinese-stores') {
      const action = queryStringParameters?.action;
      const query = queryStringParameters?.query || '';
      const category = queryStringParameters?.category || '';
      const country = queryStringParameters?.country || '';

      // Actions spéciales
      if (action === 'stats') {
        const stats = getScrapingStats();
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true, data: stats })
        };
      }

      if (action === 'categories') {
        const categories = getCategories();
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true, data: categories })
        };
      }

      if (action === 'sources') {
        const sources = getSources();
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true, data: sources })
        };
      }

      if (action === 'countries') {
        const countries = getCountries();
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true, data: countries })
        };
      }

      // Récupération des produits avec filtres
      const result = await scrapeChineseStores(query, category, country);
      const products = result.products;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: products,
          total: products.length
        })
      };
    }

    // Route pour les marchés internationaux
    if (path === '/international') {
      const query = queryStringParameters?.q || queryStringParameters?.query || '';
      const markets = queryStringParameters?.markets || 'dubai,turkey,cameroon';

      if (!query) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'Paramètre de recherche requis'
          })
        };
      }

      const marketList = markets.split(',');
      const results = {};

      for (const market of marketList) {
        try {
          switch (market.trim()) {
            case 'dubai':
              results.dubai = await scrapeDubaiStores(query);
              break;
            case 'turkey':
              results.turkey = await scrapeTurkeyStores(query);
              break;
            case 'cameroon':
              results.cameroon = await scrapeCameroonStores(query);
              break;
          }
        } catch (error) {
          results[market] = { error: error.message };
        }
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: results,
          query: query,
          markets: marketList,
          timestamp: new Date().toISOString()
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
        availableRoutes: ['/products', '/chinese-stores', '/international', '/debug/env']
      })
    };

  } catch (error) {
    console.error('Erreur dans la fonction scraping-api:', error);
    
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