export interface Workflow {
  id: string;
  name: string;
  description: string;
  nodes: any[];
  connections: any[];
}

export const novaworldWorkflows: Workflow[] = [
  {
    id: "novaworld-social-sync",
    name: "NovaWorld Social Sync",
    description: "Synchronise les données sociales entre les différentes plateformes",
    nodes: [],
    connections: []
  },
  {
    id: "novaworld-content-distribution",
    name: "NovaWorld Content Distribution",
    description: "Distribue le contenu sur les différents canaux",
    nodes: [],
    connections: []
  }
]; 