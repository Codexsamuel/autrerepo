export const dlStyleWorkflows = [
  {
    id: "ds-001",
    name: "Gestion des stocks",
    description: "Surveille et met à jour les niveaux de stock",
    schedule: "*/15 * * * *", // Toutes les 15 minutes
    nodes: [
      {
        type: "n8n-nodes-base.httpRequest",
        parameters: {
          url: "{{$env.DL_STYLE_API_URL}}/inventory/levels",
          method: "GET",
        },
      },
      {
        type: "n8n-nodes-base.if",
        parameters: {
          conditions: {
            number: [
              {
                value1: "={{$json.quantity}}",
                operation: "smaller",
                value2: 10,
              },
            ],
          },
        },
      },
      {
        type: "n8n-nodes-base.emailSend",
        parameters: {
          to: "{{$env.ADMIN_EMAIL}}",
          subject: "Alerte stock bas",
          text: "Le produit {{$json.name}} est en stock bas ({{$json.quantity}} unités)",
        },
      },
    ],
  },
  {
    id: "ds-002",
    name: "Rapport de ventes",
    description: "Génère et envoie les rapports de ventes",
    schedule: "0 0 * * *", // Tous les jours à minuit
    nodes: [
      {
        type: "n8n-nodes-base.httpRequest",
        parameters: {
          url: "{{$env.DL_STYLE_API_URL}}/reports/sales",
          method: "GET",
        },
      },
      {
        type: "n8n-nodes-base.function",
        parameters: {
          functionCode: `
            const data = $input.item.json;
            const report = {
              totalSales: data.total,
              topProducts: data.products.slice(0, 5),
              revenueByCategory: data.categories,
            };
            return { json: report };
          `,
        },
      },
      {
        type: "n8n-nodes-base.emailSend",
        parameters: {
          to: "{{$env.ADMIN_EMAIL}}",
          subject: "Rapport de ventes quotidien",
          text: "={{$json}}",
        },
      },
    ],
  },
  {
    id: "ds-003",
    name: "Synchronisation des prix",
    description: "Synchronise les prix avec les fournisseurs",
    schedule: "0 */6 * * *", // Toutes les 6 heures
    nodes: [
      {
        type: "n8n-nodes-base.httpRequest",
        parameters: {
          url: "{{$env.DL_STYLE_API_URL}}/prices/sync",
          method: "POST",
        },
      },
    ],
  },
] 