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

    // Route pour les produits (simulée)
    if (path === '/products' || path === '') {
      const query = queryStringParameters?.q || queryStringParameters?.query || 'phone';
      
      // Données simulées pour éviter les dépendances
      const mockProducts = [
        {
          id: 1,
          name: `${query} - Produit Premium`,
          description: `Description du produit ${query}`,
          price: 99.99,
          currency: "EUR",
          country: "🇨🇳 Chine",
          category: "Électronique",
          rating: 4.5,
          reviews: 123,
          stock: 50,
          image: "/images/products/product1.jpg"
        },
        {
          id: 2,
          name: `${query} - Version Pro`,
          description: `Version professionnelle de ${query}`,
          price: 149.99,
          currency: "EUR",
          country: "🇨🇳 Chine",
          category: "Électronique",
          rating: 4.8,
          reviews: 89,
          stock: 25,
          image: "/images/products/product2.jpg"
        }
      ];

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: mockProducts,
          total: mockProducts.length,
          query: query,
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
        availableRoutes: ['/products', '/debug/env']
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