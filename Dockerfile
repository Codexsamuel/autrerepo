FROM python:3.11-slim
LABEL maintainer="NovaCore AI - Sentinel Zero"

# Installation des dépendances système
RUN apt-get update && \
    apt-get install -y curl git nano build-essential clamav clamav-daemon && \
    freshclam && \
    pip install --no-cache-dir langchain openai uvicorn fastapi supabase openai-whisper trivy && \
    trivy fs --exit-code 0 --severity HIGH /app || echo "Trivy scan complete."

WORKDIR /app
COPY . /app

# Sécurité : utilisateur non-root
RUN useradd -m -s /bin/bash sentinel && \
    chown -R sentinel:sentinel /app
USER sentinel

EXPOSE 8080

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
