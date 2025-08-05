# 🚀 Configuration des APIs Réelles - DL Style

## 📋 **APIs à Configurer pour de Vrais Produits**

### 1. **Amazon Products API**
- **URL RapidAPI** : https://rapidapi.com/letscrape-6bRBa3QguO5/api/amazon-products1/
- **Plan Gratuit** : 100 requêtes/mois
- **Fonctionnalités** : Recherche produits, détails, prix, images
- **Coût** : Gratuit (limité)

### 2. **Taobao/1688 API**
- **URL RapidAPI** : https://rapidapi.com/taobao-api/
- **Plan Gratuit** : 50 requêtes/mois
- **Fonctionnalités** : Produits chinois, prix en CNY
- **Coût** : Gratuit (limité)

### 3. **eBay API**
- **URL RapidAPI** : https://rapidapi.com/ebay-search-result/
- **Plan Gratuit** : 100 requêtes/mois
- **Fonctionnalités** : Enchères, produits neufs/occasion
- **Coût** : Gratuit (limité)

### 4. **AliExpress API**
- **URL RapidAPI** : https://rapidapi.com/aliexpress-data-scraper/
- **Plan Gratuit** : 50 requêtes/mois
- **Fonctionnalités** : Produits chinois, dropshipping
- **Coût** : Gratuit (limité)

### 5. **Google Translator API**
- **URL RapidAPI** : https://rapidapi.com/google-translate1/
- **Plan Gratuit** : 500,000 caractères/mois
- **Fonctionnalités** : Traduction 40+ langues
- **Coût** : Gratuit (limité)

---

## 🔧 **Étapes de Configuration**

### **Étape 1 : Créer un compte RapidAPI**
1. Allez sur https://rapidapi.com/
2. Cliquez sur "Sign Up"
3. Créez un compte gratuit
4. Vérifiez votre email

### **Étape 2 : Souscrire aux APIs**
Pour chaque API :

1. **Amazon Products** :
   - Recherchez "Amazon Products"
   - Cliquez sur "Subscribe to Test"
   - Choisissez le plan gratuit
   - Copiez la clé API

2. **Taobao/1688** :
   - Recherchez "Taobao API"
   - Souscrivez au plan gratuit
   - Copiez la clé API

3. **eBay** :
   - Recherchez "eBay Search"
   - Souscrivez au plan gratuit
   - Copiez la clé API

4. **AliExpress** :
   - Recherchez "AliExpress Scraper"
   - Souscrivez au plan gratuit
   - Copiez la clé API

5. **Google Translator** :
   - Recherchez "Google Translate"
   - Souscrivez au plan gratuit
   - Copiez la clé API

### **Étape 3 : Configurer les Variables d'Environnement**

Créez un fichier `.env.local` à la racine du projet :

```bash
# Amazon Products API
RAPIDAPI_AMAZON_KEY=votre_clé_amazon_ici
RAPIDAPI_AMAZON_HOST=amazon-products1.p.rapidapi.com

# Taobao/1688 API
RAPIDAPI_TAOBAO_KEY=votre_clé_taobao_ici
RAPIDAPI_TAOBAO_HOST=taobao-api.p.rapidapi.com

# eBay API
RAPIDAPI_EBAY_KEY=votre_clé_ebay_ici
RAPIDAPI_EBAY_HOST=ebay-search-result.p.rapidapi.com

# AliExpress API
RAPIDAPI_ALIEXPRESS_KEY=votre_clé_aliexpress_ici
RAPIDAPI_ALIEXPRESS_HOST=aliexpress-data-scraper.p.rapidapi.com

# Google Translator API
RAPIDAPI_TRANSLATOR_KEY=votre_clé_translator_ici
RAPIDAPI_TRANSLATOR_HOST=google-translate1.p.rapidapi.com
```

### **Étape 4 : Redémarrer le Serveur**
```bash
# Arrêter le serveur (Ctrl+C)
# Puis redémarrer
npm run dev
```

---

## 🧪 **Test des APIs**

### **Test Amazon**
```bash
curl "http://localhost:3001/api/amazon/products?query=iphone&page=1&limit=5"
```

### **Test Taobao**
```bash
curl "http://localhost:3001/api/taobao/products?query=phone&site=taobao&page=1&limit=5"
```

### **Test eBay**
```bash
curl "http://localhost:3001/api/ebay/products?query=electronics&page=1&limit=5"
```

### **Test AliExpress**
```bash
curl "http://localhost:3001/api/aliexpress/products?query=phone&page=1&limit=5"
```

### **Test Traduction**
```bash
curl "http://localhost:3001/api/translate?action=translate&text=Hello&target=fr"
```

---

## 📊 **Limites des Plans Gratuits**

| API | Requêtes/Mois | Caractères/Mois | Coût |
|-----|---------------|-----------------|------|
| Amazon | 100 | - | Gratuit |
| Taobao | 50 | - | Gratuit |
| eBay | 100 | - | Gratuit |
| AliExpress | 50 | - | Gratuit |
| Translator | - | 500,000 | Gratuit |

**⚠️ Important** : Les plans gratuits ont des limites. Pour la production, considérez les plans payants.

---

## 🚀 **Optimisation pour la Production**

### **1. Cache Intelligent**
- Les produits sont mis en cache 6 heures
- Réduit les appels API
- Économise les requêtes

### **2. Fallback Robuste**
- Si API échoue → Cache
- Si pas de cache → Produits simulés
- Garantit toujours des produits

### **3. Rotation des Clés**
- Utilisez plusieurs comptes RapidAPI
- Distribuez les requêtes
- Évitez les limites

### **4. Monitoring**
- Surveillez l'utilisation des APIs
- Alertes quand limites atteintes
- Statistiques d'utilisation

---

## 🔍 **Dépannage**

### **Erreur 403 (Forbidden)**
- Vérifiez la clé API
- Vérifiez l'host
- Vérifiez les limites

### **Erreur 429 (Too Many Requests)**
- Limite atteinte
- Attendez le reset mensuel
- Passez au plan payant

### **Pas de Produits**
- Vérifiez la requête
- Testez l'API directement
- Vérifiez les logs

### **Problèmes de Traduction**
- Vérifiez la clé translator
- Vérifiez les langues supportées
- Testez avec un texte simple

---

## 💡 **Conseils d'Optimisation**

### **1. Requêtes Efficaces**
- Utilisez des mots-clés précis
- Limitez le nombre de résultats
- Évitez les requêtes vides

### **2. Cache Stratégique**
- Cachez les produits populaires
- Mettez à jour les prix régulièrement
- Gardez les images en cache

### **3. Gestion des Erreurs**
- Retry automatique
- Fallback intelligent
- Logs détaillés

### **4. Performance**
- Requêtes parallèles
- Timeout approprié
- Compression des données

---

## 🎯 **Résultat Attendu**

Avec les vraies APIs configurées, vous devriez voir :

- **Vrais produits** de vrais marchés
- **Prix réels** et à jour
- **Images authentiques** des produits
- **Descriptions détaillées**
- **Disponibilité en temps réel**
- **Traduction automatique**

**Le système passera automatiquement du mode simulation au mode réel !** 🚀 