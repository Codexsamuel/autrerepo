import axios from 'axios';
import * as cheerio from 'cheerio';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface CodeAnalysisResult {
  repository: string;
  files: FileAnalysis[];
  summary: {
    totalFiles: number;
    totalLines: number;
    languages: string[];
    complexity: number;
    issues: CodeIssue[];
    suggestions: string[];
  };
  timestamp: string;
}

interface FileAnalysis {
  path: string;
  language: string;
  lines: number;
  complexity: number;
  issues: CodeIssue[];
  quality: number;
  suggestions: string[];
}

interface CodeIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  line?: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface WebCodeExtraction {
  url: string;
  html: string;
  css: string[];
  javascript: string[];
  images: string[];
  metadata: {
    title: string;
    description: string;
    keywords: string[];
  };
  structure: {
    elements: number;
    forms: number;
    links: number;
  };
}

interface DeepSearchResult {
  query: string;
  sources: SearchSource[];
  analysis: {
    confidence: number;
    relevance: number;
    completeness: number;
  };
  data: any[];
  timestamp: string;
}

interface SearchSource {
  type: 'github' | 'stackoverflow' | 'reddit' | 'twitter' | 'linkedin' | 'email' | 'phone' | 'address';
  url: string;
  data: any;
  confidence: number;
}

export class AdvancedCodeAnalyzerService {
  private tempDir = path.join(process.cwd(), 'temp-analysis');
  private config = {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    timeout: 30000,
    maxRetries: 3
  };

  constructor() {
    this.ensureTempDir();
  }

  private ensureTempDir() {
    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir, { recursive: true });
    }
  }

  /**
   * Analyse complète d'un repository Git
   */
  async analyzeGitRepository(repoUrl: string): Promise<CodeAnalysisResult> {
    try {
      console.log(`🔍 Analyse du repository: ${repoUrl}`);
      
      // Cloner le repository
      const repoName = this.extractRepoName(repoUrl);
      const localPath = path.join(this.tempDir, repoName);
      
      await this.cloneRepository(repoUrl, localPath);
      
      // Analyser la structure
      const files = await this.analyzeRepositoryStructure(localPath);
      
      // Analyser chaque fichier
      const fileAnalyses = await Promise.all(
        files.map(file => this.analyzeFile(path.join(localPath, file)))
      );
      
      // Générer le résumé
      const summary = this.generateSummary(fileAnalyses);
      
      // Nettoyer
      await this.cleanup(localPath);
      
      return {
        repository: repoUrl,
        files: fileAnalyses,
        summary,
        timestamp: new Date().toISOString()
      };
      
    } catch (error: any) {
      console.error('Erreur analyse repository:', error);
      throw new Error(`Impossible d'analyser le repository: ${error.message || 'Erreur inconnue'}`);
    }
  }

  /**
   * Extraction complète du code d'un site web
   */
  async extractWebCode(url: string): Promise<WebCodeExtraction> {
    try {
      console.log(`🌐 Extraction du code de: ${url}`);
      
      const response = await axios.get(url, {
        headers: {
          'User-Agent': this.config.userAgent
        },
        timeout: this.config.timeout
      });
      
      const $ = cheerio.load(response.data);
      
      // Extraire le HTML
      const html = $.html();
      
      // Extraire le CSS
      const css: string[] = [];
      $('style').each((_, el) => css.push($(el).html() || ''));
      $('link[rel="stylesheet"]').each((_, el) => {
        const href = $(el).attr('href');
        if (href) css.push(href);
      });
      
      // Extraire le JavaScript
      const javascript: string[] = [];
      $('script').each((_, el) => {
        const src = $(el).attr('src');
        const content = $(el).html();
        if (src) javascript.push(src);
        if (content) javascript.push(content);
      });
      
      // Extraire les images
      const images: string[] = [];
      $('img').each((_, el) => {
        const src = $(el).attr('src');
        if (src) images.push(src);
      });
      
      // Extraire les métadonnées
      const metadata = {
        title: $('title').text() || '',
        description: $('meta[name="description"]').attr('content') || '',
        keywords: $('meta[name="keywords"]').attr('content')?.split(',').map(k => k.trim()) || []
      };
      
      // Analyser la structure
      const structure = {
        elements: $('*').length,
        forms: $('form').length,
        links: $('a').length
      };
      
      return {
        url,
        html,
        css,
        javascript,
        images,
        metadata,
        structure
      };
      
    } catch (error: any) {
      console.error('Erreur extraction web:', error);
      throw new Error(`Impossible d'extraire le code: ${error.message || 'Erreur inconnue'}`);
    }
  }

  /**
   * Recherche approfondie d'informations
   */
  async deepSearch(query: string, searchType: 'person' | 'company' | 'code' | 'general' = 'general'): Promise<DeepSearchResult> {
    try {
      console.log(`🔍 Recherche approfondie: ${query}`);
      
      const sources: SearchSource[] = [];
      
      // Recherche GitHub
      if (searchType === 'code' || searchType === 'general') {
        const githubResults = await this.searchGitHub(query);
        sources.push(...githubResults);
      }
      
      // Recherche Stack Overflow
      if (searchType === 'code' || searchType === 'general') {
        const stackResults = await this.searchStackOverflow(query);
        sources.push(...stackResults);
      }
      
      // Recherche Reddit
      const redditResults = await this.searchReddit(query);
      sources.push(...redditResults);
      
      // Recherche Twitter
      if (searchType === 'person' || searchType === 'general') {
        const twitterResults = await this.searchTwitter(query);
        sources.push(...twitterResults);
      }
      
      // Recherche LinkedIn
      if (searchType === 'person' || searchType === 'company') {
        const linkedinResults = await this.searchLinkedIn(query);
        sources.push(...linkedinResults);
      }
      
      // Recherche d'emails et téléphones
      if (searchType === 'person') {
        const contactResults = await this.searchContactInfo(query);
        sources.push(...contactResults);
      }
      
      // Analyser les résultats
      const analysis = this.analyzeSearchResults(sources, query);
      
      return {
        query,
        sources,
        analysis,
        data: sources.map(s => s.data),
        timestamp: new Date().toISOString()
      };
      
    } catch (error: any) {
      console.error('Erreur recherche approfondie:', error);
      throw new Error(`Recherche échouée: ${error.message || 'Erreur inconnue'}`);
    }
  }

  /**
   * Analyse et amélioration de code
   */
  async analyzeAndImproveCode(code: string, language: string): Promise<{
    analysis: CodeIssue[];
    improvements: string[];
    optimizedCode: string;
    metrics: {
      complexity: number;
      maintainability: number;
      performance: number;
    };
  }> {
    try {
      console.log(`🔧 Analyse et amélioration de code ${language}`);
      
      // Analyser le code
      const analysis = await this.analyzeCodeQuality(code, language);
      
      // Identifier les améliorations
      const improvements = await this.identifyImprovements(code, language, analysis);
      
      // Optimiser le code
      const optimizedCode = await this.optimizeCode(code, language, improvements);
      
      // Calculer les métriques
      const metrics = this.calculateMetrics(optimizedCode, language);
      
      return {
        analysis,
        improvements,
        optimizedCode,
        metrics
      };
      
    } catch (error: any) {
      console.error('Erreur analyse code:', error);
      throw new Error(`Impossible d'analyser le code: ${error.message || 'Erreur inconnue'}`);
    }
  }

  // Méthodes privées pour l'analyse de repository
  private async cloneRepository(repoUrl: string, localPath: string): Promise<void> {
    try {
      await execAsync(`git clone ${repoUrl} ${localPath}`);
    } catch (error: any) {
      throw new Error(`Impossible de cloner le repository: ${error.message || 'Erreur inconnue'}`);
    }
  }

  private async analyzeRepositoryStructure(repoPath: string): Promise<string[]> {
    const files: string[] = [];
    
    const walkDir = (dir: string) => {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          walkDir(fullPath);
        } else if (stat.isFile() && this.isCodeFile(item)) {
          files.push(path.relative(repoPath, fullPath));
        }
      }
    };
    
    walkDir(repoPath);
    return files;
  }

  private async analyzeFile(filePath: string): Promise<FileAnalysis> {
    const content = fs.readFileSync(filePath, 'utf-8');
    const language = this.detectLanguage(filePath);
    const lines = content.split('\n').length;
    const complexity = this.calculateComplexity(content, language);
    const issues = await this.detectIssues(content, language);
    const quality = this.calculateQuality(issues, complexity, lines);
    const suggestions = this.generateSuggestions(issues, language);
    
    return {
      path: path.relative(this.tempDir, filePath),
      language,
      lines,
      complexity,
      issues,
      quality,
      suggestions
    };
  }

  private generateSummary(fileAnalyses: FileAnalysis[]): any {
    const totalFiles = fileAnalyses.length;
    const totalLines = fileAnalyses.reduce((sum, file) => sum + file.lines, 0);
    const languages = [...new Set(fileAnalyses.map(f => f.language))];
    const complexity = fileAnalyses.reduce((sum, file) => sum + file.complexity, 0) / totalFiles;
    const issues = fileAnalyses.flatMap(f => f.issues);
    const suggestions = [...new Set(fileAnalyses.flatMap(f => f.suggestions))];
    
    return {
      totalFiles,
      totalLines,
      languages,
      complexity,
      issues,
      suggestions
    };
  }

  // Méthodes de recherche
  private async searchGitHub(query: string): Promise<SearchSource[]> {
    try {
      const response = await axios.get(`https://api.github.com/search/repositories`, {
        params: { q: query, sort: 'stars', order: 'desc' },
        headers: {
          'User-Agent': this.config.userAgent,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      return response.data.items.slice(0, 10).map((repo: any) => ({
        type: 'github' as const,
        url: repo.html_url,
        data: {
          name: repo.name,
          description: repo.description,
          stars: repo.stargazers_count,
          language: repo.language,
          size: repo.size
        },
        confidence: 0.9
      }));
    } catch (error: any) {
      console.error('Erreur recherche GitHub:', error);
      return [];
    }
  }

  private async searchStackOverflow(query: string): Promise<SearchSource[]> {
    try {
      const response = await axios.get(`https://api.stackexchange.com/2.3/search/advanced`, {
        params: {
          site: 'stackoverflow',
          q: query,
          sort: 'votes',
          order: 'desc'
        }
      });
      
      return response.data.items.slice(0, 10).map((item: any) => ({
        type: 'stackoverflow' as const,
        url: item.link,
        data: {
          title: item.title,
          score: item.score,
          answer_count: item.answer_count,
          tags: item.tags
        },
        confidence: 0.8
      }));
    } catch (error: any) {
      console.error('Erreur recherche Stack Overflow:', error);
      return [];
    }
  }

  private async searchReddit(query: string): Promise<SearchSource[]> {
    try {
      const response = await axios.get(`https://www.reddit.com/search.json`, {
        params: { q: query, sort: 'relevance', t: 'all' },
        headers: { 'User-Agent': this.config.userAgent }
      });
      
      return response.data.data.children.slice(0, 10).map((post: any) => ({
        type: 'reddit' as const,
        url: `https://reddit.com${post.data.permalink}`,
        data: {
          title: post.data.title,
          score: post.data.score,
          subreddit: post.data.subreddit,
          author: post.data.author
        },
        confidence: 0.7
      }));
    } catch (error: any) {
      console.error('Erreur recherche Reddit:', error);
      return [];
    }
  }

  private async searchTwitter(query: string): Promise<SearchSource[]> {
    // Simulation - Twitter API nécessite des clés d'authentification
    return [{
      type: 'twitter' as const,
      url: `https://twitter.com/search?q=${encodeURIComponent(query)}`,
      data: { query, platform: 'twitter' },
      confidence: 0.6
    }];
  }

  private async searchLinkedIn(query: string): Promise<SearchSource[]> {
    // Simulation - LinkedIn a des restrictions
    return [{
      type: 'linkedin' as const,
      url: `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(query)}`,
      data: { query, platform: 'linkedin' },
      confidence: 0.5
    }];
  }

  private async searchContactInfo(query: string): Promise<SearchSource[]> {
    // Recherche d'emails et téléphones dans le texte
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const phoneRegex = /(\+?[\d\s\-\(\)]{10,})/g;
    
    const emails = query.match(emailRegex) || [];
    const phones = query.match(phoneRegex) || [];
    
    const results: SearchSource[] = [];
    
    emails.forEach(email => {
      results.push({
        type: 'email' as const,
        url: `mailto:${email}`,
        data: { email },
        confidence: 0.9
      });
    });
    
    phones.forEach(phone => {
      results.push({
        type: 'phone' as const,
        url: `tel:${phone}`,
        data: { phone },
        confidence: 0.8
      });
    });
    
    return results;
  }

  // Méthodes utilitaires
  private extractRepoName(url: string): string {
    const match = url.match(/github\.com[/:]([^/]+)\/([^/]+)/);
    return match ? `${match[1]}-${match[2]}` : 'unknown-repo';
  }

  private isCodeFile(filename: string): boolean {
    const codeExtensions = [
      '.js', '.ts', '.jsx', '.tsx', '.py', '.java', '.cpp', '.c', '.cs',
      '.php', '.rb', '.go', '.rs', '.swift', '.kt', '.scala', '.html',
      '.css', '.scss', '.sass', '.less', '.json', '.xml', '.yaml', '.yml'
    ];
    return codeExtensions.some(ext => filename.endsWith(ext));
  }

  private detectLanguage(filePath: string): string {
    const ext = path.extname(filePath).toLowerCase();
    const languageMap: { [key: string]: string } = {
      '.js': 'JavaScript',
      '.ts': 'TypeScript',
      '.jsx': 'React JSX',
      '.tsx': 'React TSX',
      '.py': 'Python',
      '.java': 'Java',
      '.cpp': 'C++',
      '.c': 'C',
      '.cs': 'C#',
      '.php': 'PHP',
      '.rb': 'Ruby',
      '.go': 'Go',
      '.rs': 'Rust',
      '.swift': 'Swift',
      '.kt': 'Kotlin',
      '.html': 'HTML',
      '.css': 'CSS',
      '.scss': 'SCSS',
      '.json': 'JSON',
      '.xml': 'XML',
      '.yaml': 'YAML',
      '.yml': 'YAML'
    };
    return languageMap[ext] || 'Unknown';
  }

  private calculateComplexity(code: string, language: string): number {
    // Calcul simple de complexité cyclomatique
    const lines = code.split('\n');
    let complexity = 1;
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.includes('if ') || trimmed.includes('else') ||
          trimmed.includes('for ') || trimmed.includes('while ') ||
          trimmed.includes('switch ') || trimmed.includes('case ') ||
          trimmed.includes('&&') || trimmed.includes('||')) {
        complexity++;
      }
    }
    
    return complexity;
  }

  private async detectIssues(code: string, language: string): Promise<CodeIssue[]> {
    const issues: CodeIssue[] = [];
    
    // Détection basique d'issues
    const lines = code.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Longues lignes
      if (line.length > 120) {
        issues.push({
          type: 'warning',
          message: 'Ligne trop longue',
          line: i + 1,
          severity: 'low'
        });
      }
      
      // Variables non utilisées (détection basique)
      if (line.includes('let ') || line.includes('const ') || line.includes('var ')) {
        const varName = line.match(/(?:let|const|var)\s+(\w+)/)?.[1];
        if (varName && !code.includes(varName, line.length)) {
          issues.push({
            type: 'warning',
            message: `Variable potentiellement non utilisée: ${varName}`,
            line: i + 1,
            severity: 'medium'
          });
        }
      }
      
      // Console.log en production
      if (line.includes('console.log(')) {
        issues.push({
          type: 'warning',
          message: 'Console.log détecté - à retirer en production',
          line: i + 1,
          severity: 'medium'
        });
      }
    }
    
    return issues;
  }

  private calculateQuality(issues: CodeIssue[], complexity: number, lines: number): number {
    const criticalIssues = issues.filter(i => i.severity === 'critical').length;
    const highIssues = issues.filter(i => i.severity === 'high').length;
    const mediumIssues = issues.filter(i => i.severity === 'medium').length;
    const lowIssues = issues.filter(i => i.severity === 'low').length;
    
    let quality = 100;
    quality -= criticalIssues * 20;
    quality -= highIssues * 10;
    quality -= mediumIssues * 5;
    quality -= lowIssues * 2;
    
    // Pénalité pour la complexité
    if (complexity > 10) quality -= (complexity - 10) * 2;
    
    return Math.max(0, quality);
  }

  private generateSuggestions(issues: CodeIssue[], language: string): string[] {
    const suggestions: string[] = [];
    
    const criticalCount = issues.filter(i => i.severity === 'critical').length;
    const highCount = issues.filter(i => i.severity === 'high').length;
    
    if (criticalCount > 0) {
      suggestions.push('Corriger les erreurs critiques en priorité');
    }
    
    if (highCount > 0) {
      suggestions.push('Revoir les problèmes de sécurité identifiés');
    }
    
    if (issues.some(i => i.message.includes('console.log'))) {
      suggestions.push('Retirer tous les console.log avant la mise en production');
    }
    
    if (language === 'JavaScript' || language === 'TypeScript') {
      suggestions.push('Utiliser ESLint pour une analyse plus approfondie');
      suggestions.push('Considérer l\'utilisation de Prettier pour le formatage');
    }
    
    return suggestions;
  }

  private analyzeSearchResults(sources: SearchSource[], query: string): any {
    const totalSources = sources.length;
    const avgConfidence = sources.reduce((sum, s) => sum + s.confidence, 0) / totalSources;
    const sourceTypes = [...new Set(sources.map(s => s.type))];
    
    return {
      confidence: avgConfidence,
      relevance: Math.min(1, totalSources / 10),
      completeness: Math.min(1, sourceTypes.length / 6)
    };
  }

  private async analyzeCodeQuality(code: string, language: string): Promise<CodeIssue[]> {
    return this.detectIssues(code, language);
  }

  private async identifyImprovements(code: string, language: string, issues: CodeIssue[]): Promise<string[]> {
    return this.generateSuggestions(issues, language);
  }

  private async optimizeCode(code: string, language: string, improvements: string[]): Promise<string> {
    // Optimisations basiques
    let optimized = code;
    
    // Supprimer les console.log
    if (improvements.some(i => i.includes('console.log'))) {
      optimized = optimized.replace(/console\.log\([^)]*\);?\n?/g, '');
    }
    
    // Réduire les lignes trop longues
    optimized = optimized.split('\n').map(line => {
      if (line.length > 120) {
        // Tentative de coupure intelligente
        const words = line.split(' ');
        if (words.length > 10) {
          const mid = Math.floor(words.length / 2);
          return words.slice(0, mid).join(' ') + '\n' + words.slice(mid).join(' ');
        }
      }
      return line;
    }).join('\n');
    
    return optimized;
  }

  private calculateMetrics(code: string, language: string): any {
    const lines = code.split('\n').length;
    const complexity = this.calculateComplexity(code, language);
    const maintainability = Math.max(0, 100 - complexity * 2);
    const performance = 100 - (code.match(/for\s*\(/g)?.length || 0) * 5;
    
    return {
      complexity,
      maintainability,
      performance: Math.max(0, performance)
    };
  }

  private async cleanup(path: string): Promise<void> {
    try {
      await execAsync(`rm -rf "${path}"`);
    } catch (error: any) {
      console.error('Erreur nettoyage:', error);
    }
  }
} 