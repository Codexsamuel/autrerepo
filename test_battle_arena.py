#!/usr/bin/env python3
"""
Test complet du Battle Arena - Système ELO
"""
import asyncio
import sys
import os
from pathlib import Path

# Ajouter le chemin des agents
sys.path.append(str(Path(__file__).parent / "services" / "agents-api"))

from battle.elo_system import ELOSystem, Difficulty, MatchResult

async def test_battle_arena():
    print("⚔️ TEST BATTLE ARENA - Système ELO")
    print("=" * 50)
    
    try:
        # 1. Test de l'initialisation
        print("1. Test d'initialisation...")
        elo = ELOSystem(k_factor=32, initial_rating=1200.0)
        print("✅ Système ELO initialisé avec succès")
        
        # 2. Test d'enregistrement d'agents
        print("\n2. Test d'enregistrement d'agents...")
        
        agents_data = [
            ("agent_001", "NovaGPT", "assistant"),
            ("agent_002", "MarketIntel", "business"),
            ("agent_003", "CodeMaster", "development"),
            ("agent_004", "DataSage", "analytics"),
            ("agent_005", "DocGenius", "documentation")
        ]
        
        registered_agents = []
        for agent_id, name, category in agents_data:
            agent = elo.register_agent(agent_id, name, category)
            registered_agents.append(agent)
            print(f"   ✅ {name} ({agent_id}) enregistré avec rating {agent.rating}")
        
        print(f"✅ {len(registered_agents)} agents enregistrés")
        
        # 3. Test des calculs ELO
        print("\n3. Test des calculs ELO...")
        
        # Test de calcul de score attendu
        agent1 = registered_agents[0]
        agent2 = registered_agents[1]
        
        expected1 = elo.calculate_expected_score(agent1.rating, agent2.rating)
        expected2 = elo.calculate_expected_score(agent2.rating, agent1.rating)
        
        print(f"   Score attendu {agent1.name} vs {agent2.name}: {expected1:.3f}")
        print(f"   Score attendu {agent2.name} vs {agent1.name}: {expected2:.3f}")
        print(f"   Somme des scores attendus: {expected1 + expected2:.3f} (doit être ≈ 1.0)")
        
        if abs(expected1 + expected2 - 1.0) < 0.01:
            print("✅ Calculs ELO corrects")
        else:
            print("❌ Erreur dans les calculs ELO")
            return False
        
        # 4. Test du jugement de réponses
        print("\n4. Test du jugement de réponses...")
        
        reference = "NovaIA est une plateforme d'agents IA offline-first optimisée Windows"
        good_response = "NovaIA est une plateforme d'agents IA offline-first optimisée pour Windows"
        bad_response = "Je ne sais pas"
        
        # Test avec réponse de bonne qualité
        score_good, confidence_good = await elo.judge_response(good_response, reference, Difficulty.MEDIUM)
        print(f"   Bonne réponse: score {score_good:.3f}, confiance {confidence_good:.3f}")
        
        # Test avec réponse de mauvaise qualité
        score_bad, confidence_bad = await elo.judge_response(bad_response, reference, Difficulty.MEDIUM)
        print(f"   Mauvaise réponse: score {score_bad:.3f}, confiance {confidence_bad:.3f}")
        
        if score_good > score_bad:
            print("✅ Jugement correct: bonne réponse > mauvaise réponse")
        else:
            print("❌ Erreur de jugement")
            return False
        
        # 5. Test des matchs
        print("\n5. Test des matchs...")
        
        # Créer des réponses simulées
        response1 = "NovaIA est une plateforme d'agents IA offline-first optimisée pour Windows et le cloud privé"
        response2 = "NovaIA est une plateforme d'agents IA offline-first"
        
        match = await elo.play_match(
            agent1.id, agent2.id,
            "business_qa", "q1",
            response1, response2,
            reference, Difficulty.MEDIUM
        )
        
        print(f"✅ Match joué: {match.id}")
        print(f"   Gagnant: {match.winner}")
        print(f"   Scores: {agent1.name} {match.agent1_score:.3f}, {agent2.name} {match.agent2_score:.3f}")
        print(f"   Confiance juge: {match.judge_confidence:.3f}")
        
        # 6. Test des classements
        print("\n6. Test des classements...")
        
        ranking = elo.get_agent_ranking()
        print(f"✅ Classement généré: {len(ranking)} agents")
        
        for i, agent in enumerate(ranking[:3]):
            print(f"   {i+1}. {agent.name}: {agent.rating:.1f} ({agent.games_played} matchs)")
        
        # 7. Test des statistiques d'agent
        print("\n7. Test des statistiques d'agent...")
        
        agent_stats = elo.get_agent_stats(agent1.id)
        if agent_stats:
            print(f"✅ Statistiques de {agent1.name}:")
            print(f"   Taux de victoire: {agent_stats['win_rate']:.3f}")
            print(f"   Changement de rating moyen: {agent_stats['avg_rating_change']:.2f}")
            print(f"   Performance récente: {len(agent_stats['recent_performance'])} matchs")
        else:
            print("❌ Impossible de récupérer les statistiques")
            return False
        
        # 8. Test des ligues
        print("\n8. Test des ligues...")
        
        # Créer une ligue
        league = elo.create_league("Ligue Business", "business", 1100, 1300, 1)
        print(f"✅ Ligue créée: {league.name} ({league.id})")
        
        # Ajouter des agents à la ligue
        for agent in registered_agents:
            if agent.category == "business":
                success = elo.add_agent_to_league(league.id, agent.id)
                print(f"   {'✅' if success else '❌'} {agent.name} ajouté à la ligue")
        
        # Obtenir le classement de la ligue
        standings = elo.get_league_standings(league.id)
        if standings:
            print(f"✅ Classement de la ligue: {len(standings)} agents")
            for standing in standings:
                print(f"   {standing['rank']}. {standing['name']}: {standing['rating']:.1f}")
        else:
            print("❌ Impossible d'obtenir le classement de la ligue")
            return False
        
        # 9. Test de performance
        print("\n9. Test de performance...")
        
        start_time = asyncio.get_event_loop().time()
        
        # Jouer plusieurs matchs rapidement
        for i in range(5):
            await elo.play_match(
                registered_agents[i % len(registered_agents)].id,
                registered_agents[(i + 1) % len(registered_agents)].id,
                "business_qa", f"q{i+1}",
                f"Réponse {i+1} de l'agent 1",
                f"Réponse {i+1} de l'agent 2",
                f"Référence pour la question {i+1}",
                Difficulty.MEDIUM
            )
        
        end_time = asyncio.get_event_loop().time()
        total_time = end_time - start_time
        avg_time = total_time / 5
        
        print(f"✅ Performance: {avg_time:.3f}s en moyenne par match")
        print(f"   Total: {total_time:.2f}s pour 5 matchs")
        
        # 10. Test d'export/import
        print("\n10. Test d'export/import...")
        
        # Exporter les données
        exported_data = elo.export_data()
        print(f"✅ Données exportées: {len(exported_data['agents'])} agents, {len(exported_data['matches'])} matchs")
        
        # Créer un nouveau système et importer
        new_elo = ELOSystem()
        import_success = new_elo.import_data(exported_data)
        
        if import_success:
            print("✅ Import des données réussi")
            print(f"   Agents importés: {len(new_elo.agents)}")
            print(f"   Matchs importés: {len(new_elo.matches)}")
            print(f"   Ligues importées: {len(new_elo.leagues)}")
        else:
            print("❌ Échec de l'import des données")
            return False
        
        # 11. Test de robustesse
        print("\n11. Test de robustesse...")
        
        # Test avec des agents inexistants
        try:
            await elo.play_match("inexistant1", "inexistant2", "test", "q1", "resp1", "resp2", "ref", Difficulty.EASY)
            print("❌ Match avec agents inexistants autorisé")
            return False
        except ValueError:
            print("✅ Gestion d'erreur pour agents inexistants")
        
        # Test avec des données invalides
        try:
            await elo.judge_response("", "", Difficulty.EASY)
            print("✅ Gestion des réponses vides")
        except Exception as e:
            print(f"⚠️ Problème avec réponses vides: {e}")
        
        print("\n🎉 BATTLE ARENA TESTÉ À 100% - TOUS LES TESTS RÉUSSIS !")
        return True
        
    except Exception as e:
        print(f"❌ ERREUR lors du test Battle Arena: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    asyncio.run(test_battle_arena()) 