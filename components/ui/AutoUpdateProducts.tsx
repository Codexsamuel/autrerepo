'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, CheckCircle, Clock, Database, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface Product {
  id: string;
  title: string;
  description?: string;
  price: {
    current: number;
    original?: number;
    currency: string;
  };
  images: string[];
  rating?: number;
  reviews?: number;
  availability: boolean;
  category: string;
  brand?: string;
  source: string;
  lastUpdated: string;
  nextUpdate: string;
  updateFrequency: number;
  isActive: boolean;
}

interface UpdateStats {
  totalProducts: number;
  sources: {
    [source: string]: {
      productCount: number;
      lastUpdate: string;
      nextUpdate: string;
      isActive: boolean;
      error?: string;
    };
  };
  lastUpdate: string;
  nextUpdate: string;
  cacheStatus: string;
  autoUpdateEnabled: boolean;
}

interface AutoUpdateProductsProps {
  className?: string;
  showStats?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number; // en secondes
}

export function AutoUpdateProducts({
  className = '',
  showStats = true,
  autoRefresh = true,
  refreshInterval = 300 // 5 minutes par défaut
}: AutoUpdateProductsProps) {
  const [products, setProducts] = useState<{ [source: string]: Product[] }>({});
  const [stats, setStats] = useState<UpdateStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [nextRefresh, setNextRefresh] = useState<Date | null>(null);
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const { toast } = useToast();

  // Fonction pour charger les statistiques
  const loadStats = useCallback(async () => {
    try {
      const response = await fetch('/api/products/auto-update?action=stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data.data);
      }
    } catch (error) {
      console.error('Erreur chargement stats:', error);
    }
  }, []);

  // Fonction pour charger les produits
  const loadProducts = useCallback(async (force = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/products/auto-update${force ? '?force=true' : ''}`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.data.products || {});
        setLastRefresh(new Date());
        setNextRefresh(new Date(Date.now() + (refreshInterval * 1000)));
        
        if (force) {
          toast({
            title: "Mise à jour réussie",
            description: `${data.data.totalProducts} produits mis à jour`,
          });
        }
      } else {
        throw new Error('Erreur lors du chargement des produits');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      setError(errorMessage);
      toast({
        title: "Erreur de chargement",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [refreshInterval, toast]);

  // Fonction pour forcer la mise à jour
  const forceUpdate = useCallback(async () => {
    setUpdating(true);
    try {
      const response = await fetch('/api/products/auto-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update-all' })
      });
      
      if (response.ok) {
        const data = await response.json();
        setProducts(data.data.results || {});
        setLastRefresh(new Date());
        setNextRefresh(new Date(Date.now() + (refreshInterval * 1000)));
        
        toast({
          title: "Mise à jour forcée réussie",
          description: `${data.data.totalProducts} produits mis à jour`,
        });
      } else {
        throw new Error('Erreur lors de la mise à jour forcée');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      toast({
        title: "Erreur de mise à jour",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  }, [refreshInterval, toast]);

  // Fonction pour mettre à jour une source spécifique
  const updateSource = useCallback(async (source: string) => {
    setUpdating(true);
    try {
      const response = await fetch(`/api/products/auto-update?action=update&source=${source}`);
      if (response.ok) {
        const data = await response.json();
        setProducts(prev => ({
          ...prev,
          [source]: data.data.products
        }));
        
        toast({
          title: "Source mise à jour",
          description: `${data.data.totalProducts} produits mis à jour pour ${source}`,
        });
      } else {
        throw new Error(`Erreur mise à jour ${source}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      toast({
        title: "Erreur de mise à jour",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  }, [toast]);

  // Chargement initial
  useEffect(() => {
    loadProducts();
    loadStats();
  }, [loadProducts, loadStats]);

  // Auto-refresh
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      loadProducts();
      loadStats();
    }, refreshInterval * 1000);
    
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, loadProducts, loadStats]);

  // Calcul du temps restant avant la prochaine mise à jour
  const getTimeUntilNextUpdate = () => {
    if (!nextRefresh) return null;
    const now = new Date();
    const diff = nextRefresh.getTime() - now.getTime();
    if (diff <= 0) return null;
    
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Obtenir tous les produits pour l'affichage
  const getAllProducts = () => {
    if (selectedSource === 'all') {
      return Object.values(products).flat();
    }
    return products[selectedSource] || [];
  };

  const allProducts = getAllProducts();
  const timeUntilNext = getTimeUntilNextUpdate();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* En-tête avec statistiques et contrôles */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Produits Auto-Mis à Jour</h2>
          <p className="text-muted-foreground">
            Système de mise à jour automatique avec cache durable
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={forceUpdate}
            disabled={updating}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${updating ? 'animate-spin' : ''}`} />
            {updating ? 'Mise à jour...' : 'Forcer MAJ'}
          </Button>
          
          <Button
            onClick={() => loadProducts(true)}
            disabled={loading}
            size="sm"
          >
            <Database className="w-4 h-4 mr-2" />
            Recharger
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      {showStats && stats && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Statistiques de Mise à Jour
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.totalProducts}</div>
                <div className="text-sm text-muted-foreground">Total Produits</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold">{Object.keys(stats.sources).length}</div>
                <div className="text-sm text-muted-foreground">Sources Actives</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {stats.autoUpdateEnabled ? (
                    <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-red-500 mx-auto" />
                  )}
                </div>
                <div className="text-sm text-muted-foreground">Auto-Update</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {timeUntilNext ? (
                    <span className="text-blue-500">{timeUntilNext}</span>
                  ) : (
                    <span className="text-orange-500">Maintenant</span>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">Prochaine MAJ</div>
              </div>
            </div>
            
            {/* Barre de progression */}
            {timeUntilNext && (
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progression vers la prochaine mise à jour</span>
                  <span>{timeUntilNext}</span>
                </div>
                <Progress 
                  value={100 - ((parseInt(timeUntilNext.split(':')[0]) * 60 + parseInt(timeUntilNext.split(':')[1])) / (refreshInterval / 60)) * 100} 
                  className="h-2" 
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Statut des sources */}
      {stats && (
        <Card>
          <CardHeader>
            <CardTitle>Statut des Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(stats.sources).map(([source, sourceStats]) => (
                <div key={source} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    {sourceStats.isActive ? (
                      <Wifi className="w-4 h-4 text-green-500" />
                    ) : (
                      <WifiOff className="w-4 h-4 text-red-500" />
                    )}
                    <span className="font-medium capitalize">{source}</span>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium">{sourceStats.productCount}</div>
                    <div className="text-xs text-muted-foreground">produits</div>
                  </div>
                  
                  <Button
                    onClick={() => updateSource(source)}
                    disabled={updating}
                    size="sm"
                    variant="ghost"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sélecteur de source */}
      <Tabs value={selectedSource} onValueChange={setSelectedSource}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="all">Tous</TabsTrigger>
          {Object.keys(products).map(source => (
            <TabsTrigger key={source} value={source} className="capitalize">
              {source}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {Object.keys(products).map(source => (
          <TabsContent key={source} value={source}>
            <ProductGrid products={products[source] || []} source={source} />
          </TabsContent>
        ))}
        
        <TabsContent value="all">
          <ProductGrid products={allProducts} source="all" />
        </TabsContent>
      </Tabs>

      {/* Messages d'état */}
      {loading && (
        <Alert>
          <RefreshCw className="h-4 w-4 animate-spin" />
          <AlertDescription>
            Chargement des produits en cours...
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Erreur: {error}
          </AlertDescription>
        </Alert>
      )}

      {!loading && !error && allProducts.length === 0 && (
        <Alert>
          <Database className="h-4 w-4" />
          <AlertDescription>
            Aucun produit disponible. Essayez de forcer la mise à jour.
          </AlertDescription>
        </Alert>
      )}

      {/* Informations de mise à jour */}
      {lastRefresh && (
        <div className="text-sm text-muted-foreground text-center">
          <Clock className="w-4 h-4 inline mr-1" />
          Dernière mise à jour: {lastRefresh.toLocaleString()}
          {nextRefresh && (
            <>
              {' • '}
              Prochaine mise à jour: {nextRefresh.toLocaleString()}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// Composant pour afficher la grille de produits
function ProductGrid({ products, source }: { products: Product[]; source: string }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <Database className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">
          Aucun produit disponible pour {source === 'all' ? 'cette sélection' : source}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// Composant pour afficher un produit individuel
function ProductCard({ product }: { product: Product }) {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="aspect-square relative overflow-hidden rounded-lg mb-3">
          <img
            src={product.images[0] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400'}
            alt={product.title}
            className="object-cover w-full h-full"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400';
            }}
          />
        </div>
        
        <CardTitle className="text-sm line-clamp-2">{product.title}</CardTitle>
        <CardDescription className="text-xs">
          {product.brand && `${product.brand} • `}
          {product.category}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 pb-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">
              {formatPrice(product.price.current, product.price.currency)}
            </span>
            {product.price.original && product.price.original > product.price.current && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.price.original, product.price.currency)}
              </span>
            )}
          </div>
          
          {product.rating && (
            <div className="flex items-center gap-1">
              <span className="text-sm">★ {product.rating}</span>
              {product.reviews && (
                <span className="text-xs text-muted-foreground">
                  ({product.reviews} avis)
                </span>
              )}
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <Badge variant={product.availability ? "default" : "secondary"}>
              {product.availability ? "Disponible" : "Indisponible"}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {product.source}
            </Badge>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="w-full text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            MAJ: {formatDate(product.lastUpdated)}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
} 