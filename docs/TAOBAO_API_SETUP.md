# Configuration API Taobao/1688 RapidAPI - DL Style

## 🎯 Objectif
Intégrer l'API Taobao/1688 via RapidAPI pour afficher des produits chinois authentiques dans la page DL Style.

## 📋 Prérequis

### 1. Compte RapidAPI
- Créer un compte sur [RapidAPI](https://rapidapi.com)
- S'abonner à l'API "Taobao 1688 API" : [Lien direct](https://rapidapi.com/chuyenhangsieutocvn/api/taobao-1688-api1/)

### 2. Clé API
- Obtenir votre clé API depuis le dashboard RapidAPI
- Notez votre clé API pour la configuration

## 🔧 Configuration

### 1. Variables d'Environnement

Créer ou modifier le fichier `.env.local` à la racine du projet :

```bash
# API Taobao/1688 RapidAPI
RAPIDAPI_KEY=votre_cle_api_ici
RAPIDAPI_HOST=taobao-1688-api1.p.rapidapi.com

# Configuration Taobao/1688
TAOBAO_API_ENABLED=true
TAOBAO_CACHE_DURATION=300
```

### 2. Endpoints Disponibles

L'API Taobao/1688 RapidAPI offre les endpoints suivants :

| Endpoint | Description | Paramètres |
|----------|-------------|------------|
| `/v31/search` | Recherche de produits | keyword, site, page, limit |
| `/v31/detail` | Détails d'un produit | itemId, site |
| `/v31/search-by-image` | Recherche par image | image (base64) |
| `/v31/convert-link` | Conversion de liens courts | url |

### 3. Paramètres de Recherche

```typescript
interface TaobaoSearchParams {
  query: string;           // Terme de recherche
  site?: 'taobao' | '1688'; // Site (1688 = B2B, Taobao = B2C)
  category?: string;       // Catégorie de produit
  minPrice?: number;       // Prix minimum
  maxPrice?: number;       // Prix maximum
  sortBy?: 'price' | 'rating' | 'sales' | 'relevance';
  page?: number;           // Numéro de page
  limit?: number;          // Nombre de résultats par page
}
```

## 🚀 Utilisation

### 1. Test de l'API

```bash
# Test des catégories
curl "http://localhost:3000/api/taobao/products?action=categories"

# Test de recherche 1688
curl "http://localhost:3000/api/taobao/products?query=iPhone&site=1688&page=1&limit=10"

# Test de recherche Taobao
curl "http://localhost:3000/api/taobao/products?query=iPhone&site=taobao&page=1&limit=10"

# Test d'un produit spécifique
curl "http://localhost:3000/api/taobao/products?action=detail&itemId=885555631269&site=1688"
```

### 2. Interface Utilisateur

L'onglet "Taobao/1688" est maintenant disponible dans la page DL Style avec :

- ✅ Recherche de produits (1688 et Taobao)
- ✅ Filtrage par catégorie et site
- ✅ Pagination
- ✅ Conversion de devises (CNY → EUR/USD/FCFA)
- ✅ Ajout au panier
- ✅ Liens directs vers 1688/Taobao
- ✅ Informations vendeur

## 🔍 Mode Simulation

Si la clé API n'est pas configurée, l'API fonctionne en mode simulation avec :

- 6 produits Apple d'exemple (iPhone, MacBook, AirPods, etc.)
- 20 catégories simulées
- Fonctionnalités complètes de recherche et filtrage
- Informations vendeur réalistes

## 📊 Données Retournées

### Format Produit Taobao/1688

```typescript
interface TaobaoProduct {
  id: string;              // ID du produit
  title: string;           // Titre du produit
  description?: string;    // Description
  price: {
    current: number;       // Prix actuel (CNY)
    original?: number;     // Prix original (si en promotion)
    currency: string;      // Devise (CNY)
  };
  images: string[];        // URLs des images
  rating?: number;         // Note (1-5)
  reviews?: number;        // Nombre d'avis
  availability: boolean;   // Disponibilité
  category: string;        // Catégorie
  brand?: string;          // Marque
  features?: string[];     // Caractéristiques
  specifications?: Record<string, any>; // Spécifications techniques
  url: string;             // Lien 1688/Taobao
  site: 'taobao' | '1688'; // Site source
  seller?: {
    name: string;          // Nom du vendeur
    rating: number;        // Note du vendeur
    location: string;      // Localisation
  };
}
```

## 🛠️ Dépannage

### Erreur 403 (Forbidden)
- Vérifier que la clé API est correcte
- Vérifier que l'abonnement RapidAPI est actif
- Vérifier les limites d'utilisation

### Erreur 429 (Too Many Requests)
- L'API a atteint ses limites
- Attendre quelques minutes avant de réessayer
- Vérifier le plan d'abonnement RapidAPI

### Erreur 500 (Internal Server Error)
- Vérifier les logs du serveur
- Vérifier la configuration des variables d'environnement
- Redémarrer le serveur de développement

## 💡 Optimisations

### 1. Cache
- Cache intégré de 5 minutes pour les requêtes
- Réduction des appels API
- Amélioration des performances

### 2. Gestion d'Erreur
- Fallback automatique vers les données simulées
- Messages d'erreur informatifs
- Retry automatique en cas d'échec

### 3. Performance
- Pagination côté serveur
- Filtrage optimisé
- Images optimisées

## 🔐 Sécurité

### 1. Clé API
- Ne jamais commiter la clé API dans le code
- Utiliser les variables d'environnement
- Rotation régulière des clés

### 2. Rate Limiting
- Respecter les limites de l'API
- Implémentation de retry avec backoff
- Monitoring des appels API

## 📈 Monitoring

### Logs à Surveiller
```bash
# Logs de l'API Taobao/1688
tail -f logs/taobao-api.log

# Logs d'erreur
tail -f logs/error.log
```

### Métriques
- Nombre de requêtes API
- Taux de succès
- Temps de réponse
- Utilisation du cache

## 🌍 Différences 1688 vs Taobao

### 1688.com (B2B)
- **Public cible** : Entreprises et grossistes
- **Prix** : Prix de gros, quantités minimales
- **Produits** : Matériel industriel, composants
- **Livraison** : Expédition internationale

### Taobao.com (B2C)
- **Public cible** : Consommateurs individuels
- **Prix** : Prix de détail, pas de quantité minimale
- **Produits** : Produits finis, mode, électronique
- **Livraison** : Livraison locale et internationale

## 🎉 Résultat Final

Avec cette configuration, la page DL Style offre maintenant :

1. **Produits chinois authentiques** avec recherche et filtrage
2. **Interface utilisateur moderne** avec pagination
3. **Conversion de devises** automatique (CNY → EUR/USD/FCFA)
4. **Intégration panier** complète
5. **Mode simulation** en cas d'indisponibilité API
6. **Performance optimisée** avec cache
7. **Support B2B et B2C** (1688 et Taobao)

L'expérience utilisateur est maintenant complète et professionnelle ! 🚀

## 📚 Ressources

- [API Taobao 1688 sur RapidAPI](https://rapidapi.com/chuyenhangsieutocvn/api/taobao-1688-api1/)
- [Documentation 1688.com](https://1688.com)
- [Documentation Taobao.com](https://taobao.com)
- [Guide d'importation Chine-Cameroun](https://dlsolutions.com/import-chine) 