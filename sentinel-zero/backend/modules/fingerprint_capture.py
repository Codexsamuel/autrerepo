#!/usr/bin/env python3
"""
Module de capture d'empreintes digitales
Interface utilisateur pour la capture et l'enregistrement
"""

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import io
import base64
import json
import os
from typing import Dict, List, Optional, Tuple
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class FingerprintCapture:
    """Interface de capture d'empreintes digitales"""
    
    def __init__(self, output_path: str = "captured_fingerprints/"):
        self.output_path = output_path
        self.capture_quality_threshold = 0.6
        self.min_capture_size = (200, 200)
        self.max_capture_size = (800, 800)
        
        # Créer le dossier de sortie
        os.makedirs(output_path, exist_ok=True)
    
    def create_capture_interface_html(self) -> str:
        """Génère l'interface HTML pour la capture d'empreinte"""
        html_template = """
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Capture Empreinte Digitale - Sentinel Zero</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            margin: 0;
            padding: 20px;
            color: white;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }
        
        h1 {
            text-align: center;
            color: #00ff88;
            text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
            margin-bottom: 30px;
        }
        
        .capture-section {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 15px;
            padding: 20px;
            margin: 20px 0;
        }
        
        .video-container {
            position: relative;
            width: 100%;
            max-width: 640px;
            margin: 0 auto;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }
        
        #video {
            width: 100%;
            height: auto;
            display: block;
        }
        
        .capture-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }
        
        .fingerprint-guide {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 200px;
            height: 200px;
            border: 3px solid #00ff88;
            border-radius: 50%;
            box-shadow: 0 0 20px rgba(0, 255, 136, 0.6);
        }
        
        .capture-buttons {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin: 20px 0;
        }
        
        .btn {
            padding: 12px 24px;
            border: none;
            border-radius: 25px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .btn-primary {
            background: linear-gradient(45deg, #00ff88, #00cc6a);
            color: #000;
            box-shadow: 0 4px 15px rgba(0, 255, 136, 0.4);
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 255, 136, 0.6);
        }
        
        .btn-secondary {
            background: linear-gradient(45deg, #ff6b6b, #ee5a52);
            color: white;
            box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
        }
        
        .btn-secondary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
        }
        
        .btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }
        
        .status {
            text-align: center;
            margin: 20px 0;
            padding: 15px;
            border-radius: 10px;
            font-weight: bold;
        }
        
        .status.success {
            background: rgba(0, 255, 136, 0.2);
            border: 2px solid #00ff88;
            color: #00ff88;
        }
        
        .status.error {
            background: rgba(255, 107, 107, 0.2);
            border: 2px solid #ff6b6b;
            color: #ff6b6b;
        }
        
        .status.info {
            background: rgba(0, 150, 255, 0.2);
            border: 2px solid #0096ff;
            color: #0096ff;
        }
        
        .quality-indicator {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin: 15px 0;
        }
        
        .quality-bar {
            width: 200px;
            height: 10px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 5px;
            overflow: hidden;
        }
        
        .quality-fill {
            height: 100%;
            background: linear-gradient(90deg, #ff6b6b, #ffd93d, #00ff88);
            transition: width 0.3s ease;
        }
        
        .preview-container {
            display: none;
            margin: 20px 0;
            text-align: center;
        }
        
        #preview {
            max-width: 300px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }
        
        .instructions {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            border-left: 4px solid #00ff88;
        }
        
        .instructions h3 {
            color: #00ff88;
            margin-top: 0;
        }
        
        .instructions ol {
            margin: 10px 0;
            padding-left: 20px;
        }
        
        .instructions li {
            margin: 8px 0;
            line-height: 1.6;
        }
        
        .loading {
            display: none;
            text-align: center;
            margin: 20px 0;
        }
        
        .spinner {
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid #00ff88;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔐 Capture Empreinte Digitale</h1>
        <p style="text-align: center; margin-bottom: 30px;">
            Système d'authentification biométrique avancée - Sentinel Zero
        </p>
        
        <div class="instructions">
            <h3>📋 Instructions de capture</h3>
            <ol>
                <li>Placez votre doigt au centre du cercle vert</li>
                <li>Assurez-vous que l'empreinte soit bien éclairée et nette</li>
                <li>Maintenez votre doigt immobile pendant la capture</li>
                <li>Cliquez sur "Capturer" quand l'indicateur de qualité est optimal</li>
            </ol>
        </div>
        
        <div class="capture-section">
            <div class="video-container">
                <video id="video" autoplay muted playsinline></video>
                <div class="capture-overlay">
                    <div class="fingerprint-guide"></div>
                </div>
            </div>
            
            <div class="capture-buttons">
                <button id="startBtn" class="btn btn-primary">🎥 Démarrer Caméra</button>
                <button id="captureBtn" class="btn btn-secondary" disabled>📸 Capturer</button>
                <button id="stopBtn" class="btn btn-secondary" disabled>⏹️ Arrêter</button>
            </div>
            
            <div class="quality-indicator">
                <span>Qualité:</span>
                <div class="quality-bar">
                    <div class="quality-fill" id="qualityFill" style="width: 0%"></div>
                </div>
                <span id="qualityText">0%</span>
            </div>
            
            <div class="status" id="status" style="display: none;"></div>
        </div>
        
        <div class="preview-container" id="previewContainer">
            <h3>📱 Aperçu de l'empreinte</h3>
            <canvas id="preview"></canvas>
            <div class="capture-buttons" style="margin-top: 20px;">
                <button id="registerBtn" class="btn btn-primary">✅ Enregistrer</button>
                <button id="retryBtn" class="btn btn-secondary">🔄 Réessayer</button>
            </div>
        </div>
        
        <div class="loading" id="loading">
            <div class="spinner"></div>
            <p>Traitement en cours...</p>
        </div>
    </div>

    <script>
        class FingerprintCapture {
            constructor() {
                this.video = document.getElementById('video');
                this.canvas = document.createElement('canvas');
                this.ctx = this.canvas.getContext('2d');
                this.stream = null;
                this.capturedImage = null;
                this.qualityCheckInterval = null;
                
                this.initializeElements();
                this.bindEvents();
            }
            
            initializeElements() {
                this.startBtn = document.getElementById('startBtn');
                this.captureBtn = document.getElementById('captureBtn');
                this.stopBtn = document.getElementById('stopBtn');
                this.registerBtn = document.getElementById('registerBtn');
                this.retryBtn = document.getElementById('retryBtn');
                this.status = document.getElementById('status');
                this.qualityFill = document.getElementById('qualityFill');
                this.qualityText = document.getElementById('qualityText');
                this.previewContainer = document.getElementById('previewContainer');
                this.preview = document.getElementById('preview');
                this.loading = document.getElementById('loading');
            }
            
            bindEvents() {
                this.startBtn.addEventListener('click', () => this.startCamera());
                this.captureBtn.addEventListener('click', () => this.captureFingerprint());
                this.stopBtn.addEventListener('click', () => this.stopCamera());
                this.registerBtn.addEventListener('click', () => this.registerFingerprint());
                this.retryBtn.addEventListener('click', () => this.retryCapture());
            }
            
            async startCamera() {
                try {
                    this.showStatus('Initialisation de la caméra...', 'info');
                    
                    const constraints = {
                        video: {
                            width: { ideal: 640 },
                            height: { ideal: 480 },
                            facingMode: 'environment'
                        }
                    };
                    
                    this.stream = await navigator.mediaDevices.getUserMedia(constraints);
                    this.video.srcObject = this.stream;
                    
                    this.video.addEventListener('loadedmetadata', () => {
                        this.canvas.width = this.video.videoWidth;
                        this.canvas.height = this.video.videoHeight;
                        
                        this.startBtn.disabled = true;
                        this.captureBtn.disabled = false;
                        this.stopBtn.disabled = false;
                        
                        this.showStatus('Caméra active - Placez votre doigt au centre', 'success');
                        this.startQualityMonitoring();
                    });
                    
                } catch (error) {
                    this.showStatus(`Erreur caméra: ${error.message}`, 'error');
                    console.error('Erreur caméra:', error);
                }
            }
            
            startQualityMonitoring() {
                this.qualityCheckInterval = setInterval(() => {
                    this.checkImageQuality();
                }, 100);
            }
            
            checkImageQuality() {
                if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
                    this.ctx.drawImage(this.video, 0, 0);
                    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
                    const quality = this.calculateQuality(imageData);
                    
                    this.updateQualityIndicator(quality);
                }
            }
            
            calculateQuality(imageData) {
                const data = imageData.data;
                let contrast = 0;
                let brightness = 0;
                
                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    
                    brightness += (r + g + b) / 3;
                }
                
                brightness /= (data.length / 4);
                
                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    const pixelBrightness = (r + g + b) / 3;
                    
                    contrast += Math.abs(pixelBrightness - brightness);
                }
                
                contrast /= (data.length / 4);
                
                // Score de qualité composite
                const quality = Math.min(100, (contrast / 50) * 100);
                return Math.max(0, quality);
            }
            
            updateQualityIndicator(quality) {
                this.qualityFill.style.width = `${quality}%`;
                this.qualityText.textContent = `${Math.round(quality)}%`;
                
                // Activer la capture si la qualité est suffisante
                this.captureBtn.disabled = quality < 60;
            }
            
            captureFingerprint() {
                try {
                    this.ctx.drawImage(this.video, 0, 0);
                    this.capturedImage = this.canvas.toDataURL('image/jpeg', 0.9);
                    
                    // Afficher l'aperçu
                    this.preview.src = this.capturedImage;
                    this.previewContainer.style.display = 'block';
                    
                    this.showStatus('Empreinte capturée avec succès!', 'success');
                    
                } catch (error) {
                    this.showStatus(`Erreur capture: ${error.message}`, 'error');
                }
            }
            
            async registerFingerprint() {
                if (!this.capturedImage) {
                    this.showStatus('Aucune empreinte capturée', 'error');
                    return;
                }
                
                try {
                    this.loading.style.display = 'block';
                    this.registerBtn.disabled = true;
                    
                    // Simuler l'envoi au serveur
                    await this.sendToServer(this.capturedImage);
                    
                    this.showStatus('Empreinte enregistrée avec succès!', 'success');
                    
                    // Réinitialiser après 3 secondes
                    setTimeout(() => {
                        this.resetCapture();
                    }, 3000);
                    
                } catch (error) {
                    this.showStatus(`Erreur enregistrement: ${error.message}`, 'error');
                    this.registerBtn.disabled = false;
                } finally {
                    this.loading.style.display = 'none';
                }
            }
            
            async sendToServer(imageData) {
                // Simulation d'envoi au serveur
                return new Promise((resolve) => {
                    setTimeout(() => {
                        console.log('Empreinte envoyée au serveur:', imageData.substring(0, 100) + '...');
                        resolve();
                    }, 2000);
                });
            }
            
            retryCapture() {
                this.previewContainer.style.display = 'none';
                this.capturedImage = null;
                this.showStatus('Prêt pour une nouvelle capture', 'info');
            }
            
            stopCamera() {
                if (this.stream) {
                    this.stream.getTracks().forEach(track => track.stop());
                    this.stream = null;
                }
                
                if (this.qualityCheckInterval) {
                    clearInterval(this.qualityCheckInterval);
                    this.qualityCheckInterval = null;
                }
                
                this.startBtn.disabled = false;
                this.captureBtn.disabled = true;
                this.stopBtn.disabled = true;
                
                this.showStatus('Caméra arrêtée', 'info');
            }
            
            resetCapture() {
                this.previewContainer.style.display = 'none';
                this.capturedImage = null;
                this.qualityFill.style.width = '0%';
                this.qualityText.textContent = '0%';
                this.hideStatus();
            }
            
            showStatus(message, type) {
                this.status.textContent = message;
                this.status.className = `status ${type}`;
                this.status.style.display = 'block';
            }
            
            hideStatus() {
                this.status.style.display = 'none';
            }
        }
        
        // Initialiser l'application
        document.addEventListener('DOMContentLoaded', () => {
            new FingerprintCapture();
        });
    </script>
</body>
</html>
        """
        return html_template
    
    def process_captured_image(self, image_data: str, user_id: str) -> Dict[str, any]:
        """Traite une image capturée et l'optimise"""
        try:
            # Décoder l'image
            if image_data.startswith('data:image'):
                image_data = image_data.split(',')[1]
            
            image_bytes = base64.b64decode(image_data)
            image = Image.open(io.BytesIO(image_bytes))
            
            # Convertir en niveaux de gris
            if image.mode != 'L':
                image = image.convert('L')
            
            # Redimensionner si nécessaire
            if image.size[0] > self.max_capture_size[0] or image.size[1] > self.max_capture_size[1]:
                image.thumbnail(self.max_capture_size, Image.Resampling.LANCZOS)
            
            # Améliorer le contraste
            enhanced_image = self._enhance_image(image)
            
            # Sauvegarder l'image traitée
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"{user_id}_{timestamp}.jpg"
            filepath = os.path.join(self.output_path, filename)
            
            enhanced_image.save(filepath, 'JPEG', quality=95)
            
            # Convertir en base64 pour l'API
            buffer = io.BytesIO()
            enhanced_image.save(buffer, format='JPEG')
            enhanced_base64 = base64.b64encode(buffer.getvalue()).decode()
            
            return {
                'success': True,
                'filename': filename,
                'filepath': filepath,
                'enhanced_image': enhanced_base64,
                'original_size': image.size,
                'enhanced_size': enhanced_image.size,
                'timestamp': timestamp
            }
            
        except Exception as e:
            logger.error(f"❌ Erreur traitement image: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def _enhance_image(self, image: Image.Image) -> Image.Image:
        """Améliore la qualité de l'image d'empreinte"""
        try:
            # Convertir en array numpy
            img_array = np.array(image)
            
            # Normalisation
            normalized = cv2.normalize(img_array, None, 0, 255, cv2.NORM_MINMAX)
            
            # Filtrage gaussien
            blurred = cv2.GaussianBlur(normalized, (3, 3), 0)
            
            # Amélioration du contraste avec CLAHE
            clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
            enhanced = clahe.apply(blurred)
            
            # Reconversion en PIL Image
            return Image.fromarray(enhanced)
            
        except Exception as e:
            logger.error(f"❌ Erreur amélioration image: {e}")
            return image
    
    def validate_capture_quality(self, image_data: str) -> Dict[str, any]:
        """Valide la qualité d'une capture"""
        try:
            # Décoder l'image
            if image_data.startswith('data:image'):
                image_data = image_data.split(',')[1]
            
            image_bytes = base64.b64decode(image_data)
            image = Image.open(io.BytesIO(image_bytes))
            
            # Convertir en niveaux de gris
            if image.mode != 'L':
                image = image.convert('L')
            
            img_array = np.array(image)
            
            # Calcul des métriques de qualité
            contrast = np.std(img_array)
            brightness = np.mean(img_array)
            sharpness = self._calculate_sharpness(img_array)
            
            # Score de qualité composite
            quality_score = (
                min(contrast / 50.0, 1.0) * 0.4 +
                min(abs(brightness - 128) / 128.0, 1.0) * 0.3 +
                min(sharpness / 100.0, 1.0) * 0.3
            ) * 100
            
            # Recommandations
            recommendations = []
            if contrast < 30:
                recommendations.append("Contraste trop faible - améliorez l'éclairage")
            if abs(brightness - 128) < 30:
                recommendations.append("Luminosité trop uniforme - ajustez l'éclairage")
            if sharpness < 50:
                recommendations.append("Image floue - stabilisez votre doigt")
            
            return {
                'success': True,
                'quality_score': quality_score,
                'contrast': contrast,
                'brightness': brightness,
                'sharpness': sharpness,
                'is_acceptable': quality_score >= self.capture_quality_threshold * 100,
                'recommendations': recommendations
            }
            
        except Exception as e:
            logger.error(f"❌ Erreur validation qualité: {e}")
            return {
                'success': False,
                'error': str(e)
            }
    
    def _calculate_sharpness(self, image: np.ndarray) -> float:
        """Calcule la netteté de l'image"""
        try {
            # Filtre de Laplacien pour détecter les bords
            laplacian = cv2.Laplacian(image, cv2.CV_64F)
            return np.var(laplacian)
        except:
            return 0.0
    
    def generate_capture_report(self, user_id: str, capture_data: Dict) -> str:
        """Génère un rapport de capture"""
        try:
            report = f"""
# Rapport de Capture d'Empreinte Digitale

## Informations Utilisateur
- **ID Utilisateur:** {user_id}
- **Date/Heure:** {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}

## Données de Capture
- **Fichier:** {capture_data.get('filename', 'N/A')}
- **Taille Originale:** {capture_data.get('original_size', 'N/A')}
- **Taille Traitée:** {capture_data.get('enhanced_size', 'N/A')}
- **Qualité:** {capture_data.get('quality_score', 'N/A')}%

## Statut
- **Capture:** {'✅ Réussie' if capture_data.get('success') else '❌ Échouée'}
- **Traitement:** {'✅ Complété' if capture_data.get('enhanced_image') else '❌ Incomplet'}

## Recommandations
"""
            
            if 'recommendations' in capture_data and capture_data['recommendations']:
                for rec in capture_data['recommendations']:
                    report += f"- {rec}\n"
            else:
                report += "- Aucune recommandation nécessaire\n"
            
            report += f"""
---
*Généré automatiquement par Sentinel Zero - {datetime.now().isoformat()}*
"""
            
            return report
            
        except Exception as e:
            logger.error(f"❌ Erreur génération rapport: {e}")
            return f"Erreur génération rapport: {str(e)}" 