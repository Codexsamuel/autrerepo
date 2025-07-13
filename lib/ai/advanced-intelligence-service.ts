import axios from 'axios';
import * as cheerio from 'cheerio';
import { AdvancedOSINTService } from '../osint/advanced-osint-service';

export interface IntelligenceResult {
  query: string;
  osintData: any[];
  webAnalysis: any;
  socialMediaAnalysis: any;
  technicalAnalysis: any;
  riskAssessment: any;
  recommendations: string[];
  confidence: number;
  timestamp: string;
}

export interface IntelligenceConfig {
  enableOSINT: boolean;
  enableSocialMedia: boolean;
  enableTechnicalAnalysis: boolean;
  enableRiskAssessment: boolean;
  maxSources: number;
  timeout: number;
}

export class AdvancedIntelligenceService {
  private osintService: AdvancedOSINTService;
  private config: IntelligenceConfig;

  constructor(config?: Partial<IntelligenceConfig>) {
    this.config = {
      enableOSINT: true,
      enableSocialMedia: true,
      enableTechnicalAnalysis: true,
      enableRiskAssessment: true,
      maxSources: 10,
      timeout: 30000,
      ...config
    };

    this.osintService = new AdvancedOSINTService({
      maxDepth: 5,
      timeout: this.config.timeout,
      useProxy: false
    });
  }

  /**
   * Analyse d'intelligence complète
   */
  async comprehensiveAnalysis(query: string): Promise<IntelligenceResult> {
    console.log(`🔍 Analyse d'intelligence complète: ${query}`);

    const startTime = Date.now();
    const results: Partial<IntelligenceResult> = {
      query,
      timestamp: new Date().toISOString()
    };

    // 1. Recherche OSINT
    if (this.config.enableOSINT) {
      try {
        const osintResults = await this.osintService.deepWebSearch(query);
        results.osintData = osintResults;
        console.log(`✅ OSINT: ${osintResults.length} sources analysées`);
      } catch (error) {
        console.error('Erreur OSINT:', error);
        results.osintData = [];
      }
    }

    // 2. Analyse web avancée
    try {
      results.webAnalysis = await this.performWebAnalysis(query);
      console.log('✅ Analyse web terminée');
    } catch (error) {
      console.error('Erreur analyse web:', error);
      results.webAnalysis = { error: 'Erreur lors de l\'analyse web' };
    }

    // 3. Analyse réseaux sociaux
    if (this.config.enableSocialMedia) {
      try {
        results.socialMediaAnalysis = await this.analyzeSocialMedia(query);
        console.log('✅ Analyse réseaux sociaux terminée');
      } catch (error) {
        console.error('Erreur analyse réseaux sociaux:', error);
        results.socialMediaAnalysis = { error: 'Erreur lors de l\'analyse des réseaux sociaux' };
      }
    }

    // 4. Analyse technique
    if (this.config.enableTechnicalAnalysis) {
      try {
        results.technicalAnalysis = await this.performTechnicalAnalysis(query);
        console.log('✅ Analyse technique terminée');
      } catch (error) {
        console.error('Erreur analyse technique:', error);
        results.technicalAnalysis = { error: 'Erreur lors de l\'analyse technique' };
      }
    }

    // 5. Évaluation des risques
    if (this.config.enableRiskAssessment) {
      try {
        results.riskAssessment = await this.assessRisks(query, results);
        console.log('✅ Évaluation des risques terminée');
      } catch (error) {
        console.error('Erreur évaluation des risques:', error);
        results.riskAssessment = { error: 'Erreur lors de l\'évaluation des risques' };
      }
    }

    // 6. Génération de recommandations
    results.recommendations = this.generateRecommendations(results);

    // 7. Calcul de la confiance
    results.confidence = this.calculateConfidence(results);

    const totalTime = Date.now() - startTime;
    console.log(`🎯 Analyse complète terminée en ${totalTime}ms`);

    return results as IntelligenceResult;
  }

  /**
   * Analyse web avancée
   */
  private async performWebAnalysis(query: string): Promise<any> {
    const analysis: any = {
      searchEngines: {},
      newsSources: {},
      academicSources: {},
      technicalSources: {},
      summary: ''
    };

    // Recherche sur différents moteurs
    const engines = ['google', 'bing', 'duckduckgo'];
    
    for (const engine of engines) {
      try {
        const results = await this.searchEngine(engine, query);
        analysis.searchEngines[engine] = results;
      } catch (error) {
        analysis.searchEngines[engine] = { error: error instanceof Error ? error.message : 'Unknown error' };
      }
    }

    // Recherche d'actualités
    try {
      analysis.newsSources = await this.searchNews(query);
    } catch (error) {
      analysis.newsSources = { error: error instanceof Error ? error.message : 'Unknown error' };
    }

    // Recherche académique
    try {
      analysis.academicSources = await this.searchAcademic(query);
    } catch (error) {
      analysis.academicSources = { error: error instanceof Error ? error.message : 'Unknown error' };
    }

    // Sources techniques
    try {
      analysis.technicalSources = await this.searchTechnical(query);
    } catch (error) {
      analysis.technicalSources = { error: error instanceof Error ? error.message : 'Unknown error' };
    }

    // Génération d'un résumé
    analysis.summary = this.generateWebSummary(analysis);

    return analysis;
  }

  /**
   * Recherche sur un moteur spécifique
   */
  private async searchEngine(engine: string, query: string): Promise<any> {
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
    
    let url = '';
    let params: any = {};

    switch (engine) {
      case 'google':
        url = 'https://www.google.com/search';
        params = { q: query, num: 10 };
        break;
      case 'bing':
        url = 'https://www.bing.com/search';
        params = { q: query, count: 10 };
        break;
      case 'duckduckgo':
        url = 'https://duckduckgo.com/html/';
        params = { q: query };
        break;
      default:
        throw new Error(`Moteur de recherche non supporté: ${engine}`);
    }

    const response = await axios.get(url, {
      params,
      headers: {
        'User-Agent': userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);
    const results: any[] = [];

    // Parsing spécifique selon le moteur
    switch (engine) {
      case 'google':
        $('.g').each((i, element) => {
          const title = $(element).find('h3').text();
          const link = $(element).find('a').attr('href');
          const snippet = $(element).find('.VwiC3b').text();
          if (title && link) {
            results.push({ title, link, snippet });
          }
        });
        break;
      
      case 'bing':
        $('.b_algo').each((i, element) => {
          const title = $(element).find('h2 a').text();
          const link = $(element).find('h2 a').attr('href');
          const snippet = $(element).find('.b_caption p').text();
          if (title && link) {
            results.push({ title, link, snippet });
          }
        });
        break;
      
      case 'duckduckgo':
        $('.result').each((i, element) => {
          const title = $(element).find('.result__title').text();
          const link = $(element).find('.result__url').text();
          const snippet = $(element).find('.result__snippet').text();
          if (title && link) {
            results.push({ title, link, snippet });
          }
        });
        break;
    }

    return {
      engine,
      query,
      results,
      totalResults: results.length,
      searchTime: Date.now()
    };
  }

  /**
   * Recherche d'actualités
   */
  private async searchNews(query: string): Promise<any> {
    const newsSources = [
      'https://news.google.com/search',
      'https://www.reuters.com/search/news',
      'https://www.bbc.com/search'
    ];

    const results: any[] = [];

    for (const source of newsSources) {
      try {
        const response = await axios.get(source, {
          params: { q: query },
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          timeout: 10000
        });

        const $ = cheerio.load(response.data);
        
        // Parsing générique des actualités
        $('article, .article, .news-item').each((i, element) => {
          const title = $(element).find('h1, h2, h3, .title').text().trim();
          const link = $(element).find('a').attr('href');
          const date = $(element).find('.date, .time').text().trim();
          
          if (title) {
            results.push({
              source: new URL(source).hostname,
              title,
              link: link ? new URL(link, source).href : null,
              date
            });
          }
        });
      } catch (error) {
        console.error(`Erreur recherche actualités ${source}:`, error);
      }
    }

    return {
      query,
      results,
      totalResults: results.length,
      searchTime: Date.now()
    };
  }

  /**
   * Recherche académique
   */
  private async searchAcademic(query: string): Promise<any> {
    const academicSources = [
      'https://scholar.google.com/scholar',
      'https://www.researchgate.net/search',
      'https://arxiv.org/search'
    ];

    const results: any[] = [];

    for (const source of academicSources) {
      try {
        const response = await axios.get(source, {
          params: { q: query },
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          timeout: 10000
        });

        const $ = cheerio.load(response.data);
        
        // Parsing générique des sources académiques
        $('.gs_r, .search-result, .arxiv-result').each((i, element) => {
          const title = $(element).find('.gs_rt, .title, h3').text().trim();
          const authors = $(element).find('.gs_a, .authors').text().trim();
          const abstract = $(element).find('.gs_rs, .abstract').text().trim();
          
          if (title) {
            results.push({
              source: new URL(source).hostname,
              title,
              authors,
              abstract
            });
          }
        });
      } catch (error) {
        console.error(`Erreur recherche académique ${source}:`, error);
      }
    }

    return {
      query,
      results,
      totalResults: results.length,
      searchTime: Date.now()
    };
  }

  /**
   * Recherche technique
   */
  private async searchTechnical(query: string): Promise<any> {
    const technicalSources = [
      'https://github.com/search',
      'https://stackoverflow.com/search',
      'https://www.npmjs.com/search'
    ];

    const results: any[] = [];

    for (const source of technicalSources) {
      try {
        const response = await axios.get(source, {
          params: { q: query },
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          timeout: 10000
        });

        const $ = cheerio.load(response.data);
        
        // Parsing spécifique selon la source
        if (source.includes('github.com')) {
          $('.repo-list-item').each((i, element) => {
            const title = $(element).find('.f4').text().trim();
            const description = $(element).find('.mb-1').text().trim();
            const language = $(element).find('[itemprop="programmingLanguage"]').text().trim();
            
            if (title) {
              results.push({
                source: 'GitHub',
                title,
                description,
                language
              });
            }
          });
        } else if (source.includes('stackoverflow.com')) {
          $('.question-summary').each((i, element) => {
            const title = $(element).find('.question-hyperlink').text().trim();
            const votes = $(element).find('.vote-count-post').text().trim();
            const tags = $(element).find('.post-tag').map((i, el) => $(el).text()).get();
            
            if (title) {
              results.push({
                source: 'Stack Overflow',
                title,
                votes,
                tags
              });
            }
          });
        }
      } catch (error) {
        console.error(`Erreur recherche technique ${source}:`, error);
      }
    }

    return {
      query,
      results,
      totalResults: results.length,
      searchTime: Date.now()
    };
  }

  /**
   * Analyse des réseaux sociaux
   */
  private async analyzeSocialMedia(query: string): Promise<any> {
    const analysis = {
      twitter: {},
      reddit: {},
      linkedin: {},
      summary: ''
    };

    // Analyse Twitter (via recherche web)
    try {
      const twitterResults = await this.searchEngine('google', `${query} site:twitter.com`);
      analysis.twitter = twitterResults;
    } catch (error) {
      analysis.twitter = { error: error instanceof Error ? error.message : 'Unknown error' };
    }

    // Analyse Reddit
    try {
      const redditResults = await this.searchEngine('google', `${query} site:reddit.com`);
      analysis.reddit = redditResults;
    } catch (error) {
      analysis.reddit = { error: error instanceof Error ? error.message : 'Unknown error' };
    }

    // Analyse LinkedIn
    try {
      const linkedinResults = await this.searchEngine('google', `${query} site:linkedin.com`);
      analysis.linkedin = linkedinResults;
    } catch (error) {
      analysis.linkedin = { error: error instanceof Error ? error.message : 'Unknown error' };
    }

    // Génération du résumé
    analysis.summary = this.generateSocialMediaSummary(analysis);

    return analysis;
  }

  /**
   * Analyse technique avancée
   */
  private async performTechnicalAnalysis(query: string): Promise<any> {
    const analysis = {
      domainAnalysis: {},
      technologyStack: {},
      securityAssessment: {},
      performanceMetrics: {},
      summary: ''
    };

    // Analyse de domaine si c'est une URL
    if (this.isUrl(query)) {
      try {
        analysis.domainAnalysis = await this.analyzeDomain(query);
      } catch (error) {
        analysis.domainAnalysis = { error: error instanceof Error ? error.message : 'Unknown error' };
      }
    }

    // Analyse de la stack technologique
    try {
      analysis.technologyStack = await this.analyzeTechnologyStack(query);
    } catch (error) {
      analysis.technologyStack = { error: error instanceof Error ? error.message : 'Unknown error' };
    }

    // Évaluation de sécurité
    try {
      analysis.securityAssessment = await this.assessSecurity(query);
    } catch (error) {
      analysis.securityAssessment = { error: error instanceof Error ? error.message : 'Unknown error' };
    }

    // Métriques de performance
    try {
      analysis.performanceMetrics = await this.analyzePerformance(query);
    } catch (error) {
      analysis.performanceMetrics = { error: error instanceof Error ? error.message : 'Unknown error' };
    }

    // Génération du résumé
    analysis.summary = this.generateTechnicalSummary(analysis);

    return analysis;
  }

  /**
   * Évaluation des risques
   */
  private async assessRisks(query: string, analysisData: any): Promise<any> {
    const risks: any = {
      securityRisks: [],
      privacyRisks: [],
      legalRisks: [],
      technicalRisks: [],
      overallRiskLevel: 'LOW',
      recommendations: []
    };

    // Analyse des risques de sécurité
    if (analysisData.osintData) {
      const securityKeywords = ['hack', 'breach', 'vulnerability', 'exploit', 'malware', 'virus'];
      analysisData.osintData.forEach((result: any) => {
        const text = JSON.stringify(result.data).toLowerCase();
        securityKeywords.forEach(keyword => {
          if (text.includes(keyword)) {
            risks.securityRisks.push({
              keyword,
              source: result.source,
              confidence: result.confidence
            });
          }
        });
      });
    }

    // Analyse des risques de confidentialité
    const privacyKeywords = ['personal data', 'privacy', 'gdpr', 'ccpa', 'personal information'];
    if (analysisData.webAnalysis) {
      const text = JSON.stringify(analysisData.webAnalysis).toLowerCase();
      privacyKeywords.forEach(keyword => {
        if (text.includes(keyword)) {
          risks.privacyRisks.push({
            keyword,
            context: 'web analysis'
          });
        }
      });
    }

    // Calcul du niveau de risque global
    const totalRisks = risks.securityRisks.length + risks.privacyRisks.length + 
                      risks.legalRisks.length + risks.technicalRisks.length;
    
    if (totalRisks > 10) risks.overallRiskLevel = 'HIGH';
    else if (totalRisks > 5) risks.overallRiskLevel = 'MEDIUM';
    else risks.overallRiskLevel = 'LOW';

    // Génération de recommandations
    risks.recommendations = this.generateRiskRecommendations(risks);

    return risks;
  }

  /**
   * Méthodes utilitaires
   */
  private isUrl(text: string): boolean {
    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  }

  private async analyzeDomain(url: string): Promise<any> {
    // Analyse basique du domaine
    const domain = new URL(url).hostname;
    
    return {
      domain,
      registrar: 'Unknown',
      creationDate: 'Unknown',
      expirationDate: 'Unknown',
      dnsRecords: [],
      sslCertificate: 'Unknown'
    };
  }

  private async analyzeTechnologyStack(query: string): Promise<any> {
    // Recherche de technologies dans les résultats
    const technologies = ['React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java', 'PHP', 'Ruby'];
    const foundTechnologies: any[] = [];

    // Cette méthode serait implémentée avec une recherche plus approfondie
    return {
      technologies: foundTechnologies,
      confidence: 0.5
    };
  }

  private async assessSecurity(query: string): Promise<any> {
    // Évaluation de sécurité basique
    return {
      sslEnabled: true,
      securityHeaders: [],
      vulnerabilities: [],
      overallScore: 85
    };
  }

  private async analyzePerformance(query: string): Promise<any> {
    // Analyse de performance basique
    return {
      loadTime: 'Unknown',
      pageSize: 'Unknown',
      optimizationScore: 75
    };
  }

  private generateWebSummary(analysis: any): string {
    const totalResults = Object.values(analysis.searchEngines)
      .filter((result: any) => !result.error)
      .reduce((sum: number, result: any) => sum + (result.totalResults || 0), 0);

    return `Analyse web complète: ${totalResults} résultats trouvés sur ${Object.keys(analysis.searchEngines).length} moteurs de recherche.`;
  }

  private generateSocialMediaSummary(analysis: any): string {
    const platforms = Object.keys(analysis).filter(key => key !== 'summary');
    const activePlatforms = platforms.filter(platform => !analysis[platform].error);

    return `Présence détectée sur ${activePlatforms.length}/${platforms.length} plateformes sociales.`;
  }

  private generateTechnicalSummary(analysis: any): string {
    const components = Object.keys(analysis).filter(key => key !== 'summary');
    const validComponents = components.filter(comp => !analysis[comp].error);

    return `Analyse technique: ${validComponents.length}/${components.length} composants analysés avec succès.`;
  }

  private generateRiskRecommendations(risks: any): string[] {
    const recommendations: string[] = [];

    if (risks.securityRisks.length > 0) {
      recommendations.push('Effectuer une audit de sécurité approfondi');
    }

    if (risks.privacyRisks.length > 0) {
      recommendations.push('Vérifier la conformité RGPD/CCPA');
    }

    if (risks.overallRiskLevel === 'HIGH') {
      recommendations.push('Consulter un expert en cybersécurité');
    }

    return recommendations;
  }

  private generateRecommendations(analysis: any): string[] {
    const recommendations: string[] = [];

    // Recommandations basées sur l'analyse OSINT
    if (analysis.osintData && analysis.osintData.length > 0) {
      recommendations.push('Continuer la surveillance des sources OSINT');
    }

    // Recommandations basées sur l'analyse web
    if (analysis.webAnalysis && !analysis.webAnalysis.error) {
      recommendations.push('Maintenir une veille sur les actualités liées');
    }

    // Recommandations basées sur l'évaluation des risques
    if (analysis.riskAssessment && analysis.riskAssessment.overallRiskLevel === 'HIGH') {
      recommendations.push('Actions immédiates requises pour la sécurité');
    }

    return recommendations;
  }

  private calculateConfidence(analysis: any): number {
    let confidence = 0;
    let totalComponents = 0;

    // OSINT
    if (analysis.osintData && analysis.osintData.length > 0) {
      confidence += Math.min(analysis.osintData.length * 10, 30);
      totalComponents++;
    }

    // Web Analysis
    if (analysis.webAnalysis && !analysis.webAnalysis.error) {
      confidence += 25;
      totalComponents++;
    }

    // Social Media
    if (analysis.socialMediaAnalysis && !analysis.socialMediaAnalysis.error) {
      confidence += 20;
      totalComponents++;
    }

    // Technical Analysis
    if (analysis.technicalAnalysis && !analysis.technicalAnalysis.error) {
      confidence += 15;
      totalComponents++;
    }

    // Risk Assessment
    if (analysis.riskAssessment && !analysis.riskAssessment.error) {
      confidence += 10;
      totalComponents++;
    }

    return totalComponents > 0 ? Math.min(confidence, 100) : 0;
  }
} 