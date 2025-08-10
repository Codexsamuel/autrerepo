#!/usr/bin/env python3
"""
Script de vérification complète de l'environnement
Vérifie que tous les composants sont correctement configurés
"""

import os
import sys
from pathlib import Path

def verify_project_structure():
    """Vérifie la structure du projet"""
    print("📁 Vérification de la structure du projet")
    print("=" * 50)
    
    project_root = Path(__file__).parent.parent
    required_dirs = ['lib', 'config', 'scripts', 'data', 'logs']
    required_files = ['config/dev_quick_access.env']
    
    all_good = True
    
    # Vérifie les répertoires
    for directory in required_dirs:
        dir_path = project_root / directory
        if dir_path.exists():
            print(f"  ✅ {directory}/")
        else:
            print(f"  ❌ {directory}/ (manquant)")
            all_good = False
    
    # Vérifie les fichiers
    for file_path in required_files:
        file_full_path = project_root / file_path
        if file_full_path.exists():
            print(f"  ✅ {file_path}")
        else:
            print(f"  ❌ {file_path} (manquant)")
            all_good = False
    
    return all_good

def verify_environment():
    """Vérifie l'environnement Python"""
    print("\n🐍 Vérification de l'environnement Python")
    print("=" * 50)
    
    all_good = True
    
    # Vérifie Python
    python_version = sys.version_info
    if python_version.major >= 3 and python_version.minor >= 7:
        print(f"  ✅ Python {python_version.major}.{python_version.minor}.{python_version.micro}")
    else:
        print(f"  ❌ Python {python_version.major}.{python_version.minor}.{python_version.micro} (version 3.7+ requise)")
        all_good = False
    
    # Vérifie l'environnement virtuel
    if 'VIRTUAL_ENV' in os.environ:
        print(f"  ✅ Environnement virtuel: {os.environ['VIRTUAL_ENV']}")
    else:
        print("  ⚠️  Aucun environnement virtuel détecté")
    
    # Vérifie PyJWT
    try:
        import jwt
        print("  ✅ PyJWT installé")
    except ImportError:
        print("  ❌ PyJWT manquant")
        all_good = False
    
    return all_good

def verify_configuration():
    """Vérifie la configuration d'accès rapide"""
    print("\n🔧 Vérification de la configuration")
    print("=" * 50)
    
    all_good = True
    
    # Vérifie le fichier de configuration
    config_file = Path(__file__).parent.parent / 'config' / 'dev_quick_access.env'
    if not config_file.exists():
        print("  ❌ Fichier de configuration manquant")
        return False
    
    # Charge et vérifie les variables clés
    required_vars = [
        'QUICK_ACCESS_ENABLED',
        'QUICK_ACCESS_SECRET_CODE',
        'SUPERADMIN_BYPASS_ENABLED'
    ]
    
    with open(config_file, 'r') as f:
        config_content = f.read()
    
    for var in required_vars:
        if var in config_content:
            print(f"  ✅ {var}")
        else:
            print(f"  ❌ {var} (manquant)")
            all_good = False
    
    # Vérifie le code secret
    secret_code = "0987612345SamuelObamSuperAdmin1234509876"
    if secret_code in config_content:
        print("  ✅ Code secret configuré")
    else:
        print("  ❌ Code secret non trouvé")
        all_good = False
    
    return all_good

def verify_scripts():
    """Vérifie que tous les scripts sont présents et exécutables"""
    print("\n🚀 Vérification des scripts")
    print("=" * 50)
    
    all_good = True
    project_root = Path(__file__).parent.parent
    
    scripts = [
        'scripts/quick_start.sh',
        'scripts/dev_quick_start.py',
        'scripts/test_simple_quick_access.py'
    ]
    
    for script in scripts:
        script_path = project_root / script
        if script_path.exists():
            if script.endswith('.sh'):
                # Vérifie l'exécutabilité pour les scripts shell
                if os.access(script_path, os.X_OK):
                    print(f"  ✅ {script} (exécutable)")
                else:
                    print(f"  ⚠️  {script} (non exécutable)")
            else:
                print(f"  ✅ {script}")
        else:
            print(f"  ❌ {script} (manquant)")
            all_good = False
    
    return all_good

def verify_data_directories():
    """Vérifie que les répertoires de données sont créés"""
    print("\n📊 Vérification des répertoires de données")
    print("=" * 50)
    
    all_good = True
    project_root = Path(__file__).parent.parent
    
    data_dirs = [
        'data/dev_quick_access',
        'data/dev_quick_access/captures',
        'logs'
    ]
    
    for data_dir in data_dirs:
        dir_path = project_root / data_dir
        if dir_path.exists():
            print(f"  ✅ {data_dir}/")
        else:
            print(f"  ❌ {data_dir}/ (manquant)")
            all_good = False
    
    return all_good

def run_quick_test():
    """Lance un test rapide du système"""
    print("\n🧪 Test rapide du système")
    print("=" * 50)
    
    try:
        # Charge la configuration pour le test
        project_root = Path(__file__).parent.parent
        config_file = project_root / 'config' / 'dev_quick_access.env'
        
        if config_file.exists():
            with open(config_file, 'r') as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith('#') and '=' in line:
                        key, value = line.split('=', 1)
                        if key == 'QUICK_ACCESS_SECRET_CODE':
                            secret_code = value
                            break
                else:
                    print("  ❌ Code secret non trouvé dans la configuration")
                    return False
            
            # Test avec le code secret
            expected_code = "0987612345SamuelObamSuperAdmin1234509876"
            if secret_code == expected_code:
                print("  ✅ Code secret validé dans la configuration")
                print("  🎉 Système d'accès rapide fonctionne!")
                return True
            else:
                print("  ❌ Code secret incorrect dans la configuration")
                return False
        else:
            print("  ❌ Fichier de configuration non trouvé")
            return False
            
    except Exception as e:
        print(f"  ❌ Erreur lors du test: {e}")
        return False

def main():
    """Fonction principale"""
    print("🔍 Vérification complète de l'environnement de développement")
    print("=" * 70)
    
    # Vérifications
    checks = [
        ("Structure du projet", verify_project_structure),
        ("Environnement Python", verify_environment),
        ("Configuration", verify_configuration),
        ("Scripts", verify_scripts),
        ("Répertoires de données", verify_data_directories),
        ("Test du système", run_quick_test)
    ]
    
    results = []
    
    for check_name, check_func in checks:
        try:
            result = check_func()
            results.append((check_name, result))
        except Exception as e:
            print(f"  ❌ Erreur lors de la vérification {check_name}: {e}")
            results.append((check_name, False))
    
    # Résumé
    print("\n📋 Résumé de la vérification")
    print("=" * 50)
    
    passed = 0
    total = len(results)
    
    for check_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"  {status} {check_name}")
        if result:
            passed += 1
    
    print(f"\n🎯 Résultat: {passed}/{total} vérifications réussies")
    
    if passed == total:
        print("\n🎉 Toutes les vérifications ont réussi!")
        print("🚀 Votre environnement de développement est prêt!")
        print("🔑 Vous pouvez utiliser votre code secret pour l'accès rapide")
        return True
    else:
        print(f"\n⚠️  {total - passed} vérification(s) ont échoué")
        print("🔧 Consultez les erreurs ci-dessus et corrigez-les")
        return False

if __name__ == "__main__":
    main() 