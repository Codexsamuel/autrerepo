import { AdvancedCodeAnalyzerService } from '@/services/code-analyzer-service';
import { NextRequest, NextResponse } from 'next/server';

const codeAnalyzer = new AdvancedCodeAnalyzerService();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    console.log(`🔧 Code Analyzer API: ${action}`);

    switch (action) {
      case 'analyze-repository':
        const repoResult = await codeAnalyzer.analyzeGitRepository(data.repoUrl);
        return NextResponse.json({
          success: true,
          data: repoResult,
          message: 'Analyse du repository terminée'
        });

      case 'extract-web-code':
        const webResult = await codeAnalyzer.extractWebCode(data.url);
        return NextResponse.json({
          success: true,
          data: webResult,
          message: 'Extraction du code web terminée'
        });

      case 'deep-search':
        const searchResult = await codeAnalyzer.deepSearch(data.query, data.searchType);
        return NextResponse.json({
          success: true,
          data: searchResult,
          message: 'Recherche approfondie terminée'
        });

      case 'analyze-improve-code':
        const codeResult = await codeAnalyzer.analyzeAndImproveCode(data.code, data.language);
        return NextResponse.json({
          success: true,
          data: codeResult,
          message: 'Analyse et amélioration du code terminée'
        });

      default:
        return NextResponse.json({
          success: false,
          error: 'Action non reconnue'
        }, { status: 400 });
    }

  } catch (error: any) {
    console.error('Erreur Code Analyzer API:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Erreur interne du serveur'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const query = searchParams.get('query');
    const url = searchParams.get('url');
    const repoUrl = searchParams.get('repo');
    const searchType = searchParams.get('type') as 'person' | 'company' | 'code' | 'general' || 'general';

    console.log(`🔧 Code Analyzer API GET: ${action}`);

    switch (action) {
      case 'analyze-repository':
        if (!repoUrl) {
          return NextResponse.json({
            success: false,
            error: 'URL du repository requise'
          }, { status: 400 });
        }
        const repoResult = await codeAnalyzer.analyzeGitRepository(repoUrl);
        return NextResponse.json({
          success: true,
          data: repoResult,
          message: 'Analyse du repository terminée'
        });

      case 'extract-web-code':
        if (!url) {
          return NextResponse.json({
            success: false,
            error: 'URL requise'
          }, { status: 400 });
        }
        const webResult = await codeAnalyzer.extractWebCode(url);
        return NextResponse.json({
          success: true,
          data: webResult,
          message: 'Extraction du code web terminée'
        });

      case 'deep-search':
        if (!query) {
          return NextResponse.json({
            success: false,
            error: 'Requête de recherche requise'
          }, { status: 400 });
        }
        const searchResult = await codeAnalyzer.deepSearch(query, searchType);
        return NextResponse.json({
          success: true,
          data: searchResult,
          message: 'Recherche approfondie terminée'
        });

      default:
        return NextResponse.json({
          success: false,
          error: 'Action non reconnue'
        }, { status: 400 });
    }

  } catch (error: any) {
    console.error('Erreur Code Analyzer API GET:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Erreur interne du serveur'
    }, { status: 500 });
  }
} 