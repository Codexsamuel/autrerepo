#!/usr/bin/env node

const https = require('https');
const http = require('http');

const BASE_URL = 'http://localhost:3000';

const pages = [
  {
    path: '/services-ia',
    title: 'Services IA',
    expectedKeywords: ['services IA', 'intelligence artificielle', 'chatbot', 'assistant virtuel']
  },
  {
    path: '/location-vehicules',
    title: 'Location de Véhicules',
    expectedKeywords: ['location de véhicules', 'location voiture', 'transport', 'camion']
  },
  {
    path: '/immobilier',
    title: 'Immobilier',
    expectedKeywords: ['immobilier', 'appartement', 'maison', 'location', 'vente']
  },
  {
    path: '/nova-ia',
    title: 'NovaIA',
    expectedKeywords: ['NovaIA', 'intelligence artificielle', 'services IA']
  }
];

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function checkSEO(response, page) {
  const html = response.body;
  const issues = [];
  
  // Vérifier le titre
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (!titleMatch) {
    issues.push('❌ Titre manquant');
  } else {
    const title = titleMatch[1];
    console.log(`✅ Titre: ${title}`);
  }
  
  // Vérifier la description
  const descMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/i);
  if (!descMatch) {
    issues.push('❌ Description meta manquante');
  } else {
    const description = descMatch[1];
    console.log(`✅ Description: ${description.substring(0, 100)}...`);
  }
  
  // Vérifier les mots-clés
  const keywordsMatch = html.match(/<meta[^>]*name="keywords"[^>]*content="([^"]+)"/i);
  if (!keywordsMatch) {
    issues.push('❌ Mots-clés meta manquants');
  } else {
    const keywords = keywordsMatch[1];
    console.log(`✅ Mots-clés: ${keywords.substring(0, 100)}...`);
  }
  
  // Vérifier Open Graph
  const ogTitleMatch = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"/i);
  if (!ogTitleMatch) {
    issues.push('❌ Open Graph title manquant');
  } else {
    console.log(`✅ Open Graph title: ${ogTitleMatch[1]}`);
  }
  
  // Vérifier la structure H1
  const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  if (!h1Match) {
    issues.push('❌ Balise H1 manquante');
  } else {
    console.log(`✅ H1: ${h1Match[1]}`);
  }
  
  return issues;
}

async function testPage(page) {
  console.log(`\n🔍 Test de la page: ${page.title}`);
  console.log(`📍 URL: ${BASE_URL}${page.path}`);
  console.log('─'.repeat(50));
  
  try {
    const response = await makeRequest(`${BASE_URL}${page.path}`);
    
    if (response.statusCode === 200) {
      console.log(`✅ Page accessible (${response.statusCode})`);
      
      const seoIssues = checkSEO(response, page);
      
      if (seoIssues.length === 0) {
        console.log('✅ SEO optimisé');
      } else {
        console.log('⚠️  Problèmes SEO détectés:');
        seoIssues.forEach(issue => console.log(`   ${issue}`));
      }
      
      // Vérifier la taille de la page
      const sizeKB = Math.round(response.body.length / 1024);
      console.log(`📊 Taille de la page: ${sizeKB} KB`);
      
    } else {
      console.log(`❌ Erreur ${response.statusCode}`);
    }
    
  } catch (error) {
    console.log(`❌ Erreur de connexion: ${error.message}`);
  }
}

async function runTests() {
  console.log('🚀 Test des Pages SEO Optimisées');
  console.log('='.repeat(60));
  
  for (const page of pages) {
    await testPage(page);
  }
  
  console.log('\n🎯 Test du Sitemap');
  console.log('─'.repeat(50));
  
  try {
    const sitemapResponse = await makeRequest(`${BASE_URL}/sitemap.xml`);
    if (sitemapResponse.statusCode === 200) {
      console.log('✅ Sitemap accessible');
      
      // Vérifier si nos nouvelles pages sont dans le sitemap
      const newPages = ['/services-ia', '/location-vehicules', '/immobilier', '/nova-ia'];
      const sitemapContent = sitemapResponse.body;
      
      newPages.forEach(pagePath => {
        if (sitemapContent.includes(pagePath)) {
          console.log(`✅ ${pagePath} présent dans le sitemap`);
        } else {
          console.log(`❌ ${pagePath} manquant dans le sitemap`);
        }
      });
    } else {
      console.log(`❌ Sitemap inaccessible (${sitemapResponse.statusCode})`);
    }
  } catch (error) {
    console.log(`❌ Erreur sitemap: ${error.message}`);
  }
  
  console.log('\n🎯 Test du Robots.txt');
  console.log('─'.repeat(50));
  
  try {
    const robotsResponse = await makeRequest(`${BASE_URL}/robots.txt`);
    if (robotsResponse.statusCode === 200) {
      console.log('✅ Robots.txt accessible');
      console.log('📄 Contenu:');
      console.log(robotsResponse.body);
    } else {
      console.log(`❌ Robots.txt inaccessible (${robotsResponse.statusCode})`);
    }
  } catch (error) {
    console.log(`❌ Erreur robots.txt: ${error.message}`);
  }
  
  console.log('\n✨ Test terminé !');
}

// Vérifier si le serveur est en cours d'exécution
makeRequest(`${BASE_URL}`)
  .then(() => {
    console.log('🌐 Serveur détecté, lancement des tests...');
    runTests();
  })
  .catch(() => {
    console.log('❌ Serveur non accessible. Assurez-vous que npm run dev est en cours d\'exécution.');
    process.exit(1);
  }); 