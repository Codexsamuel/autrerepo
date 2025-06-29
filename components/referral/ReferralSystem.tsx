"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Gift, Share2, Copy, TrendingUp, Trophy, Star, UserPlus, Coins } from 'lucide-react';

interface Referral {
  id: string;
  username: string;
  avatar: string;
  date: Date;
  status: 'pending' | 'active' | 'completed';
  bonusEarned: number;
  totalBets: number;
  totalWinnings: number;
}

interface ReferralStats {
  totalReferrals: number;
  activeReferrals: number;
  totalBonusEarned: number;
  pendingBonus: number;
  referralCode: string;
  referralLink: string;
  level: number;
  nextLevelBonus: number;
}

export default function ReferralSystem() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [stats, setStats] = useState<ReferralStats>({
    totalReferrals: 0,
    activeReferrals: 0,
    totalBonusEarned: 0,
    pendingBonus: 0,
    referralCode: 'PARIEUR2024',
    referralLink: 'https://dlbookmaker.com/ref/PARIEUR2024',
    level: 2,
    nextLevelBonus: 50
  });
  const [copied, setCopied] = useState(false);

  // Données de démonstration
  useEffect(() => {
    const demoReferrals: Referral[] = [
      {
        id: '1',
        username: 'FootExpert',
        avatar: '/images/avatar.png',
        date: new Date(Date.now() - 86400000),
        status: 'active',
        bonusEarned: 25,
        totalBets: 15,
        totalWinnings: 180
      },
      {
        id: '2',
        username: 'TennisKing',
        avatar: '/images/avatar.png',
        date: new Date(Date.now() - 172800000),
        status: 'completed',
        bonusEarned: 50,
        totalBets: 30,
        totalWinnings: 450
      },
      {
        id: '3',
        username: 'BasketPro',
        avatar: '/images/avatar.png',
        date: new Date(Date.now() - 259200000),
        status: 'pending',
        bonusEarned: 0,
        totalBets: 5,
        totalWinnings: 75
      },
      {
        id: '4',
        username: 'VipPlayer',
        avatar: '/images/avatar.png',
        date: new Date(Date.now() - 345600000),
        status: 'active',
        bonusEarned: 35,
        totalBets: 20,
        totalWinnings: 320
      }
    ];

    setReferrals(demoReferrals);
  }, []);

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(stats.referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  const shareReferral = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Rejoins DL Bookmaker !',
        text: 'Utilise mon code parrainage pour obtenir des bonus exclusifs !',
        url: stats.referralLink
      });
    } else {
      copyReferralLink();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLevelInfo = (level: number) => {
    const levels = [
      { name: 'Débutant', bonus: 10, referrals: 0 },
      { name: 'Bronze', bonus: 25, referrals: 3 },
      { name: 'Argent', bonus: 50, referrals: 10 },
      { name: 'Or', bonus: 100, referrals: 25 },
      { name: 'Platine', bonus: 200, referrals: 50 },
      { name: 'Diamant', bonus: 500, referrals: 100 }
    ];
    return levels[level] || levels[0];
  };

  const currentLevel = getLevelInfo(stats.level);
  const nextLevel = getLevelInfo(stats.level + 1);

  return (
    <div className="space-y-6">
      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-800">{stats.totalReferrals}</div>
                <div className="text-sm text-blue-600">Total parrainages</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Gift className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-800">{stats.totalBonusEarned}€</div>
                <div className="text-sm text-green-600">Bonus gagnés</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-800">{stats.activeReferrals}</div>
                <div className="text-sm text-purple-600">Parrainages actifs</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-800">{currentLevel.name}</div>
                <div className="text-sm text-yellow-600">Niveau actuel</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Code de parrainage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Mon code de parrainage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Code de parrainage</label>
              <div className="flex gap-2">
                <Input
                  value={stats.referralCode}
                  readOnly
                  className="font-mono text-lg bg-gray-50"
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(stats.referralCode);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Lien de parrainage</label>
              <div className="flex gap-2">
                <Input
                  value={stats.referralLink}
                  readOnly
                  className="text-sm bg-gray-50"
                />
                <Button
                  variant="outline"
                  onClick={copyReferralLink}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {copied && (
            <div className="text-sm text-green-600 flex items-center gap-2">
              <Copy className="h-4 w-4" />
              Lien copié dans le presse-papiers !
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={shareReferral} className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Partager
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Inviter des amis
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Niveaux et bonus */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Programme de fidélité
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-4">Niveau actuel</h3>
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Trophy className="h-8 w-8 text-yellow-600" />
                  <div>
                    <div className="text-xl font-bold text-yellow-800">{currentLevel.name}</div>
                    <div className="text-sm text-yellow-600">Bonus: {currentLevel.bonus}€ par parrainage</div>
                  </div>
                </div>
                <div className="text-sm text-yellow-700">
                  Parrainages: {stats.totalReferrals}/{currentLevel.referrals}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Prochain niveau</h3>
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Star className="h-8 w-8 text-gray-600" />
                  <div>
                    <div className="text-xl font-bold text-gray-800">{nextLevel.name}</div>
                    <div className="text-sm text-gray-600">Bonus: {nextLevel.bonus}€ par parrainage</div>
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  Parrainages nécessaires: {nextLevel.referrals - stats.totalReferrals} de plus
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((stats.totalReferrals / nextLevel.referrals) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des parrainages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Mes parrainages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {referrals.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Aucun parrainage pour le moment</p>
                <p className="text-sm">Partagez votre code pour commencer à gagner des bonus !</p>
              </div>
            ) : (
              referrals.map((referral) => (
                <div key={referral.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={referral.avatar} />
                        <AvatarFallback>{referral.username[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{referral.username}</div>
                        <div className="text-sm text-gray-500">
                          Parrainé le {referral.date.toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getStatusColor(referral.status)}>
                            {referral.status === 'active' ? 'Actif' : 
                             referral.status === 'completed' ? 'Complété' : 'En attente'}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500">
                          {referral.totalBets} paris • {referral.totalWinnings}€ gagnés
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">+{referral.bonusEarned}€</div>
                        <div className="text-sm text-gray-500">Bonus gagné</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 