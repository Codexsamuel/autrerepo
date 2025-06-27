#!/usr/bin/env node

/**
 * DAVY Trading Platform - SEO Generator
 * Author: Samuel OBAM & Sabine NGA Lucie
 * Version: 1.0.0
 */

const fs = require('fs');
const path = require('path');
const winston = require('winston');

// Configuration
const config = {
    seo: {
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://davy-trading.com',
        siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'DAVY Trading Platform',
        siteDescription: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Plateforme de trading innovante avec IA',
        languages: ['fr', 'en', 'es', 'de', 'it', 'pt'],
        leaders: [
            {
                name: 'Samuel OBAM',
                position: 'CEO & Co-Founder',
                email: 'samuel.obam@davy-trading.com',
                bio: 'Expert en trading algorithmique et IA'
            },
            {
                name: 'Sabine NGA Lucie',
                position: 'CTO & Co-Founder',
                email: 'sabine.nga@davy-trading.com',
                bio: 'Spécialiste en développement et sécurité'
            }
        ]
    }
};

// Logger configuration
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    defaultMeta: { service: 'seo-generator' },
    transports: [
        new winston.transports.File({ filename: 'logs/seo-error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/seo-combined.log' }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ]
});

class SEOGenerator {
    constructor() {
        this.translations = this.loadTranslations();
        this.keywords = this.generateKeywords();
    }

    loadTranslations() {
        return {
            fr: {
                siteName: 'DAVY Trading Platform',
                siteDescription: 'Plateforme de trading innovante avec IA pour investisseurs professionnels',
                home: 'Accueil',
                products: 'Produits',
                about: 'À propos',
                contact: 'Contact',
                trading: 'Trading',
                ai: 'Intelligence Artificielle',
                novacore: 'NovaCore',
                analytics: 'Analytics',
                security: 'Sécurité'
            },
            en: {
                siteName: 'DAVY Trading Platform',
                siteDescription: 'Innovative AI-powered trading platform for professional investors',
                home: 'Home',
                products: 'Products',
                about: 'About',
                contact: 'Contact',
                trading: 'Trading',
                ai: 'Artificial Intelligence',
                novacore: 'NovaCore',
                analytics: 'Analytics',
                security: 'Security'
            },
            es: {
                siteName: 'DAVY Trading Platform',
                siteDescription: 'Plataforma de trading innovadora con IA para inversores profesionales',
                home: 'Inicio',
                products: 'Productos',
                about: 'Acerca de',
                contact: 'Contacto',
                trading: 'Trading',
                ai: 'Inteligencia Artificial',
                novacore: 'NovaCore',
                analytics: 'Analytics',
                security: 'Seguridad'
            },
            de: {
                siteName: 'DAVY Trading Platform',
                siteDescription: 'Innovative KI-gestützte Trading-Plattform für professionelle Anleger',
                home: 'Startseite',
                products: 'Produkte',
                about: 'Über uns',
                contact: 'Kontakt',
                trading: 'Trading',
                ai: 'Künstliche Intelligenz',
                novacore: 'NovaCore',
                analytics: 'Analytics',
                security: 'Sicherheit'
            },
            it: {
                siteName: 'DAVY Trading Platform',
                siteDescription: 'Piattaforma di trading innovativa con IA per investitori professionali',
                home: 'Home',
                products: 'Prodotti',
                about: 'Chi siamo',
                contact: 'Contatti',
                trading: 'Trading',
                ai: 'Intelligenza Artificiale',
                novacore: 'NovaCore',
                analytics: 'Analytics',
                security: 'Sicurezza'
            },
            pt: {
                siteName: 'DAVY Trading Platform',
                siteDescription: 'Plataforma de trading inovadora com IA para investidores profissionais',
                home: 'Início',
                products: 'Produtos',
                about: 'Sobre',
                contact: 'Contato',
                trading: 'Trading',
                ai: 'Inteligência Artificial',
                novacore: 'NovaCore',
                analytics: 'Analytics',
                security: 'Segurança'
            }
        };
    }

    generateKeywords() {
        const baseKeywords = [
            'trading',
            'investissement',
            'finance',
            'bourse',
            'actions',
            'crypto',
            'forex',
            'intelligence artificielle',
            'IA',
            'algorithmes',
            'automatisation',
            'plateforme',
            'DAVY',
            'NovaCore',
            'analytics',
            'sécurité',
            'OTP',
            'surveillance',
            'Samuel OBAM',
            'Sabine NGA Lucie'
        ];

        const languageKeywords = {
            fr: [
                'trading français',
                'investissement France',
                'bourse Paris',
                'CAC 40',
                'Euronext',
                'AMF',
                'conseiller financier',
                'gestion de portefeuille'
            ],
            en: [
                'trading platform',
                'investment platform',
                'stock market',
                'NYSE',
                'NASDAQ',
                'financial advisor',
                'portfolio management',
                'algorithmic trading'
            ],
            es: [
                'plataforma de trading',
                'inversión',
                'bolsa de valores',
                'IBEX 35',
                'asesor financiero',
                'gestión de cartera'
            ],
            de: [
                'Trading-Plattform',
                'Anlageplattform',
                'Börse',
                'DAX',
                'Finanzberater',
                'Portfolio-Management'
            ],
            it: [
                'piattaforma di trading',
                'investimento',
                'borsa valori',
                'FTSE MIB',
                'consulente finanziario',
                'gestione portafoglio'
            ],
            pt: [
                'plataforma de trading',
                'investimento',
                'bolsa de valores',
                'BOVESPA',
                'consultor financeiro',
                'gestão de carteira'
            ]
        };

        return { base: baseKeywords, language: languageKeywords };
    }

    async generateSEOData() {
        logger.info('Generating SEO data...');

        try {
            // Create necessary directories
            this.createDirectories();

            // Generate sitemap
            await this.generateSitemap();

            // Generate robots.txt
            await this.generateRobotsTxt();

            // Generate structured data
            await this.generateStructuredData();

            // Generate meta tags
            await this.generateMetaTags();

            // Generate language files
            await this.generateLanguageFiles();

            logger.info('SEO data generation completed successfully');
        } catch (error) {
            logger.error('Error generating SEO data:', error);
            throw error;
        }
    }

    createDirectories() {
        const dirs = [
            'public',
            'public/structured-data',
            'app/i18n',
            'logs'
        ];

        dirs.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
                logger.info(`Created directory: ${dir}`);
            }
        });
    }

    async generateSitemap() {
        logger.info('Generating sitemap...');

        const pages = [
            { url: '/', priority: 1.0, changefreq: 'daily' },
            { url: '/products', priority: 0.9, changefreq: 'daily' },
            { url: '/about', priority: 0.8, changefreq: 'monthly' },
            { url: '/contact', priority: 0.7, changefreq: 'monthly' },
            { url: '/novacore', priority: 0.9, changefreq: 'weekly' },
            { url: '/novacore/analytics', priority: 0.8, changefreq: 'weekly' },
            { url: '/novacore/messagerie', priority: 0.7, changefreq: 'weekly' },
            { url: '/novacore/calendrier', priority: 0.7, changefreq: 'weekly' },
            { url: '/novacore/documents', priority: 0.7, changefreq: 'weekly' },
            { url: '/admin', priority: 0.6, changefreq: 'weekly' },
            { url: '/admin/dashboard', priority: 0.6, changefreq: 'weekly' },
            { url: '/admin/automation', priority: 0.6, changefreq: 'weekly' },
            { url: '/admin/suppliers', priority: 0.6, changefreq: 'weekly' },
            { url: '/admin/analytics', priority: 0.6, changefreq: 'weekly' }
        ];

        // Mock products for sitemap
        const mockProducts = [
            { id: '1', name: 'Laptop Gaming', updated_at: new Date().toISOString() },
            { id: '2', name: 'Smartphone Premium', updated_at: new Date().toISOString() },
            { id: '3', name: 'Headphones Wireless', updated_at: new Date().toISOString() }
        ];

        // Add product pages
        mockProducts.forEach(product => {
            pages.push({
                url: `/products/${product.id}`,
                priority: 0.8,
                changefreq: 'weekly',
                lastmod: product.updated_at
            });
        });

        // Generate sitemap XML
        let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
        sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
        sitemap += 'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

        pages.forEach(page => {
            sitemap += '  <url>\n';
            sitemap += `    <loc>${config.seo.siteUrl}${page.url}</loc>\n`;
            sitemap += `    <lastmod>${page.lastmod || new Date().toISOString().split('T')[0]}</lastmod>\n`;
            sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
            sitemap += `    <priority>${page.priority}</priority>\n`;

            // Add language alternatives
            config.seo.languages.forEach(lang => {
                sitemap += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${config.seo.siteUrl}/${lang}${page.url}" />\n`;
            });

            sitemap += '  </url>\n';
        });

        sitemap += '</urlset>';

        // Write sitemap
        fs.writeFileSync('public/sitemap.xml', sitemap);
        logger.info('Sitemap generated successfully');
    }

    async generateRobotsTxt() {
        logger.info('Generating robots.txt...');

        const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${config.seo.siteUrl}/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /static/

# Allow important pages
Allow: /products
Allow: /about
Allow: /contact
Allow: /novacore

# Crawl delay
Crawl-delay: 1
`;

        fs.writeFileSync('public/robots.txt', robotsTxt);
        logger.info('robots.txt generated successfully');
    }

    async generateStructuredData() {
        logger.info('Generating structured data...');

        // Organization schema
        const organizationSchema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": config.seo.siteName,
            "url": config.seo.siteUrl,
            "logo": `${config.seo.siteUrl}/images/dl-logo.jpg`,
            "description": config.seo.siteDescription,
            "foundingDate": "2024",
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "FR",
                "addressLocality": "Paris",
                "addressRegion": "Île-de-France"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+33-1-XX-XX-XX-XX",
                "contactType": "customer service",
                "email": "contact@davy-trading.com"
            },
            "sameAs": [
                "https://www.linkedin.com/company/davy-trading",
                "https://twitter.com/davytrading",
                "https://www.facebook.com/davytrading"
            ],
            "founder": config.seo.leaders.map(leader => ({
                "@type": "Person",
                "name": leader.name,
                "jobTitle": leader.position,
                "email": leader.email,
                "description": leader.bio
            }))
        };

        // WebSite schema
        const websiteSchema = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": config.seo.siteName,
            "url": config.seo.siteUrl,
            "description": config.seo.siteDescription,
            "potentialAction": {
                "@type": "SearchAction",
                "target": `${config.seo.siteUrl}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string"
            }
        };

        // Write structured data files
        fs.writeFileSync('public/structured-data/organization.json', JSON.stringify(organizationSchema, null, 2));
        fs.writeFileSync('public/structured-data/website.json', JSON.stringify(websiteSchema, null, 2));

        logger.info('Structured data generated successfully');
    }

    async generateMetaTags() {
        logger.info('Generating meta tags...');

        const metaTags = {
            default: {
                title: config.seo.siteName,
                description: config.seo.siteDescription,
                keywords: this.keywords.base.join(', '),
                ogTitle: config.seo.siteName,
                ogDescription: config.seo.siteDescription,
                ogImage: `${config.seo.siteUrl}/images/og-image.jpg`,
                ogUrl: config.seo.siteUrl,
                twitterCard: 'summary_large_image',
                twitterTitle: config.seo.siteName,
                twitterDescription: config.seo.siteDescription,
                twitterImage: `${config.seo.siteUrl}/images/twitter-image.jpg`
            }
        };

        // Generate for each language
        config.seo.languages.forEach(lang => {
            const translation = this.translations[lang];
            const langKeywords = [...this.keywords.base, ...this.keywords.language[lang]];
            
            metaTags[lang] = {
                title: translation.siteName,
                description: translation.siteDescription,
                keywords: langKeywords.join(', '),
                ogTitle: translation.siteName,
                ogDescription: translation.siteDescription,
                ogImage: `${config.seo.siteUrl}/images/og-image-${lang}.jpg`,
                ogUrl: `${config.seo.siteUrl}/${lang}`,
                twitterCard: 'summary_large_image',
                twitterTitle: translation.siteName,
                twitterDescription: translation.siteDescription,
                twitterImage: `${config.seo.siteUrl}/images/twitter-image-${lang}.jpg`
            };
        });

        // Write meta tags file
        fs.writeFileSync('public/meta-tags.json', JSON.stringify(metaTags, null, 2));
        logger.info('Meta tags generated successfully');
    }

    async generateLanguageFiles() {
        logger.info('Generating language files...');

        // Generate language files
        config.seo.languages.forEach(lang => {
            const translation = this.translations[lang];
            const langKeywords = [...this.keywords.base, ...this.keywords.language[lang]];
            
            const langData = {
                site: {
                    name: translation.siteName,
                    description: translation.siteDescription,
                    keywords: langKeywords
                },
                navigation: {
                    home: translation.home,
                    products: translation.products,
                    about: translation.about,
                    contact: translation.contact,
                    trading: translation.trading,
                    ai: translation.ai,
                    novacore: translation.novacore,
                    analytics: translation.analytics,
                    security: translation.security
                },
                leaders: config.seo.leaders.map(leader => ({
                    name: leader.name,
                    position: leader.position,
                    email: leader.email,
                    bio: leader.bio
                }))
            };

            fs.writeFileSync(`app/i18n/${lang}.json`, JSON.stringify(langData, null, 2));
        });

        logger.info('Language files generated successfully');
    }
}

// CLI interface
async function main() {
    const args = process.argv.slice(2);
    
    if (args.includes('--help') || args.includes('-h')) {
        console.log(`
DAVY Trading Platform - SEO Generator

Usage: node generate-seo.js [options]

Options:
  --sitemap        Generate sitemap only
  --robots         Generate robots.txt only
  --structured     Generate structured data only
  --meta           Generate meta tags only
  --languages      Generate language files only
  --all            Generate all SEO files (default)
  --help, -h       Show this help message

Examples:
  node generate-seo.js --all
  node generate-seo.js --sitemap
        `);
        return;
    }

    const generator = new SEOGenerator();
    
    try {
        if (args.includes('--sitemap')) {
            await generator.generateSitemap();
        } else if (args.includes('--robots')) {
            await generator.generateRobotsTxt();
        } else if (args.includes('--structured')) {
            await generator.generateStructuredData();
        } else if (args.includes('--meta')) {
            await generator.generateMetaTags();
        } else if (args.includes('--languages')) {
            await generator.generateLanguageFiles();
        } else {
            await generator.generateSEOData();
        }
    } catch (error) {
        logger.error('SEO generation failed:', error);
        process.exit(1);
    }
}

// Export for use as module
module.exports = SEOGenerator;

// Run if called directly
if (require.main === module) {
    main().catch(console.error);
} 