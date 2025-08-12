# 🏗️ NOVA AI - Structure Monorepo Complète

## 📁 Structure des Dossiers

```
nova-ai/
├── 📦 packages/
│   ├── 🧠 shared/
│   │   ├── types/
│   │   │   ├── agent.types.ts
│   │   │   ├── llm.types.ts
│   │   │   ├── vector.types.ts
│   │   │   └── policy.types.ts
│   │   ├── utils/
│   │   │   ├── crypto.ts
│   │   │   ├── validation.ts
│   │   │   └── metrics.ts
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── charts/
│   │   │   └── forms/
│   │   └── constants/
│   │       ├── policies.ts
│   │       └── config.ts
│   │
│   ├── 🤖 llm-engine/
│   │   ├── src/
│   │   │   ├── models/
│   │   │   │   ├── llama.ts
│   │   │   │   ├── mistral.ts
│   │   │   │   └── deepseek.ts
│   │   │   ├── quantizers/
│   │   │   │   ├── gguf.ts
│   │   │   │   └── awq.ts
│   │   │   ├── adapters/
│   │   │   │   ├── cuda.ts
│   │   │   │   ├── directml.ts
│   │   │   │   └── cpu.ts
│   │   │   └── index.ts
│   │   ├── tests/
│   │   └── package.json
│   │
│   ├── 🔍 vector-store/
│   │   ├── src/
│   │   │   ├── stores/
│   │   │   │   ├── faiss.ts
│   │   │   │   ├── sqlite.ts
│   │   │   │   └── hybrid.ts
│   │   │   ├── embeddings/
│   │   │   │   ├── e5.ts
│   │   │   │   ├── bge.ts
│   │   │   │   └── local.ts
│   │   │   └── index.ts
│   │   ├── tests/
│   │   └── package.json
│   │
│   ├── ⚖️ policy-engine/
│   │   ├── src/
│   │   │   ├── rules/
│   │   │   │   ├── pricing.ts
│   │   │   │   ├── compliance.ts
│   │   │   │   └── pii.ts
│   │   │   ├── validators/
│   │   │   │   ├── yaml.ts
│   │   │   │   └── json.ts
│   │   │   └── index.ts
│   │   ├── policies/
│   │   │   ├── commercial.yaml
│   │   │   ├── chat.yaml
│   │   │   └── insight.yaml
│   │   ├── tests/
│   │   └── package.json
│   │
│   └── 📊 ml-pipeline/
│       ├── src/
│       │   ├── models/
│       │   │   ├── xgboost.ts
│       │   │   ├── lightgbm.ts
│       │   │   └── statsmodels.ts
│       │   ├── features/
│       │   │   ├── store.ts
│       │   │   └── engineering.ts
│       │   ├── forecasting/
│       │   │   ├── hierarchical.ts
│       │   │   ├── causal.ts
│       │   │   └── promotional.ts
│       │   └── index.ts
│       ├── tests/
│       └── package.json
│
├── 🚀 apps/
│   ├── commercial-agent/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Pipeline360/
│   │   │   │   ├── Targeting/
│   │   │   │   ├── Forecasting/
│   │   │   │   └── Playbooks/
│   │   │   ├── services/
│   │   │   │   ├── lead-scoring.ts
│   │   │   │   ├── routing.ts
│   │   │   │   └── offer-generator.ts
│   │   │   └── pages/
│   │   ├── public/
│   │   └── package.json
│   │
│   ├── chat-agent/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── MultiChannel/
│   │   │   │   ├── Conversation/
│   │   │   │   ├── Forms/
│   │   │   │   └── Voice/
│   │   │   ├── services/
│   │   │   │   ├── nlp.ts
│   │   │   │   ├── rag.ts
│   │   │   │   └── tools.ts
│   │   │   └── pages/
│   │   ├── public/
│   │   └── package.json
│   │
│   ├── insight-agent/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Dashboards/
│   │   │   │   ├── Analytics/
│   │   │   │   ├── Forecasting/
│   │   │   │   └── Alerts/
│   │   │   ├── services/
│   │   │   │   ├── elt.ts
│   │   │   │   ├── catalog.ts
│   │   │   │   └── ml.ts
│   │   │   └── pages/
│   │   ├── public/
│   │   └── package.json
│   │
│   └── nova-core/
│       ├── src/
│       │   ├── orchestrator/
│       │   │   ├── agents.ts
│       │   │   ├── workflows.ts
│       │   │   └── events.ts
│       │   ├── api/
│       │   │   ├── rest/
│       │   │   ├── grpc/
│       │   │   └── websocket/
│       │   ├── auth/
│       │   │   ├── rbac.ts
│       │   │   ├── sso.ts
│       │   │   └── encryption.ts
│       │   └── monitoring/
│       │       ├── logs.ts
│       │       ├── metrics.ts
│       │       └── traces.ts
│       ├── tests/
│       └── package.json
│
├── 🐳 infrastructure/
│   ├── docker/
│   │   ├── docker-compose.yml
│   │   ├── docker-compose.prod.yml
│   │   ├── Dockerfile.llm
│   │   ├── Dockerfile.vector
│   │   ├── Dockerfile.policy
│   │   └── Dockerfile.ml
│   │
│   ├── kubernetes/
│   │   ├── namespaces/
│   │   ├── deployments/
│   │   ├── services/
│   │   ├── configmaps/
│   │   └── secrets/
│   │
│   ├── windows/
│   │   ├── install.ps1
│   │   ├── setup-cuda.ps1
│   │   ├── setup-directml.ps1
│   │   └── requirements.txt
│   │
│   └── terraform/
│       ├── main.tf
│       ├── variables.tf
│       └── outputs.tf
│
├── 📚 docs/
│   ├── architecture/
│   │   ├── overview.md
│   │   ├── components.md
│   │   ├── data-flow.md
│   │   └── security.md
│   ├── deployment/
│   │   ├── windows.md
│   │   ├── docker.md
│   │   ├── kubernetes.md
│   │   └── troubleshooting.md
│   ├── api/
│   │   ├── rest.md
│   │   ├── grpc.md
│   │   └── websocket.md
│   └── user-guides/
│       ├── commercial.md
│       ├── chat.md
│       └── insight.md
│
├── 🧪 tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── performance/
│
├── 📋 scripts/
│   ├── build.sh
│   ├── deploy.sh
│   ├── test.sh
│   └── benchmark.sh
│
├── 🔧 configs/
│   ├── .env.example
│   ├── .env.local
│   ├── .env.production
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── next.config.js
│   └── package.json
│
└── 📝 README.md
```

---

## 📦 **PACKAGES DÉTAILLÉS**

### **🧠 shared**
Package commun contenant types, utilitaires et composants partagés entre tous les agents.

**Fonctionnalités :**
- Types TypeScript communs
- Composants UI réutilisables
- Utilitaires de cryptographie et validation
- Constantes et configurations

**Dépendances :**
- React 18
- TypeScript 5.0+
- Tailwind CSS
- shadcn/ui

---

### **🤖 llm-engine**
Moteur LLM local avec support CUDA/DirectML et fallback CPU.

**Fonctionnalités :**
- Support Llama 3.1, Mistral, DeepSeek
- Quantisation GGUF/AWQ
- Adaptateurs CUDA/DirectML/CPU
- Gestion mémoire optimisée

**Dépendances :**
- llama.cpp
- Ollama
- Node.js native modules

---

### **🔍 vector-store**
Gestion des embeddings et recherche vectorielle locale.

**Fonctionnalités :**
- Stockage FAISS + SQLite FTS5
- Embeddings locaux (e5, bge)
- Recherche hybride (vector + keyword)
- Indexation automatique

**Dépendances :**
- FAISS
- SQLite3
- Node.js native modules

---

### **⚖️ policy-engine**
Moteur de règles et conformité pour tous les agents.

**Fonctionnalités :**
- Règles YAML/JSON
- Validation en temps réel
- Conformité juridique
- Masquage PII

**Dépendances :**
- js-yaml
- ajv (validation JSON)
- crypto-js

---

### **📊 ml-pipeline**
Pipeline ML local pour prévisions et analytics.

**Fonctionnalités :**
- Modèles XGBoost, LightGBM
- Prévisions hiérarchiques
- Découverte causale
- Feature store local

**Dépendances :**
- Python 3.11+
- XGBoost
- LightGBM
- statsmodels

---

## 🚀 **APPLICATIONS DÉTAILLÉES**

### **commercial-agent**
Agent commercial premium avec scoring causal et prévisions.

**Pages principales :**
- Pipeline 360° (vue d'ensemble)
- Ciblage & Campagnes
- Prévisions & Risque
- Playbooks (mini-IDE)

**Fonctionnalités clés :**
- Scoring lead causal
- Routage intelligent
- Générateur d'offres
- Coaching temps réel

---

### **chat-agent**
Agent de chat multi-canal avec support offline.

**Pages principales :**
- Console multi-canal
- Conversations
- Formulaires dynamiques
- Gestion des outils

**Fonctionnalités clés :**
- NLP offline
- RAG local
- Formulaires adaptatifs
- Voix offline (TTS/ASR)

---

### **insight-agent**
Agent d'analyse avec dashboards modulaires.

**Pages principales :**
- Dashboards
- Analytics
- Prévisions
- Alertes

**Fonctionnalités clés :**
- ELT local
- Catalogage sémantique
- ML local
- Visualisations interactives

---

### **nova-core**
Orchestrateur central et API unifiée.

**Fonctionnalités :**
- Orchestration des agents
- API REST/gRPC/WebSocket
- Authentification RBAC
- Monitoring et observabilité

---

## 🐳 **INFRASTRUCTURE DOCKER**

### **Services principaux :**
- **llm-service** : Serveur Ollama + llama.cpp
- **vector-service** : FAISS + SQLite
- **policy-service** : Moteur de règles
- **ml-service** : Pipeline ML Python
- **postgres** : Base de données principale
- **redis** : Cache et queues
- **nginx** : Reverse proxy

### **Volumes persistants :**
- **llm-models** : Modèles LLM téléchargés
- **vector-data** : Index FAISS
- **policy-rules** : Règles YAML
- **ml-models** : Modèles ML entraînés
- **postgres-data** : Données PostgreSQL
- **logs** : Logs applicatifs

---

## 🔧 **CONFIGURATION WINDOWS**

### **Scripts PowerShell :**
- **install.ps1** : Installation complète
- **setup-cuda.ps1** : Configuration CUDA
- **setup-directml.ps1** : Configuration DirectML
- **requirements.txt** : Dépendances Python

### **Prérequis :**
- Windows 10/11 (64-bit)
- Python 3.11+
- Node.js 18+
- Docker Desktop (WSL2)
- GPU compatible

---

## 📋 **COMMANDES PRINCIPALES**

```bash
# Installation
npm install
npm run setup:all

# Développement
npm run dev:commercial
npm run dev:chat
npm run dev:insight
npm run dev:core

# Build
npm run build:all
npm run build:commercial
npm run build:chat
npm run build:insight

# Tests
npm run test:unit
npm run test:integration
npm run test:e2e

# Déploiement
npm run deploy:local
npm run deploy:docker
npm run deploy:k8s

# Monitoring
npm run logs
npm run metrics
npm run health
```

---

## 🎯 **PROCHAINES ÉTAPES**

1. **Créer la structure des dossiers**
2. **Initialiser les packages npm**
3. **Configurer TypeScript et build tools**
4. **Créer les composants UI de base**
5. **Implémenter le moteur LLM local**
6. **Développer le vector store**
7. **Créer le policy engine**
8. **Implémenter les agents de base**
9. **Configurer Docker et déploiement**
10. **Tests et validation**

---

*Cette structure permet un développement modulaire, maintenable et scalable pour une équipe de taille moyenne.* 