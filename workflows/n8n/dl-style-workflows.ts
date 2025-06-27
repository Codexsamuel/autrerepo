import { INodeExecutionData, IWorkflowExecuteAdditionalData } from 'n8n-workflow';

export interface DLStyleWorkflow {
  id: string;
  name: string;
  description: string;
  nodes: any[];
  connections: any[];
  active: boolean;
}

export class DLStyleWorkflowManager {
  private workflows: DLStyleWorkflow[] = [];

  constructor() {
    this.initializeWorkflows();
  }

  private initializeWorkflows() {
    // Workflow 1: Synchronisation des produits AliExpress
    this.workflows.push({
      id: 'aliexpress-sync',
      name: 'Synchronisation AliExpress',
      description: 'Synchronise automatiquement les produits AliExpress vers DL Style',
      active: true,
      nodes: [
        {
          id: 'trigger-schedule',
          type: 'n8n-nodes-base.scheduleTrigger',
          position: [240, 300],
          parameters: {
            rule: {
              interval: [{
                field: 'hour',
                expression: '*/6'
              }]
            }
          }
        },
        {
          id: 'scrape-aliexpress',
          type: 'n8n-nodes-base.httpRequest',
          position: [460, 300],
          parameters: {
            url: 'https://api.aliexpress.com/products',
            method: 'GET',
            headers: {
              'Authorization': 'Bearer {{$env.ALIEXPRESS_API_KEY}}'
            }
          }
        },
        {
          id: 'process-products',
          type: 'n8n-nodes-base.function',
          position: [680, 300],
          parameters: {
            functionCode: `
              const products = $input.all()[0].json;
              const processedProducts = products.map(product => ({
                title: product.title,
                price: product.price,
                imageUrl: product.imageUrl,
                category: product.category,
                tags: product.tags,
                source: 'aliexpress',
                lastUpdated: new Date().toISOString()
              }));
              return processedProducts;
            `
          }
        },
        {
          id: 'save-to-database',
          type: 'n8n-nodes-base.postgres',
          position: [900, 300],
          parameters: {
            operation: 'insert',
            table: 'products',
            columns: 'title, price, image_url, category, tags, source, last_updated'
          }
        }
      ],
      connections: {
        'trigger-schedule': {
          main: [['scrape-aliexpress']]
        },
        'scrape-aliexpress': {
          main: [['process-products']]
        },
        'process-products': {
          main: [['save-to-database']]
        }
      }
    });

    // Workflow 2: Gestion des commandes
    this.workflows.push({
      id: 'order-management',
      name: 'Gestion des Commandes',
      description: 'Automatise le traitement des commandes et les notifications',
      active: true,
      nodes: [
        {
          id: 'webhook-order',
          type: 'n8n-nodes-base.webhook',
          position: [240, 300],
          parameters: {
            httpMethod: 'POST',
            path: 'order-received',
            responseMode: 'responseNode'
          }
        },
        {
          id: 'validate-order',
          type: 'n8n-nodes-base.function',
          position: [460, 300],
          parameters: {
            functionCode: `
              const order = $input.all()[0].json;
              
              // Validation des données de commande
              if (!order.customer || !order.items || order.items.length === 0) {
                throw new Error('Données de commande invalides');
              }
              
              // Calcul du total
              const total = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
              
              return {
                ...order,
                total,
                status: 'pending',
                createdAt: new Date().toISOString()
              };
            `
          }
        },
        {
          id: 'process-payment',
          type: 'n8n-nodes-base.stripe',
          position: [680, 300],
          parameters: {
            operation: 'createPaymentIntent',
            amount: '={{ $json.total * 100 }}',
            currency: 'eur'
          }
        },
        {
          id: 'send-notification',
          type: 'n8n-nodes-base.telegram',
          position: [900, 300],
          parameters: {
            operation: 'sendMessage',
            chatId: '{{ $env.TELEGRAM_CHAT_ID }}',
            text: 'Nouvelle commande reçue: {{ $json.orderId }}'
          }
        },
        {
          id: 'update-inventory',
          type: 'n8n-nodes-base.postgres',
          position: [1120, 300],
          parameters: {
            operation: 'executeQuery',
            query: 'UPDATE products SET stock = stock - quantity WHERE id = ANY($1)'
          }
        }
      ],
      connections: {
        'webhook-order': {
          main: [['validate-order']]
        },
        'validate-order': {
          main: [['process-payment']]
        },
        'process-payment': {
          main: [['send-notification']]
        },
        'send-notification': {
          main: [['update-inventory']]
        }
      }
    });

    // Workflow 3: Analyse des ventes
    this.workflows.push({
      id: 'sales-analytics',
      name: 'Analyse des Ventes',
      description: 'Génère des rapports d\'analyse des ventes quotidiens',
      active: true,
      nodes: [
        {
          id: 'trigger-daily',
          type: 'n8n-nodes-base.scheduleTrigger',
          position: [240, 300],
          parameters: {
            rule: {
              interval: [{
                field: 'hour',
                expression: '9'
              }]
            }
          }
        },
        {
          id: 'fetch-sales-data',
          type: 'n8n-nodes-base.postgres',
          position: [460, 300],
          parameters: {
            operation: 'executeQuery',
            query: `
              SELECT 
                DATE(created_at) as date,
                COUNT(*) as total_orders,
                SUM(total) as total_revenue,
                AVG(total) as avg_order_value
              FROM orders 
              WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
              GROUP BY DATE(created_at)
              ORDER BY date DESC
            `
          }
        },
        {
          id: 'generate-report',
          type: 'n8n-nodes-base.function',
          position: [680, 300],
          parameters: {
            functionCode: `
              const salesData = $input.all()[0].json;
              
              const report = {
                period: '7 derniers jours',
                totalOrders: salesData.reduce((sum, day) => sum + parseInt(day.total_orders), 0),
                totalRevenue: salesData.reduce((sum, day) => sum + parseFloat(day.total_revenue), 0),
                avgOrderValue: salesData.reduce((sum, day) => sum + parseFloat(day.avg_order_value), 0) / salesData.length,
                dailyBreakdown: salesData
              };
              
              return report;
            `
          }
        },
        {
          id: 'send-report',
          type: 'n8n-nodes-base.telegram',
          position: [900, 300],
          parameters: {
            operation: 'sendMessage',
            chatId: '{{ $env.TELEGRAM_ADMIN_CHAT_ID }}',
            text: '📊 Rapport des ventes: {{ $json.totalOrders }} commandes, {{ $json.totalRevenue }}€ de CA'
          }
        }
      ],
      connections: {
        'trigger-daily': {
          main: [['fetch-sales-data']]
        },
        'fetch-sales-data': {
          main: [['generate-report']]
        },
        'generate-report': {
          main: [['send-report']]
        }
      }
    });

    // Workflow 4: Gestion des stocks
    this.workflows.push({
      id: 'inventory-management',
      name: 'Gestion des Stocks',
      description: 'Surveille les niveaux de stock et envoie des alertes',
      active: true,
      nodes: [
        {
          id: 'trigger-hourly',
          type: 'n8n-nodes-base.scheduleTrigger',
          position: [240, 300],
          parameters: {
            rule: {
              interval: [{
                field: 'hour',
                expression: '*/1'
              }]
            }
          }
        },
        {
          id: 'check-low-stock',
          type: 'n8n-nodes-base.postgres',
          position: [460, 300],
          parameters: {
            operation: 'executeQuery',
            query: 'SELECT * FROM products WHERE stock <= 5'
          }
        },
        {
          id: 'filter-alerts',
          type: 'n8n-nodes-base.function',
          position: [680, 300],
          parameters: {
            functionCode: `
              const lowStockProducts = $input.all()[0].json;
              
              if (lowStockProducts.length === 0) {
                return [];
              }
              
              return lowStockProducts.map(product => ({
                productId: product.id,
                productName: product.title,
                currentStock: product.stock,
                alertLevel: product.stock === 0 ? 'CRITICAL' : 'LOW'
              }));
            `
          }
        },
        {
          id: 'send-stock-alert',
          type: 'n8n-nodes-base.telegram',
          position: [900, 300],
          parameters: {
            operation: 'sendMessage',
            chatId: '{{ $env.TELEGRAM_ADMIN_CHAT_ID }}',
            text: '⚠️ Alerte stock: {{ $json.length }} produits en rupture'
          }
        }
      ],
      connections: {
        'trigger-hourly': {
          main: [['check-low-stock']]
        },
        'check-low-stock': {
          main: [['filter-alerts']]
        },
        'filter-alerts': {
          main: [['send-stock-alert']]
        }
      }
    });

    // Workflow 5: Marketing automatisé
    this.workflows.push({
      id: 'automated-marketing',
      name: 'Marketing Automatisé',
      description: 'Envoie des promotions et newsletters automatiques',
      active: true,
      nodes: [
        {
          id: 'trigger-weekly',
          type: 'n8n-nodes-base.scheduleTrigger',
          position: [240, 300],
          parameters: {
            rule: {
              interval: [{
                field: 'dayOfWeek',
                expression: '1'
              }]
            }
          }
        },
        {
          id: 'get-subscribers',
          type: 'n8n-nodes-base.postgres',
          position: [460, 300],
          parameters: {
            operation: 'executeQuery',
            query: 'SELECT email, name FROM subscribers WHERE active = true'
          }
        },
        {
          id: 'generate-newsletter',
          type: 'n8n-nodes-base.function',
          position: [680, 300],
          parameters: {
            functionCode: `
              const subscribers = $input.all()[0].json;
              
              // Générer contenu de newsletter
              const newsletter = {
                subject: '🚀 Nouveautés DL Style - Cette semaine',
                content: \`
                  Bonjour !
                  
                  Découvrez nos nouvelles collections et offres spéciales :
                  
                  🆕 Nouveaux produits ajoutés
                  💰 Promotions jusqu'à -50%
                  🎁 Code promo : NEWSLETTER10
                  
                  Visitez notre boutique : https://dl-style.com
                \`,
                recipients: subscribers
              };
              
              return newsletter;
            `
          }
        },
        {
          id: 'send-newsletter',
          type: 'n8n-nodes-base.sendGrid',
          position: [900, 300],
          parameters: {
            operation: 'sendEmail',
            to: '={{ $json.recipients.map(r => r.email).join(",") }}',
            subject: '={{ $json.subject }}',
            text: '={{ $json.content }}'
          }
        }
      ],
      connections: {
        'trigger-weekly': {
          main: [['get-subscribers']]
        },
        'get-subscribers': {
          main: [['generate-newsletter']]
        },
        'generate-newsletter': {
          main: [['send-newsletter']]
        }
      }
    });
  }

  // Méthodes pour gérer les workflows

  async activateWorkflow(workflowId: string): Promise<boolean> {
    const workflow = this.workflows.find(w => w.id === workflowId);
    if (workflow) {
      workflow.active = true;
      console.log(`Workflow ${workflowId} activé`);
      return true;
    }
    return false;
  }

  async deactivateWorkflow(workflowId: string): Promise<boolean> {
    const workflow = this.workflows.find(w => w.id === workflowId);
    if (workflow) {
      workflow.active = false;
      console.log(`Workflow ${workflowId} désactivé`);
      return true;
    }
    return false;
  }

  getWorkflow(workflowId: string): DLStyleWorkflow | undefined {
    return this.workflows.find(w => w.id === workflowId);
  }

  getAllWorkflows(): DLStyleWorkflow[] {
    return this.workflows.filter(w => w.active);
  }

  async executeWorkflow(workflowId: string, inputData?: any): Promise<any> {
    const workflow = this.getWorkflow(workflowId);
    if (!workflow || !workflow.active) {
      throw new Error(`Workflow ${workflowId} non trouvé ou inactif`);
    }

    console.log(`Exécution du workflow ${workflowId}`);
    
    // Simulation de l'exécution du workflow
    // En réalité, cela utiliserait l'API N8N
    return {
      workflowId,
      status: 'completed',
      executionTime: new Date().toISOString(),
      result: 'Workflow exécuté avec succès'
    };
  }

  async getWorkflowStats(workflowId: string): Promise<any> {
    const workflow = this.getWorkflow(workflowId);
    if (!workflow) {
      throw new Error(`Workflow ${workflowId} non trouvé`);
    }

    // Simulation des statistiques
    return {
      workflowId,
      name: workflow.name,
      executions: Math.floor(Math.random() * 100),
      successRate: 95 + Math.random() * 5,
      avgExecutionTime: 2.5 + Math.random() * 3,
      lastExecution: new Date(Date.now() - Math.random() * 86400000).toISOString()
    };
  }

  async createCustomWorkflow(workflow: Omit<DLStyleWorkflow, 'id'>): Promise<string> {
    const newWorkflow: DLStyleWorkflow = {
      ...workflow,
      id: `custom-${Date.now()}`,
      active: true
    };

    this.workflows.push(newWorkflow);
    console.log(`Nouveau workflow créé: ${newWorkflow.id}`);
    
    return newWorkflow.id;
  }

  async deleteWorkflow(workflowId: string): Promise<boolean> {
    const index = this.workflows.findIndex(w => w.id === workflowId);
    if (index !== -1) {
      this.workflows.splice(index, 1);
      console.log(`Workflow ${workflowId} supprimé`);
      return true;
    }
    return false;
  }
}

export default DLStyleWorkflowManager; 