'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign,
  FileText,
  Users,
  TrendingUp,
  Eye,
  MessageSquare,
  Download,
  RefreshCw
} from 'lucide-react';

interface EscrowTransaction {
  id: string;
  booking_id: string;
  total_amount: number;
  escrow_amount: number;
  status: string;
  current_stage: string;
  payment_provider: string;
  created_at: string;
  metadata: any;
}

interface Dispute {
  id: string;
  dispute_type: string;
  status: string;
  priority: string;
  opened_at: string;
  evidence_deadline: string;
  requested_action: string;
  metadata: any;
}

interface Contract {
  id: string;
  contract_type: string;
  status: string;
  terms_version: string;
  created_at: string;
}

interface Invoice {
  id: string;
  invoice_number: string;
  total_ttc: number;
  status: string;
  due_date: string;
  currency: string;
}

export default function NovaProtectDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [escrows, setEscrows] = useState<EscrowTransaction[]>([]);
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEscrows: 0,
    activeEscrows: 0,
    disputedEscrows: 0,
    totalDisputes: 0,
    openDisputes: 0,
    resolvedDisputes: 0,
    totalContracts: 0,
    activeContracts: 0,
    totalInvoices: 0,
    pendingInvoices: 0
  });

  // Simuler le chargement des données
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simuler un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Données simulées pour la démonstration
      const mockEscrows: EscrowTransaction[] = [
        {
          id: 'escrow-1',
          booking_id: 'booking-1',
          total_amount: 50000,
          escrow_amount: 50000,
          status: 'held',
          current_stage: 'mission_started',
          payment_provider: 'cinetpay',
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          metadata: {
            service_title: 'Ménage complet',
            service_category: 'Ménage',
            escrow_percentage: 100
          }
        },
        {
          id: 'escrow-2',
          booking_id: 'booking-2',
          total_amount: 75000,
          escrow_amount: 75000,
          status: 'disputed',
          current_stage: 'dispute_opened',
          payment_provider: 'stripe',
          created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          metadata: {
            service_title: 'Réparation électrique',
            service_category: 'Électricité',
            escrow_percentage: 100
          }
        }
      ];

      const mockDisputes: Dispute[] = [
        {
          id: 'dispute-1',
          dispute_type: 'quality_issue',
          status: 'under_review',
          priority: 'high',
          opened_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          evidence_deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
          requested_action: 'partial_refund',
          metadata: {
            service_title: 'Réparation électrique',
            requested_refund_amount: 25000
          }
        }
      ];

      const mockContracts: Contract[] = [
        {
          id: 'contract-1',
          contract_type: 'standard',
          status: 'active',
          terms_version: '1.0',
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];

      const mockInvoices: Invoice[] = [
        {
          id: 'invoice-1',
          invoice_number: 'INV-001',
          total_ttc: 50000,
          status: 'paid',
          due_date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
          currency: 'XAF'
        }
      ];

      setEscrows(mockEscrows);
      setDisputes(mockDisputes);
      setContracts(mockContracts);
      setInvoices(mockInvoices);

      // Calculer les statistiques
      setStats({
        totalEscrows: mockEscrows.length,
        activeEscrows: mockEscrows.filter(e => e.status === 'held').length,
        disputedEscrows: mockEscrows.filter(e => e.status === 'disputed').length,
        totalDisputes: mockDisputes.length,
        openDisputes: mockDisputes.filter(d => d.status === 'opened').length,
        resolvedDisputes: mockDisputes.filter(d => d.status === 'resolved').length,
        totalContracts: mockContracts.length,
        activeContracts: mockContracts.filter(c => c.status === 'active').length,
        totalInvoices: mockInvoices.length,
        pendingInvoices: mockInvoices.filter(i => i.status === 'pending').length
      });

      setIsLoading(false);
    };

    loadData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'held': return 'bg-green-100 text-green-800';
      case 'disputed': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDisputeTypeIcon = (type: string) => {
    switch (type) {
      case 'quality_issue': return <AlertTriangle className="w-4 h-4" />;
      case 'payment_dispute': return <DollarSign className="w-4 h-4" />;
      case 'cancellation': return <Clock className="w-4 h-4" />;
      case 'no_show': return <Users className="w-4 h-4" />;
      case 'safety_concern': return <Shield className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Chargement du dashboard NovaProtect...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête NovaProtect */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Shield className="w-12 h-12 text-blue-600 mr-4" />
          <h1 className="text-3xl font-bold text-gray-900">NovaProtect Dashboard</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Gestion centralisée des transactions d'escrow, contrats, litiges et factures. 
          Sécurisez vos transactions et gérez les litiges efficacement.
        </p>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Escrows Actifs</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeEscrows}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {stats.totalEscrows} total • {stats.disputedEscrows} en litige
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Litiges Ouverts</p>
                <p className="text-2xl font-bold text-orange-600">{stats.openDisputes}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {stats.totalDisputes} total • {stats.resolvedDisputes} résolus
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Contrats Actifs</p>
                <p className="text-2xl font-bold text-blue-600">{stats.activeContracts}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {stats.totalContracts} total • Tous types
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Factures En Attente</p>
                <p className="text-2xl font-bold text-purple-600">{stats.pendingInvoices}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {stats.totalInvoices} total • Toutes devises
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Onglets de gestion */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Vue d'ensemble</span>
          </TabsTrigger>
          <TabsTrigger value="escrows" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Escrows</span>
          </TabsTrigger>
          <TabsTrigger value="disputes" className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Litiges</span>
          </TabsTrigger>
          <TabsTrigger value="contracts" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Contrats</span>
          </TabsTrigger>
        </TabsList>

        {/* Vue d'ensemble */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Escrows récents */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Escrows Récents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {escrows.slice(0, 3).map((escrow) => (
                    <div key={escrow.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{escrow.metadata.service_title}</p>
                        <p className="text-xs text-gray-500">{escrow.metadata.service_category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">{escrow.escrow_amount.toLocaleString()} FCFA</p>
                        <Badge className={`text-xs ${getStatusColor(escrow.status)}`}>
                          {escrow.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Litiges urgents */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Litiges Urgents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {disputes.filter(d => d.priority === 'urgent' || d.priority === 'high').slice(0, 3).map((dispute) => (
                    <div key={dispute.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          {getDisputeTypeIcon(dispute.dispute_type)}
                          <p className="font-medium text-sm">{dispute.dispute_type.replace('_', ' ')}</p>
                        </div>
                        <p className="text-xs text-gray-500">{dispute.requested_action}</p>
                      </div>
                      <Badge className={`text-xs ${getPriorityColor(dispute.priority)}`}>
                        {dispute.priority}
                      </Badge>
                    </div>
                  ))}
                  {disputes.filter(d => d.priority === 'urgent' || d.priority === 'high').length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">Aucun litige urgent</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Gestion des Escrows */}
        <TabsContent value="escrows" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Transactions d'Escrow</span>
                <Button size="sm" variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Actualiser
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Service</th>
                      <th className="text-left p-3 font-medium">Montant</th>
                      <th className="text-left p-3 font-medium">Statut</th>
                      <th className="text-left p-3 font-medium">Étape</th>
                      <th className="text-left p-3 font-medium">Paiement</th>
                      <th className="text-left p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {escrows.map((escrow) => (
                      <tr key={escrow.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div>
                            <p className="font-medium text-sm">{escrow.metadata.service_title}</p>
                            <p className="text-xs text-gray-500">{escrow.metadata.service_category}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <p className="font-semibold">{escrow.total_amount.toLocaleString()} FCFA</p>
                          <p className="text-xs text-gray-500">Escrow: {escrow.escrow_amount.toLocaleString()}</p>
                        </td>
                        <td className="p-3">
                          <Badge className={getStatusColor(escrow.status)}>
                            {escrow.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <p className="text-sm">{escrow.current_stage.replace('_', ' ')}</p>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline" className="text-xs">
                            {escrow.payment_provider}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="w-3 h-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gestion des Litiges */}
        <TabsContent value="disputes" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Litiges NovaProtect</span>
                <Button size="sm" variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Actualiser
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {disputes.map((dispute) => (
                  <div key={dispute.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getDisputeTypeIcon(dispute.dispute_type)}
                        <div>
                          <h3 className="font-semibold text-sm capitalize">
                            {dispute.dispute_type.replace('_', ' ')}
                          </h3>
                          <p className="text-xs text-gray-500">
                            Ouvert le {new Date(dispute.opened_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(dispute.priority)}>
                          {dispute.priority}
                        </Badge>
                        <Badge className={getStatusColor(dispute.status)}>
                          {dispute.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Action demandée</p>
                        <p className="text-sm font-medium">{dispute.requested_action.replace('_', ' ')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Deadline preuves</p>
                        <p className="text-sm font-medium">
                          {new Date(dispute.evidence_deadline).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Montant demandé</p>
                        <p className="text-sm font-medium">
                          {dispute.metadata.requested_refund_amount 
                            ? `${dispute.metadata.requested_refund_amount.toLocaleString()} FCFA`
                            : 'Non spécifié'
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3 mr-2" />
                        Voir détails
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="w-3 h-3 mr-2" />
                        Messages
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3 mr-2" />
                        Preuves
                      </Button>
                    </div>
                  </div>
                ))}
                
                {disputes.length === 0 && (
                  <div className="text-center py-8">
                    <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Aucun litige ouvert</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gestion des Contrats */}
        <TabsContent value="contracts" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Contrats Numériques</span>
                <Button size="sm" variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Actualiser
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Type</th>
                      <th className="text-left p-3 font-medium">Version</th>
                      <th className="text-left p-3 font-medium">Statut</th>
                      <th className="text-left p-3 font-medium">Créé le</th>
                      <th className="text-left p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contracts.map((contract) => (
                      <tr key={contract.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <Badge variant="outline" className="capitalize">
                            {contract.contract_type}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <p className="text-sm">v{contract.terms_version}</p>
                        </td>
                        <td className="p-3">
                          <Badge className={getStatusColor(contract.status)}>
                            {contract.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <p className="text-sm">
                            {new Date(contract.created_at).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-3 h-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 