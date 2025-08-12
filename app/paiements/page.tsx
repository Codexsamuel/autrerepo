'use client';

import { PricingPlans } from '@/components/payments/PricingPlans';
import { StripeCheckout } from '@/components/payments/StripeCheckout';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PaymentPlan, PaymentType } from '@/lib/payments/novaia-payment-system';
import { useState } from 'react';

export default function PaiementsPage() {
  const [selectedPlan, setSelectedPlan] = useState<PaymentPlan | null>(null);
  const [selectedType, setSelectedType] = useState<PaymentType | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectPlan = async (plan: PaymentPlan, type: PaymentType) => {
    setSelectedPlan(plan);
    setSelectedType(type);
    setShowCheckout(true);
  };

  const handlePaymentSuccess = (paymentId: string) => {
    setShowCheckout(false);
    // Rediriger vers la page de succès ou dashboard
    window.location.href = `/payment/success?payment_id=${paymentId}`;
  };

  const handlePaymentCancel = () => {
    setShowCheckout(false);
    setSelectedPlan(null);
    setSelectedType(null);
  };

  const getPlanPrice = (plan: PaymentPlan): number => {
    const prices = {
      [PaymentPlan.FREE]: 0,
      [PaymentPlan.STARTER]: 29,
      [PaymentPlan.PROFESSIONAL]: 99,
      [PaymentPlan.ENTERPRISE]: 299,
      [PaymentPlan.CUSTOM]: 0
    };
    return prices[plan] || 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              💳 Paiements NovaIA
            </h1>
            <p className="text-xl text-gray-600">
              Choisissez votre plan et accédez à l'écosystème complet d'agents IA
            </p>
          </div>
        </div>
      </div>

      {/* Plans de paiement */}
      <PricingPlans onSelectPlan={handleSelectPlan} />

      {/* Modal de checkout */}
      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Finaliser votre abonnement</DialogTitle>
          </DialogHeader>
          
          {selectedPlan && selectedType && (
            <StripeCheckout
              plan={selectedPlan}
              type={selectedType}
              amount={getPlanPrice(selectedPlan)}
              currency="€"
              onSuccess={handlePaymentSuccess}
              onCancel={handlePaymentCancel}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Section FAQ */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Questions Fréquentes
        </h2>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Comment fonctionne la facturation ?
            </h3>
            <p className="text-gray-600">
              La facturation se fait mensuellement via Stripe. Vous pouvez annuler votre abonnement 
              à tout moment et il sera actif jusqu'à la fin de la période de facturation.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Puis-je changer de plan ?
            </h3>
            <p className="text-gray-600">
              Oui, vous pouvez changer de plan à tout moment. Le changement prendra effet 
              immédiatement et sera proratisé sur votre prochaine facture.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Y a-t-il des frais cachés ?
            </h3>
            <p className="text-gray-600">
              Non, le prix affiché est le prix final. Aucun frais caché ou de transaction. 
              Tous les prix incluent la TVA applicable.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Comment fonctionne la période d'essai ?
            </h3>
            <p className="text-gray-600">
              Le plan gratuit vous permet de tester NovaIA sans engagement. Pour les plans payants, 
              nous offrons une période d'essai de 14 jours avec remboursement intégral si insatisfait.
            </p>
          </div>
        </div>
      </div>

      {/* Section support */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Besoin d'aide ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Notre équipe est là pour vous accompagner dans votre choix
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors">
              📧 Contact Support
            </button>
            <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              📚 Documentation
            </button>
            <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              💬 Chat en ligne
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 