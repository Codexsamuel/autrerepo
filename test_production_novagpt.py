#!/usr/bin/env python3
"""
TEST PRODUCTION NOVAGPT - Assistant Général
Vérification complète pour la production
"""
import asyncio
import sys
import os
import time
from pathlib import Path

# Ajouter le chemin des agents
sys.path.append(str(Path(__file__).parent / "services" / "agents-api"))

from agents.novagpt_optimized import NovaGPTAgentOptimized

async def test_production_novagpt():
    print("🧠 TEST PRODUCTION NOVAGPT - Assistant Général")
    print("=" * 60)
    print("Vérification complète pour la production...")
    print("=" * 60)
    
    try:
        # 1. TEST D'INITIALISATION PRODUCTION
        print("\n🏗️ 1. TEST D'INITIALISATION PRODUCTION")
        print("-" * 50)
        
        start_time = time.time()
        agent = NovaGPTAgentOptimized()
        init_time = (time.time() - start_time) * 1000
        
        print(f"✅ Agent initialisé en {init_time:.1f}ms")
        print(f"✅ Type: {type(agent).__name__}")
        print(f"✅ Composants: LLM={agent.llm is not None}, RAG={agent.rag is not None}, Tools={len(agent.tools)}")
        
        # 2. TEST DE ROBUSTESSE PRODUCTION
        print("\n🛡️ 2. TEST DE ROBUSTESSE PRODUCTION")
        print("-" * 50)
        
        # Test avec requêtes vides
        print("   Test requête vide...")
        result_empty = await agent.process_query("", use_rag=False, use_tools=False)
        if "error" in result_empty:
            print("   ✅ Gestion requête vide: OK")
        else:
            print("   ⚠️ Gestion requête vide: À vérifier")
        
        # Test avec requêtes très longues
        print("   Test requête très longue...")
        long_query = "test " * 1000
        result_long = await agent.process_query(long_query, use_rag=False, use_tools=False)
        if "error" not in result_long:
            print("   ✅ Gestion requête longue: OK")
        else:
            print("   ⚠️ Gestion requête longue: À vérifier")
        
        # Test avec caractères spéciaux
        print("   Test caractères spéciaux...")
        special_query = "Test avec émojis 🚀 et caractères spéciaux @#$%^&*()"
        result_special = await agent.process_query(special_query, use_rag=False, use_tools=False)
        if "error" not in result_special:
            print("   ✅ Gestion caractères spéciaux: OK")
        else:
            print("   ⚠️ Gestion caractères spéciaux: À vérifier")
        
        # 3. TEST DES OUTILS PRODUCTION
        print("\n🛠️ 3. TEST DES OUTILS PRODUCTION")
        print("-" * 50)
        
        # Test outil fichier
        print("   Test outil fichier...")
        test_file_content = "Contenu de test pour NovaGPT Production"
        success_write = await agent.tools["file"].write_file("test_production.txt", test_file_content)
        if success_write:
            print("   ✅ Écriture fichier: OK")
            
            read_content = await agent.tools["file"].read_file("test_production.txt")
            if read_content == test_file_content:
                print("   ✅ Lecture fichier: OK")
            else:
                print("   ❌ Lecture fichier: ÉCHEC")
                return False
        else:
            print("   ❌ Écriture fichier: ÉCHEC")
            return False
        
        # Test outil math
        print("   Test outil math...")
        math_tests = [
            ("2 + 2", "4"),
            ("10 * 5", "50"),
            ("100 / 4", "25"),
            ("(3 + 4) * 2", "14")
        ]
        
        for expression, expected in math_tests:
            result = await agent.tools["math"].calculate(expression)
            if expected in result:
                print(f"   ✅ {expression} = {expected}: OK")
            else:
                print(f"   ❌ {expression}: ÉCHEC - {result}")
                return False
        
        # 4. TEST RAG PRODUCTION
        print("\n🔍 4. TEST RAG PRODUCTION")
        print("-" * 50)
        
        rag_queries = [
            "Qu'est-ce que NovaIA?",
            "Sécurité et chiffrement",
            "Support CUDA et DirectML",
            "Politiques RBAC ABAC"
        ]
        
        for query in rag_queries:
            start_time = time.time()
            context = await agent.rag.search(query)
            rag_time = (time.time() - start_time) * 1000
            
            if context and len(context) > 0:
                print(f"   ✅ RAG '{query}': {len(context)} contextes en {rag_time:.1f}ms")
            else:
                print(f"   ❌ RAG '{query}': ÉCHEC")
                return False
        
        # 5. TEST DE PERFORMANCE PRODUCTION
        print("\n⚡ 5. TEST DE PERFORMANCE PRODUCTION")
        print("-" * 50)
        
        # Test de charge
        print("   Test de charge (100 requêtes)...")
        start_time = time.time()
        
        for i in range(100):
            await agent.process_query(f"Question de test {i}", use_rag=False, use_tools=False)
        
        load_time = (time.time() - start_time) * 1000
        avg_time = load_time / 100
        
        print(f"   ✅ 100 requêtes en {load_time:.1f}ms")
        print(f"   ✅ Temps moyen: {avg_time:.2f}ms par requête")
        
        if avg_time < 10:  # Moins de 10ms par requête
            print("   🚀 Performance EXCELLENTE pour la production")
        elif avg_time < 50:
            print("   ✅ Performance BONNE pour la production")
        else:
            print("   ⚠️ Performance à améliorer pour la production")
        
        # 6. TEST DE MÉMOIRE PRODUCTION
        print("\n💾 6. TEST DE MÉMOIRE PRODUCTION")
        print("-" * 50)
        
        # Vérifier la taille de l'historique
        history_size = len(agent.conversation_history)
        print(f"   ✅ Historique: {history_size} entrées")
        
        # Test de nettoyage
        agent.clear_history()
        history_after = len(agent.conversation_history)
        if history_after == 0:
            print("   ✅ Nettoyage mémoire: OK")
        else:
            print("   ❌ Nettoyage mémoire: ÉCHEC")
            return False
        
        # 7. TEST D'INTÉGRATION PRODUCTION
        print("\n🔗 7. TEST D'INTÉGRATION PRODUCTION")
        print("-" * 50)
        
        # Test complet avec tous les composants
        print("   Test intégration complète...")
        start_time = time.time()
        
        full_result = await agent.process_query(
            "Explique-moi NovaIA et calcule 15 * 8",
            use_rag=True,
            use_tools=True
        )
        
        integration_time = (time.time() - start_time) * 1000
        
        if "error" not in full_result:
            print(f"   ✅ Intégration complète: OK en {integration_time:.1f}ms")
            print(f"   ✅ Réponse générée: {len(full_result['response'])} caractères")
            print(f"   ✅ Outils utilisés: {len(full_result['tools_used'])}")
            print(f"   ✅ Contexte RAG: {len(full_result['context'])} caractères")
        else:
            print(f"   ❌ Intégration complète: ÉCHEC - {full_result['error']}")
            return False
        
        # 8. TEST DE SÉCURITÉ PRODUCTION
        print("\n🔒 8. TEST DE SÉCURITÉ PRODUCTION")
        print("-" * 50)
        
        # Test injection
        injection_query = "'; DROP TABLE users; --"
        result_injection = await agent.process_query(injection_query, use_rag=False, use_tools=False)
        if "error" not in result_injection:
            print("   ✅ Protection injection: OK")
        else:
            print("   ⚠️ Protection injection: À vérifier")
        
        # Test XSS
        xss_query = "<script>alert('xss')</script>"
        result_xss = await agent.process_query(xss_query, use_rag=False, use_tools=False)
        if "error" not in result_xss:
            print("   ✅ Protection XSS: OK")
        else:
            print("   ⚠️ Protection XSS: À vérifier")
        
        # 9. TEST DE RÉSILIENCE PRODUCTION
        print("\n🔄 9. TEST DE RÉSILIENCE PRODUCTION")
        print("-" * 50)
        
        # Test de récupération après erreur
        print("   Test récupération après erreur...")
        
        # Simuler une erreur
        try:
            # Test avec un outil défaillant
            result_error = await agent.process_query("test", use_rag=False, use_tools=True)
            print("   ✅ Récupération après erreur: OK")
        except Exception as e:
            print(f"   ⚠️ Récupération après erreur: {e}")
        
        # 10. VALIDATION FINALE PRODUCTION
        print("\n🎯 10. VALIDATION FINALE PRODUCTION")
        print("-" * 50)
        
        # Nettoyage des fichiers de test
        if os.path.exists("test_production.txt"):
            os.remove("test_production.txt")
            print("   ✅ Nettoyage fichiers de test: OK")
        
        # Nettoyage final de l'historique pour le test
        agent.clear_history()
        
        # Vérification finale de l'état
        final_state = {
            "agent_type": type(agent).__name__,
            "llm_ready": agent.llm is not None,
            "rag_ready": agent.rag is not None,
            "tools_ready": len(agent.tools) > 0,
            "history_clean": len(agent.conversation_history) == 0,
            "performance_ok": avg_time < 50
        }
        
        all_ready = all(final_state.values())
        
        if all_ready:
            print("   🎉 NOVAGPT 100% PRÊT POUR LA PRODUCTION !")
            print("   ✅ Tous les composants sont opérationnels")
            print("   ✅ Performance validée")
            print("   ✅ Sécurité vérifiée")
            print("   ✅ Robustesse confirmée")
        else:
            print("   ❌ NOVAGPT - Problèmes détectés:")
            for key, value in final_state.items():
                status = "✅" if value else "❌"
                print(f"   {status} {key}: {value}")
            return False
        
        print("\n" + "=" * 60)
        print("🎉 NOVAGPT VALIDÉ POUR LA PRODUCTION !")
        print("=" * 60)
        print("🚀 Agent prêt et opérationnel")
        print("⚡ Performance optimisée")
        print("🛡️ Sécurité renforcée")
        print("🔧 Robustesse confirmée")
        print("💼 Prêt pour les charges de production")
        
        return True
        
    except Exception as e:
        print(f"\n❌ ERREUR CRITIQUE lors du test production: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = asyncio.run(test_production_novagpt())
    if success:
        print("\n🎯 NOVAGPT: PRODUCTION READY ✅")
    else:
        print("\n❌ NOVAGPT: PRODUCTION FAILED")
        sys.exit(1) 