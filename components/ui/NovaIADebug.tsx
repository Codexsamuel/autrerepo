'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bug, CheckCircle, RefreshCw, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ModuleStatus {
  name: string;
  status: 'loading' | 'success' | 'error';
  error?: string;
  loadTime?: number;
}

export function NovaIADebug() {
  const [modules, setModules] = useState<ModuleStatus[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [consoleErrors, setConsoleErrors] = useState<string[]>([]);

  const testModules = [
    'NovaIAssistant',
    'NovaAISelector',
    'ChatAgent',
    'CommercialAgent',
    'DataAnalysisAgent',
    'InsightAgentPremium'
  ];

  const testModule = async (moduleName: string): Promise<ModuleStatus> => {
    const startTime = Date.now();
    
    try {
      // Test de chargement dynamique du module
      const module = await import(`@/components/ui/agents/${moduleName}.tsx`);
      const loadTime = Date.now() - startTime;
      
      return {
        name: moduleName,
        status: 'success',
        loadTime
      };
    } catch (error: any) {
      return {
        name: moduleName,
        status: 'error',
        error: error.message,
        loadTime: Date.now() - startTime
      };
    }
  };

  const runDiagnostics = async () => {
    setIsLoading(true);
    setConsoleErrors([]);
    
    // Capturer les erreurs de console
    const originalError = console.error;
    const originalWarn = console.warn;
    const errors: string[] = [];
    
    console.error = (...args) => {
      errors.push(args.join(' '));
      originalError.apply(console, args);
    };
    
    console.warn = (...args) => {
      errors.push(`WARNING: ${args.join(' ')}`);
      originalWarn.apply(console, args);
    };

    // Tester tous les modules
    const results = await Promise.all(
      testModules.map(module => testModule(module))
    );
    
    setModules(results);
    setConsoleErrors(errors);
    
    // Restaurer la console
    console.error = originalError;
    console.warn = originalWarn;
    
    setIsLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <RefreshCw className="w-5 h-5 text-yellow-500 animate-spin" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bug className="w-6 h-6 text-blue-600" />
          Diagnostic NovaIA - Modules et Composants
        </CardTitle>
        <CardDescription>
          Test de chargement et diagnostic des modules IA pour identifier les problèmes de production
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Bouton de diagnostic */}
        <div className="flex justify-between items-center">
          <Button 
            onClick={runDiagnostics} 
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Diagnostic en cours...' : 'Relancer le diagnostic'}
          </Button>
          
          <Badge variant="outline">
            {modules.filter(m => m.status === 'success').length} / {modules.length} modules OK
          </Badge>
        </div>

        {/* Résultats des tests */}
        <div className="grid gap-4">
          {modules.map((module, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(module.status)}
                <div>
                  <h4 className="font-semibold">{module.name}</h4>
                  {module.error && (
                    <p className="text-sm text-red-600">{module.error}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(module.status)}>
                  {module.status}
                </Badge>
                {module.loadTime && (
                  <span className="text-sm text-gray-500">
                    {module.loadTime}ms
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Erreurs de console */}
        {consoleErrors.length > 0 && (
          <Alert>
            <AlertDescription>
              <h4 className="font-semibold mb-2">Erreurs de console détectées :</h4>
              <div className="space-y-1">
                {consoleErrors.map((error, index) => (
                  <div key={index} className="text-sm bg-red-50 p-2 rounded border-l-2 border-red-500">
                    {error}
                  </div>
                ))}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Recommandations */}
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-semibold text-blue-800 mb-2">Recommandations :</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Vérifiez la console du navigateur pour les erreurs JavaScript</li>
            <li>• Assurez-vous que tous les composants UI sont correctement exportés</li>
            <li>• Vérifiez que les routes API backend répondent correctement</li>
            <li>• Testez le chargement des modules en mode développement</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
} 