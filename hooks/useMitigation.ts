import { useState, useEffect, useCallback } from 'react';
import { Vulnerability, MitigationAction } from '@/lib/services/mitigation-service';

interface UseMitigationReturn {
  vulnerabilities: Vulnerability[];
  mitigations: MitigationAction[];
  stats: {
    total: number;
    open: number;
    mitigated: number;
    verified: number;
    closed: number;
  };
  isLoading: boolean;
  error: string | null;
  applyMitigation: (vuln: Vulnerability) => Promise<void>;
  verifyMitigation: (vuln: Vulnerability) => Promise<void>;
  closeVulnerability: (vuln: Vulnerability) => Promise<void>;
  refreshData: () => Promise<void>;
  ingestFindings: (findings: Vulnerability[]) => Promise<void>;
}

export function useMitigation(): UseMitigationReturn {
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [mitigations, setMitigations] = useState<MitigationAction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calcul des statistiques
  const stats = {
    total: vulnerabilities.length,
    open: vulnerabilities.filter(v => v.status === 'OPEN').length,
    mitigated: vulnerabilities.filter(v => v.status === 'MITIGATED').length,
    verified: vulnerabilities.filter(v => v.status === 'VERIFIED').length,
    closed: vulnerabilities.filter(v => v.status === 'CLOSED').length,
  };

  // Récupération des données depuis l'API
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/sentinel-zero/mitigation');
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status === 'success') {
        setVulnerabilities(data.data.vulnerabilities || []);
        setMitigations(data.data.mitigations || []);
      } else {
        throw new Error(data.message || 'Erreur lors de la récupération des données');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      console.error('Erreur lors de la récupération des données de mitigation:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Chargement initial des données
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Application de la mitigation
  const applyMitigation = useCallback(async (vuln: Vulnerability) => {
    try {
      setIsLoading(true);
      setError(null);

      // Créer une mitigation locale immédiatement
      const localMitigation: MitigationAction = {
        id: `local-${Date.now()}`,
        vulnerabilityId: vuln.id,
        action: 'AUTO_MITIGATION',
        status: 'RUNNING',
        timestamp: new Date().toISOString()
      };

      setMitigations(prev => [...prev, localMitigation]);

      // Mettre à jour le statut de la vulnérabilité
      setVulnerabilities(prev => prev.map(v => 
        v.id === vuln.id ? { ...v, status: 'MITIGATED' } : v
      ));

      // Simuler le processus de mitigation (remplacer par ton API réelle)
      setTimeout(() => {
        setMitigations(prev => prev.map(m => 
          m.id === localMitigation.id 
            ? { ...m, status: 'COMPLETED', result: 'Mitigation appliquée avec succès' }
            : m
        ));
      }, 3000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mitigation');
      console.error('Erreur lors de la mitigation:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Vérification de la mitigation
  const verifyMitigation = useCallback(async (vuln: Vulnerability) => {
    try {
      setIsLoading(true);
      setError(null);

      // Simuler la vérification (remplacer par ton API réelle)
      setTimeout(() => {
        setVulnerabilities(prev => prev.map(v => 
          v.id === vuln.id ? { ...v, status: 'VERIFIED' } : v
        ));
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la vérification');
      console.error('Erreur lors de la vérification:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fermeture de la vulnérabilité
  const closeVulnerability = useCallback(async (vuln: Vulnerability) => {
    try {
      setIsLoading(true);
      setError(null);

      // Mettre à jour le statut localement
      setVulnerabilities(prev => prev.map(v => 
        v.id === vuln.id ? { ...v, status: 'CLOSED' } : v
      ));

      // Appel API pour mettre à jour le statut (remplacer par ton API réelle)
      const response = await fetch('/api/sentinel-zero/mitigation', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vulnerabilityId: vuln.id,
          status: 'CLOSED'
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la fermeture');
      console.error('Erreur lors de la fermeture:', err);
      
      // Restaurer le statut en cas d'erreur
      setVulnerabilities(prev => prev.map(v => 
        v.id === vuln.id ? { ...v, status: 'VERIFIED' } : v
      ));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Rafraîchissement des données
  const refreshData = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  // Ingestion de nouveaux findings
  const ingestFindings = useCallback(async (findings: Vulnerability[]) => {
    try {
      setIsLoading(true);
      setError(null);

      // Préparer les données pour l'ingestion
      const payload = {
        target: 'sentinel-zero-internal',
        scanner: 'sentinel-zero-scanner',
        findings: findings.map(finding => ({
          ...finding,
          id: undefined, // L'API générera un nouvel ID
          status: 'OPEN',
          timestamp: new Date().toISOString()
        }))
      };

      // Appel API pour ingérer les findings
      const response = await fetch('/api/sentinel-zero/mitigation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status === 'success') {
        // Ajouter les nouvelles vulnérabilités
        setVulnerabilities(prev => [...prev, ...data.data.vulnerabilities]);
        
        // Ajouter les nouvelles mitigations
        setMitigations(prev => [...prev, ...data.data.mitigations]);
        
        console.log(`${data.data.vulnerabilities.length} nouvelles vulnérabilités ingérées`);
      } else {
        throw new Error(data.message || 'Erreur lors de l\'ingestion');
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'ingestion');
      console.error('Erreur lors de l\'ingestion des findings:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    vulnerabilities,
    mitigations,
    stats,
    isLoading,
    error,
    applyMitigation,
    verifyMitigation,
    closeVulnerability,
    refreshData,
    ingestFindings,
  };
} 