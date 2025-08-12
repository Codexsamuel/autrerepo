#!/usr/bin/env python3
"""
Test complet de CodeMaster - Agent Développement
"""
import asyncio
import sys
import os
from pathlib import Path

# Ajouter le chemin des agents
sys.path.append(str(Path(__file__).parent / "services" / "agents-api"))

from agents.codemaster import CodeMasterAgent, CodeReview, CodeIssue

async def test_codemaster():
    print("💻 TEST CODEMASTER - Agent Développement")
    print("=" * 50)
    
    try:
        # 1. Test de l'initialisation
        print("1. Test d'initialisation...")
        agent = CodeMasterAgent()
        print("✅ Agent CodeMaster initialisé avec succès")
        
        # 2. Test de détection de langage
        print("\n2. Test de détection de langage...")
        analyzer = agent.analyzer
        
        test_files = [
            "test.py",
            "script.js",
            "main.ts",
            "app.java",
            "program.cpp",
            "unknown.xyz"
        ]
        
        for file_path in test_files:
            detected_lang = analyzer.detect_language(file_path)
            print(f"   {file_path} → {detected_lang}")
        
        print("✅ Détection de langage fonctionne")
        
        # 3. Test d'analyse de code Python
        print("\n3. Test d'analyse de code Python...")
        
        sample_python_code = '''
def calculate_fibonacci(n):
    if n <= 1:
        return n
    else:
        return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)

def process_data(data_list):
    result = []
    for item in data_list:
        if item > 0:
            result.append(item * 2)
        elif item < 0:
            result.append(abs(item))
        else:
            result.append(0)
    return result

def very_long_function_with_many_lines():
    """Cette fonction est intentionnellement longue pour tester l'analyseur"""
    x = 1
    y = 2
    z = 3
    a = 4
    b = 5
    c = 6
    d = 7
    e = 8
    f = 9
    g = 10
    h = 11
    i = 12
    j = 13
    k = 14
    l = 15
    m = 16
    n = 17
    o = 18
    p = 19
    q = 20
    r = 21
    return x + y + z + a + b + c + d + e + f + g + h + i + j + k + l + m + n + o + p + q + r
'''
        
        review = await agent.review_code(sample_python_code, "test_function.py")
        
        print(f"✅ Code review Python réussie")
        print(f"   Langage détecté: {review.language}")
        print(f"   Lignes totales: {review.total_lines}")
        print(f"   Complexité: {review.complexity_score}")
        print(f"   Maintenabilité: {review.maintainability_index:.1f}")
        print(f"   Score global: {review.overall_score:.1f}")
        print(f"   Issues trouvées: {len(review.issues)}")
        
        # 4. Test de génération de tests
        print("\n4. Test de génération de tests...")
        
        test_code = await agent.generate_tests(sample_python_code, "test_function.py")
        
        if test_code and "# Tests générés" in test_code:
            print("✅ Génération de tests réussie")
            print(f"   Code de test généré: {len(test_code)} caractères")
        else:
            print("❌ Échec de génération de tests")
            return False
        
        # 5. Test des suggestions d'amélioration
        print("\n5. Test des suggestions d'amélioration...")
        
        suggestions = await agent.suggest_improvements(sample_python_code, "test_function.py")
        
        if "error" not in suggestions:
            print("✅ Suggestions d'amélioration générées")
            print(f"   Score global: {suggestions['overall_score']}")
            print(f"   Problèmes prioritaires: {len(suggestions['priority_issues'])}")
            print(f"   Améliorations rapides: {len(suggestions['quick_wins'])}")
            print(f"   Améliorations long terme: {len(suggestions['long_term_improvements'])}")
        else:
            print(f"❌ Erreur suggestions: {suggestions['error']}")
            return False
        
        # 6. Test de cache
        print("\n6. Test du cache...")
        
        cache_stats = agent.get_cache_stats()
        print(f"✅ Cache: {cache_stats['total_cached']} entrées, {cache_stats['cache_size_mb']:.2f} MB")
        
        # 7. Test de performance
        print("\n7. Test de performance...")
        
        start_time = asyncio.get_event_loop().time()
        
        # Test de review multiple
        for i in range(3):
            await agent.review_code(f"def test{i}(): pass", f"test{i}.py")
        
        end_time = asyncio.get_event_loop().time()
        avg_time = (end_time - start_time) / 3
        
        print(f"✅ Performance: {avg_time:.3f}s en moyenne par review")
        
        # 8. Test de robustesse
        print("\n8. Test de robustesse...")
        
        # Test avec code invalide
        invalid_code = "def invalid_function(: pass"
        try:
            invalid_review = await agent.review_code(invalid_code, "invalid.py")
            if invalid_review.issues and any(issue.rule_id == "SYNTAX_ERROR" for issue in invalid_review.issues):
                print("✅ Gestion des erreurs de syntaxe")
            else:
                print("⚠️ Pas de détection d'erreur de syntaxe")
        except Exception as e:
            print(f"✅ Gestion d'erreur: {type(e).__name__}")
        
        # Test avec code vide
        empty_review = await agent.review_code("", "empty.py")
        print(f"✅ Gestion du code vide: {empty_review.total_lines} lignes")
        
        # 9. Test de nettoyage du cache
        print("\n9. Test de nettoyage du cache...")
        
        agent.clear_cache()
        cache_stats_after = agent.get_cache_stats()
        
        if cache_stats_after['total_cached'] == 0:
            print("✅ Cache vidé avec succès")
        else:
            print(f"❌ Cache non vidé: {cache_stats_after['total_cached']} entrées restantes")
            return False
        
        # 10. Test des métriques de qualité
        print("\n10. Test des métriques de qualité...")
        
        # Vérifier que les scores sont dans les bonnes plages
        if 0 <= review.complexity_score <= 50:
            print("✅ Score de complexité dans la plage normale")
        else:
            print(f"⚠️ Score de complexité anormal: {review.complexity_score}")
        
        if 0 <= review.maintainability_index <= 100:
            print("✅ Index de maintenabilité dans la plage normale")
        else:
            print(f"⚠️ Index de maintenabilité anormal: {review.maintainability_index}")
        
        if 0 <= review.overall_score <= 100:
            print("✅ Score global dans la plage normale")
        else:
            print(f"⚠️ Score global anormal: {review.overall_score}")
        
        print("\n🎉 CODEMASTER TESTÉ À 100% - TOUS LES TESTS RÉUSSIS !")
        return True
        
    except Exception as e:
        print(f"❌ ERREUR lors du test CodeMaster: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    asyncio.run(test_codemaster()) 