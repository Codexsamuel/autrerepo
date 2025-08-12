# Dockerfile pour application hybride Python + Next.js
FROM python:3.11-slim as python-base

# Variables d'environnement Python
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# Installation des dépendances système
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Étape Python
FROM python-base as python-deps
WORKDIR /app/backend

# Copier et installer les dépendances Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Étape Node.js
FROM node:20-alpine as node-base
WORKDIR /app/frontend

# Copier package.json et installer les dépendances
COPY package*.json ./
RUN npm ci --only=production

# Copier le code source
COPY . .

# Build de l'application Next.js
RUN npm run build

# Étape finale
FROM python-base as production
WORKDIR /app

# Copier l'environnement Python
COPY --from=python-deps /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=python-deps /usr/local/bin /usr/local/bin

# Copier l'application Next.js buildée
COPY --from=node-base /app/frontend/.next /app/frontend/.next
COPY --from=node-base /app/frontend/public /app/frontend/public
COPY --from=node-base /app/frontend/package*.json /app/frontend/

# Copier les fichiers Python
COPY *.py /app/backend/
COPY requirements.txt /app/backend/

# Créer les dossiers nécessaires
RUN mkdir -p /app/frontend /app/backend

# Exposer les ports
EXPOSE 3000 8000

# Script de démarrage
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
