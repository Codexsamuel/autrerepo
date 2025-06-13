export const dlBookmakerWorkflows = [
  {
    id: "db-001",
    name: "Analyse des prédictions",
    description: "Analyse la performance des prédictions IA",
    schedule: "0 */1 * * *", // Toutes les heures
    nodes: [
      {
        type: "n8n-nodes-base.httpRequest",
        parameters: {
          url: "{{$env.DL_BOOKMAKER_API_URL}}/predictions/analysis",
          method: "GET",
        },
      },
      {
        type: "n8n-nodes-base.function",
        parameters: {
          functionCode: `
            const data = $input.item.json;
            const analysis = {
              accuracy: data.correct / data.total,
              profitLoss: data.profitLoss,
              topPerformingMarkets: data.markets.slice(0, 3),
            };
            return { json: analysis };
          `,
        },
      },
      {
        type: "n8n-nodes-base.emailSend",
        parameters: {
          to: "{{$env.ADMIN_EMAIL}}",
          subject: "Analyse des prédictions",
          text: "={{$json}}",
        },
      },
    ],
  },
  {
    id: "db-002",
    name: "Mise à jour des cotes",
    description: "Met à jour les cotes en temps réel",
    schedule: "*/5 * * * *", // Toutes les 5 minutes
    nodes: [
      {
        type: "n8n-nodes-base.httpRequest",
        parameters: {
          url: "{{$env.DL_BOOKMAKER_API_URL}}/odds/update",
          method: "POST",
        },
      },
    ],
  },
  {
    id: "db-003",
    name: "Rapport de performance",
    description: "Génère le rapport de performance quotidien",
    schedule: "0 23 * * *", // Tous les jours à 23h
    nodes: [
      {
        type: "n8n-nodes-base.httpRequest",
        parameters: {
          url: "{{$env.DL_BOOKMAKER_API_URL}}/performance/report",
          method: "GET",
        },
      },
      {
        type: "n8n-nodes-base.function",
        parameters: {
          functionCode: `
            const data = $input.item.json;
            const report = {
              totalBets: data.total,
              winRate: data.wins / data.total,
              profitLoss: data.profitLoss,
              topMarkets: data.markets.slice(0, 5),
            };
            return { json: report };
          `,
        },
      },
      {
        type: "n8n-nodes-base.emailSend",
        parameters: {
          to: "{{$env.ADMIN_EMAIL}}",
          subject: "Rapport de performance quotidien",
          text: "={{$json}}",
        },
      },
    ],
  },
] 