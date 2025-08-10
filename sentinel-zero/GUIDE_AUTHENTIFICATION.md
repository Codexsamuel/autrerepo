# 🔐 Guide d'Authentification Sentinel Zero

## Vue d'ensemble
Sentinel Zero utilise un système d'authentification à **5 niveaux** pour garantir un accès ultra-sécurisé.

## 🎯 Niveaux d'Authentification

### Niveau 1: Code Maître
- **Valeur**: `0987612345`
- **Type**: Code numérique à 10 chiffres
- **Sécurité**: Premier niveau de vérification

### Niveau 2: ID Administrateur
- **Valeur**: `DL-SUPER-01`
- **Type**: Identifiant unique administrateur
- **Sécurité**: Vérification de l'identité

### Niveau 3: Empreinte Vocale
- **Valeur**: `b5945c46c8a2d3e1f7b9a4c6d8e2f1a3b5c7d9e4f2a6b8c1d5e7f3a9b2c4d6e8f0`
- **Type**: Hash SHA-256 de l'empreinte vocale
- **Sécurité**: Biométrie vocale

### Niveau 4: Empreinte Digitale
- **Valeur**: `a3b5d6887c2e4f1a9b6c3d8e5f2a7b4c1d9e6f3a8b5c2d7e4f1a6b3c9d5e2f8a7b4c1`
- **Type**: Hash SHA-256 de l'empreinte digitale
- **Sécurité**: Biométrie digitale

### Niveau 5: Phrase Vocale
- **Valeur**: `i am sentinel`
- **Type**: Phrase secrète
- **Sécurité**: Dernier niveau de vérification

## 👑 CODE SEIGNEUR UNIQUE - Contournement des 5 Niveaux

### 🔐 Authentification Seigneur
- **Endpoint**: `POST /api/auth/lord-code`
- **Code Seigneur**: `SENTINEL_LORD_2025_ULTRA_SECURE`
- **Hash Seigneur**: `a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567890`
- **Fonction**: Accès total immédiat sans authentification 5 niveaux
- **Privilèges**: Tous les droits d'administration

### 🚀 Utilisation du Code Seigneur
```bash
curl -X POST http://localhost:8000/api/auth/lord-code \
  -H "Content-Type: application/json" \
  -d '{
    "lord_code": "SENTINEL_LORD_2025_ULTRA_SECURE",
    "lord_code_hash": "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567890"
  }'
```

### ⚠️ ATTENTION - Code Seigneur
- **Usage**: Uniquement en cas d'urgence absolue
- **Sécurité**: Contourne TOUS les niveaux de sécurité
- **Accès**: Privilèges maximaux immédiats
- **Logs**: Toutes les utilisations sont enregistrées

## 🚀 Démarrage Rapide

### 1. Démarrer le serveur
```bash
cd sentinel-zero
./start_sentinel_improved.sh
```

### 2. Tester l'authentification régulière
```bash
python3 test_simple.py
```

### 3. Tester le code seigneur
```bash
python3 test_lord_code.py
```

### 4. Utiliser l'API régulière
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "master_code": "0987612345",
    "admin_id": "DL-SUPER-01",
    "voice_hash": "b5945c46c8a2d3e1f7b9a4c6d8e2f1a3b5c7d9e4f2a6b8c1d5e7f3a9b2c4d6e8f0",
    "fingerprint_hash": "a3b5d6887c2e4f1a9b6c3d8e5f2a7b4c1d9e6f3a8b5c2d7e4f1a6b3c9d5e2f8a7b4c1",
    "vocal_phrase": "i am sentinel"
  }'
```

## 📋 Endpoints Disponibles

### Authentification
- `POST /api/auth/login` - Connexion 5 niveaux
- `POST /api/auth/lord-code` - **Code seigneur (nouveau)**
- `POST /api/auth/red-button` - Bouton rouge (destruction)

### Surveillance
- `GET /api/health` - Vérification de santé
- `POST /api/scan/backdoor` - Scan de portes dérobées
- `GET /api/scan/backdoor/{scan_id}` - Résultats de scan

### Administration
- `POST /api/admin/grant-access` - Accorder l'accès gouvernemental
- `GET /api/admin/access-logs` - Journaux d'accès

## 🔧 Configuration

### Variables d'environnement
```bash
export SECRET_KEY="SENTINEL_SUPER_KEY_4096_RSA_DL_SOLUTIONS_2025"
export MASTER_CODE="0987612345"
export BIOMETRIC_VOICE_HASH="b5945c46c8a2d3e1f7b9a4c6d8e2f1a3b5c7d9e4f2a6b8c1d5e7f3a9b2c4d6e8f0"
export BIOMETRIC_FP_HASH="a3b5d6887c2e4f1a9b6c3d8e5f2a7b4c1d9e6f3a8b5c2d7e4f1a6b3c9d5e2f8a7b4c1"
export SUPER_ADMIN_ID="DL-SUPER-01"
export RED_BUTTON_PHRASE="i am sentinel"
export LORD_CODE="SENTINEL_LORD_2025_ULTRA_SECURE"
export LORD_CODE_HASH="a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567890"
```

### Fichier de configuration
Le fichier `config.py` contient toutes les valeurs par défaut et peut être modifié selon vos besoins.

## 🚨 Dépannage

### Erreur de connexion
1. Vérifiez que le serveur est démarré
2. Vérifiez les données d'authentification
3. Consultez les logs du serveur

### Erreur de configuration
1. Exécutez `python3 config.py` pour valider
2. Vérifiez les variables d'environnement
3. Assurez-vous que tous les modules sont installés

### Erreur de modules
1. Installez les dépendances : `pip3 install -r requirements.txt`
2. Vérifiez que tous les modules sont présents
3. Les modules manquants seront remplacés par des versions factices

## 🔒 Sécurité

- **JWT**: Tokens d'accès avec expiration
- **CORS**: Configuration sécurisée des origines
- **Logs**: Journalisation de tous les accès
- **Validation**: Vérification stricte de tous les niveaux
- **Rate Limiting**: Protection contre les attaques par force brute
- **Code Seigneur**: Accès d'urgence avec journalisation complète

## 📞 Support

Pour toute question ou problème :
1. Consultez les logs du serveur
2. Vérifiez la configuration
3. Testez avec le script de test approprié
4. Consultez la documentation technique

---

**⚠️ ATTENTION**: 
- Ce système est conçu pour un usage ultra-sécurisé
- Ne partagez jamais les clés d'authentification
- Le code seigneur donne un accès total - utilisez-le avec précaution
- Toutes les utilisations du code seigneur sont enregistrées 