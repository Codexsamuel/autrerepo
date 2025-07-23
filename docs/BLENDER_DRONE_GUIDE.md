# 🛰️ Guide Blender - Génération Automatique des Drones DL

Ce guide explique comment utiliser les scripts Python Blender pour générer automatiquement les modèles 3D détaillés des drones **Sentinel V1** et **Atlas X1**.

## 📋 Prérequis

- **Blender 3.0+** (recommandé : Blender 4.0+)
- Connaissances de base de Blender
- Les scripts Python fournis

## 🚀 Installation et Utilisation

### Étape 1 : Préparer Blender

1. **Ouvrir Blender**
2. **Aller dans l'éditeur de texte** (onglet "Scripting")
3. **Créer un nouveau fichier texte**

### Étape 2 : Charger le Script Principal

1. **Copier le contenu** de `scripts/blender_drone_generator.py`
2. **Coller dans l'éditeur de texte** Blender
3. **Sauvegarder** le fichier (Ctrl+S)

### Étape 3 : Exécuter le Script

1. **Cliquer sur "Run Script"** (ou Alt+P)
2. **Attendre la génération** (quelques secondes)
3. **Vérifier dans la scène 3D** que les drones sont créés

### Étape 4 : Export des Modèles

1. **Charger le script d'export** `scripts/export_drones.py`
2. **Exécuter le script d'export**
3. **Récupérer les fichiers** dans le dossier `exports/`

## 🎯 Fonctionnalités du Script

### ✅ Ce que le script génère automatiquement :

#### **Sentinel V1 (Drone Militaire)**

- ✅ Corps principal (design furtif angulaire)
- ✅ 4 bras articulés en fibre de carbone
- ✅ 4 moteurs brushless tactiques
- ✅ 4 hélices de propulsion
- ✅ Caméra thermique frontale
- ✅ Module IA embarqué
- ✅ Batterie LiPo 4S
- ✅ Antennes GPS et communication
- ✅ Système de charge explosive (crochets)
- ✅ LED tactiques rouges
- ✅ Matériaux réalistes (noir mat, métallique)

#### **Atlas X1 (Drone Industriel)**

- ✅ Corps principal robuste (gris/blanc)
- ✅ 4 bras articulés renforcés
- ✅ 4 moteurs industriels puissants
- ✅ 8 hélices doubles (2 par bras)
- ✅ Réservoir de pulvérisation transparent
- ✅ Pompe de pulvérisation
- ✅ Caméra 4K stabilisée
- ✅ Capteur de sol
- ✅ Batterie industrielle 6S
- ✅ Module GPS et communication
- ✅ 3 antennes spécialisées
- ✅ Support médical (crochet rouge)
- ✅ Matériaux industriels (résistant, étanche)

### 🎨 Matériaux et Rendu

Le script configure automatiquement :

- **Matériaux PBR** (Physically Based Rendering)
- **Éclairage professionnel** (Soleil + lumière d'appoint)
- **Caméra optimisée** pour le rendu
- **Moteur de rendu Cycles** pour la qualité

## 📁 Structure des Fichiers Exportés

```
exports/
├── sentinel_v1_20241201_143022.glb      # Sentinel V1 (format binaire)
├── sentinel_v1_20241201_143022.gltf     # Sentinel V1 (format texte)
├── atlas_x1_20241201_143022.glb         # Atlas X1 (format binaire)
├── atlas_x1_20241201_143022.gltf        # Atlas X1 (format texte)
└── dl_drones_complete_20241201_143022.glb # Scène complète
```

## 🔧 Personnalisation Avancée

### Modifier les Dimensions

Dans le script, vous pouvez ajuster :

```python
# Sentinel V1 - Corps principal
body = create_box("Sentinel_Body", (0.4, 0.4, 0.12), (0, 0, 0.06))

# Atlas X1 - Corps principal
body = create_box("Atlas_Body", (0.5, 0.5, 0.15), (0, 0, 0.075))
```

### Changer les Couleurs

```python
# Matériau noir mat pour le Sentinel
body_material = create_material("Sentinel_Body_Material", (0.02, 0.02, 0.02, 1), 0.8, 0.2)

# Matériau gris pour l'Atlas
body_material = create_material("Atlas_Body_Material", (0.8, 0.8, 0.8, 1), 0.1, 0.7)
```

### Ajouter de Nouvelles Parties

```python
# Exemple : ajouter un capteur supplémentaire
sensor = create_sphere("New_Sensor", 0.02, (0.1, 0.1, 0.1))
sensor_material = create_material("Sensor_Material", (0.1, 0.8, 0.1, 1), 0.9, 0.1)
sensor.data.materials.append(sensor_material)
```

## 🌐 Intégration Web

### Pour Three.js/React Three Fiber

```javascript
import { useGLTF } from "@react-three/drei";

function DroneModel({ droneType }) {
  const { nodes, materials } = useGLTF(`/models/${droneType}.glb`);

  return <group>{/* Utiliser les nodes et materials exportés */}</group>;
}
```

### Pour Next.js

```javascript
// Dans next.config.js
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next/static/files",
          outputPath: "static/files",
        },
      },
    });
    return config;
  },
};
```

## 🎬 Animations (Optionnel)

Pour ajouter des animations :

```python
# Exemple : rotation des hélices
def animate_propellers():
    for i in range(4):
        propeller = bpy.data.objects[f"Sentinel_Propeller_{i+1}"]

        # Ajouter une animation de rotation
        propeller.rotation_euler = (0, 0, 0)
        propeller.keyframe_insert(data_path="rotation_euler", frame=1)

        propeller.rotation_euler = (0, 0, 6.28)  # 360 degrés
        propeller.keyframe_insert(data_path="rotation_euler", frame=30)
```

## 🐛 Dépannage

### Erreurs Courantes

1. **"Module not found"**

   - Vérifier que Blender 3.0+ est installé
   - Redémarrer Blender

2. **"Material not found"**

   - Le script crée automatiquement les matériaux
   - Vérifier que le script s'est exécuté complètement

3. **"Export failed"**
   - Vérifier les permissions du dossier d'export
   - Créer manuellement le dossier `exports/`

### Optimisations

- **Réduire la qualité** : `bpy.context.scene.cycles.samples = 64`
- **Exporter sans textures** : `export_textures=False`
- **Compresser les fichiers** : utiliser des outils externes

## 📞 Support

Pour toute question ou problème :

- 📧 contact@dl-solutions.tech
- 📞 +237 6 89 67 29 32
- 🌐 Documentation complète dans le repo

---

**Version :** 1.0  
**Dernière mise à jour :** Décembre 2024  
**Compatibilité :** Blender 3.0+  
**Auteur :** DL Solutions
