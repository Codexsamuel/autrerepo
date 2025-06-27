// Configuration du Super Admin par défaut pour NovaCore
export const SUPER_ADMIN_CONFIG = {
  // Informations de base
  credentials: {
    email: "sobam@daveandlucesolutions.com",
    password: "@DavyFrantz2025",
    name: "Samuel OBAM",
    role: "super_admin",
    department: "Direction",
    phone: "+237 694 341 586",
    company: "DL Solutions SARL"
  },

  // Permissions complètes
  permissions: [
    "all", // Accès complet à tous les modules
    "users:read",
    "users:write",
    "users:delete",
    "users:admin",
    "crm:read",
    "crm:write",
    "crm:delete",
    "crm:admin",
    "analytics:read",
    "analytics:write",
    "analytics:export",
    "settings:read",
    "settings:write",
    "settings:admin",
    "security:read",
    "security:write",
    "security:admin",
    "logs:read",
    "logs:export",
    "backup:read",
    "backup:write",
    "backup:restore",
    "system:read",
    "system:write",
    "system:admin"
  ],

  // Paramètres de sécurité
  security: {
    twoFactorEnabled: true,
    lastPasswordChange: "2024-01-15T00:00:00Z",
    passwordExpiryDays: 90,
    sessionTimeoutMinutes: 30,
    maxLoginAttempts: 5,
    lockoutDurationMinutes: 15,
    allowedIPs: ["*"], // Toutes les IPs autorisées pour le super admin
    requireSSL: true,
    forcePasswordChange: false
  },

  // Préférences utilisateur
  preferences: {
    language: "fr",
    timezone: "Africa/Douala",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24h",
    theme: "light",
    notifications: {
      email: true,
      push: true,
      sms: false,
      security: true,
      updates: true,
      marketing: false
    },
    dashboard: {
      defaultView: "overview",
      widgets: ["stats", "recent_activity", "security_alerts", "system_status"],
      refreshInterval: 30000 // 30 secondes
    }
  },

  // Accès aux modules
  modules: {
    novacore: {
      enabled: true,
      access: "full",
      features: ["dashboard", "analytics", "settings", "admin"]
    },
    crm: {
      assurances: { enabled: true, access: "full" },
      banque: { enabled: true, access: "full" },
      trading: { enabled: true, access: "full" },
      immobilier: { enabled: true, access: "full" }
    },
    services: {
      novaworld: { enabled: true, access: "full" },
      dlStyle: { enabled: true, access: "full" },
      dlTravel: { enabled: true, access: "full" },
      dlBookmaker: { enabled: true, access: "full" }
    }
  },

  // Configuration système
  system: {
    canCreateUsers: true,
    canDeleteUsers: true,
    canModifyPermissions: true,
    canAccessLogs: true,
    canExportData: true,
    canManageBackups: true,
    canUpdateSystem: true,
    canManageIntegrations: true,
    canViewAnalytics: true,
    canManageBilling: true
  },

  // Métadonnées
  metadata: {
    createdAt: "2024-01-15T00:00:00Z",
    createdBy: "system",
    lastLogin: "2024-01-15T14:30:00Z",
    loginCount: 1,
    isActive: true,
    isVerified: true,
    emailVerified: true,
    phoneVerified: true
  }
}

// Fonction pour vérifier les identifiants du super admin
export function validateSuperAdmin(email: string, password: string): boolean {
  return email === SUPER_ADMIN_CONFIG.credentials.email && 
         password === SUPER_ADMIN_CONFIG.credentials.password
}

// Fonction pour obtenir les informations du super admin
export function getSuperAdminInfo() {
  return {
    ...SUPER_ADMIN_CONFIG.credentials,
    permissions: SUPER_ADMIN_CONFIG.permissions,
    security: SUPER_ADMIN_CONFIG.security,
    preferences: SUPER_ADMIN_CONFIG.preferences
  }
}

// Fonction pour vérifier les permissions
export function hasPermission(userRole: string, permission: string): boolean {
  if (userRole === "super_admin") {
    return SUPER_ADMIN_CONFIG.permissions.includes("all") || 
           SUPER_ADMIN_CONFIG.permissions.includes(permission)
  }
  return false
}

// Fonction pour générer un token sécurisé
export function generateSecureToken(userId: string, timestamp: number): string {
  const data = `${userId}:${timestamp}:${SUPER_ADMIN_CONFIG.credentials.email}`
  return btoa(data) // En production, utiliser une méthode de chiffrement plus sécurisée
}

// Fonction pour valider un token
export function validateToken(token: string): boolean {
  try {
    const decoded = atob(token)
    const [userId, timestamp, email] = decoded.split(":")
    
    // Vérifier que l'email correspond
    if (email !== SUPER_ADMIN_CONFIG.credentials.email) {
      return false
    }
    
    // Vérifier que le token n'est pas expiré (24h)
    const tokenAge = Date.now() - parseInt(timestamp)
    const maxAge = 24 * 60 * 60 * 1000 // 24 heures
    
    return tokenAge < maxAge
  } catch {
    return false
  }
}

// Configuration des alertes de sécurité
export const SECURITY_ALERTS = {
  loginAttempts: {
    maxAttempts: 5,
    lockoutDuration: 15, // minutes
    notifyOnFailure: true,
    logAllAttempts: true
  },
  suspiciousActivity: {
    enabled: true,
    checkIPChanges: true,
    checkTimePatterns: true,
    checkGeolocation: true
  },
  dataAccess: {
    logAllAccess: true,
    notifyOnSensitiveData: true,
    requireApproval: false
  }
}

// Configuration des notifications
export const NOTIFICATION_CONFIG = {
  channels: {
    email: {
      enabled: true,
      template: "admin-notification",
      priority: "high"
    },
    push: {
      enabled: true,
      sound: true,
      vibration: true
    },
    sms: {
      enabled: false,
      emergencyOnly: true
    }
  },
  types: {
    security: {
      channels: ["email", "push"],
      priority: "high",
      immediate: true
    },
    system: {
      channels: ["email", "push"],
      priority: "medium",
      immediate: false
    },
    updates: {
      channels: ["email"],
      priority: "low",
      immediate: false
    }
  }
}

// Configuration des logs d'audit
export const AUDIT_CONFIG = {
  enabled: true,
  retention: {
    days: 365,
    maxSize: "10GB"
  },
  events: {
    login: true,
    logout: true,
    dataAccess: true,
    dataModification: true,
    userManagement: true,
    systemChanges: true,
    securityEvents: true
  },
  format: {
    timestamp: "ISO",
    includeIP: true,
    includeUserAgent: true,
    includeMetadata: true
  }
}

// Configuration des sauvegardes
export const BACKUP_CONFIG = {
  enabled: true,
  schedule: {
    frequency: "daily",
    time: "02:00",
    timezone: "Africa/Douala"
  },
  retention: {
    daily: 7,
    weekly: 4,
    monthly: 12
  },
  storage: {
    local: true,
    cloud: true,
    encryption: true
  },
  include: {
    database: true,
    files: true,
    configuration: true,
    logs: false
  }
}

export default SUPER_ADMIN_CONFIG 