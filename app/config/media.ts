import { optimizeVideoUrl } from '@/lib/cloudinary-utils';

export const mediaConfig = {
  // Images de l'équipe
  team: {
    directeur: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
    mascotte: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401791/WhatsApp_Image_2025-06-06_at_22.54.12_mxcqen.jpg",
    samuel: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407333/samuel_milzt6.png",
    lucie: "https://res.cloudinary.com/dko5sommz/image/upload/v1748393838/Lucie_lexs2m.jpg",
    christian: "https://res.cloudinary.com/dko5sommz/image/upload/v1749425661/CHRISTIAN_ESSONO_thisjg.jpg",
    franck: "https://res.cloudinary.com/dko5sommz/image/upload/v1749425681/FRANCK_MARIEN_BECKAM_arwwpq.jpg"
  },

  // Images de leadership
  leadership: {
    leadership1: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_22.54.44_hcykoe.jpg",
    leadership2: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
    leadership3: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401791/WhatsApp_Image_2025-06-06_at_22.54.12_mxcqen.jpg"
  },

  // Vidéos d'événements - URLs optimisées pour le streaming
  events: {
    institutFrancais: optimizeVideoUrl("https://res.cloudinary.com/dko5sommz/video/upload/v1750840734/a_l_instititu_francais_de_yaounde_flojif.mp4", { quality: 'auto', format: 'mp4' }),
    reportageAgence: optimizeVideoUrl("https://res.cloudinary.com/dko5sommz/video/upload/v1750841005/WhatsApp_Video_2025-06-05_at_01.41.08_zau0s5.mp4", { quality: 'auto', format: 'mp4' }),
    evenementInstitut: optimizeVideoUrl("https://res.cloudinary.com/dko5sommz/video/upload/v1750840992/evenement_a_l_institu_francais_ajicak.mp4", { quality: 'auto', format: 'mp4' }),
    teasingUCAC: optimizeVideoUrl("https://res.cloudinary.com/dko5sommz/video/upload/v1750840982/teasing_UCAC_mllc2k.mp4", { quality: 'auto', format: 'mp4' }),
    ucac: optimizeVideoUrl("https://res.cloudinary.com/dko5sommz/video/upload/v1750840961/UCAC_t3lduu.mp4", { quality: 'auto', format: 'mp4' })
  },

  // Vidéos de fond pour le carousel - URLs optimisées
  heroVideos: {
    digitalUniverse: optimizeVideoUrl("https://res.cloudinary.com/dko5sommz/video/upload/v1749401814/WhatsApp_Video_2025-06-06_at_22.54.48_fudnfd.mp4", { quality: 'auto', format: 'mp4' }),
    innovation: optimizeVideoUrl("https://res.cloudinary.com/dko5sommz/video/upload/v1749401792/WhatsApp_Video_2025-06-06_at_22.54.45_drvh4l.mp4", { quality: 'auto', format: 'mp4' }),
    technology: optimizeVideoUrl("https://res.cloudinary.com/dko5sommz/video/upload/v1750840734/a_l_instititu_francais_de_yaounde_flojif.mp4", { quality: 'auto', format: 'mp4' })
  },

  // Images de fond pour le carousel
  heroBackgrounds: {
    digitalUniverse: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_22.54.44_hcykoe.jpg",
    innovation: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
    technology: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401791/WhatsApp_Image_2025-06-06_at_22.54.12_mxcqen.jpg"
  },

  // Vidéos de drone - URLs optimisées
  drone: {
    drone1: optimizeVideoUrl("https://res.cloudinary.com/dko5sommz/video/upload/v1750840734/a_l_instititu_francais_de_yaounde_flojif.mp4", { quality: 'auto', format: 'mp4' }),
    drone2: optimizeVideoUrl("https://res.cloudinary.com/dko5sommz/video/upload/v1750841005/WhatsApp_Video_2025-06-05_at_01.41.08_zau0s5.mp4", { quality: 'auto', format: 'mp4' }),
    drone3: optimizeVideoUrl("https://res.cloudinary.com/dko5sommz/video/upload/v1750840992/evenement_a_l_institu_francais_ajicak.mp4", { quality: 'auto', format: 'mp4' })
  },

  // Images de projets
  projects: {
    project1: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_22.54.44_hcykoe.jpg",
    project2: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
    project3: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401791/WhatsApp_Image_2025-06-06_at_22.54.12_mxcqen.jpg"
  },

  // Logos et branding
  branding: {
    logo: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_22.54.44_hcykoe.jpg",
    logoWhite: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401791/WhatsApp_Image_2025-06-06_at_22.54.12_mxcqen.jpg",
    favicon: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg"
  },

  // Images de services
  services: {
    ai: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_22.54.44_hcykoe.jpg",
    trading: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
    web: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401791/WhatsApp_Image_2025-06-06_at_22.54.12_mxcqen.jpg",
    crm: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407333/samuel_milzt6.png",
    ecommerce: "https://res.cloudinary.com/dko5sommz/image/upload/v1748393838/Lucie_lexs2m.jpg",
    formation: "https://res.cloudinary.com/dko5sommz/image/upload/v1749425661/CHRISTIAN_ESSONO_thisjg.jpg"
  },

  // Images de solutions sectorielles
  solutions: {
    banque: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_22.54.44_hcykoe.jpg",
    immobilier: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
    hospitalier: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401791/WhatsApp_Image_2025-06-06_at_22.54.12_mxcqen.jpg",
    agence: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407333/samuel_milzt6.png"
  },

  // Images de plateformes
  platforms: {
    novacore: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_22.54.44_hcykoe.jpg",
    intranet: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
    trading: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401791/WhatsApp_Image_2025-06-06_at_22.54.12_mxcqen.jpg",
    novaworld: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407333/samuel_milzt6.png",
    dlStyle: "https://res.cloudinary.com/dko5sommz/image/upload/v1748393838/Lucie_lexs2m.jpg",
    dlTravel: "https://res.cloudinary.com/dko5sommz/image/upload/v1749425661/CHRISTIAN_ESSONO_thisjg.jpg",
    dlParisSportif: "https://res.cloudinary.com/dko5sommz/image/upload/v1749425681/FRANCK_MARIEN_BECKAM_arwwpq.jpg",
    dlBookmaker: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_22.54.44_hcykoe.jpg",
    dlDrone: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg"
  },

  // Images de formations
  formations: {
    marketingDigital: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_22.54.44_hcykoe.jpg",
    ia: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
    ecommerce: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401791/WhatsApp_Image_2025-06-06_at_22.54.12_mxcqen.jpg",
    crm: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407333/samuel_milzt6.png",
    creationVisuelle: "https://res.cloudinary.com/dko5sommz/image/upload/v1748393838/Lucie_lexs2m.jpg",
    reseauxSociaux: "https://res.cloudinary.com/dko5sommz/image/upload/v1749425661/CHRISTIAN_ESSONO_thisjg.jpg",
    televente: "https://res.cloudinary.com/dko5sommz/image/upload/v1749425681/FRANCK_MARIEN_BECKAM_arwwpq.jpg",
    sav: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_22.54.44_hcykoe.jpg"
  },

  // Images de démos
  demos: {
    ezeeOptimus: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg",
    salesforce: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401791/WhatsApp_Image_2025-06-06_at_22.54.12_mxcqen.jpg",
    agriculture: "https://res.cloudinary.com/dko5sommz/image/upload/v1748407333/samuel_milzt6.png",
    business: "https://res.cloudinary.com/dko5sommz/image/upload/v1748393838/Lucie_lexs2m.jpg",
    commerce: "https://res.cloudinary.com/dko5sommz/image/upload/v1749425661/CHRISTIAN_ESSONO_thisjg.jpg",
    mining: "https://res.cloudinary.com/dko5sommz/image/upload/v1749425681/FRANCK_MARIEN_BECKAM_arwwpq.jpg",
    restaurant: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_22.54.44_hcykoe.jpg",
    travel: "https://res.cloudinary.com/dko5sommz/image/upload/v1749401792/WhatsApp_Image_2025-06-06_at_23.18.58_1_wwefxu.jpg"
  }
};

export const heroSlides = [
  {
    title: "Univers Digital DL Solutions",
    subtitle: "Transformez votre vision en réalité digitale",
    background: mediaConfig.heroBackgrounds.digitalUniverse,
    video: mediaConfig.heroVideos.digitalUniverse
  },
  {
    title: "Innovation & Créativité",
    subtitle: "Des solutions sur mesure pour votre succès",
    background: mediaConfig.heroBackgrounds.innovation,
    video: mediaConfig.heroVideos.innovation
  },
  {
    title: "Excellence Technologique",
    subtitle: "L'avenir de la technologie à votre service",
    background: mediaConfig.heroBackgrounds.technology,
    video: mediaConfig.heroVideos.technology
  }
];

export const teamMembers = [
  {
    name: "Directeur Général",
    role: "Vision Stratégique",
    image: mediaConfig.team.directeur
  },
  {
    name: "Mascotte",
    role: "Représentation de la Marque",
    image: mediaConfig.team.mascotte
  },
  {
    name: "Samuel OBAM DAY",
    role: "Expert Gestion & Optimisation Parcours Client, Concepteur Logiciel",
    image: mediaConfig.team.samuel
  },
  {
    name: "NGA SABINE LUCIE",
    role: "Expert Gestion des Finances",
    image: mediaConfig.team.lucie
  },
  {
    name: "ESSONO Christian",
    role: "Responsable Technique",
    image: mediaConfig.team.christian
  },
  {
    name: "FRANCK Marien BECKAM",
    role: "Adjoint Technique, Photographe & Monteur Graphique",
    image: mediaConfig.team.franck
  }
];

export const eventVideos = [
  {
    title: "Événement Institut Français",
    video: mediaConfig.events.institutFrancais
  },
  {
    title: "Reportage Agence",
    video: mediaConfig.events.reportageAgence
  },
  {
    title: "Événement Institut Français",
    video: mediaConfig.events.evenementInstitut
  },
  {
    title: "Teasing UCAC",
    video: mediaConfig.events.teasingUCAC
  },
  {
    title: "UCAC",
    video: mediaConfig.events.ucac
  }
]; 