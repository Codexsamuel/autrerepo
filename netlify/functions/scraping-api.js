const { scrapeAliExpress } = require('../../lib/scraper/aliexpress');
const { scrapeChineseStores, getScrapingStats, getCategories, getSources, getCountries } = require('../../lib/scraper/chinese-stores');

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

    // Route pour les produits AliExpress
    if (path === '/products' || path === '') {
      const query = queryStringParameters?.q || queryStringParameters?.query || '';
      const limit = parseInt(queryStringParameters?.limit || '20');

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

      const products = await scrapeAliExpress(query);
      const limitedProducts = products.slice(0, limit);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          products: limitedProducts,
          total: limitedProducts.length,
          query: query
        })
      };
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
        ENABLE_SCRAPING: process.env.ENABLE_SCRAPING || 'true',
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

    // Route non trouvée
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Route non trouvée',
        availableRoutes: ['/products', '/chinese-stores', '/debug/env']
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