const puppeteer = require('puppeteer');
const fs = require('fs');

class SEOTester {
  constructor() {
    this.baseUrl = 'http://localhost:3000';
    this.results = {
      pages: {},
      summary: {
        total: 0,
        passed: 0,
        failed: 0,
        score: 0
      }
    };
  }

  async init() {
    this.browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.page = await this.browser.newPage();
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async testPage(url, pageName) {
    console.log(`\n🔍 Test SEO pour: ${pageName} (${url})`);
    
    try {
      await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      
      const pageResults = {
        url,
        tests: {},
        score: 0,
        totalTests: 0
      };

      // Test 1: Meta title
      const title = await this.page.$eval('title', el => el.textContent).catch(() => '');
      pageResults.tests.title = {
        passed: title.length > 0 && title.length <= 60,
        value: title,
        maxLength: 60,
        actualLength: title.length
      };

      // Test 2: Meta description
      const description = await this.page.$eval('meta[name="description"]', el => el.content).catch(() => '');
      pageResults.tests.description = {
        passed: description.length > 0 && description.length <= 160,
        value: description,
        maxLength: 160,
        actualLength: description.length
      };

      // Test 3: Meta keywords
      const keywords = await this.page.$eval('meta[name="keywords"]', el => el.content).catch(() => '');
      pageResults.tests.keywords = {
        passed: keywords.length > 0,
        value: keywords
      };

      // Test 4: Open Graph tags
      const ogTitle = await this.page.$eval('meta[property="og:title"]', el => el.content).catch(() => '');
      const ogDescription = await this.page.$eval('meta[property="og:description"]', el => el.content).catch(() => '');
      const ogImage = await this.page.$eval('meta[property="og:image"]', el => el.content).catch(() => '');
      
      pageResults.tests.openGraph = {
        passed: ogTitle.length > 0 && ogDescription.length > 0 && ogImage.length > 0,
        title: ogTitle,
        description: ogDescription,
        image: ogImage
      };

      // Test 5: Twitter Cards
      const twitterCard = await this.page.$eval('meta[name="twitter:card"]', el => el.content).catch(() => '');
      const twitterTitle = await this.page.$eval('meta[name="twitter:title"]', el => el.content).catch(() => '');
      
      pageResults.tests.twitterCards = {
        passed: twitterCard.length > 0 && twitterTitle.length > 0,
        card: twitterCard,
        title: twitterTitle
      };

      // Test 6: Canonical URL
      const canonical = await this.page.$eval('link[rel="canonical"]', el => el.href).catch(() => '');
      pageResults.tests.canonical = {
        passed: canonical.length > 0,
        value: canonical
      };

      // Test 7: Structured Data
      const structuredData = await this.page.evaluate(() => {
        const scripts = document.querySelectorAll('script[type="application/ld+json"]');
        return Array.from(scripts).map(script => {
          try {
            return JSON.parse(script.textContent);
          } catch {
            return null;
          }
        }).filter(Boolean);
      });
      
      pageResults.tests.structuredData = {
        passed: structuredData.length > 0,
        count: structuredData.length,
        types: structuredData.map(data => data['@type']).filter(Boolean)
      };

      // Test 8: Images with alt text
      const imagesWithAlt = await this.page.evaluate(() => {
        const images = document.querySelectorAll('img');
        const withAlt = Array.from(images).filter(img => img.alt && img.alt.trim().length > 0);
        return {
          total: images.length,
          withAlt: withAlt.length,
          withoutAlt: images.length - withAlt.length
        };
      });
      
      pageResults.tests.images = {
        passed: imagesWithAlt.withAlt === imagesWithAlt.total,
        total: imagesWithAlt.total,
        withAlt: imagesWithAlt.withAlt,
        withoutAlt: imagesWithAlt.withoutAlt
      };

      // Test 9: Headings structure
      const headings = await this.page.evaluate(() => {
        const h1s = document.querySelectorAll('h1');
        const h2s = document.querySelectorAll('h2');
        const h3s = document.querySelectorAll('h3');
        return {
          h1: h1s.length,
          h2: h2s.length,
          h3: h3s.length,
          hasH1: h1s.length > 0
        };
      });
      
      pageResults.tests.headings = {
        passed: headings.hasH1 && headings.h1 <= 1,
        h1: headings.h1,
        h2: headings.h2,
        h3: headings.h3
      };

      // Test 10: Performance optimizations
      const performance = await this.page.evaluate(() => {
        const preloads = document.querySelectorAll('link[rel="preload"]');
        const prefetches = document.querySelectorAll('link[rel="prefetch"]');
        const dnsPrefetch = document.querySelectorAll('link[rel="dns-prefetch"]');
        const preconnect = document.querySelectorAll('link[rel="preconnect"]');
        
        return {
          preloads: preloads.length,
          prefetches: prefetches.length,
          dnsPrefetch: dnsPrefetch.length,
          preconnect: preconnect.length
        };
      });
      
      pageResults.tests.performance = {
        passed: performance.preloads > 0 || performance.prefetches > 0,
        preloads: performance.preloads,
        prefetches: performance.prefetches,
        dnsPrefetch: performance.dnsPrefetch,
        preconnect: performance.preconnect
      };

      // Calculer le score
      const tests = Object.values(pageResults.tests);
      const passedTests = tests.filter(test => test.passed).length;
      pageResults.totalTests = tests.length;
      pageResults.score = Math.round((passedTests / tests.length) * 100);

      this.results.pages[pageName] = pageResults;
      
      console.log(`✅ Score: ${pageResults.score}% (${passedTests}/${tests.length} tests réussis)`);
      
      return pageResults;

    } catch (error) {
      console.error(`❌ Erreur lors du test de ${pageName}:`, error.message);
      this.results.pages[pageName] = {
        url,
        error: error.message,
        score: 0
      };
      return null;
    }
  }

  async testSitemap() {
    console.log('\n🗺️ Test du sitemap.xml');
    try {
      await this.page.goto(`${this.baseUrl}/sitemap.xml`);
      const content = await this.page.content();
      
      const sitemapTest = {
        passed: content.includes('<?xml') && content.includes('<urlset'),
        hasXMLDeclaration: content.includes('<?xml'),
        hasURLSet: content.includes('<urlset'),
        hasURLs: content.includes('<url>'),
        content: content.substring(0, 500) + '...'
      };
      
      this.results.sitemap = sitemapTest;
      console.log(`✅ Sitemap: ${sitemapTest.passed ? 'OK' : 'ÉCHEC'}`);
      
    } catch (error) {
      console.error('❌ Erreur sitemap:', error.message);
      this.results.sitemap = { passed: false, error: error.message };
    }
  }

  async testRobots() {
    console.log('\n🤖 Test du robots.txt');
    try {
      await this.page.goto(`${this.baseUrl}/robots.txt`);
      const content = await this.page.content();
      
      const robotsTest = {
        passed: content.includes('User-agent:') || content.includes('User-agent:'),
        hasUserAgent: content.includes('User-agent:'),
        hasAllow: content.includes('Allow:'),
        hasDisallow: content.includes('Disallow:'),
        hasSitemap: content.includes('Sitemap:'),
        content: content.substring(0, 500) + '...'
      };
      
      this.results.robots = robotsTest;
      console.log(`✅ Robots.txt: ${robotsTest.passed ? 'OK' : 'ÉCHEC'}`);
      
    } catch (error) {
      console.error('❌ Erreur robots.txt:', error.message);
      this.results.robots = { passed: false, error: error.message };
    }
  }

  async testManifest() {
    console.log('\n📱 Test du manifest.json');
    try {
      await this.page.goto(`${this.baseUrl}/manifest.json`);
      const content = await this.page.content();
      
      const manifestTest = {
        passed: content.includes('"name"') && content.includes('"short_name"'),
        hasName: content.includes('"name"'),
        hasShortName: content.includes('"short_name"'),
        hasStartUrl: content.includes('"start_url"'),
        content: content.substring(0, 500) + '...'
      };
      
      this.results.manifest = manifestTest;
      console.log(`✅ Manifest: ${manifestTest.passed ? 'OK' : 'ÉCHEC'}`);
      
    } catch (error) {
      console.error('❌ Erreur manifest:', error.message);
      this.results.manifest = { passed: false, error: error.message };
    }
  }

  async runAllTests() {
    console.log('🚀 Démarrage des tests SEO complets...\n');
    
    await this.init();

    const pages = [
      { url: '', name: 'Accueil' },
      { url: 'formations', name: 'Formations' },
      { url: 'formations/televente-prospection', name: 'Formation Télévente' },
      { url: 'novaworld', name: 'NovaWorld' },
      { url: 'dl-style', name: 'DL-Style' },
      { url: 'scraping-multi-market', name: 'Scraping Multi-Market' }
    ];

    for (const page of pages) {
      const fullUrl = `${this.baseUrl}/${page.url}`;
      await this.testPage(fullUrl, page.name);
    }

    await this.testSitemap();
    await this.testRobots();
    await this.testManifest();

    await this.close();

    // Calculer le score global
    const pageScores = Object.values(this.results.pages)
      .filter(page => page.score !== undefined)
      .map(page => page.score);
    
    const globalScore = pageScores.length > 0 
      ? Math.round(pageScores.reduce((a, b) => a + b, 0) / pageScores.length)
      : 0;

    this.results.summary = {
      total: pages.length,
      passed: pageScores.filter(score => score >= 80).length,
      failed: pageScores.filter(score => score < 80).length,
      score: globalScore
    };

    this.generateReport();
  }

  generateReport() {
    console.log('\n' + '='.repeat(80));
    console.log('📊 RAPPORT SEO COMPLET');
    console.log('='.repeat(80));

    // Résumé global
    console.log(`\n🎯 SCORE GLOBAL: ${this.results.summary.score}%`);
    console.log(`📄 Pages testées: ${this.results.summary.total}`);
    console.log(`✅ Pages réussies (≥80%): ${this.results.summary.passed}`);
    console.log(`❌ Pages à améliorer (<80%): ${this.results.summary.failed}`);

    // Détails par page
    console.log('\n📋 DÉTAILS PAR PAGE:');
    Object.entries(this.results.pages).forEach(([name, page]) => {
      if (page.score !== undefined) {
        const status = page.score >= 80 ? '✅' : '❌';
        console.log(`${status} ${name}: ${page.score}%`);
        
        if (page.score < 80 && page.tests) {
          console.log('   Problèmes détectés:');
          Object.entries(page.tests).forEach(([testName, test]) => {
            if (!test.passed) {
              console.log(`   - ${testName}: ${test.value || 'Manquant'}`);
            }
          });
        }
      }
    });

    // Tests techniques
    console.log('\n🔧 TESTS TECHNIQUES:');
    if (this.results.sitemap) {
      console.log(`🗺️ Sitemap.xml: ${this.results.sitemap.passed ? '✅' : '❌'}`);
    }
    if (this.results.robots) {
      console.log(`🤖 Robots.txt: ${this.results.robots.passed ? '✅' : '❌'}`);
    }
    if (this.results.manifest) {
      console.log(`📱 Manifest.json: ${this.results.manifest.passed ? '✅' : '❌'}`);
    }

    // Recommandations
    console.log('\n💡 RECOMMANDATIONS:');
    if (this.results.summary.score < 90) {
      console.log('⚠️  Le score SEO peut être amélioré. Actions prioritaires:');
      
      const allIssues = [];
      Object.values(this.results.pages).forEach(page => {
        if (page.tests) {
          Object.entries(page.tests).forEach(([testName, test]) => {
            if (!test.passed) {
              allIssues.push(testName);
            }
          });
        }
      });
      
      const issueCounts = allIssues.reduce((acc, issue) => {
        acc[issue] = (acc[issue] || 0) + 1;
        return acc;
      }, {});
      
      Object.entries(issueCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .forEach(([issue, count]) => {
          console.log(`   - Corriger ${issue} (${count} pages affectées)`);
        });
    } else {
      console.log('🎉 Excellent! Le SEO est bien optimisé.');
    }

    // Sauvegarder le rapport
    const reportPath = 'RAPPORT_SEO_COMPLET.json';
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`\n📄 Rapport détaillé sauvegardé: ${reportPath}`);
    
    console.log('\n' + '='.repeat(80));
  }
}

// Exécuter les tests
async function main() {
  const tester = new SEOTester();
  await tester.runAllTests();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = SEOTester; 