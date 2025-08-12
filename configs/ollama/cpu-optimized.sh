#!/bin/bash
# Optimisations CPU/DirectML
export OLLAMA_HOST=0.0.0.0
export OLLAMA_ORIGINS=*
export OLLAMA_MODELS=/models

# Modèles CPU optimisés
ollama pull llama3.1:8b-instruct-q4_K_M
ollama pull nomic-embed-text
ollama pull mistral:7b-instruct-q4_K_M

# Optimisations CPU
export OMP_NUM_THREADS=$(nproc)
export MKL_NUM_THREADS=$(nproc)
export OPENBLAS_NUM_THREADS=$(nproc)
export VECLIB_MAXIMUM_THREADS=$(nproc)

# Optimisations DirectML (Windows)
export DML_VISIBLE_DEVICES=0
export DML_BUFFER_POOL_SIZE=2048 