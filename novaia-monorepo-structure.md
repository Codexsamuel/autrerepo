# 🚀 NovaIA - Architecture Monorepo Complète

## Vision Système (24 mois, prête aujourd'hui en version MVP)

* **Monorepo** (Turborepo) : `apps/marketplace`, `apps/novacore`, `apps/battle-arena`, `apps/agent-lab`, `packages/agents`, `packages/protocols`, `packages/shared`.
* **Front** (toutes apps) : Next.js + Tailwind + shadcn/ui + Framer Motion. UI glassmorphism, dégradés par catégorie, dark/light.
* **Back** : FastAPI (Python) pour ML/évaluation + Node (NestJS) pour APIs temps réel (WebSocket/MQTT).
* **LLM/Embeddings locaux** : Ollama/llama.cpp (Llama 3.1 / Mistral / DeepSeek) quantisés GGUF ; embeddings bge/e5 locaux.
* **Stockage** : Postgres (transactions, RBAC), SQLite embarqué pour edge, **FAISS/Annoy** pour vecteurs, **DuckDB/Parquet/Polars** pour analytics.
* **Orchestration** : Prefect/Airflow (self-host), queues Redis/BullMQ.
* **Sécurité** : SSO, RBAC, ABAC policies YAML, chiffrement AES-256 at-rest, TLS, journaux WORM, mode **AirGap** supporté.

---

## 🏗️ Structure Monorepo

```
novaia/
├─ apps/
│  ├─ marketplace/          # Next.js (catalogue + essais sandbox)
│  ├─ novacore/             # Next.js (monitoring & gouvernance)
│  ├─ battle-arena/         # Next.js (ELO, datasets, classements)
│  └─ agent-lab/            # Next.js (AgentGenesis: DSL→code)
├─ services/
│  ├─ agents-api/           # FastAPI (LLM local, RAG, ELO judge)
│  └─ control-api/          # NestJS (orchestration, RBAC, WebSocket)
├─ packages/
│  ├─ agents/               # Python: outils, RAG, embeddings
│  ├─ protocols/            # TypeScript: schémas A2A/MCP, protobuf
│  └─ shared/               # TypeScript: UI, hooks, utils
├─ policies/                # ✅ Pack RBAC/ABAC, guardrails, SLA
├─ datasets/
│  └─ battle/               # ✅ Datasets de test pour l'arène
├─ docker/
│  ├─ agents-api.Dockerfile
│  └─ control-api.Dockerfile
├─ .env.example
├─ docker-compose.yml       # ✅ CUDA ou CPU (profils)
├─ turbo.json
├─ package.json
└─ README.md
```

---

## 🎯 Modules Clés & Capacités "Pro"

### 1) 🏪 Marketplace d'Agents (75+ agents, 14 catégories)

**Fonctions "max"**
* **Fiches agents** riches : capacités, latences réelles, datasets d'entraînement, licences, dépendances.
* **Installation 1-clic** (workspace local ou cluster) + résolveur de modèles (CUDA/DirectML/CPU).
* **Notes & Avis vérifiés** (proof-of-run) : chaque review ancre des *runs* signés (hash + métriques).
* **Essai sandbox** : environnement ephémère par agent (Docker/WSL2), RAG isolé, quota GPU.
* **Bundle Builder** : packs multi-agents interconnectés (ex : "Commerce Suite" = Chat + Sales + Analytics).
* **Facturation** : Stripe/CinetPay/OM (optionnel) + **licences offline** (clé activable sans réseau).
* **Mises à jour différentielles** : patchs binaires (modèles quantisés), rollback sûr.

**Sans API externe**
* Modèles, embeddings, OCR/ASR/TTS **locaux** ; vector store local ; évaluations locales.

**Optionnel API**
* Accélération cloud pour jobs lourds (vision 4K, LLM >70B), anonymisation PII stricte avant sortie.

### 2) 🧬 AgentGenesis (créateur d'agents no-code/low-code)

**Fonctions "max"**
* **Blueprint DSL** (YAML) : outils, mémoire, règles, prompts, schéma d'IO ; compilation vers Python/TypeScript.
* **Skill Library** : actions prêtes (OCR, web-scrape éthique, ETL, email, fichiers, DB, ERP).
* **Test-Driven Agents** : générateur de tests d'acceptation (spec → fixtures → asserts de sorties).
* **Safety Guardrails** : politiques de sécurité (rôles, secrets, PII), validation statique + runtime.
* **Auto-profiling** : mesure latence, RAM, VRAM, coût énergétique estimé ; optimisations (batching, KV-cache, quantisation).
* **Versioning & Rollback** : semantic release, migrations de mémoire vectorielle.

### 3) ⚔️ Battle Arena (système ELO/ligues)

**Fonctions "max"**
* **Protocoles de match** : Q&A contrôlé, tool-use, reasoning-trace masqué, tâches multi-étapes.
* **DataSets compétitifs** : business (prévision, classification), chat client, vision de document, code.
* **Scoring hybride** : exact match, BLEU/ROUGE, faithfulness/citation, **récompense humaine** active learning.
* **ELO/Ligues** : divisions, playoffs, "king of the hill", MMR par catégorie.
* **Anti-triche** : seed fixe, sandbox réseau fermé, *rate limit* outils, hash artefacts d'entrée.
* **Report Analyst** : delta de perfs, *regressions*, heatmaps d'erreurs, *explanations* (SHAP/local).

### 4) 🌐 Protocoles A2A & MCP (interop)

**Fonctions "max"**
* **A2A Bus** (NATS/ZeroMQ) : messages signés, schémas protobuf, *backpressure* et QoS.
* **MCP** : mémoire de contexte partagée (docs, slots, états), TTL + purge sélective.
* **Planification multi-agents** : *task graph* DAG, arbitration par coût/risque/confiance.
* **Consensus léger** : vote majoritaire pondéré par fiabilité historique de chaque agent.
* **Sandbox d'outils** : exécution outillée isolée (seccomp/.NET sandbox) + règles: qui peut appeler quoi, quand.

### 5) 🎛️ NovaCore (centre de contrôle)

**Fonctions "max"**
* **Fleet management** : statut agents, VRAM, latence, pannes, mises à jour.
* **Observabilité** : traces, métriques, logs corrélés (requête → outils → DB).
* **Governance** : RBAC/ABAC, secrets, policies, conformité (journaux immuables, export légal).
* **Cost control** : minuteur GPU/CPU, budgets, throttling, *kill-switch*.
* **Playbooks** : runbooks d'incident, autoscaling (priorité critique > normal), drain/cordon sur nœuds.
* **Audit Explain** : pourquoi tel agent a agi (source, règle, preuve).

### 6) 🚁 "DroneBuilder IA" (version sûre & légale)

**Fonctions civiles/sûres**
* **CAD paramétrique** : générateur de châssis (impression 3D), parts list, équilibre masse/centre gravité.
* **Firmware générique** : profils de vol *non offensifs* (stabilisation, waypoint training en simulateur).
* **Simulateur** : moteurs physiques, météo, *no-fly zones*, scénarios secours.
* **Export G-code** : uniquement pièces structurales non offensives (cadres, supports).
* **Conformité** : check-list légale par pays, géofencing, limites altitude/vitesse.

---

## 🚀 Capacités "Sans API" (communes à tous les agents)

* **LLM/Génération** : Llama/Mistral/DeepSeek en local (quantisation Q4/Q5), KV-cache disque, batching.
* **RAG** : FAISS/Annoy + splitter sémantique, *source grounding* obligatoire (citations).
* **Vision** : Tesseract + vision transformer léger (doc QA).
* **Parole** : Whisper-small/int8 (ASR), Piper/Coqui (TTS).
* **ML tabulaire/temps** : LightGBM/XGBoost, Polars/DuckDB, STL/Prophet-like, causal discovery (PCMCI/lingam) local.
* **Sécurité** : classification contenu, PII scrubber local, sandbox outils.

---

## 📊 Performances Cibles (réalistes, Windows)

* **RTX 3060 / 12 Go** : LLM 8–14B ≈ 15–30 tok/s ; inference embeddings > 2k CPS ; RAG complet < 800 ms.
* **CPU i7/32 Go** (DirectML/CPU) : LLM 7B ≈ 5–10 tok/s ; acceptable pour chat/FAQ, batch pour analytics.
* **Traitement data** : 10–50 M lignes en < 10 min (DuckDB/Polars, parquet).

---

## 🔒 Gouvernance & Conformité

* **Policy-as-Code** (YAML) : accès outils/données, seuils de confiance, SLAs.
* **Droits utilisateur** : explicites par rôle, journaux signés, *right-to-explain*.
* **AirGap mode** : aucun appel sortant ; Mises à jour via paquets signés.

---

## 🗓️ Roadmap d'Exécution (8–12 semaines vers MVP solide)

**S1–2** : Monorepo + runners locaux (Ollama), FAISS, RAG commun, Marketplace v1 (listing/essai), Battle Arena v0 (datasets & scoring).
**S3–4** : AgentGenesis (DSL→code), NovaCore (fleet/metrics), policies RBAC/ABAC.
**S5–6** : A2A Bus + MCP, Playbooks, bundles d'agents par catégorie.
**S7–8** : ELO ligues, reports, patching modèles, facturation/licences offline.
**+** Durcissement sécurité, AirGap, packaging WSL2/Docker.

---

## 🎯 Ce qui est livrable maintenant

1. **Structure monorepo** (Turborepo) + Docker Compose (Postgres, Redis, Ollama, FastAPI, NestJS).
2. **Blueprints** d'exemples (3 agents vedettes) + **datasets**-tests pour Battle Arena.
3. **Policy pack** (RBAC/ABAC) + templates YAML (marketplace, agents, tools).
4. **UI Next.js** de base : Marketplace, NovaCore, Battle Arena, AgentGenesis.

---

## 🔧 Démarrage (Windows)

1. **Pré-requis**:
   * Docker Desktop (WSL2 OK mais pas obligatoire)
   * Node 20 + `pnpm i -g pnpm`

2. **Cloner** puis `pnpm i` à la racine.

3. **Lancer infra**: `docker compose up -d`

4. **Télécharger un modèle** (nouveau terminal):
   ```bash
   curl http://localhost:11434/api/pull -d '{"name":"llama3.1:8b-instruct-q4_K_M"}'
   curl http://localhost:11434/api/pull -d '{"name":"nomic-embed-text"}'
   ```

5. **Dev apps**: `pnpm dev` (ouvre 3000/3001/3002/3003).

6. **Test rapide**: `GET http://localhost:8000/health` → `{ ok: true }`.

---

## 🔒 Notes Sécurité (par défaut)

* **Aucun appel externe** sans passer par le **Policy Proxy**.
* PII masquée avant export.
* Logs signés + WORM.
* Bouton **Kill-switch** dans NovaCore. 