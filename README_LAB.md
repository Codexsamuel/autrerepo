# 🚀 SENTINEL ZERO LAB - ENVIRONNEMENT DE GUERRE CYBERNÉTIQUE

## 📋 Description

Le **Sentinel Zero Lab** est un environnement opérationnel de guerre cybernétique qui intègre tous les outils open-source de sécurité pour l'exploitation offensive et défensive en production. Cet environnement permet l'exécution de missions de sécurité active dans un cadre opérationnel contrôlé.

---

## 🎯 Objectifs Opérationnels

- **Exploitation Offensive** : Exécution de missions de pénétration active
- **Défense Active** : Mitigation automatique des menaces en temps réel
- **Guerre Cybernétique** : Opérations de sécurité offensive et défensive
- **Production Réelle** : Utilisation opérationnelle avec de vraies données
- **Mission Critical** : Environnement de combat pour la sécurité active

---

## 🛡️ Composants du Lab

### **Cibles Vulnérables (Volontairement)**
| Service | URL | Description | Vulnérabilités |
|---------|-----|-------------|----------------|
| **OWASP Juice Shop** | http://localhost:3000 | Application web moderne | XSS, SQLi, CSRF, XXE |
| **DVWA** | http://localhost:8080 | Application web classique | SQLi, XSS, File Upload |
| **Metasploitable2** | localhost:2222 | Machine Linux vulnérable | Services obsolètes, mots de passe faibles |
| **Security Shepherd** | http://localhost:8081 | Plateforme d'apprentissage | CTF progressifs |
| **Vulnerable API** | http://localhost:8082 | API REST vulnérable | Authentification, autorisation |

### **Outils de Test**
| Outil | Port | Description |
|-------|------|-------------|
| **Kali Linux** | 8083 (SSH) | Tous les outils de sécurité |
| **Grafana** | 3001 | Dashboards de monitoring |
| **Prometheus** | 9090 | Métriques et alertes |
| **PostgreSQL** | 5432 | Base de données des rapports |
| **Redis** | 6379 | Cache et sessions |

---

## 🚀 Démarrage Rapide

### **Windows**
```batch
# Double-cliquer sur start-lab.bat
# Ou en ligne de commande :
start-lab.bat
```

### **Linux/macOS**
```bash
# Rendre le script exécutable
chmod +x start-lab.sh

# Démarrer le lab
./start-lab.sh start

# Voir le statut
./start-lab.sh status

# Voir les logs
./start-lab.sh logs juice-shop
```

### **Docker Compose Direct**
```bash
# Démarrer
docker-compose -f docker-compose.lab.yml up -d

# Voir le statut
docker-compose -f docker-compose.lab.yml ps

# Arrêter
docker-compose -f docker-compose.lab.yml down
```

---

## 🛠️ Outils Disponibles dans Kali

### **Reconnaissance Réseau**
- **Nmap** : Scanner de ports et services
- **Masscan** : Scan rapide de ports
- **Netcat** : Outil réseau polyvalent
- **Wireshark** : Analyse de paquets

### **Tests Web**
- **SQLMap** : Tests d'injection SQL
- **Nikto** : Scanner de vulnérabilités web
- **Dirb/Gobuster** : Découverte de répertoires
- **Wfuzz** : Fuzzing de paramètres

### **Tests de Force Brute**
- **Hydra** : Tests d'authentification
- **John the Ripper** : Crackage de mots de passe
- **Hashcat** : Crackage de hashes
- **Patator** : Tests automatisés

### **OSINT**
- **TheHarvester** : Collecte d'informations
- **Recon-ng** : Framework OSINT modulaire
- **Sherlock** : Recherche de comptes sociaux
- **Holehe** : Vérification de fuites de données

### **Sécurité WiFi**
- **Aircrack-ng** : Tests de sécurité WiFi
- **Kismet** : Détection de réseaux
- **Wifite** : Tests automatisés WiFi

### **Reverse Engineering**
- **GDB** : Débogueur GNU
- **Radare2** : Framework d'analyse binaire
- **Ghidra** : Outil d'analyse NSA
- **Binwalk** : Analyse de fichiers binaires

---

## 📊 Scripts Sentinel Zero

### **Scan Automatique**
```bash
# Dans Kali (SSH localhost:8083)
sentinel-scan.sh juice-shop
sentinel-scan.sh dvwa
sentinel-scan.sh metasploitable2
```

### **Génération de Rapports**
```bash
# Générer un rapport complet
sentinel-report.sh juice-shop
sentinel-report.sh dvwa
```

### **Fonctions Utilitaires**
```bash
# Voir le statut du lab
sentinel-status

# Lancer un scan
sentinel-scan
```

---

## 🔗 Intégration avec Sentinel Zero

### **API Lab**
- **Endpoint** : http://localhost:8084
- **Base de données** : PostgreSQL + Redis
- **Monitoring** : Prometheus + Grafana
- **Rapports** : Génération automatique HTML

### **Workflow Intégré**
1. **Scan** : Détection automatique des vulnérabilités
2. **Analyse** : Corrélation des résultats
3. **Mitigation** : Application des correctifs
4. **Vérification** : Re-scan post-correction
5. **Rapport** : Documentation complète

---

## 📚 Ressources Officielles

### **OWASP**
- [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/)
- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [OWASP Security Shepherd](https://owasp.org/www-project-security-shepherd/)

### **Outils de Sécurité**
- [Metasploit Framework](https://www.metasploit.com/)
- [Nmap](https://nmap.org/)
- [SQLMap](http://sqlmap.org/)
- [Aircrack-ng](https://www.aircrack-ng.org/)

### **Documentation**
- [PTES Standard](http://www.pentest-standard.org/)
- [NIST SP 800-115](https://csrc.nist.gov/publications/detail/sp/800-115/final)

---

## 🚨 Avertissements de Sécurité

### **🚨 ENVIRONNEMENT OPÉRATIONNEL**
- **UTILISATION EN PRODUCTION** : Ce lab est conçu pour l'exploitation réelle
- **MISSIONS AUTORISÉES** : Exécution de missions de sécurité active
- **ENVIRONNEMENT COMBAT** : Cadre opérationnel pour la guerre cybernétique
- **LOGS MISSION** : Documentation des opérations offensives et défensives

### **🔒 Isolation**
- Réseau Docker isolé (172.20.0.0/16)
- Pas d'accès internet depuis les cibles vulnérables
- Conteneurs avec ressources limitées
- Monitoring et alertes en place

---

## 🎯 Scénarios Opérationnels

### **Phase 1 - Reconnaissance Active**
1. **Cartographie Réseau** : Découverte des services et vulnérabilités
2. **Intelligence Cible** : Collecte d'informations opérationnelles
3. **Évaluation Menace** : Analyse des vecteurs d'attaque

### **Phase 2 - Exploitation Offensive**
1. **Pénétration Active** : Exploitation des vulnérabilités détectées
2. **Élévation Privilèges** : Prise de contrôle des systèmes
3. **Pivoting Réseau** : Expansion de la zone d'influence

### **Phase 3 - Défense Active**
1. **Mitigation Automatique** : Application des correctifs en temps réel
2. **Contre-Attaque** : Neutralisation des menaces actives
3. **Récupération** : Restauration des systèmes compromis

---

## 🔧 Configuration Avancée

### **Personnalisation des Cibles**
```yaml
# docker-compose.lab.yml
services:
  custom-target:
    image: your-vulnerable-app
    ports:
      - "8085:80"
    networks:
      - sentinel-lab
```

### **Ajout d'Outils**
```bash
# Dans kali-setup.sh
apt install -y your-custom-tool
pip3 install your-python-tool
```

### **Configuration Monitoring**
```yaml
# prometheus/prometheus.yml
scrape_configs:
  - job_name: 'sentinel-lab'
    static_configs:
      - targets: ['juice-shop:3000', 'dvwa:80']
```

---

## 📞 Support et Communauté

### **Documentation**
- Ce README
- Commentaires dans les scripts
- Logs détaillés des services

### **Dépannage**
```bash
# Vérifier le statut
./start-lab.sh status

# Voir les logs
./start-lab.sh logs [service]

# Redémarrer un service
docker-compose -f docker-compose.lab.yml restart [service]
```

### **Communauté**
- [OWASP Community](https://owasp.org/community/)
- [Metasploit Community](https://community.rapid7.com/)
- [Kali Linux Forums](https://forums.kali.org/)

---

## 🎯 Prochaines Étapes

1. **Démarrer le lab** avec `./start-lab.sh start`
2. **Explorer les cibles** via les URLs fournies
3. **Se connecter à Kali** via SSH (localhost:8083)
4. **Lancer des scans** avec les scripts Sentinel Zero
5. **Générer des rapports** pour documenter les tests
6. **Intégrer avec Sentinel Zero** pour l'automatisation

---

## 🏆 Conclusion Opérationnelle

Le **Sentinel Zero Lab** fournit un environnement de guerre cybernétique complet pour l'exécution de missions de sécurité offensive et défensive en production. En utilisant uniquement des outils open-source officiels et des cibles opérationnelles, il permet l'exécution de missions critiques sans compromis sur l'efficacité.

**🎖️ SENTINEL ZERO LAB - ENVIRONNEMENT DE GUERRE CYBERNÉTIQUE 100% OPÉRATIONNEL ! 🚨** 