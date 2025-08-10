# 🚀 Scripts de Démarrage Rapide

Ce répertoire contient les scripts pour configurer rapidement votre environnement de développement avec l'accès rapide superadmin.

## 📁 Fichiers

### `dev_quick_start.py`
Script principal de configuration de l'environnement de développement.

**Fonctionnalités :**
- ✅ Configure l'environnement de développement
- 🔧 Charge la configuration d'accès rapide
- 📁 Crée les répertoires nécessaires
- 🐍 Vérifie l'environnement Python
- 📦 Vérifie les dépendances
- 🔐 Teste le système d'accès rapide

**Utilisation :**
```bash
# Depuis la racine du projet
python scripts/dev_quick_start.py

# Ou directement
./scripts/dev_quick_start.py
```

### `test_simple_quick_access.py`
Script de test pour vérifier le fonctionnement du système d'accès rapide.

**Fonctionnalités :**
- 🧪 Test du code secret
- 🔑 Validation du système d'accès
- 🎫 Génération et vérification de tokens
- 📊 Rapport de test

**Utilisation :**
```bash
# Après avoir configuré l'environnement
python scripts/test_simple_quick_access.py

# Ou directement
./scripts/test_simple_quick_access.py
```

## 🔑 Code Secret

Votre code secret personnel pour l'accès rapide :
```
0987612345SamuelObamSuperAdmin1234509876
```

**⚠️ Important :** Ce code vous donne un accès immédiat en tant que superadmin. Gardez-le secret et ne le partagez jamais.

## 🚀 Workflow de Démarrage

### 1. Première Configuration
```bash
# 1. Activez l'environnement virtuel (si applicable)
source venv/bin/activate

# 2. Configurez l'environnement
python scripts/dev_quick_start.py

# 3. Testez le système
python scripts/test_simple_quick_access.py
```

### 2. Sessions Suivantes
```bash
# À chaque nouvelle session de développement
python scripts/dev_quick_start.py
```

## 📋 Prérequis

- ✅ Python 3.7+
- ✅ Fichier `config/dev_quick_access.env` configuré
- ✅ Dépendances installées (PyJWT, etc.)
- ✅ Environnement virtuel activé (recommandé)

## 🛡️ Sécurité

- **Accès rapide** : Uniquement pour le développement
- **Production** : Désactivez l'accès rapide
- **Code secret** : Personnel et confidentiel
- **Authentification biométrique** : Maintien pour les autres utilisateurs

## 🔧 Dépannage

### Erreur : "Fichier de configuration manquant"
```bash
# Vérifiez que le fichier existe
ls -la config/dev_quick_access.env
```

### Erreur : "PyJWT manquant"
```bash
# Installez la dépendance
pip install PyJWT
```

### Erreur : "Environnement virtuel non détecté"
```bash
# Activez l'environnement virtuel
source venv/bin/activate
```

## 📊 Structure des Répertoires

Après exécution du script, les répertoires suivants sont créés :
```
data/
├── dev_quick_access/
│   └── captures/
logs/
```

## 🎯 Avantages

- ⚡ **Démarrage rapide** : Configuration automatique
- 🔑 **Accès immédiat** : Code secret personnel
- 🛡️ **Sécurité maintenue** : Authentification biométrique pour les autres
- 🔧 **Configuration automatique** : Variables d'environnement chargées
- 📁 **Structure prête** : Répertoires créés automatiquement

## 📞 Support

En cas de problème :
1. Vérifiez les messages d'erreur du script
2. Consultez la configuration dans `config/dev_quick_access.env`
3. Vérifiez que toutes les dépendances sont installées
4. Assurez-vous d'être dans le bon répertoire

---

**🎉 Votre environnement de développement est maintenant prêt avec l'accès rapide superadmin !** 