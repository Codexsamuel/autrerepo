import { useCallback, useEffect, useState } from 'react';

interface UserCredits {
  userId: string;
  freeCreditsRemaining: number;
  paidCreditsRemaining: number;
  subscriptionPlan?: string;
  subscriptionEndDate?: Date;
  lastResetDate: Date;
}

interface CreditConsumptionResult {
  success: boolean;
  message: string;
  remainingCredits: number;
}

export function useCredits(userId: string) {
  const [credits, setCredits] = useState<UserCredits | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Charger les crédits
  const loadCredits = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/subscription?action=credits&userId=${userId}`);
      const data = await response.json();
      
      if (data.success) {
        setCredits(data.data);
      } else {
        setError(data.error || 'Erreur lors du chargement des crédits');
      }
    } catch (err: any) {
      setError(err.message || 'Erreur réseau');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Consommer un crédit
  const consumeCredit = useCallback(async (): Promise<CreditConsumptionResult> => {
    try {
      const response = await fetch('/api/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'consume-credit',
          userId
        })
      });

      const data = await response.json();
      
      if (data.success) {
        // Recharger les crédits après consommation
        await loadCredits();
        return data.data;
      } else {
        throw new Error(data.error || 'Erreur lors de la consommation du crédit');
      }
    } catch (err: any) {
      throw new Error(err.message || 'Erreur réseau');
    }
  }, [userId, loadCredits]);

  // Vérifier si l'utilisateur peut utiliser un service
  const canUseService = useCallback(() => {
    if (!credits) return false;
    const totalCredits = credits.freeCreditsRemaining + credits.paidCreditsRemaining;
    return totalCredits > 0;
  }, [credits]);

  // Obtenir le nombre total de crédits
  const getTotalCredits = useCallback(() => {
    if (!credits) return 0;
    return credits.freeCreditsRemaining + credits.paidCreditsRemaining;
  }, [credits]);

  // Vérifier si les crédits sont faibles
  const isLowCredits = useCallback(() => {
    return getTotalCredits() <= 1;
  }, [getTotalCredits]);

  // Charger les crédits au montage
  useEffect(() => {
    if (userId) {
      loadCredits();
    }
  }, [userId, loadCredits]);

  return {
    credits,
    loading,
    error,
    consumeCredit,
    canUseService,
    getTotalCredits,
    isLowCredits,
    reloadCredits: loadCredits
  };
} 