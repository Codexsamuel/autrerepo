# Section "Nos Services en Vidéo" - Documentation

## Vue d'ensemble

Cette section a été ajoutée à la page d'accueil de DL Solutions pour présenter nos services à travers des vidéos explicatives et nos meilleures réalisations photographiques.

## Composants créés

### 1. OurServicesSection.tsx
- **Localisation** : `components/ui/OurServicesSection.tsx`
- **Fonctionnalités** :
  - Affichage des vidéos explicatives de nos services
  - Présentation de notre équipe en vidéo
  - Détails sur DL Solutions
  - Galerie des meilleures prises photographiques
  - Contrôles vidéo personnalisés (play/pause, mute/unmute)

### 2. Page de test
- **Localisation** : `app/test-services-section/page.tsx`
- **URL** : `/test-services-section`
- **Usage** : Test isolé du composant OurServicesSection

## Contenu multimédia intégré

### Vidéos explicatives
1. **Nos Services en Vidéo** 
   - URL : `https://res.cloudinary.com/dko5sommz/video/upload/v1754855912/WhatsApp_Video_2025-08-10_at_21.49.26_1_ipwrcg.mp4`
   - Description : Explication claire de nos services

2. **Présentation de Mon Équipe**
   - URL : `https://res.cloudinary.com/dko5sommz/video/upload/v1754855904/WhatsApp_Video_2025-08-10_at_21.49.26_pidiys.mp4`
   - Description : Présentation des experts de l'équipe

3. **DL Solutions en Détails**
   - URL : `https://res.cloudinary.com/dko5sommz/video/upload/v1754848536/WhatsApp_Video_2025-08-10_at_16.47.48_oxartj.mp4`
   - Description : Présentation complète de DL Solutions

### Images du cadreur
1. **Meilleure Prise #1**
   - URL : `https://res.cloudinary.com/dko5sommz/image/upload/v1754855919/WhatsApp_Image_2025-08-10_at_21.49.27_i0dlrs.jpg`
   - Description : Excellence photographique professionnelle

2. **Meilleure Prise #2**
   - URL : `https://res.cloudinary.com/dko5sommz/image/upload/v1754855895/WhatsApp_Image_2025-08-10_at_21.49.28_1_srbxxr.jpg`
   - Description : Créativité et technique combinées

## Intégration dans le carrousel hero

Les deux images du cadreur ont également été ajoutées au carrousel hero principal :
- **Catégorie** : Photographie
- **Tags** : Photographie, Professionnel, Excellence, Cadreur, Créativité, Technique, Art

## Fonctionnalités techniques

### Contrôles vidéo
- Boutons play/pause personnalisés
- Contrôle du volume (mute/unmute)
- Overlay de contrôle avec gradient
- Gestion d'état pour chaque vidéo

### Responsive design
- Grille adaptative (md:grid-cols-2 lg:grid-cols-3)
- Images et vidéos optimisées pour mobile
- Transitions et animations fluides

### Accessibilité
- Attributs alt pour les images
- Descriptions détaillées pour chaque média
- Navigation au clavier supportée

## Utilisation

### Dans la page d'accueil
```tsx
import OurServicesSection from '@/components/ui/OurServicesSection';

// Dans le JSX
<OurServicesSection />
```

### Page de test dédiée
```tsx
// Accéder à /test-services-section pour tester le composant
```

## Personnalisation

### Modifier les vidéos
Éditer le tableau `videoServices` dans `OurServicesSection.tsx`

### Modifier les images
Éditer le tableau `bestShots` dans `OurServicesSection.tsx`

### Styling
Le composant utilise Tailwind CSS avec des classes personnalisables :
- Couleurs : `from-gray-50 to-blue-50`
- Espacement : `py-20 px-4`
- Grilles : `md:grid-cols-2 lg:grid-cols-3`

## Maintenance

### Vérifications régulières
- Test des URLs Cloudinary
- Vérification de la qualité des vidéos
- Optimisation des images

### Mises à jour
- Ajout de nouvelles vidéos
- Rotation des meilleures prises
- Amélioration des contrôles vidéo

## Support

Pour toute question ou modification, consulter :
- Le composant principal : `components/ui/OurServicesSection.tsx`
- La page de test : `app/test-services-section/page.tsx`
- La configuration du carrousel : `app/config/hero-carousel.ts` 