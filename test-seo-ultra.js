#!/usr/bin/env node

/**
 * Test SEO Ultra-Optimisé pour DL Solutions
 * Vérifie tous les aspects du SEO : données structurées, meta tags, performance, etc.
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const PRODUCTION_URL = 'https://dlsolutions.com';

class SEOTester {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0,
      details: []
    };
  }

  async makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
      const protocol = url.startsWith('https') ? https : http;
      const req = protocol.get(url, options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ status: res.statusCode, data, headers: res.headers }));
      });
      req.on('error', reject);
      req.setTimeout(10000, () => req.destroy());
    });
  }

  log(message, type = 'info') {
    const colors = {
      success: '\x1b[32m',
      error: '\x1b[31m',
      warning: '\x1b[33m',
      info: '\x1b[36m',
      reset: '\x1b[0m'
    };
    console.log(`${colors[type]}${message}${colors.reset}`);
  }

  addResult(test, passed, details = '') {
    if (passed) {
      this.results.passed++;
      this.log(`✓ ${test}`, 'success');
    } else {
      this.results.failed++;
      this.log(`✗ ${test}`, 'error');
    }
    this.results.details.push({ test, passed, details });
  }

  addWarning(test, details = '') {
    this.results.warnings++;
    this.log(`⚠ ${test}`, 'warning');
    this.results.details.push({ test, passed: true, warning: true, details });
  }

  async testMetaTags(html, url) {
    const tests = [
      {
        name: 'Meta description',
        regex: /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i,
        minLength: 120,
        maxLength: 160
      },
      {
        name: 'Meta keywords',
        regex: /<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']+)["'][^>]*>/i,
        required: true
      },
      {
        name: 'Meta author',
        regex: /<meta[^>]*name=["']author["'][^>]*content=["']([^"']+)["'][^>]*>/i,
        required: true
      },
      {
        name: 'Meta robots',
        regex: /<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["'][^>]*>/i,
        required: true
      },
      {
        name: 'Open Graph title',
        regex: /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["'][^>]*>/i,
        required: true
      },
      {
        name: 'Open Graph description',
        regex: /<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["'][^>]*>/i,
        required: true
      },
      {
        name: 'Open Graph image',
        regex: /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i,
        required: true
      },
      {
        name: 'Open Graph URL',
        regex: /<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']+)["'][^>]*>/i,
        required: true
      },
      {
        name: 'Open Graph type',
        regex: /<meta[^>]*property=["']og:type["'][^>]*content=["']([^"']+)["'][^>]*>/i,
        required: true
      },
      {
        name: 'Twitter Card',
        regex: /<meta[^>]*name=["']twitter:card["'][^>]*content=["']([^"']+)["'][^>]*>/i,
        required: true
      },
      {
        name: 'Twitter title',
        regex: /<meta[^>]*name=["']twitter:title["'][^>]*content=["']([^"']+)["'][^>]*>/i,
        required: true
      },
      {
        name: 'Twitter description',
        regex: /<meta[^>]*name=["']twitter:description["'][^>]*content=["']([^"']+)["'][^>]*>/i,
        required: true
      },
      {
        name: 'Twitter image',
        regex: /<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["'][^>]*>/i,
        required: true
      },
      {
        name: 'Canonical URL',
        regex: /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i,
        required: true
      },
      {
        name: 'Theme color',
        regex: /<meta[^>]*name=["']theme-color["'][^>]*content=["']([^"']+)["'][^>]*>/i,
        required: true
      }
    ];

    for (const test of tests) {
      const match = html.match(test.regex);
      if (match) {
        const content = match[1];
        let passed = true;
        let details = '';

        if (test.minLength && content.length < test.minLength) {
          passed = false;
          details = `Trop court (${content.length} caractères, minimum ${test.minLength})`;
        } else if (test.maxLength && content.length > test.maxLength) {
          passed = false;
          details = `Trop long (${content.length} caractères, maximum ${test.maxLength})`;
        }

        this.addResult(`${test.name} sur ${url}`, passed, details);
      } else if (test.required) {
        this.addResult(`${test.name} sur ${url}`, false, 'Manquant');
      } else {
        this.addWarning(`${test.name} sur ${url}`, 'Optionnel mais recommandé');
      }
    }
  }

  async testStructuredData(html, url) {
    const schemaScripts = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
    
    if (!schemaScripts || schemaScripts.length === 0) {
      this.addResult(`Données structurées sur ${url}`, false, 'Aucune donnée structurée trouvée');
      return;
    }

    let validSchemas = 0;
    let totalSchemas = schemaScripts.length;

    for (const script of schemaScripts) {
      try {
        const jsonMatch = script.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
        if (jsonMatch) {
          const jsonData = JSON.parse(jsonMatch[1]);
          if (jsonData['@context'] === 'https://schema.org' && jsonData['@type']) {
            validSchemas++;
          }
        }
      } catch (error) {
        // JSON invalide
      }
    }

    this.addResult(
      `Données structurées sur ${url}`,
      validSchemas > 0,
      `${validSchemas}/${totalSchemas} schémas valides`
    );

    // Vérifier les types de schémas spécifiques
    const schemaTypes = ['Organization', 'WebSite', 'WebPage', 'Course', 'Product', 'FAQPage'];
    for (const type of schemaTypes) {
      const hasType = html.includes(`"@type": "${type}"`);
      this.addResult(`Schéma ${type} sur ${url}`, hasType);
    }
  }

  async testPerformance(html, url) {
    // Vérifier les optimisations de performance
    const tests = [
      {
        name: 'Preload CSS',
        regex: /<link[^>]*rel=["']preload["'][^>]*as=["']style["'][^>]*>/i,
        required: false
      },
      {
        name: 'Preload JS',
        regex: /<link[^>]*rel=["']preload["'][^>]*as=["']script["'][^>]*>/i,
        required: false
      },
      {
        name: 'DNS prefetch',
        regex: /<link[^>]*rel=["']dns-prefetch["'][^>]*>/i,
        required: false
      },
      {
        name: 'Preconnect',
        regex: /<link[^>]*rel=["']preconnect["'][^>]*>/i,
        required: false
      },
      {
        name: 'Lazy loading images',
        regex: /loading=["']lazy["']/i,
        required: false
      }
    ];

    for (const test of tests) {
      const hasFeature = test.regex.test(html);
      if (test.required) {
        this.addResult(`${test.name} sur ${url}`, hasFeature);
      } else {
        this.addWarning(`${test.name} sur ${url}`, hasFeature ? 'Présent' : 'Recommandé pour les performances');
      }
    }
  }

  async testAccessibility(html, url) {
    const tests = [
      {
        name: 'Alt text images',
        regex: /<img[^>]*alt=["']([^"']+)["'][^>]*>/gi,
        required: true
      },
      {
        name: 'Lang attribute',
        regex: /<html[^>]*lang=["']([^"']+)["'][^>]*>/i,
        required: true
      },
      {
        name: 'Viewport meta tag',
        regex: /<meta[^>]*name=["']viewport["'][^>]*>/i,
        required: true
      }
    ];

    for (const test of tests) {
      const matches = html.match(test.regex);
      if (matches) {
        this.addResult(`${test.name} sur ${url}`, true, `${matches.length} trouvé(s)`);
      } else if (test.required) {
        this.addResult(`${test.name} sur ${url}`, false, 'Manquant');
      } else {
        this.addWarning(`${test.name} sur ${url}`, 'Recommandé pour l\'accessibilité');
      }
    }
  }

  async testPage(url) {
    try {
      this.log(`\n🔍 Test de ${url}`, 'info');
      
      const response = await this.makeRequest(url);
      
      if (response.status !== 200) {
        this.addResult(`Statut HTTP pour ${url}`, false, `Status: ${response.status}`);
        return;
      }

      const html = response.data;
      
      // Tests de base
      this.addResult(`Statut HTTP pour ${url}`, true, `Status: ${response.status}`);
      this.addResult(`Taille de page pour ${url}`, html.length > 1000, `${html.length} caractères`);
      
      // Tests SEO
      await this.testMetaTags(html, url);
      await this.testStructuredData(html, url);
      await this.testPerformance(html, url);
      await this.testAccessibility(html, url);

    } catch (error) {
      this.addResult(`Connexion à ${url}`, false, error.message);
    }
  }

  async testSitemap() {
    try {
      this.log('\n🗺️ Test du sitemap', 'info');
      
      const response = await this.makeRequest(`${BASE_URL}/sitemap.xml`);
      
      if (response.status === 200) {
        const xml = response.data;
        
        // Vérifier que c'est un XML valide
        if (xml.includes('<?xml') && xml.includes('<urlset')) {
          this.addResult('Sitemap XML valide', true);
          
          // Compter les URLs
          const urlMatches = xml.match(/<url>/g);
          const urlCount = urlMatches ? urlMatches.length : 0;
          this.addResult('Nombre d\'URLs dans le sitemap', urlCount > 10, `${urlCount} URLs`);
          
          // Vérifier les priorités
          const hasPriorities = xml.includes('<priority>');
          this.addResult('Priorités définies', hasPriorities);
          
          // Vérifier les fréquences de changement
          const hasChangeFreq = xml.includes('<changefreq>');
          this.addResult('Fréquences de changement définies', hasChangeFreq);
          
        } else {
          this.addResult('Sitemap XML valide', false, 'Format XML invalide');
        }
      } else {
        this.addResult('Sitemap accessible', false, `Status: ${response.status}`);
      }
    } catch (error) {
      this.addResult('Sitemap accessible', false, error.message);
    }
  }

  async testRobotsTxt() {
    try {
      this.log('\n🤖 Test du robots.txt', 'info');
      
      const response = await this.makeRequest(`${BASE_URL}/robots.txt`);
      
      if (response.status === 200) {
        const robots = response.data;
        
        // Vérifications de base
        this.addResult('Robots.txt accessible', true);
        this.addResult('Sitemap déclaré', robots.includes('Sitemap:'), 'Sitemap trouvé dans robots.txt');
        this.addResult('User-agent défini', robots.includes('User-agent:'), 'User-agent trouvé');
        
        // Vérifications avancées
        const hasAllow = robots.includes('Allow:');
        const hasDisallow = robots.includes('Disallow:');
        this.addResult('Règles Allow/Disallow', hasAllow || hasDisallow, 'Règles de crawl définies');
        
        // Vérifier les optimisations
        const hasCrawlDelay = robots.includes('Crawl-delay:');
        this.addResult('Crawl-delay défini', hasCrawlDelay, 'Optimisation du crawl');
        
        const hasGooglebot = robots.includes('Googlebot');
        this.addResult('Règles Googlebot', hasGooglebot, 'Règles spécifiques Google');
        
      } else {
        this.addResult('Robots.txt accessible', false, `Status: ${response.status}`);
      }
    } catch (error) {
      this.addResult('Robots.txt accessible', false, error.message);
    }
  }

  async testManifest() {
    try {
      this.log('\n📱 Test du manifest.json', 'info');
      
      const response = await this.makeRequest(`${BASE_URL}/manifest.json`);
      
      if (response.status === 200) {
        const manifest = JSON.parse(response.data);
        
        // Vérifications de base
        this.addResult('Manifest JSON valide', true);
        this.addResult('Nom de l\'app défini', !!manifest.name, manifest.name);
        this.addResult('Description définie', !!manifest.description, 'Description présente');
        this.addResult('Theme color définie', !!manifest.theme_color, manifest.theme_color);
        
        // Vérifications avancées
        this.addResult('Icons définies', manifest.icons && manifest.icons.length > 0, `${manifest.icons?.length || 0} icônes`);
        this.addResult('Start URL définie', !!manifest.start_url, manifest.start_url);
        this.addResult('Display mode défini', !!manifest.display, manifest.display);
        
        // Vérifier les fonctionnalités PWA
        const hasShortcuts = manifest.shortcuts && manifest.shortcuts.length > 0;
        this.addResult('Shortcuts définis', hasShortcuts, hasShortcuts ? `${manifest.shortcuts.length} raccourcis` : 'Aucun raccourci');
        
        const hasCategories = manifest.categories && manifest.categories.length > 0;
        this.addResult('Catégories définies', hasCategories, hasCategories ? manifest.categories.join(', ') : 'Aucune catégorie');
        
      } else {
        this.addResult('Manifest accessible', false, `Status: ${response.status}`);
      }
    } catch (error) {
      this.addResult('Manifest accessible', false, error.message);
    }
  }

  async runAllTests() {
    this.log('🚀 Démarrage des tests SEO ultra-optimisés pour DL Solutions', 'info');
    this.log('=' .repeat(80), 'info');

    // Pages principales à tester
    const pages = [
      '/',
      '/formations',
      '/formations/televente-prospection',
      '/novaworld',
      '/novaworld/social',
      '/dl-style',
      '/dl-style/outlet',
      '/scraping-multi-market',
      '/solutions/immobilier',
      '/solutions/hopital',
      '/solutions/crm'
    ];

    // Tests des pages
    for (const page of pages) {
      await this.testPage(`${BASE_URL}${page}`);
    }

    // Tests des fichiers techniques
    await this.testSitemap();
    await this.testRobotsTxt();
    await this.testManifest();

    // Résumé final
    this.log('\n' + '=' .repeat(80), 'info');
    this.log('📊 RÉSUMÉ DES TESTS SEO', 'info');
    this.log('=' .repeat(80), 'info');
    
    this.log(`✅ Tests réussis: ${this.results.passed}`, 'success');
    this.log(`❌ Tests échoués: ${this.results.failed}`, 'error');
    this.log(`⚠️  Avertissements: ${this.results.warnings}`, 'warning');
    
    const totalTests = this.results.passed + this.results.failed + this.results.warnings;
    const successRate = totalTests > 0 ? Math.round((this.results.passed / totalTests) * 100) : 0;
    
    this.log(`📈 Taux de réussite: ${successRate}%`, successRate >= 90 ? 'success' : successRate >= 70 ? 'warning' : 'error');
    
    if (this.results.failed > 0) {
      this.log('\n❌ DÉTAILS DES ÉCHECS:', 'error');
      this.results.details
        .filter(r => !r.passed)
        .forEach(r => this.log(`   - ${r.test}: ${r.details}`, 'error'));
    }
    
    if (this.results.warnings > 0) {
      this.log('\n⚠️  AVERTISSEMENTS:', 'warning');
      this.results.details
        .filter(r => r.warning)
        .forEach(r => this.log(`   - ${r.test}: ${r.details}`, 'warning'));
    }

    // Recommandations
    this.log('\n💡 RECOMMANDATIONS SEO:', 'info');
    if (successRate >= 95) {
      this.log('🎉 Excellent! Le SEO est ultra-optimisé!', 'success');
    } else if (successRate >= 85) {
      this.log('👍 Très bon SEO, quelques améliorations mineures possibles', 'success');
    } else if (successRate >= 70) {
      this.log('⚠️  SEO correct, des améliorations importantes sont nécessaires', 'warning');
    } else {
      this.log('🚨 SEO insuffisant, des corrections majeures sont requises', 'error');
    }

    return this.results;
  }
}

// Exécution des tests
async function main() {
  const tester = new SEOTester();
  await tester.runAllTests();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = SEOTester; 