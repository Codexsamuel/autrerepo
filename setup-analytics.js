#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('📊 Configuration des analytics DL Solutions');
console.log('=' .repeat(50));

// 1. Configuration Google Analytics 4
function setupGoogleAnalytics4() {
  console.log('\n📈 Configuration Google Analytics 4...');
  
  const ga4Config = {
    measurementId: 'G-XXXXXXXXXX', // À remplacer par votre ID GA4
    enabled: true,
    debugMode: false,
    enhancedEcommerce: true,
    customDimensions: {
      userType: 'cd1',
      pageCategory: 'cd2',
      userRegion: 'cd3',
      subscriptionType: 'cd4'
    },
    customMetrics: {
      scrollDepth: 'cm1',
      timeOnPage: 'cm2',
      engagementScore: 'cm3'
    },
    events: {
      pageView: true,
      userEngagement: true,
      scroll: true,
      click: true,
      formSubmit: true,
      purchase: true,
      addToCart: true,
      viewItem: true
    },
    ecommerce: {
      currency: 'EUR',
      enhancedEcommerce: true,
      productImpressions: true,
      productClicks: true,
      addToCart: true,
      removeFromCart: true,
      checkout: true,
      purchase: true
    }
  };
  
  const configPath = path.join(__dirname, 'config', 'google-analytics4.json');
  fs.writeFileSync(configPath, JSON.stringify(ga4Config, null, 2));
  console.log('✅ Configuration Google Analytics 4 créée');
}

// 2. Configuration Google Tag Manager
function setupGoogleTagManager() {
  console.log('\n🏷️ Configuration Google Tag Manager...');
  
  const gtmConfig = {
    containerId: 'GTM-XXXXXXX', // À remplacer par votre ID GTM
    enabled: true,
    dataLayer: {
      name: 'dataLayer',
      events: {
        pageView: 'page_view',
        userEngagement: 'user_engagement',
        purchase: 'purchase',
        addToCart: 'add_to_cart',
        formSubmit: 'form_submit',
        scroll: 'scroll',
        click: 'click'
      }
    },
    triggers: {
      pageView: {
        type: 'page_view',
        fireOn: 'all_pages'
      },
      scroll: {
        type: 'scroll',
        threshold: 50
      },
      click: {
        type: 'click',
        selectors: ['button', 'a', '.cta']
      }
    },
    variables: {
      pageUrl: '{{Page URL}}',
      pageTitle: '{{Page Title}}',
      userType: '{{User Type}}',
      userId: '{{User ID}}'
    }
  };
  
  const configPath = path.join(__dirname, 'config', 'google-tag-manager.json');
  fs.writeFileSync(configPath, JSON.stringify(gtmConfig, null, 2));
  console.log('✅ Configuration Google Tag Manager créée');
}

// 3. Configuration Facebook Pixel
function setupFacebookPixel() {
  console.log('\n📘 Configuration Facebook Pixel...');
  
  const fbPixelConfig = {
    pixelId: 'XXXXXXXXXX', // À remplacer par votre ID Pixel
    enabled: true,
    events: {
      pageView: true,
      viewContent: true,
      addToCart: true,
      initiateCheckout: true,
      purchase: true,
      lead: true,
      completeRegistration: true
    },
    customEvents: {
      formSubmission: 'FormSubmission',
      videoView: 'VideoView',
      download: 'Download',
      contact: 'Contact'
    },
    advancedMatching: {
      email: true,
      phone: true,
      firstName: true,
      lastName: true,
      city: true,
      country: true
    },
    conversions: {
      currency: 'EUR',
      value: '{{Purchase Value}}'
    }
  };
  
  const configPath = path.join(__dirname, 'config', 'facebook-pixel.json');
  fs.writeFileSync(configPath, JSON.stringify(fbPixelConfig, null, 2));
  console.log('✅ Configuration Facebook Pixel créée');
}

// 4. Configuration des analytics internes
function setupInternalAnalytics() {
  console.log('\n📊 Configuration analytics internes...');
  
  const internalAnalytics = {
    enabled: true,
    endpoint: '/api/analytics',
    events: {
      pageView: {
        track: true,
        properties: ['url', 'title', 'referrer', 'userAgent']
      },
      userAction: {
        track: true,
        properties: ['action', 'element', 'value', 'timestamp']
      },
      performance: {
        track: true,
        metrics: ['FCP', 'LCP', 'CLS', 'FID', 'TTFB']
      },
      error: {
        track: true,
        properties: ['message', 'stack', 'url', 'userAgent']
      }
    },
    userTracking: {
      anonymous: true,
      session: true,
      fingerprint: false,
      retention: 30 // jours
    },
    storage: {
      type: 'database', // ou 'file', 'redis'
      retention: 90, // jours
      aggregation: {
        daily: true,
        weekly: true,
        monthly: true
      }
    },
    dashboards: {
      realTime: true,
      daily: true,
      weekly: true,
      monthly: true
    }
  };
  
  const configPath = path.join(__dirname, 'config', 'internal-analytics.json');
  fs.writeFileSync(configPath, JSON.stringify(internalAnalytics, null, 2));
  console.log('✅ Configuration analytics internes créée');
}

// 5. Configuration des conversions
function setupConversionTracking() {
  console.log('\n🎯 Configuration tracking des conversions...');
  
  const conversionTracking = {
    goals: {
      contact: {
        type: 'form_submit',
        value: 10,
        conditions: {
          form: 'contact',
          page: '/contact'
        }
      },
      signup: {
        type: 'registration',
        value: 25,
        conditions: {
          form: 'signup',
          page: '/sign-up'
        }
      },
      purchase: {
        type: 'purchase',
        value: 'dynamic',
        conditions: {
          page: '/checkout/confirmation'
        }
      },
      download: {
        type: 'download',
        value: 5,
        conditions: {
          fileType: ['pdf', 'doc', 'zip']
        }
      }
    },
    funnels: {
      signup: [
        '/sign-up',
        '/sign-up/verification',
        '/sign-up/complete'
      ],
      purchase: [
        '/products',
        '/cart',
        '/checkout',
        '/checkout/confirmation'
      ],
      contact: [
        '/contact',
        '/contact/submit',
        '/contact/thank-you'
      ]
    },
    attribution: {
      model: 'last_click',
      channels: ['organic', 'paid', 'social', 'email', 'direct'],
      lookbackWindow: 30 // jours
    }
  };
  
  const configPath = path.join(__dirname, 'config', 'conversion-tracking.json');
  fs.writeFileSync(configPath, JSON.stringify(conversionTracking, null, 2));
  console.log('✅ Configuration tracking conversions créée');
}

// 6. Configuration des rapports
function setupReporting() {
  console.log('\n📋 Configuration des rapports...');
  
  const reportingConfig = {
    automated: {
      daily: {
        enabled: true,
        time: '09:00',
        timezone: 'Europe/Paris',
        recipients: ['admin@daveandlucesolutions.com']
      },
      weekly: {
        enabled: true,
        day: 'monday',
        time: '09:00',
        timezone: 'Europe/Paris',
        recipients: ['admin@daveandlucesolutions.com']
      },
      monthly: {
        enabled: true,
        day: 1,
        time: '09:00',
        timezone: 'Europe/Paris',
        recipients: ['admin@daveandlucesolutions.com']
      }
    },
    dashboards: {
      overview: {
        metrics: ['pageViews', 'uniqueVisitors', 'conversionRate', 'revenue'],
        period: 'last30days',
        refresh: 300 // 5 minutes
      },
      ecommerce: {
        metrics: ['orders', 'revenue', 'averageOrderValue', 'topProducts'],
        period: 'last30days',
        refresh: 600 // 10 minutes
      },
      performance: {
        metrics: ['FCP', 'LCP', 'CLS', 'FID', 'TTFB'],
        period: 'last7days',
        refresh: 300 // 5 minutes
      }
    },
    exports: {
      formats: ['pdf', 'csv', 'excel'],
      scheduling: true,
      retention: 90 // jours
    }
  };
  
  const configPath = path.join(__dirname, 'config', 'reporting.json');
  fs.writeFileSync(configPath, JSON.stringify(reportingConfig, null, 2));
  console.log('✅ Configuration rapports créée');
}

// 7. Configuration de la confidentialité
function setupPrivacy() {
  console.log('\n🔒 Configuration confidentialité...');
  
  const privacyConfig = {
    gdpr: {
      enabled: true,
      consentBanner: true,
      cookieNotice: true,
      dataRetention: {
        analytics: 26, // mois
        marketing: 12, // mois
        necessary: 24 // mois
      }
    },
    consent: {
      categories: {
        necessary: {
          required: true,
          description: 'Cookies nécessaires au fonctionnement du site'
        },
        analytics: {
          required: false,
          description: 'Cookies d\'analyse et de performance'
        },
        marketing: {
          required: false,
          description: 'Cookies de marketing et publicité'
        }
      },
      vendors: {
        google: {
          category: 'analytics',
          description: 'Google Analytics et Google Tag Manager'
        },
        facebook: {
          category: 'marketing',
          description: 'Facebook Pixel pour la publicité'
        }
      }
    },
    dataProtection: {
      anonymization: true,
      encryption: true,
      accessControl: true,
      dataPortability: true
    }
  };
  
  const configPath = path.join(__dirname, 'config', 'privacy.json');
  fs.writeFileSync(configPath, JSON.stringify(privacyConfig, null, 2));
  console.log('✅ Configuration confidentialité créée');
}

// Exécution de toutes les configurations analytics
function setupAllAnalytics() {
  try {
    // Créer le dossier config s'il n'existe pas
    const configDir = path.join(__dirname, 'config');
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }
    
    setupGoogleAnalytics4();
    setupGoogleTagManager();
    setupFacebookPixel();
    setupInternalAnalytics();
    setupConversionTracking();
    setupReporting();
    setupPrivacy();
    
    console.log('\n🎉 Configuration analytics terminée !');
    console.log('\n📊 Analytics configurés :');
    console.log('   ✅ Google Analytics 4');
    console.log('   ✅ Google Tag Manager');
    console.log('   ✅ Facebook Pixel');
    console.log('   ✅ Analytics internes');
    console.log('   ✅ Tracking des conversions');
    console.log('   ✅ Rapports automatisés');
    console.log('   ✅ Configuration confidentialité');
    
    console.log('\n📋 Prochaines étapes :');
    console.log('   1. Remplacer les IDs par vos vrais IDs');
    console.log('   2. Configurer les variables d\'environnement');
    console.log('   3. Tester le tracking');
    console.log('   4. Vérifier la conformité RGPD');
    console.log('   5. Déployer les analytics');
    
  } catch (error) {
    console.log(`❌ Erreur lors de la configuration: ${error.message}`);
  }
}

setupAllAnalytics(); 