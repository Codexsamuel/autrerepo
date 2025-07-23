export interface IndustrialProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  currency: string;
  supplier: string;
  origin: string;
  brand?: string;
  inStock?: boolean;
  fastDelivery?: boolean;
  discount?: number;
  minimumOrder?: number;
  leadTime?: string;
  specifications: Record<string, any>;
  images: string[];
  availability: boolean;
  rating: number;
  reviews: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
} 