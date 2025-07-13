export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  brand: string;
  inStock: boolean;
  fastDelivery: boolean;
  discount?: number;
  description?: string;
}

export interface IndustrialProduct extends Product {
  category: 'industrial' | 'technology' | 'machinery' | 'electronics' | 'tools';
  specifications?: Record<string, string>;
  certifications?: string[];
  origin: 'china' | 'dubai' | 'turkey' | 'germany' | 'japan' | 'usa' | 'italy';
  supplier: string;
  minimumOrder?: number;
  leadTime?: string;
} 