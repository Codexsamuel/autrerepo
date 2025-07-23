export const revalidate = false;
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Variables d'environnement importantes à vérifier
    const envVars = {
      // Configuration de base
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      
      // Supabase
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Configuré' : '❌ Manquant',
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Configuré' : '❌ Manquant',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Configuré' : '❌ Manquant',
      
      // Clerk Authentication
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? '✅ Configuré' : '❌ Manquant',
      CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY ? '✅ Configuré' : '❌ Manquant',
      
      // Stripe
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? '✅ Configuré' : '❌ Manquant',
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? '✅ Configuré' : '❌ Manquant',
      
      // OpenAI
      OPENAI_API_KEY: process.env.OPENAI_API_KEY ? '✅ Configuré' : '❌ Manquant',
      
      // Trading APIs
      META_API_TOKEN: process.env.META_API_TOKEN ? '✅ Configuré' : '❌ Manquant',
      META_API_ACCOUNT_ID: process.env.META_API_ACCOUNT_ID ? '✅ Configuré' : '❌ Manquant',
      
      // Google APIs
      GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID ? '✅ Configuré' : '❌ Manquant',
      GOOGLE_MY_BUSINESS_CLIENT_ID: process.env.GOOGLE_MY_BUSINESS_CLIENT_ID ? '✅ Configuré' : '❌ Manquant',
      
      // Email
      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY ? '✅ Configuré' : '❌ Manquant',
      
      // Base de données
      DATABASE_URL: process.env.DATABASE_URL ? '✅ Configuré' : '❌ Manquant',
      
      // Sécurité
      JWT_SECRET: process.env.JWT_SECRET ? '✅ Configuré' : '❌ Manquant',
      ENCRYPTION_KEY: process.env.ENCRYPTION_KEY ? '✅ Configuré' : '❌ Manquant',
      
      // Feature flags
      ENABLE_SCRAPING: process.env.ENABLE_SCRAPING || 'true',
      ENABLE_AI_TRADING: process.env.ENABLE_AI_TRADING || 'true',
      ENABLE_TELEGRAM_BOT: process.env.ENABLE_TELEGRAM_BOT || 'true',
      
      // URLs
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
      
      // Timestamp
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'unknown'
    };

    // Compter les variables configurées
    const configuredVars = Object.values(envVars).filter(val => val === '✅ Configuré').length;
    const totalVars = Object.keys(envVars).filter(key => 
      !['timestamp', 'environment', 'NODE_ENV', 'NEXT_PUBLIC_APP_URL', 'NEXT_PUBLIC_API_URL', 'NEXT_PUBLIC_VERCEL_URL'].includes(key)
    ).length;

    return NextResponse.json({
      success: true,
      environment: process.env.NODE_ENV || 'unknown',
      configuredVariables: configuredVars,
      totalVariables: totalVars,
      configurationRate: `${Math.round((configuredVars / totalVars) * 100)}%`,
      variables: envVars,
      message: 'Variables d\'environnement diagnostiquées avec succès'
    });

  } catch (error) {
    console.error('Erreur lors du diagnostic des variables d\'environnement:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Erreur lors du diagnostic des variables d\'environnement',
      details: error instanceof Error ? error.message : 'Erreur inconnue',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 