#!/usr/bin/env python3
"""
NovaGPT Optimisé - Version Ultra-Rapide
"""
import asyncio
import json
import logging
from typing import Dict, List, Optional, Any
from pathlib import Path
from datetime import datetime

# Lazy loading des modules lourds
class LazyLoader:
    def __init__(self):
        self._requests = None
        self._numpy = None
    
    @property
    def requests(self):
        if self._requests is None:
            import requests
            self._requests = requests
        return self._requests
    
    @property
    def numpy(self):
        if self._numpy is None:
            import numpy as np
            self._numpy = np
        return self._numpy

# Instance globale du lazy loader
lazy = LazyLoader()

class OllamaLLMOptimized:
    def __init__(self, model_name: str, host: str = "http://localhost:11434"):
        self.model_name = model_name
        self.host = host
        self.logger = logging.getLogger(__name__)
        self._session = None
    
    @property
    def session(self):
        if self._session is None:
            self._session = lazy.requests.Session()
            self._session.headers.update({
                'User-Agent': 'NovaGPT-Optimized/1.0',
                'Accept': 'application/json',
                'Connection': 'keep-alive'
            })
        return self._session
    
    async def generate(self, prompt: str, context: str = "", max_tokens: int = 1024) -> str:
        try:
            full_prompt = f"Contexte: {context}\n\nQuestion: {prompt}\n\nRéponse:" if context else prompt
            
            response = self.session.post(
                f"{self.host}/api/generate",
                json={
                    "model": self.model_name,
                    "prompt": full_prompt,
                    "stream": False,
                    "options": {
                        "num_predict": max_tokens,
                        "temperature": 0.7,
                        "top_p": 0.9
                    }
                },
                timeout=5  # Timeout réduit
            )
            
            if response.status_code == 200:
                return response.json()["response"]
            else:
                return "Désolé, je ne peux pas traiter votre demande pour le moment."
                
        except Exception as e:
            return "Erreur technique, veuillez réessayer."

class LocalRAGEngineOptimized:
    def __init__(self, vector_db_path: str = "./data/faiss"):
        self.vector_db_path = Path(vector_db_path)
        self.vector_db_path.mkdir(parents=True, exist_ok=True)
        self.logger = logging.getLogger(__name__)
        self._contexts = None
    
    @property
    def contexts(self):
        if self._contexts is None:
            self._contexts = [
                "NovaIA est une plateforme d'agents IA offline-first optimisée pour Windows et le cloud privé.",
                "Les agents peuvent utiliser des modèles locaux via Ollama pour la confidentialité maximale.",
                "Le système RAG local permet de rechercher dans vos documents sans exposer de données externes.",
                "NovaIA supporte CUDA pour les GPU NVIDIA et DirectML pour les CPU Windows.",
                "La sécurité est assurée par des politiques RBAC/ABAC et un chiffrement AES-256."
            ]
        return self._contexts
    
    async def search(self, query: str, top_k: int = 5) -> List[str]:
        try:
            query_lower = query.lower()
            scored_contexts = []
            
            for ctx in self.contexts:
                score = sum(1 for word in query_lower.split() if word in ctx.lower())
                scored_contexts.append((score, ctx))
            
            scored_contexts.sort(key=lambda x: x[0], reverse=True)
            return [ctx for _, ctx in scored_contexts[:top_k]]
            
        except Exception as e:
            return ["Contexte non disponible"]

class FileToolOptimized:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
    
    async def read_file(self, file_path: str) -> str:
        try:
            path = Path(file_path)
            if path.exists() and path.is_file():
                with open(path, 'r', encoding='utf-8') as f:
                    return f.read()
            return "Fichier non trouvé ou inaccessible."
        except Exception as e:
            return f"Erreur lors de la lecture: {e}"
    
    async def write_file(self, file_path: str, content: str) -> bool:
        try:
            path = Path(file_path)
            path.parent.mkdir(parents=True, exist_ok=True)
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        except Exception as e:
            return False

class MathToolOptimized:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
    
    async def calculate(self, expression: str) -> str:
        try:
            allowed_chars = set('0123456789+-*/(). ')
            if not all(c in allowed_chars for c in expression):
                return "Expression non autorisée pour des raisons de sécurité."
            
            result = eval(expression)
            return f"Résultat: {result}"
        except Exception as e:
            return f"Erreur de calcul: {e}"

class NovaGPTAgentOptimized:
    def __init__(self, ollama_host: str = "http://localhost:11434"):
        self._llm = None
        self._rag = None
        self._tools = None
        self.logger = logging.getLogger(__name__)
        self.conversation_history = []
        self.ollama_host = ollama_host
    
    @property
    def llm(self):
        if self._llm is None:
            self._llm = OllamaLLMOptimized("llama3.1:8b-instruct-q4_K_M", self.ollama_host)
        return self._llm
    
    @property
    def rag(self):
        if self._rag is None:
            self._rag = LocalRAGEngineOptimized()
        return self._rag
    
    @property
    def tools(self):
        if self._tools is None:
            self._tools = {
                "file": FileToolOptimized(),
                "math": MathToolOptimized()
            }
        return self._tools
    
    async def process_query(self, query: str, use_rag: bool = True, use_tools: bool = True) -> Dict[str, Any]:
        try:
            start_time = datetime.now()
            
            # Ajouter à l'historique
            self.conversation_history.append({"role": "user", "content": query, "timestamp": start_time})
            
            # RAG local si activé
            context = ""
            if use_rag:
                context = " ".join(await self.rag.search(query))
            
            # Détecter et exécuter des outils si nécessaire
            tool_results = {}
            if use_tools:
                tool_results = await self._execute_tools(query)
            
            # Générer la réponse
            response = await self.llm.generate(query, context)
            
            # Ajouter la réponse à l'historique
            end_time = datetime.now()
            processing_time = (end_time - start_time).total_seconds()
            
            self.conversation_history.append({
                "role": "assistant", 
                "content": response, 
                "timestamp": end_time
            })
            
            return {
                "response": response,
                "context": context,
                "tools_used": tool_results,
                "processing_time": processing_time,
                "model": "llama3.1:8b-instruct-q4_K_M",
                "timestamp": end_time.isoformat()
            }
            
        except Exception as e:
            self.logger.error(f"Erreur lors du traitement: {e}")
            return {
                "error": str(e),
                "response": "Désolé, une erreur s'est produite lors du traitement de votre demande.",
                "timestamp": datetime.now().isoformat()
            }
    
    async def _execute_tools(self, query: str) -> Dict[str, Any]:
        tool_results = {}
        
        # Détecter les demandes de fichiers
        if "lire" in query.lower() or "ouvrir" in query.lower():
            words = query.split()
            for i, word in enumerate(words):
                if word.endswith('.txt') or word.endswith('.md'):
                    tool_results["file_read"] = await self.tools["file"].read_file(word)
                    break
        
        # Détecter les calculs mathématiques
        if any(op in query for op in ['+', '-', '*', '/', '=']):
            math_expr = query.replace('calcule', '').replace('calculer', '').strip()
            tool_results["math"] = await self.tools["math"].calculate(math_expr)
        
        return tool_results
    
    def get_conversation_history(self) -> List[Dict[str, Any]]:
        return self.conversation_history
    
    def clear_history(self):
        self.conversation_history = []

# Instance globale optimisée
nova_gpt_optimized = NovaGPTAgentOptimized() 