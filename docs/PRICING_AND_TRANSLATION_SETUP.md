# Configuration Système de Pricing et Traduction - DL Style

## 🎯 Objectif

Intégrer un système complet de gestion des prix avec marges bénéficiaires et traduction automatique pour masquer les prix d'origine et offrir une expérience multilingue.

## 🔧 Fonctionnalités Principales

### 1. **Système de Pricing avec Marges**
- **Masquage des prix d'origine** : Seul l'admin voit les vrais prix
- **Marges automatiques** : Calcul automatique selon la source
- **Conversion de devises** : Support de 8 devises
- **Limites de marge** : Min/max par devise

### 2. **Système de Traduction**
- **40 langues** supportées
- **Traduction automatique** des descriptions
- **Détection de langue** automatique
- **Cache intelligent** pour optimiser les performances

## 📊 Configuration des Marges par Source

### Marges Bénéficiaires Configurées
```typescript
const PROFIT_MARGINS = {
  'shein': 0.5,        // 50% de marge sur Shein
  'amazon': 0.3,       // 30% de marge sur Amazon
  'taobao': 0.4,       // 40% de marge sur Taobao
  '1688': 0.35,        // 35% de marge sur 1688
  'ebay': 0.25,        // 25% de marge sur eBay
  'aliexpress': 0.45,  // 45% de marge sur AliExpress
  'chinese-stores': 0.4, // 40% de marge sur stores chinoises
  'default': 0.35      // Marge par défaut
};
```

### Exemple de Calcul
- **Produit Shein** : 20 USD → 30 EUR (50% de marge)
- **Produit Amazon** : 100 USD → 110.5 EUR (30% de marge)
- **Produit AliExpress** : 15 USD → 21.75 EUR (45% de marge)

## 💱 Devises Supportées

### Taux de Change (à jour)
```typescript
const EXCHANGE_RATES = {
  'USD': 1.0,      // Dollar US (référence)
  'EUR': 0.85,     // Euro
  'FCFA': 550.0,   // Franc CFA
  'CNY': 6.5,      // Yuan Chinois
  'GBP': 0.73,     // Livre Sterling
  'JPY': 110.0,    // Yen Japonais
  'CAD': 1.25,     // Dollar Canadien
  'AUD': 1.35      // Dollar Australien
};
```

### Limites de Marge par Devise
```typescript
const MARGIN_LIMITS = {
  'USD': { min: 5, max: 100 },
  'EUR': { min: 4, max: 85 },
  'FCFA': { min: 2500, max: 50000 },
  'CNY': { min: 30, max: 650 }
};
```

## 🌍 Langues de Traduction

### 40 Langues Supportées
- **Langues principales** : EN, FR, ES, DE, IT, PT, RU, ZH, JA, KO, AR
- **Langues africaines** : SW, AM, YO, IG, ZU, XH, AF
- **Langues européennes** : NL, PL, SV, DA, NO, FI, CS, HU, RO, BG, HR, SK, SL, ET, LV, LT, MT, EL, HE
- **Langues asiatiques** : TH, VI, ID, MS, TL, BN, UR, FA
- **Autres** : TR, HI

## 🚀 Utilisation

### 1. API Pricing

#### Calcul de Prix Simple
```bash
# Prix client (masqué)
curl "http://localhost:3000/api/pricing?price=20&currency=USD&targetCurrency=EUR&source=shein"

# Réponse client
{
  "success": true,
  "data": {
    "sellingPrice": 25.5,
    "sellingCurrency": "EUR",
    "exchangeRate": 0.85
  }
}
```

#### Calcul de Prix Admin (complet)
```bash
# Prix admin (avec toutes les infos)
curl "http://localhost:3000/api/pricing?price=20&currency=USD&targetCurrency=EUR&source=shein&admin=true"

# Réponse admin
{
  "success": true,
  "data": {
    "originalPrice": 20,
    "originalCurrency": "USD",
    "sellingPrice": 25.5,
    "sellingCurrency": "EUR",
    "profitMargin": 0.5,
    "profitAmount": 8.5,
    "exchangeRate": 0.85,
    "source": "shein",
    "isAdmin": true,
    "markupPercentage": 50
  }
}
```

### 2. API Traduction

#### Traduction de Texte
```bash
curl "http://localhost:3000/api/translate?text=Hello&from=en&to=fr"

# Réponse
{
  "success": true,
  "data": {
    "translatedText": "Bonjour, comment allez-vous ?",
    "originalText": "Hello",
    "from": "en",
    "to": "fr",
    "confidence": 0.95
  }
}
```

#### Détection de Langue
```bash
curl "http://localhost:3000/api/translate?action=detect&text=Bonjour"

# Réponse
{
  "success": true,
  "data": {
    "language": "fr",
    "text": "Bonjour"
  }
}
```

#### Liste des Langues
```bash
curl "http://localhost:3000/api/translate?action=languages"

# Réponse
{
  "success": true,
  "data": [
    { "code": "en", "name": "English", "nativeName": "English" },
    { "code": "fr", "name": "French", "nativeName": "Français" },
    // ... 40 langues
  ]
}
```

## 🎨 Composants React

### 1. Provider de Traduction
```tsx
import { TranslationProvider, LanguageSelector, TranslatedText } from '@/components/ui/TranslationProvider';

function App() {
  return (
    <TranslationProvider defaultLanguage="fr">
      <div>
        <LanguageSelector />
        <TranslatedText text="Hello World" from="en" to="fr" />
      </div>
    </TranslationProvider>
  );
}
```

### 2. Provider de Devise
```tsx
import { CurrencyProvider, CurrencySelector, PricedProduct } from '@/components/ui/CurrencyProvider';

function App() {
  return (
    <CurrencyProvider defaultCurrency="EUR" isAdmin={false}>
      <div>
        <CurrencySelector />
        <PricedProduct 
          originalPrice={20} 
          originalCurrency="USD" 
          source="shein" 
        />
      </div>
    </CurrencyProvider>
  );
}
```

### 3. Composants Avancés

#### Sélecteur de Langue Compact
```tsx
<LanguageSelector variant="compact" showIcon={true} />
```

#### Sélecteur de Devise Compact
```tsx
<CurrencySelector variant="compact" showIcon={true} />
```

#### Produit avec Prix et Marge
```tsx
<PricedProduct 
  originalPrice={20} 
  originalCurrency="USD" 
  source="shein"
  showOriginalPrice={false}
  showProfitInfo={true} // Admin uniquement
/>
```

#### Informations de Marge (Admin)
```tsx
<ProfitInfo pricingInfo={pricingInfo} />
```

## 🔐 Sécurité et Confidentialité

### 1. **Masquage des Prix d'Origine**
- **Client** : Ne voit que le prix de vente final
- **Admin** : Voit tous les détails (prix original, marge, bénéfice)
- **Paramètre** : `admin=true` pour accéder aux infos complètes

### 2. **Protection des Marges**
- **Marges minimales** : Garantissent un bénéfice minimum
- **Marges maximales** : Évitent les prix trop élevés
- **Calcul automatique** : Selon la source et la devise

### 3. **Cache Sécurisé**
- **Traductions** : Cache de 10 minutes
- **Prix** : Calcul en temps réel
- **LocalStorage** : Préférences utilisateur uniquement

## 📈 Exemples Concrets

### Exemple 1 : Produit Shein
```typescript
// Prix original : 20 USD
// Source : shein (50% de marge)
// Devise cible : EUR

// Calcul :
// 1. Conversion : 20 USD × 0.85 = 17 EUR
// 2. Marge : 17 EUR × 50% = 8.5 EUR
// 3. Prix final : 17 + 8.5 = 25.5 EUR

// Client voit : 25.5 EUR
// Admin voit : Prix original 20 USD, marge 50%, bénéfice 8.5 EUR
```

### Exemple 2 : Produit Amazon
```typescript
// Prix original : 100 USD
// Source : amazon (30% de marge)
// Devise cible : FCFA

// Calcul :
// 1. Conversion : 100 USD × 550 = 55,000 FCFA
// 2. Marge : 55,000 FCFA × 30% = 16,500 FCFA
// 3. Prix final : 55,000 + 16,500 = 71,500 FCFA

// Client voit : 71,500 FCFA
// Admin voit : Prix original 100 USD, marge 30%, bénéfice 16,500 FCFA
```

## 🛠️ Configuration Avancée

### 1. Variables d'Environnement
```env
# Configuration Pricing
PRICING_ENABLED=true
DEFAULT_MARGIN=0.35
MIN_PROFIT_EUR=4
MAX_PROFIT_EUR=85

# Configuration Traduction
TRANSLATION_ENABLED=true
TRANSLATION_CACHE_DURATION=600
DEFAULT_LANGUAGE=fr

# Configuration Admin
ADMIN_MODE_ENABLED=false
SHOW_ORIGINAL_PRICES=false
SHOW_PROFIT_INFO=false
```

### 2. Mise à Jour des Taux de Change
```typescript
// Mettre à jour régulièrement dans app/api/pricing/route.ts
const EXCHANGE_RATES = {
  'USD': 1.0,
  'EUR': 0.85,  // Mettre à jour selon le taux actuel
  'FCFA': 550.0, // Mettre à jour selon le taux actuel
  // ...
};
```

### 3. Ajustement des Marges
```typescript
// Modifier dans app/api/pricing/route.ts
const PROFIT_MARGINS = {
  'shein': 0.5,        // Ajuster selon la stratégie
  'amazon': 0.3,       // Ajuster selon la stratégie
  // ...
};
```

## 📊 Monitoring et Analytics

### 1. Statistiques Pricing
```bash
curl "http://localhost:3000/api/pricing?action=stats"
```

### 2. Statistiques Traduction
```bash
curl "http://localhost:3000/api/translate?action=stats"
```

### 3. Marges par Source (Admin)
```bash
curl "http://localhost:3000/api/pricing?action=margins&admin=true"
```

## 🎉 Avantages du Système

### 1. **Confidentialité Totale**
- ✅ Prix d'origine masqués aux clients
- ✅ Marges bénéficiaires protégées
- ✅ Seul l'admin voit les vrais coûts

### 2. **Flexibilité Maximale**
- ✅ Marges personnalisées par source
- ✅ Support de 8 devises
- ✅ 40 langues de traduction

### 3. **Performance Optimisée**
- ✅ Cache intelligent
- ✅ Calculs en temps réel
- ✅ Fallback automatique

### 4. **Expérience Utilisateur**
- ✅ Interface multilingue
- ✅ Prix adaptés à la devise locale
- ✅ Traduction automatique des descriptions

## 🚀 Intégration dans DL Style

### 1. **Layout Principal**
```tsx
// app/layout.tsx
import { TranslationProvider } from '@/components/ui/TranslationProvider';
import { CurrencyProvider } from '@/components/ui/CurrencyProvider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <TranslationProvider defaultLanguage="fr">
          <CurrencyProvider defaultCurrency="EUR" isAdmin={false}>
            {children}
          </CurrencyProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
```

### 2. **Header avec Sélecteurs**
```tsx
// Composants dans le header
<div className="flex items-center space-x-4">
  <LanguageSelector variant="compact" />
  <CurrencySelector variant="compact" />
</div>
```

### 3. **Produits avec Prix Masqués**
```tsx
// Dans les cartes de produits
<PricedProduct 
  originalPrice={product.price.current}
  originalCurrency={product.price.currency}
  source={product.source}
  showOriginalPrice={false}
  showProfitInfo={isAdmin}
/>
```

Ce système garantit que **seul l'administrateur connaît les vrais prix d'origine** tout en offrant une expérience utilisateur optimale avec traduction automatique et prix adaptés à la devise locale ! 🎯 