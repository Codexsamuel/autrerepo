@echo off
REM =============================================================================
REM NOVAIA - Script de Démarrage Rapide Windows
REM =============================================================================
REM Ce script automatise l'installation et le démarrage de NovaIA sur Windows

setlocal enabledelayedexpansion

REM Couleurs pour l'affichage (Windows 10+)
if "%TERM%"=="xterm" (
    set "RED=[91m"
    set "GREEN=[92m"
    set "YELLOW=[93m"
    set "BLUE=[94m"
    set "PURPLE=[95m"
    set "CYAN=[96m"
    set "NC=[0m"
) else (
    set "RED="
    set "GREEN="
    set "YELLOW="
    set "BLUE="
    set "PURPLE="
    set "CYAN="
    set "NC="
)

REM Fonction d'affichage avec couleur
:print_status
echo %BLUE%[INFO]%NC% %~1
goto :eof

:print_success
echo %GREEN%[SUCCESS]%NC% %~1
goto :eof

:print_warning
echo %YELLOW%[WARNING]%NC% %~1
goto :eof

:print_error
echo %RED%[ERROR]%NC% %~1
goto :eof

:print_header
echo %PURPLE%================================%NC%
echo %PURPLE%  NOVAIA - Démarrage Rapide%NC%
echo %PURPLE%================================%NC%
echo.
goto :eof

REM Vérification des prérequis
:check_prerequisites
call :print_status "Vérification des prérequis..."

REM Vérifier Docker
docker --version >nul 2>&1
if errorlevel 1 (
    call :print_error "Docker n'est pas installé. Veuillez installer Docker Desktop."
    exit /b 1
)

REM Vérifier Docker Compose
docker-compose --version >nul 2>&1
if errorlevel 1 (
    docker compose version >nul 2>&1
    if errorlevel 1 (
        call :print_error "Docker Compose n'est pas installé."
        exit /b 1
    )
)

REM Vérifier Node.js
node --version >nul 2>&1
if errorlevel 1 (
    call :print_error "Node.js n'est pas installé. Veuillez installer Node.js 20+."
    exit /b 1
)

REM Vérifier pnpm
pnpm --version >nul 2>&1
if errorlevel 1 (
    call :print_warning "pnpm n'est pas installé. Installation..."
    npm install -g pnpm
)

REM Vérifier la version de Node.js
for /f "tokens=1,2 delims=." %%a in ('node --version') do set NODE_VERSION=%%a
set NODE_VERSION=!NODE_VERSION:~1!
if !NODE_VERSION! LSS 20 (
    call :print_error "Node.js 20+ est requis. Version actuelle: !NODE_VERSION!"
    exit /b 1
)

call :print_success "Tous les prérequis sont satisfaits!"
goto :eof

REM Configuration de l'environnement
:setup_environment
call :print_status "Configuration de l'environnement..."

REM Créer le fichier .env s'il n'existe pas
if not exist .env (
    if exist .env.example (
        copy .env.example .env >nul
        call :print_success "Fichier .env créé à partir de .env.example"
    ) else (
        call :print_warning "Fichier .env.example non trouvé. Création d'un .env basique..."
        (
            echo # NOVAIA - Configuration d'environnement
            echo NODE_ENV=development
            echo ENVIRONMENT=local
            echo.
            echo # Base de données
            echo POSTGRES_USER=nova
            echo POSTGRES_PASSWORD=nova
            echo POSTGRES_DB=nova
            echo POSTGRES_HOST=localhost
            echo POSTGRES_PORT=5432
            echo.
            echo # Redis
            echo REDIS_URL=redis://localhost:6379
            echo.
            echo # Ollama
            echo OLLAMA_HOST=http://localhost:11434
            echo.
            echo # APIs
            echo CONTROL_API_URL=http://localhost:4000
            echo AGENTS_API_URL=http://localhost:8000
            echo.
            echo # Sécurité
            echo JWT_SECRET=novaia-super-secret-key-change-in-production
        ) > .env
        call :print_success "Fichier .env basique créé"
    )
) else (
    call :print_status "Fichier .env existe déjà"
)

REM Créer les dossiers nécessaires
if not exist data\faiss mkdir data\faiss
if not exist logs mkdir logs
if not exist models mkdir models
call :print_success "Dossiers de données créés"
goto :eof

REM Installation des dépendances
:install_dependencies
call :print_status "Installation des dépendances..."

if exist package.json (
    pnpm install
    call :print_success "Dépendances Node.js installées"
) else (
    call :print_error "package.json non trouvé. Assurez-vous d'être dans le bon répertoire."
    exit /b 1
)
goto :eof

REM Démarrage de l'infrastructure Docker
:start_infrastructure
call :print_status "Démarrage de l'infrastructure Docker..."

REM Vérifier que Docker est en cours d'exécution
docker info >nul 2>&1
if errorlevel 1 (
    call :print_error "Docker n'est pas en cours d'exécution. Veuillez démarrer Docker Desktop."
    exit /b 1
)

REM Lancer l'infrastructure
if exist docker-compose.yml (
    docker-compose up -d postgres redis
    call :print_success "Base de données et Redis démarrés"
    
    REM Attendre que PostgreSQL soit prêt
    call :print_status "Attente de la disponibilité de PostgreSQL..."
    timeout /t 10 /nobreak >nul
    
    REM Vérifier la connexion PostgreSQL
    for /l %%i in (1,1,30) do (
        docker-compose exec -T postgres pg_isready -U nova >nul 2>&1
        if not errorlevel 1 (
            call :print_success "PostgreSQL est prêt"
            goto :postgres_ready
        )
        timeout /t 2 /nobreak >nul
    )
    call :print_error "PostgreSQL n'est pas prêt après 30 tentatives"
    exit /b 1
    
    :postgres_ready
    REM Démarrer Ollama
    docker-compose up -d ollama
    call :print_success "Ollama démarré"
    
    REM Attendre qu'Ollama soit prêt
    call :print_status "Attente de la disponibilité d'Ollama..."
    timeout /t 15 /nobreak >nul
    
    REM Vérifier Ollama
    for /l %%i in (1,1,20) do (
        curl -s http://localhost:11434/api/tags >nul 2>&1
        if not errorlevel 1 (
            call :print_success "Ollama est prêt"
            goto :ollama_ready
        )
        timeout /t 3 /nobreak >nul
    )
    call :print_warning "Ollama n'est pas prêt après 20 tentatives, mais on continue..."
    
    :ollama_ready
) else (
    call :print_error "docker-compose.yml non trouvé"
    exit /b 1
)
goto :eof

REM Téléchargement des modèles Ollama
:download_models
call :print_status "Téléchargement des modèles Ollama..."

REM Modèle LLM principal
call :print_status "Téléchargement de llama3.1:8b-instruct-q4_K_M..."
curl -s http://localhost:11434/api/pull -d "{\"name\":\"llama3.1:8b-instruct-q4_K_M\"}" >nul 2>&1
if not errorlevel 1 (
    call :print_success "Modèle LLM téléchargé"
) else (
    call :print_warning "Échec du téléchargement du modèle LLM"
)

REM Modèle d'embeddings
call :print_status "Téléchargement de nomic-embed-text..."
curl -s http://localhost:11434/api/pull -d "{\"name\":\"nomic-embed-text\"}" >nul 2>&1
if not errorlevel 1 (
    call :print_success "Modèle d'embeddings téléchargé"
) else (
    call :print_warning "Échec du téléchargement du modèle d'embeddings"
)

call :print_status "Téléchargement des modèles terminé"
goto :eof

REM Démarrage des services
:start_services
call :print_status "Démarrage des services..."

REM Démarrer les APIs
docker-compose up -d agents-api control-api
call :print_success "APIs démarrées"

REM Attendre que les APIs soient prêtes
call :print_status "Attente de la disponibilité des APIs..."
timeout /t 10 /nobreak >nul

REM Vérifier l'API des agents
for /l %%i in (1,1,15) do (
    curl -s http://localhost:8000/health >nul 2>&1
    if not errorlevel 1 (
        call :print_success "API des agents est prête"
        goto :agents_api_ready
    )
    timeout /t 2 /nobreak >nul
)
call :print_warning "API des agents n'est pas prête après 15 tentatives"

:agents_api_ready
REM Vérifier l'API de contrôle
for /l %%i in (1,1,15) do (
    curl -s http://localhost:4000/health >nul 2>&1
    if not errorlevel 1 (
        call :print_success "API de contrôle est prête"
        goto :control_api_ready
    )
    timeout /t 2 /nobreak >nul
)
call :print_warning "API de contrôle n'est pas prête après 15 tentatives"

:control_api_ready
goto :eof

REM Démarrage des applications frontend
:start_frontend
call :print_status "Démarrage des applications frontend..."

REM Démarrer les applications en arrière-plan
docker-compose up -d marketplace novacore battle-arena agent-lab
call :print_success "Applications frontend démarrées"

REM Attendre que les applications soient prêtes
call :print_status "Attente de la disponibilité des applications..."
timeout /t 15 /nobreak >nul

REM Vérifier les applications
set "APPS=3000:Marketplace 3001:NovaCore 3002:Battle Arena 3003:Agent Lab"

for %%a in (%APPS%) do (
    for /f "tokens=1,2 delims=:" %%b in ("%%a") do (
        set "PORT=%%b"
        set "NAME=%%c"
        
        for /l %%i in (1,1,10) do (
            curl -s http://localhost:!PORT! >nul 2>&1
            if not errorlevel 1 (
                call :print_success "!NAME! est prêt sur le port !PORT!"
                goto :app_ready
            )
            timeout /t 2 /nobreak >nul
        )
        call :print_warning "!NAME! n'est pas prêt sur le port !PORT!"
        :app_ready
    )
)
goto :eof

REM Affichage du statut final
:show_status
call :print_header
call :print_success "NovaIA est maintenant démarré et prêt à l'utilisation!"
echo.
echo %CYAN%📱 Applications Frontend:%NC%
echo   • Marketplace:     %GREEN%http://localhost:3000%NC%
echo   • NovaCore:        %GREEN%http://localhost:3001%NC%
echo   • Battle Arena:    %GREEN%http://localhost:3002%NC%
echo   • Agent Lab:       %GREEN%http://localhost:3003%NC%
echo.
echo %CYAN%🔌 APIs Backend:%NC%
echo   • API Agents:      %GREEN%http://localhost:8000%NC%
echo   • API Contrôle:    %GREEN%http://localhost:4000%NC%
echo   • Documentation:   %GREEN%http://localhost:4000/docs%NC%
echo.
echo %CYAN%🐳 Services:%NC%
echo   • PostgreSQL:      %GREEN%localhost:5432%NC%
echo   • Redis:           %GREEN%localhost:6379%NC%
echo   • Ollama:          %GREEN%localhost:11434%NC%
echo.
echo %CYAN%📚 Commandes utiles:%NC%
echo   • Voir les logs:   %YELLOW%pnpm docker:logs%NC%
echo   • Arrêter:         %YELLOW%pnpm docker:down%NC%
echo   • Redémarrer:      %YELLOW%pnpm docker:up%NC%
echo   • Développement:   %YELLOW%pnpm dev%NC%
echo.
echo %PURPLE%🚀 Bon développement avec NovaIA!%NC%
goto :eof

REM Fonction principale
:main
call :print_header

REM Vérifications et installation
call :check_prerequisites
if errorlevel 1 exit /b 1

call :setup_environment
call :install_dependencies

REM Démarrage de l'infrastructure
call :start_infrastructure
if errorlevel 1 exit /b 1

call :download_models
call :start_services
call :start_frontend

REM Statut final
call :show_status
goto :eof

REM Exécution du script principal
call :main
if errorlevel 1 (
    call :print_error "Une erreur est survenue. Arrêt du script."
    pause
    exit /b 1
)

pause 