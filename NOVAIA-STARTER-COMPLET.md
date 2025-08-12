# 🚀 NOVAIA - Starter Complet

> **NovaIA** est maintenant prêt ! Voici tout ce que vous avez et comment l'utiliser.

## 📦 Ce qui a été créé

### 🏗️ Structure Monorepo
```
novaia/
├─ 📋 Documentation
│  ├─ novaia-monorepo-structure.md    # Architecture complète
│  ├─ novaia-README.md                # README principal
│  └─ NOVAIA-STARTER-COMPLET.md       # Ce fichier
├─ ⚙️ Configuration
│  ├─ novaia-package.json             # Package.json racine (Turborepo)
│  ├─ novaia-turbo.json               # Configuration Turborepo
│  ├─ novaia-docker-compose.yml       # Docker Compose complet
│  ├─ novaia-.env.example             # Variables d'environnement
│  ├─ novaia-start.sh                 # Script de démarrage Linux/Mac
│  └─ novaia-start.bat                # Script de démarrage Windows
├─ 🔌 Services Backend
│  ├─ services/agents-api/             # API FastAPI (RAG, embeddings, judge)
│  │  ├─ main.py                      # API principale
│  │  └─ requirements.txt              # Dépendances Python
│  └─ services/control-api/            # API NestJS (RBAC, WebSocket)
│     ├─ package.json                  # Dépendances Node.js
│     ├─ src/main.ts                   # Point d'entrée
│     └─ src/app.module.ts             # Module principal
├─ 🖥️ Applications Frontend
│  └─ apps/marketplace/                # Marketplace Next.js
│     ├─ package.json                  # Dépendances
│     └─ app/page.tsx                  # Page principale
├─ 📦 Packages Partagés
│  ├─ packages/shared/                 # Composants UI communs
│  │  └─ package.json
│  ├─ packages/protocols/              # Schémas A2A/MCP
│  │  └─ package.json
│  └─ packages/agents/                 # Outils Python
│     └─ pyproject.toml
└─ 🔒 Politiques de Sécurité
    ├─ policies/rbac.yaml              # Contrôle d'accès basé sur les rôles
    └─ policies/abac.yaml              # Contrôle d'accès basé sur les attributs
```

## 🚀 Démarrage Rapide

### Option 1: Script Automatique (Recommandé)

#### Windows
```cmd
# Double-cliquer sur novaia-start.bat
# OU en ligne de commande :
novaia-start.bat
```

#### Linux/Mac
```bash
# Rendre le script exécutable
chmod +x novaia-start.sh

# Lancer le script
./novaia-start.sh
```

### Option 2: Manuel

1. **Renommer les fichiers**
   ```bash
   mv novaia-package.json package.json
   mv novaia-turbo.json turbo.json
   mv novaia-docker-compose.yml docker-compose.yml
   mv novaia-.env.example .env.example
   ```

2. **Installer les dépendances**
   ```bash
   pnpm install
   ```

3. **Configurer l'environnement**
   ```bash
   cp .env.example .env
   # Ajuster les variables selon votre configuration
   ```

4. **Lancer l'infrastructure**
   ```bash
   pnpm docker:up
   ```

5. **Télécharger les modèles Ollama**
   ```bash
   pnpm ollama:pull
   ```

6. **Démarrer le développement**
   ```bash
   pnpm dev
   ```

## 🌐 Accès aux Applications

Une fois démarré, vous aurez accès à :

- **🏪 Marketplace** : http://localhost:3000
- **🎛️ NovaCore** : http://localhost:3001  
- **⚔️ Battle Arena** : http://localhost:3002
- **🧬 Agent Lab** : http://localhost:3003
- **🔌 API Agents** : http://localhost:8000
- **🎮 API Contrôle** : http://localhost:4000
- **📚 Documentation** : http://localhost:4000/docs

## 🔧 Configuration Matérielle

### CUDA (NVIDIA)
Le Docker Compose est configuré par défaut pour CUDA. Si vous avez une carte NVIDIA :
- Assurez-vous que Docker Desktop avec NVIDIA Container Toolkit est installé
- Les drivers NVIDIA doivent être à jour
- La section GPU dans le docker-compose.yml est déjà activée

### CPU/DirectML
Si vous n'avez pas de GPU NVIDIA, commentez cette section dans `docker-compose.yml` :
```yaml
ollama:
  # deploy:
  #   resources:
  #     reservations:
  #       devices:
  #         - driver: nvidia
  #           count: all
  #           capabilities: [gpu]
```

## 📊 Modèles Ollama

Les modèles suivants seront automatiquement téléchargés :
- **llama3.1:8b-instruct-q4_K_M** : Modèle LLM principal (8B paramètres, quantisé Q4)
- **nomic-embed-text** : Modèle d'embeddings pour RAG

## 🔒 Sécurité

### RBAC (9 rôles prédéfinis)
- `super_admin` : Accès complet
- `system_admin` : Gestion système
- `security_admin` : Sécurité et conformité
- `operator` : Utilisateur avancé
- `agent_developer` : Création d'agents
- `data_analyst` : Analyse de données
- `business_user` : Utilisateur métier
- `viewer` : Lecture seule
- `guest` : Accès limité

### ABAC (Règles contextuelles)
- Contrôle basé sur l'heure, localisation, risque
- Protection PII automatique
- Mode AirGap supporté
- Sandboxing des outils

## 🧪 Développement

### Commandes utiles
```bash
# Développement
pnpm dev                    # Démarre toutes les apps
pnpm build                  # Build de production
pnpm test                   # Tests unitaires
pnpm lint                   # Vérification du code

# Docker
pnpm docker:up              # Lance l'infrastructure
pnpm docker:down            # Arrête l'infrastructure
pnpm docker:logs            # Affiche les logs

# Ollama
pnpm ollama:pull            # Télécharge les modèles
```

### Ajout d'un nouvel agent
1. Créer le blueprint dans `apps/agent-lab/blueprints/`
2. Définir les capacités et outils
3. Tester avec les datasets de test
4. Publier sur le marketplace

## 🚨 Résolution de Problèmes

### Docker ne démarre pas
- Vérifiez que Docker Desktop est en cours d'exécution
- Assurez-vous que WSL2 est activé (Windows)
- Vérifiez les permissions Docker

### Ollama ne répond pas
- Attendez 15-30 secondes après le démarrage
- Vérifiez les logs : `docker-compose logs ollama`
- Redémarrez : `docker-compose restart ollama`

### Ports déjà utilisés
- Arrêtez les services qui utilisent les ports 3000-3003, 4000, 4001, 8000, 5432, 6379, 11434
- Ou modifiez les ports dans `docker-compose.yml`

### Modèles Ollama non téléchargés
- Vérifiez la connexion internet
- Vérifiez l'espace disque disponible
- Relancez : `pnpm ollama:pull`

## 📚 Prochaines Étapes

1. **Explorer le Marketplace** : Découvrez les agents disponibles
2. **Créer votre premier agent** : Utilisez AgentGenesis
3. **Tester dans l'Arène** : Évaluez les performances
4. **Monitorer avec NovaCore** : Surveillez la flotte
5. **Personnaliser les politiques** : Adaptez RBAC/ABAC à vos besoins

## 🤝 Support

- **Documentation** : Lisez les fichiers .md créés
- **Issues** : Créez des issues sur GitHub
- **Discussions** : Participez aux discussions de la communauté

## 🎯 Ce qui est inclus

✅ **Architecture complète** : Monorepo Turborepo + Docker  
✅ **Backend** : FastAPI (Python) + NestJS (TypeScript)  
✅ **Frontend** : Next.js + Tailwind + shadcn/ui  
✅ **Base de données** : PostgreSQL + Redis  
✅ **IA locale** : Ollama + modèles quantisés  
✅ **Sécurité** : RBAC/ABAC + politiques YAML  
✅ **Scripts** : Démarrage automatique Windows/Linux/Mac  
✅ **Documentation** : Complète et détaillée  

## 🚀 Prêt à Décoller !

NovaIA est maintenant configuré et prêt à l'utilisation. Vous avez une plateforme d'agents IA offline-first, optimisée Windows (CUDA/DirectML), avec une sécurité maximale et des performances optimales.

**L'avenir de l'IA est offline-first ! 🚀**

---

*Créé avec ❤️ pour la communauté NovaIA* 