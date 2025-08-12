import asyncio
import json
import logging
from typing import Dict, List, Optional, Any
from pathlib import Path
import requests
import numpy as np
from datetime import datetime

class OllamaLLM:
    def __init__(self, model_name: str, host: str = "http://localhost:11434"):
        self.model_name = model_name
        self.host = host
        self.logger = logging.getLogger(__name__)
    
    async def generate(self, prompt: str, context: str = "", max_tokens: int = 1024) -> str:
        try:
            full_prompt = f"Contexte: {context}\n\nQuestion: {prompt}\n\nRéponse:" if context else prompt
            
            response = requests.post(
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
                timeout=30
            )
            
            if response.status_code == 200:
                return response.json()["response"]
            else:
                self.logger.error(f"Erreur Ollama: {response.status_code}")
                return "Désolé, je ne peux pas traiter votre demande pour le moment."
                
        except Exception as e:
            self.logger.error(f"Erreur lors de la génération: {e}")
            return "Erreur technique, veuillez réessayer."

class LocalRAGEngine:
    def __init__(self, vector_db_path: str = "./data/faiss"):
        self.vector_db_path = Path(vector_db_path)
        self.vector_db_path.mkdir(parents=True, exist_ok=True)
        self.logger = logging.getLogger(__name__)
    
    async def search(self, query: str, top_k: int = 5) -> List[str]:
        try:
            # Simulation de recherche vectorielle locale
            # En production, utilisez FAISS ou Annoy
            sample_contexts = [
                "NovaIA est une plateforme d'agents IA offline-first optimisée pour Windows et le cloud privé.",
                "Les agents peuvent utiliser des modèles locaux via Ollama pour la confidentialité maximale.",
                "Le système RAG local permet de rechercher dans vos documents sans exposer de données externes.",
                "NovaIA supporte CUDA pour les GPU NVIDIA et DirectML pour les CPU Windows.",
                "La sécurité est assurée par des politiques RBAC/ABAC et un chiffrement AES-256."
            ]
            
            # Simulation de scoring de similarité
            query_lower = query.lower()
            scored_contexts = []
            
            for ctx in sample_contexts:
                score = sum(1 for word in query_lower.split() if word in ctx.lower())
                scored_contexts.append((score, ctx))
            
            # Trier par score et retourner top_k
            scored_contexts.sort(key=lambda x: x[0], reverse=True)
            return [ctx for _, ctx in scored_contexts[:top_k]]
            
        except Exception as e:
            self.logger.error(f"Erreur RAG: {e}")
            return ["Contexte non disponible"]

class FileTool:
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
            self.logger.error(f"Erreur lecture fichier: {e}")
            return f"Erreur lors de la lecture: {e}"
    
    async def write_file(self, file_path: str, content: str) -> bool:
        try:
            path = Path(file_path)
            path.parent.mkdir(parents=True, exist_ok=True)
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        except Exception as e:
            self.logger.error(f"Erreur écriture fichier: {e}")
            return False

class WebTool:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
    
    async def search_web(self, query: str) -> str:
        # Simulation de recherche web éthique
        # En production, implémentez un web scraper respectueux
        return f"Recherche web simulée pour: {query}\n\nRésultats non disponibles en mode offline."

class MathTool:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
    
    async def calculate(self, expression: str) -> str:
        try:
            # Évaluation sécurisée d'expressions mathématiques
            allowed_chars = set('0123456789+-*/(). ')
            if not all(c in allowed_chars for c in expression):
                return "Expression non autorisée pour des raisons de sécurité."
            
            result = eval(expression)
            return f"Résultat: {result}"
        except Exception as e:
            return f"Erreur de calcul: {e}"

class NovaGPTAgent:
    def __init__(self, ollama_host: str = "http://localhost:11434"):
        self.llm = OllamaLLM("llama3.1:8b-instruct-q4_K_M", ollama_host)
        self.rag = LocalRAGEngine()
        self.tools = {
            "file": FileTool(),
            "web": WebTool(),
            "math": MathTool()
        }
        self.logger = logging.getLogger(__name__)
        self.conversation_history = []
    
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
            # Extraction simple du nom de fichier (en production, utilisez NLP)
            words = query.split()
            for i, word in enumerate(words):
                if word.endswith('.txt') or word.endswith('.md'):
                    tool_results["file_read"] = await self.tools["file"].read_file(word)
                    break
        
        # Détecter les calculs mathématiques
        if any(op in query for op in ['+', '-', '*', '/', '=']):
            # Extraction simple de l'expression (en production, utilisez regex)
            math_expr = query.replace('calcule', '').replace('calculer', '').strip()
            tool_results["math"] = await self.tools["math"].calculate(math_expr)
        
        return tool_results
    
    def get_conversation_history(self) -> List[Dict[str, Any]]:
        return self.conversation_history
    
    def clear_history(self):
        self.conversation_history = []

# Instance globale de l'agent
nova_gpt = NovaGPTAgent() 