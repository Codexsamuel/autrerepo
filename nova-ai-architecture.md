# 🚀 NOVA AI - Architecture Agents Premium Offline-First

## 📋 Vue d'Ensemble

Système d'agents IA premium autonomes, déployables sur Windows (CUDA/DirectML), fonctionnant en mode offline-first avec capacités cloud optionnelles.

---

## 🏗️ Architecture Technique

### **Stack Principal**
- **Frontend**: Next.js 15 + React 18 + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: FastAPI (Python) + Node.js (temps réel) + gRPC interne
- **LLM Local**: Ollama + llama.cpp (CUDA/DirectML)
- **Vector Store**: FAISS + SQLite + FTS5
- **ML Engine**: XGBoost + LightGBM + statsmodels
- **Orchestration**: Prefect local + GitOps
- **Base de Données**: DuckDB + PostgreSQL + Redis

### **Architecture Modulaire**
```
nova-ai/
├── apps/
│   ├── commercial-agent/     # Agent Commercial Premium
│   ├── chat-agent/          # Agent de Chat Premium  
│   ├── insight-agent/       # Agent d'Analyse Premium
│   └── nova-core/           # Orchestrateur central
├── packages/
│   ├── shared/              # Types, utils, composants communs
│   ├── llm-engine/          # Moteur LLM local/cloud
│   ├── vector-store/        # Gestion des embeddings
│   ├── policy-engine/       # Moteur de règles et conformité
│   └── ml-pipeline/         # Pipeline ML et prévisions
├── infrastructure/
│   ├── docker/              # Docker Compose + images
│   ├── kubernetes/           # Manifests K8s (optionnel)
│   └── windows/             # Scripts d'installation Windows
└── docs/
    ├── architecture/         # Documentation technique
    ├── deployment/           # Guides de déploiement
    └── api/                 # Documentation API
```

---

## 🤖 **AGENT 1: COMMERCIAL PREMIUM - "CLOSER IA AUTONOME"**

### **🎨 Design & UX**
- **Thème**: Gradient émeraude → bleu → violet
- **Style**: Glassmorphism (backdrop-blur), cartes 3D, animations fluides
- **Vues principales**: Pipeline 360°, Ciblage & Campagnes, Prévisions & Risque
- **Mini-IDE**: Playbooks drag & drop avec versionning

### **⚡ Fonctions Cœur (T0)**
- **Scoring Lead Causal**: Analyse causale des conversions
- **Prévisions hiérarchiques**: Produit → BU → Pays (MAPE, P50/P90)
- **Routage intelligent**: Attribution commerciale optimisée
- **Générateur d'offres**: Contrats et devis automatisés

### **🚀 Fonctions Avancées (6-12 mois)**
- **Coaching temps réel**: Détection d'objections + ripostes suggérées
- **Simulateur pipeline**: Bac à sable pour tester stratégies
- **Négociation assistée**: Paliers, bundles, concessions
- **Surveillance risque**: Détection churn et signaux faibles

### **🔒 Capacités Offline**
- **LLM Local**: Llama 3.1 8B/70B, Mistral, DeepSeek (GGUF)
- **Vector Store**: FAISS + SQLite FTS5
- **Time Series**: statsmodels + LightGBM/XGBoost
- **OCR Local**: Tesseract + règles taxes YAML

---

## 💬 **AGENT 2: CHAT PREMIUM - "SUPPORT IA UNIFIÉ"**

### **🎨 Design & UX**
- **Thème**: Bleu → indigo → violet
- **Interface**: Bulles adaptatives, détection émotions, console multi-canal
- **Canal**: Web, WhatsApp, Email, Voix WebRTC

### **⚡ Fonctions Cœur (T0)**
- **NLP Offline**: Intent detection + slot filling
- **RAG Local**: Base de connaissances versionnée
- **Summaries auto**: Résumés de session automatiques
- **Formulaires dynamiques**: Champs adaptatifs

### **🚀 Fonctions Avancées (6-12 mois)**
- **Contrôleur d'outils**: Actions automatisées (tickets, remboursements)
- **Détection promesses**: Vérification juridique
- **Voix offline**: TTS/ASR locaux (Vosk/Whisper)
- **Empathie calibrée**: Ton adaptatif selon contexte

### **🔒 Capacités Offline**
- **LLM Local**: Génération et classification
- **Embeddings**: Modèles locaux (e5, bge)
- **Vision**: OCR + transformers légers
- **Anonymisation**: PII locale avant stockage

---

## 📊 **AGENT 3: INSIGHT PREMIUM - "NOVA INSIGHT"**

### **🎨 Design & UX**
- **Thème**: Slate/gris/zinc
- **Interface**: Dashboards modulaires, toggle "Explain" (SHAP)
- **Visualisation**: Graphiques interactifs, cartes de chaleur

### **⚡ Fonctions Cœur (T0)**
- **ELT Local**: Connecteurs DB + fichiers + logs
- **Catalogage sémantique**: Dictionnaire de données
- **Alerting temps réel**: Règles et anomalies robustes

### **🚀 Fonctions Avancées (6-12 mois)**
- **Feature Store**: Catalogue parquet + réutilisation
- **Causal Discovery**: Découverte de relations causales
- **Prévisions promotionnelles**: Intégration calendriers et promo
- **Détection fraude**: Isolation Forest + root-cause

### **🔒 Capacités Offline**
- **ML Engine**: XGBoost, LightGBM, autoML local
- **Orchestration**: Prefect/Airflow self-host
- **Stockage**: Parquet + DuckDB
- **Dashboards**: Next.js + FastAPI

---

## 🛠️ **ARCHITECTURE COMMUNE**

### **Frontend**
- **Framework**: Next.js 15 + React 18
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **State**: Zustand + React Query

### **Backend**
- **API**: FastAPI (Python) + Node.js
- **Communication**: gRPC interne + WebSocket
- **Authentification**: RBAC + SSO
- **Sécurité**: Chiffrement AES-256 + masquage PII

### **LLM & ML**
- **Serveur**: Ollama + llama.cpp
- **Windows**: CUDA (NVIDIA) ou DirectML (AMD/Intel)
- **Fallback**: CPU AVX si pas de GPU
- **Quantisation**: GGUF pour optimiser la mémoire

### **Stockage**
- **Vector**: FAISS + SQLite FTS5
- **Base**: PostgreSQL + DuckDB + Redis
- **Logs**: Rotation + WORM (Write Once Read Many)
- **Backup**: Stratégie de sauvegarde automatisée

---

## 📅 **ROADMAP 24 MOIS**

### **T0 - T3 mois**
- ✅ Mise en prod MVT
- ✅ RAG local (FAQ/Docs)
- ✅ Scoring simple
- ✅ Dashboard KPI
- ✅ Catalogue de données

### **T4 - T9 mois**
- 🔄 Causal lift
- 🔄 Simulateur pipeline
- 🔄 Contrôleur d'outils
- 🔄 ASR/TTS local
- 🔄 Coaching proactif

### **T10 - T18 mois**
- 📈 Prévisions hiérarchiques
- 📈 Négociation assistée
- 📈 Anti-hallucination fort
- 📈 Feature store
- 📈 AutoML local

### **T18 - T24 mois**
- 🚀 Auto-Playbooks self-healing
- 🚀 Contre-factuels fiables
- 🚀 Optimisation multi-objectifs
- 🚀 Guardrails juridiques avancés

---

## 🎯 **KPIs DE RÉUSSITE**

### **Agent Commercial**
- **Conversion**: +15-25% en 6 mois
- **Cycle time**: -30%
- **Marge nette**: +10% sur deals > P50

### **Agent Chat**
- **Deflection**: 85-95%
- **CSAT**: > 4.6/5
- **TTR**: < 60s
- **AHT**: -25%

### **Agent Insight**
- **MAPE**: < 12%
- **Détection incident**: < 5 min
- **Coût infra**: < 300$/mois on-prem

---

## 🚀 **PROCHAINES ÉTAPES**

1. **Choix matériel**: GPU NVIDIA (CUDA) vs AMD/Intel (DirectML)
2. **Installation**: Ollama + FAISS + FastAPI + DuckDB
3. **Import données**: 50-100 docs + contrats KPI YAML
4. **Déploiement**: RAG local + 3 micro-UIs
5. **Activation**: Policy engine + safe actions

---

## 🔧 **DÉPLOIEMENT WINDOWS**

### **Prérequis**
- Windows 10/11 (64-bit)
- Python 3.11+
- Node.js 18+
- Docker Desktop (WSL2)
- GPU: NVIDIA (CUDA) ou AMD/Intel (DirectML)

### **Installation**
```bash
# Cloner le repo
git clone https://github.com/dl-solutions/nova-ai.git
cd nova-ai

# Installer les dépendances
npm install
pip install -r requirements.txt

# Lancer avec Docker Compose
docker-compose up -d

# Ou installation locale
npm run dev:local
```

---

## 📚 **DOCUMENTATION**

- **Architecture**: `/docs/architecture/`
- **Déploiement**: `/docs/deployment/`
- **API**: `/docs/api/`
- **Troubleshooting**: `/docs/troubleshooting/`

---

*Dernière mise à jour: Août 2025*
*Version: 1.0.0*
*Statut: En développement* 