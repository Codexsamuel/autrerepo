#!/bin/bash

echo "🔧 Configuration de Kali Linux pour Sentinel Zero - Environnement de Guerre Cybernétique..."

# Mise à jour du système
apt update -y
apt upgrade -y

# Installation des outils de base
echo "📦 Installation des outils de base..."
apt install -y \
    curl \
    wget \
    git \
    vim \
    nano \
    htop \
    net-tools \
    iputils-ping \
    traceroute \
    telnet \
    openssh-server \
    sudo \
    python3 \
    python3-pip \
    python3-venv \
    nodejs \
    npm \
    golang-go \
    ruby \
    build-essential

# Installation des outils de sécurité
echo "🛡️ Installation des outils de sécurité..."

# Nmap et outils réseau
apt install -y \
    nmap \
    masscan \
    netcat \
    socat \
    wireshark \
    tcpdump \
    iperf3

# Outils web
apt install -y \
    nikto \
    dirb \
    gobuster \
    wfuzz \
    sqlmap \
    xsser \
    commix

# Outils de force brute
apt install -y \
    hydra \
    medusa \
    patator \
    crowbar

# Outils OSINT
apt install -y \
    theharvester \
    recon-ng \
    maltego \
    sherlock \
    holehe

# Outils WiFi (pour tests locaux)
apt install -y \
    aircrack-ng \
    kismet \
    wifite

# Outils de reverse engineering
apt install -y \
    gdb \
    radare2 \
    ghidra \
    binwalk \
    strings

# Outils de stéganographie
apt install -y \
    steghide \
    stegsolve \
    exiftool

# Outils de cryptographie
apt install -y \
    openssl \
    john \
    hashcat \
    fcrackzip

# Outils de fuzzing
apt install -y \
    afl++ \
    honggfuzz \
    american-fuzzy-lop

# Installation via pip
echo "🐍 Installation des outils Python..."
pip3 install \
    requests \
    beautifulsoup4 \
    lxml \
    selenium \
    paramiko \
    scapy \
    pwntools \
    ropper \
    angr \
    z3-solver \
    frida-tools \
    mitmproxy \
    sqlmap \
    wpscan \
    joomscan

# Installation via npm
echo "📦 Installation des outils Node.js..."
npm install -g \
    wappalyzer \
    retire \
    snyk \
    eslint \
    prettier

# Installation via Go
echo "🚀 Installation des outils Go..."
go install github.com/projectdiscovery/nuclei/v2/cmd/nuclei@latest
go install github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest
go install github.com/projectdiscovery/httpx/cmd/httpx@latest
go install github.com/projectdiscovery/naabu/v2/cmd/naabu@latest
go install github.com/projectdiscovery/notify/cmd/notify@latest
go install github.com/projectdiscovery/chaos-client/cmd/chaos@latest

# Installation via Ruby
echo "💎 Installation des outils Ruby..."
gem install \
    wpscan \
    joomscan \
    arachni

# Configuration SSH
echo "🔐 Configuration SSH..."
systemctl enable ssh
systemctl start ssh

# Création des dossiers de travail
echo "📁 Création des dossiers de travail..."
mkdir -p /opt/tools
mkdir -p /opt/reports
mkdir -p /opt/wordlists
mkdir -p /opt/scripts

# Téléchargement des wordlists
echo "📚 Téléchargement des wordlists..."
cd /opt/wordlists

# SecLists
if [ ! -d "SecLists" ]; then
    git clone https://github.com/danielmiessler/SecLists.git
fi

# RockYou
if [ ! -f "rockyou.txt.gz" ]; then
    wget https://github.com/brannondorsey/naive-hashcat/releases/download/data/rockyou.txt.gz
    gunzip rockyou.txt.gz
fi

# Création des liens symboliques
echo "🔗 Création des liens symboliques..."
ln -sf /opt/tools /usr/local/bin/tools
ln -sf /opt/reports /usr/local/bin/reports

# Configuration des variables d'environnement
echo "🌍 Configuration des variables d'environnement..."
cat >> /root/.bashrc << 'EOF'

# Sentinel Zero Lab Environment
export SENTINEL_LAB_HOME=/opt
export PATH=$PATH:/opt/tools:/root/go/bin
export TOOLS_DIR=/opt/tools
export REPORTS_DIR=/opt/reports
export WORDLISTS_DIR=/opt/wordlists

# Aliases utiles
alias tools='cd /opt/tools'
alias reports='cd /opt/reports'
alias wordlists='cd /opt/wordlists'
alias scan='cd /opt/scripts'
alias lab='cd /opt'

# Fonctions Sentinel Zero
sentinel-status() {
    echo "🔍 Status de l'environnement de guerre cybernétique Sentinel Zero:"
    echo "  - Tools: $TOOLS_DIR"
    echo "  - Reports: $REPORTS_DIR"
    echo "  - Wordlists: $WORDLISTS_DIR"
    echo "  - Network: 172.20.0.0/16"
}

sentinel-scan() {
    echo "🚀 Lancement d'une mission de reconnaissance Sentinel Zero..."
    echo "  - Cibles opérationnelles:"
    echo "    * Juice Shop: http://172.20.0.2:3000"
    echo "    * DVWA: http://172.20.0.3:80"
    echo "    * Metasploitable2: 172.20.0.4"
    echo "    * Security Shepherd: http://172.20.0.5:80"
    echo "    * Vulnerable API: http://172.20.0.6:3000"
}
EOF

# Création des scripts utilitaires
echo "📝 Création des scripts utilitaires..."
cat > /opt/scripts/sentinel-scan.sh << 'EOF'
#!/bin/bash

TARGET=$1
SCAN_TYPE=$2

if [ -z "$TARGET" ]; then
    echo "Usage: $0 <target> [scan_type]"
    echo "Targets: juice-shop, dvwa, metasploitable2, shepherd, api"
    echo "Scan types: quick, full, custom"
    exit 1
fi

case $TARGET in
    "juice-shop")
        IP="172.20.0.2"
        PORT="3000"
        ;;
    "dvwa")
        IP="172.20.0.3"
        PORT="80"
        ;;
    "metasploitable2")
        IP="172.20.0.4"
        PORT="22"
        ;;
    "shepherd")
        IP="172.20.0.5"
        PORT="80"
        ;;
    "api")
        IP="172.20.0.6"
        PORT="3000"
        ;;
    *)
        echo "Target inconnu: $TARGET"
        exit 1
        ;;
esac

echo "🚀 Mission de reconnaissance sur $TARGET ($IP:$PORT)..."

# Scan de base
nmap -sS -sV -O -p- $IP -oN "/opt/reports/${TARGET}_nmap_$(date +%Y%m%d_%H%M%S).txt"

# Scan web si applicable
if [ "$PORT" = "80" ] || [ "$PORT" = "3000" ]; then
    echo "🌐 Reconnaissance web de $TARGET..."
    nikto -h "http://$IP:$PORT" -o "/opt/reports/${TARGET}_nikto_$(date +%Y%m%d_%H%M%S).txt"
fi

echo "✅ Mission de reconnaissance terminée. Rapports dans /opt/reports/"
EOF

chmod +x /opt/scripts/sentinel-scan.sh

# Création du script de rapport
cat > /opt/scripts/sentinel-report.sh << 'EOF'
#!/bin/bash

TARGET=$1
DATE=$(date +%Y%m%d_%H%M%S)

if [ -z "$TARGET" ]; then
    echo "Usage: $0 <target>"
    exit 1
fi

REPORT_DIR="/opt/reports/${TARGET}_${DATE}"
mkdir -p "$REPORT_DIR"

echo "📊 Génération du rapport de mission pour $TARGET..."

# Collecte des données
echo "🔍 Collecte des données de mission..."
find /opt/reports -name "*${TARGET}*" -type f -exec cp {} "$REPORT_DIR/" \;

# Génération du rapport HTML
cat > "$REPORT_DIR/report.html" << HTML_EOF
<!DOCTYPE html>
<html>
<head>
    <title>Sentinel Zero Lab - Rapport $TARGET</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background: #1a1a1a; color: white; padding: 20px; border-radius: 5px; }
        .section { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
        .vulnerability { background: #fff3cd; border: 1px solid #ffeaa7; padding: 10px; margin: 10px 0; border-radius: 3px; }
        .critical { background: #f8d7da; border-color: #f5c6cb; }
        .high { background: #f8d7da; border-color: #f5c6cb; }
        .medium { background: #fff3cd; border-color: #ffeaa7; }
        .low { background: #d1ecf1; border-color: #bee5eb; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚨 Sentinel Zero - Rapport de Mission de Guerre Cybernétique</h1>
        <h2>Target: $TARGET</h2>
        <p>Date: $(date)</p>
        <p>Généré par: Sentinel Zero - Environnement de Guerre Cybernétique</p>
    </div>
    
    <div class="section">
        <h3>📋 Résumé Exécutif de Mission</h3>
        <p>Ce rapport présente les résultats de la mission de guerre cybernétique effectuée sur $TARGET dans l'environnement Sentinel Zero.</p>
    </div>
    
    <div class="section">
        <h3>🔍 Méthodologie de Mission</h3>
        <ul>
            <li>Reconnaissance offensive</li>
            <li>Exploitation des vulnérabilités</li>
            <li>Pénétration active</li>
            <li>Analyse des résultats de mission</li>
        </ul>
    </div>
    
    <div class="section">
        <h3>📁 Fichiers de Rapport</h3>
        <ul>
HTML_EOF

# Ajout des fichiers au rapport
for file in "$REPORT_DIR"/*.txt; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        echo "            <li><a href=\"$filename\">$filename</a></li>" >> "$REPORT_DIR/report.html"
    fi
done

cat >> "$REPORT_DIR/report.html" << 'HTML_EOF'
        </ul>
    </div>
    
    <div class="section">
        <h3>⚠️ Recommandations Opérationnelles</h3>
        <ul>
            <li>Exploiter toutes les vulnérabilités critiques et élevées détectées</li>
            <li>Implémenter des contre-mesures offensives et défensives</li>
            <li>Mettre en place un programme de missions de sécurité continues</li>
            <li>Former les équipes aux tactiques de guerre cybernétique</li>
        </ul>
    </div>
    
    <div class="footer">
        <p><em>Rapport généré automatiquement par Sentinel Zero - Environnement de Guerre Cybernétique</em></p>
    </div>
</body>
</html>
HTML_EOF

echo "📊 Rapport généré dans $REPORT_DIR/report.html"
echo "📁 Tous les fichiers dans $REPORT_DIR"
EOF

chmod +x /opt/scripts/sentinel-report.sh

# Configuration finale
echo "🎯 Configuration finale..."
echo "export PATH=\$PATH:/opt/tools:/root/go/bin" >> /root/.profile
echo "export SENTINEL_LAB_HOME=/opt" >> /root/.profile

# Message de fin
echo ""
echo "🎉 Configuration Kali Linux pour la guerre cybernétique terminée !"
echo ""
echo "🚀 Arsenal d'outils opérationnels installés:"
echo "  - Nmap, Masscan, Netcat (Reconnaissance réseau)"
echo "  - SQLMap, Nikto, Dirb (Exploitation web)"
echo "  - Hydra, John, Hashcat (Force brute)"
echo "  - TheHarvester, Recon-ng (Intelligence)"
echo "  - Aircrack-ng, Wifite (Sécurité WiFi)"
echo "  - Et bien plus..."
echo ""
echo "📁 Infrastructure opérationnelle créée:"
echo "  - /opt/tools - Arsenal personnalisé"
echo "  - /opt/reports - Rapports de mission"
echo "  - /opt/wordlists - Bases de données d'attaque"
echo "  - /opt/scripts - Scripts de mission"
echo ""
echo "🔗 Commandes de mission disponibles:"
echo "  - sentinel-scan.sh <target> - Reconnaissance d'une cible"
echo "  - sentinel-report.sh <target> - Rapport de mission"
echo ""
echo "🌐 Environnement de guerre accessible sur le réseau 172.20.0.0/16"
echo "📊 Commandement: Grafana (3001), Prometheus (9090)"
echo ""

# Redémarrage des services
systemctl restart ssh

echo "✅ Arsenal opérationnel prêt pour la mission !" 