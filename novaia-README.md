# 🚀 NovaIA - Plateforme d'Agents IA Offline-First

> **NovaIA** est une plateforme complète d'agents IA offline-first, optimisée Windows (CUDA/DirectML) et prête pour le cloud privé. Aucune dépendance API externe par défaut, sécurité maximale, et performance optimale.

![NovaIA Logo](https://img.shields.io/badge/NovaIA-AI%20Platform-blue?style=for-the-badge&logo=robot)
![Offline-First](https://img.shields.io/badge/Offline--First-100%25-green?style=for-the-badge)
![Windows Optimized](https://img.shields.io/badge/Windows-CUDA%2FDirectML-purple?style=for-the-badge)
![Security](https://img.shields.io/badge/Security-RBAC%2FABAC-red?style=for-the-badge)

## 🌟 Caractéristiques Principales

- **🏪 Marketplace d'Agents** : 75+ agents, 14 catégories, installation 1-clic
- **🧬 AgentGenesis** : Créateur d'agents no-code/low-code avec DSL YAML
- **⚔️ Battle Arena** : Système ELO/ligues pour évaluer les agents
- **🌐 Protocoles A2A & MCP** : Interopérabilité multi-agents
- **🎛️ NovaCore** : Centre de contrôle et monitoring complet
- **🚁 DroneBuilder IA** : Version civile/sûre pour drones (CAD, simulateur)

## 🏗️ Architecture

```
novaia/
├─ apps/                    # Applications Next.js
│  ├─ marketplace/         # Catalogue et essais d'agents
│  ├─ novacore/            # Monitoring & gouvernance
│  ├─ battle-arena/        # ELO, datasets, classements
│  └─ agent-lab/           # AgentGenesis: DSL→code
├─ services/               # APIs backend
│  ├─ agents-api/          # FastAPI (RAG, embeddings, judge)
│  └─ control-api/         # NestJS (RBAC, WebSocket, orchestration)
├─ packages/               # Packages partagés
│  ├─ agents/              # Python: outils, RAG, embeddings
│  ├─ protocols/           # TypeScript: schémas A2A/MCP
│  └─ shared/              # TypeScript: UI, hooks, utils
├─ policies/               # RBAC/ABAC, guardrails, SLA
├─ datasets/               # Datasets de test pour Battle Arena
└─ docker/                 # Configuration Docker
```

## 🚀 Démarrage Rapide

### Prérequis

- **Windows 10/11** avec Docker Desktop
- **Node.js 20+** et `pnpm`
- **8GB RAM minimum** (16GB recommandé)
- **GPU NVIDIA** (CUDA) ou **CPU** (DirectML)

### Installation

1. **Cloner le projet**
   ```bash
   git clone https://github.com/your-org/novaia.git
   cd novaia
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

### Accès aux Applications

- **Marketplace** : http://localhost:3000
- **NovaCore** : http://localhost:3001
- **Battle Arena** : http://localhost:3002
- **Agent Lab** : http://localhost:3003
- **API Agents** : http://localhost:8000
- **API Contrôle** : http://localhost:4000

## 🔧 Configuration

### Profils Matériels

#### CUDA (NVIDIA)
```yaml
# docker-compose.yml
ollama:
  deploy:
    resources:
      reservations:
        devices:
          - driver: nvidia
            count: all
            capabilities: [gpu]
```

#### CPU/DirectML
```yaml
# docker-compose.yml
ollama:
  # Commenter la section deploy pour CPU uniquement
  # deploy:
  #   resources:
  #     reservations:
  #       devices:
  #         - driver: nvidia
  #           count: all
  #           capabilities: [gpu]
```

### Variables d'Environnement

```bash
# Base de données
POSTGRES_USER=nova
POSTGRES_PASSWORD=nova
POSTGRES_DB=nova

# Ollama
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODELS_PATH=./models

# Sécurité
JWT_SECRET=your-super-secret-key
ENCRYPTION_KEY=your-32-character-key

# GPU/CPU
CUDA_ENABLED=true
GPU_MEMORY_LIMIT=12GB
```

## 🎯 Utilisation

### 1. Marketplace d'Agents

- **Parcourir** : Explorez 75+ agents par catégorie
- **Tester** : Lancez des essais sandbox
- **Installer** : Déployez en 1-clic
- **Évaluer** : Donnez des notes vérifiées

### 2. AgentGenesis

- **Créer** : Utilisez le DSL YAML pour définir vos agents
- **Tester** : Validation automatique et tests d'acceptation
- **Déployer** : Compilation vers Python/TypeScript
- **Publier** : Partagez sur le marketplace

### 3. Battle Arena

- **Participer** : Affrontez d'autres agents
- **Monter** : Système ELO et ligues
- **Analyser** : Rapports de performance détaillés
- **Améliorer** : Identifiez les points d'amélioration

### 4. NovaCore

- **Monitorer** : Statut en temps réel de la flotte
- **Gouverner** : Politiques RBAC/ABAC
- **Optimiser** : Contrôle des coûts et ressources
- **Sécuriser** : Audit et conformité

## 🔒 Sécurité

### RBAC (Role-Based Access Control)
- **9 rôles** prédéfinis (super_admin, operator, viewer, etc.)
- **Permissions granulaires** par ressource
- **Héritage** de rôles et surcharge

### ABAC (Attribute-Based Access Control)
- **Règles contextuelles** (heure, localisation, risque)
- **Contrôle dynamique** basé sur les attributs
- **Politiques de sécurité** avancées

### Guardrails
- **PII Protection** : Masquage automatique
- **Content Filtering** : Filtrage de contenu
- **Tool Sandboxing** : Isolation des outils
- **AirGap Mode** : Mode déconnecté complet

## 📊 Performance

### Benchmarks Windows

| Matériel | LLM 8-14B | Embeddings | RAG Complet |
|----------|------------|-------------|-------------|
| RTX 3060 12GB | 15-30 tok/s | >2k CPS | <800ms |
| i7/32GB CPU | 5-10 tok/s | 500-1k CPS | 1.5-3s |
| RTX 4090 24GB | 40-80 tok/s | >5k CPS | <400ms |

### Optimisations

- **Quantisation** : Q4/Q5 pour LLM, int8 pour embeddings
- **Batching** : Traitement par lots optimisé
- **KV-Cache** : Cache disque pour LLM
- **Vector Store** : FAISS/Annoy optimisé

## 🧪 Développement

### Structure des Packages

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

### Ajout d'un Nouvel Agent

1. **Créer le blueprint** dans `apps/agent-lab/blueprints/`
2. **Définir les capacités** et outils
3. **Tester** avec les datasets de test
4. **Publier** sur le marketplace

### Extension des Politiques

1. **Modifier** `policies/rbac.yaml` pour RBAC
2. **Ajouter des règles** dans `policies/abac.yaml`
3. **Tester** avec les outils de validation
4. **Déployer** en production

## 🌐 Déploiement

### Production

```bash
# Build de production
pnpm build

# Démarrage
pnpm start

# Avec Docker
docker compose -f docker-compose.yml --profile production up -d
```

### Cloud Privé

- **Kubernetes** : Manifests fournis
- **Docker Swarm** : Configuration incluse
- **AirGap** : Mode déconnecté complet
- **Monitoring** : Prometheus + Grafana

### Scaling

- **Horizontal** : Multi-nœuds avec load balancing
- **Vertical** : Ressources GPU/CPU dynamiques
- **Auto-scaling** : Basé sur la charge et les priorités

## 📚 Documentation

- **API Reference** : http://localhost:4000/docs
- **Architecture** : [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- **Security** : [docs/SECURITY.md](docs/SECURITY.md)
- **Deployment** : [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## 🤝 Contribution

1. **Fork** le projet
2. **Créer** une branche feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** vos changements (`git commit -m 'Add AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrir** une Pull Request

## 📄 Licence

Ce projet est sous licence **MIT**. Voir [LICENSE](LICENSE) pour plus de détails.

## 🆘 Support

- **Issues** : [GitHub Issues](https://github.com/your-org/novaia/issues)
- **Discussions** : [GitHub Discussions](https://github.com/your-org/novaia/discussions)
- **Documentation** : [docs.novaia.ai](https://docs.novaia.ai)
- **Email** : support@novaia.ai

## 🙏 Remerciements

- **Ollama** pour les modèles locaux
- **FastAPI** et **NestJS** pour les APIs
- **Next.js** et **Tailwind** pour l'interface
- **FAISS** pour le stockage vectoriel
- **La communauté open source** pour l'inspiration

---

**NovaIA** - L'avenir de l'IA est **offline-first** 🚀 