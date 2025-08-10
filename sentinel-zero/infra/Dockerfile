# Sentinel Zero - Container sécurisé
FROM python:3.11-slim-bullseye

# Sécurité : utilisateur non-root
RUN groupadd -r sentinel && useradd -r -g sentinel sentinel

# Mise à jour et packages essentiels
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

# Installation des dépendances Python
COPY requirements.txt /tmp/
RUN pip install --no-cache-dir -r /tmp/requirements.txt

# Création des répertoires de travail
WORKDIR /app
RUN mkdir -p /app/logs /app/data /app/config /app/security

# Copie du code source
COPY . /app/

# Sécurité : permissions restrictives
RUN chown -R sentinel:sentinel /app \
    && chmod -R 755 /app \
    && chmod 600 /app/config/*.key 2>/dev/null || true

# Sécurité : répertoires en lecture seule
RUN chmod 555 /app/config \
    && chmod 555 /app/security

USER sentinel

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

EXPOSE 8000

CMD ["python", "main.py"] 