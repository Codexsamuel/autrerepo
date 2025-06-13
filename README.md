# DL Solutions - Plateforme de Transformation Digitale

## 🚀 Vue d'ensemble

DL Solutions est une plateforme complète de transformation digitale offrant des services d'Intelligence Artificielle, CRM, e-commerce, et formations professionnelles. **Nouveau : Intégration de l'IA DAVY et modules RH intelligents.**

## ✨ Fonctionnalités

### 🤖 IA DAVY - Assistant Vocal Intelligent
- **Reconnaissance vocale** en temps réel (français)
- **Synthèse vocale** naturelle pour les réponses
- **Actions intelligentes** : Création de documents, emails, CRM, RH
- **Interface flottante** non intrusive avec animations
- **Navigation par clavier** et commandes vocales
- **Apprentissage continu** et recommandations IA

### 📄 Générateur de Documents Intelligents
- **4 modèles prêts** : Contrats, Fiches de caisse, Rapports, RH
- **Prévisualisation en temps réel** des documents
- **Validation automatique** des champs obligatoires
- **Export PDF/Word** (en développement)
- **Liens publics sécurisés** pour partage externe
- **Interface intuitive** avec onglets et animations

### 👥 Dashboard RH avec IA
- **Statistiques en temps réel** : Employés, Performance, Salaires
- **Alertes intelligentes** : Contrats expirants, Performance, Congés
- **Insights IA** : Analyse automatique des données RH
- **Gestion des employés** avec avatars et statuts
- **Suivi des performances** et objectifs
- **Interface responsive** avec animations

### 🔍 Barre de Recherche Intelligente
- Recherche en temps réel dans tous les services
- Navigation par clavier (flèches, Entrée, Échap)
- Catégorisation des résultats (Services, Pages, Formations)
- Interface responsive et moderne

### 🎯 Services Disponibles
- **NovaCore CRM** : Système de gestion de la relation client avec IA
- **NovaWorld** : Réseau social B2B professionnel
- **DL Style** : Boutique en ligne premium
- **DL Travel** : Plateforme de vente de billets d'avion
- **DL Bookmaker** : Paris sportifs assistés par IA

### 📚 Formations
- Marketing Digital
- IA pour Entreprises
- E-commerce & Vente
- Télévente & Prospection
- SAV Excellence

## 🛠️ Nouvelles Fonctionnalités IA

### Assistant DAVY
```bash
# Commandes vocales supportées
"Créer un document" → Génération de contrats/rapports
"Envoyer un email" → Composition d'emails
"Mettre à jour CRM" → Modification données clients
"Tâche RH" → Gestion ressources humaines
"Rechercher" → Recherche dans la base
"Aide" → Liste des commandes
```

### Générateur de Documents
- **Contrat Partenaire** : Modèle complet avec conditions
- **Fiche de Caisse** : Sortie de caisse avec validation
- **Contrat Collaborateur** : Embauchage avec période d'essai
- **Rapport Journalier** : Suivi d'activité quotidien

### Dashboard RH
- **5 employés simulés** avec données complètes
- **4 types d'alertes** : Contrats, Performance, Congés, Anniversaires
- **Analyse IA** : Insights automatiques sur les données
- **Statistiques avancées** : Masse salariale, performance moyenne

## 🐳 Déploiement avec Docker

### Prérequis
- Docker
- Docker Compose

### Déploiement Rapide

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd projetversel
   ```

2. **Déployer avec Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **Accéder à l'application**
   ```
   http://localhost:3000
   http://localhost:3000/admin (Nouveau : Interface Admin)
   ```

### Commandes Docker Utiles

```bash
# Construire l'image
docker build -t dl-solutions .

# Lancer le conteneur
docker run -p 3000:3000 dl-solutions

# Voir les logs
docker-compose logs -f

# Arrêter les services
docker-compose down

# Reconstruire et redémarrer
docker-compose up -d --build
```

## 🛠️ Développement Local

### Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Lancer en mode production
npm start
```

### Scripts Disponibles

- `npm run dev` : Serveur de développement
- `npm run build` : Build de production
- `npm run start` : Serveur de production
- `npm run lint` : Vérification du code

## 🎨 Interface Utilisateur

### Centrage et Responsive Design
- Interface centrée avec `max-w-screen-2xl mx-auto`
- Design responsive pour tous les écrans
- Navigation optimisée pour mobile et desktop

### Barre de Recherche
- Recherche instantanée
- Résultats catégorisés
- Navigation au clavier
- Interface intuitive

### Assistant DAVY
- Bouton flottant animé
- Interface modale avec backdrop blur
- Animations Framer Motion
- Indicateurs de statut en temps réel

### Dashboard RH
- Cartes statistiques animées
- Onglets interactifs
- Graphiques de performance
- Alertes colorées par sévérité

## 🔧 Configuration

### Variables d'Environnement

```env
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=3000
HOSTNAME=0.0.0.0
```

### Configuration Next.js

- Mode standalone activé pour Docker
- Optimisations CSS et imports
- Compression activée
- Headers de sécurité configurés

### Dépendances IA

```json
{
  "framer-motion": "^11.0.0",
  "@radix-ui/react-progress": "^1.0.0",
  "@radix-ui/react-avatar": "^1.0.0",
  "@radix-ui/react-label": "^2.0.0",
  "@radix-ui/react-tabs": "^1.0.0",
  "@radix-ui/react-select": "^2.0.0"
}
```

## 📱 Compatibilité

- **Navigateurs** : Chrome, Firefox, Safari, Edge
- **Écrans** : Desktop, Tablet, Mobile
- **Systèmes** : Windows, macOS, Linux
- **Reconnaissance vocale** : Chrome, Edge (Web Speech API)

## 🚀 Performance

- Images optimisées (WebP, AVIF)
- Compression activée
- Lazy loading des composants
- Optimisations CSS et JavaScript
- Animations optimisées avec Framer Motion

## 🔒 Sécurité

- Headers de sécurité configurés
- Validation des formulaires
- Liens publics sécurisés
- Cryptage des données sensibles (en développement)

## 📞 Support

- **Email** : sobam@daveandlucesolutions.com
- **Téléphone** : +237 694 341 586
- **Adresse** : 2 rue École de Police, Yaoundé, Cameroun

## 📄 Licence

© 2024 DL Solutions SARL. Tous droits réservés.

---

**Powered by NovaCore AI & DAVY Assistant | Made with ❤️ in Cameroon**

### 🎯 Prochaines Fonctionnalités

- [ ] Intégration OpenAI GPT-4o pour DAVY
- [ ] Export PDF avec jsPDF
- [ ] Export Word avec docx.js
- [ ] Base de données Supabase
- [ ] Authentification Clerk
- [ ] Paiements Stripe/CinetPay
- [ ] API ElevenLabs pour voix
- [ ] Intégration Telegram/Discord

# Interface d'Édition Vidéo IA

Cette interface permet d'accéder facilement aux différents logiciels d'édition vidéo (CapCut, Canva, Adobe Premiere Pro) pour effectuer des montages vidéo.

## Prérequis

- Python 3.x
- macOS (pour les chemins d'installation par défaut)
- Les logiciels suivants installés (optionnel) :
  - CapCut
  - Adobe Premiere Pro
  - Navigateur web pour Canva

## Installation

1. Clonez ce dépôt
2. Installez les dépendances :
```bash
pip install -r requirements.txt
```

## Utilisation

1. Lancez l'interface :
```bash
python video_editor_interface.py
```

2. Sélectionnez l'éditeur vidéo souhaité en cliquant sur le bouton correspondant :
   - CapCut : Ouvre l'application CapCut si elle est installée
   - Canva : Ouvre Canva dans votre navigateur web
   - Adobe Premiere Pro : Ouvre Adobe Premiere Pro si il est installé

## Fonctionnalités

- Interface graphique simple et intuitive
- Accès rapide aux principaux éditeurs vidéo
- Gestion des erreurs si les applications ne sont pas installées
- Statut en temps réel des opérations

## Note

L'interface vérifie si les applications sont installées aux emplacements par défaut sur macOS. Si vous utilisez un autre système d'exploitation ou si les applications sont installées ailleurs, vous devrez modifier les chemins dans le code source.

# CRM - Éditeur Vidéo

Une interface complète qui combine la gestion de projets (CRM) avec des outils d'édition vidéo professionnels.

## Fonctionnalités

### Gestion des Projets (CRM)
- Création et gestion de projets vidéo
- Suivi des clients
- Statut des projets (En attente, En cours, Terminé, Livré)
- Sauvegarde automatique des données

### Édition Vidéo
- Intégration avec les logiciels professionnels :
  - CapCut
  - Canva
  - Adobe Premiere Pro
- Prévisualisation des vidéos
- Importation de fichiers vidéo
- Contrôles de lecture (play, pause, stop)

## Prérequis

- Python 3.x
- macOS (pour les chemins d'installation par défaut)
- Les logiciels suivants installés (optionnel) :
  - CapCut
  - Adobe Premiere Pro
  - Navigateur web pour Canva

## Installation

1. Clonez ce dépôt
2. Installez les dépendances :
```bash
pip install -r requirements.txt
```

## Utilisation

1. Lancez l'application :
```bash
python crm_video_editor.py
```

2. Gestion des projets :
   - Cliquez sur "Nouveau Projet" pour créer un projet
   - Remplissez les détails du projet (nom, client, statut)
   - Sauvegardez les modifications

3. Édition vidéo :
   - Sélectionnez un projet
   - Importez une vidéo
   - Utilisez les contrôles de prévisualisation
   - Ouvrez l'éditeur vidéo de votre choix

## Structure des Données

Les projets sont sauvegardés dans un fichier `projects.json` avec les informations suivantes :
- ID du projet
- Nom du projet
- Client
- Statut
- Date de création
- Chemin du fichier vidéo

## Note

L'interface vérifie si les applications sont installées aux emplacements par défaut sur macOS. Si vous utilisez un autre système d'exploitation ou si les applications sont installées ailleurs, vous devrez modifier les chemins dans le code source.

# NovaCore - Hub Central

Une plateforme complète qui intègre la gestion de projets, l'édition vidéo et le suivi client dans une interface unifiée.

## Fonctionnalités Principales

### Hub Central
- Tableau de bord personnalisé
- Navigation intuitive
- Statistiques en temps réel
- Gestion centralisée

### CRM Vidéo
- Intégration avec les logiciels professionnels :
  - CapCut
  - Canva
  - Adobe Premiere Pro
- Gestion des projets vidéo
- Prévisualisation des vidéos
- Suivi des clients

### Gestion des Projets
- Vue d'ensemble des projets
- Suivi des statuts
- Gestion des délais
- Association clients-projets

### Gestion des Clients
- Base de données clients
- Historique des projets
- Suivi des interactions
- Statistiques clients

### Rapports et Statistiques
- Rapports mensuels
- Statistiques clients
- Performance des projets
- Métriques d'édition

## Prérequis

- Python 3.x
- macOS (pour les chemins d'installation par défaut)
- Les logiciels suivants installés (optionnel) :
  - CapCut
  - Adobe Premiere Pro
  - Navigateur web pour Canva

## Installation

1. Clonez ce dépôt
2. Installez les dépendances :
```bash
pip install -r requirements.txt
```

## Utilisation

1. Lancez l'application :
```bash
python novacore_integration.py
```

2. Navigation :
   - Utilisez la barre latérale pour accéder aux différentes sections
   - Le tableau de bord affiche les statistiques principales
   - Accédez au CRM vidéo pour l'édition
   - Gérez les projets et clients dans leurs sections respectives

3. CRM Vidéo :
   - Créez et gérez des projets vidéo
   - Importez et prévisualisez des vidéos
   - Utilisez les outils d'édition intégrés

4. Gestion des Projets :
   - Suivez l'état des projets
   - Gérez les délais et livraisons
   - Associez les projets aux clients

5. Gestion des Clients :
   - Maintenez la base de données clients
   - Suivez les interactions
   - Gérez les projets par client

## Structure des Données

Les données sont sauvegardées dans des fichiers JSON :
- `projects.json` : Projets et leurs détails
- `clients.json` : Informations clients
- `settings.json` : Paramètres utilisateur

## Note

L'interface vérifie si les applications sont installées aux emplacements par défaut sur macOS. Si vous utilisez un autre système d'exploitation ou si les applications sont installées ailleurs, vous devrez modifier les chemins dans le code source.
