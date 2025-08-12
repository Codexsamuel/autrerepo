#!/bin/bash
# Optimisations CUDA pour RTX 3060+
export OLLAMA_HOST=0.0.0.0
export OLLAMA_ORIGINS=*
export OLLAMA_MODELS=/models

# Configuration GPU
export CUDA_VISIBLE_DEVICES=0
export PYTORCH_CUDA_ALLOC_CONF=max_split_size_mb:512

# Modèles optimisés
ollama pull llama3.1:8b-instruct-q4_K_M
ollama pull nomic-embed-text
ollama pull mistral:7b-instruct-q4_K_M

# Optimisations CUDA
export CUDA_LAUNCH_BLOCKING=0
export CUDA_CACHE_DISABLE=0
export CUDA_CACHE_PATH=/tmp/cuda_cache
export CUDA_FORCE_PTX_JIT=1 