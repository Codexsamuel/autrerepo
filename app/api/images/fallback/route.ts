export const revalidate = false;
import { NextResponse } from "next/server";

export async function GET() {
  // SVG générique pour les images manquantes (mode statique)
  const svg = `
    <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" fill="#f3f4f6"/>
      <text x="200" y="200" font-family="Arial, sans-serif" font-size="16" fill="#6b7280" text-anchor="middle" dy=".3em">
        Image non disponible
      </text>
      <text x="200" y="220" font-family="Arial, sans-serif" font-size="12" fill="#9ca3af" text-anchor="middle">
        Mode statique
      </text>
    </svg>
  `;
  
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
} 