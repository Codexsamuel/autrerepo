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
    const path = event.path.replace('/.netlify/functions/scraping-api', '');

    // Mock data for static export
    const mockProducts = [
      {
        id: 1,
        title: "iPhone 15 Pro Max - 256GB",
        price: 1199.99,
        originalPrice: 1299.99,
        discount: 8,
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
        rating: 4.8,
        reviews: 1247,
        store: "Apple Store",
        shipping: "Free",
        location: "China"
      },
      {
        id: 2,
        title: "Samsung Galaxy S24 Ultra",
        price: 1299.99,
        originalPrice: 1399.99,
        discount: 7,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
        rating: 4.7,
        reviews: 892,
        store: "Samsung Official",
        shipping: "Free",
        location: "South Korea"
      },
      {
        id: 3,
        title: "MacBook Air M3 - 13 inch",
        price: 1099.99,
        originalPrice: 1199.99,
        discount: 8,
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
        rating: 4.9,
        reviews: 567,
        store: "Apple Store",
        shipping: "Free",
        location: "China"
      }
    ];

    // Route pour les produits (mock data)
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

      // Filter mock products based on query
      const filteredProducts = mockProducts.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase())
      ).slice(0, limit);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: filteredProducts,
          total: filteredProducts.length,
          query: query,
          source: 'mock',
          timestamp: new Date().toISOString(),
          note: 'Données simulées pour export statique'
        })
      };
    }

    // Route pour les magasins chinois (mock data)
    if (path === '/chinese-stores') {
      const action = queryStringParameters?.action;
      const query = queryStringParameters?.query || '';

      if (action === 'stats') {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            data: {
              totalProducts: 15000,
              totalStores: 45,
              lastUpdate: new Date().toISOString(),
              sources: ['AliExpress', 'Taobao', '1688.com']
            }
          })
        };
      }

      if (action === 'categories') {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            data: ['Électronique', 'Mode', 'Maison', 'Sport', 'Beauté']
          })
        };
      }

      if (action === 'sources') {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            data: ['AliExpress', 'Taobao', '1688.com', 'JD.com']
          })
        };
      }

      if (action === 'countries') {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            data: ['Chine', 'Hong Kong', 'Singapour', 'Corée du Sud']
          })
        };
      }

      // Return mock products for chinese stores
      const filteredProducts = mockProducts.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase())
      );

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: filteredProducts,
          total: filteredProducts.length,
          note: 'Données simulées pour export statique'
        })
      };
    }

    // Route pour les marchés internationaux (mock data)
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
        results[market.trim()] = mockProducts.slice(0, 3).map(product => ({
          ...product,
          store: `${market.toUpperCase()} Store`,
          location: market === 'dubai' ? 'UAE' : market === 'turkey' ? 'Turkey' : 'Cameroon'
        }));
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: results,
          query: query,
          markets: marketList,
          timestamp: new Date().toISOString(),
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
        availableRoutes: ['/products', '/chinese-stores', '/international']
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