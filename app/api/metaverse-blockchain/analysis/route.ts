
import { MetaverseBlockchainService } from '@/lib/ai/metaverse-blockchain-service';
import { NextRequest, NextResponse } from 'next/server';

export const revalidate = false;

const metaverseBlockchainService = new MetaverseBlockchainService({
  enableBlockchainAnalysis: true,
  enableMetaverseAnalysis: true,
  enableNFTIntelligence: true,
  enableDeFiAnalysis: true,
  enableWeb3Insights: true,
  blockchainNetworks: ['ethereum', 'bitcoin', 'polygon', 'solana', 'cardano', 'avalanche', 'arbitrum'],
  metaversePlatforms: ['decentraland', 'sandbox', 'roblox', 'fortnite', 'vrchat', 'horizon', 'spatial']
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, config } = body;

    if (!query) {
      return NextResponse.json({
        success: false,
        error: 'Query requise'
      }, { status: 400 });
    }

    console.log(`🌐 Analyse Métaverse + Blockchain POST: ${query}`);

    // Configuration personnalisée si fournie
    if (config) {
      Object.assign(metaverseBlockchainService, config);
    }

    // Analyse complète
    const analysis = await metaverseBlockchainService.comprehensiveAnalysis(query);

    return NextResponse.json({
      success: true,
      data: analysis,
      metadata: {
        query,
        analysisTime: new Date().toISOString(),
        confidence: analysis.confidence,
        blockchainScore: analysis.blockchainScore,
        metaverseScore: analysis.metaverseScore,
        totalNetworks: Object.keys(analysis.blockchainAnalysis?.networks || {}).length,
        totalPlatforms: Object.keys(analysis.metaverseAnalysis?.platforms || {}).length
      }
    });

  } catch (error) {
    console.error('Erreur Métaverse + Blockchain API:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de l\'analyse Métaverse + Blockchain',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const enableBlockchain = searchParams.get('blockchain') !== 'false';
    const enableMetaverse = searchParams.get('metaverse') !== 'false';
    const enableNFT = searchParams.get('nft') !== 'false';
    const enableDeFi = searchParams.get('defi') !== 'false';
    const enableWeb3 = searchParams.get('web3') !== 'false';

    if (!query) {
      return NextResponse.json({
        success: false,
        error: 'Paramètre "q" (query) requis'
      }, { status: 400 });
    }

    console.log(`🌐 Analyse Métaverse + Blockchain GET: ${query}`);

    // Configuration basée sur les paramètres
    const config = {
      enableBlockchainAnalysis: enableBlockchain,
      enableMetaverseAnalysis: enableMetaverse,
      enableNFTIntelligence: enableNFT,
      enableDeFiAnalysis: enableDeFi,
      enableWeb3Insights: enableWeb3
    };

    Object.assign(metaverseBlockchainService, config);

    // Analyse complète
    const analysis = await metaverseBlockchainService.comprehensiveAnalysis(query);

    return NextResponse.json({
      success: true,
      data: analysis,
      metadata: {
        query,
        analysisTime: new Date().toISOString(),
        confidence: analysis.confidence,
        blockchainScore: analysis.blockchainScore,
        metaverseScore: analysis.metaverseScore,
        config
      }
    });

  } catch (error) {
    console.error('Erreur Métaverse + Blockchain API GET:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de l\'analyse Métaverse + Blockchain',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 