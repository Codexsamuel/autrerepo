'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Hash, ArrowUp } from 'lucide-react';

export function NovaWorldTrending() {
  const trendingTopics = [
    { name: 'Innovation Tech Afrique', posts: '2.4k', trend: 'up', change: '+12%' },
    { name: 'Entrepreneuriat Digital', posts: '1.8k', trend: 'up', change: '+8%' },
    { name: 'Marketing Digital B2B', posts: '1.2k', trend: 'up', change: '+15%' },
    { name: 'Finance & Investissement', posts: '956', trend: 'up', change: '+6%' },
    { name: 'E-commerce Afrique', posts: '789', trend: 'up', change: '+22%' },
    { name: 'IA & Machine Learning', posts: '654', trend: 'up', change: '+18%' },
    { name: 'Cybersécurité', posts: '432', trend: 'up', change: '+9%' },
    { name: 'Green Tech', posts: '321', trend: 'up', change: '+25%' }
  ];

  return (
    <Card className="bg-white border-gray-200">
      <CardHeader className="pb-3">
        <h4 className="font-semibold text-gray-900 flex items-center">
          <TrendingUp className="w-4 h-4 mr-2 text-orange-600" />
          Sujets Tendances
        </h4>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div key={index} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">#{topic.name}</span>
                  {topic.trend === 'up' && (
                    <ArrowUp className="w-3 h-3 text-green-500" />
                  )}
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-600">{topic.posts} posts</span>
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                    {topic.change}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-4 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600">
          Voir tous les sujets
        </Button>
      </CardContent>
    </Card>
  );
} 