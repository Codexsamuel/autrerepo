export const revalidate = false;
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Vérifier si l'utilisateur est authentifié
    // Pour l'instant, retourner des données simulées
    
    // Simuler des données SEO
    const seoData = {
      domainAuthority: 42,
      pageSpeed: 87,
      mobileScore: 92,
      desktopScore: 89,
      keywords: 234,
      ranking: 15,
      backlinks: 1560,
      topKeywords: [
        {
          keyword: 'développement web',
          position: 3,
          volume: 12000,
          change: 2
        },
        {
          keyword: 'trading platform',
          position: 8,
          volume: 8900,
          change: -1
        },
        {
          keyword: 'services informatiques',
          position: 12,
          volume: 6700,
          change: 5
        },
        {
          keyword: 'formation trading',
          position: 5,
          volume: 5400,
          change: 0
        },
        {
          keyword: 'solutions digitales',
          position: 18,
          volume: 3200,
          change: 3
        }
      ],
      searchPerformance: {
        clicks: 3450,
        impressions: 125000,
        ctr: 2.76,
        averagePosition: 15.3
      },
      technicalIssues: [
        {
          type: 'Pages avec erreurs 404',
          count: 3,
          severity: 'medium' as const,
          description: 'Pages supprimées mais encore référencées'
        },
        {
          type: 'Images sans alt text',
          count: 12,
          severity: 'low' as const,
          description: 'Images sans attribut alt pour l\'accessibilité'
        },
        {
          type: 'Liens cassés',
          count: 2,
          severity: 'high' as const,
          description: 'Liens externes retournant des erreurs'
        }
      ],
      pageSpeedIssues: [
        {
          issue: 'Images non optimisées',
          impact: 'medium' as const,
          description: 'Certaines images pourraient être compressées'
        },
        {
          issue: 'CSS non minifié',
          impact: 'low' as const,
          description: 'Fichiers CSS pourraient être optimisés'
        },
        {
          issue: 'JavaScript bloquant',
          impact: 'high' as const,
          description: 'Scripts JavaScript bloquent le rendu'
        }
      ]
    };

    return NextResponse.json({
      success: true,
      data: seoData
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des données SEO:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Erreur lors de la récupération des données' 
      },
      { status: 500 }
    );
  }
} 