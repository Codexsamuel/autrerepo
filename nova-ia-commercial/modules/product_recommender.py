#!/usr/bin/env python3
"""
Nova IA Commercial - Module de Recommandations Produits
Système IA de recommandation intelligente pour DL Solutions
"""

import json
import time
from typing import Dict, List, Any, Optional
from datetime import datetime
import random

class ProductRecommender:
    """Système de recommandation produits Nova IA Commercial"""
    
    def __init__(self):
        self.products_database = {
            "formations": [
                {
                    "id": "formation_ia_basic",
                    "name": "Formation IA Fondamentaux",
                    "description": "Introduction à l'Intelligence Artificielle",
                    "price": "150,000 FCFA",
                    "duration": "2 jours",
                    "level": "Débutant",
                    "tags": ["IA", "Formation", "Débutant", "Fondamentaux"]
                },
                {
                    "id": "formation_ia_advanced",
                    "name": "Formation IA Avancée",
                    "description": "Maîtrise des techniques IA avancées",
                    "price": "300,000 FCFA",
                    "duration": "5 jours",
                    "level": "Avancé",
                    "tags": ["IA", "Formation", "Avancé", "Techniques"]
                },
                {
                    "id": "formation_cybersecurity",
                    "name": "Formation Cybersécurité",
                    "description": "Sécurisation des systèmes informatiques",
                    "price": "250,000 FCFA",
                    "duration": "3 jours",
                    "level": "Intermédiaire",
                    "tags": ["Cybersécurité", "Formation", "Sécurité", "Systèmes"]
                }
            ],
            "services": [
                {
                    "id": "consulting_ia",
                    "name": "Consulting IA",
                    "description": "Accompagnement stratégique en IA",
                    "price": "500,000 FCFA/jour",
                    "duration": "Sur mesure",
                    "level": "Entreprise",
                    "tags": ["IA", "Consulting", "Stratégie", "Entreprise"]
                },
                {
                    "id": "developpement_web",
                    "name": "Développement Web IA",
                    "description": "Création de sites web intelligents",
                    "price": "1,500,000 FCFA",
                    "duration": "2-4 semaines",
                    "level": "Tous niveaux",
                    "tags": ["Web", "Développement", "IA", "Sites"]
                },
                {
                    "id": "audit_securite",
                    "name": "Audit de Sécurité",
                    "description": "Évaluation de la sécurité informatique",
                    "price": "750,000 FCFA",
                    "duration": "1 semaine",
                    "level": "Entreprise",
                    "tags": ["Sécurité", "Audit", "Évaluation", "Entreprise"]
                }
            ],
            "produits": [
                {
                    "id": "casquette_novacore",
                    "name": "Casquette NovaCore",
                    "description": "Casquette exclusive DL Solutions",
                    "price": "15,000 FCFA",
                    "category": "Merchandising",
                    "tags": ["Casquette", "NovaCore", "Merchandising", "Style"]
                },
                {
                    "id": "tshirt_dl_ai",
                    "name": "T-shirt DL Solutions AI",
                    "description": "T-shirt design exclusif IA",
                    "price": "25,000 FCFA",
                    "category": "Merchandising",
                    "tags": ["T-shirt", "IA", "Design", "Merchandising"]
                },
                {
                    "id": "mug_nova",
                    "name": "Mug Nova IA",
                    "description": "Mug personnalisé Nova IA",
                    "price": "8,000 FCFA",
                    "category": "Merchandising",
                    "tags": ["Mug", "Nova", "IA", "Merchandising"]
                }
            ]
        }
        
        self.user_profiles = {}
        self.recommendation_history = []
    
    def get_recommendations(self, user_profile: Dict[str, Any]) -> Dict[str, Any]:
        """Génération de recommandations personnalisées"""
        print(f"🎯 [NOVA IA] Génération recommandations pour: {user_profile.get('name', 'Client')}")
        
        recommendations = {
            "timestamp": datetime.now().isoformat(),
            "user_profile": user_profile,
            "recommendations": [],
            "reasoning": [],
            "confidence_score": 0.0
        }
        
        # Analyse du profil utilisateur
        budget = user_profile.get("budget", "medium")
        interests = user_profile.get("interests", [])
        level = user_profile.get("level", "beginner")
        company_size = user_profile.get("company_size", "individual")
        
        # Logique de recommandation
        if company_size in ["startup", "sme", "large"]:
            # Recommandations entreprises
            recommendations["recommendations"].extend(self.get_enterprise_recommendations(budget, interests))
        else:
            # Recommandations individuels
            recommendations["recommendations"].extend(self.get_individual_recommendations(budget, interests, level))
        
        # Ajout de merchandising si budget suffisant
        if budget in ["medium", "high"]:
            recommendations["recommendations"].extend(self.get_merchandising_recommendations())
        
        # Calcul du score de confiance
        recommendations["confidence_score"] = self.calculate_confidence_score(user_profile, recommendations["recommendations"])
        
        # Raisonnement
        recommendations["reasoning"] = self.generate_reasoning(user_profile, recommendations["recommendations"])
        
        # Sauvegarde de l'historique
        self.recommendation_history.append(recommendations)
        
        return recommendations
    
    def get_enterprise_recommendations(self, budget: str, interests: List[str]) -> List[Dict[str, Any]]:
        """Recommandations pour entreprises"""
        recommendations = []
        
        # Services prioritaires pour entreprises
        enterprise_services = [
            "consulting_ia",
            "audit_securite",
            "developpement_web"
        ]
        
        for service_id in enterprise_services:
            service = self.find_product_by_id(service_id)
            if service:
                # Filtrage par budget
                if self.matches_budget(service, budget):
                    recommendations.append({
                        "type": "service",
                        "product": service,
                        "priority": "high",
                        "reason": "Service essentiel pour entreprise"
                    })
        
        # Formations pour équipes
        if "IA" in interests or "formation" in interests:
            formation = self.find_product_by_id("formation_ia_advanced")
            if formation and self.matches_budget(formation, budget):
                recommendations.append({
                    "type": "formation",
                    "product": formation,
                    "priority": "medium",
                    "reason": "Formation équipe en IA"
                })
        
        return recommendations
    
    def get_individual_recommendations(self, budget: str, interests: List[str], level: str) -> List[Dict[str, Any]]:
        """Recommandations pour individus"""
        recommendations = []
        
        # Formations selon le niveau
        if level == "beginner":
            formation = self.find_product_by_id("formation_ia_basic")
            if formation and self.matches_budget(formation, budget):
                recommendations.append({
                    "type": "formation",
                    "product": formation,
                    "priority": "high",
                    "reason": "Formation de base recommandée"
                })
        elif level == "intermediate":
            formation = self.find_product_by_id("formation_cybersecurity")
            if formation and self.matches_budget(formation, budget):
                recommendations.append({
                    "type": "formation",
                    "product": formation,
                    "priority": "high",
                    "reason": "Formation cybersécurité adaptée"
                })
        elif level == "advanced":
            formation = self.find_product_by_id("formation_ia_advanced")
            if formation and self.matches_budget(formation, budget):
                recommendations.append({
                    "type": "formation",
                    "product": formation,
                    "priority": "high",
                    "reason": "Formation avancée pour expert"
                })
        
        # Services selon les intérêts
        if "développement" in interests or "web" in interests:
            service = self.find_product_by_id("developpement_web")
            if service and self.matches_budget(service, budget):
                recommendations.append({
                    "type": "service",
                    "product": service,
                    "priority": "medium",
                    "reason": "Service développement web"
                })
        
        return recommendations
    
    def get_merchandising_recommendations(self) -> List[Dict[str, Any]]:
        """Recommandations merchandising"""
        recommendations = []
        
        merchandising_products = [
            "casquette_novacore",
            "tshirt_dl_ai",
            "mug_nova"
        ]
        
        for product_id in merchandising_products:
            product = self.find_product_by_id(product_id)
            if product:
                recommendations.append({
                    "type": "merchandising",
                    "product": product,
                    "priority": "low",
                    "reason": "Produit merchandising DL Solutions"
                })
        
        return recommendations
    
    def find_product_by_id(self, product_id: str) -> Optional[Dict[str, Any]]:
        """Recherche d'un produit par ID"""
        for category in self.products_database.values():
            for product in category:
                if product["id"] == product_id:
                    return product
        return None
    
    def matches_budget(self, product: Dict[str, Any], budget: str) -> bool:
        """Vérification de compatibilité budget"""
        price_str = product.get("price", "0")
        
        # Extraction du prix numérique
        price_numeric = 0
        if "FCFA" in price_str:
            price_numeric = float(price_str.replace(" FCFA", "").replace(",", ""))
        elif "jour" in price_str:
            price_numeric = float(price_str.replace(" FCFA/jour", "").replace(",", "")) * 5  # Estimation 5 jours
        
        # Classification budget
        if budget == "low" and price_numeric <= 100000:
            return True
        elif budget == "medium" and price_numeric <= 500000:
            return True
        elif budget == "high":
            return True
        
        return False
    
    def calculate_confidence_score(self, user_profile: Dict[str, Any], recommendations: List[Dict[str, Any]]) -> float:
        """Calcul du score de confiance"""
        score = 0.5  # Score de base
        
        # Facteurs positifs
        if len(user_profile.get("interests", [])) > 0:
            score += 0.2
        if user_profile.get("company_size"):
            score += 0.1
        if user_profile.get("level"):
            score += 0.1
        if len(recommendations) > 0:
            score += 0.1
        
        return min(score, 1.0)
    
    def generate_reasoning(self, user_profile: Dict[str, Any], recommendations: List[Dict[str, Any]]) -> List[str]:
        """Génération du raisonnement"""
        reasoning = []
        
        # Raisonnement basé sur le profil
        if user_profile.get("company_size") in ["startup", "sme", "large"]:
            reasoning.append("Profil entreprise détecté - Recommandations orientées services et consulting")
        
        if user_profile.get("level") == "beginner":
            reasoning.append("Niveau débutant - Formation de base recommandée")
        elif user_profile.get("level") == "advanced":
            reasoning.append("Niveau avancé - Services spécialisés recommandés")
        
        if user_profile.get("budget") == "high":
            reasoning.append("Budget élevé - Gamme complète de services disponible")
        
        # Raisonnement basé sur les recommandations
        service_count = len([r for r in recommendations if r["type"] == "service"])
        formation_count = len([r for r in recommendations if r["type"] == "formation"])
        
        if service_count > 0:
            reasoning.append(f"{service_count} service(s) recommandé(s) pour répondre aux besoins")
        if formation_count > 0:
            reasoning.append(f"{formation_count} formation(s) recommandée(s) pour le développement des compétences")
        
        return reasoning
    
    def get_cross_sell_recommendations(self, current_product: str) -> List[Dict[str, Any]]:
        """Recommandations cross-selling"""
        print(f"🔄 [NOVA IA] Cross-selling pour: {current_product}")
        
        cross_sell_map = {
            "formation_ia_basic": ["formation_ia_advanced", "consulting_ia"],
            "formation_ia_advanced": ["consulting_ia", "developpement_web"],
            "formation_cybersecurity": ["audit_securite", "consulting_ia"],
            "consulting_ia": ["developpement_web", "audit_securite"],
            "developpement_web": ["consulting_ia", "audit_securite"],
            "audit_securite": ["formation_cybersecurity", "consulting_ia"]
        }
        
        recommendations = []
        related_products = cross_sell_map.get(current_product, [])
        
        for product_id in related_products:
            product = self.find_product_by_id(product_id)
            if product:
                recommendations.append({
                    "type": "cross_sell",
                    "product": product,
                    "reason": f"Complémentaire à {current_product}"
                })
        
        return recommendations
    
    def get_promotional_offers(self, user_profile: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Offres promotionnelles personnalisées"""
        print(f"🎁 [NOVA IA] Génération offres promotionnelles")
        
        offers = []
        
        # Offres selon le profil
        if user_profile.get("company_size") in ["startup", "sme"]:
            offers.append({
                "type": "discount",
                "product": "consulting_ia",
                "discount": "20%",
                "reason": "Offre spéciale startup/SME",
                "valid_until": "30 jours"
            })
        
        if user_profile.get("level") == "beginner":
            offers.append({
                "type": "bundle",
                "products": ["formation_ia_basic", "casquette_novacore"],
                "discount": "15%",
                "reason": "Pack débutant IA",
                "valid_until": "15 jours"
            })
        
        # Offre générale
        offers.append({
            "type": "first_time",
            "discount": "10%",
            "reason": "Première commande",
            "valid_until": "7 jours"
        })
        
        return offers
    
    def get_trending_products(self) -> List[Dict[str, Any]]:
        """Produits tendance"""
        print(f"🔥 [NOVA IA] Produits tendance")
        
        trending = [
            {
                "product": self.find_product_by_id("formation_ia_basic"),
                "trend": "+45%",
                "reason": "Demande croissante en IA"
            },
            {
                "product": self.find_product_by_id("audit_securite"),
                "trend": "+30%",
                "reason": "Cybersécurité prioritaire"
            },
            {
                "product": self.find_product_by_id("tshirt_dl_ai"),
                "trend": "+25%",
                "reason": "Merchandising populaire"
            }
        ]
        
        return trending

# Fonction d'export pour Nova IA Commercial
def get_product_recommendations(user_profile: Dict[str, Any]) -> Dict[str, Any]:
    """Fonction principale pour Nova IA Commercial"""
    recommender = ProductRecommender()
    return recommender.get_recommendations(user_profile)

def get_cross_sell_suggestions(current_product: str) -> List[Dict[str, Any]]:
    """Suggestions cross-selling"""
    recommender = ProductRecommender()
    return recommender.get_cross_sell_recommendations(current_product)

if __name__ == "__main__":
    # Test du module
    recommender = ProductRecommender()
    
    # Test recommandations
    user_profile = {
        "name": "Jean Dupont",
        "company_size": "sme",
        "budget": "medium",
        "interests": ["IA", "formation"],
        "level": "intermediate"
    }
    
    recommendations = recommender.get_recommendations(user_profile)
    print(json.dumps(recommendations, indent=2)) 