# 🚀 Guide de Configuration Alibaba 1688 API

## 📋 Prérequis

- Compte Alibaba 1688 développeur
- Aliyun CLI installé
- Node.js et npm

## 🔑 Étape 1: Obtenir les Clés API

### 1. Créer un compte développeur
- Aller sur https://open.1688.com/
- Créer un compte développeur
- Vérifier votre identité

### 2. Créer une application
- Cliquer sur "Créer une application"
- Remplir les informations requises
- Sélectionner les APIs nécessaires:
  - `alibaba.category.search`
  - `alibaba.product.search`
  - `alibaba.product.get`
  - `alibaba.category.attribute.get`

### 3. Obtenir les clés
- **App Key**: Clé publique de votre application
- **App Secret**: Clé secrète de votre application
- **Access Token**: Token d'accès (généré après autorisation)
- **Refresh Token**: Token de rafraîchissement

## ⚙️ Étape 2: Configuration Locale

### 1. Mettre à jour .env.local
```bash
# Alibaba 1688 API Configuration
ALIBABA_APP_KEY=your_real_app_key_here
ALIBABA_APP_SECRET=your_real_app_secret_here
ALIBABA_ACCESS_TOKEN=your_real_access_token_here
ALIBABA_REFRESH_TOKEN=your_real_refresh_token_here
ALIBABA_API_BASE_URL=https://gw.open.1688.com/openapi
```

### 2. Tester la configuration
```bash
node scripts/test-alibaba.js
```

## 🧪 Étape 3: Tests

### Test des APIs
```bash
# Test complet
npm run test:alibaba

# Test spécifique
curl "http://localhost:3000/api/scraping/official?action=stats"
```

## 🔧 Étape 4: Intégration

### Dans votre application
```javascript
import { Alibaba1688OfficialAPI } from '@/lib/scraper/alibaba-official-api';

const alibabaAPI = new Alibaba1688OfficialAPI();

// Recherche de produits
const products = await alibabaAPI.searchProducts('smartphone', 'Electronics', 10);

// Détails d'un produit
const productDetails = await alibabaAPI.getProductDetails('product_id');
```

## 🚨 Dépannage

### Erreur 403 - Accès refusé
- Vérifier que vos clés API sont correctes
- Vérifier les permissions de votre application
- Vérifier que l'Access Token n'a pas expiré

### Erreur 401 - Non autorisé
- Régénérer l'Access Token
- Vérifier l'App Secret

### Erreur de signature
- Vérifier la génération de signature
- Vérifier le timestamp

## 📞 Support

- Documentation officielle: https://open.1688.com/doc/
- Support technique: https://open.1688.com/support/
- Forum développeurs: https://open.1688.com/forum/

## ✅ Checklist

- [ ] Compte développeur créé
- [ ] Application créée
- [ ] Clés API obtenues
- [ ] .env.local configuré
- [ ] Tests passés
- [ ] Intégration fonctionnelle
- [ ] Production déployée

---

**🎯 Votre système Alibaba 1688 est maintenant prêt pour la production !**
