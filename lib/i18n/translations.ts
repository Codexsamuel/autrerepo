export type Language = 'fr' | 'en' | 'es' | 'ar';

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  actionLabel?: string;
}

export interface HelpTip {
  id: string;
  title: string;
  description: string;
}

export interface Translations {
  onboarding: {
    steps: OnboardingStep[];
    navigation: {
      previous: string;
      next: string;
      finish: string;
      skip: string;
      step: string;
      of: string;
    };
  };
  contextualHelp: {
    tips: HelpTip[];
    navigation: {
      previous: string;
      next: string;
      tip: string;
      of: string;
    };
  };
  navigation: {
    home: string;
    services: string;
    about: string;
    intranet: string;
    contact: string;
    solutions: string;
    menu: string;
  };
  search: {
    placeholder: string;
    search: string;
  };
  common: {
    welcome: string;
    discover: string;
    access: string;
    join: string;
    explore: string;
  };
}

export const translations: Record<Language, Translations> = {
  fr: {
    onboarding: {
      steps: [
        {
          id: 'welcome',
          title: 'Bienvenue sur DL Solutions',
          description: 'Votre écosystème digital complet pour la gestion d\'entreprise. Découvrez nos modules spécialisés et commencez votre transformation digitale.'
        },
        {
          id: 'solutions',
          title: 'Solutions Sectorielles',
          description: 'Explorez nos solutions adaptées à votre secteur : Hôtellerie, Restauration, Immobilier, Banque, Assurance et plus encore.',
          actionLabel: 'Explorer'
        },
        {
          id: 'novacore',
          title: 'NovaCore - Dashboard Central',
          description: 'Accédez à votre tableau de bord centralisé avec toutes vos données, analyses et outils de gestion.',
          actionLabel: 'Accéder'
        },
        {
          id: 'formations',
          title: 'Formations & Expertise',
          description: 'Développez vos compétences avec nos formations spécialisées en IA, marketing digital, et gestion d\'entreprise.',
          actionLabel: 'Découvrir'
        },
        {
          id: 'community',
          title: 'NovaWorld - Communauté',
          description: 'Rejoignez notre communauté d\'entrepreneurs et professionnels pour échanger, collaborer et grandir ensemble.',
          actionLabel: 'Rejoindre'
        }
      ],
      navigation: {
        previous: 'Précédent',
        next: 'Suivant',
        finish: 'Terminer',
        skip: 'Passer',
        step: 'Étape',
        of: 'sur'
      }
    },
    contextualHelp: {
      tips: [
        {
          id: 'quick-start',
          title: 'Démarrage Rapide',
          description: 'Commencez par explorer nos solutions sectorielles ou accédez directement à NovaCore pour votre tableau de bord centralisé.'
        },
        {
          id: 'solutions',
          title: 'Solutions Sectorielles',
          description: 'Découvrez nos solutions adaptées à votre secteur : Hôtellerie, Restauration, Immobilier, Banque, Assurance et plus encore.'
        },
        {
          id: 'novacore',
          title: 'NovaCore Dashboard',
          description: 'Votre centre de commande centralisé avec toutes vos données, analyses et outils de gestion en un seul endroit.'
        },
        {
          id: 'formations',
          title: 'Formations & Expertise',
          description: 'Développez vos compétences avec nos formations spécialisées en IA, marketing digital, et gestion d\'entreprise.'
        },
        {
          id: 'community',
          title: 'NovaWorld Communauté',
          description: 'Rejoignez notre communauté d\'entrepreneurs et professionnels pour échanger, collaborer et grandir ensemble.'
        },
        {
          id: 'ai-assistant',
          title: 'Assistant IA',
          description: 'Utilisez notre assistant IA en bas à droite pour obtenir de l\'aide instantanée et des réponses à vos questions.'
        }
      ],
      navigation: {
        previous: 'Précédent',
        next: 'Suivant',
        tip: 'Astuce',
        of: 'sur'
      }
    },
    common: {
      welcome: 'Bienvenue',
      discover: 'Découvrir',
      access: 'Accéder',
      join: 'Rejoindre',
      explore: 'Explorer'
    },
    navigation: {
      home: 'Accueil',
      services: 'Services',
      about: 'À propos',
      intranet: 'Intranet',
      contact: 'Contact',
      solutions: 'Solutions',
      menu: 'Menu'
    },
    search: {
      placeholder: 'Rechercher dans l\'univers digital...',
      search: 'Rechercher'
    }
  },
  en: {
    onboarding: {
      steps: [
        {
          id: 'welcome',
          title: 'Welcome to DL Solutions',
          description: 'Your complete digital ecosystem for business management. Discover our specialized modules and start your digital transformation.'
        },
        {
          id: 'solutions',
          title: 'Sector Solutions',
          description: 'Explore our solutions adapted to your sector: Hospitality, Restaurant, Real Estate, Banking, Insurance and more.',
          actionLabel: 'Explore'
        },
        {
          id: 'novacore',
          title: 'NovaCore - Central Dashboard',
          description: 'Access your centralized dashboard with all your data, analytics and management tools.',
          actionLabel: 'Access'
        },
        {
          id: 'formations',
          title: 'Training & Expertise',
          description: 'Develop your skills with our specialized training in AI, digital marketing, and business management.',
          actionLabel: 'Discover'
        },
        {
          id: 'community',
          title: 'NovaWorld - Community',
          description: 'Join our community of entrepreneurs and professionals to exchange, collaborate and grow together.',
          actionLabel: 'Join'
        }
      ],
      navigation: {
        previous: 'Previous',
        next: 'Next',
        finish: 'Finish',
        skip: 'Skip',
        step: 'Step',
        of: 'of'
      }
    },
    contextualHelp: {
      tips: [
        {
          id: 'quick-start',
          title: 'Quick Start',
          description: 'Start by exploring our sector solutions or access NovaCore directly for your centralized dashboard.'
        },
        {
          id: 'solutions',
          title: 'Sector Solutions',
          description: 'Discover our solutions adapted to your sector: Hospitality, Restaurant, Real Estate, Banking, Insurance and more.'
        },
        {
          id: 'novacore',
          title: 'NovaCore Dashboard',
          description: 'Your centralized command center with all your data, analytics and management tools in one place.'
        },
        {
          id: 'formations',
          title: 'Training & Expertise',
          description: 'Develop your skills with our specialized training in AI, digital marketing, and business management.'
        },
        {
          id: 'community',
          title: 'NovaWorld Community',
          description: 'Join our community of entrepreneurs and professionals to exchange, collaborate and grow together.'
        },
        {
          id: 'ai-assistant',
          title: 'AI Assistant',
          description: 'Use our AI assistant at the bottom right to get instant help and answers to your questions.'
        }
      ],
      navigation: {
        previous: 'Previous',
        next: 'Next',
        tip: 'Tip',
        of: 'of'
      }
    },
    common: {
      welcome: 'Welcome',
      discover: 'Discover',
      access: 'Access',
      join: 'Join',
      explore: 'Explore'
    },
    navigation: {
      home: 'Home',
      services: 'Services',
      about: 'About',
      intranet: 'Intranet',
      contact: 'Contact',
      solutions: 'Solutions',
      menu: 'Menu'
    },
    search: {
      placeholder: 'Search in the digital universe...',
      search: 'Search'
    }
  },
  es: {
    onboarding: {
      steps: [
        {
          id: 'welcome',
          title: 'Bienvenido a DL Solutions',
          description: 'Tu ecosistema digital completo para la gestión empresarial. Descubre nuestros módulos especializados y comienza tu transformación digital.'
        },
        {
          id: 'solutions',
          title: 'Soluciones Sectoriales',
          description: 'Explora nuestras soluciones adaptadas a tu sector: Hostelería, Restauración, Inmobiliaria, Banca, Seguros y más.',
          actionLabel: 'Explorar'
        },
        {
          id: 'novacore',
          title: 'NovaCore - Panel Central',
          description: 'Accede a tu panel centralizado con todos tus datos, análisis y herramientas de gestión.',
          actionLabel: 'Acceder'
        },
        {
          id: 'formations',
          title: 'Formación y Experiencia',
          description: 'Desarrolla tus habilidades con nuestra formación especializada en IA, marketing digital y gestión empresarial.',
          actionLabel: 'Descubrir'
        },
        {
          id: 'community',
          title: 'NovaWorld - Comunidad',
          description: 'Únete a nuestra comunidad de empresarios y profesionales para intercambiar, colaborar y crecer juntos.',
          actionLabel: 'Unirse'
        }
      ],
      navigation: {
        previous: 'Anterior',
        next: 'Siguiente',
        finish: 'Finalizar',
        skip: 'Saltar',
        step: 'Paso',
        of: 'de'
      }
    },
    contextualHelp: {
      tips: [
        {
          id: 'quick-start',
          title: 'Inicio Rápido',
          description: 'Comienza explorando nuestras soluciones sectoriales o accede directamente a NovaCore para tu panel centralizado.'
        },
        {
          id: 'solutions',
          title: 'Soluciones Sectoriales',
          description: 'Descubre nuestras soluciones adaptadas a tu sector: Hostelería, Restauración, Inmobiliaria, Banca, Seguros y más.'
        },
        {
          id: 'novacore',
          title: 'Panel NovaCore',
          description: 'Tu centro de mando centralizado con todos tus datos, análisis y herramientas de gestión en un solo lugar.'
        },
        {
          id: 'formations',
          title: 'Formación y Experiencia',
          description: 'Desarrolla tus habilidades con nuestra formación especializada en IA, marketing digital y gestión empresarial.'
        },
        {
          id: 'community',
          title: 'Comunidad NovaWorld',
          description: 'Únete a nuestra comunidad de empresarios y profesionales para intercambiar, colaborar y crecer juntos.'
        },
        {
          id: 'ai-assistant',
          title: 'Asistente IA',
          description: 'Usa nuestro asistente IA en la parte inferior derecha para obtener ayuda instantánea y respuestas a tus preguntas.'
        }
      ],
      navigation: {
        previous: 'Anterior',
        next: 'Siguiente',
        tip: 'Consejo',
        of: 'de'
      }
    },
    common: {
      welcome: 'Bienvenido',
      discover: 'Descubrir',
      access: 'Acceder',
      join: 'Unirse',
      explore: 'Explorar'
    },
    navigation: {
      home: 'Inicio',
      services: 'Servicios',
      about: 'Acerca de',
      intranet: 'Intranet',
      contact: 'Contacto',
      solutions: 'Soluciones',
      menu: 'Menú'
    },
    search: {
      placeholder: 'Buscar en el universo digital...',
      search: 'Buscar'
    }
  },
  ar: {
    onboarding: {
      steps: [
        {
          id: 'welcome',
          title: 'مرحباً بك في DL Solutions',
          description: 'نظامك الرقمي المتكامل لإدارة الأعمال. اكتشف وحداتنا المتخصصة وابدأ تحولك الرقمي.'
        },
        {
          id: 'solutions',
          title: 'الحلول القطاعية',
          description: 'اكتشف حلولنا المكيفة لقطاعك: الضيافة، المطاعم، العقارات، البنوك، التأمين والمزيد.',
          actionLabel: 'استكشاف'
        },
        {
          id: 'novacore',
          title: 'NovaCore - لوحة التحكم المركزية',
          description: 'الوصول إلى لوحة تحكمك المركزية مع جميع بياناتك وتحليلاتك وأدوات الإدارة.',
          actionLabel: 'الوصول'
        },
        {
          id: 'formations',
          title: 'التدريب والخبرة',
          description: 'طور مهاراتك مع تدريبنا المتخصص في الذكاء الاصطناعي والتسويق الرقمي وإدارة الأعمال.',
          actionLabel: 'اكتشاف'
        },
        {
          id: 'community',
          title: 'NovaWorld - المجتمع',
          description: 'انضم إلى مجتمعنا من رواد الأعمال والمحترفين للتبادل والتعاون والنمو معاً.',
          actionLabel: 'الانضمام'
        }
      ],
      navigation: {
        previous: 'السابق',
        next: 'التالي',
        finish: 'إنهاء',
        skip: 'تخطي',
        step: 'خطوة',
        of: 'من'
      }
    },
    contextualHelp: {
      tips: [
        {
          id: 'quick-start',
          title: 'البدء السريع',
          description: 'ابدأ باستكشاف حلولنا القطاعية أو الوصول مباشرة إلى NovaCore للوحة تحكمك المركزية.'
        },
        {
          id: 'solutions',
          title: 'الحلول القطاعية',
          description: 'اكتشف حلولنا المكيفة لقطاعك: الضيافة، المطاعم، العقارات، البنوك، التأمين والمزيد.'
        },
        {
          id: 'novacore',
          title: 'لوحة تحكم NovaCore',
          description: 'مركز قيادتك المركزي مع جميع بياناتك وتحليلاتك وأدوات الإدارة في مكان واحد.'
        },
        {
          id: 'formations',
          title: 'التدريب والخبرة',
          description: 'طور مهاراتك مع تدريبنا المتخصص في الذكاء الاصطناعي والتسويق الرقمي وإدارة الأعمال.'
        },
        {
          id: 'community',
          title: 'مجتمع NovaWorld',
          description: 'انضم إلى مجتمعنا من رواد الأعمال والمحترفين للتبادل والتعاون والنمو معاً.'
        },
        {
          id: 'ai-assistant',
          title: 'المساعد الذكي',
          description: 'استخدم مساعدنا الذكي في أسفل اليمين للحصول على مساعدة فورية وإجابات لأسئلتك.'
        }
      ],
      navigation: {
        previous: 'السابق',
        next: 'التالي',
        tip: 'نصيحة',
        of: 'من'
      }
    },
    common: {
      welcome: 'مرحباً',
      discover: 'اكتشاف',
      access: 'الوصول',
      join: 'الانضمام',
      explore: 'استكشاف'
    },
    navigation: {
      home: 'الرئيسية',
      services: 'الخدمات',
      about: 'حول',
      intranet: 'الشبكة الداخلية',
      contact: 'اتصل بنا',
      solutions: 'الحلول',
      menu: 'القائمة'
    },
    search: {
      placeholder: 'البحث في الكون الرقمي...',
      search: 'بحث'
    }
  }
};

export const getTranslation = (language: Language): Translations => {
  return translations[language] || translations.fr;
};

export const getLanguageFromLocale = (locale: string): Language => {
  const langMap: Record<string, Language> = {
    'fr': 'fr',
    'en': 'en',
    'es': 'es',
    'ar': 'ar'
  };
  return langMap[locale] || 'fr';
}; 