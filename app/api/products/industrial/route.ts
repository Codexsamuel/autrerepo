export const revalidate = false;
import { IndustrialProduct } from '@/types/industrial';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Pour l'export statique, retourner des données statiques
    const products = generateSampleProducts();

    return NextResponse.json({
      success: true,
      data: {
        products: products,
        total: products.length,
        limit: products.length,
        offset: 0,
        hasMore: false
      }
    });

  } catch (error) {
    console.error('Error fetching industrial products:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Error fetching industrial products',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

function generateSampleProducts(): IndustrialProduct[] {
  return [
    {
      id: 'industrial-1',
      name: 'Drone DJI Mavic 3 Pro',
      description: 'Drone professionnel avec caméra 4K Hasselblad, autonomie 43 min, idéal pour l’industrie et l’agriculture.',
      price: 2199.99,
      originalPrice: 2499.99,
      currency: 'EUR',
      rating: 4.8,
      reviews: 1250,
      images: ['/images/products/drone-mavic-3.jpg'],
      category: 'technology',
      brand: 'DJI',
      inStock: true,
      fastDelivery: true,
      discount: 12,
      origin: 'china',
      supplier: 'DJI Official Store',
      minimumOrder: 1,
      leadTime: '3-5 days',
      availability: true,
      tags: ['drone', '4k', 'agriculture', 'industrie'],
      createdAt: '2024-07-20T00:00:00Z',
      updatedAt: '2024-07-20T00:00:00Z',
      specifications: {
        'Flight Time': '43 minutes',
        'Max Speed': '47 mph',
        'Camera': '4K Hasselblad'
      }
    },
    {
      id: 'industrial-2',
      name: '3D Printer Creality Ender 3 V3 SE',
      description: 'Imprimante 3D performante pour prototypage rapide et production industrielle.',
      price: 199.99,
      originalPrice: 249.99,
      currency: 'EUR',
      rating: 4.6,
      reviews: 890,
      images: ['/images/products/3d-printer-ender3.jpg'],
      category: 'technology',
      brand: 'Creality',
      inStock: true,
      fastDelivery: true,
      discount: 20,
      origin: 'china',
      supplier: 'Creality 3D',
      minimumOrder: 1,
      leadTime: '7-10 days',
      availability: true,
      tags: ['imprimante', '3d', 'prototypage', 'industrie'],
      createdAt: '2024-07-20T00:00:00Z',
      updatedAt: '2024-07-20T00:00:00Z',
      specifications: {
        'Build Volume': '220x220x250mm',
        'Layer Height': '0.1-0.4mm',
        'Nozzle': '0.4mm'
      }
    },
    {
      id: 'industrial-3',
      name: 'Industrial CNC Router 3018',
      description: 'Fraiseuse CNC compacte pour la découpe et la gravure de matériaux variés.',
      price: 299.99,
      originalPrice: 399.99,
      currency: 'EUR',
      rating: 4.4,
      reviews: 567,
      images: ['/images/products/cnc-router-3018.jpg'],
      category: 'machinery',
      brand: 'Generic',
      inStock: true,
      fastDelivery: false,
      discount: 25,
      origin: 'china',
      supplier: 'CNC Factory Direct',
      minimumOrder: 5,
      leadTime: '15-20 days',
      availability: true,
      tags: ['cnc', 'fraiseuse', 'gravure', 'industrie'],
      createdAt: '2024-07-20T00:00:00Z',
      updatedAt: '2024-07-20T00:00:00Z',
      specifications: {
        'Working Area': '300x180x45mm',
        'Spindle Speed': '7750 RPM',
        'Material': 'Aluminum, Wood, Plastic'
      }
    },
    {
      id: 'industrial-4',
      name: 'Electronic Components Kit Arduino',
      description: 'Kit complet de composants électroniques pour prototypage et formation.',
      price: 45.99,
      originalPrice: 59.99,
      currency: 'EUR',
      rating: 4.7,
      reviews: 2340,
      images: ['/images/products/arduino-kit.jpg'],
      category: 'electronics',
      brand: 'Arduino',
      inStock: true,
      fastDelivery: true,
      discount: 23,
      origin: 'italy',
      supplier: 'Arduino Store',
      minimumOrder: 1,
      leadTime: '5-7 days',
      availability: true,
      tags: ['arduino', 'électronique', 'prototypage', 'formation'],
      createdAt: '2024-07-20T00:00:00Z',
      updatedAt: '2024-07-20T00:00:00Z',
      specifications: {
        'Microcontroller': 'ATmega328P',
        'Digital I/O': '14 pins',
        'Analog Inputs': '6 pins'
      }
    },
    {
      id: 'industrial-5',
      name: 'Professional Tool Set 150 Pieces',
      description: 'Coffret d’outils professionnels pour maintenance industrielle et ateliers.',
      price: 129.99,
      originalPrice: 179.99,
      currency: 'EUR',
      rating: 4.5,
      reviews: 789,
      images: ['/images/products/tool-set.jpg'],
      category: 'tools',
      brand: 'Professional Tools',
      inStock: true,
      fastDelivery: true,
      discount: 28,
      origin: 'germany',
      supplier: 'ProTools Europe',
      minimumOrder: 1,
      leadTime: '3-5 days',
      availability: true,
      tags: ['outils', 'professionnels', 'set', 'allemand'],
      createdAt: '2024-07-20T00:00:00Z',
      updatedAt: '2024-07-20T00:00:00Z',
      specifications: {
        'Pieces': '150',
        'Material': 'Chrome Vanadium',
        'Case': 'ABS Hard Case'
      }
    },
    {
      id: 'industrial-6',
      name: 'Industrial Safety Equipment Set',
      description: 'Kit complet d’équipement de sécurité pour sites industriels et chantiers.',
      price: 89.99,
      originalPrice: 119.99,
      currency: 'EUR',
      rating: 4.6,
      reviews: 445,
      images: ['/images/products/safety-equipment.jpg'],
      category: 'industrial',
      brand: 'SafetyPro',
      inStock: true,
      fastDelivery: true,
      discount: 25,
      origin: 'usa',
      supplier: 'SafetyPro Inc.',
      minimumOrder: 10,
      leadTime: '7-10 days',
      availability: true,
      tags: ['équipement', 'sécurité', 'usa'],
      createdAt: '2024-07-20T00:00:00Z',
      updatedAt: '2024-07-20T00:00:00Z',
      specifications: {
        'Helmet': 'ANSI Z89.1 Certified',
        'Gloves': 'Nitrile, EN388',
        'Vest': 'High Visibility',
        'Boots': 'Steel Toe'
      }
    }
  ];
} 