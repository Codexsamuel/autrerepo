import asyncio
import json
import logging
import math
import hashlib
from typing import Dict, List, Optional, Any, Tuple
from datetime import datetime, timedelta
from dataclasses import dataclass, asdict
from enum import Enum
import numpy as np
from pathlib import Path

class MatchResult(Enum):
    WIN = "win"
    LOSS = "loss"
    DRAW = "draw"

class Difficulty(Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"

@dataclass
class Agent:
    id: str
    name: str
    rating: float
    games_played: int
    wins: int
    losses: int
    draws: int
    streak: int
    last_game: Optional[datetime]
    category: str
    version: str

@dataclass
class Match:
    id: str
    agent1_id: str
    agent2_id: str
    dataset_id: str
    question_id: str
    agent1_response: str
    agent2_response: str
    agent1_score: float
    agent2_score: float
    winner: str
    judge_confidence: float
    match_date: datetime
    metadata: Dict[str, Any]

@dataclass
class League:
    id: str
    name: str
    category: str
    min_rating: float
    max_rating: float
    agents: List[str]
    season: int
    start_date: datetime
    end_date: Optional[datetime]

class ELOSystem:
    def __init__(self, k_factor: int = 32, initial_rating: float = 1200.0):
        self.k_factor = k_factor
        self.initial_rating = initial_rating
        self.logger = logging.getLogger(__name__)
        self.agents: Dict[str, Agent] = {}
        self.matches: List[Match] = []
        self.leagues: Dict[str, League] = {}
        
        # Facteurs de difficulté pour ajuster le scoring
        self.difficulty_multipliers = {
            Difficulty.EASY: 0.8,
            Difficulty.MEDIUM: 1.0,
            Difficulty.HARD: 1.2
        }
    
    def register_agent(self, agent_id: str, name: str, category: str = "general", version: str = "1.0.0") -> Agent:
        """Enregistre un nouvel agent dans le système ELO"""
        if agent_id in self.agents:
            raise ValueError(f"Agent {agent_id} déjà enregistré")
        
        agent = Agent(
            id=agent_id,
            name=name,
            rating=self.initial_rating,
            games_played=0,
            wins=0,
            losses=0,
            draws=0,
            streak=0,
            last_game=None,
            category=category,
            version=version
        )
        
        self.agents[agent_id] = agent
        self.logger.info(f"Agent {name} ({agent_id}) enregistré avec rating initial {self.initial_rating}")
        
        return agent
    
    def calculate_expected_score(self, rating_a: float, rating_b: float) -> float:
        """Calcule le score attendu pour l'agent A contre l'agent B"""
        return 1.0 / (1.0 + math.pow(10, (rating_b - rating_a) / 400.0))
    
    def calculate_new_rating(self, current_rating: float, expected_score: float, actual_score: float, k_factor: int = None) -> float:
        """Calcule le nouveau rating ELO"""
        if k_factor is None:
            k_factor = self.k_factor
        
        new_rating = current_rating + k_factor * (actual_score - expected_score)
        return round(new_rating, 2)
    
    def adjust_k_factor(self, agent: Agent) -> int:
        """Ajuste le K-factor selon l'expérience de l'agent"""
        if agent.games_played < 30:
            return self.k_factor * 2  # Nouveaux agents: apprentissage rapide
        elif agent.games_played > 100:
            return max(16, self.k_factor // 2)  # Agents expérimentés: stabilité
        else:
            return self.k_factor
    
    async def judge_response(self, response: str, reference: str, difficulty: Difficulty = Difficulty.MEDIUM) -> Tuple[float, float]:
        """Juge une réponse par rapport à une référence (sans API externe)"""
        try:
            # Métriques algorithmiques locales
            exact_match_score = self._calculate_exact_match(response, reference)
            semantic_similarity = self._calculate_semantic_similarity(response, reference)
            length_penalty = self._calculate_length_penalty(response, reference)
            keyword_coverage = self._calculate_keyword_coverage(response, reference)
            
            # Score composite
            base_score = (
                exact_match_score * 0.3 +
                semantic_similarity * 0.4 +
                keyword_coverage * 0.2 +
                length_penalty * 0.1
            )
            
            # Ajustement par difficulté
            adjusted_score = base_score * self.difficulty_multipliers[difficulty]
            
            # Confiance du juge (basée sur la cohérence des métriques)
            confidence = self._calculate_judge_confidence(
                exact_match_score, semantic_similarity, keyword_coverage
            )
            
            return min(1.0, max(0.0, adjusted_score)), confidence
            
        except Exception as e:
            self.logger.error(f"Erreur lors du jugement: {e}")
            return 0.5, 0.5  # Score neutre en cas d'erreur
    
    def _calculate_exact_match(self, response: str, reference: str) -> float:
        """Calcule le score de correspondance exacte"""
        if not response or not reference:
            return 0.0
        
        response_lower = response.lower().strip()
        reference_lower = reference.lower().strip()
        
        if response_lower == reference_lower:
            return 1.0
        
        # Correspondance partielle
        response_words = set(response_lower.split())
        reference_words = set(reference_lower.split())
        
        if not reference_words:
            return 0.0
        
        intersection = response_words.intersection(reference_words)
        union = response_words.union(reference_words)
        
        return len(intersection) / len(union)
    
    def _calculate_semantic_similarity(self, response: str, reference: str) -> float:
        """Calcule la similarité sémantique basique"""
        if not response or not reference:
            return 0.0
        
        # Extraction de mots-clés communs
        response_words = set(response.lower().split())
        reference_words = set(reference.lower().split())
        
        # Mots-clés importants (à pondérer)
        important_keywords = {
            'kpi', 'mrr', 'churn', 'cac', 'ltv', 'arr', 'revenue', 'growth',
            'market', 'customer', 'product', 'strategy', 'business', 'startup'
        }
        
        response_important = response_words.intersection(important_keywords)
        reference_important = reference_words.intersection(important_keywords)
        
        # Score basé sur les mots-clés importants
        if reference_important:
            important_score = len(response_important.intersection(reference_important)) / len(reference_important)
        else:
            important_score = 0.0
        
        # Score basé sur tous les mots
        if reference_words:
            general_score = len(response_words.intersection(reference_words)) / len(reference_words)
        else:
            general_score = 0.0
        
        # Pondération: mots-clés importants comptent plus
        return (important_score * 0.7) + (general_score * 0.3)
    
    def _calculate_length_penalty(self, response: str, reference: str) -> float:
        """Calcule la pénalité de longueur"""
        if not response or not reference:
            return 0.0
        
        response_len = len(response.split())
        reference_len = len(reference.split())
        
        if reference_len == 0:
            return 0.0
        
        ratio = response_len / reference_len
        
        # Pénalité si trop court ou trop long
        if ratio < 0.5:
            return 0.5  # Réponse trop courte
        elif ratio > 2.0:
            return 0.7  # Réponse trop longue
        else:
            return 1.0  # Longueur appropriée
    
    def _calculate_keyword_coverage(self, response: str, reference: str) -> float:
        """Calcule la couverture des mots-clés"""
        if not response or not reference:
            return 0.0
        
        # Extraction des mots-clés de la référence
        reference_keywords = set(word.lower() for word in reference.split() if len(word) > 3)
        
        if not reference_keywords:
            return 0.0
        
        # Mots-clés présents dans la réponse
        response_words = set(word.lower() for word in response.split())
        covered_keywords = reference_keywords.intersection(response_words)
        
        return len(covered_keywords) / len(reference_keywords)
    
    def _calculate_judge_confidence(self, exact_match: float, semantic: float, keyword: float) -> float:
        """Calcule la confiance du juge basée sur la cohérence des métriques"""
        # Plus les métriques sont cohérentes, plus la confiance est élevée
        scores = [exact_match, semantic, keyword]
        mean_score = np.mean(scores)
        std_score = np.std(scores)
        
        # Confiance élevée si scores cohérents et élevés
        if std_score < 0.1 and mean_score > 0.8:
            return 0.9
        elif std_score < 0.2 and mean_score > 0.6:
            return 0.7
        elif std_score < 0.3:
            return 0.5
        else:
            return 0.3
    
    async def play_match(self, agent1_id: str, agent2_id: str, dataset_id: str, question_id: str, 
                        agent1_response: str, agent2_response: str, reference: str, 
                        difficulty: Difficulty = Difficulty.MEDIUM) -> Match:
        """Joue un match entre deux agents"""
        try:
            if agent1_id not in self.agents or agent2_id not in self.agents:
                raise ValueError("Un ou les deux agents ne sont pas enregistrés")
            
            # Juger les réponses
            score1, confidence1 = await self.judge_response(agent1_response, reference, difficulty)
            score2, confidence2 = await self.judge_response(agent2_response, reference, difficulty)
            
            # Déterminer le gagnant
            if score1 > score2:
                winner = agent1_id
                result1, result2 = MatchResult.WIN, MatchResult.LOSS
            elif score2 > score1:
                winner = agent2_id
                result1, result2 = MatchResult.LOSS, MatchResult.WIN
            else:
                winner = "draw"
                result1, result2 = MatchResult.DRAW, MatchResult.DRAW
            
            # Calculer les nouveaux ratings
            agent1 = self.agents[agent1_id]
            agent2 = self.agents[agent2_id]
            
            expected1 = self.calculate_expected_score(agent1.rating, agent2.rating)
            expected2 = self.calculate_expected_score(agent2.rating, agent1.rating)
            
            actual1 = 1.0 if result1 == MatchResult.WIN else (0.5 if result1 == MatchResult.DRAW else 0.0)
            actual2 = 1.0 if result2 == MatchResult.WIN else (0.5 if result2 == MatchResult.DRAW else 0.0)
            
            k1 = self.adjust_k_factor(agent1)
            k2 = self.adjust_k_factor(agent2)
            
            new_rating1 = self.calculate_new_rating(agent1.rating, expected1, actual1, k1)
            new_rating2 = self.calculate_new_rating(agent2.rating, expected2, actual2, k2)
            
            # Mettre à jour les agents
            self._update_agent_stats(agent1, result1, new_rating1)
            self._update_agent_stats(agent2, result2, new_rating2)
            
            # Créer le match
            match = Match(
                id=self._generate_match_id(),
                agent1_id=agent1_id,
                agent2_id=agent2_id,
                dataset_id=dataset_id,
                question_id=question_id,
                agent1_response=agent1_response,
                agent2_response=agent2_response,
                agent1_score=score1,
                agent2_score=score2,
                winner=winner,
                judge_confidence=(confidence1 + confidence2) / 2,
                match_date=datetime.now(),
                metadata={
                    "difficulty": difficulty.value,
                    "k_factor_agent1": k1,
                    "k_factor_agent2": k2,
                    "rating_change_agent1": new_rating1 - agent1.rating,
                    "rating_change_agent2": new_rating2 - agent2.rating
                }
            )
            
            self.matches.append(match)
            self.logger.info(f"Match joué: {agent1.name} vs {agent2.name}, gagnant: {winner}")
            
            return match
            
        except Exception as e:
            self.logger.error(f"Erreur lors du match: {e}")
            raise
    
    def _update_agent_stats(self, agent: Agent, result: MatchResult, new_rating: float):
        """Met à jour les statistiques d'un agent après un match"""
        agent.rating = new_rating
        agent.games_played += 1
        agent.last_game = datetime.now()
        
        if result == MatchResult.WIN:
            agent.wins += 1
            agent.streak = max(0, agent.streak) + 1
        elif result == MatchResult.LOSS:
            agent.losses += 1
            agent.streak = min(0, agent.streak) - 1
        else:  # DRAW
            agent.draws += 1
            agent.streak = 0
    
    def _generate_match_id(self) -> str:
        """Génère un ID unique pour un match"""
        timestamp = datetime.now().isoformat()
        random_suffix = hashlib.md5(timestamp.encode()).hexdigest()[:8]
        return f"match_{timestamp}_{random_suffix}"
    
    def get_agent_ranking(self, category: str = None) -> List[Agent]:
        """Retourne le classement des agents"""
        agents = list(self.agents.values())
        
        if category:
            agents = [a for a in agents if a.category == category]
        
        # Trier par rating décroissant
        agents.sort(key=lambda x: x.rating, reverse=True)
        return agents
    
    def get_agent_stats(self, agent_id: str) -> Optional[Dict[str, Any]]:
        """Retourne les statistiques détaillées d'un agent"""
        if agent_id not in self.agents:
            return None
        
        agent = self.agents[agent_id]
        
        # Calculer des statistiques supplémentaires
        win_rate = agent.wins / max(agent.games_played, 1)
        avg_rating_change = self._calculate_avg_rating_change(agent_id)
        
        return {
            "basic_stats": asdict(agent),
            "win_rate": round(win_rate, 3),
            "avg_rating_change": round(avg_rating_change, 2),
            "recent_performance": self._get_recent_performance(agent_id),
            "head_to_head": self._get_head_to_head_stats(agent_id)
        }
    
    def _calculate_avg_rating_change(self, agent_id: str) -> float:
        """Calcule le changement de rating moyen d'un agent"""
        agent_matches = [m for m in self.matches if m.agent1_id == agent_id or m.agent2_id == agent_id]
        
        if not agent_matches:
            return 0.0
        
        total_change = 0.0
        for match in agent_matches[-10:]:  # Derniers 10 matchs
            if match.agent1_id == agent_id:
                change = match.metadata.get("rating_change_agent1", 0)
            else:
                change = match.metadata.get("rating_change_agent2", 0)
            total_change += change
        
        return total_change / len(agent_matches[-10:])
    
    def _get_recent_performance(self, agent_id: str, matches_count: int = 5) -> List[Dict[str, Any]]:
        """Retourne la performance récente d'un agent"""
        agent_matches = [m for m in self.matches if m.agent1_id == agent_id or m.agent2_id == agent_id]
        recent_matches = sorted(agent_matches, key=lambda x: x.match_date, reverse=True)[:matches_count]
        
        performance = []
        for match in recent_matches:
            if match.agent1_id == agent_id:
                score = match.agent1_score
                opponent = match.agent2_id
                result = "win" if match.winner == agent_id else ("draw" if match.winner == "draw" else "loss")
            else:
                score = match.agent2_score
                opponent = match.agent1_id
                result = "win" if match.winner == agent_id else ("draw" if match.winner == "draw" else "loss")
            
            performance.append({
                "match_id": match.id,
                "opponent": opponent,
                "score": score,
                "result": result,
                "date": match.match_date.isoformat()
            })
        
        return performance
    
    def _get_head_to_head_stats(self, agent_id: str) -> Dict[str, Dict[str, Any]]:
        """Retourne les statistiques head-to-head d'un agent"""
        head_to_head = {}
        
        for match in self.matches:
            if match.agent1_id == agent_id:
                opponent_id = match.agent2_id
                agent_score = match.agent1_score
                opponent_score = match.agent2_score
            elif match.agent2_id == agent_id:
                opponent_id = match.agent1_id
                agent_score = match.agent2_score
                opponent_score = match.agent1_score
            else:
                continue
            
            if opponent_id not in head_to_head:
                head_to_head[opponent_id] = {
                    "matches": 0,
                    "wins": 0,
                    "losses": 0,
                    "draws": 0,
                    "avg_score": 0.0,
                    "avg_opponent_score": 0.0
                }
            
            stats = head_to_head[opponent_id]
            stats["matches"] += 1
            stats["avg_score"] = (stats["avg_score"] * (stats["matches"] - 1) + agent_score) / stats["matches"]
            stats["avg_opponent_score"] = (stats["avg_opponent_score"] * (stats["matches"] - 1) + opponent_score) / stats["matches"]
            
            if match.winner == agent_id:
                stats["wins"] += 1
            elif match.winner == "draw":
                stats["draws"] += 1
            else:
                stats["losses"] += 1
        
        return head_to_head
    
    def create_league(self, name: str, category: str, min_rating: float, max_rating: float, season: int = 1) -> League:
        """Crée une nouvelle ligue"""
        league_id = f"league_{category}_{season}_{hashlib.md5(name.encode()).hexdigest()[:8]}"
        
        league = League(
            id=league_id,
            name=name,
            category=category,
            min_rating=min_rating,
            max_rating=max_rating,
            agents=[],
            season=season,
            start_date=datetime.now(),
            end_date=None
        )
        
        self.leagues[league_id] = league
        self.logger.info(f"Ligue créée: {name} ({league_id})")
        
        return league
    
    def add_agent_to_league(self, league_id: str, agent_id: str) -> bool:
        """Ajoute un agent à une ligue"""
        if league_id not in self.leagues:
            return False
        
        if agent_id not in self.agents:
            return False
        
        league = self.leagues[league_id]
        agent = self.agents[agent_id]
        
        if agent.rating < league.min_rating or agent.rating > league.max_rating:
            return False
        
        if agent_id not in league.agents:
            league.agents.append(agent_id)
            self.logger.info(f"Agent {agent.name} ajouté à la ligue {league.name}")
            return True
        
        return False
    
    def get_league_standings(self, league_id: str) -> Optional[List[Dict[str, Any]]]:
        """Retourne le classement d'une ligue"""
        if league_id not in self.leagues:
            return None
        
        league = self.leagues[league_id]
        standings = []
        
        for agent_id in league.agents:
            if agent_id in self.agents:
                agent = self.agents[agent_id]
                standings.append({
                    "rank": 0,  # Sera calculé après tri
                    "agent_id": agent_id,
                    "name": agent.name,
                    "rating": agent.rating,
                    "games_played": agent.games_played,
                    "wins": agent.wins,
                    "losses": agent.losses,
                    "draws": agent.draws,
                    "win_rate": round(agent.wins / max(agent.games_played, 1), 3)
                })
        
        # Trier par rating décroissant
        standings.sort(key=lambda x: x["rating"], reverse=True)
        
        # Ajouter les rangs
        for i, standing in enumerate(standings):
            standing["rank"] = i + 1
        
        return standings
    
    def export_data(self) -> Dict[str, Any]:
        """Exporte toutes les données du système ELO"""
        return {
            "agents": {aid: asdict(agent) for aid, agent in self.agents.items()},
            "matches": [asdict(match) for match in self.matches],
            "leagues": {lid: asdict(league) for lid, league in self.leagues.items()},
            "export_date": datetime.now().isoformat(),
            "system_version": "1.0.0"
        }
    
    def import_data(self, data: Dict[str, Any]) -> bool:
        """Importe des données dans le système ELO"""
        try:
            # Vérifier la version
            if data.get("system_version") != "1.0.0":
                self.logger.warning("Version des données différente, importation risquée")
            
            # Importer les agents
            for aid, agent_data in data.get("agents", {}).items():
                agent = Agent(**agent_data)
                self.agents[aid] = agent
            
            # Importer les matchs
            for match_data in data.get("matches", []):
                match = Match(**match_data)
                self.matches.append(match)
            
            # Importer les ligues
            for lid, league_data in data.get("leagues", {}).items():
                league = League(**league_data)
                self.leagues[lid] = league
            
            self.logger.info(f"Données importées: {len(self.agents)} agents, {len(self.matches)} matchs, {len(self.leagues)} ligues")
            return True
            
        except Exception as e:
            self.logger.error(f"Erreur lors de l'import: {e}")
            return False

# Instance globale du système ELO
elo_system = ELOSystem() 