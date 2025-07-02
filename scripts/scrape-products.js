#!/usr/bin/env node

/**
 * DAVY Trading Platform - Product Scraper
 * Author: Samuel OBAM & Sabine NGA Lucie
 * Version: 1.0.0
 */

const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');
const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Configuration
const config = {
    supabase: {
        url: process.env.SUPABASE_URL,
        key: process.env.SUPABASE_SERVICE_KEY
    },
    scraping: {
        maxConcurrent: 3,
        timeout: 30000,
        retryAttempts: 3,
        delayBetweenRequests: 1000
    },
    suppliers: {
        glotelho: {
            baseUrl: 'https://www.glotelho.com',
            searchUrl: 'https://www.glotelho.com/search?q=',
            selectors: {
                productContainer: '.product-item',
                name: '.product-name',
                price: '.product-price',
                image: '.product-image img',
                link: '.product-link',
                description: '.product-description'
            }
        },
        shein: {
            baseUrl: 'https://www.shein.com',
            searchUrl: 'https://www.shein.com/search?keyword=',
            selectors: {
                productContainer: '.product-item',
                name: '.product-name',
                price: '.product-price',
                image: '.product-image img',
                link: '.product-link',
                description: '.product-description'
            }
        },
        amazon: {
            baseUrl: 'https://www.amazon.com',
            searchUrl: 'https://www.amazon.com/s?k=',
            selectors: {
                productContainer: '[data-component-type="s-search-result"]',
                name: 'h2 a span',
                price: '.a-price-whole',
                image: '.s-image',
                link: 'h2 a',
                description: '.a-size-base-plus'
            }
        },
        aliexpress: {
            baseUrl: 'https://www.aliexpress.com',
            searchUrl: 'https://www.aliexpress.com/wholesale?SearchText=',
            selectors: {
                productContainer: '.product-item',
                name: '.product-name',
                price: '.product-price',
                image: '.product-image img',
                link: '.product-link',
                description: '.product-description'
            }
        }
    }
};

// Initialize Supabase

// Logger configuration
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    defaultMeta: { service: 'product-scraper' },
    transports: [
        new winston.transports.File({ filename: 'logs/scraper-error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/scraper-combined.log' }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ]
});

class ProductScraper {
    constructor() {
        this.browser = null;
        this.page = null;
        this.stats = {
            totalScraped: 0,
            successful: 0,
            failed: 0,
            startTime: null,
            endTime: null
        };
    }

    async initialize() {
        try {
            this.browser = await puppeteer.launch({
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    '--single-process',
                    '--disable-gpu'
                ]
            });

            this.page = await this.browser.newPage();
            
            // Set user agent
            await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
            
            // Set viewport
            await this.page.setViewport({ width: 1920, height: 1080 });
            
            // Set extra headers
            await this.page.setExtraHTTPHeaders({
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1'
            });

            logger.info('Browser initialized successfully');
        } catch (error) {
            logger.error('Error initializing browser:', error);
            throw error;
        }
    }

    async scrapeProducts(keywords, suppliers = ['glotelho', 'shein', 'amazon']) {
        this.stats.startTime = new Date();
        logger.info(`Starting product scraping for keywords: ${keywords.join(', ')}`);

        try {
            const allProducts = [];

            for (const supplier of suppliers) {
                if (!config.suppliers[supplier]) {
                    logger.warn(`Supplier ${supplier} not configured, skipping`);
                    continue;
                }

                logger.info(`Scraping from ${supplier}...`);
                
                for (const keyword of keywords) {
                    try {
                        const products = await this.scrapeSupplier(supplier, keyword);
                        allProducts.push(...products);
                        
                        // Add delay between requests
                        await this.delay(config.scraping.delayBetweenRequests);
                    } catch (error) {
                        logger.error(`Error scraping ${supplier} for keyword ${keyword}:`, error);
                    }
                }
            }

            // Save products to database
            await this.saveProducts(allProducts);

            this.stats.endTime = new Date();
            this.stats.totalScraped = allProducts.length;
            
            logger.info(`Scraping completed. Total products: ${allProducts.length}`);
            this.logStats();

            return allProducts;
        } catch (error) {
            logger.error('Error during product scraping:', error);
            throw error;
        } finally {
            await this.cleanup();
        }
    }

    async scrapeSupplier(supplier, keyword) {
        const supplierConfig = config.suppliers[supplier];
        const searchUrl = `${supplierConfig.searchUrl}${encodeURIComponent(keyword)}`;
        
        logger.info(`Scraping ${supplier} for keyword: ${keyword}`);

        try {
            // Navigate to search page
            await this.page.goto(searchUrl, { 
                waitUntil: 'networkidle2',
                timeout: config.scraping.timeout 
            });

            // Wait for products to load
            await this.page.waitForSelector(supplierConfig.selectors.productContainer, { 
                timeout: 10000 
            });

            // Get page content
            const content = await this.page.content();
            const $ = cheerio.load(content);

            const products = [];

            // Extract products
            $(supplierConfig.selectors.productContainer).each((index, element) => {
                try {
                    const product = this.extractProduct($, element, supplierConfig.selectors, supplier);
                    if (product) {
                        products.push(product);
                    }
                } catch (error) {
                    logger.error(`Error extracting product ${index} from ${supplier}:`, error);
                }
            });

            logger.info(`Extracted ${products.length} products from ${supplier}`);
            return products;

        } catch (error) {
            logger.error(`Error scraping ${supplier}:`, error);
            return [];
        }
    }

    extractProduct($, element, selectors, supplier) {
        try {
            const $element = $(element);

            // Extract basic information
            const name = $element.find(selectors.name).text().trim();
            const priceText = $element.find(selectors.price).text().trim();
            const imageUrl = $element.find(selectors.image).attr('src') || $element.find(selectors.image).attr('data-src');
            const link = $element.find(selectors.link).attr('href');
            const description = $element.find(selectors.description).text().trim();

            // Skip if essential data is missing
            if (!name || !priceText) {
                return null;
            }

            // Parse price
            const price = this.parsePrice(priceText);
            if (!price) {
                return null;
            }

            // Build product URL
            const productUrl = link ? (link.startsWith('http') ? link : `${config.suppliers[supplier].baseUrl}${link}`) : null;

            // Extract additional data
            const additionalData = this.extractAdditionalData($element, supplier);

            return {
                name,
                description: description || name,
                price,
                original_price: price * 1.2, // 20% markup for original price
                currency: 'EUR',
                category: this.categorizeProduct(name),
                brand: this.extractBrand(name),
                supplier,
                supplier_url: productUrl,
                images: imageUrl ? [imageUrl] : [],
                specifications: additionalData,
                stock_quantity: Math.floor(Math.random() * 100) + 10, // Random stock
                is_active: true,
                is_featured: Math.random() > 0.8, // 20% chance to be featured
                rating: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3-5
                review_count: Math.floor(Math.random() * 1000),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

        } catch (error) {
            logger.error('Error extracting product data:', error);
            return null;
        }
    }

    parsePrice(priceText) {
        try {
            // Remove currency symbols and non-numeric characters except decimal point
            const cleanPrice = priceText.replace(/[^\d.,]/g, '').replace(',', '.');
            const price = parseFloat(cleanPrice);
            
            return isNaN(price) ? null : price;
        } catch (error) {
            logger.error('Error parsing price:', error);
            return null;
        }
    }

    categorizeProduct(name) {
        const categories = {
            electronics: ['phone', 'laptop', 'computer', 'tablet', 'camera', 'headphone', 'speaker', 'tv', 'gaming'],
            fashion: ['shirt', 'dress', 'pants', 'shoes', 'bag', 'watch', 'jewelry', 'accessory'],
            home: ['furniture', 'kitchen', 'bathroom', 'bedroom', 'living', 'garden', 'decor'],
            beauty: ['makeup', 'skincare', 'perfume', 'cosmetic', 'beauty', 'care'],
            sports: ['sport', 'fitness', 'exercise', 'gym', 'outdoor', 'running', 'training'],
            books: ['book', 'novel', 'magazine', 'journal', 'textbook'],
            toys: ['toy', 'game', 'puzzle', 'doll', 'car', 'building'],
            other: []
        };

        const lowerName = name.toLowerCase();
        
        for (const [category, keywords] of Object.entries(categories)) {
            if (keywords.some(keyword => lowerName.includes(keyword))) {
                return category;
            }
        }
        
        return 'other';
    }

    extractBrand(name) {
        // Common brand patterns
        const brandPatterns = [
            /(apple|samsung|sony|lg|nike|adidas|puma|reebok|gucci|prada|louis vuitton|chanel|dior)/i
        ];

        for (const pattern of brandPatterns) {
            const match = name.match(pattern);
            if (match) {
                return match[1].toLowerCase();
            }
        }

        return null;
    }

    extractAdditionalData($element, supplier) {
        const data = {};

        // Extract color if available
        const colorElement = $element.find('[class*="color"], [class*="colour"]');
        if (colorElement.length) {
            data.color = colorElement.text().trim();
        }

        // Extract size if available
        const sizeElement = $element.find('[class*="size"]');
        if (sizeElement.length) {
            data.size = sizeElement.text().trim();
        }

        // Extract material if available
        const materialElement = $element.find('[class*="material"]');
        if (materialElement.length) {
            data.material = materialElement.text().trim();
        }

        // Add supplier-specific data
        data.supplier = supplier;
        data.scraped_at = new Date().toISOString();

        return data;
    }

    async saveProducts(products) {
        if (products.length === 0) {
            logger.warn('No products to save');
            return;
        }

        try {
            logger.info(`Saving ${products.length} products to database...`);

            // Insert products in batches
            const batchSize = 50;
            for (let i = 0; i < products.length; i += batchSize) {
                const batch = products.slice(i, i + batchSize);
                
                const { data, error } = await supabase
                    .from('products')
                    .insert(batch)
                    .select();

                if (error) {
                    logger.error('Error saving products batch:', error);
                    this.stats.failed += batch.length;
                } else {
                    logger.info(`Saved batch ${Math.floor(i / batchSize) + 1}: ${data.length} products`);
                    this.stats.successful += data.length;
                }
            }

            logger.info(`Successfully saved ${this.stats.successful} products`);
        } catch (error) {
            logger.error('Error saving products:', error);
            throw error;
        }
    }

    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async cleanup() {
        if (this.browser) {
            await this.browser.close();
            logger.info('Browser closed');
        }
    }

    logStats() {
        const duration = this.stats.endTime - this.stats.startTime;
        const durationMinutes = Math.round(duration / 1000 / 60);
        
        logger.info('=== Scraping Statistics ===');
        logger.info(`Total products scraped: ${this.stats.totalScraped}`);
        logger.info(`Successful saves: ${this.stats.successful}`);
        logger.info(`Failed saves: ${this.stats.failed}`);
        logger.info(`Duration: ${durationMinutes} minutes`);
        logger.info(`Average: ${Math.round(this.stats.totalScraped / durationMinutes)} products/minute`);
        logger.info('==========================');
    }
}

// CLI interface
async function main() {
    const args = process.argv.slice(2);
    
    if (args.includes('--help') || args.includes('-h')) {
        console.log(`
DAVY Trading Platform - Product Scraper

Usage: node scrape-products.js [options]

Options:
  --keywords <keywords>    Comma-separated list of keywords to search
  --suppliers <suppliers>  Comma-separated list of suppliers (glotelho,shein,amazon,aliexpress)
  --help, -h              Show this help message

Examples:
  node scrape-products.js --keywords "laptop,phone,headphones"
  node scrape-products.js --keywords "dress,shoes" --suppliers "shein,glotelho"
        `);
        return;
    }

    // Parse arguments
    const keywordsArg = args.find(arg => arg.startsWith('--keywords='));
    const suppliersArg = args.find(arg => arg.startsWith('--suppliers='));

    const keywords = keywordsArg 
        ? keywordsArg.split('=')[1].split(',')
        : ['laptop', 'phone', 'headphones', 'dress', 'shoes'];

    const suppliers = suppliersArg
        ? suppliersArg.split('=')[1].split(',')
        : ['glotelho', 'shein', 'amazon'];

    // Create scraper instance
    const scraper = new ProductScraper();
    
    try {
        await scraper.initialize();
        await scraper.scrapeProducts(keywords, suppliers);
    } catch (error) {
        logger.error('Scraping failed:', error);
        process.exit(1);
    }
}

// Export for use as module
module.exports = ProductScraper;

// Run if called directly
if (require.main === module) {
    main().catch(console.error);
} 