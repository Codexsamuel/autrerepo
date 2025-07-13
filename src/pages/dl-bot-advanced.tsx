'use client';

import { motion } from 'framer-motion';
import {
    AlertCircle,
    CheckCircle,
    Code,
    Copy,
    Download,
    ExternalLink,
    GitBranch,
    Globe,
    Loader2,
    Search,
    Zap
} from 'lucide-react';
import { useState } from 'react';

interface AnalysisResult {
  repository?: string;
  files?: any[];
  summary?: any;
  url?: string;
  html?: string;
  css?: string[];
  javascript?: string[];
  images?: string[];
  metadata?: any;
  structure?: any;
  sources?: any[];
  analysis?: any;
  data?: any[];
  improvements?: string[];
  optimizedCode?: string;
  metrics?: any;
}

export default function DLBotAdvanced() {
  const [activeTab, setActiveTab] = useState<'repository' | 'web' | 'search' | 'code'>('repository');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Repository Analysis
  const [repoUrl, setRepoUrl] = useState('');

  // Web Extraction
  const [webUrl, setWebUrl] = useState('');

  // Deep Search
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'person' | 'company' | 'code' | 'general'>('general');

  // Code Analysis
  const [codeInput, setCodeInput] = useState('');
  const [codeLanguage, setCodeLanguage] = useState('javascript');

  const analyzeRepository = async () => {
    if (!repoUrl) {
      setError('Veuillez entrer une URL de repository');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/code-analyzer?action=analyze-repository&repo=${encodeURIComponent(repoUrl)}`);
      const data = await response.json();

      if (data.success) {
        setResults(data.data);
      } else {
        setError(data.error || 'Erreur lors de l\'analyse');
      }
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const extractWebCode = async () => {
    if (!webUrl) {
      setError('Veuillez entrer une URL');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/code-analyzer?action=extract-web-code&url=${encodeURIComponent(webUrl)}`);
      const data = await response.json();

      if (data.success) {
        setResults(data.data);
      } else {
        setError(data.error || 'Erreur lors de l\'extraction');
      }
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const performDeepSearch = async () => {
    if (!searchQuery) {
      setError('Veuillez entrer une requête de recherche');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/code-analyzer?action=deep-search&query=${encodeURIComponent(searchQuery)}&type=${searchType}`);
      const data = await response.json();

      if (data.success) {
        setResults(data.data);
      } else {
        setError(data.error || 'Erreur lors de la recherche');
      }
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const analyzeCode = async () => {
    if (!codeInput) {
      setError('Veuillez entrer du code à analyser');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/code-analyzer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'analyze-improve-code',
          data: { code: codeInput, language: codeLanguage }
        })
      });
      const data = await response.json();

      if (data.success) {
        setResults(data.data);
      } else {
        setError(data.error || 'Erreur lors de l\'analyse');
      }
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadCode = (code: string, filename: string) => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            <Zap className="inline-block mr-3 text-yellow-400" />
            DL Bot Avancé
          </h1>
          <p className="text-gray-300 text-lg">
            Analyse de code, extraction web et recherche approfondie avec capacités réelles
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8"
        >
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { id: 'repository', label: 'Analyse Repository', icon: GitBranch },
              { id: 'web', label: 'Extraction Web', icon: Globe },
              { id: 'search', label: 'Recherche Approfondie', icon: Search },
              { id: 'code', label: 'Analyse Code', icon: Code }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/20 text-gray-300 hover:bg-white/30'
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Repository Analysis */}
          {activeTab === 'repository' && (
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">URL du Repository Git</label>
                <input
                  type="url"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/user/repo"
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
                />
              </div>
              <button
                onClick={analyzeRepository}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <GitBranch />}
                Analyser le Repository
              </button>
            </div>
          )}

          {/* Web Extraction */}
          {activeTab === 'web' && (
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">URL du Site Web</label>
                <input
                  type="url"
                  value={webUrl}
                  onChange={(e) => setWebUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
                />
              </div>
              <button
                onClick={extractWebCode}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Globe />}
                Extraire le Code
              </button>
            </div>
          )}

          {/* Deep Search */}
          {activeTab === 'search' && (
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">Requête de Recherche</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Nom, email, technologie, etc."
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-white mb-2">Type de Recherche</label>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value as any)}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                >
                  <option value="general">Général</option>
                  <option value="person">Personne</option>
                  <option value="company">Entreprise</option>
                  <option value="code">Code</option>
                </select>
              </div>
              <button
                onClick={performDeepSearch}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Search />}
                Rechercher
              </button>
            </div>
          )}

          {/* Code Analysis */}
          {activeTab === 'code' && (
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">Langage de Programmation</label>
                <select
                  value={codeLanguage}
                  onChange={(e) => setCodeLanguage(e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                  <option value="php">PHP</option>
                  <option value="go">Go</option>
                  <option value="rust">Rust</option>
                </select>
              </div>
              <div>
                <label className="block text-white mb-2">Code à Analyser</label>
                <textarea
                  value={codeInput}
                  onChange={(e) => setCodeInput(e.target.value)}
                  placeholder="Collez votre code ici..."
                  rows={10}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono"
                />
              </div>
              <button
                onClick={analyzeCode}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Code />}
                Analyser et Améliorer
              </button>
            </div>
          )}
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6"
          >
            <div className="flex items-center gap-2 text-red-300">
              <AlertCircle size={20} />
              {error}
            </div>
          </motion.div>
        )}

        {/* Results Display */}
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Résultats</h2>
              <div className="flex gap-2">
                {results.optimizedCode && (
                  <button
                    onClick={() => downloadCode(results.optimizedCode!, 'optimized-code.txt')}
                    className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Download size={16} />
                    Télécharger
                  </button>
                )}
              </div>
            </div>

            {/* Repository Analysis Results */}
            {results.repository && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Fichiers</h3>
                    <p className="text-3xl font-bold text-blue-400">{results.summary?.totalFiles || 0}</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Lignes de Code</h3>
                    <p className="text-3xl font-bold text-green-400">{results.summary?.totalLines || 0}</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Langages</h3>
                    <p className="text-3xl font-bold text-purple-400">{results.summary?.languages?.length || 0}</p>
                  </div>
                </div>

                {results.files && results.files.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Fichiers Analysés</h3>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {results.files.map((file: any, index: number) => (
                        <div key={index} className="bg-white/5 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-white font-mono">{file.path}</span>
                            <span className="text-gray-400">{file.language}</span>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-300">
                            <span>{file.lines} lignes</span>
                            <span>Complexité: {file.complexity}</span>
                            <span>Qualité: {file.quality}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Web Extraction Results */}
            {results.url && results.html && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Éléments</h3>
                    <p className="text-3xl font-bold text-blue-400">{results.structure?.elements || 0}</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Images</h3>
                    <p className="text-3xl font-bold text-green-400">{results.images?.length || 0}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Métadonnées</h3>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-white"><strong>Titre:</strong> {results.metadata?.title}</p>
                    <p className="text-gray-300"><strong>Description:</strong> {results.metadata?.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">CSS ({results.css?.length || 0})</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {results.css?.map((css: string, index: number) => (
                        <div key={index} className="bg-white/5 rounded p-2">
                          <code className="text-sm text-gray-300">{css.substring(0, 100)}...</code>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">JavaScript ({results.javascript?.length || 0})</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {results.javascript?.map((js: string, index: number) => (
                        <div key={index} className="bg-white/5 rounded p-2">
                          <code className="text-sm text-gray-300">{js.substring(0, 100)}...</code>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Search Results */}
            {results.sources && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Sources</h3>
                    <p className="text-3xl font-bold text-blue-400">{results.sources.length}</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Confiance</h3>
                    <p className="text-3xl font-bold text-green-400">{Math.round((results.analysis?.confidence || 0) * 100)}%</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Pertinence</h3>
                    <p className="text-3xl font-bold text-purple-400">{Math.round((results.analysis?.relevance || 0) * 100)}%</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Sources Trouvées</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {results.sources.map((source: any, index: number) => (
                      <div key={index} className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-blue-400 font-semibold">{source.type}</span>
                            <span className="text-gray-400">({Math.round(source.confidence * 100)}%)</span>
                          </div>
                          <div className="flex gap-2">
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300"
                            >
                              <ExternalLink size={16} />
                            </a>
                            <button
                              onClick={() => copyToClipboard(source.url)}
                              className="text-gray-400 hover:text-white"
                            >
                              <Copy size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-300">
                          {JSON.stringify(source.data, null, 2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Code Analysis Results */}
            {results.analysis && results.improvements && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Complexité</h3>
                    <p className="text-3xl font-bold text-blue-400">{results.metrics?.complexity || 0}</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Maintenabilité</h3>
                    <p className="text-3xl font-bold text-green-400">{Math.round(results.metrics?.maintainability || 0)}%</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Performance</h3>
                    <p className="text-3xl font-bold text-purple-400">{Math.round(results.metrics?.performance || 0)}%</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Améliorations Suggérées</h3>
                  <div className="space-y-2">
                    {results.improvements.map((improvement: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 bg-white/5 rounded-lg p-3">
                        <CheckCircle size={16} className="text-green-400" />
                        <span className="text-white">{improvement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {results.optimizedCode && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">Code Optimisé</h3>
                      <button
                        onClick={() => copyToClipboard(results.optimizedCode!)}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <Copy size={16} />
                        Copier
                      </button>
                    </div>
                    <div className="bg-black/50 rounded-lg p-4 max-h-96 overflow-y-auto">
                      <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                        {results.optimizedCode}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
} 