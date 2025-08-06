import { NextRequest, NextResponse } from 'next/server';
import { 
  ULTRA_ADVANCED_AGENTS, 
  getNovaCoreMetrics, 
  toggleAgentStatus, 
  optimizeAgentPerformance,
  runSystemDiagnostic,
  emergencyRedButton,
  synchronizeNetwork
} from '@/lib/services/ultra-advanced-ai';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const agentId = searchParams.get('agentId');

    switch (action) {
      case 'metrics':
        const metrics = getNovaCoreMetrics();
        return NextResponse.json({
          success: true,
          data: metrics
        });

      case 'agents':
        return NextResponse.json({
          success: true,
          data: ULTRA_ADVANCED_AGENTS
        });

      case 'diagnostic':
        const diagnostic = runSystemDiagnostic();
        return NextResponse.json({
          success: true,
          data: diagnostic
        });

      default:
        return NextResponse.json({
          success: true,
          data: {
            agents: ULTRA_ADVANCED_AGENTS,
            metrics: getNovaCoreMetrics(),
            totalAgents: ULTRA_ADVANCED_AGENTS.length,
            activeAgents: ULTRA_ADVANCED_AGENTS.filter(a => a.isActive).length
          }
        });
    }
  } catch (error) {
    console.error('Erreur API Ultra-Advanced:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, agentId, data } = body;

    switch (action) {
      case 'toggle':
        if (!agentId) {
          return NextResponse.json(
            { success: false, error: 'Agent ID requis' },
            { status: 400 }
          );
        }
        const isActive = toggleAgentStatus(agentId);
        return NextResponse.json({
          success: true,
          data: { agentId, isActive }
        });

      case 'optimize':
        if (!agentId) {
          return NextResponse.json(
            { success: false, error: 'Agent ID requis' },
            { status: 400 }
          );
        }
        const optimized = optimizeAgentPerformance(agentId);
        return NextResponse.json({
          success: true,
          data: { agentId, optimized }
        });

      case 'red-button':
        const redButtonActivated = emergencyRedButton();
        return NextResponse.json({
          success: true,
          data: { 
            redButtonActivated,
            message: '🚨 RED BUTTON ACTIVATED - All agents deactivated',
            timestamp: new Date().toISOString()
          }
        });

      case 'sync-network':
        const networkSynced = synchronizeNetwork();
        return NextResponse.json({
          success: true,
          data: { 
            networkSynced,
            message: '🌐 Network synchronization completed',
            timestamp: new Date().toISOString()
          }
        });

      case 'deploy-agent':
        if (!agentId) {
          return NextResponse.json(
            { success: false, error: 'Agent ID requis' },
            { status: 400 }
          );
        }
        const agent = ULTRA_ADVANCED_AGENTS.find(a => a.id === agentId);
        if (!agent) {
          return NextResponse.json(
            { success: false, error: 'Agent non trouvé' },
            { status: 404 }
          );
        }
        agent.isActive = true;
        agent.lastDeployment = new Date().toISOString();
        return NextResponse.json({
          success: true,
          data: { 
            agentId,
            deployed: true,
            deploymentTime: agent.lastDeployment
          }
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Action non reconnue' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Erreur API Ultra-Advanced POST:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
} 