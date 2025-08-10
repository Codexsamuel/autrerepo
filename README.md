# DAVY Trading Platform

Plateforme de trading innovante avec IA - Solution complète pour le trading automatisé et l'analyse de marchés.

## 🚀 Démarrage Rapide

### Prérequis
- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation
```bash
# Cloner le projet
git clone <votre-repo>
cd nouveau-projet

# Installer les dépendances
pnpm install
```

### Développement
```bash
# Démarrer en mode développement
pnpm dev
```
L'application sera accessible sur http://localhost:3000

### Production
```bash
# Construire l'application
pnpm build

# Démarrer le serveur de production
pnpm start
```

### Nettoyage et reconstruction
```bash
# Nettoyer et reconstruire complètement
pnpm build:clean
```

## 📁 Structure du Projet

```
nouveau-projet/
├── app/                    # Pages Next.js (App Router)
├── components/             # Composants React réutilisables
├── lib/                    # Utilitaires et services
├── public/                 # Fichiers statiques
├── types/                  # Définitions TypeScript
└── api-backup/             # API routes
```

## 🔧 Configuration

### Variables d'environnement
Créez un fichier `.env.local` avec les variables suivantes :

```env
# Base de données
NEXT_PUBLIC_SUPABASE_URL=votre_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_supabase_key

# Authentification
NEXTAUTH_SECRET=votre_secret
NEXTAUTH_URL=http://localhost:3000

# API Keys
OPENAI_API_KEY=votre_openai_key
ALPHA_VANTAGE_API_KEY=votre_alpha_vantage_key

# Paiements
STRIPE_SECRET_KEY=votre_stripe_key
STRIPE_PUBLISHABLE_KEY=votre_stripe_publishable_key
CINETPAY_API_KEY=votre_cinetpay_key
CINETPAY_SECRET_KEY=votre_cinetpay_secret
CINETPAY_SITE_ID=votre_site_id
```

## 🛠️ Scripts Disponibles

- `pnpm dev` - Démarrage en mode développement
- `pnpm build` - Construction pour la production
- `pnpm start` - Démarrage du serveur de production
- `pnpm build:clean` - Nettoyage et reconstruction
- `pnpm lint` - Vérification du code avec ESLint
- `pnpm type-check` - Vérification des types TypeScript

## 🚀 Déploiement

### Netlify
```bash
# Déploiement automatique via Git
git push origin main

# Déploiement manuel
pnpm run deploy:netlify
```

### Vercel
```bash
# Déploiement automatique via Git
git push origin main

# Déploiement manuel
pnpm run deploy:vercel
```

## 📊 Fonctionnalités

### Trading
- 📈 Analyse technique automatisée
- 🤖 Signaux de trading IA
- 📊 Graphiques en temps réel
- 💰 Gestion de portefeuille

### E-commerce
- 🛒 Système de panier
- 💳 Paiements sécurisés
- 📦 Gestion des commandes
- 🚚 Suivi de livraison

### IA & Automatisation
- 🤖 Assistant IA intégré
- 📝 Génération de contenu
- 🔍 Analyse de données
- 📊 Rapports automatisés

### CRM & Gestion
- 👥 Gestion des clients
- 📞 Support client
- 📊 Tableaux de bord
- 🔔 Notifications

## 🔒 Sécurité

- 🔐 Authentification multi-facteurs
- 🛡️ Protection anti-bot
- 🔒 Chiffrement des données
- 🚨 Surveillance de sécurité

## 📱 Responsive Design

L'application est entièrement responsive et optimisée pour :
- 📱 Mobile
- 📱 Tablette
- 💻 Desktop

## 🎨 Technologies Utilisées

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Base de données**: Supabase, Prisma
- **Authentification**: NextAuth.js, Clerk
- **Paiements**: Stripe, CinetPay
- **IA**: OpenAI, Google AI
- **Déploiement**: Netlify, Vercel

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

- 📧 Email: support@davy-trading.com
- 🌐 Site web: https://davy-trading.com
- 📱 Discord: [Lien Discord]

## 🔄 Mise à Jour

Pour mettre à jour l'application :

```bash
# Mettre à jour les dépendances
pnpm update

# Reconstruire l'application
pnpm build:clean

# Redémarrer
pnpm start
```

---

**DAVY Trading Platform** - Votre partenaire de trading intelligent 🚀
# Force rebuild
# Configuration Netlify corrigée - Sat Jul  5 01:18:46 CEST 2025
# Configuration Vercel mise à jour pour sentinel-zero
