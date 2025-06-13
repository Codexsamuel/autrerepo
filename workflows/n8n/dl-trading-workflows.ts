export const dlTradingWorkflows = [
  {
    id: "dt-001",
    name: "Analyse des marchés",
    description: "Analyse en temps réel des marchés financiers",
    schedule: "*/5 * * * *", // Toutes les 5 minutes
    nodes: [
      {
        type: "n8n-nodes-base.httpRequest",
        parameters: {
          url: "{{$env.DL_TRADING_API_URL}}/markets/analysis",
          method: "GET",
        },
      },
      {
        type: "n8n-nodes-base.function",
        parameters: {
          functionCode: `
            const data = $input.item.json;
            const analysis = {
              marketTrend: data.trend,
              volatility: data.volatility,
              topPerformers: data.assets.slice(0, 5),
              riskLevel: data.riskLevel,
              opportunities: data.opportunities,
            };
            return { json: analysis };
          `,
        },
      },
      {
        type: "n8n-nodes-base.discord",
        parameters: {
          channel: "{{$env.DISCORD_CHANNEL_ID}}",
          text: "📊 Analyse des marchés:\nTendance: {{$json.marketTrend}}\nVolatilité: {{$json.volatility}}\nNiveau de risque: {{$json.riskLevel}}",
        },
      },
    ],
  },
  {
    id: "dt-002",
    name: "Recommandations de trading",
    description: "Génère des recommandations de trading basées sur l'analyse",
    schedule: "0 */1 * * *", // Toutes les heures
    nodes: [
      {
        type: "n8n-nodes-base.httpRequest",
        parameters: {
          url: "{{$env.DL_TRADING_API_URL}}/recommendations/generate",
          method: "POST",
        },
      },
      {
        type: "n8n-nodes-base.function",
        parameters: {
          functionCode: `
            const data = $input.item.json;
            const recommendations = {
              assets: data.assets.map(asset => ({
                symbol: asset.symbol,
                action: asset.recommendation,
                confidence: asset.confidence,
                reason: asset.reason,
                targetPrice: asset.targetPrice,
                stopLoss: asset.stopLoss,
              })),
              marketContext: data.marketContext,
              riskLevel: data.riskLevel,
            };
            return { json: recommendations };
          `,
        },
      },
      {
        type: "n8n-nodes-base.emailSend",
        parameters: {
          to: "{{$env.ADMIN_EMAIL}}",
          subject: "Recommandations de trading",
          text: "={{$json}}",
        },
      },
    ],
  },
  {
    id: "dt-003",
    name: "Analyse de performance",
    description: "Analyse la performance des recommandations",
    schedule: "0 0 * * *", // Tous les jours à minuit
    nodes: [
      {
        type: "n8n-nodes-base.httpRequest",
        parameters: {
          url: "{{$env.DL_TRADING_API_URL}}/performance/analysis",
          method: "GET",
        },
      },
      {
        type: "n8n-nodes-base.function",
        parameters: {
          functionCode: `
            const data = $input.item.json;
            const performance = {
              accuracy: data.correct / data.total,
              profitLoss: data.profitLoss,
              bestPerformingAssets: data.assets.slice(0, 5),
              riskAdjustedReturn: data.riskAdjustedReturn,
            };
            return { json: performance };
          `,
        },
      },
      {
        type: "n8n-nodes-base.emailSend",
        parameters: {
          to: "{{$env.ADMIN_EMAIL}}",
          subject: "Analyse de performance quotidienne",
          text: "={{$json}}",
        },
      },
    ],
  },
  {
    id: "dt-004",
    name: "Alertes de marché",
    description: "Surveille et alerte sur les opportunités de trading",
    schedule: "*/1 * * * *", // Toutes les minutes
    nodes: [
      {
        type: "n8n-nodes-base.httpRequest",
        parameters: {
          url: "{{$env.DL_TRADING_API_URL}}/alerts/market",
          method: "GET",
        },
      },
      {
        type: "n8n-nodes-base.if",
        parameters: {
          conditions: {
            boolean: [
              {
                value1: "={{$json.hasAlerts}}",
                operation: "equal",
                value2: true,
              },
            ],
          },
        },
      },
      {
        type: "n8n-nodes-base.discord",
        parameters: {
          channel: "{{$env.DISCORD_CHANNEL_ID}}",
          text: "🚨 Alerte de trading:\n{{$json.message}}\nAction recommandée: {{$json.recommendation}}\nConfiance: {{$json.confidence}}%",
        },
      },
    ],
  },
] 