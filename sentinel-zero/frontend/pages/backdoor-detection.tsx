import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Search,
  Zap,
  Network,
  Activity
} from 'lucide-react';

interface BackdoorFinding {
  type: string;
  signature?: string;
  pattern?: string;
  matches?: any[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  content?: string;
  decoded_preview?: string;
}

interface ScanResult {
  scan_id: string;
  target: string;
  scan_type: string;
  timestamp: string;
  findings: BackdoorFinding[];
  summary: {
    total_findings: number;
    high_severity: number;
    medium_severity: number;
    low_severity: number;
  };
  status: string;
}

export default function BackdoorDetection() {
  const [target, setTarget] = useState('');
  const [scanType, setScanType] = useState('comprehensive');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [currentScan, setCurrentScan] = useState<ScanResult | null>(null);
  const [error, setError] = useState('');

  const scanTypes = [
    { value: 'basic', label: 'Basique', icon: Search },
    { value: 'advanced', label: 'Avancé', icon: Zap },
    { value: 'network', label: 'Réseau', icon: Network },
    { value: 'comprehensive', label: 'Complet', icon: Activity }
  ];

  const startScan = async () => {
    if (!target) {
      setError('Veuillez spécifier une cible');
      return;
    }

    setIsScanning(true);
    setError('');

    try {
      const response = await fetch('/api/scan/backdoor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          target,
          scan_type: scanType,
          duration: 300
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors du scan');
      }

      const result = await response.json();
      setCurrentScan(result.results);
      setScanResults(prev => [result.results, ...prev]);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setIsScanning(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-600 text-white';
      case 'high':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-white';
      case 'low':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="w-4 h-4" />;
      case 'medium':
        return <AlertTriangle className="w-4 h-4" />;
      case 'low':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="w-8 h-8 text-red-500" />
            Détection de Portes Dérobées
          </h1>
          <p className="text-gray-600 mt-2">
            Scanner ultra-avancé pour détecter n'importe quelle porte dérobée dans n'importe quelle application web
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuration du Scan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Cible (URL ou IP)
              </label>
              <Input
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="https://example.com ou 192.168.1.1"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Type de Scan
              </label>
              <select
                value={scanType}
                onChange={(e) => setScanType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {scanTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <Button 
            onClick={startScan} 
            disabled={isScanning || !target}
            className="w-full"
          >
            {isScanning ? (
              <>
                <Activity className="w-4 h-4 mr-2 animate-spin" />
                Scan en cours...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Démarrer le Scan
              </>
            )}
          </Button>

          {error && (
            <Alert>
              <XCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {currentScan && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Résultats du Scan
              <div className="flex gap-2">
                <Badge className={getSeverityColor('high')}>
                  {currentScan.summary?.high_severity || 0} Critique
                </Badge>
                <Badge className={getSeverityColor('medium')}>
                  {currentScan.summary?.medium_severity || 0} Moyen
                </Badge>
                <Badge className={getSeverityColor('low')}>
                  {currentScan.summary?.low_severity || 0} Faible
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="findings" className="w-full">
              <TabsList>
                <TabsTrigger value="findings">Trouvailles</TabsTrigger>
                <TabsTrigger value="summary">Résumé</TabsTrigger>
                <TabsTrigger value="details">Détails</TabsTrigger>
              </TabsList>
              
              <TabsContent value="findings" className="space-y-4">
                {currentScan.findings && currentScan.findings.length > 0 ? (
                  currentScan.findings.map((finding, index) => (
                    <Card key={index} className="border-l-4 border-red-500">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getSeverityIcon(finding.severity)}
                            <Badge className={getSeverityColor(finding.severity)}>
                              {finding.severity.toUpperCase()}
                            </Badge>
                          </div>
                          <span className="text-sm text-gray-500">
                            {finding.type}
                          </span>
                        </div>
                        <p className="font-medium">{finding.description}</p>
                        {finding.signature && (
                          <p className="text-sm text-gray-600 mt-1">
                            Signature: <code className="bg-gray-100 px-1 rounded">{finding.signature}</code>
                          </p>
                        )}
                        {finding.content && (
                          <div className="mt-2">
                            <p className="text-sm font-medium">Contenu détecté:</p>
                            <Textarea
                              value={finding.content}
                              readOnly
                              className="mt-1 text-xs"
                              rows={3}
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Aucune porte dérobée détectée sur cette cible.
                    </AlertDescription>
                  </Alert>
                )}
              </TabsContent>
              
              <TabsContent value="summary">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-2xl font-bold text-red-600">
                        {currentScan.summary?.high_severity || 0}
                      </div>
                      <p className="text-sm text-gray-600">Trouvailles Critiques</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-2xl font-bold text-yellow-600">
                        {currentScan.summary?.medium_severity || 0}
                      </div>
                      <p className="text-sm text-gray-600">Trouvailles Moyennes</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-2xl font-bold text-blue-600">
                        {currentScan.summary?.low_severity || 0}
                      </div>
                      <p className="text-sm text-gray-600">Trouvailles Faibles</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="details">
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto">
                  {JSON.stringify(currentScan, null, 2)}
                </pre>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {scanResults.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Historique des Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {scanResults.slice(1).map((scan, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{scan.target}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(scan.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getSeverityColor('high')}>
                      {scan.summary?.high_severity || 0}
                    </Badge>
                    <Badge className={getSeverityColor('medium')}>
                      {scan.summary?.medium_severity || 0}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
