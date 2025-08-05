# Configuration API Amazon RapidAPI - DL Style

## 🎯 Objectif
Intégrer l'API Amazon via RapidAPI pour afficher des produits Amazon réels dans la page DL Style.

## 📋 Prérequis

### 1. Compte RapidAPI
- Créer un compte sur [RapidAPI](https://rapidapi.com)
- S'abonner à l'API "OTAPI Amazon" : [Lien direct](https://rapidapi.com/open-trade-commerce-open-trade-commerce-default/api/otapi-amazon/)

### 2. Clé API
- Obtenir votre clé API depuis le dashboard RapidAPI
- Notez votre clé API pour la configuration

## 🔧 Configuration

### 1. Variables d'Environnement

Créer ou modifier le fichier `.env.local` à la racine du projet :

```bash
# API Amazon RapidAPI
RAPIDAPI_KEY=votre_cle_api_ici
RAPIDAPI_HOST=otapi-amazon.p.rapidapi.com

# Configuration Amazon
AMAZON_API_ENABLED=true
AMAZON_CACHE_DURATION=300
```

### 2. Endpoints Disponibles

L'API Amazon RapidAPI offre les endpoints suivants :

| Endpoint | Description | Paramètres |
|----------|-------------|------------|
| `/search` | Recherche de produits | query, category, minPrice, maxPrice, rating, sortBy, page, limit |
| `/product` | Détails d'un produit | asin (Amazon Standard Identification Number) |
| `/categories` | Liste des catégories | Aucun |
| `/deals` | Offres spéciales | category, limit |
| `/trending` | Produits tendance | category, limit |

### 3. Paramètres de Recherche

```typescript
interface AmazonSearchParams {
  query: string;           // Terme de recherche
  category?: string;       // Catégorie de produit
  minPrice?: number;       // Prix minimum
  maxPrice?: number;       // Prix maximum
  rating?: number;         // Note minimum (1-5)
  sortBy?: 'price' | 'rating' | 'relevance' | 'newest';
  page?: number;           // Numéro de page
  limit?: number;          // Nombre de résultats par page
}
```

## 🚀 Utilisation

### 1. Test de l'API

```bash
# Test des catégories
curl "http://localhost:3000/api/amazon/products?action=categories"

# Test de recherche
curl "http://localhost:3000/api/amazon/products?query=iPhone&category=Electronics&page=1&limit=10"

# Test d'un produit spécifique
curl "http://localhost:3000/api/amazon/products?action=product&asin=B08N5WRWNW"
```

### 2. Interface Utilisateur

L'onglet "Amazon" est maintenant disponible dans la page DL Style avec :

- ✅ Recherche de produits
- ✅ Filtrage par catégorie
- ✅ Pagination
- ✅ Conversion de devises
- ✅ Ajout au panier
- ✅ Liens directs vers Amazon

## 🔍 Mode Simulation

Si la clé API n'est pas configurée, l'API fonctionne en mode simulation avec :

- 4 produits Amazon d'exemple
- 20 catégories simulées
- Fonctionnalités complètes de recherche et filtrage

## 📊 Données Retournées

### Format Produit Amazon

```typescript
interface AmazonProduct {
  id: string;              // ASIN Amazon
  title: string;           // Titre du produit
  description?: string;    // Description
  price: {
    current: number;       // Prix actuel
    original?: number;     // Prix original (si en promotion)
    currency: string;      // Devise (USD)
  };
  images: string[];        // URLs des images
  rating?: number;         // Note (1-5)
  reviews?: number;        // Nombre d'avis
  availability: boolean;   // Disponibilité
  category: string;        // Catégorie
  brand?: string;          // Marque
  features?: string[];     // Caractéristiques
  specifications?: Record<string, any>; // Spécifications techniques
  url: string;             // Lien Amazon
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
# Logs de l'API Amazon
tail -f logs/amazon-api.log

# Logs d'erreur
tail -f logs/error.log
```

### Métriques
- Nombre de requêtes API
- Taux de succès
- Temps de réponse
- Utilisation du cache

## 🎉 Résultat Final

Avec cette configuration, la page DL Style offre maintenant :

1. **Produits Amazon réels** avec recherche et filtrage
2. **Interface utilisateur moderne** avec pagination
3. **Conversion de devises** automatique
4. **Intégration panier** complète
5. **Mode simulation** en cas d'indisponibilité API
6. **Performance optimisée** avec cache

L'expérience utilisateur est maintenant complète et professionnelle ! 🚀 