#!/usr/bin/env python3
"""
Système ELO Optimisé - Version Ultra-Rapide
"""
import asyncio
import json
import logging
import math
import hashlib
from typing import Dict, List, Optional, Any, Tuple
from datetime import datetime, timedelta
from dataclasses import dataclass, asdict
from enum import Enum
from pathlib import Path

# Lazy loading pour numpy
class LazyNumpy:
    def __init__(self):
        self._np = None
    
    @property
    def np(self):
        if self._np is None:
            import numpy as np
            self._np = np
        return self._np

lazy_np = LazyNumpy()

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
    category: str
    rating: float
    games_played: int
    wins: int
    losses: int
    draws: int
    created_at: datetime
    last_updated: datetime

@dataclass
class Match:
    id: str
    agent1_id: str
    agent2_id: str
    dataset: str
    question_id: str
    agent1_response: str
    agent2_response: str
    reference: str
    difficulty: Difficulty
    agent1_score: float
    agent2_score: float
    winner: str
    judge_confidence: float
    created_at: datetime

@dataclass
class League:
    id: str
    name: str
    category: str
    min_rating: float
    max_rating: float
    season: int
    created_at: datetime

class ELOSystemOptimized:
    def __init__(self, k_factor: int = 32, initial_rating: float = 1200.0):
        self.k_factor = k_factor
        self.initial_rating = initial_rating
        self.agents: Dict[str, Agent] = {}
        self.matches: List[Match] = []
        self.leagues: Dict[str, League] = {}
        self.logger = logging.getLogger(__name__)
        
        # Cache pour les calculs ELO
        self._rating_cache = {}
        self._expected_score_cache = {}
        
        # Optimisation: pré-calculer les facteurs K
        self._k_factors = self._precompute_k_factors()
    
    def _precompute_k_factors(self) -> Dict[int, float]:
        """Pré-calcule les facteurs K pour différentes plages de rating"""
        k_factors = {}
        for games in range(1, 101):
            if games < 30:
                k_factors[games] = 40.0
            elif games < 100:
                k_factors[games] = 32.0
            else:
                k_factors[games] = 24.0
        return k_factors
    
    def register_agent(self, agent_id: str, name: str, category: str) -> Agent:
        """Enregistre un nouvel agent avec optimisations"""
        if agent_id in self.agents:
            return self.agents[agent_id]
        
        now = datetime.now()
        agent = Agent(
            id=agent_id,
            name=name,
            category=category,
            rating=self.initial_rating,
            games_played=0,
            wins=0,
            losses=0,
            draws=0,
            created_at=now,
            last_updated=now
        )
        
        self.agents[agent_id] = agent
        return agent
    
    def calculate_expected_score(self, rating_a: float, rating_b: float) -> float:
        """Calcule le score attendu avec cache"""
        cache_key = (rating_a, rating_b)
        if cache_key in self._expected_score_cache:
            return self._expected_score_cache[cache_key]
        
        expected = 1.0 / (1.0 + math.pow(10, (rating_b - rating_a) / 400.0))
        self._expected_score_cache[cache_key] = expected
        return expected
    
    def calculate_new_rating(self, current_rating: float, expected_score: float, actual_score: float, k_factor: float) -> float:
        """Calcule le nouveau rating avec optimisations"""
        cache_key = (current_rating, expected_score, actual_score, k_factor)
        if cache_key in self._rating_cache:
            return self._rating_cache[cache_key]
        
        new_rating = current_rating + k_factor * (actual_score - expected_score)
        self._rating_cache[cache_key] = new_rating
        return new_rating
    
    def adjust_k_factor(self, agent: Agent) -> float:
        """Ajuste le facteur K de manière optimisée"""
        games = agent.games_played
        if games < 30:
            return 40.0
        elif games < 100:
            return 32.0
        else:
            return 24.0
    
    async def judge_response(self, response: str, reference: str, difficulty: Difficulty) -> Tuple[float, float]:
        """Juge une réponse avec optimisations"""
        try:
            # Métriques de base
            exact_match = 1.0 if response.strip().lower() == reference.strip().lower() else 0.0
            
            # Similarité sémantique simplifiée (plus rapide)
            response_words = set(response.lower().split())
            reference_words = set(reference.lower().split())
            
            if not reference_words:
                return 0.0, 0.0
            
            intersection = len(response_words.intersection(reference_words))
            union = len(response_words.union(reference_words))
            
            jaccard_similarity = intersection / union if union > 0 else 0.0
            
            # Pénalité de longueur
            length_penalty = 1.0 - min(abs(len(response) - len(reference)) / max(len(reference), 1), 0.5)
            
            # Couverture des mots-clés
            keyword_coverage = intersection / len(reference_words) if reference_words else 0.0
            
            # Score final pondéré
            score = (
                exact_match * 0.4 +
                jaccard_similarity * 0.3 +
                length_penalty * 0.2 +
                keyword_coverage * 0.1
            )
            
            # Confiance du juge
            judge_confidence = min(score * 1.5, 1.0)
            
            return score, judge_confidence
            
        except Exception as e:
            self.logger.error(f"Erreur lors du jugement: {e}")
            return 0.0, 0.0
    
    async def play_match(self, agent1_id: str, agent2_id: str, dataset: str, question_id: str,
                        agent1_response: str, agent2_response: str, reference: str, difficulty: Difficulty) -> Match:
        """Joue un match avec optimisations"""
        try:
            # Validation des agents
            if agent1_id not in self.agents or agent2_id not in self.agents:
                raise ValueError("Un ou les deux agents ne sont pas enregistrés")
            
            agent1 = self.agents[agent1_id]
            agent2 = self.agents[agent2_id]
            
            # Jugement des réponses
            score1, confidence1 = await self.judge_response(agent1_response, reference, difficulty)
            score2, confidence2 = await self.judge_response(agent2_response, reference, difficulty)
            
            # Détermination du gagnant
            if score1 > score2:
                winner = agent1_id
                result1, result2 = MatchResult.WIN, MatchResult.LOSS
            elif score2 > score1:
                winner = agent2_id
                result1, result2 = MatchResult.LOSS, MatchResult.WIN
            else:
                winner = "draw"
                result1, result2 = MatchResult.DRAW, MatchResult.DRAW
            
            # Calcul des nouveaux ratings
            k1 = self.adjust_k_factor(agent1)
            k2 = self.adjust_k_factor(agent2)
            
            expected1 = self.calculate_expected_score(agent1.rating, agent2.rating)
            expected2 = self.calculate_expected_score(agent2.rating, agent1.rating)
            
            actual1 = 1.0 if result1 == MatchResult.WIN else (0.5 if result1 == MatchResult.DRAW else 0.0)
            actual2 = 1.0 if result2 == MatchResult.WIN else (0.5 if result2 == MatchResult.DRAW else 0.0)
            
            new_rating1 = self.calculate_new_rating(agent1.rating, expected1, actual1, k1)
            new_rating2 = self.calculate_new_rating(agent2.rating, expected2, actual2, k2)
            
            # Mise à jour des agents
            self._update_agent_stats(agent1, result1, new_rating1)
            self._update_agent_stats(agent2, result2, new_rating2)
            
            # Création du match
            match_id = f"match_{datetime.now().isoformat()}_{hashlib.md5(f'{agent1_id}{agent2_id}{datetime.now()}'.encode()).hexdigest()[:8]}"
            
            match = Match(
                id=match_id,
                agent1_id=agent1_id,
                agent2_id=agent2_id,
                dataset=dataset,
                question_id=question_id,
                agent1_response=agent1_response,
                agent2_response=agent2_response,
                reference=reference,
                difficulty=difficulty,
                agent1_score=score1,
                agent2_score=score2,
                winner=winner,
                judge_confidence=(confidence1 + confidence2) / 2,
                created_at=datetime.now()
            )
            
            self.matches.append(match)
            
            # Nettoyage du cache si nécessaire
            if len(self._rating_cache) > 1000:
                self._rating_cache.clear()
            
            return match
            
        except Exception as e:
            self.logger.error(f"Erreur lors du match: {e}")
            raise
    
    def _update_agent_stats(self, agent: Agent, result: MatchResult, new_rating: float):
        """Met à jour les statistiques d'un agent"""
        agent.games_played += 1
        agent.rating = new_rating
        agent.last_updated = datetime.now()
        
        if result == MatchResult.WIN:
            agent.wins += 1
        elif result == MatchResult.LOSS:
            agent.losses += 1
        else:
            agent.draws += 1
    
    def get_agent_ranking(self) -> List[Agent]:
        """Retourne le classement des agents (optimisé)"""
        return sorted(self.agents.values(), key=lambda x: x.rating, reverse=True)
    
    def get_agent_stats(self, agent_id: str) -> Optional[Dict[str, Any]]:
        """Retourne les statistiques d'un agent"""
        if agent_id not in self.agents:
            return None
        
        agent = self.agents[agent_id]
        
        # Calculs optimisés
        win_rate = agent.wins / agent.games_played if agent.games_played > 0 else 0.0
        
        # Performance récente (derniers 10 matchs)
        recent_matches = [m for m in self.matches if m.agent1_id == agent_id or m.agent2_id == agent_id]
        recent_matches.sort(key=lambda x: x.created_at, reverse=True)
        recent_performance = recent_matches[:10]
        
        # Changement de rating moyen
        if len(recent_performance) > 1:
            rating_changes = []
            for i in range(1, len(recent_performance)):
                if recent_performance[i].agent1_id == agent_id:
                    current_score = recent_performance[i].agent1_score
                    prev_score = recent_performance[i-1].agent1_score
                else:
                    current_score = recent_performance[i].agent2_score
                    prev_score = recent_performance[i-1].agent2_score
                rating_changes.append(current_score - prev_score)
            
            avg_rating_change = sum(rating_changes) / len(rating_changes) if rating_changes else 0.0
        else:
            avg_rating_change = 0.0
        
        return {
            'id': agent.id,
            'name': agent.name,
            'rating': agent.rating,
            'games_played': agent.games_played,
            'wins': agent.wins,
            'losses': agent.losses,
            'draws': agent.draws,
            'win_rate': win_rate,
            'avg_rating_change': avg_rating_change,
            'recent_performance': recent_performance
        }
    
    def create_league(self, name: str, category: str, min_rating: float, max_rating: float, season: int) -> League:
        """Crée une nouvelle ligue"""
        league_id = f"league_{category}_{season}_{hashlib.md5(f'{name}{datetime.now()}'.encode()).hexdigest()[:8]}"
        
        league = League(
            id=league_id,
            name=name,
            category=category,
            min_rating=min_rating,
            max_rating=max_rating,
            season=season,
            created_at=datetime.now()
        )
        
        self.leagues[league_id] = league
        return league
    
    def add_agent_to_league(self, league_id: str, agent_id: str) -> bool:
        """Ajoute un agent à une ligue"""
        if league_id not in self.leagues or agent_id not in self.agents:
            return False
        
        league = self.leagues[league_id]
        agent = self.agents[agent_id]
        
        # Vérifier que l'agent respecte les critères de la ligue
        if league.min_rating <= agent.rating <= league.max_rating:
            return True
        
        return False
    
    def get_league_standings(self, league_id: str) -> List[Dict[str, Any]]:
        """Retourne le classement d'une ligue"""
        if league_id not in self.leagues:
            return []
        
        league = self.leagues[league_id]
        
        # Filtrer les agents de la ligue
        league_agents = [
            agent for agent in self.agents.values()
            if agent.category == league.category and league.min_rating <= agent.rating <= league.max_rating
        ]
        
        # Trier par rating
        league_agents.sort(key=lambda x: x.rating, reverse=True)
        
        # Formater les résultats
        standings = []
        for rank, agent in enumerate(league_agents, 1):
            standings.append({
                'rank': rank,
                'id': agent.id,
                'name': agent.name,
                'rating': agent.rating,
                'games_played': agent.games_played,
                'win_rate': agent.wins / agent.games_played if agent.games_played > 0 else 0.0
            })
        
        return standings
    
    def export_data(self) -> Dict[str, Any]:
        """Exporte toutes les données"""
        return {
            'agents': [asdict(agent) for agent in self.agents.values()],
            'matches': [asdict(match) for match in self.matches],
            'leagues': [asdict(league) for league in self.leagues.values()]
        }
    
    def import_data(self, data: Dict[str, Any]) -> bool:
        """Importe des données"""
        try:
            # Vider les données existantes
            self.agents.clear()
            self.matches.clear()
            self.leagues.clear()
            
            # Importer les agents
            for agent_data in data.get('agents', []):
                agent = Agent(
                    id=agent_data['id'],
                    name=agent_data['name'],
                    category=agent_data['category'],
                    rating=agent_data['rating'],
                    games_played=agent_data['games_played'],
                    wins=agent_data['wins'],
                    losses=agent_data['losses'],
                    draws=agent_data['draws'],
                    created_at=datetime.fromisoformat(agent_data['created_at']),
                    last_updated=datetime.fromisoformat(agent_data['last_updated'])
                )
                self.agents[agent.id] = agent
            
            # Importer les matchs
            for match_data in data.get('matches', []):
                match = Match(
                    id=match_data['id'],
                    agent1_id=match_data['agent1_id'],
                    agent2_id=match_data['agent2_id'],
                    dataset=match_data['dataset'],
                    question_id=match_data['question_id'],
                    agent1_response=match_data['agent1_response'],
                    agent2_response=match_data['agent2_response'],
                    reference=match_data['reference'],
                    difficulty=Difficulty(match_data['difficulty']),
                    agent1_score=match_data['agent1_score'],
                    agent2_score=match_data['agent2_score'],
                    winner=match_data['winner'],
                    judge_confidence=match_data['judge_confidence'],
                    created_at=datetime.fromisoformat(match_data['created_at'])
                )
                self.matches.append(match)
            
            # Importer les ligues
            for league_data in data.get('leagues', []):
                league = League(
                    id=league_data['id'],
                    name=league_data['name'],
                    category=league_data['category'],
                    min_rating=league_data['min_rating'],
                    max_rating=league_data['max_rating'],
                    season=league_data['season'],
                    created_at=datetime.fromisoformat(league_data['created_at'])
                )
                self.leagues[league.id] = league
            
            return True
            
        except Exception as e:
            self.logger.error(f"Erreur lors de l'import: {e}")
            return False

# Instance globale optimisée
elo_system_optimized = ELOSystemOptimized() 