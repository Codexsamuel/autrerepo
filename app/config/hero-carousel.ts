export interface HeroMediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  alt: string;
  title: string;
  subtitle?: string;
  description?: string;
  category?: string;
  tags?: string[];
}

export const heroCarouselConfig: HeroMediaItem[] = [
  {
    id: 'nova-ia-intelligence',
    type: 'image',
    url: 'https://res.cloudinary.com/dko5sommz/image/upload/v1753347000/ChatGPT_Image_24_juil._2025_a%CC%80_10_49_27_s4nem8.png',
    alt: 'DL Solutions - Intelligence Artificielle',
    title: 'NovaIA - Centre d\'Intelligence Artificielle',
    subtitle: 'Transformez votre vision en réalité digitale',
    description: 'Découvrez notre écosystème d\'agents IA ultra-avancé avec protocoles A2A/MCP et système de battle ELO',
    category: 'Intelligence Artificielle',
    tags: ['IA', 'NovaIA', 'Agents', 'Machine Learning']
  },
  {
    id: 'services-premium',
    type: 'image',
    url: 'https://res.cloudinary.com/dko5sommz/image/upload/v1753345914/ChatGPT_Image_24_juil._2025_a%CC%80_10_31_05_yumpmy.png',
    alt: 'DL Solutions - Services Premium',
    title: 'Solutions Premium en IA et Développement',
    subtitle: 'Excellence technologique à votre service',
    description: 'Services de pointe en intelligence artificielle, développement web et transformation digitale',
    category: 'Services',
    tags: ['Développement', 'IA', 'Premium', 'Solutions']
  },
  {
    id: 'equipe-experts',
    type: 'image',
    url: 'https://res.cloudinary.com/dko5sommz/image/upload/v1753345529/ChatGPT_Image_23_juil._2025_a%CC%80_12_19_03_mramii.png',
    alt: 'DL Solutions - Équipe',
    title: 'Notre Équipe d\'Experts',
    subtitle: 'Passionnés par l\'innovation et la technologie',
    description: 'Une équipe d\'experts dédiés à transformer vos idées en solutions digitales performantes',
    category: 'Équipe',
    tags: ['Experts', 'Innovation', 'Technologie', 'Équipe']
  },
  {
    id: 'evenements-presentations',
    type: 'image',
    url: 'https://res.cloudinary.com/dko5sommz/image/upload/v1753345483/ChatGPT_Image_23_juil._2025_a%CC%80_12_18_35_zxyefh.png',
    alt: 'DL Solutions - Événements',
    title: 'Nos Événements et Présentations',
    subtitle: 'Partageons notre expertise avec le monde',
    description: 'Découvrez nos événements et présentations professionnelles dans le domaine de la technologie',
    category: 'Événements',
    tags: ['Événements', 'Présentations', 'Expertise', 'Technologie']
  },
  {
    id: 'realisations-medias',
    type: 'image',
    url: 'https://res.cloudinary.com/dko5sommz/image/upload/v1753345477/ChatGPT_Image_23_juil._2025_a%CC%80_12_18_22_bspoxy.png',
    alt: 'DL Solutions - Réalisations',
    title: 'Nos Réalisations Médias',
    subtitle: 'Qualité professionnelle dans chaque projet',
    description: 'Portfolio de nos productions vidéo et photos professionnelles de haute qualité',
    category: 'Réalisations',
    tags: ['Médias', 'Vidéo', 'Photo', 'Professionnel']
  },
  {
    id: 'portfolio-projets',
    type: 'image',
    url: 'https://res.cloudinary.com/dko5sommz/image/upload/v1753345468/ChatGPT_Image_23_juil._2025_a%CC%80_12_18_18_elvnyw.png',
    alt: 'DL Solutions - Portfolio',
    title: 'Portfolio de Projets',
    subtitle: 'Innovation et créativité au service de vos objectifs',
    description: 'Découvrez nos projets les plus innovants et créatifs dans le domaine digital',
    category: 'Portfolio',
    tags: ['Projets', 'Innovation', 'Créativité', 'Digital']
  },
  {
    id: 'presentation-equipe',
    type: 'image',
    url: 'https://res.cloudinary.com/dko5sommz/image/upload/v1749401790/WhatsApp_Image_2025-06-06_at_22.54.43_xcrifx.jpg',
    alt: 'DL Solutions - Présentation',
    title: 'Présentation de l\'Équipe',
    subtitle: 'Connaissez-nous mieux',
    description: 'Présentation détaillée de notre équipe et de nos valeurs',
    category: 'Équipe',
    tags: ['Équipe', 'Présentation', 'Valeurs', 'Culture']
  },
  {
    id: 'video-presentation',
    type: 'video',
    url: 'https://res.cloudinary.com/dko5sommz/video/upload/v1749401792/WhatsApp_Video_2025-06-06_at_22.54.45_drvh4l.mp4',
    alt: 'DL Solutions - Vidéo Présentation',
    title: 'Vidéo de Présentation',
    subtitle: 'Découvrez DL Solutions en vidéo',
    description: 'Vidéo de présentation de nos services et de notre expertise',
    category: 'Présentation',
    tags: ['Vidéo', 'Présentation', 'Services', 'Expertise']
  },
  {
    id: 'best-shot-1',
    type: 'image',
    url: 'https://res.cloudinary.com/dko5sommz/image/upload/v1754855919/WhatsApp_Image_2025-08-10_at_21.49.27_i0dlrs.jpg',
    alt: 'DL Solutions - Meilleure Prise Photographique #1',
    title: 'Excellence Photographique',
    subtitle: 'Une de nos meilleures réalisations',
    description: 'Découvrez l\'excellence de notre cadreur professionnel à travers ses meilleures prises',
    category: 'Photographie',
    tags: ['Photographie', 'Professionnel', 'Excellence', 'Cadreur']
  },
  {
    id: 'best-shot-2',
    type: 'image',
    url: 'https://res.cloudinary.com/dko5sommz/image/upload/v1754855895/WhatsApp_Image_2025-08-10_at_21.49.28_1_srbxxr.jpg',
    alt: 'DL Solutions - Meilleure Prise Photographique #2',
    title: 'Créativité et Technique',
    subtitle: 'Excellence dans chaque cliché',
    description: 'L\'alliance parfaite entre créativité artistique et maîtrise technique',
    category: 'Photographie',
    tags: ['Photographie', 'Créativité', 'Technique', 'Art']
  }
];

// Configuration du carrousel
export const carouselSettings = {
  autoPlay: true,
  autoPlaySpeed: 5000, // 5 secondes
  showArrows: true,
  showIndicators: true,
  showPlayPause: true,
  showCounter: true,
  transitionDuration: 1000, // 1 seconde
  pauseOnHover: true,
  infinite: true,
  responsive: {
    mobile: {
      breakpoint: 768,
      settings: {
        autoPlay: false,
        showArrows: false
      }
    }
  }
};

// Fonctions utilitaires
export const getMediaByCategory = (category: string) => {
  return heroCarouselConfig.filter(item => item.category === category);
};

export const getMediaByTag = (tag: string) => {
  return heroCarouselConfig.filter(item => item.tags?.includes(tag));
};

export const getRandomMedia = () => {
  const randomIndex = Math.floor(Math.random() * heroCarouselConfig.length);
  return heroCarouselConfig[randomIndex];
}; 