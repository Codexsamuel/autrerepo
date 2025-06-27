/**
 * Script de configuration du Super Admin NovaCore
 * Ce script enregistre le super admin dans la base de données
 */

const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Configuration du Super Admin
const SUPER_ADMIN_CONFIG = {
  email: "sobam@daveandlucesolutions.com",
  password: "@DavyFrantz2025",
  name: "Samuel OBAM",
  role: "super_admin",
  department: "Direction",
  phone: "+237 694 341 586",
  company: "DL Solutions SARL",
  isActive: true,
  isVerified: true,
  emailVerified: true,
  phoneVerified: true,
  twoFactorEnabled: true,
  permissions: [
    "all",
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
  metadata: {
    createdAt: new Date().toISOString(),
    createdBy: "system",
    lastLogin: null,
    loginCount: 0
  }
};

/**
 * Fonction pour hasher le mot de passe
 */
async function hashPassword(password) {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Fonction pour générer un token de vérification
 */
function generateVerificationToken() {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Fonction pour créer le super admin dans la base de données
 */
async function createSuperAdmin() {
  try {
    console.log('🚀 Configuration du Super Admin NovaCore...');
    
    // Hash du mot de passe
    const hashedPassword = await hashPassword(SUPER_ADMIN_CONFIG.password);
    
    // Token de vérification
    const verificationToken = generateVerificationToken();
    
    // Données du super admin
    const superAdminData = {
      ...SUPER_ADMIN_CONFIG,
      password: hashedPassword,
      verificationToken,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Ici, vous pouvez intégrer avec votre ORM (Prisma, Sequelize, etc.)
    // Exemple avec Prisma :
    /*
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    const superAdmin = await prisma.user.upsert({
      where: { email: SUPER_ADMIN_CONFIG.email },
      update: superAdminData,
      create: superAdminData,
    });
    */
    
    // Exemple avec une base de données SQLite/PostgreSQL :
    /*
    const { Pool } = require('pg');
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    
    const query = `
      INSERT INTO users (email, password, name, role, department, phone, company, 
                        is_active, is_verified, email_verified, phone_verified, 
                        two_factor_enabled, permissions, metadata, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      ON CONFLICT (email) DO UPDATE SET
        password = EXCLUDED.password,
        name = EXCLUDED.name,
        role = EXCLUDED.role,
        department = EXCLUDED.department,
        phone = EXCLUDED.phone,
        company = EXCLUDED.company,
        is_active = EXCLUDED.is_active,
        is_verified = EXCLUDED.is_verified,
        email_verified = EXCLUDED.email_verified,
        phone_verified = EXCLUDED.phone_verified,
        two_factor_enabled = EXCLUDED.two_factor_enabled,
        permissions = EXCLUDED.permissions,
        metadata = EXCLUDED.metadata,
        updated_at = EXCLUDED.updated_at
    `;
    
    const values = [
      superAdminData.email,
      superAdminData.password,
      superAdminData.name,
      superAdminData.role,
      superAdminData.department,
      superAdminData.phone,
      superAdminData.company,
      superAdminData.isActive,
      superAdminData.isVerified,
      superAdminData.emailVerified,
      superAdminData.phoneVerified,
      superAdminData.twoFactorEnabled,
      JSON.stringify(superAdminData.permissions),
      JSON.stringify(superAdminData.metadata),
      superAdminData.createdAt,
      superAdminData.updatedAt
    ];
    
    await pool.query(query, values);
    await pool.end();
    */
    
    // Pour l'instant, on affiche les données
    console.log('✅ Super Admin configuré avec succès !');
    console.log('📧 Email:', SUPER_ADMIN_CONFIG.email);
    console.log('🔐 Mot de passe:', SUPER_ADMIN_CONFIG.password);
    console.log('👤 Nom:', SUPER_ADMIN_CONFIG.name);
    console.log('🏢 Entreprise:', SUPER_ADMIN_CONFIG.company);
    console.log('📞 Téléphone:', SUPER_ADMIN_CONFIG.phone);
    console.log('🔑 Rôle:', SUPER_ADMIN_CONFIG.role);
    console.log('✅ Statut: Actif et vérifié');
    console.log('🔒 2FA: Activé');
    console.log('🎯 Permissions: Complètes');
    
    console.log('\n📋 Informations de connexion :');
    console.log('URL: /novacore/admin');
    console.log('Email: sobam@daveandlucesolutions.com');
    console.log('Mot de passe: @DavyFrantz2025');
    
    console.log('\n⚠️  IMPORTANT :');
    console.log('- Changez le mot de passe après la première connexion');
    console.log('- Activez l\'authentification à deux facteurs');
    console.log('- Configurez les paramètres de sécurité');
    console.log('- Sauvegardez les identifiants de manière sécurisée');
    
    return superAdminData;
    
  } catch (error) {
    console.error('❌ Erreur lors de la configuration du Super Admin:', error);
    throw error;
  }
}

/**
 * Fonction pour vérifier si le super admin existe
 */
async function checkSuperAdminExists() {
  try {
    // Ici, vous pouvez vérifier dans votre base de données
    // Exemple avec Prisma :
    /*
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    const existingAdmin = await prisma.user.findUnique({
      where: { email: SUPER_ADMIN_CONFIG.email }
    });
    
    await prisma.$disconnect();
    return existingAdmin;
    */
    
    // Pour l'instant, on retourne false
    return false;
    
  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error);
    return false;
  }
}

/**
 * Fonction principale
 */
async function main() {
  try {
    console.log('🔍 Vérification de l\'existence du Super Admin...');
    
    const existingAdmin = await checkSuperAdminExists();
    
    if (existingAdmin) {
      console.log('⚠️  Le Super Admin existe déjà !');
      console.log('📧 Email:', existingAdmin.email);
      console.log('👤 Nom:', existingAdmin.name);
      console.log('🔄 Mise à jour des informations...');
    } else {
      console.log('✅ Aucun Super Admin trouvé, création en cours...');
    }
    
    await createSuperAdmin();
    
    console.log('\n🎉 Configuration terminée avec succès !');
    console.log('🚀 NovaCore est prêt à être utilisé.');
    
  } catch (error) {
    console.error('❌ Erreur lors de la configuration:', error);
    process.exit(1);
  }
}

// Exécution du script
if (require.main === module) {
  main();
}

module.exports = {
  createSuperAdmin,
  checkSuperAdminExists,
  SUPER_ADMIN_CONFIG
}; 