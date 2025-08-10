#!/usr/bin/env python3
"""
Module de capture et traitement des empreintes digitales
Gère l'interface de capture, la validation et l'optimisation des images
"""

import os
import json
import logging
import base64
import hashlib
from typing import Dict, List, Optional, Any
from datetime import datetime
import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

logger = logging.getLogger(__name__)

class FingerprintCapture:
    """Gestionnaire de capture et traitement des empreintes digitales"""
    
    def __init__(self, storage_path: str = "data/fingerprints/captures"):
        self.storage_path = storage_path
        self.min_image_size = (200, 200)
        self.max_image_size = (800, 800)
        self.quality_threshold = 0.6
        
        # Créer le répertoire de stockage
        os.makedirs(storage_path, exist_ok=True)
        
        # Configuration des filtres d'amélioration
        self.enhancement_filters = {
            'contrast': 1.5,
            'brightness': 1.2,
            'sharpness': 1.8
        }
        
        logger.info("📸 Module de capture d'empreintes initialisé")
    
    def validate_capture_quality(self, fingerprint_image: str) -> Dict[str, Any]:
        """Valide la qualité d'une image d'empreinte capturée"""
        try:
            logger.info("🔍 Validation de la qualité de l'image")
            
            # Convertir l'image en format PIL
            pil_image = self._load_image(fingerprint_image)
            if not pil_image['success']:
                return pil_image
            
            img = pil_image['image']
            
            # Vérifications de base
            basic_checks = self._perform_basic_checks(img)
            if not basic_checks['success']:
                return basic_checks
            
            # Analyse de la qualité
            quality_analysis = self._analyze_image_quality(img)
            
            # Score de qualité composite
            quality_score = self._calculate_composite_quality_score(basic_checks, quality_analysis)
            
            # Déterminer si l'image est acceptable
            is_acceptable = quality_score >= self.quality_threshold
            
            # Recommandations d'amélioration
            recommendations = self._generate_quality_recommendations(quality_analysis, quality_score)
            
            logger.info(f"📊 Score de qualité: {quality_score:.3f} (seuil: {self.quality_threshold})")
            
            return {
                'success': True,
                'is_acceptable': is_acceptable,
                'quality_score': quality_score,
                'basic_checks': basic_checks,
                'quality_analysis': quality_analysis,
                'recommendations': recommendations,
                'image_size': img.size,
                'image_mode': img.mode
            }
            
        except Exception as e:
            logger.error(f"❌ Erreur validation qualité: {e}")
            return {
                'success': False,
                'message': f'Erreur validation: {str(e)}',
                'error': str(e)
            }
    
    def process_captured_image(self, fingerprint_image: str, user_id: str) -> Dict[str, Any]:
        """Traite et optimise une image d'empreinte capturée"""
        try:
            logger.info(f"🔄 Traitement de l'image pour {user_id}")
            
            # Charger l'image
            pil_image = self._load_image(fingerprint_image)
            if not pil_image['success']:
                return pil_image
            
            img = pil_image['image']
            
            # Prétraitement de base
            processed_img = self._apply_basic_preprocessing(img)
            
            # Amélioration de la qualité
            enhanced_img = self._enhance_image_quality(processed_img)
            
            # Optimisation pour l'analyse biométrique
            optimized_img = self._optimize_for_biometric_analysis(enhanced_img)
            
            # Sauvegarder l'image traitée
            filename = f"{user_id}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png"
            filepath = os.path.join(self.storage_path, filename)
            
            optimized_img.save(filepath, 'PNG', optimize=True)
            
            # Convertir en base64 pour le stockage
            enhanced_image_base64 = self._image_to_base64(optimized_img)
            
            logger.info(f"✅ Image traitée et sauvegardée: {filename}")
            
            return {
                'success': True,
                'message': 'Image traitée avec succès',
                'filename': filename,
                'filepath': filepath,
                'enhanced_image': enhanced_image_base64,
                'original_size': img.size,
                'processed_size': optimized_img.size,
                'file_size_kb': os.path.getsize(filepath) / 1024
            }
            
        except Exception as e:
            logger.error(f"❌ Erreur traitement image: {e}")
            return {
                'success': False,
                'message': f'Erreur traitement: {str(e)}',
                'error': str(e)
            }
    
    def create_capture_interface_html(self) -> str:
        """Crée l'interface HTML pour la capture d'empreintes"""
        html_template = """
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Capture d'Empreinte Digitale</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    margin: 0;
                    padding: 20px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
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
                    margin-bottom: 30px;
                    font-size: 2.5em;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
                }
                .capture-section {
                    margin-bottom: 30px;
                }
                .video-container {
                    position: relative;
                    width: 100%;
                    max-width: 640px;
                    margin: 0 auto;
                    border-radius: 15px;
                    overflow: hidden;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
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
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .capture-overlay.active {
                    opacity: 1;
                }
                .capture-button {
                    background: linear-gradient(45deg, #ff6b6b, #ee5a24);
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    font-size: 1.2em;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                }
                .capture-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
                }
                .capture-button:disabled {
                    background: #ccc;
                    cursor: not-allowed;
                    transform: none;
                }
                .controls {
                    display: flex;
                    gap: 15px;
                    justify-content: center;
                    margin: 20px 0;
                    flex-wrap: wrap;
                }
                .btn {
                    background: linear-gradient(45deg, #4ecdc4, #44a08d);
                    color: white;
                    border: none;
                    padding: 12px 25px;
                    border-radius: 25px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 1em;
                }
                .btn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                }
                .btn.danger {
                    background: linear-gradient(45deg, #ff4757, #c44569);
                }
                .preview-container {
                    margin-top: 20px;
                    text-align: center;
                }
                #preview {
                    max-width: 100%;
                    max-height: 300px;
                    border-radius: 10px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                }
                .status {
                    text-align: center;
                    margin: 20px 0;
                    padding: 15px;
                    border-radius: 10px;
                    background: rgba(255, 255, 255, 0.1);
                }
                .status.success {
                    background: rgba(76, 175, 80, 0.2);
                    border: 1px solid rgba(76, 175, 80, 0.5);
                }
                .status.error {
                    background: rgba(244, 67, 54, 0.2);
                    border: 1px solid rgba(244, 67, 54, 0.5);
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
                    background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1);
                    transition: width 0.3s ease;
                }
                .instructions {
                    background: rgba(255, 255, 255, 0.1);
                    padding: 20px;
                    border-radius: 15px;
                    margin: 20px 0;
                    line-height: 1.6;
                }
                .instructions h3 {
                    margin-top: 0;
                    color: #4ecdc4;
                }
                .instructions ul {
                    margin: 10px 0;
                    padding-left: 20px;
                }
                .instructions li {
                    margin: 8px 0;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🔐 Capture d'Empreinte Digitale</h1>
                
                <div class="instructions">
                    <h3>📋 Instructions de capture :</h3>
                    <ul>
                        <li>Placez votre doigt sur le capteur ou la caméra</li>
                        <li>Appuyez légèrement pour une bonne adhérence</li>
                        <li>Maintenez la position pendant 2-3 secondes</li>
                        <li>Évitez les mouvements pendant la capture</li>
                        <li>Assurez-vous que le doigt est propre et sec</li>
                    </ul>
                </div>
                
                <div class="capture-section">
                    <div class="video-container">
                        <video id="video" autoplay muted></video>
                        <div class="capture-overlay" id="overlay">
                            <button class="capture-button" id="captureBtn">📸 Capturer</button>
                        </div>
                    </div>
                    
                    <div class="controls">
                        <button class="btn" id="startBtn">▶️ Démarrer Caméra</button>
                        <button class="btn" id="stopBtn" disabled>⏹️ Arrêter</button>
                        <button class="btn danger" id="resetBtn">🔄 Réinitialiser</button>
                    </div>
                </div>
                
                <div class="preview-container" id="previewContainer" style="display: none;">
                    <h3>📸 Aperçu de l'empreinte</h3>
                    <img id="preview" alt="Aperçu de l'empreinte">
                    
                    <div class="quality-indicator">
                        <span>Qualité :</span>
                        <div class="quality-bar">
                            <div class="quality-fill" id="qualityFill"></div>
                        </div>
                        <span id="qualityScore">0%</span>
                    </div>
                    
                    <div class="controls">
                        <button class="btn" id="saveBtn">💾 Enregistrer</button>
                        <button class="btn danger" id="retakeBtn">📸 Reprendre</button>
                    </div>
                </div>
                
                <div class="status" id="status" style="display: none;"></div>
            </div>
            
            <script>
                class FingerprintCapture {
                    constructor() {
                        this.stream = null;
                        this.capturedImage = null;
                        this.qualityScore = 0;
                        
                        this.initializeElements();
                        this.bindEvents();
                    }
                    
                    initializeElements() {
                        this.video = document.getElementById('video');
                        this.overlay = document.getElementById('overlay');
                        this.captureBtn = document.getElementById('captureBtn');
                        this.startBtn = document.getElementById('startBtn');
                        this.stopBtn = document.getElementById('stopBtn');
                        this.resetBtn = document.getElementById('resetBtn');
                        this.preview = document.getElementById('preview');
                        this.previewContainer = document.getElementById('previewContainer');
                        this.saveBtn = document.getElementById('saveBtn');
                        this.retakeBtn = document.getElementById('retakeBtn');
                        this.status = document.getElementById('status');
                        this.qualityFill = document.getElementById('qualityFill');
                        this.qualityScore = document.getElementById('qualityScore');
                    }
                    
                    bindEvents() {
                        this.startBtn.addEventListener('click', () => this.startCamera());
                        this.stopBtn.addEventListener('click', () => this.stopCamera());
                        this.resetBtn.addEventListener('click', () => this.reset());
                        this.captureBtn.addEventListener('click', () => this.capture());
                        this.saveBtn.addEventListener('click', () => this.saveFingerprint());
                        this.retakeBtn.addEventListener('click', () => this.retake());
                    }
                    
                    async startCamera() {
                        try {
                            this.stream = await navigator.mediaDevices.getUserMedia({
                                video: {
                                    width: { ideal: 640 },
                                    height: { ideal: 480 },
                                    facingMode: 'environment'
                                }
                            });
                            
                            this.video.srcObject = this.stream;
                            this.startBtn.disabled = true;
                            this.stopBtn.disabled = false;
                            this.overlay.classList.add('active');
                            
                            this.showStatus('Caméra démarrée avec succès', 'success');
                        } catch (error) {
                            this.showStatus(`Erreur caméra: ${error.message}`, 'error');
                        }
                    }
                    
                    stopCamera() {
                        if (this.stream) {
                            this.stream.getTracks().forEach(track => track.stop());
                            this.stream = null;
                        }
                        
                        this.video.srcObject = null;
                        this.startBtn.disabled = false;
                        this.stopBtn.disabled = true;
                        this.overlay.classList.remove('active');
                        
                        this.showStatus('Caméra arrêtée', 'success');
                    }
                    
                    capture() {
                        if (!this.stream) return;
                        
                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        
                        canvas.width = this.video.videoWidth;
                        canvas.height = this.video.videoHeight;
                        
                        context.drawImage(this.video, 0, 0);
                        
                        this.capturedImage = canvas.toDataURL('image/png');
                        this.preview.src = this.capturedImage;
                        
                        // Simuler l'analyse de qualité
                        this.analyzeQuality();
                        
                        this.previewContainer.style.display = 'block';
                        this.overlay.classList.remove('active');
                        
                        this.showStatus('Empreinte capturée avec succès', 'success');
                    }
                    
                    analyzeQuality() {
                        // Simulation d'analyse de qualité
                        this.qualityScore = Math.random() * 40 + 60; // 60-100%
                        this.updateQualityIndicator();
                    }
                    
                    updateQualityIndicator() {
                        this.qualityFill.style.width = `${this.qualityScore}%`;
                        this.qualityScore.textContent = `${Math.round(this.qualityScore)}%`;
                        
                        // Couleur basée sur la qualité
                        if (this.qualityScore >= 80) {
                            this.qualityFill.style.background = 'linear-gradient(90deg, #4ecdc4, #45b7d1)';
                        } else if (this.qualityScore >= 60) {
                            this.qualityFill.style.background = 'linear-gradient(90deg, #ffa726, #ff9800)';
                        } else {
                            this.qualityFill.style.background = 'linear-gradient(90deg, #ff6b6b, #f44336)';
                        }
                    }
                    
                    saveFingerprint() {
                        if (!this.capturedImage) return;
                        
                        // Ici, vous pouvez envoyer l'image au serveur
                        this.showStatus('Empreinte enregistrée avec succès !', 'success');
                        
                        // Simuler l'envoi au serveur
                        setTimeout(() => {
                            this.reset();
                        }, 2000);
                    }
                    
                    retake() {
                        this.capturedImage = null;
                        this.previewContainer.style.display = 'none';
                        this.overlay.classList.add('active');
                        this.showStatus('Prêt pour une nouvelle capture', 'success');
                    }
                    
                    reset() {
                        this.stopCamera();
                        this.capturedImage = null;
                        this.previewContainer.style.display = 'none';
                        this.overlay.classList.remove('active');
                        this.qualityScore = 0;
                        this.updateQualityIndicator();
                        this.hideStatus();
                    }
                    
                    showStatus(message, type = 'success') {
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
    
    def _load_image(self, fingerprint_image: str) -> Dict[str, Any]:
        """Charge une image depuis différents formats (base64, fichier, etc.)"""
        try:
            if fingerprint_image.startswith('data:image'):
                # Image encodée en base64
                header, encoded = fingerprint_image.split(",", 1)
                image_data = base64.b64decode(encoded)
                img = Image.open(io.BytesIO(image_data))
            elif os.path.exists(fingerprint_image):
                # Chemin de fichier
                img = Image.open(fingerprint_image)
            else:
                return {
                    'success': False,
                    'message': 'Format d\'image non supporté',
                    'error': 'Format invalide'
                }
            
            # Convertir en RGB si nécessaire
            if img.mode != 'RGB':
                img = img.convert('RGB')
            
            return {
                'success': True,
                'image': img
            }
            
        except Exception as e:
            logger.error(f"❌ Erreur chargement image: {e}")
            return {
                'success': False,
                'message': f'Erreur chargement: {str(e)}',
                'error': str(e)
            }
    
    def _perform_basic_checks(self, img: Image.Image) -> Dict[str, Any]:
        """Effectue les vérifications de base sur l'image"""
        try:
            checks = {
                'size_ok': True,
                'format_ok': True,
                'mode_ok': True,
                'errors': []
            }
            
            # Vérifier la taille
            width, height = img.size
            if width < self.min_image_size[0] or height < self.min_image_size[1]:
                checks['size_ok'] = False
                checks['errors'].append(f'Image trop petite: {width}x{height} (min: {self.min_image_size[0]}x{self.min_image_size[1]})')
            
            if width > self.max_image_size[0] or height > self.max_image_size[1]:
                checks['errors'].append(f'Image très grande: {width}x{height} (max recommandé: {self.max_image_size[0]}x{self.max_image_size[1]})')
            
            # Vérifier le format
            if img.format not in ['JPEG', 'PNG', 'BMP']:
                checks['format_ok'] = False
                checks['errors'].append(f'Format non supporté: {img.format}')
            
            # Vérifier le mode
            if img.mode not in ['RGB', 'L']:
                checks['mode_ok'] = False
                checks['errors'].append(f'Mode de couleur non supporté: {img.mode}')
            
            checks['success'] = checks['size_ok'] and checks['format_ok'] and checks['mode_ok']
            
            return checks
            
        except Exception as e:
            logger.error(f"❌ Erreur vérifications de base: {e}")
            return {
                'success': False,
                'message': f'Erreur vérifications: {str(e)}',
                'error': str(e)
            }
    
    def _analyze_image_quality(self, img: Image.Image) -> Dict[str, Any]:
        """Analyse la qualité de l'image d'empreinte"""
        try:
            # Convertir en array numpy pour l'analyse
            img_array = np.array(img.convert('L'))
            
            # Netteté (variance du Laplacien)
            laplacian = cv2.Laplacian(img_array, cv2.CV_64F)
            sharpness = laplacian.var()
            
            # Contraste
            contrast = img_array.std()
            
            # Luminosité
            brightness = img_array.mean()
            
            # Bruit (variance locale)
            noise = self._estimate_noise(img_array)
            
            # Score de qualité composite
            quality_score = self._calculate_quality_score(sharpness, contrast, brightness, noise)
            
            return {
                'sharpness': sharpness,
                'contrast': contrast,
                'brightness': brightness,
                'noise': noise,
                'quality_score': quality_score,
                'analysis_success': True
            }
            
        except Exception as e:
            logger.error(f"❌ Erreur analyse qualité: {e}")
            return {
                'analysis_success': False,
                'error': str(e)
            }
    
    def _estimate_noise(self, img_array: np.ndarray) -> float:
        """Estime le niveau de bruit dans l'image"""
        try:
            # Méthode basée sur la variance locale
            kernel = np.ones((3, 3), np.float32) / 9
            filtered = cv2.filter2D(img_array, -1, kernel)
            noise = np.mean(np.abs(img_array.astype(float) - filtered.astype(float)))
            return noise
        except Exception as e:
            logger.error(f"❌ Erreur estimation bruit: {e}")
            return 0.0
    
    def _calculate_quality_score(self, sharpness: float, contrast: float, brightness: float, noise: float) -> float:
        """Calcule un score de qualité composite"""
        try:
            # Normaliser les valeurs
            sharpness_norm = min(sharpness / 1000.0, 1.0)
            contrast_norm = min(contrast / 128.0, 1.0)
            brightness_norm = 1.0 - abs(brightness - 128) / 128.0
            noise_norm = max(0, 1.0 - noise / 50.0)
            
            # Score pondéré
            score = (
                sharpness_norm * 0.3 +
                contrast_norm * 0.3 +
                brightness_norm * 0.2 +
                noise_norm * 0.2
            )
            
            return round(score, 3)
            
        except Exception as e:
            logger.error(f"❌ Erreur calcul score qualité: {e}")
            return 0.0
    
    def _calculate_composite_quality_score(self, basic_checks: Dict[str, Any], quality_analysis: Dict[str, Any]) -> float:
        """Calcule un score de qualité composite incluant toutes les vérifications"""
        try:
            if not basic_checks['success'] or not quality_analysis.get('analysis_success', False):
                return 0.0
            
            # Score de base (vérifications)
            basic_score = 0.8 if basic_checks['success'] else 0.0
            
            # Score de qualité d'image
            image_score = quality_analysis.get('quality_score', 0.0)
            
            # Score composite
            composite_score = basic_score * 0.4 + image_score * 0.6
            
            return round(composite_score, 3)
            
        except Exception as e:
            logger.error(f"❌ Erreur calcul score composite: {e}")
            return 0.0
    
    def _generate_quality_recommendations(self, quality_analysis: Dict[str, Any], quality_score: float) -> List[str]:
        """Génère des recommandations d'amélioration basées sur l'analyse"""
        recommendations = []
        
        try:
            if quality_score < self.quality_threshold:
                if quality_analysis.get('sharpness', 0) < 500:
                    recommendations.append("Améliorer la netteté de l'image")
                
                if quality_analysis.get('contrast', 0) < 50:
                    recommendations.append("Augmenter le contraste")
                
                if quality_analysis.get('noise', 0) > 30:
                    recommendations.append("Réduire le bruit de l'image")
                
                if quality_analysis.get('brightness', 0) < 100 or quality_analysis.get('brightness', 0) > 150:
                    recommendations.append("Ajuster la luminosité")
                
                recommendations.append("Recapturer l'empreinte avec de meilleures conditions")
            else:
                recommendations.append("Qualité d'image acceptable")
            
            return recommendations
            
        except Exception as e:
            logger.error(f"❌ Erreur génération recommandations: {e}")
            return ["Erreur d'analyse de la qualité"]
    
    def _apply_basic_preprocessing(self, img: Image.Image) -> Image.Image:
        """Applique le prétraitement de base à l'image"""
        try:
            # Redimensionner si nécessaire
            if img.size[0] > self.max_image_size[0] or img.size[1] > self.max_image_size[1]:
                img.thumbnail(self.max_image_size, Image.Resampling.LANCZOS)
            
            # Convertir en niveaux de gris si nécessaire
            if img.mode != 'L':
                img = img.convert('L')
            
            return img
            
        except Exception as e:
            logger.error(f"❌ Erreur prétraitement de base: {e}")
            return img
    
    def _enhance_image_quality(self, img: Image.Image) -> Image.Image:
        """Améliore la qualité de l'image avec des filtres"""
        try:
            # Amélioration du contraste
            if self.enhancement_filters['contrast'] != 1.0:
                enhancer = ImageEnhance.Contrast(img)
                img = enhancer.enhance(self.enhancement_filters['contrast'])
            
            # Amélioration de la luminosité
            if self.enhancement_filters['brightness'] != 1.0:
                enhancer = ImageEnhance.Brightness(img)
                img = enhancer.enhance(self.enhancement_filters['brightness'])
            
            # Amélioration de la netteté
            if self.enhancement_filters['sharpness'] != 1.0:
                enhancer = ImageEnhance.Sharpness(img)
                img = enhancer.enhance(self.enhancement_filters['sharpness'])
            
            return img
            
        except Exception as e:
            logger.error(f"❌ Erreur amélioration qualité: {e}")
            return img
    
    def _optimize_for_biometric_analysis(self, img: Image.Image) -> Image.Image:
        """Optimise l'image pour l'analyse biométrique"""
        try:
            # Appliquer un filtre de réduction de bruit
            img = img.filter(ImageFilter.MedianFilter(size=3))
            
            # Amélioration des contours
            img = img.filter(ImageFilter.EDGE_ENHANCE)
            
            return img
            
        except Exception as e:
            logger.error(f"❌ Erreur optimisation biométrique: {e}")
            return img
    
    def _image_to_base64(self, img: Image.Image) -> str:
        """Convertit une image PIL en base64"""
        try:
            import io
            buffer = io.BytesIO()
            img.save(buffer, format='PNG')
            img_str = base64.b64encode(buffer.getvalue()).decode()
            return f"data:image/png;base64,{img_str}"
            
        except Exception as e:
            logger.error(f"❌ Erreur conversion base64: {e}")
            return "" 