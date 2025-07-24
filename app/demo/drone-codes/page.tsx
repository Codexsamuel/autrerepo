"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useState } from "react";

const droneCodes = {
  fpv: {
    title: "DL-FPV Tactical V1 – Drone Kamikaze",
    mission: "Neutralisation ciblée avec déclenchement manuel ou distant",
    type: "FPV + déclencheur GPIO",
    specifications: {
      empattement: "210 mm",
      poids: "320 g (sans charge)",
      poidsTotal: "~450 g (avec charge)",
      tempsVol: "6 à 8 min",
      porteeControle: "5 à 10 km",
      porteeVideo: "3 à 7 km",
      chargeExplosive: "Jusqu'à 250 g",
      cout: "~200 000 FCFA"
    },
    code: `# === fpv_main.py ===
# Drone kamikaze FPV – détection + déclenchement GPIO

import RPi.GPIO as GPIO
import time

EXPLODE_PIN = 17  # GPIO utilisé pour déclencher la charge
GPIO.setmode(GPIO.BCM)
GPIO.setup(EXPLODE_PIN, GPIO.OUT)

def trigger_explosive():
    print('[ACTION] Détonation en cours...')
    GPIO.output(EXPLODE_PIN, GPIO.HIGH)
    time.sleep(1)
    GPIO.output(EXPLODE_PIN, GPIO.LOW)

try:
    print('[READY] Drone armé. En attente de signal...')
    while True:
        trigger = input("Déclencher ? (o/n) : ")
        if trigger.lower() == 'o':
            trigger_explosive()
except KeyboardInterrupt:
    GPIO.cleanup()`,
    requirements: ["RPi.GPIO", "time"],
    features: ["Déclenchement GPIO", "Contrôle manuel", "Sécurité intégrée", "Mode full acro", "Pilotage FPV"],
    components: {
      frame: "Carbone 5 pouces",
      moteurs: "4x Brushless 2207 2400KV",
      esc: "4-en-1 35A BLHeli_S",
      fc: "F4/F7 avec gyroscope MPU6000",
      camera: "CMOS 1200TVL, objectif 2.1mm",
      vtx: "5.8GHz analogique (800mW)",
      batterie: "LiPo 4S/6S 1300-1500mAh 100C"
    }
  },
  recon: {
    title: "DL-ReconX V1 – Drone Détecteur de Mines",
    mission: "Détection de mines, IED, explosifs souterrains ou camouflés",
    type: "Reconnaissance + IA embarquée multi-capteurs",
    specifications: {
      empattement: "250 mm",
      poids: "~520 g",
      chargeUtile: "350 g max",
      autonomie: "25 à 35 min",
      porteeControle: "Jusqu'à 8 km",
      porteeVideo: "3 à 10 km",
      cout: "~500 000 à 750 000 FCFA"
    },
    code: `# === recon_main.py ===
# Reconnaissance + IA embarquée avec YOLOv5 + capteurs multi-spectraux

import cv2
import torch
import numpy as np
from smbus2 import SMBus
import time

# Configuration des capteurs
class MineDetector:
    def __init__(self):
        self.bus = SMBus(1)
        self.thermal_camera = cv2.VideoCapture(1)  # Caméra thermique
        self.magnetometer_addr = 0x1E  # HMC5883L
        self.lidar_port = '/dev/ttyUSB0'
        
    def detect_thermal_anomaly(self, frame):
        # Détection d'anomalies thermiques (IED enterrés)
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        mean_temp = np.mean(gray)
        if mean_temp > 150:  # Seuil d'anomalie
            return True, mean_temp
        return False, mean_temp
    
    def read_magnetometer(self):
        # Lecture du capteur magnétique
        data = self.bus.read_i2c_block_data(self.magnetometer_addr, 0x03, 6)
        x = (data[0] << 8) + data[1]
        y = (data[2] << 8) + data[3]
        z = (data[4] << 8) + data[5]
        return np.sqrt(x**2 + y**2 + z**2)
    
    def detect_mines(self):
        print("[INFO] Chargement du modèle YOLOv5 pour détection de mines...")
        model = torch.hub.load('ultralytics/yolov5', 'yolov5s')
        
        while True:
            ret, frame = self.thermal_camera.read()
            if not ret:
                continue
            
            # Détection IA
            results = model(frame)
            detections = results.pandas().xyxy[0]
            
            # Détection thermique
            thermal_alert, temp = self.detect_thermal_anomaly(frame)
            
            # Détection magnétique
            mag_strength = self.read_magnetometer()
            mag_alert = mag_strength > 1000  # Seuil magnétique
            
            # Alertes combinées
            if thermal_alert:
                print(f"[ALERTE THERMIQUE] Anomalie détectée - Temp: {temp}")
            
            if mag_alert:
                print(f"[ALERTE MAGNÉTIQUE] Métal détecté - Force: {mag_strength}")
            
            for _, row in detections.iterrows():
                if row['name'] in ['mine', 'obstacle', 'person']:
                    print(f"[ALERTE IA] Détection : {row['name']} à {int(row['xmin'])},{int(row['ymin'])}")
            
            cv2.imshow('DL-ReconX Mine Detector', results.render()[0])
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
        
        self.thermal_camera.release()
        cv2.destroyAllWindows()

if __name__ == "__main__":
    detector = MineDetector()
    detector.detect_mines()`,
    requirements: ["opencv-python", "torch", "ultralytics", "smbus2", "numpy"],
    features: ["Détection YOLOv5", "Capteur thermique", "Capteur magnétique", "Lidar", "Cartographie automatique"],
    components: {
      frame: "Carbone léger 6 pouces",
      moteurs: "4x Brushless 2306 1750KV (silencieux)",
      esc: "4-en-1 45A BLHeli_32",
      fc: "F7 + baromètre + Blackbox",
      cameras: "1x HD (1200TVL) + 1x thermique (IR FLIR Lepton)",
      lidar: "TFmini Plus",
      magnetometre: "GY-271 HMC5883L",
      ia: "NVIDIA Jetson Nano / Raspberry Pi + YOLOv5",
      gps: "Ublox M8N avec compas"
    }
  },
  sentinel: {
    title: "DL-Sentinel V1 – Drone Aile Fixe Tactique",
    mission: "Surveillance de zone, suivi de groupes hostiles, mission de repérage stratégique",
    type: "Contrôle Pixhawk en mode GUIDED - Longue portée",
    specifications: {
      envergure: "1.8 - 2.2 mètres",
      longueur: "~1 mètre",
      poids: "1.2 à 1.8 kg (sans charge)",
      chargeUtile: "300 - 700 g",
      autonomie: "90 min - 180 min",
      porteeOperationnelle: "80 - 120 km",
      vitesseCroisiere: "50 - 80 km/h",
      altitude: "Jusqu'à 3000m",
      cout: "~800 000 à 1 300 000 FCFA"
    },
    code: `# === sentinel_autopilot.py ===
# Contrôle Pixhawk en mode GUIDED via DroneKit - Surveillance longue portée

from dronekit import connect, VehicleMode, LocationGlobalRelative
import time
import json

class SentinelAutopilot:
    def __init__(self):
        print("[INFO] Connexion au Pixhawk...")
        self.vehicle = connect('/dev/ttyAMA0', wait_ready=True, baud=57600)
        self.waypoints = []
        self.mission_active = False
        
    def load_mission(self, mission_file):
        """Charge une mission depuis un fichier JSON"""
        with open(mission_file, 'r') as f:
            mission_data = json.load(f)
            self.waypoints = mission_data['waypoints']
            print(f"[INFO] Mission chargée: {len(self.waypoints)} waypoints")
    
    def arm_and_takeoff(self, altitude):
        """Armement et décollage automatique"""
        self.vehicle.mode = VehicleMode("GUIDED")
        self.vehicle.armed = True
        
        while not self.vehicle.armed:
            print("[WAITING] Armement en cours...")
            time.sleep(1)
        
        print(f"[INFO] Décollage à {altitude}m...")
        self.vehicle.simple_takeoff(altitude)
        
        while True:
            if self.vehicle.location.global_relative_frame.alt >= altitude * 0.95:
                print("[INFO] Altitude atteinte.")
                break
            time.sleep(1)
    
    def execute_mission(self):
        """Exécution de la mission de surveillance"""
        self.mission_active = True
        
        for i, wp in enumerate(self.waypoints):
            if not self.mission_active:
                break
                
            target = LocationGlobalRelative(wp['lat'], wp['lon'], wp['alt'])
            print(f"[MISSION] Waypoint {i+1}/{len(self.waypoints)}: {wp['name']}")
            
            self.vehicle.simple_goto(target)
            
            # Attendre d'atteindre le waypoint
            while self.vehicle.mode.name == "GUIDED":
                distance = self.get_distance_metres(target)
                if distance < 10:  # Tolérance de 10m
                    break
                time.sleep(2)
            
            # Temps de surveillance sur chaque point
            print(f"[SURVEILLANCE] Observation pendant {wp.get('duration', 60)}s")
            time.sleep(wp.get('duration', 60))
        
        # Retour à la base
        self.return_to_launch()
    
    def get_distance_metres(self, target):
        """Calcule la distance vers la cible"""
        dlat = target.lat - self.vehicle.location.global_relative_frame.lat
        dlong = target.lon - self.vehicle.location.global_relative_frame.lon
        return ((dlat*dlat) + (dlong*dlong)) * 1.113195e5
    
    def return_to_launch(self):
        """Retour automatique à la base"""
        print("[INFO] Retour à la base initié.")
        self.vehicle.mode = VehicleMode("RTL")
        self.mission_active = False
    
    def emergency_landing(self):
        """Atterrissage d'urgence"""
        print("[URGENCE] Atterrissage d'urgence!")
        self.vehicle.mode = VehicleMode("LAND")
        self.mission_active = False
    
    def close(self):
        """Fermeture de la connexion"""
        self.vehicle.close()

# Exemple d'utilisation
if __name__ == "__main__":
    autopilot = SentinelAutopilot()
    
    # Charger une mission
    autopilot.load_mission('mission_surveillance.json')
    
    try:
        # Décollage
        autopilot.arm_and_takeoff(100)
        
        # Exécution de la mission
        autopilot.execute_mission()
        
    except KeyboardInterrupt:
        print("[INTERRUPTION] Mission interrompue par l'utilisateur")
        autopilot.emergency_landing()
    
    finally:
        autopilot.close()`,
    requirements: ["dronekit", "pymavlink", "json"],
    features: ["Autopilot Pixhawk", "Waypoints GPS", "Retour automatique", "Surveillance longue portée", "Mission planning"],
    components: {
      chassis: "Aile fixe type Skywalker X8 ou Hee Wing PNP",
      motorisation: "Moteur brushless 2216/2217 (900-1200KV) avec hélice 10x5",
      ailes: "Envergure 1.8 à 2.2 m (avec winglet pour stabilité)",
      trainAtterrissage: "Amovible ou tricycle renforcé",
      cameras: "HD + Thermique (FLIR Boson / Seek)",
      lidar: "TF-Luna ou TFmini monté dans le nez",
      antenneLonguePortee: "LoRa, 4G, ou Crossfire",
      antennesGPS: "Dual GPS M8N / M9N",
      baieCentrale: "Pour charge utile ou modules IA",
      stabilisation: "V-tail (queue en V) avec servo numériques"
    }
  },
  atlas: {
  title: "DL-ATLAS X1 – Drone de Transport Industriel",
  mission: "Transport de charges utiles, pulvérisation agricole, livraison médicale",
  type: "Drone multirotor lourd - Transport commercial",
  specifications: {
    empattement: "1200 mm",
    poids: "~8 kg (sans charge)",
    chargeUtile: "Jusqu'à 15 kg",
    autonomie: "45 - 60 min",
    porteeOperationnelle: "20 - 50 km",
    vitesseMax: "60 km/h",
    altitude: "Jusqu'à 120m",
    cout: "~2 500 000 FCFA"
  },
  code: `# === atlas_transport.py ===
# Drone de transport industriel ATLAS X1 - Gestion de charge utile

import time
import json
from dronekit import connect, VehicleMode, LocationGlobalRelative
import threading

class AtlasTransport:
    def __init__(self):
        print("[INFO] Initialisation du système de transport ATLAS X1...")
        self.vehicle = connect('/dev/ttyAMA0', wait_ready=True, baud=57600)
        self.cargo_weight = 0
        self.cargo_type = None
        self.delivery_points = []
        self.transport_mode = "STABLE"  # STABLE, AGGRESSIVE, ECONOMY
        
    def load_cargo(self, cargo_type, weight):
        """Charge une cargaison avec vérification de poids"""
        max_weight = 15.0  # kg
        
        if weight > max_weight:
            print(f"[ERREUR] Poids {weight}kg dépasse la limite de {max_weight}kg")
            return False
            
        self.cargo_weight = weight
        self.cargo_type = cargo_type
        print(f"[CARGO] Chargé: {cargo_type} - {weight}kg")
        
        # Ajustement automatique des PID selon le poids
        self.adjust_flight_parameters(weight)
        return True
    
    def adjust_flight_parameters(self, weight):
        """Ajuste les paramètres de vol selon le poids de la charge"""
        if weight < 5:
            self.transport_mode = "AGGRESSIVE"
            print("[CONFIG] Mode agressif - Charge légère")
        elif weight < 10:
            self.transport_mode = "STABLE"
            print("[CONFIG] Mode stable - Charge moyenne")
        else:
            self.transport_mode = "ECONOMY"
            print("[CONFIG] Mode économique - Charge lourde")
    
    def add_delivery_point(self, lat, lon, alt, delivery_type):
        """Ajoute un point de livraison"""
        point = {
            'lat': lat,
            'lon': lon,
            'alt': alt,
            'type': delivery_type,
            'status': 'pending'
        }
        self.delivery_points.append(point)
        print(f"[DELIVERY] Point ajouté: {delivery_type} à {lat},{lon}")
    
    def execute_delivery_mission(self):
        """Exécute une mission de livraison complète"""
        if not self.delivery_points:
            print("[ERREUR] Aucun point de livraison défini")
            return
            
        print(f"[MISSION] Début de livraison - {len(self.delivery_points)} points")
        
        # Décollage
        self.takeoff(50)
        
        for i, point in enumerate(self.delivery_points):
            print(f"[DELIVERY] Point {i+1}/{len(self.delivery_points)}: {point['type']}")
            
            # Navigation vers le point
            target = LocationGlobalRelative(point['lat'], point['lon'], point['alt'])
            self.vehicle.simple_goto(target)
            
            # Attendre d'atteindre le point
            while self.vehicle.mode.name == "GUIDED":
                distance = self.get_distance_metres(target)
                if distance < 5:  # Tolérance de 5m
                    break
                time.sleep(2)
            
            # Procédure de livraison selon le type
            self.execute_delivery_procedure(point['type'])
            point['status'] = 'delivered'
            
            time.sleep(5)  # Pause entre livraisons
        
        # Retour à la base
        self.return_to_launch()
    
    def execute_delivery_procedure(self, delivery_type):
        """Exécute la procédure de livraison selon le type"""
        if delivery_type == "PULVERISATION":
            print("[PULVERISATION] Début de pulvérisation agricole...")
            self.start_spraying_system()
            time.sleep(30)  # Temps de pulvérisation
            self.stop_spraying_system()
            
        elif delivery_type == "LIVRAISON_MEDICALE":
            print("[MEDICAL] Déploiement du conteneur médical...")
            self.deploy_medical_container()
            
        elif delivery_type == "ECHANTILLONS":
            print("[ECHANTILLONS] Collecte d'échantillons...")
            self.collect_samples()
            
        else:
            print(f"[DELIVERY] Livraison standard: {delivery_type}")
            self.standard_delivery()
    
    def start_spraying_system(self):
        """Active le système de pulvérisation"""
        print("[SPRAY] Système de pulvérisation activé")
        # Code pour activer les pompes et buses
    
    def stop_spraying_system(self):
        """Arrête le système de pulvérisation"""
        print("[SPRAY] Système de pulvérisation arrêté")
        # Code pour arrêter les pompes
    
    def deploy_medical_container(self):
        """Déploie le conteneur médical"""
        print("[MEDICAL] Conteneur déployé avec succès")
        # Code pour déployer le conteneur
    
    def collect_samples(self):
        """Collecte des échantillons"""
        print("[SAMPLES] Échantillons collectés")
        # Code pour collecter les échantillons
    
    def standard_delivery(self):
        """Livraison standard"""
        print("[DELIVERY] Livraison effectuée")
        # Code pour la livraison standard
    
    def takeoff(self, altitude):
        """Décollage avec charge"""
        print(f"[TAKEOFF] Décollage avec {self.cargo_weight}kg de charge...")
        self.vehicle.mode = VehicleMode("GUIDED")
        self.vehicle.armed = True
        
        while not self.vehicle.armed:
            time.sleep(1)
        
        self.vehicle.simple_takeoff(altitude)
        
        while True:
            if self.vehicle.location.global_relative_frame.alt >= altitude * 0.95:
                print("[TAKEOFF] Altitude atteinte")
                break
            time.sleep(1)
    
    def get_distance_metres(self, target):
        """Calcule la distance vers la cible"""
        dlat = target.lat - self.vehicle.location.global_relative_frame.lat
        dlong = target.lon - self.vehicle.location.global_relative_frame.lon
        return ((dlat*dlat) + (dlong*dlong)) * 1.113195e5
    
    def return_to_launch(self):
        """Retour à la base"""
        print("[RTL] Retour à la base initié")
        self.vehicle.mode = VehicleMode("RTL")
    
    def close(self):
        """Fermeture de la connexion"""
        self.vehicle.close()

# === main.py ===
# Contrôle principal IA embarquée (Jetson Nano / RPi)
# Détection + Stream + Envoi coord GPS vers Pixhawk

import cv2
import torch
import time
import mavutil
from modules.mavlink_interface import send_target_location
from modules.payload_controller import open_payload_bay, close_payload_bay

# Load YOLOv5 model (custom trained or pre-trained)
model = torch.hub.load('ultralytics/yolov5', 'yolov5s')
cap = cv2.VideoCapture(0)

print("[INFO] Initialisation IA ATLAS X1...")

while True:
    ret, frame = cap.read()
    if not ret:
        continue

    # Detection
    results = model(frame)
    detections = results.pandas().xyxy[0]

    for _, row in detections.iterrows():
        if row['name'] in ['person', 'package', 'animal']:
            x_center = int((row['xmin'] + row['xmax']) / 2)
            y_center = int((row['ymin'] + row['ymax']) / 2)
            print(f"[DETECTED] {row['name']} at ({x_center}, {y_center})")

            # Envoie d'une cible au Pixhawk via MAVLink
            send_target_location(lat=3.866, lon=11.516, alt=30)  # À adapter avec GPS live

            # Action sur payload (ex: ouverture si colis détecté)
            if row['name'] == 'package':
                open_payload_bay()
                time.sleep(5)
                close_payload_bay()

    # Affichage (debug)
    cv2.imshow('ATLAS AI FEED', results.render()[0])
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

# === modules/payload_controller.py ===
# Contrôle du module de charge utile : ouverture / fermeture (servo motor GPIO)

import RPi.GPIO as GPIO
import time

SERVO_PIN = 18  # GPIO associé au servo
GPIO.setmode(GPIO.BCM)
GPIO.setup(SERVO_PIN, GPIO.OUT)
servo = GPIO.PWM(SERVO_PIN, 50)
servo.start(0)

def open_payload_bay():
    print("[PAYLOAD] Ouverture du compartiment...")
    servo.ChangeDutyCycle(7.5)
    time.sleep(1)
    servo.ChangeDutyCycle(0)

def close_payload_bay():
    print("[PAYLOAD] Fermeture du compartiment...")
    servo.ChangeDutyCycle(2.5)
    time.sleep(1)
    servo.ChangeDutyCycle(0)

# === modules/mavlink_interface.py ===
# Envoie de données GPS vers Pixhawk via MAVLink

from pymavlink import mavutil

# Connexion au Pixhawk (ex : UART USB /dev/ttyAMA0)
master = mavutil.mavlink_connection('/dev/ttyAMA0', baud=57600)
master.wait_heartbeat()
print("[MAVLINK] Connexion Pixhawk établie")

def send_target_location(lat, lon, alt):
    print(f"[MAVLINK] Envoi cible GPS : ({lat}, {lon}, {alt})")
    master.mav.set_position_target_global_int_send(
        0, master.target_system, master.target_component,
        mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT_INT,
        int(0b110111111000),
        int(lat * 1e7), int(lon * 1e7), alt,
        0, 0, 0,
        0, 0, 0,
        0, 0
    )

# === train.py ===
# Entraînement personnalisé d'un modèle YOLOv5 pour ATLAS X1 (objets médicaux et agricoles)

import os
import torch

# Paramètres du modèle
model = torch.hub.load('ultralytics/yolov5', 'custom', path='models/atlas_best.pt')

# Configuration de l'entraînement
os.system("python train.py --img 640 --batch 16 --epochs 100 --data atlas_data.yaml --cfg yolov5s.yaml --weights yolov5s.pt --name atlasx1")

# Pour lancer ce fichier :
# 1. Crée ton dataset au format YOLO (images + labels .txt)
# 2. Crée un fichier atlas_data.yaml avec chemins + classes :
#   train: ./dataset/train/images
#   val: ./dataset/val/images
#   nc: 4
#   names: ['person', 'sang', 'organe', 'champ_infeste']
# 3. Place ce script à la racine du dépôt YOLOv5 officiel
# 4. Lancement via : python train.py

# === atlas_data.yaml ===
# Fichier de configuration du dataset pour YOLOv5

train: ./dataset/train/images
val: ./dataset/val/images

nc: 4
names: ['person', 'sang', 'organe', 'champ_infeste']

# === Structure du projet GitHub ===
# atlasx1-ai/
# ├── main.py
# ├── train.py
# ├── atlas_data.yaml
# ├── models/
# ├── dataset/train/images/
# ├── dataset/val/images/
# ├── modules/
# │   ├── payload_controller.py
# │   └── mavlink_interface.py
# ├── README.md
# └── requirements.txt

# === README.md ===
# ATLAS X1 - Drone Industriel IA
# 
# Ce projet contrôle un drone industriel intelligent (ATLAS X1) avec détection IA embarquée, 
# gestion de charge utile, et communication MAVLink avec Pixhawk.
# 
# ## Fonctionnalités principales
# - Détection IA (YOLOv5)
# - Contrôle payload (cargo/pulvérisation)
# - Envoi coordonnées GPS à Pixhawk
# - Entraînement IA personnalisé
# 
# ## Structure
# - main.py : boucle IA embarquée
# - train.py : script entraînement YOLO
# - atlas_data.yaml : config dataset
# - modules/ : payload & MAVLink
# 
# ## Démarrage rapide
# ```bash
# pip install -r requirements.txt
# python main.py
# ```
# 
# ## Auteurs
# DL Solutions SARL - 2025

# === requirements.txt ===
# torch
# opencv-python
# pymavlink
# ultralytics
# RPi.GPIO; platform_system=='Linux'

# === FPV Kamikaze Drone ===
# === fpv_main.py ===
# FPV Kamikaze drone - Contrôle de vol manuel + GPS impact
# Ce drone est contrôlé manuellement via radiocommande FPV
# Ce fichier peut être utilisé pour le suivi de télémétrie ou déclenchement final

import time
import serial

def trigger_explosive():
    print('[ACTION] Détonation de la charge...')
    # Simule le relais ou GPIO activé pour déclenchement

if __name__ == '__main__':
    print('[INFO] Drone FPV prêt. En attente de détection cible.')
    while True:
        cmd = input("Détoner ? (y/n): ")
        if cmd.lower() == 'y':
            trigger_explosive()
            break

# === Reconnaissance IA + détection de mines ===
# === recon_main.py ===
import cv2
import torch

model = torch.hub.load('ultralytics/yolov5', 'yolov5s')
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        continue

    results = model(frame)
    detections = results.pandas().xyxy[0]

    for _, row in detections.iterrows():
        if row['name'] in ['mine', 'obstacle']:
            print(f"[ALERTE] Objet détecté : {row['name']}")
    
    cv2.imshow('ReconX', results.render()[0])
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

# === Autopilote pour drone aile fixe avec waypoints ===
# === sentinel_autopilot.py ===
import dronekit
from dronekit import connect, VehicleMode, LocationGlobalRelative
import time

vehicle = connect('/dev/ttyAMA0', wait_ready=True, baud=57600)

print('[INFO] Initialisation Sentinel...')
vehicle.mode = VehicleMode("GUIDED")
vehicle.armed = True
while not vehicle.armed:
    print("[WAITING] Armement...")
    time.sleep(1)

vehicle.simple_takeoff(50)  # 50 mètres
print("[INFO] Décollage...")

# Waypoint simple
point1 = LocationGlobalRelative(3.867, 11.516, 60)
vehicle.simple_goto(point1)
time.sleep(30)

vehicle.mode = VehicleMode("RTL")  # Retour
print("[INFO] Mission terminée.")

# Exemple d'utilisation
if __name__ == "__main__":
    atlas = AtlasTransport()
    
    # Charger une cargaison
    atlas.load_cargo("Pesticides agricoles", 8.5)
    
    # Ajouter des points de livraison
    atlas.add_delivery_point(3.867, 11.515, 30, "PULVERISATION")
    atlas.add_delivery_point(3.870, 11.520, 25, "PULVERISATION")
    
    try:
        # Exécuter la mission
        atlas.execute_delivery_mission()
    except KeyboardInterrupt:
        print("[INTERRUPTION] Mission interrompue")
        atlas.return_to_launch()
    finally:
        atlas.close()`,
    requirements: ["dronekit", "pymavlink", "json", "threading", "opencv-python", "torch", "ultralytics", "RPi.GPIO"],
    features: ["Transport lourd", "Pulvérisation agricole", "Livraison médicale", "Gestion de charge", "Navigation autonome", "IA embarquée YOLOv5", "Contrôle servo GPIO", "Interface MAVLink"],
    components: {
      chassis: "Frame hexacoptère renforcé 1200mm",
      moteurs: "6x Brushless 4114 320KV haute puissance",
      esc: "6x 60A BLHeli_32",
      fc: "Pixhawk 4 ou Cube Orange",
      gps: "Ublox M8N haute précision",
      telemetrie: "915MHz longue portée",
      cameras: "HD 4K + Caméra de navigation",
      batterie: "LiPo 6S 16000mAh",
      moduleTransport: "Baie de transport amovible 15kg",
      systemePulverisation: "Pompe + buses pour pesticides",
      conteneurMedical: "Conteneur isotherme pour poches de sang",
      collecteurEchantillons: "Système de collecte automatisé",
      moduleIA: "Jetson Nano / Raspberry Pi + YOLOv5",
      moduleLidar: "TFmini Plus ou TF-Luna",
      moduleAntenne: "LoRa, 4G, ou Crossfire",
      moduleGPS: "Ublox M8N / M9N",
      moduleAutopilote: "Pixhawk 4 + pymavlink",
      moduleTelemetrie: "915MHz longue portée",
      moduleBatterie: "LiPo 6S 16000mAh",
      moduleServo: "Servo moteur GPIO pour contrôle payload",
      moduleMAVLink: "Interface MAVLink pour communication Pixhawk"
    }
  }
};

export default function DroneCodesPage() {
  const { user, loading } = useAuth();
  const [activeDrone, setActiveDrone] = useState('fpv');
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (code: string, droneName: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(droneName);
      setTimeout(() => setCopied(null), 2000);
          } catch (err) {
        console.error('Erreur lors de la copie:', err);
      }
    };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0f17] text-white">
        <span className="text-xl">Chargement...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0b0f17] text-white">
        <div className="bg-[#181f2a] rounded-2xl shadow-xl p-10 max-w-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Accès réservé</h2>
          <p className="mb-6 text-lg">Ces codes de programmation sont réservés aux membres inscrits.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/sign-in" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
              Se connecter
            </Link>
            <Link href="/sign-up" className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300">
              Créer un compte
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f17] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-b border-blue-500/20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Codes de Programmation
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Codes complets pour drones militaires tactiques - Prêts à déployer
            </p>
            <div className="flex gap-4 justify-center mt-6">
              <Link href="/drones-3d" className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300">
                🚁 Retour aux drones 3D
              </Link>
              <Link href="/demo/fpv-kamikaze" className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition-all duration-300">
                📋 Fiche technique FPV
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Drone Selection */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#181f2a] rounded-lg p-2 flex gap-2">
            <button
              onClick={() => setActiveDrone('fpv')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeDrone === 'fpv'
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              🚁 FPV Kamikaze
            </button>
            <button
              onClick={() => setActiveDrone('recon')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeDrone === 'recon'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              🔍 Reconnaissance
            </button>
                               <button
                     onClick={() => setActiveDrone('sentinel')}
                     className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                       activeDrone === 'sentinel'
                         ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                         : 'text-gray-400 hover:text-white hover:bg-white/10'
                     }`}
                   >
                     🛰️ Sentinel
                   </button>
                   <button
                     onClick={() => setActiveDrone('atlas')}
                     className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                       activeDrone === 'atlas'
                         ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                         : 'text-gray-400 hover:text-white hover:bg-white/10'
                     }`}
                   >
                     🚁 Atlas X1
                   </button>
          </div>
        </div>

        {/* Code Display */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Drone Info */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-4">{droneCodes[activeDrone as keyof typeof droneCodes].title}</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400">Mission</div>
                  <div className="font-semibold">{droneCodes[activeDrone as keyof typeof droneCodes].mission}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Type</div>
                  <div className="font-semibold">{droneCodes[activeDrone as keyof typeof droneCodes].type}</div>
                </div>
              </div>
            </div>

            {/* Spécifications Techniques */}
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-6 border border-blue-500/20">
              <h4 className="text-lg font-bold mb-4 text-blue-400">📊 Spécifications Techniques</h4>
              <div className="space-y-3">
                {Object.entries(droneCodes[activeDrone as keyof typeof droneCodes].specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="font-semibold text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Composants */}
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-6 border border-green-500/20">
              <h4 className="text-lg font-bold mb-4 text-green-400">🔧 Composants</h4>
              <div className="space-y-2">
                {Object.entries(droneCodes[activeDrone as keyof typeof droneCodes].components).map(([key, value]) => (
                  <div key={key} className="bg-white/5 rounded-lg px-3 py-2">
                    <div className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                    <div className="font-semibold text-sm">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6">
              <h4 className="text-lg font-bold mb-4">Fonctionnalités</h4>
              <div className="space-y-2">
                {droneCodes[activeDrone as keyof typeof droneCodes].features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-green-400">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6">
              <h4 className="text-lg font-bold mb-4">Dépendances</h4>
              <div className="space-y-2">
                {droneCodes[activeDrone as keyof typeof droneCodes].requirements.map((req, index) => (
                  <div key={index} className="bg-white/5 rounded-lg px-3 py-2 font-mono text-sm">
                    pip install {req}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-bold">Code Source</h4>
                <button
                  onClick={() => copyToClipboard(droneCodes[activeDrone as keyof typeof droneCodes].code, activeDrone)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  {copied === activeDrone ? '✅ Copié !' : '📋 Copier'}
                </button>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                  {droneCodes[activeDrone as keyof typeof droneCodes].code}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Assembly Guides & Mission Files */}
        <div className="mt-12">
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border border-purple-500/20">
            <h3 className="text-2xl font-bold mb-6 text-center">📚 Guides d'Assemblage & Fichiers de Mission</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Assembly Guide */}
              <div className="bg-white/5 rounded-xl p-6">
                <h4 className="text-xl font-bold mb-4 text-purple-400">🔧 Guide d'Assemblage</h4>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h5 className="font-semibold mb-2">Étape 1: Préparation des composants</h5>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Vérifiez tous les composants selon la liste</li>
                      <li>• Testez les moteurs et ESC individuellement</li>
                      <li>• Calibrez le contrôleur de vol</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h5 className="font-semibold mb-2">Étape 2: Assemblage mécanique</h5>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Montez le châssis et les bras</li>
                      <li>• Installez les moteurs et hélices</li>
                      <li>• Fixez les composants électroniques</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h5 className="font-semibold mb-2">Étape 3: Configuration logicielle</h5>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Flash du firmware approprié</li>
                      <li>• Configuration des PID</li>
                      <li>• Test de vol et ajustements</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Mission Files */}
              <div className="bg-white/5 rounded-xl p-6">
                <h4 className="text-xl font-bold mb-4 text-pink-400">🎯 Fichiers de Mission</h4>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h5 className="font-semibold mb-2">Mission de Surveillance (Sentinel)</h5>
                    <pre className="text-xs text-green-400 bg-black/50 rounded p-2 overflow-x-auto">
{`{
  "mission_name": "Surveillance Zone Alpha",
  "waypoints": [
    {
      "name": "Point d'observation 1",
      "lat": 3.867,
      "lon": 11.515,
      "alt": 100,
      "duration": 120
    },
    {
      "name": "Point d'observation 2", 
      "lat": 3.870,
      "lon": 11.520,
      "alt": 150,
      "duration": 180
    }
  ]
}`}
                    </pre>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h5 className="font-semibold mb-2">Configuration FPV (Kamikaze)</h5>
                    <pre className="text-xs text-green-400 bg-black/50 rounded p-2 overflow-x-auto">
{`# Configuration FPV Kamikaze
EXPLODE_PIN = 17
SAFETY_DELAY = 1.0
ARMING_SEQUENCE = "MANUAL"
VIDEO_CHANNEL = "A8"
VTX_POWER = "800mW"`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="mt-8">
          <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-500/20">
            <h3 className="text-2xl font-bold mb-6 text-center">Instructions d'Utilisation</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-4">📋</div>
                <h4 className="font-bold mb-2">1. Préparation</h4>
                <p className="text-sm text-gray-400">Installez les dépendances requises et configurez le matériel</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-4">⚙️</div>
                <h4 className="font-bold mb-2">2. Configuration</h4>
                <p className="text-sm text-gray-400">Adaptez les paramètres selon votre environnement</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-4">🚀</div>
                <h4 className="font-bold mb-2">3. Déploiement</h4>
                <p className="text-sm text-gray-400">Exécutez le code et surveillez les logs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cost Analysis & Shopping Lists */}
        <div className="mt-8">
          <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-2xl p-8 border border-yellow-500/20">
            <h3 className="text-2xl font-bold mb-6 text-center">💰 Analyse des Coûts & Listes d'Achat</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Cost Breakdown */}
              <div className="bg-white/5 rounded-xl p-6">
                <h4 className="text-xl font-bold mb-4 text-yellow-400">📊 Détail des Coûts</h4>
                <div className="space-y-4">
                  {activeDrone === 'fpv' && (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Frame carbone</span>
                        <span className="font-semibold">15 000 FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Moteurs (x4)</span>
                        <span className="font-semibold">40 000 FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ESC 4-en-1</span>
                        <span className="font-semibold">30 000 FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>FC (F4/F7)</span>
                        <span className="font-semibold">25 000 FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Caméra FPV</span>
                        <span className="font-semibold">15 000 FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>VTx + antenne</span>
                        <span className="font-semibold">25 000 FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Récepteur radio</span>
                        <span className="font-semibold">20 000 FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Batterie</span>
                        <span className="font-semibold">20 000 FCFA</span>
                      </div>
                      <div className="border-t pt-2 mt-4">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span className="text-yellow-400">~200 000 FCFA</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeDrone === 'recon' && (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Structure + moteurs + FC</span>
                        <span className="font-semibold">90 000 FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Capteurs multi-spectraux</span>
                        <span className="font-semibold">200 000 - 400 000 FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Jetson Nano + IA</span>
                        <span className="font-semibold">150 000 FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Batteries + GPS + antennes</span>
                        <span className="font-semibold">80 000 FCFA</span>
                      </div>
                      <div className="border-t pt-2 mt-4">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span className="text-yellow-400">~500 000 - 750 000 FCFA</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeDrone === 'sentinel' && (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Structure aile fixe (ARF/PNP)</span>
                        <span className="font-semibold">200 000 - 400 000 FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Moteur + ESC + servo</span>
                        <span className="font-semibold">100 000 FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Caméras HD + thermique</span>
                        <span className="font-semibold">150 000 - 300 000 FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GPS + antenne longue portée</span>
                        <span className="font-semibold">80 000 FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Autopilote + télémétrie</span>
                        <span className="font-semibold">120 000 FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lidar + modules IA</span>
                        <span className="font-semibold">150 000 - 250 000 FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Batteries et accessoires</span>
                        <span className="font-semibold">100 000 FCFA</span>
                      </div>
                      <div className="border-t pt-2 mt-4">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span className="text-yellow-400">~800 000 - 1 300 000 FCFA</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeDrone === 'atlas' && (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Frame hexacoptère renforcé</span>
                        <span className="font-semibold">400 000 FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Moteurs haute puissance (x6)</span>
                        <span className="font-semibold">300 000 FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ESC haute puissance (x6)</span>
                        <span className="font-semibold">180 000 FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pixhawk 4 + GPS haute précision</span>
                        <span className="font-semibold">250 000 FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Caméras HD 4K + navigation</span>
                        <span className="font-semibold">200 000 FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Module de transport 15kg</span>
                        <span className="font-semibold">300 000 FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Système de pulvérisation</span>
                        <span className="font-semibold">150 000 FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conteneur médical + collecteur</span>
                        <span className="font-semibold">200 000 FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Batteries haute capacité</span>
                        <span className="font-semibold">320 000 FCFA</span>
                      </div>
                      <div className="border-t pt-2 mt-4">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span className="text-yellow-400">~2 500 000 FCFA</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Shopping List */}
              <div className="bg-white/5 rounded-xl p-6">
                <h4 className="text-xl font-bold mb-4 text-orange-400">🛒 Liste d'Achat Recommandée</h4>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h5 className="font-semibold mb-2">Sources d'approvisionnement</h5>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• AliExpress - Composants électroniques</li>
                      <li>• Banggood - Moteurs et ESC</li>
                      <li>• Amazon - Contrôleurs de vol</li>
                      <li>• Fournisseurs locaux - Batteries</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h5 className="font-semibold mb-2">Outils nécessaires</h5>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Fer à souder + étain</li>
                      <li>• Tournevis cruciforme</li>
                      <li>• Multimètre</li>
                      <li>• Pince à dénuder</li>
                      <li>• Imprimante 3D (optionnel)</li>
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h5 className="font-semibold mb-2">Livraison estimée</h5>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Chine: 15-30 jours</li>
                      <li>• Europe: 5-10 jours</li>
                      <li>• Local: 1-3 jours</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8">
          <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-2xl p-6 border border-red-500/20">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">⚠️</div>
              <div>
                <h4 className="font-bold mb-2">Avertissement de Sécurité</h4>
                <p className="text-sm text-gray-300">
                  Ces codes sont destinés à des fins éducatives et de recherche. 
                  Respectez les réglementations locales et utilisez de manière responsable.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparative Table */}
        <div className="mt-8">
          <div className="bg-gradient-to-br from-indigo-900/30 to-blue-900/30 rounded-2xl p-8 border border-indigo-500/20">
            <h3 className="text-2xl font-bold mb-6 text-center text-indigo-400">📊 Tableau Comparatif des Drones</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-indigo-500/30">
                    <th className="text-left p-3 text-indigo-300">Caractéristique</th>
                    <th className="text-center p-3 text-red-400">FPV Kamikaze</th>
                    <th className="text-center p-3 text-blue-400">ReconX</th>
                    <th className="text-center p-3 text-green-400">Sentinel</th>
                    <th className="text-center p-3 text-purple-400">Atlas X1</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-indigo-500/20">
                    <td className="p-3 font-semibold">Type</td>
                    <td className="p-3 text-center">Tactique Offensif</td>
                    <td className="p-3 text-center">Reconnaissance IA</td>
                    <td className="p-3 text-center">Surveillance Longue Portée</td>
                    <td className="p-3 text-center">Transport Industriel</td>
                  </tr>
                  <tr className="border-b border-indigo-500/20">
                    <td className="p-3 font-semibold">Poids</td>
                    <td className="p-3 text-center">320g - 450g</td>
                    <td className="p-3 text-center">~520g</td>
                    <td className="p-3 text-center">1.2 - 1.8kg</td>
                    <td className="p-3 text-center">~8kg</td>
                  </tr>
                  <tr className="border-b border-indigo-500/20">
                    <td className="p-3 font-semibold">Charge Utile</td>
                    <td className="p-3 text-center">250g (explosif)</td>
                    <td className="p-3 text-center">350g max</td>
                    <td className="p-3 text-center">300 - 700g</td>
                    <td className="p-3 text-center">Jusqu'à 15kg</td>
                  </tr>
                  <tr className="border-b border-indigo-500/20">
                    <td className="p-3 font-semibold">Autonomie</td>
                    <td className="p-3 text-center">6-8 min</td>
                    <td className="p-3 text-center">25-35 min</td>
                    <td className="p-3 text-center">90-180 min</td>
                    <td className="p-3 text-center">45-60 min</td>
                  </tr>
                  <tr className="border-b border-indigo-500/20">
                    <td className="p-3 font-semibold">Portée</td>
                    <td className="p-3 text-center">5-10 km</td>
                    <td className="p-3 text-center">8 km</td>
                    <td className="p-3 text-center">80-120 km</td>
                    <td className="p-3 text-center">20-50 km</td>
                  </tr>
                  <tr className="border-b border-indigo-500/20">
                    <td className="p-3 font-semibold">Altitude Max</td>
                    <td className="p-3 text-center">500m</td>
                    <td className="p-3 text-center">1000m</td>
                    <td className="p-3 text-center">3000m</td>
                    <td className="p-3 text-center">120m</td>
                  </tr>
                  <tr className="border-b border-indigo-500/20">
                    <td className="p-3 font-semibold">Coût</td>
                    <td className="p-3 text-center">200k FCFA</td>
                    <td className="p-3 text-center">500-750k FCFA</td>
                    <td className="p-3 text-center">800k-1.3M FCFA</td>
                    <td className="p-3 text-center">2.5M FCFA</td>
                  </tr>
                  <tr className="border-b border-indigo-500/20">
                    <td className="p-3 font-semibold">Usage Principal</td>
                    <td className="p-3 text-center">Neutralisation</td>
                    <td className="p-3 text-center">Détection Mines</td>
                    <td className="p-3 text-center">Surveillance</td>
                    <td className="p-3 text-center">Transport</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Complexité</td>
                    <td className="p-3 text-center">⭐</td>
                    <td className="p-3 text-center">⭐⭐⭐</td>
                    <td className="p-3 text-center">⭐⭐⭐⭐</td>
                    <td className="p-3 text-center">⭐⭐⭐⭐⭐</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="mt-12 text-center">
        <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-500/20">
          <h3 className="text-2xl font-bold mb-4">Besoin d'aide pour l'implémentation ?</h3>
          <p className="text-gray-300 mb-6">
            Contactez-nous pour un support technique ou une formation personnalisée
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/contact" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
              📞 Support technique
            </Link>
            <Link href="/formations" className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300">
              🎓 Formation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 