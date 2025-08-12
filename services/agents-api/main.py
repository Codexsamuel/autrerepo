"""
NovaIA Agents API - FastAPI
RAG, embeddings, judge ELO, offline-first
"""

import os
import json
import logging
import asyncio
from pathlib import Path
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta

import requests
import numpy as np
from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
import uvicorn

# Configuration logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuration
OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://localhost:11434")
VECTOR_DB_PATH = Path(os.getenv("VECTOR_DB_PATH", "./data/faiss"))
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
MAX_WORKERS = int(os.getenv("MAX_WORKERS", "4"))

# Créer les dossiers nécessaires
VECTOR_DB_PATH.mkdir(parents=True, exist_ok=True)

app = FastAPI(
    title="NovaIA Agents API",
    description="API pour agents IA offline-first avec RAG, embeddings et judge ELO",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =============================================================================
# MODÈLES PYDANTIC
# =============================================================================

class EmbedRequest(BaseModel):
    texts: List[str] = Field(..., description="Textes à encoder")
    model: str = Field("nomic-embed-text", description="Modèle d'embedding")
    normalize: bool = Field(True, description="Normaliser les vecteurs")

class EmbedResponse(BaseModel):
    embeddings: List[List[float]]
    model: str
    usage: Dict[str, int]
    timestamp: datetime

class RAGQuery(BaseModel):
    query: str = Field(..., description="Question utilisateur")
    top_k: int = Field(5, description="Nombre de passages à récupérer")
    model: str = Field("llama3.1:8b-instruct-q4_K_M", description="Modèle LLM")
    collection: str = Field("default", description="Collection de documents")
    temperature: float = Field(0.7, description="Température de génération")
    max_tokens: int = Field(1024, description="Nombre max de tokens")

class RAGResponse(BaseModel):
    answer: str
    sources: List[str]
    confidence: float
    model: str
    tokens_used: int
    latency_ms: float

class JudgeRequest(BaseModel):
    reference: Optional[str] = Field(None, description="Réponse de référence")
    candidate: str = Field(..., description="Réponse candidate à évaluer")
    task_type: str = Field("qa", description="Type de tâche (qa, summarization, code)")
    criteria: List[str] = Field(["accuracy", "completeness"], description="Critères d'évaluation")

class JudgeResponse(BaseModel):
    score: float = Field(..., ge=0.0, le=1.0, description="Score de 0 à 1")
    breakdown: Dict[str, float] = Field(..., description="Détail par critère")
    confidence: float = Field(..., description="Confiance du jugement")
    feedback: str = Field(..., description="Feedback détaillé")

class AgentInfo(BaseModel):
    name: str
    version: str
    capabilities: List[str]
    model: str
    status: str
    last_updated: datetime

# =============================================================================
# UTILITAIRES
# =============================================================================

def get_ollama_models() -> List[str]:
    """Récupère la liste des modèles Ollama disponibles"""
    try:
        response = requests.get(f"{OLLAMA_HOST}/api/tags", timeout=10)
        if response.status_code == 200:
            data = response.json()
            return [model["name"] for model in data.get("models", [])]
        return []
    except Exception as e:
        logger.warning(f"Impossible de récupérer les modèles Ollama: {e}")
        return []

def calculate_similarity(vec1: List[float], vec2: List[float]) -> float:
    """Calcule la similarité cosinus entre deux vecteurs"""
    try:
        v1, v2 = np.array(vec1), np.array(vec2)
        return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))
    except:
        return 0.0

def local_judge(reference: Optional[str], candidate: str, task_type: str) -> JudgeResponse:
    """Jugement local sans appel externe"""
    score = 1.0
    breakdown = {}
    
    if reference:
        # Similarité de longueur
        len_ratio = min(len(candidate) / max(len(reference), 1), 2.0)
        length_score = max(0.0, 1.0 - abs(1.0 - len_ratio) * 0.3)
        breakdown["length"] = length_score
        
        # Mots communs
        ref_words = set(reference.lower().split())
        cand_words = set(candidate.lower().split())
        if ref_words:
            word_overlap = len(ref_words.intersection(cand_words)) / len(ref_words)
            breakdown["word_overlap"] = word_overlap
        
        # Score final pondéré
        weights = {"length": 0.3, "word_overlap": 0.7}
        score = sum(breakdown.get(k, 0.5) * weights.get(k, 0.5) for k in weights)
    else:
        # Pas de référence, évaluation heuristique
        breakdown["completeness"] = min(len(candidate) / 100, 1.0)
        breakdown["structure"] = 0.8 if any(c in candidate for c in ".:;") else 0.5
        score = sum(breakdown.values()) / len(breakdown)
    
    return JudgeResponse(
        score=max(0.0, min(score, 1.0)),
        breakdown=breakdown,
        confidence=0.8,
        feedback=f"Évaluation locale basée sur {task_type}"
    )

# =============================================================================
# ENDPOINTS
# =============================================================================

@app.get("/")
async def root():
    """Endpoint racine"""
    return {
        "message": "NovaIA Agents API",
        "version": "1.0.0",
        "status": "online",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/health")
async def health():
    """Health check"""
    try:
        # Vérifier Ollama
        ollama_ok = False
        try:
            response = requests.get(f"{OLLAMA_HOST}/api/tags", timeout=5)
            ollama_ok = response.status_code == 200
        except:
            pass
        
        return {
            "status": "healthy",
            "timestamp": datetime.now().isoformat(),
            "services": {
                "ollama": "healthy" if ollama_ok else "unhealthy",
                "vector_db": "healthy" if VECTOR_DB_PATH.exists() else "unhealthy"
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/models")
async def list_models():
    """Liste des modèles disponibles"""
    models = get_ollama_models()
    return {
        "models": models,
        "count": len(models),
        "default_llm": "llama3.1:8b-instruct-q4_K_M",
        "default_embedding": "nomic-embed-text"
    }

@app.post("/embed", response_model=EmbedResponse)
async def create_embeddings(request: EmbedRequest):
    """Créer des embeddings via Ollama"""
    start_time = datetime.now()
    
    try:
        # Appel à Ollama
        response = requests.post(
            f"{OLLAMA_HOST}/api/embeddings",
            json={
                "model": request.model,
                "prompt": request.texts[0] if len(request.texts) == 1 else "\n".join(request.texts)
            },
            timeout=30
        )
        
        if response.status_code != 200:
            raise HTTPException(status_code=500, detail=f"Erreur Ollama: {response.text}")
        
        data = response.json()
        embeddings = data.get("embedding", [])
        
        # Normaliser si demandé
        if request.normalize and embeddings:
            norm = np.linalg.norm(embeddings)
            if norm > 0:
                embeddings = [float(x / norm) for x in embeddings]
        
        return EmbedResponse(
            embeddings=[embeddings] if isinstance(embeddings[0], (int, float)) else embeddings,
            model=request.model,
            usage={"prompt_tokens": len(request.texts), "total_tokens": len(request.texts)},
            timestamp=start_time
        )
        
    except requests.exceptions.Timeout:
        raise HTTPException(status_code=408, detail="Timeout Ollama")
    except Exception as e:
        logger.error(f"Erreur embedding: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/rag/query", response_model=RAGResponse)
async def rag_query(request: RAGQuery):
    """Requête RAG avec contexte local"""
    start_time = datetime.now()
    
    try:
        # TODO: Implémenter la récupération depuis FAISS/Annoy
        # Pour l'instant, contexte factice
        context = f"Contexte pour la collection {request.collection}: Informations pertinentes..."
        
        # Prompt RAG
        prompt = f"""Réponds à la question en te basant sur le contexte fourni.
        
Question: {request.query}

Contexte:
{context}

Réponse:"""
        
        # Appel au LLM
        response = requests.post(
            f"{OLLAMA_HOST}/api/generate",
            json={
                "model": request.model,
                "prompt": prompt,
                "stream": False,
                "options": {
                    "temperature": request.temperature,
                    "num_predict": request.max_tokens
                }
            },
            timeout=60
        )
        
        if response.status_code != 200:
            raise HTTPException(status_code=500, detail=f"Erreur LLM: {response.text}")
        
        data = response.json()
        answer = data.get("response", "")
        
        latency = (datetime.now() - start_time).total_seconds() * 1000
        
        return RAGResponse(
            answer=answer,
            sources=[f"doc://{request.collection}#1", f"doc://{request.collection}#2"],
            confidence=0.85,
            model=request.model,
            tokens_used=len(answer.split()),
            latency_ms=latency
        )
        
    except Exception as e:
        logger.error(f"Erreur RAG: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/elo/judge", response_model=JudgeResponse)
async def judge_response(request: JudgeRequest):
    """Jugement ELO local sans appel externe"""
    try:
        return local_judge(request.reference, request.candidate, request.task_type)
    except Exception as e:
        logger.error(f"Erreur jugement: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/agents", response_model=List[AgentInfo])
async def list_agents():
    """Liste des agents disponibles"""
    # TODO: Récupérer depuis la base de données
    return [
        AgentInfo(
            name="NovaGPT",
            version="1.0.0",
            capabilities=["chat", "rag", "code_generation"],
            model="llama3.1:8b-instruct-q4_K_M",
            status="active",
            last_updated=datetime.now()
        ),
        AgentInfo(
            name="MarketIntel Pro",
            version="1.0.0",
            capabilities=["market_analysis", "competitor_research", "reporting"],
            model="llama3.1:8b-instruct-q4_K_M",
            status="active",
            last_updated=datetime.now()
        )
    ]

@app.post("/agents/{agent_name}/run")
async def run_agent(agent_name: str, input_data: Dict[str, Any]):
    """Exécuter un agent spécifique"""
    try:
        # TODO: Implémenter l'exécution d'agent
        return {
            "agent": agent_name,
            "status": "running",
            "input": input_data,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# =============================================================================
# MAIN
# =============================================================================

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level=LOG_LEVEL.lower()
    ) 