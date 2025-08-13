# 🚀 SENTINEL ZERO LAB - ENVIRONNEMENT DE TEST SÉCURISÉ

## 📋 Description

Le **Sentinel Zero Lab** est un environnement de test complet et sécurisé qui intègre tous les outils open-source de sécurité mentionnés dans la documentation officielle. Ce lab permet de pratiquer la sécurité offensive et défensive dans un environnement isolé et contrôlé.

---

## 🎯 Objectifs

- **Apprentissage** : Pratiquer la sécurité offensive et défensive
- **Formation** : Utiliser les outils officiels (OWASP, Metasploit, etc.)
- **Test** : Valider les procédures de sécurité
- **Développement** : Tester et améliorer Sentinel Zero
- **Certification** : Préparer aux certifications de sécurité

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

### **⚠️ IMPORTANT**
- **NE JAMAIS** utiliser ce lab sur des systèmes de production
- **NE JAMAIS** scanner des cibles sans autorisation
- **TOUJOURS** utiliser dans un environnement isolé
- **CONSERVER** les logs pour prouver l'usage autorisé

### **🔒 Isolation**
- Réseau Docker isolé (172.20.0.0/16)
- Pas d'accès internet depuis les cibles vulnérables
- Conteneurs avec ressources limitées
- Monitoring et alertes en place

---

## 🎓 Scénarios d'Apprentissage

### **Débutant**
1. **Reconnaissance** : Utiliser Nmap pour découvrir les services
2. **Scan Web** : Tester avec Nikto et Dirb
3. **Tests Basiques** : Essayer SQLMap sur DVWA

### **Intermédiaire**
1. **Exploitation** : Utiliser Metasploit sur Metasploitable2
2. **OSINT** : Collecter des informations avec TheHarvester
3. **Web App** : Tester Juice Shop avec des payloads avancés

### **Avancé**
1. **Custom Exploits** : Développer des modules Metasploit
2. **Reverse Engineering** : Analyser des binaires avec Ghidra
3. **Wireless** : Tester la sécurité WiFi avec Aircrack-ng

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

## 🏆 Conclusion

Le **Sentinel Zero Lab** fournit un environnement complet et sécurisé pour pratiquer la sécurité offensive et défensive. En utilisant uniquement des outils open-source officiels et des cibles volontairement vulnérables, il permet un apprentissage efficace sans risque juridique.

**🎖️ SENTINEL ZERO LAB - ENVIRONNEMENT DE TEST SÉCURISÉ 100% OPÉRATIONNEL ! 🚨** 