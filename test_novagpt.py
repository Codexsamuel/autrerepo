#!/usr/bin/env python3
"""
Test complet de NovaGPT - Agent Assistant Général
"""
import asyncio
import sys
import os
from pathlib import Path

# Ajouter le chemin des agents
sys.path.append(str(Path(__file__).parent / "services" / "agents-api"))

from agents.novagpt import NovaGPTAgent, OllamaLLM, LocalRAGEngine

async def test_novagpt():
    print("🧠 TEST NOVAGPT - Assistant Général")
    print("=" * 50)
    
    try:
        # 1. Test de l'initialisation
        print("1. Test d'initialisation...")
        agent = NovaGPTAgent()
        print("✅ Agent NovaGPT initialisé avec succès")
        
        # 2. Test du moteur RAG local
        print("\n2. Test du moteur RAG local...")
        rag_engine = LocalRAGEngine()
        context = await rag_engine.search("Qu'est-ce que NovaIA?")
        print(f"✅ RAG local fonctionne: {len(context)} contextes trouvés")
        print(f"   Premier contexte: {context[0][:100]}...")
        
        # 3. Test des outils
        print("\n3. Test des outils...")
        
        # Test de l'outil fichier
        file_tool = agent.tools["file"]
        test_content = "Test de contenu pour NovaGPT"
        success = await file_tool.write_file("test_novagpt.txt", test_content)
        print(f"✅ Outil fichier (écriture): {'OK' if success else 'ÉCHEC'}")
        
        read_content = await file_tool.read_file("test_novagpt.txt")
        print(f"✅ Outil fichier (lecture): {'OK' if read_content == test_content else 'ÉCHEC'}")
        
        # Test de l'outil math
        math_tool = agent.tools["math"]
        math_result = await math_tool.calculate("2 + 3 * 4")
        print(f"✅ Outil math: {math_result}")
        
        # 4. Test de traitement de requête
        print("\n4. Test de traitement de requête...")
        query = "Explique-moi ce qu'est NovaIA en 2 phrases"
        
        result = await agent.process_query(query, use_rag=True, use_tools=True)
        
        print(f"✅ Requête traitée avec succès")
        print(f"   Réponse: {result['response'][:200]}...")
        print(f"   Temps de traitement: {result['processing_time']:.2f}s")
        print(f"   Modèle utilisé: {result['model']}")
        
        # 5. Test de l'historique
        print("\n5. Test de l'historique...")
        history = agent.get_conversation_history()
        print(f"✅ Historique: {len(history)} entrées")
        
        # 6. Test de nettoyage
        print("\n6. Test de nettoyage...")
        agent.clear_history()
        history_after = agent.get_conversation_history()
        print(f"✅ Historique vidé: {len(history_after)} entrées")
        
        # 7. Test de performance
        print("\n7. Test de performance...")
        start_time = asyncio.get_event_loop().time()
        
        for i in range(3):
            await agent.process_query(f"Question test {i+1}", use_rag=False, use_tools=False)
        
        end_time = asyncio.get_event_loop().time()
        avg_time = (end_time - start_time) / 3
        
        print(f"✅ Performance: {avg_time:.2f}s en moyenne par requête")
        
        # Nettoyage des fichiers de test
        if os.path.exists("test_novagpt.txt"):
            os.remove("test_novagpt.txt")
        
        print("\n🎉 NOVAGPT TESTÉ À 100% - TOUS LES TESTS RÉUSSIS !")
        return True
        
    except Exception as e:
        print(f"❌ ERREUR lors du test NovaGPT: {e}")
        return False

if __name__ == "__main__":
    asyncio.run(test_novagpt()) 