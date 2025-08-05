const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// Initialiser Next.js
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

exports.handler = async (event, context) => {
  try {
    // Préparer la requête pour Next.js
    const { httpMethod, path, queryStringParameters, headers, body } = event;
    
    // Créer un objet de requête compatible avec Next.js
    const url = new URL(path, `https://${headers.host || 'localhost'}`);
    if (queryStringParameters) {
      Object.keys(queryStringParameters).forEach(key => {
        url.searchParams.set(key, queryStringParameters[key]);
      });
    }

    const req = {
      method: httpMethod,
      url: url.toString(),
      headers: headers,
      body: body
    };

    const res = {
      statusCode: 200,
      headers: {},
      body: ''
    };

    // Traiter la requête avec Next.js
    await new Promise((resolve, reject) => {
      handle(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    return {
      statusCode: res.statusCode,
      headers: res.headers,
      body: res.body
    };

  } catch (error) {
    console.error('Erreur dans la fonction Next.js:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'text/plain'
      },
      body: 'Erreur interne du serveur'
    };
  }
}; 