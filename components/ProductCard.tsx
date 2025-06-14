"use client";
import Image from 'next/image';
import { useState } from 'react';

interface ProductCardProps {
  id: string;
  title: string;
  priceCNY: number;
  priceFCFA: number;
  imageUrl: string;
  source: string;
  deliveryTime: string;
  rating: number;
}

export default function ProductCard({
  id,
  title,
  priceCNY,
  priceFCFA,
  imageUrl,
  source,
  deliveryTime,
  rating
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
        
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">Prix Chine: {priceCNY} ¥</span>
          <span className="text-sm text-gray-500">Livraison: {deliveryTime}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">{priceFCFA} FCFA</span>
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 text-sm">{rating}</span>
          </div>
        </div>

        <button 
          className={`w-full mt-4 py-2 px-4 rounded-lg bg-blue-600 text-white font-medium transition-colors duration-300 ${
            isHovered ? 'bg-blue-700' : ''
          }`}
        >
          Commander
        </button>
      </div>
    </div>
  );
} 