#!/bin/bash

# Script d'installation automatique pour DL Solutions
# Plateforme intelligente avec IA

echo "🚀 Installation de DL Solutions - Plateforme Intelligente"
echo "=================================================="

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier si Node.js est installé
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js n'est pas installé. Veuillez l'installer depuis https://nodejs.org/"
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js 18+ est requis. Version actuelle: $(node --version)"
        exit 1
    fi
    
    print_success "Node.js $(node --version) détecté"
}

# Vérifier si npm est installé
check_npm() {
    if ! command -v npm &> /dev/null; then
        print_error "npm n'est pas installé"
        exit 1
    fi
    
    print_success "npm $(npm --version) détecté"
}

# Installer les dépendances principales
install_dependencies() {
    print_status "Installation des dépendances principales..."
    
    # Dépendances Next.js et React
    npm install next@latest react@latest react-dom@latest
    
    # Dépendances UI et animations
    npm install tailwindcss@latest postcss@latest autoprefixer@latest
    npm install framer-motion@latest lucide-react@latest
    npm install @headlessui/react@latest @heroicons/react@latest
    
    # Dépendances pour les formulaires
    npm install react-hook-form@latest @hookform/resolvers@latest zod@latest
    
    # Dépendances pour les graphiques (optionnel)
    npm install recharts@latest chart.js@latest react-chartjs-2@latest
    
    # Dépendances pour l'authentification
    npm install @clerk/nextjs@latest
    
    # Dépendances pour la base de données
    npm install @supabase/supabase-js@latest
    
    # Dépendances pour les paiements
    npm install stripe@latest @stripe/stripe-js@latest
    
    # Dépendances pour l'IA et la synthèse vocale
    npm install openai@latest @elevenlabs/sdk@latest
    
    # Dépendances pour les notifications
    npm install react-hot-toast@latest
    
    # Dépendances pour les tests
    npm install --save-dev jest@latest @testing-library/react@latest @testing-library/jest-dom@latest
    
    print_success "Dépendances principales installées"
}

# Configurer Tailwind CSS
setup_tailwind() {
    print_status "Configuration de Tailwind CSS..."
    
    # Initialiser Tailwind
    npx tailwindcss init -p
    
    # Créer le fichier de configuration Tailwind
    cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
EOF
    
    print_success "Tailwind CSS configuré"
}

# Configurer les variables d'environnement
setup_env() {
    print_status "Configuration des variables d'environnement..."
    
    # Créer le fichier .env.local
    cat > .env.local << 'EOF'
# Configuration de base
NEXT_PUBLIC_APP_NAME="DL Solutions"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Clerk - Authentification
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Supabase - Base de données
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe - Paiements
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# OpenAI - Intelligence artificielle
OPENAI_API_KEY=your_openai_api_key

# ElevenLabs - Synthèse vocale
ELEVENLABS_API_KEY=your_elevenlabs_api_key

# Configuration des emails
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password

# Configuration de sécurité
JWT_SECRET=your_jwt_secret_key
ENCRYPTION_KEY=your_encryption_key

# Configuration des services externes
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Configuration de monitoring
SENTRY_DSN=your_sentry_dsn
LOG_LEVEL=info
EOF
    
    print_warning "Variables d'environnement créées. Veuillez les configurer avec vos vraies clés API."
    print_success "Fichier .env.local créé"
}

# Configurer Docker
setup_docker() {
    print_status "Configuration Docker..."
    
    # Créer Dockerfile
    cat > Dockerfile << 'EOF'
# Utiliser l'image Node.js officielle
FROM node:18-alpine AS base

# Installer les dépendances uniquement quand nécessaire
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild le code source uniquement quand nécessaire
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variables d'environnement pour la build
ENV NEXT_TELEMETRY_DISABLED 1

# Build de l'application
RUN npm run build

# Image de production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copier les fichiers de build
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
EOF
    
    # Créer docker-compose.yml
    cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env.local
    restart: unless-stopped
    depends_on:
      - redis
    networks:
      - dl-solutions

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped
    networks:
      - dl-solutions

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped
    networks:
      - dl-solutions

volumes:
  redis_data:

networks:
  dl-solutions:
    driver: bridge
EOF
    
    # Créer .dockerignore
    cat > .dockerignore << 'EOF'
node_modules
.next
.git
.env.local
.env.development.local
.env.test.local
.env.production.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
README.md
.gitignore
Dockerfile
docker-compose.yml
.dockerignore
EOF
    
    print_success "Configuration Docker créée"
}

# Configurer les scripts npm
setup_scripts() {
    print_status "Configuration des scripts npm..."
    
    # Mettre à jour package.json avec les scripts
    npm pkg set scripts.dev="next dev"
    npm pkg set scripts.build="next build"
    npm pkg set scripts.start="next start"
    npm pkg set scripts.lint="next lint"
    npm pkg set scripts.type-check="tsc --noEmit"
    npm pkg set scripts.test="jest"
    npm pkg set scripts.test:watch="jest --watch"
    npm pkg set scripts.docker:build="docker build -t dl-solutions ."
    npm pkg set scripts.docker:run="docker run -p 3000:3000 dl-solutions"
    npm pkg set scripts.docker:compose="docker-compose up -d"
    npm pkg set scripts.docker:compose:down="docker-compose down"
    
    print_success "Scripts npm configurés"
}

# Configurer les outils de développement
setup_dev_tools() {
    print_status "Configuration des outils de développement..."
    
    # Installer les outils de développement
    npm install --save-dev @types/node @types/react @types/react-dom
    npm install --save-dev typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
    npm install --save-dev eslint eslint-config-next prettier
    npm install --save-dev husky lint-staged
    
    # Configurer ESLint
    cat > .eslintrc.json << 'EOF'
{
  "extends": ["next/core-web-vitals", "@typescript-eslint/recommended"],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "error",
    "no-var": "error"
  }
}
EOF
    
    # Configurer Prettier
    cat > .prettierrc << 'EOF'
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
EOF
    
    print_success "Outils de développement configurés"
}

# Créer la structure des dossiers
create_structure() {
    print_status "Création de la structure des dossiers..."
    
    # Créer les dossiers nécessaires
    mkdir -p app/{admin,dashboard,api} components/{ui,forms,charts} lib/{utils,hooks,types} public/{images,icons}
    
    print_success "Structure des dossiers créée"
}

# Configuration finale
final_setup() {
    print_status "Configuration finale..."
    
    # Créer un fichier README
    cat > README.md << 'EOF'
# DL Solutions - Plateforme Intelligente

## 🚀 Description

Plateforme de gestion intelligente intégrant IA, automatisation et outils avancés pour optimiser les processus métier.

## ✨ Fonctionnalités

- 🤖 Assistant IA DAVY avec reconnaissance vocale
- 📄 Générateur de documents intelligent
- 👥 Dashboard RH avancé
- 📝 Formulaires dynamiques avec IA
- 💬 Chatbot intelligent
- ✅ Gestionnaire de tâches automatisé
- 📊 Analytics avancés avec insights IA
- 🔔 Système de notifications intelligent
- 🔌 Intégrations API multiples

## 🛠️ Installation

1. Cloner le repository
2. Exécuter le script d'installation : `./scripts/setup.sh`
3. Configurer les variables d'environnement dans `.env.local`
4. Lancer le serveur de développement : `npm run dev`

## 🐳 Docker

```bash
# Build de l'image
npm run docker:build

# Lancer avec Docker Compose
npm run docker:compose
```

## 📚 Documentation

Consultez la documentation complète dans le dossier `docs/`.

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commit les changements
4. Push vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.
EOF
    
    print_success "Configuration finale terminée"
}

# Fonction principale
main() {
    print_status "Démarrage de l'installation..."
    
    # Vérifications préliminaires
    check_node
    check_npm
    
    # Installation et configuration
    install_dependencies
    setup_tailwind
    setup_env
    setup_docker
    setup_scripts
    setup_dev_tools
    create_structure
    final_setup
    
    print_success "🎉 Installation terminée avec succès !"
    echo ""
    echo "Prochaines étapes :"
    echo "1. Configurez vos variables d'environnement dans .env.local"
    echo "2. Lancez le serveur de développement : npm run dev"
    echo "3. Ouvrez http://localhost:3000 dans votre navigateur"
    echo ""
    echo "Documentation disponible dans README.md"
}

# Exécuter le script principal
main "$@" 