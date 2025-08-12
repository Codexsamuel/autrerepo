#!/usr/bin/env python3
"""
TEST COMPLET NOVAIA 100% - EXÉCUTION AUTOMATISÉE
"""
import asyncio
import sys
import os
import time
from pathlib import Path

# Ajouter le chemin des agents
sys.path.append(str(Path(__file__).parent / "services" / "agents-api"))

async def run_all_tests():
    print("🚀 NOVAIA - TEST COMPLET 100%")
    print("=" * 60)
    print("Exécution de tous les tests en parallèle...")
    print("=" * 60)
    
    # Liste des tests à exécuter
    test_modules = [
        ("test_novagpt.py", "🧠 NovaGPT - Assistant Général"),
        ("test_marketintel.py", "📊 MarketIntel - Analyse Concurrentielle"),
        ("test_codemaster.py", "💻 CodeMaster - Développement"),
        ("test_battle_arena.py", "⚔️ Battle Arena - Système ELO")
    ]
    
    results = {}
    start_time = time.time()
    
    # Exécuter tous les tests en parallèle
    tasks = []
    for test_file, description in test_modules:
        if os.path.exists(test_file):
            print(f"\n🔄 Lancement: {description}")
            task = asyncio.create_task(run_test_module(test_file, description))
            tasks.append(task)
        else:
            print(f"❌ Fichier de test manquant: {test_file}")
    
    # Attendre la fin de tous les tests
    if tasks:
        test_results = await asyncio.gather(*tasks, return_exceptions=True)
        
        # Analyser les résultats
        for i, (test_file, description) in enumerate(test_modules):
            if i < len(test_results):
                result = test_results[i]
                if isinstance(result, Exception):
                    results[description] = False
                    print(f"❌ {description}: ERREUR - {result}")
                else:
                    results[description] = result
                    status = "✅ RÉUSSI" if result else "❌ ÉCHEC"
                    print(f"{status} {description}")
            else:
                results[description] = False
                print(f"❌ {description}: TEST NON EXÉCUTÉ")
    
    # Résumé final
    end_time = time.time()
    total_time = end_time - start_time
    
    print("\n" + "=" * 60)
    print("📊 RÉSULTATS FINAUX NOVAIA")
    print("=" * 60)
    
    successful_tests = sum(1 for result in results.values() if result)
    total_tests = len(results)
    
    for description, result in results.items():
        status = "✅ RÉUSSI" if result else "❌ ÉCHEC"
        print(f"{status} {description}")
    
    print(f"\n📈 STATISTIQUES:")
    print(f"   Tests réussis: {successful_tests}/{total_tests}")
    print(f"   Taux de succès: {(successful_tests/total_tests)*100:.1f}%")
    print(f"   Temps total: {total_time:.2f} secondes")
    
    if successful_tests == total_tests:
        print("\n🎉 NOVAIA TESTÉ À 100% - TOUS LES TESTS RÉUSSIS !")
        print("🚀 Votre écosystème d'agents IA est prêt et opérationnel !")
        return True
    else:
        print(f"\n⚠️ {total_tests - successful_tests} test(s) ont échoué")
        print("🔧 Vérifiez les erreurs et relancez les tests")
        return False

async def run_test_module(test_file, description):
    """Exécute un module de test individuel"""
    try:
        # Importer et exécuter le module de test
        import importlib.util
        
        spec = importlib.util.spec_from_file_location("test_module", test_file)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        
        # Exécuter la fonction de test principale
        if hasattr(module, 'test_novagpt'):
            result = await module.test_novagpt()
        elif hasattr(module, 'test_marketintel'):
            result = await module.test_marketintel()
        elif hasattr(module, 'test_codemaster'):
            result = await module.test_codemaster()
        elif hasattr(module, 'test_battle_arena'):
            result = await module.test_battle_arena()
        else:
            print(f"❌ Fonction de test non trouvée dans {test_file}")
            return False
        
        return result
        
    except Exception as e:
        print(f"❌ Erreur lors de l'exécution de {description}: {e}")
        import traceback
        traceback.print_exc()
        return False

async def test_infrastructure():
    """Test de l'infrastructure de base"""
    print("\n🏗️ TEST INFRASTRUCTURE NOVAIA")
    print("=" * 40)
    
    try:
        # Test des répertoires
        required_dirs = [
            "services/agents-api/agents",
            "services/agents-api/battle",
            "datasets/battle",
            "monitoring/prometheus",
            "monitoring/grafana/dashboards",
            "configs/ollama"
        ]
        
        for dir_path in required_dirs:
            if os.path.exists(dir_path):
                print(f"✅ Répertoire: {dir_path}")
            else:
                print(f"❌ Répertoire manquant: {dir_path}")
                return False
        
        # Test des fichiers critiques
        required_files = [
            "services/agents-api/agents/novagpt.py",
            "services/agents-api/agents/marketintel.py",
            "services/agents-api/agents/codemaster.py",
            "services/agents-api/battle/elo_system.py",
            "datasets/battle/business_qa.jsonl",
            "monitoring/prometheus/prometheus.yml",
            "monitoring/grafana/dashboards/novaia-overview.json",
            "configs/ollama/cuda-optimized.sh",
            "configs/ollama/cpu-optimized.sh"
        ]
        
        for file_path in required_files:
            if os.path.exists(file_path):
                file_size = os.path.getsize(file_path)
                print(f"✅ Fichier: {file_path} ({file_size} bytes)")
            else:
                print(f"❌ Fichier manquant: {file_path}")
                return False
        
        print("✅ Infrastructure NovaIA vérifiée")
        return True
        
    except Exception as e:
        print(f"❌ Erreur infrastructure: {e}")
        return False

async def test_integration():
    """Test d'intégration des composants"""
    print("\n🔗 TEST INTÉGRATION NOVAIA")
    print("=" * 40)
    
    try:
        # Test d'import des modules
        print("1. Test d'import des modules...")
        
        try:
            from agents.novagpt import NovaGPTAgent
            print("✅ Import NovaGPT réussi")
        except Exception as e:
            print(f"❌ Import NovaGPT échoué: {e}")
            return False
        
        try:
            from agents.marketintel import MarketIntelAgent
            print("✅ Import MarketIntel réussi")
        except Exception as e:
            print(f"❌ Import MarketIntel échoué: {e}")
            return False
        
        try:
            from agents.codemaster import CodeMasterAgent
            print("✅ Import CodeMaster réussi")
        except Exception as e:
            print(f"❌ Import CodeMaster échoué: {e}")
            return False
        
        try:
            from battle.elo_system import ELOSystem
            print("✅ Import ELO System réussi")
        except Exception as e:
            print(f"❌ Import ELO System échoué: {e}")
            return False
        
        # Test de création d'instances
        print("\n2. Test de création d'instances...")
        
        try:
            novagpt = NovaGPTAgent()
            print("✅ Instance NovaGPT créée")
        except Exception as e:
            print(f"❌ Création NovaGPT échouée: {e}")
            return False
        
        try:
            marketintel = MarketIntelAgent()
            print("✅ Instance MarketIntel créée")
        except Exception as e:
            print(f"❌ Création MarketIntel échouée: {e}")
            return False
        
        try:
            codemaster = CodeMasterAgent()
            print("✅ Instance CodeMaster créée")
        except Exception as e:
            print(f"❌ Création CodeMaster échouée: {e}")
            return False
        
        try:
            elo = ELOSystem()
            print("✅ Instance ELO System créée")
        except Exception as e:
            print(f"❌ Création ELO System échouée: {e}")
            return False
        
        print("✅ Intégration NovaIA vérifiée")
        return True
        
    except Exception as e:
        print(f"❌ Erreur intégration: {e}")
        return False

async def main():
    """Fonction principale de test"""
    print("🚀 DÉMARRAGE DES TESTS NOVAIA COMPLETS")
    print("=" * 60)
    
    # Test de l'infrastructure
    infra_success = await test_infrastructure()
    if not infra_success:
        print("❌ Tests d'infrastructure échoués - arrêt")
        return False
    
    # Test d'intégration
    integration_success = await test_integration()
    if not integration_success:
        print("❌ Tests d'intégration échoués - arrêt")
        return False
    
    # Tests complets des agents
    agents_success = await run_all_tests()
    
    # Résumé final
    print("\n" + "=" * 60)
    if infra_success and integration_success and agents_success:
        print("🎉 NOVAIA 100% OPÉRATIONNEL !")
        print("🚀 Tous les composants fonctionnent parfaitement")
        print("⚡ Prêt pour la production")
        return True
    else:
        print("⚠️ NOVAIA - Tests partiellement réussis")
        print("🔧 Vérifiez les composants défaillants")
        return False

if __name__ == "__main__":
    try:
        success = asyncio.run(main())
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n⏹️ Tests interrompus par l'utilisateur")
        sys.exit(1)
    except Exception as e:
        print(f"\n💥 Erreur fatale: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1) 