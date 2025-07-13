import axios from 'axios';
import * as cheerio from 'cheerio';

export interface OSINTResult {
  source: string;
  data: any;
  timestamp: string;
  confidence: number;
  metadata: {
    url: string;
    method: string;
    responseTime: number;
  };
}

export interface OSINTConfig {
  maxDepth: number;
  timeout: number;
  userAgent: string;
  followRedirects: boolean;
  useProxy: boolean;
  proxyList?: string[];
}

export class AdvancedOSINTService {
  private config: OSINTConfig;
  private cache: Map<string, OSINTResult> = new Map();
  private userAgents: string[] = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15',
    'Mozilla/5.0 (Android 11; Mobile; rv:68.0) Gecko/68.0 Firefox/88.0'
  ];

  constructor(config?: Partial<OSINTConfig>) {
    this.config = {
      maxDepth: 3,
      timeout: 10000,
      userAgent: this.userAgents[Math.floor(Math.random() * this.userAgents.length)],
      followRedirects: true,
      useProxy: false,
      ...config
    };
  }

  /**
   * Recherche avancée sur le web public
   */
  async deepWebSearch(query: string, sources: string[] = []): Promise<OSINTResult[]> {
    const results: OSINTResult[] = [];
    
    // Sources par défaut si aucune spécifiée
    const defaultSources = [
      'google',
      'bing', 
      'duckduckgo',
      'github',
      'stackoverflow',
      'reddit',
      'twitter',
      'linkedin',
      'pastebin',
      'wayback'
    ];

    const searchSources = sources.length > 0 ? sources : defaultSources;

    for (const source of searchSources) {
      try {
        const result = await this.searchSource(source, query);
        if (result) {
          results.push(result);
        }
      } catch (error) {
        console.error(`Erreur lors de la recherche sur ${source}:`, error);
      }
    }

    return results;
  }

  /**
   * Recherche sur une source spécifique
   */
  private async searchSource(source: string, query: string): Promise<OSINTResult | null> {
    const cacheKey = `${source}:${query}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    const startTime = Date.now();
    let data: any = null;
    let url = '';

    try {
      switch (source) {
        case 'google':
          data = await this.searchGoogle(query);
          url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
          break;
        
        case 'github':
          data = await this.searchGitHub(query);
          url = `https://github.com/search?q=${encodeURIComponent(query)}`;
          break;
        
        case 'reddit':
          data = await this.searchReddit(query);
          url = `https://www.reddit.com/search/?q=${encodeURIComponent(query)}`;
          break;
        
        case 'pastebin':
          data = await this.searchPastebin(query);
          url = `https://pastebin.com/search?q=${encodeURIComponent(query)}`;
          break;
        
        case 'wayback':
          data = await this.searchWayback(query);
          url = `https://web.archive.org/web/*/${encodeURIComponent(query)}`;
          break;
        
        case 'shodan':
          data = await this.searchShodan(query);
          url = `https://shodan.io/search?query=${encodeURIComponent(query)}`;
          break;
        
        default:
          data = await this.genericSearch(query);
          url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      }

      const result: OSINTResult = {
        source,
        data,
        timestamp: new Date().toISOString(),
        confidence: this.calculateConfidence(data),
        metadata: {
          url,
          method: 'GET',
          responseTime: Date.now() - startTime
        }
      };

      this.cache.set(cacheKey, result);
      return result;

    } catch (error) {
      console.error(`Erreur lors de la recherche sur ${source}:`, error);
      return null;
    }
  }

  /**
   * Recherche Google avancée
   */
  private async searchGoogle(query: string): Promise<any> {
    const response = await axios.get(`https://www.google.com/search`, {
      params: {
        q: query,
        num: 10,
        hl: 'en',
        safe: 'off'
      },
      headers: {
        'User-Agent': this.config.userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      },
      timeout: this.config.timeout
    });

    const $ = cheerio.load(response.data);
    const results: any[] = [];

    $('.g').each((i, element) => {
      const title = $(element).find('h3').text();
      const link = $(element).find('a').attr('href');
      const snippet = $(element).find('.VwiC3b').text();

      if (title && link) {
        results.push({ title, link, snippet });
      }
    });

    return {
      query,
      results,
      totalResults: results.length,
      searchTime: Date.now()
    };
  }

  /**
   * Recherche GitHub
   */
  private async searchGitHub(query: string): Promise<any> {
    const response = await axios.get(`https://github.com/search`, {
      params: {
        q: query,
        type: 'repositories'
      },
      headers: {
        'User-Agent': this.config.userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      timeout: this.config.timeout
    });

    const $ = cheerio.load(response.data);
    const results: any[] = [];

    $('.repo-list-item').each((i, element) => {
      const title = $(element).find('.f4').text().trim();
      const description = $(element).find('.mb-1').text().trim();
      const language = $(element).find('[itemprop="programmingLanguage"]').text().trim();
      const stars = $(element).find('.Link--muted').first().text().trim();

      results.push({ title, description, language, stars });
    });

    return {
      query,
      results,
      totalResults: results.length,
      searchTime: Date.now()
    };
  }

  /**
   * Recherche Reddit
   */
  private async searchReddit(query: string): Promise<any> {
    const response = await axios.get(`https://www.reddit.com/search.json`, {
      params: {
        q: query,
        sort: 'relevance',
        t: 'all',
        limit: 25
      },
      headers: {
        'User-Agent': this.config.userAgent
      },
      timeout: this.config.timeout
    });

    const posts = response.data.data.children.map((child: any) => ({
      title: child.data.title,
      author: child.data.author,
      subreddit: child.data.subreddit,
      score: child.data.score,
      url: child.data.url,
      created: new Date(child.data.created_utc * 1000),
      numComments: child.data.num_comments
    }));

    return {
      query,
      results: posts,
      totalResults: posts.length,
      searchTime: Date.now()
    };
  }

  /**
   * Recherche Pastebin
   */
  private async searchPastebin(query: string): Promise<any> {
    // Note: Pastebin a des restrictions, cette méthode est limitée
    const response = await axios.get(`https://pastebin.com/search`, {
      params: { q: query },
      headers: {
        'User-Agent': this.config.userAgent
      },
      timeout: this.config.timeout
    });

    const $ = cheerio.load(response.data);
    const results: any[] = [];

    $('.maintable tr').each((i, element) => {
      const title = $(element).find('td').first().text().trim();
      const date = $(element).find('td').eq(1).text().trim();
      const size = $(element).find('td').eq(2).text().trim();

      if (title) {
        results.push({ title, date, size });
      }
    });

    return {
      query,
      results,
      totalResults: results.length,
      searchTime: Date.now()
    };
  }

  /**
   * Recherche Wayback Machine
   */
  private async searchWayback(query: string): Promise<any> {
    const response = await axios.get(`https://web.archive.org/cdx/search/cdx`, {
      params: {
        url: query,
        output: 'json',
        collapse: 'urlkey'
      },
      headers: {
        'User-Agent': this.config.userAgent
      },
      timeout: this.config.timeout
    });

    const snapshots = response.data.slice(1).map((snapshot: string[]) => ({
      url: snapshot[2],
      timestamp: snapshot[1],
      original: snapshot[3],
      mimetype: snapshot[4],
      statuscode: snapshot[5]
    }));

    return {
      query,
      results: snapshots,
      totalResults: snapshots.length,
      searchTime: Date.now()
    };
  }

  /**
   * Recherche Shodan (nécessite une clé API)
   */
  private async searchShodan(query: string): Promise<any> {
    // Note: Nécessite une clé API Shodan
    const shodanApiKey = process.env.SHODAN_API_KEY;
    
    if (!shodanApiKey) {
      return {
        query,
        error: 'Clé API Shodan non configurée',
        results: [],
        totalResults: 0
      };
    }

    try {
      const response = await axios.get(`https://api.shodan.io/shodan/host/search`, {
        params: {
          key: shodanApiKey,
          query: query,
          facets: 'port,os'
        },
        timeout: this.config.timeout
      });

      return {
        query,
        results: response.data.matches,
        totalResults: response.data.total,
        facets: response.data.facets,
        searchTime: Date.now()
      };
    } catch (error) {
      return {
        query,
        error: 'Erreur lors de la recherche Shodan',
        results: [],
        totalResults: 0
      };
    }
  }

  /**
   * Recherche générique
   */
  private async genericSearch(query: string): Promise<any> {
    const response = await axios.get(`https://www.google.com/search`, {
      params: { q: query },
      headers: {
        'User-Agent': this.config.userAgent
      },
      timeout: this.config.timeout
    });

    return {
      query,
      rawData: response.data.substring(0, 1000), // Limité pour éviter les problèmes
      searchTime: Date.now()
    };
  }

  /**
   * Calcul de la confiance basé sur la qualité des données
   */
  private calculateConfidence(data: any): number {
    if (!data || !data.results) return 0;
    
    let confidence = 0;
    const results = data.results;
    
    // Plus de résultats = plus de confiance
    confidence += Math.min(results.length * 10, 50);
    
    // Qualité des résultats
    results.forEach((result: any) => {
      if (result.title && result.title.length > 10) confidence += 5;
      if (result.description || result.snippet) confidence += 5;
      if (result.url) confidence += 5;
    });
    
    return Math.min(confidence, 100);
  }

  /**
   * Analyse de sentiment des résultats
   */
  async analyzeSentiment(results: OSINTResult[]): Promise<any> {
    const sentiments = results.map(result => {
      const text = JSON.stringify(result.data).toLowerCase();
      
      // Analyse basique de sentiment
      const positiveWords = ['good', 'positive', 'success', 'profit', 'gain', 'win'];
      const negativeWords = ['bad', 'negative', 'loss', 'fail', 'error', 'problem'];
      
      let positiveCount = 0;
      let negativeCount = 0;
      
      positiveWords.forEach(word => {
        const regex = new RegExp(word, 'g');
        const matches = text.match(regex);
        if (matches) positiveCount += matches.length;
      });
      
      negativeWords.forEach(word => {
        const regex = new RegExp(word, 'g');
        const matches = text.match(regex);
        if (matches) negativeCount += matches.length;
      });
      
      const sentiment = positiveCount > negativeCount ? 'positive' : 
                       negativeCount > positiveCount ? 'negative' : 'neutral';
      
      return {
        source: result.source,
        sentiment,
        confidence: result.confidence,
        positiveCount,
        negativeCount
      };
    });
    
    return {
      overallSentiment: this.calculateOverallSentiment(sentiments),
      sourceSentiments: sentiments,
      analysisTime: new Date().toISOString()
    };
  }

  /**
   * Calcul du sentiment global
   */
  private calculateOverallSentiment(sentiments: any[]): string {
    const positive = sentiments.filter(s => s.sentiment === 'positive').length;
    const negative = sentiments.filter(s => s.sentiment === 'negative').length;
    const neutral = sentiments.filter(s => s.sentiment === 'neutral').length;
    
    if (positive > negative && positive > neutral) return 'positive';
    if (negative > positive && negative > neutral) return 'negative';
    return 'neutral';
  }

  /**
   * Nettoyage du cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Statistiques du cache
   */
  getCacheStats(): any {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
      oldestEntry: this.getOldestEntry(),
      newestEntry: this.getNewestEntry()
    };
  }

  private getOldestEntry(): any {
    if (this.cache.size === 0) return null;
    
    let oldest = null;
    let oldestTime = Date.now();
    
    this.cache.forEach((value, key) => {
      const timestamp = new Date(value.timestamp).getTime();
      if (timestamp < oldestTime) {
        oldestTime = timestamp;
        oldest = { key, ...value };
      }
    });
    
    return oldest;
  }

  private getNewestEntry(): any {
    if (this.cache.size === 0) return null;
    
    let newest = null;
    let newestTime = 0;
    
    this.cache.forEach((value, key) => {
      const timestamp = new Date(value.timestamp).getTime();
      if (timestamp > newestTime) {
        newestTime = timestamp;
        newest = { key, ...value };
      }
    });
    
    return newest;
  }
} 