'use client';

import { useSession } from '@/components/providers/SessionProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, Star } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';

interface SubscriptionGuardProps {
  children: ReactNode;
  requiredPlan?: 'basic' | 'pro' | 'enterprise';
  fallback?: ReactNode;
}

export function SubscriptionGuard({ 
  children, 
  requiredPlan = 'basic',
  fallback 
}: SubscriptionGuardProps) {
  const [isClient, setIsClient] = useState(false);
  const [sessionData, setSessionData] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    try {
      const { hasSubscription, setShowSubscriptionModal } = useSession();
      setSessionData({ hasSubscription, setShowSubscriptionModal });
    } catch (error) {
      // Ignore useSession error during SSR
      setSessionData({ hasSubscription: true, setShowSubscriptionModal: () => {} });
    }
  }, []);

  // During SSR or before client hydration, render children
  if (!isClient || !sessionData) {
    return <>{children}</>;
  }

  const { hasSubscription, setShowSubscriptionModal } = sessionData;

  if (!hasSubscription) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Accès Premium requis</CardTitle>
            <p className="text-gray-600 mt-2">
              Cette fonctionnalité nécessite un abonnement premium pour y accéder.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="border rounded-lg p-4 hover:border-purple-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">Plan Basic</h3>
                  <span className="text-2xl font-bold text-purple-600">29€</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">/mois</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-2" />
                    Accès aux démos de base
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-2" />
                    Support email
                  </li>
                </ul>
              </div>

              <div className="border-2 border-purple-500 rounded-lg p-4 bg-purple-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">Plan Pro</h3>
                  <span className="text-2xl font-bold text-purple-600">79€</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">/mois</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-2" />
                    Tout du plan Basic
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-2" />
                    Accès complet aux services
                  </li>
                </ul>
              </div>

              <div className="border rounded-lg p-4 hover:border-purple-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">Plan Enterprise</h3>
                  <span className="text-2xl font-bold text-purple-600">199€</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">/mois</p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-2" />
                    Tout du plan Pro
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-2" />
                    Support dédié 24/7
                  </li>
                </ul>
              </div>
            </div>

            <Button 
              onClick={() => setShowSubscriptionModal(true)}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              size="lg"
            >
              <Crown className="w-5 h-5 mr-2" />
              Souscrire maintenant
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
} 