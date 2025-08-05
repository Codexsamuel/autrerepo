import { faceSwapWithUrls, getFaceSwapStats } from '@/lib/ai/faceswap-api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'stats') {
      return NextResponse.json({
        success: true,
        data: getFaceSwapStats(),
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({
      success: true,
      data: getFaceSwapStats(),
      message: 'Utilisez POST pour les requêtes de transformation',
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur interne du serveur',
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sourceImageUrl, targetImageUrl, enhancement_level = 1 } = body;

    if (!sourceImageUrl || !targetImageUrl) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Paramètres "sourceImageUrl" et "targetImageUrl" requis',
          timestamp: new Date().toISOString()
        },
        { status: 400 }
      );
    }

    const result = await faceSwapWithUrls(sourceImageUrl, targetImageUrl, {
      enhancement_level,
      preserve_expression: true,
      preserve_lighting: true,
      output_format: 'jpg',
      quality: 90
    });

    return NextResponse.json({
      success: result.success,
      data: result,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erreur lors de la transformation',
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS pour CORS
 */
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 