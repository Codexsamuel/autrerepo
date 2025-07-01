export interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: 'EUR' | 'USD' | 'FCFA';
  estimatedDays: string;
  type: 'home' | 'pickup' | 'express';
  available: boolean;
  restrictions?: string[];
}

export interface PickupLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  openingHours: string;
  phone: string;
  available: boolean;
}

export const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: 'home-delivery',
    name: 'Livraison à domicile',
    description: 'Livraison directement à votre adresse au Cameroun',
    price: 15,
    currency: 'EUR',
    estimatedDays: '3-5 jours ouvrables',
    type: 'home',
    available: true,
    restrictions: [
      'Adresse complète requise',
      'Présence obligatoire lors de la livraison',
      'Pièce d\'identité requise'
    ]
  },
  {
    id: 'police-school-pickup',
    name: 'Retrait École de Police',
    description: 'Retrait à nos bureaux - École de Police, Yaoundé',
    price: 0,
    currency: 'EUR',
    estimatedDays: '1-2 jours ouvrables',
    type: 'pickup',
    available: true
  },
  {
    id: 'express-delivery',
    name: 'Livraison Express',
    description: 'Livraison prioritaire en 24-48h',
    price: 35,
    currency: 'EUR',
    estimatedDays: '1-2 jours ouvrables',
    type: 'express',
    available: true,
    restrictions: [
      'Disponible uniquement à Yaoundé et Douala',
      'Frais supplémentaires pour les zones éloignées'
    ]
  },
  {
    id: 'regional-pickup',
    name: 'Points Relais Régionaux',
    description: 'Retrait dans nos points relais régionaux',
    price: 5,
    currency: 'EUR',
    estimatedDays: '2-3 jours ouvrables',
    type: 'pickup',
    available: true
  }
];

export const PICKUP_LOCATIONS: PickupLocation[] = [
  {
    id: 'police-school-yaounde',
    name: 'DL Solutions - École de Police',
    address: 'École de Police',
    city: 'Yaoundé',
    region: 'Centre',
    coordinates: {
      lat: 3.848033,
      lng: 11.502075
    },
    openingHours: 'Lun-Ven: 08:00-18:00, Sam: 09:00-15:00',
    phone: '+237-XXX-XXX-XXX',
    available: true
  },
  {
    id: 'douala-center',
    name: 'DL Solutions - Centre Douala',
    address: 'Centre Commercial Akwa',
    city: 'Douala',
    region: 'Littoral',
    coordinates: {
      lat: 4.0511,
      lng: 9.7679
    },
    openingHours: 'Lun-Ven: 08:00-18:00, Sam: 09:00-15:00',
    phone: '+237-XXX-XXX-XXX',
    available: true
  },
  {
    id: 'bamenda-office',
    name: 'DL Solutions - Bureau Bamenda',
    address: 'Rue Commerciale',
    city: 'Bamenda',
    region: 'Nord-Ouest',
    coordinates: {
      lat: 5.9597,
      lng: 10.1460
    },
    openingHours: 'Lun-Ven: 08:00-17:00, Sam: 09:00-14:00',
    phone: '+237-XXX-XXX-XXX',
    available: true
  },
  {
    id: 'bafoussam-office',
    name: 'DL Solutions - Bureau Bafoussam',
    address: 'Avenue de l\'Indépendance',
    city: 'Bafoussam',
    region: 'Ouest',
    coordinates: {
      lat: 5.4667,
      lng: 10.4167
    },
    openingHours: 'Lun-Ven: 08:00-17:00, Sam: 09:00-14:00',
    phone: '+237-XXX-XXX-XXX',
    available: true
  }
];

export const DELIVERY_ZONES = {
  'yaounde': {
    name: 'Yaoundé',
    deliveryFee: 10,
    expressFee: 25,
    estimatedDays: '1-2 jours'
  },
  'douala': {
    name: 'Douala',
    deliveryFee: 12,
    expressFee: 30,
    estimatedDays: '1-2 jours'
  },
  'bamenda': {
    name: 'Bamenda',
    deliveryFee: 18,
    expressFee: 40,
    estimatedDays: '2-3 jours'
  },
  'bafoussam': {
    name: 'Bafoussam',
    deliveryFee: 15,
    expressFee: 35,
    estimatedDays: '2-3 jours'
  },
  'other': {
    name: 'Autres régions',
    deliveryFee: 25,
    expressFee: 50,
    estimatedDays: '3-5 jours'
  }
};

export const DELIVERY_RESTRICTIONS = {
  'fragile': {
    name: 'Produits fragiles',
    additionalFee: 10,
    description: 'Emballage spécial et manipulation soigneuse'
  },
  'heavy': {
    name: 'Produits lourds',
    additionalFee: 15,
    description: 'Frais de manutention supplémentaires'
  },
  'large': {
    name: 'Produits volumineux',
    additionalFee: 20,
    description: 'Frais de transport spécial'
  },
  'urgent': {
    name: 'Livraison urgente',
    additionalFee: 30,
    description: 'Livraison prioritaire en 24h'
  }
};

export const getDeliveryFee = (
  zone: string,
  option: string,
  restrictions: string[] = []
): number => {
  const baseFee = DELIVERY_OPTIONS.find(opt => opt.id === option)?.price || 0;
  const zoneFee = DELIVERY_ZONES[zone as keyof typeof DELIVERY_ZONES]?.deliveryFee || 25;
  const restrictionFees = restrictions.reduce((total, restriction) => {
    const restrictionConfig = DELIVERY_RESTRICTIONS[restriction as keyof typeof DELIVERY_RESTRICTIONS];
    return total + (restrictionConfig?.additionalFee || 0);
  }, 0);
  
  return baseFee + zoneFee + restrictionFees;
};

export const getEstimatedDeliveryDate = (option: string, zone: string): Date => {
  const today = new Date();
  const estimatedDays = DELIVERY_OPTIONS.find(opt => opt.id === option)?.estimatedDays || '3-5 jours';
  const days = parseInt(estimatedDays.split('-')[0]);
  
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + days);
  
  // Exclure les weekends
  while (deliveryDate.getDay() === 0 || deliveryDate.getDay() === 6) {
    deliveryDate.setDate(deliveryDate.getDate() + 1);
  }
  
  return deliveryDate;
}; 