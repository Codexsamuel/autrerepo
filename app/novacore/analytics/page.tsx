"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, ShoppingBag, Plane, Database } from 'lucide-react';

const stats = [
  { label: 'Utilisateurs actifs', value: '1,247', icon: Users, color: 'text-blue-600' },
  { label: 'Ventes e-commerce', value: '€12,500', icon: ShoppingBag, color: 'text-pink-600' },
  { label: 'Réservations', value: '156', icon: Plane, color: 'text-orange-600' },
  { label: 'Intégrations CRM', value: '12', icon: Database, color: 'text-indigo-600' },
];

const chartData = [
  { month: 'Jan', users: 200, sales: 1200 },
  { month: 'Fév', users: 300, sales: 1800 },
  { month: 'Mar', users: 400, sales: 2200 },
  { month: 'Avr', users: 350, sales: 2100 },
  { month: 'Mai', users: 500, sales: 3200 },
  { month: 'Juin', users: 600, sales: 4000 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Analytics & Tableaux de bord</h1>
        <BarChart3 className="h-8 w-8 text-purple-600" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Évolution des utilisateurs & ventes</h2>
        <div className="w-full h-64 flex items-end space-x-4">
          {chartData.map((data, idx) => (
            <div key={idx} className="flex flex-col items-center flex-1">
              <div className="flex items-end space-x-1 h-48">
                <div className="w-6 bg-blue-500 rounded-t h-full" style={{ height: `${data.users / 7}px` }} />
                <div className="w-6 bg-pink-500 rounded-t h-full" style={{ height: `${data.sales / 40}px` }} />
              </div>
              <span className="text-xs mt-2">{data.month}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 text-xs text-gray-500">
          <span>Bleu: Utilisateurs</span>
          <span>Rose: Ventes (€)</span>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6 mt-8">
        <h2 className="text-lg font-semibold mb-4">Top modules</h2>
        <ul className="space-y-2">
          <li className="flex justify-between"><span>DL Style (e-commerce)</span><span>2,500 produits</span></li>
          <li className="flex justify-between"><span>NovaWorld (réseau pro)</span><span>1,200 membres</span></li>
          <li className="flex justify-between"><span>DL Travel (voyages)</span><span>156 réservations</span></li>
          <li className="flex justify-between"><span>CRM Intégrations</span><span>12 intégrations</span></li>
        </ul>
      </div>
    </div>
  );
}