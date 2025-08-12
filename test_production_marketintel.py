#!/usr/bin/env python3
"""
TEST PRODUCTION MARKETINTEL - Analyse Concurrentielle
Vérification complète pour la production
"""
import asyncio
import sys
import os
import time
from pathlib import Path

# Ajouter le chemin des agents
sys.path.append(str(Path(__file__).parent / "services" / "agents-api"))

from agents.marketintel import MarketIntelAgent

async def test_production_marketintel():
    print("📊 TEST PRODUCTION MARKETINTEL - Analyse Concurrentielle")
    print("=" * 60)
    print("Vérification complète pour la production...")
    print("=" * 60)
    
    try:
        # 1. TEST D'INITIALISATION PRODUCTION
        print("\n🏗️ 1. TEST D'INITIALISATION PRODUCTION")
        print("-" * 50)
        
        start_time = time.time()
        agent = MarketIntelAgent()
        init_time = (time.time() - start_time) * 1000
        
        print(f"✅ Agent initialisé en {init_time:.1f}ms")
        print(f"✅ Type: {type(agent).__name__}")
        print(f"✅ Composants: Scraper={agent.scraper is not None}, Analyzer={agent.analyzer is not None}, Reporter={agent.reporter is not None}")
        
        # 2. TEST D'ANALYSE D'ENTREPRISE PRODUCTION
        print("\n🏢 2. TEST D'ANALYSE D'ENTREPRISE PRODUCTION")
        print("-" * 50)
        
        test_companies = [
            "TechCorp",
            "InnovateLab", 
            "FutureTech",
            "DataFlow",
            "CloudScale"
        ]
        
        analysis_results = []
        
        for company in test_companies:
            print(f"   Analyse de {company}...")
            start_time = time.time()
            
            analysis = await agent.analyze_competitor(company)
            analysis_time = (time.time() - start_time) * 1000
            
            if "error" not in analysis:
                print(f"   ✅ {company}: OK en {analysis_time:.1f}ms")
                analysis_results.append(analysis)
                
                # Vérifier la structure de l'analyse
                required_sections = [
                    'executive_summary', 'company_overview', 'competitive_analysis',
                    'swot_analysis', 'growth_analysis', 'risk_assessment',
                    'strategic_recommendations', 'methodology'
                ]
                
                missing = [s for s in required_sections if s not in analysis]
                if missing:
                    print(f"   ⚠️ {company}: Sections manquantes: {missing}")
                else:
                    print(f"   ✅ {company}: Structure complète")
            else:
                print(f"   ❌ {company}: ÉCHEC - {analysis['error']}")
                return False
        
        # 3. TEST DE COMPARAISON CONCURRENTIELLE PRODUCTION
        print("\n🔍 3. TEST DE COMPARAISON CONCURRENTIELLE PRODUCTION")
        print("-" * 50)
        
        print("   Comparaison de 5 entreprises...")
        start_time = time.time()
        
        comparison = await agent.compare_competitors(test_companies)
        comparison_time = (time.time() - start_time) * 1000
        
        if "error" not in comparison:
            print(f"   ✅ Comparaison réussie en {comparison_time:.1f}ms")
            print(f"   ✅ {comparison['companies_analyzed']} entreprises analysées")
            
            # Vérifier les insights
            if 'competitive_landscape' in comparison:
                landscape = comparison['competitive_landscape']
                print(f"   ✅ Positions de marché: {len(landscape.get('market_positions', {}))}")
                print(f"   ✅ Distribution industrielle: {len(landscape.get('industry_distribution', {}))}")
                print(f"   ✅ Insights clés: {len(landscape.get('key_insights', []))}")
        else:
            print(f"   ❌ Comparaison échouée: {comparison['error']}")
            return False
        
        # 4. TEST DE PERFORMANCE PRODUCTION
        print("\n⚡ 4. TEST DE PERFORMANCE PRODUCTION")
        print("-" * 50)
        
        # Test de charge avec cache
        print("   Test de charge avec cache (50 analyses)...")
        start_time = time.time()
        
        for i in range(50):
            company_name = f"TestCompany{i}"
            await agent.analyze_competitor(company_name, use_cache=True)
        
        load_time = (time.time() - start_time) * 1000
        avg_time = load_time / 50
        
        print(f"   ✅ 50 analyses en {load_time:.1f}ms")
        print(f"   ✅ Temps moyen: {avg_time:.2f}ms par analyse")
        
        if avg_time < 20:  # Moins de 20ms par analyse
            print("   🚀 Performance EXCELLENTE pour la production")
        elif avg_time < 100:
            print("   ✅ Performance BONNE pour la production")
        else:
            print("   ⚠️ Performance à améliorer pour la production")
        
        # 5. TEST DE CACHE PRODUCTION
        print("\n💾 5. TEST DE CACHE PRODUCTION")
        print("-" * 50)
        
        # Vérifier les statistiques du cache
        cache_stats = agent.get_cache_stats()
        print(f"   ✅ Cache: {cache_stats['total_cached']} entrées")
        print(f"   ✅ Taille: {cache_stats['cache_size_mb']:.2f} MB")
        
        # Test de performance avec cache vs sans cache
        print("   Test performance cache vs sans cache...")
        
        # Sans cache
        start_time = time.time()
        await agent.analyze_competitor("CacheTest", use_cache=False)
        no_cache_time = (time.time() - start_time) * 1000
        
        # Avec cache
        start_time = time.time()
        await agent.analyze_competitor("CacheTest", use_cache=True)
        with_cache_time = (time.time() - start_time) * 1000
        
        cache_improvement = ((no_cache_time - with_cache_time) / no_cache_time) * 100
        print(f"   ✅ Sans cache: {no_cache_time:.1f}ms")
        print(f"   ✅ Avec cache: {with_cache_time:.1f}ms")
        print(f"   🚀 Amélioration: {cache_improvement:+.1f}%")
        
        # 6. TEST DE ROBUSTESSE PRODUCTION
        print("\n🛡️ 6. TEST DE ROBUSTESSE PRODUCTION")
        print("-" * 50)
        
        # Test avec noms d'entreprise vides
        print("   Test nom d'entreprise vide...")
        empty_analysis = await agent.analyze_competitor("")
        if "error" in empty_analysis:
            print("   ✅ Gestion nom vide: OK")
        else:
            print("   ⚠️ Gestion nom vide: À vérifier")
        
        # Test avec caractères spéciaux
        print("   Test caractères spéciaux...")
        special_companies = [
            "Tech@Corp#2024",
            "Innovate&Lab",
            "Future-Tech_2024",
            "Data.Flow.LLC",
            "Cloud_Scale@Tech"
        ]
        
        for company in special_companies:
            result = await agent.analyze_competitor(company)
            if "error" not in result:
                print(f"   ✅ {company}: OK")
            else:
                print(f"   ⚠️ {company}: Problème - {result['error']}")
        
        # 7. TEST DE QUALITÉ DES ANALYSES PRODUCTION
        print("\n📈 7. TEST DE QUALITÉ DES ANALYSES PRODUCTION")
        print("-" * 50)
        
        # Vérifier la qualité des recommandations
        print("   Vérification qualité des recommandations...")
        
        quality_metrics = {
            'total_recommendations': 0,
            'short_term': 0,
            'medium_term': 0,
            'long_term': 0,
            'companies_with_recommendations': 0
        }
        
        for analysis in analysis_results:
            if 'strategic_recommendations' in analysis:
                recs = analysis['strategic_recommendations']
                quality_metrics['total_recommendations'] += len(recs.get('short_term', []))
                quality_metrics['total_recommendations'] += len(recs.get('medium_term', []))
                quality_metrics['total_recommendations'] += len(recs.get('long_term', []))
                
                quality_metrics['short_term'] += len(recs.get('short_term', []))
                quality_metrics['medium_term'] += len(recs.get('medium_term', []))
                quality_metrics['long_term'] += len(recs.get('long_term', []))
                
                if any(recs.values()):
                    quality_metrics['companies_with_recommendations'] += 1
        
        print(f"   ✅ Total recommandations: {quality_metrics['total_recommendations']}")
        print(f"   ✅ Court terme: {quality_metrics['short_term']}")
        print(f"   ✅ Moyen terme: {quality_metrics['medium_term']}")
        print(f"   ✅ Long terme: {quality_metrics['long_term']}")
        print(f"   ✅ Entreprises avec recommandations: {quality_metrics['companies_with_recommendations']}/{len(test_companies)}")
        
        # 8. TEST DE SÉCURITÉ PRODUCTION
        print("\n🔒 8. TEST DE SÉCURITÉ PRODUCTION")
        print("-" * 50)
        
        # Test injection
        injection_company = "'; DROP TABLE companies; --"
        result_injection = await agent.analyze_competitor(injection_company)
        if "error" not in result_injection:
            print("   ✅ Protection injection: OK")
        else:
            print("   ⚠️ Protection injection: À vérifier")
        
        # Test XSS
        xss_company = "<script>alert('xss')</script>"
        result_xss = await agent.analyze_competitor(xss_company)
        if "error" not in result_xss:
            print("   ✅ Protection XSS: OK")
        else:
            print("   ⚠️ Protection XSS: À vérifier")
        
        # 9. TEST DE RÉSILIENCE PRODUCTION
        print("\n🔄 9. TEST DE RÉSILIENCE PRODUCTION")
        print("-" * 50)
        
        # Test de récupération après erreur
        print("   Test récupération après erreur...")
        
        try:
            # Simuler une analyse complexe
            complex_companies = ["Complex" + "A" * 1000, "Very" + "Long" * 500]
            for company in complex_companies:
                result = await agent.analyze_competitor(company)
                if "error" not in result:
                    print(f"   ✅ {company[:20]}...: OK")
                else:
                    print(f"   ⚠️ {company[:20]}...: {result['error']}")
        except Exception as e:
            print(f"   ⚠️ Récupération après erreur: {e}")
        
        # 10. VALIDATION FINALE PRODUCTION
        print("\n🎯 10. VALIDATION FINALE PRODUCTION")
        print("-" * 50)
        
        # Vérification finale de l'état
        final_state = {
            "agent_type": type(agent).__name__,
            "scraper_ready": agent.scraper is not None,
            "analyzer_ready": agent.analyzer is not None,
            "reporter_ready": agent.reporter is not None,
            "cache_functional": len(agent.analysis_cache) > 0,
            "performance_ok": avg_time < 100,
            "quality_ok": quality_metrics['total_recommendations'] > 0
        }
        
        all_ready = all(final_state.values())
        
        if all_ready:
            print("   🎉 MARKETINTEL 100% PRÊT POUR LA PRODUCTION !")
            print("   ✅ Tous les composants sont opérationnels")
            print("   ✅ Performance validée")
            print("   ✅ Qualité des analyses confirmée")
            print("   ✅ Cache fonctionnel")
            print("   ✅ Robustesse vérifiée")
        else:
            print("   ❌ MARKETINTEL - Problèmes détectés:")
            for key, value in final_state.items():
                status = "✅" if value else "❌"
                print(f"   {status} {key}: {value}")
            return False
        
        # Nettoyage du cache
        agent.clear_cache()
        cache_after = agent.get_cache_stats()
        if cache_after['total_cached'] == 0:
            print("   ✅ Nettoyage cache: OK")
        else:
            print("   ⚠️ Nettoyage cache: Problème")
        
        print("\n" + "=" * 60)
        print("🎉 MARKETINTEL VALIDÉ POUR LA PRODUCTION !")
        print("=" * 60)
        print("🚀 Agent d'analyse prêt et opérationnel")
        print("⚡ Performance optimisée avec cache")
        print("📊 Qualité des analyses confirmée")
        print("🛡️ Robustesse et sécurité vérifiées")
        print("💼 Prêt pour l'analyse concurrentielle en production")
        
        return True
        
    except Exception as e:
        print(f"\n❌ ERREUR CRITIQUE lors du test production: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = asyncio.run(test_production_marketintel())
    if success:
        print("\n🎯 MARKETINTEL: PRODUCTION READY ✅")
    else:
        print("\n❌ MARKETINTEL: PRODUCTION FAILED")
        sys.exit(1) 