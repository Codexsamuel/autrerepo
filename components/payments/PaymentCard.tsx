'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PaymentPlan, PaymentType } from '@/lib/payments/novaia-payment-system';
import { Check, Globe, Shield, Star, Users, Zap } from 'lucide-react';
import { useState } from 'react';

interface PaymentCardProps {
  plan: PaymentPlan;
  type: PaymentType;
  name: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  popular?: boolean;
  onSelect: (plan: PaymentPlan, type: PaymentType) => void;
}

const planIcons = {
  [PaymentPlan.FREE]: <Star className="h-5 w-5" />,
  [PaymentPlan.STARTER]: <Zap className="h-5 w-5" />,
  [PaymentPlan.PROFESSIONAL]: <Shield className="h-5 w-5" />,
  [PaymentPlan.ENTERPRISE]: <Users className="h-5 w-5" />,
  [PaymentPlan.CUSTOM]: <Globe className="h-5 w-5" />
};

const planColors = {
  [PaymentPlan.FREE]: 'bg-gray-100 text-gray-800',
  [PaymentPlan.STARTER]: 'bg-blue-100 text-blue-800',
  [PaymentPlan.PROFESSIONAL]: 'bg-purple-100 text-purple-800',
  [PaymentPlan.ENTERPRISE]: 'bg-green-100 text-green-800',
  [PaymentPlan.CUSTOM]: 'bg-orange-100 text-orange-800'
};

export function PaymentCard({
  plan,
  type,
  name,
  description,
  price,
  currency,
  features,
  popular = false,
  onSelect
}: PaymentCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = async () => {
    setIsLoading(true);
    try {
      await onSelect(plan, type);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={`relative w-full max-w-sm transition-all duration-200 hover:shadow-lg ${
      popular ? 'ring-2 ring-primary scale-105' : ''
    }`}>
      {popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
          Plus Populaire
        </Badge>
      )}
      
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-2">
          <div className={`p-2 rounded-full ${planColors[plan]}`}>
            {planIcons[plan]}
          </div>
        </div>
        <CardTitle className="text-xl font-bold">{name}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="text-center">
        <div className="mb-6">
          <span className="text-3xl font-bold">
            {price === 0 ? 'Gratuit' : `${price} ${currency}`}
          </span>
          {price > 0 && (
            <span className="text-muted-foreground">/mois</span>
          )}
        </div>
        
        <ul className="space-y-3 text-left">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button
          onClick={handleSelect}
          disabled={isLoading}
          className="w-full"
          variant={popular ? 'default' : 'outline'}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
              <span>Chargement...</span>
            </div>
          ) : (
            plan === PaymentPlan.FREE ? 'Commencer' : 'Choisir ce plan'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
} 