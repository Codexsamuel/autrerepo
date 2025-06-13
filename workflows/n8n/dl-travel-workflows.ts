export const dlTravelWorkflows = [
  {
    id: "dt-001",
    name: "Surveillance des vols",
    description: "Surveille les retards et annulations de vols",
    schedule: "*/5 * * * *", // Toutes les 5 minutes
    nodes: [
      {
        type: "n8n-nodes-base.httpRequest",
        parameters: {
          url: "{{$env.DL_TRAVEL_API_URL}}/flights/status",
          method: "GET",
        },
      },
      {
        type: "n8n-nodes-base.if",
        parameters: {
          conditions: {
            boolean: [
              {
                value1: "={{$json.delayed}}",
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
          text: "⚠️ Vol retardé: {{$json.flightNumber}} - Nouvelle heure: {{$json.newTime}}",
        },
      },
    ],
  },
  {
    id: "dt-002",
    name: "Rapport de réservations",
    description: "Génère le rapport des réservations",
    schedule: "0 0 * * *", // Tous les jours à minuit
    nodes: [
      {
        type: "n8n-nodes-base.httpRequest",
        parameters: {
          url: "{{$env.DL_TRAVEL_API_URL}}/bookings/report",
          method: "GET",
        },
      },
      {
        type: "n8n-nodes-base.function",
        parameters: {
          functionCode: `
            const data = $input.item.json;
            const report = {
              totalBookings: data.total,
              revenue: data.revenue,
              popularRoutes: data.routes.slice(0, 5),
              cancellationRate: data.cancellations / data.total,
            };
            return { json: report };
          `,
        },
      },
      {
        type: "n8n-nodes-base.emailSend",
        parameters: {
          to: "{{$env.ADMIN_EMAIL}}",
          subject: "Rapport quotidien des réservations",
          text: "={{$json}}",
        },
      },
    ],
  },
  {
    id: "dt-003",
    name: "Mise à jour des prix",
    description: "Met à jour les prix des billets",
    schedule: "0 */2 * * *", // Toutes les 2 heures
    nodes: [
      {
        type: "n8n-nodes-base.httpRequest",
        parameters: {
          url: "{{$env.DL_TRAVEL_API_URL}}/prices/update",
          method: "POST",
        },
      },
    ],
  },
] 