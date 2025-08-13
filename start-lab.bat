@echo off
chcp 65001 >nul
title Sentinel Zero Lab - Démarrage

echo.
echo 🚀 SENTINEL ZERO LAB - ENVIRONNEMENT DE TEST SÉCURISÉ
echo ======================================================
echo.

echo 🔍 Vérification de Docker...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker n'est pas installé ou pas accessible
    echo 📥 Veuillez installer Docker Desktop depuis https://www.docker.com/products/docker-desktop/
    pause
    exit /b 1
)

echo ✅ Docker détecté
echo.

echo 🔍 Vérification de Docker Compose...
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose n'est pas accessible
    echo 🔧 Tentative avec 'docker compose' (nouvelle syntaxe)...
    docker compose version >nul 2>&1
    if %errorlevel% neq 0 (
        echo ❌ Docker Compose non disponible
        pause
        exit /b 1
    ) else (
        set COMPOSE_CMD=docker compose
    )
) else (
    set COMPOSE_CMD=docker-compose
)

echo ✅ Docker Compose disponible
echo.

echo 🚀 Démarrage du lab Sentinel Zero...
echo.

echo 📦 Téléchargement des images Docker...
%COMPOSE_CMD% -f docker-compose.lab.yml pull

echo.
echo 🔧 Démarrage des services...
%COMPOSE_CMD% -f docker-compose.lab.yml up -d

echo.
echo ⏳ Attente du démarrage des services...
timeout /t 30 /nobreak >nul

echo.
echo 🔍 Vérification du statut des services...
%COMPOSE_CMD% -f docker-compose.lab.yml ps

echo.
echo 🌐 URLs d'accès au lab:
echo   - OWASP Juice Shop: http://localhost:3000
echo   - DVWA: http://localhost:8080
echo   - Security Shepherd: http://localhost:8081
echo   - Vulnerable API: http://localhost:8082
echo   - Kali Tools (SSH): localhost:8083
echo   - Grafana: http://localhost:3001 (admin/sentinel123)
echo   - Prometheus: http://localhost:9090
echo   - Sentinel Lab API: http://localhost:8084
echo.

echo 📊 Base de données:
echo   - PostgreSQL: localhost:5432 (sentinel/sentinel123)
echo   - Redis: localhost:6379
echo.

echo 🎯 Scripts disponibles dans Kali:
echo   - sentinel-scan.sh <target> - Scan d'une cible
echo   - sentinel-report.sh <target> - Génération de rapport
echo.

echo 🔐 Connexion SSH à Kali:
echo   ssh root@localhost -p 8083
echo   (aucun mot de passe requis en mode lab)
echo.

echo 📁 Dossiers partagés:
echo   - ./tools - Outils personnalisés
echo   - ./reports - Rapports de scan
echo   - ./grafana - Configuration Grafana
echo   - ./prometheus - Configuration Prometheus
echo.

echo 🚨 IMPORTANT: Ce lab est isolé et sécurisé
echo   - Toutes les cibles sont volontairement vulnérables
echo   - Utilisez uniquement pour l'apprentissage et les tests
echo   - Ne jamais utiliser sur des systèmes de production
echo.

echo ✅ Lab Sentinel Zero démarré avec succès !
echo.
echo 🎮 Commandes utiles:
echo   - %COMPOSE_CMD% -f docker-compose.lab.yml logs -f [service]
echo   - %COMPOSE_CMD% -f docker-compose.lab.yml restart [service]
echo   - %COMPOSE_CMD% -f docker-compose.lab.yml down
echo.

echo 🔄 Pour arrêter le lab: %COMPOSE_CMD% -f docker-compose.lab.yml down
echo.

pause 