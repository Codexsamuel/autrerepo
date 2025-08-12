import asyncio
import json
import logging
import re
from typing import Dict, List, Optional, Any
from pathlib import Path
import requests
from datetime import datetime, timedelta
from dataclasses import dataclass
import hashlib

@dataclass
class CompanyInfo:
    name: str
    website: str
    description: str
    industry: str
    size: str
    founded: str
    revenue: str
    employees: str
    competitors: List[str]
    strengths: List[str]
    weaknesses: List[str]
    opportunities: List[str]
    threats: List[str]

@dataclass
class MarketAnalysis:
    company: CompanyInfo
    market_position: str
    competitive_advantages: List[str]
    market_share_estimate: str
    growth_potential: str
    risk_factors: List[str]
    recommendations: List[str]
    analysis_date: datetime

class EthicalWebScraper:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'NovaIA-MarketIntel/1.0 (Ethical Scraper)',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'fr-FR,fr;q=0.8,en-US;q=0.5,en;q=0.3',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
        })
        self.rate_limit_delay = 2  # Délai entre requêtes en secondes
    
    async def gather_company_info(self, company_name: str) -> CompanyInfo:
        """Gather company information ethically from multiple sources"""
        try:
            # Simulation de collecte d'informations éthique
            # En production, utilisez des APIs publiques respectueuses
            
            # Informations simulées basées sur le nom de l'entreprise
            company_info = CompanyInfo(
                name=company_name,
                website=f"https://{company_name.lower().replace(' ', '')}.com",
                description=f"{company_name} est une entreprise innovante dans son secteur.",
                industry="Technologie",
                size="Moyenne",
                founded="2018",
                revenue="5-10M€",
                employees="50-100",
                competitors=["Compétiteur A", "Compétiteur B", "Compétiteur C"],
                strengths=["Innovation", "Équipe expérimentée", "Positionnement unique"],
                weaknesses=["Ressources limitées", "Marque peu connue"],
                opportunities=["Marché en croissance", "Nouvelles technologies"],
                threats=["Concurrence accrue", "Changements réglementaires"]
            )
            
            return company_info
            
        except Exception as e:
            self.logger.error(f"Erreur lors de la collecte d'informations: {e}")
            return CompanyInfo(
                name=company_name,
                website="",
                description="Informations non disponibles",
                industry="",
                size="",
                founded="",
                revenue="",
                employees="",
                competitors=[],
                strengths=[],
                weaknesses=[],
                opportunities=[],
                threats=[]
            )

class BusinessAnalyzer:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
    
    async def analyze_company(self, company_info: CompanyInfo) -> MarketAnalysis:
        """Analyse business complète de l'entreprise"""
        try:
            # Analyse de la position concurrentielle
            market_position = self._assess_market_position(company_info)
            
            # Avantages concurrentiels
            competitive_advantages = self._identify_advantages(company_info)
            
            # Estimation de la part de marché
            market_share = self._estimate_market_share(company_info)
            
            # Potentiel de croissance
            growth_potential = self._assess_growth_potential(company_info)
            
            # Facteurs de risque
            risk_factors = self._identify_risks(company_info)
            
            # Recommandations stratégiques
            recommendations = self._generate_recommendations(company_info)
            
            return MarketAnalysis(
                company=company_info,
                market_position=market_position,
                competitive_advantages=competitive_advantages,
                market_share_estimate=market_share,
                growth_potential=growth_potential,
                risk_factors=risk_factors,
                recommendations=recommendations,
                analysis_date=datetime.now()
            )
            
        except Exception as e:
            self.logger.error(f"Erreur lors de l'analyse: {e}")
            return MarketAnalysis(
                company=company_info,
                market_position="Non évalué",
                competitive_advantages=[],
                market_share_estimate="Non évalué",
                growth_potential="Non évalué",
                risk_factors=[],
                recommendations=[],
                analysis_date=datetime.now()
            )
    
    def _assess_market_position(self, company: CompanyInfo) -> str:
        """Évalue la position de l'entreprise sur le marché"""
        if len(company.strengths) > len(company.weaknesses):
            if company.size in ["Grande", "Très grande"]:
                return "Leader du marché"
            else:
                return "Challenger en croissance"
        else:
            return "Suiveur du marché"
    
    def _identify_advantages(self, company: CompanyInfo) -> List[str]:
        """Identifie les avantages concurrentiels"""
        advantages = []
        
        if company.industry == "Technologie":
            advantages.append("Innovation technologique")
        
        if company.size == "Moyenne":
            advantages.append("Agilité et flexibilité")
        
        if "Innovation" in company.strengths:
            advantages.append("Capacité d'innovation")
        
        return advantages
    
    def _estimate_market_share(self, company: CompanyInfo) -> str:
        """Estime la part de marché"""
        if company.size == "Très grande":
            return "15-25%"
        elif company.size == "Grande":
            return "8-15%"
        elif company.size == "Moyenne":
            return "3-8%"
        else:
            return "1-3%"
    
    def _assess_growth_potential(self, company: CompanyInfo) -> str:
        """Évalue le potentiel de croissance"""
        if company.industry == "Technologie" and "Innovation" in company.strengths:
            return "Élevé (15-25% par an)"
        elif company.industry == "Technologie":
            return "Modéré (8-15% par an)"
        else:
            return "Faible à modéré (3-8% par an)"
    
    def _identify_risks(self, company: CompanyInfo) -> List[str]:
        """Identifie les facteurs de risque"""
        risks = []
        
        if company.size == "Moyenne":
            risks.append("Ressources financières limitées")
        
        if "Concurrence accrue" in company.threats:
            risks.append("Intensification de la concurrence")
        
        if company.industry == "Technologie":
            risks.append("Obsolescence technologique rapide")
        
        return risks
    
    def _generate_recommendations(self, company: CompanyInfo) -> List[str]:
        """Génère des recommandations stratégiques"""
        recommendations = []
        
        if company.size == "Moyenne":
            recommendations.append("Renforcer la différenciation produit")
            recommendations.append("Développer des partenariats stratégiques")
        
        if "Innovation" in company.strengths:
            recommendations.append("Maintenir l'avantage technologique")
        
        if "Marque peu connue" in company.weaknesses:
            recommendations.append("Investir dans le marketing de marque")
        
        return recommendations

class ReportGenerator:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
    
    async def generate_market_report(self, analysis: MarketAnalysis) -> Dict[str, Any]:
        """Génère un rapport d'analyse de marché complet"""
        try:
            report = {
                "title": f"Analyse de Marché - {analysis.company.name}",
                "generated_at": analysis.analysis_date.isoformat(),
                "executive_summary": {
                    "company_name": analysis.company.name,
                    "market_position": analysis.market_position,
                    "key_insights": [
                        f"Position: {analysis.market_position}",
                        f"Part de marché estimée: {analysis.market_share_estimate}",
                        f"Potentiel de croissance: {analysis.growth_potential}"
                    ]
                },
                "company_overview": {
                    "name": analysis.company.name,
                    "website": analysis.company.website,
                    "industry": analysis.company.industry,
                    "size": analysis.company.size,
                    "founded": analysis.company.founded,
                    "revenue": analysis.company.revenue,
                    "employees": analysis.company.employees
                },
                "competitive_analysis": {
                    "position": analysis.market_position,
                    "advantages": analysis.competitive_advantages,
                    "competitors": analysis.company.competitors,
                    "market_share": analysis.market_share_estimate
                },
                "swot_analysis": {
                    "strengths": analysis.company.strengths,
                    "weaknesses": analysis.company.weaknesses,
                    "opportunities": analysis.company.opportunities,
                    "threats": analysis.company.threats
                },
                "growth_analysis": {
                    "potential": analysis.growth_potential,
                    "drivers": analysis.competitive_advantages,
                    "barriers": analysis.risk_factors
                },
                "risk_assessment": {
                    "factors": analysis.risk_factors,
                    "mitigation": self._generate_risk_mitigation(analysis)
                },
                "strategic_recommendations": {
                    "short_term": analysis.recommendations[:2],
                    "medium_term": analysis.recommendations[2:4] if len(analysis.recommendations) > 2 else [],
                    "long_term": analysis.recommendations[4:] if len(analysis.recommendations) > 4 else []
                },
                "methodology": {
                    "data_sources": ["Analyse publique", "Simulation éthique"],
                    "analysis_framework": "SWOT + Analyse concurrentielle",
                    "confidence_level": "Modéré (simulation)"
                }
            }
            
            return report
            
        except Exception as e:
            self.logger.error(f"Erreur lors de la génération du rapport: {e}")
            return {"error": str(e)}
    
    def _generate_risk_mitigation(self, analysis: MarketAnalysis) -> List[str]:
        """Génère des stratégies de mitigation des risques"""
        mitigation = []
        
        for risk in analysis.risk_factors:
            if "Ressources financières" in risk:
                mitigation.append("Diversification des sources de financement")
            elif "Concurrence" in risk:
                mitigation.append("Renforcement de la différenciation produit")
            elif "Technologique" in risk:
                mitigation.append("Veille technologique et R&D continue")
        
        return mitigation

class MarketIntelAgent:
    def __init__(self, ollama_host: str = "http://localhost:11434"):
        self.scraper = EthicalWebScraper()
        self.analyzer = BusinessAnalyzer()
        self.reporter = ReportGenerator()
        self.logger = logging.getLogger(__name__)
        self.analysis_cache = {}
    
    async def analyze_competitor(self, company_name: str, use_cache: bool = True) -> Dict[str, Any]:
        """Analyse complète d'un concurrent"""
        try:
            # Vérifier le cache
            cache_key = hashlib.md5(company_name.lower().encode()).hexdigest()
            if use_cache and cache_key in self.analysis_cache:
                cached = self.analysis_cache[cache_key]
                if (datetime.now() - cached["timestamp"]).days < 7:  # Cache valide 7 jours
                    return cached["data"]
            
            # Collecter les informations
            company_info = await self.scraper.gather_company_info(company_name)
            
            # Analyser l'entreprise
            market_analysis = await self.analyzer.analyze_company(company_info)
            
            # Générer le rapport
            report = await self.reporter.generate_market_report(market_analysis)
            
            # Mettre en cache
            if use_cache:
                self.analysis_cache[cache_key] = {
                    "data": report,
                    "timestamp": datetime.now()
                }
            
            return report
            
        except Exception as e:
            self.logger.error(f"Erreur lors de l'analyse: {e}")
            return {
                "error": str(e),
                "company_name": company_name,
                "timestamp": datetime.now().isoformat()
            }
    
    async def compare_competitors(self, company_names: List[str]) -> Dict[str, Any]:
        """Compare plusieurs concurrents"""
        try:
            comparisons = []
            
            for company_name in company_names:
                analysis = await self.analyze_competitor(company_name, use_cache=True)
                if "error" not in analysis:
                    comparisons.append(analysis)
            
            # Analyse comparative
            comparison_report = {
                "title": "Analyse Comparative des Concurrents",
                "companies_analyzed": len(comparisons),
                "comparison_date": datetime.now().isoformat(),
                "individual_analyses": comparisons,
                "competitive_landscape": self._generate_competitive_landscape(comparisons)
            }
            
            return comparison_report
            
        except Exception as e:
            self.logger.error(f"Erreur lors de la comparaison: {e}")
            return {"error": str(e)}
    
    def _generate_competitive_landscape(self, analyses: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Génère une vue d'ensemble du paysage concurrentiel"""
        try:
            positions = {}
            industries = {}
            sizes = {}
            
            for analysis in analyses:
                company_name = analysis["company_overview"]["name"]
                
                # Positions de marché
                position = analysis["competitive_analysis"]["position"]
                positions[company_name] = position
                
                # Industries
                industry = analysis["company_overview"]["industry"]
                if industry not in industries:
                    industries[industry] = []
                industries[industry].append(company_name)
                
                # Tailles d'entreprise
                size = analysis["company_overview"]["size"]
                if size not in sizes:
                    sizes[size] = []
                sizes[size].append(company_name)
            
            return {
                "market_positions": positions,
                "industry_distribution": industries,
                "size_distribution": sizes,
                "key_insights": self._extract_key_insights(analyses)
            }
            
        except Exception as e:
            self.logger.error(f"Erreur lors de la génération du paysage: {e}")
            return {"error": str(e)}
    
    def _extract_key_insights(self, analyses: List[Dict[str, Any]]) -> List[str]:
        """Extrait les insights clés de l'analyse comparative"""
        insights = []
        
        try:
            # Position dominante
            positions = [a["competitive_analysis"]["position"] for a in analyses if "competitive_analysis" in a]
            if positions:
                most_common_position = max(set(positions), key=positions.count)
                insights.append(f"Position dominante: {most_common_position}")
            
            # Avantages communs
            all_advantages = []
            for a in analyses:
                if "competitive_analysis" in a and "advantages" in a["competitive_analysis"]:
                    all_advantages.extend(a["competitive_analysis"]["advantages"])
            
            if all_advantages:
                common_advantages = [adv for adv in set(all_advantages) if all_advantages.count(adv) > 1]
                if common_advantages:
                    insights.append(f"Avantages communs: {', '.join(common_advantages[:3])}")
            
            # Risques partagés
            all_risks = []
            for a in analyses:
                if "risk_assessment" in a and "factors" in a["risk_assessment"]:
                    all_risks.extend(a["risk_assessment"]["factors"])
            
            if all_risks:
                common_risks = [risk for risk in set(all_risks) if all_risks.count(risk) > 1]
                if common_risks:
                    insights.append(f"Risques partagés: {', '.join(common_risks[:3])}")
            
        except Exception as e:
            self.logger.error(f"Erreur lors de l'extraction des insights: {e}")
            insights.append("Erreur lors de l'analyse des insights")
        
        return insights
    
    def get_cache_stats(self) -> Dict[str, Any]:
        """Retourne les statistiques du cache"""
        return {
            "total_cached": len(self.analysis_cache),
            "cache_size_mb": sum(len(str(v)) for v in self.analysis_cache.values()) / 1024 / 1024,
            "oldest_entry": min((v["timestamp"] for v in self.analysis_cache.values()), default=None),
            "newest_entry": max((v["timestamp"] for v in self.analysis_cache.values()), default=None)
        }
    
    def clear_cache(self):
        """Vide le cache"""
        self.analysis_cache.clear()
        self.logger.info("Cache d'analyse vidé")

# Instance globale de l'agent
market_intel = MarketIntelAgent() 