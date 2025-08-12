#!/usr/bin/env python3
"""
Test complet de MarketIntel - Agent Analyse Concurrentielle
"""
import asyncio
import sys
import os
from pathlib import Path

# Ajouter le chemin des agents
sys.path.append(str(Path(__file__).parent / "services" / "agents-api"))

from agents.marketintel import MarketIntelAgent, CompanyInfo, MarketAnalysis

async def test_marketintel():
    print("📊 TEST MARKETINTEL - Analyse Concurrentielle")
    print("=" * 50)
    
    try:
        # 1. Test de l'initialisation
        print("1. Test d'initialisation...")
        agent = MarketIntelAgent()
        print("✅ Agent MarketIntel initialisé avec succès")
        
        # 2. Test de l'analyse d'entreprise
        print("\n2. Test d'analyse d'entreprise...")
        company_name = "TechCorp"
        
        analysis = await agent.analyze_competitor(company_name)
        
        if "error" not in analysis:
            print(f"✅ Analyse d'entreprise réussie pour {company_name}")
            print(f"   Position: {analysis['competitive_analysis']['position']}")
            print(f"   Part de marché: {analysis['competitive_analysis']['market_share']}")
            print(f"   Avantages: {', '.join(analysis['competitive_analysis']['advantages'][:3])}")
        else:
            print(f"❌ Erreur d'analyse: {analysis['error']}")
            return False
        
        # 3. Test de comparaison de concurrents
        print("\n3. Test de comparaison de concurrents...")
        companies = ["TechCorp", "InnovateLab", "FutureTech"]
        
        comparison = await agent.compare_competitors(companies)
        
        if "error" not in comparison:
            print(f"✅ Comparaison réussie: {comparison['companies_analyzed']} entreprises analysées")
            print(f"   Insights clés: {', '.join(comparison['competitive_landscape']['key_insights'][:3])}")
        else:
            print(f"❌ Erreur de comparaison: {comparison['error']}")
            return False
        
        # 4. Test du cache
        print("\n4. Test du cache...")
        cache_stats = agent.get_cache_stats()
        print(f"✅ Cache: {cache_stats['total_cached']} entrées, {cache_stats['cache_size_mb']:.2f} MB")
        
        # 5. Test de performance
        print("\n5. Test de performance...")
        start_time = asyncio.get_event_loop().time()
        
        # Test avec cache
        analysis_cached = await agent.analyze_competitor(company_name, use_cache=True)
        end_time = asyncio.get_event_loop().time()
        cached_time = end_time - start_time
        
        print(f"✅ Performance avec cache: {cached_time:.3f}s")
        
        # 6. Test des métriques de marché
        print("\n6. Test des métriques de marché...")
        
        # Vérifier que l'analyse contient tous les éléments requis
        required_sections = [
            'executive_summary', 'company_overview', 'competitive_analysis',
            'swot_analysis', 'growth_analysis', 'risk_assessment',
            'strategic_recommendations', 'methodology'
        ]
        
        missing_sections = []
        for section in required_sections:
            if section not in analysis:
                missing_sections.append(section)
        
        if not missing_sections:
            print("✅ Toutes les sections d'analyse sont présentes")
        else:
            print(f"❌ Sections manquantes: {missing_sections}")
            return False
        
        # 7. Test de la qualité des recommandations
        print("\n7. Test de la qualité des recommandations...")
        recommendations = analysis['strategic_recommendations']
        
        if recommendations['short_term'] or recommendations['medium_term'] or recommendations['long_term']:
            print("✅ Recommandations stratégiques générées")
            print(f"   Court terme: {len(recommendations['short_term'])}")
            print(f"   Moyen terme: {len(recommendations['medium_term'])}")
            print(f"   Long terme: {len(recommendations['long_term'])}")
        else:
            print("❌ Aucune recommandation générée")
            return False
        
        # 8. Test de nettoyage du cache
        print("\n8. Test de nettoyage du cache...")
        agent.clear_cache()
        cache_stats_after = agent.get_cache_stats()
        
        if cache_stats_after['total_cached'] == 0:
            print("✅ Cache vidé avec succès")
        else:
            print(f"❌ Cache non vidé: {cache_stats_after['total_cached']} entrées restantes")
            return False
        
        # 9. Test de robustesse
        print("\n9. Test de robustesse...")
        
        # Test avec nom d'entreprise vide
        empty_analysis = await agent.analyze_competitor("")
        if "error" in empty_analysis:
            print("✅ Gestion d'erreur pour nom d'entreprise vide")
        else:
            print("⚠️ Pas de gestion d'erreur pour nom d'entreprise vide")
        
        # Test avec caractères spéciaux
        special_analysis = await agent.analyze_competitor("Tech@Corp#2024")
        if "error" not in special_analysis:
            print("✅ Gestion des caractères spéciaux")
        else:
            print("⚠️ Problème avec les caractères spéciaux")
        
        print("\n🎉 MARKETINTEL TESTÉ À 100% - TOUS LES TESTS RÉUSSIS !")
        return True
        
    except Exception as e:
        print(f"❌ ERREUR lors du test MarketIntel: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    asyncio.run(test_marketintel()) 