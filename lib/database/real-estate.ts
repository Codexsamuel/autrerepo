export interface Property {
  id: string;
  title: string;
  type: 'appartement' | 'maison' | 'terrain' | 'bureau' | 'commerce';
  price: number;
  surface: number;
  rooms: number;
  bedrooms: number;
  location: {
    address: string;
    city: string;
    postalCode: string;
    neighborhood: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  features: string[];
  status: 'disponible' | 'vendu' | 'en_negociation' | 'reserve';
  images: string[];
  description: string;
  energyClass: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  createdAt: Date;
  updatedAt: Date;
}

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  budget: {
    min: number;
    max: number;
  };
  preferences: {
    propertyTypes: string[];
    neighborhoods: string[];
    minRooms: number;
    maxRooms: number;
  };
  status: 'actif' | 'inactif' | 'prospect';
  createdAt: Date;
}

export interface ScheduledVisit {
  id: string;
  clientId: string;
  propertyId: string;
  date: Date;
  timeSlot: {
    start: string;
    end: string;
  };
  status: 'programmee' | 'confirmee' | 'annulee' | 'terminee';
  notes: string;
  agentId: string;
  createdAt: Date;
}

export interface Transaction {
  id: string;
  propertyId: string;
  clientId: string;
  type: 'vente' | 'location';
  price: number;
  status: 'en_cours' | 'finalisee' | 'annulee';
  date: Date;
  commission: number;
  agentId: string;
}

// Données simulées pour les biens immobiliers
export const properties: Property[] = [
  {
    id: 'prop-001',
    title: 'Appartement T3 moderne avec terrasse',
    type: 'appartement',
    price: 450000,
    surface: 75,
    rooms: 3,
    bedrooms: 2,
    location: {
      address: '15 Rue de la Paix',
      city: 'Paris',
      postalCode: '75001',
      neighborhood: 'Le Marais',
      coordinates: { lat: 48.8566, lng: 2.3522 }
    },
    features: ['Terrasse', 'Ascenseur', 'Cave', 'Parking'],
    status: 'disponible',
    images: ['/images/properties/prop-001-1.jpg', '/images/properties/prop-001-2.jpg'],
    description: 'Magnifique appartement rénové avec vue dégagée et terrasse privative.',
    energyClass: 'B',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 'prop-002',
    title: 'Maison familiale avec jardin',
    type: 'maison',
    price: 750000,
    surface: 120,
    rooms: 5,
    bedrooms: 3,
    location: {
      address: '28 Avenue des Champs',
      city: 'Lyon',
      postalCode: '69001',
      neighborhood: 'Presqu\'île',
      coordinates: { lat: 45.7578, lng: 4.8320 }
    },
    features: ['Jardin', 'Garage', 'Cave', 'Cheminée'],
    status: 'disponible',
    images: ['/images/properties/prop-002-1.jpg', '/images/properties/prop-002-2.jpg'],
    description: 'Belle maison familiale avec jardin paysager et garage.',
    energyClass: 'C',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: 'prop-003',
    title: 'Terrain constructible 500m²',
    type: 'terrain',
    price: 200000,
    surface: 500,
    rooms: 0,
    bedrooms: 0,
    location: {
      address: '45 Chemin des Oliviers',
      city: 'Marseille',
      postalCode: '13001',
      neighborhood: 'Vieux-Port',
      coordinates: { lat: 43.2965, lng: 5.3698 }
    },
    features: ['Constructible', 'Viabilisé', 'Vue mer'],
    status: 'disponible',
    images: ['/images/properties/prop-003-1.jpg'],
    description: 'Terrain viabilisé avec permis de construire pour maison individuelle.',
    energyClass: 'A',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-12')
  },
  {
    id: 'prop-004',
    title: 'Bureau moderne 80m²',
    type: 'bureau',
    price: 350000,
    surface: 80,
    rooms: 2,
    bedrooms: 0,
    location: {
      address: '12 Boulevard de la République',
      city: 'Toulouse',
      postalCode: '31000',
      neighborhood: 'Centre-ville',
      coordinates: { lat: 43.6047, lng: 1.4442 }
    },
    features: ['Climatisation', 'Ascenseur', 'Parking', 'Sécurité'],
    status: 'disponible',
    images: ['/images/properties/prop-004-1.jpg', '/images/properties/prop-004-2.jpg'],
    description: 'Bureau moderne avec vue panoramique, idéal pour entreprise.',
    energyClass: 'A',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'prop-005',
    title: 'Commerce en centre-ville',
    type: 'commerce',
    price: 550000,
    surface: 150,
    rooms: 3,
    bedrooms: 0,
    location: {
      address: '8 Place du Commerce',
      city: 'Nantes',
      postalCode: '44000',
      neighborhood: 'Centre-ville',
      coordinates: { lat: 47.2184, lng: -1.5536 }
    },
    features: ['Vitrine', 'Arrière-boutique', 'Cave', 'Parking'],
    status: 'disponible',
    images: ['/images/properties/prop-005-1.jpg'],
    description: 'Local commercial en plein centre-ville avec forte affluence.',
    energyClass: 'D',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-19')
  }
];

// Données simulées pour les clients
export const clients: Client[] = [
  {
    id: 'client-001',
    firstName: 'Marie',
    lastName: 'Dubois',
    email: 'marie.dubois@email.com',
    phone: '06 12 34 56 78',
    budget: { min: 400000, max: 600000 },
    preferences: {
      propertyTypes: ['appartement', 'maison'],
      neighborhoods: ['Le Marais', 'Saint-Germain'],
      minRooms: 2,
      maxRooms: 4
    },
    status: 'actif',
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'client-002',
    firstName: 'Pierre',
    lastName: 'Martin',
    email: 'pierre.martin@email.com',
    phone: '06 98 76 54 32',
    budget: { min: 700000, max: 1000000 },
    preferences: {
      propertyTypes: ['maison'],
      neighborhoods: ['Presqu\'île', 'Tête d\'Or'],
      minRooms: 4,
      maxRooms: 6
    },
    status: 'actif',
    createdAt: new Date('2024-01-05')
  },
  {
    id: 'client-003',
    firstName: 'Sophie',
    lastName: 'Bernard',
    email: 'sophie.bernard@email.com',
    phone: '06 45 67 89 01',
    budget: { min: 150000, max: 300000 },
    preferences: {
      propertyTypes: ['terrain'],
      neighborhoods: ['Vieux-Port', 'Prado'],
      minRooms: 0,
      maxRooms: 0
    },
    status: 'prospect',
    createdAt: new Date('2024-01-10')
  }
];

// Données simulées pour les visites programmées
export const scheduledVisits: ScheduledVisit[] = [
  {
    id: 'visit-001',
    clientId: 'client-001',
    propertyId: 'prop-001',
    date: new Date('2024-02-15'),
    timeSlot: { start: '14:00', end: '15:00' },
    status: 'programmee',
    notes: 'Client intéressé par la terrasse, prévoir démonstration climatisation',
    agentId: 'agent-001',
    createdAt: new Date('2024-01-20')
  },
  {
    id: 'visit-002',
    clientId: 'client-002',
    propertyId: 'prop-002',
    date: new Date('2024-02-16'),
    timeSlot: { start: '10:00', end: '11:30' },
    status: 'confirmee',
    notes: 'Famille avec enfants, insister sur la sécurité du quartier',
    agentId: 'agent-002',
    createdAt: new Date('2024-01-21')
  },
  {
    id: 'visit-003',
    clientId: 'client-003',
    propertyId: 'prop-003',
    date: new Date('2024-02-17'),
    timeSlot: { start: '16:00', end: '17:00' },
    status: 'programmee',
    notes: 'Investisseur, présenter les possibilités de construction',
    agentId: 'agent-001',
    createdAt: new Date('2024-01-22')
  }
];

// Données simulées pour les transactions
export const transactions: Transaction[] = [
  {
    id: 'trans-001',
    propertyId: 'prop-001',
    clientId: 'client-001',
    type: 'vente',
    price: 450000,
    status: 'en_cours',
    date: new Date('2024-02-01'),
    commission: 13500,
    agentId: 'agent-001'
  }
];

// Fonctions utilitaires
export const getAvailableProperties = () => {
  return properties.filter(prop => prop.status === 'disponible');
};

export const getScheduledVisits = () => {
  return scheduledVisits.filter(visit => visit.status === 'programmee' || visit.status === 'confirmee');
};

export const getConversionRate = () => {
  const totalVisits = scheduledVisits.length;
  const completedTransactions = transactions.filter(t => t.status === 'finalisee').length;
  return totalVisits > 0 ? Math.round((completedTransactions / totalVisits) * 100) : 0;
};

export const getAveragePrice = () => {
  const availableProps = getAvailableProperties();
  if (availableProps.length === 0) return 0;
  const totalPrice = availableProps.reduce((sum, prop) => sum + prop.price, 0);
  return Math.round(totalPrice / availableProps.length);
};

export const getClientById = (id: string) => {
  return clients.find(client => client.id === id);
};

export const getPropertyById = (id: string) => {
  return properties.find(property => property.id === id);
};

export const getVisitsByClient = (clientId: string) => {
  return scheduledVisits.filter(visit => visit.clientId === clientId);
};

export const getPropertiesInBudget = (minBudget: number, maxBudget: number) => {
  return properties.filter(prop => 
    prop.price >= minBudget && prop.price <= maxBudget && prop.status === 'disponible'
  );
}; 