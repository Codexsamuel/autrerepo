import { IndustrialProduct } from '@/types/product';
import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const origin = searchParams.get('origin');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Charger les produits depuis le fichier JSON
    let products: IndustrialProduct[] = [];
    
    try {
      const data = await fs.readFile('data/products.json', 'utf8');
      const catalog = JSON.parse(data);
      
      // Filtrer les produits industriels
      products = catalog.products.filter((p: any) => 
        p.category && ['industrial', 'technology', 'machinery', 'electronics', 'tools'].includes(p.category)
      );
    } catch (error) {
      // Si le fichier n'existe pas, retourner des produits d'exemple
      products = generateSampleProducts();
    }

    // Appliquer les filtres
    if (category && category !== 'all') {
      products = products.filter(p => p.category === category);
    }

    if (origin && origin !== 'all') {
      products = products.filter(p => p.origin === origin);
    }

    // Appliquer la pagination
    const paginatedProducts = products.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      data: {
        products: paginatedProducts,
        total: products.length,
        limit,
        offset,
        hasMore: offset + limit < products.length
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
      price: 2199.99,
      originalPrice: 2499.99,
      rating: 4.8,
      reviews: 1250,
      image: '/images/products/drone-mavic-3.jpg',
      category: 'technology',
      brand: 'DJI',
      inStock: true,
      fastDelivery: true,
      discount: 12,
      origin: 'china',
      supplier: 'DJI Official Store',
      minimumOrder: 1,
      leadTime: '3-5 days',
      specifications: {
        'Flight Time': '43 minutes',
        'Max Speed': '47 mph',
        'Camera': '4K Hasselblad'
      }
    },
    {
      id: 'industrial-2',
      name: '3D Printer Creality Ender 3 V3 SE',
      price: 199.99,
      originalPrice: 249.99,
      rating: 4.6,
      reviews: 890,
      image: '/images/products/3d-printer-ender3.jpg',
      category: 'technology',
      brand: 'Creality',
      inStock: true,
      fastDelivery: true,
      discount: 20,
      origin: 'china',
      supplier: 'Creality 3D',
      minimumOrder: 1,
      leadTime: '7-10 days',
      specifications: {
        'Build Volume': '220x220x250mm',
        'Layer Height': '0.1-0.4mm',
        'Nozzle': '0.4mm'
      }
    },
    {
      id: 'industrial-3',
      name: 'Industrial CNC Router 3018',
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.4,
      reviews: 567,
      image: '/images/products/cnc-router-3018.jpg',
      category: 'machinery',
      brand: 'Generic',
      inStock: true,
      fastDelivery: false,
      discount: 25,
      origin: 'china',
      supplier: 'CNC Factory Direct',
      minimumOrder: 5,
      leadTime: '15-20 days',
      specifications: {
        'Working Area': '300x180x45mm',
        'Spindle Speed': '7750 RPM',
        'Material': 'Aluminum, Wood, Plastic'
      }
    },
    {
      id: 'industrial-4',
      name: 'Electronic Components Kit Arduino',
      price: 45.99,
      originalPrice: 59.99,
      rating: 4.7,
      reviews: 2340,
      image: '/images/products/arduino-kit.jpg',
      category: 'electronics',
      brand: 'Arduino',
      inStock: true,
      fastDelivery: true,
      discount: 23,
      origin: 'italy',
      supplier: 'Arduino Store',
      minimumOrder: 1,
      leadTime: '5-7 days',
      specifications: {
        'Microcontroller': 'ATmega328P',
        'Digital I/O': '14 pins',
        'Analog Inputs': '6 pins'
      }
    },
    {
      id: 'industrial-5',
      name: 'Professional Tool Set 150 Pieces',
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.5,
      reviews: 789,
      image: '/images/products/tool-set.jpg',
      category: 'tools',
      brand: 'Professional Tools',
      inStock: true,
      fastDelivery: true,
      discount: 31,
      origin: 'germany',
      supplier: 'German Tool Works',
      minimumOrder: 1,
      leadTime: '3-5 days',
      specifications: {
        'Pieces': '150',
        'Case': 'Heavy Duty',
        'Warranty': 'Lifetime'
      }
    },
    {
      id: 'industrial-6',
      name: 'Industrial Safety Equipment Set',
      price: 156.99,
      originalPrice: 199.99,
      rating: 4.6,
      reviews: 445,
      image: '/images/products/safety-equipment.jpg',
      category: 'industrial',
      brand: 'SafetyPro',
      inStock: true,
      fastDelivery: true,
      discount: 22,
      origin: 'usa',
      supplier: 'Safety Equipment Co',
      minimumOrder: 10,
      leadTime: '7-10 days',
      specifications: {
        'Helmet': 'ANSI Z89.1 Certified',
        'Gloves': 'Cut Resistant',
        'Goggles': 'UV Protection'
      }
    }
  ];
} 