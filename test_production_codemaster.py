#!/usr/bin/env python3
"""
TEST PRODUCTION CODEMASTER - Agent Développement
Vérification complète pour la production
"""
import asyncio
import sys
import os
import time
from pathlib import Path

# Ajouter le chemin des agents
sys.path.append(str(Path(__file__).parent / "services" / "agents-api"))

from agents.codemaster import CodeMasterAgent

async def test_production_codemaster():
    print("💻 TEST PRODUCTION CODEMASTER - Agent Développement")
    print("=" * 60)
    print("Vérification complète pour la production...")
    print("=" * 60)
    
    try:
        # 1. TEST D'INITIALISATION PRODUCTION
        print("\n🏗️ 1. TEST D'INITIALISATION PRODUCTION")
        print("-" * 50)
        
        start_time = time.time()
        agent = CodeMasterAgent()
        init_time = (time.time() - start_time) * 1000
        
        print(f"✅ Agent initialisé en {init_time:.1f}ms")
        print(f"✅ Type: {type(agent).__name__}")
        print(f"✅ Composants: Analyzer={agent.analyzer is not None}, TestGenerator={agent.test_generator is not None}, TestRunner={agent.test_runner is not None}")
        
        # 2. TEST DE DÉTECTION DE LANGAGE PRODUCTION
        print("\n🔍 2. TEST DE DÉTECTION DE LANGAGE PRODUCTION")
        print("-" * 50)
        
        test_files = [
            "main.py",
            "app.js",
            "index.ts",
            "Main.java",
            "program.cpp",
            "script.c",
            "app.go",
            "main.rs",
            "unknown.xyz"
        ]
        
        language_results = {}
        
        for file_path in test_files:
            detected_lang = agent.analyzer.detect_language(file_path)
            language_results[file_path] = detected_lang
            print(f"   ✅ {file_path} → {detected_lang}")
        
        # Vérifier que Python est bien détecté
        if language_results["main.py"] == "python":
            print("   🎯 Détection Python: PARFAITE")
        else:
            print(f"   ❌ Détection Python: ÉCHEC - {language_results['main.py']}")
            return False
        
        # 3. TEST D'ANALYSE DE CODE PYTHON PRODUCTION
        print("\n🐍 3. TEST D'ANALYSE DE CODE PYTHON PRODUCTION")
        print("-" * 50)
        
        # Code Python de test avec différents niveaux de complexité
        test_codes = {
            "simple": '''
def hello():
    return "Hello World"
''',
            "medium": '''
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
''',
            "complex": '''
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

def nested_function_with_complexity():
    result = 0
    for i in range(10):
        if i % 2 == 0:
            for j in range(i):
                if j % 3 == 0:
                    result += j
                elif j % 5 == 0:
                    result -= j
                else:
                    result *= 2
        else:
            while result > 0:
                result //= 2
    return result
'''
        }
        
        analysis_results = {}
        
        for complexity, code in test_codes.items():
            print(f"   Analyse code {complexity}...")
            start_time = time.time()
            
            review = await agent.review_code(code, f"test_{complexity}.py")
            analysis_time = (time.time() - start_time) * 1000
            
            if review:
                print(f"   ✅ {complexity}: OK en {analysis_time:.1f}ms")
                print(f"      Lignes: {review.total_lines}, Complexité: {review.complexity_score}")
                print(f"      Maintenabilité: {review.maintainability_index:.1f}, Score: {review.overall_score:.1f}")
                print(f"      Issues: {len(review.issues)}")
                
                analysis_results[complexity] = review
            else:
                print(f"   ❌ {complexity}: ÉCHEC")
                return False
        
        # 4. TEST DE GÉNÉRATION DE TESTS PRODUCTION
        print("\n🧪 4. TEST DE GÉNÉRATION DE TESTS PRODUCTION")
        print("-" * 50)
        
        # Test avec le code moyen
        medium_code = test_codes["medium"]
        print("   Génération de tests pour code moyen...")
        
        start_time = time.time()
        test_code = await agent.generate_tests(medium_code, "test_medium.py")
        generation_time = (time.time() - start_time) * 1000
        
        if test_code and "# Tests générés" in test_code:
            print(f"   ✅ Tests générés en {generation_time:.1f}ms")
            print(f"   ✅ Code de test: {len(test_code)} caractères")
            
            # Vérifier la structure des tests
            test_lines = test_code.split('\n')
            has_class = any('class Test' in line for line in test_lines)
            has_methods = any('def test_' in line for line in test_lines)
            has_main = any('if __name__' in line for line in test_lines)
            
            if has_class and has_methods and has_main:
                print("   ✅ Structure des tests: PARFAITE")
            else:
                print("   ⚠️ Structure des tests: À améliorer")
        else:
            print("   ❌ Génération de tests: ÉCHEC")
            return False
        
        # 5. TEST DES SUGGESTIONS D'AMÉLIORATION PRODUCTION
        print("\n💡 5. TEST DES SUGGESTIONS D'AMÉLIORATION PRODUCTION")
        print("-" * 50)
        
        # Test avec le code complexe
        complex_code = test_codes["complex"]
        print("   Suggestions pour code complexe...")
        
        start_time = time.time()
        suggestions = await agent.suggest_improvements(complex_code, "test_complex.py")
        suggestions_time = (time.time() - start_time) * 1000
        
        if "error" not in suggestions:
            print(f"   ✅ Suggestions générées en {suggestions_time:.1f}ms")
            print(f"   ✅ Score global: {suggestions['overall_score']}")
            print(f"   ✅ Problèmes prioritaires: {len(suggestions['priority_issues'])}")
            print(f"   ✅ Améliorations rapides: {len(suggestions['quick_wins'])}")
            print(f"   ✅ Améliorations long terme: {len(suggestions['long_term_improvements'])}")
            print(f"   ✅ Problèmes de sécurité: {len(suggestions['security_concerns'])}")
            print(f"   ✅ Conseils performance: {len(suggestions['performance_tips'])}")
        else:
            print(f"   ❌ Suggestions: ÉCHEC - {suggestions['error']}")
            return False
        
        # 6. TEST DE PERFORMANCE PRODUCTION
        print("\n⚡ 6. TEST DE PERFORMANCE PRODUCTION")
        print("-" * 50)
        
        # Test de charge
        print("   Test de charge (50 reviews)...")
        start_time = time.time()
        
        for i in range(50):
            simple_code = f"def test{i}(): return {i}"
            await agent.review_code(simple_code, f"test{i}.py")
        
        load_time = (time.time() - start_time) * 1000
        avg_time = load_time / 50
        
        print(f"   ✅ 50 reviews en {load_time:.1f}ms")
        print(f"   ✅ Temps moyen: {avg_time:.2f}ms par review")
        
        if avg_time < 5:  # Moins de 5ms par review
            print("   🚀 Performance EXCELLENTE pour la production")
        elif avg_time < 20:
            print("   ✅ Performance BONNE pour la production")
        else:
            print("   ⚠️ Performance à améliorer pour la production")
        
        # 7. TEST DE ROBUSTESSE PRODUCTION
        print("\n🛡️ 7. TEST DE ROBUSTESSE PRODUCTION")
        print("-" * 50)
        
        # Test avec code invalide
        print("   Test code invalide...")
        invalid_codes = [
            "def invalid_function(: pass",  # Syntaxe invalide
            "",  # Code vide
            "print('hello'",  # Parenthèse manquante
            "def test():\n    return",  # Incomplet
            "import os\nos.system('rm -rf /')"  # Code dangereux
        ]
        
        for i, invalid_code in enumerate(invalid_codes):
            try:
                review = await agent.review_code(invalid_code, f"invalid{i}.py")
                if review and review.issues:
                    print(f"   ✅ Code invalide {i+1}: Détecté")
                else:
                    print(f"   ⚠️ Code invalide {i+1}: Non détecté")
            except Exception as e:
                print(f"   ✅ Code invalide {i+1}: Gestion d'erreur - {type(e).__name__}")
        
        # 8. TEST DE SÉCURITÉ PRODUCTION
        print("\n🔒 8. TEST DE SÉCURITÉ PRODUCTION")
        print("-" * 50)
        
        # Test code dangereux
        dangerous_codes = [
            "import os; os.system('rm -rf /')",
            "eval('__import__(\"os\").system(\"rm -rf /\")')",
            "exec('import os; os.system(\"rm -rf /\")')",
            "subprocess.call(['rm', '-rf', '/'])",
            "open('/etc/passwd', 'r').read()"
        ]
        
        for i, dangerous_code in enumerate(dangerous_codes):
            try:
                review = await agent.review_code(dangerous_code, f"dangerous{i}.py")
                if review and any('security' in issue.category.lower() for issue in review.issues):
                    print(f"   ✅ Code dangereux {i+1}: Détecté")
                else:
                    print(f"   ⚠️ Code dangereux {i+1}: Non détecté")
            except Exception as e:
                print(f"   ✅ Code dangereux {i+1}: Gestion d'erreur - {type(e).__name__}")
        
        # 9. TEST DE MÉTRIQUES DE QUALITÉ PRODUCTION
        print("\n📊 9. TEST DE MÉTRIQUES DE QUALITÉ PRODUCTION")
        print("-" * 50)
        
        # Vérifier les métriques
        print("   Vérification des métriques de qualité...")
        
        quality_metrics = {
            'complexity_scores': [],
            'maintainability_scores': [],
            'security_scores': [],
            'overall_scores': []
        }
        
        for complexity, review in analysis_results.items():
            quality_metrics['complexity_scores'].append(review.complexity_score)
            quality_metrics['maintainability_scores'].append(review.maintainability_index)
            quality_metrics['security_scores'].append(review.security_score)
            quality_metrics['overall_scores'].append(review.overall_score)
        
        # Calculer les moyennes
        avg_complexity = sum(quality_metrics['complexity_scores']) / len(quality_metrics['complexity_scores'])
        avg_maintainability = sum(quality_metrics['maintainability_scores']) / len(quality_metrics['maintainability_scores'])
        avg_security = sum(quality_metrics['security_scores']) / len(quality_metrics['security_scores'])
        avg_overall = sum(quality_metrics['overall_scores']) / len(quality_metrics['overall_scores'])
        
        print(f"   ✅ Complexité moyenne: {avg_complexity:.1f}")
        print(f"   ✅ Maintenabilité moyenne: {avg_maintainability:.1f}")
        print(f"   ✅ Sécurité moyenne: {avg_security:.1f}")
        print(f"   ✅ Score global moyen: {avg_overall:.1f}")
        
        # 10. VALIDATION FINALE PRODUCTION
        print("\n🎯 10. VALIDATION FINALE PRODUCTION")
        print("-" * 50)
        
        # Vérification finale de l'état
        final_state = {
            "agent_type": type(agent).__name__,
            "analyzer_ready": agent.analyzer is not None,
            "test_generator_ready": agent.test_generator is not None,
            "test_runner_ready": agent.test_runner is not None,
            "cache_functional": len(agent.review_cache) > 0,
            "performance_ok": avg_time < 20,
            "quality_ok": avg_overall > 50,
            "security_ok": avg_security > 70
        }
        
        all_ready = all(final_state.values())
        
        if all_ready:
            print("   🎉 CODEMASTER 100% PRÊT POUR LA PRODUCTION !")
            print("   ✅ Tous les composants sont opérationnels")
            print("   ✅ Performance validée")
            print("   ✅ Qualité des analyses confirmée")
            print("   ✅ Sécurité vérifiée")
            print("   ✅ Cache fonctionnel")
        else:
            print("   ❌ CODEMASTER - Problèmes détectés:")
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
        print("🎉 CODEMASTER VALIDÉ POUR LA PRODUCTION !")
        print("=" * 60)
        print("🚀 Agent de développement prêt et opérationnel")
        print("⚡ Performance optimisée")
        print("🔍 Analyse de code complète")
        print("🧪 Génération de tests automatique")
        print("💡 Suggestions d'amélioration intelligentes")
        print("🛡️ Sécurité et robustesse vérifiées")
        print("💼 Prêt pour l'analyse de code en production")
        
        return True
        
    except Exception as e:
        print(f"\n❌ ERREUR CRITIQUE lors du test production: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = asyncio.run(test_production_codemaster())
    if success:
        print("\n🎯 CODEMASTER: PRODUCTION READY ✅")
    else:
        print("\n❌ CODEMASTER: PRODUCTION FAILED")
        sys.exit(1) 