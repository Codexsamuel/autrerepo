#!/usr/bin/env python3
"""
Test de Performance - Comparaison Original vs Optimisé
"""
import asyncio
import time
import sys
from pathlib import Path

# Ajouter le chemin des agents
sys.path.append(str(Path(__file__).parent / "services" / "agents-api"))

async def test_performance_comparison():
    print("🚀 TEST DE PERFORMANCE NOVAIA - ORIGINAL vs OPTIMISÉ")
    print("=" * 60)
    
    # Test 1: Import des modules
    print("\n📦 TEST 1: Import des modules")
    print("-" * 40)
    
    # Test import original
    start_time = time.time()
    try:
        from agents.novagpt import NovaGPTAgent
        from battle.elo_system import ELOSystem
        original_import_time = (time.time() - start_time) * 1000
        print(f"✅ Import original: {original_import_time:.1f}ms")
    except Exception as e:
        print(f"❌ Import original échoué: {e}")
        original_import_time = float('inf')
    
    # Test import optimisé
    start_time = time.time()
    try:
        from agents.novagpt_optimized import NovaGPTAgentOptimized
        from battle.elo_system_optimized import ELOSystemOptimized
        optimized_import_time = (time.time() - start_time) * 1000
        print(f"✅ Import optimisé: {optimized_import_time:.1f}ms")
    except Exception as e:
        print(f"❌ Import optimisé échoué: {e}")
        optimized_import_time = float('inf')
    
    # Test 2: Création d'instances
    print("\n🏗️ TEST 2: Création d'instances")
    print("-" * 40)
    
    # Test création originale
    start_time = time.time()
    try:
        original_agent = NovaGPTAgent()
        original_creation_time = (time.time() - start_time) * 1000
        print(f"✅ Création originale: {original_creation_time:.1f}ms")
    except Exception as e:
        print(f"❌ Création originale échouée: {e}")
        original_creation_time = float('inf')
    
    # Test création optimisée
    start_time = time.time()
    try:
        optimized_agent = NovaGPTAgentOptimized()
        optimized_creation_time = (time.time() - start_time) * 1000
        print(f"✅ Création optimisée: {optimized_creation_time:.1f}ms")
    except Exception as e:
        print(f"❌ Création optimisée échouée: {e}")
        optimized_creation_time = float('inf')
    
    # Test 3: Performance RAG
    print("\n🔍 TEST 3: Performance RAG")
    print("-" * 40)
    
    # Test RAG original
    start_time = time.time()
    try:
        for i in range(10):
            await original_agent.rag.search(f"test query {i}")
        original_rag_time = (time.time() - start_time) * 1000
        print(f"✅ RAG original (10 requêtes): {original_rag_time:.1f}ms")
    except Exception as e:
        print(f"❌ RAG original échoué: {e}")
        original_rag_time = float('inf')
    
    # Test RAG optimisé
    start_time = time.time()
    try:
        for i in range(10):
            await optimized_agent.rag.search(f"test query {i}")
        optimized_rag_time = (time.time() - start_time) * 1000
        print(f"✅ RAG optimisé (10 requêtes): {optimized_rag_time:.1f}ms")
    except Exception as e:
        print(f"❌ RAG optimisé échoué: {e}")
        optimized_rag_time = float('inf')
    
    # Test 4: Performance ELO
    print("\n⚔️ TEST 4: Performance ELO")
    print("-" * 40)
    
    # Test ELO original
    start_time = time.time()
    try:
        original_elo = ELOSystem()
        for i in range(10):
            agent_id = f"test_agent_{i}"
            original_elo.register_agent(agent_id, f"Agent {i}", "test")
        original_elo_time = (time.time() - start_time) * 1000
        print(f"✅ ELO original (10 agents): {original_elo_time:.1f}ms")
    except Exception as e:
        print(f"❌ ELO original échoué: {e}")
        original_elo_time = float('inf')
    
    # Test ELO optimisé
    start_time = time.time()
    try:
        optimized_elo = ELOSystemOptimized()
        for i in range(10):
            agent_id = f"test_agent_{i}"
            optimized_elo.register_agent(agent_id, f"Agent {i}", "test")
        optimized_elo_time = (time.time() - start_time) * 1000
        print(f"✅ ELO optimisé (10 agents): {optimized_elo_time:.1f}ms")
    except Exception as e:
        print(f"❌ ELO optimisé échoué: {e}")
        optimized_elo_time = float('inf')
    
    # Test 5: Performance des outils
    print("\n🛠️ TEST 5: Performance des outils")
    print("-" * 40)
    
    # Test outils originaux
    start_time = time.time()
    try:
        for i in range(10):
            await original_agent.tools["math"].calculate(f"{i} + {i}")
        original_tools_time = (time.time() - start_time) * 1000
        print(f"✅ Outils originaux (10 calculs): {original_tools_time:.1f}ms")
    except Exception as e:
        print(f"❌ Outils originaux échoués: {e}")
        original_tools_time = float('inf')
    
    # Test outils optimisés
    start_time = time.time()
    try:
        for i in range(10):
            await optimized_agent.tools["math"].calculate(f"{i} + {i}")
        optimized_tools_time = (time.time() - start_time) * 1000
        print(f"✅ Outils optimisés (10 calculs): {optimized_tools_time:.1f}ms")
    except Exception as e:
        print(f"❌ Outils optimisés échoués: {e}")
        optimized_tools_time = float('inf')
    
    # Résumé des performances
    print("\n" + "=" * 60)
    print("📊 RÉSUMÉ DES PERFORMANCES")
    print("=" * 60)
    
    tests = [
        ("Import des modules", original_import_time, optimized_import_time),
        ("Création d'instances", original_creation_time, optimized_creation_time),
        ("Performance RAG", original_rag_time, optimized_rag_time),
        ("Performance ELO", original_elo_time, optimized_elo_time),
        ("Performance des outils", original_tools_time, optimized_tools_time)
    ]
    
    total_original = 0
    total_optimized = 0
    improvements = []
    
    for test_name, original, optimized in tests:
        if original != float('inf') and optimized != float('inf'):
            improvement = ((original - optimized) / original) * 100
            improvements.append(improvement)
            total_original += original
            total_optimized += optimized
            
            status = "🚀" if improvement > 0 else "⚠️"
            print(f"{status} {test_name}: {original:.1f}ms → {optimized:.1f}ms ({improvement:+.1f}%)")
        else:
            print(f"❌ {test_name}: Test non concluant")
    
    if improvements:
        avg_improvement = sum(improvements) / len(improvements)
        total_improvement = ((total_original - total_optimized) / total_original) * 100
        
        print(f"\n🎯 AMÉLIORATION MOYENNE: {avg_improvement:+.1f}%")
        print(f"🚀 AMÉLIORATION TOTALE: {total_improvement:+.1f}%")
        print(f"⏱️ Temps total original: {total_original:.1f}ms")
        print(f"⚡ Temps total optimisé: {total_optimized:.1f}ms")
        print(f"💨 Gain de temps: {total_original - total_optimized:.1f}ms")
        
        if total_improvement > 20:
            print("\n🎉 NOVAIA OPTIMISÉ - PERFORMANCE EXCELLENTE !")
        elif total_improvement > 10:
            print("\n✅ NOVAIA OPTIMISÉ - BONNE AMÉLIORATION !")
        else:
            print("\n⚠️ NOVAIA - AMÉLIORATION MODESTE")
    else:
        print("\n❌ Aucun test de performance concluant")

if __name__ == "__main__":
    asyncio.run(test_performance_comparison()) 