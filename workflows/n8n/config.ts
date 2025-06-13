export const n8nConfig = {
  baseUrl: process.env.N8N_BASE_URL || "http://localhost:5678",
  apiKey: process.env.N8N_API_KEY,
  webhookBaseUrl: process.env.N8N_WEBHOOK_BASE_URL || "http://localhost:5678/webhook",
}

export const workflowCategories = {
  automation: {
    name: "Automatisation",
    description: "Workflows d'automatisation des tâches récurrentes",
    icon: "⚡",
  },
  integration: {
    name: "Intégration",
    description: "Workflows d'intégration entre services",
    icon: "🔄",
  },
  notification: {
    name: "Notification",
    description: "Workflows de notification et d'alerte",
    icon: "🔔",
  },
}

export const defaultWorkflows = [
  {
    id: "wf-001",
    name: "Synchronisation NovaWorld",
    description: "Synchronise les données utilisateurs entre NovaWorld et les autres services",
    category: "integration",
    schedule: "0 */1 * * *", // Toutes les heures
    nodes: [
      {
        type: "n8n-nodes-base.httpRequest",
        parameters: {
          url: "{{$env.NOVAWORLD_API_URL}}/users",
          method: "GET",
        },
      },
      {
        type: "n8n-nodes-base.set",
        parameters: {
          values: {
            string: [
              {
                name: "lastSync",
                value: "={{$now}}",
              },
            ],
          },
        },
      },
    ],
  },
  {
    id: "wf-002",
    name: "Rapport DL Style",
    description: "Génère et envoie les rapports de ventes quotidiens",
    category: "automation",
    schedule: "0 0 * * *", // Tous les jours à minuit
    nodes: [
      {
        type: "n8n-nodes-base.httpRequest",
        parameters: {
          url: "{{$env.DL_STYLE_API_URL}}/reports/daily",
          method: "GET",
        },
      },
      {
        type: "n8n-nodes-base.emailSend",
        parameters: {
          to: "{{$env.ADMIN_EMAIL}}",
          subject: "Rapport quotidien DL Style",
          text: "={{$json}}",
        },
      },
    ],
  },
  {
    id: "wf-003",
    name: "Notifications DL Travel",
    description: "Envoie des notifications pour les vols en retard",
    category: "notification",
    schedule: "*/15 * * * *", // Toutes les 15 minutes
    nodes: [
      {
        type: "n8n-nodes-base.httpRequest",
        parameters: {
          url: "{{$env.DL_TRAVEL_API_URL}}/flights/delayed",
          method: "GET",
        },
      },
      {
        type: "n8n-nodes-base.if",
        parameters: {
          conditions: {
            boolean: [
              {
                value1: "={{$json.length}}",
                operation: "larger",
                value2: 0,
              },
            ],
          },
        },
      },
      {
        type: "n8n-nodes-base.discord",
        parameters: {
          channel: "{{$env.DISCORD_CHANNEL_ID}}",
          text: "={{$json}}",
        },
      },
    ],
  },
  {
    id: "wf-004",
    name: "Analyse DL Bookmaker",
    description: "Analyse les tendances de paris et génère des rapports",
    category: "automation",
    schedule: "0 23 * * *", // Tous les jours à 23h
    nodes: [
      {
        type: "n8n-nodes-base.httpRequest",
        parameters: {
          url: "{{$env.DL_BOOKMAKER_API_URL}}/analytics/daily",
          method: "GET",
        },
      },
      {
        type: "n8n-nodes-base.function",
        parameters: {
          functionCode: `
            const data = $input.item.json;
            const analysis = {
              totalBets: data.length,
              winRate: data.filter(bet => bet.status === 'won').length / data.length,
              averageOdds: data.reduce((acc, bet) => acc + bet.odds, 0) / data.length,
            };
            return { json: analysis };
          `,
        },
      },
      {
        type: "n8n-nodes-base.emailSend",
        parameters: {
          to: "{{$env.ADMIN_EMAIL}}",
          subject: "Analyse quotidienne DL Bookmaker",
          text: "={{$json}}",
        },
      },
    ],
  },
] 