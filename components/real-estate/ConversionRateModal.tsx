"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  Calendar, 
  Euro, 
  User, 
  MapPin, 
  CheckCircle, 
  XCircle,
  Clock,
  BarChart3
} from 'lucide-react';
import { ScheduledVisit, Transaction, getClientById, getPropertyById, getScheduledVisits, transactions } from '@/lib/database/real-estate';

interface ConversionRateModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversionRate: number;
}

export default function ConversionRateModal({ isOpen, onClose, conversionRate }: ConversionRateModalProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('month');

  const visits = getScheduledVisits();
  const completedTransactions = transactions.filter(t => t.status === 'finalisee');
  const pendingTransactions = transactions.filter(t => t.status === 'en_cours');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'finalisee': return 'bg-green-100 text-green-800';
      case 'en_cours': return 'bg-yellow-100 text-yellow-800';
      case 'annulee': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateRevenue = () => {
    return completedTransactions.reduce((sum, trans) => sum + trans.price, 0);
  };

  const calculateCommission = () => {
    return completedTransactions.reduce((sum, trans) => sum + trans.commission, 0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Taux de Conversion - {conversionRate}%
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Statistiques générales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total visites</p>
                    <p className="text-2xl font-bold text-blue-600">{visits.length}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Transactions finalisées</p>
                    <p className="text-2xl font-bold text-green-600">{completedTransactions.length}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Chiffre d'affaires</p>
                    <p className="text-2xl font-bold text-purple-600">{formatPrice(calculateRevenue())}</p>
                  </div>
                  <Euro className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Commissions</p>
                    <p className="text-2xl font-bold text-orange-600">{formatPrice(calculateCommission())}</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transactions en cours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Transactions en cours ({pendingTransactions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTransactions.map((transaction) => {
                  const client = getClientById(transaction.clientId);
                  const property = getPropertyById(transaction.propertyId);
                  
                  return (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-yellow-100 rounded-full">
                          <Clock className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div>
                          <p className="font-semibold">
                            {client ? `${client.firstName} ${client.lastName}` : 'Client inconnu'}
                          </p>
                          <p className="text-sm text-gray-600">
                            {property ? property.title : 'Bien inconnu'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">{formatPrice(transaction.price)}</p>
                        <p className="text-sm text-gray-600">Commission: {formatPrice(transaction.commission)}</p>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
                {pendingTransactions.length === 0 && (
                  <p className="text-center text-gray-500 py-4">Aucune transaction en cours</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Détail des visites récentes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Visites récentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {visits.slice(0, 5).map((visit) => {
                  const client = getClientById(visit.clientId);
                  const property = getPropertyById(visit.propertyId);
                  const hasTransaction = transactions.some(t => 
                    t.clientId === visit.clientId && t.propertyId === visit.propertyId
                  );
                  
                  return (
                    <div key={visit.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-full ${
                          hasTransaction ? 'bg-green-100' : 'bg-blue-100'
                        }`}>
                          {hasTransaction ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Calendar className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold">
                            {client ? `${client.firstName} ${client.lastName}` : 'Client inconnu'}
                          </p>
                          <p className="text-sm text-gray-600">
                            {property ? property.title : 'Bien inconnu'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDate(visit.date)} - {visit.timeSlot.start}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={hasTransaction ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                          {hasTransaction ? 'Convertie' : 'En attente'}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Graphique de conversion */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Évolution du taux de conversion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{conversionRate}%</div>
                  <p className="text-sm text-gray-600">Taux de conversion actuel</p>
                </div>
              </div>
              
              {/* Période de sélection */}
              <div className="flex gap-2 mt-4">
                <Button 
                  variant={selectedPeriod === 'week' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedPeriod('week')}
                >
                  Semaine
                </Button>
                <Button 
                  variant={selectedPeriod === 'month' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedPeriod('month')}
                >
                  Mois
                </Button>
                <Button 
                  variant={selectedPeriod === 'quarter' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedPeriod('quarter')}
                >
                  Trimestre
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
} 