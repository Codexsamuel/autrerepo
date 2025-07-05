'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
    AlertCircle,
    ExternalLink,
    Eye,
    MapPin,
    MessageSquare,
    Phone,
    RefreshCw,
    Star,
    ThumbsUp
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface GoogleMyBusinessData {
  isConnected: boolean;
  businessId?: string;
  businessName?: string;
  address?: string;
  phone?: string;
  website?: string;
  rating: number;
  totalReviews: number;
  views: number;
  clicks: number;
  calls: number;
  directions: number;
  recentReviews: Array<{
    id: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
    isOwnerReply: boolean;
    replyText?: string;
  }>;
  reviewStats: {
    fiveStar: number;
    fourStar: number;
    threeStar: number;
    twoStar: number;
    oneStar: number;
  };
}

export default function GoogleMyBusinessIntegration() {
  const [businessData, setBusinessData] = useState<GoogleMyBusinessData>({
    isConnected: false,
    rating: 0,
    totalReviews: 0,
    views: 0,
    clicks: 0,
    calls: 0,
    directions: 0,
    recentReviews: [],
    reviewStats: {
      fiveStar: 0,
      fourStar: 0,
      threeStar: 0,
      twoStar: 0,
      oneStar: 0
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    checkConnectionStatus();
  }, []);

  const checkConnectionStatus = async () => {
    try {
      const response = await fetch('/api/google-my-business/status');
      const data = await response.json();
      
      if (data.connected) {
        setBusinessData(prev => ({ 
          ...prev, 
          isConnected: true, 
          businessId: data.businessId,
          businessName: data.businessName,
          address: data.address,
          phone: data.phone,
          website: data.website
        }));
        loadBusinessData();
      }
    } catch (err) {
      console.error('Erreur lors de la vérification du statut:', err);
    }
  };

  const connectGoogleMyBusiness = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/google-my-business/auth');
      const data = await response.json();
      
      if (data.authUrl) {
        window.location.href = data.authUrl;
      }
    } catch (err) {
      setError('Erreur lors de la connexion à Google My Business');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadBusinessData = async () => {
    if (!businessData.isConnected) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/google-my-business/data');
      const data = await response.json();
      
      if (data.success) {
        setBusinessData(prev => ({ ...prev, ...data.data }));
      } else {
        setError(data.error || 'Erreur lors du chargement des données');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const replyToReview = async (reviewId: string) => {
    if (!replyText.trim()) return;
    
    try {
      const response = await fetch('/api/google-my-business/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId, replyText })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Mettre à jour la liste des avis
        setBusinessData(prev => ({
          ...prev,
          recentReviews: prev.recentReviews.map(review => 
            review.id === reviewId 
              ? { ...review, isOwnerReply: true, replyText }
              : review
          )
        }));
        setReplyingTo(null);
        setReplyText('');
      } else {
        setError(data.error || 'Erreur lors de la réponse');
      }
    } catch (err) {
      setError('Erreur lors de l\'envoi de la réponse');
      console.error(err);
    }
  };

  const disconnectGoogleMyBusiness = async () => {
    try {
      await fetch('/api/google-my-business/disconnect', { method: 'POST' });
      setBusinessData({
        isConnected: false,
        rating: 0,
        totalReviews: 0,
        views: 0,
        clicks: 0,
        calls: 0,
        directions: 0,
        recentReviews: [],
        reviewStats: {
          fiveStar: 0,
          fourStar: 0,
          threeStar: 0,
          twoStar: 0,
          oneStar: 0
        }
      });
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err);
    }
  };

  const getAverageRating = () => {
    const total = businessData.reviewStats.fiveStar + businessData.reviewStats.fourStar + 
                  businessData.reviewStats.threeStar + businessData.reviewStats.twoStar + 
                  businessData.reviewStats.oneStar;
    
    if (total === 0) return 0;
    
    const weightedSum = (businessData.reviewStats.fiveStar * 5) + 
                       (businessData.reviewStats.fourStar * 4) + 
                       (businessData.reviewStats.threeStar * 3) + 
                       (businessData.reviewStats.twoStar * 2) + 
                       (businessData.reviewStats.oneStar * 1);
    
    return (weightedSum / total).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Header avec statut de connexion */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-green-400" />
              <div>
                <CardTitle className="text-white">Google My Business</CardTitle>
                <p className="text-sm text-gray-400">
                  {businessData.isConnected 
                    ? `Connecté - ${businessData.businessName}` 
                    : 'Non connecté'
                  }
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {businessData.isConnected ? (
                <>
                  <Button 
                    onClick={loadBusinessData}
                    disabled={isLoading}
                    variant="outline"
                    size="sm"
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Actualiser
                  </Button>
                  <Button 
                    onClick={disconnectGoogleMyBusiness}
                    variant="outline"
                    size="sm"
                    className="text-red-400 border-red-400 hover:bg-red-400/20"
                  >
                    Déconnecter
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={connectGoogleMyBusiness}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Connecter My Business
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Message d'erreur */}
      {error && (
        <Card className="bg-red-900/20 border-red-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-red-400">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Données My Business */}
      {businessData.isConnected && (
        <>
          {/* Informations de l'entreprise */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Informations de l'entreprise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Nom</p>
                  <p className="text-white font-medium">{businessData.businessName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Adresse</p>
                  <p className="text-white font-medium">{businessData.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Téléphone</p>
                  <p className="text-white font-medium">{businessData.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Site web</p>
                  <a 
                    href={businessData.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {businessData.website}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* KPIs principaux */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Note moyenne</CardTitle>
                <Star className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {getAverageRating()}
                </div>
                <p className="text-xs text-gray-400">{businessData.totalReviews} avis</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Vues du profil</CardTitle>
                <Eye className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {businessData.views.toLocaleString()}
                </div>
                <p className="text-xs text-gray-400">Ce mois</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Clics sur le site</CardTitle>
                <ExternalLink className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {businessData.clicks.toLocaleString()}
                </div>
                <p className="text-xs text-gray-400">Ce mois</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Appels</CardTitle>
                <Phone className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {businessData.calls}
                </div>
                <p className="text-xs text-gray-400">Ce mois</p>
              </CardContent>
            </Card>
          </div>

          {/* Statistiques des avis */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Répartition des avis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map(stars => {
                  const count = businessData.reviewStats[`${stars}Star` as keyof typeof businessData.reviewStats];
                  const percentage = businessData.totalReviews > 0 
                    ? (count / businessData.totalReviews) * 100 
                    : 0;
                  
                  return (
                    <div key={stars} className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1 w-16">
                        <span className="text-gray-300 text-sm">{stars}</span>
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      </div>
                      <div className="flex-1 bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="w-16 text-right">
                        <span className="text-white text-sm">{count}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Avis récents */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Avis récents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {businessData.recentReviews.map((review) => (
                  <div key={review.id} className="border border-slate-700 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
                            />
                          ))}
                        </div>
                        <span className="font-medium text-white">{review.author}</span>
                      </div>
                      <span className="text-sm text-gray-400">{review.date}</span>
                    </div>
                    
                    <p className="text-gray-300 mb-3">{review.comment}</p>
                    
                    {review.isOwnerReply && review.replyText && (
                      <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3 mb-3">
                        <p className="text-blue-300 text-sm">
                          <strong>Réponse :</strong> {review.replyText}
                        </p>
                      </div>
                    )}
                    
                    {!review.isOwnerReply && (
                      <div className="flex items-center space-x-2">
                        <Button 
                          onClick={() => setReplyingTo(review.id)}
                          size="sm"
                          variant="outline"
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Répondre
                        </Button>
                        <Button size="sm" variant="outline">
                          <ThumbsUp className="w-4 h-4 mr-2" />
                          Utile
                        </Button>
                      </div>
                    )}
                    
                    {replyingTo === review.id && (
                      <div className="mt-3 space-y-3">
                        <Textarea
                          placeholder="Écrivez votre réponse..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                        <div className="flex items-center space-x-2">
                          <Button 
                            onClick={() => replyToReview(review.id)}
                            size="sm"
                            disabled={!replyText.trim()}
                          >
                            Envoyer la réponse
                          </Button>
                          <Button 
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyText('');
                            }}
                            size="sm"
                            variant="outline"
                          >
                            Annuler
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Instructions de connexion */}
      {!businessData.isConnected && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Comment connecter Google My Business</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-gray-300">
              <p>1. Cliquez sur "Connecter My Business"</p>
              <p>2. Autorisez l'accès à votre compte Google</p>
              <p>3. Sélectionnez votre établissement</p>
              <p>4. Gérez vos avis et statistiques directement</p>
            </div>
            <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
              <p className="text-green-300 text-sm">
                <strong>Avantages :</strong> Répondez aux avis, suivez vos statistiques et améliorez votre visibilité locale.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 